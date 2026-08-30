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
  title: "法令・コンプライアンス",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>サービス運営</Eyebrow>
        <h1>法令・コンプライアンス ― 法律や規約を守る</h1>
        <Lead>
          サイトを公開するということは、技術的に動くだけでなく<Term>社会的なルール</Term>の中で運営することでもあります。個人情報・Cookie・アクセシビリティという、Webサイトに共通して関わる3つの観点を見ていきます。
        </Lead>
      </Hero>

      <Aside label="注記:">法令の解釈・適用は個別の状況によって異なります。ここでは「開発者としてどんな論点があるか」の見取り図を示すものであり、具体的な法的判断は専門家に確認してください。</Aside>

      <Heading num="01">プライバシーポリシーと個人情報</Heading>
      <p>氏名・メールアドレス・Cookie識別子など、個人を特定しうる情報(<Term>個人情報・個人データ</Term>)を扱うサイトは、「何を・何の目的で・どう扱うか」を<Term>プライバシーポリシー</Term>として明示する必要があります。日本国内向けなら個人情報保護法、EUの居住者を対象に含むなら<Term>GDPR</Term>(EU一般データ保護規則)など、対象ユーザーの所在地によって適用される法令が変わる点に注意します。</p>

      <table>
        <thead>
          <tr><th>論点</th><th>考えること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">収集の目的明示</td><td>何のために、どのデータを集めるかを事前に説明する</td></tr>
          <tr><td className="hl">第三者提供</td><td>解析ツール・広告等の外部サービスにデータを渡す場合、その旨を明示する</td></tr>
          <tr><td className="hl">開示・削除請求への対応</td><td>ユーザーから「自分のデータを見せて/消して」と求められた際の対応窓口・手順を用意する</td></tr>
        </tbody>
      </table>

      <Heading num="02">Cookieと同意管理</Heading>
      <p>アクセス解析・広告配信の多くはCookieを利用してユーザーを識別します。EUのeプライバシー指令やGDPRでは、必須でないCookie(解析・広告用など)を設置する前に<Term>ユーザーの同意</Term>を得ることが求められており、これが「Cookieバナー」が広く使われている理由です。<Link href="/security/session-cookie">セッション・Cookieの全体像</Link>で見た技術的な仕組みに、ここでは「同意を得ずに使ってよいか」という法的な制約が加わります。</p>

      <p>また、ブラウザ側でも<Term>サードパーティCookieの廃止</Term>が進んでおり、クロスサイトでのユーザー追跡は技術的にも難しくなりつつあります。この流れを受けて、Cookieに頼らない計測・広告配信の手法(サーバーサイド計測、Cookieレスの識別技術など)への移行が業界全体で進んでいます。</p>

      <Analogy label="💡 たとえるなら">
        Cookie同意は「訪問者名簿への記帳依頼」に似ています。建物に入るだけなら記帳不要(必須Cookie)ですが、後で「イベント案内を送ってよいか」(解析・広告Cookie)は、入り口で本人の同意を得てから記録する必要がある、というルールです。
      </Analogy>

      <Heading num="03">アクセシビリティ</Heading>
      <p><Term>アクセシビリティ</Term>は、視覚・聴覚・運動機能などに制約のあるユーザーを含め、誰もがサイトを利用できるようにする取り組みです。国際的な指針である<Term>WCAG(Web Content Accessibility Guidelines)</Term>が事実上の標準で、多くの国・組織の調達基準やガイドラインのベースになっています。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>セマンティックHTML</h4>
          <p><code>&lt;button&gt;</code>や見出しタグを適切に使うだけで、スクリーンリーダーの読み上げ・キーボード操作の多くが自然に成立する。<Link href="/dev/frontend/web-basics">Web基礎</Link>で扱うHTMLの基本がそのまま土台になる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>コントラスト・代替テキスト</h4>
          <p>文字と背景の十分な色コントラストを確保し、画像には内容を説明する`alt`属性を付ける。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>キーボード操作</h4>
          <p>マウスなしでもTabキー等ですべての操作が完結するようにする。フォーカス位置が視覚的に分かることも重要。</p>
        </Card>
      </CardGrid>

      <Heading num="まとめ">技術と社会的ルールの両輪</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>個人情報の扱いを明示する</h4><p>何を・何のために集めるかをプライバシーポリシーとして公開する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Cookieは同意を得てから使う</h4><p>必須Cookie以外は、利用前にユーザーの同意を得る仕組みを用意する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>誰もが使える作りにする</h4><p>セマンティックHTML・コントラスト・キーボード操作でアクセシビリティを確保する。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/session-cookie" tag="セキュリティ">セッション・Cookieの全体像</RelatedLink>
                    <RelatedLink href="/dev/frontend/web-basics" tag="開発">Web基礎</RelatedLink>
                    <RelatedLink href="/ops/analytics" tag="サービス運営">分析・改善</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
