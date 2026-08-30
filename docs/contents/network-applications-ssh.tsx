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
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "SSH接続",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>SSH接続 ― 遠隔サーバーを安全に操作する</h1>
        <Lead>
          クラウド上のサーバーや社内のLinuxマシンを、手元のPCから操作するとき、最初に使うのが<Term>SSH</Term>です。「<Link href="/network/applications">アプリケーション層</Link>」で触れたプロトコルの概要を踏まえ、このページでは実際の接続手順・認証の仕組み・ファイル転送までを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">SSHとは ― Telnetの後継</Heading>
      <p><Term>SSH(Secure Shell)</Term>は、手元の端末から遠隔のサーバーへ安全にログインし、コマンドを実行するためのプロトコルです。<Link href="/network/transport">トランスポート層</Link>のTCPポート<strong>22</strong>番を使い、通信経路がすべて暗号化されます。途中の経路で盗み見られても、パスワードやコマンドの内容がそのまま読まれません。</p>
      <p>かつては同じ目的で<Term>Telnet</Term>が使われていましたが、Telnetは通信内容が平文のまま流れるため、現在ではSSHに置き換えられています。公開されているサーバーでTelnetを有効にしておくことは、パスワードを丸見えにしているのと同じです。</p>

      <table>
        <tbody>
          <tr><th></th><th>Telnet</th><th>SSH</th></tr>
          <tr><td className="hl">暗号化</td><td>なし(平文)</td><td>あり(通信全体)</td></tr>
          <tr><td className="hl">代表ポート</td><td>23</td><td>22</td></tr>
          <tr><td className="hl">現在の利用</td><td>原則使わない</td><td>リモート管理の標準</td></tr>
        </tbody>
      </table>

      <Diagram caption="SSH接続のイメージ。手元のターミナルから、暗号化されたトンネル越しにサーバー上のシェルを操作する">
        <svg viewBox="0 0 640 180" xmlns="http://www.w3.org/2000/svg">
          <rect x={30} y={60} width={120} height={50} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={90} y={82} fill="#f2f2f2" fontSize="12" textAnchor="middle">手元のPC</text>
          <text x={90} y={98} fill="#9a9a9a" fontSize="10" textAnchor="middle">(ssh クライアント)</text>

          <rect x={220} y={70} width={200} height={30} rx="4" fill="none" stroke="#39ff6a" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={320} y={90} fill="#39ff6a" fontSize="11" textAnchor="middle">暗号化されたSSHセッション (TCP 22)</text>

          <rect x={490} y={60} width={120} height={50} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={550} y={82} fill="#f2f2f2" fontSize="12" textAnchor="middle">リモートサーバー</text>
          <text x={550} y={98} fill="#9a9a9a" fontSize="10" textAnchor="middle">(sshd + シェル)</text>

          <line x1={150} y1={85} x2={218} y2={85} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#ssh-arrow)" />
          <line x1={420} y1={85} x2={488} y2={85} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#ssh-arrow)" />
          <defs>
            <marker id="ssh-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
          <text x={320} y={145} fill="#9a9a9a" fontSize="11" textAnchor="middle">打ち込んだコマンドも返ってきた出力も、すべて暗号化されて流れる</text>
        </svg>
      </Diagram>

      <Heading num="02">基本的な接続 ― ssh コマンド</Heading>
      <p>macOSやLinux、Windows 10以降(OpenSSHクライアント内蔵)では、<Link href="/dev/workspace">ターミナル</Link>から<code>ssh</code>コマンドで接続できます。形式は次のとおりです。</p>
      <p><code>ssh ユーザー名@ホスト名</code></p>
      <p>例えば、IPアドレス<code>203.0.113.10</code>上のサーバーに、ユーザー<code>ubuntu</code>で入る場合は次のように打ちます。</p>
      <p><code>ssh ubuntu@203.0.113.10</code></p>
      <p>ホスト名の部分にはIPアドレスのほか、<Link href="/network/applications/dns">DNS</Link>で名前解決できるドメイン名(<code>ssh example.com</code>など)も使えます。ポートが22以外の場合は<code>-p</code>オプションで指定します(<code>ssh -p 2222 user@host</code>)。</p>

      <Steps>
        <li><strong>接続要求</strong>クライアントがサーバーの22番ポートへTCP接続を張る</li>
        <li><strong>鍵交換</strong>双方が暗号化方式を決め、以降の通信を暗号化する</li>
        <li><strong>認証</strong>パスワードまたは公開鍵で本人確認する</li>
        <li><strong>シェル起動</strong>認証成功後、サーバー上のシェルが起動し、コマンド入力を待つ</li>
      </Steps>

      <Heading num="03">初回接続と known_hosts</Heading>
      <p>初めて接続するサーバーでは、サーバーの<Term>ホスト鍵</Term>(サーバー自身の身元証明)の確認を求められます。</p>
      <p><code>The authenticity of host &apos;203.0.113.10&apos; can&apos;t be established.<br />Are you sure you want to continue connecting (yes/no)?</code></p>
      <p>これは「本当にこのサーバーと話しているか」を確認する仕組みです。<code>yes</code>と答えると、サーバーのホスト鍵の指紋が手元の<code>~/.ssh/known_hosts</code>ファイルに記録されます。2回目以降は同じサーバーなら自動的に照合され、<strong>別のサーバーにすり替えられていないか</strong>を検知できます(<Term>中間者攻撃</Term>への防御)。</p>
      <Aside label="注意">
        本番サーバーへの初回接続では、表示された指紋が運用者から共有された値と一致するか確認してから<code>yes</code>と入力するのが安全です。社内の手順書やクラウドコンソールに指紋が載っていることが多いです。
      </Aside>

      <Heading num="04">認証の2方式 ― パスワードと公開鍵</Heading>
      <p>SSHでサーバーに入るとき、本人確認(認証)には大きく2つの方式があります。</p>
      <table>
        <tbody>
          <tr><th>方式</th><th>仕組み</th><th>向いている場面</th></tr>
          <tr><td className="hl">パスワード認証</td><td>接続のたびにパスワードを入力する</td><td>試しに1回だけ入る、一時的な検証</td></tr>
          <tr><td className="hl">公開鍵認証</td><td>手元の秘密鍵で署名し、サーバー側の公開鍵と照合する</td><td>日常運用・自動化・本番サーバー(推奨)</td></tr>
        </tbody>
      </table>
      <p>公開鍵認証では、パスワードそのものがネットワーク上を流れません。秘密鍵さえ手元から漏れなければ、公開鍵をサーバーに登録しても安全です。公開鍵暗号の数学的な仕組みは「<Link href="/security/crypto">暗号の歴史と公開鍵暗号</Link>」で扱います。</p>

      <Analogy label="💡 たとえるなら">
        公開鍵認証は「南京錠と、その鍵」の関係です。開いた南京錠(公開鍵)は誰に配っても構いません。相手はその錠前で箱を施錠できますが、開けられるのは対応する鍵(秘密鍵)を持つ本人だけ。秘密鍵さえ手元から出さなければ、いくら南京錠がばらまかれても安全なのです。
      </Analogy>

      <Heading num="05">公開鍵認証の設定手順</Heading>
      <p>公開鍵認証を使う典型的な流れは次のとおりです。</p>
      <Steps>
        <li><strong>鍵ペアを生成</strong>手元で<code>ssh-keygen -t ed25519</code>を実行し、秘密鍵(<code>~/.ssh/id_ed25519</code>)と公開鍵(<code>~/.ssh/id_ed25519.pub</code>)を作る</li>
        <li><strong>公開鍵をサーバーへ登録</strong>公開鍵の内容を、サーバー側の<code>~/.ssh/authorized_keys</code>に1行追加する</li>
        <li><strong>秘密鍵で接続</strong><code>ssh user@host</code>を実行。クライアントが自動的に秘密鍵を使って署名し、サーバーが照合する</li>
      </Steps>
      <p>公開鍵の登録は、初回だけパスワード認証で入ったあと手動でコピーする方法のほか、<code>ssh-copy-id user@host</code>コマンドで一括登録する方法もよく使われます。AWS EC2などクラウドでは、インスタンス作成時に公開鍵を指定し、対応する秘密鍵(.pem)ファイルだけを手元に残す運用が一般的です。</p>
      <Aside label="注意">
        秘密鍵ファイル(<code>id_ed25519</code>や<code>.pem</code>)は<strong>絶対に他人に渡したり、Gitリポジトリにコミットしたりしない</strong>でください。漏洩した秘密鍵は、対応する公開鍵が登録されているサーバーすべてへの入り口になります。
      </Aside>

      <Heading num="06">ファイル転送 ― scp と SFTP</Heading>
      <p>SSHの暗号化された接続の上で、ファイルをやり取りする仕組みもあります。</p>
      <table>
        <tbody>
          <tr><th>手段</th><th>概要</th><th>例</th></tr>
          <tr><td className="hl">scp</td><td>コマンド1行でファイルをコピー</td><td><code>scp local.txt user@host:/remote/path/</code></td></tr>
          <tr><td className="hl">SFTP</td><td>SSH上のファイル転送プロトコル。対話的に操作可能</td><td><code>sftp user@host</code></td></tr>
        </tbody>
      </table>
      <p>どちらもSSHと同じポート22(または指定ポート)を使い、通信は暗号化されます。かつてよく使われた<Term>FTP</Term>は内容を暗号化しないため、ファイル転送もSSH系(SFTP/scp)が主流になっています(「<Link href="/network/applications">アプリケーション層</Link>」のFTPの節参照)。</p>

      <Heading num="07">config ファイルで接続を楽にする</Heading>
      <p>接続先が増えると、毎回長いホスト名やユーザー名、鍵ファイルを指定するのは面倒です。手元の<code>~/.ssh/config</code>に設定を書いておくと、短い別名で接続できます。</p>
      <p><code>Host myserver<br />&nbsp;&nbsp;HostName 203.0.113.10<br />&nbsp;&nbsp;User ubuntu<br />&nbsp;&nbsp;IdentityFile ~/.ssh/myserver_key</code></p>
      <p>この設定があれば、<code>ssh myserver</code>だけで接続できます。複数のサーバーを扱う開発者やインフラ担当者は、早い段階でこのファイルを整えておくと作業が楽になります。</p>

      <Heading num="まとめ">SSH接続の要点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>暗号化されたリモート操作</h4><p>ポート22/TCP上で、Telnetの後継としてリモートログインとコマンド実行を安全に行います。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>公開鍵認証が標準</h4><p>日常運用では秘密鍵を手元に、公開鍵をサーバーのauthorized_keysに置く方式が推奨されます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>転送も同じ接続</h4><p>scp・SFTPでファイル転送も暗号化。サーバー管理の入口として覚えておく基本スキルです。</p></Card>
      </CardGrid>
      <p>ローカルでターミナルとシェルの使い方を押さえたら、次はSSHでリモートサーバーに入り、実際の「<Link href="/network/internet/server/build">サーバー構築の実務</Link>」の世界に足を踏み入れることになります。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/network/applications" tag="ネットワーク">アプリケーション層のプロトコル</RelatedLink>
            <RelatedLink href="/dev/workspace" tag="開発">開発環境 ― ターミナルとシェル</RelatedLink>
            <RelatedLink href="/network/internet/server/build" tag="インターネット">サーバー構築の実務</RelatedLink>
            <RelatedLink href="/security/crypto" tag="セキュリティ">暗号の歴史と公開鍵暗号</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
