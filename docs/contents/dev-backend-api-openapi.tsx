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
  title: "OpenAPIと契約",
};

const codeBlock =
  "my-5 overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed";

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>OpenAPIと契約 ― LSUD向けAPIの説明書を機械可読に</h1>
        <Lead>
          「<Link href="/dev/backend/api/design">API設計 ― 誰のための窓口か</Link>」で、<Term>LSUD</Term>向けAPIは利用者が誰か分からない分、<b>説明書(契約)を固定する</b>必要があると見ました。<Term>OpenAPI</Term>(旧称 Swagger)は、その契約をYAML/JSONで書き、人間向けドキュメントと機械向け検証の両方に使える業界標準です。
        </Lead>
      </Hero>

      <Heading num="01">OpenAPIとは ― APIの「契約書」を標準形式で</Heading>
      <p><Term>OpenAPI Specification</Term>(OAS)は、REST APIの<b>エンドポイント・パラメータ・レスポンス・認証方式</b>を1つのファイル(<code>openapi.yaml</code>など)で記述する標準です。「<Link href="/design/methodology/contract">契約による設計</Link>」でいう<Term>事前条件</Term>(リクエストの形)と<Term>事後条件</Term>(レスポンスの形)を、APIの境界で明文化する現代的なやり方がOpenAPIです。</p>
      <p>LSUD向けの公開APIでは、口頭やWikiだけに頼ると利用者ごとに解釈がぶれます。OpenAPIがあれば、<b>同じ契約を全員が参照</b>でき、Swagger UIのようなツールで対話的に試すことも、クライアントSDKを自動生成することもできます。</p>

      <Heading num="02">Contract-first ― 実装より先に契約を書く</Heading>
      <p><Term>Contract-first</Term>(契約ファースト)は、コードを書く前にOpenAPIで「こういうAPIにする」と決める進め方です。実装後にドキュメントを後追いで書く<Term>Code-first</Term>より、LSUD向けではContract-firstの方が向きます。</p>
      <table>
        <thead>
          <tr><th>進め方</th><th>流れ</th><th>向く場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Contract-first</td><td>openapi.yaml → レビュー → 実装</td><td>公開API・複数チーム連携</td></tr>
          <tr><td className="hl">Code-first</td><td>実装 → ドキュメント生成</td><td>社内SSKD・プロトタイプ</td></tr>
        </tbody>
      </table>
      <p>Contract-firstなら、フロントとバックエンドが<b>同じ契約</b>を見ながら並行開発できます。モックサーバーで先にクライアントを書く、という進め方も可能です。DbCの考え方そのものは「<Link href="/design/methodology/contract">契約による設計</Link>」で扱います。</p>

      <Heading num="03">OpenAPIファイルの骨格</Heading>
      <p>最小限のOpenAPI 3.xファイルは、<code>info</code>(APIの説明)・<code>paths</code>(エンドポイント)・<code>components</code>(共通スキーマ)で構成されます。</p>
      <pre className={codeBlock}>
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
        id: { type: integer }
        name: { type: string }`}</code>
      </pre>
      <p>このファイルから、Swagger UIの画面やTypeScriptの型、テスト用のモックが生成できます。<b>1つの契約が複数の成果物の源泉</b>になるのがOpenAPIの強みです。</p>

      <Heading num="04">LSUD向けに必ず書いておく項目</Heading>
      <p>公開APIのOpenAPIには、エンドポイント一覧だけでなく、利用者が困らないための<b>運用上の約束</b>も含めます。</p>
      <table>
        <thead>
          <tr><th>項目</th><th>書く内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">バージョン</td><td><code>info.version</code>とURLの<code>/v1/</code>を対応させる</td></tr>
          <tr><td className="hl">認証</td><td><code>securitySchemes</code>でBearer・APIキー等を明記(<Link href="/security/auth">認証</Link>)</td></tr>
          <tr><td className="hl">エラー</td><td>4xx/5xxのレスポンススキーマと<code>code</code>の例</td></tr>
          <tr><td className="hl">Rate Limit</td><td>説明文や<code>x-rate-limit-*</code>ヘッダーの記載(実装と一致させる)</td></tr>
          <tr><td className="hl">ページネーション</td><td><code>limit</code>・<code>cursor</code>等のクエリと<code>meta</code>の形</td></tr>
        </tbody>
      </table>
      <Aside label="💡 エラー形式との接続">
        「<Link href="/dev/backend/express/design">ExpressのAPI設計</Link>」で揃える<code>{`{ error: { code, message } }`}</code>の形を、OpenAPIの<code>components/schemas/Error</code>として定義しておくと、実装とドキュメントが一致します。
      </Aside>

      <Heading num="05">バージョニングと後方互換</Heading>
      <p>LSUD向けAPIは、利用者が多いほど<b>破壊的変更</b>の影響が大きくなります。OpenAPIとURL設計をセットで考えます。</p>
      <ul>
        <li>破壊的変更が必要なら<code>/v2/</code>を新設し、<code>v1</code>は一定期間維持する</li>
        <li>フィールド削除・型変更は破壊的。追加は原則非破壊(optionalフィールドの追加)</li>
        <li>非推奨エンドポイントは<code>deprecated: true</code>と<code>Sunset</code>ヘッダーで予告する</li>
      </ul>
      <p>SSKD向けの内部APIはSlackで「来週変わります」と回せますが、LSUD向けは<b>契約ファイルとバージョン番号</b>が変更管理の本体になります。</p>

      <Analogy label="💡 たとえるなら">
        OpenAPIは<b>製品の取扱説明書＋部品表</b>です。買い手(利用者)が誰か分からなくても、同じ説明書を見れば正しく使えます。Contract-firstは<b>設計図を先に確定してから製造</b>するやり方で、後から「実物と説明書が違う」問題を防ぎます。
      </Analogy>

      <Heading num="まとめ">LSUD向けは契約を先に、形式を固定</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>OpenAPI＝標準の契約書</h4><p>エンドポイント・型・認証を1ファイルで。人間も機械も同じ参照元。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Contract-first</h4><p>公開APIは実装前に契約を書く。並行開発とモックがしやすい。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>バージョンと互換</h4><p>破壊的変更は<code>/v2/</code>。OpenAPIとURLをセットで管理する。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/backend/api/design" tag="開発">API設計 ― 誰のための窓口か</RelatedLink>
            <RelatedLink href="/dev/backend/api/rest" tag="開発">REST API</RelatedLink>
            <RelatedLink href="/design/methodology/contract" tag="設計">契約による設計</RelatedLink>
            <RelatedLink href="/dev/backend/express/design" tag="開発">ExpressのAPI設計</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
