import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DiagramFrame,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "Integrationテスト" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>Integrationテスト ― つなぎ目で起きることを捕まえる</h1>
        <Lead>
          <Link href="/test/unit">Unitテスト</Link>では、外部との境界をすべて代役に置き換えました。置き換えた瞬間に見えなくなるものがあります ― <strong>本物と噛み合うかどうか</strong>です。DBへの書き込みが1件ずれる、外部APIの応答形式を誤解している、モジュール同士の約束が食い違っている。<Term>Integrationテスト</Term>は、この境界を本物のまま結合して確かめる段階です。
        </Lead>
      </Hero>

      <Heading num="01">3つのつなぎ目</Heading>
      <p>
        確かめる対象は、どこと繋がっているかで3つに分かれます。共通しているのは、<strong>どれも片側だけを見ていては分からない</strong>という点です。
      </p>

      <DiagramFrame
        slug="test-integration-seams"
        aspect="640 / 320"
        caption="Integrationテストが担当する3つのつなぎ目と、そこでしか見つからない不具合。データベースとの間ではSQLの書き間違いやスキーマとのずれ、一意制約に触れたときの挙動、トランザクションの境界。外部サービスとの間ではリクエストの組み立てや応答の解釈違い、エラーとタイムアウトの扱い。モジュール同士の間では例外の型の食い違いや引数の意味の取り違え、見つからないときnullを返すのか例外を投げるのかという約束のずれ。3つ目は外部が絡まないため見落とされやすい。"
      />

      <Analogy label="💡 たとえるなら">
        Unitテストが部品単体の検査、E2Eが完成車の試乗だとすれば、Integrationテストは<strong>エンジンとトランスミッションを実際に組み付けてみる工程</strong>です。部品それぞれが規格内でも、組み付けた瞬間に噛み合わないことが分かります。
      </Analogy>

      <Heading num="02">DBを本物のまま使う</Heading>
      <p>
        データの読み書きを伴う処理でDBアクセスを代役に置き換えてしまうと、<Term>DBそのものに依存する不具合</Term>が原理的に検出できません。SQLの書き間違い、<Link href="/backend/data-transaction">トランザクションの境界</Link>、一意制約に触れたときの挙動 ― どれも本物のDBが返すエラーを受け取って初めて分かります。
      </p>
      <p>
        だからこの段階では、テスト専用のDBに対して実際にクエリを発行します。重要なのは<strong>スキーマを本番と同じ経路で作ること</strong>です。テスト用に手書きしたスキーマを使うと、マイグレーションの誤りをこの段階でも見逃します。
      </p>

      <Aside label="テスト用DBをどう用意するか">
        コンテナで都度起動する方式が最も本物に近く、インメモリの簡易DBに差し替える方式は速い代わりに方言の差で嘘をつくことがあります。<strong>本番と同じ製品・同じバージョンを使えるなら、そちらを選びます</strong> ― この段階の存在意義は「本物と噛み合うか」なので、そこで妥協すると段階ごと無意味になります。
      </Aside>

      <Heading num="03">外部サービスをどう扱うか</Heading>
      <p>
        決済や外部の認証基盤など、自分たちで制御できない相手が絡む場合は事情が変わります。毎回本物を呼べばテストは相手の障害やレート制限に左右され、料金が発生することもあります。方式は3つです。
      </p>

      <DiagramFrame
        slug="test-integration-external"
        aspect="700 / 300"
        caption="外部サービスをテストでどう扱うかの3方式の比較。本物を毎回呼ぶ方式は確かめられることが最も多いが、相手の障害やレート制限に左右され、料金が発生し、遅い。記録して再生する方式は速く安定し記録時点の本物の形を使えるが、相手の仕様が変わっても記録は古いまま緑を返し続ける。模倣サーバーを立てる方式はエラーや遅延を自由に作れるため異常系を試せるが、模倣が本物とずれていないかを別途確かめる必要がある。3つとも確かめているのは相手の正しさではなく、自分のコードが相手の仕様どおりに組み立て解釈できているかである。"
      />

      <p>
        実務では組み合わせて使います ― <strong>日常のCIでは記録の再生、異常系は模倣サーバー、本物への疎通は定期実行で1本だけ</strong>という配分が現実的です。記録が古びる問題は避けられないので、本物を叩く1本を定期実行の枠に必ず残しておきます。
      </p>

      <Heading num="04">モジュール同士のつなぎ目は、最も見落とされる</Heading>
      <p>
        外部が絡まないケースは軽く見られがちですが、実際にはここが最も多く壊れます。「注文モジュールが在庫モジュールを呼び、在庫モジュールが返す例外の型を注文側が想定していなかった」といった食い違いです。
      </p>
      <p>
        両側とも自分で書いたコードで、両側ともUnitテストが緑です。それでも噛み合いません ― <strong>Unitテストは、相手についての自分の思い込みを代役として書き下したものだから</strong>です。思い込みが間違っていれば、代役も間違ったまま緑になります。<Link href="/test/doubles">テストダブル</Link>で扱う「嘘の緑」の典型例がこれです。
      </p>

      <Heading num="05">テストデータの扱いが、そのまま安定性になる</Heading>
      <p>
        本物に近い依存を使う分、この段階からデータの管理が難しくなります。押さえる観点は3つです。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>テストごとに独立させる</h4>
          <p>あるテストが作ったデータを別のテストが読まないよう、前後で初期化する。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>再現可能な状態から始める</h4>
          <p>「今のDBの状態」に依存せず、毎回同じ初期状態から始める。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>本番データを持ち込まない</h4>
          <p>コピーではなく、生成したテストデータを使う。</p>
        </Card>
      </CardGrid>

      <p>
        3つとも<Link href="/test/data">テストデータ管理</Link>で具体的な手立てを扱います。ここで守れなかったものは、そのまま<Link href="/test/flaky">フレーキーテスト</Link>として返ってきます。
      </p>

      <Aside label="件数を絞る基準">
        本物のDBやAPIを使う分、実行はUnitより遅くなります。すべてをこの段階で書こうとせず、<strong>つなぎ目でしか検証できない部分だけ</strong>に絞ります。ロジックの分岐を網羅するのはUnitの仕事で、ここに持ち込むと実行時間だけが伸びます。
      </Aside>

      <Heading num="まとめ">思い込みが正しいかを確かめる段階</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>片側だけでは分からない</h4>
          <p>両側のUnitが緑でも、噛み合うかどうかは別問題として残る。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>本物で妥協しない</h4>
          <p>DBは本番と同じ製品・同じ経路で作ったスキーマを使う。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>外部は3方式を組み合わせる</h4>
          <p>日常は再生、異常系は模倣、本物への疎通は定期実行で1本。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>つなぎ目だけに絞る</h4>
          <p>分岐の網羅はUnitの仕事。持ち込めば実行時間だけが伸びる。</p>
        </Card>
      </CardGrid>

      <p>
        つなぎ目のうち、外に向けて公開している契約は独立して扱う価値があります。<Link href="/test/api">APIのテスト</Link>へ進みます。
      </p>

      <DocsFooter href="/test/integration" />
    </DocsPage>
  );
}
