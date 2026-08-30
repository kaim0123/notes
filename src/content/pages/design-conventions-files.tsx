import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "ファイル・ディレクトリの命名" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>ファイル・ディレクトリの命名 ― 中身を推測できる名前</h1>
        <Lead>
          ファイル名は、開く前に中身を推測するための唯一の手がかりです。<Term>1ファイルに1つの主要export</Term>を基本とし、ファイル名とその主役を一致させておくと、検索とジャンプだけでコードを追えるようになります。
        </Lead>
      </Hero>

      <Heading num="01">種類別のファイル名</Heading>
      <table>
        <thead>
          <tr><th>種類</th><th>ルール</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Reactコンポーネント</td><td>PascalCase.tsx</td><td><code>ContactForm.tsx</code></td></tr>
          <tr><td className="hl">UI部品(shadcn/ui等)</td><td>kebab-case.tsx</td><td><code>button.tsx</code></td></tr>
          <tr><td className="hl">カスタムフック</td><td>use始まり.ts</td><td><code>use-message-field.ts</code></td></tr>
          <tr><td className="hl">定数・設定</td><td>役割が分かる名詞.ts</td><td><code>routes.ts</code></td></tr>
          <tr><td className="hl">ユーティリティ</td><td>対象を表す名詞.ts</td><td><code>date.ts</code> / <code>currency.ts</code></td></tr>
          <tr><td className="hl">型定義のみ</td><td>.d.ts など</td><td><code>global.d.ts</code></td></tr>
          <tr><td className="hl">単体テスト</td><td>対象名.test.ts</td><td><code>utils.test.ts</code></td></tr>
          <tr><td className="hl">E2Eテスト</td><td>対象領域.spec.ts</td><td><code>contact-form.spec.ts</code></td></tr>
        </tbody>
      </table>
      <p>
        重要なのは表の中身そのものより、<Term>プロジェクト内で1つに揃っている</Term>ことです。同じ種類のファイルが2つの流儀で名付けられていると、探すたびに両方を試すことになります。
      </p>

      <Aside label="大文字小文字はOSによって扱いが違う">
        macOSやWindowsの既定のファイルシステムは大文字小文字を区別しませんが、Linuxは区別します。ローカルでは動いていたimportが、CIやデプロイ先で「ファイルが見つからない」と失敗する事故はこれが原因です。全体をkebab-caseに揃えておくと、この差による事故を避けられます。
      </Aside>

      <Heading num="02">ディレクトリ名</Heading>
      <p>
        ディレクトリ名も1つの記法に揃えます。切り方には、技術的役割で切る方法(<code>components/</code>・<code>hooks/</code>・<code>lib/</code>)と、機能で切る方法(<code>orders/</code>・<code>users/</code>)があり、これは<Link href="/design/architecture-app-layered">レイヤー系アーキテクチャ</Link>で見た水平分割と垂直分割の選択そのものです。規模が小さいうちは前者、機能が育ってきたら後者へ寄せるのが自然な流れになります。
      </p>

      <Heading num="03">ファイル名とexportの対応</Heading>
      <p>
        <Term>1ファイル1主要export</Term>を基本とし、ファイル名から中身の主役が推測できるようにします。<code>ContactForm.tsx</code>を開いたら<code>ContactForm</code>が定義されている ―
        この当たり前の対応が崩れると、名前で検索してもファイルにたどり着けなくなります。
      </p>
      <DiagramFrame
        slug="design-conventions-files-export"
        aspect="660 / 280"
        caption="ファイル名と主要exportの対応。左のContactForm.tsxはContactFormが主役で、名前で検索すればファイルにたどり着ける。右のutils.tsxにはContactFormとFaqAccordionとformatDateが同居しており、ファイル名から中身が推測できず、置き場所の判断も毎回ぶれる。"
      />

      <p>
        補助的な型や小さなヘルパーを同じファイルに置くのは構いません。判断の目安は「そのファイルを説明するとき、主役として名前を挙げるものが1つか」です。2つ挙がるなら、分けたほうが探しやすくなります。
      </p>

      <Heading num="まとめ">設計の全体を通して</Heading>
      <p>
        ここまで<Link href="/design/conventions-functions">関数</Link>・<Link href="/design/conventions-variables">変数</Link>・<Link href="/design/conventions-classes">クラス</Link>・ファイルの4つの粒度で命名を見てきました。この4つはどれも、<Link href="/design/principles">設計原則</Link>で決めた分け方を、次に読む人へ伝えるための最後の接点です。どれだけきれいに責務を分けても、名前が曖昧ならその分割は伝わりません。
      </p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>1ファイル1主役</h4><p>ファイル名と主要exportを一致させ、検索でたどり着けるようにする。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>記法は1つに揃える</h4><p>内容より、揃っていることのほうが重要。kebab-caseなら事故も減る。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ディレクトリは分割方針の反映</h4><p>役割で切るか機能で切るかは、アーキテクチャの選択そのもの。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/conventions-files" />
    </DocsPage>
  );
}
