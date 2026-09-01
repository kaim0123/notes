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
  {
    href: "/dev",
    title: "開発の進め方",
    icon: Wrench,
    // 第二階層の4見出しはそれぞれ本文を持つページ。URLは第二階層を挟まない
    // フラットなまま(/dev/xxx)で、language・design と同じ方針。
    // 第三階層(工程の各論・ツールの各論・Gitの各論等)は執筆次第ここへ足す。
    tree: [
      {
        href: "/dev/process",
        title: "開発プロセス",
        children: [
          { href: "/dev/process-agile", title: "スクラムとアジャイル実践" },
          { href: "/dev/process-advanced", title: "プロセス成熟度" },
          { href: "/dev/process-history", title: "開発手法の変遷" },
          { href: "/dev/requirements", title: "要件定義" },
          { href: "/dev/requirements-modeling", title: "要件の表現方法" },
          { href: "/dev/implementation", title: "設計をコードに落とす" },
          { href: "/dev/stack", title: "技術スタックの組み合わせ" },
        ],
      },
      {
        href: "/dev/tooling",
        title: "開発環境とツール",
        children: [
          { href: "/dev/environments", title: "環境の全体像" },
          { href: "/dev/dotenv", title: ".envと.gitignore" },
          { href: "/dev/tooling-deps", title: "依存とバージョン" },
          { href: "/dev/tooling-security", title: "依存の脆弱性とサプライチェーン" },
          { href: "/dev/tooling-build", title: "ビルドの中身" },
          { href: "/dev/tooling-monorepo", title: "モノレポとワークスペース" },
          { href: "/dev/tooling-license", title: "知的財産とライセンス" },
        ],
      },
      {
        href: "/dev/git-ci",
        title: "Git・CI/CD",
        children: [
          { href: "/dev/git-basics", title: "Gitの仕組み" },
          { href: "/dev/git-conflict", title: "マージ・リベースとコンフリクト解決" },
          { href: "/dev/git-recovery", title: "履歴のやり直しと復旧" },
          { href: "/dev/git-release", title: "バージョニングとリリース" },
          { href: "/dev/git-config-change", title: "構成管理と変更管理" },
          { href: "/dev/ci-actions", title: "GitHub Actionsの実務" },
          { href: "/dev/ci-deploy", title: "デプロイ戦略とロールバック" },
        ],
      },
      {
        href: "/dev/debug",
        title: "デバッグと性能改善",
        children: [
          { href: "/dev/debug-profiling", title: "プロファイリング" },
          { href: "/dev/cache", title: "キャッシュの全体像" },
        ],
      },
    ],
  },
  {
    href: "/frontend",
    title: "フロントエンド",
    icon: AppWindow,
    // 第二階層の7見出しはそれぞれ本文を持つページ。URLは第二階層を挟まない
    // フラットなまま(/frontend/xxx)で、theory・computer・design・languageと
    // 同じ方針。ReactとNext.jsは束ねラベルではなく見出しページとして置く。
    tree: [
      {
        href: "/frontend/web",
        title: "Web基礎",
        children: [
          { href: "/frontend/perf", title: "表示速度を測って直す" },
          { href: "/frontend/i18n", title: "国際化と日時" },
        ],
      },
      {
        href: "/frontend/styling",
        title: "スタイリング",
        children: [
          { href: "/frontend/layout", title: "CSSレイアウト" },
          { href: "/frontend/tailwind", title: "Tailwind CSS" },
        ],
      },
      {
        href: "/frontend/data",
        title: "通信とデータ保存",
        children: [
          { href: "/frontend/http", title: "HTTP通信" },
          { href: "/frontend/realtime", title: "リアルタイム通信" },
          { href: "/frontend/storage", title: "ブラウザストレージ" },
        ],
      },
      {
        href: "/frontend/ux",
        title: "UX・UI",
        children: [
          { href: "/frontend/ux-basics", title: "UXの基礎" },
          { href: "/frontend/ux-hcd", title: "人間中心設計と評価" },
          { href: "/frontend/ux-design-thinking", title: "デザイン思考" },
          { href: "/frontend/ux-visual", title: "視覚デザイン" },
          { href: "/frontend/ux-gui", title: "GUIの部品" },
          { href: "/frontend/ux-screen", title: "画面設計と入力チェック" },
          { href: "/frontend/ux-form", title: "フォーム作成時の注意" },
          { href: "/frontend/ux-web", title: "Web UIデザイン" },
          { href: "/frontend/ux-system", title: "コンポーネントとデザインシステム" },
          { href: "/frontend/ux-a11y", title: "ユーザビリティとアクセシビリティ" },
        ],
      },
      {
        href: "/frontend/components",
        title: "コンポーネントと状態",
        children: [
          { href: "/frontend/components-state", title: "コンポーネント別の状態設計" },
          { href: "/frontend/state", title: "状態管理設計" },
        ],
      },
      {
        href: "/frontend/react",
        title: "React",
        children: [
          { href: "/frontend/react-functional", title: "関数型として読むReact" },
          { href: "/frontend/react-typescript", title: "TypeScriptでコンポーネントを書く" },
          { href: "/frontend/react-jsx", title: "JSXとレンダリング" },
          { href: "/frontend/react-props", title: "Propsと一方向データフロー" },
          { href: "/frontend/react-state", title: "Stateと更新" },
          { href: "/frontend/react-effects", title: "副作用(Effects)" },
          { href: "/frontend/react-ref", title: "Ref" },
          { href: "/frontend/react-performance", title: "メモ化とパフォーマンス" },
          { href: "/frontend/react-context", title: "Context" },
          { href: "/frontend/react-logic-reuse", title: "ロジックを再利用する" },
          { href: "/frontend/react-composition", title: "コンポーネントを組み合わせる" },
          { href: "/frontend/react-forms", title: "フォームの値を管理する" },
          { href: "/frontend/react-boundary", title: "エラー境界とフォールバックUI" },
        ],
      },
      {
        href: "/frontend/nextjs",
        title: "Next.js",
        children: [
          { href: "/frontend/nextjs-routing", title: "ルーティングとレイアウト" },
          { href: "/frontend/nextjs-components", title: "Server/Clientコンポーネントの境界" },
          { href: "/frontend/nextjs-data", title: "データフェッチ・キャッシュ・再検証" },
          { href: "/frontend/nextjs-rendering", title: "配信を最適化する" },
        ],
      },
    ],
  },
  {
    href: "/backend",
    title: "バックエンド",
    icon: ServerCog,
    // 第二階層の6見出しはそれぞれ本文を持つページ。URLは第二階層を挟まない
    // フラットなまま(/backend/xxx)で、frontend・dev と同じ方針。
    // 「認証の実装」はセキュリティセクションの「認証・認可」と区別するための名前
    // (概念・脅威=セキュリティ / 実装手順=ここ)。
    tree: [
      {
        href: "/backend/api",
        title: "API",
        children: [
          { href: "/backend/api-styles", title: "APIの種類と選び方" },
          { href: "/backend/api-rest", title: "REST API" },
          { href: "/backend/api-design", title: "API設計(LSUD / SSKD)" },
          { href: "/backend/api-orchestration", title: "オーケストレーションとBFF" },
          { href: "/backend/api-openapi", title: "OpenAPIと契約" },
          { href: "/backend/api-versioning", title: "バージョニングと廃止" },
        ],
      },
      {
        href: "/backend/layers",
        title: "アプリケーションの組み立て",
        children: [
          { href: "/backend/upload", title: "ファイルアップロード" },
          { href: "/backend/mail", title: "メール送信と通知" },
          { href: "/backend/jobs", title: "ジョブキューとワーカー" },
        ],
      },
      {
        href: "/backend/data",
        title: "データ層",
        children: [
          { href: "/backend/data-transaction", title: "トランザクション境界" },
          { href: "/backend/data-pool", title: "コネクションプールとN+1" },
          { href: "/backend/data-migration", title: "マイグレーション" },
          { href: "/backend/cache", title: "サーバーサイドキャッシュ" },
        ],
      },
      {
        href: "/backend/auth",
        title: "認証の実装",
        children: [
          { href: "/backend/auth-token", title: "トークンの運用" },
          { href: "/backend/auth-oauth", title: "外部IdP連携(OAuth 2.0 / OIDC)" },
          { href: "/backend/auth-account", title: "パスワードとアカウント回復" },
        ],
      },
      {
        href: "/backend/ops",
        title: "本番運用",
        children: [
          { href: "/backend/ops-rate-limit", title: "レート制限" },
          { href: "/backend/ops-resilience", title: "タイムアウト・リトライ・遮断" },
          { href: "/backend/ops-lifecycle", title: "起動と停止" },
          { href: "/backend/ops-tracing", title: "リクエストIDと分散トレーシング" },
        ],
      },
      {
        href: "/backend/express",
        title: "Node.js・Express",
        children: [
          { href: "/backend/express-hello", title: "最初のサーバー" },
          { href: "/backend/express-routing", title: "ルーティング" },
          { href: "/backend/express-router", title: "ルーターに分割する" },
          { href: "/backend/express-request", title: "Requestオブジェクト" },
          { href: "/backend/express-response", title: "Responseオブジェクト" },
          { href: "/backend/express-middleware", title: "ミドルウェア" },
          { href: "/backend/express-json", title: "JSON API" },
          { href: "/backend/express-async", title: "非同期処理" },
          { href: "/backend/express-error", title: "エラーハンドリング" },
          { href: "/backend/express-validation", title: "バリデーション" },
          { href: "/backend/express-logging", title: "ログ" },
          { href: "/backend/express-design", title: "Expressでの API設計" },
          { href: "/backend/express-auth", title: "認証・認可の実装" },
          { href: "/backend/express-database", title: "データベース連携" },
        ],
      },
    ],
  },
  {
    href: "/test",
    title: "テスト",
    icon: FlaskConical,
    // 第二階層の6見出しは索引ページを持つページ付きのノード。配下の第三階層は
    // まだ未執筆(計画は nav-structure.md 参照)。URLは第二階層を挟まないフラット
    // なまま(/test/xxx)で、他セクションと同じ方針(2026-09-01時点の決定)。
    tree: [
      {
        href: "/test/strategy",
        title: "品質計画と戦略",
        children: [
          { href: "/test/quality-plan", title: "品質計画" },
          { href: "/test/design-techniques", title: "テスト設計技法" },
        ],
      },
      {
        href: "/test/levels",
        title: "テストの段階",
        children: [
          { href: "/test/unit", title: "Unitテスト" },
          { href: "/test/integration", title: "Integrationテスト" },
          { href: "/test/api", title: "APIのテスト" },
          { href: "/test/e2e", title: "E2Eテストの全体像" },
          { href: "/test/e2e-viewpoints", title: "テスト観点の洗い出し" },
          { href: "/test/e2e-waiting", title: "描画待機とAI生成テストのレビュー" },
          { href: "/test/tools", title: "Vitest・Playwright" },
        ],
      },
      { href: "/test/tdd", title: "テスト駆動開発(TDD)" },
      {
        href: "/test/stability",
        title: "テストを安定させる",
        children: [
          { href: "/test/doubles", title: "テストダブル" },
          { href: "/test/data", title: "テストデータ管理" },
          { href: "/test/patterns", title: "テストパターン" },
          { href: "/test/flaky", title: "フレーキーテスト" },
        ],
      },
      {
        href: "/test/non-functional",
        title: "機能以外のテスト",
        children: [
          { href: "/test/performance", title: "性能テストと負荷テスト" },
          { href: "/test/security", title: "セキュリティテスト" },
          { href: "/test/non-functional-ci", title: "非機能テストの組み込み" },
        ],
      },
      {
        href: "/test/review",
        title: "レビューと品質確認",
        children: [
          { href: "/test/code-review", title: "コードレビュー" },
          { href: "/test/acceptance", title: "受入れ基準とレビュー技法" },
        ],
      },
    ],
  },
  {
    href: "/security",
    title: "セキュリティ",
    icon: ShieldCheck,
    // 第二階層の6見出しは索引ページを持つページ付きのノード。配下の第三階層は
    // まだ未執筆(計画は nav-structure.md 参照)。URLは第二階層を挟まないフラット
    // なまま(/security/xxx)で、他セクションと同じ方針(2026-09-01時点の決定)。
    tree: [
      { href: "/security/basics", title: "情報セキュリティの目的と脅威" },
      { href: "/security/management", title: "リスクマネジメント" },
      {
        href: "/security/attacks",
        title: "攻撃手法",
        children: [
          { href: "/security/injection", title: "インジェクション攻撃" },
          { href: "/security/xss", title: "XSSと出力エスケープ" },
          { href: "/security/csrf", title: "CSRF対策" },
        ],
      },
      {
        href: "/security/crypto",
        title: "暗号技術",
        children: [
          { href: "/security/hash", title: "ハッシュ関数と衝突攻撃" },
        ],
      },
      {
        href: "/security/auth",
        title: "認証・認可",
        children: [
          { href: "/security/authz", title: "認可" },
          { href: "/security/session", title: "セッションとCookie" },
          { href: "/security/token", title: "トークンの全体像" },
          { href: "/security/identity", title: "認証プロトコルの変遷" },
        ],
      },
      {
        href: "/security/countermeasures",
        title: "セキュリティ対策・実装",
        children: [
          { href: "/security/network-defense", title: "ネットワーク層の防御" },
          { href: "/security/headers", title: "セキュリティヘッダ" },
          { href: "/security/cache", title: "キャッシュ制御と情報漏洩" },
          { href: "/security/logging", title: "ログ出力設計" },
        ],
      },
    ],
  },
  {
    href: "/infra",
    title: "インフラ・クラウド・運用",
    icon: Cloud,
    // 第二階層の8見出しは索引ページを持つページ付きのノード。配下の第三階層は
    // まだ未執筆(計画は nav-structure.md 参照)。AWS・Google Cloud・Cloudflare を
    // それぞれ第二階層へ上げたのは、クラウドを1見出しにまとめると個別サービスが
    // 第四階層になってしまうため(2026-08-30時点の決定)。
    tree: [
      {
        href: "/infra/virtualization",
        title: "仮想化とコンテナ",
        children: [
          { href: "/infra/docker", title: "Docker" },
          { href: "/infra/kubernetes", title: "Kubernetes" },
          { href: "/infra/container-security", title: "コンテナセキュリティ" },
          { href: "/infra/observability", title: "オブザーバビリティ" },
        ],
      },
      {
        href: "/infra/server",
        title: "サーバーとストレージ",
        children: [
          { href: "/infra/server-build", title: "サーバー構築の実務" },
          { href: "/infra/storage", title: "ストレージの仕組み" },
          { href: "/infra/storage-backup", title: "バックアップと復旧" },
        ],
      },
      {
        href: "/infra/monitoring",
        title: "監視と障害対応",
        children: [
          { href: "/infra/monitoring-data", title: "監視データと統計" },
          { href: "/infra/monitoring-server", title: "サーバー・機器の監視" },
          { href: "/infra/monitoring-app", title: "アプリ監視とビジネスKPI" },
          { href: "/infra/monitoring-frontend", title: "フロントエンド監視" },
          { href: "/infra/incident", title: "障害の切り分け" },
        ],
      },
      {
        href: "/infra/deploy",
        title: "デプロイと公開",
        children: [
          { href: "/infra/deployment", title: "導入と受入れ" },
        ],
      },
      {
        href: "/infra/aws",
        title: "AWS",
        children: [
          { href: "/infra/aws-basics", title: "AWSの基礎" },
          { href: "/infra/aws-compute", title: "コンピューティング" },
          { href: "/infra/aws-lambda", title: "Lambda" },
          { href: "/infra/aws-container", title: "コンテナ" },
          { href: "/infra/aws-storage", title: "ストレージ" },
          { href: "/infra/aws-s3", title: "S3" },
          { href: "/infra/aws-database", title: "データベース" },
          { href: "/infra/aws-network", title: "ネットワーキングとコンテンツ配信" },
          { href: "/infra/aws-route53", title: "Route 53" },
          { href: "/infra/aws-cloudfront", title: "CloudFront" },
          { href: "/infra/aws-acm", title: "ACM" },
          { href: "/infra/aws-security", title: "セキュリティ、アイデンティティ、コンプライアンス" },
          { href: "/infra/aws-secrets-manager", title: "Secrets Manager" },
          { href: "/infra/aws-integration", title: "アプリケーション統合" },
          { href: "/infra/aws-sqs", title: "SQS" },
          { href: "/infra/aws-sns", title: "SNS" },
          { href: "/infra/aws-eventbridge", title: "EventBridge" },
          { href: "/infra/aws-monitoring", title: "モニタリングと管理" },
          { href: "/infra/aws-cloudwatch", title: "CloudWatch" },
          { href: "/infra/aws-cicd", title: "CI/CD" },
          { href: "/infra/aws-codebuild", title: "CodeBuild" },
          { href: "/infra/aws-codepipeline", title: "CodePipeline" },
          { href: "/infra/aws-iac", title: "IaC" },
        ],
      },
      {
        href: "/infra/gcp",
        title: "Google Cloud",
        children: [
          { href: "/infra/gcp-basics", title: "Google Cloudの基礎" },
          { href: "/infra/gcp-compute", title: "コンピューティング" },
          { href: "/infra/gcp-functions", title: "Cloud Functions" },
          { href: "/infra/gcp-container", title: "コンテナ" },
          { href: "/infra/gcp-storage", title: "ストレージ" },
          { href: "/infra/gcp-cloud-storage", title: "Cloud Storage" },
          { href: "/infra/gcp-database", title: "データベース" },
          { href: "/infra/gcp-network", title: "ネットワーキングとコンテンツ配信" },
          { href: "/infra/gcp-dns", title: "Cloud DNS" },
          { href: "/infra/gcp-cdn", title: "Cloud CDN" },
          { href: "/infra/gcp-certificate-manager", title: "Certificate Manager" },
          { href: "/infra/gcp-security", title: "セキュリティ、アイデンティティ、コンプライアンス" },
          { href: "/infra/gcp-secret-manager", title: "Secret Manager" },
          { href: "/infra/gcp-integration", title: "アプリケーション統合" },
          { href: "/infra/gcp-pubsub", title: "Pub/Sub" },
          { href: "/infra/gcp-monitoring", title: "モニタリングと管理" },
          { href: "/infra/gcp-cloud-monitoring", title: "Cloud Monitoring" },
          { href: "/infra/gcp-cicd", title: "CI/CD" },
          { href: "/infra/gcp-cloud-build", title: "Cloud Build" },
          { href: "/infra/gcp-iac", title: "IaC" },
        ],
      },
      { href: "/infra/cloudflare", title: "Cloudflare" },
      {
        href: "/infra/ops",
        title: "サービス運営",
        children: [
          { href: "/infra/ops-performance", title: "パフォーマンス" },
          { href: "/infra/ops-data", title: "データ管理" },
          { href: "/infra/ops-analytics", title: "分析・改善" },
          { href: "/infra/ops-content", title: "コンテンツ管理" },
          { href: "/infra/ops-cost", title: "コスト管理" },
          { href: "/infra/ops-maintenance", title: "保守" },
          { href: "/infra/ops-compliance", title: "法令・コンプライアンス" },
        ],
      },
    ],
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
