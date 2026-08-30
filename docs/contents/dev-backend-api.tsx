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
  title: "API ― システム同士をつなぐ窓口",
};

const layer =
  "rounded-lg border border-border px-4 py-3 text-[0.9rem] font-medium";

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>API ― システム同士をつなぐ窓口</h1>
        <Lead>
          「<Link href="/dev/frontend/http">HTTP通信</Link>」では、ブラウザから<code>fetch</code>でデータを取りに行きました。その「取りに行く先」が<Term>API</Term>です。この記事では、APIとは何かを押さえたうえで、初心者が最も混同しやすい<b>バックエンド・API・データベースの違い</b>を、役割の地図として整理します。
        </Lead>
      </Hero>

      <Heading num="01">APIとは「窓口」であり「約束」</Heading>
      <p><Term>API</Term>(Application Programming Interface)とは、あるシステムが外部に用意する<Term>窓口</Term>のことです。中身がどう作られているかを知らなくても、<b>決まった形で頼めば、決まった形で結果が返ってくる</b>——この「頼み方の約束」とその受付口をまとめてAPIと呼びます。</p>
      <p><code>Interface</code>は「境界・接点」という意味です。人間どうしなら言葉が接点になりますが、システムどうしが機械的にやりとりするための接点が、このAPIにあたります。</p>

      <Analogy label="💡 たとえるなら">
        レストランでは、客は厨房に立ち入りません。<b>メニュー</b>という「決められた頼み方」に沿って<b>注文カウンター</b>に頼めば、料理が出てきます。厨房の中がどうなっていようと、客はメニュー通りに頼むだけでよい——この<b>「カウンター＋メニュー」のセットがAPI</b>です。どんな食材をどう調理しているかを客が知る必要はありません。
      </Analogy>

      <Heading num="02">バックエンド・API・データベースの関係</Heading>
      <p>ここがこの記事のいちばん大事なところです。この3つは名前が近くて混ざりやすいのですが、<b>役割がはっきり分かれた別物</b>です。Webアプリを「レストラン」にたとえると、それぞれの位置づけはこうなります。</p>

      <Diagram caption="外からの頼みは上から下へ流れ、結果は逆順に返っていく">
        <div className="mx-auto flex max-w-sm flex-col gap-2 text-left">
          <div className={`${layer} bg-card`}>
            フロントエンド<span className="text-muted-foreground">（客席・画面）</span>
          </div>
          <div className="text-center text-muted-foreground">↓ HTTPで頼む</div>
          <div className={`${layer} bg-accent/10 border-accent/40`}>
            API<span className="text-muted-foreground">（注文カウンター＝窓口）</span>
          </div>
          <div className="text-center text-muted-foreground">↓ 受けた頼みを渡す</div>
          <div className={`${layer} bg-card`}>
            バックエンド<span className="text-muted-foreground">（厨房全体＝処理の本体）</span>
          </div>
          <div className="text-center text-muted-foreground">↓ データを読み書き</div>
          <div className={`${layer} bg-card`}>
            データベース<span className="text-muted-foreground">（食材倉庫＝保管場所）</span>
          </div>
        </div>
      </Diagram>

      <table>
        <thead>
          <tr><th>層</th><th>たとえ</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">フロントエンド</td><td>客席</td><td>利用者が実際に触れる画面</td></tr>
          <tr><td className="hl">API</td><td>注文カウンター</td><td>外からの頼みを受け取る<b>窓口</b></td></tr>
          <tr><td className="hl">バックエンド</td><td>厨房<b>全体</b></td><td>受けた頼みを処理する本体(ロジック)</td></tr>
          <tr><td className="hl">データベース</td><td>食材倉庫</td><td>データを保管しておく場所</td></tr>
        </tbody>
      </table>

      <Aside label="⚠️ 初心者がつまずく2つの誤解">
        1つ目は「<b>バックエンド＝API</b>」という誤解。APIはバックエンドの<b>外向きの顔(一部)</b>にすぎません。厨房そのものがカウンターではないのと同じです。2つ目は「<b>APIがデータベースに直接つながっている</b>」という誤解。実際は <span className="whitespace-nowrap">外 → API → バックエンドの処理 → データベース</span> という順に橋渡しされ、結果が逆順に返ります。APIはあくまで受付で、DBを操作するのは奥にいるバックエンドの役目です。
      </Aside>

      <Heading num="03">APIを「使う側」と「作る側」</Heading>
      <p>同じAPIでも、<b>呼び出して使う側</b>と、<b>用意して提供する側</b>とでは、気にすべきことがまったく違います。どちらの立場かを意識すると、学ぶべき内容が整理できます。</p>
      <table>
        <thead>
          <tr><th>優先</th><th>APIを使う側</th><th>APIを作る側</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">★★★</td><td>APIキー・OAuthの管理 / エラーハンドリング / タイムアウト・リトライ / Rate Limit対応</td><td>REST設計(URL・HTTPメソッド) / HTTPステータスコード / 入力バリデーション / 認証・認可</td></tr>
          <tr><td className="hl">★★☆</td><td>API変更への対応 / 利用規約・料金確認 / ログ・監視</td><td>エラーレスポンスの統一 / ページネーション・フィルタリング / ログ・監視</td></tr>
          <tr><td className="hl">★☆☆</td><td>SLA・契約確認</td><td>バージョニング・後方互換性・<Link href="/dev/backend/api/openapi">OpenAPI</Link></td></tr>
        </tbody>
      </table>
      <p>「使う側」の具体的な道具立ては「<Link href="/dev/frontend/http">HTTP通信(Fetch・axios)</Link>」で扱いました。「作る側」がどうAPIを組み立てるかは「<Link href="/dev/backend/express">Express</Link>」で、実際のコードとして見ていきます。</p>

      <Heading num="04">誰向けかで設計が変わる</Heading>
      <p>同じRESTでも、<b>公開API</b>と<b>自社フロント向けAPI</b>では設計の優先順位が異なります。利用者が誰か分からない<Term>LSUD</Term>向けは汎用・安定・OpenAPI、特定できる<Term>SSKD</Term>向けは画面に最適化・BFFで組み立て、という整理は「<Link href="/dev/backend/api/design">API設計 ― 誰のための窓口か</Link>」で詳しく扱います。</p>

      <Heading num="05">APIには「方式」がある</Heading>
      <p>ここまで「窓口」としてのAPIを見てきましたが、その窓口には<b>いくつかの流儀(方式)</b>があります。<Term>REST</Term>・<Term>GraphQL</Term>・<Term>gRPC</Term>…といった名前を聞いたことがあるかもしれません。どれも「頼んで返す」目的は同じで、<b>頼み方の形式と得意分野</b>が違うだけです。その違いと選び方は「<Link href="/dev/backend/api/styles">APIの種類と選び方</Link>」で詳しく整理します。</p>

      <Heading num="まとめ">APIは役割の地図で捉える</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>APIは「窓口＋約束」</h4><p>中身を知らなくても、決まった形で頼めば決まった形で返る受付口です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>3つは別物</h4><p>API(窓口)・バックエンド(本体)・DB(保管場所)は役割が分かれています。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>立場で見方が変わる</h4><p>使う側と作る側では、気にすべきことが大きく異なります。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/api/design" tag="開発">API設計（LSUD / SSKD）</RelatedLink>
            <RelatedLink href="/dev/backend/api/styles" tag="開発">APIの種類と選び方</RelatedLink>
            <RelatedLink href="/dev/frontend/http" tag="開発">HTTP通信(Fetch・axios)</RelatedLink>
            <RelatedLink href="/dev/backend/express" tag="開発">Express</RelatedLink>
            <RelatedLink href="/dev" tag="開発">実装 一覧</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
