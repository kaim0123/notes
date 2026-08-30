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
  title: "オーケストレーション駆動SOA",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; アーキテクチャ 1990年代後半</Eyebrow>
        <h1>オーケストレーション駆動サービス指向アーキテクチャ ― 機能を「サービス」として共通化する</h1>
        <Lead>
          1990年代後半、企業内の複数のシステムでよく似た機能(顧客情報の取得、在庫確認など)がそれぞれ重複して実装され、再利用できないという問題が深刻になりました。<Term>SOA(サービス指向アーキテクチャ)</Term>は、こうした機能を「サービス」として切り出し、社内全体で共有しようとする考え方です。
        </Lead>
      </Hero>

      <Heading num="01">解決したかった問題</Heading>
      <p>部門ごとにシステムを個別開発していると、「顧客情報を取得する」ような共通処理が何度も作り直され、仕様が少しずつ食い違っていきます。共通の機能を1つの「サービス」として一度だけ作り、全社で呼び出して再利用したい、というのがSOAの出発点です。</p>

      <Heading num="02">サービスの分類</Heading>
      <p>SOAでは、サービスを役割ごとに<Term>分類</Term>します。代表的な分類は次のとおりです。</p>

      <table>
        <thead>
          <tr><th>分類</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ビジネスサービス</td><td>特定の業務ルールを表す、粒度の大きいサービス</td></tr>
          <tr><td className="hl">エンタープライズサービス</td><td>複数のビジネスサービスから共通して呼ばれる、社内全体で共有される機能</td></tr>
          <tr><td className="hl">アプリケーションサービス</td><td>特定のアプリケーション専用の、再利用を想定しない小さな機能</td></tr>
          <tr><td className="hl">インフラストラクチャサービス</td><td>ログ出力や監視など、業務とは無関係な横断的機能</td></tr>
        </tbody>
      </table>

      <p>これらのサービスは<Term>エンタープライズサービスバス(ESB)</Term>と呼ばれる中央の仕組みを介して呼び出され、組み合わされます(オーケストレーション)。</p>

      <Heading num="03">再利用と結合のトレードオフ</Heading>
      <p>共通サービスを増やすほど<Term>再利用性</Term>は上がりますが、同時にそのサービスを呼び出す全ての利用者が<Term>結合</Term>することにもなります。共通サービスの仕様を1つ変えるだけで、社内の多数のシステムに影響が及ぶという副作用が生まれやすく、これがSOAの運用を難しくする大きな要因でした。</p>

      <Analogy label="💡 たとえるなら">
        SOAは、社内の色々な部署が使う「共通の電話交換台(ESB)」を1つ用意するようなものです。各部署は交換台を通じて他部署の機能を呼び出せるので、同じ機能を部署ごとに作り直す無駄はなくなります。ただし交換台や共通窓口の仕様を変えると、それを使っている全部署に影響が出てしまいます。
      </Analogy>

      <p>この「再利用のために共有した結果、変更が波及しやすい」という問題は、後に<Link href="/design/architecture/sys/microservices">マイクロサービスアーキテクチャ</Link>が「サービスごとにデータも含めて完全に独立させる」という方向で解決を試みることになります。次のページでは、その前に登場した、システム同士を非同期のイベントで疎結合につなぐ<Link href="/design/architecture/sys/event-driven">イベント駆動アーキテクチャ</Link>を見ていきます。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>機能をサービスとして共通化</h4><p>重複していた業務機能を1つのサービスにまとめ、全社で再利用する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ESBによるオーケストレーション</h4><p>中央のバスがサービス同士の呼び出しを仲介・組み合わせる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>再利用は結合を生む</h4><p>共通サービスへの依存が増えるほど、変更の影響範囲も広がる。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/architecture/sys/microkernel" tag="設計">マイクロカーネルアーキテクチャ</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/event-driven" tag="設計">イベント駆動アーキテクチャ</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/microservices" tag="設計">マイクロサービスアーキテクチャ</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
