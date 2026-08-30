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
  title: "保守",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装</Eyebrow>
        <h1>保守 ― リリース後に手を入れ続ける</h1>
        <Lead>
          システムは作って終わりではありません。不具合の修正、法改正や業務変更への追随、将来のトラブルの予防 ― リリース後に加える変更をまとめて<Term>保守</Term>と呼びます。稼働期間はしばしば開発期間より長く、システムのコストの多くは保守が占めます。
        </Lead>
      </Hero>

      <Heading num="01">保守の3分類</Heading>
      <p>保守は「なぜ手を入れるのか」という目的で分類されます。試験でも頻出の3種類を押さえます。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>目的</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">是正保守</td><td>顕在化した不具合を直す</td><td>バグ修正、障害対応</td></tr>
          <tr><td className="hl">適応保守</td><td>環境や仕様の変化に合わせる</td><td>法改正対応、OS・ブラウザ更新への追随</td></tr>
          <tr><td className="hl">予防保守</td><td>将来の問題を未然に防ぐ</td><td>潜在バグの改修、劣化箇所の先回り修正</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        保守の3分類は「車のメンテナンス」に似ています。故障を直すのが是正保守、法規制の変更に合わせて改造するのが適応保守、故障する前に部品を交換しておくのが予防保守。走り続けるほど、これらの手入れが欠かせません。
      </Analogy>

      <Heading num="02">保守を支える技術 ― リファクタリングとリバースエンジニアリング</Heading>
      <p>変更を安全に続けるための技術がいくつかあります。<Term>リファクタリング</Term>は、外から見た振る舞いを変えずに内部構造を整理し、読みやすく直しやすい状態を保つ作業です。<Term>リバースエンジニアリング</Term>は、既存のプログラムから設計や仕様を逆にたどって明らかにする手法で、ドキュメントが失われた古いシステムの保守で役立ちます。</p>

      <Heading num="03">完整性と回帰テスト</Heading>
      <p>保守で最も怖いのは「直したつもりが別の場所を壊す」ことです。システムが一貫して正しい状態を保っていること（<Term>完整性</Term>）を守るために、変更のたびに<Link href="/test/strategy">回帰テスト</Link>を行い、既存機能が壊れていないかを確認します。稼働後の変更は<Link href="/dev/sdlc/management/change">変更管理</Link>の手順に乗せ、影響範囲を管理しながら進めます。なお、稼働中の監視・運用の実務は<Link href="/infra/monitoring">監視・保守</Link>で扱います。</p>

      <Heading num="まとめ">保守で押さえたいこと</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>3つの目的で分ける</h4><p>是正（直す）・適応（合わせる）・予防（防ぐ）で保守を整理します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>直しやすさを保つ</h4><p>リファクタリングで内部を整え、リバースエンジニアリングで失われた設計を補います。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>回帰テストで守る</h4><p>変更のたびに既存機能を再確認し、完整性を保ちます。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/sdlc/deployment" tag="開発工程">導入と受入れ</RelatedLink>
                    <RelatedLink href="/dev/sdlc/management/change" tag="開発工程">変更管理</RelatedLink>
                    <RelatedLink href="/infra/monitoring" tag="インフラ">監視・保守</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
