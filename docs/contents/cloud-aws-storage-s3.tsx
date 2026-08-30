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
  title: "S3",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>AWS &middot; ストレージ</Eyebrow>
        <h1>S3 ― バケットとキーで管理するオブジェクトストレージ</h1>
        <Lead>
          <Term>S3(Simple Storage Service)</Term>は、ファイルを「オブジェクト」という単位のまま、事実上無制限の容量で保存できるサービスです。<Term>バケット</Term>という入れ物の中に、<Term>キー</Term>という文字列を使ってオブジェクトを出し入れします。
        </Lead>
      </Hero>

      <Heading num="01">フラットな名前空間 ― 「フォルダ」は見た目だけ</Heading>
      <p>S3にはOSのようなディレクトリ階層は実在せず、すべてのオブジェクトはバケット直下にフラットに保存されます。管理コンソールで見える「フォルダ」は、キーに含まれる<Term>/</Term>を区切り文字として見た目上表示しているだけで、実体は<code>images/2024/photo.jpg</code>のような1本の長い文字列キーです。この構造により、階層をたどらずキー1本で直接オブジェクトを取得できます。</p>

      <Heading num="02">ストレージクラス ― アクセス頻度で保存料金を変える</Heading>
      <table>
        <thead>
          <tr><th>ストレージクラス</th><th>特徴</th><th>向いている用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Standard</td><td>即座に取り出せる、最も高頻度アクセス向け</td><td>Webサイトの画像・日常的にアクセスするデータ</td></tr>
          <tr><td className="hl">Intelligent-Tiering</td><td>アクセスパターンを監視し、自動的に最適な階層へ移動する</td><td>アクセス頻度が読みにくいデータ</td></tr>
          <tr><td className="hl">Infrequent Access(IA)</td><td>保存料金は安いが取り出し時に追加料金</td><td>月に数回程度しか見ないバックアップ</td></tr>
          <tr><td className="hl">Glacier / Deep Archive</td><td>非常に安価だが、取り出しに数分〜半日かかる</td><td>法令で保管が必要なだけの長期アーカイブ</td></tr>
        </tbody>
      </table>
      <p><Term>ライフサイクルルール</Term>を設定すると、「作成から30日後にIAへ、90日後にGlacierへ」といった移行を人手を介さず自動化できます。</p>

      <Heading num="03">バージョニング ― 上書き・削除からの復旧</Heading>
      <p><Term>バージョニング</Term>を有効にすると、同じキーへのオブジェクトの上書きや削除は物理的な削除ではなく新しいバージョンの追加として扱われ、過去のバージョンは残り続けます。誤って上書き・削除してしまった場合も、以前のバージョンへ復元できます。ただし古いバージョンも保存料金がかかり続けるため、ライフサイクルルールで一定期間後に自動的に完全削除する設定を組み合わせることが多いです。</p>

      <Heading num="04">アクセス制御 ― 誰が読み書きできるか</Heading>
      <p>S3のアクセス制御は複数の仕組みが重なります。IAMポリシーで「どのIAMユーザー・ロールがどのバケットを操作できるか」を、バケットポリシーで「そのバケット自体に対して誰にどんな操作を許可するか」を定義します。意図しない公開設定を防ぐため、アカウント・バケット単位で外部公開を一括ブロックする<Term>パブリックアクセスブロック</Term>が既定で有効になっています。<Link href="/cloud/aws/network/cloudfront">CloudFront</Link>経由でのみ配信したい場合は、<Term>Origin Access Control(OAC)</Term>を使ってバケット自体は非公開のまま、CloudFrontからのアクセスだけを許可します。</p>

      <Analogy label="💡 たとえるなら">
        S3は「宛名シールが貼られた宅配ロッカー」です。棚(フォルダ階層)で整理されているように見えても、実際は1枚の長い宛名シール(キー)で管理されているだけで、ロッカーの中を歩き回って探すことはできません。バージョニングは「同じロッカー番号に預けても、前回の荷物を捨てずに重ねて保管しておく」機能で、間違えて新しい荷物を入れてしまっても前の荷物を取り戻せます。
      </Analogy>

      <Heading num="まとめ">S3を扱う上での4つの軸</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>キーはフラットな1本の文字列</h4><p>フォルダ階層は見た目だけで、実体はバケット直下のキーで管理される。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ストレージクラスでコストを最適化する</h4><p>アクセス頻度に応じてStandardからGlacierまで使い分け、ライフサイクルルールで自動移行する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>バージョニングで誤操作から復旧できる</h4><p>上書き・削除も新しいバージョンとして残り、以前の状態に戻せる。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>アクセス制御は複数レイヤーが重なる</h4><p>IAMポリシー・バケットポリシー・パブリックアクセスブロックを組み合わせて意図しない公開を防ぐ。</p></Card>
      </CardGrid>
      <p>S3に置いたコンテンツを世界中へ高速配信する仕組みは<Link href="/cloud/aws/network/cloudfront">CloudFront</Link>のページで扱います。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/storage" tag="AWS">ストレージ</RelatedLink>
                    <RelatedLink href="/cloud/aws/network/cloudfront" tag="AWS">CloudFront</RelatedLink>
                    <RelatedLink href="/cloud/aws/cicd/codebuild" tag="AWS">CodeBuild</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
