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
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ブラウザストレージ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>ブラウザストレージ ― 何を、どこに、いつまで置くか</h1>
        <Lead>
          <Link href="/dev/frontend/state">状態管理設計</Link>では、状態を種類で分けて置き場所を選びました。その中で「リロードしても消えてほしくない」ものだけが、ブラウザ側の永続領域に降りてきます。<Term>Cookie</Term>・<Term>localStorage</Term>・<Term>sessionStorage</Term>・<Term>IndexedDB</Term>は、容量も寿命もサーバーへの送られ方も違います。取り違えると、消えてほしいデータが残り、守るべきデータが盗まれます。
        </Lead>
      </Hero>

      <Heading num="01">選択肢を並べる</Heading>
      <p>まず全体像です。決定的な違いは<strong>「サーバーへ自動送信されるか」</strong>と<strong>「いつ消えるか」</strong>の2点です。</p>
      <table>
        <thead>
          <tr><th>置き場所</th><th>容量</th><th>寿命</th><th>サーバーへ送信</th><th>JSから読める</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">メモリ(変数・state)</td><td>制限なし</td><td>リロードで消える</td><td>しない</td><td>読める</td></tr>
          <tr><td className="hl">Cookie</td><td>約4KB</td><td>属性で指定</td><td><strong>毎回自動で送る</strong></td><td>HttpOnlyなら読めない</td></tr>
          <tr><td className="hl">sessionStorage</td><td>約5MB</td><td>タブを閉じるまで</td><td>しない</td><td>読める</td></tr>
          <tr><td className="hl">localStorage</td><td>約5MB</td><td><strong>明示的に消すまで永久</strong></td><td>しない</td><td>読める</td></tr>
          <tr><td className="hl">IndexedDB</td><td>数百MB〜</td><td>明示的に消すまで</td><td>しない</td><td>読める</td></tr>
          <tr><td className="hl">Cache Storage</td><td>数百MB〜</td><td>明示的に消すまで</td><td>しない</td><td>読める</td></tr>
        </tbody>
      </table>
      <p>いずれも<Term>オリジン</Term>(スキーム+ホスト+ポート)ごとに隔離されます。<code>https://example.com</code>が保存したものを<code>https://other.com</code>から読むことはできません ― これが<Link href="/security/basics">同一オリジンポリシー</Link>による基本的な保護です。</p>

      <Heading num="02">Cookie ― サーバーが主役の領域</Heading>
      <p>Cookieだけは性質が異なります。<strong>同じオリジンへのリクエストに自動で添付される</strong>ため、サーバーが「誰からのリクエストか」を判断する手段になります。だからこそ、<Link href="/security/session-cookie">セッション</Link>の担い手として使われます。</p>
      <p>逆に言えば、Cookieに入れたものは<strong>すべての画像・CSS・APIリクエストに毎回付いて回ります</strong>。容量が4KBしかないのは、そのためです。「ただ保存したいだけ」のデータをCookieに入れてはいけません。</p>
      <table>
        <thead>
          <tr><th>属性</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>HttpOnly</code></td><td><strong>JavaScriptから読めなくする</strong>。<Link href="/security/xss">XSS</Link>が起きても盗まれない</td></tr>
          <tr><td className="hl"><code>Secure</code></td><td>HTTPSでのみ送信する</td></tr>
          <tr><td className="hl"><code>SameSite=Lax</code></td><td>他サイトからのリクエストには原則送らない。<Link href="/security/csrf">CSRF</Link>対策の基本(既定値)</td></tr>
          <tr><td className="hl"><code>SameSite=Strict</code></td><td>他サイトからの遷移でも一切送らない。安全だがログイン状態が切れて見える</td></tr>
          <tr><td className="hl"><code>SameSite=None</code></td><td>クロスサイトでも送る。<code>Secure</code>必須。使うなら理由を明確に</td></tr>
          <tr><td className="hl"><code>Max-Age</code> / <code>Expires</code></td><td>有効期限。無指定なら<Term>セッションCookie</Term>(ブラウザを閉じるまで)</td></tr>
          <tr><td className="hl"><code>Path</code> / <code>Domain</code></td><td>送信対象の範囲。広げすぎるとサブドメインへ漏れる</td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// サーバー側で発行する(Express)
res.cookie("session", sessionId, {
  httpOnly: true,   // JS から触らせない
  secure: true,     // HTTPS のみ
  sameSite: "lax",  // CSRF 対策
  maxAge: 1000 * 60 * 60 * 24 * 7,
  path: "/",
});`}</code>
      </pre>

      <Heading num="03">Web Storage ― 手軽だが同期API</Heading>
      <p><code>localStorage</code>と<code>sessionStorage</code>は同じAPIを持ち、<strong>寿命だけが違います</strong>。<code>sessionStorage</code>はタブ単位で、タブを閉じれば消え、別タブとも共有されません。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 文字列しか保存できないので JSON にする
localStorage.setItem("theme", "dark");
localStorage.setItem("draft", JSON.stringify({ title: "", body: "" }));

const theme = localStorage.getItem("theme");        // null の可能性がある
const draft = JSON.parse(localStorage.getItem("draft") ?? "null");`}</code>
      </pre>
      <p>手軽さと引き換えに、2つの弱点があります。1つは<strong>同期APIである</strong>こと ― 読み書きの間、メインスレッドが止まります。数十KBを毎フレーム書くような使い方をすると、目に見えてカクつきます。もう1つは<strong>文字列しか扱えない</strong>ことで、必ず<code>JSON.parse</code>を経由するため、保存時と読み出し時で形が変わっても型では気付けません。</p>
      <Aside label="堅く扱う">
        <code>localStorage</code>から読んだ値は、<strong>外部からの入力と同じ</strong>だと考えます。前のバージョンのアプリが書いた古い形かもしれませんし、利用者が開発者ツールで書き換えているかもしれません。<Link href="/dev/backend/express/validation">Zod</Link>のようなスキーマで<code>safeParse</code>し、失敗したら既定値に戻すのが安全です。あわせて<code>app:v2:draft</code>のようにキーへバージョンを含めておくと、形式変更時に古い値を無視できます。
      </Aside>
      <p>また、容量超過やプライベートブラウジングの設定で<code>setItem</code>は<strong>例外を投げます</strong>。保存の失敗でアプリ全体が落ちないよう、<code>try/catch</code>で包み、失敗しても機能が継続するようにします。</p>

      <Heading num="04">IndexedDB ― 大きい・構造化・非同期</Heading>
      <p><Term>IndexedDB</Term>は、ブラウザ内蔵のキーバリュー型データベースです。非同期APIで、数百MB規模のデータを扱え、オブジェクトをそのまま(JSON化せずに)保存でき、索引による検索やトランザクションも使えます。</p>
      <p>ただし素のAPIは冗長でイベントベースなので、実務では<code>idb</code>や<code>Dexie</code>のようなPromiseラッパーを使います。</p>
      <table>
        <thead>
          <tr><th>使いどころ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">オフライン対応 ― 通信できない間の閲覧・編集内容の保持</td></tr>
          <tr><td className="hl">大量データのキャッシュ ― 数千件のマスタや検索インデックス</td></tr>
          <tr><td className="hl">画像・ファイルなどのバイナリ(Blob)</td></tr>
        </tbody>
      </table>
      <p>逆に、テーマ設定やサイドバーの開閉状態のような小さな値にIndexedDBを使うのは過剰です。<strong>5MBを超えるか、バイナリか、検索が要るか</strong>が分かれ目になります。</p>

      <Heading num="05">何を置いてよいか ― 置いてはいけないもの</Heading>
      <p>最も事故が多いのがここです。原則は<strong>「JavaScriptから読める場所に、盗まれて困るものを置かない」</strong>です。</p>
      <table>
        <thead>
          <tr><th>データ</th><th>置き場所</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">セッションID・認証トークン</td><td><strong>HttpOnly Cookie</strong></td><td>localStorageはXSSで丸ごと読み出せる</td></tr>
          <tr><td className="hl">個人情報・機密データ</td><td>置かない(サーバーに置く)</td><td>共有端末では次の利用者が読める</td></tr>
          <tr><td className="hl">テーマ・言語・表示設定</td><td>localStorage(またはCookie)</td><td>漏れても害がなく、次回も残ってほしい</td></tr>
          <tr><td className="hl">入力中の下書き</td><td>localStorage / IndexedDB</td><td>誤って閉じたときの救済。送信後は消す</td></tr>
          <tr><td className="hl">フォームの一時的な入力途中</td><td>sessionStorage</td><td>タブを閉じたら残ってほしくない</td></tr>
          <tr><td className="hl">直前に見ていたページ・スクロール位置</td><td>sessionStorage</td><td>タブ単位の文脈だから</td></tr>
          <tr><td className="hl">検索条件・タブの選択</td><td><strong>URL(クエリパラメータ)</strong></td><td>共有・リロード・戻るボタンが自然に効く</td></tr>
        </tbody>
      </table>
      <Aside label="⚠️ JWTをlocalStorageに置く問題">
        「トークン認証だからlocalStorageに保存する」という解説は多く見かけますが、<Link href="/security/xss">XSS</Link>が1箇所でもあれば全ユーザーのトークンが抜き取れる構造になります。<code>HttpOnly</code>Cookieに入れれば、少なくともJSからは読めません。SPAでCookieを使う場合は<Link href="/security/csrf">CSRF</Link>対策(<code>SameSite</code>とトークン照合)が必要になるので、<strong>どちらの攻撃を防ぐかではなく、両方を塞ぐ</strong>設計にします。詳しくは<Link href="/dev/backend/auth/token">トークンの運用</Link>で扱います。
      </Aside>

      <Heading num="06">サーバーサイドレンダリングとの衝突</Heading>
      <p><Link href="/dev/frontend/nextjs/components">Server Components</Link>やSSRを使う場合、決定的な制約があります。<strong>サーバー側にはlocalStorageもCookieのJS APIも存在しません</strong>。</p>
      <p>サーバーで描いたHTMLと、クライアントで<code>localStorage</code>を読んで描いた結果が食い違うと、<Term>ハイドレーションの不一致</Term>としてエラーになります。テーマ切り替えで一瞬白い画面が光る(flash)のも同じ原因です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// ✗ サーバーでは undefined、クライアントでは値がある → 不一致になる
const [theme] = useState(localStorage.getItem("theme"));

// ○ 初回描画はサーバーと同じ既定値にし、マウント後に読み直す
const [theme, setTheme] = useState<Theme>("light");
useEffect(() => {
  setTheme((localStorage.getItem("theme") as Theme) ?? "light");
}, []);`}</code>
      </pre>
      <p>この「一瞬ちらつく」問題を根本から避けたいなら、<strong>設定をCookieに置く</strong>のが有効です。Cookieならサーバー側のレンダリング時点で読めるため、最初のHTMLから正しいテーマで描けます。「サーバーが知っている必要があるか」がCookieとlocalStorageを分ける実務上の基準になります。</p>

      <Heading num="07">消える前提で設計する</Heading>
      <p>ブラウザストレージは<strong>永続的な保管庫ではありません</strong>。利用者が履歴を消せば消え、プライベートウィンドウでは残らず、容量が逼迫すればブラウザが自動で退避させることもあります。Safariでは、一定期間アクセスの無いサイトのストレージが自動削除される制限もあります。</p>
      <table>
        <thead>
          <tr><th>前提</th><th>設計への影響</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">いつ消えてもおかしくない</td><td>失われて困るデータは必ずサーバーにも保存する</td></tr>
          <tr><td className="hl">端末ごとに独立している</td><td>PCで設定した内容はスマホには反映されない。同期したいならサーバーへ</td></tr>
          <tr><td className="hl">利用者が書き換えられる</td><td>権限や価格などの<strong>判断材料をクライアントに置かない</strong></td></tr>
          <tr><td className="hl">共有端末では次の人が見る</td><td>ログアウト時に自分が書いたキーを明示的に消す</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        Cookieは、会員証を首から下げて店に入るようなものです ― 提示しなくても、店員には常に見えています。だから小さく、そして他人に取られない工夫(HttpOnly)が要ります。localStorageは自宅の引き出しで、大きなものも入りますが、誰かが家に入り込めば(XSS)中身は全部見られます。sessionStorageはその日のコインロッカーで、帰るときには空になります。そしてIndexedDBは倉庫です ― 広いぶん、出し入れの手続き(非同期)が必要になります。
      </Analogy>

      <Heading num="まとめ">送るならCookie、残すならStorage</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>自動送信の有無で選ぶ</h4><p>サーバーが知る必要があるならCookie、クライアントだけで足りるならStorage。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>認証情報はHttpOnly Cookieへ</h4><p>localStorageはXSSで丸ごと読める。トークンを置く場所ではない。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>読み出す値は検証する</h4><p>古い形式・改ざん・容量超過を前提に、スキーマ検証と例外処理で守る。</p></Card>
      </CardGrid>
      <p>ここまでで、通信の手段とデータの置き場所が揃いました。次は視点を変えて、その画面が使いやすいかを考える<Link href="/dev/frontend/ux">UX/UI設計</Link>へ進みます。実装に戻ったあと、失敗したときの表示は<Link href="/dev/frontend/react/boundary">エラー境界とフォールバックUI</Link>で扱います。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/security/session-cookie" tag="セキュリティ">セッション・Cookieの全体像</RelatedLink>
            <RelatedLink href="/dev/frontend/state" tag="フロントエンド">状態管理設計</RelatedLink>
            <RelatedLink href="/dev/cache" tag="実装">キャッシュの全体像</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
