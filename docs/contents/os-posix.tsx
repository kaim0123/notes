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
  Diagram,
  Timeline,
  TimelineItem,
  TimelineLabel,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "UNIX・BSD・Linuxの違い",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>OS</Eyebrow>
        <h1>UNIX・BSD・Linuxの違い ― POSIXという共通言語</h1>
        <Lead>
          macOSもLinuxもコマンドの打ち心地はよく似ています。しかしこの3つ ―
          UNIX・BSD・Linux ― は、家系図で言えば「親戚だが別の家族」。起源も、法的な立場も、中身の実装も違います。それでも「似たように動く」のは、<Term>POSIX</Term>という共通ルールが橋渡しをしているからです。
        </Lead>
      </Hero>

      <p><Link href="/os/unix">UNIXの歴史と哲学</Link>で見たように、現代の主要OSの多くはUNIXの系譜に属します。ただし「UNIX系」とひとくくりにされるものの中身は一枚岩ではありません。ここでは、そっくりに見える3つのファミリーが「どこが同じで、どこが違うのか」を、共通基盤であるPOSIXを軸に整理します。</p>

      <Heading num="01">3つのファミリー ― 親戚だが別の家族</Heading>
      <p>まず全体像です。UNIX・BSD・Linuxは、次のようにルーツと立場が異なります。厳密には、Linuxを「UNIX」と呼ぶのは正確ではなく、<Term>UNIX系OS(UNIX-like OS)</Term>と呼ぶのが正しい表現です。商標としてのUNIXではないためです。</p>
      <Diagram caption="UNIXを源流に、商用UNIX・BSD・Linuxが分かれる。POSIXは全員が立つ共通の土台">
        <svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
          <rect x={250} y={16} width={140} height={40} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={40} fill="#f2f2f2" fontSize="13" textAnchor="middle">UNIX (1969, ベル研)</text>

          <line x1={320} y1={56} x2={120} y2={100} stroke="#5f5f5f" strokeWidth="1" />
          <line x1={320} y1={56} x2={320} y2={100} stroke="#5f5f5f" strokeWidth="1" />
          <line x1={320} y1={56} x2={520} y2={100} stroke="#5f5f5f" strokeWidth="1" />

          <rect x={40} y={100} width={160} height={64} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={120} y={126} fill="#f2f2f2" fontSize="12" textAnchor="middle">商用UNIX(認定)</text>
          <text x={120} y={146} fill="#9a9a9a" fontSize="11" textAnchor="middle">macOS/Solaris/AIX</text>

          <rect x={240} y={100} width={160} height={64} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={320} y={126} fill="#f2f2f2" fontSize="12" textAnchor="middle">BSD</text>
          <text x={320} y={146} fill="#9a9a9a" fontSize="11" textAnchor="middle">FreeBSD/OpenBSD</text>

          <rect x={440} y={100} width={160} height={64} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={520} y={126} fill="#f2f2f2" fontSize="12" textAnchor="middle">Linux(UNIX系)</text>
          <text x={520} y={146} fill="#9a9a9a" fontSize="11" textAnchor="middle">Ubuntu/Fedora…</text>

          <rect x={40} y={196} width={560} height={44} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={223} fill="#f2f2f2" fontSize="13" textAnchor="middle">POSIX ― 全員が従う「最低限の共通ルール」</text>
          <line x1={120} y1={164} x2={120} y2={196} stroke="#5f5f5f" strokeWidth="1" />
          <line x1={320} y1={164} x2={320} y2={196} stroke="#5f5f5f" strokeWidth="1" />
          <line x1={520} y1={164} x2={520} y2={196} stroke="#5f5f5f" strokeWidth="1" />
        </svg>
      </Diagram>

      <Heading num="02">歴史 ― UNIX誕生と「UNIX戦争」</Heading>
      <Timeline>
        <TimelineItem era="1969">UNIX誕生<br />トンプソンとリッチー</TimelineItem>
        <TimelineItem era="1973">C言語で書き直し<br />移植可能に</TimelineItem>
        <TimelineItem era="1980s">派生が乱立<br />UNIX戦争</TimelineItem>
        <TimelineItem era="1988">POSIX制定<br />IEEE 1003</TimelineItem>
      </Timeline>
      <TimelineLabel>互換性の崩壊 ― それが標準化を生みました。</TimelineLabel>
      <p><strong>1969年</strong>、AT&Tベル研究所の<Term>ケン・トンプソン</Term>と<Term>デニス・リッチー</Term>がUNIXを開発します。<strong>1973年</strong>にはC言語で書き直され、さまざまなコンピュータへ移植可能になりました ― これが極めて重要な転換点でした。</p>
      <p>ところが<strong>1980年代</strong>、AT&T版・BSD版・System V・Xenixなど派生が乱立し、「この UNIX では動くのに、あっちでは動かない」という移植性の混乱が起きます。これが<Term>UNIX戦争</Term>です。プログラマーを苦しめたこの混乱を収めるため、<strong>1988年</strong>に<Term>IEEE</Term>(電気電子技術協会)が<strong>POSIX標準</strong>(正式名称 IEEE 1003)を制定しました。POSIXの「X」は、UNIXへの敬意を込めてリチャード・ストールマンが付けたものです。</p>

      <Heading num="03">POSIXとは何か</Heading>
      <p><Term>POSIX</Term>(Portable Operating System Interface)は、「最低限これを実装しろ」という共通ルールを定め、OS間の<strong>基本的な移植性</strong>を確保するための規格です。主な構成は次の2つに分かれます。</p>
      <table>
        <tbody>
          <tr><th>規格</th><th>内容</th><th>例</th></tr>
          <tr><td className="hl">POSIX.1</td><td>システムコールとC言語インターフェイス</td><td><code>fork()</code>、<code>exec()</code>、パイプ、<code>open</code>/<code>read</code>/<code>write</code></td></tr>
          <tr><td className="hl">POSIX.2</td><td>シェルユーティリティ</td><td><code>ls</code>、<code>cat</code>、<code>grep</code>、<code>sed</code>、<code>awk</code>、<code>sh</code></td></tr>
        </tbody>
      </table>
      <p>理論上はPOSIXに従えば同じプログラムがどのOSでも動くはずですが、各OSは<strong>独自拡張</strong>を追加するため、実際には完全互換ではありません。それでも、基本的な移植性はPOSIXのおかげで確保されています。</p>
      <Analogy label="💡 たとえるなら">
        POSIXは、各国語の話者が最低限意思疎通するための「共通語のルールブック」のようなものです。全員がこのルールを守るので大枠は通じますが、地域ごとの方言(独自拡張)までは揃わない ― だから細かいところでは翻訳(書き換え)が必要になります。
      </Analogy>

      <Heading num="04">UNIX ― 商標としての「本物」</Heading>
      <p><Term>UNIX</Term>は商標登録されており、<Term>The Open Group</Term>が管理しています。<Term>Single UNIX Specification</Term>に準拠し、認定試験に合格しないと「UNIX」を名乗ることはできません。現代の認定UNIXの代表例は次のとおりです。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>macOS</h4><p>デスクトップOSに見えるが、中身は認定を受けた正式なUNIX</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Solaris</h4><p>Sun / Oracleの商用UNIX</p></Card>
        <Card><CardNumber>3</CardNumber><h4>AIX</h4><p>IBMの商用UNIX</p></Card>
        <Card><CardNumber>4</CardNumber><h4>HP-UX</h4><p>HPの商用UNIX</p></Card>
      </CardGrid>
      <h3>macOSの裏側</h3>
      <p>macOSの基盤は<Term>Darwin</Term>です。<strong>BSD由来のコード</strong>と<strong>Machカーネル</strong>を組み合わせた正式なUNIXであり、洗練されたGUIの下では認定を受けたUNIXが動いています。</p>

      <Heading num="05">BSD ― UNIXから派生し、独立したファミリー</Heading>
      <p><Term>BSD</Term>(Berkeley Software Distribution)は、1977年頃からカリフォルニア大学バークレー校で開発されました。当初はAT&TのUNIXコードを含んでいましたが、1990年代初頭のAT&Tとの訴訟を経て、問題のあるコードを数千ファイル規模で書き直し、<strong>法的にクリーンなフリーOS</strong>となりました。</p>
      <table>
        <tbody>
          <tr><th>派生</th><th>特徴</th></tr>
          <tr><td className="hl">FreeBSD</td><td>汎用性・パフォーマンス重視。サーバー・デスクトップ向け</td></tr>
          <tr><td className="hl">OpenBSD</td><td>セキュリティ第一。コード監査が厳格。OpenSSH・OpenSMTPDなどを開発</td></tr>
          <tr><td className="hl">NetBSD</td><td>「Of course it runs NetBSD」― 移植性重視。組み込みから大型機まで対応</td></tr>
          <tr><td className="hl">DragonFly BSD</td><td>独自の開発方針を持つ派生</td></tr>
        </tbody>
      </table>
      <p>BSDは、POSIX互換の独自OSとして位置づけられます。</p>

      <Heading num="06">Linux ― カーネルであり、UNIXではない</Heading>
      <table>
        <tbody>
          <tr><th>観点</th><th>内容</th></tr>
          <tr><td className="hl">誕生</td><td>1991年、フィンランドの大学生 リーナス・トーバルズ が趣味で開発</td></tr>
          <tr><td className="hl">正体</td><td>カーネルだけ。OS全体ではない</td></tr>
          <tr><td className="hl">正確な呼び方</td><td><Term>GNU/Linux</Term> ― GNUプロジェクトのGCC・glibc・Bashなどと組み合わせて初めて動くOSになる</td></tr>
          <tr><td className="hl">コードの出自</td><td>UNIXのコードを一切使っていない完全オリジナルのカーネル</td></tr>
          <tr><td className="hl">POSIXとの関係</td><td>ほぼ準拠しているが、公式のPOSIX認定は受けていない(高額な費用と厳格なテストが必要)</td></tr>
        </tbody>
      </table>
      <p>過去に Inspur K-UX がLinux環境でPOSIX認定を取得した例はありますが、一般的なUbuntuやFedoraは認定なしです。実用上はほぼ問題ありませんが、厳密には「UNIX系OS」「UNIX-like OS」と呼ぶのが正確です。GNUという土台については<Link href="/os/gnu">GNUとフリーソフトウェア</Link>で詳しく扱います。</p>

      <Heading num="07">技術的な違い ― POSIXは「最低限」の基準</Heading>
      <p>POSIXはあくまで最低限の実装基準であり、各OSは独自拡張を積極的に追加しています。同じ目的の機能でもAPIが異なるため、移植時には書き換えが必要になります。</p>
      <table>
        <tbody>
          <tr><th>観点</th><th>Linux</th><th>BSD</th></tr>
          <tr><td className="hl">I/O多重化</td><td>epoll(カーネル 2.5.44〜)</td><td>kqueue(FreeBSD 4.1〜)</td></tr>
          <tr><td className="hl">プロセス管理</td><td>cgroups ― グループ化してリソース制限(Dockerで利用)</td><td>jail ― 別の隔離・管理の仕組み</td></tr>
          <tr><td className="hl">ファイルシステム</td><td>ext4・XFS・Btrfs</td><td>UFS・ZFS</td></tr>
          <tr><td className="hl">パッケージ管理</td><td>apt(Debian)/ yum・DNF(RHEL)/ pacman(Arch)とバラバラ</td><td>Portsシステム(ソースからコンパイル)+ pkg</td></tr>
          <tr><td className="hl">デバイスドライバ</td><td>カーネル内蔵が基本。新ハード対応が早い</td><td>品質重視で慎重に取り込む。安定性優先</td></tr>
          <tr><td className="hl">init系</td><td>主流はsystemd(高機能だが複雑。UNIX哲学への批判も)</td><td>伝統的なBSD initやOpenRC</td></tr>
        </tbody>
      </table>
      <p>同じI/O多重化でもepollとkqueueはAPIが異なるため、Nginxなどは両方に対応するコードを持ちます。ファイルシステムの<Term>ZFS</Term>(Sunが Solaris向けに開発。スナップショット・圧縮・重複排除・整合性チェックなどを備える高機能FS)は、CDLライセンスであるためGPLv2のLinuxカーネルには直接組み込めず、別モジュール(ZFS on Linux)として提供されます。BSDはライセンスが緩いため標準統合が可能です。</p>
      <h3>ライセンスがもたらす違い</h3>
      <p>BSDのTCP/IPスタックは高品質で知られ、PlayStation、Nintendo Switch、NetflixのOpen Connectなどに採用されています。<Term>BSDライセンス</Term>は改変しても公開義務がないため、組み込み機器メーカーが好みます。一方の<Term>Linux(GPL)</Term>は改変したらソース公開義務があるため、組み込みではBSDを選ぶ傾向があります。UNIX哲学の面でも、BSDは「小さくシンプルに1つのことをうまくやる」を守る傾向が強く、Linuxは実用優先で多様化しています。</p>

      <Heading num="08">用途別の選び方</Heading>
      <table>
        <tbody>
          <tr><th>用途</th><th>おすすめ</th></tr>
          <tr><td className="hl">デスクトップ・一般サーバー</td><td>Linux(情報が豊富、ハード対応が広い)</td></tr>
          <tr><td className="hl">ネットワーク機器・ファイアウォール</td><td>OpenBSD</td></tr>
          <tr><td className="hl">高性能サーバー・ストレージサーバー</td><td>FreeBSD(安定性が高い)</td></tr>
          <tr><td className="hl">組み込み・古いハードウェア</td><td>NetBSD(対応アーキテクチャ数が多い)</td></tr>
          <tr><td className="hl">企業の基幹系・ベンダーサポート必須</td><td>Solaris、AIXなど商用UNIX(ライセンスは高額)</td></tr>
          <tr><td className="hl">初心者</td><td>Ubuntuなどの Linuxディストリビューション</td></tr>
        </tbody>
      </table>

      <Heading num="まとめ">同じ顔をした別の家族</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>UNIXは商標</h4><p>The Open Groupの認定を受けたものだけがUNIXを名乗れます。macOSは正式なUNIXです。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Linuxはカーネル</h4><p>UNIXのコードを一切使わない独自実装。厳密には「UNIX系OS」であり、公式のPOSIX認定はありません。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>POSIXが橋渡し</h4><p>最低限の共通ルールにより、別々に育った3ファミリーが「似たように動く」状態を保っています。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/os/unix" tag="OS">UNIXの歴史と哲学</RelatedLink>
                    <RelatedLink href="/os/linux" tag="OS">Linuxの歴史</RelatedLink>
                    <RelatedLink href="/os/gnu" tag="OS">GNUとフリーソフトウェア</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
