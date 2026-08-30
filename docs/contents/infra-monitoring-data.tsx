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
  title: "監視データと統計",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ</Eyebrow>
        <h1>監視データと統計 ― 平均に騙されないための読み方</h1>
        <Lead>
          監視の価値は、集めたデータから<Term>正しい判断</Term>を引き出せるかで決まります。同じ数字でも、型を取り違えたり単純平均だけで見たりすると、異常を見逃したり、正常を異常と誤認したりします。ここでは監視データそのものの性質と、読み方の基本を整理します。
        </Lead>
      </Hero>

      <p><Link href="/infra/monitoring">監視・保守</Link>では、メトリクス・ログ・トレースという3本柱でシステムの状態を可視化しました。このページはその一歩手前、<Term>集めた数値をどう読むか</Term>に踏み込みます。データの型と統計の扱いを外すと、どれだけツールを揃えても判断を誤ります。</p>

      <Heading num="01">メトリクスの2つの型 ― カウンタとゲージ</Heading>
      <p>メトリクスとして集める数値は、性質の異なる2種類に大別できます。この違いを取り違えると、グラフの読み方そのものを間違えます。</p>

      <table>
        <thead>
          <tr><th></th><th>カウンタ</th><th>ゲージ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">性質</td><td>増えていくだけの累積値(基本的に減らない)</td><td>その瞬間のスナップショット(上がったり下がったりする)</td></tr>
          <tr><td className="hl">例</td><td>累積リクエスト数、累積エラー数、送信バイト総量</td><td>CPU使用率、メモリ使用量、キューの滞留数、同時接続数</td></tr>
          <tr><td className="hl">見方</td><td>値そのものより<Term>増分(レート)</Term>を見る ― 「1秒あたり何件増えたか」</td><td>値そのものを見る ― 「今いくつか」</td></tr>
        </tbody>
      </table>
      <p>カウンタの生の値は「開始からの累計」なので、それ自体を眺めても意味は薄く、<Term>単位時間あたりどれだけ増えたか</Term>に変換して初めてリクエスト数やエラー率になります。一方ゲージは今この瞬間の状態なので、そのまま値を見ます。「エラー率が上がった」と言うとき、裏では累積エラーカウンタの増分を累積リクエストカウンタの増分で割っています。</p>

      <Heading num="02">平均に騙されない ― 移動平均・中央値・分位数</Heading>
      <p>集めた数値を1つの代表値にまとめる方法は、単純平均だけではありません。データの性質に合わない要約をすると、実態が見えなくなります。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>移動平均</h4>
          <p>単純平均だけだとスパイクの多いギザギザなグラフになり、傾向が読みづらい。直近N点の平均を取り続ける移動平均を使えば、グラフを平滑化してトレンドを浮かび上がらせられる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>中央値</h4>
          <p>一方向に大きな偏りがあるデータ(レスポンスタイムなど、少数の極端に遅い値が混ざる)では、平均は極端値に引っ張られる。中央値のほうがデータの特性をよく表す場合がある。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>分位数(パーセンタイル)</h4>
          <p>p50・p95・p99のように「下から何%が収まる値か」で見る。データの大部分がどうなっているかを理解するのに便利。ただし極端なデータを無視する点に注意 ― p99は上位1%を切り捨てている。</p>
        </Card>
      </CardGrid>
      <p>とくにレスポンスタイムの監視では、平均だけを見ると「大多数のユーザーは快適なのに、一部が激遅」という状況を見落とします。「95%のユーザーは○秒以内(p95)、しかし最悪の1%はもっと遅い(p99)」というように分位数で分けて見るのが定石です。統計の基礎は<Link href="/theory/probability">確率・統計と情報理論</Link>でも扱っています。</p>

      <Analogy label="💡 たとえるなら">
        平均だけで監視するのは、クラス全員のテストの平均点だけを見て「うちのクラスは大丈夫」と判断するようなものです。平均70点でも、多くが90点で数人が0点なら、その数人は深刻に困っています。中央値は「ちょうど真ん中の生徒の点数」、p95は「下から95番目、つまり成績下位のほうの実態」。平均という1つの数字は、こうした分布の偏りを平気で覆い隠します。
      </Analogy>

      <Heading num="03">固定しきい値だけに頼らない ― 変化量で捉える</Heading>
      <p>アラートの設計というと「CPU使用率が80%を超えたら通知」のような<Term>固定しきい値</Term>を思い浮かべますが、これだけでは捉えられない異常があります。</p>
      <p>たとえば普段のエラー率が0.1%のサービスで、それが1%に跳ね上がったとします。平常時の10倍という明確な異常ですが、「5%を超えたら」という固定しきい値には引っかかりません。逆に、バッチ処理中は一時的にCPUが90%になるのが正常、というケースでは固定しきい値が誤報を連発します。</p>
      <p>そこで、絶対値の固定しきい値だけでなく、<Term>変化量・変化率</Term>や<Term>前週同時刻との比較</Term>(季節性・曜日変動を織り込む)を条件に使う場面が出てきます。「普段と比べてどれだけ外れているか」で見ると、サービスごとの平常値を人手で調整しなくても異常を捉えやすくなります。</p>

      <Aside label="豆知識">
        「変化量で見る」考え方は、しきい値を1つの固定数値ではなく「直近の平常範囲からの逸脱」として定義することに相当します。平常範囲そのものが時間帯や曜日で動くサービスほど、固定しきい値の限界が早く来ます。
      </Aside>

      <Heading num="04">メトリクスにすべきか、ログにすべきか</Heading>
      <p>同じ「エラーが起きた」という事実でも、メトリクスとして数えるべきか、ログとして1件ずつ残すべきかは別の判断です。</p>

      <table>
        <thead>
          <tr><th></th><th>メトリクス</th><th>ログ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">向いていること</td><td>集計・傾向・アラート ― 「どれくらいの規模で起きているか」</td><td>個々のイベントの詳細調査 ― 「その1件で何が起きたか」</td></tr>
          <tr><td className="hl">コスト</td><td>軽量で長期保存しやすい</td><td>量が多くなりがちで保存・検索コストが高い</td></tr>
          <tr><td className="hl">失われる情報</td><td>個別の文脈(どのユーザーの、どのリクエストか)は落ちる</td><td>ほぼ落ちないが、全体傾向は自分で集計する必要がある</td></tr>
        </tbody>
      </table>
      <p>判断の目安はシンプルで、<Term>数を数えたい・傾向を見たいならメトリクス</Term>、<Term>1件ずつの中身を後から追いたいならログ</Term>です。「何のログをとるべきか」は「後から『なぜ』を再構成できるか」を基準にし、いつ・どこで・何が起きたかを残します。そのうえで<Term>ログレベル</Term>(DEBUG/INFO/WARN/ERROR)で音量を調整し、平常時はINFO以上、調査時はDEBUGまで、というように出し分けます。ログの設計・保護の詳細は<Link href="/security/logging">ログ出力設計</Link>で扱います。</p>

      <Heading num="まとめ">数字の裏側を読む</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>型に合った見方をする</h4><p>カウンタは増分(レート)で、ゲージは瞬間値で読む。取り違えるとグラフの意味を誤る。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>平均以外の要約を使う</h4><p>移動平均で傾向を、中央値で偏りを、分位数で「大多数」と「最悪」を分けて見る。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>固定値と変化量を使い分ける</h4><p>絶対しきい値で拾えない異常は、平常からの逸脱(変化量)で捉える。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/infra/monitoring" tag="インフラ">監視・保守</RelatedLink>
            <RelatedLink href="/theory/probability" tag="情報科学">確率・統計と情報理論</RelatedLink>
            <RelatedLink href="/security/logging" tag="セキュリティ">ログ出力設計</RelatedLink>
            <RelatedLink href="/cloud/aws/monitoring/cloudwatch" tag="AWS">CloudWatch</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
