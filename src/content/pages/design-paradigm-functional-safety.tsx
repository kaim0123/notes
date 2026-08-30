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
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "安全に分岐する",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>安全に分岐する ― Option・Result・パターンマッチング</h1>
        <Lead>
          「値が無いかもしれない」「処理が失敗するかもしれない」ことを、<code>null</code>チェックの飛び交うif文や例外ではなく、型と分岐だけで表現する3つの技法です。Option/MaybeとEither/Resultで「かもしれない値」を型として表し、パターンマッチングでその中身を安全に取り出します。
        </Lead>
      </Hero>

      <Heading num="01">Option / Maybe ― 値が無いかもしれないことを型で表す</Heading>
      <p>
        関数が値を返せないかもしれない場合、<code>null</code>を返して呼び出し側にチェックを委ねると、チェックを忘れた瞬間に実行時エラーになります。<Term>Option(Maybe)</Term>は、値が「有る」か「無い」かを型そのものに含め、中身のチェックをコンパイラに強制させる考え方です。TypeScriptに専用の型はありませんが、Union型で同じ発想を表現できます。
      </p>
      <pre>
        <code>{`type Option<T> = { kind: "some"; value: T } | { kind: "none" };

function findUser(id: string): Option<User> {
  const user = users.find((u) => u.id === id);
  return user ? { kind: "some", value: user } : { kind: "none" };
}

// findUser(id).name のような「呼び出せてしまう」書き方自体ができない`}</code>
      </pre>
      <p>
        実務では自前のOption型を作らず、<code>User | undefined</code>という戻り値の型と<Term>Optional Chaining</Term>・<Term>Nullish Coalescing</Term>の組み合わせで同じ安全性を得られることがほとんどです。
      </p>

      <Heading num="02">Either / Result ― 失敗も戻り値として表現する</Heading>
      <p>
        <Term>Either(Result)</Term>は、処理の成功と失敗の両方を戻り値の型として表現する考え方です。例外は関数の型だけを見ても投げられうるか分からず、呼び出し側がtry/catchを書き忘れても気づけません。Result型なら、失敗する可能性そのものが戻り値の型に現れるため、処理漏れをコンパイラが指摘してくれます。
      </p>

      <DiagramFrame
        slug="design-paradigm-functional-result"
        aspect="660 / 300"
        caption="例外とResult型の対比。左では関数が例外を投げるため、戻り値の型に失敗の可能性が現れず、try/catchを書き忘れてもコンパイラは何も言わない。右では関数がResult型を返し、成功の場合と失敗の場合の2つの形が型に現れるので、両方の分岐を書くまでコンパイルが通らない。網羅性はswitch文とnever型で確認する。"
      />

      <pre>
        <code>{`type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function parsePrice(input: string): Result<number, string> {
  const n = Number(input);
  return Number.isNaN(n)
    ? { ok: false, error: "数値に変換できません" }
    : { ok: true, value: n };
}`}</code>
      </pre>

      <Heading num="03">パターンマッチング ― 値の形に応じて分岐する</Heading>
      <p>
        「複数の形のどれか」を表す型を作っても、中身を安全に取り出す手段がなければ意味がありません。<Term>パターンマッチング</Term>は、値の形に応じて分岐し、すべてのケースを網羅したかをコンパイラに確認させる仕組みです。Haskell・Rustのような専用の<code>match</code>構文はTypeScriptにありませんが、<Term>判別可能ユニオン</Term>と<code>switch</code>、そして<code>never</code>型を使った網羅性チェックで同じ効果が得られます。
      </p>
      <pre>
        <code>{`function unwrap(result: Result<number, string>): string {
  switch (result.ok) {
    case true:
      return "成功: " + result.value;
    case false:
      return "失敗: " + result.error;
    default: {
      // 上の2ケース以外ありえないことをコンパイラが保証する
      const exhaustive: never = result;
      return exhaustive;
    }
  }
}`}</code>
      </pre>

      <Heading num="04">3つがどうつながるか</Heading>
      <p>
        Option/Maybeは「値が無いかもしれない」を、Either/Resultは「処理が失敗するかもしれない」を、それぞれ型として表現するための入れ物です。パターンマッチングは、その入れ物の中身を「有る・無い」「成功・失敗」で分岐して安全に取り出す手段です。3つはセットで使って初めて、<code>null</code>チェック漏れや例外の投げ忘れをコンパイラに検出させられます。エラーを設計としてどう扱うかという広い視点は<Link href="/design/errors">エラー設計</Link>で扱います。
      </p>

      <Analogy label="💡 たとえるなら">
        Option/Maybeは「中身が入っているかもしれない、空かもしれない箱」、Either/Resultは「当たりか外れかが書かれたくじ」です。パターンマッチングは、箱を開ける前・くじを開く前に「空だった場合」「外れだった場合」の両方の手順を用意させる検品ルールで、手順の用意漏れがあれば箱を開ける前に気づけます。
      </Analogy>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>Option / Maybe</h4>
          <p>値の有無を型で表し、nullチェック漏れをコンパイラに検出させる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>Either / Result</h4>
          <p>成功と失敗を戻り値の型で表し、例外の投げ忘れやcatch忘れを防ぐ。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>パターンマッチング</h4>
          <p>すべてのケースを網羅したかを、switch文とnever型で確認する。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/design/paradigm-functional-safety" />
    </DocsPage>
  );
}
