import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DocsFooter,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Aside,
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "タイムアウト・リトライ・サーキットブレーカー",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド &middot; 本番運用</Eyebrow>
        <h1>障害を伝播させない ― タイムアウト・リトライ・遮断</h1>
        <Lead>
          <Link href="/dev/backend/ops/rate-limit">レート制限</Link>は「呼ばれる側」の守りでした。ここでは「呼ぶ側」の守りを扱います。外部APIや別のサービスに依存する以上、<strong>相手はいつか必ず遅くなり、落ちます</strong>。そのとき自分まで道連れにされないための3つの道具 ― <Term>タイムアウト</Term>・<Term>リトライ</Term>・<Term>サーキットブレーカー</Term>を見ていきます。この3つは<strong>セットで使わないと逆効果</strong>になります。
        </Lead>
      </Hero>

      <Heading num="01">障害はどう伝播するか</Heading>
      <p>外部APIが応答しなくなったとします。何が起きるか順を追います。</p>
      <table>
        <thead>
          <tr><th>時刻</th><th>起きること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">0秒</td><td>外部APIが応答を返さなくなる(落ちてはいない ― <strong>遅いだけ</strong>)</td></tr>
          <tr><td className="hl">数秒後</td><td>その呼び出しを含むリクエストが、完了せずに滞留し始める</td></tr>
          <tr><td className="hl">数十秒後</td><td>滞留したリクエストが<Link href="/dev/backend/data/pool">DB接続</Link>やメモリを掴んだまま溜まる</td></tr>
          <tr><td className="hl">1分後</td><td>接続プールが枯渇し、<strong>外部APIと無関係なAPIまで応答しなくなる</strong></td></tr>
          <tr><td className="hl">数分後</td><td>ヘルスチェックが失敗し、正常なサーバーまで切り離される</td></tr>
        </tbody>
      </table>
      <p>ここで重要な事実があります。<strong>相手が落ちている方が、遅い方より遥かにマシ</strong>です。落ちていれば接続は即座に拒否され、すぐエラーになります。遅い相手は、こちらの資源を静かに食い潰します。<Term>カスケード障害</Term>の起点は、ほぼ常に「遅い依存先」です。</p>

      <Heading num="02">タイムアウト ― 最も重要で、最も忘れられる</Heading>
      <p>対策の第一は、<strong>すべての外部通信にタイムアウトを設定する</strong>ことです。これは3つの道具の中で最も基本的で、そして最も設定漏れが多い箇所です。</p>
      <Aside label="⚠️ 既定値は「無制限」であることが多い">
        Node.jsの<code>fetch</code>にはタイムアウトの既定値がありません。多くのHTTPクライアント、DBドライバ、SDKも同様か、あるいは数分という実用にならない値です。<strong>「設定しなければ無制限」</strong>と考えて、明示的に指定してください。
      </Aside>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// AbortSignal.timeout でリクエスト全体の上限を切る
const res = await fetch(url, {
  signal: AbortSignal.timeout(3_000),
});

// 呼び出し元のキャンセルも伝播させたい場合は合成する
const signal = AbortSignal.any([
  req.signal,                    // クライアントが切断したら中止
  AbortSignal.timeout(3_000),
]);`}</code>
      </pre>
      <table>
        <thead>
          <tr><th>設定箇所</th><th>目安</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">接続確立</td><td>1〜3秒。繋がらない相手を長く待つ意味はない</td></tr>
          <tr><td className="hl">応答全体</td><td>相手の実測p99の2〜3倍</td></tr>
          <tr><td className="hl">DBクエリ</td><td><code>statement_timeout</code>で設定する。アプリ側だけでは<strong>DB側の実行は止まらない</strong></td></tr>
          <tr><td className="hl">サーバー全体</td><td>自分の応答時間の上限も決める。無限に処理を続けない</td></tr>
        </tbody>
      </table>
      <p>タイムアウト値は、<strong>呼び出し階層の内側ほど短く</strong>します。自分の応答上限が5秒なのに、依存先のタイムアウトが10秒では意味がありません。「残り時間」を伝播させる<Term>デッドライン</Term>という考え方もあり、階層が深い構成では有効です。</p>

      <Heading num="03">リトライ ― 慎重に、間隔を空けて</Heading>
      <p>一時的な失敗は再試行で回復します。ただし<strong>やり方を誤ると、障害を増幅する凶器になります</strong>。</p>
      <table>
        <thead>
          <tr><th>原則</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">再試行してよい失敗だけ</td><td>接続エラー、タイムアウト、503、429。<strong>400や404は何度やっても同じ</strong></td></tr>
          <tr><td className="hl">冪等な操作だけ</td><td>GETは安全。POSTは<strong>二重実行される</strong>可能性がある</td></tr>
          <tr><td className="hl">指数バックオフ</td><td>1秒、2秒、4秒…と間隔を空ける。すぐ再試行しない</td></tr>
          <tr><td className="hl">ジッター(ゆらぎ)</td><td>ランダムな幅を加える。<strong>全クライアントの同時再試行を防ぐ</strong></td></tr>
          <tr><td className="hl">上限を決める</td><td>3回程度。無限に再試行しない</td></tr>
          <tr><td className="hl">階層で重ねない</td><td><strong>各層が3回ずつ再試行すると、3層で27倍になる</strong></td></tr>
        </tbody>
      </table>
      <p>最後の項目は特に重要です。相手が高負荷で失敗しているときに全員が再試行すると、<strong>負荷が数倍に膨れて復旧を妨げます</strong>(リトライストーム)。再試行は<strong>1つの階層でだけ</strong>行うと決め、他の層はそのまま失敗を返します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`async function retry<T>(fn: () => Promise<T>, max = 3): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (!isRetryable(err) || attempt >= max) throw err;

      // 相手が待つべき時間を指定していれば従う
      const hinted = retryAfterSeconds(err);
      const backoff = hinted ?? Math.min(2 ** attempt * 200, 5_000);
      await sleep(backoff * (0.5 + Math.random()));   // ジッター
    }
  }
}`}</code>
      </pre>
      <p>POSTを再試行したい場合は、<Link href="/dev/backend/jobs">冪等キー</Link>を使います。同じキーで2回呼ばれたら、2回目は1回目の結果を返す ― この仕組みがあって初めて、書き込みの再試行が安全になります。</p>

      <Heading num="04">サーキットブレーカー ― 諦めて即座に失敗する</Heading>
      <p>相手が完全に落ちているとき、リトライは無駄なだけでなく有害です。<strong>「駄目だと分かっている相手を呼びに行かない」</strong>のが<Term>サーキットブレーカー</Term>です。名前のとおり、ブレーカーが落ちれば回路が切れます。</p>
      <Diagram caption="失敗が続いたら回路を開き、一定時間後に少しだけ試す">
        <svg viewBox="0 0 520 170" xmlns="http://www.w3.org/2000/svg">
          <rect x={25} y={55} width={120} height={55} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={58} y={78} fill="#39ff6a" fontSize="13">Closed</text>
          <text x={40} y={97} fill="#9a9a9a" fontSize="10">通常どおり呼ぶ</text>

          <rect x={200} y={55} width={120} height={55} rx="8" fill="none" stroke="#ffb43c" strokeWidth="1.5" />
          <text x={238} y={78} fill="#ffb43c" fontSize="13">Open</text>
          <text x={208} y={97} fill="#9a9a9a" fontSize="10">呼ばずに即エラー</text>

          <rect x={375} y={55} width={120} height={55} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={398} y={78} fill="#f2f2f2" fontSize="13">Half-Open</text>
          <text x={390} y={97} fill="#9a9a9a" fontSize="10">1本だけ試す</text>

          <path d="M145 72 l50 0" stroke="#5f5f5f" strokeWidth="1.2" />
          <path d="M195 72 l-8 -4 v8 z" fill="#5f5f5f" />
          <text x={140} y={44} fill="#6a6a6a" fontSize="10">失敗率が閾値超え</text>

          <path d="M320 72 l50 0" stroke="#5f5f5f" strokeWidth="1.2" />
          <path d="M370 72 l-8 -4 v8 z" fill="#5f5f5f" />
          <text x={318} y={44} fill="#6a6a6a" fontSize="10">一定時間経過</text>

          <path d="M435 110 C 420 155, 100 155, 85 112" stroke="#39ff6a" strokeWidth="1.2" fill="none" />
          <path d="M85 112 l-4 8 l8 -2 z" fill="#39ff6a" />
          <text x={215} y={152} fill="#39ff6a" fontSize="10">成功したら復帰(失敗したらOpenへ戻る)</text>
        </svg>
      </Diagram>
      <table>
        <thead>
          <tr><th>状態</th><th>挙動</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Closed(閉)</td><td>通常どおり呼び出す。失敗率を数え続ける</td></tr>
          <tr><td className="hl">Open(開)</td><td><strong>呼び出さずに即座に失敗を返す</strong>。相手を休ませ、自分の資源も守る</td></tr>
          <tr><td className="hl">Half-Open(半開)</td><td>試験的に少数だけ通す。成功すればClosedへ、失敗すればOpenへ</td></tr>
        </tbody>
      </table>
      <p>ブレーカーの効果は2方向です。<strong>自分の資源を守る</strong>(無駄な待ち時間を消費しない)と同時に、<strong>相手に回復の余地を与えます</strong>。復旧しかけたサーバーに全クライアントが殺到すれば、また落ちるだけです。</p>
      <p>実装は自作もできますが、<code>opossum</code>のようなライブラリを使うか、<strong>サービスメッシュやSDKの標準機能</strong>に任せるのが確実です。閾値(失敗率、判定に必要な最小件数、Openを維持する時間)は、必ず調整可能な設定にしておきます。</p>

      <Heading num="05">壊れたときに何を返すか ― グレースフルデグラデーション</Heading>
      <p>ブレーカーが開いたとき、単に500を返すのが最善とは限りません。<strong>機能を落としてでもサービスを続ける</strong>方が良い場面が多くあります。</p>
      <table>
        <thead>
          <tr><th>依存先</th><th>落ちたときの振る舞い</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">おすすめ商品API</td><td>おすすめ欄を非表示にする。<strong>商品ページ自体は表示する</strong></td></tr>
          <tr><td className="hl">在庫確認API</td><td>「在庫を確認中」と表示し、注文は受け付ける</td></tr>
          <tr><td className="hl">キャッシュ(Redis)</td><td>DBから直接読む(遅くなるだけ)</td></tr>
          <tr><td className="hl">検索エンジン</td><td>DBの単純な絞り込みに切り替える</td></tr>
          <tr><td className="hl">決済API</td><td><strong>degradeしない</strong>。明確に失敗させる</td></tr>
        </tbody>
      </table>
      <p>設計時に<strong>「この依存先は必須か、あれば嬉しいか」</strong>を分類しておきます。必須でないものは、落ちたときの代替表示を最初から作っておく ― これが可用性を大きく引き上げます。</p>

      <Heading num="06">隔離 ― 影響範囲を仕切る</Heading>
      <p>もう1歩進んだ考え方が<Term>バルクヘッド(隔壁)</Term>です。船が隔壁で区画に分かれているように、資源を用途ごとに分けておき、<strong>1箇所の障害が全体に広がらないようにします</strong>。</p>
      <table>
        <thead>
          <tr><th>手法</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">接続プールの分離</td><td>外部API呼び出しの同時実行数に、依存先ごとの上限を設ける</td></tr>
          <tr><td className="hl">ワーカーの分離</td><td>重いジョブと軽いジョブでキューを分ける(<Link href="/dev/backend/jobs">ジョブキュー</Link>)</td></tr>
          <tr><td className="hl">読み書きの分離</td><td>参照系と更新系でDBの接続を分ける</td></tr>
          <tr><td className="hl">重要度による分離</td><td>決済のような重要な処理を、別のサーバー群で動かす</td></tr>
        </tbody>
      </table>

      <Heading num="07">確かめる ― 壊してみる</Heading>
      <p>これらの仕組みは、<strong>本番で初めて発動する</strong>という性質を持ちます。正しく設定されているかは、意図的に壊して確かめるしかありません。</p>
      <table>
        <thead>
          <tr><th>方法</th><th>確認できること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">遅延を注入したモックで<Link href="/test/integration">結合テスト</Link></td><td>タイムアウトが設定されているか</td></tr>
          <tr><td className="hl">依存先を落としてみる</td><td>degradeが機能するか、全体が巻き込まれないか</td></tr>
          <tr><td className="hl">負荷試験</td><td>接続プールの限界と、限界での振る舞い</td></tr>
          <tr><td className="hl">カオスエンジニアリング</td><td>本番相当の環境で計画的に障害を起こし、想定を検証する</td></tr>
        </tbody>
      </table>
      <p>最低限、<strong>「依存先を1つ止めたら何が起きるか」を全依存先について答えられる</strong>状態を目指します。答えられない依存先が、次の障害の原因になります。</p>

      <Analogy label="💡 たとえるなら">
        タイムアウトは、電話の呼び出しを何コールで切るかの取り決めです。決めていなければ、繋がらない相手を延々と待ち続け、その間ずっと回線が塞がります。リトライは掛け直しですが、相手が話し中のときに全員が1秒ごとに掛け直せば、交換機はさらに混雑します ― だから間隔を空け、しかも全員が同じ間隔にならないようずらす。そしてサーキットブレーカーは、<strong>「あの番号はいま不通だ」と分かったら、しばらく掛けるのをやめる</strong>判断です。復旧しかけた回線に全員が殺到すれば、また落ちるだけなのです。
      </Analogy>

      <Heading num="まとめ">3つはセットで使う</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>まずタイムアウト</h4><p>既定値は実質無制限。遅い依存先が資源を食い潰し、無関係なAPIまで巻き込む。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>リトライはバックオフとジッター</h4><p>冪等な操作だけ、1階層だけ。重ねると障害を増幅する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>諦めて機能を落とす</h4><p>ブレーカーで即座に失敗し、必須でない依存先は代替表示に切り替える。</p></Card>
      </CardGrid>
      <p>次は、プロセスそのものの出入り口です。<Link href="/dev/backend/ops/lifecycle">起動と停止（ヘルスチェックとグレースフルシャットダウン）</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/infra/incident" tag="インフラ">障害の切り分け</RelatedLink>
            <RelatedLink href="/design/architecture/sys/microservices" tag="設計">マイクロサービスアーキテクチャ</RelatedLink>
            <RelatedLink href="/dev/backend/ops/rate-limit" tag="バックエンド">レート制限</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
