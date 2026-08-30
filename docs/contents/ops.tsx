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
  Analogy,
  IndexGrid,
  IndexCard,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "サービス運営",
};

const groups = [
  {
    label: "公開して動かす",
    topics: [
      { href: "/ops/deploy", title: "インフラとデプロイ", desc: "どこで動かし、どう公開するか ― ホスティング・DNS・SSL・CDN・CI/CD" },
      { href: "/ops/performance", title: "パフォーマンス", desc: "Core Web Vitals・キャッシュ戦略・画像最適化で「速く表示する」" },
    ],
  },
  {
    label: "育てる",
    topics: [
      { href: "/ops/data", title: "データ管理", desc: "DB・ストレージの選び方と、バックアップ・リストア戦略" },
      { href: "/ops/content", title: "コンテンツ管理", desc: "CMS・画像管理・公開フローで更新を効率化する" },
      { href: "/ops/analytics", title: "分析・改善", desc: "アクセス解析・SEO・改善サイクルで利用状況を知る" },
    ],
  },
  {
    label: "守る",
    topics: [
      { href: "/ops/cost", title: "コスト管理", desc: "クラウド費用の内訳と、無駄なコストが生まれる典型パターン" },
      { href: "/ops/compliance", title: "法令・コンプライアンス", desc: "プライバシーポリシー・Cookie同意・アクセシビリティ" },
    ],
  },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>サービス運営</Eyebrow>
        <h1>サービス運営 ― コードを書き終えた後に始まる仕事</h1>
        <Lead>
          サイトは公開して終わりではありません。動かし続け、安全に保ち、育てていくところから本当の<Term>運用</Term>が始まります。ここでは「サイト運営で考えるべきこと」を12のジャンルに整理し、それぞれをAtlas内のどのページで扱っているかをまとめます。
        </Lead>
      </Hero>

      <Heading num="01">運営を構成する12のジャンル</Heading>
      <p>公開されたサイトを「動いている状態」に保つには、コード以外にも考えるべきことが数多くあります。<Term>セキュリティ</Term>・<Term>品質管理</Term>・<Term>監視</Term>はすでに<Link href="/security">セキュリティ</Link>・<Link href="/test">テスト</Link>・<Link href="/infra/monitoring">監視</Link>セクションで厚く扱っているため、ここでは残り7ジャンルを新規に扱います。</p>

      <table>
        <thead>
          <tr><th>ジャンル</th><th>何を考える?</th><th>代表例</th><th>参照先</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">インフラ</td><td>どこで動かすか</td><td>Vercel、AWS、DNS、SSL、CDN</td><td><Link href="/ops/deploy">公開先とデプロイ経路</Link></td></tr>
          <tr><td className="hl">デプロイ</td><td>どう公開するか</td><td>Git、CI/CD、GitHub Actions</td><td><Link href="/ops/deploy">公開先とデプロイ経路</Link></td></tr>
          <tr><td className="hl">パフォーマンス</td><td>速く表示する</td><td>キャッシュ、画像最適化、Core Web Vitals</td><td><Link href="/ops/performance">パフォーマンス</Link></td></tr>
          <tr><td className="hl">データ管理</td><td>データをどう保存するか</td><td>DB、ストレージ、バックアップ</td><td><Link href="/ops/data">データ管理</Link></td></tr>
          <tr><td className="hl">セキュリティ</td><td>安全に運用する</td><td>認証、認可、WAF、CORS、XSS対策</td><td><Link href="/security">セキュリティ</Link></td></tr>
          <tr><td className="hl">監視・運用</td><td>正常に動いているか</td><td>モニタリング、ログ、ヘルスチェック、通知</td><td><Link href="/infra/monitoring">監視・保守</Link></td></tr>
          <tr><td className="hl">品質管理</td><td>不具合を防ぐ</td><td>テスト、エラー監視</td><td><Link href="/test">テスト</Link></td></tr>
          <tr><td className="hl">分析・改善</td><td>利用状況を知る</td><td>Google Analytics、PostHog、SEO</td><td><Link href="/ops/analytics">分析・改善</Link></td></tr>
          <tr><td className="hl">コンテンツ管理</td><td>更新を効率化する</td><td>CMS、画像、記事、公開管理</td><td><Link href="/ops/content">コンテンツ管理</Link></td></tr>
          <tr><td className="hl">コスト管理</td><td>無駄な費用を防ぐ</td><td>クラウド料金、通信量、ストレージ</td><td><Link href="/ops/cost">コスト管理</Link></td></tr>
          <tr><td className="hl">保守・メンテナンス</td><td>継続して安全に運用する</td><td>ライブラリ更新、SSL更新、障害対応</td><td><Link href="/infra/monitoring">監視・保守</Link></td></tr>
          <tr><td className="hl">法令・コンプライアンス</td><td>法律や規約を守る</td><td>プライバシーポリシー、Cookie、アクセシビリティ</td><td><Link href="/ops/compliance">法令・コンプライアンス</Link></td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        コードを書くことが「建物を建てる」ことだとすれば、運用は「建物を維持管理する」ことです。電気・水道が止まっていないか(監視)、老朽箇所を直しているか(保守)、来場者数を数えて動線を改善しているか(分析)、消防法を守っているか(コンプライアンス) ― 建物が完成した瞬間ではなく、人が使い続ける間ずっと発生し続ける仕事です。
      </Analogy>

      <Heading num="02">Webサービスを回すための運用ページ</Heading>
      <p>ここでは公開したWebサービスを「動かし続け、育てる」ための運用を3つの局面に分けて扱います。なお、<Term>インフラ基盤そのものの監視・障害切り分け</Term>は<Link href="/infra/monitoring/server">インフラ</Link>へ、<Term>端末管理・プリンターなどの社内IT</Term>は<Link href="/computer/client">コンピュータ</Link>へ、<Term>「環境」という語の整理</Term>は<Link href="/dev/environments">開発</Link>へ移し、ここではアプリケーション運用に絞っています。</p>

      {groups.map((group, gi) => {
        const offset = groups.slice(0, gi).reduce((sum, g) => sum + g.topics.length, 0);
        return (
          <div key={group.label}>
            <p className="mt-8 mb-2 text-[0.85rem] font-bold text-primary">{group.label}</p>
            <IndexGrid>
              {group.topics.map((topic, ti) => (
                <IndexCard
                  key={topic.href}
                  href={topic.href}
                  num={String(offset + ti + 1).padStart(2, "0")}
                  title={topic.title}
                >
                  {topic.desc}
                </IndexCard>
              ))}
            </IndexGrid>
          </div>
        );
      })}

      <DocsFooter />
    </DocsPage>
  );
}
