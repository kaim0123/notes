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

export const metadata: Metadata = { title: "オブザーバビリティ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>オブザーバビリティ ― 増えて消えるものを観測する</h1>
        <Lead>
          <Link href="/infra/monitoring">監視と障害対応</Link>で、メトリクス・ログ・トレースという3つの断面を見ました。ここではそれを<Link href="/infra/kubernetes">Kubernetes</Link>のような環境でどう実装するかを扱います。難しさは道具ではなく前提の変化にあります ― <strong>監視対象が固定されていない</strong>。サーバーに名前を付けて一台ずつ見る方式は、数分で生まれて消えるPodの前では成立しません。<Term>オブザーバビリティ</Term>という言葉が使われるのは、対象を数える発想から、<Term>外から読み取れる状態にしておく</Term>という設計の発想へ移ったからです。
        </Lead>
      </Hero>

      <Heading num="01">対象が動くと、何が変わるか</Heading>
      <p>
        従来の監視は「このホストのCPUを見る」という形で、対象と監視設定が1対1でした。コンテナ環境ではこれが崩れます。
      </p>

      <table>
        <thead>
          <tr><th></th><th>固定のサーバー</th><th>コンテナ環境</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">対象</td><td>台数も名前も変わらない</td><td>絶えず増減し、名前もIPも変わる</td></tr>
          <tr><td className="hl">設定</td><td>対象ごとに手で登録する</td><td>ラベルで条件を書き、対象は自動で入れ替わる</td></tr>
          <tr><td className="hl">ログ</td><td>ディスクに残る</td><td>コンテナと一緒に消える ― 外へ逃がすのが前提</td></tr>
          <tr><td className="hl">見る単位</td><td>1台の状態</td><td>役割の集合(このサービスの全Pod)</td></tr>
        </tbody>
      </table>

      <p>
        だから設計の出発点は「何を監視するか」ではなく、<strong>消える前に、何を外へ出しておくか</strong>になります。
      </p>

      <Heading num="02">メトリクス ― 取りに行く形</Heading>
      <p>
        この分野の事実上の標準が<Term>Prometheus</Term>です。特徴は、監視対象が送りつけるのではなく<strong>自分から定期的に取りに行く</strong>(プル型)ことにあります。取りに行く先の一覧を中央で持てるので、増減する相手をラベルの条件で扱えます。
      </p>

      <DiagramFrame
        slug="infra-observability-pull"
        aspect="700 / 300"
        caption="Prometheusを中心にしたメトリクス収集の構成。各サーバーやアプリは値を公開する口を持ち、Prometheusが定期的に取りに行く。すぐ終わるバッチ処理だけは取得のタイミングが合わないため、いったん預け場所へ送っておいて後から取得する。集めた値はしきい値の評価に使われ、条件に合えばAlertmanagerが重複をまとめて通知し、人が見るグラフはGrafanaが描く。"
      />

      <table>
        <thead>
          <tr><th>部品</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Prometheus本体</td><td>収集・保存・問い合わせ。しきい値の評価もここで行う</td></tr>
          <tr><td className="hl">Exporter</td><td>監視対象の値を公開する小さな口。サーバー用・DB用など既製のものが揃っている</td></tr>
          <tr><td className="hl">Pushgateway</td><td>すぐ終わるバッチ処理の値を預かる場所</td></tr>
          <tr><td className="hl">Alertmanager</td><td>通知の重複をまとめ、宛先へ振り分ける</td></tr>
          <tr><td className="hl">Grafana</td><td>可視化。ログ側のデータも同じ画面に並べられる</td></tr>
        </tbody>
      </table>

      <p>
        値の型は、まず<strong>増え続けるもの</strong>(リクエスト総数)と<strong>上下するもの</strong>(使用率)の2つを押さえれば足ります。分布を記録する型は、平均では見えない「遅い側の数%」を見るために使います ― <Link href="/test/performance">性能テスト</Link>で平均値を信用しないのと同じ理由です。
      </p>

      <Aside label="ラベルに何を入れるかで壊れる">
        メトリクスはラベルの組み合わせごとに別の時系列として保存されます。ここにユーザーIDやリクエストIDのような<strong>値の種類が無限に増えるもの</strong>を入れると、時系列が爆発してPrometheus自身が落ちます。ラベルはサービス名・環境・エンドポイントのように、取りうる値が限られるものだけにします。1件ごとの詳細はログの仕事です。
      </Aside>

      <Heading num="03">ログ ― 消える前に集める</Heading>
      <p>
        コンテナのログはコンテナと運命を共にします。したがって各ノードに収集役を1つ置き、出力を拾って中央へ送る構成を取ります。集める側は全文検索できる保存先、見る側は検索と可視化のUI、という3点セットが定番です。
      </p>
      <p>
        設計上の要点は3つあります。<strong>構造化して出す</strong>(あとで機械的に絞れる形にする)、<strong>相関のためのIDを載せる</strong>(メトリクスやトレースと行き来できる)、<strong>載せてはいけないものを載せない</strong>。最後の点 ― 個人情報や資格情報をログへ流さない ― は<Link href="/security/logging">ログ出力設計</Link>が本体です。
      </p>

      <Heading num="04">トレース ― 区間に切る</Heading>
      <p>
        サービスをまたぐ処理では、遅い原因が自分のサービスにあるとは限りません。<Term>トレース</Term>は1つのリクエストを区間(スパン)に分け、親子関係とともに記録します。ウォーターフォール表示にすると、どの区間で時間を使ったかが一目で分かります。
      </p>
      <p>
        実装としては、アプリ側に計測を仕込み、共通のIDを伝播させる必要があります。この仕込み方と、サンプリング(全部は記録しない)の考え方は<Link href="/backend/ops-tracing">分散トレーシング</Link>で扱っています。
      </p>

      <Analogy label="💡 たとえるなら">
        メトリクスは健康診断の数値、ログは問診と検査の記録、トレースは造影剤を流して詰まりを見る検査です。数値で異常に気づき、記録で何が起きたかを読み、流れを追って詰まった場所を特定する。3つが揃って初めて診断になります。
      </Analogy>

      <Heading num="05">降り方を決めておく</Heading>
      <p>
        道具を揃えるだけでは使えません。<strong>広いところから狭いところへ降りる順番</strong>を決めておくと、深夜のアラートでも迷いません。
      </p>

      <DiagramFrame
        slug="infra-observability-flow"
        aspect="760 / 300"
        caption="障害が起きたときに観測データを降りていく順番。まずメトリクスのしきい値超過で異常に気づき、ダッシュボードでどのサービスかを絞り、その時刻のログで何が起きたかを読み、必要ならトレースでどの区間が遅いかを特定する。上ほど広く粗く、下ほど狭く細かい。上から降りるので、いきなり大量のログを読む羽目にならない。各段を共通のIDと時刻でつないでおくことが、この降下の前提になる。"
      />

      <p>
        この流れを支えるのが、Kubernetesとの組み合わせ方です。監視対象を条件で書いておけば増減するPodが自動で対象に入り、収集役を全ノードに1つずつ配る仕組みでログが自動的に拾われます。<strong>人が対象を登録しない</strong>ことが、動く環境での前提になります。
      </p>

      <Heading num="06">長く回すための決めごと</Heading>
      <table>
        <thead>
          <tr><th>項目</th><th>要点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">アラートは対応が要るものだけ</td><td>鳴っても何もしない通知が1つ常態化すると、その経路全体が信用されなくなる</td></tr>
          <tr><td className="hl">目標から逆算する</td><td>先に達成したい水準(SLO)を決め、それを割りそうなときに鳴らす。指標を先に決めるとしきい値の議論が短くなる</td></tr>
          <tr><td className="hl">保持期間を決める</td><td>メトリクスもログも際限なく貯めない。古いものは安い置き場へ移す ― そのまま<Link href="/infra/ops">コスト管理</Link>の話でもある</td></tr>
          <tr><td className="hl">監視系そのものを監視する</td><td>Prometheusが落ちたら何も鳴らない。外形監視など別系統で二重に見る</td></tr>
          <tr><td className="hl">対応手順を書いておく</td><td>アラートごとに最初の3手を書く。夜中に考えるのは判断だけにする</td></tr>
        </tbody>
      </table>

      <Heading num="まとめ">対象を数えず、状態を読み取れるようにする</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>前提は「消える」</h4>
          <p>Podもログも残らない。消える前に外へ出す設計にしておくことが出発点。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>対象は条件で書く</h4>
          <p>個体を登録するのではなく、ラベルで束ねる。増減が自動で反映される形にする。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>降りる順番を決める</h4>
          <p>アラート→ダッシュボード→ログ→トレース。共通のIDでつなぐと初めて降りられる。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/observability" />
    </DocsPage>
  );
}
