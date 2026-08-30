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
  Analogy,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "関数・イベントハンドラの命名",
};

const patternRows = [
  { pattern: "動詞 + 名詞", example: "getUserName, sendForm, validateEmail", note: "「ユーザ名を取得する」「フォームを送る」のように読める" },
  { pattern: "動詞 + 形容詞 + 名詞", example: "getDisplayName, formatJapaneseDate", note: "修飾語を挟んで対象を具体化する" },
  { pattern: "動詞のみ(対象が自明)", example: "validate, submit", note: "フック内など文脈で対象が決まる場合" },
];

const boolRows = [
  { prefix: "is", meaning: "状態・性質であるか", detail: "形容詞・過去分詞が続く。「今そうなのか」を表す", example: "isValid, isOpen, isLoading" },
  { prefix: "has", meaning: "所有・含有があるか", detail: "名詞が続く。「〜を持っているか」を表す", example: "hasError, hasPermission, hasChildren" },
  { prefix: "can", meaning: "能力・許可があるか", detail: "動詞が続く。「〜できるか」を表す", example: "canSubmit, canEdit, canDelete" },
];

const handlerRows = [
  { prefix: "on", role: "React/DOMのイベントprop名(onClick, onChange)と同じ語彙", scene: "JSXにそのまま渡す関数、フックが返すコールバック、子コンポーネントへ渡すprop" },
  { prefix: "handle", role: "コンポーネント内部の処理であることを示す", scene: "複数処理をまとめる、内部実装とprop名を区別したいとき" },
];

const verbGroups = [
  {
    title: "データの取得・設定",
    rows: [
      { verb: "get", meaning: "既にある値を読み取る", example: "getDisplayName" },
      { verb: "fetch", meaning: "外部(API等)から取得する", example: "fetchAnnouncements" },
      { verb: "set", meaning: "値を代入・更新する", example: "setError" },
      { verb: "update", meaning: "既存のものを一部変更する", example: "updateProfile" },
      { verb: "create", meaning: "新しいものを作る", example: "createUser" },
      { verb: "delete", meaning: "データを削除する", example: "deleteUser" },
    ],
  },
  {
    title: "表示・開閉(UI)",
    rows: [
      { verb: "open", meaning: "閉じていたものを開く", example: "openModal" },
      { verb: "close", meaning: "開いているものを閉じる", example: "closeModal" },
      { verb: "toggle", meaning: "開閉を反転する", example: "toggleMenu" },
    ],
  },
  {
    title: "処理の開始・終了",
    rows: [
      { verb: "start", meaning: "継続的な処理を始める", example: "startPolling" },
      { verb: "stop", meaning: "処理を止める", example: "stopPolling" },
      { verb: "finish / complete", meaning: "正常に完了する", example: "completeCheckout" },
    ],
  },
  {
    title: "送信・通信",
    rows: [
      { verb: "send", meaning: "データを送る", example: "sendEmail" },
      { verb: "submit", meaning: "フォーム等を提出する", example: "submitContactForm" },
      { verb: "receive", meaning: "データを受け取る", example: "receiveMessage" },
    ],
  },
  {
    title: "検証・計算・整形",
    rows: [
      { verb: "validate", meaning: "ルールに合っているか確認する(修正はしない)", example: "validateEmail" },
      { verb: "verify", meaning: "正しさ・本人性を確認する", example: "verifyToken" },
      { verb: "normalize", meaning: "入力を統一形式に直す", example: "normalizePhone" },
      { verb: "calculate", meaning: "値を計算して求める", example: "calculateTotal" },
      { verb: "format", meaning: "人が読む形に整形する", example: "formatJapaneseDate" },
      { verb: "parse", meaning: "文字列等を構造に分解する", example: "parseJson" },
    ],
  },
  {
    title: "分割・結合",
    rows: [
      { verb: "split", meaning: "1つを複数に分ける", example: "splitParagraphs" },
      { verb: "merge", meaning: "複数を1つにまとめる", example: "mergeConfig" },
      { verb: "join", meaning: "要素を連結する", example: "joinPaths" },
    ],
  },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; コーディング規約・スタイル</Eyebrow>
        <h1>関数・イベントハンドラの命名 ― 動詞で意図を伝える</h1>
        <Lead>
          <Link href="/design/conventions">コーディング規約・スタイル</Link>の中でも、関数名は最も読み手の推測コストに直結します。<Term>関数名</Term>は基本的に「動詞 + 名詞」の形を取り、真偽値を返す関数には<Term>is / has / can</Term>、イベントを受け取る関数には<Term>on / handle</Term>という接頭辞を使い分けることで、戻り値や役割を名前だけで伝えられるようにします。
        </Lead>
      </Hero>

      <Heading num="01">基本パターン ― 動詞 + 名詞</Heading>
      <p>関数名は<Term>「何をどうするか」</Term>が読めるように、動詞から書き始める。<code>userName()</code>(名詞だけ)、<code>dataProcess()</code>(動詞が不明)、<code>doSubmit()</code>(doは意味が薄い)のような名前は避ける。</p>
      <table>
        <thead>
          <tr><th>パターン</th><th>例</th><th>備考</th></tr>
        </thead>
        <tbody>
          {patternRows.map((row) => (
            <tr key={row.pattern}>
              <td className="hl">{row.pattern}</td>
              <td><code>{row.example}</code></td>
              <td>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">真偽値の接頭辞 ― is / has / can</Heading>
      <p>真偽値(boolean)を返す関数・変数には、<Term>何についてのはい/いいえか</Term>が伝わる接頭辞を付ける。どれも「はい/いいえ」を表す点は同じだが、接頭辞ごとに問いの性質が異なる。</p>
      <table>
        <thead>
          <tr><th>接頭辞</th><th>意味</th><th>よく使う場面</th><th>例</th></tr>
        </thead>
        <tbody>
          {boolRows.map((row) => (
            <tr key={row.prefix}>
              <td className="hl"><code>{row.prefix}</code></td>
              <td>{row.meaning}</td>
              <td>{row.detail}</td>
              <td><code>{row.example}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[0.9rem] text-muted-foreground">同じフォームでも意味が異なる例: <code>isValid</code>(入力内容自体が正しいか) / <code>hasError</code>(エラーが表示されているか) / <code>canSubmit</code>(ボタンを押してよいか)。状態が単純で読み手が迷わない場合は、接頭辞なしの <code>agreed</code> のような名前でも構わない。</p>

      <Heading num="03">イベントハンドラ ― on / handle の使い分け</Heading>
      <p>イベントを受け取る関数は <code>on</code> または <code>handle</code> + イベント名(camelCase)で表す。</p>
      <table>
        <thead>
          <tr><th>接頭辞</th><th>意味・役割</th><th>向いている場面</th></tr>
        </thead>
        <tbody>
          {handlerRows.map((row) => (
            <tr key={row.prefix}>
              <td className="hl"><code>{row.prefix}</code></td>
              <td>{row.role}</td>
              <td>{row.scene}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>典型的には、フック内部の実装を <code>handleSubmit</code> として組み立て、JSXに渡すprop名は <code>onSubmit</code> のまま保つ。こうすると「外から見える入口の名前(on)」と「内部の実装(handle)」を区別でき、1つの操作が検証→API呼び出し→リダイレクトのように複数ステップにまたがっても読みやすい。</p>

      <Analogy label="💡 たとえるなら">
        <code>on</code> は窓口の看板の名前、<code>handle</code> はその窓口の奥で実際に手続きをする担当者の名前です。利用者(JSX)は看板の名前だけを見て話しかければよく、担当者が誰であるか・何人がかりで処理しているかを知る必要はありません。
      </Analogy>

      <Heading num="04">よく使う動詞一覧</Heading>
      <p>操作の<Term>意図</Term>に合った動詞を選ぶ。似た動詞(類語)や反対の操作(対義語)を意識すると、同じ処理に <code>get</code> と <code>fetch</code> が混在するような名前のブレを防げる。</p>
      {verbGroups.map((group) => (
        <div key={group.title}>
          <h4 className="mt-6 mb-1 text-[0.95rem] font-semibold text-foreground">{group.title}</h4>
          <table>
            <thead>
              <tr><th>動詞</th><th>意味</th><th>例</th></tr>
            </thead>
            <tbody>
              {group.rows.map((row) => (
                <tr key={row.verb}>
                  <td className="hl"><code>{row.verb}</code></td>
                  <td>{row.meaning}</td>
                  <td><code>{row.example}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <CardGrid>
        <Card><h4>get vs fetch</h4><p>ローカルの値を読むなら <code>get</code>、ネットワーク越しの取得なら <code>fetch</code>。</p></Card>
        <Card><h4>validate vs normalize</h4><p>合否を判定するだけなら <code>validate</code>、値そのものを直すなら <code>normalize</code>。</p></Card>
        <Card><h4>on vs handle</h4><p>propとして公開する名前は <code>on</code>、内部実装は <code>handle</code> で区別する。</p></Card>
      </CardGrid>

      <p>関数の中で扱う<Term>変数</Term>の命名にも同じ考え方が続く。次のページでは、変数名の付け方とよく使われる略語を見ていく。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/conventions/variables" tag="設計">変数・略語の命名</RelatedLink>
                    <RelatedLink href="/design/conventions/classes" tag="設計">クラス・接尾辞の命名</RelatedLink>
                    <RelatedLink href="/design/conventions" tag="設計">コーディング規約・スタイル</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
