import type { Metadata } from "next";
import Link from "next/link";
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
  title: "オブザーバビリティ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ</Eyebrow>
        <h1>オブザーバビリティ ― コンテナの状態を観測する</h1>
        <Lead>
          <Link href="/infra/container/kubernetes">Kubernetes</Link>ではコンテナが動的に増減し、起動と停止を絶えず繰り返します。従来の「サーバー1台をずっと見る」監視では追いつきません。ここでは、システムの状態を外から読み取る<Term>オブザーバビリティ(可観測性)</Term>の3本柱と、その定番ツールを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">なぜ監視が必要か</Heading>
      <p>監視は「壊れたら気づく」ためではなく、<strong>壊れる前に気づく</strong>ための仕組みです。目的は大きく3つあります。</p>
      <table>
        <thead>
          <tr><th>理由</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">障害の早期発見</td><td>落ちた「後」ではなく、CPU使用率90%超などの兆候で先に気づく</td></tr>
          <tr><td className="hl">パフォーマンス把握</td><td>どのAPIが遅いか、ボトルネックはどこかを勘ではなくデータで判断する</td></tr>
          <tr><td className="hl">キャパシティプランニング</td><td>利用増加のペースから、いつサーバー増強が必要かを予測する</td></tr>
        </tbody>
      </table>

      <Heading num="02">オブザーバビリティの3本柱</Heading>
      <p>システムを観測するためのデータは、性質の違う3種類に分けられます。それぞれ別のツールで担うのが一般的です。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>メトリクス</h4>
          <p>CPU使用率・メモリ・リクエスト数などの<strong>数値</strong>。時系列で追い、傾向やアラートに使う。担うのは<Term>Prometheus</Term>+<Term>Grafana</Term>。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ログ</h4>
          <p>エラーログ・アクセスログなどの<strong>テキスト</strong>。「なぜ起きたか」の詳細を残す。担うのは<Term>EFKスタック</Term>。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>トレース</h4>
          <p>1リクエストが複数サービスを通る<strong>処理の流れ</strong>。どこで時間がかかったかを追う。担うのは<Term>Jaeger</Term>。</p>
        </Card>
      </CardGrid>

      <Heading num="03">メトリクス ― Prometheus</Heading>
      <p><Term>Prometheus</Term>は、クラウドネイティブ監視の事実上の業界標準です。<strong>2016年</strong>にCNCFの2番目のプロジェクト(1番目はKubernetes)として採用されました。名前はギリシャ神話で火を盗んだ神プロメテウスに由来します。</p>
      <p>特徴は<strong>プル型</strong>であること。監視対象がデータを送りつける従来のプッシュ型と違い、Prometheus自身が定期的に対象へ<strong>取りに行き</strong>ます(デフォルト60秒に1回)。監視対象を中央で一元管理しやすい方式です。ただし短時間で終わるバッチ処理は取りこぼしやすいため、そのときは結果を<strong>Pushgateway</strong>に送り、あとからPrometheusが取得します。</p>
      <table>
        <thead>
          <tr><th>コンポーネント</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Prometheusサーバー</td><td>中核。メトリクスの収集・保存・クエリを担う</td></tr>
          <tr><td className="hl">Exporter</td><td>監視対象からメトリクスを公開するプログラム(Node Exporter=サーバー、MySQL Exporter=DBなど)</td></tr>
          <tr><td className="hl">Pushgateway</td><td>短命なバッチジョブ向けのプッシュ受け口</td></tr>
          <tr><td className="hl">Alertmanager</td><td>アラートのグルーピング・重複除去・通知(Slack・PagerDutyなど)</td></tr>
          <tr><td className="hl">Grafana</td><td>本体ではないがほぼセットで使う可視化・ダッシュボード</td></tr>
        </tbody>
      </table>
      <p>メトリクスには4つの型があり、まずは増え続ける<strong>Counter</strong>(リクエスト総数など)と、上下する<strong>Gauge</strong>(CPU使用率など)の2つを覚えれば十分です。分布を記録する<strong>Histogram</strong>はパーセンタイル計算に、<strong>Summary</strong>はクライアント側集計に使います。取得は<Term>PromQL</Term>というクエリ言語で行い、たとえば<code>rate(http_requests_total[5m])</code>で過去5分のリクエストレートが得られます。よく使う式はネット上に多いので、コピペから始めるのが現実的です。</p>
      <Aside label="要注意">
        ユーザーIDのような<strong>ユニークな値をラベルにすると時系列が爆発</strong>し、Prometheusが落ちます(カーディナリティ問題)。目安は1インスタンスで約100万時系列まで、1000万超は危険域です。ラベルには「サービス名」「環境」など値の種類が限られるものだけを使います。
      </Aside>

      <Heading num="04">ログ ― EFKスタック</Heading>
      <p>コンテナは頻繁に消えるので、ログは消える前に中央へ集めて検索できるようにします。その定番構成が<Term>EFKスタック</Term>です。</p>
      <table>
        <thead>
          <tr><th>略</th><th>ツール</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">E</td><td>Elasticsearch</td><td>分散型の全文検索エンジン。JSONをそのまま格納するスキーマレスDBで、億単位のログから高速検索する</td></tr>
          <tr><td className="hl">F</td><td>Fluentd(K8sではFluent Bitも多い)</td><td>各ノードのログ収集エージェント。収集・フィルタ・変換・転送を担う</td></tr>
          <tr><td className="hl">K</td><td>Kibana</td><td>Elasticsearch上のログを検索・グラフ化する。Grafanaがメトリクス、Kibanaがログという役割分担</td></tr>
        </tbody>
      </table>
      <p>Fluentdは<strong>source</strong>(入力元)→<strong>filter</strong>(変換)→<strong>match</strong>(出力先)の3ディレクティブで設定します。Kibanaでは<strong>Discover</strong>でリアルタイムにログを検索し(例: 過去1時間のエラーのみ)、<strong>Dashboard</strong>でエラー率やレスポンスタイム分布を1画面に配置します。</p>
      <table>
        <thead>
          <tr><th>ツール</th><th>答える問い</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Prometheus</td><td><strong>何が</strong>起きているか(数値)</td><td>CPU 80%、エラー率が急上昇</td></tr>
          <tr><td className="hl">EFK</td><td><strong>なぜ</strong>起きたか(ログ)</td><td>スタックトレース、エラーメッセージの詳細</td></tr>
        </tbody>
      </table>

      <Heading num="05">トレース ― Jaeger</Heading>
      <p><Term>Jaeger</Term>(ドイツ語で「狩人」)は分散トレーシングのツールです。マイクロサービスでは1リクエストが認証・商品・在庫・決済・配送と複数サービスを渡り歩きます。<strong>Span</strong>は1つの処理の開始〜終了(どのサービスで何秒かかったか)、<strong>Trace</strong>は複数のSpanをつないだリクエスト全体の流れです。UIの<strong>ウォーターフォール</strong>表示で、どこがボトルネックかが一目で分かります。</p>

      <Analogy label="💡 たとえるなら">
        メトリクスは<strong>健康診断の数値</strong>(体温・血圧)、ログは<strong>問診票の記録</strong>(いつ何が起きたか)、トレースは<strong>血液が全身をどう巡ったかの追跡</strong>です。数値で異常に気づき、記録で原因を探り、流れの追跡で詰まった箇所を特定する ― 3つが揃って初めて診断が完結します。
      </Analogy>

      <Heading num="06">統合監視の設計と障害対応の流れ</Heading>
      <p>3本柱は単独ではなく、連携させて初めて力を発揮します。障害対応は次のように段階を踏みます。</p>
      <Steps>
        <li><strong>Prometheus</strong>でメトリクスを監視し、しきい値を超えたらアラート発火。</li>
        <li><strong>Grafana</strong>でメトリクスの推移を確認し、どのサービスかを特定する。</li>
        <li><strong>Kibana</strong>で該当時刻のログを検索し、原因を調べる。</li>
        <li>必要なら<strong>Jaeger</strong>で遅いトレースを見て、ボトルネックを突き止める。</li>
      </Steps>
      <p>GrafanaはElasticsearchもデータソースにできるため、メトリクスとログを1つのダッシュボードに集約できます。K8s環境では<strong>Prometheus Operator</strong>(<code>ServiceMonitor</code>を書くだけで監視対象を自動追加)や<strong>Fluentd DaemonSet</strong>(全ノードに1Podずつ配置しログを自動収集)が定番の組み込み方です。</p>

      <Heading num="07">運用のベストプラクティス</Heading>
      <p>ツールを入れるだけでは機能しません。長く回すための勘どころを押さえておきます。</p>
      <table>
        <thead>
          <tr><th>項目</th><th>要点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">アラート疲れの防止</td><td>多すぎるアラートは重要なものを埋もれさせる。対応が必要(アクショナブル)なものだけ設定する</td></tr>
          <tr><td className="hl">SLOベースの監視</td><td>先に<Term>SLO</Term>(可用性99%など)を決め、それを下回りそうなときにアラートを出す</td></tr>
          <tr><td className="hl">ログレベルの整理</td><td>本番はINFO以上に絞るなどして、保存領域を守る</td></tr>
          <tr><td className="hl">リテンション</td><td>保存期間を決め(例: Prometheus 15日・Elasticsearch 30日)、古いデータはS3等にアーカイブ</td></tr>
          <tr><td className="hl">監視システムの監視</td><td>Prometheus自身が落ちたら意味がない。別系統やUptimeRobot等で二重に見る</td></tr>
          <tr><td className="hl">ランブック</td><td>アラートごとの対応手順を文書化し、夜中でも迷わず動けるようにする</td></tr>
          <tr><td className="hl">ポストモーテム</td><td>障害後は責任追及ではなくシステム改善のために事後分析を行う</td></tr>
        </tbody>
      </table>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/infra/container/kubernetes" tag="インフラ">Kubernetes ― 大量のコンテナを束ねる</RelatedLink>
                    <RelatedLink href="/infra/container/security" tag="インフラ">コンテナセキュリティ ― 5大リスクと防御</RelatedLink>
                    <RelatedLink href="/infra/monitoring" tag="インフラ">監視・保守</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
