import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "API設計(LSUD / SSKD)" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>API設計 ― 誰のための窓口か</h1>
        <Lead>
          <Link href="/backend/api-rest">REST</Link>の作法だけでは設計は決まりません。同じ<code>GET /users</code>でも、<Term>誰が使う窓口か</Term>で優先順位が正反対になります。ここでは<Term>LSUD</Term>と<Term>SSKD</Term>という2つの利用者像を軸に、何を安定させ、何を最適化するかを決めます。
        </Lead>
      </Hero>

      <Heading num="01">最初の問いは「利用者は誰か」</Heading>
      <p>
        設計で最初に答えるべきは、「どんなデータを返すか」より先に<Term>誰がこの窓口を使うか</Term>です。この違いが、URLの安定性・変更のしやすさ・説明書の厚さをまとめて決めます。
      </p>

      <table>
        <thead>
          <tr><th>利用者像</th><th>略称</th><th>典型例</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">大量の未知の開発者</td>
            <td><Term>LSUD</Term><br />(Large Set of Unknown Developers)</td>
            <td>決済サービスやコード管理サービスの公開API、行政データの提供窓口</td>
          </tr>
          <tr>
            <td className="hl">少数の既知の開発者</td>
            <td><Term>SSKD</Term><br />(Small Set of Known Developers)</td>
            <td>自社の画面用API、委託先が作るモバイルアプリ向けAPI</td>
          </tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="backend-api-design-lsud-sskd"
        aspect="640 / 330"
        caption="利用者像の違いが設計の優先順位を決めることを示した比較図。左のLSUDでは、窓口の上に多数の小さな四角が不揃いに並び、誰がいつどう使っているか分からないことを表す。線は一方通行で、約束は錠前の印とともに固定され、変更はバージョンを切って行う。右のSSKDでは利用者は2つだけで、線は双方向、相談しながら形を変えられる。下段にはそれぞれの典型的な失敗が置かれ、LSUDは壊す変更で外部連携が止まること、SSKDは画面ごとに窓口が乱立することが挙げられている。"
      />

      <p>
        違いの本質は、<Term>相談できるかどうか</Term>の一点です。相談できない相手に対しては約束を固定するしかなく、相談できる相手とは形を一緒に決められます。
      </p>

      <Heading num="02">LSUD向け ― 汎用で、安定させる</Heading>
      <p>
        利用者が千差万別なので、特定の画面都合に寄せると別の利用者には使いにくくなります。<Term>データの構造に忠実なリソース指向</Term>が基本形です。
      </p>

      <table>
        <thead>
          <tr><th>観点</th><th>方針</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">URL</td><td>リソース名詞・複数形。動詞を入れない</td></tr>
          <tr><td className="hl">変更</td><td>後方互換を最優先。<Link href="/backend/api-versioning">バージョンを切って</Link>慎重に</td></tr>
          <tr><td className="hl">説明書</td><td><Link href="/backend/api-openapi">機械可読な仕様</Link>が事実上必須。認証・流量制限・エラー例まで明記</td></tr>
          <tr><td className="hl">エラー</td><td>形式を固定する。4xx/5xxの意味を守る</td></tr>
          <tr><td className="hl">認証</td><td>APIキーや委譲型の仕組みなど、公開向けの方式</td></tr>
        </tbody>
      </table>

      <Aside label="内部APIをそのまま公開しない">
        社内用に作った細かいエンドポイントを、そのまま外部に開けるのは避けます。内部向けは変更が速く、URLに画面都合が混ざりがちです。いったん公開すると、<Term>誰が使っているか分からないまま止められなくなります</Term>。公開するなら、LSUD向けに改めて設計した層を用意します。
      </Aside>

      <Heading num="03">SSKD向け ― 用途に寄せてよい</Heading>
      <p>
        利用者が特定できる分、画面・端末・業務の流れに合わせた設計ができます。「商品詳細画面に必要な情報を1回で返す」といった、<Term>ユースケース名のエンドポイント</Term>も選択肢に入ります。
      </p>

      <table>
        <thead>
          <tr><th>観点</th><th>方針</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">URL</td><td>リソース指向も可。画面向けの<code>/checkout/summary</code>も許容</td></tr>
          <tr><td className="hl">変更</td><td>相談して直す運用が回る。壊す変更のコストが低い</td></tr>
          <tr><td className="hl">説明書</td><td>共有ドキュメント程度でも回ることが多い</td></tr>
          <tr><td className="hl">方式</td><td>画面ごとに欲しい形が違うなら<Link href="/backend/api-styles">GraphQLやtRPC</Link>も有力</td></tr>
        </tbody>
      </table>

      <p>
        ただし、寄せてよいことと<Term>無制限に増やしてよい</Term>ことは別です。画面が増えるたびにエンドポイントが増える設計は、いずれ保守が破綻します。
      </p>

      <Heading num="04">実務では二層に分ける</Heading>
      <p>
        だから実務では、<Term>奥にLSUD的なコア、手前にSSKD向けの層</Term>を置く構成がよく使われます。コアは<code>/users</code>・<code>/orders</code>のように汎用のリソースを安定して提供し、手前の層が画面用に組み立てます。
      </p>
      <p>
        この分け方の要点は、<Term>変更の速さが違うものを同じ層に置かない</Term>ことです。画面は週単位で変わり、データの構造は年単位でしか変わりません。手前の層の詳細は<Link href="/backend/api-orchestration">オーケストレーションとBFF</Link>で扱います。
      </p>

      <Analogy label="💡 たとえるなら">
        LSUDは図書館の公共カタログです。誰でも同じ分類番号で本を探せます。SSKDは常連向けの「今週のおすすめセット」 ― 中身は同じ本でも、並べ方はその客向けに最適化されています。分類番号を勝手に変えれば全国の利用者が困りますが、おすすめセットの中身は毎週変えて構いません。
      </Analogy>

      <Heading num="05">判断表</Heading>
      <table>
        <thead>
          <tr><th>観点</th><th>LSUD</th><th>SSKD</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">利用者</td><td>誰か分からない</td><td>社内・委託先など特定できる</td></tr>
          <tr><td className="hl">URL設計</td><td>名詞・複数形・安定</td><td>ユースケース名も可</td></tr>
          <tr><td className="hl">変更</td><td>慎重。バージョンで管理</td><td>調整しやすい</td></tr>
          <tr><td className="hl">説明書</td><td>機械可読な仕様・利用条件</td><td>軽い共有でも可</td></tr>
          <tr><td className="hl">典型的な失敗</td><td>壊す変更で外部連携が止まる</td><td>画面ごとにAPIが乱立する</td></tr>
        </tbody>
      </table>

      <p>
        これを実際のコードに落とす指針は<Link href="/backend/express-design">Expressでの API設計</Link>にあります。ここが「何を・誰のために」、あちらが「どう一貫して実装するか」です。
      </p>

      <Heading num="まとめ">相談できるかどうかが分かれ目</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>LSUDは汎用・安定</h4>
          <p>説明書だけで正しく使えること。変更はバージョンで管理する。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>SSKDは最適化・協調</h4>
          <p>用途に寄せてよい。利用者を設計の相手として巻き込める。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>変わる速さで層を分ける</h4>
          <p>週単位で変わる画面と、年単位で変わるデータ構造を同居させない。</p>
        </Card>
      </CardGrid>

      <p>
        手前の層をどう作るかを、次の<Link href="/backend/api-orchestration">オーケストレーションとBFF</Link>で見ていきます。
      </p>

      <DocsFooter href="/backend/api-design" />
    </DocsPage>
  );
}
