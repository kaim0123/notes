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
  Aside,
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ブラウザ ― Web API",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>ブラウザ ― Web API</h1>
        <Lead>
          <Link href="/language/js-async">非同期処理</Link>では、通信のような時間のかかる処理を値を返す関数として扱いました。ここでは、その値をいよいよ<Term>画面</Term>に映します。ブラウザが用意している<Term>Web API</Term>
          ― DOM・イベント・ストレージ ―
          を使うと、画面を書き換えたりクリックに反応したりできます。鍵になるのは、これらがすべて<Term>副作用</Term>だということです。
        </Lead>
      </Hero>

      <p>
        ここまで扱ってきた値・関数・データ変換は、どれも頭の中(メモリ)だけで完結する計算でした。これに対してWeb APIは、画面という「外の世界」を書き換える操作です。関数型スタイルでは、この2種類をはっきり分けます ―
        <Term>何を表示すべきかを決める計算</Term>と、<Term>実際に画面へ反映する副作用</Term>です。
      </p>

      <DiagramFrame
        slug="language-js-browser-boundary"
        aspect="640 / 280"
        caption="計算と副作用を分ける構図。中央の点線の枠が純粋な計算の領域で、データを受け取って表示すべき内容を決める描画関数が置かれ、外に触れないのでそのままテストできる。左には入力側の副作用(クリックや入力イベント、ストレージからの読み出し、通信での取得)、右には出力側の副作用(DOMへの書き込み、ストレージへの保存)が並ぶ。副作用は入口と出口の2か所にだけ置き、その間は純粋な計算だけにする。"
      />

      <Heading num="01">DOM操作 ― 書き込むのは最後の一箇所だけ</Heading>
      <p>
        ブラウザは、読み込んだHTMLを<Term>DOM</Term>という「操作できるオブジェクトの木」に変換して持っています。要素を探すには<code>document.querySelector</code>を使います。ここで大事なのは、DOMを書き換えるのは副作用だということ。<Term>データ → 描画関数(純粋な計算) → DOM(副作用)</Term>の2段構成で書きます。
      </p>

      <pre>
        <code>{`// querySelector の戻り値は HTMLElement | null
const title = document.querySelector("#title");

// 計算 ― 表示する文字列を決めるだけ(副作用なし)
const greet = (name: string): string => \`こんにちは、\${name}さん\`;

// 副作用 ― DOM を書き換えるのはここだけ
if (title !== null) {
  // このブロック内では title は HTMLElement に絞り込まれる
  title.textContent = greet("Alice");
}`}</code>
      </pre>

      <p>
        <code>querySelector</code>は探した要素が<Term>見つからないかもしれない</Term>ため、戻り値の型が<code>{"HTMLElement | null"}</code>になっています。TypeScriptは<code>null</code>の可能性が残る値へのアクセスを許さないので、<Link href="/language/js-types">Narrowing</Link>で除外してから使うことになります。「取得は失敗しうる」という現実を、型が実行前に思い出させてくれるのです。
      </p>

      <p>
        要素を作って並べる場合も同じ2段構成です。<code>{"<li>"}</code>を作って返すだけの描画関数で<code>map</code>し、最後にまとめてDOMへ追加します。
      </p>

      <pre>
        <code>{`const fruits: string[] = ["りんご", "みかん", "ぶどう"];

// 計算 ― 文字列から <li> を作って返すだけ
const toItem = (text: string): HTMLLIElement => {
  const li = document.createElement("li");
  li.textContent = text;
  return li;
};

// 副作用 ― できあがった要素をまとめて差し込む
const list = document.querySelector<HTMLUListElement>("#fruits");
if (list !== null) {
  fruits.map(toItem).forEach((li) => list.appendChild(li));
}`}</code>
      </pre>

      <Aside label="なぜ map してから forEach なのか">
        <code>map(toItem)</code>は「文字列の配列」を「要素の配列」に変換する計算、<code>forEach</code>はDOMへ差し込む副作用です。1つの<code>for</code>ループにまとめても動きますが、あえて分けることで純粋な部分と副作用の境目が一目で分かります。
      </Aside>

      <Heading num="02">イベント ― コールバックとしての関数</Heading>
      <p>
        ユーザーの操作に反応するのが<Term>イベント</Term>です。<code>addEventListener</code>に渡すのは、<Link href="/language/js-functions">関数</Link>で学んだ<Term>コールバック</Term>そのもの ―
        値として渡される関数です。引数に直接書き込まず、<Term>名前を付けた別の関数として定義してから渡す</Term>と、ハンドラ単体で意味が読め、テストもしやすくなります。
      </p>

      <pre>
        <code>{`const button = document.querySelector<HTMLButtonElement>("#save");
const status = document.querySelector<HTMLDivElement>("#status");

// クリックのイベントは MouseEvent。何も返さないので戻り値は void
const handleClick = (e: MouseEvent): void => {
  e.preventDefault();
  if (status !== null) {
    status.textContent = "保存しました";
  }
};

button?.addEventListener("click", handleClick);`}</code>
      </pre>

      <p>
        ハンドラの型が<code>{"(e: MouseEvent) => void"}</code>だと分かるため、<code>MouseEvent</code>特有のプロパティに補完が効きます。また<code>{'querySelector<HTMLInputElement>'}</code>のように型引数を渡すと、<code>value</code>のようにその要素にしかないプロパティを安全に読めます。
      </p>

      <pre>
        <code>{`const input = document.querySelector<HTMLInputElement>("#name");
const preview = document.querySelector<HTMLParagraphElement>("#preview");

const handleInput = (): void => {
  if (input !== null && preview !== null) {
    preview.textContent = input.value; // value は入力要素にだけある
  }
};

input?.addEventListener("input", handleInput);`}</code>
      </pre>

      <Heading num="03">ストレージ ― I/Oを関数でラップする</Heading>
      <p>
        ページを閉じても内容を覚えておきたいときに使うのが<code>localStorage</code>です。読み書きも副作用なので、あちこちで直接触ると副作用が散らばります。そこで<Term>読み書きを関数でラップ</Term>し、1箇所に閉じ込めます。
      </p>
      <p>
        注意点として、ストレージには<Term>文字列しか保存できません</Term>。オブジェクトは<code>JSON.stringify</code>で文字列にし、読み出すときは<code>JSON.parse</code>で戻します。まだ何も無ければ<code>getItem</code>は<code>null</code>を返すので、その場合分けも関数の中に閉じ込めます。
      </p>

      <pre>
        <code>{`interface User {
  id: number;
  name: string;
}

const saveUser = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

// JSON.parse は any を返すので、戻り値の型で輪郭を与える
const loadUser = (): User | null => {
  const raw = localStorage.getItem("user");
  return raw === null ? null : (JSON.parse(raw) as User);
};

const user = loadUser();
console.log(user?.name); // 保存済みのときだけ "Alice"`}</code>
      </pre>

      <p>
        ポイントは戻り値型<code>{"User | null"}</code>です。<Term>ストレージから出てきた正体不明の値に、型の形を取り戻す</Term>のがTypeScriptの役割になります。ただし<code>as User</code>は検査ではないので、本当に信頼したいデータは実行時に検証してから型を名乗らせます。
      </p>

      <Aside label="Cookie との違い">
        <code>document.cookie</code>で読み書きする<Term>Cookie</Term>も文字列の保存領域ですが、サイズが小さく、リクエストのたびにサーバーへ自動送信されるため、主にログイン状態の管理に使われます。日常的な保存には、サーバーへ送られない<code>localStorage</code>のほうが手軽です。いずれにせよ、読み書きを関数でラップする方針は共通です。
      </Aside>

      <Heading num="まとめ">この章のまとめ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>DOM更新は副作用</h4>
          <p>
            データ → 描画関数(純粋) → DOM(副作用)の2段で書き、境目をはっきりさせます。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>取得は失敗しうる</h4>
          <p>
            <code>querySelector</code>は<code>null</code>を返しうる。絞り込んでから使うことを型が促します。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ハンドラは名前付きの関数</h4>
          <p>
            別関数として定義して渡すと、<code>{"(e: MouseEvent) => void"}</code>という型で意味が読めます。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>I/Oを関数でラップ</h4>
          <p>
            ストレージの読み書きを閉じ込め、<code>JSON.parse</code>の結果に型の輪郭を与えます。
          </p>
        </Card>
      </CardGrid>

      <p>
        次の<Link href="/language/js-generics">ジェネリクスとユーティリティ型</Link>では、型そのものを引数のように受け取る仕組みを学び、こうした型を自在に組み立て・変換する道具を手に入れます。
      </p>

      <DocsFooter href="/language/js-browser" />
    </DocsPage>
  );
}
