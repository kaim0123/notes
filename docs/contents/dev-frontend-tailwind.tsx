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
  title: "Tailwind CSS",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク・ライブラリ</Eyebrow>
        <h1>Tailwind CSS ― クラス名だけでスタイルを組み立てる</h1>
        <Lead>
          React・Next.jsがフレームワーク(主導権を渡す道具)だったのに対し、<Term>Tailwind CSS</Term>はあなたのコードから呼び出して使う<Term>ライブラリ</Term>です。フレームワークが決めた型の中で、見た目を作るための代表的な部品として、Tailwind CSSと、その上に成り立つ<Term>shadcn/ui</Term>を見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">ユーティリティファーストという発想</Heading>
      <p>「Web基礎」の「<Link href="/dev/frontend/web-basics">CSSの書き方</Link>」で見たように、通常CSSは<code>.card {"{"} color: white; padding: 16px; {"}"}</code>のように、要素とスタイルを別ファイルに分けて記述します。プロジェクトが大きくなると、この方式には「同じような見た目の微妙に違うクラスが増え続ける」「あるクラスがどこで使われているか追いにくい」といった課題が出てきます。</p>
      <p>Tailwind CSSは、これらの課題に対し<Term>ユーティリティファースト</Term>という逆のアプローチを取ります。<code>p-4</code>(padding)、<code>text-white</code>(文字色)のように、1つの役割だけを持つ小さなクラスを大量に用意しておき、HTML側でそれらを組み合わせてスタイルを直接指定します。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>書き方</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">従来のCSS</td><td>意味のあるクラス名を考えて、別ファイルにスタイルを書く</td><td>命名に悩む、ファイル間の行き来が発生する</td></tr>
          <tr><td className="hl">Tailwind CSS</td><td><code>class=&quot;p-4 text-white bg-slate-800 rounded-lg&quot;</code></td><td>命名不要、HTMLを見るだけでスタイルがわかる</td></tr>
        </tbody>
      </table>

      <Heading num="02">トレードオフ ― 一貫性とマークアップの肥大化</Heading>
      <p>クラス名を考える手間や、CSSファイルとHTMLファイルを往復する手間が減る一方、HTML側のクラス指定は長くなりがちです。この特性から「見た目に一貫性を持たせやすいが、見た目の情報がマークアップに混ざる」というトレードオフを持つ設計として知られています。用意されているユーティリティクラスは、余白や色のスケールがあらかじめ決まった数値の中から選ぶ形になっているため、プロジェクト全体でデザインの数値がばらけにくいという副次的な利点もあります。</p>

      <Heading num="03">shadcn/ui ― コピーして「自分のコードにする」コンポーネント集</Heading>
      <p><Term>shadcn/ui</Term>は、ボタンやダイアログといったUI部品をあらかじめ用意した<Term>コンポーネントライブラリ</Term>ですが、一般的なライブラリとは配布の方法が根本的に異なります。通常のライブラリは<code>npm install</code>で外部の依存パッケージとして取り込みますが、shadcn/uiは専用のコマンドでコンポーネントの<strong>ソースコードそのもの</strong>を自分のプロジェクトにコピーします。</p>
      <Aside label="仕組み">
        内部では<Term>Radix UI</Term>(アクセシビリティに配慮した、見た目を持たない挙動だけのコンポーネント)と、このページで見たTailwind CSSを組み合わせてコンポーネントが実装されています。
      </Aside>
      <p>コピーされたコードは自分のリポジトリの一部になるため、依存パッケージのバージョンアップを待たずに、ボタンの角丸や余白を直接編集して自由にカスタマイズできます。「ライブラリを依存として持つ」のではなく「ライブラリの初期実装を譲り受けて自分で保守する」という、比較的新しい配布の考え方です。</p>

      <Analogy label="💡 たとえるなら">
        従来のCSSが「オーダーメイドで服を仕立てる」ことだとすれば、Tailwind CSSは「規格化されたパーツ(ユーティリティ)を組み合わせて服を作る」ことに近いです。そしてshadcn/uiは、既製品を「買う」のではなく、型紙を渡されて「自分の裁縫箱に加える」ようなもの。手元に来た後は、自分の好きなように仕立て直せます。
      </Analogy>

      <Heading num="まとめ">部品は自分のコードから呼び出す</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Tailwind CSSはユーティリティファースト</h4><p>小さな役割のクラスをHTML側で組み合わせ、命名の手間を減らします。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>一貫性と引き換えにマークアップが長くなる</h4><p>数値スケールが決まっている分デザインはぶれにくいが、クラス指定は長くなりがち。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>shadcn/uiはコピーして所有する</h4><p>依存パッケージではなくソースコードとして取り込み、自由に編集できます。</p></Card>
      </CardGrid>
      <p>ここまでで、コードを書き実行するための基本的な道具立て ― HTML/CSS・JavaScript/TypeScript・実行環境・フレームワーク・ライブラリ ― が一通り揃いました。次は「<Link href="/database/basics">データベース</Link>」で、これらを使って作ったアプリのデータをどう構造化して保存するか、リレーショナルデータベースの基礎を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/frontend/framework" tag="開発">フレームワーク・ライブラリ概要</RelatedLink>
                    <RelatedLink href="/dev/frontend/nextjs" tag="開発">Next.js</RelatedLink>
                    <RelatedLink href="/dev/frontend/web-basics" tag="開発">Web基礎</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
