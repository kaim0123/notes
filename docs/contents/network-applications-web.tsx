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
  title: "Webの仕組み",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>Webの仕組み ― URLを打ってからページが表示されるまで</h1>
        <Lead>
          ブラウザのアドレスバーにURLを入力してEnterを押す ―
          この何気ない一瞬の裏側では、DNS・TCP/IP・HTTPなど、ここまで見てきた技術が次々とバトンタッチしながら働いています。この記事では、その一連の流れを最初から最後まで追いかけます。
        </Lead>
      </Hero>

      <Heading num="01">WWWを構成する3つの要素</Heading>
      <p><Term>WWW(World Wide Web)</Term>は、大きく3つの要素の組み合わせでできています。ページの住所を示す<Term>URL</Term>、ページの中身を記述する<Term>HTML</Term>、そしてページを取得するためのやり取りの手順である<Term>HTTP</Term>です。これらはすべて、前のページで見た<strong>TCP/IP</strong>のネットワークの上で動作しています。</p>

      <Heading num="02">URLの構造を分解する</Heading>
      <p>まずは住所であるURLの中身を見てみましょう。例として <code>https://blog.example.co.jp/articles/123?sort=new#comment</code> を分解します。</p>

      <Diagram caption="URLの各部分。「ホスト名」= サブドメイン + ドメイン(セカンドレベルドメイン + トップレベルドメイン)">
        <svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg">
          <text x={20} y={30} fontSize="15" fill="#f2f2f2" fontFamily="monospace">https://blog.example.co.jp/articles/123?sort=new#comment</text>

          <line x1={30} y1={40} x2={70} y2={60} stroke="#5f5f5f" />
          <text x={10} y={75} fontSize="11" fill="#39ff6a">スキーム</text>

          <line x1={105} y1={40} x2={140} y2={90} stroke="#5f5f5f" />
          <text x={90} y={105} fontSize="11" fill="#39ff6a">サブドメイン</text>

          <line x1={150} y1={40} x2={220} y2={120} stroke="#5f5f5f" />
          <text x={175} y={135} fontSize="11" fill="#39ff6a">ドメイン(SLD+TLD)</text>

          <line x1={330} y1={40} x2={330} y2={150} stroke="#5f5f5f" />
          <text x={300} y={165} fontSize="11" fill="#39ff6a">パス</text>

          <line x1={440} y1={40} x2={470} y2={90} stroke="#5f5f5f" />
          <text x={430} y={105} fontSize="11" fill="#39ff6a">クエリ文字列</text>

          <line x1={510} y1={40} x2={560} y2={60} stroke="#5f5f5f" />
          <text x={540} y={75} fontSize="11" fill="#39ff6a">フラグメント</text>
        </svg>
      </Diagram>

      <table>
        <tbody>
          <tr><th>要素</th><th>例</th><th>説明</th></tr>
          <tr><td className="hl">スキーム</td><td><code>https</code></td><td>どの手順(プロトコル)で通信するか</td></tr>
          <tr><td className="hl">サブドメイン</td><td><code>blog</code></td><td>ドメインをさらに区分するための接頭辞</td></tr>
          <tr><td className="hl">ドメイン</td><td><code>example.co.jp</code></td><td>セカンドレベルドメイン(<code>example</code>)+トップレベルドメイン(<code>co.jp</code>)</td></tr>
          <tr><td className="hl">パス</td><td><code>/articles/123</code></td><td>サーバー内のどの資源を指すか</td></tr>
          <tr><td className="hl">クエリ文字列</td><td><code>?sort=new</code></td><td>サーバーに渡す追加のパラメーター</td></tr>
          <tr><td className="hl">フラグメント</td><td><code>#comment</code></td><td>ページ内の特定位置を指す。<strong>サーバーには送信されない</strong>、ブラウザだけが使う情報</td></tr>
        </tbody>
      </table>

      <Heading num="03">URLを打ってからページが表示されるまで(全9ステップ)</Heading>
      <Steps>
        <li><strong>① URL解析</strong>ブラウザが入力されたURLを、スキーム・ホスト名・パス・クエリなどに分解する</li>
        <li><strong>② キャッシュ確認</strong>そのホスト名のIPアドレスを、過去に調べてキャッシュしていないか確認する</li>
        <li><strong>③ DNS問い合わせ</strong>キャッシュになければ、DNSにホスト名を問い合わせてIPアドレスを取得する</li>
        <li><strong>④ サーバーへ接続</strong>取得したIPアドレスを使い、Webサーバーへ接続を試みる</li>
        <li><strong>⑤ ポート番号の割り当て</strong>HTTPなら80番、HTTPSなら443番のポートに向けて接続する</li>
        <li><strong>⑥ HTTPリクエスト送信</strong>「何が欲しいか」を記したHTTPリクエストを送信する</li>
        <li><strong>⑦ ロードバランサでの調整</strong>アクセスが多い場合、ロードバランサが複数のサーバーへアクセスを振り分ける</li>
        <li><strong>⑧ HTTPレスポンス送信</strong>サーバーが処理結果(HTMLなど)をHTTPレスポンスとして返す</li>
        <li><strong>⑨ レンダリング</strong>ブラウザが受け取ったHTML・CSS・JavaScriptを解釈し、画面に描画する</li>
      </Steps>

      <Analogy label="💡 たとえるなら">
        URLを入力するのは「知人の家に手紙を送りたいので、名前(ホスト名)を伝える」ようなもの。DNSは「名前から住所(IPアドレス)を調べてくれる電話帳」。ロードバランサは、混み合う人気店の前で「こちらのレジも空いていますよ」と客を振り分ける店員のような存在です。
      </Analogy>

      <Heading num="04">DNS ― 名前を住所に変換する電話帳</Heading>
      <p><Term>DNS(Domain Name System)</Term>は、人間が覚えやすい<code>example.com</code>のような名前を、コンピュータが通信に使うIPアドレスに変換する仕組みです。一度調べた結果は一定時間<Term>キャッシュ</Term>されるため、同じサイトに何度もアクセスするときに毎回DNSへ問い合わせずに済み、表示が速くなります。リゾルバの階層や歴史的な経緯は「<Link href="/network/applications/dns">DNS</Link>」で詳しく扱います。</p>

      <Heading num="05">HTTPリクエストの構造</Heading>
      <p>ブラウザがサーバーに送るHTTPリクエストは、大きく3つの部分でできています。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>リクエストライン</h4><p>「どの方法(メソッド)で」「どのパス・クエリに対して」「どのHTTPバージョンで」求めているかを1行で表す</p></Card>
        <Card><CardNumber>2</CardNumber><h4>リクエストヘッダ</h4><p>ブラウザの種類、受け取りたいデータ形式、ログイン情報など、付加的な情報の一覧</p></Card>
        <Card><CardNumber>3</CardNumber><h4>リクエストボディ</h4><p>フォーム送信など、サーバーに渡す本体データ(GETでは通常空)</p></Card>
      </CardGrid>
      <p>主なリクエストヘッダの例です。</p>
      <table>
        <tbody>
          <tr><th>ヘッダ名</th><th>意味</th></tr>
          <tr><td className="hl">Host</td><td>リクエスト先のホスト名</td></tr>
          <tr><td className="hl">User-Agent</td><td>使用しているブラウザ・OSの情報</td></tr>
          <tr><td className="hl">Accept</td><td>受け取りたいデータの形式(例: HTML、画像)</td></tr>
          <tr><td className="hl">Cookie</td><td>ログイン状態などを保持するための情報</td></tr>
          <tr><td className="hl">Content-Type</td><td>リクエストボディのデータ形式</td></tr>
        </tbody>
      </table>

      <Heading num="06">HTTPレスポンスの構造</Heading>
      <p>サーバーからブラウザへ返ってくるHTTPレスポンスも、同じように3つの部分で構成されます。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ステータスライン</h4><p>「HTTPバージョン」「ステータスコード」「理由フレーズ」を1行で表す(例: <code>HTTP/1.1 200 OK</code>)</p></Card>
        <Card><CardNumber>2</CardNumber><h4>レスポンスヘッダ</h4><p>データの形式、キャッシュの扱い方などをブラウザに伝える付加情報</p></Card>
        <Card><CardNumber>3</CardNumber><h4>レスポンスボディ</h4><p>実際のHTML・画像・JSONなどの中身</p></Card>
      </CardGrid>
      <p><Term>ステータスコード</Term>は3桁の数字で、先頭の数字によって大まかな意味が決まっています。</p>
      <table>
        <tbody>
          <tr><th>コード帯</th><th>意味</th><th>代表例</th></tr>
          <tr><td className="hl">1xx</td><td>情報(処理継続中)</td><td>100 Continue</td></tr>
          <tr><td className="hl">2xx</td><td>成功</td><td>200 OK</td></tr>
          <tr><td className="hl">3xx</td><td>リダイレクト(別の場所へ)</td><td>301 Moved Permanently</td></tr>
          <tr><td className="hl">4xx</td><td>クライアント側のエラー</td><td>404 Not Found</td></tr>
          <tr><td className="hl">5xx</td><td>サーバー側のエラー</td><td>500 Internal Server Error</td></tr>
        </tbody>
      </table>

      <Heading num="07">HTTPは「ステートレス」― Cookieで状態を保つ</Heading>
      <p>HTTPには重要な性質があります。1回のリクエストとレスポンスのやり取りが終わると、サーバーは「直前に誰から何を受け取ったか」を基本的に覚えていません。これを<Term>ステートレス(状態を持たない)</Term>と呼びます。</p>
      <p>ステートレスであることには利点があります。1つ1つのリクエストが完全に独立しているため、前の章で見た<Term>ロードバランサ</Term>がどのリクエストをどのサーバーに振り分けても支障がありません。しかし裏を返せば、「さっきログインしたあの人からの続きのリクエストだ」という<Term>状態</Term>を、HTTP自体は教えてくれないということでもあります。</p>

      <h3>Cookie ― サーバーがブラウザに預ける「整理券」</h3>
      <p>この問題を解決するのが<Term>Cookie</Term>です。仕組みは次のような往復でできています。</p>
      <Steps>
        <li><strong>① サーバーが発行</strong>レスポンスヘッダの<code>Set-Cookie</code>で、ブラウザに覚えておいてほしい値を渡す</li>
        <li><strong>② ブラウザが保存</strong>受け取った値をブラウザの中に保存しておく</li>
        <li><strong>③ ブラウザが自動送信</strong>以降、同じサイトへリクエストするたびに、その値を<code>Cookie</code>ヘッダへ自動的に載せて送り返す</li>
      </Steps>

      <Diagram caption="Set-CookieとCookieヘッダの往復で、ステートレスなHTTPの上に「状態」を作り出す">
        <svg viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={70} width={130} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={85} y={97} fill="#f2f2f2" fontSize="13" textAnchor="middle">ブラウザ</text>
          <rect x={490} y={70} width={130} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={555} y={97} fill="#f2f2f2" fontSize="13" textAnchor="middle">サーバー</text>

          <line x1={150} y1={40} x2={490} y2={40} stroke="#9a9a9a" strokeWidth="1.5" markerEnd="url(#arrowCookie1)" />
          <text x={320} y={30} fill="#9a9a9a" fontSize="12" textAnchor="middle">① リクエスト(まだCookieなし)</text>

          <line x1={490} y1={90} x2={150} y2={90} stroke="#39ff6a" strokeWidth="1.5" markerEnd="url(#arrowCookie2)" />
          <text x={320} y={80} fill="#39ff6a" fontSize="12" textAnchor="middle">② Set-Cookie: id=abc123</text>

          <line x1={150} y1={140} x2={490} y2={140} stroke="#39ff6a" strokeWidth="1.5" markerEnd="url(#arrowCookie1b)" />
          <text x={320} y={130} fill="#39ff6a" fontSize="12" textAnchor="middle">③ Cookie: id=abc123</text>

          <text x={320} y={175} fill="#9a9a9a" fontSize="11" textAnchor="middle">サーバーは値(id=abc123)を手がかりに「さっきの人だ」と判定する</text>

          <defs>
            <marker id="arrowCookie1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#9a9a9a" />
            </marker>
            <marker id="arrowCookie1b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#39ff6a" />
            </marker>
            <marker id="arrowCookie2" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto">
              <path d="M6,0 L0,3 L6,6 Z" fill="#39ff6a" />
            </marker>
          </defs>
        </svg>
      </Diagram>

      <p>サーバーは「あなたを覚えている」わけではなく、「毎回渡された値を見て思い出している」だけです。この値は<Term>セッションID</Term>と呼ばれることが多く、サーバー側ではこの値を鍵にしてログイン中のユーザー情報などを引き当てます。</p>
      <p>Cookieには、いつまで有効か・どのサイトに送るかなどを決める<Term>属性</Term>を付けられます。</p>

      <table>
        <tbody>
          <tr><th>属性</th><th>役割</th></tr>
          <tr><td className="hl">Expires / Max-Age</td><td>Cookieの有効期限を指定する</td></tr>
          <tr><td className="hl">Domain / Path</td><td>どのホスト名・どのパス宛てのリクエストに送るかを絞り込む</td></tr>
          <tr><td className="hl">Secure</td><td>HTTPS通信のときだけ送信する</td></tr>
          <tr><td className="hl">HttpOnly</td><td>JavaScriptからは読み取れないようにする</td></tr>
          <tr><td className="hl">SameSite</td><td>他サイトを起点とするリクエストには送らないよう制限する</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        Cookieは「毎回、前回渡した整理券を見せてください」という仕組みです。お店(サーバー)は最初の来店時に整理券(Cookie)を渡し、次に来店したときお客さん(ブラウザ)がその整理券を提示することで、「あ、さっきの人だ」とわかります。店員自身がお客さんの顔を覚えているわけではない ― これがステートレスなHTTPの上でCookieが状態を作り出す仕組みです。
      </Analogy>

      <Aside label="豆知識">
        Secure・HttpOnly・SameSiteといった属性を、盗聴・XSS・CSRFという具体的な脅威からどう守るために使うかは、後の「セキュリティ」カテゴリの<Link href="/security/session">セッションとCookie管理</Link>で詳しく扱います。
      </Aside>

      <Heading num="08">オリジン ― 「同じサイト」の境界線</Heading>
      <p>Cookieは「同じサイトへのリクエストに自動で送り返される」と説明しましたが、そもそも「同じサイト」とはどこまでを指すのでしょうか。ブラウザはこれを<Term>オリジン(Origin)</Term>という単位で区別しています。</p>
      <p>オリジンは、URLの<Term>スキーム</Term>・<Term>ホスト名</Term>・<Term>ポート番号</Term>という3つの組み合わせで決まります。3つすべてが一致して初めて<Term>同一オリジン</Term>、1つでも異なれば<Term>クロスオリジン(別オリジン)</Term>です。</p>

      <table>
        <tbody>
          <tr><th>基準URL</th><th>比較するURL</th><th>違い</th><th>判定</th></tr>
          <tr><td rowSpan={4}><code>https://shop.example.com</code></td><td><code>https://shop.example.com/cart</code></td><td>パスが違うだけ</td><td className="hl">同一オリジン</td></tr>
          <tr><td><code>http://shop.example.com</code></td><td>スキームが違う(https→http)</td><td className="hl">クロスオリジン</td></tr>
          <tr><td><code>https://shop.example.com:8080</code></td><td>ポート番号が違う</td><td className="hl">クロスオリジン</td></tr>
          <tr><td><code>https://blog.example.com</code></td><td>ホスト名(サブドメイン)が違う</td><td className="hl">クロスオリジン</td></tr>
        </tbody>
      </table>

      <p>ブラウザには<Term>同一オリジンポリシー</Term>という基本ルールが組み込まれています。あるオリジンで開いたページのJavaScriptは、原則として別オリジンのCookieやページの中身を自由に読み取れません。「異なるサイト」を指す<Term>クロスサイト</Term>という言葉も、基本的にはこのオリジンの違いを指しています。</p>

      <Analogy label="💡 たとえるなら">
        オリジンは「建物の住所」のようなものです。同じ住所(同一オリジン)の住人同士は互いの部屋を行き来できますが、違う住所(クロスオリジン)の人が勝手に他人の部屋に入って郵便物(Cookie)を盗み見ることは、原則としてできません。
      </Analogy>

      <Aside label="豆知識">
        このオリジンという境界をすり抜けたり悪用したりする攻撃、あるいは意図的に境界を緩める仕組み(CORS)については、後の「セキュリティ」カテゴリの<Link href="/security/csrf">CSRF対策</Link>・<Link href="/security/xss">XSS</Link>で登場します。
      </Aside>

      <Heading num="09">HTTPとHTTPS ― 通信を守るTLS/SSL</Heading>
      <p><Term>HTTP</Term>はそのままだと通信内容が暗号化されていません。途中の経路で盗聴・改ざんされるリスクがあります。そこで<Term>TLS(旧称SSL)</Term>という暗号化の仕組みをHTTPに組み合わせたものが<Term>HTTPS</Term>です。ブラウザのアドレスバーに鍵マークが表示されているのは、この暗号化された通信が使われている印です。</p>

      <Analogy label="💡 たとえるなら">
        HTTPが「誰でも読めるはがき」だとすれば、HTTPSは「鍵付きの封筒に入れた手紙」です。配達経路の途中で誰かが盗み見ようとしても、中身は暗号化されていて読めません。
      </Analogy>

      <Aside label="くわしくは">
        SSLとTLSの違い、証明書、ClientHelloからFinishedまでの<Term>TLSハンドシェイク</Term>の流れは「<Link href="/network/applications/tls">SSL/TLSとTLSハンドシェイク</Link>」で詳しく扱います。
      </Aside>

      <Heading num="10">DOMとレンダリング ― 受け取ったデータを画面に描く</Heading>
      <p>HTTPレスポンスとしてHTML・CSS・JavaScriptを受け取ったブラウザは、それらを解釈して実際の画面を組み立てます。この一連の処理を<Term>レンダリング</Term>と呼びます。</p>
      <p>まずブラウザは、届いたHTML文字列を解析(パース)し、<Term>DOM(Document Object Model)</Term>と呼ばれる木構造のオブジェクトに変換します。DOMは「文書の中身をプログラムから読み書きできる形にした設計図」で、JavaScriptが<code>document.querySelector(...)</code>のようなコードで画面を書き換えられるのは、操作対象がこのDOMという実体だからです。同時にCSSも解析され、<Term>CSSOM(CSS Object Model)</Term>という、同じく木構造のスタイル情報に変換されます。</p>

      <Diagram caption="HTML→DOM、CSS→CSSOMへと解析され、両者を合わせてレンダーツリーが組み立てられる">
        <svg viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={20} width={140} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={90} y={47} fill="#f2f2f2" fontSize="12" textAnchor="middle">HTML</text>
          <rect x={20} y={120} width={140} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={90} y={147} fill="#f2f2f2" fontSize="12" textAnchor="middle">CSS</text>

          <rect x={250} y={20} width={140} height={44} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={47} fill="#f2f2f2" fontSize="12" textAnchor="middle">DOM</text>
          <rect x={250} y={120} width={140} height={44} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={147} fill="#f2f2f2" fontSize="12" textAnchor="middle">CSSOM</text>

          <rect x={470} y={70} width={150} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={545} y={92} fill="#f2f2f2" fontSize="12" textAnchor="middle">レンダーツリー</text>
          <text x={545} y={108} fill="#9a9a9a" fontSize="9" textAnchor="middle">画面に表示される要素だけ</text>

          <line x1={160} y1={42} x2={248} y2={42} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowDom)" />
          <line x1={160} y1={142} x2={248} y2={142} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowDom)" />
          <line x1={390} y1={50} x2={468} y2={85} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowDom)" />
          <line x1={390} y1={135} x2={468} y2={105} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowDom)" />
          <defs>
            <marker id="arrowDom" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>

      <Steps>
        <li><strong>① HTML解析→DOM構築</strong>タグの親子関係をそのまま木構造にする</li>
        <li><strong>② CSS解析→CSSOM構築</strong>どのセレクタにどのスタイルが効くかを木構造にする</li>
        <li><strong>③ レンダーツリー構築</strong>DOMとCSSOMを組み合わせ、<code>display: none</code>などの非表示要素を除いた「実際に描く要素」だけのツリーを作る</li>
        <li><strong>④ レイアウト(reflow)</strong>各要素の正確な位置とサイズをピクセル単位で計算する</li>
        <li><strong>⑤ ペイント</strong>文字・色・影といった見た目のピクセルを描く</li>
        <li><strong>⑥ コンポジット</strong>描かれた複数の層(レイヤー)を正しい重なり順で合成し、画面に表示する</li>
      </Steps>

      <p>ページ表示後にJavaScriptがDOMを書き換えると(要素の追加、クラスの切り替えなど)、その変更内容に応じてレイアウト以降の工程がやり直されます。位置やサイズに関わる変更は<Term>リフロー</Term>、色など見た目だけの変更は<Term>リペイント</Term>と呼ばれ、リフローの方がやり直す範囲が広くコストの高い処理です。ページの表示や操作が重いと感じるとき、原因の多くはこのリフローが何度も引き起こされていることにあります。</p>

      <Analogy label="💡 たとえるなら">
        DOMは「舞台の設計図(どこに何を置くか)」、CSSOMは「衣装・照明の指示書」です。この2つを重ね合わせて舞台の完成形(レンダーツリー)を決め、実際に役者を配置し(レイアウト)、色を塗り(ペイント)、幕を上げる(コンポジット)ことで、私たちが見ている画面ができあがります。
      </Analogy>

      <p>HTML・CSSそのものの詳しい書き方や、DOMを直接書き換える代わりにReactなどのフレームワークがどう画面更新を効率化しているかは、次のカテゴリ「実装」で扱います。</p>

      <Heading num="まとめ">Webはリレーでできている</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>URLは住所の集合体</h4><p>スキーム・ホスト名・パス・クエリ・フラグメントがそれぞれ別の役割を持っています。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>DNSが名前を住所に変換する</h4><p>人間に優しい名前と、コンピュータが使うIPアドレスの橋渡しをしています。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>リクエストとレスポンスは対になっている</h4><p>どちらも「1行のサマリー(ライン)+ヘッダ+ボディ」という共通の形をしています。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>Cookieが状態を橋渡しする</h4><p>ステートレスなHTTPの上で、Set-Cookie/Cookieヘッダの往復がログインなどの「状態」を作り出します。</p></Card>
        <Card><CardNumber>5</CardNumber><h4>オリジンがサイトの境界</h4><p>スキーム・ホスト名・ポート番号がすべて一致するときだけ、ブラウザは「同じサイト」とみなします。</p></Card>
        <Card><CardNumber>6</CardNumber><h4>DOMは画面の設計図</h4><p>HTML/CSSはDOM/CSSOMというツリーに変換され、レイアウト→ペイント→コンポジットを経て画面になります。</p></Card>
      </CardGrid>
      <p>ここまでの説明の中には、DNSの問い合わせ結果や<code>Cache-Control</code>ヘッダなど、「キャッシュ」という言葉が繰り返し登場していました。最後のページでは、これら各所に散らばったキャッシュを1枚の地図に整理する「<Link href="/dev/cache">キャッシュの全体像</Link>」を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/network/layers" tag="ネットワーク">階層モデル ― OSI参照モデルとTCP/IP</RelatedLink>
                    <RelatedLink href="/network/internet/history" tag="インターネット">インターネットの歴史</RelatedLink>
                    <RelatedLink href="/os" tag="OS">OSの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
