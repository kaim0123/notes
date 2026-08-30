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
  title: "ドメイン駆動設計",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; 設計思想 2003</Eyebrow>
        <h1>ドメイン駆動設計(DDD) ― コードと会話を同じ言葉でつなぐ</h1>
        <Lead>
          2003年、Eric Evansが著書『Domain-Driven Design』で体系化した<Term>ドメイン駆動設計(DDD)</Term>は、複雑な業務知識(ドメイン)がコードとチームの会話の間でズレてしまう問題を防ぐため、コードにもチームの会話にも同じ<Term>ユビキタス言語</Term>を使うことを重視する方法論です。
        </Lead>
      </Hero>

      <Heading num="01">何を軸にするか</Heading>
      <p><Link href="/design/methodology/data-centric">データ中心設計</Link>や初期の<Link href="/design/methodology/object-centric">オブジェクト中心設計</Link>は、業務ルールが複雑化するとロジックがあちこちに分散してしまう弱点を抱えていました。DDDは、業務の専門家(ドメインエキスパート)と開発者が同じ用語(ユビキタス言語)で会話し、その言葉をそのままクラス名・メソッド名に反映することで、コードと業務知識のズレを継続的に解消していきます。</p>

      <Heading num="02">2つの粒度 ― 戦略的DDDと戦術的DDD</Heading>
      <p>DDDは、システム全体をどう分割するかという<Term>戦略的DDD</Term>と、1つの区画の中身をどう書くかという<Term>戦術的DDD</Term>に分かれます。戦略的DDDの中心概念である<Term>境界づけられたコンテキスト(Bounded Context)</Term>は、<Link href="/design/architecture/sys/microservices">マイクロサービスアーキテクチャ</Link>のページで、サービス分割の単位として扱っています。ここでは戦術的DDDのパターンを見ていきます。TypeScriptのコードに落とし込む具体例は<Link href="/design/methodology/ddd/tactical">戦術的DDDをコードに書く</Link>で扱います。</p>

      <table>
        <thead>
          <tr><th>戦術的DDDのパターン</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">エンティティ(Entity)</td><td>IDによって同一性が決まるオブジェクト(属性が変わっても「同じもの」)</td></tr>
          <tr><td className="hl">値オブジェクト(Value Object)</td><td>属性の値によって同一性が決まる、不変(イミュータブル)なオブジェクト</td></tr>
          <tr><td className="hl">集約(Aggregate)</td><td>整合性を保つべきオブジェクトのまとまり。外部からは「集約ルート」経由でのみ操作する</td></tr>
          <tr><td className="hl">リポジトリ(Repository)</td><td>集約の取得・保存を担う窓口</td></tr>
          <tr><td className="hl">ドメインサービス(Domain Service)</td><td>特定のエンティティ1つには属さない業務ロジック</td></tr>
          <tr><td className="hl">ドメインイベント(Domain Event)</td><td>ドメイン内で起きた出来事の表現</td></tr>
          <tr><td className="hl">ファクトリ(Factory)</td><td>複雑な集約の生成手順を専任で担う</td></tr>
        </tbody>
      </table>

      <Heading num="03">コンテキストマップ ― コンテキスト同士の関係</Heading>
      <p>複数の境界づけられたコンテキストが協調する必要がある場合、DDDは<Term>コンテキストマップ</Term>としてその関係も分類します。代表的なパターンに、上流チームが下流チームのために変換層を用意する<Term>Anti-Corruption Layer(腐敗防止層)</Term>や、複数チームが同じモデルの一部を共有する<Term>Shared Kernel</Term>があります。「業務知識をコードに正しく表現する」だけでなく、「異なる業務知識同士がどう境界を接するか」まで扱うのがDDDの射程の広さです。</p>

      <Analogy label="💡 たとえるなら">
        <Term>リポジトリ</Term>は<Link href="/design/architecture/app/data-access">データアクセス系</Link>で見たRepositoryパターンと同じ言葉・同じ発想です。<Term>ドメインイベント</Term>は<Link href="/design/architecture/sys/event-driven">イベント駆動アーキテクチャ</Link>の「イベント」を、1つのドメイン内部の粒度に落とし込んだものだと考えると分かりやすくなります。DDDは新しい部品を発明したわけではなく、これまで見てきた情報隠蔽・責務駆動設計・ユースケース中心設計といった考え方すべてに、「業務知識を正しく表現する」という一貫した目的を与え、統合した方法論です。
      </Analogy>

      <Heading num="04">特徴と向き不向き</Heading>
      <p>複雑な業務ルールが絡み合うドメインでは、ユビキタス言語と戦術的パターンによってコードと業務知識のズレを抑えられ、今も第一線で使われる方法論です。一方で、CRUD中心の単純な機能や、業務ルールがほとんどないシステムにDDDの重量級のパターン一式を持ち込むと、過剰な抽象化(オーバーエンジニアリング)を招きます。<Link href="/design/methodology/data-centric">データ中心設計</Link>で十分な領域を見極めることも、DDDを使いこなす上では重要な判断です。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ユビキタス言語</h4><p>ドメインエキスパートと開発者が同じ言葉を使い、コードと会話のズレを防ぐ。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>戦略的DDD</h4><p>境界づけられたコンテキストでシステム全体を分割する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>戦術的DDD</h4><p>Entity・Value Object・Aggregate・Repositoryなどで1コンテキストの中身を実装する。</p></Card>
      </CardGrid>

      <p>これで<Link href="/design/methodology">設計思想・方法論</Link>の7つを見終えました。次のページでは、これらの方法論を実践するときの、より細かいコードレベルの判断基準である<Link href="/design/principles">設計原則</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/methodology/ddd/tactical" tag="設計">戦術的DDDをコードに書く</RelatedLink>
                    <RelatedLink href="/design/methodology/use-case-driven" tag="設計">ユースケース中心設計</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/microservices" tag="設計">マイクロサービスアーキテクチャ</RelatedLink>
                    <RelatedLink href="/design/principles" tag="設計">設計原則</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
