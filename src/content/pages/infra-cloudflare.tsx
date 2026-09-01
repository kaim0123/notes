import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DiagramFrame,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "Cloudflare" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>Cloudflare ― ユーザーの一番近くで動くプラットフォーム</h1>
        <Lead>
          <Link href="/infra/aws">AWS</Link>と<Link href="/infra/gcp">Google Cloud</Link>は、地理的に分かれた拠点(リージョン)に自分の場所を借りる形でした。<Term>Cloudflare</Term>の出発点はそこではありません。世界中に置いた拠点から<Term>CDN・DNS・セキュリティ</Term>を提供する ― つまり<strong>利用者とサーバーの間に立つ</strong>ことを本業にしてきた会社です。近年はその網の上でコードの実行(Workers)やホスティング(Pages)まで担うようになりました。「デプロイ先」として名前を聞くことが多いものの、正体はもっと広い<Term>エッジプラットフォーム</Term>です。
        </Lead>
      </Hero>

      <Heading num="01">間に立つ ― CDN・DNS・セキュリティ</Heading>
      <p>
        本業は、ドメインの前段に必要なものをまとめて引き受けることです。世界中の拠点にコンテンツをキャッシュして最寄りから配り(CDN)、名前解決を返し(DNS)、通信を暗号化し(TLS)、攻撃を手前で遮断します(WAF・DDoS防御)。この位置に立つ強みは、<strong>オリジンサーバーに届く量そのものが減る</strong>ことです。
      </p>

      <DiagramFrame
        slug="infra-cloudflare-edge"
        aspect="760 / 300"
        caption="Cloudflareが利用者とオリジンの間に立つ位置。世界中のエッジがDNSの応答、TLSの終端、CDNのキャッシュ配信、WAFとDDoS防御をまとめて引き受ける。攻撃と判定されたものはここで遮断され、キャッシュにあるものはここで応答が返り、残ったものだけがオリジンへ渡る。オリジンの負荷対策としても、防御としても、この位置に立つこと自体が効いている。"
      />

      <p>
        AWSに置き換えると、CloudFront(CDN)+ Route 53(DNS)+ ACM(証明書)+ WAF を1つのサービスとして提供しているイメージになります。<Link href="/infra/deploy">デプロイと公開</Link>で見た「DNS・TLS・CDNの持ち主を決める」という判断を、まとめて1社に預ける形だと考えると位置づけやすくなります。手前で受け止めて量を減らすという発想そのものは<Link href="/security/network-defense">ネットワーク層の防御</Link>で扱ったとおりで、正常なリクエストと区別しにくい大量アクセスに対しては、この「受け止める容量」が対策の本体になります。
      </p>

      <Analogy label="💡 たとえるなら">
        全国チェーンの受付窓口です。客は最寄りの窓口で用が足り(CDN)、窓口が本人確認と不審者の入店拒否を代行し(セキュリティ)、どの店に取り次ぐかも案内する(DNS)。本店(オリジン)まで足を運ぶ回数そのものを減らすのが役割で、本店が小さくても回るようになります。
      </Analogy>

      <Heading num="02">Workers ― エッジでコードが動く</Heading>
      <p>
        <Term>Cloudflare Workers</Term>は、その各拠点の上で自分のコードを実行できる仕組みです。AWSのLambdaに相当しますが、決定的に違うのは<strong>特定のリージョンではなく、リクエストが届いた拠点で動く</strong>点です。
      </p>

      <DiagramFrame
        slug="infra-cloudflare-workers"
        aspect="700 / 280"
        caption="リージョンで動かす関数とエッジで動かす関数の距離の違い。上段はリクエストが遠いリージョンまで往復するため、処理が軽くても行き帰りの時間が乗る。下段は届いた最寄りの拠点でそのままコードが動くので往復がほとんど無い。ただしエッジで完結できるのは、遠くのデータベースを見に行かずに済む処理に限られる。"
      />

      <p>
        向くのは、認証の判定・リダイレクト・ヘッダの書き換え・画像の変換・A/Bの振り分けのように、<strong>オリジンまで届ける必要のない処理</strong>です。逆に、結局データベースを引くなら遠くまで行くことになるので、エッジに置く意味は薄くなります。<Link href="/frontend/nextjs">Next.js</Link>のようなフレームワークがミドルウェア相当の処理をエッジ実行に載せられるのは、この性質を前提にしています。
      </p>

      <Heading num="03">Pages ― Git連携のホスティング</Heading>
      <p>
        <Term>Cloudflare Pages</Term>は、リポジトリをつなぐだけでビルドと配信を代行するホスティングです。ここが「デプロイ先」として語られる部分で、<Link href="/infra/deploy">デプロイと公開</Link>で見たPaaS型の一種、Vercel・Netlifyと同じ枠に入ります。pushごとの自動ビルド、PRごとのプレビューURL、独自ドメインの接続、証明書の自動発行までまとめて面倒を見てくれます。Workersと組み合わせれば、静的なフロントとエッジのサーバー処理を1つのプロジェクトとして扱えます。
      </p>

      <Aside label="名前で混乱しないために">
        <strong>Cloudflare</strong> は会社とプラットフォーム全体、<strong>Pages</strong> はサイトのホスティング(デプロイ先)、<strong>Workers</strong> はエッジでコードを動かす実行基盤 ― と役割で切り分けると整理できます。似た名前が並ぶのは、どれも同じエッジ網の上に立っているためです。
      </Aside>

      <Heading num="04">Email ― 独自ドメインのメールを扱う</Heading>
      <p>
        独自ドメインのメールも扱えます。中心は無料の<Term>Email Routing</Term>で、<code>info@自分のドメイン</code>宛に届いたメールを、普段使っているメールボックスへ転送します。MXやSPFのDNSレコードを自動で設定してくれるため、メールサーバーを自前で立てずに独自ドメインのアドレスを持てます。
      </p>

      <DiagramFrame
        slug="infra-cloudflare-email"
        aspect="700 / 280"
        caption="独自ドメインのメールをCloudflareで扱うときの流れ。届いたメールはMXレコードに従ってCloudflareに入り、Email Routingが設定した転送先へ渡す。Email Workersを挟めば1通ごとにコードで振り分けや拒否ができ、アプリから通知を出す側はEmail Sendingが担う。扱えるのは転送と送信で、メールを溜めて読む受信箱そのものは提供されないため、読む場所は転送先のサービスが受け持つ。"
      />

      <p>
        転送するだけでなく、<Term>Email Workers</Term>を使えば1通ごとにコードで処理できます ― 本文を解析する、条件で転送先を振り分ける、拒否する。送信側も<Term>Email Sending</Term>(Workersのバインディング・REST API・SMTP)が用意されているので、「受信 → 処理 → 自動返信」までを1つの基盤の中で完結させられます。アプリから通知メールを送る側の設計と、届くかどうかを左右する送信ドメイン認証の話は<Link href="/backend/mail">メール送信</Link>にあります。
      </p>

      <Aside label="できないことを先に押さえる">
        Cloudflareのメールは「独自ドメイン宛の受信を転送する」「アプリから通知を送る」ことに強い一方、GmailやMicrosoft 365のように<strong>メールを溜めて読む受信箱(IMAPの受信箱)は提供しません</strong>。受信の基本はあくまで転送で、読む・保存する場所は転送先のサービスが担います。送信も主に通知や認証コードのようなトランザクションメール向けです。
      </Aside>

      <Heading num="05">主要サービスとAWSとの対応</Heading>
      <p>
        名前は違っても「何のための部品か」は事業者間で共通しています。対応づけておくと読み替えが速くなります。
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
          <tr><td className="hl">リレーショナルDB</td><td>D1</td><td>RDS / Aurora</td></tr>
          <tr><td className="hl">キーバリューストア</td><td>Workers KV</td><td>DynamoDB</td></tr>
          <tr><td className="hl">メール送受信</td><td>Email Routing / Email Sending</td><td>Amazon SES</td></tr>
        </tbody>
      </table>

      <Aside label="R2とエグレス料金">
        Cloudflareの<Term>R2</Term>はS3互換のAPIを持ちながら、外部への転送料(エグレス)が無料という点で注目されました。<Link href="/infra/aws">AWS</Link>で見たとおり、クラウドの請求は「出ていくデータ」が大きな割合を占めます。その前提を崩したことが、配信量の多い用途での選択肢になっています。
      </Aside>

      <Heading num="まとめ">3つの顔で捉える</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>間に立つインフラ</h4>
          <p>CDN・DNS・TLS・防御をドメインの前段でまとめて引き受け、オリジンに届く量を減らす。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>エッジの実行基盤</h4>
          <p>Workersで最寄りの拠点にコードを置ける。往復の要らない処理ほど効果が大きい。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>デプロイ先</h4>
          <p>PagesはGit連携のホスティング。Vercel・Netlifyと並ぶPaaSの選択肢になる。</p>
        </Card>
      </CardGrid>

      <p>
        ここまでで「どこで動かすか」の選択肢が出そろいました。最後は、動き始めたサービスを続けていくための仕事 ― <Link href="/infra/ops">サービス運営</Link>へ進みます。
      </p>

      <DocsFooter href="/infra/cloudflare" />
    </DocsPage>
  );
}
