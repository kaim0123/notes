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
  Aside,
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "セキュリティテスト",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>セキュリティテスト ― 攻撃者の観点で確かめる</h1>
        <Lead>
          機能テストは「正しく使えば正しく動くか」を確かめます。セキュリティテストが確かめるのは<strong>「想定外の使い方をされたときに、してはいけないことが起きないか」</strong>です。仕様書に書かれていない振る舞いを探すため、進め方も道具も変わります。
        </Lead>
      </Hero>

      <p>脆弱性そのものの仕組みと対策は「<Link href="/security/attacks">攻撃手法の概観</Link>」「<Link href="/security/countermeasures">セキュリティ対策の概観</Link>」で扱っています。ここでは<strong>検証の工程としてどう組み込むか</strong>を整理します。</p>

      <Heading num="01">4つの検査手法</Heading>
      <table>
        <tbody>
          <tr><th>手法</th><th>対象</th><th>見つかるもの / 見つからないもの</th></tr>
          <tr><td className="hl">SAST(静的解析)</td><td>ソースコード</td><td>危険な関数、ハードコードされた鍵 / 実行時の設定不備</td></tr>
          <tr><td className="hl">SCA(依存解析)</td><td>依存パッケージ</td><td>既知の脆弱性 / 自作コードの欠陥</td></tr>
          <tr><td className="hl">DAST(動的解析)</td><td>稼働中のアプリ</td><td>実際に成立する攻撃 / 到達しない経路の問題</td></tr>
          <tr><td className="hl">ペネトレーションテスト</td><td>システム全体</td><td><strong>組み合わせによる侵入経路</strong> / 網羅性は保証されない</td></tr>
        </tbody>
      </table>
      <p>どれか1つでは不十分です。SASTは「危なそうな書き方」を大量に報告しますが、実際に到達可能かは分かりません。DASTは実際に成立するものを見つけますが、認証の裏側や到達しにくい経路は調べません。<strong>層を重ねて補完する</strong>のが前提です。</p>

      <Heading num="02">自動化してCIに置くもの</Heading>
      <p>毎回動かす価値があるのは、速くて誤検知の少ない検査です。</p>
      <Steps>
        <li><strong>秘密情報の検出</strong> ― コミットに鍵やトークンが混ざっていないか。最も費用対効果が高い</li>
        <li><strong>依存の脆弱性スキャン</strong> ― 既知のCVEを検出する(「<Link href="/dev/tooling/security">依存の脆弱性とサプライチェーン</Link>」)</li>
        <li><strong>静的解析ルール</strong> ― 危険なAPI、エスケープ漏れ、<code>eval</code> の使用などを検出する</li>
        <li><strong>設定の検査</strong> ― IaCの権限設定、公開範囲、暗号化の有無</li>
        <li><strong>コンテナイメージの検査</strong> ― ベースイメージの既知脆弱性(「<Link href="/infra/container/security">コンテナセキュリティ</Link>」)</li>
      </Steps>
      <Aside label="誤検知との付き合い方">
        セキュリティ検査は誤検知が多く、放置すると<strong>誰も見なくなる</strong>点でフレーキーテストと同じ問題を抱えます。「高深刻度のみビルドを失敗させる」「除外は理由付きで記録する」といった運用を最初に決めてください。ゼロ件を目指すのではなく、<strong>見るべきものが埋もれない</strong>状態を保つのが目的です。
      </Aside>

      <Heading num="03">自分で書けるセキュリティテスト</Heading>
      <p>ツールに任せきりにせず、<strong>通常のテストとして書ける</strong>ものがあります。むしろこちらのほうが確実です。</p>
      <table>
        <tbody>
          <tr><th>観点</th><th>テストの例</th></tr>
          <tr><td className="hl">認可(最重要)</td><td>他人のIDのリソースにアクセスして<strong>403/404が返る</strong>ことを確認する</td></tr>
          <tr><td className="hl">認証</td><td>トークンなし・期限切れ・改ざん済みトークンで拒否されること</td></tr>
          <tr><td className="hl">入力検証</td><td>過大な長さ、想定外の型、負の数、特殊文字を送っても壊れないこと</td></tr>
          <tr><td className="hl">出力エスケープ</td><td><code>&lt;script&gt;</code> を含む名前を登録し、そのまま実行されないこと</td></tr>
          <tr><td className="hl">レート制限</td><td>連続実行で429が返ること</td></tr>
          <tr><td className="hl">情報漏洩</td><td>エラー応答にスタックトレースや内部パスが含まれないこと</td></tr>
          <tr><td className="hl">セキュリティヘッダ</td><td>必要な<Link href="/security/headers">ヘッダ</Link>が設定されていること</td></tr>
        </tbody>
      </table>
      <p>とくに<strong>認可のテスト</strong>は自動化の価値が高い領域です。「ログインしていれば誰のデータでも見られる」種類の欠陥(オブジェクトレベルの認可不備)は実際の事故として非常に多く、しかもツールでは検出しにくい一方、<strong>テストとしては簡単に書けます</strong>。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`it("他人の注文は取得できない", async () => {
  const alice = await createUser();
  const bob = await createUser();
  const order = await createOrder({ userId: alice.id });

  const res = await request(app)
    .get(\`/api/orders/\${order.id}\`)
    .set("Authorization", tokenFor(bob));      // 別人のトークン

  expect(res.status).toBe(404);                 // 存在を隠すため404
});`}</code>
      </pre>

      <Heading num="04">脅威から逆算して考える</Heading>
      <p>やみくもに試すのではなく、<strong>何を守るか</strong>から検証項目を導きます。簡便な問いは次の6つです(STRIDEの考え方)。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>なりすませるか</h4><p>他人として振る舞えないか。セッション・トークンの扱い。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>改ざんできるか</h4><p>価格や権限をクライアント側から書き換えられないか。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>否認できるか</h4><p>誰が何をしたかの記録が残るか(「<Link href="/security/logging">ログ出力設計</Link>」)。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>漏れるか</h4><p>権限のないデータ・エラー詳細・他人のIDが見えないか。</p></Card>
        <Card><CardNumber>5</CardNumber><h4>止められるか</h4><p>1リクエストで大量の資源を消費させられないか(<Link href="/dev/regex">ReDoS</Link>・巨大な入力)。</p></Card>
        <Card><CardNumber>6</CardNumber><h4>権限を上げられるか</h4><p>一般利用者から管理機能に到達できないか。</p></Card>
      </CardGrid>
      <p>この6問を機能ごとに当てるだけで、テスト項目はかなり具体的になります。設計段階で行えば<Term>脅威モデリング</Term>、実装後に行えばセキュリティテストの設計になります。</p>

      <Heading num="05">ペネトレーションテストと診断</Heading>
      <table>
        <tbody>
          <tr><th>項目</th><th>内容</th></tr>
          <tr><td className="hl">目的</td><td>実際に侵入できるか、どこまで到達できるかを検証する</td></tr>
          <tr><td className="hl">時期</td><td>大きなリリース前、外部公開前、定期(年次など)</td></tr>
          <tr><td className="hl">前提</td><td><strong>必ず書面での許可を取る</strong>。範囲・期間・連絡体制を明記する</td></tr>
          <tr><td className="hl">注意</td><td>本番で行う場合、負荷やデータ改変の影響を事前に合意する</td></tr>
          <tr><td className="hl">成果物</td><td>再現手順・影響度・修正方針。<strong>修正後の再検証</strong>まで含めて計画する</td></tr>
        </tbody>
      </table>
      <Aside label="許可のない検査は攻撃">
        自社サービスであっても、クラウド事業者や外部SaaSの範囲に及ぶ検査には事前承認が必要な場合があります。第三者のサービスに対して無断で検査を行えば、それは<strong>不正アクセスそのもの</strong>です。範囲と権限を書面で確定させてから実施してください。
      </Aside>

      <Heading num="06">修正の優先順位を決める</Heading>
      <p>検出結果はすぐに数百件になります。すべてを同時には直せないため、優先順位を決めます。</p>
      <table>
        <tbody>
          <tr><th>観点</th><th>問い</th></tr>
          <tr><td className="hl">到達可能性</td><td>外部から実際に到達できる経路か。内部限定か</td></tr>
          <tr><td className="hl">影響</td><td>成立したら何が起きるか(全データ漏洩か、軽微な情報開示か)</td></tr>
          <tr><td className="hl">認証の要否</td><td>未認証で実行できるものは最優先</td></tr>
          <tr><td className="hl">悪用の容易さ</td><td>公開された攻撃コードがあるか</td></tr>
          <tr><td className="hl">修正コスト</td><td>設定変更で済むか、設計変更が要るか</td></tr>
        </tbody>
      </table>
      <p>この判断は<Link href="/security/management">リスクマネジメント</Link>の枠組みそのものです。「深刻度が高い順」ではなく<strong>「到達可能性 × 影響」</strong>で並べ替えると、現実的な優先順位になります。</p>

      <Heading num="まとめ">想定外の使い方を試す</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>層を重ねる</h4><p>SAST・SCA・DAST・ペネトレは互いに補完する。1つでは不十分。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>認可テストは自分で書く</h4><p>他人のIDでアクセスして拒否される ― 最も事故が多く、最も書きやすい。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>許可なく試さない</h4><p>範囲と権限を書面で確定させてから。これは技術以前の前提。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/security/countermeasures" tag="セキュリティ">セキュリティ対策の概観</RelatedLink>
            <RelatedLink href="/security/authz" tag="セキュリティ">認可</RelatedLink>
            <RelatedLink href="/dev/tooling/security" tag="実装">依存の脆弱性とサプライチェーン</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
