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
  title: "CloudFront",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>AWS &middot; ネットワーキングとコンテンツ配信</Eyebrow>
        <h1>CloudFront ― 世界中のエッジからコンテンツを配信する</h1>
        <Lead>
          <Term>CloudFront</Term>はAWSの<Term>CDN(Content Delivery Network)</Term>です。オリジンサーバーの内容を世界中の<Term>エッジロケーション</Term>にキャッシュし、利用者から地理的に最も近い拠点から配信することで、表示速度を上げつつオリジンへの負荷を減らします。この考え方は<Link href="/dev/cache">キャッシュの全体像</Link>ページで見た「近くに複製を置く」戦略のネットワーク版です。
        </Lead>
      </Hero>

      <Heading num="01">オリジンとディストリビューション</Heading>
      <p>配信元となるサーバーを<Term>オリジン</Term>と呼び、<Link href="/cloud/aws/storage/s3">S3</Link>バケットやELB、EC2、外部のWebサーバーなどを指定できます。1つ以上のオリジンとキャッシュ設定をまとめたものが<Term>ディストリビューション</Term>で、利用者は基本的にこのディストリビューションが発行するドメイン(または独自ドメイン)にアクセスします。</p>

      <Heading num="02">キャッシュ動作とキャッシュキー</Heading>
      <p>URLパスのパターンごとに<Term>キャッシュビヘイビア</Term>を設定し、「このパスはオリジンへ毎回転送する」「あのパスは1時間キャッシュする」といった振る舞いを分けられます。何をキャッシュの単位とするかを決める<Term>キャッシュキー</Term>には、URLだけでなく特定のヘッダー・Cookie・クエリ文字列を含めるかどうかも選択でき、含める要素が増えるほどキャッシュのヒット率は下がりやすくなります。</p>

      <Heading num="03">オリジンを非公開に保つ ― Origin Access Control(OAC)</Heading>
      <p>S3をオリジンにする場合、バケット自体を一般公開してしまうとCloudFrontを経由せず直接アクセスされてしまいます。<Term>Origin Access Control(OAC)</Term>を設定すると、S3バケットは非公開のまま、CloudFrontからの正当なリクエストだけを許可でき、<Link href="/cloud/aws/storage/s3">S3</Link>ページで見た「パブリックアクセスブロック」の方針とも両立します。</p>

      <Heading num="04">署名付きURL・署名付きCookie ― 配信を限定する</Heading>
      <p>会員限定コンテンツのように、誰でもキャッシュから取得できては困る配信には<Term>署名付きURL</Term>や<Term>署名付きCookie</Term>を使います。有効期限やアクセス条件を含んだ署名をURL・Cookieに付与し、その署名が正しく期限内のリクエストだけを許可します。個別ファイル単位で制限したい場合は署名付きURL、サイト内の複数ファイルをまとめて制限したい場合は署名付きCookieが向いています。</p>

      <Heading num="05">証明書とドメイン</Heading>
      <p>独自ドメインでHTTPS配信する場合、CloudFrontに紐づけるSSL/TLS証明書は<Link href="/cloud/aws/network/acm">ACM(AWS Certificate Manager)</Link>で発行しますが、CloudFrontで使う証明書は<Term>us-east-1(バージニア北部)リージョン</Term>で発行しておく必要があるという、CloudFront特有の制約があります。</p>

      <Analogy label="💡 たとえるなら">
        CloudFrontは「全国にあるコンビニの受け取りロッカー」です。本店(オリジン)まで行かなくても、近所のロッカー(エッジロケーション)で荷物(コンテンツ)を受け取れます。OACは「ロッカーの正規の集荷担当者以外は本店の倉庫に直接入れない」仕組み、署名付きURLは「特定の受け取り番号を知っている人しか荷物を取り出せない」引換券のようなものです。
      </Analogy>

      <Heading num="まとめ">CloudFrontを構成する要素</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>オリジンとキャッシュ動作を分けて設計する</h4><p>配信元とキャッシュルールをパスごとに柔軟に組み合わせられる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>OACでオリジンを非公開に保つ</h4><p>S3などのオリジンへの直接アクセスを防ぎ、CloudFront経由だけに限定する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>署名付きURL/Cookieで配信を限定できる</h4><p>会員限定コンテンツなど、誰でも取得されては困る配信に有効期限付きの許可を与える。</p></Card>
      </CardGrid>
      <p>CloudFrontで使う証明書をどう発行・自動更新するかは<Link href="/cloud/aws/network/acm">ACM</Link>のページで扱います。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/network" tag="AWS">ネットワーキングとコンテンツ配信</RelatedLink>
                    <RelatedLink href="/cloud/aws/network/acm" tag="AWS">ACM</RelatedLink>
                    <RelatedLink href="/cloud/aws/storage/s3" tag="AWS">S3</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
