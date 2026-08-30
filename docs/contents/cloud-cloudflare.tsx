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
  title: "Cloudflare",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>クラウド</Eyebrow>
        <h1>Cloudflare ― ユーザーの一番近くで動くプラットフォーム</h1>
        <Lead>
          <Term>Cloudflare</Term>は、もともと世界中に配置した拠点(エッジ)から<Term>CDN・DNS・セキュリティ</Term>を提供する会社です。近年はそのエッジ網の上で<strong>コードの実行(Workers)やサイトのホスティング(Pages)</strong>まで担うようになり、AWSと同じく「借りて使うインフラ一式」を提供する事業者へと広がりました。「デプロイ先」として名前を聞くことが多いですが、その正体はもっと広い<strong>エッジプラットフォーム</strong>です。
        </Lead>
      </Hero>

      <Heading num="01">Cloudflareは何をする会社か ― CDN・DNS・セキュリティが本業</Heading>
      <p>
        Cloudflareの出発点は、Webサイトとユーザーの間に立つ<Term>CDN(コンテンツ配信網)</Term>です。世界中のデータセンターにコンテンツをキャッシュし、ユーザーに地理的に近い拠点から配信することで表示を高速化します。この「間に立つ」位置を活かして、<Term>DNS</Term>(ドメイン名の名前解決)、<Term>SSL/TLS</Term>(通信の暗号化)、そして<Term>WAF・DDoS防御</Term>(攻撃の遮断)といった、ドメインの前段に必要な機能をまとめて提供しているのが特徴です。
      </p>
      <p>
        AWSに置き換えると、<Link href="/cloud/aws/network/cloudfront">CloudFront</Link>(CDN)+ <Link href="/cloud/aws/network/route53">Route 53</Link>(DNS)+ <Link href="/cloud/aws/network/acm">ACM</Link>(証明書)+ WAF を、1つのサービスとしてまとめて提供しているイメージです。CDN・DNS・SSL そのものの仕組みは<Link href="/network/applications/web">Webの仕組み</Link>や<Link href="/network/applications/dns">DNS</Link>で扱っています。
      </p>
      <Analogy label="💡 たとえるなら">
        Cloudflareは「店(サーバー)とお客さん(ユーザー)の間に立つ、全国チェーンの受付窓口」です。お客さんは最寄りの窓口に行くだけで用が足り(CDN)、窓口が本人確認や不審者の入店拒否を代行し(セキュリティ)、どの店に取り次ぐかも案内してくれます(DNS)。本店(オリジンサーバー)まで足を運ぶ回数そのものを減らすのが役割です。
      </Analogy>

      <Heading num="02">Workers ― エッジで動くサーバーレス</Heading>
      <p>
        <Term>Cloudflare Workers</Term>は、CDNの各拠点(エッジ)上で自分のコードを実行できるサーバーレス実行基盤です。リクエストが来た拠点でそのまま処理が走るため、ユーザーに極めて近い場所でレスポンスを返せます。AWSの<Link href="/cloud/aws/compute/lambda">Lambda</Link>に相当しますが、「特定リージョンではなく世界中のエッジで動く」点が大きな違いです。軽量なAPI・認証・リダイレクト・画像変換など、オリジンまで届ける必要のない処理をエッジで完結させるのに向いています。
      </p>

      <Heading num="03">Pages ― Git連携でサイトをデプロイする</Heading>
      <p>
        <Term>Cloudflare Pages</Term>は、GitリポジトリをつなぐだけでビルドとCDN配信を代行してくれる<Term>ホスティングサービス</Term>です。ここが、Cloudflareが「デプロイ先」として語られる部分です。<Link href="/ops/deploy">公開先とデプロイ経路</Link>で触れたPaaS型ホスティングの一種で、Vercel・Netlifyと同じ枠に入ります。pushするたびに自動でビルドが走り、PRごとのプレビューURL発行や独自ドメインの接続、SSLの自動発行までまとめて面倒を見てくれます。Workersと組み合わせれば、静的なフロントとエッジのサーバー処理を1つのプロジェクトで動かせます。
      </p>
      <Aside label="豆知識">
        「Cloudflare」「Cloudflare Pages」「Cloudflare Workers」は名前が似ていて混乱しがちです。<strong>Cloudflare = 会社・プラットフォーム全体</strong>、<strong>Pages = サイトのホスティング(デプロイ先)</strong>、<strong>Workers = エッジでコードを動かす実行基盤</strong>、と役割で切り分けると整理できます。
      </Aside>

      <Heading num="04">Email ― 独自ドメインのメールを受信・送信する</Heading>
      <p>
        Cloudflareは、独自ドメインのメールも扱えます。中心となるのが無料の<Term>Email Routing</Term>で、<code>info@自分のドメイン</code>のようなアドレス宛に届いたメールを、Gmailなどふだんのメールボックスへそのまま<strong>転送(フォワード)</strong>してくれます。DNS上のMX・SPFレコードを自動で設定してくれるため、メールサーバーを自前で立てずに独自ドメインのアドレスを持てるのが利点です(転送先アドレスは事前に本人確認が必要)。
      </p>
      <p>
        受信メールを単に転送するだけでなく、<Term>Email Workers</Term>を使えば<Link href="/cloud/aws/compute/lambda">Workers</Link>のコードで1通ごとに処理できます。本文をパースする、条件によって転送先を振り分ける、迷惑メールを拒否する、といった制御が書けます。さらに、かつては受信専用でしたが、現在は<Term>送信(Email Sending)</Term>にも対応し、<strong>Workersのバインディング・REST API・SMTP</strong>の3通りでアプリからメールを送れます。これにより「受信 → Workerで処理 → 自動返信」までCloudflare内で完結させられます。
      </p>
      <Analogy label="💡 たとえるなら">
        Email Routingは「私書箱の転送サービス」です。独自ドメインという名刺用の住所を持ちつつ、届いた郵便は自宅(ふだんの受信箱)に横流ししてもらう。中身を見て仕分けるのがEmail Workers、こちらから返信を出すのがEmail Sending、という役割分担です。
      </Analogy>
      <Aside label="注意">
        Cloudflareのメールは「独自ドメイン宛の受信を転送する」「アプリから通知メールを送る」ことに強い一方、GmailやMicrosoft 365のように<strong>メールを溜めて読む本格的なメールボックス(IMAP対応の受信箱)は提供しません</strong>。受信の基本はあくまで転送で、読む・保存する場所は転送先のメールサービス側が担います。送信は主にトランザクションメール(通知・認証コードなど)向けです。
      </Aside>

      <Heading num="05">主要サービスとAWSとの対応</Heading>
      <p>
        Cloudflareのサービスは、AWSの各サービスと概念レベルで対応づけると理解しやすくなります。名前は違っても「何のための部品か」はクラウド事業者間で共通していることが多いためです。
      </p>
      <table>
        <thead>
          <tr><th>用途</th><th>Cloudflare</th><th>AWS</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">CDN</td><td>CDN(本体)</td><td>CloudFront</td></tr>
          <tr><td className="hl">DNS</td><td>Cloudflare DNS</td><td>Route 53</td></tr>
          <tr><td className="hl">エッジ実行</td><td>Workers</td><td>Lambda(+ Lambda@Edge)</td></tr>
          <tr><td className="hl">ホスティング</td><td>Pages</td><td>S3 + CloudFront</td></tr>
          <tr><td className="hl">オブジェクトストレージ</td><td>R2</td><td>S3</td></tr>
          <tr><td className="hl">DB(SQL)</td><td>D1</td><td>RDS / Aurora</td></tr>
          <tr><td className="hl">KVストア</td><td>Workers KV</td><td>DynamoDB</td></tr>
          <tr><td className="hl">メール送受信</td><td>Email Routing / Email Sending</td><td>Amazon SES</td></tr>
        </tbody>
      </table>
      <Aside label="豆知識">
        Cloudflareの<Term>R2</Term>は「S3互換API」を持ちながら、外部への転送料(エグレス料金)が無料という点で注目されています。クラウドはデータを取り出すたびに転送料がかかるのが一般的で、その常識を崩したことがR2の売りになっています。
      </Aside>

      <Heading num="まとめ">Cloudflareを3つの顔で捉える</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>間に立つインフラ</h4>
          <p>CDN・DNS・SSL・セキュリティを、ドメインの前段でまとめて代行するのが本業。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>エッジの実行基盤</h4>
          <p>Workersで、ユーザーに最も近い拠点上に自分のコードを走らせられる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>デプロイ先</h4>
          <p>PagesでGit連携のホスティングを提供。Vercel・Netlifyと並ぶPaaSの選択肢。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/ops/deploy" tag="サービス運営">公開先とデプロイ経路</RelatedLink>
                    <RelatedLink href="/cloud/aws/network" tag="AWS">ネットワーキングとコンテンツ配信</RelatedLink>
                    <RelatedLink href="/cloud/aws/network/cloudfront" tag="AWS">CloudFront</RelatedLink>
                    <RelatedLink href="/network/applications/dns" tag="インターネット">DNS</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
