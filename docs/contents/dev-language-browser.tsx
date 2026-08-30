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
  Analogy,
  Aside,
  Diagram,
  CodeCompare,
  Card,
  CardGrid,
  CardNumber,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ブラウザ ― Web API",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>JavaScript / TypeScript</Eyebrow>
        <h1>第8章 ブラウザ ― Web API</h1>
        <Lead>
          前章「<Link href="/dev/language/async">非同期処理</Link>」では、通信のような時間のかかる処理を<strong>値を返す関数</strong>として扱いました。この章では、その値をいよいよ<Term>画面</Term>に映します。ブラウザが用意している<Term>Web API</Term> ― <Term>DOM</Term>・<Term>イベント</Term>・<Term>ストレージ</Term> ― を使うと、画面を書き換えたりクリックに反応したりできます。鍵になるのは、これらが<strong>副作用</strong>だということ。計算と副作用をきっぱり分けて書く関数型のスタイルを、JavaScriptとTypeScriptの書き比べで身につけます。
        </Lead>
      </Hero>

      <p>
        ここまでの章で扱ってきた値・関数・データ変換は、どれも<strong>頭の中(メモリ)だけで完結する計算</strong>でした。同じ入力なら同じ出力になり、外の世界には何の影響も与えません。これに対してブラウザのWeb APIは、<strong>画面という「外の世界」を書き換える</strong>操作です。関数型スタイルでは、この2種類をはっきり分けます ― <strong>何を表示すべきかを決める「計算」</strong>と、<strong>実際に画面へ反映する「副作用」</strong>。この章では終始この分離を意識していきます。
      </p>

      <Heading num="8.1">DOM操作 ― 計算と副作用を分ける</Heading>
      <p>
        ブラウザは、読み込んだHTMLを<Term>DOM</Term>(Document Object Model)という「操作できるオブジェクトの木」に変換して持っています。JavaScriptからこの木の要素を<strong>取得</strong>し、<strong>作成</strong>し、<strong>更新</strong>することで、画面を動的に書き換えられます。要素を探すには <code>document.querySelector</code>(CSSセレクタで探す)や <code>document.getElementById</code> を使います。
      </p>
      <p>
        ここで大事なのは、<strong>DOMを書き換えるのは副作用</strong>だということです。<code>textContent</code> に文字列を代入した瞬間、画面という外の世界が変わります。そこで本書では、<Term>データ → 描画関数(純粋な計算) → DOM(副作用)</Term>の2段構成で書きます。「何を表示するか」を副作用のない関数で決め、「実際に書き込む」のは最後の一箇所だけにするのです。
      </p>
      <Diagram caption="表示内容を決める計算(純粋)と、DOMへ書き込む副作用を分けて書く">
        <svg viewBox="0 0 640 120" xmlns="http://www.w3.org/2000/svg">
          <rect x={16} y={40} width={140} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={86} y={66} fill="#f2f2f2" fontSize="12" textAnchor="middle">データ</text>
          <rect x={230} y={34} width={180} height={56} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={58} fill="#f2f2f2" fontSize="12" textAnchor="middle">描画関数</text>
          <text x={320} y={76} fill="#9a9a9a" fontSize="10" textAnchor="middle">純粋な計算</text>
          <rect x={484} y={40} width={140} height={44} rx="8" fill="none" stroke="#ffb43c" strokeWidth="1.5" />
          <text x={554} y={60} fill="#f2f2f2" fontSize="12" textAnchor="middle">DOM</text>
          <text x={554} y={76} fill="#9a9a9a" fontSize="10" textAnchor="middle">副作用</text>
          <line x1={156} y1={62} x2={228} y2={62} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowDom)" />
          <line x1={410} y1={62} x2={482} y2={62} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowDom)" />
          <defs>
            <marker id="arrowDom" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>
      <p>
        まずは要素を取得して、その中身を更新する例です。表示する文字列を作る <code>greet</code> は入力から出力を決めるだけの<Term>純粋関数</Term>で、DOMには触れません。DOMを書き換えるのは最後の1行だけです。
      </p>
      <CodeCompare
        js={`// 取得: DOMから要素を探す
const title = document.querySelector("#title");

// 計算: 表示する文字列を決めるだけ(副作用なし)
const greet = (name) => \`こんにちは、\${name}さん\`;

// 副作用: DOMを書き換えるのはここだけ
title.textContent = greet("Alice");
// 画面の #title が「こんにちは、Aliceさん」になる`}
        ts={`// querySelector の戻り値は HTMLElement | null
const title = document.querySelector("#title");

const greet = (name: string): string => \`こんにちは、\${name}さん\`;

// title が null かもしれないので、そのままでは textContent を触れない
if (title !== null) {
  // このブロック内では title は HTMLElement 型に絞り込まれる
  title.textContent = greet("Alice");
}
// 画面の結果は JS 版とまったく同じ`}
      />
      <Analogy label="🔷 ここからTSが加わる">
        <code>document.querySelector</code> は、探した要素が<strong>見つからないかもしれない</strong>ため、戻り値の型が <code>{"HTMLElement | null"}</code> になっています。TypeScriptは「まだ <code>null</code> の可能性が残っている値」に対して <code>.textContent</code> のようなアクセスを許しません。<code>if (title !== null)</code> で <code>null</code> を除外する<Term>Narrowing(絞り込み)</Term>を書いて初めて、要素として扱えるようになります。<strong>「取得は失敗しうる」という現実を、型が実行前に思い出させてくれる</strong>のがTSの価値です。
      </Analogy>
      <p>
        次は要素を<strong>作成</strong>して並べる例です。<code>document.createElement</code> で新しい要素を作れます。ここで2段構成が効いてきます ― データの配列を、<code>{"<li>"}</code> 要素を作って返すだけの描画関数 <code>toItem</code> で <code>map</code> し、最後にまとめてDOMへ追加します。「作る」計算と「差し込む」副作用が分かれているのがポイントです。
      </p>
      <CodeCompare
        js={`// データ
const fruits = ["りんご", "みかん", "ぶどう"];

// 描画関数: 文字列から <li> を作って返すだけ
const toItem = (text) => {
  const li = document.createElement("li");
  li.textContent = text;
  return li;
};

// 副作用: できあがった要素をまとめてDOMへ追加する
const list = document.querySelector("#fruits");
fruits.map(toItem).forEach((li) => list.appendChild(li));
// #fruits の中に <li>りんご</li><li>みかん</li><li>ぶどう</li> が並ぶ`}
        ts={`const fruits: string[] = ["りんご", "みかん", "ぶどう"];

// 戻り値は「リスト項目要素」= HTMLLIElement
const toItem = (text: string): HTMLLIElement => {
  const li = document.createElement("li");
  li.textContent = text;
  return li;
};

// 型引数で「取得できるなら ul 要素」と伝える
const list = document.querySelector<HTMLUListElement>("#fruits");
if (list !== null) {
  fruits.map(toItem).forEach((li) => list.appendChild(li));
}
// できあがるDOMは JS 版とまったく同じ`}
      />
      <p>
        TS版では <code>{"querySelector<HTMLUListElement>"}</code> のように<strong>型引数</strong>を渡し、「取得できたときは <code>ul</code> 要素だ」と伝えています。こうすると、<code>ul</code> 特有のプロパティに補完が効き、別の種類の要素と取り違えるミスを防げます。ここでも <code>null</code> の可能性は残るので、<code>if</code> による絞り込みはやはり必要です。
      </p>
      <Aside label="なぜ map してから forEach?">
        <code>map(toItem)</code> は「文字列の配列」を「要素の配列」に<strong>変換する計算</strong>、<code>forEach(appendChild)</code> は「DOMへ差し込む副作用」です。1つの <code>for</code> ループにまとめても動きますが、あえて分けることで<strong>純粋な部分と副作用の境目</strong>が一目で分かります。
      </Aside>

      <Heading num="8.2">イベント ― コールバックとしての関数</Heading>
      <p>
        ボタンのクリックやキー入力など、ユーザーの操作に反応するのが<Term>イベント</Term>です。<code>{'要素.addEventListener("click", ハンドラ)'}</code> と書くと、「クリックされたら、この<strong>ハンドラ関数</strong>を呼んでね」という予約になります。ここで渡す関数は、第2章で学んだ<Term>コールバック</Term> ― <strong>値として渡される関数</strong>そのものです。
      </p>
      <p>
        本書では、ハンドラを <code>addEventListener</code> の引数に直接書き込まず、<strong>名前を付けた別の関数として定義してから渡す</strong>関数型スタイルを採ります。こうするとハンドラ単体で意味が読め、再利用やテストもしやすくなります。ハンドラは呼ばれると、発生したイベントの情報を持つ<Term>イベントオブジェクト</Term>(慣習的に <code>e</code>)を受け取ります。
      </p>
      <CodeCompare
        js={`const button = document.querySelector("#save");
const status = document.querySelector("#status");

// ハンドラを名前付きの別関数として定義する(関数型スタイル)
const handleClick = (e) => {
  e.preventDefault(); // イベントオブジェクトの既定動作を止める
  status.textContent = "保存しました";
};

// 関数を「値として」登録する
button.addEventListener("click", handleClick);
// ボタンをクリックすると #status が「保存しました」になる`}
        ts={`const button = document.querySelector<HTMLButtonElement>("#save");
const status = document.querySelector<HTMLDivElement>("#status");

// クリックのイベントは MouseEvent。何も返さないので戻り値は void
const handleClick = (e: MouseEvent): void => {
  e.preventDefault();
  if (status !== null) {
    status.textContent = "保存しました";
  }
};

button?.addEventListener("click", handleClick);
// クリック後の #status は JS 版と同じ「保存しました」`}
      />
      <p>
        TS版では、ハンドラの型が <code>{"(e: MouseEvent) => void"}</code> だと分かります。<code>e</code> がクリック由来の <code>MouseEvent</code> であることが型で決まっているため、マウス座標のような <code>MouseEvent</code> 特有のプロパティに補完が効き、存在しないプロパティを打てば実行前に警告されます。<strong>「このハンドラはどんなイベントを受け取るのか」が型で明示される</strong>のがTSの価値です。
      </p>
      <p>
        ハンドラはただの関数なので、複数のイベントで使い回したり、条件で選んだりも自由です。次は入力欄の値を別の場所へ映す例です。<code>input</code> イベントは文字が入力されるたびに発火します。値は取得済みの要素からそのまま読み取れば、計算(表示文字列を決める)と副作用(DOMへ書く)を分けたまま書けます。
      </p>
      <CodeCompare
        js={`const input = document.querySelector("#name");
const preview = document.querySelector("#preview");

// 入力のたびに、いまの値をプレビューへ反映する
const handleInput = () => {
  preview.textContent = input.value;
};

input.addEventListener("input", handleInput);
// 「あ」と打つと #preview が「あ」に、続けて「い」で「あい」になる`}
        ts={`const input = document.querySelector<HTMLInputElement>("#name");
const preview = document.querySelector<HTMLParagraphElement>("#preview");

const handleInput = (): void => {
  if (input !== null && preview !== null) {
    preview.textContent = input.value; // value は HTMLInputElement にだけある
  }
};

input?.addEventListener("input", handleInput);
// 入力に応じた #preview の変化は JS 版と同じ`}
      />
      <p>
        <code>value</code> プロパティは、テキスト入力要素(<code>HTMLInputElement</code>)にしかありません。JS版では取得結果がどんな要素か分からないまま <code>.value</code> を読んでいますが、TS版は <code>{"querySelector<HTMLInputElement>"}</code> と型引数で伝えているので、<code>value</code> が安全に読めることを型が保証します。取り違えて <code>value</code> のない要素を指定していれば、実行前に気づけます。
      </p>

      <Heading num="8.3">ストレージ ― 読み書きを関数でラップする</Heading>
      <p>
        入力された内容を、ページを閉じても覚えておきたいことがあります。ブラウザにはそのための小さな保存領域があり、代表が <code>localStorage</code> です。<code>setItem(キー, 値)</code> で書き込み、<code>getItem(キー)</code> で読み出します。似たものに <code>sessionStorage</code> があり、こちらはタブを閉じると消えます(使い方は同じ)。
      </p>
      <p>
        ストレージへの読み書きも<strong>副作用</strong>です。プログラムのあちこちで直接 <code>localStorage</code> を触ると、副作用が散らばって追いにくくなります。そこで本書では、<strong>読み書きを関数でラップ</strong>し、副作用を1箇所に閉じ込めます ― データを保存する <code>saveUser(user)</code> と、読み出す <code>loadUser()</code> という<Term>I/O関数</Term>です。
      </p>
      <p>
        注意点として、ストレージには<strong>文字列しか保存できません</strong>。オブジェクトを保存するときは <code>JSON.stringify</code> で文字列に変換し、読み出すときは <code>JSON.parse</code> でオブジェクトに戻します。まだ何も保存されていなければ <code>getItem</code> は <code>null</code> を返すので、その場合分けも関数の中に閉じ込めておきます。
      </p>
      <CodeCompare
        js={`// 書き込みを関数でラップ(副作用を1箇所に閉じ込める)
const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// 読み込みも関数でラップ。無ければ null を返す
const loadUser = () => {
  const raw = localStorage.getItem("user");
  return raw === null ? null : JSON.parse(raw);
};

saveUser({ id: 1, name: "Alice" });
const user = loadUser();
console.log(user.name); // "Alice"`}
        ts={`// 保存する形を interface で定義する
interface User {
  id: number;
  name: string;
}

const saveUser = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

// JSON.parse は any を返すので、戻り値の型を User | null と定める
const loadUser = (): User | null => {
  const raw = localStorage.getItem("user");
  return raw === null ? null : (JSON.parse(raw) as User);
};

saveUser({ id: 1, name: "Alice" });
const user = loadUser();
console.log(user?.name); // "Alice"(保存済みのとき)`}
      />
      <p>
        TS版のポイントは <code>loadUser</code> の戻り値型 <code>{"User | null"}</code> です。<code>JSON.parse</code> は「どんな形でも返しうる」ため型が <code>any</code>(何でもあり)になり、そのままでは型の恩恵が消えてしまいます。そこで <code>interface</code> で保存する形を定義し、戻り値に <code>{"User | null"}</code> と輪郭を与えます。<strong>ストレージから出てきた正体不明の値に、型の形を取り戻す</strong>のがTSの役割です。呼び出し側では <code>user</code> が <code>null</code> かもしれないと分かるので、<code>user?.name</code> のように安全に扱えます。
      </p>
      <Aside label="Cookie も文字列の保存領域">
        <code>document.cookie</code> で読み書きする<Term>Cookie</Term>も、ブラウザに文字列を保存する仕組みです。ただしサイズが小さく、リクエストのたびにサーバーへ自動送信されるため、主にログイン状態の管理などに使われます。日常的な保存には、サーバーへ送られない <code>localStorage</code> のほうが手軽です。いずれにせよ<strong>読み書きを関数でラップする</strong>方針は共通です。
      </Aside>

      <Heading num="まとめ">画面という「外の世界」を、計算と分けて扱う</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>DOM更新は副作用</h4>
          <p>
            データ → 描画関数(純粋) → DOM(副作用)の2段で書き、「何を表示するか」の計算と「書き込む」副作用を分けます。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>取得は失敗しうる</h4>
          <p>
            <code>querySelector</code> の戻り値は <code>{"HTMLElement | null"}</code>。<code>null</code> を絞り込んでから使うことを型が促します。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ハンドラは名前付きの関数</h4>
          <p>
            イベントハンドラはコールバック。別関数として定義して渡し、TSでは <code>{"(e: MouseEvent) => void"}</code> と型が付きます。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>I/Oを関数でラップ</h4>
          <p>
            ストレージの読み書きは <code>saveUser</code> / <code>loadUser</code> に閉じ込め、TSでは <code>JSON.parse</code> の結果に <code>interface</code> で型を与えます。
          </p>
        </Card>
      </CardGrid>
      <p>
        DOM・イベント・ストレージという副作用を、いずれも<strong>計算と切り分けて関数に閉じ込める</strong>という一貫した方針で扱ってきました。ところで、この章の <code>toItem</code> のような「値を受け取り値を返す関数」や、<code>loadUser</code> のような「型を付けた入れ物」は、扱う型が変わるたびに書き直すのは面倒です。次章「<Link href="/dev/language/generics">ジェネリクスとユーティリティ型</Link>」では、<strong>型そのものを引数のように受け取る</strong>ジェネリクスを学び、<code>{"HTMLElement | null"}</code> のような型を自在に組み立て・変換する道具を手に入れます。
      </p>

      <DocsFooter />
    </DocsPage>
  );
}
