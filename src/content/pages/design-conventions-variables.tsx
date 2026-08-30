import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "変数・略語の命名" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>変数・略語の命名 ― 迷いを減らす基本ルール</h1>
        <Lead>
          変数名は書く回数が最も多く、そのぶん判断の迷いが積み重なる場所です。<Link href="/design/conventions-functions">関数の命名</Link>と同じ語彙を使いつつ、「どこまで略してよいか」「似た動詞のどちらを使うか」という2つの迷いどころに、あらかじめ答えを決めておきます。
        </Lead>
      </Hero>

      <Heading num="01">基本ルール</Heading>
      <p>
        JavaScript/TypeScriptでは<Term>camelCase</Term>を使い、再代入しない値は<code>const</code>、再代入する値は<code>let</code>、<code>var</code>は使いません。
      </p>
      <table>
        <thead>
          <tr><th>種類</th><th>ルール</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">通常の値</td><td>名詞または名詞句</td><td><code>email</code> / <code>postalCode</code></td></tr>
          <tr><td className="hl">真偽値</td><td>is / has / can + 形容詞・名詞</td><td><code>isValid</code> / <code>hasError</code></td></tr>
          <tr><td className="hl">配列</td><td>複数形にする</td><td><code>items</code> / <code>announcements</code></td></tr>
          <tr><td className="hl">定数</td><td>UPPER_SNAKE_CASE</td><td><code>MAX_RETRY_COUNT</code></td></tr>
          <tr><td className="hl">イベントハンドラ</td><td>on または handle + イベント名</td><td><code>onChange</code> / <code>handleSubmit</code></td></tr>
        </tbody>
      </table>
      <p>
        単数形と複数形の区別は、それ自体が情報です。<code>user</code>と<code>users</code>を意識して使い分けるだけで、配列かどうかが型を見なくても分かります。
      </p>

      <Heading num="02">慣習的に許容される略語</Heading>
      <p>
        独自の省略は避けますが、広く通じる略語まで律儀に書き下すとかえって読みにくくなります。基準は<Term>スコープが短いこと</Term>と<Term>初見の人がその場で意味を取れること</Term>の2つです。
      </p>
      <table>
        <thead>
          <tr><th>略語</th><th>元の語</th><th>使ってよい場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>i</code> / <code>j</code></td><td>index</td><td>数行で閉じるループのみ</td></tr>
          <tr><td className="hl"><code>e</code></td><td>event / error</td><td>文脈で明らかなとき。曖昧なら<code>event</code>・<code>err</code>と書き分ける</td></tr>
          <tr><td className="hl"><code>err</code></td><td>error</td><td>catch節など</td></tr>
          <tr><td className="hl"><code>req</code> / <code>res</code></td><td>request / response</td><td>サーバーサイドの定番</td></tr>
          <tr><td className="hl"><code>ctx</code></td><td>context</td><td>その処理が置かれている状況を渡すとき</td></tr>
          <tr><td className="hl"><code>el</code></td><td>element</td><td>DOM要素を指すとき</td></tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="design-conventions-variables-scope"
        aspect="660 / 290"
        caption="変数名の長さとスコープの長さの関係。2〜3行で閉じるループならカウンタはiの1文字でも困らないが、20行程度の関数ではuserのように意味の分かる名前が要り、モジュール全体で生きる変数はactiveSubscriptionCountのように長くても具体的である必要がある。定義まで戻らないと意味が取れない名前は、そのスコープに対して短すぎる。"
      />

      <Aside label="スコープの長さが判断基準">
        2〜3行で閉じるループの<code>i</code>は誰も困りませんが、50行のスコープで生き続ける<code>d</code>は、読むたびに定義まで戻ることになります。<Term>スコープが長い変数ほど、名前は長くてよい</Term>という関係を意識すると迷いが減ります。
      </Aside>

      <Heading num="03">統一すべき動詞・語の対</Heading>
      <p>
        意味の近い語は、複数のメンバーが無自覚に混在させます。<Term>プロジェクトでどちらを使うか決めて、以後は統一する</Term>のが唯一の対処です。
      </p>
      <table>
        <thead>
          <tr><th>対</th><th>決め方の目安</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">delete と remove</td><td>物理削除は delete、一覧から外すだけの関連解除は remove</td></tr>
          <tr><td className="hl">get と fetch</td><td>ローカルの読み取りは get、リモートからの取得は fetch</td></tr>
          <tr><td className="hl">find と search</td><td>find は1件想定、search は複数件想定</td></tr>
          <tr><td className="hl">create と make と build</td><td>3つとも同義に使われがち。どれか1つに統一する</td></tr>
          <tr><td className="hl">update と modify</td><td>どちらか片方に統一し、混在させない</td></tr>
        </tbody>
      </table>
      <p>
        こうした取り決めは、頭の中ではなくリポジトリの中(スタイルガイドやリンタールール)に置いておくのが要点です。人の記憶に頼る規約は、人が増えた時点で崩れます。
      </p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>単複も情報</h4><p>user と users の使い分けだけで、型を見ずに配列と分かる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>略語はスコープ次第</h4><p>短いスコープの慣習的な略語だけ許す。長く生きる変数は略さない。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>類義語は先に決める</h4><p>delete か remove か。決めていないと必ず混在する。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/conventions-variables" />
    </DocsPage>
  );
}
