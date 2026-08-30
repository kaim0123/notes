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
  title: "開発の全体像",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装</Eyebrow>
        <h1>開発の全体像 ― 工程と成果物の地図</h1>
        <Lead>
          システム開発は、いきなりコードを書き始めるわけではありません。<Term>要件定義</Term>から<Term>保守</Term>まで、いくつかの工程を順に進み、各工程で決まった成果物を作りながら次へ引き継いでいきます。細部に入る前に、まず全体の地図を頭に入れておきましょう。
        </Lead>
      </Hero>

      <Heading num="01">開発ライフサイクル ― 6つの工程</Heading>
      <p>典型的な開発は、次の工程を上流から下流へ流れていきます。それぞれが「何を決め、何を残すか」を押さえるのが第一歩です。</p>

      <table>
        <thead>
          <tr><th>工程</th><th>主な活動</th><th>主な成果物</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">要件定義</td><td>利害関係者から要求を聞き、<strong>何を作るか</strong>を文書化。機能要件・非機能要件を明確に。</td><td>要件定義書</td></tr>
          <tr><td className="hl">設計</td><td>要件を実現する<strong>仕組み</strong>を決める。外部設計（画面・帳票）、内部設計（モジュール・DB物理設計）。</td><td>基本設計書・詳細設計書</td></tr>
          <tr><td className="hl">実装</td><td>設計に基づいてプログラムを作成。コーディング規約、単体テストをセットで。</td><td>ソースコード</td></tr>
          <tr><td className="hl">テスト</td><td>単体→結合→システム→受入れと、範囲を広げながら検証。</td><td>テスト仕様書・結果報告</td></tr>
          <tr><td className="hl">導入・運用</td><td>本番リリース、教育、運用開始。</td><td>リリース手順・運用マニュアル</td></tr>
          <tr><td className="hl">保守</td><td>是正保守（不具合修正）、適応保守（仕様変更）、予防保守。</td><td>変更記録</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        開発工程は「料理のコース」に似ています。何を作るか献立を決め（要件定義）、レシピを書き（設計）、調理し（実装）、味見して（テスト）、配膳し（導入）、お客さんの反応を見て次に活かす（保守）。前の工程の成果物が次の工程の材料になる、という流れは共通です。
      </Analogy>

      <Heading num="02">ウォーターフォールとアジャイル ― 進め方の2つの型</Heading>
      <p>同じ工程でも、どう並べて回すかで進め方が変わります。<Term>ウォーターフォール型</Term>は「要件を固めてから設計・実装」と、工程を一方向に進めます。<Term>アジャイル</Term>では小さな単位で設計〜リリースを繰り返し、要求の変化に合わせて計画を見直します。ここでは違いの入口だけを押さえ、詳細は<Link href="/dev/sdlc/process">開発プロセスと手法</Link>で扱います。</p>

      <Heading num="まとめ">全体像で押さえたいこと</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>工程は上流から下流へ</h4><p>要件定義 → 設計 → 実装 → テスト → 導入 → 保守。前工程の成果物が次工程の入力になります。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>各工程に成果物がある</h4><p>「何を決めて何を残すか」を工程ごとに押さえると、全体の流れが見えます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>進め方には型がある</h4><p>ウォーターフォールとアジャイルは、同じ工程を並べ替えた別の回し方です。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/sdlc/process" tag="開発工程">開発プロセスと手法</RelatedLink>
                    <RelatedLink href="/dev/sdlc/requirements" tag="開発工程">要件定義</RelatedLink>
                    <RelatedLink href="/test/strategy" tag="テスト">テストの段階</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
