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
        <Eyebrow>AWS</Eyebrow>
        <h1>コンピューティング ― どこで処理を動かすか</h1>
        <Lead>
          <Term>コンピューティング</Term>は「コードを実行する場所」を提供するサービス群で、AWSの最も中心的な領域です。自分でOSごと管理する<Term>EC2</Term>から、サーバーの存在を意識しなくてよい<Term>Lambda</Term>まで、「どこまで自分で面倒を見るか」の度合いが違う選択肢が並びます。
        </Lead>
      </Hero>

      <Heading num="01">EC2 ― 仮想サーバーを「借りる」</Heading>
      <p><Term>EC2(Elastic Compute Cloud)</Term>は、AWSのデータセンター上にある仮想マシンを1台単位で借りられるサービスです。<Link href="/os">OSの仕組み</Link>ページで見た「OSがハードウェアを抽象化する」という発想をもう一段進め、ハードウェアそのものを仮想化して切り売りしています。OS・ミドルウェア・アプリケーションはすべて自分で選び、インストールし、管理します。</p>

      <table>
        <thead>
          <tr><th>購入方式</th><th>特徴</th><th>向いている用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">オンデマンド</td><td>使った分だけ課金、いつでも起動・停止できる</td><td>負荷が読めない・短期の検証</td></tr>
          <tr><td className="hl">リザーブド</td><td>1〜3年の利用を約束する代わりに大幅割引</td><td>常時稼働することが分かっている本番サーバー</td></tr>
          <tr><td className="hl">スポット</td><td>AWSの余剰キャパシティを大幅割引で借りるが、いつでも回収され得る</td><td>中断されても困らないバッチ処理・機械学習の学習ジョブ</td></tr>
        </tbody>
      </table>

      <Heading num="02">Lambda ― 「サーバーの管理」自体をなくす</Heading>
      <p><Term>Lambda</Term>はコードの断片(関数)をアップロードしておくと、イベント(HTTPリクエスト・ファイルアップロード・スケジュールなど)が起きたときだけ実行環境が自動的に用意され、処理が終われば消える仕組みです。この形態を<Term>サーバーレス</Term>と呼びます。EC2のようにサーバーを起動・停止・パッチ適用する作業自体が発生せず、実行された時間とリクエスト数に応じてのみ課金されます。呼び出し方やコールドスタートなど実行モデルの詳細は<Link href="/cloud/aws/compute/lambda">Lambdaのページ</Link>で扱います。</p>

      <Analogy label="💡 たとえるなら">
        EC2は「1軒家を長期契約で借りる」ことに似ています。部屋の使い方も、水道や電気の管理も自分次第で自由ですが、誰も住んでいない間も家賃はかかります。Lambdaは「必要な時間だけ会議室を借りる」ことに似ています。使った分だけ支払い、使い終われば自動的に片付けまで済んでいる代わりに、部屋の内装(実行環境の細かな設定)を自由に選ぶことはできません。
      </Analogy>

      <Heading num="03">その他のコンピューティングサービス</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Elastic Beanstalk</h4>
          <p>EC2・ロードバランサ・Auto Scalingの組み合わせを、コードをアップロードするだけで自動構築するPaaS。細かい構成はEC2ほど自由が効かない代わりに、構築の手間が大きく減る。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Auto Scaling</h4>
          <p>EC2インスタンスの台数を、負荷に応じて自動的に増減させる仕組み。急なアクセス増にも人手を介さず対応できる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <div className="mb-1.5"><Mark tier="niche">補助</Mark></div>
          <h4>Batch</h4>
          <p>大量のバッチジョブを、必要な分だけ計算資源を確保しながら実行するサービス。ジョブの待ち行列とスケジューリングを肩代わりする。</p>
        </Card>
      </CardGrid>
      <MarkNote>→ Lightsailのように、EC2をより簡易な固定料金プランで使えるサービスもある(小規模・個人開発向け)。</MarkNote>

      <Heading num="まとめ">「管理する範囲」で選択肢が並ぶ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>EC2は自由と引き換えに管理責任も引き受ける</h4><p>OSからミドルウェアまで自分で選べるが、パッチ適用やスケーリングも自分の仕事になる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Lambdaはサーバーの存在自体を消す</h4><p>イベント駆動で処理を実行し、使った分だけ課金される。管理対象が減る代わりに実行時間などの制約がある。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>間に位置する選択肢も豊富</h4><p>Elastic Beanstalk・Auto Scalingのように、EC2の自由度を保ちながら運用の手間だけを減らす道具もある。</p></Card>
      </CardGrid>
      <p>コンピューティングで処理した結果は、どこかに保存しなければ消えてしまいます。次のページでは、その保存先を選ぶ「<Link href="/cloud/aws/storage">ストレージ</Link>」を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/storage" tag="AWS">ストレージ</RelatedLink>
                    <RelatedLink href="/cloud/aws/container" tag="AWS">コンテナ</RelatedLink>
                    <RelatedLink href="/network/internet/server" tag="インターネット">サーバーの全体像</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
