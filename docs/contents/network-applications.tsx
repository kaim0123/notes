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
  title: "アプリケーション層",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>アプリケーション層 ― 人やアプリが直接使うプロトコル</h1>
        <Lead>
          <Link href="/network/layers">階層モデル</Link>のいちばん上、私たちが日々触れているWebブラウザやメールソフトが暮らしているのがアプリケーション層です。下の<Link href="/network/transport">トランスポート層</Link>(TCP/UDPとポート番号)が用意した「通り道」の上で、SSHやメール、HTTPといった目的別のプロトコルが動きます。このページで層の全体像とリモート接続(FTP)をつかみ、<Link href="/network/applications/ssh">SSH</Link>・<Link href="/network/applications/web">Web(HTTP)</Link>・<Link href="/network/applications/tls">SSL/TLS</Link>・<Link href="/network/applications/dns">DNS</Link>・<Link href="/network/applications/mail">メール</Link>は、それぞれ個別ページで深掘りします。
        </Lead>
      </Hero>

      <Heading num="01">アプリケーション層とは ― 主要プロトコルの俯瞰</Heading>
      <p>アプリケーション層は、<strong>人やアプリケーションが直接やり取りする内容そのもの</strong>を扱う層です。「どのIPアドレスへ、どのケーブルを通って届けるか」といった下位の仕事は、<Link href="/network/ip">IP</Link>やトランスポート層に任せきりにできます。だからこそブラウザやメールソフトの開発者は、通信の物理的な事情を気にせず「Webページを取ってくる」「メールを送る」という目的だけに集中できるのです。</p>
      <p>アプリケーション層のプロトコルは、必ず下位の<Term>TCP</Term>または<Term>UDP</Term>のどちらかに乗り、<Term>ポート番号</Term>という「窓口番号」で区別されます。代表的なプロトコルと、その乗り物・窓口番号を一覧にしておきましょう。この対応が頭に入っていると、通信トラブルの切り分けもぐっと楽になります。</p>
      <table>
        <tbody>
          <tr><th>プロトコル</th><th>用途</th><th>トランスポート</th><th>代表ポート</th></tr>
          <tr><td className="hl">SSH</td><td>安全なリモートログイン・ファイル転送</td><td>TCP</td><td>22</td></tr>
          <tr><td className="hl">FTP</td><td>ファイル転送</td><td>TCP</td><td>20 / 21</td></tr>
          <tr><td className="hl">SMTP</td><td>メールの送信・転送</td><td>TCP</td><td>25 / 587</td></tr>
          <tr><td className="hl">POP3</td><td>メールの受信(ダウンロード型)</td><td>TCP</td><td>110</td></tr>
          <tr><td className="hl">IMAP</td><td>メールの受信(サーバ保管型)</td><td>TCP</td><td>143</td></tr>
          <tr><td className="hl">HTTP / HTTPS</td><td>Webページのやり取り</td><td>TCP</td><td>80 / 443</td></tr>
          <tr><td className="hl">DNS</td><td>ドメイン名からIPアドレスを解決</td><td>UDP(TCP)</td><td>53</td></tr>
          <tr><td className="hl">DHCP</td><td>IPアドレスの自動割り当て</td><td>UDP</td><td>67 / 68</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        1台のサーバーは「1つの建物」、ポート番号は「その建物の中の部屋番号」です。同じ住所(IPアドレス)に荷物が届いても、80番の部屋はWeb担当、25番の部屋はメール担当…と受付が分かれているので、混ざらずに正しい担当へ渡せます。アプリケーション層のプロトコルは、それぞれ自分専用の部屋を構えて客を待っているわけです。
      </Analogy>

      <Aside label="くわしくは">
        ポート番号やTCP/UDPの違いそのものは「<Link href="/network/transport">トランスポート層</Link>」で、ドメイン名からIPアドレスを引く名前解決は「<Link href="/network/applications/dns">DNS</Link>」で詳しく扱います。
      </Aside>

      <Heading num="02">リモート・ファイル転送 ― SSHとFTP</Heading>
      <p>離れた場所にあるサーバーを操作したり、ファイルをやり取りしたりするためのプロトコルです。リモートログインの標準は暗号化された<Term>SSH</Term>(ポート22)で、接続手順・公開鍵認証・ファイル転送(scp/SFTP)は「<Link href="/network/applications/ssh">SSH接続</Link>」で詳しく扱います。</p>

      <h3>FTP ― 制御用とデータ用、2本のコネクション</h3>
      <p><Term>FTP(File Transfer Protocol)</Term>はファイル転送専用のプロトコルです。特徴的なのは、<strong>制御用とデータ用で2本のコネクションを使い分ける</strong>点です。ポート21番の<Term>制御コネクション</Term>で「このファイルを送って」などの命令をやり取りし、実際のファイル本体は別に張られる<Term>データコネクション</Term>を流れます。命令の通り道とファイルの通り道を分けることで、大きなファイルを転送している最中でも命令を受け付けられます。</p>
      <p>このデータコネクションの張り方には、<Term>能動モード(アクティブ)</Term>と<Term>受動モード(パッシブ)</Term>の2種類があります。</p>
      <table>
        <tbody>
          <tr><th>モード</th><th>データ接続を始めるのは</th><th>特徴</th></tr>
          <tr><td className="hl">能動(アクティブ)</td><td>サーバー → クライアント</td><td>サーバー側からクライアントへ接続しにいく。クライアント側の<Term>ファイアウォール</Term>に阻まれやすい</td></tr>
          <tr><td className="hl">受動(パッシブ)</td><td>クライアント → サーバー</td><td>データ接続もクライアントから張る。ファイアウォール環境でも通りやすく、現在の主流</td></tr>
        </tbody>
      </table>
      <Diagram caption="FTPの能動モードと受動モード。データコネクションを「どちら側から張るか」が逆になる">
        <svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
          <g fontSize="12" fill="#f2f2f2">
            <text x={90} y={22} textAnchor="middle" fill="#9a9a9a">能動(アクティブ)モード</text>
            <rect x={30} y={40} width={110} height={34} fill="none" stroke="#5f5f5f" /><text x={85} y={62} textAnchor="middle">クライアント</text>
            <rect x={30} y={150} width={110} height={34} fill="none" stroke="#5f5f5f" /><text x={85} y={172} textAnchor="middle">サーバー</text>
            <line x1={85} y1={74} x2={85} y2={150} stroke="#5f5f5f" strokeDasharray="3 3" />
            <line x1={70} y1={90} x2={70} y2={135} stroke="#39ff6a" strokeWidth="1.5" markerEnd="url(#a-up)" />
            <text x={20} y={116} fill="#9a9a9a" fontSize="10" textAnchor="end">制御21</text>
            <line x1={110} y1={135} x2={110} y2={90} stroke="#39ff6a" strokeWidth="1.5" markerEnd="url(#a-down)" />
            <text x={150} y={116} fill="#9a9a9a" fontSize="10">データ20</text>
            <text x={85} y={210} textAnchor="middle" fill="#9a9a9a" fontSize="11">データ接続はサーバーから</text>
          </g>
          <g fontSize="12" fill="#f2f2f2">
            <text x={470} y={22} textAnchor="middle" fill="#9a9a9a">受動(パッシブ)モード</text>
            <rect x={410} y={40} width={110} height={34} fill="none" stroke="#5f5f5f" /><text x={465} y={62} textAnchor="middle">クライアント</text>
            <rect x={410} y={150} width={110} height={34} fill="none" stroke="#5f5f5f" /><text x={465} y={172} textAnchor="middle">サーバー</text>
            <line x1={450} y1={90} x2={450} y2={135} stroke="#39ff6a" strokeWidth="1.5" markerEnd="url(#a-up)" />
            <text x={400} y={116} fill="#9a9a9a" fontSize="10" textAnchor="end">制御21</text>
            <line x1={490} y1={90} x2={490} y2={135} stroke="#39ff6a" strokeWidth="1.5" markerEnd="url(#a-up)" />
            <text x={530} y={116} fill="#9a9a9a" fontSize="10">データ</text>
            <text x={465} y={210} textAnchor="middle" fill="#9a9a9a" fontSize="11">データ接続もクライアントから</text>
          </g>
          <defs>
            <marker id="a-up" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto"><path d="M0,6 L4,0 L8,6" fill="none" stroke="#39ff6a" /></marker>
            <marker id="a-down" markerWidth="8" markerHeight="8" refX="4" refY="2" orient="auto"><path d="M0,2 L4,8 L8,2" fill="none" stroke="#39ff6a" /></marker>
          </defs>
        </svg>
      </Diagram>
      <p>なお、FTP自体は通信内容を暗号化しないため、現在は暗号化に対応した<Term>SFTP</Term>(SSHの仕組みでファイル転送する)や<Term>FTPS</Term>が使われる場面が増えています。</p>

      <Heading num="03">メール ― 送信と受信で役割が違う</Heading>
      <p>メールは、<strong>送る側と受け取る側で使うプロトコルが分かれている</strong>のが最大の特徴です。まず、そもそもメール本文に日本語や画像、添付ファイルといった多様なデータを載せる仕組みが<Term>MIME(Multipurpose Internet Mail Extensions)</Term>です。もともとメールは英数字しか運べませんでしたが、MIMEによって「本文はUTF-8のテキスト、添付はPNG画像」といった具合に、種類の異なるデータをひとつのメールに詰め込めるようになりました。</p>
      <p>その中身を運ぶプロトコルが、送信用の<Term>SMTP</Term>と、受信用の<Term>POP</Term>・<Term>IMAP</Term>です。</p>
      <table>
        <tbody>
          <tr><th>プロトコル</th><th>役割</th><th>ポイント</th></tr>
          <tr><td className="hl">SMTP</td><td>メールの<strong>送信・サーバ間転送</strong></td><td>自分のメールを送信サーバーへ渡し、宛先のサーバーまで配送する</td></tr>
          <tr><td className="hl">POP3</td><td>メールの<strong>受信(ダウンロード型)</strong></td><td>サーバーからメールを手元にダウンロードし、基本的にサーバー上からは消す</td></tr>
          <tr><td className="hl">IMAP</td><td>メールの<strong>受信(サーバ保管型)</strong></td><td>メールはサーバーに置いたまま。複数端末から同じ状態で読める</td></tr>
        </tbody>
      </table>
      <p><Term>POP3</Term>は「郵便物を家に持ち帰る」イメージで、一度取り込むとその端末に紐づきます。対して<Term>IMAP</Term>は「郵便物を郵便局のロッカーに預けたまま見に行く」イメージで、開封・削除・フォルダ分けといった状態がサーバー側で管理されるため、複数端末で同じ見え方になります。</p>

      <Aside label="くわしくは">
        送受信の流れ・POPとIMAPの使い分け・メール中継・なりすまし対策(SPF・DKIM・DMARC)などは「<Link href="/network/applications/mail">メールの仕組み</Link>」で詳しく扱います。
      </Aside>

      <Heading num="04">WWW ― HTML・CSS・HTTP</Heading>
      <p>私たちが「インターネット」と聞いてまず思い浮かべるWebページの世界が<Term>WWW(World Wide Web)</Term>です。これは大きく3つの技術で成り立っています。ページの構造を記述する<Term>HTML5</Term>、見た目を装飾する<Term>CSS3</Term>、そしてそれらをやり取りする通信手順の<Term>HTTP</Term>です。HTMLが「文書の骨組み」、CSSが「その化粧」、HTTPが「文書を運ぶ配達方法」と考えると役割が整理できます。</p>

      <h3>HTTP ― リクエストとレスポンスの1往復</h3>
      <p>ポート80番・443番の先でやり取りされているのが<Term>HTTP(HyperText Transfer Protocol)</Term>です。ブラウザ(クライアント)がリクエストを送り、サーバーがレスポンスを返す、という1往復が通信の基本単位になります。この1往復を、ページ内の画像やCSSの数だけ繰り返して1枚のページが完成します。</p>
      <p>リクエストの先頭には<Term>メソッド</Term>が指定され、サーバーに何をしてほしいかを伝えます。特によく使うのがデータを取得する<strong>GET</strong>と、データを送る<strong>POST</strong>です。</p>
      <table>
        <tbody>
          <tr><th>メソッド</th><th>用途</th><th>データの送り方</th></tr>
          <tr><td className="hl">GET</td><td>データの取得(検索・閲覧)</td><td>URLの<Term>クエリ文字列</Term>に付加。URLに残り、履歴やブックマークにも残る</td></tr>
          <tr><td className="hl">POST</td><td>データの送信・登録(フォーム送信など)</td><td><Term>リクエストボディ</Term>に格納。URLに残らず、送れる量の制限も緩い</td></tr>
          <tr><td className="hl">PUT</td><td>データの置き換え(更新)</td><td>リクエストボディに格納する</td></tr>
          <tr><td className="hl">DELETE</td><td>データの削除</td><td>基本的にボディなし</td></tr>
        </tbody>
      </table>
      <Analogy label="💡 たとえるなら">
        GETは「本棚から本を探して読む」ような、相手の状態を変えない操作。POSTは「注文用紙に記入して提出する」ような、相手に何かを作成・変更してもらう操作です。パスワードのようにURLに残ってほしくない情報は、GETではなくPOSTで送るのが基本です。
      </Analogy>

      <Aside label="くわしくは">
        レスポンスのステータスコード(200・404・500など)、HTTPリクエスト/レスポンスの詳しい構造、URLを開いてから画面が表示されるまでの一連の流れは「<Link href="/network/applications/web">Webの仕組み</Link>」で、HTTPSを支える<Term>TLS</Term>の仕組みと<Term>TLSハンドシェイク</Term>は「<Link href="/network/applications/tls">SSL/TLSとTLSハンドシェイク</Link>」で詳しく扱います。
      </Aside>

      <Heading num="05">Webアプリケーション ― JavaScriptとCookie</Heading>
      <p>HTMLとCSSだけのページは、届いた瞬間の姿で固定された「静的なページ」です。そこにボタンを押すと表示が変わる、入力をその場で検証する、といった動きを加えるのが<Term>JavaScript</Term>です。JavaScriptはサーバーではなく<strong>ブラウザ(クライアント)側で動く</strong>プログラミング言語で、画面をいちいちサーバーに問い合わせて作り直さなくても、手元で表示を書き換えられます。地図をドラッグして動かせる、入力ミスを送信前に指摘してくれる、といった体験はJavaScriptが支えています。</p>

      <h3>Cookie ― サーバーが「覚えておく」ための仕組み</h3>
      <p>HTTPには、実は「1往復ごとに関係がリセットされる」という性質があります。これを<Term>ステートレス</Term>と呼びます。サーバーは前のリクエストのことを覚えていないため、そのままではログイン状態を保てません。そこで使われるのが<Term>Cookie</Term>です。</p>
      <p>サーバーはレスポンスの<code>Set-Cookie</code>ヘッダで小さなデータをブラウザに渡し、ブラウザは以降のリクエストで自動的にそれを送り返します。これにより「さっきログインした人だ」とサーバーが判別できるようになります。ログイン状態を識別するための値を<Term>セッションID</Term>と呼び、Cookieに載せて運ぶのが典型的な使い方です。</p>

      <Aside label="くわしくは">
        Cookieの往復の詳細やSecure・HttpOnly属性、オリジンによる「同じサイト」の境界、受け取ったHTMLを画面に描くDOMとレンダリングは「<Link href="/network/applications/web">Webの仕組み</Link>」で扱います。
      </Aside>

      <Aside label="豆知識">
        「クライアント側のJavaScript」に対して、サーバー側でも同じJavaScriptを動かす<Term>Node.js</Term>という実行環境があります。今では1つの言語でブラウザとサーバーの両方を書けるため、Webアプリケーション開発でJavaScriptが広く使われる大きな理由になっています。
      </Aside>

      <Heading num="まとめ">アプリケーション層の要点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>目的別プロトコルの層</h4><p>SSH・FTP・SMTP・HTTPなど、人やアプリが直接使うプロトコルが、TCP/UDPとポート番号の上で動きます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>メールは送信と受信で別</h4><p>送信はSMTP、受信はPOP3(ダウンロード型)かIMAP(サーバ保管型)。役割がはっきり分かれています。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Webは3技術とCookie</h4><p>HTML・CSS・HTTPが土台。JavaScriptで動きを、Cookieでステートレスなやり取りに状態を与えます。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/network/transport" tag="ネットワーク">トランスポート層 ― TCPとUDP</RelatedLink>
            <RelatedLink href="/network/applications/ssh" tag="ネットワーク">SSH接続</RelatedLink>
            <RelatedLink href="/network/applications/web" tag="ネットワーク">Webの仕組み</RelatedLink>
            <RelatedLink href="/network/layers" tag="ネットワーク">階層モデル</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
