import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "バージョニングと廃止" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>バージョニングと廃止 ― 増やすより、消す方が難しい</h1>
        <Lead>
          <Link href="/backend/api-openapi">契約</Link>である以上、勝手に変えれば相手が壊れます。しかし変えないわけにもいきません。ここでは、何が<Term>壊す変更</Term>なのかを定義し、バージョンの分け方と、それ以上に重要な<Term>古いものを終わらせる手順</Term>を扱います。バージョンを増やすのは1日で、消すのに1年かかります。
        </Lead>
      </Hero>

      <Heading num="01">クライアントは同時に更新できない</Heading>
      <p>
        自社のWeb画面だけが相手なら、APIと画面を同時に出せば済むように思えます。しかし現実にはそうなりません。
      </p>

      <DiagramFrame
        slug="backend-api-versioning-overlap"
        aspect="640 / 300"
        caption="新旧のクライアントが必ず共存することを示した時間軸の図。中央の縦線がAPIをデプロイした瞬間で、その上に4種類のクライアントの寿命が帯として並ぶ。デプロイ中の旧サーバーは数分、開いたままのタブは数時間、モバイルアプリは数週間から数年、外部の利用者にいたっては帯の右端が矢印で開いたままになっている。どの帯もデプロイの線をまたいでいることが要点で、切り替えの瞬間というものは存在せず、新旧が同時に動く期間が必ずあることを示している。"
      />

      <p>
        つまり<Term>新旧のクライアントが同時に存在する時間</Term>は必ずあります。<Link href="/backend/data-migration">マイグレーション</Link>とまったく同じ構図で、対処法も同じ ― <Term>どの瞬間も両方が動く形に分解する</Term>ことです。
      </p>

      <Heading num="02">何が壊す変更か</Heading>
      <p>
        基本則は<Term>追加は安全、削除と意味の変更は破壊的</Term>です。
      </p>

      <table>
        <thead>
          <tr><th>安全な変更</th><th>壊す変更</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">レスポンスに<strong>項目を追加</strong>する</td><td>項目を削除・改名する</td></tr>
          <tr><td className="hl"><strong>任意の</strong>パラメータを追加する</td><td>必須パラメータを追加する</td></tr>
          <tr><td className="hl">新しいエンドポイントを追加する</td><td>型を変える(数値 → 文字列)</td></tr>
          <tr><td className="hl">受け付ける値の種類を増やす</td><td><strong>返す</strong>値の種類を増やす(※)</td></tr>
          <tr><td className="hl">エラー文言を直す</td><td>エラーコードやステータスコードを変える</td></tr>
          <tr><td className="hl">性能を改善する</td><td>既定の並び順・件数を変える</td></tr>
          <tr><td className="hl">―</td><td><strong>同じ入力に対する意味を変える</strong></td></tr>
        </tbody>
      </table>

      <p>
        ※は判断が分かれます。厳密に検証する呼び出し側は、知らない値で例外を出します。<Term>知らない値が来たら無視する</Term>ことを契約として最初に宣言しておくと、あとが楽になります。
      </p>

      <Aside label="意味の変更がいちばん危ない">
        <code>status</code>の<code>&quot;pending&quot;</code>が指す状態を変えた ― 項目名も型も変わっていないので、テストも型検査も通ります。しかし呼ぶ側の分岐は静かに誤動作します。<Term>形式ではなく意味を変えるときこそ、新しい項目を足す</Term>べきです。壊れたことに気づけるかどうかが、変更の危険度を決めます。
      </Aside>

      <Heading num="03">バージョンの表し方</Heading>
      <table>
        <thead>
          <tr><th>方式</th><th>例</th><th>評価</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">URLパス</td><td><code>/v1/orders</code></td><td><strong>最も一般的</strong>。見て分かる、試せる、キャッシュしやすい</td></tr>
          <tr><td className="hl">独自ヘッダー</td><td><code>X-API-Version: 2</code></td><td>URLが安定する。試しにくく、付け忘れられやすい</td></tr>
          <tr><td className="hl">メディアタイプ</td><td><code>Accept: …+json</code></td><td>理念には忠実。実務では扱いが煩雑</td></tr>
          <tr><td className="hl">日付指定</td><td><code>API-Version: 2026-08-08</code></td><td>決済サービスなどで採用。<strong>利用者ごとに固定できる</strong></td></tr>
        </tbody>
      </table>

      <p>
        迷うならURLパスで<Term>メジャーバージョンのみ</Term>を表します。<code>/v1.2</code>のような細かい刻みは管理できなくなります ― バージョンが変わるのは<Term>壊す変更のときだけ</Term>です。
      </p>

      <p>
        実装では、バージョンの違いを<Term>いちばん外側の変換にだけ閉じ込めます</Term>。
      </p>

      <pre>
        <code>{`// v1 と v2 で違うのは「表現」だけ。ユースケースは共有する
app.use("/v1/orders", v1OrderRouter);
app.use("/v2/orders", v2OrderRouter);

// v1 用の変換 ― 旧形式に整えて返す
function toOrderResponseV1(order: Order) {
  return { id: order.id, user_id: order.userId, total: order.total };
}

// v2 ― 命名規則を変え、金額に通貨を持たせた
function toOrderResponseV2(order: Order) {
  return {
    id: order.id,
    userId: order.userId,
    amount: { value: order.total, currency: "JPY" },
  };
}`}</code>
      </pre>

      <p>
        <Link href="/backend/layers">層に分けた構成</Link>が、ここで効いてきます。差分が変換だけなら、2本を並行して維持するコストは小さく収まります。逆に<Term>業務ロジックまで分岐し始めたら、その時点で保守は破綻します</Term>。
      </p>

      <Heading num="04">そもそも増やさない</Heading>
      <p>
        いちばん安いバージョニングは、バージョンを上げないことです。設計の工夫でかなりの範囲を吸収できます。
      </p>

      <table>
        <thead>
          <tr><th>手法</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">削除ではなく追加</td><td>改名したいなら新しい名前を<strong>足して両方返す</strong>。古い方は後で消す</td></tr>
          <tr><td className="hl">広がる余地のある型で返す</td><td>金額を数値ではなく<code>{"{ value, currency }"}</code>で返しておけば、後から足せる</td></tr>
          <tr><td className="hl">既定値を変えない</td><td>新しい挙動は、明示的に有効化したときだけ効かせる</td></tr>
          <tr><td className="hl">寛容に読む</td><td>知らない項目は無視する。呼ぶ側にもそう求める</td></tr>
          <tr><td className="hl">コードを増やす</td><td>既存のエラーコードの意味は変えず、新しいコードを足す</td></tr>
        </tbody>
      </table>

      <Heading num="05">廃止の手順 ― ここが本題</Heading>
      <p>
        新しいバージョンを出すのは簡単です。難しいのは古いほうを消すことで、消せなければ維持コストは永久に積み上がります。廃止は<Term>計画された工程</Term>として進めます。
      </p>

      <DiagramFrame
        slug="backend-api-versioning-sunset"
        aspect="640 / 300"
        caption="古いAPIを終わらせる手順を6段階の流れとして示した図。起点は計測で、誰がいつ使っているかを記録することが最初に来る。そこから、予告する、機械が読める形で示す、移行を支援する、短時間だけ止めて試す、停止する、と進む。ブラウンアウトと呼ばれる短時間の停止は、気づいていなかった利用者を本番の停止前に発見するための手法。図の下部には、判断の根拠がすべて起点の計測に戻ることを示す破線の矢印と、計測が無ければ判断できず、誰も使っていない窓口を永久に維持し続けることになる、という注意が置かれている。"
      />

      <pre>
        <code>{`// 廃止予定であることを機械可読に伝える
res.setHeader("Deprecation", "true");
res.setHeader("Sunset", "Wed, 31 Dec 2026 23:59:59 GMT");
res.setHeader("Link", '</docs/migration/v2>; rel="deprecation"');`}</code>
      </pre>

      <p>
        <Term>計測が決定的に重要です</Term>。「まだ使われているかもしれない」という不安だけで、何年も古いAPIを維持しているシステムは非常に多くあります。<Link href="/backend/ops-tracing">アクセスの記録</Link>があれば、「先月の利用は3件、すべて社内のバッチ」という事実に基づいて判断できます。
      </p>

      <Heading num="06">内部APIに同じ厳しさは要らない</Heading>
      <p>
        ここまでの手順は、外部に公開しているAPIを前提としています。相手が社内だけなら、大幅に簡略化できます。
      </p>

      <table>
        <thead>
          <tr><th></th><th>公開API(LSUD)</th><th>内部API(SSKD)</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">利用者</td><td>不特定多数。連絡が取れないことも</td><td>特定少数。全員を把握できる</td></tr>
          <tr><td className="hl">バージョニング</td><td>必須。厳格に</td><td><strong>多くの場合は不要</strong></td></tr>
          <tr><td className="hl">廃止までの期間</td><td>数か月〜数年</td><td>数日〜数週間</td></tr>
          <tr><td className="hl">方針</td><td>後方互換を最優先</td><td><strong>呼ぶ側とまとめて直す</strong></td></tr>
        </tbody>
      </table>

      <p>
        <Term>内部APIに公開API並みのバージョニングを課すのは、明確な過剰設計です</Term>。自社の画面しか使わないAPIなら、両方を同じ変更で直すほうがはるかに健全です。
      </p>

      <Heading num="07">壊していないことを仕組みで確かめる</Heading>
      <table>
        <thead>
          <tr><th>手段</th><th>効果</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">契約ファイルの差分検査</td><td>CIでスキーマを比較し、壊す変更を検出したらビルドを落とす</td></tr>
          <tr><td className="hl">利用者側から宣言する契約テスト</td><td>呼ぶ側が「自分が必要とする形」を宣言し、提供側のCIで検証する</td></tr>
          <tr><td className="hl">契約からの型生成</td><td>呼ぶ側の型を契約から生成し、コンパイル時に不整合を出す</td></tr>
          <tr><td className="hl">古いバージョンのテストを残す</td><td>v1のテストを消さずに維持する。壊れたら即座に分かる</td></tr>
        </tbody>
      </table>

      <p>
        テストの組み立て方そのものはテストセクションの担当です。ここでは「壊していないことを人の注意力に頼らない」という点だけを押さえます。
      </p>

      <Analogy label="💡 たとえるなら">
        鉄道のダイヤ改正に似ています。時刻表を頼りに動いている人が大勢いる以上、黙って変えれば混乱します。だから改正日を数か月前に告知し、駅に掲示し、旧ダイヤの利用者数を調べてから列車を減らします。そして<Term>廃止する路線ほど、慎重な調査が要ります</Term> ― 1日3人しか乗らないと分かれば止められますが、調べていなければ不安だけで永久に走らせ続けることになります。
      </Analogy>

      <Heading num="まとめ">消すところまでを設計する</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>追加は安全、削除と意味の変更は破壊的</h4>
          <p>改名したいなら足して両方返す。意味だけの変更が最も気づかれない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>差分は最外層に閉じる</h4>
          <p>URLでメジャーのみ。変換だけを分け、業務ロジックは1つに保つ。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>廃止は計測から始まる</h4>
          <p>誰が使っているかのデータが無ければ、永久に消せない。</p>
        </Card>
      </CardGrid>

      <p>
        ここまでで外向きの面が決まりました。次は、受けた依頼をコードの中でどう配るか ― <Link href="/backend/layers">アプリケーションの組み立て</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/api-versioning" />
    </DocsPage>
  );
}
