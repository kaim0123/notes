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
  Aside,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "会社ドメインのメールを用意する",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>会社ドメインのメールを用意する ― 情シスの選択肢</h1>
        <Lead>
          <Link href="/network/applications/mail">メールの仕組み</Link>が「どう届くか」の話だとすれば、こちらは「<Term>@会社ドメインのメールを、誰が・どこで運用するか</Term>」という選定の話です。企業の情報システム部門が独自ドメインのメールを整えるとき、選択肢は大きく4系統に分かれます。まずは全体像を押さえ、最後に選ぶときの判断軸を整理します。
        </Lead>
      </Hero>

      <Heading num="01">クラウド型グループウェア ― 現在の主流</Heading>
      <p>
        メールボックス・カレンダー・ストレージ・管理コンソールが一体になった<Term>SaaS</Term>で、企業ならまずここから検討します。独自ドメインを繋いで人数分のアカウントを発行すれば、SSO・監査ログ・スパム対策・モバイル管理まで込みで使え、サーバー運用は事業者に任せられます。<strong>「会社のメールを用意する」の実質的な標準解</strong>です。
      </p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>Microsoft 365(Exchange Online)</h4>
          <p>Outlook・Office・Teams と一体。Windows / Active Directory 環境との相性が良く、大企業のデファクト。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>Google Workspace(Gmail)</h4>
          <p>Meet・Drive・スプレッドシートと一体。スタートアップ〜中堅で人気で、ブラウザ完結の使い勝手が強み。</p>
        </Card>
      </CardGrid>
      <Aside label="豆知識">
        どちらを選ぶかは「メール単体の優劣」より、社内でどのオフィスソフト・チャット・認証基盤(Entra ID か Google か)を使うかで決まることが多いです。メールはグループウェア全体の一機能、という捉え方が実態に近くなっています。
      </Aside>

      <Heading num="02">メール特化のホスティング ― 小〜中規模・コスト重視</Heading>
      <p>
        グループウェアまでは要らず、独自ドメインのメールボックスだけ欲しい場合の選択肢です。<Term>Zoho Mail</Term>・<Term>Fastmail</Term>・Proton for Business(暗号化重視)といったメール専業サービスや、<Term>レンタルサーバー付属のメール</Term>(Xserver・さくら・お名前.com など)が該当します。後者は中小・個人事業でよく使われる、安価に独自ドメインメールを持てる定番です。
      </p>

      <Heading num="03">自前運用 ― オンプレ / IaaS 上に自建</Heading>
      <p>
        <Term>Postfix + Dovecot</Term> などで送信(MTA)と受信箱(メールストア)を自分で構築したり、<Term>Exchange Server</Term> をオンプレで運用したりする方式です。自由度は最大ですが、<strong>到達性(スパム判定の回避)・24時間運用・セキュリティ</strong>の負担が非常に重く、かつての定番がクラウドSaaSへ置き換わった領域です。規制や機密など特別な要件がなければ、いまは避けられる傾向にあります。
      </p>
      <Analogy label="💡 たとえるなら">
        SaaS型グループウェアは「オフィスビルの一室を借りる」、自前運用は「自社ビルを建てて電気・水道・警備まで自前で手配する」ようなものです。後者は思い通りに設計できますが、建物の維持管理がそのまま日々の負担になります。よほどの理由がなければ、いまは前者が合理的です。
      </Analogy>

      <Heading num="04">補助的な仕組み ― 単体では「会社のメール」にならない</Heading>
      <p>
        メールに関わるサービスでも、それ単体では従業員の受信箱にはならないものがあります。用途を取り違えないよう区別しておきます。
      </p>
      <table>
        <tbody>
          <tr><th>種類</th><th>できること</th><th>代表例</th></tr>
          <tr><td className="hl">受信転送(エイリアス)</td><td>独自ドメイン宛を既存の個人受信箱へ転送するだけ。読む・溜める場所は転送先が担う</td><td><Link href="/cloud/cloudflare">Cloudflare Email Routing</Link>、ImprovMX</td></tr>
          <tr><td className="hl">送信特化</td><td>アプリからの通知・認証コードなどトランザクションメールの送信専用。人が読む受信箱ではない</td><td>Amazon SES、SendGrid、Postmark</td></tr>
        </tbody>
      </table>
      <p>
        いずれも個人・ごく小規模の補助や、システムからの自動送信には向きますが、従業員が日常的に読み書きする<strong>本格的なメールボックス(IMAP対応の受信箱)</strong>そのものは提供しません。会社の本体メールとしては 01〜03 のいずれかが必要です。
      </p>

      <Heading num="05">情シスが選ぶときの判断軸</Heading>
      <p>製品名の前に、次の観点で要件を言語化しておくと選定がぶれません。</p>
      <ul>
        <li><strong>アカウント管理 / SSO</strong> ― IdP(Entra ID・Okta など)連携や、入退社時の自動プロビジョニングができるか</li>
        <li><strong>セキュリティ・コンプライアンス</strong> ― メールアーカイブ、監査ログ、DLP、暗号化、業界規制への対応</li>
        <li><strong>到達性</strong> ― <Link href="/network/applications/mail">SPF・DKIM・DMARC</Link> を正しく設定でき、なりすまし対策・迷惑メール判定回避ができるか</li>
        <li><strong>一体運用</strong> ― カレンダー・チャット・ストレージまで揃えるか、メール単体で足りるか</li>
        <li><strong>コスト</strong> ― 多くはユーザー単位の月額課金。人数と必要機能で見積もる</li>
      </ul>
      <Aside label="注意">
        どの方式を選んでも、SPF・DKIM・DMARC といった認証設定は<Link href="/network/applications/dns">DNS</Link>への登録で有効になります。メールサービスを移行したり、新しい配信ツールを併用したりする際にこの設定を更新し忘れると、正規のメールが迷惑メール扱いされることがあります。
      </Aside>

      <Heading num="まとめ">まず主流の二択から</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>一定規模の企業</h4>
          <p>Microsoft 365 か Google Workspace が事実上の標準。社内の認証基盤・オフィスソフトに合わせて選ぶ。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>小規模・コスト重視</h4>
          <p>Zoho Mail やレンタルサーバー付属メールで、独自ドメインのメールボックスだけを安価に持つ。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>自前運用は例外</h4>
          <p>特別な要件がなければ選ばない。運用・到達性・セキュリティの負担が重く、SaaSに置き換わった領域。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/network/applications/mail" tag="インターネット">メールの仕組み</RelatedLink>
                    <RelatedLink href="/cloud/cloudflare" tag="クラウド">Cloudflare</RelatedLink>
                    <RelatedLink href="/network/applications/dns" tag="インターネット">DNS</RelatedLink>
                    <RelatedLink href="/ops/deploy" tag="サービス運営">公開先とデプロイ経路</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
