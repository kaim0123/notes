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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "サーバー・機器の監視",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ</Eyebrow>
        <h1>サーバー・機器の監視 ― 死活監視とSNMP</h1>
        <Lead>
          アプリのエラー率やレスポンスタイムがどれだけきれいに見えていても、そのアプリを動かしているサーバーのディスクが満杯になっていれば、いずれすべてが止まります。
          アプリの中を見る監視とは別に、<Term>アプリを動かしている土台そのもの</Term>を見る監視が必要です。
        </Lead>
      </Hero>

      <p><Link href="/infra/monitoring">監視・保守</Link>では、アプリケーションの<Term>メトリクス・ログ・トレース</Term>を扱いました。このページでは視点を切り替え、サーバーやネットワーク機器そのものの死活・リソースを見る<Term>インフラ視点の監視</Term>を扱います。アプリのコードが1行も悪くなくても、土台側の異常でサービスが止まることは珍しくありません。</p>

      <Heading num="01">死活監視 ― まず「生きているか」を確認する</Heading>
      <p>インフラ監視の最も基本的な問いは、「そのサーバーや機器は今、応答するか」です。これを確認するのが<Term>死活監視</Term>です。</p>

      <table>
        <thead>
          <tr><th>方式</th><th>確認すること</th><th>代表的な使い方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ping監視</td><td>ICMPというごく単純な信号を送り、応答が返るか</td><td>サーバー・ネットワーク機器がネットワーク的に生きているかの一次確認</td></tr>
          <tr><td className="hl">ポート監視</td><td>特定のポート(例: 80番、443番)に接続できるか</td><td>Webサーバーのプロセスが実際に待ち受けているかの確認</td></tr>
        </tbody>
      </table>
      <p>pingに応答があってもポートが閉じていることはあります(サーバー自体は起動しているが、Webサーバーのプロセスが落ちている、など)。逆にpingがブロックされていてもサービスは正常ということもあります。両方を組み合わせて初めて「本当に生きているか」を判断できます。</p>

      <Analogy label="💡 たとえるなら">
        ping監視は「家のインターホンを押して応答があるか確認する」ようなものです。応答があれば家(サーバー)には誰かいる。ポート監視は「玄関のドアが開くか実際に確認する」こと。インターホンには応答するのに、いざドアを開けようとしたら鍵が壊れていて開かない(プロセスが落ちている)、ということもあり得ます。
      </Analogy>

      <Heading num="02">SNMPとSyslog ― 機器から情報を集める</Heading>
      <p>ルーターやスイッチのようなネットワーク機器は、Webサーバーのように自由にアプリを組み込めるわけではありません。こうした機器から情報を取得するために使われるのが<Term>SNMP</Term>と<Term>Syslog</Term>です。</p>

      <table>
        <thead>
          <tr><th></th><th>SNMP</th><th>Syslog</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">正式名称</td><td>Simple Network Management Protocol</td><td>(プロトコル名がそのまま一般名称化)</td></tr>
          <tr><td className="hl">向き</td><td>監視サーバーが機器に「今どんな状態か」を聞きに行く(ポーリング)</td><td>機器の側から監視サーバーへログを送りつける(プッシュ)</td></tr>
          <tr><td className="hl">扱う情報</td><td>CPU使用率・トラフィック量・インターフェースの状態など数値化された情報</td><td>「いつ・何が起きたか」というテキストのイベント記録</td></tr>
          <tr><td className="hl">典型例</td><td>スイッチのポート単位の通信量を定期的に取得しグラフ化する</td><td>ルーターの再起動やエラーの発生を一元的なログサーバーに集約する</td></tr>
        </tbody>
      </table>
      <p>SNMPは「聞かれたら答える」仕組みが基本ですが、重大な異常が起きた際に機器の側から能動的に通知する<Term>トラップ</Term>という機能もあります。Syslogは元々テキストログを一元収集するための仕組みで、機器の種類をまたいで同じ形式でログを集約できるのが利点です。大量の機器のログを1台1台個別に見に行くのは現実的ではないため、Syslogサーバーに集約し、そこから異常なパターンを検索・監視します。</p>

      <Diagram caption="SNMPは監視サーバーから機器へ「取りに行く」、Syslogは機器から監視サーバーへ「送られてくる」">
        <svg viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg">
          <rect x={40} y={30} width={120} height={40} rx={6} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={100} y={55} fill="#f2f2f2" fontSize="13" textAnchor="middle">監視サーバー</text>

          <rect x={400} y={30} width={120} height={40} rx={6} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={460} y={55} fill="#f2f2f2" fontSize="13" textAnchor="middle">ルーター等</text>

          <line x1={160} y1={45} x2={395} y2={45} stroke="#39ff6a" strokeWidth="1.5" />
          <polygon points="395,45 385,40 385,50" fill="#39ff6a" />
          <text x={280} y={35} fill="#39ff6a" fontSize="11" textAnchor="middle">SNMP: 取得しに行く</text>

          <line x1={400} y1={65} x2={165} y2={65} stroke="#5f5f5f" strokeWidth="1.5" />
          <polygon points="165,65 175,60 175,70" fill="#5f5f5f" />
          <text x={280} y={82} fill="#9a9a9a" fontSize="11" textAnchor="middle">Syslog: 送られてくる</text>

          <rect x={40} y={120} width={120} height={40} rx={6} fill="none" stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
          <text x={100} y={145} fill="#9a9a9a" fontSize="12" textAnchor="middle">ログサーバー</text>
        </svg>
      </Diagram>

      <Heading num="03">リソース監視 ― CPU・メモリ・ディスク</Heading>
      <p>機器やサーバーが生きているだけでなく、余力を持って動けているかも見る必要があります。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>CPU監視</h4>
          <p>処理能力の使用率。高止まりが続くと応答遅延やタイムアウトにつながる。急なスパイクは特定処理の暴走や、想定外の高負荷アクセスの兆候であることが多い。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>メモリ監視</h4>
          <p>使用量が上限に近づくと、OSが不要なプロセスを強制終了させたり、極端に処理が遅くなったりする。じわじわと増え続ける場合はメモリリークを疑うきっかけになる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ディスク監視</h4>
          <p>容量だけでなく読み書き速度(I/O)も見る。容量が枯渇するとログ書き込みやDBの更新自体ができなくなり、サービス全体が停止する重大障害に直結しやすい。</p>
        </Card>
      </CardGrid>

      <Aside label="豆知識">
        ディスク容量の枯渇は、CPUやメモリの逼迫と違って前兆に気づきにくい割に、気づいたときには手遅れ(書き込み不能)になっていることが多い指標です。ログファイルが際限なく増え続けていないかなど、時間の経過とともにじわじわ増える指標こそ、しきい値監視の対象にする価値があります。
      </Aside>

      <Heading num="04">ログ監視とアラートのしきい値</Heading>
      <p>機器やサーバーから集めたログの中から、エラーやハードウェア異常を示すパターン(「disk error」「link down」など)を検索して検知するのが<Term>ログ監視</Term>です。<Link href="/infra/monitoring">監視・保守</Link>で扱ったアラート設計(アラート疲れを避ける、通知先を絞る、といった全体設計)はそのままインフラ側にも当てはまるため、ここでは「インフラのどの指標に、どんなしきい値を置くか」に絞って整理します。</p>

      <table>
        <thead>
          <tr><th>指標</th><th>しきい値の考え方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">CPU使用率</td><td>一時的な高負荷は正常なこともあるため、「80%が5分間続いたら」のように継続時間を条件に含める</td></tr>
          <tr><td className="hl">メモリ使用率</td><td>単発のピークよりも、右肩上がりの傾向(リーク兆候)自体を監視する</td></tr>
          <tr><td className="hl">ディスク使用率</td><td>枯渇すると即障害になるため、余裕を持って早めに(例: 80%到達時点で)警告する</td></tr>
          <tr><td className="hl">死活監視の応答</td><td>1回の失敗で即通知せず、数回連続の失敗で確定させ、瞬間的な揺らぎでの誤報を防ぐ</td></tr>
        </tbody>
      </table>

      <Heading num="まとめ">土台を見る目を持つ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>まず「生きているか」を確かめる</h4>
          <p>ping監視とポート監視を組み合わせ、ネットワーク的な到達性とサービスの応答性の両方を確認する。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>SNMPとSyslogで機器の情報を集約する</h4>
          <p>取りに行く(SNMP)か、送られてくる(Syslog)かの違いを踏まえ、多数の機器の状態を1箇所で把握できるようにする。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>リソース指標には早めのしきい値を置く</h4>
          <p>特にディスク容量は手遅れになりやすいため、余裕を持った早期警告を設計する。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/infra/monitoring" tag="インフラ">監視・保守</RelatedLink>
                    <RelatedLink href="/infra/incident" tag="インフラ">障害の切り分け</RelatedLink>
                    <RelatedLink href="/security/network-defense" tag="セキュリティ">ネットワーク層の防御</RelatedLink>
                    <RelatedLink href="/ops/deploy" tag="サービス運営">公開先とデプロイ経路</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
