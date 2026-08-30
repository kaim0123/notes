import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  Diagram,
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
  title: "API設計 ― 誰のための窓口か",
};

const layer =
  "rounded-lg border border-border px-4 py-3 text-[0.9rem] font-medium";

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>API設計 ― 誰のための窓口か</h1>
        <Lead>
          「<Link href="/dev/backend/api/rest">REST API</Link>」でURLとメソッドの作法を見ました。しかしRESTの書き方だけでは足りません。同じ<code>GET /users</code>でも、<b>誰が使うAPIか</b>によって設計の優先順位は大きく変わります。ここでは、Daniel Jacobsonが整理した<Term>LSUD</Term>と<Term>SSKD</Term>という2つの利用者像を軸に、APIをどう設計するかの判断基準を押さえます。
        </Lead>
      </Hero>

      <Heading num="01">設計の最初の問い ― 利用者は誰か</Heading>
      <p>APIを設計するとき、最初に答えるべき問いは「どんなデータを返すか」より先に、<b>誰がこの窓口を使うか</b>です。公開して誰でも呼べるのか、社内のフロントエンドだけが使うのか、特定のパートナー企業向けなのか——この違いが、URLの安定性・変更のしやすさ・ドキュメントの厚さを決めます。</p>
      <table>
        <thead>
          <tr><th>利用者像</th><th>略称</th><th>典型例</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">大量の未知の開発者</td>
            <td><Term>LSUD</Term><br />(Large Set of Unknown Developers)</td>
            <td>Stripe・GitHubの公開API、政府データポータル</td>
          </tr>
          <tr>
            <td className="hl">少数の既知の開発者</td>
            <td><Term>SSKD</Term><br />(Small Set of Known Developers)</td>
            <td>自社SPA用API、委託先が作るモバイルアプリ向けAPI</td>
          </tr>
        </tbody>
      </table>
      <p>LSUDは「知らない人が、説明書だけ頼りに正しく使える」ことが最優先です。SSKDは「隣の席のエンジニアと相談しながら、画面に最適な形に寄せられる」ことが最優先です。どちらもRESTで書けますが、<b>何を安定させ、何を最適化するか</b>が正反対になります。</p>

      <Heading num="02">LSUD向け ― 汎用で安定したリソースAPI</Heading>
      <p>LSUD向けAPIは、<b>データモデル(ドメイン)に忠実なリソース指向</b>が基本です。利用者が千差万別なので、特定の画面都合に寄せすぎると、別の利用者には使いにくくなります。URLは名詞の複数形で統一し、変更は<Term>バージョニング</Term>で慎重に扱い、<Link href="/dev/backend/api/openapi">OpenAPI</Link>のような機械可読な契約で「頼み方」を固定します。</p>
      <table>
        <thead>
          <tr><th>観点</th><th>LSUD向けの方針</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">URL</td><td>リソース名詞・複数形。動詞を入れない(<Link href="/dev/backend/api/rest">REST</Link>の基本)</td></tr>
          <tr><td className="hl">変更</td><td>後方互換を最優先。<code>/v1/</code>でバージョンを切る</td></tr>
          <tr><td className="hl">ドキュメント</td><td>OpenAPI必須級。認証・Rate Limit・エラー例まで明記</td></tr>
          <tr><td className="hl">エラー</td><td>形式を固定(<code>code</code> + <code>message</code>)。4xx/5xxの意味を守る</td></tr>
          <tr><td className="hl">認証</td><td>APIキー・OAuthなど、公開向けの仕組み(<Link href="/security/auth">認証</Link>)</td></tr>
        </tbody>
      </table>
      <Aside label="💡 内部APIをそのまま公開しない">
        社内用に作った細かいエンドポイントを、そのまま外部公開することは避けます。内部向けは変更が速く、URLも画面都合が混ざりがちです。公開するなら、<b>LSUD向けに改めて設計した層</b>を用意するのが安全です。
      </Aside>

      <Heading num="03">SSKD向け ― ユースケースに最適化してよい</Heading>
      <p>SSKD向けAPIは、利用者が特定できる分、<b>画面・デバイス・業務フローに合わせた設計</b>ができます。「商品詳細画面に必要な情報を1回で返す」「チェックアウト完了までの一連操作を1本で受ける」といった、ユースケース名のエンドポイントも選択肢に入ります。変更の影響範囲が狭いので、利用者と一緒に設計を回しやすいのも特徴です。</p>
      <table>
        <thead>
          <tr><th>観点</th><th>SSKD向けの方針</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">URL</td><td>リソース指向も可。画面向けの<code>/checkout/summary</code>も許容</td></tr>
          <tr><td className="hl">変更</td><td>Slackで相談して直す運用も回る。破壊的変更のコストが低い</td></tr>
          <tr><td className="hl">ドキュメント</td><td>口頭・共有ドキュメントでも回ることが多い</td></tr>
          <tr><td className="hl">方式</td><td>画面ごとに欲しい形が違うなら<Link href="/dev/backend/api/styles">GraphQL</Link>・tRPCも有力</td></tr>
          <tr><td className="hl">設計プロセス</td><td>利用者を「設計のパートナー」として巻き込む</td></tr>
        </tbody>
      </table>
      <p>ただしSSKD向けだからといって、エンドポイントを無制限に増やすと保守が破綻します。複数の画面・デバイス向けに最適化が必要なときは、次章の<b>二層構造</b>で整理するのが定石です。</p>

      <Heading num="04">二層構造 ― コアAPIとクライアント向け層</Heading>
      <p>実務では、<b>奥にLSUD的なコアAPI</b>、<b>手前にSSKD向けの層</b>を置く構成がよく使われます。コア層は<code>/users</code>・<code>/orders</code>のように汎用リソースを安定提供し、手前の層が画面用にデータを組み立て・変換します。手前の層の詳細は「<Link href="/dev/backend/api/orchestration">オーケストレーションとBFF</Link>」で扱います。</p>

      <Diagram caption="外から見える窓口(SSKD)と、奥の安定したコア(LSUD)">
        <div className="mx-auto flex max-w-sm flex-col gap-2 text-left">
          <div className={`${layer} bg-card`}>
            フロントエンド<span className="text-muted-foreground">（画面・モバイルアプリ）</span>
          </div>
          <div className="text-center text-muted-foreground">↓ HTTP</div>
          <div className={`${layer} bg-accent/10 border-accent/40`}>
            SSKD / BFF層<span className="text-muted-foreground">（画面向け・ユースケース最適化）</span>
          </div>
          <div className="text-center text-muted-foreground">↓ 内部呼び出し</div>
          <div className={`${layer} bg-card`}>
            LSUD / コアAPI層<span className="text-muted-foreground">（汎用リソース・安定）</span>
          </div>
          <div className="text-center text-muted-foreground">↓</div>
          <div className={`${layer} bg-card`}>
            データベース<span className="text-muted-foreground">（保管場所）</span>
          </div>
        </div>
      </Diagram>

      <Analogy label="💡 たとえるなら">
        <b>LSUD</b>は図書館の公共カタログです。誰でも同じ分類番号(URL)で本(リソース)を探せます。<b>SSKD</b>は常連向けの「今週のおすすめセット」——中身は同じ本でも、並べ方はその客(画面)向けに最適化されています。<b>BFF</b>は司書が裏の棚(コアAPI)から必要な本だけ取り、1冊の冊子(1レスポンス)にまとめる役割です。
      </Analogy>

      <Heading num="05">判断表 ― どちらの設計を優先するか</Heading>
      <table>
        <thead>
          <tr><th>観点</th><th>LSUD</th><th>SSKD</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">利用者</td><td>誰か分からない</td><td>社内・委託先など特定できる</td></tr>
          <tr><td className="hl">URL設計</td><td>名詞・複数形・安定</td><td>ユースケース名も可</td></tr>
          <tr><td className="hl">変更</td><td>慎重・バージョン管理</td><td>調整しやすい</td></tr>
          <tr><td className="hl">ドキュメント</td><td>OpenAPI・利用規約・SLA</td><td>口頭・軽い共有でも可</td></tr>
          <tr><td className="hl">典型リスク</td><td>破壊的変更で外部連携が止まる</td><td>画面ごとにAPIが乱立する</td></tr>
        </tbody>
      </table>
      <p>Expressでレスポンスの形やページネーションをコードに落とす実装指針は、<Link href="/dev/backend/express/design">ExpressのAPI設計</Link>で扱います。ここでは「何を・誰のために」、Express側では「どう一貫して実装するか」と役割を分けて読んでください。</p>

      <Heading num="まとめ">利用者像が設計の優先順位を決める</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>LSUDは汎用・安定</h4><p>リソース指向・バージョニング・OpenAPI。知らない人でも説明書だけで使える。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>SSKDは最適化・協調</h4><p>画面・ユースケースに寄せてよい。利用者と一緒に設計を回せる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>二層で整理</h4><p>奥をLSUD的コア、手前をSSKD/BFFに。公開と内部を混ぜない。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/api/orchestration" tag="開発">オーケストレーションとBFF</RelatedLink>
            <RelatedLink href="/dev/backend/api/openapi" tag="開発">OpenAPIと契約</RelatedLink>
            <RelatedLink href="/dev/backend/api/rest" tag="開発">REST API</RelatedLink>
            <RelatedLink href="/dev/backend/express/design" tag="開発">ExpressのAPI設計</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
