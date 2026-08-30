import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "関数・イベントハンドラの命名" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>関数・イベントハンドラの命名 ― 動詞で意図を伝える</h1>
        <Lead>
          <Link href="/design/conventions">コーディング規約</Link>の中でも、関数名は最も読み手の推測コストに直結します。基本は「動詞+名詞」、真偽値を返すものには<Term>is / has / can</Term>、イベントを受け取るものには<Term>on / handle</Term>という接頭辞を使い分けることで、戻り値や役割を名前だけで伝えられます。
        </Lead>
      </Hero>

      <Heading num="01">基本パターン ― 動詞から書き始める</Heading>
      <p>
        関数名は「何をどうするか」が読めるように、動詞から始めます。<code>userName()</code>(名詞だけ)、<code>dataProcess()</code>(動詞が不明)、<code>doSubmit()</code>(<code>do</code>は意味が薄い)のような名前は避けます。
      </p>
      <table>
        <thead>
          <tr><th>パターン</th><th>例</th><th>備考</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">動詞 + 名詞</td>
            <td><code>getUserName</code> / <code>sendForm</code></td>
            <td>「ユーザー名を取得する」のようにそのまま読める</td>
          </tr>
          <tr>
            <td className="hl">動詞 + 形容詞 + 名詞</td>
            <td><code>getDisplayName</code> / <code>formatJapaneseDate</code></td>
            <td>修飾語を挟んで対象を具体化する</td>
          </tr>
          <tr>
            <td className="hl">動詞のみ</td>
            <td><code>validate</code> / <code>submit</code></td>
            <td>文脈で対象が自明な場合のみ</td>
          </tr>
        </tbody>
      </table>

      <Heading num="02">真偽値とイベントの接頭辞</Heading>

      <DiagramFrame
        slug="design-conventions-functions-prefixes"
        aspect="680 / 260"
        caption="関数名の接頭辞の整理。左は真偽値を返す関数で、isは今そうなのかという状態、hasはそれを持っているか、canはそれができるかを表す。右はイベント関連で、onは「いつ呼ばれるか」を受け取る側の名前、handleは「何をするか」を実装する側の名前として使い分ける。"
      />

      <table>
        <thead>
          <tr><th>接頭辞</th><th>問いの性質</th><th>続く語</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl"><code>is</code></td>
            <td>今そうなのか(状態・性質)</td>
            <td>形容詞・過去分詞</td>
            <td><code>isValid</code> / <code>isOpen</code> / <code>isLoading</code></td>
          </tr>
          <tr>
            <td className="hl"><code>has</code></td>
            <td>それを持っているか(所有・含有)</td>
            <td>名詞</td>
            <td><code>hasError</code> / <code>hasPermission</code></td>
          </tr>
          <tr>
            <td className="hl"><code>can</code></td>
            <td>それができるか(能力・許可)</td>
            <td>動詞</td>
            <td><code>canSubmit</code> / <code>canEdit</code></td>
          </tr>
        </tbody>
      </table>
      <p>
        同じフォームでも問いが違えば接頭辞が変わります ―
        <code>isValid</code>は入力内容自体が正しいか、<code>hasError</code>はエラーが表示されているか、<code>canSubmit</code>はボタンを押してよいか。逆に、状態が単純で読み手が迷わない場合は<code>agreed</code>のような接頭辞なしでも構いません。
      </p>

      <Aside label="on と handle の使い分け">
        <code>on</code>は「いつ呼ばれるか」を表す受け取り側の名前(propsの<code>onClick</code>)、<code>handle</code>は「何をするか」を実装する側の名前(<code>handleClick</code>)です。親で<code>handleClick</code>を定義し、子には<code>onClick</code>として渡す、という対応にしておくと、どちらの立場のコードを読んでいるかが名前だけで分かります。
      </Aside>

      <Heading num="03">動詞の使い分け</Heading>
      <table>
        <thead>
          <tr><th>分類</th><th>動詞と意味</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">取得・設定</td>
            <td>
              <code>get</code>(既にある値を読む) / <code>fetch</code>(外部から取得する) / <code>set</code>(代入する) / <code>update</code>(一部を変える) / <code>create</code> / <code>delete</code>
            </td>
          </tr>
          <tr>
            <td className="hl">表示・開閉</td>
            <td>
              <code>open</code> / <code>close</code> / <code>toggle</code>(開閉を反転する)
            </td>
          </tr>
          <tr>
            <td className="hl">開始・終了</td>
            <td>
              <code>start</code> / <code>stop</code> / <code>complete</code>(正常に完了する)
            </td>
          </tr>
          <tr>
            <td className="hl">送信・通信</td>
            <td>
              <code>send</code>(データを送る) / <code>submit</code>(フォームを提出する) / <code>receive</code>
            </td>
          </tr>
          <tr>
            <td className="hl">検証・整形</td>
            <td>
              <code>validate</code>(ルールに合うか確認。修正はしない) / <code>verify</code>(正しさ・本人性を確認) / <code>normalize</code>(統一形式に直す) / <code>format</code>(人が読む形に) / <code>parse</code>(構造に分解する)
            </td>
          </tr>
          <tr>
            <td className="hl">分割・結合</td>
            <td>
              <code>split</code> / <code>merge</code> / <code>join</code>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        重要なのは、意味の近い動詞を<Term>プロジェクト内で1つに決めておく</Term>ことです。<code>get</code>と<code>fetch</code>が混在していると、読み手は毎回「これは通信するのか」を確かめることになります。
      </p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>動詞から始める</h4><p>「何をどうするか」が名前だけで読めるようにする。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>戻り値を接頭辞で示す</h4><p>is・has・canで、真偽値であることと問いの性質が伝わる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>類義語は統一する</h4><p>get と fetch、delete と remove。混在が推測コストを生む。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/conventions-functions" />
    </DocsPage>
  );
}
