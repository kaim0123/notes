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
  title: "トークンの運用",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド &middot; 認証</Eyebrow>
        <h1>トークンの運用 ― 失効できない鍵をどう扱うか</h1>
        <Lead>
          <Link href="/security/token">トークンの全体像</Link>で仕組みを、<Link href="/dev/backend/express/auth">認証・認可</Link>で基本的な実装を見ました。ここで扱うのは、実運用で必ずぶつかる一点 ― <strong>JWTは一度発行したら取り消せない</strong>という性質です。「ログアウトしたのに使える」「退職者のトークンが有効なまま」を防ぐために、アクセストークンとリフレッシュトークンをどう組み合わせるかを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">まず ― 本当にJWTが必要か</Heading>
      <p>結論から書きます。<strong>単一のWebアプリを作っているなら、素直なセッションで十分です。</strong>この節を最初に置くのは、JWTが「モダンな正解」として無条件に選ばれすぎているためです。</p>
      <table>
        <thead>
          <tr><th></th><th>セッション(サーバー側で状態を持つ)</th><th>JWT(自己完結型)</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">検証方法</td><td>ストアを引く(1回の読み取り)</td><td>署名を検証するだけ(通信不要)</td></tr>
          <tr><td className="hl">失効</td><td><strong>即座にできる</strong>(消せばよい)</td><td><strong>できない</strong>(期限が切れるまで有効)</td></tr>
          <tr><td className="hl">情報の更新</td><td>次のリクエストから反映される</td><td>再発行するまで古いまま</td></tr>
          <tr><td className="hl">スケール</td><td>共有ストア(Redis等)が要る</td><td>状態を持たなくてよい</td></tr>
          <tr><td className="hl">サイズ</td><td>ID1つ(数十バイト)</td><td>数百バイト〜。毎リクエスト送る</td></tr>
        </tbody>
      </table>
      <p>「スケールしないからセッションは駄目」という主張がありますが、Redisへの1回の読み取りは1ミリ秒未満です。<strong>その1ミリ秒を惜しんで、失効できないという致命的な制約を受け入れる価値があるか</strong>を先に考えてください。JWTが本当に効くのは、<strong>認証したサービスと検証するサービスが別</strong>のとき ― マイクロサービス間、外部の開発者向けAPI、複数ドメインをまたぐ場合です。</p>

      <Heading num="02">JWTの検証 ― 落とし穴は署名にある</Heading>
      <p>JWTは<code>ヘッダー.ペイロード.署名</code>の3部構成で、それぞれBase64URLで符号化されています。<strong>暗号化ではありません</strong> ― 誰でもデコードして中身を読めます。機密情報を入れてはいけません。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
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
          <tr><td className="hl"><code>alg: none</code>攻撃</td><td>ヘッダーの<code>alg</code>を<code>none</code>にされ、署名なしで通る。<strong>受け入れる方式を明示的に固定する</strong></td></tr>
          <tr><td className="hl">アルゴリズムの混同</td><td>RS256(公開鍵)用の公開鍵を、HS256(共通鍵)の鍵として使われる。同上</td></tr>
          <tr><td className="hl">デコードと検証の混同</td><td><code>jwt.decode()</code>は<strong>署名を検証しません</strong>。使うのは<code>verify()</code></td></tr>
          <tr><td className="hl"><code>iss</code> / <code>aud</code>未検証</td><td>他システム向けのトークンが通る</td></tr>
          <tr><td className="hl">有効期限なし</td><td><code>exp</code>が無いトークンは<strong>永久に有効</strong></td></tr>
        </tbody>
      </table>
      <p>HS256(共通鍵)は、検証する側も発行できてしまいます。検証側が複数ある構成では、<strong>RS256などの公開鍵方式</strong>を使い、秘密鍵を認証サーバーだけが持つようにします。</p>

      <Heading num="03">失効できない、という本質的な問題</Heading>
      <p>JWTの検証は署名の計算だけで完結します。これが速さの理由であり、同時に<strong>「無効にする手段が無い」</strong>理由でもあります。</p>
      <table>
        <thead>
          <tr><th>起きること</th><th>JWTでの状況</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ログアウトした</td><td>クライアントが捨てるだけ。<strong>盗まれていれば使い続けられる</strong></td></tr>
          <tr><td className="hl">権限を剥奪した</td><td>次の発行まで、古い権限のまま通る</td></tr>
          <tr><td className="hl">退職・アカウント停止</td><td>同上</td></tr>
          <tr><td className="hl">トークンが漏洩した</td><td><strong>期限切れを待つしかない</strong></td></tr>
        </tbody>
      </table>
      <p>「ブラックリストを持てばよい」という解決策がありますが、それは<strong>結局リクエストごとにストアを引くこと</strong>を意味します。JWTを選んだ理由が消えるわけです。だからこそ、次節の二段構えが標準解になりました。</p>

      <Heading num="04">アクセストークンとリフレッシュトークン</Heading>
      <p>解決の発想は単純です。<strong>頻繁に使う鍵の寿命を極端に短くし、失効の必要性そのものを小さくする</strong>。そして、その鍵を再発行するための長寿命な鍵は、サーバー側で状態を管理して失効できるようにします。</p>
      <table>
        <thead>
          <tr><th></th><th>アクセストークン</th><th>リフレッシュトークン</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">用途</td><td>APIの呼び出しに毎回付ける</td><td>アクセストークンの再発行だけ</td></tr>
          <tr><td className="hl">寿命</td><td><strong>5〜15分</strong></td><td>数日〜数十日</td></tr>
          <tr><td className="hl">形式</td><td>JWT(自己検証)</td><td><strong>ランダムな不透明文字列</strong>で十分</td></tr>
          <tr><td className="hl">保管</td><td>メモリ、またはHttpOnly Cookie</td><td><strong>HttpOnly Cookie</strong>(Pathを再発行APIに限定)</td></tr>
          <tr><td className="hl">サーバー側の状態</td><td>持たない</td><td><strong>持つ</strong>(だから失効できる)</td></tr>
        </tbody>
      </table>
      <p>アクセストークンの寿命が10分なら、漏洩しても被害の窓は10分です。権限変更も最大10分で反映されます。<strong>「即座」ではないが「いずれ確実に」効く</strong>という妥協点であり、多くのシステムで十分な水準です。</p>

      <Heading num="05">リフレッシュトークンのローテーションと再利用検知</Heading>
      <p>リフレッシュトークンは長寿命なので、これが盗まれると意味がありません。そこで<Term>ローテーション</Term>します ― 使うたびに新しいものを発行し、古いものを無効化します。</p>
      <p>この方式には副次的な、しかし極めて強力な効果があります。<strong>すでに使用済みのリフレッシュトークンが再び使われたら、それは漏洩の証拠です。</strong>正規の利用者は新しいものを持っているので、古いものを使うのは盗んだ側しかいません。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`async function refresh(presented: string) {
  const record = await tokenRepo.findByHash(sha256(presented));
  if (!record) throw new AuthError("invalid");

  if (record.usedAt) {
    // 使用済みのものが再提示された = 漏洩している
    // そのファミリー(同じログインから派生した全トークン)を一括で失効させる
    await tokenRepo.revokeFamily(record.familyId);
    logger.warn({ userId: record.userId }, "refresh token reuse detected");
    throw new AuthError("reuse_detected");
  }

  await tokenRepo.markUsed(record.id);
  return issuePair(record.userId, record.familyId);
}`}</code>
      </pre>
      <Aside label="保存はハッシュで">
        リフレッシュトークンは<strong>パスワードと同じ扱い</strong>です。DBには平文ではなくハッシュを保存します。DBが漏れても、そのままではログインに使えません。
      </Aside>

      <Heading num="06">どこに保存するか</Heading>
      <p><Link href="/dev/frontend/storage">ブラウザストレージ</Link>でも触れましたが、認証の観点から改めて整理します。</p>
      <table>
        <thead>
          <tr><th>保存先</th><th>XSSへの耐性</th><th>CSRFへの耐性</th><th>評価</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">localStorage</td><td><strong>×</strong> JSから読めるので丸ごと盗まれる</td><td>○ 自動送信されない</td><td>非推奨</td></tr>
          <tr><td className="hl">HttpOnly Cookie</td><td><strong>○</strong> JSから読めない</td><td>× 自動送信される</td><td><strong>推奨</strong>(SameSiteとCSRF対策を併用)</td></tr>
          <tr><td className="hl">メモリ変数</td><td>△ XSS中は盗めるが残らない</td><td>○</td><td>アクセストークン向け</td></tr>
        </tbody>
      </table>
      <p>「XSSを防げばlocalStorageでよい」という主張がありますが、XSSは<strong>1箇所の見落としで成立</strong>します。<code>HttpOnly</code>は、そのときの被害を「操作される」に留め、「鍵を持ち去られる」を防ぐ多層防御です。<strong>両方の攻撃に対策する</strong>のが正解であって、どちらか一方を選ぶ問題ではありません。</p>

      <Heading num="07">クレーム設計 ― 何を入れ、何を入れないか</Heading>
      <table>
        <thead>
          <tr><th>入れてよい</th><th>入れてはいけない</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">利用者ID(<code>sub</code>)</td><td>パスワード、秘密の値 ― <strong>デコードすれば誰でも読める</strong></td></tr>
          <tr><td className="hl">発行者・対象(<code>iss</code>/<code>aud</code>)</td><td>頻繁に変わる情報(表示名、プラン)</td></tr>
          <tr><td className="hl">有効期限(<code>exp</code>/<code>iat</code>)</td><td>大量のデータ(毎リクエスト送られる)</td></tr>
          <tr><td className="hl">粗い権限(ロール、スコープ)</td><td>細かい権限判定の結果(古くなる)</td></tr>
          <tr><td className="hl">トークンID(<code>jti</code>)</td><td>個人情報</td></tr>
        </tbody>
      </table>
      <p>権限をトークンに入れる場合、それは<strong>「発行時点のスナップショット」</strong>だと理解しておきます。管理者権限を剥奪しても、トークンが切れるまでは管理者のままです。重要な操作(退会、送金、権限変更)については、<strong>トークンを信用せず、その場でDBを引いて確認する</strong>という判断が要ります。</p>

      <Heading num="08">運用上の備え</Heading>
      <table>
        <thead>
          <tr><th>項目</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">鍵のローテーション</td><td><code>kid</code>(鍵ID)をヘッダーに入れ、複数の鍵を並行して有効にできるようにしておく</td></tr>
          <tr><td className="hl">全セッションの失効</td><td>利用者ごとに<code>tokenVersion</code>を持ち、パスワード変更時に増やす。古いトークンを一括で無効化できる</td></tr>
          <tr><td className="hl">時刻のずれ</td><td>サーバー間の時刻差で「まだ有効なはずのトークン」が弾かれる。数秒の許容を入れる</td></tr>
          <tr><td className="hl">ログ</td><td>トークンそのものを<strong>絶対にログに出さない</strong>(<Link href="/security/logging">ログ出力設計</Link>)</td></tr>
          <tr><td className="hl">端末一覧</td><td>リフレッシュトークンに端末情報を紐づけると、「ログイン中の端末」表示と個別ログアウトが実装できる</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        JWTは、入館証を<strong>その場で偽造チェックできる形</strong>にしたものです。受付に問い合わせずに真贋を判定できるので速い ― しかし裏を返せば、受付は「あの証を無効にした」と伝える術がありません。だから有効期限を10分にして、来訪者には<strong>受付で何度でも新しい証に交換できる引換券</strong>(リフレッシュトークン)を渡します。引換券の管理は受付が握っているので、いつでも止められる。そして、すでに交換済みの引換券を持ってきた人がいたら ― それは誰かが控えを盗んだということです。
      </Analogy>

      <Heading num="まとめ">短命なアクセス、管理されたリフレッシュ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>まずセッションを検討する</h4><p>単一アプリならセッションで十分。JWTは検証者が発行者と別のときに効く。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>失効できないことを前提に</h4><p>アクセストークンは5〜15分。リフレッシュはサーバー側で管理し、ローテーションする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>HttpOnly Cookieに置く</h4><p>localStorageはXSSで丸ごと盗まれる。CSRF対策と併用して両方塞ぐ。</p></Card>
      </CardGrid>
      <p>次は、認証そのものを外部に委ねる方式です。<Link href="/dev/backend/auth/oauth">外部IdP連携（OAuth 2.0 / OIDC）</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/security/token" tag="セキュリティ">トークンの全体像</RelatedLink>
            <RelatedLink href="/security/session-cookie" tag="セキュリティ">セッション・Cookieの全体像</RelatedLink>
            <RelatedLink href="/dev/backend/express/auth" tag="バックエンド">認証・認可</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
