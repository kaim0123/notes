import {
  Sigma,
  Cpu,
  Network,
  Database,
  Shapes,
  Code2,
  Wrench,
  AppWindow,
  ServerCog,
  FlaskConical,
  ShieldCheck,
  Cloud,
  Layers,
  type LucideIcon,
} from "lucide-react";

export type NavNode = {
  href?: string;
  title: string;
  children?: NavNode[];
};

export type NavSection = {
  href: string;
  title: string;
  icon: LucideIcon;
  tree: NavNode[];
};

// 目次の設計意図は docs/03content-plan/nav-structure.md を参照。
// tree は現時点で空(該当ページがまだ無いため)。ページを書き次第、
// content/pages/・routes.ts・ここの tree に同時に追加していく(§3.1参照)。
export const sections: NavSection[] = [
  {
    href: "/theory",
    title: "基礎理論",
    icon: Sigma,
    // 第二階層の5見出しは索引ページを持つページ付きのノード。個別の掘り下げ
    // ページはその配下の第三階層として並べる。URLは第二階層を挟まないフラット
    // なまま(/theory/xxx)で、network・databaseと同じ方針(2026-08-30時点の決定)。
    tree: [
      {
        href: "/theory/numbers",
        title: "数と基数変換",
        children: [
          { href: "/theory/floating", title: "浮動小数点と演算精度" },
          { href: "/theory/encoding", title: "文字コード" },
        ],
      },
      {
        href: "/theory/logic",
        title: "論理と真理値表",
        children: [{ href: "/theory/formal", title: "形式言語" }],
      },
      {
        href: "/theory/probability",
        title: "確率・統計と情報理論",
        children: [{ href: "/theory/inference", title: "推定と仮説検定" }],
      },
      {
        href: "/theory/algorithms",
        title: "アルゴリズムとデータ構造",
        children: [
          { href: "/theory/complexity", title: "計算量とP対NP" },
          { href: "/theory/recursion", title: "再帰と分割統治" },
          { href: "/theory/tree", title: "木構造とヒープ" },
          { href: "/theory/hash", title: "ハッシュ表" },
          { href: "/theory/graphs", title: "グラフと最短経路" },
          { href: "/theory/string-search", title: "文字列探索" },
          { href: "/theory/dp", title: "動的計画法と貪欲法" },
        ],
      },
      {
        href: "/theory/media",
        title: "情報メディア",
        children: [
          { href: "/theory/media-basics", title: "マルチメディアの全体像" },
          { href: "/theory/media-image", title: "画像フォーマット" },
          { href: "/theory/media-video", title: "動画フォーマット" },
          { href: "/theory/media-audio", title: "音声フォーマット" },
          { href: "/theory/media-compression", title: "圧縮の考え方" },
          {
            href: "/theory/media-graphics",
            title: "色・解像度・グラフィックス応用",
          },
        ],
      },
    ],
  },
  {
    href: "/computer",
    title: "コンピュータ・OS",
    icon: Cpu,
    // 第二階層の4見出しはそれぞれ本文を持つページ。URLは第二階層を挟まない
    // フラットなまま(/computer/xxx)で、theory・network・databaseと同じ方針。
    tree: [
      {
        href: "/computer/hardware",
        title: "ハードウェアの基礎",
        children: [
        { href: "/computer/history", title: "コンピュータの歴史" },
        { href: "/computer/semiconductor", title: "半導体の全体像" },
        { href: "/computer/semiconductor-transistor", title: "トランジスタの正体" },
        { href: "/computer/semiconductor-logic", title: "直列と並列で論理をつくる" },
        { href: "/computer/semiconductor-adder", title: "足し算をつくる" },
        { href: "/computer/io-bus", title: "バス" },
        { href: "/computer/io-interface", title: "入出力インタフェース" },
        { href: "/computer/io-devices", title: "入出力装置" },
        { href: "/computer/io-devices-keyboard", title: "40%キーボードとレイヤー設計" },
        { href: "/computer/printer", title: "プリンターの仕組み" },
        { href: "/computer/system-architecture", title: "処理形態とシステム構成" },
        { href: "/computer/system-metrics", title: "性能と経済性の評価" },
        { href: "/computer/system-reliability", title: "信頼性と冗長化" },
        { href: "/computer/client", title: "クライアント管理の実務" },
        { href: "/computer/client-asset", title: "資産管理" },
        { href: "/computer/client-kitting", title: "キッティングと配布・回収" },
        { href: "/computer/client-license", title: "ライセンス管理" },
        { href: "/computer/client-security", title: "端末セキュリティ管理" },
        { href: "/computer/client-maintenance", title: "更新管理と保守・故障対応" },
        { href: "/computer/client-disposal", title: "廃棄管理" },
        ],
      },
      { href: "/computer/cpu", title: "CPU" },
      {
        href: "/computer/memory",
        title: "メモリ",
        children: [
        { href: "/computer/memory-history", title: "記憶装置の歴史" },
        { href: "/computer/memory-virtual", title: "仮想メモリとソフトウェアの肥大化" },
        { href: "/computer/memory-speed", title: "速さの壁" },
        { href: "/computer/memory-stack", title: "スタックと関数呼び出しの舞台裏" },
        ],
      },
      {
        href: "/computer/os",
        title: "OSの仕組み",
        children: [
        { href: "/computer/os-kernel", title: "カーネルの役割と設計" },
        { href: "/computer/os-process", title: "プロセスとスレッド" },
        { href: "/computer/os-memory", title: "記憶管理と仮想記憶" },
        { href: "/computer/os-syscall", title: "システムコール" },
        { href: "/computer/os-shell", title: "シェルの系譜" },
        { href: "/computer/os-filesystem", title: "ファイルシステム" },
        { href: "/computer/os-unix", title: "UNIXの歴史と哲学" },
        { href: "/computer/os-posix", title: "UNIX・BSD・Linuxの違い" },
        { href: "/computer/os-gnu", title: "GNUとフリーソフトウェア" },
        { href: "/computer/os-linux", title: "Linuxの歴史" },
        ],
      },
    ],
  },
  {
    href: "/network",
    title: "ネットワーク",
    icon: Network,
    // 第二階層は「技術の役割」で束ねた5見出しで固定(ページを持たないラベル)。
    // 元にしたCCNAの章順(contents/ネットワーク.md)とは、ワイヤレスLANをLAN側へ、
    // ACLをセキュリティ側へ寄せた点が異なる。URLはフラットなまま(/network/xxx)。
    tree: [
      {
        title: "ネットワークの基礎",
        children: [
          { href: "/network/tcp-ip", title: "TCP/IPの概要" },
          { href: "/network/ethernet", title: "イーサネットLANの基礎" },
          {
            href: "/network/ipv4-addressing",
            title: "IPv4アドレッシングの基礎",
          },
          { href: "/network/tcp-udp", title: "TCPとUDP" },
        ],
      },
      {
        title: "ルーティング",
        children: [
          { href: "/network/routing", title: "ルータの機能とルーティング" },
          { href: "/network/ospf", title: "OSPF" },
        ],
      },
      {
        title: "スイッチングとLAN",
        children: [
          { href: "/network/vlan", title: "Catalystスイッチの基本設定とVLAN" },
          { href: "/network/stp", title: "STP" },
          { href: "/network/etherchannel", title: "EtherChannel" },
          { href: "/network/wireless-lan", title: "ワイヤレスLAN" },
        ],
      },
      {
        title: "IPサービスとアドレス",
        children: [
          { href: "/network/nat-dhcp-dns", title: "NAT・DHCP・DNS" },
          { href: "/network/ipv6", title: "IPv6" },
          { href: "/network/ip-services", title: "IPサービスと運用" },
        ],
      },
      {
        title: "セキュリティ・運用・設計",
        children: [
          { href: "/network/acl", title: "ACL" },
          { href: "/network/security", title: "セキュリティ" },
          { href: "/network/device-management", title: "デバイスの管理" },
          { href: "/network/architecture", title: "ネットワークアーキテクチャ" },
          { href: "/network/sdn", title: "SDNとネットワークの自動化" },
        ],
      },
    ],
  },
  {
    href: "/database",
    title: "データベース",
    icon: Database,
    // 第二階層は nav-structure.md の5見出しで固定し(ページを持たないラベル)、
    // 個々のページはその配下の第三階層として並べる。URLは第二階層を挟まない
    // フラットなまま(/database/xxx)。
    tree: [
      {
        title: "役割と種類・関係モデル",
        children: [
          { href: "/database/history", title: "データベースの歴史" },
          { href: "/database/basics", title: "役割と種類" },
          { href: "/database/model", title: "関係モデルと3層スキーマ" },
        ],
      },
      {
        title: "SQLとデータ操作",
        children: [
          { href: "/database/sql", title: "SQLとデータ操作" },
          { href: "/database/features", title: "アプリ機能とDB設計" },
        ],
      },
      {
        title: "ER図と正規化",
        children: [
          { href: "/database/design", title: "ER図と正規化" },
          { href: "/database/antipattern", title: "設計のアンチパターン" },
          { href: "/database/physical", title: "物理設計と運用" },
        ],
      },
      {
        title: "トランザクション",
        children: [
          { href: "/database/transaction", title: "トランザクションと整合性" },
          {
            href: "/database/distributed-transactions",
            title: "分散トランザクション",
          },
        ],
      },
      {
        title: "パフォーマンス",
        children: [
          { href: "/database/index", title: "索引とアクセス制御" },
          { href: "/database/performance", title: "パフォーマンスチューニング" },
        ],
      },
    ],
  },
  {
    href: "/design",
    title: "設計",
    icon: Shapes,
    // 第二階層の5見出しは、束ねるだけのラベルではなくそれぞれ本文を持つ
    // ページ付きのノード。粒度の小さい順ではなく、パラダイム→設計原則→
    // アーキテクチャ→設計パターン→コーディング規約という読み進める順で並べる
    // (2026-08-30時点の決定)。URLは /design/xxx のフラットなまま。
    tree: [
      {
        href: "/design/paradigm",
        title: "パラダイム",
        children: [
          { href: "/design/paradigm-procedural", title: "手続き型" },
          { href: "/design/paradigm-structured", title: "構造化" },
          { href: "/design/paradigm-oop", title: "オブジェクト指向" },
          { href: "/design/paradigm-oop-object", title: "オブジェクトという言葉の3つの意味" },
          { href: "/design/paradigm-functional", title: "関数型" },
          { href: "/design/paradigm-functional-foundations", title: "純粋関数とイミュータビリティ" },
          { href: "/design/paradigm-functional-composition", title: "関数を組み合わせる" },
          { href: "/design/paradigm-functional-currying", title: "引数を固定する" },
          { href: "/design/paradigm-functional-safety", title: "安全に分岐する" },
        ],
      },
      {
        href: "/design/principles",
        title: "設計原則",
        children: [
          { href: "/design/principles-foundations", title: "黎明期の原則" },
          { href: "/design/principles-cohesion", title: "保守性の基本4原則" },
          { href: "/design/principles-solid", title: "SOLID" },
          { href: "/design/principles-modern", title: "現代の原則" },
          { href: "/design/errors", title: "エラー設計" },
          { href: "/design/methodology", title: "設計思想・方法論" },
          { href: "/design/methodology-info-hiding", title: "情報隠蔽" },
          { href: "/design/methodology-data-centric", title: "データ中心設計" },
          { href: "/design/methodology-object-centric", title: "オブジェクト中心設計" },
          { href: "/design/methodology-contract", title: "契約による設計" },
          { href: "/design/methodology-responsibility-driven", title: "責務駆動設計" },
          { href: "/design/methodology-use-case-driven", title: "ユースケース中心設計" },
          { href: "/design/methodology-ddd", title: "ドメイン駆動設計" },
          { href: "/design/methodology-ddd-tactical", title: "戦術的DDDをコードに書く" },
        ],
      },
      {
        href: "/design/architecture",
        title: "アーキテクチャ",
        children: [
          { href: "/design/architecture-layered", title: "レイヤードアーキテクチャ" },
          { href: "/design/architecture-pipeline", title: "パイプラインアーキテクチャ" },
          { href: "/design/architecture-microkernel", title: "マイクロカーネルアーキテクチャ" },
          { href: "/design/architecture-soa", title: "オーケストレーション駆動SOA" },
          { href: "/design/architecture-event-driven", title: "イベント駆動アーキテクチャ" },
          { href: "/design/architecture-space-based", title: "スペースベースアーキテクチャ" },
          { href: "/design/architecture-service-based", title: "サービスベースアーキテクチャ" },
          { href: "/design/architecture-microservices", title: "マイクロサービスアーキテクチャ" },
          { href: "/design/architecture-modular-monolith", title: "モジュラーモノリス" },
          { href: "/design/architecture-app-layered", title: "レイヤー系(アプリ)" },
          { href: "/design/architecture-app-gui", title: "GUI系(アプリ)" },
          { href: "/design/architecture-app-web", title: "Web系(アプリ)" },
          { href: "/design/architecture-app-domain-model", title: "ドメインモデル系(アプリ)" },
          { href: "/design/architecture-app-data-access", title: "データアクセス系(アプリ)" },
          { href: "/design/architecture-app-domain-centric", title: "ドメイン中心系(アプリ)" },
          { href: "/design/architecture-app-cqrs", title: "高度な設計系(CQRS)" },
        ],
      },
      {
        href: "/design/patterns",
        title: "設計パターン",
        children: [
          { href: "/design/patterns-gof-creation", title: "GoF ― 生成を工夫する" },
          { href: "/design/patterns-gof-structure", title: "GoF ― 構造を包む・繋ぐ" },
          { href: "/design/patterns-gof-collaboration", title: "GoF ― 連携・通知・走査" },
          { href: "/design/patterns-gof-algorithms", title: "GoF ― 振る舞いをオブジェクト化する" },
          { href: "/design/idioms", title: "実装パターン・イディオム" },
          { href: "/design/idioms-essentials", title: "必修イディオムを深く理解する" },
        ],
      },
      {
        href: "/design/conventions",
        title: "コーディング規約",
        children: [
          { href: "/design/conventions-functions", title: "関数・イベントハンドラの命名" },
          { href: "/design/conventions-variables", title: "変数・略語の命名" },
          { href: "/design/conventions-classes", title: "クラス・接尾辞の命名" },
          { href: "/design/conventions-files", title: "ファイル・ディレクトリの命名" },
          { href: "/design/docs", title: "ドキュメンテーション" },
          { href: "/design/docs-adr", title: "ADR ― 設計判断の記録" },
        ],
      },
    ],
  },
  {
    href: "/language",
    title: "言語",
    icon: Code2,
    // 第二階層の3見出しはそれぞれ本文を持つページ。URLは第二階層を挟まない
    // フラットなまま(/language/xxx)で、theory・computer・designと同じ方針。
    // 第三階層(言語の仕組みの各論・JS/TSの各章・並行処理の各論)は執筆次第ここへ足す。
    tree: [
      {
        href: "/language/basics",
        title: "言語の仕組み",
        children: [
          { href: "/language/compile", title: "コンパイルとリンク" },
          { href: "/language/types", title: "型システム" },
          { href: "/language/memory", title: "メモリ管理とGC" },
          { href: "/language/runtime", title: "ランタイム" },
          { href: "/language/compare", title: "主要言語の比較" },
          { href: "/language/history", title: "プログラミング言語の歴史" },
          { href: "/language/regex", title: "正規表現" },
        ],
      },
      {
        href: "/language/js",
        title: "JavaScript・TypeScript",
        children: [
          { href: "/language/js-values", title: "値と型" },
          { href: "/language/js-functions", title: "関数 ― プログラムの中心" },
          { href: "/language/js-data", title: "データの変換" },
          { href: "/language/js-types", title: "型を使いこなす" },
          { href: "/language/js-classes", title: "クラスとプロトタイプ" },
          { href: "/language/js-engine", title: "実行の仕組み" },
          { href: "/language/js-async", title: "非同期処理" },
          { href: "/language/js-browser", title: "ブラウザ ― Web API" },
          { href: "/language/js-generics", title: "ジェネリクスとユーティリティ型" },
          { href: "/language/js-node", title: "Node.js と標準ライブラリ" },
          { href: "/language/js-appendix", title: "付録" },
        ],
      },
      {
        href: "/language/concurrency",
        title: "並行処理",
        children: [
          { href: "/language/concurrency-race", title: "競合状態とデータ競合" },
          { href: "/language/concurrency-lock", title: "排他制御" },
          { href: "/language/concurrency-deadlock", title: "デッドロックと枯渇" },
          { href: "/language/concurrency-models", title: "並行モデル" },
          { href: "/language/concurrency-patterns", title: "実装パターン" },
        ],
      },
    ],
  },
  { href: "/dev", title: "開発の進め方", icon: Wrench, tree: [] },
  { href: "/frontend", title: "フロントエンド", icon: AppWindow, tree: [] },
  { href: "/backend", title: "バックエンド", icon: ServerCog, tree: [] },
  { href: "/test", title: "テスト", icon: FlaskConical, tree: [] },
  { href: "/security", title: "セキュリティ", icon: ShieldCheck, tree: [] },
  {
    href: "/infra",
    title: "インフラ・クラウド・運用",
    icon: Cloud,
    tree: [],
  },
  { href: "/other", title: "その他", icon: Layers, tree: [] },
];

function buildLabelMap(): Map<string, string> {
  const map = new Map<string, string>();
  const visit = (nodes: NavNode[]) => {
    for (const node of nodes) {
      if (node.href) map.set(node.href, node.title);
      if (node.children) visit(node.children);
    }
  };
  for (const section of sections) {
    map.set(section.href, section.title);
    visit(section.tree);
  }
  return map;
}

const labelMap = buildLabelMap();

// パンくずの中間セグメント用ラベル。ページを持たないURL中間セグメントや、
// タイトルが階層名として読みにくいページをここで上書きする。
const crumbLabels: Record<string, string> = {};

// 索引ページのタイトルは階層名として冗長になりがちなので、末尾の括弧書きと
// 「〜概要」「〜一覧」「〜の全体像」を落として短くする。
function shortenCrumb(title: string): string {
  const short = title
    .replace(/[（(][^（()）]*[)）]\s*$/, "")
    .replace(/(概要|一覧|の全体像)$/, "")
    .trim();
  return short || title;
}

// href が undefined のクラムはページが無いことを表す(リンクにしない)。
export type BreadcrumbCrumb = { href?: string; label: string };

export function getBreadcrumbTrail(pathname: string): BreadcrumbCrumb[] {
  const path = normalizePath(pathname);
  const segments = path.split("/").filter(Boolean);
  const section = sections.find((s) => isHome(path, s));

  // パンくずはURLではなく「そのページが属するセクション」から始める。
  const start =
    section && (path === section.href || path.startsWith(`${section.href}/`))
      ? section.href.split("/").filter(Boolean).length - 1
      : 0;

  const trail: BreadcrumbCrumb[] = [];
  let acc = "";
  for (const [index, segment] of segments.entries()) {
    acc += `/${segment}`;
    if (index < start) continue;
    const isLast = index === segments.length - 1;
    const override = crumbLabels[acc];
    const label = labelMap.get(acc);

    if (!label) {
      // ページが無い階層。リンクにせずラベルだけ出す。
      trail.push({ label: override ?? decodeURIComponent(segment) });
    } else if (override) {
      trail.push({ href: acc, label: override });
    } else if (isLast) {
      // 末端は現在のページなので、タイトルをそのまま出す。
      trail.push({ href: acc, label });
    } else if (acc === section?.href) {
      // セクションの入口はセクション名で表す(索引ページのタイトルは長い)。
      trail.push({ href: acc, label: section.title });
    } else {
      trail.push({ href: acc, label: shortenCrumb(label) });
    }
  }
  return trail;
}

// ---------------------------------------------------------------------------
// ページフッター(前へ/次へ・関連ページ)の自動導出
// すべて sections ツリーから機械的に計算する。ディレクトリ構成が変わっても
// nav.ts を更新するだけで全ページのフッターが追従する。
// ---------------------------------------------------------------------------

export type PageRef = {
  href: string;
  title: string;
  sectionHref: string;
  sectionTitle: string;
};

// trailingSlash: true のため usePathname() は "/foo/" のように末尾スラッシュ
// 付きで返る。nav の href(スラッシュ無し)と一致させるため正規化する。
export function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/"))
    return pathname.slice(0, -1);
  return pathname;
}

// href → その href を持つセクション候補(セクション索引 + ツリー内のノード)。
// 同じページが複数セクションのツリーに現れるのは相互参照リンクのケース。
function buildOwnerCandidates(): Map<string, NavSection[]> {
  const map = new Map<string, NavSection[]>();
  const add = (href: string, section: NavSection) => {
    const list = map.get(href);
    if (!list) map.set(href, [section]);
    else if (!list.includes(section)) list.push(section);
  };
  const visit = (nodes: NavNode[], section: NavSection) => {
    for (const node of nodes) {
      if (node.href) add(node.href, section);
      if (node.children) visit(node.children, section);
    }
  };
  for (const section of sections) {
    add(section.href, section);
    visit(section.tree, section);
  }
  return map;
}
const ownerCandidates = buildOwnerCandidates();

// 各ページが「自分の居場所」とするセクション。原則はそのページを載せている
// セクション。複数セクションに現れる相互参照リンクは、URL接頭辞が最も具体的に
// 一致するセクションを所属先とする。
function ownerOf(href: string): NavSection | undefined {
  const candidates = ownerCandidates.get(href);
  if (!candidates?.length) return undefined;
  if (candidates.length === 1) return candidates[0];
  let best: NavSection | undefined;
  for (const section of candidates) {
    if (href === section.href || href.startsWith(`${section.href}/`)) {
      if (!best || section.href.length > best.href.length) best = section;
    }
  }
  return best ?? candidates[0];
}

function isHome(href: string, section: NavSection): boolean {
  const owner = ownerOf(href);
  // navに載っていないページはURL接頭辞で判定する。
  if (!owner)
    return href === section.href || href.startsWith(`${section.href}/`);
  return owner === section;
}

// サイドバー/ボトムナビのセクション強調表示に使う。
export function isSectionActive(
  section: NavSection,
  pathname: string
): boolean {
  return isHome(normalizePath(pathname), section);
}

// pre-order DFS で読み進み順の全ページ列を作る(セクション索引→配下の順)。
function buildOrderedPages(): PageRef[] {
  const pages: PageRef[] = [];
  const seen = new Set<string>();
  const push = (href: string, title: string, section: NavSection) => {
    if (seen.has(href)) return;
    seen.add(href);
    pages.push({
      href,
      title,
      sectionHref: section.href,
      sectionTitle: section.title,
    });
  };
  const visit = (nodes: NavNode[], section: NavSection) => {
    for (const node of nodes) {
      if (node.href && isHome(node.href, section)) {
        push(node.href, node.title, section);
      }
      if (node.children) visit(node.children, section);
    }
  };
  for (const section of sections) {
    const before = seen.size;
    visit(section.tree, section);
    // ツリーがセクション索引を含まない場合は先頭に補う。
    if (!seen.has(section.href)) {
      const inserted: PageRef = {
        href: section.href,
        title: section.title,
        sectionHref: section.href,
        sectionTitle: section.title,
      };
      pages.splice(pages.length - (seen.size - before), 0, inserted);
      seen.add(section.href);
    }
  }
  return pages;
}

const orderedPages = buildOrderedPages();
const orderIndex = new Map(orderedPages.map((p, i) => [p.href, i]));

export type Pager = { prev: PageRef | null; next: PageRef | null };

// 前後のページ。セクションをまたぐ場合も全体の読み進み列で連結する。
export function getPager(pathname: string): Pager {
  const i = orderIndex.get(normalizePath(pathname));
  if (i === undefined) return { prev: null, next: null };
  return {
    prev: i > 0 ? orderedPages[i - 1] : null,
    next: i < orderedPages.length - 1 ? orderedPages[i + 1] : null,
  };
}

// href → 兄弟ノード配列 / 子ノード配列 を引くための索引。
type RelatedEntry = {
  siblings: NavNode[];
  children: NavNode[];
  section: NavSection;
};
function buildRelatedMap(): Map<string, RelatedEntry> {
  const map = new Map<string, RelatedEntry>();
  const walk = (nodes: NavNode[], siblings: NavNode[], section: NavSection) => {
    for (const node of nodes) {
      if (node.href) {
        map.set(node.href, {
          siblings,
          children: node.children ?? [],
          section,
        });
      }
      if (node.children) walk(node.children, node.children, section);
    }
  };
  for (const section of sections) walk(section.tree, section.tree, section);
  return map;
}
const relatedMap = buildRelatedMap();

// 関連ページの自動導出。索引/グループページなら配下、末端ページなら同階層の
// 兄弟。加えてセクション索引を必ず含める。最大6件。
export function getRelated(pathname: string, limit = 6): PageRef[] {
  const path = normalizePath(pathname);
  const entry = relatedMap.get(path);
  if (!entry) return [];
  const { section } = entry;
  const toRef = (node: NavNode): PageRef | null =>
    node.href
      ? {
          href: node.href,
          title: node.title,
          sectionHref: section.href,
          sectionTitle: section.title,
        }
      : null;

  const base = entry.children.length > 0 ? entry.children : entry.siblings;
  const seen = new Set<string>([path]);
  const out: PageRef[] = [];

  // セクション索引を先頭に(自分自身でなければ)。
  const sectionLabel = labelMap.get(section.href) ?? section.title;
  if (section.href !== path) {
    out.push({
      href: section.href,
      title: sectionLabel,
      sectionHref: section.href,
      sectionTitle: section.title,
    });
    seen.add(section.href);
  }

  for (const node of base) {
    if (out.length >= limit) break;
    const ref = toRef(node);
    if (ref && !seen.has(ref.href)) {
      seen.add(ref.href);
      out.push(ref);
    }
  }
  return out.slice(0, limit);
}

// フッターのメタ行 "notes · セクション · ページ"。
export function getFooterMeta(pathname: string): string {
  const path = normalizePath(pathname);
  const section = sections.find((s) => isHome(path, s));
  const parts = ["notes"];
  if (section) {
    parts.push(section.title);
    const current = labelMap.get(path);
    if (current && current !== section.title) parts.push(current);
  }
  return parts.join(" · ");
}
