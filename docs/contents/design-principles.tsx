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
  RelatedList,
  RelatedLink,
  ArchList,
  ArchRow,
  ArchRowHead,
  ArchTitle,
  ArchFeature,
  ArchProblem,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "設計原則",
};

type Tier = "must" | "niche" | "legacy";

function TierBadge({ tier }: { tier: Tier }) {
  if (tier === "must") return <Mark tier="must">必修</Mark>;
  if (tier === "legacy") return <Mark tier="legacy">史</Mark>;
  return <Mark tier="niche">専門</Mark>;
}

type Row = { href: string; era: string; name: string; why: string; tier: Tier };

const groupRows: Row[] = [
  { href: "/design/principles/foundations", era: "1968-75", name: "黎明期の原則", why: "関心の分離・情報隠蔽・最小権限の原則 ― 複雑さを分割する", tier: "must" },
  { href: "/design/principles/cohesion", era: "1990s-2001", name: "保守性の基本4原則", why: "高凝集・低結合・KISS・DRY・YAGNI ― 日々のコーディングの判断基準", tier: "must" },
  { href: "/design/principles/solid", era: "1994-98", name: "SOLID", why: "SRP・OCP・LSP・ISP・DIP ― オブジェクト指向設計の基本5原則", tier: "must" },
  { href: "/design/principles/modern", era: "2003〜", name: "現代の原則", why: "Fail Fast・継承より合成・不変性・SSOT・明示的 ― 現代的な実践", tier: "must" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>設計原則 ― コードとシステムの「良し悪し」の判断基準</h1>
        <Lead>
          <Term>設計原則</Term>は、<Link href="/design/paradigm">パラダイム</Link>や前ページの<Link href="/design/methodology">設計思想・方法論</Link>を実際にコードへ落とし込むとき、そしてこの後見ていく<Link href="/design/architecture">アーキテクチャ</Link>を選ぶときの、より一段下の判断基準です。「このクラスは責務を持ちすぎていないか」「この依存関係は変更に弱くないか」といった、日々のコードレベルの意思決定を支えています。登場した年代とSOLIDのまとまりを軸に見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">学習優先度の見方</Heading>
      <p>原則の中には古いものも多く、後から出てきたより広く使われる原則に考え方が吸収されているものもあります。そこで3段階の印をつけています。<strong>「史」の項目は単独で深く学ぶ必要はなく、矢印の先にある考え方(またはより新しい原則)を学べばカバーできます</strong>。</p>
      <CardGrid>
        <Card><Mark tier="must">必修</Mark><p style={{ marginTop: 8 }}>今のコーディングで日常的に判断基準として使う。まずここから覚える。</p></Card>
        <Card><Mark tier="niche">専門</Mark><p style={{ marginTop: 8 }}>特定の文脈(API設計、フレームワーク選定など)で効いてくる。必要になったら読めば十分。</p></Card>
        <Card><Mark tier="legacy">史</Mark><p style={{ marginTop: 8 }}>考え方がより新しい原則・技術に引き継がれ・統合された。歴史的な位置づけとして知っておく程度でよい。</p></Card>
      </CardGrid>

      <Heading num="02">4つのグループを詳しく見る</Heading>
      <p>次に、この順番のとおり見ていきます。前半はオブジェクト指向に限らない基礎的な原則、続いてオブジェクト指向設計の基本となる<Term>SOLID</Term>、最後は2000年代以降に定着した現代的な原則です。</p>

      <ArchList>
        {groupRows.map((row) => (
          <ArchRow key={row.href}>
            <ArchRowHead>
              <span className="text-[0.82rem] font-semibold tabular-nums text-muted-foreground">{row.era}</span>
              <TierBadge tier={row.tier} />
            </ArchRowHead>
            <ArchTitle><Link href={row.href}>{row.name}</Link></ArchTitle>
            <ArchFeature>{row.why}</ArchFeature>
            <ArchProblem label="件数:">
              {row.name === "黎明期の原則" && "3原則"}
              {row.name === "保守性の基本4原則" && "4原則"}
              {row.name === "SOLID" && "5原則"}
              {row.name === "現代の原則" && "5原則"}
            </ArchProblem>
          </ArchRow>
        ))}
      </ArchList>

      <Analogy label="💡 たとえるなら">
        SOLIDは「1人1役」を徹底する原則群です。SRPは「1人に仕事を1つだけ持たせる」、OCPは「その人のやり方を変えずに仕事を追加できるようにする」、DIPは「上司は特定の部下ではなく役職(インターフェース)に指示を出す」というように、それぞれ役割分担の異なる側面を扱っています。「SOLID」という名前自体は、この5つを覚えやすくまとめた総称にすぎないので、5つの内容を個別に理解すれば名前は自然と身につきます。
      </Analogy>

      <Heading num="03">設計原則と相性の良いパラダイム・アーキテクチャ・パターン</Heading>
      <p>設計原則は特定のパラダイムやアーキテクチャに従属するものではありませんが、実際にはどのパラダイム・アーキテクチャを選ぶかによって、特に効いてくる原則が変わります。</p>
      <CardGrid>
        <Card>
          <h4>SOLID(SRP・OCP・LSP・ISP・DIP)</h4>
          <p><strong>パラダイム:</strong> <Link href="/design/paradigm">オブジェクト指向</Link></p>
          <p><strong>アーキテクチャ:</strong> <Link href="/design/architecture/app/domain-centric">ドメイン中心アーキテクチャ系</Link>・<Link href="/design/architecture/sys/microservices">マイクロサービス</Link></p>
          <p><strong>パターン:</strong> Strategy・Factory Method・Dependency Injection</p>
        </Card>
        <Card>
          <h4>関心の分離・情報隠蔽</h4>
          <p><strong>パラダイム:</strong> <Link href="/design/paradigm">構造化</Link></p>
          <p><strong>アーキテクチャ:</strong> <Link href="/design/architecture/sys/layered">レイヤードアーキテクチャ</Link></p>
          <p><strong>パターン:</strong> Facade・Adapter</p>
        </Card>
        <Card>
          <h4>不変性を優先する・CQS</h4>
          <p><strong>パラダイム:</strong> <Link href="/design/paradigm">関数型</Link></p>
          <p><strong>アーキテクチャ:</strong> <Link href="/design/architecture/sys/event-driven">イベント駆動アーキテクチャ</Link>・CQRS(<Link href="/design/architecture/app/cqrs">高度な設計系</Link>)</p>
          <p><strong>パターン:</strong> Memento・Command</p>
        </Card>
        <Card>
          <h4>DRY・KISS・YAGNI</h4>
          <p><strong>パラダイム:</strong> 問わない(日々のコーディング全般の判断基準)</p>
          <p><strong>パターン:</strong> Template Method(DRYの具体化)</p>
        </Card>
      </CardGrid>

      <Heading num="まとめ">まず押さえておきたい5つ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>SRP(単一責任)</h4><p>1つのクラス・関数が変更される理由は1つだけにする。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>DIP(依存性逆転)</h4><p>具体的な実装ではなく、抽象(インターフェース)に依存する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>DRY</h4><p>同じ知識を複数箇所に重複させない。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>KISS</h4><p>必要以上に複雑な設計にしない。</p></Card>
        <Card><CardNumber>5</CardNumber><h4>YAGNI</h4><p>今使わない機能を先回りして作らない。</p></Card>
      </CardGrid>

      <p>この5つはSOLID全体・アーキテクチャの選択・パラダイムの使い分けのどの場面でも判断基準として繰り返し登場します。次のページからは、まず<Link href="/design/principles/foundations">黎明期の原則</Link>である関心の分離・情報隠蔽・最小権限の原則から見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/methodology" tag="設計">設計思想・方法論</RelatedLink>
                    <RelatedLink href="/design/architecture" tag="設計">アーキテクチャ一覧</RelatedLink>
                    <RelatedLink href="/design/architecture/app/cqrs" tag="設計">高度な設計系(CQRS)</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
