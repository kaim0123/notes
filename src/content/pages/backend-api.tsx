import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "API" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>API ― 外に見せる面をどこで切るか</h1>
        <Lead>
          <Link href="/frontend/http">HTTP通信</Link>では、ブラウザから「取りに行く」側を見ました。その<Term>取りに行く先</Term>がAPIです。この見出しでは、APIとは何かを押さえたうえで、最も混ざりやすい<Term>API・バックエンド・データベースの違い</Term>を役割の地図として整理し、配下の各ページが何を扱うのかを見渡します。
        </Lead>
      </Hero>

      <Heading num="01">APIは窓口であり、約束でもある</Heading>
      <p>
        <Term>API</Term>(Application Programming Interface)とは、あるシステムが外部に用意する窓口のことです。中身がどう作られているかを知らなくても、<Term>決まった形で頼めば決まった形で結果が返る</Term> ― この「頼み方の約束」と、その受付口をまとめてAPIと呼びます。
      </p>
      <p>
        <code>Interface</code>は「境界・接点」という意味です。人間どうしなら言葉が接点になりますが、システムどうしが機械的にやり取りするための接点が、これにあたります。窓口が実装であるのに対し、約束のほうは文書やスキーマとして固定できる ― この二面性が、<Link href="/backend/api-openapi">OpenAPIと契約</Link>や<Link href="/backend/api-versioning">バージョニングと廃止</Link>につながっていきます。
      </p>

      <Heading num="02">API・バックエンド・データベースは別物</Heading>
      <p>
        この3つは名前が近く、混ざりやすいものの、<Term>役割がはっきり分かれた別物</Term>です。依頼は上から下へ順に渡され、結果は逆順に返っていきます。
      </p>

      <DiagramFrame
        slug="backend-api-layers"
        aspect="640 / 340"
        caption="フロントエンド・API・バックエンド・データベースの役割の違いを示した図。4つの層が縦に並び、依頼は上から下へ順に渡され、結果は逆順に返る。APIとバックエンドは同じサーバーの中にあり、APIはその外向きの面だけを指す。フロントエンドからデータベースへ直接向かう線には×印が付いており、外から見える窓口はAPIだけで、データベースを操作するのは奥のバックエンドの役目であることを示している。"
      />

      <table>
        <thead>
          <tr><th>層</th><th>役割</th><th>外から見えるか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">フロントエンド</td><td>利用者が実際に触れる画面</td><td>見える</td></tr>
          <tr><td className="hl">API</td><td>外からの依頼を受け取る<strong>窓口</strong></td><td>見える</td></tr>
          <tr><td className="hl">バックエンド</td><td>受けた依頼を処理する本体</td><td>見えない</td></tr>
          <tr><td className="hl">データベース</td><td>データを保管しておく場所</td><td>見えない</td></tr>
        </tbody>
      </table>

      <Aside label="つまずきやすい2つの誤解">
        1つ目は<Term>バックエンド＝API</Term>という誤解です。APIはバックエンドの外向きの面にすぎません。2つ目は<Term>APIがデータベースに直接つながっている</Term>という誤解。実際は外 → API → バックエンドの処理 → データベース、と橋渡しされます。この区別が効いてくるのは設計を変えるときで、<strong>外から見える面を変えずに中身だけ差し替えられるか</strong>が、APIを窓口として切り出した本当の見返りです。
      </Aside>

      <Heading num="03">使う側と作る側では、気にすることが違う</Heading>
      <p>
        同じAPIでも、呼び出して使う側と、用意して提供する側とでは、注意の向く先がまったく違います。どちらの立場かを意識すると、学ぶべき内容が整理できます。
      </p>

      <table>
        <thead>
          <tr><th>優先度</th><th>使う側</th><th>作る側</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">高</td><td>資格情報の管理 / 失敗時の扱い / タイムアウトとリトライ / 流量制限への対応</td><td>URLとメソッドの設計 / ステータスコード / 入力の検証 / 認証・認可</td></tr>
          <tr><td className="hl">中</td><td>相手の変更への追従 / 利用条件と料金 / ログと監視</td><td>エラー形式の統一 / 一覧の分割と絞り込み / ログと監視</td></tr>
          <tr><td className="hl">低</td><td>可用性の契約内容</td><td>バージョニングと後方互換性 / 機械可読な仕様</td></tr>
        </tbody>
      </table>

      <p>
        使う側の道具立ては<Link href="/frontend/http">HTTP通信</Link>で扱いました。ここから先は<Term>作る側</Term>の話です。
      </p>

      <Heading num="04">配下で扱うこと</Heading>
      <p>
        窓口には<Term>いくつかの流儀</Term>があり、まずその選択から始まります。次に最も普及しているRESTの作法、そして「誰向けの窓口か」で優先順位がどう変わるか。最後に、いったん公開した約束をどう固定し、どう畳むかへ進みます。
      </p>

      <table>
        <thead>
          <tr><th>ページ</th><th>答える問い</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Link href="/backend/api-styles">APIの種類と選び方</Link></td><td>そもそもどの方式で窓口を開くか</td></tr>
          <tr><td className="hl"><Link href="/backend/api-rest">REST API</Link></td><td>URLとメソッドをどう組み立てるか</td></tr>
          <tr><td className="hl"><Link href="/backend/api-design">API設計(LSUD / SSKD)</Link></td><td>誰向けの窓口か。何を優先するか</td></tr>
          <tr><td className="hl"><Link href="/backend/api-orchestration">オーケストレーションとBFF</Link></td><td>画面の都合をどこで吸収するか</td></tr>
          <tr><td className="hl"><Link href="/backend/api-openapi">OpenAPIと契約</Link></td><td>約束をどう機械可読に固定するか</td></tr>
          <tr><td className="hl"><Link href="/backend/api-versioning">バージョニングと廃止</Link></td><td>約束をどう変え、どう畳むか</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        レストランでは、客は厨房に立ち入りません。メニューという決められた頼み方に沿ってカウンターに頼めば、料理が出てきます。この<Term>カウンターとメニューのセット</Term>がAPIです。厨房の中がどうなっていようと客は困りませんが、メニューを黙って書き換えれば全員が困る ― APIの変更が難しいのは、まさにここに理由があります。
      </Analogy>

      <Heading num="まとめ">窓口は、変えにくい面である</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>APIは窓口と約束</h4>
          <p>中身を知らなくても、決まった形で頼めば決まった形で返る受付口。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>3つは役割が違う</h4>
          <p>API(窓口)・バックエンド(本体)・データベース(保管場所)。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>見えるものほど変えにくい</h4>
          <p>中身は差し替えられても、公開した約束は簡単には戻せない。</p>
        </Card>
      </CardGrid>

      <p>
        まずは<Link href="/backend/api-styles">APIの種類と選び方</Link>で、窓口の流儀を見渡すところから始めます。
      </p>

      <DocsFooter href="/backend/api" />
    </DocsPage>
  );
}
