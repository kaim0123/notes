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
  title: "アプリ監視とビジネスKPI",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ</Eyebrow>
        <h1>アプリ監視とビジネスKPI ― 技術が健全でも事業は傾く</h1>
        <Lead>
          CPUもメモリもエラー率も、すべてのグラフが緑色。それでも売上が落ちていることがあります。技術指標は「システムが動いているか」しか答えません。監視の最上段には、<Term>事業として成り立っているか</Term>を見る目が必要です。
        </Lead>
      </Hero>

      <p>監視は下から順に、インフラ(<Link href="/infra/monitoring/server">土台</Link>)、アプリケーション(業務ロジック)、そしてビジネス(事業指標)という層で重なっています。このページでは、アプリケーション自身が名乗る健全性と、その一番上に載る<Term>ビジネスKPI</Term>を扱います。技術的に「正常」に見える障害を捕まえられるかは、この上層の監視があるかで決まります。</p>

      <Heading num="01">健全性を自ら名乗る ― ヘルスエンドポイントパターン</Heading>
      <p>アプリケーションが正常かを外から確かめる素直な方法は、アプリ自身に「あなたは正常ですか」と聞けるようにすることです。これが<Term>ヘルスエンドポイントパターン</Term>で、<code>/health</code>のような専用のエンドポイントを用意し、アクセスされたら自分の状態を返します。</p>
      <p>単にプロセスが生きていてHTTPを返せる、という以上のことができます。よく設計されたヘルスエンドポイントは、<Term>依存先の健全性</Term>もまとめて確認して返します ― データベースに接続できるか、外部APIが応答するか、キューが詰まっていないか。「プロセスは生きているがDBに繋がらず何もできない」状態を、正常と誤認しないためです。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ロードバランサの振り分け</h4>
          <p>複数台のうち不健全なインスタンスをヘルスチェックで見つけ、そこへのリクエスト送信を止める。ユーザーは異常なインスタンスに当たらずに済む。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>オーケストレータの自動復旧</h4>
          <p>Kubernetesはliveness/readinessプローブでこの仕組みを標準化している。不健全なら再起動、準備未完了なら振り分け対象から外す、という判断に使う。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>依存の可視化</h4>
          <p>何が不健全かを構造化して返せば、「アプリは正常だが依存DBが落ちている」といった切り分けが、エンドポイントを叩くだけで分かる。</p>
        </Card>
      </CardGrid>
      <p>コンテナ環境でのプローブ設計は<Link href="/infra/container/kubernetes">Kubernetes</Link>で、外形からの死活確認は<Link href="/infra/monitoring/server">サーバー・機器の監視</Link>で扱っています。</p>

      <Heading num="02">アプリが独自に持つべきメトリクス</Heading>
      <p>レイテンシ・エラー率・スループットといった汎用の技術指標は、どんなアプリにも当てはまります。しかしそれだけでは、<Term>そのアプリ固有の異常</Term>は見えません。</p>
      <p>たとえばECサイトなら「注文の確定数」「決済の成功率」、バッチ処理基盤なら「ジョブキューの滞留数」「処理の遅延時間」といった、業務の意味を持つメトリクスをアプリ自身が出すべきです。決済API連携のバグで決済成功率が急落しても、CPU使用率にはまったく現れません。ビジネスロジックの異常は、ビジネスロジックに沿ったメトリクスでしか捉えられないのです。</p>

      <Aside label="豆知識">
        汎用メトリクス(CPU・レイテンシ)は「システムが健康か」を、ドメイン固有メトリクス(注文数・決済成功率)は「サービスが役目を果たしているか」を測ります。前者だけを監視していると、「サーバーは絶好調なのに1件も注文が通っていない」状態を長時間見逃すことになります。
      </Aside>

      <Heading num="03">一番上のレイヤー ― ビジネスKPIの監視</Heading>
      <p>監視の最上段は、システムを離れて<Term>事業そのものの健全性</Term>を見る指標、すなわちビジネスKPIです。これらは経営の数字であると同時に、監視ダッシュボードに載せるべき「最も上位のアラート源」でもあります。</p>

      <table>
        <thead>
          <tr><th>KPI</th><th>見ていること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">月次経常収益(MRR)</td><td>毎月継続的に見込める収益の規模</td></tr>
          <tr><td className="hl">顧客あたりの収益</td><td>1顧客が平均でどれだけの売上をもたらすか</td></tr>
          <tr><td className="hl">課金顧客の数</td><td>実際にお金を払っている顧客の母数</td></tr>
          <tr><td className="hl">顧客あたりのコスト</td><td>1顧客を支えるのにかかる費用</td></tr>
          <tr><td className="hl">顧客獲得単価</td><td>新規顧客を1人獲得するのにかかった費用</td></tr>
          <tr><td className="hl">顧客の解約数(チャーン)</td><td>離れていった顧客の数 ― 成長を打ち消す流出</td></tr>
          <tr><td className="hl">アクティブユーザー数</td><td>実際にサービスを使っている人数(日次/月次)</td></tr>
        </tbody>
      </table>
      <p>これらの指標の意味や、事業をどう診断するかは<Link href="/finance/metrics">収益性と効率の指標</Link>や<Link href="/ops/analytics">分析・改善</Link>で扱います。監視の文脈で重要なのは、こうした数字を経営会議の月次資料に閉じ込めず、<Term>技術メトリクスと同じダッシュボードに並べる</Term>ことです。</p>

      <Heading num="04">技術指標とビジネス指標を並べる</Heading>
      <p>なぜ並べるのか。技術的には完全に「正常」に見えるのに、ユーザーには価値が届いていない障害を捕まえるためです。</p>
      <p>典型例が、デプロイ直後にサインアップ完了率が静かに落ちるケースです。サーバーは200を返し、エラーログも出ていない ― しかし新しいフォームのバリデーションにバグがあり、ユーザーが登録を完了できない。技術指標だけを見ていれば「異常なし」ですが、<Term>サインアップ完了数</Term>というビジネス寄りの指標をダッシュボードに並べておけば、その急落が一目で分かります。</p>

      <Analogy label="💡 たとえるなら">
        技術指標だけの監視は、健康診断で血圧や体温だけを見て「異常なし」と言うようなものです。数値はすべて正常範囲。でも本人は「最近まったく食欲がなく、体重が落ち続けている」。ビジネスKPI(食欲・体重)を並べて初めて、検査値には出ない不調が見えてきます。システムのバイタルと、事業のバイタルは、別物として両方測る必要があります。
      </Analogy>

      <Heading num="まとめ">上の層ほど、事業に近い</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>アプリに健全性を名乗らせる</h4><p>ヘルスエンドポイントで、自身と依存先の健全性をまとめて返せるようにする。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ドメイン固有のメトリクスを出す</h4><p>注文数・決済成功率など、業務の意味を持つ指標はCPUには現れない。アプリ自身が計測する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ビジネスKPIを同じ画面に載せる</h4><p>技術的に「正常」に見える障害は、事業指標を並べて初めて捕まえられる。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/infra/monitoring" tag="インフラ">監視・保守</RelatedLink>
            <RelatedLink href="/finance/metrics" tag="会計・財務">収益性と効率の指標</RelatedLink>
            <RelatedLink href="/ops/analytics" tag="サービス運営">分析・改善</RelatedLink>
            <RelatedLink href="/infra/container/kubernetes" tag="インフラ">Kubernetes</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
