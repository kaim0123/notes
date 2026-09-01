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

export const metadata: Metadata = { title: "インフラ・クラウド・運用" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>インフラ・クラウド・運用</h1>
        <Lead>
          <Term>本番でどう動かすか</Term>を集めたセクションです。アプリが載る土台(仮想化・コンテナ・サーバー・ストレージ)から、動いていることを確かめる監視、本番へ届けるデプロイ、部品を貸してくれるクラウド事業者、そして公開後に続く運営まで。設計や実装が「何を作るか」を決めるのに対し、ここは<strong>作ったものを、他人が使える状態で維持し続けるための知識</strong>を扱います。まずはその前提として、いまや土台の大半を占めるクラウドとは何を借りることなのかを整理しておきます。
        </Lead>
      </Hero>

      <Heading num="01">クラウドは「管理範囲を買う」こと</Heading>
      <p>
        自前でサーバーを持つ<Term>オンプレミス</Term>では、施設・電源・ハードウェアからOS・ミドルウェア・アプリまで、すべてが自分の担当です。クラウドは、この積み重なった層の<strong>どこまでを事業者に肩代わりしてもらうか</strong>を選ぶ仕組みで、その境界の位置によって3つに呼び分けられます。
      </p>

      <DiagramFrame
        slug="infra-shared-responsibility"
        aspect="760 / 360"
        caption="オンプレミス・IaaS・PaaS・SaaSで、施設・電源からデータまでの8つの層をどちらが管理するかを並べた階段図。オンプレミスは全部を自分で持ち、IaaSではOSから上の5層、PaaSではアプリとデータの2層だけが自分の担当になり、SaaSでは全層を事業者が管理する。どこを選んでも、いちばん上のデータの責任は自分に残る。"
      />

      <table>
        <thead>
          <tr><th>形態</th><th>自分の担当</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">IaaS</td><td>OS・ミドルウェア・ランタイム・アプリ・データ</td><td>EC2、Compute Engine、VPC</td></tr>
          <tr><td className="hl">PaaS</td><td>アプリとデータだけ</td><td>Lambda、Cloud Run、Vercel</td></tr>
          <tr><td className="hl">SaaS</td><td>データ(とその中での設定)だけ</td><td>Gmail、Slack、GitHub</td></tr>
        </tbody>
      </table>

      <p>
        任せる範囲が広いほど手間は減り、代わりに構成の自由度は下がります。どちらが正しいということはなく、<strong>変えたい理由があるかどうか</strong>で決まります。同じ事業者の中でもサービスごとに立ち位置は違い、「AWS = IaaS」のような単純化はできません ― EC2はIaaS寄り、LambdaはPaaS寄りです。
      </p>

      <Aside label="どこを選んでも、データの責任は残る">
        階段のいちばん上、データとその公開範囲だけは、どの形態でも自分の担当のままです。クラウドで起きる情報漏えいの多くが基盤の突破ではなく設定の誤りなのは、このためです。この線引きは<Link href="/security/basics">情報セキュリティの目的と脅威</Link>で扱う「何を守るか」の話と、そのままつながっています。
      </Aside>

      <Heading num="02">事業者ごとの違いは、大半が名前の違い</Heading>
      <p>
        主要な事業者は<Term>AWS</Term>・<Term>Google Cloud</Term>・<Term>Microsoft Azure</Term>で、地理で分割する考え方(リージョンとその中の独立した区画)、従量課金の性質、責任の分かれ目はどこもほぼ共通です。対応する概念があってサービス名だけが違う、という場面がほとんどなので、1つ目を骨格として身につければ2つ目以降は読み替えで進めます。
      </p>
      <table>
        <thead>
          <tr><th>用途</th><th>AWS</th><th>Google Cloud</th><th>Azure</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">仮想サーバー</td><td>EC2</td><td>Compute Engine</td><td>Virtual Machines</td></tr>
          <tr><td className="hl">関数実行</td><td>Lambda</td><td>Cloud Functions</td><td>Functions</td></tr>
          <tr><td className="hl">オブジェクトストレージ</td><td>S3</td><td>Cloud Storage</td><td>Blob Storage</td></tr>
          <tr><td className="hl">マネージドDB</td><td>RDS</td><td>Cloud SQL</td><td>Azure SQL Database</td></tr>
        </tbody>
      </table>
      <p>
        本セクションでは、機能の広さと資料の多さで先行する<Link href="/infra/aws">AWS</Link>を軸に置き、構造の違いが分かるように<Link href="/infra/gcp">Google Cloud</Link>を対応表で並べ、立ち位置そのものが異なる<Link href="/infra/cloudflare">Cloudflare</Link>を第3の型として扱います。
      </p>

      <p>
        以下の8つが、このセクションの入口です。土台 → 動かし続ける仕組み → 借りる先 → 続けるための運営、の順に並んでいます。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>
            <Link href="/infra/virtualization">仮想化とコンテナ</Link>
          </h4>
          <p>
            1台を複数台に見せる技術と、アプリを依存ごと箱に詰める技術。境界をどこに引くかで、軽さと隔離の強さが決まる。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>
            <Link href="/infra/server">サーバーとストレージ</Link>
          </h4>
          <p>
            何が依頼に応えているのか、データをどの形で置くか。役割の分類と、ブロック・ファイル・オブジェクト、そして冗長化。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>
            <Link href="/infra/monitoring">監視と障害対応</Link>
          </h4>
          <p>
            正常だと言い切れる根拠を作る。メトリクス・ログ・トレース、アラートの設計、そして鳴った後の型。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>
            <Link href="/infra/deploy">デプロイと公開</Link>
          </h4>
          <p>
            どこで動かし、どう届けるか。DNS・TLS・CDNの持ち主を決め、戻せる形で本番へ出す。
          </p>
        </Card>
        <Card>
          <CardNumber>5</CardNumber>
          <h4>
            <Link href="/infra/aws">AWS</Link>
          </h4>
          <p>
            200を超えるサービスを、動かす・置く・つなぐ・守る・見る・作って配るの役割と、地理の階層で捉える。
          </p>
        </Card>
        <Card>
          <CardNumber>6</CardNumber>
          <h4>
            <Link href="/infra/gcp">Google Cloud</Link>
          </h4>
          <p>
            役割は共通、違うのは入口と境界。プロジェクトという請求・権限の単位と、グローバルなネットワーク。
          </p>
        </Card>
        <Card>
          <CardNumber>7</CardNumber>
          <h4>
            <Link href="/infra/cloudflare">Cloudflare</Link>
          </h4>
          <p>
            利用者とサーバーの間に立つことを本業にしてきた事業者。エッジでの配信・防御・コード実行とホスティング。
          </p>
        </Card>
        <Card>
          <CardNumber>8</CardNumber>
          <h4>
            <Link href="/infra/ops">サービス運営</Link>
          </h4>
          <p>
            公開してから始まる仕事。速度と費用、計測と改善、保守と決まりごとを、誰の担当かを決めて回し続ける。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra" />
    </DocsPage>
  );
}
