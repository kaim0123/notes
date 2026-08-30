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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "オブジェクト指向",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; パラダイム 1970-90s</Eyebrow>
        <h1>オブジェクト指向 ― データと処理をひとまとめにする</h1>
        <Lead>
          ソフトウェアが数十万〜数百万行の規模になると、「処理の手順」だけを軸に管理するのは難しくなりました。<Term>オブジェクト指向プログラミング(OOP)</Term>は、関連する<Term>データ</Term>と、そのデータを扱う<Term>処理</Term>を1つの単位(オブジェクト)にまとめることで、この問題に応えます。
        </Lead>
      </Hero>

      <Heading num="01">解決したかった問題</Heading>
      <p>構造化プログラミングは制御の流れを整理しましたが、データは相変わらずプログラムのあちこちからアクセスされる存在でした。「このデータは、どこで・誰が書き換えているのか分からない」という問題は、規模が大きくなるほど深刻化します。オブジェクト指向は、データの持ち主にそのデータを扱う処理も持たせることで、変更の影響範囲を1つのオブジェクトの中に閉じ込めようとしました。代表的な言語はSmalltalk(1972)・C++(1985)・Java(1995)です。</p>

      <Heading num="02">4つの柱</Heading>
      <table>
        <thead>
          <tr><th>柱</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">カプセル化</td><td>データと処理を1つの単位にまとめ、内部状態を外部から直接触らせない</td></tr>
          <tr><td className="hl">抽象化</td><td>利用者にとって重要な性質だけを見せ、実装の詳細を隠す</td></tr>
          <tr><td className="hl">継承</td><td>既存のクラスの性質を引き継いだ新しいクラスを作る</td></tr>
          <tr><td className="hl">ポリモーフィズム</td><td>同じ呼び出し方で、実際のオブジェクトごとに異なる振る舞いをさせる</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        手続き型が「材料(データ)を渡り歩きながら手順通り調理する」レシピだとすれば、オブジェクト指向は「材料自身が自分の調理法を知っている」状態です。<Term>にんじん</Term>オブジェクトは自分を「切る」「茹でる」方法を持ち、外部のレシピはにんじんに「調理して」と頼むだけで済みます。にんじんの切り方が変わっても、レシピ側を書き換える必要はありません。
      </Analogy>

      <Heading num="03">特徴と向き不向き</Heading>
      <p>データの持ち主が処理も持つため、「このデータはどこで書き換えられるか分からない」という問題が起きにくくなり、状態を持つ大規模なドメインの整理・再利用に強くなります。一方で、継承の濫用による複雑な階層構造や、複数のオブジェクトが互いの内部状態を書き換え合う<Term>可変な共有状態</Term>は、新たなバグの温床にもなります。大規模化・並行処理が進むにつれて、この「オブジェクトの内部状態がいつの間にか書き換わっている」問題への回答として<Term>関数型プログラミング</Term>が再注目されるようになります。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>オブジェクトが基本単位</h4><p>関連するデータと処理を1つの単位にまとめ、責務の境界を明確にする。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>継承とポリモーフィズム</h4><p>共通の性質を引き継ぎつつ、振る舞いを差し替え可能にする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>大規模・状態あるドメインに強い</h4><p>反面、継承の濫用や可変な共有状態は新たな複雑さを生む。</p></Card>
      </CardGrid>

      <p>オブジェクト指向という設計単位は、より大きな粒度では<Link href="/design/methodology/responsibility-driven">責務駆動設計</Link>や<Link href="/design/methodology/ddd">ドメイン駆動設計</Link>、<Link href="/design/architecture/sys/microservices">マイクロサービス</Link>にも同じ発想として現れます。より小さな粒度、クラス数個で繰り返し現れる定石としては<Link href="/design/paradigm/oop/gof/creation">GoFデザインパターン</Link>があります。次のページでは、副作用を持たない純粋関数を基本単位とする<Link href="/design/paradigm/functional">関数型プログラミング</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/paradigm/oop/gof/creation" tag="設計">GoFデザインパターン</RelatedLink>
                    <RelatedLink href="/design/paradigm/structured" tag="設計">構造化</RelatedLink>
                    <RelatedLink href="/design/paradigm/functional" tag="設計">関数型</RelatedLink>
                    <RelatedLink href="/design/methodology/ddd" tag="設計">ドメイン駆動設計</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
