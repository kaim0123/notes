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
  title: "導入と受入れ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装</Eyebrow>
        <h1>導入と受入れ ― 開発から本番へ渡す</h1>
        <Lead>
          テストを終えたシステムは、本番環境へ移して実際に使い始めます。この工程が<Term>導入</Term>（リリース）です。そして開発側の「できました」と発注側の「受け取ります」を突き合わせるのが<Term>受入れテスト</Term>と<Term>検収</Term>。作る側と使う側の責任が入れ替わる、区切りの工程です。
        </Lead>
      </Hero>

      <Heading num="01">導入（リリース）の流れ</Heading>
      <p>導入は、動くものを本番環境へ配置して終わりではありません。利用者が使い始められる状態まで整える一連の作業です。</p>
      <table>
        <thead>
          <tr><th>作業</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">移行</td><td>本番環境へのプログラム配置、既存データの移行</td></tr>
          <tr><td className="hl">教育</td><td>利用部門・運用部門への操作説明、マニュアル整備</td></tr>
          <tr><td className="hl">運用開始</td><td>本番稼働、初期の立ち会い・サポート</td></tr>
        </tbody>
      </table>
      <p>デプロイの具体的な手順やホスティング、Gitを使ったリリース運用といった実務は<Link href="/ops/deploy">公開先とデプロイ経路</Link>で扱います。ここでは開発工程としての「本番へ渡す」区切りに注目します。</p>

      <Heading num="02">受入れテストと検収</Heading>
      <p><Term>受入れテスト</Term>は、発注者・利用者が「納品してよいか」を自らの視点で確認するテストです（<Term>妥当性確認テスト</Term>とも重なります）。ここで要件どおりに動くと確認できると、正式に成果物を受け取る<Term>検収</Term>へ進みます。検収が済むと、成果物の責任が開発側から発注側へ移ります。</p>

      <Analogy label="💡 たとえるなら">
        受入れと検収は「引っ越しの立ち会い」に似ています。業者が「運び終わりました」と言っても、施主が傷や不足がないかを自分の目で確認し（受入れテスト）、問題なければ受領のサインをする（検収）。サインした瞬間から、以後の管理責任は施主に移ります。
      </Analogy>

      <Heading num="03">インシデントとトレーサビリティ</Heading>
      <p>稼働後に発生する不具合や事故は<Term>インシデント</Term>として記録し、対応します。このとき力を発揮するのが<Term>トレーサビリティ</Term>（追跡可能性）です。要件・設計・実装・テストが相互にたどれるようになっていれば、「どの要件のどの実装で問題が起きたか」「修正が他のどこに影響するか」を素早く特定できます。導入後の運用と保守を支える、上流工程からの備えです。</p>

      <Heading num="まとめ">導入と受入れで押さえたいこと</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>導入は使える状態まで</h4><p>移行・教育・運用開始を経て、利用者が使い始められる状態に整えます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>検収で責任が移る</h4><p>受入れテストで確認し、検収した時点で成果物の責任が発注側へ移ります。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>追跡できる備え</h4><p>トレーサビリティがインシデント対応と影響範囲の特定を支えます。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/test/strategy" tag="テスト">テストの段階</RelatedLink>
                    <RelatedLink href="/dev/sdlc/maintenance" tag="開発工程">保守</RelatedLink>
                    <RelatedLink href="/ops/deploy" tag="サービス運営">公開先とデプロイ経路</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
