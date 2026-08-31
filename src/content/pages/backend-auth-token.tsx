import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "トークンの運用" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>トークンの運用 ― 取り消せない鍵をどう扱うか</h1>
        <Lead>
          ここで扱うのは、実運用で必ずぶつかる一点です ― <Term>JWTは一度発行したら取り消せない</Term>。「ログアウトしたのに使える」「退職者のトークンが有効なまま」を防ぐために、寿命の違う2種類の鍵をどう組み合わせるかを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">まず、本当にJWTが必要か</Heading>
      <p>
        結論から書きます。<Term>単一のWebアプリを作っているなら、素直なセッションで十分です</Term>。この節を最初に置くのは、JWTが「今どきの正解」として無条件に選ばれすぎているためです。
      </p>

      <table>
        <thead>
          <tr><th></th><th>セッション(サーバー側で状態を持つ)</th><th>JWT(自己完結型)</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">検証方法</td><td>保管先を1回引く</td><td>署名を検証するだけ(通信不要)</td></tr>
          <tr><td className="hl">失効</td><td><strong>即座にできる</strong>(消せばよい)</td><td><strong>できない</strong>(期限が切れるまで有効)</td></tr>
          <tr><td className="hl">情報の更新</td><td>次のリクエストから反映される</td><td>再発行するまで古いまま</td></tr>
          <tr><td className="hl">台数を増やすとき</td><td>共有の保管先が要る</td><td>状態を持たなくてよい</td></tr>
          <tr><td className="hl">サイズ</td><td>ID1つ(数十バイト)</td><td>数百バイト〜。毎回送る</td></tr>
        </tbody>
      </table>

      <p>
        「スケールしないからセッションは駄目」という主張がありますが、共有の保管先への1回の読み取りは1ミリ秒未満です。<Term>その1ミリ秒を惜しんで、失効できないという制約を受け入れる価値があるか</Term>を先に考えてください。JWTが本当に効くのは、<Term>認証したサービスと検証するサービスが別</Term>のとき ― サービス間の通信、外部の開発者向けAPI、複数ドメインをまたぐ場合です。
      </p>

      <Heading num="02">検証の落とし穴は署名にある</Heading>
      <p>
        JWTは3つの部分をつないだ文字列で、それぞれ符号化されているだけです。<Term>暗号化ではありません</Term> ― 誰でも中身を読めます。機密情報を入れてはいけません。
      </p>

      <pre>
        <code>{`import jwt from "jsonwebtoken";

const payload = jwt.verify(token, PUBLIC_KEY, {
  algorithms: ["RS256"],      // ← 必須。受け入れる方式を固定する
  issuer: "https://auth.example.com",
  audience: "https://api.example.com",
  clockTolerance: 5,
});`}</code>
      </pre>

      <table>
        <thead>
          <tr><th>落とし穴</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">署名なしを受け入れる</td><td>方式の欄を「なし」にされて通る。<strong>受け入れる方式を明示的に固定する</strong></td></tr>
          <tr><td className="hl">方式のすり替え</td><td>公開鍵方式用の鍵を、共通鍵方式の鍵として使われる。同上</td></tr>
          <tr><td className="hl">デコードと検証の混同</td><td>デコードする関数は<strong>署名を検証しません</strong></td></tr>
          <tr><td className="hl">発行者・対象を見ない</td><td>他システム向けのトークンが通る</td></tr>
          <tr><td className="hl">有効期限なし</td><td>期限の無いトークンは<strong>永久に有効</strong></td></tr>
        </tbody>
      </table>

      <p>
        共通鍵方式は、検証する側も発行できてしまいます。検証側が複数ある構成では<Term>公開鍵方式</Term>を使い、秘密鍵を認証サーバーだけが持つようにします。
      </p>

      <Heading num="03">失効できない、という本質</Heading>
      <p>
        JWTの検証は署名の計算だけで完結します。これが速さの理由であり、同時に<Term>無効にする手段が無い</Term>理由でもあります。
      </p>

      <table>
        <thead>
          <tr><th>起きること</th><th>JWTでの状況</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ログアウトした</td><td>呼ぶ側が捨てるだけ。<strong>盗まれていれば使い続けられる</strong></td></tr>
          <tr><td className="hl">権限を外した</td><td>次の発行まで、古い権限のまま通る</td></tr>
          <tr><td className="hl">退職・利用停止</td><td>同上</td></tr>
          <tr><td className="hl">トークンが漏れた</td><td><strong>期限切れを待つしかない</strong></td></tr>
        </tbody>
      </table>

      <p>
        「無効リストを持てばよい」という解決策がありますが、それは<Term>結局リクエストごとに保管先を引くこと</Term>を意味します。JWTを選んだ理由が消えるわけです。だからこそ、次節の二段構えが標準解になりました。
      </p>

      <Heading num="04">寿命の違う2つの鍵</Heading>
      <p>
        発想は単純です。<Term>頻繁に使う鍵の寿命を極端に短くし、失効の必要性そのものを小さくする</Term>。そして再発行のための長寿命な鍵だけを、サーバー側で管理して失効できるようにします。
      </p>

      <table>
        <thead>
          <tr><th></th><th>アクセストークン</th><th>リフレッシュトークン</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">用途</td><td>APIの呼び出しに毎回付ける</td><td>アクセストークンの再発行だけ</td></tr>
          <tr><td className="hl">寿命</td><td><strong>5〜15分</strong></td><td>数日〜数十日</td></tr>
          <tr><td className="hl">形式</td><td>JWT(自己検証)</td><td><strong>意味を持たないランダム文字列</strong>で十分</td></tr>
          <tr><td className="hl">保管</td><td>メモリ、またはJSから読めないCookie</td><td><strong>JSから読めないCookie</strong>。送る先を再発行APIに限定する</td></tr>
          <tr><td className="hl">サーバー側の状態</td><td>持たない</td><td><strong>持つ</strong>(だから失効できる)</td></tr>
        </tbody>
      </table>

      <p>
        アクセストークンの寿命が10分なら、漏れても被害の窓は10分です。権限変更も最大10分で反映されます。<Term>即座ではないが、いずれ確実に効く</Term>という妥協点であり、多くのシステムで十分な水準です。
      </p>

      <Heading num="05">使い捨てにすると、盗まれたことが分かる</Heading>
      <p>
        リフレッシュトークンは長寿命なので、これが盗まれると意味がありません。そこで<Term>使うたびに新しいものを発行し、古いものを無効化します</Term>。この方式には、副次的ながら極めて強力な効果があります。
      </p>

      <DiagramFrame
        slug="backend-auth-rotation"
        aspect="640 / 340"
        caption="リフレッシュトークンを使うたびに新しいものへ入れ替えることで、盗まれたことを検知できる仕組みを示した図。上段の正規の利用者は、使うたびに新しいものへ入れ替わっていき、使い終わったものは使用済みとして記録される。下段では、途中の1つを盗んだ側がそれを提示するが、それはすでに使用済みとして記録されている。使用済みのものが再び提示されたということは、正規の利用者は次のものを持っているはずなので、提示しているのは盗んだ側だと分かる。サーバーはその時点で、同じログインから派生したすべてをまとめて失効させる。盗まれること自体は防げないが、盗まれたと分かることに価値がある、という点が要点。"
      />

      <pre>
        <code>{`async function refresh(presented: string) {
  const record = await tokenRepo.findByHash(sha256(presented));
  if (!record) throw new AuthError("invalid");

  if (record.usedAt) {
    // 使用済みのものが再提示された = 漏れている
    // 同じログインから派生した全部を、まとめて失効させる
    await tokenRepo.revokeFamily(record.familyId);
    logger.warn({ userId: record.userId }, "refresh token reuse detected");
    throw new AuthError("reuse_detected");
  }

  await tokenRepo.markUsed(record.id);
  return issuePair(record.userId, record.familyId);
}`}</code>
      </pre>

      <Aside label="保存はハッシュで">
        リフレッシュトークンは<Term>パスワードと同じ扱い</Term>です。保管先には平文ではなくハッシュを置きます。保管先が漏れても、そのままではログインに使えません。
      </Aside>

      <Heading num="06">どこに置くか</Heading>
      <p>
        <Link href="/frontend/storage">ブラウザストレージ</Link>でも触れましたが、認証の観点から改めて整理します。
      </p>

      <table>
        <thead>
          <tr><th>置き場所</th><th>スクリプト実行への耐性</th><th>意図しない送信への耐性</th><th>評価</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Web Storage</td><td><strong>×</strong> JSから読めるので丸ごと盗まれる</td><td>○ 自動送信されない</td><td>非推奨</td></tr>
          <tr><td className="hl">JSから読めないCookie</td><td><strong>○</strong> JSから読めない</td><td>× 自動送信される</td><td><strong>推奨</strong>(送信範囲の制限と併用)</td></tr>
          <tr><td className="hl">メモリ変数</td><td>△ 実行中は盗めるが残らない</td><td>○</td><td>アクセストークン向け</td></tr>
        </tbody>
      </table>

      <p>
        「スクリプト実行を防げばWeb Storageでよい」という主張がありますが、その手の攻撃は<Term>1箇所の見落としで成立</Term>します。JSから読めない置き場は、そのときの被害を「操作される」に留め、「鍵を持ち去られる」を防ぎます。<Term>両方に対策するのが正解</Term>であって、どちらか一方を選ぶ問題ではありません。
      </p>

      <Heading num="07">中身に何を入れるか</Heading>
      <table>
        <thead>
          <tr><th>入れてよい</th><th>入れてはいけない</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">利用者の識別子</td><td>秘密の値 ― <strong>誰でも読める</strong></td></tr>
          <tr><td className="hl">発行者と対象</td><td>頻繁に変わる情報(表示名、契約プラン)</td></tr>
          <tr><td className="hl">有効期限と発行時刻</td><td>大量のデータ(毎回送られる)</td></tr>
          <tr><td className="hl">粗い権限(役割、範囲)</td><td>細かい判定の結果(すぐ古くなる)</td></tr>
          <tr><td className="hl">トークンの識別子</td><td>個人情報</td></tr>
        </tbody>
      </table>

      <p>
        権限を入れる場合、それは<Term>発行時点の写し</Term>だと理解しておきます。管理者権限を外しても、期限が切れるまでは管理者のままです。だから重要な操作(退会、送金、権限変更)については、<Term>トークンを信用せず、その場で引き直して確認する</Term>という判断が要ります。
      </p>

      <Heading num="08">運用上の備え</Heading>
      <table>
        <thead>
          <tr><th>項目</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">鍵の入れ替え</td><td>鍵の識別子をヘッダーに入れ、複数の鍵を並行して有効にできるようにしておく</td></tr>
          <tr><td className="hl">全セッションの失効</td><td>利用者ごとに版数を持ち、パスワード変更時に増やす。一括で無効化できる</td></tr>
          <tr><td className="hl">時刻のずれ</td><td>サーバー間の差で有効なはずのものが弾かれる。数秒の許容を入れる</td></tr>
          <tr><td className="hl">ログ</td><td>トークンそのものを<strong>絶対にログに出さない</strong></td></tr>
          <tr><td className="hl">端末一覧</td><td>リフレッシュトークンに端末情報を紐づけると、個別ログアウトが実装できる</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        JWTは、入館証を<Term>その場で偽造チェックできる形</Term>にしたものです。受付に問い合わせずに真贋を判定できるので速い ― しかし裏を返せば、受付は「あの証を無効にした」と伝える術がありません。だから期限を10分にして、来訪者には<Term>受付で何度でも新しい証に交換できる引換券</Term>を渡します。引換券の管理は受付が握っているので、いつでも止められる。そして、すでに交換済みの引換券を持ってきた人がいたら ― それは誰かが控えを盗んだということです。
      </Analogy>

      <Heading num="まとめ">短命なアクセス、管理されたリフレッシュ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>まずセッションを検討する</h4>
          <p>単一アプリなら十分。JWTは検証者が発行者と別のときに効く。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>失効できない前提で組む</h4>
          <p>アクセスは5〜15分。再発行の鍵はサーバー側で管理し、使い捨てにする。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>JSから読めない場所に置く</h4>
          <p>Web Storageは丸ごと盗まれる。自動送信への対策と併用して両方塞ぐ。</p>
        </Card>
      </CardGrid>

      <p>
        次は、本人確認そのものを外部に委ねる方式です。<Link href="/backend/auth-oauth">外部IdP連携(OAuth 2.0 / OIDC)</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/auth-token" />
    </DocsPage>
  );
}
