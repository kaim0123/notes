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
  title: "型システム",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; 言語</Eyebrow>
        <h1>型システム ― 実行する前に間違いを見つける</h1>
        <Lead>
          型は「変数に何を入れられるか」のラベルではなく、<strong>プログラムについて実行せずに証明できる性質</strong>です。静的か動的かという分類はよく知られていますが、実際には強さ・推論・部分型・健全性といった複数の軸があり、その組み合わせが言語ごとの書き心地を決めています。
        </Lead>
      </Hero>

      <p>「<Link href="/dev/language-basics">プログラミング言語の仕組み</Link>」では静的型付けと動的型付けの違いを扱いました。ここではその先の軸を整理します。</p>

      <Heading num="01">4つの独立した軸</Heading>
      <table>
        <tbody>
          <tr><th>軸</th><th>問い</th><th>例</th></tr>
          <tr><td className="hl">静的 / 動的</td><td>型検査は<strong>いつ</strong>行われるか</td><td>静的: Java・TS / 動的: Python・JS</td></tr>
          <tr><td className="hl">強い / 弱い</td><td>型の違いを<strong>どれだけ厳しく</strong>扱うか</td><td>強い: Python・Rust / 弱い: C・JS</td></tr>
          <tr><td className="hl">明示 / 推論</td><td>型を<strong>人が書くか、機械が導くか</strong></td><td>明示: 古いJava / 推論: TS・Rust・Go</td></tr>
          <tr><td className="hl">公称 / 構造的</td><td>型の同一性を<strong>名前で見るか、形で見るか</strong></td><td>公称: Java・C# / 構造的: TypeScript</td></tr>
        </tbody>
      </table>
      <p>この4つは独立です。「静的だから型注釈だらけ」ではありません ― Rustは静的かつ強い型で、しかも推論が強力なため注釈は最小限で済みます。</p>

      <Heading num="02">強い型・弱い型 ― 勝手に変換するか</Heading>
      <p>「強い/弱い」は厳密な定義がある用語ではありませんが、実務的には<strong>暗黙の型変換をどれだけ許すか</strong>を指します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// JavaScript(動的かつ弱い) ― 勝手に変換して答えを出してしまう
"5" - 2      // 3
"5" + 2      // "52"   ← + は文字列連結が優先される
[] + {}      // "[object Object]"

// Python(動的だが強い) ― 変換しないので即座にエラー
"5" - 2      # TypeError`}</code>
      </pre>
      <p>弱い型付けの危険は、<strong>エラーにならずに間違った値のまま進む</strong>点です。JavaScriptで <code>===</code>(厳密等価)が推奨されるのは、<code>==</code> が暗黙変換を伴い、直感に反する結果を生むためです。</p>

      <Heading num="03">型推論 ― 書かなくても分かる</Heading>
      <p><Term>型推論</Term>は、注釈が無くてもコンパイラが型を導く仕組みです。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`const users = ["a", "b"];        // string[] と推論される
const first = users[0];          // string
const lengths = users.map((u) => u.length);   // number[]  ← 引数の型も追跡される`}</code>
      </pre>
      <p>推論があると「静的型付けは冗長」という欠点が大きく薄まります。実務の指針は、<strong>境界には明示し、内部は推論に任せる</strong>ことです ― 関数の引数と戻り値、公開APIの型は書き、ローカル変数は書かない。境界に書いておくと、実装を変えたときに<strong>意図しない型の変化がエラーとして現れます</strong>。</p>

      <Heading num="04">公称型と構造的型</Heading>
      <table>
        <tbody>
          <tr><th></th><th>公称型(nominal)</th><th>構造的型(structural)</th></tr>
          <tr><td className="hl">同じ型とみなす条件</td><td><strong>名前が同じ</strong>(明示的に継承・実装)</td><td><strong>形が同じ</strong>(必要な要素が揃っている)</td></tr>
          <tr><td className="hl">利点</td><td>意図しない一致が起きない</td><td>宣言なしに組み合わせられる。柔軟</td></tr>
          <tr><td className="hl">欠点</td><td>宣言が増える</td><td><strong>偶然の一致</strong>が通ってしまう</td></tr>
        </tbody>
      </table>
      <p>TypeScriptは構造的型なので、<code>UserId</code> と <code>OrderId</code> を両方 <code>string</code> の別名にすると<strong>相互に代入できてしまいます</strong>。取り違えを型で防ぎたいときは、ブランド型(識別用の目印を型に混ぜる)などの工夫で公称型に近づけます。</p>
      <Analogy label="💡 たとえるなら">
        公称型は「社員証を持っているか」で判断する入館審査、構造的型は「スーツを着てIDカードらしきものを提げているか」で判断する審査です。後者は柔軟ですが、条件を満たす無関係な人も通ってしまいます。
      </Analogy>

      <Heading num="05">多相 ― 1つの実装を多くの型で使う</Heading>
      <p>同じロジックを型ごとに書き直さずに済ませる仕組みが<Term>多相(ポリモーフィズム)</Term>です。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>パラメータ多相</h4><p>ジェネリクス。<code>Array&lt;T&gt;</code> のように型を引数として受け取る。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>部分型多相</h4><p>継承やインタフェース。「Aを期待する場所にAの一種を渡せる」。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>アドホック多相</h4><p>オーバーロードや型クラス。型ごとに異なる実装を選ぶ。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>ダックタイピング</h4><p>動的型付けでの多相。「その操作ができれば何でもよい」。</p></Card>
      </CardGrid>
      <p>ジェネリクスの実装方式には、型ごとに専用コードを生成する<strong>単相化</strong>(Rust・C++。速いがコード量が増える)と、型情報を消して共通コードを使う<strong>型消去</strong>(Java・TypeScript。軽いが実行時に型が分からない)があります。TypeScriptの型が実行時に存在しないのは後者だからです。</p>

      <Heading num="06">健全性 ― 型検査はどこまで信用できるか</Heading>
      <p>型システムが<Term>健全(sound)</Term>であるとは、「型検査を通ったプログラムは、その種の実行時エラーを起こさない」ことを意味します。実際には、多くの言語が実用性のために健全性を部分的に犠牲にしています。</p>
      <table>
        <tbody>
          <tr><th>穴</th><th>内容</th></tr>
          <tr><td className="hl">型アサーション</td><td><code>as</code> や キャストで、検査を人が上書きする</td></tr>
          <tr><td className="hl">any / dynamic</td><td>検査対象から外れる。1か所の <code>any</code> が周囲へ伝染する</td></tr>
          <tr><td className="hl">外部データ</td><td>APIレスポンスやJSONは<strong>実行時の実際の値と型注釈が一致する保証がない</strong></td></tr>
          <tr><td className="hl">配列の共変性</td><td>一部の言語では、型として正しくても実行時に例外になりうる</td></tr>
        </tbody>
      </table>
      <Aside label="境界では実行時検証が必要">
        <code>const user = await res.json() as User</code> は、<strong>何も検査していません</strong>。外部から入ってくる値は、スキーマ検証ライブラリなどで<strong>実行時に確かめてから</strong>型を名乗らせます。型システムが守ってくれるのは「自分たちのコードの内側」だけです(「<Link href="/dev/backend/express/validation">バリデーション</Link>」)。
      </Aside>

      <Heading num="07">Nullの扱い ― 10億ドルの誤り</Heading>
      <p>「どの型の値にもnullが入りうる」という設計は、考案者自身が「10億ドルの誤り」と呼んだほど多くの障害を生みました。現代の言語は、これを型で表現します。</p>
      <table>
        <tbody>
          <tr><th>方式</th><th>言語</th><th>扱い</th></tr>
          <tr><td className="hl">Nullable型を分ける</td><td>TypeScript(strict)・Kotlin・C#</td><td><code>string | null</code> は <code>string</code> と別の型。使う前に絞り込みが必要</td></tr>
          <tr><td className="hl">Option / Maybe型</td><td>Rust・Haskell・Scala</td><td>「値が無いかもしれない」を包む型にする。取り出しに処理を強制する</td></tr>
          <tr><td className="hl">ゼロ値</td><td>Go</td><td>nilは存在するが、多値返却でエラーを明示する文化がある</td></tr>
        </tbody>
      </table>
      <p>いずれも狙いは同じです ― <strong>「無いかもしれない」を型に書き、対処し忘れをコンパイルエラーにする</strong>こと。関数型言語での扱いは「<Link href="/design/paradigm/functional/safety">安全に分岐する</Link>」でも扱っています。</p>

      <Heading num="08">型を増やすべきか、減らすべきか</Heading>
      <p>型注釈は「多いほど良い」わけではありません。判断の目安は次の通りです。</p>
      <table>
        <tbody>
          <tr><th>状況</th><th>方針</th></tr>
          <tr><td className="hl">公開API・モジュール境界</td><td>明示する。仕様書としての価値がある</td></tr>
          <tr><td className="hl">ローカル変数</td><td>推論に任せる。書くと変更時の修正箇所が増えるだけ</td></tr>
          <tr><td className="hl">取り違えたら事故になる値</td><td>専用の型を作る(金額・ID・単位)。<code>string</code> のままにしない</td></tr>
          <tr><td className="hl">複雑すぎる型</td><td>読めない型定義は負債。実行時検証や単純な設計に置き換える</td></tr>
          <tr><td className="hl">試作・調査コード</td><td>緩くてよい。すべてを厳密にする必要はない</td></tr>
        </tbody>
      </table>
      <p>型の本質的な価値は「エラーを防ぐこと」以上に、<strong>設計を強制すること</strong>にあります。ありえない状態を型として表現できなくすれば、その状態を扱うコードもテストも不要になります。</p>

      <Heading num="まとめ">型は実行前に取れる保証</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>軸は複数ある</h4><p>静的/動的だけでなく、強さ・推論・公称/構造的の組み合わせで性格が決まる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>境界は実行時に検証</h4><p>外部データに型注釈を付けるだけでは何も保証されない。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ありえない状態を作れなくする</h4><p>型の最大の効用は、設計上の誤りを表現不能にすること。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/language/types" tag="実装">4. 型を使いこなす</RelatedLink>
            <RelatedLink href="/dev/language-basics/compile" tag="実装">コンパイルとリンク</RelatedLink>
            <RelatedLink href="/design/paradigm/functional/safety" tag="設計">安全に分岐する</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
