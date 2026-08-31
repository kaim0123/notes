import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "HTTP通信" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>HTTP通信 ― Fetchとaxios、そしてその上の層</h1>
        <Lead>
          ページを最初に表示する通信はブラウザが自動で行いますが、「ボタンを押したら最新のデータだけ取りに行く」通信は自分で書きます。その道具が<Term>Fetch API</Term>と<Term>axios</Term>です。両者の違いは機能の多寡ではなく、<Term>どこまでを自分で書き、どこからを道具に任せるか</Term>の線引きにあります。
        </Lead>
      </Hero>

      <p>
        非同期処理そのものの仕組みは<Link href="/language/js-async">非同期処理</Link>、ブラウザが提供するAPI群としての位置づけは<Link href="/language/js-browser">ブラウザ ― Web API</Link>で扱いました。ここはその道具を実務でどう使うかです。
      </p>

      <Heading num="01">Fetch ― 標準で入っている最小の道具</Heading>
      <p>
        <code>fetch()</code>はブラウザにもNode.jsにも最初から入っていて、Promiseを返します。<code>async/await</code>と自然に組み合わさり、追加の依存も要りません。
      </p>

      <pre>
        <code>{`async function getUsers() {
  const res = await fetch("https://api.example.com/users");

  // fetch は通信自体が失敗しない限り例外を投げない。
  // 404 や 500 かどうかは自分で確認する。
  if (!res.ok) throw new Error(\`HTTP error: \${res.status}\`);

  // 本文はまだ生のストリーム。.json() で読み出す(これも Promise)
  return res.json();
}`}</code>
      </pre>

      <Aside label="⚠️ Fetchの2つの落とし穴">
        1つ目は<Term>4xx・5xxでも例外を投げない</Term>こと。サーバーが「見つからない」と正しく答えた時点で通信は成功しているためです。<code>res.ok</code>のチェックを書き忘れると、エラーページのHTMLをJSONとして解析しようとして、意味不明な例外だけが残ります。2つ目は<Term>本文の取り出しに一手間かかる</Term>ことで、<code>res.json()</code>や<code>res.text()</code>を明示的に呼ぶ必要があります。
      </Aside>

      <p>
        送信側はオプションで<code>method</code>・<code>headers</code>・<code>body</code>を指定します。オブジェクトは自分で文字列化します。
      </p>

      <pre>
        <code>{`await fetch("https://api.example.com/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name }),   // 手動で文字列化
});`}</code>
      </pre>

      <Heading num="02">中断とタイムアウト</Heading>
      <p>
        Fetchにタイムアウトのオプションはありませんが、<Term>AbortController</Term>で中断できます。これは単なるタイムアウトの代替ではなく、<Term>画面から離れたら通信をやめる</Term>ための基本部品でもあります。
      </p>

      <pre>
        <code>{`const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 5000);

try {
  const res = await fetch(url, { signal: controller.signal });
  return await res.json();
} finally {
  clearTimeout(timer);
}`}</code>
      </pre>

      <p>
        Reactでは、この<code>signal</code>を<Link href="/frontend/react-effects">Effect</Link>のクリーンアップと組み合わせます。検索欄に文字を打つたびに走るリクエストは、<Term>古い応答が新しい応答を上書きする</Term>順序の逆転を起こしがちで、中断はその最も素直な対処です。
      </p>

      <Heading num="03">axios ― 共通処理を1か所に寄せる</Heading>
      <p>
        axiosは、Fetchで自分が書くことになる部分を肩代わりします。JSON変換、エラー応答の例外化、タイムアウト ― どれも自作できますが、通信の記述が多いプロジェクトでは既製品に寄せたほうが揃います。
      </p>

      <pre>
        <code>{`import axios from "axios";

// 共通設定を持つ「専用のaxios」を作る
const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
});

// すべてのリクエストに認証トークンを自動付与
api.interceptors.request.use((config) => {
  config.headers.Authorization = \`Bearer \${getToken()}\`;
  return config;
});

const users = (await api.get("/users")).data;  // .json() は不要`}</code>
      </pre>

      <table>
        <thead>
          <tr><th>観点</th><th>Fetch API</th><th>axios</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">導入</td><td>不要(標準搭載)</td><td>依存が1つ増える</td></tr>
          <tr><td className="hl">JSON変換</td><td><code>res.json()</code>を自分で呼ぶ</td><td><code>res.data</code>に変換済み</td></tr>
          <tr><td className="hl">4xx / 5xx</td><td>例外を投げない</td><td>自動で例外を投げる</td></tr>
          <tr><td className="hl">タイムアウト</td><td><code>AbortController</code>で自作</td><td>オプションで指定</td></tr>
          <tr><td className="hl">共通処理</td><td>ラッパー関数を自前で書く</td><td>インターセプターで一元化</td></tr>
          <tr><td className="hl">進捗の取得</td><td>ストリームを自分で読む</td><td>アップロード進捗が標準で取れる</td></tr>
        </tbody>
      </table>

      <p>
        なお、Fetchでも<Term>薄いラッパーを1つ書く</Term>だけで同じことはできます。実際に多くのプロジェクトが<code>apiFetch()</code>のような自前関数を持っており、依存を増やさずに共通処理を寄せる選択も十分現実的です。
      </p>

      <Heading num="04">エラーを型として扱う</Heading>
      <p>
        どちらを使うにせよ、通信の失敗は<Term>1種類ではありません</Term>。ここを1つの<code>catch</code>で潰すと、利用者に出せるメッセージが「エラーが発生しました」しか残らなくなります。
      </p>

      <table>
        <thead>
          <tr><th>失敗の種類</th><th>利用者に何を伝えるか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ネットワーク到達不能</td><td>接続を確認して再試行 ― 自動リトライの対象</td></tr>
          <tr><td className="hl">401 / 403</td><td>ログインし直す・権限がない ― リトライしても無駄</td></tr>
          <tr><td className="hl">404</td><td>対象が無い ― 画面ごと「見つかりません」に切り替える</td></tr>
          <tr><td className="hl">422 などの検証エラー</td><td>どの項目が悪いかをフォームの該当欄に返す</td></tr>
          <tr><td className="hl">5xx</td><td>こちらの落ち度 ― 少し待って再試行、記録も残す</td></tr>
          <tr><td className="hl">中断</td><td>そもそもエラーではない。何も表示しない</td></tr>
        </tbody>
      </table>

      <p>
        最後の行が抜けがちです。画面を離れたことによる中断を「通信エラー」として表示すると、遷移のたびに赤いトーストが出る、という残念な挙動になります。
      </p>

      <Heading num="05">生の通信を直接は書かなくなる</Heading>
      <p>
        実際のアプリでは、コンポーネントから<code>fetch</code>を直接呼ぶ場面はむしろ減ります。取得したデータは<Term>キャッシュされ、共有され、再検証される</Term>必要があり、それを毎回手で書くと同じコードが散らばるからです。
      </p>

      <DiagramFrame
        slug="frontend-http-layers"
        aspect="640 / 290"
        caption="HTTP通信のまわりにできる層を示した図。いちばん下がブラウザ標準のfetchで、その上に共通設定や認証付与をまとめるHTTPクライアント層、さらに上にキャッシュ・重複排除・再検証・再試行を受け持つデータ取得層が乗り、いちばん上のコンポーネントはデータと状態だけを受け取る。上の層ほど、書かなくて済むことが増える代わりに、下で何が起きているかが見えにくくなる。障害の切り分けでは下へ降りて確認することになる。"
      />

      <table>
        <thead>
          <tr><th>層</th><th>受け持つこと</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Fetch / axios</td><td>1回のリクエストを送り、応答を受け取る</td></tr>
          <tr><td className="hl">HTTPクライアント層</td><td>共通の基底URL・認証・エラー正規化</td></tr>
          <tr><td className="hl">データ取得層</td><td>キャッシュ・重複排除・再検証・再試行・読み込み状態</td></tr>
          <tr><td className="hl">コンポーネント</td><td>受け取った値を表示する</td></tr>
        </tbody>
      </table>

      <p>
        上の層に任せるほど書く量は減りますが、<Term>下で何が起きているかは見えなくなります</Term>。だからこそ、この土台の挙動 ― <code>res.ok</code>を見ないと分からないこと、中断できること ― を知っておく価値があります。データ取得層の設計は<Link href="/frontend/state">状態管理設計</Link>と<Link href="/frontend/nextjs-data">データフェッチ・キャッシュ・再検証</Link>で扱います。
      </p>

      <Analogy label="💡 たとえるなら">
        Fetchは家に最初から付いている蛇口です。追加費用なしで水は出ますが、湯温の調整や浄水は自分でやります。axiosは後付けの高機能水栓 ― 温度調整(タイムアウト)や浄水(自動変換・例外化)をまとめて引き受けます。そしてデータ取得層は、家中に配管された給湯システムです。蛇口をひねる作業すら意識しなくなりますが、水が出ないときに見るのは結局いちばん下の配管です。
      </Analogy>

      <Heading num="まとめ">任せる範囲を意識して選ぶ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>Fetchは例外を投げない</h4>
          <p><code>res.ok</code>を見ないと、エラー応答を成功として処理してしまう。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>中断は基本部品</h4>
          <p>タイムアウトだけでなく、画面を離れたときの後始末と応答の順序逆転にも効く。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>失敗を1種類にまとめない</h4>
          <p>再試行してよいか、利用者に何を頼むかは、失敗の種類ごとに違う。</p>
        </Card>
      </CardGrid>

      <p>
        次は、クライアントから訊きに行くのではなく<Link href="/frontend/realtime">サーバーから届く更新を受け取る</Link>方法を見ていきます。
      </p>

      <DocsFooter href="/frontend/http" />
    </DocsPage>
  );
}
