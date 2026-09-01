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
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "CloudFront" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>CloudFront ― 何を同じものと見なすか</h1>
        <Lead>
          配信網の役割は<Link href="/infra/deploy">デプロイと公開</Link>で見たとおり、最寄りの拠点から返してオリジンに届く量を減らすことです。設定項目は多く見えますが、実質的に決めているのは1つだけ ― <Term>どのリクエストを「同じもの」と見なすか</Term>。この線引きが、当たる率(速さと費用)と、正しさ(別の利用者の応答を配らないこと)を同時に決めます。
        </Lead>
      </Hero>

      <Heading num="01">オリジンと配信の設定</Heading>
      <p>
        取ってくる先を<Term>オリジン</Term>と呼びます。保存先のバケット、ロードバランサ、外部のサーバーのいずれでも構いません。その手前に置く設定一式を<Term>ディストリビューション</Term>と呼び、パスごとに別の振る舞いを持たせられます ― たとえば <code>/static/*</code> は長くキャッシュし、<code>/api/*</code> はキャッシュしない、という分け方です。
      </p>

      <Heading num="02">キャッシュキー ― 設定の中心</Heading>

      <DiagramFrame
        slug="infra-aws-cloudfront-cachekey"
        aspect="760 / 300"
        caption="配信網がキャッシュを同じものと見なす条件。到着したリクエストのうち鍵として使う要素を決めておき、それが一致すれば同じ応答を返す。既定ではパスだけが鍵になる。利用者ごとに変わる要素を鍵へ加えると利用者の数だけ別のキャッシュができてほとんど当たらなくなり、逆に応答が変わる要素を鍵に含め忘れると、別の利用者向けの応答が配られる。何を鍵にするかは、当たる率と正しさを同時に決める設定になる。"
      />

      <p>
        判断の順序は明快です。<strong>応答が変わる要素だけを鍵に入れ、それ以外は入れない</strong>。言語によって内容が変わるなら言語のヘッダを入れ、変わらないなら入れない。セッションのCookieは<strong>ほぼ常に入れてはいけません</strong> ― 利用者ごとにキャッシュが分かれ、当たらなくなるからです。
      </p>

      <Aside label="キャッシュしてはいけないものを見分ける">
        ログイン後の画面のように<strong>利用者ごとに内容が違う応答</strong>を、うっかり共有のキャッシュに載せると、他人の情報が別の人へ配られます。応答側で明示的にキャッシュを禁じる指定を出すのが基本の防御で、詳細は<Link href="/security/cache">キャッシュ制御と情報漏洩</Link>にあります。配信網の設定だけに頼らず、<strong>アプリ側からも意図を宣言する</strong>のが安全です。
      </Aside>

      <Heading num="03">オリジンを隠す</Heading>
      <p>
        配信網を前に置いても、オリジンに直接アクセスできる状態が残っていれば、防御も費用の削減も迂回されます。だから<strong>オリジン側は配信網からの読み取りだけを許可し、それ以外を拒否</strong>します(<Link href="/infra/aws-s3">S3</Link>の場合は専用の仕組みが用意されています)。
      </p>
      <p>
        限定した相手にだけ配りたい場合は、期限付きの署名を付けたURLやCookieを使います。<strong>認証そのものをアプリで行い、配信の許可だけを署名で渡す</strong>という分担です。
      </p>

      <Heading num="04">更新をどう届けるか</Heading>
      <p>
        キャッシュしている以上、内容を差し替えても古いものが配られ続けます。対処は2つあり、<strong>無効化</strong>(明示的に破棄する)は緊急時の手段、<strong>ファイル名を変える</strong>(内容が変わればURLも変わる)が日常の手段です。後者にしておくと、無効化の待ち時間も回数の課金も発生しません ― <Link href="/dev/tooling-build">ビルド</Link>がハッシュ付きのファイル名を出力するのは、このためでもあります。
      </p>

      <Heading num="05">証明書とリージョンの例外</Heading>
      <p>
        独自ドメインで配信するには証明書が要りますが、<strong>配信網に付ける証明書は特定のリージョンで発行したものに限られる</strong>という例外があります。<Link href="/infra/aws-basics">スコープの取り違え</Link>で挙げた「グローバルなサービスなのにリージョンが関係する」典型例で、知らないと必ず一度は詰まります。発行と更新の仕組みは<Link href="/infra/aws-acm">ACM</Link>にあります。
      </p>

      <Heading num="まとめ">鍵の設計が、すべてを決める</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>入れるのは、応答が変わる要素だけ</h4>
          <p>多すぎれば当たらず、少なすぎれば他人の応答が配られる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>オリジンは隠す</h4>
          <p>直接届く経路が残っていれば、防御も費用削減も迂回される。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>更新はファイル名で届ける</h4>
          <p>無効化は緊急手段。内容が変わればURLも変わる形にしておく。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-cloudfront" />
    </DocsPage>
  );
}
