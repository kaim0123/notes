import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "最初のサーバー" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>最初のサーバー ― 作る・登録する・待ち受ける</h1>
        <Lead>
          Expressのサーバーは、驚くほど少ない行数で動き出します。やることは3つだけ ― <Term>アプリを作る</Term>・<Term>応答を登録する</Term>・<Term>待ち受けを始める</Term>。まずこの最小構成を組み立て、以降のページで扱うものの土台を作ります。
        </Lead>
      </Hero>

      <Heading num="01">アプリの本体を作る</Heading>
      <p>
        インポートして呼び出すと、慣習的に<code>app</code>と名付けるオブジェクトが返ります。これが、これから登録するルーティングやミドルウェアをすべて束ねる<Term>司令塔</Term>です。
      </p>

      <pre>
        <code>{`import express from "express";

const app = express();   // アプリ本体を1つ作る`}</code>
      </pre>

      <p>
        <Link href="/language/runtime">ランタイム</Link>で見たとおり、Node.js自身も標準の機能でサーバーを立てられます。この<code>app</code>は、その低レベルな処理を内側に隠し、<Term>宣言的に組み立てられる薄い層としてかぶせたもの</Term>だと考えると分かりやすいです。
      </p>

      <Heading num="02">最小の動くサーバー</Heading>
      <p>
        応答を1つ登録し、待ち受けを始めれば、それだけで動くWebサーバーになります。
      </p>

      <pre>
        <code>{`import express from "express";

const app = express();

// "/" に GET で来たリクエストへの応答を登録する
app.get("/", (req, res) => {
  res.send("Hello Express");
});

// 3000番で待ち受け開始
app.listen(3000, () => {
  console.log("http://localhost:3000 で起動しました");
});`}</code>
      </pre>

      <p>
        行数は少なくても、後続のページで深掘りする要素がひととおり顔を出しています。第1引数がパス、第2引数の関数が<Term>ハンドラ</Term>、ハンドラが受け取る2つの引数が<Term>リクエストとレスポンス</Term>です。
      </p>

      <Heading num="03">2つの時間軸を区別する</Heading>
      <p>
        ここで最初につまずきやすい点を押さえておきます。<Term>このファイルのコードは、2つの異なるタイミングで動きます</Term>。
      </p>

      <DiagramFrame
        slug="backend-express-hello-phases"
        aspect="640 / 320"
        caption="Expressのコードが2つの異なるタイミングで動くことを示した図。左の起動時は一度しか通らず、アプリ本体を作り、ルートやミドルウェアを登録し、最後に待ち受けを始める。登録は表に書き込む作業であって、この時点ではハンドラの中身は実行されない。右のリクエストが来たときは何度でも通り、届いたパスとメソッドで表を引いて該当するハンドラの中身が実行される。下部には、ハンドラの外側に書いたコードは起動時に一度だけ動き、内側に書いたコードはリクエストのたびに動く、という区別が記されている。"
      />

      <p>
        <Term>登録は、表に書き込む作業でしかありません</Term>。ハンドラの中身が動くのは、実際にリクエストが届いたときです。だから登録は<Term>待ち受けを始める前に全部済ませておく</Term>のが基本の型になります。
      </p>

      <table>
        <thead>
          <tr><th>ステップ</th><th>やること</th><th>いつ動くか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1. 作る</td><td>アプリ本体を用意する</td><td>起動時に一度</td></tr>
          <tr><td className="hl">2. 登録する</td><td>ルート・ミドルウェアを積む</td><td>起動時に一度</td></tr>
          <tr><td className="hl">3. 起動する</td><td>ポートで待ち受けを始める</td><td>起動時に一度</td></tr>
          <tr><td className="hl">―</td><td>ハンドラの中身</td><td><strong>リクエストのたび</strong></td></tr>
        </tbody>
      </table>

      <p>
        この区別が分かると、「なぜデータベースへの接続はハンドラの外で作るのか」も自然に理解できます ― <Term>一度だけ用意して、毎回使い回す</Term>ためです。
      </p>

      <Heading num="04">この先の主役</Heading>
      <p>
        ハンドラの2つの引数は、Expressを書くうえで最も頻繁に触れるものです。ここでは役割のイメージだけ掴んでおけば十分です。
      </p>

      <ul>
        <li>
          リクエスト … <Term>クライアントから届いた情報</Term>。パラメータ・クエリ・本文・ヘッダーを読み取る側
        </li>
        <li>
          レスポンス … <Term>クライアントへ返す応答</Term>。本文やステータスコードを組み立てて送り返す側
        </li>
      </ul>

      <p>
        上の例では文字列を返しましたが、APIでは代わりにJSONを返すのが定番です。読み取れるものは<Link href="/backend/express-request">Requestオブジェクト</Link>、返せるものは<Link href="/backend/express-response">Responseオブジェクト</Link>で詳しく扱います。
      </p>

      <Aside label="開発中の再起動">
        変更のたびに手で止めて起動し直すのは面倒です。ファイルの変更を検知して自動で再起動する仕組みがあり、Node.js自身にもその機能があります。ここでは「そういう手段がある」とだけ覚えておけば十分です。
      </Aside>

      <Analogy label="💡 たとえるなら">
        開店の準備に似ています。アプリを作るのは「店舗を1つ借りる」こと、ルートやミドルウェアの登録は「メニューを決め、入口の受付ルールを敷く」こと。そして待ち受けの開始は「暖簾を出して営業開始」の合図です。<Term>暖簾を出す前にメニューを整えておく</Term>のが自然な順番で、そして客が来るたびに料理を作るのが、ハンドラの中身にあたります。
      </Analogy>

      <Heading num="まとめ">3ステップで動き出す</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>アプリを作る</h4>
          <p>ルートとミドルウェアを束ねる司令塔を1つ用意する。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>応答を登録する</h4>
          <p>パスと処理を結びつける。この時点では、まだ中身は動かない。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>最後に待ち受ける</h4>
          <p>登録をすべて済ませてから起動する。以後、ハンドラだけが毎回動く。</p>
        </Card>
      </CardGrid>

      <p>
        最小のサーバーが動いたら、次は応え方を増やしていきます。<Link href="/backend/express-routing">ルーティング</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/express-hello" />
    </DocsPage>
  );
}
