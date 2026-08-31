import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "OpenAPIと契約" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>OpenAPIと契約 ― 説明書を機械に読ませる</h1>
        <Lead>
          <Link href="/backend/api-design">LSUD向けのAPI</Link>は、利用者が誰か分からない分、説明書を固定する必要があります。<Term>OpenAPI</Term>は、その約束をテキストファイルとして書き、人間向けの説明書にも機械向けの検証にも使えるようにする標準です。狙いは1つ ― <Term>参照元を1つに保つ</Term>ことです。
        </Lead>
      </Hero>

      <Heading num="01">契約を1ファイルに置く</Heading>
      <p>
        <Term>OpenAPI Specification</Term>は、APIのエンドポイント・パラメータ・レスポンス・認証方式を1つのファイルで記述する標準です。<Link href="/design/methodology-contract">契約による設計</Link>でいう<Term>事前条件</Term>(リクエストの形)と<Term>事後条件</Term>(レスポンスの形)を、APIの境界で明文化するやり方だと言えます。
        </p>
      <p>
        価値は「書いてあること」そのものより、<Term>そこから他のものが導ける</Term>ことにあります。
      </p>

      <DiagramFrame
        slug="backend-api-openapi-source"
        aspect="640 / 320"
        caption="契約ファイルが1つあることで何が導けるかを示した図。中央左の契約ファイルから、人間が読む説明書・呼ぶ側の型定義・実装前に使えるモックサーバー・CIでの差分検査の4つが導かれる。契約を直せば4つとも同時に追従する。下段には対比として、契約がない場合が置かれ、説明書と型とモックがそれぞれ手で書かれ、時間とともに互いにずれていく様子が波線で示されている。ずれても誰も気づかないことが、契約を持たないことの本質的な問題であることを表す。"
      />

      <Heading num="02">契約を先に書くか、あとから起こすか</Heading>
      <p>
        <Term>Contract-first</Term>は、コードを書く前に「こういうAPIにする」と決める進め方です。実装後に説明書を後追いで書く<Term>Code-first</Term>と比べます。
      </p>

      <table>
        <thead>
          <tr><th>進め方</th><th>流れ</th><th>向く場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Contract-first</td><td>契約 → レビュー → 実装</td><td>公開API・複数チーム連携</td></tr>
          <tr><td className="hl">Code-first</td><td>実装 → 契約を生成</td><td>社内向け・試作</td></tr>
        </tbody>
      </table>

      <p>
        Contract-firstの実利は、<Term>合意の時点が実装より前に来る</Term>ことです。フロントとバックエンドが同じ契約を見て並行して進められ、モックで先に呼ぶ側を書くこともできます。逆にCode-firstは、実装が変わるたびに契約が自動で追従する代わりに、<Term>うっかり壊した変更まで追従してしまう</Term>という弱点があります。
      </p>

      <Heading num="03">ファイルの骨格</Heading>
      <p>
        最小構成は、APIの説明・エンドポイント・共通スキーマの3つです。
      </p>

      <pre>
        <code>{`openapi: 3.1.0
info:
  title: Example Shop API
  version: 1.0.0
paths:
  /v1/users/{id}:
    get:
      summary: ユーザーを1件取得
      parameters:
        - name: id
          in: path
          required: true
          schema: { type: integer }
      responses:
        "200":
          description: 成功
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/User"
        "404":
          description: 見つからない
components:
  schemas:
    User:
      type: object
      required: [id, name]
      properties:
        id:   { type: integer }
        name: { type: string }`}</code>
      </pre>

      <p>
        共通の形は<code>components</code>に切り出して<code>$ref</code>で参照します。エラーの形をここに1つだけ定義しておくと、全エンドポイントで揃えざるを得なくなる ― 契約ファイルは<Term>一貫性を強制する道具</Term>としても働きます。
      </p>

      <Heading num="04">公開APIで書き漏らしやすい項目</Heading>
      <p>
        エンドポイント一覧だけでは足りません。<Term>使う側が実際に困るのは、正常系ではないところ</Term>です。
      </p>

      <table>
        <thead>
          <tr><th>項目</th><th>書く内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">バージョン</td><td><code>info.version</code>とURLの<code>/v1/</code>を対応させる</td></tr>
          <tr><td className="hl">認証</td><td><code>securitySchemes</code>で方式を明記する</td></tr>
          <tr><td className="hl">エラー</td><td>4xx/5xxのスキーマと、コードの一覧・例</td></tr>
          <tr><td className="hl">流量制限</td><td>上限と、返るヘッダーの名前(<Link href="/backend/ops-rate-limit">レート制限</Link>と一致させる)</td></tr>
          <tr><td className="hl">一覧の分割</td><td>件数指定や続きの取り方と、返る形</td></tr>
        </tbody>
      </table>

      <Aside label="実装と一致していない契約は、無いより悪い">
        契約は書いた瞬間から古くなります。<Term>CIで実際のレスポンスを契約に照らして検証する</Term>仕組みを一緒に入れておかないと、利用者は「書いてあるのに動かない」という最も厄介な状態に置かれます。実装側で揃えるエラー形式は<Link href="/backend/express-design">Expressでの API設計</Link>で扱います。
      </Aside>

      <Heading num="05">契約は変更管理の単位でもある</Heading>
      <p>
        利用者が多いほど、壊す変更の影響は大きくなります。契約ファイルがあると、<Term>変更が壊すものかどうかを機械が判定できる</Term>ようになります ― 前のバージョンとの差分を取り、フィールドの削除や型の変更が含まれていればCIを落とす、という運用です。
      </p>
      <p>
        何が壊す変更にあたるか、そして古いバージョンをどう畳むかは、次の<Link href="/backend/api-versioning">バージョニングと廃止</Link>で扱います。
      </p>

      <Analogy label="💡 たとえるなら">
        OpenAPIは取扱説明書と部品表を兼ねたものです。買い手が誰か分からなくても、同じ説明書を見れば正しく使えます。ただし、説明書だけ更新して製品を変えなければ意味がなく、その逆も同じです。だから工場では、製品と説明書を突き合わせる検査工程を必ず置きます。
      </Analogy>

      <Heading num="まとめ">参照元を1つに保つ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>契約から他が導ける</h4>
          <p>説明書・型・モック・検査。手書きを増やすほどずれる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>公開APIは契約が先</h4>
          <p>合意の時点を実装より前に置くと、並行して進められる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>検証とセットで意味を持つ</h4>
          <p>実装と一致しない契約は、無いより有害になる。</p>
        </Card>
      </CardGrid>

      <p>
        契約を固定したうえで、それでも変えなければならないときの手順へ。<Link href="/backend/api-versioning">バージョニングと廃止</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/api-openapi" />
    </DocsPage>
  );
}
