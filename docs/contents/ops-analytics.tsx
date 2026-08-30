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
  Aside,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "分析・改善",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>サービス運営</Eyebrow>
        <h1>分析・改善 ― 利用状況を知り、次を決める</h1>
        <Lead>
          サイトを公開した後の意思決定は「なんとなく」ではなく、<Term>誰が・どこから来て・何をして・どこで離脱したか</Term>というデータに基づいて行います。計測 → 検索エンジンからの流入最適化 → 施策の効果測定、という改善サイクルを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">アクセス解析 ― 誰が、何をしたか</Heading>
      <p>アクセス解析ツールは、ページビュー・訪問者数といった基本指標から、クリック・スクロールといった細かい行動まで記録します。</p>

      <table>
        <thead>
          <tr><th>ツール</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Google Analytics(GA4)</td><td>デファクトスタンダード。ページビュー・流入元・コンバージョンを無料で計測できる</td></tr>
          <tr><td className="hl">PostHog</td><td>プロダクト分析寄り。セッション録画・機能フラグ・A/Bテストまで含めたオールインワン</td></tr>
        </tbody>
      </table>

      <Aside label="補足:">アクセス解析は個人を特定しうるデータ(Cookie・IPアドレス)を扱うため、後述の<Link href="/ops/compliance">法令・コンプライアンス</Link>で扱う同意管理と切り離せません。計測を入れる前に、どんなデータを・何の目的で・どう同意を得て集めるかを決めておく必要があります。</Aside>

      <Heading num="02">SEO基礎 ― 検索エンジンに正しく見つけてもらう</Heading>
      <p><Term>SEO(検索エンジン最適化)</Term>は、検索結果でのランキングを上げるための一連の施策です。中心となる考え方はシンプルで、「クローラーがページ内容を正しく理解できること」と「ユーザーの検索意図に応える内容であること」の2つです。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>メタ情報</h4>
          <p>`title`・`meta description`・OGP(SNSシェア時の見た目)を各ページで適切に設定する。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>構造化データ</h4>
          <p>JSON-LD等でページの意味(記事、FAQ、パンくずなど)をクローラーに明示し、検索結果でのリッチな表示(リッチリザルト)につなげる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>サイトマップ・クロール制御</h4>
          <p>`sitemap.xml`でページ一覧をクローラーに伝え、`robots.txt`でクロールしてほしくない領域を制御する。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>表示速度</h4>
          <p>Core Web Vitalsは検索ランキングの評価要素の1つでもある。詳細は<Link href="/ops/performance">パフォーマンス</Link>ページを参照。</p>
        </Card>
      </CardGrid>

      <Analogy label="💡 たとえるなら">
        SEOは「図書館の目録カードを正しく書く」ことに似ています。本の内容がどれだけ優れていても、目録カード(タイトル・分類・要約)が雑だと、探している人にたどり着いてもらえません。構造化データやメタ情報は、検索エンジンという司書に本の中身を正確に伝えるための目録です。
      </Analogy>

      <Heading num="03">改善サイクル ― データから施策へ</Heading>
      <p>計測して終わりではなく、データを次の意思決定に使ってはじめて「分析」になります。</p>

      <table>
        <thead>
          <tr><th>手法</th><th>目的</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ファネル分析</td><td>「訪問→閲覧→登録→購入」のような一連の流れのどこで離脱が多いかを特定する</td></tr>
          <tr><td className="hl">A/Bテスト</td><td>同じページの2案をランダムに出し分け、どちらが目標指標(登録率等)を改善するかを検証する</td></tr>
          <tr><td className="hl">コホート分析</td><td>「同じ時期に登録したユーザー群」の継続率等を追い、時期による変化を切り分ける</td></tr>
        </tbody>
      </table>

      <p>ここで見つかった離脱ポイントの多くは、実はパフォーマンス(表示が遅い)やコンテンツ管理(情報が古い・見つけにくい)の問題であることも多く、<Link href="/ops/performance">パフォーマンス</Link>・<Link href="/ops/content">コンテンツ管理</Link>と合わせて対処します。</p>

      <Heading num="まとめ">計測 → 最適化 → 検証の循環</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>行動を計測する</h4><p>GA4・PostHog等でユーザーの行動データを収集する(同意管理とセットで)。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>見つけてもらう</h4><p>メタ情報・構造化データ・サイトマップでSEOの基礎を固める。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>施策を検証する</h4><p>ファネル分析・A/Bテストで、勘ではなくデータに基づいて次の一手を決める。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/ops/performance" tag="サービス運営">パフォーマンス</RelatedLink>
                    <RelatedLink href="/ops/compliance" tag="サービス運営">法令・コンプライアンス</RelatedLink>
                    <RelatedLink href="/ops/content" tag="サービス運営">コンテンツ管理</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
