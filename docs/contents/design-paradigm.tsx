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
  Timeline,
  TimelineItem,
  TimelineLabel,
  ArchList,
  ArchRow,
  ArchRowHead,
  ArchTitle,
  ArchFeature,
  ArchProblem,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "パラダイム",
};

type Tier = "must" | "niche" | "legacy";

function TierBadge({ tier }: { tier: Tier }) {
  if (tier === "must") return <Mark tier="must">必修</Mark>;
  if (tier === "legacy") return <Mark tier="legacy">史</Mark>;
  return <Mark tier="niche">専門</Mark>;
}

type Row = { href?: string; era: string; name: string; why: string; tier: Tier; note?: string };

const paradigmRows: Row[] = [
  { era: "1950s", name: "機械語 / アセンブリ", why: "CPUへの直接命令。今日書くのは組み込み・OS・コンパイラなどごく一部", tier: "legacy", note: "→ 考え方は手続き型プログラミングに引き継がれた" },
  { href: "/design/paradigm/procedural", era: "1950-60s", name: "手続き型", why: "処理の手順をそのまま記述できる、今も学習の出発点", tier: "must" },
  { href: "/design/paradigm/structured", era: "1960-70s", name: "構造化", why: "if/while/for/関数という制御構造は現代のあらゆる言語に標準装備", tier: "must" },
  { href: "/design/paradigm/oop", era: "1970-90s", name: "オブジェクト指向", why: "状態を持つ大規模なドメインの整理・再利用に今も広く使われる", tier: "must" },
  { href: "/design/paradigm/functional", era: "1980s〜", name: "関数型", why: "副作用の排除・並行処理との相性から、近年さらに重要度が増している", tier: "must" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>パラダイム ― コードの「書き方」はどう変わってきたか</h1>
        <Lead>
          <Term>プログラミングパラダイム</Term>とは、「コードをどういう考え方で組み立てるか」という書き方の流派です。同じ問題でも、手続きとして書くか、オブジェクトとして書くか、関数の組み合わせとして書くかで、コードの形はまったく変わります。歴史を追うと、それぞれのパラダイムが「前の書き方で困っていたこと」への回答として生まれてきたことが分かります。
        </Lead>
      </Hero>

      <Timeline>
        <TimelineItem era="1950s">機械語 / アセンブリ</TimelineItem>
        <TimelineItem era="1950-60s">手続き型</TimelineItem>
        <TimelineItem era="1960-70s">構造化</TimelineItem>
        <TimelineItem era="1970-90s">オブジェクト指向</TimelineItem>
        <TimelineItem era="1980s〜">関数型</TimelineItem>
      </Timeline>
      <TimelineLabel>パラダイムの登場順(理論の起源ではなく、実用として広まった時期)</TimelineLabel>

      <Heading num="01">学習優先度の見方</Heading>
      <p>パラダイムは他の設計項目と違って「廃れて使われなくなる」ことがほとんどありません。むしろ後から出てきたパラダイムは前のパラダイムを置き換えるのではなく、選択肢として積み重なっていきます。例外は<Term>機械語・アセンブリ</Term>で、これは高級言語の登場によって、通常のアプリケーション開発では直接書く機会がほぼ無くなった唯一の項目です。</p>
      <CardGrid>
        <Card><Mark tier="must">必修</Mark><p style={{ marginTop: 8 }}>今のアプリケーション開発で日常的に使い分ける書き方。全て押さえておく。</p></Card>
        <Card><Mark tier="niche">専門</Mark><p style={{ marginTop: 8 }}>特定の文脈でだけ主役になる考え方。必要になったら深掘りすれば十分。</p></Card>
        <Card><Mark tier="legacy">史</Mark><p style={{ marginTop: 8 }}>後継の考え方に発展的に引き継がれた。歴史的な背景として知っておく程度でよい。</p></Card>
      </CardGrid>

      <table>
        <thead>
          <tr><th>年代</th><th>パラダイム</th><th>区分</th><th>今どう使うか</th></tr>
        </thead>
        <tbody>
          {paradigmRows.map((row) => (
            <tr key={row.name}>
              <td className="hl">{row.era}</td>
              <td>{row.name}</td>
              <td><TierBadge tier={row.tier} />{row.note && <MarkNote>{row.note}</MarkNote>}</td>
              <td>{row.why}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">機械語・アセンブリ ― CPUへの直接命令</Heading>
      <p>コンピュータが登場した当初、プログラムはCPUが理解できる命令(<Term>機械語</Term>)を直接並べるものでした。人間にとって読み書きが極めて困難で、少し複雑な処理を書くだけでも大変な労力が必要でした。この状態を抜け出そうとする中で、次の4つのパラダイムが生まれます。</p>

      <Heading num="03">4つのパラダイムを詳しく見る</Heading>
      <p>次に、この順番のとおり1つずつ詳しく見ていきます。それぞれ「前の書き方で困っていたこと」への回答として登場している点に注目してください。</p>

      <ArchList>
        {paradigmRows
          .filter((row): row is Row & { href: string } => Boolean(row.href))
          .map((row) => (
            <ArchRow key={row.href}>
              <ArchRowHead>
                <span className="text-[0.82rem] font-semibold tabular-nums text-muted-foreground">{row.era}</span>
                <TierBadge tier={row.tier} />
              </ArchRowHead>
              <ArchTitle><Link href={row.href}>{row.name}</Link></ArchTitle>
              <ArchFeature>{row.why}</ArchFeature>
              <ArchProblem label="基本単位:">
                {row.name === "手続き型" && "手順(関数)"}
                {row.name === "構造化" && "制御構造(順次・分岐・反復)"}
                {row.name === "オブジェクト指向" && "オブジェクト(データ+処理)"}
                {row.name === "関数型" && "純粋関数"}
              </ArchProblem>
            </ArchRow>
          ))}
      </ArchList>

      <table>
        <thead>
          <tr><th>パラダイム</th><th>基本単位</th><th>得意なこと</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">手続き型</td><td>手順(関数)</td><td>処理の流れをそのまま記述できる、学習コストが低い</td></tr>
          <tr><td className="hl">構造化</td><td>制御構造(順次・分岐・反復)</td><td>GOTOを使わずに読みやすい制御の流れを組み立てられる</td></tr>
          <tr><td className="hl">オブジェクト指向</td><td>オブジェクト(データ+処理)</td><td>状態を持つ大規模なドメインの整理・再利用</td></tr>
          <tr><td className="hl">関数型</td><td>純粋関数</td><td>副作用の排除によるバグの抑制、並行処理との相性</td></tr>
        </tbody>
      </table>

      <p>実務では1つのパラダイムだけを使うことは少なく、JavaScript/TypeScriptのように<Term>マルチパラダイム</Term>の言語で、オブジェクト指向的な設計と関数型的な書き方(<code>map</code>/<code>filter</code>、イミュータブルなデータ)を併用するのが一般的です。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>構造化</h4><p>GOTOをやめ、if/while/for/関数という定型の制御構造でコードを追いやすくした。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>オブジェクト指向</h4><p>データと処理をまとめ、大規模なソフトウェアの管理を容易にした。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>関数型</h4><p>副作用のない純粋関数で、状態変化にまつわるバグと並行処理の難しさに対応する。</p></Card>
      </CardGrid>

      <Heading num="04">パラダイムと相性の良い設計思想・原則・パターン</Heading>
      <p>パラダイムは「1つの関数・1つのモジュールをどう書くか」という粒度の考え方でした。この発想は、より大きな<Link href="/design/architecture">システムアーキテクチャ</Link>・アプリケーションアーキテクチャだけでなく、<Link href="/design/methodology">設計思想・方法論</Link>や<Link href="/design/principles">設計原則</Link>、<Link href="/design/patterns">設計パターン</Link>、<Link href="/design/idioms">実装パターン・イディオム</Link>にも、粒度を変えて同じ発想として現れます。</p>

      <div className="my-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <h4>手続き型</h4>
          <p><strong>発想の共通点:</strong> 上から下へ、手順通りに処理を実行する</p>
          <p><strong>方法論:</strong> データ中心設計(<Link href="/design/methodology">方法論</Link>)</p>
          <p><strong>設計原則:</strong> KISS・関心の分離</p>
          <p><strong>システムアーキテクチャ:</strong> <Link href="/design/architecture/sys/pipeline">パイプラインアーキテクチャ</Link></p>
          <p><strong>アプリケーションアーキテクチャ:</strong> Transaction Script</p>
          <p><strong>パターン:</strong> Template Method・Guard Clause</p>
        </Card>
        <Card>
          <h4>構造化</h4>
          <p><strong>発想の共通点:</strong> 決まった経路(層)だけを一方向に通し、飛び越えを許さない</p>
          <p><strong>方法論:</strong> データ中心設計</p>
          <p><strong>設計原則:</strong> 関心の分離・情報隠蔽</p>
          <p><strong>システムアーキテクチャ:</strong> <Link href="/design/architecture/sys/layered">レイヤードアーキテクチャ</Link></p>
          <p><strong>アプリケーションアーキテクチャ:</strong> レイヤードアーキテクチャ(アプリ版)・Three-Tier Architecture</p>
          <p><strong>パターン:</strong> Chain of Responsibility・Middleware Chain</p>
        </Card>
        <Card>
          <h4>オブジェクト指向</h4>
          <p><strong>発想の共通点:</strong> 関連するデータと処理を1つの単位(オブジェクト/境界づけられたコンテキスト)にまとめる</p>
          <p><strong>方法論:</strong> 責務駆動設計・ドメイン駆動設計(<Link href="/design/methodology">方法論</Link>)</p>
          <p><strong>設計原則:</strong> SOLID全般・高凝集低結合</p>
          <p><strong>システムアーキテクチャ:</strong> <Link href="/design/architecture/sys/microservices">マイクロサービス</Link>・<Link href="/design/architecture/sys/service-based">サービスベース</Link>・<Link href="/design/architecture/sys/modular-monolith">モジュラーモノリス</Link></p>
          <p><strong>アプリケーションアーキテクチャ:</strong> Domain Model・Repository・Data Mapper・Hexagonal/Clean Architecture</p>
          <p><strong>パターン:</strong> Factory Method・Strategy・Decorator・Observer・Dependency Injection</p>
        </Card>
        <Card>
          <h4>関数型</h4>
          <p><strong>発想の共通点:</strong> 副作用を境界に押し出し、不変なデータ(イベント)や、副作用のない読み取りを基本に据える</p>
          <p><strong>方法論:</strong> 状態を持たない設計という点でDDDの値オブジェクトとも相性が良い</p>
          <p><strong>設計原則:</strong> 不変性を優先する・コマンド・クエリ分離(CQS)</p>
          <p><strong>システムアーキテクチャ:</strong> <Link href="/design/architecture/sys/event-driven">イベント駆動アーキテクチャ</Link></p>
          <p><strong>アプリケーションアーキテクチャ:</strong> CQRS</p>
          <p><strong>パターン:</strong> Strategy(関数版)・Currying・Optional Chaining/Maybe・Middleware Chain</p>
        </Card>
      </div>
      <p className="text-[0.85rem] text-muted-foreground">※ 機械語・アセンブリは「アーキテクチャ」という概念が生まれる以前の、CPUへの直接命令の時代のため対象外です。</p>

      <Analogy label="💡 たとえるなら">
        パラダイムが「1文・1段落をどう書くか」という文章作法だとすれば、設計思想・原則・アーキテクチャ・パターンは、その作法で書かれた段落を、章・本としてどう束ねるかという編集方針です。手続き型で書かれた段落は手順書のような章立て(パイプライン)に、オブジェクト指向で書かれた段落は役割ごとの独立した章(マイクロサービス、Strategy、DI)にまとまりやすい ―
        同じ発想が、粒度を変えて繰り返し現れています。
      </Analogy>

      <p>次のページからは、何を軸にモジュールを切り出すかという「<Link href="/design/methodology">設計思想・方法論</Link>」、コードの内部をどう構造化するかの指針である「<Link href="/design/principles">設計原則</Link>」、そしてシステム全体をどう組み立てるかの指針である「<Link href="/design/architecture">アーキテクチャ</Link>」を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/methodology" tag="設計">設計思想・方法論</RelatedLink>
                    <RelatedLink href="/design/principles" tag="設計">設計原則</RelatedLink>
                    <RelatedLink href="/design/architecture" tag="設計">アーキテクチャ一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
