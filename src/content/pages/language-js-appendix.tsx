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
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "付録" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>付録 ― 用語集・型エラー早見表・書き方対照表</h1>
        <Lead>
          値から関数、データ、型、非同期、そして実行環境までを一巡しました。ここはこれまでの内容を<Term>逆引き</Term>・<Term>早見</Term>としてまとめた付録です。用語の意味を引く、型エラーに怒られたときの対処を探す、命令型と関数型の書き方を見比べる ―
          必要になったときに戻ってこられる索引として使ってください。
        </Lead>
      </Hero>

      <Heading num="00">全体の地図</Heading>

      <DiagramFrame
        slug="language-js-map"
        aspect="640 / 300"
        caption="10の章を、扱う対象の広がりで並べた地図。①書くための部品(値と型・関数・データの変換・型を使いこなす・クラス)は頭の中だけで完結する計算の世界。②動くときの仕組み(実行の仕組み・非同期処理)はコールスタックとイベントループという土台。③外の世界との接点(ブラウザ・Node.js)にDOM・イベント・ストレージ・ファイルといった副作用が集まる。ジェネリクスとユーティリティ型は全体にまたがる型の道具。"
      />

      <Heading num="A">用語集</Heading>
      <p>
        主要な用語を、意味と関連章とともにまとめます。定義があいまいになったら、まずここで引いてから該当章へ戻ると、文脈の中で意味を思い出せます。
      </p>

      <table>
        <thead>
          <tr>
            <th>用語</th>
            <th>意味</th>
            <th>関連章</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">不変(イミュータブル)</td>
            <td>いちど作った値を書き換えず、必要なら新しい値を作る考え方。全体の土台</td>
            <td>
              <Link href="/language/js-values">値と型</Link> /{" "}
              <Link href="/language/js-data">データの変換</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">型推論</td>
            <td>初期値などから、型を書かなくてもTypeScriptが自動で型を当てる仕組み</td>
            <td>
              <Link href="/language/js-values">値と型</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">純粋関数</td>
            <td>同じ入力なら必ず同じ出力を返し、外部を書き換えない関数</td>
            <td>
              <Link href="/language/js-functions">関数</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">副作用</td>
            <td>ログ出力・DOM更新・外部変数の変更など、値を返す以外の効果</td>
            <td>
              <Link href="/language/js-browser">ブラウザ</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">高階関数</td>
            <td>
              関数を引数に取る、または関数を返す関数。<code>map</code>などの土台
            </td>
            <td>
              <Link href="/language/js-functions">関数</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">クロージャ</td>
            <td>関数が定義時の変数を覚える仕組み。状態を関数に閉じ込められる</td>
            <td>
              <Link href="/language/js-functions">関数</Link> /{" "}
              <Link href="/language/js-engine">実行の仕組み</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">判別可能Union</td>
            <td>共通のタグを持つオブジェクト型を並べ、取りうる状態を型で列挙したもの</td>
            <td>
              <Link href="/language/js-types">型を使いこなす</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">Narrowing</td>
            <td>分岐の条件によって、その枝の中で型が自動的に狭まること</td>
            <td>
              <Link href="/language/js-types">型を使いこなす</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">Result型</td>
            <td>成功と失敗を投げるのではなく、値として返すパターン</td>
            <td>
              <Link href="/language/js-types">型を使いこなす</Link> /{" "}
              <Link href="/language/js-async">非同期処理</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">Promise</td>
            <td>「いつか値が返ってくる」ことを表す値。<code>await</code>で中身を取り出す</td>
            <td>
              <Link href="/language/js-async">非同期処理</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">ジェネリクス</td>
            <td>型を引数のように後から受け取る仕組み。1つの定義を使い回せる</td>
            <td>
              <Link href="/language/js-generics">ジェネリクス</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">トランスパイル</td>
            <td>TypeScriptの構文を、実行できる通常のJavaScriptへ変換すること</td>
            <td>
              <Link href="/language/js">JavaScript・TypeScript</Link>
            </td>
          </tr>
        </tbody>
      </table>

      <Heading num="B">型エラー早見表 ― JSでは動くがTSが怒る</Heading>
      <p>
        TypeScriptを書き始めると、JavaScriptなら素通りしていたコードで赤い波線が出ます。多くは「実行時に事故になる前に気づかせてくれている」サインです。
      </p>

      <table>
        <thead>
          <tr>
            <th>やりがちなコード</th>
            <th>エラーの内容</th>
            <th>対処</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">
              <code>{'add(1, "2")'}</code>
            </td>
            <td>
              引数が<code>string</code>型で、<code>number</code>型に代入できない
            </td>
            <td>渡す値を数値にする。文字列なら先に変換する</td>
          </tr>
          <tr>
            <td className="hl">
              <code>user.name.toUpperCase()</code>
            </td>
            <td>
              <code>user</code>は<code>undefined</code>の可能性がある
            </td>
            <td>
              先に存在を確かめる(Narrowing)か、<code>user?.name</code>を使う
            </td>
          </tr>
          <tr>
            <td className="hl">
              <code>{'5 === "5"'}</code>
            </td>
            <td>型が重ならず、この比較はいつも<code>false</code></td>
            <td>比べる前に型をそろえる。そもそも設計を見直す</td>
          </tr>
          <tr>
            <td className="hl">
              <code>el.textContent = &quot;hi&quot;</code>
            </td>
            <td>
              <code>el</code>は<code>{"HTMLElement | null"}</code>で、<code>null</code>の可能性がある
            </td>
            <td>
              <code>if (el)</code>で<code>null</code>を除いてから使う
            </td>
          </tr>
          <tr>
            <td className="hl">
              <code>JSON.parse(s).id</code>
            </td>
            <td>
              結果は<code>any</code>相当で、形が保証されない
            </td>
            <td>期待する形を定義し、変換関数の戻り値型で輪郭を与える</td>
          </tr>
          <tr>
            <td className="hl">
              <code>arr.push(x)</code>
            </td>
            <td>
              <code>readonly</code>な配列に破壊的メソッドは呼べない
            </td>
            <td>
              <code>{"[...arr, x]"}</code>で新しい配列を作る(不変更新)
            </td>
          </tr>
          <tr>
            <td className="hl">
              <code>function f(kind) {"{ ... }"}</code>
            </td>
            <td>引数に暗黙の<code>any</code>が付いている</td>
            <td>
              型注釈を付ける。リテラルUnionにすると分岐漏れも防げる
            </td>
          </tr>
          <tr>
            <td className="hl">
              <code>{'obj["key"]'}</code>
            </td>
            <td>そのプロパティは型に存在しない</td>
            <td>
              型に足すか綴りを直す。動的キーなら<code>{"Record<string, T>"}</code>
            </td>
          </tr>
        </tbody>
      </table>

      <Heading num="C">書き方対照表 ― 命令型と関数型</Heading>
      <p>
        同じ処理でも、書き方によって「値を書き換える命令の列」にも「値を変換する式」にもなります。
      </p>

      <table>
        <thead>
          <tr>
            <th>操作</th>
            <th>
              命令型(<code>for</code>・再代入)
            </th>
            <th>関数型(型付き)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">合計</td>
            <td>
              <code>{"let t = 0; for (const x of xs) t += x;"}</code>
            </td>
            <td>
              <code>{"const t: number = xs.reduce((a, x) => a + x, 0);"}</code>
            </td>
          </tr>
          <tr>
            <td className="hl">変換</td>
            <td>
              <code>{"const r = []; for (const x of xs) r.push(x * 2);"}</code>
            </td>
            <td>
              <code>{"const r: number[] = xs.map((x) => x * 2);"}</code>
            </td>
          </tr>
          <tr>
            <td className="hl">フィルタ</td>
            <td>
              <code>{"const r = []; for (const x of xs) if (x > 0) r.push(x);"}</code>
            </td>
            <td>
              <code>{"const r: number[] = xs.filter((x) => x > 0);"}</code>
            </td>
          </tr>
          <tr>
            <td className="hl">分岐</td>
            <td>
              <code>{'let s; if (n > 0) s = "+"; else s = "-";'}</code>
            </td>
            <td>
              <code>{'const s: string = n > 0 ? "+" : "-";'}</code>
            </td>
          </tr>
          <tr>
            <td className="hl">状態</td>
            <td>
              <code>{"obj.count += 1;"}</code>
            </td>
            <td>
              <code>{"const next = { ...obj, count: obj.count + 1 };"}</code>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        軸になるのは<code>for</code> + <code>push</code>と<code>map</code>の対です。どちらもまったく同じ配列を作りますが、右側は「新しい配列を式で作る」ので、途中の変数を書き換えません。
      </p>

      <pre>
        <code>{`// 命令型 ― 空配列を用意し、push で書き換えていく
function doubleAll(xs: number[]): number[] {
  const result: number[] = [];
  for (let i = 0; i < xs.length; i++) result.push(xs[i] * 2);
  return result;
}

// 関数型 ― map が新しい配列を返す(元の xs は不変)
function doubleAllFp(xs: number[]): number[] {
  return xs.map((x) => x * 2);
}

// どちらも [2, 4, 6]`}</code>
      </pre>

      <p>
        迷ったら<Term>不変</Term>と<Term>関数型</Term>を軸に書く ―
        この姿勢が、これから読むどんなコードにも効いてきます。
      </p>

      <DocsFooter href="/language/js-appendix" />
    </DocsPage>
  );
}
