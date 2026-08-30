import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "実装パターン・イディオム" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>実装パターン・イディオム ― 言語ごとの書き方の工夫</h1>
        <Lead>
          <Link href="/design/patterns">設計パターン</Link>が言語非依存の構造だったのに対し、<Term>実装パターン・イディオム</Term>は特定の言語機能・慣習に強く結びついた、実装レベルの書き方の工夫です。同じ問題でも、言語によって使える道具が違うため、解決の形も変わります。
        </Lead>
      </Hero>

      <Heading num="01">原則・パターン・イディオムの関係</Heading>

      <DiagramFrame
        slug="design-idioms-layers"
        aspect="660 / 290"
        caption="設計原則・設計パターン・実装イディオムの関係。上から順に、言語に依存しない判断基準である設計原則、言語に依存しない構造である設計パターン、言語や道具に依存する書き方である実装イディオムが並ぶ。下へ行くほど具体的になり、使える形は言語が持つ機能に左右される。"
      />

      <p>
        例えば<Term>依存性逆転の原則</Term>という判断基準は、<Term>Factory Method</Term>という構造を経て、<Term>Dependency Injection</Term>という具体的な書き方になります。3つは別のものではなく、同じ考え方の抽象度が違うだけです。
      </p>

      <Heading num="02">代表的なイディオム</Heading>
      <table>
        <thead>
          <tr><th>イディオム</th><th>目的</th><th>主な言語・文脈</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Guard Clause</td>
            <td>早期returnや早期例外で、ネストの深いif文を減らす</td>
            <td>言語を問わず広く使われる</td>
          </tr>
          <tr>
            <td className="hl">Dependency Injection</td>
            <td>依存するオブジェクトを外部から注入し、差し替えとテストを容易にする</td>
            <td>Java・C#・TypeScript</td>
          </tr>
          <tr>
            <td className="hl">Builder(フルーエント)</td>
            <td>メソッドチェーンで、複雑なオブジェクトを段階的に組み立てる</td>
            <td>TypeScript・Java</td>
          </tr>
          <tr>
            <td className="hl">Middleware Chain</td>
            <td>リクエスト処理を、小さな関数の連鎖として合成する</td>
            <td>Express・Hono・Koa</td>
          </tr>
          <tr>
            <td className="hl">Optional Chaining</td>
            <td>値が無いかもしれない参照を、安全にたどる</td>
            <td>TypeScript・Swift・Haskell(Maybe)</td>
          </tr>
          <tr>
            <td className="hl">Null Object</td>
            <td>nullチェックの代わりに「何もしない」オブジェクトを渡し、分岐を減らす</td>
            <td>Java・C#・Ruby。null安全な言語では出番が減る</td>
          </tr>
          <tr>
            <td className="hl">Extension Method</td>
            <td>既存の型を変更せずに、外からメソッドを追加する</td>
            <td>C#・Kotlin・Swift。対応する言語機能が要る</td>
          </tr>
          <tr>
            <td className="hl">Mixin / Trait</td>
            <td>継承を使わずに、複数のクラスへ機能を横断的に共有する</td>
            <td>Ruby・PHP・JavaScript</td>
          </tr>
          <tr>
            <td className="hl">カリー化・部分適用</td>
            <td>複数引数の関数を、1引数ずつ適用できる連鎖に変換する</td>
            <td>関数型言語・JavaScript</td>
          </tr>
        </tbody>
      </table>
      <p>
        このうち上から5つは言語を問わず日常的に使うため、<Link href="/design/idioms-essentials">必修イディオムを深く理解する</Link>でBefore/Afterのコードとともに掘り下げます。カリー化と部分適用は<Link href="/design/paradigm-functional-currying">引数を固定する</Link>で扱っています。
      </p>

      <Heading num="03">「古い・新しい」ではなく「使える機能があるか」</Heading>
      <p>
        イディオムは言語機能への依存度が高いため、他の設計項目のように「古い・新しい」では優先度が決まりません。判断軸は<Term>自分が使う言語にその機能があるか</Term>です。Extension MethodはC#やKotlinでは日常的に使いますが、TypeScriptには対応する機能がありません。Null Objectは、null安全な型システムを持つ言語では出番がほとんどなくなります。
      </p>

      <Heading num="04">それぞれ、何の具体化なのか</Heading>
      <table>
        <thead>
          <tr><th>イディオム</th><th>もとになる原則・パターン</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Dependency Injection</td>
            <td>
              <Link href="/design/principles-solid">依存性逆転の原則</Link>と<Link href="/design/patterns-gof-creation">Factory Method</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">Middleware Chain</td>
            <td>
              <Link href="/design/patterns-gof-collaboration">Chain of Responsibility</Link>と<Link href="/design/architecture-pipeline">パイプライン</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">Guard Clause</td>
            <td>
              <Link href="/design/principles-modern">Fail Fast</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">Optional Chaining</td>
            <td>
              <Link href="/design/paradigm-functional-safety">Option / Maybe</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">Mixin / Trait</td>
            <td>
              <Link href="/design/principles-modern">継承より合成</Link>
            </td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        設計パターンが「料理の技法(蒸す、炒める)」だとすれば、実装イディオムは「この鍋・このコンロならではのコツ」です。技法自体はどの台所でも通用しますが、実際の手順は道具によって細部が変わります。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>言語機能に依存する</h4><p>対応する機能がない言語では、そもそも使えないイディオムもある。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>原則・パターンの具体化</h4><p>DIもMiddleware Chainも、より抽象的な考え方をコードにしたもの。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>優先度は使う言語で決まる</h4><p>古い・新しいではなく、手元の道具にその機能があるかで判断する。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/idioms" />
    </DocsPage>
  );
}
