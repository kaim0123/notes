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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "外部IdP連携（OAuth 2.0 / OIDC）",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド &middot; 認証</Eyebrow>
        <h1>外部IdP連携 ― 「Googleでログイン」の中身</h1>
        <Lead>
          <Link href="/security/identity">認証プロトコルの変遷</Link>で、OAuth 2.0とOpenID Connectがなぜ生まれたかを見ました。ここでは実装する側の視点で、<strong>認可コードフローが実際に何をやり取りしているか</strong>を追います。この仕組みは「複雑だが、その複雑さの一つひとつに攻撃の歴史がある」典型例です。なぜ<code>state</code>が要るのか、なぜPKCEが必須になったのかを理解すれば、手順を暗記する必要はなくなります。
        </Lead>
      </Hero>

      <Heading num="01">なぜ認証を外に出すのか</Heading>
      <table>
        <thead>
          <tr><th>利点</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">パスワードを預からない</td><td><strong>持たない情報は漏れない</strong>。最大の利点</td></tr>
          <tr><td className="hl">実装の削減</td><td>パスワードリセット、MFA、不正ログイン検知を委ねられる</td></tr>
          <tr><td className="hl">登録の障壁が下がる</td><td>フォーム入力なしで始められる</td></tr>
          <tr><td className="hl">企業導入</td><td>会社のアカウント(Entra ID、Okta)でそのまま使える。退職時に一括で止まる</td></tr>
        </tbody>
      </table>
      <p>一方の代償は、<strong>そのIdPに依存する</strong>ことです。障害時はログインできず、アカウントを凍結された利用者は締め出されます。実務では<strong>複数の手段(外部IdP + メールリンク等)を併用</strong>できるようにしておくのが安全です。</p>

      <Heading num="02">OAuth 2.0とOIDCは別物</Heading>
      <p>混同されがちですが、目的が違います。この区別は実装の正しさに直結します。</p>
      <table>
        <thead>
          <tr><th></th><th>OAuth 2.0</th><th>OpenID Connect</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">目的</td><td><strong>認可</strong> ― 「このアプリに私のカレンダーを読ませてよい」</td><td><strong>認証</strong> ― 「この人は誰か」</td></tr>
          <tr><td className="hl">得られるもの</td><td>アクセストークン(APIを叩く鍵)</td><td><strong>IDトークン</strong>(誰かを示す署名付きの証明)</td></tr>
          <tr><td className="hl">関係</td><td>―</td><td>OAuth 2.0の<strong>上に乗る薄い層</strong></td></tr>
        </tbody>
      </table>
      <Aside label="⚠️ アクセストークンで「ログイン」しない">
        古い解説には「アクセストークンでユーザー情報APIを叩き、返ってきたIDでログインさせる」という手順が載っています。<strong>これは脆弱です。</strong>アクセストークンは<Term>誰に発行されたか</Term>を示さないため、攻撃者が<strong>別のアプリ向けに正規発行されたトークン</strong>を持ち込むと、他人としてログインできてしまいます(混同攻撃)。ログインに使うのは、<code>aud</code>で宛先が固定された<strong>IDトークン</strong>です。
      </Aside>

      <Heading num="03">認可コードフロー + PKCE</Heading>
      <p>現在の推奨は、あらゆるクライアント種別でこの1つだけです。</p>
      <Diagram caption="ブラウザにはコードだけを通し、トークンはサーバー間で交換する">
        <svg viewBox="0 0 540 250" xmlns="http://www.w3.org/2000/svg">
          <text x={20} y={18} fill="#9a9a9a" fontSize="11">ブラウザ</text>
          <text x={225} y={18} fill="#9a9a9a" fontSize="11">自分のサーバー</text>
          <text x={445} y={18} fill="#9a9a9a" fontSize="11">IdP</text>
          <line x1={55} y1={26} x2={55} y2={240} stroke="#3a3a3a" />
          <line x1={265} y1={26} x2={265} y2={240} stroke="#3a3a3a" />
          <line x1={465} y1={26} x2={465} y2={240} stroke="#3a3a3a" />

          <path d="M55 50 l205 0" stroke="#5f5f5f" strokeWidth="1.2" />
          <path d="M260 50 l-8 -4 v8 z" fill="#5f5f5f" />
          <text x={70} y={44} fill="#9a9a9a" fontSize="10">① ログインする</text>

          <path d="M265 80 l-205 0" stroke="#5f5f5f" strokeWidth="1.2" />
          <path d="M60 80 l8 -4 v8 z" fill="#5f5f5f" />
          <text x={70} y={74} fill="#9a9a9a" fontSize="10">② IdPへリダイレクト(state・code_challenge付き)</text>

          <path d="M55 112 l405 0" stroke="#39ff6a" strokeWidth="1.2" />
          <path d="M460 112 l-8 -4 v8 z" fill="#39ff6a" />
          <text x={70} y={106} fill="#39ff6a" fontSize="10">③ IdPの画面で本人確認・同意</text>

          <path d="M465 145 l-405 0" stroke="#39ff6a" strokeWidth="1.2" />
          <path d="M60 145 l8 -4 v8 z" fill="#39ff6a" />
          <text x={70} y={139} fill="#39ff6a" fontSize="10">④ 認可コードを付けて自サイトへ戻す</text>

          <path d="M55 175 l205 0" stroke="#5f5f5f" strokeWidth="1.2" />
          <path d="M260 175 l-8 -4 v8 z" fill="#5f5f5f" />
          <text x={70} y={169} fill="#9a9a9a" fontSize="10">⑤ コードを渡す</text>

          <path d="M265 205 l195 0" stroke="#39ff6a" strokeWidth="2" />
          <path d="M460 205 l-8 -4 v8 z" fill="#39ff6a" />
          <text x={280} y={199} fill="#39ff6a" fontSize="10">⑥ コード+code_verifier+秘密鍵 → IDトークン</text>

          <text x={20} y={235} fill="#6a6a6a" fontSize="10">⑥だけがサーバー間通信。トークンがブラウザを通らないのが要点</text>
        </svg>
      </Diagram>
      <p>設計の核心は<strong>⑥</strong>です。ブラウザを経由するのは「認可コード」という<strong>一度きり・短命・それ単体では無価値</strong>な文字列だけで、実際のトークンはサーバー同士の直接通信で受け取ります。URLやブラウザ履歴、Refererにトークンが残らないための構造です。</p>

      <Heading num="04">なぜstateとPKCEが要るのか</Heading>
      <table>
        <thead>
          <tr><th>仕組み</th><th>防ぐ攻撃</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>state</code></td><td><strong>CSRF</strong>。攻撃者が自分の認可コードを被害者のブラウザで使わせ、<strong>攻撃者のアカウントにログインさせる</strong>(そのまま情報を入力させて盗む)</td></tr>
          <tr><td className="hl"><Term>PKCE</Term></td><td><strong>認可コードの横取り</strong>。何らかの経路でコードが漏れても、<code>code_verifier</code>を知らなければトークンに交換できない</td></tr>
          <tr><td className="hl"><code>nonce</code></td><td><strong>IDトークンの再生</strong>。以前取得したIDトークンの使い回しを防ぐ</td></tr>
          <tr><td className="hl">リダイレクトURIの完全一致</td><td><strong>オープンリダイレクト</strong>。攻撃者のサイトへコードを送らせる</td></tr>
        </tbody>
      </table>
      <p>PKCEはもともとモバイルアプリ向けでしたが、現在は<strong>サーバーサイドのアプリを含むすべてのクライアントで推奨</strong>されています。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// ② 認可リクエストを組み立てる
const verifier = base64url(crypto.randomBytes(32));   // 手元に保管する秘密
const challenge = base64url(sha256(verifier));        // IdPに預ける指紋
const state = base64url(crypto.randomBytes(16));
const nonce = base64url(crypto.randomBytes(16));

// state / nonce / verifier はセッション(サーバー側)に紐づけて保存する
await session.set({ state, nonce, verifier });

const url = new URL("https://idp.example.com/authorize");
url.searchParams.set("client_id", CLIENT_ID);
url.searchParams.set("redirect_uri", REDIRECT_URI);   // 事前登録と完全一致
url.searchParams.set("response_type", "code");
url.searchParams.set("scope", "openid email profile");
url.searchParams.set("state", state);
url.searchParams.set("nonce", nonce);
url.searchParams.set("code_challenge", challenge);
url.searchParams.set("code_challenge_method", "S256");
res.redirect(url.toString());`}</code>
      </pre>
      <p>戻ってきたときは、<strong>まず<code>state</code>を照合し、一致しなければ即座に拒否</strong>します。この検証を省くと、上の表にあるログインCSRFがそのまま成立します。</p>

      <Heading num="05">IDトークンの検証</Heading>
      <p>ライブラリに任せるべき部分ですが、何が検証されているかは知っておく必要があります。</p>
      <table>
        <thead>
          <tr><th>項目</th><th>確認内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">署名</td><td>IdPのJWKSエンドポイントから公開鍵を取得し、<code>kid</code>で該当の鍵を選んで検証する</td></tr>
          <tr><td className="hl"><code>iss</code></td><td>期待するIdPか</td></tr>
          <tr><td className="hl"><code>aud</code></td><td><strong>自分の<code>client_id</code>と一致するか</strong>(これが混同攻撃を防ぐ)</td></tr>
          <tr><td className="hl"><code>exp</code> / <code>iat</code></td><td>有効期限内か</td></tr>
          <tr><td className="hl"><code>nonce</code></td><td>自分が送った値と一致するか</td></tr>
          <tr><td className="hl"><code>sub</code></td><td>利用者の識別子。<strong>これを内部IDと紐づける</strong></td></tr>
        </tbody>
      </table>

      <Heading num="06">アカウントの紐付け ― 最も事故が起きる場所</Heading>
      <p>プロトコルが正しくても、ここを誤ると乗っ取りが成立します。<strong>「メールアドレスが同じだから同一人物」と判断してはいけません。</strong></p>
      <p>攻撃の筋道はこうです。攻撃者があるIdPで<code>victim@example.com</code>を名乗るアカウントを作り、それでログインする。アプリが「同じメールだから既存アカウントに紐付けよう」と判断すれば、被害者のアカウントに入れてしまいます。</p>
      <table>
        <thead>
          <tr><th>原則</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">識別子は<code>sub</code></td><td>メールアドレスは変わる。<strong>IdPごとの<code>sub</code>と自前のIDを対応表で持つ</strong></td></tr>
          <tr><td className="hl"><code>email_verified</code>を確認</td><td>偽が返るIdPもある。未確認のメールで自動紐付けしない</td></tr>
          <tr><td className="hl">紐付けは本人の操作で</td><td>既存アカウントへの追加は、<strong>ログイン済みの状態から明示的に行わせる</strong></td></tr>
          <tr><td className="hl">複数IdPを想定する</td><td>1利用者に複数の外部アカウントが紐づく設計にしておく(後から直すのは大変)</td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`-- 紐付けは別テーブルで持つ
CREATE TABLE user_identities (
  provider    TEXT NOT NULL,          -- 'google' | 'github' | ...
  provider_id TEXT NOT NULL,          -- IdP の sub
  user_id     UUID NOT NULL REFERENCES users(id),
  PRIMARY KEY (provider, provider_id)
);`}</code>
      </pre>

      <Heading num="07">実装の選択肢</Heading>
      <table>
        <thead>
          <tr><th>方法</th><th>評価</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">認証ライブラリ(Auth.js など)</td><td><strong>第一候補</strong>。フローの細部と主要IdPの差異を吸収してくれる</td></tr>
          <tr><td className="hl">IDaaS(Auth0、Cognito、Firebase Auth)</td><td>MFAや不正検知まで委譲できる。費用と移行の難しさが代償</td></tr>
          <tr><td className="hl">標準準拠のOIDCクライアント</td><td>細かく制御したい場合。<code>openid-client</code>のような検証済み実装を使う</td></tr>
          <tr><td className="hl">完全な自前実装</td><td><strong>避ける</strong>。上の表の検証を1つ落とすだけで破られる</td></tr>
        </tbody>
      </table>
      <p>認証は、自作の価値が最も低い領域の1つです。<Link href="/design/principles/modern">車輪の再発明</Link>を避けるべき典型例と考えてください。</p>

      <Heading num="08">ログイン後 ― 自前のセッションに切り替える</Heading>
      <p>認証が終わったら、<strong>IdPのトークンをそのままAPIの認証に使い続けない</strong>のが基本です。自分のシステムのセッション(または<Link href="/dev/backend/auth/token">自前のトークン</Link>)を発行し、以後はそちらで動かします。</p>
      <table>
        <thead>
          <tr><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">自分のシステムの都合(権限、有効期限、失効)を自分で制御できる</td></tr>
          <tr><td className="hl">複数のIdPに対応しても、認証後の扱いが1本化される</td></tr>
          <tr><td className="hl">IdPのアクセストークンは、<strong>そのIdPのAPIを叩くためだけ</strong>に使う(必要な場合のみ暗号化して保存)</td></tr>
        </tbody>
      </table>
      <p>ログアウトの扱いにも注意が必要です。自分のセッションを消しても、<strong>IdP側のログイン状態は残ります</strong> ― 再度「Googleでログイン」を押すと、パスワード入力なしで即座に戻ってきます。共用端末では問題になるため、必要ならIdPのログアウト用エンドポイントへ誘導します。</p>

      <Analogy label="💡 たとえるなら">
        認可コードフローは、ホテルのチェックインで<strong>パスポートそのものを預けず、フロント経由で本人確認を取る</strong>やり方に似ています。あなたは受付で「この番号で照会してください」という控え(認可コード)だけを渡し、ホテルは発行機関に<strong>直接電話して</strong>本人確認の結果を受け取ります。控えが第三者の手に渡っても、ホテルが持つ照会用の合言葉(<code>code_verifier</code>)が無ければ何も引き出せません。そして「同姓同名だから同じ人だろう」と部屋の鍵を渡す受付は、いずれ必ず事故を起こします。
      </Analogy>

      <Heading num="まとめ">標準に従い、紐付けを疑う</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ログインにはIDトークン</h4><p>OAuthは認可、OIDCが認証。audで宛先が固定された証明だけをログインに使う。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>認可コード+PKCEを使う</h4><p>state・nonce・リダイレクトURI完全一致まで含めて1セット。1つ欠けると破られる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>メールで同一人物と判定しない</h4><p>識別子はsub。既存アカウントへの紐付けは、ログイン済みの状態から本人に行わせる。</p></Card>
      </CardGrid>
      <p>次は、自前でパスワードを扱う場合に必要になる実装です。<Link href="/dev/backend/auth/account">パスワードとアカウント回復</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/security/identity" tag="セキュリティ">認証プロトコルの変遷</RelatedLink>
            <RelatedLink href="/security/authz" tag="セキュリティ">認可</RelatedLink>
            <RelatedLink href="/dev/backend/auth/token" tag="バックエンド">トークンの運用</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
