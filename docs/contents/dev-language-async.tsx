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
  title: "非同期処理",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>JavaScript / TypeScript</Eyebrow>
        <h1>第7章 非同期処理</h1>
        <Lead>
          前章「<Link href="/dev/language/engine">実行の仕組み</Link>」では、関数呼び出しがコールスタックに積まれ、上から順に片づけられていく様子を見ました。ところが「サーバーからデータを取ってくる」ような<strong>時間のかかる処理</strong>を素直にその場で待つと、待っている間プログラム全体が止まってしまいます。この章では、待ち時間の間も他の処理を進める<Term>非同期処理</Term>を学びます。鍵になる考え方は、非同期も<strong>「いつか値を返すPromise」という1つの値</strong>として扱い、取得(副作用)と変換(純粋関数)を分けて書くこと。いつものように、まず素直なJavaScriptで理解し、同じ結果になるTypeScriptではどう型を付けるのかを書き比べていきます。
        </Lead>
      </Hero>

      <Heading num="7.1">非同期の考え方</Heading>
      <p>
        JavaScriptは<Term>シングルスレッド</Term>、つまり「一度に1つのことしかできない」言語です。もし通信やタイマーのように結果が返るまで時間のかかる処理を、その場で<strong>結果が出るまで待って</strong>しまうと、その間ボタンのクリックも画面の更新も一切受け付けられなくなります。これが<Term>同期</Term>的な待ち方の問題です。そこで「時間のかかる処理は裏で進めておき、終わったら結果を受け取る」という<Term>非同期</Term>の仕組みが使われます。
      </p>
      <p>
        非同期処理の順番を体感するために、もっとも身近な <code>setTimeout</code>(指定時間後に関数を実行する)を使ってみましょう。<code>0</code>ミリ秒を指定しても、その関数は<strong>「今すぐ」ではなく「今の処理をすべて終えたあと」</strong>に実行されます。
      </p>
      <CodeCompare
        js={`console.log("1: 最初");

setTimeout(() => {
  console.log("3: あとで(非同期)");
}, 0);

console.log("2: 次");

// 出力される順番:
// 1: 最初
// 2: 次
// 3: あとで(非同期)`}
        ts={`console.log("1: 最初");

setTimeout(() => {
  console.log("3: あとで(非同期)");
}, 0);

console.log("2: 次");

// 出力される順番(JS と同一):
// 1: 最初
// 2: 次
// 3: あとで(非同期)`}
      />
      <p>
        <code>0</code>ミリ秒なのに<code>3</code>が最後に出るのは、JavaScriptが<Term>イベントループ</Term>という仕組みで動いているからです。同期的なコードはコールスタックで一気に処理され、<code>setTimeout</code>に渡した関数のような非同期の処理は、いったん脇に避けられて<strong>「スタックが空になってから」</strong>実行されます。おおまかな流れは次のとおりです。
      </p>
      <Diagram caption="イベントループ: 非同期処理は裏で進み、コールスタックが空になったタイミングでキューから呼び戻される">
        <svg viewBox="0 0 640 210" xmlns="http://www.w3.org/2000/svg">
          <rect x={30} y={30} width={170} height={60} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={115} y={56} fill="#f2f2f2" fontSize="12" textAnchor="middle">コールスタック</text>
          <text x={115} y={74} fill="#9a9a9a" fontSize="10" textAnchor="middle">同期コードを実行</text>

          <rect x={440} y={30} width={170} height={60} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={525} y={56} fill="#f2f2f2" fontSize="12" textAnchor="middle">Web API / タイマー</text>
          <text x={525} y={74} fill="#9a9a9a" fontSize="10" textAnchor="middle">裏で時間待ち</text>

          <rect x={440} y={130} width={170} height={55} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={525} y={153} fill="#f2f2f2" fontSize="12" textAnchor="middle">タスクキュー</text>
          <text x={525} y={171} fill="#9a9a9a" fontSize="10" textAnchor="middle">完了した処理が並ぶ</text>

          <rect x={30} y={130} width={170} height={55} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={115} y={153} fill="#f2f2f2" fontSize="12" textAnchor="middle">イベントループ</text>
          <text x={115} y={171} fill="#9a9a9a" fontSize="10" textAnchor="middle">空なら次を渡す</text>

          <line x1={200} y1={50} x2={438} y2={50} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowAsync)" />
          <text x={319} y={42} fill="#9a9a9a" fontSize="10" textAnchor="middle">非同期処理を委譲</text>

          <line x1={525} y1={90} x2={525} y2={128} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowAsync)" />
          <text x={560} y={114} fill="#9a9a9a" fontSize="10" textAnchor="middle">完了</text>

          <line x1={438} y1={157} x2={202} y2={157} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowAsync)" />
          <text x={319} y={149} fill="#9a9a9a" fontSize="10" textAnchor="middle">順番に取り出す</text>

          <line x1={115} y1={128} x2={115} y2={92} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowAsync)" />
          <text x={150} y={114} fill="#9a9a9a" fontSize="10" textAnchor="middle">戻す</text>

          <defs>
            <marker id="arrowAsync" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>
      <Analogy label="💡 たとえるなら">
        レストランの店員(JavaScript)は1人だけです。ある客の料理ができるのを厨房の前で立って待っていたら、他の客の注文をまったく取れません。そこで店員は注文だけ厨房(裏の処理)に通し、自分は別の客の対応を続けます。料理ができたら「呼び出しベル」が鳴り、手が空いたタイミングで運びにいく ― これが非同期処理です。
      </Analogy>
      <p>
        この章を通して大切にしたいのが、<strong>副作用は境界でまとめる</strong>という関数型の姿勢です。通信やタイマーのような「外の世界とやり取りする処理」は、どうしても<Term>副作用</Term>を持ちます。それらをプログラムのあちこちに散らすのではなく、<strong>「取ってくる(副作用)」と「取ってきた値を変換する(純粋関数)」を分ける</strong>。この分離が、非同期処理を読みやすく・テストしやすくする土台になります。TypeScriptは、この境界を流れる値に「これは<code>{"Promise<User>"}</code>だ」といった型を与え、契約として見えるようにしてくれます。
      </p>

      <Heading num="7.2">コールバックと配列メソッド(復習)</Heading>
      <p>
        非同期の道具に入る前に、その土台となる<Term>コールバック関数</Term>(関数に渡す関数)と、第3章「<Link href="/dev/language/data">データの変換</Link>」で学んだ配列メソッドを短く復習します。<code>map</code> / <code>filter</code> / <code>reduce</code> にコールバックを渡す形は、これから見る非同期処理とまったく同じ「関数を渡す」パターンだからです。まずは復習として、同じ入出力になるJS/TSを並べます。
      </p>
      <CodeCompare
        js={`const nums = [1, 2, 3, 4, 5, 6];

const doubled = nums.map((n) => n * 2);
const evens = nums.filter((n) => n % 2 === 0);
const sum = nums.reduce((acc, n) => acc + n, 0);

console.log(doubled); // [2, 4, 6, 8, 10, 12]
console.log(evens);   // [2, 4, 6]
console.log(sum);     // 21`}
        ts={`const nums: number[] = [1, 2, 3, 4, 5, 6];

const doubled: number[] = nums.map((n: number) => n * 2);
const evens: number[] = nums.filter((n: number) => n % 2 === 0);
const sum: number = nums.reduce((acc: number, n: number) => acc + n, 0);

console.log(doubled); // [2, 4, 6, 8, 10, 12]
console.log(evens);   // [2, 4, 6]
console.log(sum);     // 21`}
      />
      <p>
        これらの変換メソッドは新しい配列を返すので、<strong>数珠つなぎ(チェーン)</strong>にできます。「偶数だけ絞り込んで、それぞれを10倍する」という2段階の変換を、<code>filter().map()</code> と1本のパイプラインで書けます。小さな純粋関数を並べて大きな変換を組み立てる ― これが関数型スタイルの中心です。
      </p>
      <CodeCompare
        js={`const nums = [1, 2, 3, 4, 5, 6];

// 偶数を絞り込み → 10倍する(チェーン)
const result = nums
  .filter((n) => n % 2 === 0)
  .map((n) => n * 10);

console.log(result); // [20, 40, 60]

// もう一段: 絞り込み → 変換 → 合計
const total = nums
  .filter((n) => n % 2 === 0)
  .map((n) => n * 10)
  .reduce((acc, n) => acc + n, 0);

console.log(total); // 120`}
        ts={`const nums: number[] = [1, 2, 3, 4, 5, 6];

// 偶数を絞り込み → 10倍する(チェーン)
const result: number[] = nums
  .filter((n: number) => n % 2 === 0)
  .map((n: number) => n * 10);

console.log(result); // [20, 40, 60]

// もう一段: 絞り込み → 変換 → 合計
const total: number = nums
  .filter((n: number) => n % 2 === 0)
  .map((n: number) => n * 10)
  .reduce((acc: number, n: number) => acc + n, 0);

console.log(total); // 120`}
      />
      <p>
        出力はJS/TSとも <code>[20, 40, 60]</code> と <code>120</code> で同一です。<strong>TypeScriptだけの価値</strong>は、チェーンの各段で「今どんな型の配列を扱っているか」が追跡され、たとえば <code>filter</code> の途中で数値を文字列扱いするような取り違えを実行前に弾けること。コールバックを渡す・チェーンでつなぐという感覚をつかんだところで、いよいよ非同期処理に進みます。
      </p>

      <Heading num="7.3">Promise ― いつか返る値</Heading>
      <p>
        <Term>Promise</Term>は「<strong>いつか値が返ってくる</strong>」ことを表すオブジェクトです。まだ結果は出ていないけれど、成功したら値を渡す(<Term>resolve</Term>)、失敗したら理由を渡す(<Term>reject</Term>)という<strong>約束(promise)の引換券</strong>だと考えてください。ここで重要なのは、Promiseは特別な文法ではなく<strong>ただの値</strong>で、変数に入れたり関数から返したりできるということです。
      </p>
      <p>
        受け取った結果に対しては <code>.then()</code>(成功時)、<code>.catch()</code>(失敗時)、<code>.finally()</code>(成否にかかわらず最後に)をつなげます。<code>.then()</code> は新しいPromiseを返すので、配列の <code>map</code> と同じように<strong>チェーンで合成</strong>できます。
      </p>
      <Aside label="ここからTSが加わる">
        Promiseに型を付ける場所は <code>{"Promise<T>"}</code> という形です。<code>T</code> は<strong>解決されたときに返ってくる値の型</strong>を表します。たとえば数値を返すPromiseは <code>{"Promise<number>"}</code>、ユーザーを返すなら <code>{"Promise<User>"}</code>。<code>new Promise</code> で作るときは <code>{"new Promise<number>(...)"}</code> のように型引数を渡します。
      </Aside>
      <CodeCompare
        js={`// 1秒後に成功する Promise を作る
const asyncDouble = (n) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(n * 2), 1000);
  });

asyncDouble(10)
  .then((result) => {
    console.log(result); // 20
    return result + 1;   // then は新しい Promise を返す
  })
  .then((next) => console.log(next)) // 21
  .catch((err) => console.error(err))
  .finally(() => console.log("完了"));`}
        ts={`// 解決される値は number → Promise<number>
const asyncDouble = (n: number): Promise<number> =>
  new Promise<number>((resolve) => {
    setTimeout(() => resolve(n * 2), 1000);
  });

asyncDouble(10)
  .then((result: number) => {
    console.log(result); // 20
    return result + 1;   // then は新しい Promise を返す
  })
  .then((next: number) => console.log(next)) // 21
  .catch((err: unknown) => console.error(err))
  .finally(() => console.log("完了"));`}
      />
      <p>
        どちらも <code>20</code> → <code>21</code> → <code>{'"完了"'}</code> の順に出力され、結果は同一です。TypeScriptでは <code>{"Promise<number>"}</code> と書いたことで、<code>.then</code> の中の <code>result</code> が自動的に <code>number</code> 型になり、続くチェーンでも型が引き継がれます。Promiseを「値の入った箱」、<code>.then</code> を「箱の中身を変換する <code>map</code>」だと捉えると、これまでの関数型の感覚がそのまま活きます。
      </p>

      <Heading num="7.4">async / await ― 非同期を同期のように書く</Heading>
      <p>
        <code>.then()</code> のチェーンは強力ですが、処理が増えると入れ子や見通しの悪さが気になってきます。そこで登場するのが <Term>async / await</Term> です。関数に <code>async</code> を付けると、その中では <code>await</code> が使えるようになり、<strong>Promiseの結果を「待って受け取る」まで、あたかも同期処理のように</strong>まっすぐ書けます。書き方が変わるだけで、<strong>やっていることは7.3のPromiseチェーンと同じ</strong>です。
      </p>
      <CodeCompare
        js={`const asyncDouble = (n) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(n * 2), 1000);
  });

// then チェーン版
function withThen() {
  return asyncDouble(10).then((result) => result + 1);
}

// async/await 版(同じ結果)
async function withAwait() {
  const result = await asyncDouble(10);
  return result + 1;
}

withAwait().then((v) => console.log(v)); // 21`}
        ts={`const asyncDouble = (n: number): Promise<number> =>
  new Promise<number>((resolve) => {
    setTimeout(() => resolve(n * 2), 1000);
  });

// then チェーン版
function withThen(): Promise<number> {
  return asyncDouble(10).then((result) => result + 1);
}

// async/await 版(同じ結果)
async function withAwait(): Promise<number> {
  const result = await asyncDouble(10); // result は number
  return result + 1;
}

withAwait().then((v) => console.log(v)); // 21`}
      />
      <p>
        両版とも最終的に <code>21</code> を出力します。ここで大切なのは、<strong><code>async</code> 関数は必ずPromiseを返す</strong>という点です。だからTS版の戻り値型は <code>{"Promise<number>"}</code> になります。関数の中で <code>return result + 1</code>(ただの数値)と書いても、<code>async</code> が自動でその値を <code>{"Promise<number>"}</code> に包んでくれます。そして <code>await asyncDouble(10)</code> で受け取った <code>result</code> は、すでに箱から取り出されて <code>number</code> 型になっています。
      </p>
      <p>
        エラーの扱いも同期処理と同じ <code>try</code> / <code>catch</code> で書けます。<code>await</code> した処理が失敗(reject)すると、その場で例外が投げられ <code>catch</code> に流れます。
      </p>
      <CodeCompare
        js={`async function loadName(id) {
  try {
    const user = await fetchUser(id);
    return user.name;
  } catch (err) {
    console.error("取得失敗:", err);
    return "(不明)";
  }
}`}
        ts={`async function loadName(id: number): Promise<string> {
  try {
    const user = await fetchUser(id);
    return user.name;
  } catch (err) {
    console.error("取得失敗:", err);
    return "(不明)";
  }
}`}
      />
      <p>
        <code>try</code> / <code>catch</code> は手軽ですが、「失敗するかもしれない」という事実が関数の型(<code>{"Promise<string>"}</code>)には表れません。ここで第4章「<Link href="/dev/language/types">型を使いこなす</Link>」で見た<Term>Result型</Term>が効いてきます。成功と失敗を<strong>投げる(throw)のではなく、値として返す</strong>ようにすると、呼び出し側は型を見るだけで「失敗を扱う必要がある」と分かります。
      </p>
      <CodeCompare
        js={`// 成功/失敗を「値」として返す(throw しない)
async function loadName(id) {
  try {
    const user = await fetchUser(id);
    return { ok: true, value: user.name };
  } catch (err) {
    return { ok: false, error: "取得に失敗しました" };
  }
}

const r = await loadName(1);
console.log(r.ok ? r.value : r.error);`}
        ts={`// 判別可能 Union で成功/失敗を表す Result 型
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

async function loadName(id: number): Promise<Result<string>> {
  try {
    const user = await fetchUser(id);
    return { ok: true, value: user.name };
  } catch {
    return { ok: false, error: "取得に失敗しました" };
  }
}

const r = await loadName(1);
console.log(r.ok ? r.value : r.error); // ok を調べた先で型が絞られる`}
      />
      <p>
        実行時の振る舞いはJS/TSで同じですが、TS版は <code>{"Promise<Result<string>>"}</code> という戻り値型が「この関数は失敗しうる」ことを明示します。<code>r.ok</code> を調べた分岐の中では、成功側では <code>value</code>、失敗側では <code>error</code> だけが型として見える(<Term>Narrowing</Term>)ため、存在しないプロパティを読むミスを実行前に防げます。
      </p>

      <Heading num="7.5">Fetch API ― 取得と変換を分ける</Heading>
      <p>
        実際にサーバーと通信するときの標準的な道具が <Term>Fetch API</Term> です。<code>fetch(url)</code> はPromiseでレスポンスを返し、そのレスポンスを <code>.json()</code>(これもPromise)でJavaScriptの値に変換します。まずはもっとも基本的なGET ― データを取ってくる ― を見ます。
      </p>
      <CodeCompare
        js={`async function getUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  const data = await res.json();
  return data;
}

const user = await getUser(1);
console.log(user.name);`}
        ts={`async function getUser(id: number): Promise<unknown> {
  const res = await fetch(\`/api/users/\${id}\`);
  const data = await res.json(); // json() の結果は any
  return data;
}

const user = await getUser(1);
console.log(user.name);`}
      />
      <p>
        ここで<strong>関数型の視点から見たときの問題</strong>が2つあります。1つは、<code>fetch</code> と <code>res.json()</code> という<strong>副作用(I/O)</strong>と、取ってきた生データを<strong>アプリで使う形に整える変換</strong>とが、1つの関数に混ざっていること。もう1つは、<code>res.json()</code> の戻り値がTypeScriptでは <code>any</code> 相当で、<code>user.name</code> と書いても<strong>まったく型の保証がない</strong>ことです。
      </p>
      <p>
        そこで<strong>取得(副作用)と変換(純粋関数)を分離</strong>します。「通信してJSONを取る」I/O部分と、「取れたJSONをドメインの型(<code>User</code>)に整える」純粋関数を別々にするのです。純粋関数側は通信しないので、そのままテストできます。
      </p>
      <CodeCompare
        js={`// (1) 変換: JSON → アプリで使う形(純粋関数・通信しない)
function toUser(json) {
  return {
    id: json.id,
    name: json.name,
    isAdult: json.age >= 18,
  };
}

// (2) I/O: 通信して JSON を取り、変換関数に渡すだけ
async function fetchUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  const json = await res.json();
  return toUser(json);
}

// モック JSON { id: 1, name: "Alice", age: 30 } なら:
// => { id: 1, name: "Alice", isAdult: true }`}
        ts={`interface User {
  id: number;
  name: string;
  isAdult: boolean;
}

// (1) 変換: JSON → User(純粋関数・通信しない)
function toUser(json: any): User {
  return {
    id: json.id,
    name: json.name,
    isAdult: json.age >= 18,
  };
}

// (2) I/O: 通信して JSON を取り、変換関数に渡すだけ
async function fetchUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  const json = await res.json();
  return toUser(json);
}

// モック JSON { id: 1, name: "Alice", age: 30 } なら:
// => { id: 1, name: "Alice", isAdult: true }`}
      />
      <p>
        同じモックJSON <code>{'{ id: 1, name: "Alice", age: 30 }'}</code> を渡せば、パース後のオブジェクトはJS/TSとも <code>{'{ id: 1, name: "Alice", isAdult: true }'}</code> で同一です。TS版では変換関数の戻り値を <code>User</code> と宣言しているので、<code>fetchUser</code> の型が <code>{"Promise<User>"}</code> となり、<strong>境界(<code>toUser</code>)を越えたあとは型が保証された世界</strong>になります。型の付かない <code>any</code> を <code>toUser</code> の内側に閉じ込めるのがコツです。
      </p>
      <p>
        データを送るPOSTも、形はGETとほぼ同じです。<code>fetch</code> の第2引数に <code>method</code> や <code>body</code> を渡し、送る値は <code>JSON.stringify</code> で文字列にします。ここでも「送るデータを組み立てる純粋な部分」と「実際に送るI/O」を分けて考えられます。
      </p>
      <CodeCompare
        js={`async function createUser(input) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return res.json();
}

const created = await createUser({ name: "Bob", age: 20 });`}
        ts={`interface NewUser {
  name: string;
  age: number;
}

async function createUser(input: NewUser): Promise<User> {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json = await res.json();
  return toUser(json);
}

const created = await createUser({ name: "Bob", age: 20 });`}
      />
      <p>
        TS版では、送るデータ <code>input</code> に <code>NewUser</code> 型を付けたことで、<code>name</code> を書き忘れたオブジェクトを渡すと実行前にエラーになります。送る側・受け取る側の両方の境界に型があることで、通信をまたいだデータの形が契約として守られます。
      </p>

      <Heading num="7.6">非同期の型パターン</Heading>
      <p>
        最後に、複数の非同期処理をまとめて扱うときの型を見ます。よく使うのが <code>Promise.all</code> ― <strong>複数のPromiseを並行して走らせ、すべて揃うのを待つ</strong>道具です。1件ずつ <code>await</code> すると順番待ちになりますが、<code>Promise.all</code> なら同時に走らせられます。<code>map</code> で「IDの配列」を「Promiseの配列」に変換し、それを <code>Promise.all</code> に渡すのが定番の組み合わせです。
      </p>
      <CodeCompare
        js={`// ID の配列 → 各ユーザーを並行取得
async function fetchUsers(ids) {
  const promises = ids.map((id) => fetchUser(id));
  const users = await Promise.all(promises);
  return users;
}

const users = await fetchUsers([1, 2, 3]);
console.log(users.length); // 3
// users は「取得したユーザーの配列」だが、
// JS では中身の型は保証されない(実質 any)`}
        ts={`// ID の配列 → 各ユーザーを並行取得
async function fetchUsers(ids: number[]): Promise<User[]> {
  const promises: Promise<User>[] = ids.map((id) => fetchUser(id));
  const users: User[] = await Promise.all(promises);
  return users;
}

const users = await fetchUsers([1, 2, 3]);
console.log(users.length); // 3
// users は User[] と型が付き、users[0].name も安全`}
      />
      <p>
        実行結果はJS/TSとも「3人分のユーザーの配列」で同じですが、<strong>ここがTypeScriptの効きどころ</strong>です。JS版の <code>users</code> は「ただの配列」で、要素にどんなプロパティがあるかはコードを読んでも分かりません。TS版では <code>{"Promise.all<User>"}</code> の型推論により結果が <code>User[]</code> と分かり、<code>users[0].name</code> まで補完と型チェックが効きます。<code>{"Promise<T>[]"}</code> を渡すと <code>{"Promise<T[]>"}</code> が返る ― この型の流れが、<code>any</code> に流されがちな非同期のコードを引き締めてくれます。
      </p>
      <p>
        揃うのを待つ <code>Promise.all</code> に対し、<strong>いちばん早く決着した1つ</strong>だけを採用するのが <code>Promise.race</code> です。「一定時間で打ち切るタイムアウト」などに使われます。型としては、複数の <code>{"Promise<T>"}</code> のうち最初の結果 <code>T</code> を返します。
      </p>
      <CodeCompare
        js={`function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("時間切れ")), ms);
  });
}

// データ取得か、3秒のタイムアウトか、早い方
async function fetchWithTimeout(id) {
  return Promise.race([fetchUser(id), timeout(3000)]);
}`}
        ts={`function timeout(ms: number): Promise<never> {
  return new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("時間切れ")), ms);
  });
}

// 早い方を採用。成功すれば User、遅ければ reject
async function fetchWithTimeout(id: number): Promise<User> {
  return Promise.race([fetchUser(id), timeout(3000)]);
}`}
      />
      <p>
        TS版では <code>Promise.race</code> に <code>{"Promise<User>"}</code> と <code>{"Promise<never>"}</code> を渡しているため、成功時の結果は <code>User</code> と推論されます(<code>never</code> は「値を返さない=タイムアウトは常にrejectする」ことを表す型です)。<code>async</code> 関数の返り値型に <code>{"Promise<User>"}</code> と書いておけば、この関数を使う側は「待てば <code>User</code> が返る」という契約だけを見て安心して組み合わせられます。
      </p>

      <Heading num="まとめ">この章のまとめ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>非同期は値を返すPromise</h4>
          <p>時間のかかる処理は裏で進め、結果は<Term>Promise</Term>という「いつか返る値の箱」で受け取ります。<code>.then</code> は箱の中身を変換する <code>map</code> のようなものです。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>async / await が主流</h4>
          <p><code>await</code> で結果を取り出し、同期処理のようにまっすぐ書けます。<code>async</code> 関数は必ず <code>{"Promise<T>"}</code> を返し、エラーは <code>try</code> / <code>catch</code> や<Term>Result型</Term>で扱います。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>取得と変換を分ける</h4>
          <p><code>fetch</code> などのI/O(副作用)と、取れたデータをドメイン型に整える純粋関数を分離。<code>any</code> を境界の内側に閉じ込めれば、以降は型の効く世界になります。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>型でまとめて扱う</h4>
          <p><code>Promise.all</code> + <code>map</code> で並行処理を書くと、TSは <code>{"Promise<T[]>"}</code> と結果型まで導いてくれます。JSでは <code>any</code> になりがちな部分こそ型の効きどころです。</p>
        </Card>
      </CardGrid>
      <p>
        非同期処理は、通信やタイマーといった<strong>外の世界とのやり取り</strong>を扱う技術でした。その「外の世界」の代表格が、私たちが今見ているブラウザそのものです。次章「<Link href="/dev/language/browser">ブラウザ ― Web API</Link>」では、DOMの操作やイベント、ストレージといったブラウザの機能を、この章で身につけた「計算(純粋関数)と副作用を分けて書く」姿勢のまま学んでいきます。
      </p>

      <DocsFooter />
    </DocsPage>
  );
}
