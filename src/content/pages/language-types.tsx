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
  title: "型システム",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>型システム ― 実行する前に間違いを見つける</h1>
        <Lead>
          型は「変数に何を入れられるか」のラベルではなく、<Term>プログラムについて実行せずに証明できる性質</Term>です。静的か動的かという分類はよく知られていますが、実際には強さ・推論・部分型・健全性といった複数の軸があり、その組み合わせが言語ごとの書き心地を決めています。
        </Lead>
      </Hero>

      <p>
        <Link href="/language/basics">言語の仕組み</Link>では静的型付けと動的型付けの違いを扱いました。ここではその先の軸を整理します。
      </p>

      <Heading num="01">4つの独立した軸</Heading>

      <DiagramFrame
        slug="language-types-axes"
        aspect="640 / 300"
        caption="型システムを見る4つの独立した軸。①検査のタイミング(動的↔静的)、②暗黙変換をどれだけ許すか(弱い↔強い)、③型を誰が書くか(明示↔推論)、④同じ型とみなす条件(構造的↔公称)。4つは独立しているため、Rustは静的・強い・推論・公称、JavaScriptは動的・弱い・推論なし・構造的というように、言語ごとに組み合わせが変わる。"
      />

      <p>
        この4つは独立です。「静的だから型注釈だらけ」ではありません ―
        Rustは静的かつ強い型で、しかも推論が強力なため注釈は最小限で済みます。
      </p>

      <Heading num="02">強い型・弱い型 ― 勝手に変換するか</Heading>
      <p>
        「強い/弱い」は厳密な定義のある用語ではありませんが、実務的には<Term>暗黙の型変換をどれだけ許すか</Term>を指します。
      </p>

      <pre>
        <code>{`// JavaScript(動的かつ弱い) ― 勝手に変換して答えを出してしまう
"5" - 2      // 3
"5" + 2      // "52"   ← + は文字列連結が優先される
[] + {}      // "[object Object]"

// Python(動的だが強い) ― 変換しないので即座にエラー
"5" - 2      # TypeError`}</code>
      </pre>

      <p>
        弱い型付けの危険は、<Term>エラーにならずに間違った値のまま進む</Term>点です。JavaScriptで<code>===</code>(厳密等価)が推奨されるのは、<code>==</code>が暗黙変換を伴い、直感に反する結果を生むためです。
      </p>

      <Heading num="03">型推論 ― 書かなくても分かる</Heading>
      <p>
        <Term>型推論</Term>は、注釈が無くてもコンパイラが型を導く仕組みです。
      </p>

      <pre>
        <code>{`const users = ["a", "b"];                    // string[] と推論される
const first = users[0];                      // string
const lengths = users.map((u) => u.length);  // number[] ← 引数の型も追跡される`}</code>
      </pre>

      <p>
        推論があると「静的型付けは冗長」という欠点が大きく薄まります。実務の指針は<Term>境界には明示し、内部は推論に任せる</Term>ことです。関数の引数と戻り値、公開する型は書き、ローカル変数は書かない。境界に書いておくと、実装を変えたときに意図しない型の変化がエラーとして現れます。
      </p>

      <Heading num="04">公称型と構造的型</Heading>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>公称型(nominal)</th>
            <th>構造的型(structural)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">同じ型とみなす条件</td>
            <td>名前が同じ(明示的に継承・実装している)</td>
            <td>形が同じ(必要な要素が揃っている)</td>
          </tr>
          <tr>
            <td className="hl">利点</td>
            <td>意図しない一致が起きない</td>
            <td>宣言なしに組み合わせられる。柔軟</td>
          </tr>
          <tr>
            <td className="hl">欠点</td>
            <td>宣言が増える</td>
            <td>偶然の一致が通ってしまう</td>
          </tr>
        </tbody>
      </table>

      <p>
        TypeScriptは構造的型なので、<code>UserId</code>と<code>OrderId</code>を両方<code>string</code>の別名にすると相互に代入できてしまいます。取り違えを型で防ぎたいときは、識別用の目印を型に混ぜる(ブランド型)などの工夫で公称型に近づけます。
      </p>

      <Analogy label="💡 たとえるなら">
        公称型は「社員証を持っているか」で判断する入館審査、構造的型は「スーツを着てIDカードらしきものを提げているか」で判断する審査です。後者は柔軟ですが、条件を満たす無関係な人も通ってしまいます。
      </Analogy>

      <Heading num="05">多相 ― 1つの実装を多くの型で使う</Heading>
      <p>
        同じロジックを型ごとに書き直さずに済ませる仕組みが<Term>多相(ポリモーフィズム)</Term>です。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>パラメータ多相</h4>
          <p>
            ジェネリクス。<code>Array&lt;T&gt;</code>のように型を引数として受け取ります。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>部分型多相</h4>
          <p>継承やインタフェース。Aを期待する場所にAの一種を渡せます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>アドホック多相</h4>
          <p>オーバーロードや型クラス。型ごとに異なる実装を選びます。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>ダックタイピング</h4>
          <p>動的型付けでの多相。その操作ができれば何でもよい、という扱いです。</p>
        </Card>
      </CardGrid>

      <p>
        ジェネリクスの実装方式には、型ごとに専用コードを生成する<Term>単相化</Term>(Rust・C++。速いがコード量が増える)と、型情報を消して共通コードを使う<Term>型消去</Term>(Java・TypeScript。軽いが実行時に型が分からない)があります。TypeScriptの型が実行時に存在しないのは後者だからです。
      </p>

      <Heading num="06">健全性 ― 型検査はどこまで信用できるか</Heading>
      <p>
        型システムが<Term>健全(sound)</Term>であるとは、「型検査を通ったプログラムは、その種の実行時エラーを起こさない」ことを意味します。実際には、多くの言語が実用性のために健全性を部分的に犠牲にしています。
      </p>

      <table>
        <thead>
          <tr>
            <th>穴</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">型アサーション</td>
            <td>
              <code>as</code>やキャストで、検査を人が上書きする
            </td>
          </tr>
          <tr>
            <td className="hl">any / dynamic</td>
            <td>
              検査対象から外れる。1か所の<code>any</code>が周囲へ伝染する
            </td>
          </tr>
          <tr>
            <td className="hl">外部データ</td>
            <td>APIレスポンスやJSONは、実際の値と型注釈が一致する保証がない</td>
          </tr>
          <tr>
            <td className="hl">配列の共変性</td>
            <td>一部の言語では、型として正しくても実行時に例外になりうる</td>
          </tr>
        </tbody>
      </table>

      <Aside label="境界では実行時検証が必要">
        <code>const user = await res.json() as User</code>は、何も検査していません。外部から入ってくる値は、スキーマ検証などで実行時に確かめてから型を名乗らせます。型システムが守ってくれるのは自分たちのコードの内側だけです。
      </Aside>

      <Heading num="07">Nullの扱い ― 10億ドルの誤り</Heading>
      <p>
        「どの型の値にもnullが入りうる」という設計は、考案者自身が「10億ドルの誤り」と呼んだほど多くの障害を生みました。現代の言語は、これを型で表現します。
      </p>

      <table>
        <thead>
          <tr>
            <th>方式</th>
            <th>言語</th>
            <th>扱い</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Nullable型を分ける</td>
            <td>TypeScript(strict)・Kotlin・C#</td>
            <td>
              <code>string | null</code>は<code>string</code>と別の型。使う前に絞り込みが要る
            </td>
          </tr>
          <tr>
            <td className="hl">Option / Maybe型</td>
            <td>Rust・Haskell・Scala</td>
            <td>「値が無いかもしれない」を包む型にし、取り出しに処理を強制する</td>
          </tr>
          <tr>
            <td className="hl">ゼロ値</td>
            <td>Go</td>
            <td>nilは存在するが、多値返却でエラーを明示する文化がある</td>
          </tr>
        </tbody>
      </table>

      <p>
        いずれも狙いは同じです ―
        「無いかもしれない」を型に書き、対処し忘れをコンパイルエラーにすること。関数型言語での扱いは<Link href="/design/paradigm-functional-safety">安全に分岐する</Link>でも扱っています。
      </p>

      <Heading num="08">型を増やすべきか、減らすべきか</Heading>
      <p>型注釈は多いほど良いわけではありません。判断の目安は次のとおりです。</p>

      <table>
        <thead>
          <tr>
            <th>状況</th>
            <th>方針</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">公開API・モジュール境界</td>
            <td>明示する。仕様書としての価値がある</td>
          </tr>
          <tr>
            <td className="hl">ローカル変数</td>
            <td>推論に任せる。書くと変更時の修正箇所が増えるだけ</td>
          </tr>
          <tr>
            <td className="hl">取り違えたら事故になる値</td>
            <td>
              専用の型を作る(金額・ID・単位)。<code>string</code>のままにしない
            </td>
          </tr>
          <tr>
            <td className="hl">複雑すぎる型</td>
            <td>読めない型定義は負債。実行時検証や単純な設計に置き換える</td>
          </tr>
          <tr>
            <td className="hl">試作・調査コード</td>
            <td>緩くてよい。すべてを厳密にする必要はない</td>
          </tr>
        </tbody>
      </table>

      <p>
        型の本質的な価値は「エラーを防ぐこと」以上に、<Term>設計を強制すること</Term>にあります。ありえない状態を型として表現できなくすれば、その状態を扱うコードもテストも不要になります。
      </p>

      <Heading num="まとめ">型は実行前に取れる保証</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>軸は複数ある</h4>
          <p>
            静的/動的だけでなく、強さ・推論・公称/構造的の組み合わせで性格が決まります。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>境界は実行時に検証</h4>
          <p>外部データに型注釈を付けるだけでは、何も保証されません。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ありえない状態を作れなくする</h4>
          <p>型の最大の効用は、設計上の誤りを表現不能にすることです。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/language/types" />
    </DocsPage>
  );
}
