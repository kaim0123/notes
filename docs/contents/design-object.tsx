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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "オブジェクトの全体像",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>オブジェクトの全体像 ― データの入れ物なのか、概念のインスタンスなのか</h1>
        <Lead>
          「<Link href="/dev/language-basics">プログラミング言語の仕組み</Link>」ではJavaScriptの<code>{"{ }"}</code>を、「<Link href="/design/paradigm/oop">オブジェクト指向</Link>」では設計思想としてのオブジェクトを、「<Link href="/network/applications/web">Webの仕組み</Link>」ではDOMオブジェクトを、それぞれ見てきました。「オブジェクト」は同じ単語なのに、指しているものの抽象度がまったく違います。3つの意味の関係を整理します。
        </Lead>
      </Hero>

      <Heading num="01">共通点は「名前と値の集まりで何かを表す」ことだけ</Heading>
      <p>3つの意味に共通するのは、<strong>複数のデータをひとまとめにして、1つのモノとして扱う</strong>というごく緩い性質だけです。何をまとめるか、なぜまとめるかは、意味によって大きく異なります。</p>

      <Heading num="02">意味1: データ構造としてのオブジェクト(JavaScriptの{"{ }"})</Heading>
      <p>「<Link href="/dev/language-basics">プログラミング言語の仕組み</Link>」で扱ったJavaScriptの<code>{"{ name: \"a\" }"}</code>のようなオブジェクトは、キーと値を対応させて保存する<Term>連想配列(辞書)</Term>としての役割にすぎません。クラスも継承も必要とせず、その場で作って使い捨てにもできます。</p>

      <Heading num="03">意味2: オブジェクト指向の「オブジェクト」</Heading>
      <p>「<Link href="/design/paradigm/oop">オブジェクト指向</Link>」における「オブジェクト」は、<Term>クラス</Term>から作られる<Term>インスタンス</Term>で、データ(状態)とそれを操作する処理(振る舞い)を1つにまとめて<Term>カプセル化</Term>したもの、という設計思想を指します。単なる入れ物ではなく、「自分の状態を自分で管理する」という考え方そのものが主役です。</p>
      <p>ここが混乱しやすい点です。JavaScriptの<code>{"{ }"}</code>はオブジェクト指向のオブジェクトを作るための手段の1つにすぎず、<code>class</code>構文を使わなくても<code>{"{ }"}</code>だけでオブジェクトは作れます。つまり「JSのオブジェクト」という枠のほうが、「オブジェクト指向のオブジェクト」という考え方より広く、後者は前者を使った1つの流儀にすぎません。</p>

      <Heading num="04">意味3: DOMオブジェクト</Heading>
      <p>「<Link href="/network/applications/web">Webの仕組み</Link>」で見た通り、ブラウザは表示中のHTMLを<Term>DOM</Term>というオブジェクトの集まりとしてJavaScriptに公開します。<code>document.getElementById(...)</code>が返す値は、「HTMLのある要素」を表すために、ブラウザがあらかじめ用意している専用のオブジェクトです。これは意味2の「カプセル化」という設計思想を、ブラウザというソフトウェアが具体的に実装した一例と言えます。</p>

      <Diagram caption="3つの意味は「データ構造」を土台に、意味の重なる部分と独立した部分がある">
        <svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
          <rect x={40} y={30} width={560} height={160} rx="12" fill="none" stroke="#5f5f5f" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={60} y={55} fill="#9a9a9a" fontSize="12">意味1: データ構造としてのオブジェクト(JSの{"{ }"})</text>

          <rect x={80} y={70} width={480} height={100} rx="10" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={100} y={92} fill="#f2f2f2" fontSize="12">意味2: オブジェクト指向のオブジェクト</text>
          <text x={100} y={108} fill="#9a9a9a" fontSize="10">(状態+振る舞いのカプセル化という設計思想)</text>

          <rect x={130} y={120} width={260} height={38} rx="8" fill="none" stroke="#ff9a4d" strokeWidth="1.5" />
          <text x={260} y={144} fill="#f2f2f2" fontSize="11" textAnchor="middle">意味3: DOMオブジェクト(ブラウザの実装例)</text>

          <text x={320} y={205} fill="#9a9a9a" fontSize="11" textAnchor="middle">外側ほど広い概念、内側ほど具体的な実例</text>
        </svg>
      </Diagram>

      <Analogy label="💡 たとえるなら">
        「オブジェクト」は日本語の「もの」と同じくらい抽象的な言葉です。文房具屋で「もの(商品)」と言うときと、美術館で「もの(作品)」と言うときとで、指している対象の性質がまったく違うように、「オブジェクト」も文脈でしか意味が定まりません。データの入れ物の話をしているのか、設計思想の話をしているのか、ブラウザが用意した specific な部品の話をしているのかを、まず区別しましょう。
      </Analogy>

      <Aside label="豆知識">
        「<Link href="/design/paradigm/oop">オブジェクト指向</Link>」ページで扱う<Term>クラス</Term>・<Term>継承</Term>・<Term>ポリモーフィズム</Term>は、すべて意味2(設計思想としてのオブジェクト)の話です。意味1(データ構造)の話をしているときにこれらの単語が出てこないのは、単に話の抽象度が違うためです。
      </Aside>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>データ構造としてのオブジェクト</h4><p>キーと値の入れ物。クラスと無関係に、その場で作れる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>設計思想としてのオブジェクト</h4><p>状態と振る舞いをカプセル化するという、オブジェクト指向の考え方そのもの。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>DOMオブジェクトは実例の1つ</h4><p>ブラウザがHTML要素を表現するために用意した、具体的なオブジェクトの実装例。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/language-basics" tag="開発">プログラミング言語の仕組み</RelatedLink>
                    <RelatedLink href="/design/paradigm/oop" tag="設計">オブジェクト指向</RelatedLink>
                    <RelatedLink href="/network/applications/web" tag="インターネット">Webの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
