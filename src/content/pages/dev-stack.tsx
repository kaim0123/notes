import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "技術スタックの組み合わせ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>技術スタックの組み合わせ ― 相性はどこで決まるか</h1>
        <Lead>
          実際のアプリは、<Term>フロント・API・ORM・DB</Term>という4つの層を積み上げて作ります。どの層にも選択肢が複数あり、しかも「どれとどれを組み合わせるか」で相性の良し悪しがあります。ここでは各層の代表的な選択肢と、相性がどこから生まれるのかを整理します。
        </Lead>
      </Hero>

      <Heading num="01">4つの層 ― データはどこを通ってくるか</Heading>
      <p>
        ボタンを押してから画面にデータが表示されるまで、リクエストは決まった順に4つの層を通り抜けます。まずこの並びを押さえると、後の相性の話が読みやすくなります。
      </p>

      <DiagramFrame
        slug="dev-stack-layers"
        aspect="640 / 290"
        caption="技術スタックの4層と相性の縛り。上から画面を描くフロント、やり取りの約束事であるAPI、オブジェクトと表を橋渡しするORM、データを保存するDBが積み重なる。右側には2つの縛りがあり、①tRPCはフロントとサーバーが同じTypeScript基盤を共有していることが前提、②ORMを選ぶとDBがほぼ決まる。相性の大半はこの2つから決まる。"
      />

      <table>
        <thead>
          <tr><th>層</th><th>役割</th><th>代表的な選択肢</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">フロント</td>
            <td>画面を描き、ユーザー操作を受け取る</td>
            <td>React、Next.js</td>
          </tr>
          <tr>
            <td className="hl">API</td>
            <td>フロントとサーバーがやりとりする約束事</td>
            <td>REST、GraphQL、tRPC</td>
          </tr>
          <tr>
            <td className="hl">ORM</td>
            <td>プログラムのオブジェクトとDBの表を橋渡しする</td>
            <td>Prisma、Mongoose</td>
          </tr>
          <tr>
            <td className="hl">DB</td>
            <td>データを永続的に保存する</td>
            <td>PostgreSQL、MongoDB</td>
          </tr>
        </tbody>
      </table>

      <Heading num="02">API方式 ― フロントとサーバーの話し方</Heading>

      <table>
        <thead>
          <tr><th>方式</th><th>考え方</th><th>向いている場面</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">REST</td>
            <td>URL(リソース)ごとにHTTPメソッドで操作する</td>
            <td>最も標準的。迷ったらこれ。外部公開にも向く</td>
          </tr>
          <tr>
            <td className="hl">GraphQL</td>
            <td>1つの窓口に「欲しい項目」を問い合わせて取る</td>
            <td>画面ごとに必要な項目が複雑・可変なとき</td>
          </tr>
          <tr>
            <td className="hl">tRPC</td>
            <td>サーバーの関数をフロントから型付きで直接呼ぶ</td>
            <td>フロントもサーバーもTypeScriptで、同じコード基盤にあるとき</td>
          </tr>
        </tbody>
      </table>

      <p>
        <Term>GraphQL</Term>は窓口を1つにまとめ、フロントが必要な項目を指定できるため、余分なデータの取りすぎ・足りなさを避けられます。<Term>tRPC</Term>は、引数と戻り値の<Link href="/language/js-types">型</Link>がフロントまで自動で伝わるのが強みですが、その仕組み上、フロントとサーバーが同じコード基盤を共有していることが前提になります。
      </p>

      <Heading num="03">ORM ― オブジェクトと表の橋渡し</Heading>
      <p>
        プログラムが扱うのはオブジェクトですが、DBが保存するのは表(や文書)です。この形の違いを吸収し、SQLを直接書かずにDB操作をできるようにする道具が<Term>ORM</Term>です。重要なのは、<Term>ORMは対応するDBが決まっている</Term>点です。
      </p>

      <table>
        <thead>
          <tr><th>ORM</th><th>対応するDB</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Prisma</td>
            <td>リレーショナルDBが主軸</td>
            <td>スキーマから型を自動生成。TypeScriptとの相性が良い</td>
          </tr>
          <tr>
            <td className="hl">Mongoose</td>
            <td>MongoDB専用</td>
            <td>文書型DBにスキーマの概念を持ち込んで扱いやすくする</td>
          </tr>
        </tbody>
      </table>

      <Aside label="ORMは万能ではない">
        ORMはSQLを隠しますが、<Term>隠れるのは記述であって挙動ではありません</Term>。何気ない書き方が大量の問い合わせを生むこともあり、遅いときは結局<Link href="/database/performance">発行されたSQLと実行計画</Link>を見ることになります。ORMを使うほど、その下で何が起きているかを読める必要が出てきます。
      </Aside>

      <Heading num="04">相性は「縛り」から決まる</Heading>
      <p>
        4層それぞれを自由に組み合わせられるように見えて、実際には2つの縛りが選択肢を絞ります。
      </p>

      <table>
        <thead>
          <tr><th>縛り</th><th>内容</th><th>帰結</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">ORMとDB</td>
            <td>ORMは特定のDBに紐づいている</td>
            <td>ORMを選んだ時点でDBがほぼ決まる</td>
          </tr>
          <tr>
            <td className="hl">APIとコード基盤</td>
            <td>型を直通させる方式は同じ言語・同じ基盤が前提</td>
            <td>別チーム・別言語なら素直にRESTを選ぶ</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        スタック選びは、鉄道の線路の幅を揃える作業に似ています。ORMとDBは同じ幅で敷かれた専用線路のようなもので、無理に別のDBを繋ごうとすると継ぎ目でつまずきます。型を直通させる方式は、同じ会社の路線どうしだからこそ直通運転ができる仕組みです。まず幅の合う組み合わせを選ぶことが、無理のない設計の第一歩です。
      </Analogy>

      <p>
        そのうえで、実際の選定では技術的な相性より<Link href="/language/compare">チームが書けるか・運用経験があるか</Link>のほうが結果を左右します。相性は「これは無理がある」という組み合わせを避けるための知識であって、最適解を1つに決めるためのものではありません。
      </p>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>スタックは4層</h4>
          <p>
            フロント・API・ORM・DBを積み上げます。各層に複数の選択肢があります。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ORMがDBを縛る</h4>
          <p>相性の大半は、ORMとDBの紐づきから決まります。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>最後はチームの問題</h4>
          <p>
            相性は避けるべき組み合わせを知るためのもの。決め手は書ける人と運用経験です。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/dev/stack" />
    </DocsPage>
  );
}
