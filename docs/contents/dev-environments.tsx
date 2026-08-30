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
  title: "環境の全体像",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>環境の全体像 ― 「どこで」動いているかを表す、便利すぎる言葉</h1>
        <Lead>
          「<Link href="/dev/workspace">開発環境</Link>」で見たのは、自分のPC上でターミナル・シェルを使って作業するための一式でした。しかし「環境」という言葉は、プログラムが動く土台そのものや、公開の段階、さらには設定値の集まりまで、もっと広い意味でも使われます。
        </Lead>
      </Hero>

      <Heading num="01">共通点 ― 「同じコードでも、置かれた場所次第で振る舞いが変わる」</Heading>
      <p>4つの意味に共通するのは、<strong>コードそのものは変えず、それを取り巻く条件だけが変わる</strong>という発想です。何が「取り巻く条件」なのかは、意味によって大きく異なります。</p>

      <Heading num="02">意味1: 開発環境 ― 自分の手元で作業するための一式</Heading>
      <p>「<Link href="/dev/workspace">開発環境</Link>」で扱った意味です。エディタ・ターミナル・シェルなど、自分のPC上でコードを書き、動作確認をするための道具一式を指します。</p>

      <Heading num="03">意味2: 実行環境(ランタイム環境) ― プログラムが実際に動く土台</Heading>
      <p>「<Link href="/dev/runtime">ランタイム</Link>」で見た通り、同じJavaScript/TypeScriptのコードでも、ブラウザ・Node.js・Deno・Bunのどこで動かすかによって使える機能や前提が変わります。「<Link href="/os">OSの仕組み</Link>」で見たOSも、アプリケーションが動作するための土台という意味で実行環境の一種です。「同じ日本語を話せても、日本とアメリカでは通貨や交通ルールが違う」という<Link href="/dev/runtime">ランタイム</Link>のたとえは、そのままこの意味の「環境」にも当てはまります。</p>

      <Heading num="04">意味3: デプロイ環境の「ステージ」 ― 開発・検証・本番という段階</Heading>
      <p>同じアプリケーションを、影響範囲の小さい場所から順番に確認しながら公開していく考え方があります。手元だけで動く<Term>開発環境(dev)</Term>、本番に近い条件でチームが確認する<Term>検証環境(staging)</Term>、実際の利用者が使う<Term>本番環境(production)</Term>という3段階に分けるのが代表的です。それぞれ同じコードを動かしていても、接続するデータベースや公開範囲が異なります。この段階分け自体の具体的な進め方は、今後「運用・プロセス」カテゴリで扱う予定です。</p>

      <Heading num="05">意味4: 環境変数 ― プログラムの外から渡す設定値</Heading>
      <p><Term>環境変数(Environment Variables)</Term>は、OSやランタイムがプログラムに外から渡す、名前と値の組のことです。<code>PATH</code>(コマンドを探す場所の一覧)のように、意味3で見た「開発・検証・本番」を切り替える際にも、接続先のURLやAPIキーを環境変数として渡すのが一般的です。同じ「環境」という単語が、ここでは「設定値の集まり」という、意味1〜3ともまた違う対象を指している点に注意してください。<code>.env</code>ファイルへの書き方や<code>.gitignore</code>での管理方法は、次のページ「<Link href="/dev/dotenv">.envと.gitignore</Link>」で詳しく扱います。</p>

      <Analogy label="💡 たとえるなら">
        「環境」を舞台に例えると、開発環境は「リハーサル室」、実行環境は「劇場そのものの設備(照明・音響)」、デプロイ環境のステージは「リハーサル→通し稽古→本番」という進行の段階、環境変数は「本番ごとに貼り替える小道具の配置メモ」にあたります。同じ台本(コード)でも、どの場所・どの段階・どの設定で演じるかによって、見え方が変わります。
      </Analogy>

      <Aside label="豆知識">
        「環境構築」という言葉が指すのは、たいてい意味1(開発環境)です。一方「本番環境で障害が起きた」は意味3、「環境変数が設定されていない」は意味4を指します。動詞や文脈を見れば、多くの場合どの意味かはすぐに絞り込めます。
      </Aside>

      <Heading num="まとめ">覚えておきたい4つのポイント</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>開発環境</h4><p>自分のPC上で作業するための道具一式。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>実行環境(ランタイム)</h4><p>プログラムが実際に動く土台。ブラウザ・Node.jsなど。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>デプロイ環境のステージ</h4><p>開発・検証・本番という、公開に向けた段階の区分。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>環境変数</h4><p>プログラムの外から渡す、名前と値の組の設定値。</p></Card>
      </CardGrid>
      <p>これで「開発基盤」カテゴリは一通り完結です。ターミナル・シェルの使い方から、npm・pnpm・Viteによるパッケージ管理とビルド、そして「環境」という言葉の整理まで、実際にコードを書き始める土台が整いました。次のカテゴリ「実装」では、JavaScript・TypeScriptといった言語そのものや、React・Next.jsといったフレームワークを見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/workspace" tag="開発">開発環境</RelatedLink>
                    <RelatedLink href="/dev/dotenv" tag="開発">.envと.gitignore</RelatedLink>
                    <RelatedLink href="/dev/runtime" tag="開発">ランタイム</RelatedLink>
                    <RelatedLink href="/os" tag="OS">OSの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
