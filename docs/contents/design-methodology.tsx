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
  Mark,
  MarkNote,
  RelatedList,
  RelatedLink,
  ArchList,
  ArchRow,
  ArchRowHead,
  ArchTitle,
  ArchFeature,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "設計思想・方法論",
};

type Tier = "must" | "niche" | "legacy";

function TierBadge({ tier }: { tier: Tier }) {
  if (tier === "must") return <Mark tier="must">必修</Mark>;
  if (tier === "legacy") return <Mark tier="legacy">史</Mark>;
  return <Mark tier="niche">専門</Mark>;
}

type Row = { href: string; era: string; name: string; author: string; why: string; tier: Tier; note?: string };

const rows: Row[] = [
  { href: "/design/methodology/info-hiding", era: "1972", name: "情報隠蔽", author: "David Parnas", why: "「変わりやすい設計判断」を軸にモジュールを分割する", tier: "must" },
  { href: "/design/methodology/data-centric", era: "1990年代", name: "データ中心設計", author: "(エンタープライズDB実践の中で普及)", why: "データモデル(スキーマ)を最初に固める", tier: "niche", note: "→ 業務ロジックが複雑な領域では不向きだが、CRUD中心のシステムや分析基盤では今も現役" },
  { href: "/design/methodology/object-centric", era: "1980年代後半", name: "オブジェクト中心設計", author: "Booch, Coad-Yourdon, Rumbaugh", why: "要求仕様の「名詞」からクラスを見つける", tier: "legacy", note: "→ ふるまいの弱いモデルに陥りやすく、責務駆動設計やUML/統一プロセスに整理・統合された" },
  { href: "/design/methodology/contract", era: "1988", name: "契約による設計(DbC)", author: "Bertrand Meyer", why: "モジュール間の責任範囲を「契約」として明文化する", tier: "niche", note: "→ 考え方は型システム・単体テスト・アサーションに分散して引き継がれた" },
  { href: "/design/methodology/responsibility-driven", era: "1990年代前半", name: "責務駆動設計(RDD)", author: "Rebecca Wirfs-Brock", why: "オブジェクトの「責務」と「協力関係」を中心に設計する", tier: "legacy", note: "→ 考え方はSOLID(特にSRP)やDDDのドメインサービスに引き継がれた。CRCカードの手法自体は今日あまり実践されない" },
  { href: "/design/methodology/use-case-driven", era: "1992", name: "ユースケース中心設計", author: "Ivar Jacobson", why: "利用者とシステムのやり取り(シナリオ)を中心に設計する", tier: "niche", note: "→ Clean ArchitectureのUse Case層やユーザーストーリー駆動開発に引き継がれている" },
  { href: "/design/methodology/ddd", era: "2003", name: "ドメイン駆動設計(DDD)", author: "Eric Evans", why: "ドメインモデルと「ユビキタス言語」を中心に設計する", tier: "must" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>設計思想・方法論 ― 何を中心に設計するか</h1>
        <Lead>
          前ページで見た<Term>パラダイム</Term>が「どう書くか」という文法レベルの流派だとすると、<Term>設計思想・方法論</Term>は「何を軸にモジュールやクラスを切り出すか」という、もう一段具体的な判断です。変わりやすさを軸にするか、データを軸にするか、責務を軸にするか、業務知識(ドメイン)を軸にするかで、同じ機能でもコードの切り分け方はまったく変わります。
        </Lead>
      </Hero>

      <Heading num="01">学習優先度の見方</Heading>
      <p>7つの方法論は互いに置き換わる関係ではなく、それぞれ違う軸を提供します。ただし実務での主役という意味では偏りがあり、<strong>「史」の項目は単独で深く学ぶ必要はなく、矢印の先にある考え方を学べばカバーできます</strong>。</p>
      <CardGrid>
        <Card><Mark tier="must">必修</Mark><p style={{ marginTop: 8 }}>複雑な業務ロジックを扱う設計で今も中心に据えられる考え方。</p></Card>
        <Card><Mark tier="niche">専門</Mark><p style={{ marginTop: 8 }}>特定の文脈(CRUD中心・データ分析基盤など)で今も有効。</p></Card>
        <Card><Mark tier="legacy">史</Mark><p style={{ marginTop: 8 }}>考え方がより新しい方法論・原則に引き継がれ・統合された。</p></Card>
      </CardGrid>

      <Heading num="02">7つの方法論を詳しく見る</Heading>
      <p>次に、この順番のとおり1つずつ詳しく見ていきます。<Term>情報隠蔽</Term>という最も基礎的な発想から始まり、データ・名詞・契約・責務・ユースケースと軸を変えながら、最後に業務知識そのものを軸にする<Term>ドメイン駆動設計</Term>へたどり着きます。</p>

      <ArchList>
        {rows.map((row) => (
          <ArchRow key={row.href}>
            <ArchRowHead>
              <span className="text-[0.82rem] font-semibold tabular-nums text-muted-foreground">{row.era}</span>
              <TierBadge tier={row.tier} />
            </ArchRowHead>
            <ArchTitle><Link href={row.href}>{row.name}</Link></ArchTitle>
            {row.note && <MarkNote>{row.note}</MarkNote>}
            <ArchFeature>{row.why}</ArchFeature>
            <p className="m-0 text-[0.88rem] text-muted-foreground"><span className="mr-1 font-semibold text-foreground">提唱者:</span>{row.author}</p>
          </ArchRow>
        ))}
      </ArchList>

      <Heading num="03">方法論と相性の良いパラダイム・原則・アーキテクチャ</Heading>
      <p>どの方法論を選ぶかは、そのまま「どのパラダイムで書くか」「どの設計原則を重視するか」「どのアーキテクチャを選ぶか」に連鎖します。</p>
      <CardGrid>
        <Card>
          <h4>責務駆動設計</h4>
          <p><strong>パラダイム:</strong> <Link href="/design/paradigm">オブジェクト指向</Link></p>
          <p><strong>設計原則:</strong> 単一責任の原則(SRP)・高凝集低結合</p>
          <p><strong>アーキテクチャ:</strong> Domain Model(<Link href="/design/architecture/app/domain-model">ドメインモデル系</Link>)</p>
        </Card>
        <Card>
          <h4>データ中心設計</h4>
          <p><strong>パラダイム:</strong> <Link href="/design/paradigm">手続き型</Link></p>
          <p><strong>設計原則:</strong> 信頼できる唯一の情報源(Single Source of Truth)</p>
          <p><strong>アーキテクチャ:</strong> Table Module・Active Record(<Link href="/design/architecture/app/data-access">データアクセス系</Link>)</p>
        </Card>
        <Card>
          <h4>ドメイン駆動設計(DDD)</h4>
          <p><strong>パラダイム:</strong> <Link href="/design/paradigm">オブジェクト指向</Link>(値オブジェクトの部分は関数型とも相性が良い)</p>
          <p><strong>設計原則:</strong> 関心の分離・依存性逆転の原則(DIP)</p>
          <p><strong>アーキテクチャ:</strong> <Link href="/design/architecture/sys/microservices">マイクロサービス</Link>・<Link href="/design/architecture/app/domain-centric">ドメイン中心アーキテクチャ系</Link></p>
        </Card>
      </CardGrid>

      <p>次のページでは、これらの方法論を実践するときの、より細かいコードレベルの判断基準である<Link href="/design/principles">設計原則</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/paradigm" tag="設計">パラダイム</RelatedLink>
                    <RelatedLink href="/design/principles" tag="設計">設計原則</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/microservices" tag="設計">マイクロサービスアーキテクチャ</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
