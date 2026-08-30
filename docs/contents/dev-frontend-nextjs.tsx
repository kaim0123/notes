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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Next.js",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク・ライブラリ</Eyebrow>
        <h1>Next.js ― Reactを土台にしたフルスタックフレームワーク</h1>
        <Lead>
          前のページで見た通り、<Term>React</Term>はコンポーネント単位でUIを宣言的に組み立てる部分しか担いません。<Term>Next.js</Term>は、そのReactを土台に、ページ間の遷移・画面の組み立て場所・サーバー機能までを1つの型としてまとめた<Term>メタフレームワーク</Term>です。実はこのAtlas自体も、Next.jsの上に構築されています。
        </Lead>
      </Hero>

      <Heading num="01">メタフレームワークとは</Heading>
      <p>Reactは「コンポーネントの中身をどう書くか」を規定しますが、「そのコンポーネントをどのURLに割り当てるか」「HTMLをいつ・どこで組み立てるか」までは決めていません。これらをReactの上に追加で規定するのがNext.jsで、React自体を拡張する立場にあることから<Term>メタフレームワーク</Term>と呼ばれます。同種のものとして、Vue向けの<Term>Nuxt</Term>、Svelte向けの<Term>SvelteKit</Term>などがあります。</p>

      <Heading num="02">ファイルベースルーティング</Heading>
      <p>Next.jsは、フォルダ構成がそのままURLになる<Term>ファイルベースルーティング</Term>を採用しています。<code>app/dev/frontend/nextjs/page.tsx</code>というファイルを置けば、それだけで<code>/dev/frontend/nextjs</code>というURLが有効になり、ルーティング用の設定ファイルを別途書く必要がありません。フォルダを1段掘れば、そのままURLも1段深くなります。</p>

      <Heading num="03">レンダリング方式 ― HTMLをどこで組み立てるか</Heading>
      <p>Next.jsは、画面をどこで組み立てるかを選べる複数の<Term>レンダリング方式</Term>を提供します。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>HTMLが組み立てられる場所</th><th>向いている用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">CSR(クライアントサイドレンダリング)</td><td>ユーザーのブラウザ内で都度</td><td>ログイン後のダッシュボードなど、頻繁に変わる画面</td></tr>
          <tr><td className="hl">SSR(サーバーサイドレンダリング)</td><td>リクエストのたびにサーバー上で</td><td>最新データを都度反映したいページ</td></tr>
          <tr><td className="hl">SSG(静的サイト生成)</td><td>ビルド時にあらかじめサーバー上で</td><td>ブログ記事など、頻繁には変わらないページ</td></tr>
        </tbody>
      </table>
      <p>同じNext.jsアプリの中でも、ページごとにこの3方式を使い分けられます。「頻繁に変わらないページはビルド時に固めて配信し、ログイン後の画面だけブラウザ側で組み立てる」といった構成が、フォルダ構成をほとんど変えずに実現できます。</p>

      <Heading num="04">App RouterとServer Components</Heading>
      <p>比較的新しいNext.jsでは、<code>app</code>フォルダを使う<Term>App Router</Term>という仕組みの中で、既定でコンポーネントがサーバー側だけで実行される<Term>Server Components</Term>が採用されています。ブラウザに送るJavaScriptの量を減らせる一方、ブラウザ側の状態(クリックイベントなど)を扱いたい部分は明示的に<Term>Client Components</Term>として指定する必要があります。「サーバーで動く部分」と「ブラウザで動く部分」を、ファイル単位で切り替えられるのが特徴です。</p>

      <Analogy label="💡 たとえるなら">
        Reactが「レンガ」だとすれば、Next.jsは「そのレンガを使ってどこに何を建てるかまで決まっている宅地」です。区画(ルーティング)・上下水道(データ取得)・建築確認(ビルド)がすでに整備されているため、家(コンポーネント)の中身を建てることだけに集中できます。
      </Analogy>

      <Heading num="まとめ">Reactの上に、型としての骨組みを足す</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>メタフレームワークとしてReactを拡張</h4><p>ルーティング・レンダリング・サーバー機能という、Reactが規定しない部分を担う。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ファイルベースルーティング</h4><p>フォルダ構成がそのままURL構成になり、設定ファイルが不要。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ページごとにレンダリング方式を選べる</h4><p>CSR・SSR・SSGを使い分け、Server Componentsでサーバー/ブラウザの実行範囲も切り替えられる。</p></Card>
      </CardGrid>
      <p>フレームワークが大枠の型を決めるのに対し、その中で使う個々の部品は自分で選んで組み込みます。次のページ「<Link href="/dev/frontend/tailwind">Tailwind CSS</Link>」では、Next.jsの中に組み込んで使うCSSライブラリを見ていきます。Server/Clientコンポーネントの境界の引き方、データフェッチ・キャッシュ、配信の最適化といった、より実践的なNext.jsパターンは<Link href="/dev/frontend/nextjs/components">Server/Clientコンポーネントの境界</Link>から扱います。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/frontend/nextjs/components" tag="開発">Server/Clientコンポーネントの境界</RelatedLink>
                    <RelatedLink href="/dev/frontend/framework" tag="開発">フレームワーク・ライブラリ概要</RelatedLink>
                    <RelatedLink href="/dev/frontend/react" tag="開発">React</RelatedLink>
                    <RelatedLink href="/dev/frontend/tailwind" tag="開発">Tailwind CSS</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
