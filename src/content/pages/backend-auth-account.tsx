import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "パスワードとアカウント回復" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>パスワードとアカウント回復 ― 一番狙われる導線</h1>
        <Lead>
          パスワードの保存方法と、<Term>攻撃者にとって最も価値の高い経路であるパスワードリセット</Term>を組み立てます。ログイン画面をどれだけ堅くしても、リセット導線に穴があれば意味がありません ― <Term>認証の強度は、最も弱い回復手段で決まります</Term>。
        </Lead>
      </Hero>

      <Heading num="01">保存には専用のアルゴリズムを使う</Heading>
      <p>
        パスワードは<Term>暗号化ではなくハッシュ</Term>で保存します。復号できてはいけないからです。そして汎用のハッシュ関数を使ってはいけません ― <Term>速すぎる</Term>ためです。高速なハッシュは、総当たりも高速にします。
      </p>

      <table>
        <thead>
          <tr><th>アルゴリズム</th><th>評価</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Term>Argon2id</Term></td><td><strong>現在の第一推奨</strong>。計算量に加えメモリも要求し、並列攻撃に強い</td></tr>
          <tr><td className="hl"><Term>bcrypt</Term></td><td>広く使われ実績十分。<strong>入力が72バイトで切り捨てられる</strong>点に注意</td></tr>
          <tr><td className="hl">scrypt</td><td>メモリを要求する。依存を増やしたくない場合に</td></tr>
          <tr><td className="hl">汎用ハッシュ</td><td><strong>不可</strong>。速すぎる。ソルトを付けても不十分</td></tr>
        </tbody>
      </table>

      <pre>
        <code>{`import argon2 from "argon2";

// 保存時 ― ソルトは自動生成され、結果の文字列に含まれる
const hash = await argon2.hash(password, { type: argon2.argon2id });

// 検証時 ― パラメータもハッシュ文字列から読み取られる
const ok = await argon2.verify(hash, password);`}</code>
      </pre>

      <Aside label="コストと移行">
        計算コストは<Term>自分のサーバーで200〜500ミリ秒かかる</Term>程度を目安に設定します。機材の進歩に応じて上げる必要があるため、<Term>ログイン成功時に古いパラメータを検出して計算し直す</Term>仕組みを入れておくと、利用者に気づかせずに移行できます。同じ仕組みで、アルゴリズムそのものの乗り換えもできます。
      </Aside>

      <Heading num="02">複雑さより長さ</Heading>
      <p>
        「大文字・小文字・数字・記号を含む8文字以上、90日ごとに変更」という古典的なルールは、<Term>現在は推奨されていません</Term>。
      </p>

      <table>
        <thead>
          <tr><th>推奨</th><th>非推奨</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">最低8文字、できれば12文字以上</td><td>複雑さの強制(似たような文字列を量産するだけ)</td></tr>
          <tr><td className="hl">最大長を十分に取る</td><td>短い最大長。管理ツールの生成値が入らない</td></tr>
          <tr><td className="hl">すべての文字種・空白を許可する</td><td>記号の禁止(実装の都合を利用者に押し付けている)</td></tr>
          <tr><td className="hl"><strong>漏洩済みのものを拒否する</strong></td><td>定期的な変更の強制(より弱いものへ変えられる)</td></tr>
          <tr><td className="hl">貼り付けを許可する</td><td>貼り付け禁止(管理ツールの利用を妨げる)</td></tr>
        </tbody>
      </table>

      <p>
        最も効果があるのは<Term>漏洩済みかどうかの確認</Term>です。既知の流出リストに含まれる文字列を拒否するだけで、<Term>他所で漏れた組み合わせを試す攻撃</Term>の成功率が大きく下がります。
      </p>

      <Heading num="03">回復の導線こそ守る</Heading>
      <p>
        リセット機能は<Term>パスワードを知らない人がアカウントに入るための正規の経路</Term>です。設計を誤れば、それ自体が脆弱性になります。
      </p>

      <DiagramFrame
        slug="backend-auth-reset"
        aspect="640 / 360"
        caption="認証の強度が最も弱い回復手段で決まることを示した図。上段には、長いパスワードと多要素認証と試行制限で厚く守られたログイン画面と、その隣にパスワードリセットという別の扉が並ぶ。攻撃者は弱いほうを通ればよいので、正面をいくら厚くしてもリセット側が薄ければ全体の強度はそちらで決まる。下段はリセットの導線に置くべき守りを、申請・発行と保管・使用と完了の3段に分けて並べたもの。申請では有無にかかわらず同じ応答を同じ時間で返し回数も制限する。トークンは推測できない乱数でハッシュ保存し期限を短くする。使用は一度きりとし、完了後は既存のセッションをすべて失効させ本人に通知する。"
      />

      <pre>
        <code>{`// ① 申請 ― 存在の有無を漏らさない
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

  // 見つからなくても、同じ応答・同じ所要時間で返す
  res.json({ message: "メールを送信しました" });
});`}</code>
      </pre>

      <table>
        <thead>
          <tr><th>要件</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">トークンは暗号用の乱数で作る</td><td>推測されない。通常の乱数生成器では不可</td></tr>
          <tr><td className="hl">保存はハッシュで</td><td>保管先が漏れても、そのままではリセットできない</td></tr>
          <tr><td className="hl">有効期限は15〜60分</td><td>受信箱に残り続けるため</td></tr>
          <tr><td className="hl"><strong>使用したら即座に無効化</strong></td><td>一度きり。再利用を許さない</td></tr>
          <tr><td className="hl">アカウントの存在を漏らさない</td><td>「登録されていません」は<Term>利用者の洗い出し</Term>を許す</td></tr>
          <tr><td className="hl">完了後に<strong>全セッションを失効</strong></td><td>すでに侵入されていた場合に追い出す</td></tr>
          <tr><td className="hl">完了を本人に通知</td><td>身に覚えのない変更に気づける</td></tr>
          <tr><td className="hl">申請と実行の両方に回数制限</td><td>メールの大量送信と総当たりの両方を防ぐ</td></tr>
        </tbody>
      </table>

      <Aside label="リンクの漏れる経路">
        トークンをURLに入れると、<Term>遷移元を伝えるヘッダー経由で外部に漏れる</Term>可能性があります。リセット画面には外部の読み込み(解析タグ、外部フォント)を置かず、遷移元の送出を抑える設定を入れます。また、<Term>リンクを開いただけで処理が完了する設計にしない</Term> ― メールソフトのプレビューがリンクを踏むことがあるためです。
      </Aside>

      <Heading num="04">洗い出しは全経路で塞ぐ</Heading>
      <p>
        「このアドレスは登録されているか」が分かると、攻撃者は標的を絞り込めます。リセット申請だけ対策しても、他の経路から漏れては意味がありません。
      </p>

      <table>
        <thead>
          <tr><th>経路</th><th>対策</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ログイン失敗</td><td>「メールアドレスまたはパスワードが違います」で統一する</td></tr>
          <tr><td className="hl">新規登録</td><td>「登録済みです」と出さず、<strong>既存アカウントには心当たりを尋ねるメールを送る</strong></td></tr>
          <tr><td className="hl">応答時間</td><td>存在しない場合も、ハッシュ計算相当の時間を消費する</td></tr>
          <tr><td className="hl">リセット申請</td><td>常に同じ応答</td></tr>
        </tbody>
      </table>

      <p>
        ただし、これは<Term>使いやすさと衝突します</Term>。「登録済みです」と教えない登録フォームは分かりにくく、離脱を招きます。公開プロフィールがあるサービスでは、そもそも洗い出しを防ぐ意味が薄いこともあります。<Term>扱う情報の機微さで判断する</Term>のが実務的な落とし所です。
      </p>

      <Heading num="05">試行の制限には落とし穴がある</Heading>
      <table>
        <thead>
          <tr><th>方式</th><th>評価</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">N回失敗でアカウントを凍結</td><td><strong>△</strong> 攻撃者がわざと失敗させて<strong>正規の利用者を締め出せる</strong></td></tr>
          <tr><td className="hl">送信元ごとの回数制限</td><td>○ ただし分散した攻撃には効かない</td></tr>
          <tr><td className="hl">失敗ごとに待ち時間を増やす</td><td><strong>○</strong> 正規の利用者への影響が小さい</td></tr>
          <tr><td className="hl">閾値を超えたら人間かを確かめる</td><td>○ 自動化された攻撃に有効</td></tr>
          <tr><td className="hl">見慣れない環境で追加確認</td><td>○ 普段と違う場所・端末からのログイン時に確認を挟む</td></tr>
        </tbody>
      </table>

      <p>
        実装は<Link href="/backend/ops-rate-limit">レート制限</Link>の仕組みをそのまま使います。<Term>アカウントごとの失敗回数と、送信元ごとの試行回数の両方</Term>を数えるのが基本です ― 前者は総当たり、後者は使い回しを試す攻撃に対応します。
      </p>

      <Heading num="06">多要素認証</Heading>
      <table>
        <thead>
          <tr><th>方式</th><th>強度</th><th>備考</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Term>パスキー</Term></td><td><strong>最強</strong></td><td>公開鍵暗号による。<strong>偽サイトに誘導する攻撃が原理的に効かない</strong></td></tr>
          <tr><td className="hl">認証アプリの時刻コード</td><td>強い</td><td>実装が容易。共有する種を暗号化して保存する</td></tr>
          <tr><td className="hl">SMS</td><td>弱い</td><td>番号の乗っ取りと傍受のリスク。<strong>無いよりは良い</strong></td></tr>
          <tr><td className="hl">メールのコード</td><td>弱い</td><td>メールが乗っ取られていれば無意味</td></tr>
        </tbody>
      </table>

      <p>
        導入するなら<Term>回復用のコードを必ずセットで用意します</Term>。端末を失くした人を救う手段が無ければ、サポート窓口での本人確認という<Term>最も脆弱な経路</Term>に頼ることになります。時刻コードの検証では、時計のずれを考慮して前後1つ分を許容し、<Term>使用済みコードの再利用を拒否</Term>します。
      </p>

      <Heading num="07">アカウントの一生</Heading>
      <table>
        <thead>
          <tr><th>操作</th><th>注意点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">メール確認</td><td>登録直後は未確認とし、確認まで機能を制限する。確認リンクも一度きり・期限付き</td></tr>
          <tr><td className="hl">アドレス変更</td><td><strong>新旧の両方に通知</strong>する。新しい方で確認が済むまで旧を有効に保つ</td></tr>
          <tr><td className="hl">パスワード変更</td><td><strong>現在のパスワードを要求</strong>する。放置された端末からの乗っ取りを防ぐ</td></tr>
          <tr><td className="hl">重要操作の再確認</td><td>多要素の解除、退会、送金の前に、もう一度確かめる</td></tr>
          <tr><td className="hl">退会</td><td>即時削除か、猶予期間付きか。<strong>削除要求への対応義務</strong>も考慮する</td></tr>
          <tr><td className="hl">履歴</td><td>ログイン・変更操作を記録し、<strong>本人が見られるようにする</strong></td></tr>
        </tbody>
      </table>

      <p>
        <Term>身に覚えのない操作を本人が発見できる</Term>ことは、防御が破られた後の被害を小さくします。通知と履歴は、地味ですが最も費用対効果の高い機能です。
      </p>

      <Analogy label="💡 たとえるなら">
        リセットは、家の鍵を失くしたときの合鍵作成です。玄関をどれだけ頑丈にしても、<Term>本人確認なしで合鍵を作れる業者</Term>が近所にいれば防犯は成立しません。だから発行には期限を切った引換券を本人の郵便受けにだけ届け、一度使ったら無効にし、発行したこと自体を本人に知らせる。そして合鍵を作ったら、それまで出回っていた鍵はすべて使えなくする ― これが「回復の経路が最も弱い」という問題への答えです。
      </Analogy>

      <Heading num="まとめ">回復導線こそ堅く作る</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>専用のアルゴリズムで保存</h4>
          <p>汎用ハッシュは速すぎる。方針は複雑さより長さと漏洩チェック。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>リセットは一度きり・期限付き</h4>
          <p>存在を漏らさず、完了後は全セッションを失効させる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>通知と履歴を残す</h4>
          <p>破られた後に本人が気づけることが、被害を最小化する最も安い手段。</p>
        </Card>
      </CardGrid>

      <p>
        認証はここまでです。次は、落とさずに動かし続けるための実装へ ― <Link href="/backend/ops">本番運用</Link>に進みます。
      </p>

      <DocsFooter href="/backend/auth-account" />
    </DocsPage>
  );
}
