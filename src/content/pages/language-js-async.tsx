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
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "非同期処理" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>非同期処理 ― 待っている間に、他を進める</h1>
        <Lead>
          <Link href="/language/js-engine">実行の仕組み</Link>では、関数呼び出しがコールスタックに積まれ、上から順に片づけられていく様子を見ました。ところが「サーバーからデータを取ってくる」ような時間のかかる処理を素直にその場で待つと、待っている間プログラム全体が止まってしまいます。ここでは、待ち時間の間も他の処理を進める<Term>非同期処理</Term>を扱います。鍵は、非同期も「いつか値を返すPromise」という1つの値として扱い、取得(副作用)と変換(純粋関数)を分けて書くことです。
        </Lead>
      </Hero>

      <Heading num="01">イベントループ ― なぜ0ミリ秒でも後回しなのか</Heading>
      <p>
        JavaScriptは<Term>シングルスレッド</Term>、つまり一度に1つのことしかできない言語です。結果が返るまで時間のかかる処理をその場で待ってしまうと、その間ボタンのクリックも画面の更新も受け付けられなくなります。そこで「時間のかかる処理は裏で進めておき、終わったら結果を受け取る」という非同期の仕組みが使われます。
      </p>

      <pre>
        <code>{`console.log("1: 最初");
setTimeout(() => console.log("3: あとで(非同期)"), 0);
console.log("2: 次");

// 出力される順番: 1 → 2 → 3
// 0ミリ秒を指定しても「今すぐ」ではなく「今の処理を終えたあと」`}</code>
      </pre>

      <DiagramFrame
        slug="language-js-event-loop"
        aspect="640 / 300"
        caption="イベントループの仕組み。コールスタックは同期コードを実行し、setTimeoutやfetchのような時間のかかる処理に出会うとWeb APIやタイマーへ委譲してすぐ次の行に進む。委譲された処理は裏で待ち、完了するとキューに並ぶ。イベントループはコールスタックが空になったかだけを見張り、空になった瞬間にキューの先頭を取り出してスタックへ戻す。重い計算でスタックが埋まっている間はキューから何も取り出せず、クリックも画面更新も止まる。"
      />

      <Analogy label="💡 たとえるなら">
        レストランの店員(JavaScript)は1人だけです。ある客の料理ができるのを厨房の前で立って待っていたら、他の客の注文をまったく取れません。そこで店員は注文だけ厨房に通し、自分は別の客の対応を続けます。料理ができたら呼び出しベルが鳴り、手が空いたタイミングで運びにいく ―
        これが非同期処理です。
      </Analogy>

      <p>
        この章を通して大切にしたいのが、<Term>副作用は境界でまとめる</Term>という姿勢です。通信やタイマーのような「外の世界とやり取りする処理」は、どうしても副作用を持ちます。それらをあちこちに散らすのではなく、<Term>取ってくる(副作用)と、取ってきた値を変換する(純粋関数)を分ける</Term> ―
        この分離が、非同期処理を読みやすく・テストしやすくする土台になります。
      </p>

      <Heading num="02">Promise ― いつか返る値</Heading>
      <p>
        <Term>Promise</Term>は「いつか値が返ってくる」ことを表すオブジェクトです。まだ結果は出ていないけれど、成功したら値を渡し(<Term>resolve</Term>)、失敗したら理由を渡す(<Term>reject</Term>)という<Term>引換券</Term>だと考えてください。重要なのは、Promiseは特別な文法ではなく<Term>ただの値</Term>で、変数に入れたり関数から返したりできることです。
      </p>
      <p>
        型を付ける場所は<code>{"Promise<T>"}</code>という形で、<code>T</code>は<Term>解決されたときに返ってくる値の型</Term>を表します。
      </p>

      <pre>
        <code>{`// 1秒後に成功する Promise ― 解決される値は number
const asyncDouble = (n: number): Promise<number> =>
  new Promise<number>((resolve) => {
    setTimeout(() => resolve(n * 2), 1000);
  });

asyncDouble(10)
  .then((result) => {
    console.log(result); // 20
    return result + 1;   // then は新しい Promise を返す
  })
  .then((next) => console.log(next))     // 21
  .catch((err: unknown) => console.error(err))
  .finally(() => console.log("完了"));`}</code>
      </pre>

      <p>
        <code>.then()</code>は新しいPromiseを返すので、配列の<code>map</code>と同じようにチェーンで合成できます。Promiseを「値の入った箱」、<code>.then</code>を「箱の中身を変換する<code>map</code>」だと捉えると、これまでの関数型の感覚がそのまま活きます。
      </p>

      <Heading num="03">async / await ― 非同期を同期のように書く</Heading>
      <p>
        <code>.then()</code>のチェーンは強力ですが、処理が増えると見通しが悪くなります。そこで<Term>async / await</Term>です。関数に<code>async</code>を付けると、その中で<code>await</code>が使えるようになり、Promiseの結果を待って受け取るまでまっすぐ書けます。<Term>やっていることはPromiseチェーンと同じ</Term>で、書き方が変わるだけです。
      </p>

      <pre>
        <code>{`// then チェーン版
function withThen(): Promise<number> {
  return asyncDouble(10).then((result) => result + 1);
}

// async/await 版(同じ結果)
async function withAwait(): Promise<number> {
  const result = await asyncDouble(10); // result は number
  return result + 1;
}`}</code>
      </pre>

      <p>
        大切なのは<Term><code>async</code>関数は必ずPromiseを返す</Term>という点です。関数の中で<code>return result + 1</code>とただの数値を書いても、<code>async</code>が自動で<code>{"Promise<number>"}</code>に包みます。逆に<code>await</code>で受け取った値は、すでに箱から取り出された状態です。
      </p>

      <p>
        エラーの扱いも同期処理と同じ<code>try</code>/<code>catch</code>で書けますが、「失敗するかもしれない」という事実が関数の型には表れません。ここで<Link href="/language/js-types">型を使いこなす</Link>で見た<Term>Result型</Term>が効いてきます。
      </p>

      <pre>
        <code>{`type Result<T> =
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
console.log(r.ok ? r.value : r.error); // ok を調べた先で型が絞られる`}</code>
      </pre>

      <p>
        <code>{"Promise<Result<string>>"}</code>という戻り値型が「この関数は失敗しうる」ことを明示します。成功側では<code>value</code>、失敗側では<code>error</code>だけが型として見えるため、存在しないプロパティを読むミスを実行前に防げます。
      </p>

      <Heading num="04">Fetch API ― 取得と変換を分ける</Heading>
      <p>
        実際にサーバーと通信するときの標準的な道具が<Term>Fetch API</Term>です。<code>fetch(url)</code>はPromiseでレスポンスを返し、そのレスポンスを<code>.json()</code>でJavaScriptの値に変換します。ただし素直に書くと、2つの問題が残ります。
      </p>

      <ul>
        <li>
          <strong>副作用と変換が混ざる</strong>: 通信するI/Oと、取ってきた生データを整える変換が1つの関数に同居します。
        </li>
        <li>
          <strong>型の保証がない</strong>: <code>res.json()</code>の戻り値は<code>any</code>相当で、そのまま使うと以降すべてが型なしになります。
        </li>
      </ul>

      <p>
        そこで<Term>取得(副作用)と変換(純粋関数)を分離</Term>します。純粋関数側は通信しないので、そのままテストできます。
      </p>

      <pre>
        <code>{`interface User {
  id: number;
  name: string;
  isAdult: boolean;
}

// (1) 変換 ― JSON を User に整える純粋関数(通信しない)
function toUser(json: any): User {
  return {
    id: json.id,
    name: json.name,
    isAdult: json.age >= 18,
  };
}

// (2) I/O ― 通信して JSON を取り、変換関数に渡すだけ
async function fetchUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  const json = await res.json();
  return toUser(json);
}`}</code>
      </pre>

      <Aside label="any は境界の内側に閉じ込める">
        <code>fetchUser</code>の型が<code>{"Promise<User>"}</code>になることで、<code>toUser</code>という境界を越えたあとは型が保証された世界になります。逆に言えば、<code>toUser</code>の中身が実際のJSONと食い違っていれば型は嘘をつきます。外部データを本当に確かめたいなら、実行時のスキーマ検証と組み合わせます(<Link href="/language/types">型システムの健全性</Link>)。
      </Aside>

      <Heading num="05">複数の非同期をまとめて扱う</Heading>
      <p>
        <code>Promise.all</code>は<Term>複数のPromiseを並行して走らせ、すべて揃うのを待つ</Term>道具です。1件ずつ<code>await</code>すると順番待ちになりますが、<code>Promise.all</code>なら同時に走らせられます。<code>map</code>で「IDの配列」を「Promiseの配列」に変換して渡すのが定番です。
      </p>

      <pre>
        <code>{`async function fetchUsers(ids: number[]): Promise<User[]> {
  const promises: Promise<User>[] = ids.map((id) => fetchUser(id));
  return Promise.all(promises); // Promise<T>[] を渡すと Promise<T[]> が返る
}

const users = await fetchUsers([1, 2, 3]);
console.log(users[0].name); // User[] と分かるので補完も型チェックも効く`}</code>
      </pre>

      <p>
        揃うのを待つ<code>Promise.all</code>に対し、<Term>いちばん早く決着した1つ</Term>だけを採用するのが<code>Promise.race</code>です。一定時間で打ち切るタイムアウトなどに使われます。
      </p>

      <pre>
        <code>{`function timeout(ms: number): Promise<never> {
  return new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("時間切れ")), ms);
  });
}

// 早い方を採用 ― 成功すれば User、遅ければ reject
async function fetchWithTimeout(id: number): Promise<User> {
  return Promise.race([fetchUser(id), timeout(3000)]);
}`}</code>
      </pre>

      <p>
        <code>never</code>は「値を返さない」ことを表す型なので、成功時の結果は<code>User</code>と推論されます。この考え方は、<Link href="/language/concurrency-patterns">並行処理の実装パターン</Link>で扱うタイムアウトやキャンセルの土台にもなります。
      </p>

      <Aside label="await は中断点でもある">
        <code>await</code>は「ここで一旦止まって、他の処理に譲る」という中断点です。この性質があるため、単一スレッドのJavaScriptでも<Link href="/language/concurrency-race">競合状態</Link>が起こります。読んでから書くまでの間に<code>await</code>を挟むときは、その隙間に別の処理が割り込むことを前提に設計してください。
      </Aside>

      <Heading num="まとめ">この章のまとめ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>非同期は値を返すPromise</h4>
          <p>
            結果は「いつか返る値の箱」で受け取ります。<code>.then</code>は箱の中身を変換する<code>map</code>のようなものです。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>async / await が主流</h4>
          <p>
            <code>async</code>関数は必ずPromiseを返し、エラーは<code>try</code>/<code>catch</code>かResult型で扱います。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>取得と変換を分ける</h4>
          <p>
            I/Oと純粋関数を分離し、<code>any</code>を境界の内側に閉じ込めれば、以降は型の効く世界になります。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>まとめて扱う型</h4>
          <p>
            <code>Promise.all</code>は<code>{"Promise<T>[]"}</code>を<code>{"Promise<T[]>"}</code>にします。並行処理の型の流れを押さえておきます。
          </p>
        </Card>
      </CardGrid>

      <p>
        次は、その「外の世界」の代表格である<Link href="/language/js-browser">ブラウザ ― Web API</Link>を、同じ「計算と副作用を分けて書く」姿勢のまま見ていきます。
      </p>

      <DocsFooter href="/language/js-async" />
    </DocsPage>
  );
}
