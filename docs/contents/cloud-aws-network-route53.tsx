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
  title: "Route 53",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>AWS &middot; ネットワーキングとコンテンツ配信</Eyebrow>
        <h1>Route 53 ― ドメイン名を宛先へ振り分ける</h1>
        <Lead>
          <Term>Route 53</Term>はAWSの<Term>DNS(<Link href="/network/applications/dns">DNS</Link>ページ参照)</Term>サービスです。ドメイン名をIPアドレスへ変換する基本機能に加え、複数の宛先の中から状況に応じて最適な1つへ振り分ける、高度な<Term>ルーティングポリシー</Term>を持っています。
        </Lead>
      </Hero>

      <Heading num="01">ホストゾーンとレコード</Heading>
      <p>1つのドメインの設定は<Term>ホストゾーン</Term>という単位にまとめられ、その中に<Term>Aレコード</Term>(ドメイン名→IPv4アドレス)や<Term>CNAMEレコード</Term>(ドメイン名→別のドメイン名)といった<Term>レコード</Term>を登録していきます。</p>

      <Heading num="02">Aliasレコード ― AWSのサービス向けの特別な仕組み</Heading>
      <p>CNAMEレコードは仕様上、ドメインの最上位(<Term>ゾーンApex</Term>、例: <code>example.com</code>そのもの)には設定できません。Route 53独自の<Term>Aliasレコード</Term>を使うと、CloudFrontやELBのような変動するAWSリソースのアドレスも、ゾーンApexに対して指定でき、しかもCNAMEと違って参照時に追加の課金が発生しません。<Link href="/cloud/aws/network/cloudfront">CloudFront</Link>や<Link href="/cloud/aws/network">ELB</Link>を独自ドメインで公開する際は、通常このAliasレコードを使います。</p>

      <Heading num="03">ルーティングポリシー ― 状況に応じて宛先を変える</Heading>
      <table>
        <thead>
          <tr><th>ポリシー</th><th>振り分け方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">シンプル</td><td>常に固定の宛先を1つ返す(既定の動作)</td></tr>
          <tr><td className="hl">加重(Weighted)</td><td>設定した比率に応じて複数の宛先へ振り分ける(段階的なリリースに利用)</td></tr>
          <tr><td className="hl">レイテンシーベース</td><td>利用者から見て応答が最も速いリージョンの宛先へ振り分ける</td></tr>
          <tr><td className="hl">位置情報</td><td>利用者の地理的な位置に応じて宛先を変える(地域限定コンテンツなど)</td></tr>
          <tr><td className="hl">フェイルオーバー</td><td>ヘルスチェックで異常を検知した宛先を外し、正常な宛先だけへ振り分ける</td></tr>
          <tr><td className="hl">複数値回答</td><td>複数の正常な宛先IPをランダムな順で複数返し、クライアント側でも分散させる</td></tr>
        </tbody>
      </table>

      <Heading num="04">ヘルスチェック ― 「生きているか」を確認する</Heading>
      <p>Route 53は宛先に対して定期的な<Term>ヘルスチェック</Term>を実行でき、応答がない・エラーを返すといった異常を検知すると、その宛先をルーティング対象から自動的に除外します。フェイルオーバーポリシーは、このヘルスチェックの結果と組み合わせて初めて機能します。</p>

      <Analogy label="💡 たとえるなら">
        Route 53は「案内所の住所録」です。シンプルなルーティングは「いつも同じ建物を案内する」ことに相当し、加重ルーティングは「新しい建物を試しに一部のお客だけへ案内する」こと、フェイルオーバーは「案内所が定期的に電話確認(ヘルスチェック)し、応答のない建物は案内先から外す」ことに相当します。
      </Analogy>

      <Heading num="まとめ">Route 53が担う役割</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Aliasレコードでゾーンapexにも対応</h4><p>CNAMEの制約を超え、AWSリソースをドメインの最上位に無料で紐づけられる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ルーティングポリシーで状況に応じて振り分ける</h4><p>速度・地域・比率・正常性など、目的に応じて6種類の振り分け方から選べる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ヘルスチェックが異常を自動的に除外する</h4><p>フェイルオーバーなど、正常性に基づくルーティングの土台になる。</p></Card>
      </CardGrid>
      <p>DNSで名前解決した後、実際にどこでコンテンツを高速に配信するかは<Link href="/cloud/aws/network/cloudfront">CloudFront</Link>の役割です。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/network" tag="AWS">ネットワーキングとコンテンツ配信</RelatedLink>
                    <RelatedLink href="/cloud/aws/network/cloudfront" tag="AWS">CloudFront</RelatedLink>
                    <RelatedLink href="/network/applications/web" tag="インターネット">Webの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
