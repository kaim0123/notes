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
  Mark,
  MarkNote,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "実装パターン・イディオム",
};

type Tier = "must" | "niche" | "legacy";

function TierBadge({ tier }: { tier: Tier }) {
  if (tier === "must") return <Mark tier="must">必修</Mark>;
  if (tier === "legacy") return <Mark tier="legacy">史</Mark>;
  return <Mark tier="niche">専門</Mark>;
}

type Row = { name: string; desc: string; context: string; tier: Tier; note?: string };

const idioms: Row[] = [
  { name: "Dependency Injection(DI)", desc: "依存するオブジェクトを外部から注入し、実装の差し替え・テストを容易にする", context: "Java(Spring)、C#(.NET)、TypeScript(NestJS)", tier: "must" },
  { name: "Null Object", desc: "nullチェックの分岐を書く代わりに「何もしない」オブジェクトを渡し、条件分岐を減らす", context: "Java、C#、Ruby", tier: "niche", note: "→ TypeScriptの厳格なnullチェックやOptional Chainingで代替されることが多い" },
  { name: "Extension Method", desc: "既存のクラス・型を変更せずに、外部からメソッドを追加する", context: "C#、Kotlin、Swift", tier: "niche", note: "→ 対応する言語機能がある場合のみ使える" },
  { name: "Builder(フルーエントインターフェース)", desc: "メソッドチェーンで、複雑なオブジェクトを段階的に読みやすく組み立てる", context: "TypeScript/JavaScript、Java", tier: "must" },
  { name: "Guard Clause", desc: "早期return・早期例外で、ネストの深いif文を減らす", context: "言語を問わず広く使われる", tier: "must" },
  { name: "Mixin / Trait", desc: "継承を使わずに、複数のクラスへ機能を横断的に共有する", context: "Ruby(Module)、PHP(Trait)、JavaScript(Object.assign)", tier: "niche" },
  { name: "Currying / 部分適用", desc: "複数引数の関数を、1引数ずつ適用できる関数の連鎖に変換する", context: "関数型言語、JavaScript/TypeScript", tier: "niche", note: "→ 関数型パラダイムを強く使うコードベースでのみ日常的に登場する" },
  { name: "Middleware Chain", desc: "リクエスト処理を、小さな関数の連鎖として合成する", context: "Express、Hono、Koa", tier: "must" },
  { name: "Optional Chaining / Maybe", desc: "null/undefinedかもしれない値を、安全にたどる", context: "TypeScript(?.)、Swift(Optional)、Haskell(Maybe)", tier: "must" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>実装パターン・イディオム ― 言語ごとの書き方の工夫</h1>
        <Lead>
          前ページの<Link href="/design/patterns">設計パターン(GoF)</Link>が言語非依存の構造だったのに対し、<Term>実装パターン・イディオム</Term>は特定の言語機能・慣習に強く結びついた、実装レベルの書き方の工夫です。同じ問題でも、言語によって使える道具が違うため、解決の形も変わります。
        </Lead>
      </Hero>

      <Heading num="01">学習優先度の見方</Heading>
      <p>イディオムは言語機能への依存度が高いため、「古い/新しい」よりも「自分が使う言語にその機能があるか」で必要性が変わります。<strong>「史」「専門」の項目でも、対応する言語機能を持つプロジェクトに配属されたら必要になる点に注意してください</strong>。</p>
      <CardGrid>
        <Card><Mark tier="must">必修</Mark><p style={{ marginTop: 8 }}>言語を問わず、今のアプリケーション開発で頻繁に使う書き方。</p></Card>
        <Card><Mark tier="niche">専門</Mark><p style={{ marginTop: 8 }}>特定の言語機能・パラダイムに依存する。使う言語で登場したら押さえれば十分。</p></Card>
        <Card><Mark tier="legacy">史</Mark><p style={{ marginTop: 8 }}>より新しい言語機能・書き方に置き換わりつつある。</p></Card>
      </CardGrid>

      <Heading num="02">代表的なイディオム</Heading>
      <table>
        <thead>
          <tr><th>イディオム</th><th>目的</th><th>主な言語・文脈</th><th>区分</th></tr>
        </thead>
        <tbody>
          {idioms.map((row) => (
            <tr key={row.name}>
              <td className="hl">{row.name}</td>
              <td>{row.desc}</td>
              <td>{row.context}</td>
              <td><TierBadge tier={row.tier} />{row.note && <MarkNote>{row.note}</MarkNote>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>このうち<Mark tier="must">必修</Mark>の5つ(Guard Clause・Dependency Injection・Builder・Middleware Chain・Optional Chaining)は、<Link href="/design/idioms/essentials">必修イディオムを深く理解する</Link>でBefore/Afterのコードとともに1つずつ掘り下げます。</p>

      <Heading num="03">設計パターンとの違い</Heading>
      <p><Term>Dependency Injection</Term>は<Link href="/design/principles/solid">依存性逆転の原則(DIP)</Link>という設計原則を、具体的なコードとして実現する手段の1つです。<Term>Null Object</Term>はGoFのデザインパターンの1つとして扱われることもありますが、実務では「言語にnull安全の機構がどれだけあるか」によって必要性が大きく変わるため、ここでは言語依存の工夫として整理しています。同様に<Term>Middleware Chain</Term>は<Link href="/design/patterns">Chain of Responsibility</Link>パターンの考え方を、Webフレームワークの慣習として具体化したものです。</p>

      <Analogy label="💡 たとえるなら">
        設計パターンが「料理の技法(蒸す、炒める)」だとすれば、実装パターン・イディオムは「この鍋・このコンロならではのコツ」です。技法自体はどの台所でも通用しますが、実際の手順は道具(言語・フレームワーク)によって細部が変わります。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>言語機能に依存</h4><p>Extension MethodやMixinのように、対応する言語機能がないと使えないものもある。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>原則・パターンの具体化</h4><p>DIやMiddleware Chainは、より抽象的な設計原則・パターンを実際のコードにする手段。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>フレームワークで実例を見る</h4><p>具体的な書き方は`3-実装`の各言語・フレームワークのページで実例として登場する。</p></Card>
      </CardGrid>

      <Heading num="04">イディオムと相性の良いパラダイム・パターン・原則</Heading>
      <CardGrid>
        <Card>
          <h4>Dependency Injection(DI)</h4>
          <p><strong>パラダイム:</strong> <Link href="/design/paradigm">オブジェクト指向</Link></p>
          <p><strong>パターン・原則:</strong> 依存性逆転の原則(DIP)・Factory Method</p>
        </Card>
        <Card>
          <h4>Null Object</h4>
          <p><strong>パラダイム:</strong> <Link href="/design/paradigm">オブジェクト指向</Link></p>
          <p><strong>パターン・原則:</strong> Strategyパターンの一種として捉えられる</p>
        </Card>
        <Card>
          <h4>Middleware Chain</h4>
          <p><strong>パラダイム:</strong> <Link href="/design/paradigm">関数型</Link>・構造化</p>
          <p><strong>パターン・原則:</strong> Chain of Responsibility(<Link href="/design/patterns">設計パターン</Link>)・<Link href="/design/architecture/sys/pipeline">パイプラインアーキテクチャ</Link></p>
        </Card>
        <Card>
          <h4>Currying / 部分適用・Optional Chaining</h4>
          <p><strong>パラダイム:</strong> <Link href="/design/paradigm">関数型</Link></p>
          <p><strong>パターン・原則:</strong> 不変性を優先する(<Link href="/design/principles/modern">設計原則</Link>)</p>
        </Card>
        <Card>
          <h4>Guard Clause</h4>
          <p><strong>パラダイム:</strong> 手続き型・構造化</p>
          <p><strong>パターン・原則:</strong> Fail Fast(<Link href="/design/principles/modern">設計原則</Link>)</p>
        </Card>
      </CardGrid>

      <p>次のページでは、コードの見た目や書き方そのものを揃える<Link href="/design/conventions">コーディング規約・スタイル</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/idioms/essentials" tag="設計">必修イディオムを深く理解する</RelatedLink>
                    <RelatedLink href="/design/patterns" tag="設計">設計パターン</RelatedLink>
                    <RelatedLink href="/design/conventions" tag="設計">コーディング規約・スタイル</RelatedLink>
                    <RelatedLink href="/design/principles" tag="設計">設計原則</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
