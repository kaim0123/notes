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
  title: "構造化",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; パラダイム 1960-70s</Eyebrow>
        <h1>構造化 ― GOTOを手放す</h1>
        <Lead>
          <Term>手続き型</Term>のプログラムが大きくなると、任意の場所へ飛べる<code>GOTO</code>文だらけのコードは、どこから来てどこへ飛ぶのかを誰も追えなくなりました。この状態は<Term>スパゲッティコード</Term>と呼ばれます。<Term>構造化プログラミング</Term>は、決まった形の制御構造だけでプログラムを組み立てることで、この問題を解決しました。
        </Lead>
      </Hero>

      <Heading num="01">解決したかった問題</Heading>
      <p>1968年、Edsger Dijkstraは論文「Go To Statement Considered Harmful」で、無秩序な<code>GOTO</code>がプログラムの理解・検証を著しく困難にすると指摘しました。実行順序が「今どこにいて、次どこへ行くか」局所的に読み取れず、プログラム全体を頭の中に置かないと正しさを判断できなくなっていたのです。</p>

      <Heading num="02">構造化定理 ― 3つの制御構造で十分</Heading>
      <p>1966年、Corrado BöhmとGiuseppe Jacopiniは、任意のプログラムが<Term>順次・分岐・反復</Term>という3つの制御構造だけで書けることを数学的に示しました(構造化定理)。これがGOTOを排除する理論的な裏付けとなり、<code>if</code>・<code>while</code>・<code>for</code>・関数呼び出しといった、決まった入口と出口を持つブロックだけでプログラムを組み立てる<Term>構造化プログラミング</Term>が広まります。</p>

      <table>
        <thead>
          <tr><th>制御構造</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">順次</td><td>1つの入口・1つの出口を持つブロックを上から順に実行する</td></tr>
          <tr><td className="hl">分岐(if/switch)</td><td>条件によって経路は変わるが、必ずどこかで合流する</td></tr>
          <tr><td className="hl">反復(while/for)</td><td>条件を満たす間だけ、同じブロックへ戻って繰り返す</td></tr>
        </tbody>
      </table>

      <p>もう1つの柱が<Term>トップダウン設計(段階的リファインメント)</Term>です。1971年にNiklaus Wirthが提唱したこの手法は、まず大まかな処理を書き、それを少しずつ具体的な手続きへ分解していきます。あわせて、変数のスコープを手続き内部に閉じ込める<Term>ブロック構造</Term>により、グローバル変数への無秩序なアクセスも減らせるようになりました。</p>

      <Analogy label="💡 たとえるなら">
        GOTOだらけのプログラムは、道しるべのない迷路であちこちにワープできる状態です。構造化プログラミングは、そこに「上から下へ進む」「分岐したら必ず合流する」という一方通行のルールを敷いたようなものです。迷路の複雑さ自体は変わらなくても、道に迷いにくくなります。
      </Analogy>

      <Heading num="03">特徴と向き不向き</Heading>
      <p>if/while/for/関数という構造化プログラミングの語彙は、今日のほぼ全てのプログラミング言語に標準装備されており、パラダイムというより「読み書きできて当然の前提」になっています。ただし、構造化プログラミングが解決したのは「制御の流れ」の混乱であり、「データと、そのデータを扱う処理がプログラム中に散らばる」という別の問題には手を付けていません。ソフトウェアがさらに大規模化すると、この問題への回答として<Term>オブジェクト指向</Term>が登場します。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>3つの制御構造だけで書ける</h4><p>順次・分岐・反復の組み合わせで、GOTOなしに任意の処理を表現できる(構造化定理)。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>トップダウンで分解する</h4><p>大まかな処理から段階的に具体的な手続きへ落とし込む。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>制御の流れは整理したが…</h4><p>データと処理の結びつきという課題は残り、オブジェクト指向へ引き継がれる。</p></Card>
      </CardGrid>

      <p>次のページでは、関連するデータと処理を1つの単位にまとめる<Link href="/design/paradigm/oop">オブジェクト指向</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/paradigm/procedural" tag="設計">手続き型</RelatedLink>
                    <RelatedLink href="/design/paradigm/oop" tag="設計">オブジェクト指向</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/layered" tag="設計">レイヤードアーキテクチャ</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
