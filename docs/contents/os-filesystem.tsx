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
  Timeline,
  TimelineItem,
  TimelineLabel,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ファイルシステム",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>OS</Eyebrow>
        <h1>ファイルシステム ― データを配置し、守る</h1>
        <Lead>
          写真を保存する、ファイルをコピーする、PCを起動する ―
          この当たり前の操作はすべて<strong>ファイルシステム</strong>が支えています。私たちが「フォルダ」「ファイル名」で扱っている裏側で、ディスク上のどこに・どんな権限で・壊れないように記録するかを管理しているOSの中核機能です。
        </Lead>
      </Hero>

      <p>
        「<Link href="/os">OSの仕組み</Link>」で見たとおり、ファイルシステムの管理はOSの5つの役割の1つです。そして実際のディスクへの読み書きは、ハードウェアを直接触れる<Link href="/os/kernel">カーネル</Link>が低レベルで担います。ここでは、その「データを配置し、守る」仕組みが、パンチカードの時代からSSDの時代までどう進化してきたのかを追いかけます。
      </p>

      <Heading num="01">ファイルシステムとは何か</Heading>
      <p>
        <Term>ファイルシステム</Term>とは、ディスク上のデータの<strong>配置・名前・権限・整合性</strong>を管理するOSの中核機能です。ユーザーがフォルダやファイル名で操作している裏側で、<Term>クラスタ</Term>・<Term>ブロック</Term>・<Term>メタデータ</Term>といった単位を通じて、物理的な記録位置を抽象化しています。
      </p>
      <p>
        普段は意識しませんが、コピー・削除・起動・バックアップのすべてがファイルシステムに依存しています。あって当たり前すぎて存在を忘れられがちな、不可欠な基盤技術です。
      </p>
      <Analogy label="💡 たとえるなら">
        ファイルシステムは「図書館の司書と目録」です。利用者は「あの本」と名前で頼むだけですが、司書は棚のどの区画に置いたか、誰が借りられるか、途中で作業が中断しても本が迷子にならないかを、すべて台帳で管理しています。
      </Analogy>

      <Heading num="02">進化の歴史 ― 媒体とともに変わる管理</Heading>
      <Timeline>
        <TimelineItem era="1950年代">パンチカード<br />FSなし・物理的な順序管理</TimelineItem>
        <TimelineItem era="1950年代後半">磁気テープ<br />順次アクセスのみ</TimelineItem>
        <TimelineItem era="1960年代">HDD登場<br />ランダムアクセスが可能に</TimelineItem>
        <TimelineItem era="1977〜">FAT12/16/32<br />クラスタ + FAT表</TimelineItem>
        <TimelineItem era="1993">NTFS<br />ジャーナリング・権限・暗号化</TimelineItem>
        <TimelineItem era="1992〜2008">ext → ext4<br />Linux系の標準</TimelineItem>
        <TimelineItem era="2010年代〜">SSD向けFS<br />ReFS・Btrfs・F2FS・APFS</TimelineItem>
      </Timeline>
      <TimelineLabel>
        記録媒体が「紙 → 磁気テープ → 回転ディスク → フラッシュメモリ」と変わるたびに、その特性に合わせてファイルシステムの設計も塗り替えられてきました。
      </TimelineLabel>

      <Heading num="03">ファイルシステム以前 ― パンチカードと磁気テープ</Heading>
      <h3>パンチカード時代</h3>
      <p>
        1950年代のコンピュータには、<strong>ファイルシステムという概念自体が存在しませんでした</strong>。<Term>パンチカード</Term>に穴を開けて0/1を記録しますが、1枚あたり約80文字しか入らず、「Hello World」程度のプログラムでも1枚を消費します。数百枚のカードを正しい順序で通す必要があり、束を落として順番が狂うと地獄の再整理 ― これが物理的なファイル管理の原点でした。
      </p>
      <h3>磁気テープ時代</h3>
      <p>
        1950年代後半から<Term>磁気テープ</Term>が普及し、大量データの記録が可能になります。ただし<Term>順次アクセス</Term>（Sequential Access）しかできません ― テープの10曲目を聴くには最初から早送りするのと同じで、途中のファイルに直接飛べないのです。テープ先頭にファイル一覧を書く程度の単純な管理でしたが、パンチカードよりははるかにマシで、<strong>バックアップ用途では2000年代まで現役</strong>でした。
      </p>

      <Heading num="04">HDDの登場とFAT系列</Heading>
      <h3>ランダムアクセスという革命</h3>
      <p>
        1960年代、<Term>HDD</Term>（Hard Disk Drive）が登場します。IBMの<strong>RAMAC</strong>は冷蔵庫2台分のサイズで容量わずか5MBでしたが、当時は革命的でした。円盤上を読み取りヘッドが好きな位置へ直接移動できる<Term>ランダムアクセス</Term>が可能になったのです。これにより、データの配置・管理を真剣に設計する必要が生まれ、1960〜70年代にUNIXのUFSなど各種ファイルシステムが開発されました。
      </p>
      <Analogy label="💡 たとえるなら">
        磁気テープが「カセットテープ」なら、HDDは「CD」です。テープは頭出しに巻き戻しが必要ですが、CDなら聴きたい曲へ一瞬で飛べます。この「好きな場所へ直接アクセスできる」ことが、本格的なファイルシステム設計の出発点でした。
      </Analogy>

      <h3>FAT（File Allocation Table）</h3>
      <p>
        1977年、Microsoftが<Term>FAT</Term>（File Allocation Table）を開発します。フロッピーディスク向けのシンプルなファイルシステムで、ディスクを<strong>クラスタ</strong>という小さな区画に分割し、どのクラスタがどのファイルに使われているかを「表（FAT）」で管理します。
      </p>
      <Analogy label="💡 たとえるなら">
        神社の境内を区画に分け、「A区画は御守り、B区画はおみくじ」とノートに書いて管理するイメージです。このノートがFAT表で、どの区画（クラスタ）が何に使われているかを一覧できます。
      </Analogy>
      <p>
        <strong>FAT12 → FAT16 → FAT32（1996）</strong>と進化し、数字はアドレス指定のビット数を表します。管理できるファイル数・サイズ・ディスク容量が段階的に拡大しました。FAT32は2TBまでのディスクに対応し、シンプルさと互換性の高さから、今もUSBメモリ・SDカードで広く使われています。
      </p>
      <h3>FATの欠点</h3>
      <table>
        <tbody>
          <tr>
            <th>欠点</th>
            <th>内容</th>
          </tr>
          <tr>
            <td className="hl">断片化</td>
            <td>書き込み・削除を繰り返すとファイルがディスク上にバラバラに散在し、読み込みが遅くなる（Fragmentation）</td>
          </tr>
          <tr>
            <td className="hl">デフラグの必要</td>
            <td>散らばったファイルをまとめて整理する<Term>デフラグ</Term>作業が定期的に必要</td>
          </tr>
          <tr>
            <td className="hl">4GBの壁</td>
            <td>FAT32は1ファイル4GBまで。現代の動画・ISOイメージなど大容量ファイルには不向き</td>
          </tr>
        </tbody>
      </table>

      <Heading num="05">NTFS ― Windowsの次世代ファイルシステム</Heading>
      <p>
        1993年、Microsoftは<Term>NTFS</Term>（New Technology File System）を<strong>Windows NT</strong>と共に発表しました。Windows 11でも現役の標準ファイルシステムです。
      </p>
      <table>
        <tbody>
          <tr>
            <th>機能</th>
            <th>内容</th>
          </tr>
          <tr>
            <td className="hl">大容量対応</td>
            <td>理論上16EB（エクサバイト）までのファイルサイズ</td>
          </tr>
          <tr>
            <td className="hl">ジャーナリング</td>
            <td>ファイル操作の変更履歴を記録。停電・クラッシュ時に途中から修復できる</td>
          </tr>
          <tr>
            <td className="hl">アクセス権限（ACL）</td>
            <td>ユーザー・グループごとに読み取り・書き込みを細かく制御</td>
          </tr>
          <tr>
            <td className="hl">圧縮・暗号化</td>
            <td>ファイルシステムレベルで自動圧縮やEFS暗号化をサポート</td>
          </tr>
          <tr>
            <td className="hl">ハード/シンボリックリンク</td>
            <td>1つのファイルを複数のパスから参照できる</td>
          </tr>
        </tbody>
      </table>
      <p>
        FAT時代は停電でファイルシステム全体が破損することもありましたが、NTFSの<Term>ジャーナリング</Term>によりデータ整合性が大幅に向上しました。30年以上使われ続けていますが、内部は何度もアップデートされており、基本設計の優秀さが長寿命の理由です。
      </p>

      <Heading num="06">Linuxのext系列</Heading>
      <p>
        Linuxの世界では、<Term>ext</Term>（Extended File System）が独自に進化してきました。
      </p>
      <table>
        <tbody>
          <tr>
            <th>世代</th>
            <th>年</th>
            <th>特徴</th>
          </tr>
          <tr>
            <td className="hl">ext / ext2</td>
            <td>1992 / 1993</td>
            <td>ext2がLinuxの事実上の標準に。ただしジャーナリングがなく、異常終了時は<strong>fsck</strong>でディスク全体をスキャン ― 大容量では数時間かかることも</td>
          </tr>
          <tr>
            <td className="hl">ext3</td>
            <td>2001</td>
            <td>ext2にジャーナリングを追加。後方互換性があり、ext2をそのままext3としてマウント可能</td>
          </tr>
          <tr>
            <td className="hl">ext4</td>
            <td>2008</td>
            <td>ボリューム最大1EB、エクステント、遅延割り当てを導入。今も多くのディストリのデフォルト</td>
          </tr>
        </tbody>
      </table>
      <p>ext4の主な改良点は次の3つです。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ボリュームの巨大化</h4>
          <p>ext3の最大16TBから、ext4は1EB（エクサバイト）へ拡大した。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>エクステント</h4>
          <p>ブロックを1個ずつではなく「100〜200」のように連続範囲で管理し、大ファイルの性能向上と断片化抑制を実現した。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>遅延割り当て</h4>
          <p>書き込みをいったんバッファに溜めてから、まとめて効率的にディスクへ書き込む。</p>
        </Card>
      </CardGrid>

      <Heading num="07">SSD時代の最新ファイルシステム</Heading>
      <p>
        2010年代からは<Term>SSD</Term>（Solid State Drive）が普及します。機械部品がなくフラッシュメモリで記録するため高速ですが、HDDとは特性が異なり、<strong>同じ場所への書き込み回数に上限</strong>があります。特定のセルばかり使うと劣化（ウェアアウト）してしまうため、書き込みを均等に分散させる<Term>ウェアレベリング</Term>が必要になり、ファイルシステム側にもSSD向けの最適化が求められました。
      </p>
      <table>
        <tbody>
          <tr>
            <th>FS</th>
            <th>開発元</th>
            <th>主な特徴</th>
          </tr>
          <tr>
            <td className="hl">ReFS</td>
            <td>Microsoft（2012）</td>
            <td>Resilient File System。自動修復・CoW・スナップショット。主にサーバー用途</td>
          </tr>
          <tr>
            <td className="hl">Btrfs</td>
            <td>Linuxコミュニティ</td>
            <td>スナップショット・サブボリューム・圧縮・重複排除（dedup）</td>
          </tr>
          <tr>
            <td className="hl">F2FS</td>
            <td>Samsung</td>
            <td>Flash-Friendly File System。SSD専用最適化。スマートフォン等で採用</td>
          </tr>
          <tr>
            <td className="hl">APFS</td>
            <td>Apple（2017）</td>
            <td>Apple File System。暗号化・スナップショット・クローン。iPhone / Macの SSD向け</td>
          </tr>
        </tbody>
      </table>

      <Heading num="08">現代のファイルシステムに共通する機能</Heading>
      <p>OSやメーカーは違っても、現代のファイルシステムは似た機能を備えるようになりました。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ジャーナリング</h4>
          <p>変更履歴を記録し、異常終了からの高速復旧を可能にする。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>スナップショット</h4>
          <p>ある時点のファイルシステム状態を丸ごと保存し、一瞬で復元できる（タイムマシン的）。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>コピーオンライト（CoW）</h4>
          <p>上書きせず新しい場所に書いてから古いデータを削除する。書き込み中にエラーが起きても元データが守られる。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>暗号化・SSD最適化</h4>
          <p>セキュリティと、フラッシュメモリの寿命延長を両立する。</p>
        </Card>
      </CardGrid>
      <Aside label="CoWとは">
        Copy on Write（書き込み時コピー）は、更新のたびに元データを直接上書きせず、別の場所へ書いてからポインタを差し替える方式です。途中で電源が落ちても古いデータが無傷で残るため、スナップショットや整合性保証の土台になっています。
      </Aside>

      <Heading num="09">ファイルへのアクセス ― パス・権限・バックアップ</Heading>
      <p>ここまでは「データをどう配置するか」の話でした。最後に、利用者がファイルをどう指し示し、誰がアクセスでき、どう守るかという運用面の基本用語を整理します。</p>

      <h3>パス ― ファイルの住所</h3>
      <p>ファイルやディレクトリ(フォルダ)の場所を示す文字列が<Term>パス</Term>です。指定のしかたに2種類あります。</p>
      <table>
        <tbody>
          <tr><th>種類</th><th>意味</th><th>例</th></tr>
          <tr><td className="hl">絶対パス</td><td>ルート(最上位)からの完全な道順</td><td><code>/home/user/report.txt</code></td></tr>
          <tr><td className="hl">相対パス</td><td>今いる場所(カレントディレクトリ)を起点にした道順</td><td><code>../report.txt</code></td></tr>
        </tbody>
      </table>
      <p>いま作業の基準になっているディレクトリを<Term>カレントディレクトリ</Term>と呼びます。<code>.</code> は現在のディレクトリ、<code>..</code> は1つ上のディレクトリを表します。</p>

      <h3>アクセス権 ― 誰が何をできるか</h3>
      <p>複数の<Term>ユーザーアカウント</Term>が同じシステムを使うため、ファイルごとに「誰が読めるか・書けるか・実行できるか」を定める<Term>アクセス権(パーミッション)</Term>が設けられています。前述のNTFSの<strong>ACL</strong>や、UNIX系の「所有者・グループ・その他」×「読み(r)・書き(w)・実行(x)」がその代表です。誰にどの操作を許すかを管理することを<Term>アクセス制御</Term>と呼びます。</p>
      <Aside label="ロギングとアカウンタビリティ">
        「いつ・誰が・どのファイルに何をしたか」を記録することを<Term>ロギング</Term>といい、後から行為を追跡・説明できる状態(<Term>アカウンタビリティ／説明責任</Term>)を支えます。アクセス制御が「防ぐ」なら、ロギングは「後で確かめる」仕組みです。
      </Aside>

      <h3>バックアップ ― 失われても取り戻す</h3>
      <p>障害や誤操作に備え、データの複製を別に取っておくのが<Term>バックアップ</Term>です。取り方で手間と復旧の速さが変わります(概要)。</p>
      <table>
        <tbody>
          <tr><th>方式</th><th>コピーする範囲</th></tr>
          <tr><td className="hl">フルバックアップ</td><td>毎回すべてを複製。復旧は簡単だが、時間と容量を最も使う。</td></tr>
          <tr><td className="hl">差分バックアップ</td><td>前回の<strong>フル</strong>以降に変わった分。復旧はフル＋最新の差分の2つで済む。</td></tr>
          <tr><td className="hl">増分バックアップ</td><td>前回の<strong>バックアップ</strong>以降に変わった分。毎回の負荷は最小だが、復旧に全増分が必要。</td></tr>
        </tbody>
      </table>
      <p>世代を分けて複数のバックアップを保持する運用を<Term>世代管理</Term>といい、「3世代前の状態に戻す」といった復旧を可能にします。</p>

      <Heading num="まとめ">ファイルシステムは「見えない土台」</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>物理を抽象化する</h4>
          <p>クラスタ・ブロック・メタデータを通じて、物理的な記録位置を「フォルダとファイル名」という扱いやすい形に変換しています。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>媒体とともに進化した</h4>
          <p>パンチカード → 磁気テープ → HDD → SSDと媒体が変わるたびに、その特性に合わせて設計が塗り替えられてきました。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>「壊さない」が現代の主役</h4>
          <p>ジャーナリング・スナップショット・CoWにより、停電やクラッシュがあってもデータを守ることが、現代ファイルシステムの共通テーマです。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/os/kernel" tag="OS">
                      カーネルの役割と設計
                    </RelatedLink>
                    <RelatedLink href="/computer/memory/history" tag="コンピュータ">
                      記憶装置の歴史
                    </RelatedLink>
                    <RelatedLink href="/infra/storage" tag="インフラ">
                      ストレージの仕組み
                    </RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
