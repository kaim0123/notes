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
  IndexGrid,
  IndexCard,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "設計",
};

const paradigmOverview = [
  { href: "/design/paradigm", title: "パラダイム一覧", desc: "手続き型からオブジェクト指向・関数型まで、コードの書き方の流派を時系列で見渡す" },
];

const paradigm = [
  { href: "/design/paradigm/procedural", title: "手続き型", desc: "1950-60s ― 処理の手順をそのまま記述する" },
  { href: "/design/paradigm/structured", title: "構造化", desc: "1960-70s ― GOTOを手放し、決まった制御構造で組み立てる" },
  { href: "/design/paradigm/oop", title: "オブジェクト指向", desc: "1970-90s ― データと処理を1つの単位にまとめる" },
  { href: "/design/paradigm/functional", title: "関数型", desc: "1980s〜 ― 副作用を持たない純粋関数を組み合わせる" },
];

const methodologyOverview = [
  { href: "/design/methodology", title: "設計思想・方法論一覧", desc: "DDD・責務駆動設計・データ中心設計など、何を軸に設計するかを見渡す" },
];

const methodology = [
  { href: "/design/methodology/info-hiding", title: "情報隠蔽", desc: "1972 ― 変わりやすい設計判断を軸にモジュールを分割する" },
  { href: "/design/methodology/data-centric", title: "データ中心設計", desc: "1990年代 ― データモデル(スキーマ)を最初に固める" },
  { href: "/design/methodology/object-centric", title: "オブジェクト中心設計", desc: "1980年代後半 ― 要求仕様の「名詞」からクラスを見つける" },
  { href: "/design/methodology/contract", title: "契約による設計", desc: "1988 ― モジュール間の責任範囲を契約として明文化する" },
  { href: "/design/methodology/responsibility-driven", title: "責務駆動設計(RDD)", desc: "1990年代前半 ― 「責務」と「協力関係」を中心に設計する" },
  { href: "/design/methodology/use-case-driven", title: "ユースケース中心設計", desc: "1992 ― 利用者とシステムのやり取りを中心に設計する" },
  { href: "/design/methodology/ddd", title: "ドメイン駆動設計(DDD)", desc: "2003 ― ドメインモデルと「ユビキタス言語」を中心に設計する" },
];

const principlesOverview = [
  { href: "/design/principles", title: "設計原則一覧", desc: "SOLID・DRY・KISS・YAGNIなど、コードの良し悪しの判断基準を時系列で見渡す" },
];

const principles = [
  { href: "/design/principles/foundations", title: "黎明期の原則", desc: "1968-75 ― 関心の分離・情報隠蔽・最小権限の原則" },
  { href: "/design/principles/cohesion", title: "保守性の基本4原則", desc: "1990s-2001 ― 高凝集・低結合・KISS・DRY・YAGNI" },
  { href: "/design/principles/solid", title: "SOLID", desc: "1994-98 ― SRP・OCP・LSP・ISP・DIP" },
  { href: "/design/principles/modern", title: "現代の原則", desc: "2003〜 ― Fail Fast・継承より合成・不変性・SSOT・明示的" },
];

const architectureOverview = [
  { href: "/design/architecture", title: "アーキテクチャ一覧", desc: "9スタイルを登場した時系列でまとめた表" },
];

const architecture = [
  { href: "/design/architecture/sys/layered", title: "レイヤードアーキテクチャ", desc: "1970年代 ― 責務を階層で分ける" },
  { href: "/design/architecture/sys/pipeline", title: "パイプラインアーキテクチャ", desc: "1970年代後半 ― データを一方向に流す" },
  { href: "/design/architecture/sys/microkernel", title: "マイクロカーネルアーキテクチャ", desc: "1980年代 ― 本体は小さく、拡張はプラグインで" },
  { href: "/design/architecture/sys/soa", title: "オーケストレーション駆動SOA", desc: "1990年代後半 ― 機能をサービスとして共通化する" },
  { href: "/design/architecture/sys/event-driven", title: "イベント駆動アーキテクチャ", desc: "2000年代前半 ― 「起きたこと」を非同期に伝える" },
  { href: "/design/architecture/sys/space-based", title: "スペースベースアーキテクチャ", desc: "2000年代前半 ― データベースをボトルネックにしない" },
  { href: "/design/architecture/sys/service-based", title: "サービスベースアーキテクチャ", desc: "2000年代後半 ― SOAとマイクロサービスの中間" },
  { href: "/design/architecture/sys/microservices", title: "マイクロサービスアーキテクチャ", desc: "2011年頃 ― チームごとに独立してデプロイする" },
  { href: "/design/architecture/sys/modular-monolith", title: "モジュラーモノリス", desc: "2018年頃 ― 単一アプリのまま、内部だけ疎結合にする" },
];

const appArchitecture = [
  { href: "/design/architecture/app/layered", title: "レイヤー系", desc: "1970年代〜2015年頃 ― レイヤードアーキテクチャ、Three-Tier、Vertical Slice など" },
  { href: "/design/architecture/app/gui", title: "GUI系", desc: "1979〜1990年代 ― MVC、PAC、MVP、Document-View" },
  { href: "/design/architecture/app/web", title: "Web系", desc: "2002年 ― Front Controller、Page Controller、Template View" },
  { href: "/design/architecture/app/domain-model", title: "ドメインモデル系", desc: "2002年 ― Domain Model、Transaction Script、Table Module" },
  { href: "/design/architecture/app/data-access", title: "データアクセス系", desc: "2002年 ― Active Record、Data Mapper、Repository" },
  { href: "/design/architecture/app/domain-centric", title: "ドメイン中心アーキテクチャ系", desc: "2003〜2012年 ― Hexagonal、DCI、Onion、Clean Architecture" },
  { href: "/design/architecture/app/cqrs", title: "高度な設計系", desc: "2009年 ― CQRS" },
];

const patterns = [
  { href: "/design/patterns", title: "設計パターン", desc: "GoFの23パターン(生成・構造・振る舞い)" },
];

const functionalPatterns = [
  { href: "/design/paradigm/functional/foundations", title: "純粋関数とイミュータビリティ", desc: "副作用のない関数と、データを変更しない設計" },
  { href: "/design/paradigm/functional/composition", title: "関数を組み合わせる", desc: "高階関数・関数合成・パイプライン・Map/Filter/Reduce・遅延評価" },
  { href: "/design/paradigm/functional/currying", title: "引数を固定する", desc: "カリー化・部分適用で、引数の一部を先に固定する" },
  { href: "/design/paradigm/functional/safety", title: "安全に分岐する", desc: "パターンマッチング・Option/Maybe・Either/Resultでnullと例外を減らす" },
];

const idioms = [
  { href: "/design/idioms", title: "実装パターン・イディオム", desc: "DI・Null Object・Extension Methodなど、言語ごとの書き方の工夫" },
];

const conventionsOverview = [
  { href: "/design/conventions", title: "コーディング規約・スタイル一覧", desc: "命名規則・フォーマッタ・リンターなど、読み書きのコストを下げる取り決め" },
];

const conventions = [
  { href: "/design/conventions/functions", title: "関数・イベントハンドラの命名", desc: "動詞+名詞の基本形、is/has/can、on/handleの使い分け" },
  { href: "/design/conventions/variables", title: "変数・略語の命名", desc: "camelCaseの基本ルールと、慣習的に許容される略語" },
  { href: "/design/conventions/classes", title: "クラス・接尾辞の命名", desc: "Service・Repository・Controllerなど役割を示す接尾辞" },
  { href: "/design/conventions/files", title: "ファイル・ディレクトリの命名", desc: "種類別のファイル名ルールと、exportとの対応" },
];

const documentation = [
  { href: "/design/errors", title: "エラー設計", desc: "失敗をどう型で表し、どこで受け止めるか。層をまたぐときの翻訳と再試行可能性" },
  { href: "/design/docs", title: "ドキュメンテーション", desc: "コードから導けないこと(意図・制約・運用手順)だけを、コードの隣に書く" },
  { href: "/design/docs/adr", title: "ADR ― 設計判断の記録", desc: "なぜその案を選び、何を却下したか。1件1ファイルで残し、置き換えで更新する" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>設計</h1>
        <Lead>
          「どう組み立てるか」を7つの粒度で見ていきます。1つのコードの書き方である<Term>パラダイム</Term>(4スタイル)、何を軸に設計するかの<Term>設計思想・方法論</Term>(7手法)、コードの良し悪しの<Term>設計原則</Term>、複数サービス/1つのアプリ内部の組み方である<Term>アーキテクチャ</Term>(システム9スタイル+アプリケーション系統別)、クラス数個の定石である<Term>設計パターン</Term>、言語ごとの<Term>実装パターン・イディオム</Term>、そして読み書きのコストを下げる<Term>コーディング規約・スタイル</Term>です。
        </Lead>
        <p>試験で問われる開発工程としての設計(外部設計・内部設計・構造化設計・データ中心設計など)は、<Link href="/design">開発技術セクションの設計</Link>で扱います。本セクションは実装時の設計判断が主題です。</p>
      </Hero>

      <Heading num="01">パラダイム ― コードの書き方</Heading>
      <IndexGrid>
        {paradigmOverview.map((topic) => (
          <IndexCard key={topic.href} href={topic.href} num="01" title={topic.title}>
            {topic.desc}
          </IndexCard>
        ))}
        {paradigm.map((topic, i) => (
          <IndexCard
            key={topic.href}
            href={topic.href}
            num={String(i + 2).padStart(2, "0")}
            title={topic.title}
          >
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <Heading num="02">設計思想・方法論 ― 何を軸に設計するか</Heading>
      <IndexGrid>
        {methodologyOverview.map((topic) => (
          <IndexCard key={topic.href} href={topic.href} num="01" title={topic.title}>
            {topic.desc}
          </IndexCard>
        ))}
        {methodology.map((topic, i) => (
          <IndexCard
            key={topic.href}
            href={topic.href}
            num={String(i + 2).padStart(2, "0")}
            title={topic.title}
          >
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <Heading num="03">設計原則 ― 判断基準</Heading>
      <IndexGrid>
        {principlesOverview.map((topic) => (
          <IndexCard key={topic.href} href={topic.href} num="01" title={topic.title}>
            {topic.desc}
          </IndexCard>
        ))}
        {principles.map((topic, i) => (
          <IndexCard
            key={topic.href}
            href={topic.href}
            num={String(i + 2).padStart(2, "0")}
            title={topic.title}
          >
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <Heading num="04">アーキテクチャ ― システムの組み方(時系列)</Heading>
      <p>1970年代のレイヤードアーキテクチャから2018年頃のモジュラーモノリスまで、それぞれが「前の時代のスタイルで困っていたこと」への回答として登場しています。まず時系列表で全体を見渡してから、1つずつのページへ進みます。</p>
      <IndexGrid>
        {architectureOverview.map((topic) => (
          <IndexCard key={topic.href} href={topic.href} num="01" title={topic.title}>
            {topic.desc}
          </IndexCard>
        ))}
        {architecture.map((topic, i) => (
          <IndexCard
            key={topic.href}
            href={topic.href}
            num={String(i + 2).padStart(2, "0")}
            title={topic.title}
          >
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <Heading num="05">アプリケーションアーキテクチャ ― アプリ内部の組み方(系統別)</Heading>
      <p>MVCやClean Architectureなど、1つのアプリケーションの内部構造に関わるスタイルです。<Link href="/design/architecture">アーキテクチャ一覧</Link>の時系列表にある22種を、同じ発想の系譜(系統)ごとにまとめています。</p>
      <IndexGrid>
        {appArchitecture.map((topic, i) => (
          <IndexCard
            key={topic.href}
            href={topic.href}
            num={String(i + 1).padStart(2, "0")}
            title={topic.title}
          >
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <Heading num="06">設計パターン ― クラス数個の定石</Heading>
      <IndexGrid>
        {patterns.map((topic) => (
          <IndexCard key={topic.href} href={topic.href} num="01" title={topic.title}>
            {topic.desc}
          </IndexCard>
        ))}
        {functionalPatterns.map((topic, i) => (
          <IndexCard
            key={topic.href}
            href={topic.href}
            num={String(i + 2).padStart(2, "0")}
            title={topic.title}
          >
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <Heading num="07">実装パターン・イディオム ― 言語ごとの書き方</Heading>
      <IndexGrid>
        {idioms.map((topic) => (
          <IndexCard key={topic.href} href={topic.href} num="01" title={topic.title}>
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <Heading num="08">コーディング規約・スタイル ― 読み書きのコスト</Heading>
      <IndexGrid>
        {conventionsOverview.map((topic) => (
          <IndexCard key={topic.href} href={topic.href} num="01" title={topic.title}>
            {topic.desc}
          </IndexCard>
        ))}
        {conventions.map((topic, i) => (
          <IndexCard
            key={topic.href}
            href={topic.href}
            num={String(i + 2).padStart(2, "0")}
            title={topic.title}
          >
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <Heading num="09">エラー設計とドキュメント ― 失敗と意図を残す</Heading>
      <IndexGrid>
        {documentation.map((topic, i) => (
          <IndexCard
            key={topic.href}
            href={topic.href}
            num={String(i + 1).padStart(2, "0")}
            title={topic.title}
          >
            {topic.desc}
          </IndexCard>
        ))}
      </IndexGrid>

      <DocsFooter />
    </DocsPage>
  );
}
