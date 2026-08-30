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
  title: "構成管理",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装</Eyebrow>
        <h1>構成管理 ― 「今どれが正か」を見失わない</h1>
        <Lead>
          開発が進むと、ソースコード・設計書・ライブラリ・設定ファイルなど、無数の成果物が版を重ねていきます。どれが最新で、どれとどれが組み合わさって動くのか ― これを一貫して管理するのが<Term>構成管理</Term>（ソフトウェア構成管理）です。開発工程を横断してプロジェクトを支える、管理技術の土台です。
        </Lead>
      </Hero>

      <Heading num="01">構成品目 ― 管理する単位</Heading>
      <p>構成管理の対象となる一つひとつの成果物を<Term>構成品目</Term>（ソフトウェア構成品目）と呼びます。プログラムだけでなく、設計書・テスト仕様・マニュアル・使用ライブラリなど、システムを構成するものはすべて管理対象になり得ます。何を構成品目とし、どう識別・管理するかを定めるのが<Term>構成管理計画</Term>です。</p>

      <Analogy label="💡 たとえるなら">
        構成管理は「映画の編集管理」に似ています。撮影した膨大なカット（構成品目）に通し番号を振り、どのカットのどの版を繋いだものが公開版かを台帳で管理する。これがなければ、どのフィルムが完成品か分からなくなります。
      </Analogy>

      <Heading num="02">バージョン管理とリポジトリ</Heading>
      <p>構成品目の「版」を記録し、いつでも過去に戻せるようにするのが<Term>バージョン管理</Term>です。版の履歴と実体は<Term>リポジトリ</Term>（保管庫）に蓄積されます。誰が・いつ・何を・なぜ変えたかを追跡でき、複数人の変更を突き合わせられるため、共同開発の基盤になります。</p>
      <p>Gitを使った具体的な操作やブランチ戦略といった実務は<Link href="/dev/tooling">パッケージ管理とビルド</Link>や開発ツールの領域です。ここでは「構成品目の版を一元管理する仕組み」という位置づけを押さえます。</p>

      <Heading num="03">SBOM ― 部品表で中身を明らかにする</Heading>
      <p>近年重要になっているのが<Term>SBOM</Term>（Software Bill of Materials／ソフトウェア部品表）です。システムがどのライブラリ・コンポーネントのどのバージョンで構成されているかを一覧化したもので、脆弱性が見つかったときに「自社システムが影響を受けるか」を即座に判断できます。構成管理を、セキュリティやサプライチェーンの観点まで広げた考え方です。</p>

      <Heading num="まとめ">構成管理で押さえたいこと</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>構成品目を定める</h4><p>プログラムも文書もライブラリも、管理単位として識別します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>版を一元管理</h4><p>バージョン管理とリポジトリで、履歴を追跡し過去へ戻せるようにします。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>SBOMで中身を可視化</h4><p>部品表により、脆弱性の影響範囲を素早く判断できます。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/sdlc/management/change" tag="開発工程">変更管理</RelatedLink>
                    <RelatedLink href="/dev/tooling" tag="開発">パッケージ管理とビルド</RelatedLink>
                    <RelatedLink href="/dev/sdlc" tag="開発工程">開発の全体像</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
