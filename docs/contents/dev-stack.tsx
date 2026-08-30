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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "技術スタックの組み合わせ ― API・DBの相性",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>技術スタックの組み合わせ ― API・DBの相性</h1>
        <Lead>
          「<Link href="/dev/frontend/framework">フレームワーク・ライブラリ</Link>」でフロントとバックの分業を、「<Link href="/database/basics">データベース</Link>」でデータの保存先を見てきました。実際のアプリは、この<Term>フロント・API・ORM・DB</Term>という4つの層を積み上げて作ります。ところが、どの層も選択肢が複数あり、しかも「どれとどれを組み合わせるか」で相性の良し悪しがあります。この記事では、各層の代表的な選択肢と、その相性から導かれるおすすめ構成を整理します。
        </Lead>
      </Hero>

      <Heading num="01">4つの層 ― データはどこを通ってくるか</Heading>
      <p>ボタンを押してから画面にデータが表示されるまで、リクエストは決まった順に4つの層を通り抜けます。まずはこの並びを押さえると、後の「相性」の話が読みやすくなります。</p>
      <table>
        <thead>
          <tr><th>層</th><th>役割</th><th>代表的な選択肢</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">フロント</td><td>画面を描き、ユーザー操作を受け取る</td><td>React、Next.js</td></tr>
          <tr><td className="hl">API</td><td>フロントとサーバーがやりとりする約束事</td><td>REST、GraphQL、tRPC</td></tr>
          <tr><td className="hl">ORM</td><td>プログラムのオブジェクトとDBの表を橋渡しする</td><td>Prisma、Mongoose</td></tr>
          <tr><td className="hl">DB</td><td>データを永続的に保存する</td><td>PostgreSQL、MongoDB</td></tr>
        </tbody>
      </table>
      <p>フロント(React・Next.js)は「<Link href="/dev/frontend/framework">フレームワーク・ライブラリ</Link>」で、DBの基礎は「<Link href="/database/model">関係モデルと3層スキーマ</Link>」で扱いました。ここでは間の2層 ―<Term>API</Term>と<Term>ORM</Term>― を補ったうえで、4層の相性を見ていきます。</p>

      <Heading num="02">API方式 ― フロントとサーバーの話し方</Heading>
      <p><Term>API</Term>は、フロントとサーバーが「どんな形でデータをやりとりするか」の約束事です(「<Link href="/dev/frontend/http">HTTP通信</Link>」で送る中身の設計にあたります)。代表的な3つの方式は、それぞれ得意な場面が異なります。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>考え方</th><th>向いている場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">REST</td><td>URL(リソース)ごとにHTTPメソッドで操作する</td><td>最も標準的。迷ったらこれ。外部公開APIにも向く</td></tr>
          <tr><td className="hl">GraphQL</td><td>1つの窓口に「欲しい項目」を問い合わせて取る</td><td>画面ごとに必要な項目が複雑・可変なとき</td></tr>
          <tr><td className="hl">tRPC</td><td>サーバーの関数をフロントから型付きで直接呼ぶ</td><td>フロントもサーバーもTypeScriptで、同じコード基盤にあるとき</td></tr>
        </tbody>
      </table>
      <p><Term>REST</Term>は「ユーザー一覧なら<code>/users</code>」のようにURLへ役割を割り当てる、最も普及した方式です。<Term>GraphQL</Term>は窓口を1つにまとめ、フロントが「名前とメールだけ欲しい」と問い合わせの形で指定できるため、余分なデータの取りすぎ・足りなさを避けられます。<Term>tRPC</Term>は、サーバーの関数をあたかも手元の関数のように呼び出せ、引数と戻り値の<Link href="/dev/language">型</Link>がフロントまで自動で伝わります。ただしその仕組み上、フロントとサーバーが同じTypeScriptのコード基盤を共有していることが前提になります。</p>

      <Heading num="03">ORM ― オブジェクトと表の橋渡し</Heading>
      <p>プログラムが扱うのは<Link href="/dev/language">オブジェクト</Link>ですが、DBが保存するのは表(や文書)です。この形の違いを吸収し、SQLを直接書かずにDB操作をできるようにする道具が<Term>ORM(Object-Relational Mapping)</Term>です。ここで重要なのは、<b>ORMは対応するDBが決まっている</b>という点です。</p>
      <table>
        <thead>
          <tr><th>ORM</th><th>対応するDB</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Prisma</td><td>PostgreSQL、MySQLなどのRDBが主軸(MongoDBも一応対応)</td><td>スキーマから型を自動生成。TypeScriptとの相性が非常に良い</td></tr>
          <tr><td className="hl">Mongoose</td><td>MongoDB専用</td><td>文書型DBに「スキーマ」の概念を持ち込んで扱いやすくする</td></tr>
        </tbody>
      </table>
      <p><Term>Prisma</Term>は主にリレーショナルDB向けで、定義した<Term>スキーマ</Term>からTypeScriptの型を自動生成してくれるのが最大の強みです。<Term>Mongoose</Term>は<Term>MongoDB</Term>専用で、本来スキーマレスな文書型DBに構造(スキーマ)を与えて安全に扱えるようにします。<b>この「ORMは特定のDBに紐づく」という事実が、次節の相性を決める最大の理由</b>です。</p>

      <Heading num="04">DB ― RDBか、NoSQLか</Heading>
      <p>DBは大きく2系統に分かれます。表と表を関連づけて厳密に管理する<Term>リレーショナルDB(RDB)</Term>と、JSONのような柔軟な文書をそのまま保存する<Term>NoSQL</Term>です(詳しくは「<Link href="/database/basics">役割と種類</Link>」)。</p>
      <table>
        <thead>
          <tr><th>系統</th><th>代表</th><th>データの形</th><th>相性の良いORM</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">RDB</td><td>PostgreSQL</td><td>表(スキーマ固定・関連を厳密に管理)</td><td>Prisma</td></tr>
          <tr><td className="hl">NoSQL</td><td>MongoDB</td><td>文書(JSON風・柔軟)</td><td>Mongoose</td></tr>
        </tbody>
      </table>
      <p>多くのWebアプリはデータ同士の関連(ユーザーと注文、注文と商品…)を厳密に扱う必要があるため、まずは<Term>PostgreSQL</Term>のようなRDBが第一候補になります。MongoDBは、項目が案件ごとに変わる・関連が浅いといった柔軟さを優先したい場面で強みを発揮します。</p>

      <Heading num="05">相性 ― なぜ組み合わせに向き・不向きがあるか</Heading>
      <p>4層は自由な総当たりで選べるわけではありません。相性を生む要因は主に2つです。</p>
      <table>
        <thead>
          <tr><th>要因</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ORMとDBの紐づき</td><td>Mongoose+MongoDBは固定。PrismaはRDBが主軸で、MongoDBとの組み合わせは可能でも王道ではない</td></tr>
          <tr><td className="hl">tRPCの前提</td><td>フロントとサーバーが同じTypeScript基盤にある必要があり、Next.jsのようなフルスタック構成と噛み合う</td></tr>
        </tbody>
      </table>
      <Aside label="⚠️ よくあるつまずき">
        「Prismaを使いたい、でもDBはMongoDBで」という組み合わせは、動かせても<b>Prismaの強みが最も活きるのはRDB</b>のため王道から外れます。またtRPCは、フロントとサーバーが別々のコード基盤に分かれている構成(たとえば独立したReact SPA + 別リポジトリのAPI)では型の共有という前提が崩れ、REST/GraphQLの方が素直です。
      </Aside>

      <Heading num="06">おすすめ構成早見表</Heading>
      <p>以上の相性を踏まえ、実務でよく採られ、かつ噛み合いの良い構成を「おすすめ度」とともにまとめます。</p>
      <table>
        <thead>
          <tr><th>フロント</th><th>API</th><th>ORM</th><th>DB</th><th>おすすめ度</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">React</td><td>REST</td><td>Prisma</td><td>PostgreSQL</td><td>⭐⭐⭐⭐⭐</td></tr>
          <tr><td className="hl">Next.js</td><td>REST</td><td>Prisma</td><td>PostgreSQL</td><td>⭐⭐⭐⭐⭐</td></tr>
          <tr><td className="hl">Next.js</td><td>tRPC</td><td>Prisma</td><td>PostgreSQL</td><td>⭐⭐⭐⭐⭐</td></tr>
          <tr><td className="hl">React</td><td>GraphQL</td><td>Prisma</td><td>PostgreSQL</td><td>⭐⭐⭐⭐☆</td></tr>
          <tr><td className="hl">React</td><td>REST</td><td>Mongoose</td><td>MongoDB</td><td>⭐⭐⭐⭐☆</td></tr>
          <tr><td className="hl">React</td><td>GraphQL</td><td>Mongoose</td><td>MongoDB</td><td>⭐⭐⭐⭐☆</td></tr>
        </tbody>
      </table>
      <p>上位3つはいずれも<b>Prisma + PostgreSQL</b>を土台にしています。型がスキーマからフロントまで一貫して流れ、関連データを厳密に扱えるためです。とくに<b>Next.js + tRPC + Prisma</b>は、フロントからDBまですべてTypeScriptの型でつながる構成として人気があります。MongoDB系はMongooseと組むのが定石で、柔軟なデータ構造を優先する場面で選ばれます。</p>

      <Analogy label="💡 たとえるなら">
        スタック選びは、鉄道の「線路の幅(ゲージ)」を揃える作業に似ています。ORM(Mongoose)とDB(MongoDB)は同じ幅で敷かれた専用線路のようなもので、無理に別のDBを繋ごうとすると継ぎ目でつまずきます。tRPCは、フロントとサーバーが同じ会社の路線どうしだからこそ直通運転(型の直通)ができる仕組みです。まず幅の合う組み合わせ(Prisma+PostgreSQL、Mongoose+MongoDB)を選ぶことが、無理のない設計の第一歩です。
      </Analogy>

      <Heading num="まとめ">相性は「ORMとDBの紐づき」から決まる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>スタックは4層</h4><p>フロント・API・ORM・DBを積み上げます。各層に複数の選択肢があります。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ORMがDBを縛る</h4><p>Mongoose+MongoDBは固定、PrismaはRDBが主軸。相性の大半はここで決まります。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>迷ったらPrisma+PostgreSQL</h4><p>型が一貫し関連も厳密。Next.js+tRPCと組むと型がフロントまで直通します。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/frontend/framework" tag="開発">フレームワーク・ライブラリ</RelatedLink>
                    <RelatedLink href="/dev/frontend/http" tag="開発">HTTP通信</RelatedLink>
                    <RelatedLink href="/database/basics" tag="データベース">役割と種類</RelatedLink>
                    <RelatedLink href="/database/model" tag="データベース">関係モデルと3層スキーマ</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
