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
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "キッティングと配布・回収",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>キッティングと配布・回収</h1>
        <Lead>
          買ってきたPCは、そのままでは会社の端末として使えません。使える状態に仕立てる<Term>キッティング</Term>、それを人に渡す<Term>配布(貸与)</Term>、役目を終えて引き取る<Term>回収(返却)</Term>。入社・異動・退職という人の動きに合わせて端末を回すのが、この段階の仕事です。
        </Lead>
      </Hero>

      <Heading num="01">キッティング ― PCを使える状態に仕立てる</Heading>
      <p><Term>キッティング</Term>とは、購入したPCを従業員がすぐ使える状態にする初期セットアップ作業のことです。箱から出したPCには OS の初期状態しかなく、会社で使うためのアカウント設定・業務アプリ・セキュリティソフト・各種証明書などは入っていません。これらを整える作業を指します。</p>
      <p>1台ずつ手作業で行うと、台数が増えるほど負担が膨らみます。そこで規模に応じて次のような手法を使い分けます。</p>
      <table>
        <thead>
          <tr><th>手法</th><th>やり方</th><th>向いている場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">手動キッティング</td><td>1台ずつ手でインストール・設定</td><td>少数・特殊構成</td></tr>
          <tr><td className="hl">クローニング(マスターイメージ展開)</td><td>完成した1台の複製イメージを全台へ丸ごと展開</td><td>同一構成を大量に</td></tr>
          <tr><td className="hl">ゼロタッチ(自動構成)</td><td>電源投入で MDM が自動で設定・アプリ配布(Windows Autopilot 等)</td><td>在宅・拠点分散</td></tr>
        </tbody>
      </table>
      <p>近年は、初期不良の確認だけ情シスが行い、あとは<Term>ゼロタッチ</Term>で従業員の手元でセットアップが完了する方式が広がっています。従業員から見れば「電源を入れたら会社のPCとしてすぐ使える」状態を、裏側で作り込んでいるわけです。</p>

      <Heading num="02">配布(貸与) ― 入社・異動に合わせて渡す</Heading>
      <p>キッティング済みの端末を利用者に渡すのが<Term>配布(貸与)</Term>です。入社・異動のタイミングで発生し、単に物を渡すだけでなく、次の手続きをセットで行います。</p>
      <Steps>
        <li><strong>台帳への紐づけ</strong> ― どの個体(シリアル番号)を誰に貸したかを資産台帳に記録する。</li>
        <li><strong>貸与誓約書・利用規程の同意</strong> ― 会社の資産であること、業務目的での利用、紛失時の連絡義務などに同意してもらう。</li>
        <li><strong>アカウント・アクセス権の付与</strong> ― 業務に必要なシステムへのログイン権限を渡す(入社処理と連動)。</li>
      </Steps>
      <p>ここで台帳への紐づけを怠ると、後の棚卸や回収で「誰の端末か分からない」状態を生みます。配布は<Term>資産管理</Term>と密接に連動しています。</p>

      <Heading num="03">回収(返却) ― 退職・異動で引き取る</Heading>
      <p>退職・異動・機種更改のタイミングで端末を引き取るのが<Term>回収(返却)</Term>です。ここで最も重要なのは、端末に残った<Term>データとアクセス権を確実に断つ</Term>ことです。</p>
      <Steps>
        <li><strong>アクセス権の停止</strong> ― 退職日に合わせて各システムのアカウントを無効化する(退職処理と連動)。</li>
        <li><strong>物理的な返却</strong> ― 端末・周辺機器・付属品を回収し、台帳の貸与状態を「返却済み」に更新する。</li>
        <li><strong>データ消去と再キッティング</strong> ― 中のデータを消去し、次の利用者へ渡すため再びキッティングする。老朽化していれば<Term>廃棄</Term>へ回す。</li>
      </Steps>
      <p>返却漏れの端末はそのまま所在不明の資産になり、情報漏えいの温床になります。回収は「物を取り戻す」だけでなく「リスクを断ち切る」工程だと捉えることが大切です。</p>

      <Analogy label="💡 たとえるなら">
        キッティングは新入社員に<strong>机・文房具・名刺を一式そろえて渡す準備</strong>、配布は<strong>それを本人に手渡して受領印をもらう</strong>こと、回収は<strong>退職時に貸与品を返してもらい、入館証を無効化する</strong>こと。渡すときも返すときも「誰に・何を」の記録がセットになっている点が、ただの物のやり取りと違うところです。
      </Analogy>

      <Aside label="豆知識">
        大量キッティングでは、Windows の応答ファイル(<code>unattend.xml</code>)や、macOS・iOS の <strong>Apple Business Manager</strong> のように、メーカーの仕組みと MDM を組み合わせて「開封したPCが自動で会社仕様になる」ゼロタッチ環境を作ります。情シスが端末に一切触れずにキッティングが完了するため、在宅勤務中心の組織で特に重宝されます。
      </Aside>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>キッティングは規模で手法を選ぶ</h4>
          <p>手動・クローニング・ゼロタッチを台数と構成に応じて使い分け、手作業を減らします。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>配布は台帳への紐づけとセット</h4>
          <p>「どの個体を誰に貸したか」を記録し、誓約書とアクセス権付与まで含めて1つの手続きにします。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>回収はリスクを断ち切る工程</h4>
          <p>アクセス権の停止・物理返却・データ消去まで行って、はじめて回収が完了します。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/client/asset" tag="コンピュータ">資産管理 ― 台帳・在庫・棚卸</RelatedLink>
                    <RelatedLink href="/computer/client/security" tag="コンピュータ">端末セキュリティ管理</RelatedLink>
                    <RelatedLink href="/computer/client/disposal" tag="コンピュータ">廃棄管理</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
