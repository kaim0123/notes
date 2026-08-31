import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "Next.js" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>Next.js ― 「どこで動くか」を選べるようにする</h1>
        <Lead>
          <Link href="/frontend/react">React</Link>が決めているのは、コンポーネントの中身をどう書くかだけです。どのURLに割り当てるか、HTMLをいつどこで組み立てるか、取得したデータをどう保つか ― Next.jsはそこを型として引き受けます。中心にあるのは1つの考え方で、<Term>静的か動的かをページ単位ではなくコンポーネント単位で決める</Term>ことです。
        </Lead>
      </Hero>

      <Heading num="01">Reactの上に何を足すのか</Heading>
      <table>
        <thead>
          <tr><th>領域</th><th>Reactが決めること</th><th>Next.jsが足すこと</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">画面の中身</td><td>コンポーネントとして書く</td><td>―</td></tr>
          <tr><td className="hl">URL</td><td>決めない</td><td>ディレクトリ構造がそのままURLになる</td></tr>
          <tr><td className="hl">実行場所</td><td>決めない</td><td>既定はサーバー。必要な部分だけブラウザへ</td></tr>
          <tr><td className="hl">データ取得</td><td>決めない</td><td>サーバー側で直接取得し、キャッシュを宣言する</td></tr>
          <tr><td className="hl">配信</td><td>決めない</td><td>準備できた部分から順に送る</td></tr>
          <tr><td className="hl">ビルド</td><td>決めない</td><td>設定なしで一式が組み上がる</td></tr>
        </tbody>
      </table>

      <p>
        Reactを拡張する立場にあることから<Term>メタフレームワーク</Term>と呼ばれます。<Link href="/frontend/react">制御の反転</Link>の観点で言えば、Reactよりさらに強く主導権を握る側にあり、そのぶん<Term>合わないと分かったときの代償も大きい</Term>選択になります。
      </p>

      <Heading num="02">コードが動く3つの場所</Heading>
      <p>
        Next.jsを理解する鍵は、書いたコードが<Term>いつ・どこで動くか</Term>が1つではないと知ることです。
      </p>

      <DiagramFrame
        slug="frontend-nextjs-where"
        aspect="640 / 300"
        caption="Next.jsで書いたコードが動く3つの場所を示した図。左がビルド時で、あらかじめ生成できる部分はここで組み立てられ、静的な殻として保存される。中央がリクエスト時のサーバーで、利用者ごとに変わる部分や最新のデータが要る部分はここで実行される。右がブラウザで、クリックや入力といった操作に反応する部分だけがここで動く。1つのページの中でこの3つが混在するのが特徴で、ページ単位ではなくコンポーネント単位で境界が引かれる。同じコンポーネントの記述が、置かれ方によって違う場所で動く。"
      />

      <table>
        <thead>
          <tr><th>場所</th><th>ここで動くもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ビルド時</td><td>あらかじめ生成できる部分。結果は静的な殻として保存される</td></tr>
          <tr><td className="hl">リクエスト時のサーバー</td><td>利用者ごとに変わる部分、最新のデータが要る部分</td></tr>
          <tr><td className="hl">ブラウザ</td><td>クリック・入力・ブラウザ固有のAPIに触る部分</td></tr>
        </tbody>
      </table>

      <p>
        重要なのは、この3つが<Term>1つのページの中で混在する</Term>ことです。「このページは静的、あのページは動的」という単位ではなく、<Term>1ページの中の静的な部分と動的な部分</Term>を分けます。この考え方が、以降のすべての機能の土台になります。
      </p>

      <Heading num="03">ディレクトリがそのまま仕様になる</Heading>
      <p>
        フォルダを掘ればURLが生え、決められた名前のファイルを置けば役割が決まります。ルーティング表というファイルは存在しません。
      </p>
      <p>
        利点は、<Term>台帳と現物がずれない</Term>ことです。設定ファイルにルートを列挙する方式では、消したページの記述が残ったり、追加を忘れたりします。裏返しに、「どのURLが存在するか」を一覧する手段がディレクトリツリーしかなくなります。詳細は<Link href="/frontend/nextjs-routing">ルーティングとレイアウト</Link>で扱います。
      </p>

      <Heading num="04">既定はサーバー</Heading>
      <p>
        コンポーネントは<Term>既定でサーバー側だけで実行されます</Term>。データベースに直接触れ、鍵を持ち、そしてそのコードは<Term>ブラウザに1バイトも送られません</Term>。
      </p>
      <p>
        操作に反応する部分だけを明示的にブラウザ側へ回します。この境界の引き方が、Next.jsで最も設計判断を要する部分です ― <Link href="/frontend/nextjs-components">Server/Clientコンポーネントの境界</Link>で扱います。
      </p>

      <Aside label="このサイトの場合">
        いま読んでいるこのサイトは、Next.jsを<Term>静的書き出し</Term>の設定で使っています。全ページをビルド時に生成し、出来上がったファイルだけを配信する形です。サーバーは動きません。「Next.jsを使う = サーバーが要る」ではなく、<Term>どこまでを使うかを選べる</Term>ということでもあります。
      </Aside>

      <Heading num="05">キャッシュは宣言するもの</Heading>
      <p>
        かつては「取得の仕方によって自動的にキャッシュされる」設計でしたが、いまは逆です。<Term>明示的に宣言したものだけがキャッシュされます</Term>。
      </p>
      <p>
        暗黙のキャッシュは、効いているときは快適でも、効いていないときに理由が分かりません。宣言する方式なら、キャッシュされているかどうかがコードを見れば分かります。この転換の中身は<Link href="/frontend/nextjs-data">データフェッチ・キャッシュ・再検証</Link>で扱います。
      </p>

      <Analogy label="💡 たとえるなら">
        Reactがレンガなら、Next.jsは区画も上下水道も整備された宅地です。基礎から考えずに家を建て始められますが、区画の切り方そのものは変えられません。そして最近の宅地は「敷地全体を先に造成するか、来客時に組み立てるか」を<strong>部屋ごとに</strong>選べるようになりました ― これがコンポーネント単位の境界という発想です。
      </Analogy>

      <Heading num="まとめ">境界を細かく引けるようにした</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>Reactが決めない部分を引き受ける</h4>
          <p>URL・実行場所・データ取得・配信・ビルド。そのぶん主導権も強い。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>静的と動的はページ単位ではない</h4>
          <p>1ページの中に、ビルド時・リクエスト時・ブラウザが混在する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>既定はサーバー、キャッシュは宣言</h4>
          <p>送らないことが基本。効いているかどうかがコードから読める。</p>
        </Card>
      </CardGrid>

      <p>
        まずは全体の骨組みから ― <Link href="/frontend/nextjs-routing">ルーティングとレイアウト</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/nextjs" />
    </DocsPage>
  );
}
