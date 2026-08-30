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
  ArchRowMeta,
  ArchEra,
  FamilyTag,
  ArchTitle,
  ArchFeature,
  ArchProblem,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "アーキテクチャ一覧",
};

type Tier = "must" | "niche" | "legacy";

function TierBadge({ tier }: { tier: Tier }) {
  if (tier === "must") return <Mark tier="must">必修</Mark>;
  if (tier === "legacy") return <Mark tier="legacy">史</Mark>;
  return <Mark tier="niche">専門</Mark>;
}

const systemRows: {
  href: string;
  era: string;
  name: string;
  feature: string;
  problem: string;
  tier: Tier;
  note?: string;
}[] = [
  { href: "/design/architecture/sys/layered", era: "1970年代", name: "レイヤードアーキテクチャ", feature: "責務を水平な層に分割し、隣接する層としか通信しない", problem: "UI・業務処理・DB処理が混在し、保守しづらかった", tier: "must" },
  { href: "/design/architecture/sys/pipeline", era: "1970年代後半", name: "パイプラインアーキテクチャ", feature: "フィルターとパイプでデータ変換処理を一方向に連結する", problem: "データ変換処理を段階的に再利用・組み合わせしたかった", tier: "niche" },
  { href: "/design/architecture/sys/microkernel", era: "1980年代", name: "マイクロカーネルアーキテクチャ", feature: "最小限のコアに、コントラクトを満たすプラグインを差し込む", problem: "機能追加のたびに本体を変更する必要があり、拡張性が低かった", tier: "niche" },
  { href: "/design/architecture/sys/soa", era: "1990年代後半", name: "オーケストレーション駆動SOA", feature: "ESBが仲介する共通サービス群として機能を再利用する", problem: "社内システムごとに機能が重複し、再利用できなかった", tier: "legacy", note: "→ 考え方はサービスベース/マイクロサービスに引き継がれた" },
  { href: "/design/architecture/sys/event-driven", era: "2000年代前半", name: "イベント駆動アーキテクチャ", feature: "「起きたこと」を非同期・ブロードキャストで疎結合に伝える", problem: "同期通信でシステム同士が密結合になり、変更や負荷に弱かった", tier: "must" },
  { href: "/design/architecture/sys/space-based", era: "2000年代前半", name: "スペースベースアーキテクチャ", feature: "メモリ上の処理ユニットでDBを経由せず大量アクセスを捌く", problem: "アクセス集中でDBがボトルネックになり、スケールできなかった", tier: "niche" },
  { href: "/design/architecture/sys/service-based", era: "2000年代後半", name: "サービスベースアーキテクチャ", feature: "4〜12個程度の粗い粒度のドメインサービスに分割する", problem: "SOAはサービス粒度が細かすぎて複雑になった", tier: "must" },
  { href: "/design/architecture/sys/microservices", era: "2011年頃", name: "マイクロサービスアーキテクチャ", feature: "境界づけられたコンテキスト単位で、データごと独立させる", problem: "モノリシックやSOAでは独立開発・独立デプロイが難しかった", tier: "must" },
  { href: "/design/architecture/sys/modular-monolith", era: "2018年頃", name: "モジュラーモノリス", feature: "単一デプロイのまま、内部だけをモジュールで疎結合にする", problem: "マイクロサービスは運用コストが高すぎるケースが多かった", tier: "must" },
];

const appRows: {
  href?: string;
  era: string;
  family: string;
  name: string;
  feature: string;
  problem: string;
  tier: Tier;
  note?: string;
}[] = [
  { era: "1970年代", family: "レイヤー系", name: "レイヤードアーキテクチャ", feature: "表示・業務・永続化を階層で分ける(システム版と同じ発想をアプリ内部に適用)", problem: "責務を分離して保守性を高める", href: "/design/architecture/app/layered", tier: "must" },
  { era: "1979", family: "GUI系", name: "MVC", feature: "Model/View/Controllerの3役に分けて表示とロジックを分離する", problem: "表示と業務ロジックを分離する", href: "/design/architecture/app/gui", tier: "must" },
  { era: "1980年代", family: "GUI系", name: "PAC", feature: "Presentation-Abstraction-Controlの3要素を階層的に組み合わせる", problem: "複雑なGUIを階層的に構築する", href: "/design/architecture/app/gui", tier: "legacy", note: "→ 考え方はMVC/MVPに引き継がれた" },
  { era: "1980年代後半", family: "GUI系", name: "MVP", feature: "ViewからPresenterへロジックを移し、テストしやすくする", problem: "GUIをテストしやすくする", href: "/design/architecture/app/gui", tier: "niche" },
  { era: "1990年代", family: "GUI系", name: "Document-View", feature: "編集対象のデータ(Document)と表示(View)を分離する", problem: "ドキュメント編集アプリを作りやすくする", href: "/design/architecture/app/gui", tier: "legacy", note: "→ 現代のコンポーネント指向UIに置き換えられた" },
  { era: "1996", family: "レイヤー系", name: "Three-Tier Architecture", feature: "プレゼンテーション/ビジネス/データの3層にWebアプリを分ける", problem: "Webアプリ向けに3層へ明確に分離する", href: "/design/architecture/app/layered", tier: "must" },
  { era: "2002", family: "Web系", name: "Front Controller", feature: "全リクエストを1つの窓口(コントローラ)で受け止める", problem: "リクエスト処理を一元管理する", href: "/design/architecture/app/web", tier: "must" },
  { era: "2002", family: "Web系", name: "Page Controller", feature: "画面(ページ)ごとに専用のコントローラを用意する", problem: "ページ単位で処理を管理する", href: "/design/architecture/app/web", tier: "legacy", note: "→ 多くの現代フレームワークはFront Controllerを採用" },
  { era: "2002", family: "Web系", name: "Template View", feature: "テンプレートにデータを差し込んでHTMLを生成する", problem: "HTMLとロジックを分離する", href: "/design/architecture/app/web", tier: "must" },
  { era: "2002", family: "ドメインモデル系", name: "Domain Model", feature: "業務ルールをオブジェクトのメソッドとして表現する", problem: "ビジネスルールをオブジェクトで表現する", href: "/design/architecture/app/domain-model", tier: "must" },
  { era: "2002", family: "ドメインモデル系", name: "Transaction Script", feature: "1つの業務処理を手続き的なスクリプトとして書く", problem: "単純な業務処理をシンプルに実装する", href: "/design/architecture/app/domain-model", tier: "niche" },
  { era: "2002", family: "ドメインモデル系", name: "Table Module", feature: "テーブル1つに対して1つのロジッククラスを対応させる", problem: "テーブル単位でロジックを管理する", href: "/design/architecture/app/domain-model", tier: "legacy", note: "→ 現代はORMのドメインモデル/Active Recordが主流" },
  { era: "2002", family: "データアクセス系", name: "Active Record", feature: "1レコード=1オブジェクトに、DB操作そのものも持たせる", problem: "DBテーブルとオブジェクトを対応させる", href: "/design/architecture/app/data-access", tier: "must" },
  { era: "2002", family: "データアクセス系", name: "Data Mapper", feature: "ドメインオブジェクトとDBのマッピングだけを専任で担う層を置く", problem: "ドメインをDBから独立させる", href: "/design/architecture/app/data-access", tier: "must" },
  { era: "2002", family: "データアクセス系", name: "Repository", feature: "コレクションのように振る舞う窓口で、データ取得方法を隠す", problem: "データ取得方法を隠蔽する", href: "/design/architecture/app/data-access", tier: "must" },
  { era: "2003", family: "ドメイン中心アーキテクチャ系", name: "Hexagonal Architecture", feature: "ドメインを中心に置き、外部技術をポート&アダプタで差し替え可能にする", problem: "外部技術への依存をなくす", href: "/design/architecture/app/domain-centric", tier: "must" },
  { era: "2006", family: "ドメイン中心アーキテクチャ系", name: "DCI", feature: "オブジェクトが状況に応じて異なる役割(ロール)を演じる", problem: "オブジェクトの役割を柔軟に表現する", href: "/design/architecture/app/domain-centric", tier: "niche" },
  { era: "2007", family: "ドメイン中心アーキテクチャ系", name: "Onion Architecture", feature: "依存の矢印を常に内側(ドメイン)へ向ける同心円状の層にする", problem: "依存関係を内側へ向ける", href: "/design/architecture/app/domain-centric", tier: "legacy", note: "→ Clean Architectureに整理・統合された" },
  { era: "2009", family: "高度な設計系", name: "CQRS", feature: "読み取り(Query)と書き込み(Command)のモデルを分ける", problem: "読み取りと書き込みを分離する", href: "/design/architecture/app/cqrs", tier: "must" },
  { era: "2012", family: "ドメイン中心アーキテクチャ系", name: "Clean Architecture", feature: "Onion/Hexagonalを整理し、ビジネスロジックを技術から独立させる", problem: "ビジネスロジックを技術から完全に独立させる", href: "/design/architecture/app/domain-centric", tier: "must" },
  { era: "2014頃", family: "レイヤー系", name: "Vertical Slice Architecture", feature: "レイヤーをまたぐのではなく、機能単位で1つのスライスにまとめる", problem: "レイヤーより機能単位で管理する", href: "/design/architecture/app/layered", tier: "niche" },
  { era: "2015頃", family: "レイヤー系", name: "Feature Folder Architecture", feature: "フォルダ構成自体を機能単位にする", problem: "機能単位のフォルダ構成にする", href: "/design/architecture/app/layered", tier: "niche" },
];

const mustSystem = systemRows.filter((r) => r.tier === "must");
const mustApp = appRows.filter((r) => r.tier === "must");

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>アーキテクチャ一覧 ― システムとアプリケーション、2つの粒度で見る</h1>
        <Lead>
          「アーキテクチャ」には粒度の異なる2つの話があります。複数のサービス・複数のプロセスをどう組み合わせるかという<Term>システムアーキテクチャ</Term>と、1つのアプリケーションの内部をどう構造化するかという<Term>アプリケーションアーキテクチャ</Term>です。次に扱うのは前者です。ここではまず両方を時系列表で見渡しておきます。
        </Lead>
      </Hero>

      <Heading num="01">学習優先度の見方</Heading>
      <p>どちらの表にも古いものが多く含まれるため、それぞれ3段階の印をつけています。<strong>「史」の項目は単独で深く学ぶ必要はなく、矢印の先にある後継スタイルを学べば考え方ごとカバーできます</strong>。</p>
      <CardGrid>
        <Card><Mark tier="must">必修</Mark><p style={{ marginTop: 8 }}>今のWeb/バックエンド開発で高頻度に登場する基礎知識。まずここから読む。</p></Card>
        <Card><Mark tier="niche">専門</Mark><p style={{ marginTop: 8 }}>特定の文脈(ETL、プラグイン、大規模スケールなど)で使う。必要になったら読めば十分。</p></Card>
        <Card><Mark tier="legacy">史</Mark><p style={{ marginTop: 8 }}>考え方が後継のスタイルに引き継がれ・統合された。歴史的な位置づけとして知っておく程度でよい。</p></Card>
      </CardGrid>

      <Heading num="02">システムアーキテクチャ ― システム全体の組み方</Heading>
      <p>複数のサービスやプロセスをどう分割し、どう連携させるかというスタイルです。次に、この表の並び順どおりに1つずつ詳しく見ていきます。</p>

      <Timeline>
        {systemRows.map((row) => (
          <TimelineItem key={row.href} era={row.era}>
            {row.name}
          </TimelineItem>
        ))}
      </Timeline>
      <TimelineLabel>登場時期の目安(各ページの詳細も参照)</TimelineLabel>

      <ArchList>
        {systemRows.map((row) => (
          <ArchRow key={row.href}>
            <ArchRowHead>
              <ArchEra>{row.era}</ArchEra>
              <TierBadge tier={row.tier} />
            </ArchRowHead>
            <ArchTitle><Link href={row.href}>{row.name}</Link></ArchTitle>
            {row.note && <MarkNote>{row.note}</MarkNote>}
            <ArchFeature>{row.feature}</ArchFeature>
            <ArchProblem label="解決したかった問題:">{row.problem}</ArchProblem>
          </ArchRow>
        ))}
      </ArchList>

      <Heading num="03">アプリケーションアーキテクチャ ― 1つのアプリの内部の組み方</Heading>
      <p>こちらは、1つのアプリケーションのコードをどう層・役割に分けるかというスタイルです。MVCやClean Architectureなど、普段のWeb開発でより馴染みのある名前が多く並びます。「系統」は同じ発想の系譜(GUI系、Web系、ドメインモデル系など)を表し、22種のスタイルは7つの系統ページにまとめて解説しています(各行のリンク先)。</p>

      <ArchList>
        {appRows.map((row) => (
          <ArchRow key={`${row.era}-${row.name}`}>
            <ArchRowHead>
              <ArchRowMeta>
                <ArchEra>{row.era}</ArchEra>
                <FamilyTag>{row.family}</FamilyTag>
              </ArchRowMeta>
              <TierBadge tier={row.tier} />
            </ArchRowHead>
            <ArchTitle>{row.href ? <Link href={row.href}>{row.name}</Link> : row.name}</ArchTitle>
            {row.note && <MarkNote>{row.note}</MarkNote>}
            <ArchFeature>{row.feature}</ArchFeature>
            <ArchProblem label="解決したかった課題:">{row.problem}</ArchProblem>
          </ArchRow>
        ))}
      </ArchList>

      <Analogy label="💡 システムとアプリケーション、両方に出てくる「レイヤー」">
        「レイヤードアーキテクチャ」は両方の表に登場します。システム側では「複数サービスをどう階層で分けるか」、アプリケーション側では「1つのアプリの中身をどう階層で分けるか」という、同じ発想を違う粒度に適用したものです。<Link href="/design/architecture/sys/layered">レイヤードアーキテクチャのページ</Link>では主にシステム粒度の視点で、<Link href="/design/architecture/app/layered">レイヤー系のページ</Link>ではアプリ粒度の視点で解説しています。
      </Analogy>

      <Heading num="04">アーキテクチャと相性の良い設計原則・設計パターン</Heading>
      <p>どのアーキテクチャを選ぶかは、そのアーキテクチャの中で自然に効いてくる<Link href="/design/principles">設計原則</Link>や<Link href="/design/patterns">設計パターン</Link>を決めます。</p>
      <CardGrid>
        <Card>
          <h4><Link href="/design/architecture/sys/layered">レイヤードアーキテクチャ</Link></h4>
          <p><strong>設計原則:</strong> 関心の分離・情報隠蔽</p>
          <p><strong>パターン:</strong> Facade・Adapter</p>
        </Card>
        <Card>
          <h4><Link href="/design/architecture/sys/event-driven">イベント駆動アーキテクチャ</Link></h4>
          <p><strong>設計原則:</strong> 不変性を優先する・コマンド・クエリ分離(CQS)</p>
          <p><strong>パターン:</strong> Observer</p>
        </Card>
        <Card>
          <h4><Link href="/design/architecture/sys/microservices">マイクロサービス</Link></h4>
          <p><strong>設計原則:</strong> 単一責任の原則(SRP)・高凝集低結合</p>
          <p><strong>パターン:</strong> Facade(APIゲートウェイ)</p>
        </Card>
        <Card>
          <h4>CQRS(<Link href="/design/architecture/app/cqrs">高度な設計系</Link>)</h4>
          <p><strong>設計原則:</strong> コマンド・クエリ分離(CQS)</p>
          <p><strong>パターン:</strong> Command</p>
        </Card>
        <Card>
          <h4>Hexagonal/Clean Architecture(<Link href="/design/architecture/app/domain-centric">ドメイン中心アーキテクチャ系</Link>)</h4>
          <p><strong>設計原則:</strong> 依存性逆転の原則(DIP)</p>
          <p><strong>パターン:</strong> Adapter・Dependency Injection</p>
        </Card>
      </CardGrid>

      <Heading num="まとめ">最低限これだけは ― 必修の一覧</Heading>
      <p>両方の表から<Mark tier="must">必修</Mark>だけを抜き出すと、次の{mustSystem.length + mustApp.length}個になります。まずはこれらを優先して押さえれば、残りの<Mark tier="niche">専門</Mark>・<Mark tier="legacy">史</Mark>は必要になったタイミングで拾い読みするだけで十分です。</p>
      <CardGrid>
        <Card>
          <h4>システムアーキテクチャ</h4>
          <p>{mustSystem.map((r) => r.name).join(" / ")}</p>
        </Card>
        <Card>
          <h4>アプリケーションアーキテクチャ</h4>
          <p>{mustApp.map((r) => r.name).join(" / ")}</p>
        </Card>
      </CardGrid>

      <p>アプリケーションアーキテクチャの22種は、上表の「系統」ごとに(<Link href="/design/architecture/app/layered">レイヤー系</Link>〜<Link href="/design/architecture/app/cqrs">高度な設計系</Link>)にまとめて詳しく解説しています。次のページからは、まずシステムアーキテクチャの1つ目「<Link href="/design/architecture/sys/layered">レイヤードアーキテクチャ</Link>」です。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/paradigm" tag="設計">パラダイム</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/layered" tag="設計">レイヤードアーキテクチャ</RelatedLink>
                    <RelatedLink href="/design/architecture/app/layered" tag="設計">レイヤー系(アプリ)</RelatedLink>
                    <RelatedLink href="/design/principles" tag="設計">設計原則</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
