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
  title: "HTTP通信 ― Fetch APIとaxios",
};

const codeBlock =
  "my-5 overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed";

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>HTTP通信 ― Fetch APIとaxios</h1>
        <Lead>
          「<Link href="/dev/language">JavaScript・TypeScript</Link>」の非同期処理と、「<Link href="/dev/runtime">ランタイム</Link>」のWeb APIで、JavaScriptが待ち時間の間も画面を止めずに通信できることを見ました。この記事では、その通信を実際に行う道具である<Term>Fetch API</Term>とライブラリの<Term>axios</Term>を取り上げ、両者の違いと使い分けを整理します。
        </Lead>
      </Hero>

      <Heading num="01">HTTPクライアント ― サーバーにリクエストを送る道具</Heading>
      <p>「コンピュータ基礎」の「<Link href="/network/applications/web">Webの仕組み</Link>」で見たように、ブラウザとサーバーは<Term>HTTP</Term>という約束事に沿ってやりとりします。ページを最初に表示するときはブラウザがこの通信を自動で行いますが、表示後に「ボタンを押したら最新のデータだけを取りに行く」といった通信は、JavaScriptから自分でリクエストを送る必要があります。この「サーバーにHTTPリクエストを送り、レスポンスを受け取る」役割を担うのが<Term>HTTPクライアント</Term>です。</p>
      <p>JavaScriptでの書き方は世代を経て変化してきました。まずは全体像を押さえます。</p>
      <table>
        <thead>
          <tr><th>世代</th><th>正体</th><th>位置づけ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>XMLHttpRequest</code></td><td>ブラウザ標準の古いAPI</td><td>コールバックが複雑で、現在は直接書くことは少ない</td></tr>
          <tr><td className="hl"><code>Fetch API</code></td><td>ブラウザ標準の新しいAPI</td><td>Promiseベースで書ける、現在の標準</td></tr>
          <tr><td className="hl"><code>axios</code></td><td>サードパーティのライブラリ</td><td>Fetchの不便さを補う機能をまとめた定番の道具</td></tr>
        </tbody>
      </table>
      <p><code>XMLHttpRequest</code>(通称<Term>XHR</Term>)は、ページ全体を再読み込みせずに通信する<Term>Ajax</Term>という手法を支えた立役者ですが、書き方が煩雑でコールバックが入れ子になりがちでした。今から新しく書くならFetchかaxiosを使うため、本記事ではこの2つを比べます。</p>

      <Heading num="02">Fetch API ― ブラウザに標準搭載された通信手段</Heading>
      <p><Term>Fetch API</Term>は、ブラウザやNode.jsに最初から備わっている<code>fetch()</code>関数です。追加のインストールが不要で、<Link href="/dev/language">非同期処理</Link>で見た<Term>Promise</Term>を返すため、<code>async/await</code>と自然に組み合わせられます。</p>
      <pre className={codeBlock}>
        <code>{`// GET: ユーザー一覧を取得する
async function getUsers() {
  const res = await fetch("https://api.example.com/users");

  // fetchは通信自体が失敗しない限り例外を投げない。
  // 404や500かどうかは res.ok / res.status で自分で確認する。
  if (!res.ok) {
    throw new Error(\`HTTP error: \${res.status}\`);
  }

  // 本文はまだ生のストリーム。.json()でJSONに変換する(これもPromise)。
  const users = await res.json();
  return users;
}`}</code>
      </pre>
      <p>POSTでデータを送るときは、第2引数の<Term>オプションオブジェクト</Term>で<code>method</code>・<code>headers</code>・<code>body</code>を指定します。送るデータは<code>JSON.stringify()</code>で自分で文字列に変換する必要があります。</p>
      <pre className={codeBlock}>
        <code>{`// POST: 新しいユーザーを登録する
async function createUser(name) {
  const res = await fetch("https://api.example.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }), // オブジェクトを手動で文字列化
  });
  return res.json();
}`}</code>
      </pre>

      <Aside label="⚠️ Fetchの2つの落とし穴">
        1つ目は、<b>404や500といったエラー応答でも例外を投げない</b>こと。サーバーが「見つからない」と正しく応答した時点で通信は成功しているため、<code>res.ok</code>のチェックは自分で書く必要があります。2つ目は、<b>本文の取り出しに一手間かかる</b>こと。レスポンスの本文は<code>res.json()</code>や<code>res.text()</code>で明示的に変換します。
      </Aside>

      <Heading num="03">axios ― Fetchの手間を減らすライブラリ</Heading>
      <p><Term>axios</Term>は、<code>npm install axios</code>で導入するサードパーティのHTTPクライアントです(「<Link href="/dev/tooling">パッケージ管理とビルド</Link>」で見たパッケージの1つ)。Fetchでは自分で書く必要のあった処理を、あらかじめ肩代わりしてくれるのが特徴です。同じGET/POSTをaxiosで書くと次のようになります。</p>
      <pre className={codeBlock}>
        <code>{`import axios from "axios";

// GET: レスポンス本文は res.data に、JSON変換済みで入っている
async function getUsers() {
  const res = await axios.get("https://api.example.com/users");
  return res.data; // .json()は不要
}

// POST: オブジェクトをそのまま渡せる(自動でJSON化される)
async function createUser(name) {
  const res = await axios.post("https://api.example.com/users", { name });
  return res.data;
}`}</code>
      </pre>
      <p>axiosは<b>4xx・5xxのエラー応答を自動で例外として投げる</b>ため、<code>try/catch</code>でまとめてエラーを捕まえられます。さらに、すべてのリクエスト・レスポンスに共通処理を挟み込む<Term>インターセプター</Term>を使えば、認証トークンの付与やエラーの共通処理を1か所にまとめられます。</p>
      <pre className={codeBlock}>
        <code>{`// 共通設定を持つ「専用のaxios」を作る
const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000, // 5秒で自動的に打ち切る
});

// すべてのリクエストに認証トークンを自動付与
api.interceptors.request.use((config) => {
  config.headers.Authorization = \`Bearer \${getToken()}\`;
  return config;
});`}</code>
      </pre>

      <Heading num="04">Fetch と axios の違い</Heading>
      <p>両者は「サーバーにHTTPリクエストを送る」という目的は同じですが、どこまでを自分で書き、どこからを道具に任せるかが異なります。</p>
      <table>
        <thead>
          <tr><th>観点</th><th>Fetch API</th><th>axios</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">導入</td><td>不要(標準搭載)</td><td>インストールが必要</td></tr>
          <tr><td className="hl">JSON変換</td><td><code>res.json()</code>を自分で呼ぶ</td><td><code>res.data</code>に変換済み</td></tr>
          <tr><td className="hl">エラー応答(4xx/5xx)</td><td>例外を投げない(<code>res.ok</code>で判定)</td><td>自動で例外を投げる</td></tr>
          <tr><td className="hl">タイムアウト</td><td>標準では無い(<code>AbortController</code>で自作)</td><td><code>timeout</code>オプションで指定可能</td></tr>
          <tr><td className="hl">共通処理</td><td>自前でラッパー関数を書く</td><td>インターセプターで一元化</td></tr>
          <tr><td className="hl">依存</td><td>増えない</td><td>1つ増える(バンドルサイズも増える)</td></tr>
        </tbody>
      </table>
      <p>Fetchの弱点として挙げた「タイムアウトが無い」点は、<code>AbortController</code>を使えば標準機能だけでも実現できます。近年はこうした補助APIが充実し、Fetchだけで書ける範囲が広がっています。</p>
      <pre className={codeBlock}>
        <code>{`// Fetchで5秒のタイムアウトを付ける
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 5000);

const res = await fetch("https://api.example.com/users", {
  signal: controller.signal, // abort()されたら通信を中断
});
clearTimeout(timer);`}</code>
      </pre>

      <Heading num="05">どちらを選ぶか</Heading>
      <p>「常にどちらが正解」というものではなく、プロジェクトの規模と要件で決めます。</p>
      <table>
        <thead>
          <tr><th>状況</th><th>向いている選択</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">依存を増やしたくない・通信が単純</td><td>Fetch API</td></tr>
          <tr><td className="hl">サーバー側(Node.js)や最新のフレームワーク</td><td>Fetch API(標準で使え、フレームワークが機能を拡張していることも多い)</td></tr>
          <tr><td className="hl">認証・エラー処理・タイムアウトを共通化したい</td><td>axios</td></tr>
          <tr><td className="hl">通信の記述が多く、書き味を統一したい</td><td>axios</td></tr>
        </tbody>
      </table>
      <p>実際の開発では、これらを直接使うのではなく、「<Link href="/dev/frontend/nextjs/data">データフェッチ・キャッシュ・再検証</Link>」で扱うような、フレームワークやライブラリが提供するより高レベルな仕組みの内側でFetch/axiosが動いていることも多くあります。土台としてこの2つの違いを理解しておくと、そうした上位の仕組みの挙動も読み解きやすくなります。</p>

      <Analogy label="💡 たとえるなら">
        Fetch APIは、家に最初から付いている「蛇口」です。追加費用なしで水は出ますが、湯温の調整や浄水は自分で行います。axiosは、後付けの「浄水器付き高機能水栓」です。導入の一手間はかかりますが、温度調整(タイムアウト)や浄水(自動JSON変換・エラー処理)をまとめて引き受けてくれます。どちらも「水を出す」目的は同じで、どこまで自動化したいかで選びます。
      </Analogy>

      <Heading num="まとめ">目的は同じ、任せる範囲が違う</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>どちらもHTTPクライアント</h4><p>サーバーにリクエストを送りレスポンスを受け取る、という役割は共通です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Fetchは標準・最小</h4><p>追加不要で使えますが、JSON変換・エラー判定・タイムアウトは自分で書きます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>axiosは便利機能込み</h4><p>自動JSON変換・エラーの例外化・インターセプターを、依存1つと引き換えに手に入れます。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/language" tag="開発">JavaScript・TypeScript</RelatedLink>
                    <RelatedLink href="/dev/frontend/nextjs/data" tag="開発">データフェッチ・キャッシュ・再検証</RelatedLink>
                    <RelatedLink href="/network/applications/web" tag="インターネット">Webの仕組み</RelatedLink>
                    <RelatedLink href="/dev" tag="開発">実装 一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
