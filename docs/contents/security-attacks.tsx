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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "攻撃手法",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>攻撃手法 ― 攻撃者は何を狙い、どう手を入れるか</h1>
        <Lead>
          守り方を理解するには、まず攻める側の発想を知るのが近道です。ここでは代表的な攻撃手法を、認証を破る・利用者をだます・通信に割り込む・Webアプリを突く・可用性を奪う、という狙い別に俯瞰します。Webアプリで頻出のインジェクション系は、それぞれ個別ページで対策まで詳しく扱います。
        </Lead>
      </Hero>

      <Heading num="01">認証を破る ― パスワードを狙う攻撃</Heading>
      <table>
        <thead>
          <tr><th>手法</th><th>やり方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ブルートフォース(総当たり)</td><td>考えられる文字の組み合わせを片端から試す</td></tr>
          <tr><td className="hl">辞書攻撃</td><td>よく使われる単語・パスワードのリストを順に試す</td></tr>
          <tr><td className="hl">パスワードリスト攻撃</td><td>他サービスで漏えいしたID/パスワードの組を使い回しで試す</td></tr>
          <tr><td className="hl">リバースブルートフォース</td><td>パスワードを固定し、多数のIDに対して試す(ロックアウト回避)</td></tr>
        </tbody>
      </table>
      <p>対策の基本は、強いパスワード・多要素認証・アカウントロックです。認証の仕組みそのものは「<Link href="/security/auth">認証</Link>」で扱います。</p>

      <Heading num="02">人をだます ― ソーシャルエンジニアリング</Heading>
      <p>技術ではなく人の心理につけ込む攻撃です。<Term>フィッシング</Term>(正規サイトを装ってID/パスワードを入力させる)、<Term>標的型攻撃</Term>(特定の組織を狙い、業務メールを装う)、なりすまし電話やのぞき見(ショルダーハッキング)、ごみ箱をあさるトラッシングなどが含まれます。人間が最も破られやすい「壁」であることを突く手口です。</p>

      <Heading num="03">通信に割り込む ― 盗聴・改ざん・なりすまし</Heading>
      <table>
        <thead>
          <tr><th>手法</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">中間者攻撃(MITM)</td><td>通信経路の途中に入り込み、盗聴・改ざんする</td></tr>
          <tr><td className="hl">セッションハイジャック</td><td>セッションIDを盗む・推測して、ログイン状態を乗っ取る</td></tr>
          <tr><td className="hl">IPスプーフィング</td><td>送信元IPアドレスを偽装して正規の通信になりすます</td></tr>
          <tr><td className="hl">DNSキャッシュポイズニング</td><td>DNSに偽の対応を覚えさせ、偽サイトへ誘導する</td></tr>
        </tbody>
      </table>
      <p>通信の暗号化(TLS)やセッション管理が主な対策です。セッションの安全な扱いは「<Link href="/security/session">セッションとCookie管理</Link>」で詳述します。</p>

      <Heading num="04">Webアプリを突く ― インジェクション系</Heading>
      <p>入力値を「データ」ではなく「命令」として実行させてしまうのがインジェクション系です。Webアプリで頻出のため、それぞれ対策まで個別ページで扱います。</p>
      <table>
        <thead>
          <tr><th>攻撃</th><th>狙い</th><th>詳細</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">SQLインジェクション</td><td>入力でDBへの命令(SQL)を書き換える</td><td><Link href="/security/sqli">SQLインジェクション対策</Link></td></tr>
          <tr><td className="hl">クロスサイトスクリプティング(XSS)</td><td>ページに悪意あるスクリプトを埋め込む</td><td><Link href="/security/xss">XSSと出力エスケープ</Link></td></tr>
          <tr><td className="hl">CSRF</td><td>ログイン中の利用者に意図しない操作をさせる</td><td><Link href="/security/csrf">CSRF対策</Link></td></tr>
          <tr><td className="hl">OSコマンドインジェクション</td><td>入力でサーバーのOSコマンドを実行させる</td><td><Link href="/security/injection">インジェクション攻撃の基本形</Link></td></tr>
        </tbody>
      </table>

      <Heading num="05">可用性を奪う ― DoS・DDoS</Heading>
      <p><Term>DoS攻撃</Term>は、大量のリクエストや不正なパケットを送りつけてサービスを停止させる攻撃です。多数の踏み台(ボットネット)から一斉に行うものを<Term>DDoS攻撃</Term>と呼びます。CIAのうち可用性を直接狙う攻撃で、対策にはレート制限・CDN・上位回線での遮断などが使われます。</p>

      <Analogy label="💡 たとえるなら">
        攻撃手法は「泥棒の手口カタログ」です。鍵をこじ開ける(総当たり)、住人になりすまして鍵を聞き出す(フィッシング)、配達員に化けて侵入する(なりすまし)、玄関に人を殺到させて業務を止める(DDoS)。守る側は、どの入口からどう来るかを知って初めて、適切な錠前を選べます。
      </Analogy>

      <Heading num="まとめ">狙い別に手口を捉える</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>認証・人・通信・アプリ・可用性</h4><p>攻撃は狙う対象で整理でき、それぞれに定番の対策があります。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>インジェクションは「命令」化が本質</h4><p>入力をデータとして扱わず命令として実行させる点が共通します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>最新の脅威にも注意</h4><p>攻撃の一連の流れ(サイバーキルチェーン)や、未知の脆弱性を突くゼロデイ攻撃も押さえておきます。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/injection" tag="セキュリティ">インジェクション攻撃の基本形</RelatedLink>
                    <RelatedLink href="/security/countermeasures" tag="セキュリティ">セキュリティ対策と実装</RelatedLink>
                    <RelatedLink href="/security/basics" tag="セキュリティ">情報セキュリティの目的と脅威</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
