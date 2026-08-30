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
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "OSPF",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>OSPF ― リンクステート型の代表選手</h1>
        <Lead>
          「ルータの機能とルーティング」で見たリンクステート型の代表が<Term>OSPF(Open Shortest Path First)</Term>です。特定のメーカーに依存しないオープンな標準規格で、企業ネットワークで広く使われています。動作の仕組みから実際の設定・確認コマンド、詰まったときの切り分け方まで一通り押さえます。
        </Lead>
      </Hero>

      <Heading num="00">OSPFの動作 ― 3つの段階</Heading>
      <p>
        OSPFが動き出してからルーティングテーブルが出来上がるまでには、次の3つの段階があります。
      </p>

      <DiagramFrame
        slug="network-ospf-three-steps"
        aspect="920 / 200"
        caption="OSPFの3段階の動作。まずHelloパケットを交換して隣接関係(ネイバー)を確立し、次にLSAを交換して両者が同じリンクステートデータベース(LSDB)を構築し、最後は互いに通信せず各自がSPF計算(ダイクストラ法)を行ってルーティングテーブルに反映する。"
      />

      <ol>
        <li>
          <Term>Hello</Term>パケットを定期的に送り合い、設定が一致する隣のルーターを見つけて<Term>隣接関係(ネイバー)</Term>を確立する
        </li>
        <li>
          ネイバーになったルーター同士で<Term>LSA(Link State Advertisement)</Term>という「自分にはどんなリンクがあるか」を伝え合い、両者が同じ<Term>LSDB(リンクステートデータベース)</Term>を組み上げる
        </li>
        <li>
          各ルーターが、自分のLSDBを使って<Term>SPF計算(ダイクストラ法)</Term>を独自に実行し、自分から見た最短経路をルーティングテーブルに反映する
        </li>
      </ol>
      <p>
        3段階目では、他のルーターと通信するのではなく、各ルーターが同じ地図(LSDB)を見ながら<Term>独自に</Term>計算する点がポイントです。同じ地図から出発するので、途中で通信しなくても、みんな同じ結論(矛盾のない経路)にたどり着きます。
      </p>

      <Heading num="01">DR/BDR ― マルチアクセス網での交換を1点に集約する</Heading>
      <p>
        イーサネットのように1つのセグメントに3台以上のルーターがぶら下がる<Term>マルチアクセスネットワーク</Term>では、全員が全員とLSAを交換すると、台数が増えるほど組み合わせの数が爆発的に増えてしまいます。そこでOSPFは、代表となる<Term>DR(Designated Router)</Term>を1台選び、他のルーターは全員DRとだけネイバー関係を結ぶことで、交換の本数を抑えます。
      </p>

      <DiagramFrame
        slug="network-ospf-dr-bdr"
        aspect="640 / 560"
        caption="DR/BDRの仕組み。DR/BDRが無い場合は同じセグメント上の全ルーターが互いにネイバーになりLSA交換の本数が組み合わせ分だけ増える。DR/BDRがある場合は各ルーターがDR(代表)とだけネイバーになり、LSAはDRが代表して配るため交換本数がルーター台数分で済む。"
      />

      <p>
        DRが故障した場合に備えて、<Term>BDR(Backup Designated Router)</Term>という予備の代表も同時に選ばれ、常にDRと同じ情報を受け取っています。DRが落ちると、BDRが即座にDRへ昇格します。
      </p>

      <Heading num="02">エリア設計 ― OSPFを大規模化する仕組み</Heading>
      <p>
        ルーター全台が同じLSDBを持つ範囲を<Term>エリア</Term>と呼びます。ネットワークが大きくなるとLSDBも巨大になり、SPF計算の負荷やLSAの再送信の範囲が広がって不安定になりがちです。OSPFは、このネットワークをいくつかのエリアに分割し、変更の影響を1つのエリア内に閉じ込めることで規模を大きくできるようにしています。
      </p>

      <DiagramFrame
        slug="network-ospf-areas"
        aspect="760 / 300"
        caption="OSPFのエリア設計。エリア1とエリア2は、それぞれABR(エリア境界ルーター)を経由してエリア0(バックボーンエリア)につながる。エリア同士が直接つながることはなく、必ずエリア0を経由する。経路情報はABRを通過する際に要約される。"
      />

      <p>
        すべてのエリアは<Term>エリア0(バックボーンエリア)</Term>に直接つながっている必要があり、エリア同士が直接つながることは許されません。エリアの境界に立つルーターを<Term>ABR(Area Border Router)</Term>と呼び、ここで経路情報が要約(集約)されて他のエリアに伝わります。
      </p>

      <Analogy label="💡 たとえるなら">
        エリア設計は、大きな会社の組織図に似ています。全社員が全員の詳細な業務内容を把握する必要はなく、各部署(エリア)の中では詳しく、他部署に対しては「営業部はこれだけの仕事をしている」という要約(ABRでの集約)だけ伝わればよい、という考え方です。
      </Analogy>

      <Heading num="03">基本設定 ― OSPFプロセスを起動してエリアに参加させる</Heading>
      <p>
        OSPFの設定は、大きく「OSPFプロセスを起動する」「どのインタフェースをどのエリアに参加させるか指定する」の2段階です。
      </p>

      <pre>
        <code>{`Router(config)# router ospf 1
Router(config-router)# network 192.168.1.0 0.0.0.255 area 0
Router(config-router)# network 192.168.2.0 0.0.0.255 area 0
Router(config-router)# router-id 1.1.1.1`}</code>
      </pre>

      <p>
        <code>router ospf 1</code>の<Term>1</Term>は<Term>プロセスID</Term>で、同じルーター内でOSPFの設定インスタンスを区別するためのローカルな番号です(他のルーターと一致させる必要はありません)。<code>network</code>コマンドは「このアドレス範囲に含まれるインタフェースを、指定したエリアに参加させる」という意味で、宛先ネットワークではなく<Term>自分のインタフェースのアドレス</Term>を指定する点に注意します。
      </p>

      <h3>ワイルドカードマスク ― サブネットマスクの逆</h3>
      <p>
        <code>network</code>コマンドの2つ目の引数は、サブネットマスクではなく<Term>ワイルドカードマスク</Term>です。「IPv4アドレッシングの基礎」で見たサブネットマスクとは、1と0の意味が逆になります。
      </p>

      <DiagramFrame
        slug="network-ospf-wildcard-mask"
        aspect="760 / 260"
        caption="ワイルドカードマスク。サブネットマスク255.255.255.0の1と0をひっくり返した0.0.0.255がワイルドカードマスクになる。0のオクテットは一致必須(ネットワーク部)、255のオクテットは任意(ここは何でもよい)を意味する。"
      />

      <h3>ルーターID ― OSPFプロセスの身元</h3>
      <p>
        <Term>ルーターID</Term>は、OSPFのネットワーク内でそのルーターを一意に識別する32ビットの値です。明示的に<code>router-id</code>で設定していなければ、次の優先順位で自動的に決まります。
      </p>
      <ol>
        <li>
          <code>router-id</code>コマンドで明示的に設定された値
        </li>
        <li>ループバックインタフェースの中で最も大きいIPアドレス</li>
        <li>物理インタフェースの中で最も大きいIPアドレス</li>
      </ol>
      <p>
        ループバックインタフェースは物理リンクの状態に左右されず常にupなので、ルーターIDを安定させる目的で意図的に明示設定することがよくあります。
      </p>

      <Heading num="04">状態の確認 ― ネイバー・ルート</Heading>
      <p>設定した後は、実際にネイバーが確立しルートが学習できているかを確認コマンドで確かめます。</p>

      <h3>show ip ospf neighbor ― ネイバーの状態</h3>
      <pre>
        <code>{`Router# show ip ospf neighbor

Neighbor ID     Pri   State           Dead Time   Address         Interface
2.2.2.2         1     FULL/BDR        00:00:38    192.168.1.2     GigabitEthernet0/0
3.3.3.3         1     FULL/DR         00:00:35    192.168.1.3     GigabitEthernet0/0`}</code>
      </pre>
      <p>
        <Term>State</Term>列が<code>FULL</code>になっていれば、そのネイバーとのLSDB同期が完了しています。<code>/BDR</code>・<code>/DR</code>はそのセグメントでの役割を表します。
      </p>

      <h3>show ip route ospf ― OSPFが学習したルート</h3>
      <pre>
        <code>{`Router# show ip route ospf

O    192.168.2.0/24 [110/2] via 192.168.1.2, 00:12:41, GigabitEthernet0/0
O    192.168.3.0/24 [110/3] via 192.168.1.2, 00:12:41, GigabitEthernet0/0`}</code>
      </pre>
      <p>
        先頭の<code>O</code>はOSPFで学習したルートであることを示します。<code>[110/2]</code>の110は「ルータの機能とルーティング」で見たAD、2はOSPFのコスト(メトリック)です。
      </p>

      <Heading num="05">トラブルシューティング ― FULLにならない原因を絞り込む</Heading>
      <p>
        <code>show ip ospf neighbor</code>のStateが<code>FULL</code>にならないとき、原因は決まったパターンに絞り込めます。まず<code>show ip ospf neighbor</code>を実行し、ネイバーがそもそも表示されるかを確認します。
      </p>
      <ol>
        <li>
          ネイバーが<Term>1件も表示されない</Term> → <code>show ip interface brief</code>で物理層(up/up)を確認し、そもそもHelloパケットが届いているかを疑う
        </li>
        <li>
          ネイバーは表示されるが<Term>FULL以外の状態で止まっている</Term> → その状態が何を意味するかから原因を絞り込む
        </li>
      </ol>

      <DiagramFrame
        slug="network-ospf-neighbor-states"
        aspect="1010 / 320"
        caption="OSPFネイバーステートマシン。Down、Init、2-Way、ExStart、Exchange、Loading、Fullの順に状態が進む。ExStartとExchangeの間でMTU不一致によりDBD交換に失敗して詰まることが多い。"
      />

      <p>
        なお、イーサネットのようなマルチアクセス網では、DR/BDRのどちらでもないルーター同士は<Term>2-Wayで止まったままが正常</Term>です(DR/BDR以外はお互いに詳しい情報を交換する必要がありません)。2-Wayで止まっていること自体がすぐに障害とは限らない点に注意します。
      </p>

      <table>
        <tbody>
          <tr>
            <th>原因</th>
            <th>症状・確認コマンド</th>
          </tr>
          <tr>
            <td className="hl">エリアIDの不一致</td>
            <td>ネイバーが表示されない。双方の<code>show ip ospf interface</code>のAreaを比較する</td>
          </tr>
          <tr>
            <td className="hl">Hello/Deadタイマーの不一致</td>
            <td>ネイバーが表示されない。同コマンドのTimer intervalsを比較する</td>
          </tr>
          <tr>
            <td className="hl">サブネットマスクの不一致</td>
            <td>同じセグメントと認識されずネイバーが確立しない</td>
          </tr>
          <tr>
            <td className="hl">認証設定の不一致</td>
            <td>ネイバーが表示されない、または一定時間で切れる</td>
          </tr>
          <tr>
            <td className="hl">MTUの不一致</td>
            <td>ExStart/Exchangeで詰まる(DBDが正しく交換できない)</td>
          </tr>
        </tbody>
      </table>

      <p>エリアIDの不一致を例に、実際の確認コマンドの出力を見比べてみます。</p>

      <pre>
        <code>{`R1# show ip ospf interface GigabitEthernet0/0
GigabitEthernet0/0 is up, line protocol is up
  Internet Address 192.168.1.1/24, Area 0
  Process ID 1, Router ID 1.1.1.1, Network Type BROADCAST, Cost: 1
  Timer intervals configured, Hello 10, Dead 40`}</code>
      </pre>
      <pre>
        <code>{`R2# show ip ospf interface GigabitEthernet0/0
GigabitEthernet0/0 is up, line protocol is up
  Internet Address 192.168.1.2/24, Area 1
  Process ID 1, Router ID 2.2.2.2, Network Type BROADCAST, Cost: 1
  Timer intervals configured, Hello 10, Dead 40`}</code>
      </pre>
      <p>
        R1は<code>Area 0</code>、R2は<code>Area 1</code>と、同じセグメントに接続しているのにエリアIDが食い違っています。このように、ネイバーが確立しない・特定の状態で止まる場合は、両側の<code>show ip ospf interface</code>を並べて比較するのが基本の切り分け方です。
      </p>

      <Analogy label="💡 たとえるなら">
        エリアIDやタイマーの不一致は、無線のチャンネルが合っていないトランシーバーのようなものです。電源(物理層)は入っていて電波(Hello)も出ているのに、周波数(設定値)が合っていないので、お互いの声(LSA)が正しく届きません。
      </Analogy>

      <Heading num="まとめ">押さえておきたい4点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>Hello→LSA→SPFの3段階</h4>
          <p>隣接確立、LSDB構築、そして各自のSPF計算という順に経路が出来上がります。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>DR/BDRとエリアで規模を分割</h4>
          <p>交換の集約(DR/BDR)と範囲の分割(エリア)で、大規模ネットワークにも対応します。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>networkはワイルドカードマスクで指定</h4>
          <p>自分のインタフェースをどのエリアに参加させるかを、サブネットマスクの逆で指定します。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>止まった状態が診断の手がかり</h4>
          <p>2-Wayは非DR/BDR同士なら正常。ExStart/Exchangeで詰まればMTU不一致を疑います。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/network/ospf" />
    </DocsPage>
  );
}
