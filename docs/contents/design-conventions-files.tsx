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
  title: "ファイル・ディレクトリの命名",
};

const fileRows = [
  { kind: "Reactコンポーネント(自前)", rule: "PascalCase.tsx", example: "ContactForm.tsx, FAQAccordion.tsx" },
  { kind: "UI部品(shadcn/ui等)", rule: "kebab-case.tsx", example: "button.tsx, textarea.tsx" },
  { kind: "カスタムフック", rule: "camelCase(use始まり).ts", example: "useMessageField.ts" },
  { kind: "定数・設定", rule: "camelCase.ts", example: "company.ts, announcements.ts" },
  { kind: "ユーティリティ", rule: "camelCase.ts", example: "utils.ts" },
  { kind: "アイコンコンポーネント", rule: "PascalCase.tsx", example: "IconChevronRight.tsx" },
  { kind: "型定義のみ", rule: "camelCase.d.ts等", example: "global.d.ts" },
  { kind: "単体テスト", rule: "<対象>.test.ts(x)", example: "utils.test.ts" },
  { kind: "E2Eテスト", rule: "<ドメイン>.spec.ts", example: "contact-form.spec.ts" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; コーディング規約・スタイル</Eyebrow>
        <h1>ファイル・ディレクトリの命名 ― 中身を推測できる名前</h1>
        <Lead>
          <Link href="/design/conventions/functions">関数</Link>・<Link href="/design/conventions/variables">変数</Link>・<Link href="/design/conventions/classes">クラス</Link>の命名がコード内部の話だとすれば、<Term>ファイル名・ディレクトリ名</Term>はプロジェクトを開いた瞬間に目に入る、最初の情報です。種類ごとに大文字小文字のルールを揃え、ファイル名から中身が推測できる状態を保つ。
        </Lead>
      </Hero>

      <Heading num="01">種類別のファイル名</Heading>
      <table>
        <thead>
          <tr><th>種類</th><th>ファイル名のルール</th><th>例</th></tr>
        </thead>
        <tbody>
          {fileRows.map((row) => (
            <tr key={row.kind}>
              <td className="hl">{row.kind}</td>
              <td><code>{row.rule}</code></td>
              <td><code>{row.example}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">ディレクトリ名</Heading>
      <p><Term>camelCase</Term>または<Term>kebab-case</Term>のどちらかで、プロジェクト内で揃える。役割ごとにディレクトリを切ると、置き場所を見ただけで責務が伝わる。</p>
      <div className="my-5 rounded-xl border border-border bg-card p-5 font-mono text-[0.85rem] leading-relaxed whitespace-pre">
{`src/
  components/          ← コンポーネント
  hooks/contactForm/   ← ドメインごとのフック
  lib/                 ← 共通ユーティリティ
  constants/           ← 定数`}
      </div>

      <Heading num="03">ファイル名とexportの対応</Heading>
      <p><Term>1ファイルに1つの主要export</Term>を基本とし、ファイル名から中身の主役が推測できるようにする。</p>
      <CardGrid>
        <Card><h4>ContactForm.tsx</h4><p><code>export function ContactForm</code> または <code>export const ContactForm</code></p></Card>
        <Card><h4>useMessageField.ts</h4><p><code>export const useMessageField</code></p></Card>
        <Card><h4>company.ts</h4><p><code>export const COMPANY_INFO</code> のような定数</p></Card>
      </CardGrid>

      <Analogy label="💡 たとえるなら">
        ファイル名は本の背表紙のタイトルです。背表紙を見ただけで中身のジャンルと主題が分かれば、本棚(ディレクトリ)を1冊ずつ開かなくても目的の本を探せます。命名規則が揃っていない本棚は、背表紙が白紙の本が並んでいるようなもので、探すたびに中身を開いて確認する手間が発生します。
      </Analogy>

      <p>ここまで<Link href="/design/conventions/functions">関数</Link>・<Link href="/design/conventions/variables">変数</Link>・<Link href="/design/conventions/classes">クラス</Link>・ファイルの4つの粒度で命名規則を見てきました。これで<Term>設計</Term>の各テーマを一通り見終えたことになります。パラダイムから設計思想・方法論、設計原則、アーキテクチャ、設計パターン、実装パターン・イディオム、そして規約・スタイルまで、粒度の異なる7つのレベルを通して「どう組み立てるか」を見てきました。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/conventions/classes" tag="設計">クラス・接尾辞の命名</RelatedLink>
                    <RelatedLink href="/design/conventions" tag="設計">コーディング規約・スタイル</RelatedLink>
                    <RelatedLink href="/design" tag="設計">設計一覧に戻る</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
