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
  title: "モジュラーモノリス",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; アーキテクチャ 2018年頃</Eyebrow>
        <h1>モジュラーモノリス ― 単一アプリのまま、内部だけ疎結合にする</h1>
        <Lead>
          <Link href="/design/architecture/sys/microservices">マイクロサービス</Link>は独立性という大きなメリットをもたらしましたが、サービスの数だけデプロイ・監視・<Link href="/database/distributed-transactions">分散トランザクション</Link>の手間が増え、多くの現場では運用コストが見合わないケースが目立つようになりました。2018年頃から改めて注目されている<Term>モジュラーモノリス</Term>は、単一のアプリケーションのまま、内部だけを疎結合に設計する考え方です。
        </Lead>
      </Hero>

      <Heading num="01">解決したかった問題</Heading>
      <p>マイクロサービスの「サービスごとの独立性」は魅力的ですが、ネットワーク越しの通信・結果整合性・複数のデプロイパイプラインといった<Term>分散システムの税金</Term>を常に払い続けることになります。チームの規模やシステムの複雑さによっては、この税金がメリットを上回ってしまいます。「独立性のうまみだけを、分散なしで得られないか」という揺り戻しがモジュラーモノリスです。</p>

      <Heading num="02">モノリシック構造とモジュラー構造</Heading>
      <p>モジュラーモノリスは、外から見ると単一のプロセス・単一のデプロイ単位という<Term>モノリシック構造</Term>を保ちます。しかし内部は、業務領域ごとにはっきり分かれた<Term>モジュラー構造</Term>で組み立てられています。各モジュールは自分の内部実装(データ構造や関数)を外部に公開せず、決められた公開インターフェースだけを通して他のモジュールとやり取りします。</p>

      <Heading num="03">モジュール間通信</Heading>
      <p>マイクロサービスではモジュール(サービス)間の通信がネットワーク越しになりますが、モジュラーモノリスでは<Term>モジュール間通信</Term>は同一プロセス内の関数呼び出しで済みます。ネットワークの遅延・障害・シリアライズのコストがないため、シンプルで速く、デバッグもしやすいという利点があります。一方で、モジュール間の境界を守るのはコンパイラや静的解析ではなく開発者の規律に頼る部分が大きく、放置すると徐々に境界が崩れて元の密結合なモノリスに戻ってしまうリスクもあります。</p>

      <Analogy label="💡 たとえるなら">
        1つのオフィスビル(単一プロセス)の中に、部署ごとの個室(モジュール)を作るようなものです。各部署は自分の部屋の中でどう仕事をしてもよく、他部署とのやり取りは受付窓口(公開インターフェース)を通してだけ行います。ビルを増やして本社・支社に分ける(マイクロサービス化する)ほどではないけれど、大部屋(素朴なモノリス)で全員が机を並べているよりは、ずっと仕事がしやすくなります。
      </Analogy>

      <p>これで、レイヤードアーキテクチャからモジュラーモノリスまで、9つのシステムアーキテクチャスタイルを時系列で見てきました。どれが「正解」ということはなく、チームの規模・スケーラビリティの要求・運用体制によって適したスタイルは変わります。次のページからは、1つのアプリケーションの内部をどう構造化するかという<Link href="/design/architecture/app/layered">アプリケーションアーキテクチャ</Link>を、系統ごとに見ていきます。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>外はモノリス、中はモジュール</h4><p>単一デプロイ単位のまま、内部を業務領域ごとに明確に分割する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>通信は関数呼び出し</h4><p>ネットワークを介さず、同一プロセス内で高速かつシンプルに連携する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>境界の維持は規律次第</h4><p>強制力が弱い分、放置すると密結合なモノリスに逆戻りするリスクがある。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/architecture/sys/microservices" tag="設計">マイクロサービスアーキテクチャ</RelatedLink>
                    <RelatedLink href="/design/architecture/app/layered" tag="設計">アプリケーションアーキテクチャ(レイヤー系)</RelatedLink>
                    <RelatedLink href="/design/principles" tag="設計">設計原則</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
