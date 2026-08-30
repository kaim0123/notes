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
  title: "物理設計と運用",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>データベース</Eyebrow>
        <h1>物理設計と運用 ― インデックス・冗長化・バックアップ</h1>
        <Lead>
          「<Link href="/database/design">ER図と正規化</Link>」で固めたテーブル定義(概念スキーマ)を、実際にDBMS上でどう実体化し、ディスク障害やサーバー障害からどう守るか。「<Link href="/database/model">関係モデルと3層スキーマ</Link>」で触れた<Term>内部スキーマ</Term>の中身 ― インデックス・ストレージ冗長化・レプリケーション・バックアップ・リカバリを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">論理設計から物理設計へ ― テーブル定義とインデックス定義</Heading>
      <p>概念スキーマで決めた「顧客」「注文」といったテーブルは、<code>CREATE TABLE</code>文でDBMS上に実体化されます。ここまでは前のページの内容そのままですが、物理設計ではさらに<Term>インデックス</Term>を検討します。</p>
      <p>インデックスは、本の巻末索引のように「この値を持つ行はどこにあるか」をあらかじめ整列させておくデータ構造(多くは<Term>B-Tree</Term>)です。インデックスがない状態で特定の行を探すと、テーブルを先頭から1行ずつ確認する<Term>フルスキャン</Term>になりますが、検索対象の列にインデックスがあれば、その列の値から該当行の位置を素早く辿れます。主キーには自動でインデックスが張られますが、それ以外でも頻繁に検索・結合(JOIN)条件に使う列には、明示的にインデックスを作成します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`-- ordersテーブルのcustomer_id列で頻繁に検索・JOINするなら
CREATE INDEX idx_orders_customer_id ON orders(customer_id);`}</code>
      </pre>
      <p>ただしインデックスは万能ではありません。行を追加・更新・削除するたびに、テーブル本体だけでなくインデックス構造もあわせて更新する必要があるため、インデックスを張るほど<strong>書き込みは遅くなり</strong>、インデックス自体の保存領域も増えます。どの列にインデックスを張るべきかという実践的な指針は、この続きとして扱う予定です。</p>

      <Heading num="02">ストレージの冗長構成 ― RAID</Heading>
      <p>DBが動く1台のサーバーの中でも、データを保存するディスクはいつか物理的に故障します。<Term>RAID(Redundant Array of Independent Disks)</Term>は、複数のディスクを組み合わせて、1台が故障してもデータを失わないようにする仕組みです。</p>
      <table>
        <thead>
          <tr><th>RAIDレベル</th><th>仕組み</th><th>冗長性</th><th>最低ディスク数</th><th>主な用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">RAID 0</td><td>複数ディスクにデータを分散して書き込む(ストライピング)</td><td>なし(1台故障で全データ喪失)</td><td>2台</td><td>速度優先。冗長性が要らない一時データ</td></tr>
          <tr><td className="hl">RAID 1</td><td>同じデータを複数ディスクに複製する(ミラーリング)</td><td>高い(1台故障しても継続可)</td><td>2台</td><td>シンプルな冗長化</td></tr>
          <tr><td className="hl">RAID 5</td><td>データと誤り訂正用の<Term>パリティ</Term>を分散配置</td><td>1台の故障まで耐えられる</td><td>3台</td><td>容量効率と冗長性のバランス</td></tr>
          <tr><td className="hl">RAID 6</td><td>パリティを2重に分散配置</td><td>2台の故障まで耐えられる</td><td>4台</td><td>より高い耐障害性が必要な場合</td></tr>
          <tr><td className="hl">RAID 10(1+0)</td><td>ミラーリングしたペアをさらにストライピング</td><td>高い(構成次第で複数台の故障に耐える)</td><td>4台</td><td>高い読み書き性能が要るDB用途で定番</td></tr>
        </tbody>
      </table>
      <p>RAIDが守ってくれるのはあくまで「1台のサーバー内でのディスク故障」までです。サーバーそのものが停止したり、<code>DELETE</code>文の書き間違いのような論理的なミスでデータが消えたりした場合は、RAIDだけでは対応できません。この2つの課題に応えるのが、次節以降のデータベース単位の冗長化とバックアップです。</p>

      <Heading num="03">データベース単位の冗長構成 ― リードレプリカとレプリケーション</Heading>
      <p>サーバー単位の障害に備え、DBのデータをまるごと別のサーバーへ複製しておく仕組みが<Term>レプリケーション</Term>です。書き込みを受け付ける<Term>プライマリ(マスター)</Term>と、そこからデータを複製する<Term>レプリカ</Term>という役割に分かれます。</p>
      <Diagram caption="書き込みはプライマリに集約し、読み取りは複数のリードレプリカへ分散させる">
        <svg viewBox="0 0 620 200" xmlns="http://www.w3.org/2000/svg">
          <rect x={245} y={20} width={130} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={310} y={50} fill="#f2f2f2" fontSize="11" textAnchor="middle">プライマリ(書き込み)</text>

          <rect x={50} y={130} width={140} height={50} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={120} y={160} fill="#f2f2f2" fontSize="10" textAnchor="middle">リードレプリカ1</text>
          <rect x={240} y={130} width={140} height={50} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={310} y={160} fill="#f2f2f2" fontSize="10" textAnchor="middle">リードレプリカ2</text>
          <rect x={430} y={130} width={140} height={50} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={500} y={160} fill="#f2f2f2" fontSize="10" textAnchor="middle">リードレプリカ3</text>

          <line x1={290} y1={70} x2={120} y2={128} stroke="#5f5f5f" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1={310} y1={70} x2={310} y2={128} stroke="#5f5f5f" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1={330} y1={70} x2={500} y2={128} stroke="#5f5f5f" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x={310} y={100} fill="#9a9a9a" fontSize="10" textAnchor="middle">レプリケーション</text>
        </svg>
      </Diagram>
      <p><Term>リードレプリカ</Term>は、参照(SELECT)クエリをレプリカ側に振り分けることで、プライマリ1台に読み取り負荷が集中するのを防ぐ<Term>負荷分散</Term>の手段です。あわせて、プライマリが故障した際にレプリカへ昇格させる<Term>フェイルオーバー</Term>先としても使えます。</p>
      <table>
        <thead>
          <tr><th>レプリケーション方式</th><th>仕組み</th><th>トレードオフ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">同期レプリケーション</td><td>レプリカへの反映が完了するまでプライマリが書き込み完了(コミット)を待つ</td><td>データ損失のリスクは低いが、書き込みが遅くなる</td></tr>
          <tr><td className="hl">非同期レプリケーション</td><td>プライマリは反映を待たずに書き込みを完了し、レプリカは遅れて追従する</td><td>書き込みは速いが、追従の遅れ(<Term>レプリケーション遅延</Term>)の間にプライマリが故障すると、その差分のデータを失う可能性がある</td></tr>
        </tbody>
      </table>

      <Heading num="04">バックアップ設計 ― 完全・差分・増分</Heading>
      <p>レプリケーションは「今のデータをそのまま複製する」仕組みのため、誤ってデータを削除・破壊してしまった操作そのものも複製されてしまいます。過去のある時点の状態に戻せるようにしておくのが<Term>バックアップ</Term>です。バックアップには取得範囲の異なる3つの方式があります。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>取得する範囲</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">完全バックアップ</td><td>その時点のデータ全体をまるごと取得する</td></tr>
          <tr><td className="hl">差分バックアップ</td><td>直前の<strong>完全</strong>バックアップからの変更分だけを取得する</td></tr>
          <tr><td className="hl">増分バックアップ</td><td>直前の(方式を問わない)バックアップからの変更分だけを取得する</td></tr>
        </tbody>
      </table>
      <p>日曜に完全バックアップを取り、月〜土は毎日追加のバックアップを取る運用を例に、差分方式と増分方式で「木曜が壊れたときに何を使ってリストアするか」を比べてみます。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>月</th><th>火</th><th>水</th><th>木(復旧対象)</th><th>木曜のリストアに必要なファイル</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">差分</td><td>日曜からの差分</td><td>日曜からの差分</td><td>日曜からの差分</td><td>―</td><td>日曜の完全 + 水曜の差分(2ファイル)</td></tr>
          <tr><td className="hl">増分</td><td>日曜からの増分</td><td>月曜からの増分</td><td>火曜からの増分</td><td>―</td><td>日曜の完全 + 月・火・水の増分(4ファイル、順番に適用)</td></tr>
        </tbody>
      </table>
      <p>差分バックアップは日を追うごとに1回分のサイズが大きくなっていきますが、リストア時に必要なファイルは常に「完全 + 最新の差分」の2つだけです。増分バックアップは1回分のサイズが小さく取得も速い代わりに、リストア時は完全バックアップの後、すべての増分を発生順に適用する必要があり、間の1つでも欠けたり壊れたりすると復元できません。</p>

      <Heading num="05">リカバリ設計 ― リカバリとリストア、ロールフォワード</Heading>
      <p><Term>リストア</Term>と<Term>リカバリ</Term>は混同されがちですが、指す範囲が異なります。リストアは「バックアップファイルをDBに読み込み直す」という技術的な1操作を指し、リカバリは、障害発生からサービスが矛盾のない状態で復旧するまでの一連のプロセス全体を指します。リストアは、リカバリという大きなプロセスの中の1ステップです。</p>
      <p>バックアップを取得した時点から障害発生までの間にも、当然データは更新され続けています。この「バックアップ以降の差分」を可能な限り取り戻すのが<Term>ロールフォワード</Term>です。多くのDBMSは、確定した更新をすべて<Term>トランザクションログ(WALやbinlogなど)</Term>として時系列に記録しており、バックアップをリストアした後にこのログを再生することで、障害の直前に近い時点までデータを復元できます。</p>
      <Diagram caption="完全バックアップをリストアした後、そこから障害発生時刻までのトランザクションログを再生して直前の状態まで復旧する">
        <svg viewBox="0 0 620 120" xmlns="http://www.w3.org/2000/svg">
          <line x1={40} y1={70} x2={580} y2={70} stroke="#5f5f5f" strokeWidth="1.5" />
          <circle cx={100} cy={70} r={6} fill="#39ff6a" />
          <text x={100} y={50} fill="#f2f2f2" fontSize="11" textAnchor="middle">① 完全バックアップ</text>
          <text x={100} y={95} fill="#9a9a9a" fontSize="10" textAnchor="middle">(日曜 2:00)</text>
          <circle cx={520} cy={70} r={6} fill="#ff8080" />
          <text x={520} y={50} fill="#f2f2f2" fontSize="11" textAnchor="middle">③ 障害発生</text>
          <text x={520} y={95} fill="#9a9a9a" fontSize="10" textAnchor="middle">(水曜 14:32)</text>
          <text x={310} y={112} fill="#9a9a9a" fontSize="11" textAnchor="middle">② トランザクションログを再生(ロールフォワード)し、障害直前まで復旧</text>
        </svg>
      </Diagram>
      <p>特に、ログを使って「任意の指定時刻の状態」まで復元することを<Term>ポイントインタイムリカバリ(PITR)</Term>と呼びます。どこまでのデータ損失を許容するか(<Term>RPO: 目標復旧時点</Term>)、復旧にどれだけの時間をかけられるか(<Term>RTO: 目標復旧時間</Term>)という2つの目標値が、バックアップの頻度やロールフォワードの要否を決める基準になります。</p>
      <Aside label="補足">
        RPOが「ゼロに近いほど良い」ほど、バックアップの間隔を狭めるか、ログを使ったロールフォワードが必須になります。RTOが短いほど、リストアにかかる時間(完全バックアップの容量や、増分バックアップの適用回数)を短縮する設計が必要になります。
      </Aside>

      <Analogy label="💡 たとえるなら">
        完全バックアップは「ある日に撮った家全体の写真」、差分・増分バックアップは「その後の変化を記録したメモ」です。ロールフォワードは、写真を印刷した(リストアした)あとに、事件が起きる直前までの日記(トランザクションログ)を読み返して、部屋の状態を可能な限り事件直前に近づける作業にあたります。
      </Analogy>

      <Heading num="まとめ">検索を速くする工夫と、失わないための工夫</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>インデックスは検索を速くするが書き込みは重くなる</h4><p>B-Treeなどの構造で検索を高速化する代わりに、更新のたびに維持コストがかかります。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>RAIDはディスク故障、DB冗長化はサーバー故障への備え</h4><p>RAIDは1台のマシン内、レプリケーションはサーバーをまたいだ冗長化です。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>バックアップは容量とリストア速度のトレードオフ</h4><p>差分は復元がシンプル、増分は取得が軽量という違いがあります。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>リカバリ=リストア+ロールフォワード</h4><p>バックアップを戻すだけでなく、トランザクションログの再生で直近の損失を最小化します。</p></Card>
      </CardGrid>
      <p>ここまでで、業務要件からテーブルを導く概念設計(<Link href="/database/design">ER図と正規化</Link>)から、それを実体化し障害から守る物理設計・運用まで、データベースの土台を一通り見てきました。どのインデックスをどう設計するか、どのクエリが遅いのかを見極めるパフォーマンスの話は、この続きとして別途扱う予定です。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/database/model" tag="データベース">関係モデルと3層スキーマ</RelatedLink>
                    <RelatedLink href="/database/design" tag="データベース">ER図と正規化</RelatedLink>
                    <RelatedLink href="/database/history" tag="データベース">データベースの歴史</RelatedLink>
                    <RelatedLink href="/ops/data" tag="サービス運営">データ管理</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
