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
  title: "ストレージの仕組み",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ</Eyebrow>
        <h1>ストレージの仕組み ― NAS・SAN・RAID</h1>
        <Lead>
          会社の共有フォルダはどこにあるのでしょうか。多くの場合、1台のPCの中ではなく、ネットワークの先にある専用の保存装置に置かれています。ここでは、複数人・複数サーバーでデータを保存・共有するための仕組みと、そのデータを壊れにくくする仕組みを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">NASとSAN ― ファイル単位かブロック単位か</Heading>
      <p>ネットワーク越しに使う共有ストレージには、大きく2つの種類があります。どちらも「複数のマシンから同じ保存領域にアクセスできる」点は同じですが、<strong>アクセスの単位</strong>が根本的に異なります。</p>

      <h3>NAS(Network Attached Storage) ― ファイル単位で共有する</h3>
      <p><Term>NAS</Term>は、ネットワークに直接つながる「ファイルサーバー専用の箱」です。PCからは「共有フォルダ」として見え、ファイルを開く・保存するといった<strong>ファイル単位</strong>の操作でアクセスします。NAS自身がファイルシステム(フォルダ構造の管理)を持っており、複数のクライアントが同時に同じフォルダへアクセスできるのが特徴です。アクセスには、Linux系でよく使われる<Term>NFS(Network File System)</Term>や、Windows系でよく使われる<Term>SMB(Server Message Block)</Term>といった、ファイル共有専用のプロトコルが使われます。</p>

      <h3>SAN(Storage Area Network) ― ブロック単位で共有する</h3>
      <p><Term>SAN</Term>は、サーバーとストレージ装置を専用の高速ネットワークでつなぎ、ストレージを<strong>ブロック単位</strong>(ディスクの中の固定サイズの区画)でサーバーに提供する仕組みです。サーバー側からは、あたかも自分に直結したハードディスクのように見え、サーバー自身がその上にファイルシステムを構築します。代表的な接続方式が<Term>iSCSI</Term>で、通常のIPネットワークを使ってブロック単位のアクセス(SCSIコマンド)をやり取りします。</p>

      <Diagram caption="NASはファイル単位、SANはブロック単位でアクセスする ― ファイルシステムをどちらが持つかが違う">
        <svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
          <text x={160} y={20} fill="#9a9a9a" fontSize="12" textAnchor="middle">NAS</text>
          <rect x={60} y={40} width={200} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={160} y={62} fill="#f2f2f2" fontSize="12" textAnchor="middle">クライアントPC</text>
          <text x={160} y={78} fill="#9a9a9a" fontSize="10" textAnchor="middle">「ファイルを開く」で要求</text>
          <line x1={160} y1={90} x2={160} y2={130} stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={200} y={115} fill="#9a9a9a" fontSize="10" textAnchor="middle">NFS/SMB</text>
          <rect x={60} y={130} width={200} height={60} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={160} y={155} fill="#f2f2f2" fontSize="12" textAnchor="middle">NAS</text>
          <text x={160} y={172} fill="#9a9a9a" fontSize="10" textAnchor="middle">ファイルシステムを保持</text>

          <line x1={320} y1={20} x2={320} y2={200} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />

          <text x={480} y={20} fill="#9a9a9a" fontSize="12" textAnchor="middle">SAN</text>
          <rect x={380} y={40} width={200} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={480} y={62} fill="#f2f2f2" fontSize="12" textAnchor="middle">サーバー</text>
          <text x={480} y={78} fill="#9a9a9a" fontSize="10" textAnchor="middle">自身でファイルシステムを構築</text>
          <line x1={480} y1={90} x2={480} y2={130} stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={520} y={115} fill="#9a9a9a" fontSize="10" textAnchor="middle">iSCSI</text>
          <rect x={380} y={130} width={200} height={60} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={480} y={155} fill="#f2f2f2" fontSize="12" textAnchor="middle">ストレージ装置</text>
          <text x={480} y={172} fill="#9a9a9a" fontSize="10" textAnchor="middle">生のブロックだけを提供</text>
        </svg>
      </Diagram>

      <table>
        <thead>
          <tr><th></th><th>NAS</th><th>SAN</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">アクセス単位</td><td>ファイル単位</td><td>ブロック単位</td></tr>
          <tr><td className="hl">ファイルシステム</td><td>NAS側が持つ</td><td>サーバー側が持つ</td></tr>
          <tr><td className="hl">主なプロトコル</td><td>NFS(Linux系)、SMB(Windows系)</td><td>iSCSI、Fibre Channel</td></tr>
          <tr><td className="hl">導入のしやすさ</td><td>既存のLANにつなぐだけで比較的手軽</td><td>専用のネットワーク設計が必要になりやすい</td></tr>
          <tr><td className="hl">得意な用途</td><td>複数人でのファイル共有</td><td>DBサーバーなど高速・低遅延が必要な用途</td></tr>
        </tbody>
      </table>

      <Aside label="補足">
        NFSはLinux/Unix系でファイル共有プロトコルとして標準的に使われ、SMBはWindowsの「ネットワークドライブ」やファイル共有の標準プロトコルです。異なるOS間でNASを共有する場合、NASの側が両方のプロトコルに対応していることも珍しくありません。
      </Aside>

      <Heading num="02">RAID ― 複数のディスクをまとめて冗長化する</Heading>
      <p>NASやSANの中身は、結局のところ複数台のディスク(HDD/SSD)です。ディスクは消耗品であり、いつか必ず故障します。<Term>RAID(Redundant Array of Independent Disks)</Term>は、複数のディスクを組み合わせて1台の論理的なディスクのように扱い、一部が故障してもデータを失わない、あるいは性能を高めるための構成です。</p>

      <table>
        <thead>
          <tr><th>RAIDレベル</th><th>仕組み</th><th>冗長性</th><th>最低台数</th><th>実効容量(N台構成時)</th><th>読み書きへの影響</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">RAID 0</td><td>データを複数ディスクに分散して書き込む(ストライピング)</td><td>なし。1台故障で全データ喪失</td><td>2台</td><td>ディスク容量の合計(100%)</td><td>読み書きとも高速化(冗長化なし)</td></tr>
          <tr><td className="hl">RAID 1</td><td>同じデータを複数ディスクに複製する(ミラーリング)</td><td>高い。構成台数−1台の故障まで許容</td><td>2台</td><td>1台分(容量は半分以下になる)</td><td>読み込みは高速化、書き込みは変わらず</td></tr>
          <tr><td className="hl">RAID 5</td><td>データと誤り訂正用の<Term>パリティ</Term>を分散配置</td><td>1台の故障まで耐えられる</td><td>3台</td><td>(N−1)台分</td><td>読み込み高速、書き込みはパリティ計算分やや低下</td></tr>
          <tr><td className="hl">RAID 6</td><td>パリティを2重に分散配置</td><td>2台の故障まで耐えられる</td><td>4台</td><td>(N−2)台分</td><td>RAID 5よりさらに書き込みが低下</td></tr>
          <tr><td className="hl">RAID 10(1+0)</td><td>ミラーリングしたペアをさらにストライピング</td><td>高い。ペアごとに1台までなら複数台故障も許容</td><td>4台</td><td>N台の半分</td><td>読み書きとも高速。冗長性と速度を両立</td></tr>
        </tbody>
      </table>

      <p>ざっくりした指針としては、<strong>RAID 0</strong>は冗長性を捨てて速度と容量を最大化したいとき、<strong>RAID 1</strong>は台数が少ないシンプルな冗長化、<strong>RAID 5/6</strong>は容量効率と冗長性のバランスを取りたいとき、<strong>RAID 10</strong>は容量効率よりも速度と冗長性を優先したいときに選ばれます。</p>

      <Analogy label="💡 たとえるなら">
        <strong>RAID 0</strong>は2人で1冊のノートを分担して同時に書き進める方式。速いですが、片方が原稿をなくすと全体が読めなくなります。<strong>RAID 1</strong>は同じノートを2冊、まったく同じ内容で作る方式。片方をなくしても安心ですが、紙は2倍必要です。<strong>RAID 5/6</strong>は、複数人でノートを分担しつつ、「誰かが1ページなくしても復元できるメモ(パリティ)」を追加でつけておく方式です。
      </Analogy>

      <Aside label="関連ページ">
        ここで扱うRAIDは、社内のNAS/SANなど<strong>インフラ全体の冗長化</strong>という情シス視点の整理です。データベース1台の物理設計としてのRAID活用については「<Link href="/database/physical">物理設計と運用</Link>」も参照してください。
      </Aside>

      <Heading num="03">オブジェクトストレージ ― ファイル/ブロックとの違い</Heading>
      <p>NASのファイル単位、SANのブロック単位に対して、近年のクラウドで主流になっているのが<Term>オブジェクトストレージ</Term>です。フォルダの階層構造を持たず、すべてのデータを「オブジェクト」という単位でフラットに保存し、それぞれに一意の<Term>ID(キー)</Term>と、作成日時やタグといった<Term>メタデータ</Term>を付けて管理します。代表例はAmazon S3のようなサービスです。</p>
      <p>ファイルシステムのようなフォルダ階層の管理が不要な分、事実上無制限に近い規模までスケールしやすく、多くはHTTP経由のAPIでアクセスします。反面、ファイルの一部分だけを書き換えるような細かい更新には向いておらず、オブジェクト単位で丸ごと読み書きするのが基本になります。画像・動画・バックアップファイルのような「一度書いたらあまり書き換えない」大量のデータの保存に向いています。</p>

      <table>
        <thead>
          <tr><th></th><th>ブロックストレージ(SAN)</th><th>ファイルストレージ(NAS)</th><th>オブジェクトストレージ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">管理単位</td><td>固定サイズのブロック</td><td>フォルダ階層とファイル</td><td>フラットなオブジェクト(ID+メタデータ)</td></tr>
          <tr><td className="hl">アクセス方法</td><td>OSからディスクのように</td><td>NFS/SMBなど専用プロトコル</td><td>主にHTTP API</td></tr>
          <tr><td className="hl">得意な用途</td><td>DBなど低遅延が必要な用途</td><td>複数人でのファイル共有</td><td>大量データの長期保存・配信</td></tr>
        </tbody>
      </table>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>NASはファイル単位、SANはブロック単位</h4>
          <p>ファイルシステムをストレージ側が持つか、サーバー側が持つかという違いが、そのままアクセス方法の違いになります。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>RAIDは冗長性・容量・速度のトレードオフ</h4>
          <p>RAID 0/1/5/6/10はそれぞれ耐障害性と実効容量、読み書き速度のバランスが異なり、用途に応じて選びます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>オブジェクトストレージは第三の形</h4>
          <p>フォルダ階層を持たないフラットな構造で、大量データをスケールさせやすいのが特徴です。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/network/internet/server" tag="インターネット">サーバーの全体像</RelatedLink>
                    <RelatedLink href="/infra/virtualization" tag="インフラ">仮想化の仕組み</RelatedLink>
                    <RelatedLink href="/database/physical" tag="データベース">物理設計と運用</RelatedLink>
                    <RelatedLink href="/ops/data" tag="サービス運営">データ管理 ― バックアップ・リストア戦略</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
