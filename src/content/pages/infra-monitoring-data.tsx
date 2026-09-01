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

export const metadata: Metadata = { title: "監視データと統計" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>監視データと統計 ― 平均に騙されない読み方</h1>
        <Lead>
          <Link href="/infra/monitoring">監視と障害対応</Link>で、何を集めるかを整理しました。ここはその一歩手前 ― <Term>集めた数字をどう読むか</Term>です。監視の価値は道具の数ではなく、そこから正しい判断を引き出せるかで決まります。型を取り違えれば読み方ごと間違えますし、平均だけを見れば<strong>大多数は快適なのに一部の利用者だけが極端に困っている</strong>状態を平気で見落とします。集める前に、読み方を決めておきます。
        </Lead>
      </Hero>

      <Heading num="01">2つの型 ― カウンタとゲージ</Heading>
      <p>
        メトリクスとして集める数値は、性質の違う2種類に分かれます。この区別を外すと、グラフの意味を取り違えます。
      </p>

      <DiagramFrame
        slug="infra-monitoring-data-counter-gauge"
        aspect="760 / 300"
        caption="カウンタとゲージの読み方の違い。左のカウンタは開始からの累積で増える一方なので、生の値を眺めても意味は薄く、単位時間あたりどれだけ増えたかという増分に直して初めてリクエスト数やエラー率になる。右のゲージはその瞬間の値なので、そのまま読む。カウンタが下がって見えたら、それは再起動でリセットされたということ。"
      />

      <table>
        <thead>
          <tr><th></th><th>カウンタ</th><th>ゲージ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">性質</td><td>累積値。基本的に減らない</td><td>その瞬間の値。上がりも下がりもする</td></tr>
          <tr><td className="hl">例</td><td>累計リクエスト数、累計エラー数、送信バイト数</td><td>CPU使用率、メモリ使用量、キューの滞留数、同時接続数</td></tr>
          <tr><td className="hl">読み方</td><td>増分(レート)を見る ― 1秒あたり何件増えたか</td><td>値そのものを見る ― 今いくつか</td></tr>
        </tbody>
      </table>

      <p>
        「エラー率が上がった」と言うとき、裏では累計エラーの増分を累計リクエストの増分で割っています。<strong>比率はいつも、2つのカウンタの増分から作られる</strong>と覚えておくと、グラフの元になっている式が読めるようになります。
      </p>

      <Heading num="02">平均は、分布を隠す</Heading>
      <p>
        応答時間のように<strong>速い側に固まり、遅い側へ長い裾を引く</strong>データでは、平均は実感とずれます。少数の極端に遅い値が平均を押し上げるので、「平均は許容範囲内」と読めてしまうのに、実際には一部の利用者が待たされ続けている、ということが起きます。
      </p>

      <DiagramFrame
        slug="infra-monitoring-data-percentile"
        aspect="760 / 300"
        caption="応答時間の分布と代表値の位置。多くのリクエストは速い側に固まり、遅い側へ細く長い裾を引く。この形では平均は裾に引っ張られ、中央値は半分の利用者が体験する値を示す。95パーセンタイルは遅い側5%の入口、99パーセンタイルはさらに外側にあたる。平均だけでは、大多数は快適なのに一部だけが極端に遅い状態を見落とす。"
      />

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>中央値(p50)</h4>
          <p>半分の利用者はここより速い、という値。裾に引っ張られないので「典型的な体験」を表す。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>分位数(p95・p99)</h4>
          <p>下から何%が収まるか。p95は遅い側5%の入口で、悪い体験の規模を測るのに使う。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>移動平均</h4>
          <p>直近数点の平均を取り続けて、細かな揺れを均す。傾向を見たいときに使い、異常の検知には向かない。</p>
        </Card>
      </CardGrid>

      <p>
        目安としては、<strong>中央値で普段の体験を、p95かp99で最悪側の規模を見る</strong>のが定石です。ただし高い分位数は切り捨てている部分がある点も忘れないでください ― p99は上位1%を見ていません。1万リクエストの1%は100件で、その100件が特定の利用者に集中していることもあります。統計そのものの基礎は<Link href="/theory/probability">確率・統計と情報理論</Link>に、性能を測る側の実務は<Link href="/test/performance">性能テスト</Link>にあります。
      </p>

      <Analogy label="💡 たとえるなら">
        クラスの平均点だけを見て「うちのクラスは大丈夫」と判断するようなものです。平均70点でも、大半が90点で数人が0点なら、その数人は深刻に困っています。中央値は真ん中の生徒の点数、p95は下位側の実態。平均という1つの数字は、分布の偏りを平気で覆い隠します。
      </Analogy>

      <Heading num="03">固定のしきい値では拾えないもの</Heading>
      <p>
        アラートというと「CPUが80%を超えたら」のような<Term>固定しきい値</Term>を思い浮かべますが、これだけでは取りこぼしと誤報の両方が出ます。
      </p>
      <ul>
        <li>普段のエラー率が0.1%のサービスが1%になった ― 平常の10倍という明確な異常ですが、「5%を超えたら」では鳴りません。</li>
        <li>バッチ処理中はCPUが90%になるのが正常 ― 「80%超で通知」は毎晩鳴り、やがて無視されます。</li>
      </ul>
      <p>
        そこで<Term>変化量</Term>や<Term>前週同時刻との比較</Term>を条件に加えます。「普段と比べてどれだけ外れているか」で見ると、サービスごとの平常値を人が調整しなくても異常を捉えられます。時間帯や曜日で平常値が動くサービスほど、固定しきい値の限界は早く来ます。
      </p>

      <Aside label="しきい値は「状態」ではなく「持続」で書く">
        瞬間値で判定すると、一瞬のスパイクで鳴ります。「80%が5分間続いたら」のように<strong>持続時間を条件に含める</strong>だけで、誤報は大きく減ります。逆にディスク残量のように、一度その値になったら戻らないものは瞬間値で構いません ― 指標の性質に合わせて条件の形を変えます。
      </Aside>

      <Heading num="04">メトリクスにするか、ログにするか</Heading>
      <p>
        同じ「エラーが起きた」でも、数として集計するか、1件ずつ記録として残すかは別の判断です。
      </p>

      <table>
        <thead>
          <tr><th></th><th>メトリクス</th><th>ログ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">向くこと</td><td>集計・傾向・アラート ― どれくらいの規模で起きているか</td><td>1件の詳細調査 ― その件で何が起きたか</td></tr>
          <tr><td className="hl">費用</td><td>軽く、長期に持ちやすい</td><td>量が多く、保存と検索の費用が高い</td></tr>
          <tr><td className="hl">落ちる情報</td><td>個別の文脈(誰の、どのリクエストか)</td><td>ほぼ落ちないが、全体傾向は自分で集計する必要がある</td></tr>
        </tbody>
      </table>

      <p>
        判断は単純です ― <strong>数えたいならメトリクス、後から1件を追いたいならログ</strong>。両方欲しい場合は両方に出し、共通のIDでつなぎます。個人情報や資格情報を含めないこと、ログの音量をレベルで調整することは<Link href="/security/logging">ログ出力設計</Link>にまとまっています。
      </p>

      <Heading num="まとめ">読み方を決めてから集める</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>型に合った読み方をする</h4>
          <p>カウンタは増分、ゲージは瞬間値。比率は2つのカウンタの増分から作られる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>中央値と分位数を並べる</h4>
          <p>平均は裾に引っ張られる。典型と最悪を分けて見ないと、一部の利用者の困りごとが消える。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>固定値と変化量を使い分ける</h4>
          <p>絶対値で拾えない異常は平常からの逸脱で捉える。条件には持続時間を含める。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/monitoring-data" />
    </DocsPage>
  );
}
