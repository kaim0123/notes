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
  title: "パスワードとアカウント回復",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド &middot; 認証</Eyebrow>
        <h1>パスワードとアカウント回復 ― 一番狙われる導線</h1>
        <Lead>
          <Link href="/security/hash">ハッシュ関数</Link>と<Link href="/security/auth">認証</Link>で理論を見ました。ここでは実装として、パスワードの保存方法、そして<strong>攻撃者にとって最も価値の高い経路であるパスワードリセット</strong>を組み立てます。ログイン画面をどれだけ堅くしても、リセット導線に穴があれば意味がありません ― 認証システムの強度は、最も弱い回復手段で決まります。
        </Lead>
      </Hero>

      <Heading num="01">パスワードの保存 ― 専用のアルゴリズムを使う</Heading>
      <p>パスワードは<strong>暗号化ではなくハッシュ</strong>で保存します。復号できてはいけないからです。そして、<code>SHA-256</code>のような<strong>汎用ハッシュを使ってはいけません</strong> ― 速すぎるためです。高速なハッシュは、総当たり攻撃も高速にします。</p>
      <table>
        <thead>
          <tr><th>アルゴリズム</th><th>評価</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Term>Argon2id</Term></td><td><strong>現在の第一推奨</strong>。計算量に加えメモリ使用量も要求し、GPUによる並列攻撃に強い</td></tr>
          <tr><td className="hl"><Term>bcrypt</Term></td><td>広く使われ実績十分。<strong>入力が72バイトで切り捨てられる</strong>点に注意</td></tr>
          <tr><td className="hl">scrypt</td><td>メモリ困難。標準ライブラリにあるので依存を増やしたくない場合に</td></tr>
          <tr><td className="hl">SHA-256 / MD5</td><td><strong>不可</strong>。速すぎる。ソルトを付けても不十分</td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import argon2 from "argon2";

// 保存時 ― ソルトは自動生成され、結果の文字列に含まれる
const hash = await argon2.hash(password, { type: argon2.argon2id });

// 検証時 ― パラメータもハッシュ文字列から読み取られる
const ok = await argon2.verify(hash, password);`}</code>
      </pre>
      <p><Term>ソルト</Term>(利用者ごとに異なるランダム値)は、これらのライブラリが自動で付与し、ハッシュ文字列に埋め込みます。自分で管理する必要はありません。</p>
      <Aside label="コストパラメータと移行">
        計算コストは<strong>「自分のサーバーで200〜500ミリ秒かかる」</strong>程度を目安に設定します。ハードウェアの進歩に応じて上げていく必要があるため、<strong>ログイン成功時に古いパラメータのハッシュを検出して再計算する</strong>仕組みを入れておくと、利用者に気付かせずに移行できます。同じ仕組みで、bcryptからArgon2への乗り換えも可能です。
      </Aside>

      <Heading num="02">パスワードポリシー ― 複雑さより長さ</Heading>
      <p>「大文字・小文字・数字・記号を含む8文字以上、90日ごとに変更」という古典的なルールは、<strong>現在は推奨されていません</strong>。NISTのガイドラインをはじめ、現代の指針は次のように変わりました。</p>
      <table>
        <thead>
          <tr><th>推奨</th><th>非推奨</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">最低8文字、できれば12文字以上</td><td>複雑さの強制(<code>Password1!</code>を量産するだけ)</td></tr>
          <tr><td className="hl">最大長を十分に取る(64文字以上)</td><td>短い最大長。パスワード管理ツールの生成値が入らない</td></tr>
          <tr><td className="hl">すべての文字種・空白を許可する</td><td>記号の禁止(実装の都合を利用者に押し付けている)</td></tr>
          <tr><td className="hl"><strong>漏洩済みパスワードの拒否</strong></td><td>定期的な変更の強制(より弱いものへ変えられる)</td></tr>
          <tr><td className="hl">貼り付けを許可する</td><td>貼り付け禁止(管理ツールの利用を妨げる)</td></tr>
        </tbody>
      </table>
      <p>最も効果があるのは<strong>漏洩済みパスワードのチェック</strong>です。既知の流出リストに含まれる文字列を拒否するだけで、<Term>クレデンシャルスタッフィング</Term>(他所で漏れたIDとパスワードの組を試す攻撃)の成功率が大きく下がります。</p>

      <Heading num="03">パスワードリセット ― 最も慎重に作る導線</Heading>
      <p>リセット機能は、<strong>「パスワードを知らない人がアカウントに入るための正規の経路」</strong>です。設計を誤れば、それは脆弱性そのものになります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// ① 申請 ― 存在有無を漏らさない
router.post("/password/forgot", rateLimit, async (req, res) => {
  const { email } = ForgotSchema.parse(req.body);
  const user = await userRepo.findByEmail(email);

  if (user) {
    const token = crypto.randomBytes(32).toString("base64url");
    await resetRepo.create({
      userId: user.id,
      tokenHash: sha256(token),          // ハッシュで保存する
      expiresAt: addMinutes(new Date(), 30),
    });
    await mailQueue.add("password-reset", { userId: user.id, token });
  }

  // 見つからなくても同じ応答・同じ所要時間で返す
  res.json({ message: "メールを送信しました" });
});`}</code>
      </pre>
      <table>
        <thead>
          <tr><th>要件</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">トークンは暗号論的乱数(32バイト以上)</td><td>推測されない。<code>Math.random()</code>は不可</td></tr>
          <tr><td className="hl">DBにはハッシュで保存</td><td>DBが漏れても、そのままではリセットできない</td></tr>
          <tr><td className="hl">有効期限は15〜60分</td><td>メールボックスに残り続けるため</td></tr>
          <tr><td className="hl"><strong>使用したら即座に無効化</strong></td><td>単回限り。再利用を許さない</td></tr>
          <tr><td className="hl">アカウントの存在を漏らさない</td><td>「そのメールは登録されていません」は<Term>ユーザー列挙</Term>を許す</td></tr>
          <tr><td className="hl">リセット後に<strong>全セッションを失効</strong></td><td>攻撃者が既にログインしていた場合に追い出す</td></tr>
          <tr><td className="hl">完了を本人に通知</td><td>身に覚えのない変更に気付ける</td></tr>
          <tr><td className="hl">申請と実行の両方にレート制限</td><td>メール爆撃と総当たりの両方を防ぐ</td></tr>
        </tbody>
      </table>
      <Aside label="⚠️ リセットリンクの漏洩経路">
        トークンをURLのクエリに入れると、<strong>Refererヘッダー経由で外部サイトに漏れる</strong>可能性があります。リセット画面には外部リソース(解析タグ、外部フォント)を置かず、<code>Referrer-Policy</code>を設定します。また、リンクをクリックしただけで処理が完了する設計にせず、<strong>POSTで確定させます</strong> ― メールクライアントのプレビュー機能がリンクを踏むことがあるためです。
      </Aside>

      <Heading num="04">ユーザー列挙を防ぐ ― 全経路で一貫させる</Heading>
      <p>「このメールアドレスは登録されているか」が分かると、攻撃者は標的を絞り込めます。リセット申請だけ対策しても、他の経路から漏れては意味がありません。</p>
      <table>
        <thead>
          <tr><th>経路</th><th>対策</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ログイン失敗</td><td>「メールアドレスまたはパスワードが違います」で統一する</td></tr>
          <tr><td className="hl">新規登録</td><td>「登録済みです」と出さず、<strong>既存アカウントには「心当たりがなければ無視してください」のメールを送る</strong></td></tr>
          <tr><td className="hl">応答時間</td><td>利用者が存在しない場合もハッシュ計算相当の時間を消費する(<Term>タイミング攻撃</Term>対策)</td></tr>
          <tr><td className="hl">パスワードリセット</td><td>常に同じ応答</td></tr>
        </tbody>
      </table>
      <p>ただし、これは<strong>ビジネス上の要請と衝突する</strong>ことがあります。「登録済みです」と教えない登録フォームは分かりにくく、離脱を招きます。SNSのように公開プロフィールがある場合、そもそも列挙を防ぐ意味が薄いこともあります。<strong>扱う情報の機微さで判断する</strong>のが実務的な落とし所です。</p>

      <Heading num="05">ログイン試行の制限</Heading>
      <p>総当たり攻撃への対策ですが、単純なアカウントロックには落とし穴があります。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>評価</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">N回失敗でアカウントをロック</td><td><strong>△</strong> 攻撃者がわざと失敗させて<strong>正規利用者を締め出せる</strong>(DoSになる)</td></tr>
          <tr><td className="hl">IPアドレス単位のレート制限</td><td>○ ただし分散した攻撃には効かない</td></tr>
          <tr><td className="hl">失敗ごとに待ち時間を増やす</td><td><strong>○</strong> 正規利用者への影響が小さい</td></tr>
          <tr><td className="hl">閾値を超えたらCAPTCHA</td><td>○ 自動化された攻撃に有効</td></tr>
          <tr><td className="hl">異常な兆候での追加確認</td><td>○ 見慣れない場所・端末からのログイン時にメール確認を挟む</td></tr>
        </tbody>
      </table>
      <p>実装は<Link href="/dev/backend/ops/rate-limit">レート制限</Link>の仕組みをそのまま使います。<strong>「1アカウントあたりの失敗回数」と「1IPあたりの試行回数」の両方</strong>を数えるのが基本です ― 前者は総当たり、後者はクレデンシャルスタッフィングに対応します。</p>

      <Heading num="06">多要素認証</Heading>
      <p>パスワードは「知っているもの」1要素です。そこに別の種類の要素を足すのが<Term>MFA</Term>です。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>強度</th><th>備考</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Term>パスキー</Term>(WebAuthn)</td><td><strong>最強</strong></td><td>公開鍵暗号ベース。<strong>フィッシングが原理的に効かない</strong>。パスワード自体を置き換えられる</td></tr>
          <tr><td className="hl">TOTP(認証アプリ)</td><td>強い</td><td>実装が容易。共有シークレットを暗号化して保存する</td></tr>
          <tr><td className="hl">SMS</td><td>弱い</td><td>SIMスワップと傍受のリスク。<strong>無いよりは良い</strong>が推奨されない</td></tr>
          <tr><td className="hl">メールのコード</td><td>弱い</td><td>メールが乗っ取られていれば無意味</td></tr>
        </tbody>
      </table>
      <p>MFAを実装するなら、<strong>リカバリコード</strong>を必ずセットで用意します。端末を紛失した利用者を救済する手段が無ければ、サポート窓口での本人確認という<strong>最も脆弱な経路</strong>に頼ることになります。TOTPの検証では、時計のずれを考慮して前後1つ分の時間枠を許容し、<strong>使用済みコードの再利用を拒否</strong>します。</p>

      <Heading num="07">アカウントのライフサイクル</Heading>
      <table>
        <thead>
          <tr><th>操作</th><th>注意点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">メール確認</td><td>登録直後は未確認状態にし、確認まで機能を制限する。確認リンクも単回・期限付き</td></tr>
          <tr><td className="hl">メールアドレス変更</td><td><strong>新旧両方に通知</strong>する。新アドレスで確認が完了するまで旧を有効に保つ</td></tr>
          <tr><td className="hl">パスワード変更</td><td><strong>現在のパスワードを要求</strong>する。放置端末からの乗っ取りを防ぐ</td></tr>
          <tr><td className="hl">重要操作の再認証</td><td>MFA解除、退会、送金前にパスワードを再入力させる</td></tr>
          <tr><td className="hl">退会</td><td>即時削除か、猶予期間付きの論理削除か。<strong>削除要求への対応義務</strong>(GDPR等)も考慮する</td></tr>
          <tr><td className="hl">監査ログ</td><td>ログイン・パスワード変更・MFA設定変更を記録し、<strong>本人が見られるようにする</strong></td></tr>
        </tbody>
      </table>
      <p>「身に覚えのない操作を本人が発見できる」ことは、防御が破られた後の被害を小さくします。通知と履歴は、地味ですが最も費用対効果の高い機能です。</p>

      <Analogy label="💡 たとえるなら">
        パスワードリセットは、家の鍵を失くしたときの合鍵作成です。玄関の鍵をどれだけ頑丈にしても、<strong>「本人確認なしで合鍵を作れる業者」</strong>が近所にいれば防犯は成立しません。だから合鍵の発行には、期限を切った引換券を本人の郵便受け(メール)にだけ届け、一度使ったら無効にし、発行したこと自体を本人に知らせる。そして合鍵を作ったら、それまで出回っていた鍵はすべて使えなくする(全セッション失効) ― これが「回復の経路が最も弱い」という問題への答えです。
      </Analogy>

      <Heading num="まとめ">回復導線こそ堅く作る</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Argon2id / bcryptで保存</h4><p>汎用ハッシュは速すぎる。ポリシーは複雑さより長さと漏洩チェック。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>リセットは単回・期限付き</h4><p>トークンはハッシュ保存。存在を漏らさず、完了後は全セッションを失効させる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>通知と履歴を残す</h4><p>破られた後に本人が気付けることが、被害を最小化する最も安い手段。</p></Card>
      </CardGrid>
      <p>認証はここまでです。次は本番運用に必要な守りの実装に移ります。まず<Link href="/dev/backend/ops/rate-limit">レート制限</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/security/auth" tag="セキュリティ">認証</RelatedLink>
            <RelatedLink href="/security/hash" tag="セキュリティ">ハッシュ関数と衝突攻撃</RelatedLink>
            <RelatedLink href="/dev/backend/mail" tag="バックエンド">メール送信と通知</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
