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
  Aside,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "変数・略語の命名",
};

const namingRows = [
  { kind: "通常の値", rule: "名詞または名詞句", example: "email, postalCode, raw" },
  { kind: "真偽値", rule: "is / has / can + 形容詞・名詞", example: "isValid, hasError, canSubmit" },
  { kind: "配列", rule: "複数形", example: "announcements, items" },
  { kind: "Reactのstate", rule: "[値, 更新関数]のペア", example: "error, setError" },
  { kind: "イベントハンドラ", rule: "on または handle + イベント名", example: "onChange, handleSubmit" },
];

const abbrevRows = [
  { abbr: "i, j, k", full: "index(ループカウンタ)", note: "短い範囲のループのみ" },
  { abbr: "e", full: "event / error", note: "文脈で判断。曖昧なら event / err と書き分ける" },
  { abbr: "err", full: "error", note: "catch節などで e より意味が伝わる" },
  { abbr: "req, res", full: "request, response", note: "サーバーサイドの定番" },
  { abbr: "ctx", full: "context", note: "この処理が置かれている状況・周辺情報" },
  { abbr: "el", full: "element(DOM)", note: "elementと書くより短く、element感が伝わる" },
];

const verbPairRows = [
  { pair: "delete vs remove", rule: "物理削除は delete、関連解除(一覧から外すだけ)は remove" },
  { pair: "get vs fetch", rule: "ローカルの読み取りは get、リモートからの取得は fetch" },
  { pair: "create vs make vs build", rule: "3つとも同じ意味で使われがちなので、プロジェクト内でどれか1つに統一する" },
  { pair: "find vs search vs get", rule: "find=1件想定、search=複数件想定、get=存在確実な取得" },
  { pair: "update vs modify", rule: "どちらか片方に統一し、混在させない" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; コーディング規約・スタイル</Eyebrow>
        <h1>変数・略語の命名 ― 迷いを減らす基本ルール</h1>
        <Lead>
          <Link href="/design/conventions/functions">関数の命名</Link>が「動詞」で意図を伝えるのに対し、<Term>変数の命名</Term>は「名詞」で対象を表す。ここでは<Term>camelCase</Term>を基本としたルールと、慣習的に許容される略語、そして<Term>get / fetch</Term>のようにチーム内で表記を揃えておくべき動詞の対を見ていく。
        </Lead>
      </Hero>

      <Heading num="01">基本ルール</Heading>
      <p><Term>camelCase</Term>を使う。再代入しない値は <code>const</code>、再代入する値は <code>let</code> を使い、<code>var</code> は使わない。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>付け方</th><th>例</th></tr>
        </thead>
        <tbody>
          {namingRows.map((row) => (
            <tr key={row.kind}>
              <td className="hl">{row.kind}</td>
              <td>{row.rule}</td>
              <td><code>{row.example}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">慣習的にOKな短縮</Heading>
      <p>スコープが短い変数に限り、意味が広く共有されている略語は許容される。ただし<Term>2〜3行のスコープを超えるなら略さずフルネームで</Term>書く。</p>
      <table>
        <thead>
          <tr><th>短縮</th><th>元の語</th><th>備考</th></tr>
        </thead>
        <tbody>
          {abbrevRows.map((row) => (
            <tr key={row.abbr}>
              <td className="hl"><code>{row.abbr}</code></td>
              <td>{row.full}</td>
              <td>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Aside label="e は何の略?">
        文脈によって意味が変わる代表的な略語。DOMイベントハンドラの引数なら<code>event</code>、<code>catch (e)</code>のように例外処理の中なら<code>error / exception</code>を指す。読み手が迷う場合は<code>event</code>や<code>err</code>と書き分けたほうが安全。
      </Aside>

      <Heading num="03">統一すべき動詞の対</Heading>
      <p>類義語は複数のメンバーが混在させやすい。<Term>プロジェクトでどちらを使うか決めて</Term>、以後は統一する。</p>
      <table>
        <thead>
          <tr><th>選択肢</th><th>使い分けの目安</th></tr>
        </thead>
        <tbody>
          {verbPairRows.map((row) => (
            <tr key={row.pair}>
              <td className="hl"><code>{row.pair}</code></td>
              <td>{row.rule}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <CardGrid>
        <Card><h4>data / item / items</h4><p>汎用データは<code>data</code>、配列の1要素は<code>item</code>、配列全体は<code>items</code>のように複数形にする。</p></Card>
        <Card><h4>request / response</h4><p>サーバーサイドでは<code>req / res</code>の短縮形が定番。文脈が広いなら省略しない。</p></Card>
        <Card><h4>prev / next</h4><p>前後関係を表す変数は<code>previous / next</code>、短縮するなら<code>prev / next</code>で揃える。</p></Card>
      </CardGrid>

      <p>変数と関数の命名が揃ったら、次はそれらをまとめる<Term>クラス</Term>の命名を見ていく。<code>Service</code>や<code>Repository</code>といった接尾辞は、クラスの役割を名前だけで伝えるための語彙になる。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/conventions/functions" tag="設計">関数・イベントハンドラの命名</RelatedLink>
                    <RelatedLink href="/design/conventions/classes" tag="設計">クラス・接尾辞の命名</RelatedLink>
                    <RelatedLink href="/design/conventions" tag="設計">コーディング規約・スタイル</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
