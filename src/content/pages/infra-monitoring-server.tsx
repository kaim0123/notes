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

export const metadata: Metadata = { title: "サーバー・機器の監視" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>サーバー・機器の監視 ― 土台が余力を持っているか</h1>
        <Lead>
          アプリのエラー率がどれだけきれいでも、そのアプリが載っているサーバーのディスクが満杯なら、いずれ全部が止まります。ここで見るのは<Term>アプリを動かしている土台そのもの</Term>です。アプリのコードが1行も悪くなくても、土台側の理由でサービスは止まります ― そしてその種類の障害は、アプリのログをいくら読んでも原因にたどり着けません。
        </Lead>
      </Hero>

      <Heading num="01">まず「応答するか」</Heading>
      <p>
        いちばん基本的な問いは<Term>死活監視</Term>です。ただし「生きている」には段階があります。
      </p>

      <table>
        <thead>
          <tr><th>方式</th><th>確かめること</th><th>分かること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ping監視</td><td>単純な信号を送り、応答が返るか</td><td>ネットワーク的にそこまで届くか</td></tr>
          <tr><td className="hl">ポート監視</td><td>目的のポートに接続できるか</td><td>待ち受けているプロセスが生きているか</td></tr>
          <tr><td className="hl">応答内容の確認</td><td>接続したうえで、期待する応答が返るか</td><td>サービスとして機能しているか</td></tr>
        </tbody>
      </table>

      <p>
        pingが通ってもポートが閉じていることはあり(機械は起動しているが、Webサーバーのプロセスが落ちている)、逆にpingを遮断していても正常なこともあります。<strong>どの段階まで確かめたかで、言えることが変わる</strong> ― これが死活監視の要点です。
      </p>

      <Analogy label="💡 たとえるなら">
        pingはインターホンを押して応答があるか、ポート監視は玄関のドアが開くか、応答内容の確認は用件が通じるか。インターホンに応えても鍵が壊れていて入れないことはありますし、入れても担当者が不在なら用は足りません。
      </Analogy>

      <Heading num="02">機器から情報を集める2つの向き</Heading>
      <p>
        ルーターやスイッチのような機器には、監視用のプログラムを自由に入れられません。そこで昔から使われている2つの仕組みがあります。
      </p>

      <DiagramFrame
        slug="infra-monitoring-server-snmp-syslog"
        aspect="700 / 260"
        caption="機器から情報を集める2つの向き。SNMPは監視サーバーの側から定期的に問い合わせ、CPU使用率やポートごとの通信量といった数値を取得する。Syslogは逆向きで、機器の側からいつ何が起きたかというテキストの記録を送りつける。数値の推移を追うのがSNMP、出来事の記録を集めるのがSyslogで、メトリクスとログの関係が機器の世界でも同じ形で現れている。"
      />

      <p>
        構図としては<Link href="/infra/monitoring">メトリクスとログ</Link>そのものです。数値の推移は取りに行き、出来事の記録は送ってもらう。台数が増えるほど1台ずつ見に行くのは非現実的になるので、どちらも1か所へ集約して、そこから異常なパターンを探します。機器側の設定と保護は<Link href="/network/device-management">デバイスの管理</Link>で扱っています。
      </p>

      <Heading num="03">資源は、3つとも壊れ方が違う</Heading>
      <p>
        CPU・メモリ・ディスクをまとめて「リソース監視」と呼びますが、<strong>見るべき形は3つとも別</strong>です。同じしきい値の書き方を当てはめると、必ずどれかで誤報か見逃しが出ます。
      </p>

      <DiagramFrame
        slug="infra-monitoring-server-resources"
        aspect="760 / 300"
        caption="3つの資源が枯渇するときの現れ方の違い。CPUは瞬間的に跳ねることがあり、それ自体は正常なこともあるので高い状態がどれだけ続いたかで判断する。メモリは単発のピークより右肩上がりの傾向そのものが解放し忘れの兆候になる。ディスクは使い切る直前まで無症状で、埋まった瞬間に書き込みが失敗して全体が止まるため、余裕のある段階で警告する。継続時間で見るもの、傾きで見るもの、残量で見るものと、判定の形が違う。"
      />

      <table>
        <thead>
          <tr><th>指標</th><th>しきい値の置き方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">CPU使用率</td><td>一時的な高負荷は正常なこともある。「80%が5分続いたら」のように<strong>持続時間</strong>を条件に含める</td></tr>
          <tr><td className="hl">メモリ使用率</td><td>ピークより<strong>傾き</strong>を見る。再起動のたびにゼロへ戻り、じわじわ増えるなら解放し忘れを疑う</td></tr>
          <tr><td className="hl">ディスク使用率</td><td>枯渇=即障害。<strong>余裕のある段階</strong>(80%など)で警告し、増加ペースから枯渇日を見積もる</td></tr>
          <tr><td className="hl">ディスクI/O</td><td>容量に余裕があっても、読み書きが詰まれば遅くなる。待ち行列の長さを併せて見る</td></tr>
          <tr><td className="hl">死活の応答</td><td>1回の失敗で鳴らさず、数回連続で確定させる。瞬間的な揺らぎでの誤報を防ぐ</td></tr>
        </tbody>
      </table>

      <Aside label="ディスクは前兆が無い">
        CPUやメモリの逼迫は遅くなるという形で先に現れますが、ディスク容量は<strong>埋まるまで何も起きません</strong>。そして埋まった瞬間、ログも書けずデータベースも更新できず、復旧作業のためのファイルすら置けなくなります。増え続けるログやスナップショットの世代など、<strong>時間とともに単調に増えるもの</strong>こそ、早めのしきい値を置く価値があります。
      </Aside>

      <Heading num="04">クラウドでも消えない視点</Heading>
      <p>
        マネージドなサービスを使うと、この層の多くは事業者側に移ります。ただし全部ではありません。<strong>割り当てた上限に対して、どれだけ使っているか</strong>という問いは残り続けます ― 接続数の上限、ストレージの割り当て、関数の同時実行数、APIの呼び出し制限。形が「機械の資源」から「契約上の枠」に変わっただけで、<Term>枯渇すると止まる</Term>という性質は同じです。
      </p>
      <p>
        枠を使い切ったときに何が起きるかを先に確かめておくと、対処が変わります。落ちるのか、遅くなるのか、拒否されるのか。この挙動の違いは<Link href="/backend/ops-rate-limit">レート制限</Link>や<Link href="/backend/ops-resilience">障害への耐性</Link>で扱う「相手が限界に達したときの振る舞い」と同じ話です。
      </p>

      <Heading num="05">上の層とどうつなぐか</Heading>
      <p>
        この層のアラートは、単独では判断材料になりません。CPUが高いこと自体は障害ではなく、<strong>利用者に影響が出ているかどうか</strong>が問題です。だから土台の指標は、上の層の指標と並べて置きます ― 応答時間が伸びていないか、エラー率が上がっていないか。
      </p>
      <p>
        実務的には、土台の指標は<strong>原因を説明するための材料</strong>として使い、鳴らすのは上の層、と役割を分けると通知が減ります。ただしディスク残量のように<strong>放置すれば確実に障害になるもの</strong>だけは、影響が出る前に鳴らす例外として扱います。
      </p>

      <Heading num="まとめ">土台は、別の目で見る</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>「生きている」には段階がある</h4>
          <p>届くか、待ち受けているか、用が足りるか。どこまで確かめたかで言えることが変わる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>資源ごとに判定の形が違う</h4>
          <p>CPUは持続時間、メモリは傾き、ディスクは残量。同じ書き方を当てはめない。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>クラウドでは「枠」に姿を変える</h4>
          <p>物理資源が消えても、上限に対する使用量という問いは残る。枯渇時の挙動を先に確かめる。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/monitoring-server" />
    </DocsPage>
  );
}
