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
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "オブジェクトという言葉の3つの意味",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>オブジェクトという言葉の3つの意味</h1>
        <Lead>
          JavaScriptの<code>{"{ }"}</code>も、設計思想としてのオブジェクトも、ブラウザが返すDOMも、すべて「オブジェクト」と呼ばれます。同じ単語なのに指しているものの抽象度がまったく違うため、話が噛み合わなくなる原因になりがちです。3つの意味の関係を整理します。
        </Lead>
      </Hero>

      <Heading num="01">共通点は「まとめて1つのモノとして扱う」ことだけ</Heading>
      <p>
        3つの意味に共通するのは、<Term>複数のデータをひとまとめにして1つのモノとして扱う</Term>という、ごく緩い性質だけです。何をまとめるか、なぜまとめるかは、意味によって大きく異なります。
      </p>

      <DiagramFrame
        slug="design-paradigm-oop-object-meanings"
        aspect="660 / 260"
        caption="オブジェクトという言葉の3つの意味を入れ子で示した図。最も外側がデータ構造としてのオブジェクト(キーと値の入れ物)、その内側がオブジェクト指向のオブジェクト(状態と振る舞いをカプセル化する設計思想)、さらに内側がDOMオブジェクト(ブラウザによる具体的な実装例)。外側ほど広い概念、内側ほど具体的な実例になる。"
      />

      <Heading num="02">意味1 ― データ構造としてのオブジェクト</Heading>
      <p>
        JavaScriptの<code>{'{ name: "a" }'}</code>のようなオブジェクトは、キーと値を対応させて保存する<Term>連想配列(辞書)</Term>としての役割にすぎません。クラスも継承も必要とせず、その場で作って使い捨てにもできます。
      </p>

      <Heading num="03">意味2 ― オブジェクト指向のオブジェクト</Heading>
      <p>
        <Link href="/design/paradigm-oop">オブジェクト指向</Link>における「オブジェクト」は、<Term>クラス</Term>から作られる<Term>インスタンス</Term>で、データ(状態)とそれを操作する処理(振る舞い)を1つにまとめて<Term>カプセル化</Term>したもの、という設計思想を指します。単なる入れ物ではなく、「自分の状態を自分で管理する」という考え方そのものが主役です。
      </p>
      <p>
        混乱しやすいのはここです。JavaScriptの<code>{"{ }"}</code>はオブジェクト指向のオブジェクトを作る手段の1つにすぎず、<code>class</code>構文を使わなくてもオブジェクトは作れます。つまり「JSのオブジェクト」という枠のほうが「オブジェクト指向のオブジェクト」という考え方より広く、後者は前者を使った1つの流儀にすぎません。
      </p>

      <Heading num="04">意味3 ― DOMオブジェクト</Heading>
      <p>
        ブラウザは、表示中のHTMLを<Term>DOM</Term>というオブジェクトの集まりとしてJavaScriptに公開します。<code>document.getElementById(...)</code>が返す値は、HTMLのある要素を表すためにブラウザがあらかじめ用意している専用のオブジェクトです。これは意味2のカプセル化という設計思想を、ブラウザというソフトウェアが具体的に実装した一例と言えます。
      </p>

      <Analogy label="💡 たとえるなら">
        「オブジェクト」は日本語の「もの」と同じくらい抽象的な言葉です。文房具屋で言う「もの(商品)」と、美術館で言う「もの(作品)」とで指す対象の性質がまったく違うように、オブジェクトも文脈でしか意味が定まりません。データの入れ物の話なのか、設計思想の話なのか、ブラウザが用意した具体的な部品の話なのかを、まず区別します。
      </Analogy>

      <Aside label="補足">
        <Link href="/design/paradigm-oop">オブジェクト指向</Link>で扱うクラス・継承・ポリモーフィズムは、すべて意味2(設計思想としてのオブジェクト)の話です。意味1(データ構造)の話をしているときにこれらの単語が出てこないのは、単に話の抽象度が違うためです。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>データ構造としての意味</h4>
          <p>キーと値の入れ物。クラスと無関係に、その場で作れる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>設計思想としての意味</h4>
          <p>状態と振る舞いをカプセル化するという、オブジェクト指向の考え方そのもの。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>DOMは実例の1つ</h4>
          <p>ブラウザがHTML要素を表現するために用意した、具体的な実装例。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/design/paradigm-oop-object" />
    </DocsPage>
  );
}
