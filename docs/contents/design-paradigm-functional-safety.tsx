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
  Mark,
  MarkNote,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "安全に分岐する",
};

type Tier = "must" | "niche";

function TierBadge({ tier }: { tier: Tier }) {
  if (tier === "must") return <Mark tier="must">必須</Mark>;
  return <Mark tier="niche">よく使う</Mark>;
}

type Row = { name: string; desc: string; tier: Tier; note?: string };

const rows: Row[] = [
  { name: "Pattern Matching(パターンマッチング)", desc: "条件分岐をシンプルに", tier: "niche" },
  { name: "Option / Maybe", desc: "nullをなくす", tier: "niche", note: "→ TypeScriptには専用の型はなく、Union型やOptional Chainingで代替する" },
  { name: "Either / Result", desc: "エラー処理", tier: "niche" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; パラダイム &middot; 関数型 &middot; パターン</Eyebrow>
        <h1>安全に分岐する ― パターンマッチング・Option/Maybe・Either/Result</h1>
        <Lead>
          「値が無いかもしれない」「処理が失敗するかもしれない」ことを、<code>null</code>チェックの飛び交うif文や例外(<code>throw</code>)ではなく、型と分岐だけで表現する3つの技法です。Option/Maybe・Either/Resultで「かもしれない値」を型として表し、パターンマッチングでその中身を安全に取り出します。
        </Lead>
      </Hero>

      <Heading num="01">3つの技法</Heading>
      <table>
        <thead>
          <tr><th>技法</th><th>内容</th><th>区分</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="hl">{row.name}</td>
              <td>{row.desc}</td>
              <td><TierBadge tier={row.tier} />{row.note && <MarkNote>{row.note}</MarkNote>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">Option / Maybe ― 値が無いかもしれないことを型で表す</Heading>
      <p>関数が「値を返せないかもしれない」場合、<code>null</code>を返して呼び出し側にチェックを委ねると、チェックを忘れた瞬間に実行時エラーになります。<Term>Option(Maybe)</Term>は、値が「有る」か「無い」かを型そのものに含め、コンパイラに中身のチェックを強制させる考え方です。TypeScriptには専用の型はありませんが、Union型で同じ発想を表現できます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`type Option<T> = { kind: "some"; value: T } | { kind: "none" };

function findUser(id: string): Option<User> {
  const user = users.find((u) => u.id === id);
  return user ? { kind: "some", value: user } : { kind: "none" };
}

// findUser(id).name のような「呼び出せてしまう」書き方自体ができない`}</code>
      </pre>
      <p>実務では自前のOption型を作らず、<code>User | undefined</code>という戻り値の型と<Term>Optional Chaining(?.)</Term>・<Term>Nullish Coalescing(??)</Term>を組み合わせるだけで、同じ安全性を得られることがほとんどです。</p>

      <Heading num="03">Either / Result ― 例外の代わりに、失敗も戻り値として表現する</Heading>
      <p><Term>Either(Result)</Term>は、処理の「成功」と「失敗」の両方を戻り値の型として表現する考え方です。<code>throw</code>による例外は、関数のシグネチャ(型)だけを見ても投げられうるかどうかが分からず、呼び出し側がtry/catchを書き忘れても気づけません。Result型なら、失敗する可能性そのものが戻り値の型に現れるため、コンパイラが処理漏れを指摘してくれます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function parsePrice(input: string): Result<number, string> {
  const n = Number(input);
  return Number.isNaN(n)
    ? { ok: false, error: \`"\${input}"は数値に変換できません\` }
    : { ok: true, value: n };
}`}</code>
      </pre>

      <Heading num="04">Pattern Matching(パターンマッチング) ― 型・形に応じて分岐する</Heading>
      <p>Option/Resultのように「複数の形のどれか」を表す型を作っても、中身を安全に取り出す手段がなければ意味がありません。<Term>パターンマッチング</Term>は、値の形(タグ・構造)に応じて分岐し、すべてのケースを網羅したかをコンパイラに確認させる仕組みです。Haskell・Rustのような専用の<code>match</code>構文はTypeScriptにはありませんが、<Term>判別可能ユニオン(Discriminated Union)</Term>と<code>switch</code>、そして<code>never</code>型を使った網羅性チェックで同じ効果を得られます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function unwrap(result: Result<number, string>): string {
  switch (result.ok) {
    case true:
      return \`成功: \${result.value}\`;
    case false:
      return \`失敗: \${result.error}\`;
    default:
      // resultが上の2ケース以外ありえないことをコンパイラが保証する
      const _exhaustive: never = result;
      return _exhaustive;
  }
}`}</code>
      </pre>

      <Heading num="05">3つがどうつながるか</Heading>
      <p>Option/Maybeは「値が無いかもしれない」を、Either/Resultは「処理が失敗するかもしれない」を、それぞれ型として表現するための入れ物です。パターンマッチングは、その入れ物の中身を「有る/無い」「成功/失敗」で分岐して安全に取り出すための手段です。3つはセットで使って初めて、<code>null</code>チェック漏れや例外の投げ忘れをコンパイラに検出させられます。</p>

      <Analogy label="💡 たとえるなら">
        Option/Maybeは「中身が入っているかもしれない、空かもしれない箱」、Either/Resultは「当たりか外れかが書かれたくじ」です。パターンマッチングは、箱を開ける前・くじを開く前に「空だった場合」「外れだった場合」の両方の手順を用意しておくことを強制する検品ルールで、手順の用意漏れがあれば箱を開ける(コンパイル)前に気づけます。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Option/Maybe</h4><p>値の有無を型で表し、nullチェック漏れをコンパイラに検出させる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Either/Result</h4><p>成功・失敗を戻り値の型で表し、例外の投げ忘れ・catch忘れを防ぐ。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>パターンマッチング</h4><p>すべてのケースを網羅したかを、switch文とnever型で確認する。</p></Card>
      </CardGrid>

      <p>ここまで4ページで、純粋関数とイミュータビリティを土台に、関数を組み合わせ、引数を固定し、値の有無・成否を安全に扱う技法まで、関数型で最低限押さえておきたい12個の技法を見てきました。次は、これらの技法が言語ごとにどう実装として現れるかを、<Link href="/design/idioms">実装パターン・イディオム</Link>で見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/paradigm/functional/currying" tag="設計">引数を固定する</RelatedLink>
                    <RelatedLink href="/design/patterns" tag="設計">設計パターン一覧</RelatedLink>
                    <RelatedLink href="/design/idioms" tag="設計">実装パターン・イディオム</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
