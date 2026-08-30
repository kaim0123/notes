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
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ドメイン駆動設計",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>ドメイン駆動設計 ― コードと会話を同じ言葉でつなぐ</h1>
        <Lead>
          2003年、Eric Evansが著書『Domain-Driven Design』で体系化した<Term>ドメイン駆動設計(DDD)</Term>は、複雑な業務知識がコードとチームの会話の間でズレてしまう問題を防ぐため、コードにも会話にも同じ<Term>ユビキタス言語</Term>を使うことを重視する方法論です。
        </Lead>
      </Hero>

      <Heading num="01">何を軸にするか</Heading>
      <p>
        <Link href="/design/methodology-data-centric">データ中心設計</Link>や初期の<Link href="/design/methodology-object-centric">オブジェクト中心設計</Link>は、業務ルールが複雑化するとロジックがあちこちに分散する弱点を抱えていました。DDDは、業務の専門家(ドメインエキスパート)と開発者が同じ用語で会話し、その言葉をそのままクラス名・メソッド名に反映することで、コードと業務知識のズレを継続的に解消していきます。
      </p>

      <Heading num="02">2つの粒度 ― 戦略的DDDと戦術的DDD</Heading>
      <p>
        DDDは、システム全体をどう分割するかという<Term>戦略的DDD</Term>と、1つの区画の中身をどう書くかという<Term>戦術的DDD</Term>に分かれます。この2つを混同すると、「DDDを導入する」という言葉が指すものが人によってまるで違ってしまいます。
      </p>

      <DiagramFrame
        slug="design-methodology-ddd-two-scales"
        aspect="680 / 300"
        caption="DDDの2つの粒度。上段の戦略的DDDでは、販売・配送・会計という3つの境界づけられたコンテキストが並び、同じ「顧客」という言葉が購入する人・届け先・請求先という別の意味を持つ。境界をまたぐときは腐敗防止層で変換してモデルを混ぜない。下段の戦術的DDDでは、1つのコンテキストの内部に集約ルート・エンティティ・値オブジェクト・リポジトリが配置される。"
      />

      <p>
        戦略的DDDの中心概念である<Term>境界づけられたコンテキスト</Term>は、<Link href="/design/architecture-microservices">マイクロサービス</Link>のサービス分割の単位としても使われます。「同じ顧客という言葉が、営業と配送では別の意味で使われている」というズレを、無理に1つのモデルへ統合せず境界として認めるのが要点です。
      </p>

      <Heading num="03">戦術的DDDのパターン</Heading>
      <table>
        <thead>
          <tr>
            <th>パターン</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">エンティティ</td>
            <td>IDによって同一性が決まるオブジェクト(属性が変わっても同じもの)</td>
          </tr>
          <tr>
            <td className="hl">値オブジェクト</td>
            <td>属性の値によって同一性が決まる、不変なオブジェクト</td>
          </tr>
          <tr>
            <td className="hl">集約</td>
            <td>整合性を保つべきオブジェクトのまとまり。外部からは集約ルート経由でのみ操作する</td>
          </tr>
          <tr>
            <td className="hl">リポジトリ</td>
            <td>集約の取得・保存を担う窓口</td>
          </tr>
          <tr>
            <td className="hl">ドメインサービス</td>
            <td>特定のエンティティ1つには属さない業務ロジック</td>
          </tr>
          <tr>
            <td className="hl">ドメインイベント</td>
            <td>ドメイン内で起きた出来事の表現</td>
          </tr>
          <tr>
            <td className="hl">ファクトリ</td>
            <td>複雑な集約の生成手順を専任で担う</td>
          </tr>
        </tbody>
      </table>
      <p>
        TypeScriptのコードに落とし込む具体例は<Link href="/design/methodology-ddd-tactical">戦術的DDDをコードに書く</Link>で扱います。
      </p>

      <Heading num="04">コンテキストマップ ― コンテキスト同士の関係</Heading>
      <p>
        複数の境界づけられたコンテキストが協調する必要がある場合、DDDは<Term>コンテキストマップ</Term>としてその関係も分類します。代表的なのは、上流チームが下流チームのために変換層を用意する<Term>腐敗防止層(Anti-Corruption Layer)</Term>や、複数チームが同じモデルの一部を共有する<Term>Shared Kernel</Term>です。「業務知識をコードに正しく表現する」だけでなく、「異なる業務知識同士がどう境界を接するか」まで扱うのがDDDの射程の広さです。
      </p>

      <Analogy label="💡 新しい部品を発明したわけではない">
        リポジトリは<Link href="/design/architecture-app-data-access">データアクセス系</Link>のRepositoryパターンと同じ言葉・同じ発想ですし、ドメインイベントは<Link href="/design/architecture-event-driven">イベント駆動アーキテクチャ</Link>のイベントを1つのドメイン内部の粒度に落とし込んだものです。DDDは、これまで見てきた情報隠蔽・責務駆動設計・ユースケース中心設計といった考え方すべてに「業務知識を正しく表現する」という一貫した目的を与え、統合した方法論だと捉えると分かりやすくなります。
      </Analogy>

      <Heading num="05">特徴と向き不向き</Heading>
      <p>
        複雑な業務ルールが絡み合うドメインでは、ユビキタス言語と戦術的パターンによってコードと業務知識のズレを抑えられ、今も第一線で使われます。一方で、CRUD中心の単純な機能や業務ルールがほとんどないシステムに重量級のパターン一式を持ち込むと、過剰な抽象化を招きます。<Link href="/design/methodology-data-centric">データ中心設計</Link>で十分な領域を見極めることも、DDDを使いこなすうえで重要な判断です。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ユビキタス言語</h4>
          <p>ドメインエキスパートと開発者が同じ言葉を使い、コードと会話のズレを防ぐ。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>戦略的DDD</h4>
          <p>境界づけられたコンテキストで、システム全体を分割する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>戦術的DDD</h4>
          <p>エンティティ・値オブジェクト・集約・リポジトリで、中身を実装する。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/design/methodology-ddd" />
    </DocsPage>
  );
}
