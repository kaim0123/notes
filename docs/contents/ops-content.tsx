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
  title: "コンテンツ管理",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>サービス運営</Eyebrow>
        <h1>コンテンツ管理 ― 更新を効率化する</h1>
        <Lead>
          サイトの中身(テキスト・画像・記事)は公開後も変わり続けます。<Term>誰が・どうやって内容を更新するか</Term>という運用の仕組みは、開発者だけで完結するとは限りません。
        </Lead>
      </Hero>

      <Heading num="01">CMSという選択肢</Heading>
      <p>コンテンツの更新方法は、大きく2つに分かれます。Atlas自身は後者(コードで直書き)を採用しており、`page.tsx`を直接編集してGit経由でデプロイする方式です。</p>

      <table>
        <thead>
          <tr><th>方式</th><th>更新のしかた</th><th>向いているケース</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">コードで直書き</td><td>開発者がコードを編集し、Gitでコミット・デプロイする</td><td>更新頻度が低い、開発者自身が内容も書く、Atlasのような技術文書サイト</td></tr>
          <tr><td className="hl">CMS(ヘッドレスCMS等)</td><td>非エンジニアが管理画面から記事を作成・公開する</td><td>更新頻度が高い、非エンジニアが執筆する、ブログ・ニュースサイト</td></tr>
        </tbody>
      </table>

      <p><Term>ヘッドレスCMS</Term>(microCMS、Contentful等)は、コンテンツの保存・管理画面だけを提供し、表示側(フロントエンド)は自由に実装できる構成です。従来型のCMS(WordPress等)が「管理画面と表示」を一体で提供するのに対し、ヘッドレスCMSはAPI経由でコンテンツを取得するだけなので、Next.js製のサイトにも組み込みやすくなっています。</p>

      <Analogy label="💡 たとえるなら">
        コードで直書きする方式は「著者自身が版を組む出版」、CMSは「著者が原稿を書き、編集部が版組みする出版」に似ています。前者は著者=開発者なら速いですが、非エンジニアの著者が増えるほど不向きになります。後者は原稿を書く人と表示を作る人の役割を分離でき、非エンジニアでも公開作業ができるようになります。
      </Analogy>

      <Heading num="02">画像・メディア管理</Heading>
      <p>記事本文と画像・動画などのメディアファイルは、ライフサイクルが異なるため別々に管理されるのが一般的です。メディアは<Link href="/cloud/aws/storage">オブジェクトストレージ</Link>に置き、CDN経由で配信することで、テキストの更新頻度とファイル配信の負荷を分離できます。アップロード時に自動でリサイズ・次世代フォーマットへの変換を行う仕組みを挟んでおくと、執筆者が意識せずとも<Link href="/ops/performance">パフォーマンス</Link>が保たれます。</p>

      <Heading num="03">公開フロー</Heading>
      <p>コード変更のPRレビューと同じように、コンテンツにも「公開する前に確認する」工程を設けます。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>下書き・レビュー</h4>
          <p>CMSの下書き状態やGitのPRを使い、公開前に誤字・事実誤認・表現をレビューする。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>スケジュール公開</h4>
          <p>「指定日時に自動で公開する」仕組みがあると、キャンペーンやリリース告知のタイミングを事前に仕込める。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>公開後の見直し</h4>
          <p>古くなった情報(価格、バージョン番号、リンク切れ)を定期的に棚卸しする。放置すると信頼性の低下につながる。</p>
        </Card>
      </CardGrid>

      <Heading num="まとめ">更新の主体に合わせて方式を選ぶ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>誰が更新するかで方式を選ぶ</h4><p>開発者中心ならコード直書き、非エンジニアが多いならCMS。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>メディアはストレージ+CDNで分離管理</h4><p>テキストとファイル配信のライフサイクルを分け、パフォーマンスも確保する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>公開前後にレビュー・棚卸しの工程を置く</h4><p>誤った情報・古い情報が放置されないようにする。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/storage" tag="AWS">ストレージ</RelatedLink>
                    <RelatedLink href="/ops/performance" tag="サービス運営">パフォーマンス</RelatedLink>
                    <RelatedLink href="/ops/deploy" tag="サービス運営">公開先とデプロイ経路</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
