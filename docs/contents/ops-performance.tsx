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
  title: "パフォーマンス",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>サービス運営</Eyebrow>
        <h1>パフォーマンス ― 速く表示する</h1>
        <Lead>
          機能が正しく動いていても、表示が遅ければユーザーは離脱します。「速さ」を感覚ではなく<Term>指標</Term>で測り、キャッシュと画像最適化という2つの主要な手段で改善する、という流れを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">Core Web Vitals ― 「速さ」を測る3つの指標</Heading>
      <p>Googleが提唱する<Term>Core Web Vitals</Term>は、ユーザーが体感する「速さ」を3つの指標に分解したものです。SEO評価にも直接影響するため、パフォーマンス改善のゴールとして扱われます。</p>

      <table>
        <thead>
          <tr><th>指標</th><th>何を測るか</th><th>良好とされる目安</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">LCP(Largest Contentful Paint)</td><td>最大コンテンツ(画像・見出し等)が表示されるまでの時間</td><td>2.5秒以内</td></tr>
          <tr><td className="hl">INP(Interaction to Next Paint)</td><td>クリック等の操作から画面が反応するまでの遅延</td><td>200ms以内</td></tr>
          <tr><td className="hl">CLS(Cumulative Layout Shift)</td><td>読み込み中にレイアウトがどれだけガタつくか</td><td>0.1未満</td></tr>
        </tbody>
      </table>

      <Aside label="補足:">以前は「INP」の代わりに入力遅延だけを測る「FID(First Input Delay)」が使われていましたが、2024年にINPへ置き換わり、より広い操作全体の応答性を評価するようになりました。</Aside>

      <Heading num="02">キャッシュ戦略 ― 同じ計算・同じ転送を繰り返さない</Heading>
      <p>パフォーマンス改善の中心は「本来不要な処理・転送を省く」ことで、その主な手段が<Term>キャッシュ</Term>です。キャッシュという概念自体の全体像は<Link href="/dev/cache">キャッシュの全体像</Link>で扱っているため、ここではWebサイト運用の文脈で登場する3層を整理します。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ブラウザキャッシュ</h4>
          <p>`Cache-Control`ヘッダーで、一度取得した静的ファイル(JS/CSS/画像)をブラウザに保存させ、再訪問時のネットワーク転送を省く。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>CDNキャッシュ</h4>
          <p>オリジンサーバーの手前でCDNがレスポンスを保持し、2人目以降のユーザーにはCDNから即座に返す。地理的に近い拠点から配信されるぶん、往復時間(RTT)も短縮される。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ビルド時キャッシュ(SSG/ISR)</h4>
          <p>Next.jsのSSG(静的生成)は、リクエストのたびにレンダリングせずビルド時に生成したHTMLを使い回す、最も強力なキャッシュ。ISRは一定間隔で再生成することで「静的な速さ」と「内容の鮮度」を両立する。</p>
        </Card>
      </CardGrid>

      <p>個人向けページを他人に配信してしまう<Term>キャッシュ事故</Term>については、セキュリティの観点から<Link href="/security/cache">キャッシュ制御</Link>ページで扱っています。</p>

      <Heading num="03">転送量を減らす ― 一番大きいものから</Heading>
      <p>多くのサイトで転送量の大半を占めるのは画像です。次世代フォーマット(WebP/AVIF)への変換、画面サイズに応じたレスポンシブ配信、遅延読み込み、`width`/`height`指定によるCLS対策 ― この4つで、LCPは大きく改善します。実際の手順と、JavaScript・フォントまで含めた削減の全体像は<Link href="/dev/frontend/perf">表示速度を測って直す</Link>で扱います(Next.jsの`next/image`はこの4つを標準機能として提供します)。</p>

      <Analogy label="💡 たとえるなら">
        画像最適化は「引っ越しの荷造り」に似ています。大きな家具をそのまま運ぶ(未圧縮の画像をそのまま配信)のではなく、分解して圧縮パックに詰め(次世代フォーマットへの変換)、必要な部屋の荷物から先に運び(レイアウトに合わせたサイズ配信)、今すぐ使わない荷物は後回しにする(遅延読み込み)ことで、トラック1台(転送量)に収まる量を最小化します。
      </Analogy>

      <Heading num="04">運営として、どこまで追うか</Heading>
      <p>計測手段には、Lighthouseのように環境を固定して測る<Term>ラボデータ</Term>と、実際の訪問者から集める<Term>フィールドデータ</Term>の2種類があり、両者はしばしば食い違います。どちらをいつ見るか、CIに性能予算を置いて回帰を防ぐ方法までは<Link href="/dev/frontend/perf">表示速度を測って直す</Link>で扱っているので、運営側で決めるのは<strong>どの指標を、どの水準で、いつ見直すか</strong>です。訪問者の体感を継続的に追うなら、フィールドデータの定点観測を<Link href="/infra/monitoring/frontend">フロントエンド監視</Link>の一部として組み込みます。</p>

      <Heading num="まとめ">測る→キャッシュする→軽くする</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Core Web Vitalsで測る</h4><p>LCP・INP・CLSという体感速度の指標を基準にする。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>キャッシュで転送・処理を省く</h4><p>ブラウザ・CDN・ビルド時の3層で、同じ処理を繰り返さない。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>画像を最適化する</h4><p>フォーマット・サイズ・読み込みタイミングを最適化し、転送量最大の要因に対処する。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/cache" tag="開発">キャッシュの全体像</RelatedLink>
                    <RelatedLink href="/security/cache" tag="セキュリティ">キャッシュ制御</RelatedLink>
                    <RelatedLink href="/dev/frontend/nextjs" tag="開発">Next.js</RelatedLink>
                    <RelatedLink href="/ops/analytics" tag="サービス運営">分析・改善</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
