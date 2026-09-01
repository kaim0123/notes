import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DiagramFrame,
  Card,
  CardGrid,
  CardNumber,
  Aside,
  Steps,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "セキュリティテスト" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>セキュリティテスト ― 想定していない使い方を、先に試す</h1>
        <Lead>
          <Link href="/test/performance">性能テスト</Link>が「想定を超えた量」を試すものだとすれば、こちらは<strong>「想定していない使い方」</strong>を試すものです。攻撃手法と防御の原理そのものは<Link href="/security">セキュリティ</Link>セクションが扱います。ここで決めるのは、<Term>それをどうやって毎回自動で確かめる形に変えるか</Term>と、<strong>ツールに任せず自分で書くべきものは何か</strong>です。
        </Lead>
      </Hero>

      <Heading num="01">4つの検査手法は、互いの穴を埋め合う</Heading>

      <DiagramFrame
        slug="test-security-methods"
        aspect="700 / 330"
        caption="セキュリティの4つの検査手法を、対象・見つかるもの・見つからないもので並べたもの。静的解析はソースコードから危険な関数の使用やコードに書かれた鍵を見つけるが、実行時の設定不備は見つからない。依存解析はパッケージの既知の脆弱性を見つけるが、自作コードの欠陥は見つからない。動的解析は実際に成立する攻撃を見つけるが、認証の裏側など到達しにくい経路は調べない。ペネトレーションテストは複数の弱点を組み合わせた侵入経路を見つけるが、網羅性は保証されない。4つとも「見つからないもの」が別々を向いており、層を重ねて互いの穴を埋めるのが前提。"
      />

      <p>
        右端の列が要点です。<strong>静的解析は「危なそうな書き方」を大量に報告しますが、実際に到達可能かは分かりません</strong>。動的解析は実際に成立するものを見つけますが、認証の裏側は調べません。どれか1つを導入して「セキュリティ対策済み」とするのは、4つのうち1つの穴だけを塞いだ状態です。
      </p>

      <Heading num="02">CIに置くのは、速くて誤検知の少ないもの</Heading>
      <p>
        毎回動かす価値があるのは、実行が速く、誤検知が少ない検査に限られます。
      </p>

      <Steps>
        <li><strong>秘密情報の検出</strong> ― コミットに鍵やトークンが混ざっていないか。<strong>最も費用対効果が高い</strong></li>
        <li><strong>依存の脆弱性スキャン</strong> ― 既知の脆弱性が公開されたパッケージを検出する(<Link href="/dev/tooling-security">依存の脆弱性とサプライチェーン</Link>)</li>
        <li><strong>静的解析ルール</strong> ― 危険なAPI、エスケープ漏れ、文字列の評価実行などを検出する</li>
        <li><strong>設定の検査</strong> ― 権限設定、公開範囲、暗号化の有無</li>
        <li><strong>コンテナイメージの検査</strong> ― 土台のイメージに含まれる既知の脆弱性</li>
      </Steps>

      <Aside label="誤検知との付き合い方を、最初に決める">
        セキュリティ検査は誤検知が多く、放置すると<strong>誰も見なくなる</strong>点で<Link href="/test/flaky">フレーキーテスト</Link>とまったく同じ問題を抱えます。「高深刻度のみビルドを失敗させる」「除外は理由付きで記録する」といった運用を、導入と同時に決めてください。目指すのはゼロ件ではなく、<Term>見るべきものが埋もれない状態</Term>です。
      </Aside>

      <Heading num="03">自分で書けるものは、自分で書く</Heading>
      <p>
        ツールに任せきりにせず、<strong>通常のテストとして書けるものがあります</strong>。むしろこちらのほうが確実です。
      </p>

      <table>
        <thead>
          <tr><th>観点</th><th>テストの例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">認可(最重要)</td><td>他人のIDの資源にアクセスして403か404が返ること</td></tr>
          <tr><td className="hl">認証</td><td>トークンなし・期限切れ・改ざん済みで拒否されること</td></tr>
          <tr><td className="hl">入力検証</td><td>過大な長さ、想定外の型、負の数、特殊文字を送っても壊れないこと</td></tr>
          <tr><td className="hl">出力エスケープ</td><td>スクリプトを含む名前を登録し、そのまま実行されないこと</td></tr>
          <tr><td className="hl">レート制限</td><td>連続実行で429が返ること</td></tr>
          <tr><td className="hl">情報漏洩</td><td>エラー応答にスタックトレースや内部パスが含まれないこと</td></tr>
          <tr><td className="hl">セキュリティヘッダ</td><td>必要なヘッダが設定されていること</td></tr>
        </tbody>
      </table>

      <Heading num="04">認可のテストが、いちばん割に合う</Heading>
      <p>
        表の1行目だけは別格です。「ログインしていれば誰のデータでも見られる」種類の欠陥は<strong>実際の事故として非常に多い</strong>一方、ツールでは検出しにくく、しかもテストとしては極めて簡単に書けます。
      </p>

      <DiagramFrame
        slug="test-security-authz"
        aspect="640 / 320"
        caption="認可の欠陥がどう見えるかの比較。本人のトークンで自分の注文を取得すれば正しく200が返る。別人のトークンで同じ注文を取得したとき、本来は404が返るべきところ、認可の確認が抜けていると200が返って他人のデータが見えてしまう。2つのリクエストはURLも形式も同じで、違うのは持っているトークンだけ。だからコードを読む検査には危険な書き方が見当たらず、外から動かす検査にも正規の応答に見える。一方テストとしては、利用者を2人作って一方のトークンで他方の資源を取りに行くだけで書ける。"
      />

      <pre>
        <code>{`it("他人の注文は取得できない", async () => {
  const alice = await createUser();
  const bob = await createUser();
  const order = await createOrder({ userId: alice.id });

  const res = await request(app)
    .get("/api/orders/" + order.id)
    .set("Authorization", tokenFor(bob)); // 別人のトークン

  expect(res.status).toBe(404); // 存在自体を隠すため、403ではなく404
});`}</code>
      </pre>

      <p>
        最終行にも判断が入っています ― <strong>403を返すと「そのIDの注文は存在する」ことを教えてしまいます</strong>。存在の有無まで秘密にすべき資源では404を返します。この使い分けは<Link href="/test/api">APIのテスト</Link>で扱ったステータスコードの契約の一部でもあります。
      </p>

      <Aside label="習慣にする">
        エンドポイントを1本足したら、<strong>認可のテストも1本足す</strong>。3行で書けて、事故の型としては最多です。<Link href="/test/e2e-viewpoints">観点の洗い出し</Link>で「誰が」を最初の着眼点に置いているのは、この非対称性のためです。
      </Aside>

      <Heading num="05">脅威から逆算する</Heading>
      <p>
        観点を機能から出すだけでは、攻撃者の発想には届きません。<strong>「この機能で、攻撃者は何を得たいか」から逆算する</strong>と、機能の一覧からは出てこない観点が現れます。
      </p>

      <table>
        <thead>
          <tr><th>攻撃者が得たいもの</th><th>そこから出る観点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">他人のデータ</td><td>IDを付け替える / 一覧APIに他人の分が混ざらないか</td></tr>
          <tr><td className="hl">権限の昇格</td><td>自分のロールを書き換えて送る / 管理画面のAPIを直接叩く</td></tr>
          <tr><td className="hl">無料での利用</td><td>課金チェックを飛ばす経路 / 上限の判定を回避する</td></tr>
          <tr><td className="hl">サービスの停止</td><td>過大な入力 / 高コストな検索の連打</td></tr>
          <tr><td className="hl">痕跡の消去</td><td>監査ログを消せないか / 改ざんできないか</td></tr>
        </tbody>
      </table>

      <p>
        2行目は特に見落とされます。<Term>画面に出ていない操作でも、APIは受け付けます</Term> ― 管理者だけに表示されるボタンを隠しただけで、そのAPIに認可の確認がなければ、誰でも叩けます。
      </p>

      <Heading num="06">修正の優先順位を決める</Heading>
      <p>
        検査を回すと、必ず処理しきれない量の指摘が出ます。深刻度だけで並べると、<strong>実際には到達できない箇所の「高深刻度」が上位を占める</strong>ことになります。
      </p>

      <table>
        <thead>
          <tr><th>見る軸</th><th>問い</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">到達可能性</td><td>外部から実際にその経路へ到達できるか</td></tr>
          <tr><td className="hl">認証の要否</td><td>ログインなしで踏めるか、それとも正規利用者だけか</td></tr>
          <tr><td className="hl">影響の範囲</td><td>1人分か、全員分か</td></tr>
          <tr><td className="hl">取り返しがつくか</td><td>データの閲覧か、破壊か、漏洩か</td></tr>
        </tbody>
      </table>

      <p>
        <Link href="/test/strategy">リスクベースドテスト</Link>と同じ考え方です ― 影響の大きさと発生確率の積で並べ替え、上から潰します。深刻度の数値は、その積の片方でしかありません。
      </p>

      <Heading num="まとめ">検出が難しいものほど、自分で書く</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>4つは互いの穴を埋め合う</h4>
          <p>「見つからないもの」の列が別々を向いている。1つでは足りない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>誤検知の運用を最初に決める</h4>
          <p>ゼロ件を目指さない。見るべきものが埋もれない状態を保つ。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>認可テストは3行で書ける</h4>
          <p>検出は難しいのにテストは易しい。エンドポイント1本につき1本。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>脅威から逆算する</h4>
          <p>機能の一覧からは、攻撃者の発想に対応する観点は出てこない。</p>
        </Card>
      </CardGrid>

      <p>
        性能とセキュリティを個別に見てきました。最後に、これらを日々の開発にどう組み込むかへ。<Link href="/test/non-functional-ci">非機能テストの組み込み</Link>へ進みます。
      </p>

      <DocsFooter href="/test/security" />
    </DocsPage>
  );
}
