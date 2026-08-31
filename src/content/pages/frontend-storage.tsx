import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "ブラウザストレージ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>ブラウザストレージ ― 何を、どこに、いつまで置くか</h1>
        <Lead>
          リロードしても消えてほしくないものだけが、ブラウザ側の永続領域に降りてきます。<Term>Cookie</Term>・<Term>localStorage</Term>・<Term>sessionStorage</Term>・<Term>IndexedDB</Term>は、容量も寿命もサーバーへの送られ方も違います。取り違えると、<Term>消えてほしいデータが残り、守るべきデータが盗まれます</Term>。
        </Lead>
      </Hero>

      <Heading num="01">選択肢を並べる</Heading>
      <p>
        決定的な違いは2点です ― <Term>サーバーへ自動送信されるか</Term>と<Term>いつ消えるか</Term>。
      </p>

      <table>
        <thead>
          <tr><th>置き場所</th><th>容量</th><th>寿命</th><th>サーバーへ送信</th><th>JSから読める</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">メモリ(state)</td><td>制限なし</td><td>リロードで消える</td><td>しない</td><td>読める</td></tr>
          <tr><td className="hl">Cookie</td><td>約4KB</td><td>属性で指定</td><td>毎回自動で送る</td><td>HttpOnlyなら読めない</td></tr>
          <tr><td className="hl">sessionStorage</td><td>約5MB</td><td>タブを閉じるまで</td><td>しない</td><td>読める</td></tr>
          <tr><td className="hl">localStorage</td><td>約5MB</td><td>明示的に消すまで</td><td>しない</td><td>読める</td></tr>
          <tr><td className="hl">IndexedDB</td><td>数百MB〜</td><td>明示的に消すまで</td><td>しない</td><td>読める</td></tr>
          <tr><td className="hl">Cache Storage</td><td>数百MB〜</td><td>明示的に消すまで</td><td>しない</td><td>読める</td></tr>
        </tbody>
      </table>

      <p>
        いずれも<Term>オリジン</Term>(スキーム + ホスト + ポート)ごとに隔離されます。あるサイトが保存したものを別のサイトから読むことはできません。
      </p>

      <Heading num="02">Cookie ― サーバーが主役の領域</Heading>
      <p>
        Cookieだけは性質が異なります。<Term>同じオリジンへのリクエストに自動で添付される</Term>ため、サーバーが「誰からのリクエストか」を判断する手段になります。だからセッションの担い手として使われます。
      </p>
      <p>
        逆に言えば、Cookieに入れたものは<Term>すべての画像・CSS・APIリクエストに毎回付いて回ります</Term>。容量が4KBしかないのはそのためです。「ただ保存したいだけ」のデータをCookieに入れてはいけません。
      </p>

      <table>
        <thead>
          <tr><th>属性</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>HttpOnly</code></td><td>JavaScriptから読めなくする。XSSが起きても盗まれない</td></tr>
          <tr><td className="hl"><code>Secure</code></td><td>HTTPSでのみ送信する</td></tr>
          <tr><td className="hl"><code>SameSite=Lax</code></td><td>他サイトからのリクエストには原則送らない(既定値)</td></tr>
          <tr><td className="hl"><code>SameSite=Strict</code></td><td>他サイトからの遷移でも一切送らない。安全だがログイン状態が切れて見える</td></tr>
          <tr><td className="hl"><code>SameSite=None</code></td><td>クロスサイトでも送る。<code>Secure</code>必須。使うなら理由を明確に</td></tr>
          <tr><td className="hl"><code>Max-Age</code></td><td>有効期限。無指定ならブラウザを閉じるまで</td></tr>
          <tr><td className="hl"><code>Path</code> / <code>Domain</code></td><td>送信対象の範囲。広げすぎるとサブドメインへ漏れる</td></tr>
        </tbody>
      </table>

      <Heading num="03">Web Storage ― 手軽だが同期API</Heading>
      <p>
        <code>localStorage</code>と<code>sessionStorage</code>は同じAPIを持ち、<Term>寿命だけが違います</Term>。<code>sessionStorage</code>はタブ単位で、閉じれば消え、別タブとも共有されません。
      </p>

      <pre>
        <code>{`// 文字列しか保存できないので JSON にする
localStorage.setItem("theme", "dark");
localStorage.setItem("draft", JSON.stringify({ title: "", body: "" }));

const theme = localStorage.getItem("theme");   // null の可能性がある
const draft = JSON.parse(localStorage.getItem("draft") ?? "null");`}</code>
      </pre>

      <p>
        手軽さと引き換えに弱点が2つあります。1つは<Term>同期APIである</Term>こと ― 読み書きの間、メインスレッドが止まります。もう1つは<Term>文字列しか扱えない</Term>ことで、保存時と読み出し時で形が変わっても型では気付けません。
      </p>

      <Aside label="読み出した値は外部入力と同じ">
        <code>localStorage</code>の中身は、前のバージョンのアプリが書いた古い形かもしれませんし、利用者が開発者ツールで書き換えているかもしれません。スキーマで検証し、失敗したら既定値へ戻すのが安全です。あわせて<code>app:v2:draft</code>のようにキーへバージョンを含めておくと、形式変更時に古い値を無視できます。容量超過やプライベートブラウジングでは<code>setItem</code>が<strong>例外を投げる</strong>ので、保存の失敗でアプリが落ちないようにも包みます。
      </Aside>

      <Heading num="04">IndexedDB ― 大きい・構造化・非同期</Heading>
      <p>
        ブラウザ内蔵のキーバリュー型データベースです。非同期APIで、数百MB規模を扱え、オブジェクトをそのまま保存でき、索引による検索やトランザクションも使えます。素のAPIは冗長なので、実務では薄いラッパーを使います。
      </p>
      <p>
        使いどころは、オフライン時の閲覧・編集内容の保持、数千件規模のデータのキャッシュ、画像などのバイナリです。逆にテーマ設定のような小さな値に使うのは過剰で、<Term>5MBを超えるか、バイナリか、検索が要るか</Term>が分かれ目になります。
      </p>

      <Heading num="05">何を置いてよいか</Heading>
      <p>
        最も事故が多いのがここです。原則は<Term>JavaScriptから読める場所に、盗まれて困るものを置かない</Term>。
      </p>

      <DiagramFrame
        slug="frontend-storage-choice"
        aspect="640 / 330"
        caption="保存先を決める判断の流れを示した図。最初の分岐はサーバーが知る必要があるかで、必要ならCookie、それも認証に関わるものはHttpOnly属性を付けてJavaScriptから読めなくする。必要ないなら次の分岐は共有やリロードで復元したいかで、そうならURLのクエリに置く。違えば次はタブを閉じたら消えてほしいかで、そうならsessionStorage。残りは容量の分岐で、5MBを超えるかバイナリならIndexedDB、小さければlocalStorage。図の下に、失われて困るデータは必ずサーバーにも置くという前提が注記されている。"
      />

      <table>
        <thead>
          <tr><th>データ</th><th>置き場所</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">セッションID・認証トークン</td><td>HttpOnly Cookie</td><td>localStorageはXSSで丸ごと読み出せる</td></tr>
          <tr><td className="hl">個人情報・機密データ</td><td>置かない(サーバーに置く)</td><td>共有端末では次の利用者が読める</td></tr>
          <tr><td className="hl">テーマ・言語・表示設定</td><td>localStorage、またはCookie</td><td>漏れても害がなく、次回も残ってほしい</td></tr>
          <tr><td className="hl">入力中の下書き</td><td>localStorage / IndexedDB</td><td>誤って閉じたときの救済。送信後は消す</td></tr>
          <tr><td className="hl">一時的な入力途中</td><td>sessionStorage</td><td>タブを閉じたら残ってほしくない</td></tr>
          <tr><td className="hl">検索条件・タブの選択</td><td>URL(クエリパラメータ)</td><td>共有・リロード・戻るボタンが自然に効く</td></tr>
        </tbody>
      </table>

      <Aside label="⚠️ トークンをlocalStorageに置く問題">
        「トークン認証だからlocalStorageに保存する」という解説は多く見かけますが、XSSが1箇所でもあれば全ユーザーのトークンが抜ける構造になります。<code>HttpOnly</code>Cookieなら少なくともJSからは読めません。CookieにするとCSRF対策が必要になりますが、<Term>どちらの攻撃を防ぐかではなく両方を塞ぐ</Term>のが正しい設計です。原理はセキュリティセクションの担当になります。
      </Aside>

      <Heading num="06">サーバーレンダリングとの衝突</Heading>
      <p>
        サーバー側には<code>localStorage</code>もCookieのJS APIも存在しません。サーバーで描いたHTMLと、クライアントで<code>localStorage</code>を読んで描いた結果が食い違うと、<Term>ハイドレーションの不一致</Term>になります。テーマ切り替えで一瞬ちらつくのも同じ原因です。
      </p>

      <pre>
        <code>{`// ✗ サーバーでは存在しない → 不一致になる
const [theme] = useState(localStorage.getItem("theme"));

// ○ 初回はサーバーと同じ既定値にし、マウント後に読み直す
const [theme, setTheme] = useState<Theme>("light");
useEffect(() => {
  setTheme((localStorage.getItem("theme") as Theme) ?? "light");
}, []);`}</code>
      </pre>

      <p>
        ちらつきそのものを避けたいなら、<Term>設定をCookieに置く</Term>のが有効です。Cookieならサーバー側の描画時点で読めるので、最初のHTMLから正しいテーマで描けます。<Term>サーバーが知っている必要があるか</Term>が、CookieとlocalStorageを分ける実務上の基準になります。
      </p>

      <Heading num="07">消える前提で設計する</Heading>
      <p>
        ブラウザストレージは<Term>永続的な保管庫ではありません</Term>。履歴を消せば消え、プライベートウィンドウでは残らず、容量が逼迫すればブラウザが自動で退避させることもあります。
      </p>

      <table>
        <thead>
          <tr><th>前提</th><th>設計への影響</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">いつ消えてもおかしくない</td><td>失われて困るデータは必ずサーバーにも保存する</td></tr>
          <tr><td className="hl">端末ごとに独立している</td><td>PCの設定はスマホに反映されない。同期したいならサーバーへ</td></tr>
          <tr><td className="hl">利用者が書き換えられる</td><td>権限や価格などの判断材料をクライアントに置かない</td></tr>
          <tr><td className="hl">共有端末では次の人が見る</td><td>ログアウト時に自分が書いたキーを明示的に消す</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        Cookieは、会員証を首から下げて店に入るようなものです ― 提示しなくても店員には常に見えています。だから小さく、そして他人に取られない工夫が要ります。localStorageは自宅の引き出しで、大きなものも入りますが、誰かが家に入り込めば中身は全部見られます。sessionStorageはその日のコインロッカーで、帰るときには空になります。IndexedDBは倉庫 ― 広いぶん、出し入れの手続きが必要になります。
      </Analogy>

      <Heading num="まとめ">送るならCookie、残すならStorage</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>自動送信の有無で選ぶ</h4>
          <p>サーバーが知る必要があるならCookie、クライアントだけで足りるならStorage。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>認証情報はHttpOnly Cookieへ</h4>
          <p>localStorageはXSSで丸ごと読める。トークンを置く場所ではない。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>読み出す値は検証する</h4>
          <p>古い形式・改ざん・容量超過を前提に、スキーマ検証と例外処理で守る。</p>
        </Card>
      </CardGrid>

      <p>
        キャッシュの総論は<Link href="/dev/cache">キャッシュの全体像</Link>に、状態の種類ごとの置き場所は<Link href="/frontend/state">状態管理設計</Link>にあります。通信とデータ保存の配下はここまでです。次の見出し ―
        <Link href="/frontend/ux">UX・UI</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/storage" />
    </DocsPage>
  );
}
