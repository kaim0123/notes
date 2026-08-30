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
  Mark,
  MarkNote,
  Analogy,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "コンピューティング",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>Google Cloud</Eyebrow>
        <h1>コンピューティング ― どこで処理を動かすか</h1>
        <Lead>
          <Term>コンピューティング</Term>は「コードを実行する場所」を提供するサービス群です。自分でOSごと管理する<Term>Compute Engine</Term>から、関数単位の<Term>Cloud Functions</Term>、コンテナをサーバーレスで動かす<Term>Cloud Run</Term>まで、「どこまで自分で面倒を見るか」の度合いが異なる選択肢が並びます。
        </Lead>
      </Hero>

      <Heading num="01">Compute Engine ― 仮想サーバーを「借りる」</Heading>
      <p><Term>Compute Engine</Term>は、GCPのデータセンター上にある仮想マシン(VM)を1台単位で借りられるサービスで、AWSの<Term>EC2</Term>に相当します。OS・ミドルウェア・アプリケーションはすべて自分で選び、インストールし、管理します。<Link href="/cloud/gcp/basics">Google Cloudの基礎</Link>で見たゾーンを指定してVMを起動し、<Term>マシンタイプ</Term>でCPU・メモリの組み合わせを選びます。</p>

      <table>
        <thead>
          <tr><th>購入方式</th><th>特徴</th><th>向いている用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">オンデマンド</td><td>使った分だけ課金、いつでも起動・停止できる</td><td>負荷が読めない・短期の検証</td></tr>
          <tr><td className="hl">Committed Use Discount</td><td>1〜3年の利用を約束する代わりに割引</td><td>常時稼働することが分かっている本番サーバー</td></tr>
          <tr><td className="hl">Spot VM</td><td>余剰キャパシティを大幅割引で借りるが、いつでも回収され得る</td><td>中断されても困らないバッチ処理・学習ジョブ</td></tr>
        </tbody>
      </table>

      <Heading num="02">Cloud Functions ― イベントが起きた時だけ関数を動かす</Heading>
      <p><Term>Cloud Functions</Term>は、コードの断片(関数)をアップロードしておくと、イベント(HTTPリクエスト・Pub/Subメッセージ・Cloud Storageへのファイルアップロードなど)が起きたときだけ実行環境が自動的に用意され、処理が終われば消える<Term>サーバーレス</Term>のサービスです。AWSの<Term>Lambda</Term>に相当し、コールドスタートやイベントソースの違いなど詳細は<Link href="/cloud/gcp/compute/cloud-functions">Cloud Functionsのページ</Link>で扱います。</p>

      <Heading num="03">Cloud Run ― コンテナをサーバーレスで動かす</Heading>
      <p><Term>Cloud Run</Term>は、コンテナイメージをアップロードするだけで、HTTPリクエストに応じて自動的にスケールするサーバーレス実行環境です。Cloud Functionsが「関数1つ」に特化しているのに対し、Cloud Runは任意のコンテナ(任意の言語・フレームワーク)を載せられ、GCP初心者がWebアプリを本番に近い形でデプロイする入門口としてよく使われます。Kubernetesの知識がなくても、コンテナさえ作れれば動かせます。</p>

      <Analogy label="💡 たとえるなら">
        Compute Engineは「1軒家を長期契約で借りる」ことに似ています。Lambdaに相当するCloud Functionsは「必要な時間だけ会議室を借りる」こと、Cloud Runは「会議室のサイズは決まっているが、中身(コンテナ)は自分好みに詰められる共用スペース」に近いイメージです。
      </Analogy>

      <Heading num="04">その他のコンピューティングサービス</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>App Engine</h4>
          <p>コードをデプロイするだけでスケーリングまで任せられるPaaS。Standard(サンドボックス)とFlexible(Compute Engine上)の2環境がある。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Managed Instance Groups</h4>
          <p>Compute Engine VMの台数を、負荷に応じて自動的に増減させる仕組み。AWSのAuto Scalingに相当。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Cloud Batch</h4>
          <p>大量のバッチジョブを、必要な分だけ計算資源を確保しながら実行するサービス。</p>
        </Card>
      </CardGrid>
      <MarkNote>→ Cloud Run Jobsは、HTTPではなく「1回きりのバッチ処理」をコンテナで実行するサーバーレスジョブ向け。</MarkNote>

      <Heading num="まとめ">「管理する範囲」で選択肢が並ぶ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Compute Engineは自由と引き換えに管理責任も引き受ける</h4><p>OSからミドルウェアまで自分で選べるが、パッチ適用やスケーリングも自分の仕事になる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Cloud Functionsは関数単位のサーバーレス</h4><p>イベント駆動で処理を実行し、使った分だけ課金される。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Cloud Runはコンテナのサーバーレス入口</h4><p>任意のコンテナをHTTPで公開でき、スケールも自動。Webアプリの最初の一歩に向く。</p></Card>
      </CardGrid>
      <p>コンピューティングで処理した結果は、どこかに保存しなければ消えてしまいます。次のページでは、その保存先を選ぶ「<Link href="/cloud/gcp/storage">ストレージ</Link>」を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/gcp/storage" tag="Google Cloud">ストレージ</RelatedLink>
                    <RelatedLink href="/cloud/gcp/compute/cloud-functions" tag="Google Cloud">Cloud Functions</RelatedLink>
                    <RelatedLink href="/cloud/aws/compute" tag="AWS">コンピューティング(AWS)</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
