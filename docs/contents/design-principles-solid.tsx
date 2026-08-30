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
  title: "SOLID",
};

const rows = [
  { era: "1998", name: "単一責任の原則(SRP)", author: "Robert C. Martin", why: "1つのクラスが複数の理由で変更される問題を防ぐため" },
  { era: "1994", name: "開放閉鎖の原則(OCP)", author: "Bertrand Meyer", why: "機能追加のたびに既存コードを書き換える問題を減らすため" },
  { era: "1996", name: "リスコフの置換原則(LSP)", author: "Barbara Liskov", why: "継承による不正な置換を防ぐため" },
  { era: "1998", name: "インターフェース分離の原則(ISP)", author: "Robert C. Martin", why: "巨大なインターフェースを避けるため" },
  { era: "1996", name: "依存性逆転の原則(DIP)", author: "Robert C. Martin", why: "具体実装への依存をなくし、変更しやすくするため" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; 設計原則 1994-98</Eyebrow>
        <h1>SOLID ― オブジェクト指向設計の基本5原則</h1>
        <Lead>
          <Term>SOLID</Term>は、1990年代にBertrand MeyerやBarbara Liskov、Robert C. Martinらが個別に提唱した5つの原則の頭文字を、1999年にMichael Feathersがまとめて名付けた総称です。<Link href="/design/paradigm/oop">オブジェクト指向</Link>でクラス設計をするときの、今も最も広く参照される判断基準です。
        </Lead>
      </Hero>

      <Heading num="01">5つの原則</Heading>
      <table>
        <thead>
          <tr><th>年代</th><th>原則</th><th>提唱者</th><th>なぜ生まれたか</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="hl">{row.era}</td>
              <td>{row.name}</td>
              <td>{row.author}</td>
              <td>{row.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[0.85rem] text-muted-foreground">※ 「SOLID」という名前自体は<Mark tier="legacy">史</Mark>の位置づけです<MarkNote>→ 5つの原則を覚えやすくまとめた総称にすぎないので、名前ではなく5つの内容を個別に理解すれば十分</MarkNote>。</p>

      <Heading num="02">S ― 単一責任の原則(SRP)</Heading>
      <p>1つのクラスが変更される理由は、1つだけであるべきという原則です。「注文を計算する」機能と「注文を画面に表示する」機能を同じクラスに詰め込むと、画面のデザイン変更が計算ロジックのバグを生む、といった無関係な変更同士の衝突が起きやすくなります。</p>

      <Heading num="03">O ― 開放閉鎖の原則(OCP)</Heading>
      <p>「拡張に対して開いていて、修正に対して閉じている」べきという原則です。新しい種類の処理を追加するとき、既存のクラスのコードを書き換えるのではなく、新しいクラスを追加するだけで対応できるように設計します。Strategy・Factory Methodといったパターンは、この原則を具体化したものです。</p>

      <Heading num="04">L ― リスコフの置換原則(LSP)</Heading>
      <p>サブクラスは、スーパークラスと置き換えても、プログラムの正しさが壊れてはいけないという原則です。「正方形は長方形の一種だから継承する」といった、一見自然に見える継承関係が、実際には利用側の期待(振る舞い)を壊すことがある、という点への警鐘として提唱されました。</p>

      <Heading num="05">I ― インターフェース分離の原則(ISP)</Heading>
      <p>クライアントに、使わないメソッドへの依存を強制してはいけないという原則です。1つの巨大なインターフェースに多くのメソッドを詰め込むと、一部しか使わないクライアントまでその全体に依存させられてしまいます。役割ごとに小さなインターフェースへ分割します。</p>

      <Heading num="06">D ― 依存性逆転の原則(DIP)</Heading>
      <p>上位のモジュールは下位のモジュールの具体実装に直接依存せず、両者とも抽象(インターフェース)に依存すべきという原則です。これにより、具体的な実装(DBの種類や外部APIなど)を後から差し替えても、上位のビジネスロジックへの影響を防げます。Dependency Injection(DI)は、この原則を実現する代表的な手法です。</p>

      <Analogy label="💡 たとえるなら">
        SOLIDは「1人1役」を徹底する原則群です。SRPは「1人に仕事を1つだけ持たせる」、OCPは「その人のやり方を変えずに仕事を追加できるようにする」、LSPは「代役を立てても元の役割をきちんと果たせるようにする」、ISPは「係ごとに必要な業務マニュアルだけを渡す」、DIPは「上司は特定の部下ではなく役職(インターフェース)に指示を出す」というように、それぞれ役割分担の異なる側面を扱っています。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>SRP</h4><p>1つのクラス・関数が変更される理由は1つだけにする。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>OCP</h4><p>既存コードを書き換えず、追加だけで機能拡張できるようにする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>LSP</h4><p>サブクラスに置き換えてもプログラムの正しさを壊さない。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>ISP</h4><p>使わないメソッドへの依存を強制する巨大インターフェースを避ける。</p></Card>
        <Card><CardNumber>5</CardNumber><h4>DIP</h4><p>具体的な実装ではなく、抽象(インターフェース)に依存する。</p></Card>
      </CardGrid>

      <p>次のページでは、SOLID以降、2000年代以降に定着した<Link href="/design/principles/modern">現代の原則</Link>(Fail Fast・継承より合成・不変性など)を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/principles/cohesion" tag="設計">保守性の基本4原則</RelatedLink>
                    <RelatedLink href="/design/principles/modern" tag="設計">現代の原則</RelatedLink>
                    <RelatedLink href="/design/paradigm/oop" tag="設計">オブジェクト指向</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
