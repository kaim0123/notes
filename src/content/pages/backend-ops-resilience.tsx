import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "タイムアウト・リトライ・遮断" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>障害を伝播させない ― 待つ・諦める・遮断する</h1>
        <Lead>
          <Link href="/backend/ops-rate-limit">レート制限</Link>は呼ばれる側の守りでした。ここでは<Term>呼ぶ側</Term>の守りを扱います。外部に依存する以上、相手はいつか必ず遅くなり、落ちます。そのとき自分まで道連れにされないための3つの道具を見ていきます。この3つは<Term>セットで使わないと逆効果</Term>になります。
        </Lead>
      </Hero>

      <Heading num="01">障害はこう伝播する</Heading>
      <DiagramFrame
        slug="backend-ops-cascade"
        aspect="640 / 320"
        caption="1つの外部APIが遅くなっただけで無関係な機能まで止まるまでの流れを、時間軸で示した図。応答が返らなくなった時点では相手は落ちておらず、遅いだけである。数秒でリクエストが溜まり始め、数十秒でそれが接続とメモリを掴んだまま離さなくなり、1分で接続が枯渇して無関係な機能まで止まる。数分後には死活確認まで失敗し、正常だったサーバーが切り離される。右側には、最初の段階でタイムアウトを設定してあればそこから先へは進まないことが示されている。下部には、落ちている相手より遅い相手のほうがはるかに危険だという結論が置かれている。"
      />

      <p>
        ここで重要な事実があります。<Term>相手が落ちているほうが、遅いより遥かにマシ</Term>です。落ちていれば接続は即座に拒否され、すぐエラーになります。遅い相手は、こちらの資源を静かに食い潰します。<Term>連鎖的な障害の起点は、ほぼ常に「遅い依存先」です</Term>。
      </p>

      <Heading num="02">タイムアウト ― 最も重要で、最も忘れられる</Heading>
      <p>
        対策の第一は、<Term>すべての外部通信にタイムアウトを設定する</Term>ことです。3つの道具の中で最も基本的で、そして最も設定漏れが多い箇所です。
      </p>

      <Aside label="既定値は実質「無制限」">
        多くのHTTPクライアント、データベースドライバ、SDKには実用的なタイムアウトの既定値がありません。あるいは数分という、あってないような値です。<Term>設定しなければ無制限</Term>と考えて、明示的に指定してください。
      </Aside>

      <pre>
        <code>{`// リクエスト全体の上限を切る
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
          <tr><td className="hl">接続の確立</td><td>1〜3秒。繋がらない相手を長く待つ意味はない</td></tr>
          <tr><td className="hl">応答全体</td><td>相手の実測値の2〜3倍</td></tr>
          <tr><td className="hl">クエリ</td><td>データベース側でも設定する。<strong>アプリ側だけでは向こうの実行は止まらない</strong></td></tr>
          <tr><td className="hl">自分の応答</td><td>自分の上限も決める。無限に処理を続けない</td></tr>
        </tbody>
      </table>

      <p>
        タイムアウト値は<Term>呼び出し階層の内側ほど短く</Term>します。自分の応答上限が5秒なのに依存先を10秒待つのでは意味がありません。「残り時間」を伝播させるという考え方もあり、階層が深い構成では有効です。
      </p>

      <Heading num="03">リトライは、慎重に</Heading>
      <p>
        一時的な失敗は再試行で回復します。ただし<Term>やり方を誤ると、障害を増幅する凶器になります</Term>。
      </p>

      <table>
        <thead>
          <tr><th>原則</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">再試行してよい失敗だけ</td><td>接続エラー、タイムアウト、一時的な過負荷。<strong>4xxは何度やっても同じ</strong></td></tr>
          <tr><td className="hl">冪等な操作だけ</td><td>読み取りは安全。書き込みは<strong>二重実行される</strong>可能性がある</td></tr>
          <tr><td className="hl">間隔を指数的に空ける</td><td>1秒、2秒、4秒…。すぐ再試行しない</td></tr>
          <tr><td className="hl">ゆらぎを加える</td><td>ランダムな幅を足す。<strong>全員が同時に再試行するのを防ぐ</strong></td></tr>
          <tr><td className="hl">上限を決める</td><td>3回程度。無限に再試行しない</td></tr>
          <tr><td className="hl">階層で重ねない</td><td><strong>各層が3回ずつやると、3層で27倍になる</strong></td></tr>
        </tbody>
      </table>

      <p>
        最後がとくに重要です。相手が高負荷で失敗しているときに全員が再試行すると、<Term>負荷が数倍に膨れて復旧を妨げます</Term>。再試行は<Term>1つの階層でだけ</Term>行うと決め、他の層はそのまま失敗を返します。
      </p>

      <pre>
        <code>{`async function retry<T>(fn: () => Promise<T>, max = 3): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (!isRetryable(err) || attempt >= max) throw err;

      // 相手が待つべき時間を指定していれば、それに従う
      const hinted = retryAfterSeconds(err);
      const backoff = hinted ?? Math.min(2 ** attempt * 200, 5_000);
      await sleep(backoff * (0.5 + Math.random()));   // ゆらぎ
    }
  }
}`}</code>
      </pre>

      <p>
        書き込みを再試行したい場合は<Link href="/backend/jobs">冪等キー</Link>を使います。同じキーで2回呼ばれたら2回目は1回目の結果を返す ― この仕組みがあって初めて、書き込みの再試行が安全になります。
      </p>

      <Heading num="04">駄目だと分かっている相手を呼びに行かない</Heading>
      <p>
        相手が完全に落ちているとき、リトライは無駄なだけでなく有害です。そこで<Term>サーキットブレーカー</Term>を置きます。名前のとおり、失敗が続けば回路を切ります。
      </p>

      <DiagramFrame
        slug="backend-ops-breaker"
        aspect="640 / 260"
        caption="サーキットブレーカーの3つの状態と遷移を示した図。閉じた状態では通常どおり呼び出しながら失敗の割合を数え、閾値を超えると開いた状態へ移る。開いた状態では相手を呼びに行かず即座に失敗を返す。一定時間が経つと半分開いた状態へ移って少数だけを試しに通し、成功すれば閉じた状態へ戻り、失敗すればふたたび開く。下部には、この仕組みの効き目が2方向であること ― 自分の資源を守ることと、相手に回復の余地を与えること ― が記されている。"
      />

      <p>
        実装は自作もできますが、ライブラリか基盤の標準機能に任せるのが確実です。閾値(失敗の割合、判定に必要な最小件数、開いたまま保つ時間)は、<Term>必ず調整可能な設定にしておきます</Term>。
      </p>

      <Heading num="05">壊れたときに何を返すか</Heading>
      <p>
        遮断したとき、単にエラーを返すのが最善とは限りません。<Term>機能を落としてでもサービスを続ける</Term>ほうが良い場面が多くあります。
      </p>

      <table>
        <thead>
          <tr><th>依存先</th><th>落ちたときの振る舞い</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">おすすめの提示</td><td>その欄を出さない。<strong>商品ページ自体は表示する</strong></td></tr>
          <tr><td className="hl">在庫の確認</td><td>「確認中」と表示し、注文は受け付ける</td></tr>
          <tr><td className="hl">キャッシュ</td><td>本体から直接読む(遅くなるだけ)</td></tr>
          <tr><td className="hl">検索の基盤</td><td>単純な絞り込みに切り替える</td></tr>
          <tr><td className="hl">決済</td><td><strong>落とさない</strong>。明確に失敗させる</td></tr>
        </tbody>
      </table>

      <p>
        設計時に<Term>この依存先は必須か、あれば嬉しいか</Term>を分類しておきます。必須でないものは、落ちたときの代替を最初から作っておく ― これが可用性を大きく引き上げます。
      </p>

      <Heading num="06">影響範囲を仕切る</Heading>
      <p>
        もう1歩進んだ考え方が<Term>隔壁</Term>です。船が区画に分かれているように、資源を用途ごとに分けておき、<Term>1箇所の障害が全体に広がらないようにします</Term>。
      </p>

      <table>
        <thead>
          <tr><th>手法</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">同時実行数の分離</td><td>外部呼び出しの同時実行数に、依存先ごとの上限を設ける</td></tr>
          <tr><td className="hl">ワーカーの分離</td><td>重いジョブと軽いジョブで<Link href="/backend/jobs">キューを分ける</Link></td></tr>
          <tr><td className="hl">読み書きの分離</td><td>参照系と更新系で接続を分ける</td></tr>
          <tr><td className="hl">重要度による分離</td><td>決済のような処理を、別のサーバー群で動かす</td></tr>
        </tbody>
      </table>

      <Heading num="07">壊してみないと分からない</Heading>
      <p>
        これらの仕組みは<Term>本番で初めて発動する</Term>という性質を持ちます。正しく設定されているかは、意図的に壊して確かめるしかありません。
      </p>

      <table>
        <thead>
          <tr><th>方法</th><th>確認できること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">遅延を入れた偽の相手でテストする</td><td>タイムアウトが設定されているか</td></tr>
          <tr><td className="hl">依存先を落としてみる</td><td>代替が機能するか、全体が巻き込まれないか</td></tr>
          <tr><td className="hl">負荷をかける</td><td>資源の限界と、限界での振る舞い</td></tr>
          <tr><td className="hl">計画的に障害を起こす</td><td>本番相当の環境で、想定そのものを検証する</td></tr>
        </tbody>
      </table>

      <p>
        最低限、<Term>依存先を1つ止めたら何が起きるかを、全依存先について答えられる</Term>状態を目指します。答えられない依存先が、次の障害の原因になります。
      </p>

      <Analogy label="💡 たとえるなら">
        タイムアウトは、電話を何コールで切るかの取り決めです。決めていなければ、繋がらない相手を延々と待ち、その間ずっと回線が塞がります。リトライは掛け直しですが、話し中のときに全員が1秒ごとに掛け直せば交換機はさらに混雑します ― だから間隔を空け、全員が同じ間隔にならないようずらす。そして遮断は、<Term>あの番号はいま不通だと分かったら、しばらく掛けるのをやめる</Term>判断です。復旧しかけた回線に全員が殺到すれば、また落ちるだけなのです。
      </Analogy>

      <Heading num="まとめ">3つはセットで使う</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>まずタイムアウト</h4>
          <p>既定値は実質無制限。遅い依存先が資源を食い潰し、無関係な機能まで巻き込む。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>間隔を空け、ゆらぎを足す</h4>
          <p>冪等な操作だけ、1階層だけ。重ねると障害を増幅する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>諦めて、機能を落とす</h4>
          <p>即座に失敗させ、必須でない依存先は代替に切り替える。</p>
        </Card>
      </CardGrid>

      <p>
        次は、プロセスそのものの出入り口です。<Link href="/backend/ops-lifecycle">起動と停止</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/ops-resilience" />
    </DocsPage>
  );
}
