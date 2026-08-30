import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  DocsFooter,
  IndexGrid,
  IndexCard,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "セキュリティ",
};

const topics = [
  { href: "/security/basics", title: "情報セキュリティの目的と脅威", desc: "CIA三原則・脅威と脆弱性・マルウェア・多層防御" },
  { href: "/security/attacks", title: "攻撃手法", desc: "認証破り・フィッシング・MITM・インジェクション・DDoSの概観" },
  { href: "/security/injection", title: "インジェクション攻撃の基本形", desc: "入力を「命令」として誤解釈させる、すべての脆弱性の入り口" },
  { href: "/security/xss", title: "XSSと出力エスケープ", desc: "ページに悪意あるスクリプトを埋め込まれる攻撃" },
  { href: "/security/sqli", title: "SQLインジェクション対策", desc: "入力値でデータベースへの命令を書き換えられる攻撃" },
  { href: "/security/csrf", title: "CSRF対策", desc: "ログイン中のユーザーに、意図しない操作をさせる攻撃" },
  { href: "/security/crypto", title: "暗号の歴史と公開鍵暗号", desc: "シーザー暗号からRSA・量子暗号まで、「作る者」と「解く者」の攻防" },
  { href: "/security/hash", title: "ハッシュ関数と衝突攻撃", desc: "パスワード保存や改ざん検知を支える「戻せない壁」と、その破り方" },
  { href: "/security/auth", title: "認証", desc: "「あなたは誰か」をどう確認するか" },
  { href: "/security/authz", title: "認可", desc: "「何をしてよいか」をどう判定するか" },
  { href: "/security/session", title: "セッションとCookie管理", desc: "「ログイン状態」をどう安全に維持するか" },
  { href: "/security/identity", title: "認証プロトコルの変遷", desc: "LDAPからPasskeyまで、「誰か」を確かめる仕組みの移り変わり" },
  { href: "/security/management", title: "リスクマネジメント", desc: "リスクアセスメント・ISMS・CSIRT・事業継続" },
  { href: "/security/countermeasures", title: "セキュリティ対策と実装", desc: "FW・WAF・IDS/IPS・TLS/VPN・運用の全体像" },
  { href: "/security/network-defense", title: "ネットワーク層の防御", desc: "EDR/XDR・ゼロトラスト・IDS/IPSで守る、コードの外側" },
  { href: "/security/headers", title: "セキュリティヘッダ", desc: "配信の入口でヘッダを足し、XSSやクリックジャッキングを抑える" },
  { href: "/security/cache", title: "キャッシュ制御", desc: "個人向けのページが、他人の画面に表示されてしまう事故" },
  { href: "/security/logging", title: "ログ出力設計", desc: "攻撃の予兆に気づき、事後に調査できる記録の残し方" },
  { href: "/security/session-cookie", title: "セッション・Cookieの全体像", desc: "ログイン状態だけの言葉ではない" },
  { href: "/security/token", title: "トークンの全体像", desc: "「何を証明するための紙切れか」で意味が変わる" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>セキュリティ</h1>
        <Lead>
          「攻撃者は何を狙い、開発者は何を守ればいいのか」を、まず目的(CIA)と脅威の全体像から押さえます。続いて攻撃手法の概観、Webアプリで頻出のインジェクション系、暗号・認証、リスクマネジメント、そして技術的な対策まで ― 基礎から実装・運用へと順に見ていきます。
        </Lead>
      </Hero>

      <IndexGrid>
        {topics.map((topic, i) => (
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
