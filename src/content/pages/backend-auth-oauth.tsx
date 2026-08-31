import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "外部IdP連携(OAuth 2.0 / OIDC)" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>外部IdP連携 ― 「◯◯でログイン」の中身</h1>
        <Lead>
          実装する側の視点で、<Term>認可コードフローが実際に何をやり取りしているか</Term>を追います。この仕組みは「複雑だが、その複雑さの一つひとつに攻撃の歴史がある」典型例です。<Term>なぜ照合用の値が要るのか、なぜPKCEが必須になったのか</Term>を理解すれば、手順を暗記する必要はなくなります。
        </Lead>
      </Hero>

      <Heading num="01">なぜ認証を外に出すのか</Heading>
      <table>
        <thead>
          <tr><th>利点</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">パスワードを預からない</td><td><strong>持たない情報は漏れない</strong>。最大の利点</td></tr>
          <tr><td className="hl">実装が減る</td><td>再設定、多要素、不正ログイン検知を委ねられる</td></tr>
          <tr><td className="hl">登録の障壁が下がる</td><td>フォーム入力なしで始められる</td></tr>
          <tr><td className="hl">組織での導入</td><td>会社のアカウントでそのまま使え、退職時に一括で止まる</td></tr>
        </tbody>
      </table>

      <p>
        代償は<Term>そのIdPに依存する</Term>ことです。障害時はログインできず、アカウントを凍結された利用者は締め出されます。実務では<Term>複数の手段を併用できるようにしておく</Term>のが安全です。
      </p>

      <Heading num="02">OAuth 2.0とOIDCは別物</Heading>
      <p>
        混同されがちですが目的が違い、この区別は実装の正しさに直結します。
      </p>

      <table>
        <thead>
          <tr><th></th><th>OAuth 2.0</th><th>OpenID Connect</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">目的</td><td><strong>認可</strong> ― 「このアプリに私の予定を読ませてよい」</td><td><strong>認証</strong> ― 「この人は誰か」</td></tr>
          <tr><td className="hl">得られるもの</td><td>アクセストークン(APIを叩く鍵)</td><td><strong>IDトークン</strong>(誰かを示す署名付きの証明)</td></tr>
          <tr><td className="hl">関係</td><td>―</td><td>OAuth 2.0の<strong>上に乗る薄い層</strong></td></tr>
        </tbody>
      </table>

      <Aside label="アクセストークンでログインしない">
        古い解説には「アクセストークンで利用者情報を取り、返ってきたIDでログインさせる」という手順が載っています。<Term>これは脆弱です</Term>。アクセストークンは<Term>誰に発行されたか</Term>を示さないため、攻撃者が<Term>別のアプリ向けに正規発行されたトークン</Term>を持ち込むと、他人としてログインできてしまいます。ログインに使うのは、宛先が固定された<Term>IDトークン</Term>です。
      </Aside>

      <Heading num="03">認可コードフローとPKCE</Heading>
      <p>
        現在の推奨は、あらゆる種類のクライアントでこの1つだけです。
      </p>

      <DiagramFrame
        slug="backend-auth-code-flow"
        aspect="640 / 360"
        caption="認可コードフローのやり取りを示した順序図。ブラウザ、自分のサーバー、外部のIdPの3者の間で、ログインの要求、IdPへの誘導、IdPの画面での本人確認と同意、認可コードを付けた自サイトへの復帰、コードの受け渡し、そして最後にサーバーがIdPへ直接コードと手元の秘密を送ってIDトークンを受け取る、という順に進む。この最後の1往復だけがブラウザを通らないサーバー同士の通信であり、そこが設計の核心。ブラウザを通るのは一度きりで短命な、それ単体では何の役にも立たないコードだけなので、URLにも履歴にもトークンが残らない。"
      />

      <p>
        設計の核心は最後の1往復です。ブラウザを経由するのは<Term>一度きり・短命・それ単体では無価値</Term>な文字列だけで、実際のトークンはサーバー同士の直接通信で受け取ります。
      </p>

      <Heading num="04">複雑さの一つひとつに理由がある</Heading>
      <table>
        <thead>
          <tr><th>仕組み</th><th>防ぐ攻撃</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">照合用の値(<code>state</code>)</td><td>攻撃者が自分のコードを被害者のブラウザで使わせ、<strong>攻撃者のアカウントにログインさせる</strong></td></tr>
          <tr><td className="hl"><Term>PKCE</Term></td><td>コードが漏れても、手元の秘密を知らなければトークンに交換できない</td></tr>
          <tr><td className="hl">使い捨ての値(<code>nonce</code>)</td><td>以前取得したIDトークンの使い回し</td></tr>
          <tr><td className="hl">戻り先URLの完全一致</td><td>攻撃者のサイトへコードを送らせる</td></tr>
        </tbody>
      </table>

      <p>
        1つ目は分かりにくいので補足します。攻撃者のアカウントにログインさせて何が嬉しいのか ― <Term>そのまま気づかず入力させた情報が、攻撃者の手元に残る</Term>からです。
      </p>

      <pre>
        <code>{`// ② 認可リクエストを組み立てる
const verifier  = base64url(crypto.randomBytes(32));   // 手元に保管する秘密
const challenge = base64url(sha256(verifier));         // IdPに預ける指紋
const state = base64url(crypto.randomBytes(16));
const nonce = base64url(crypto.randomBytes(16));

// state / nonce / verifier はサーバー側のセッションに紐づけて保存する
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

      <p>
        戻ってきたときは<Term>まず照合用の値を確かめ、一致しなければ即座に拒否</Term>します。この検証を省くと、上の表の1つ目がそのまま成立します。
      </p>

      <Heading num="05">IDトークンの検証</Heading>
      <p>
        ライブラリに任せるべき部分ですが、何が検証されているかは知っておく必要があります。
      </p>

      <table>
        <thead>
          <tr><th>項目</th><th>確認内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">署名</td><td>IdPが公開している鍵を取得し、識別子で該当の鍵を選んで検証する</td></tr>
          <tr><td className="hl">発行者</td><td>期待するIdPか</td></tr>
          <tr><td className="hl">対象</td><td><strong>自分の識別子と一致するか</strong>(これが前述のすり替えを防ぐ)</td></tr>
          <tr><td className="hl">有効期限</td><td>期限内か</td></tr>
          <tr><td className="hl">使い捨ての値</td><td>自分が送った値と一致するか</td></tr>
          <tr><td className="hl">利用者の識別子</td><td><strong>これを内部のIDと紐づける</strong></td></tr>
        </tbody>
      </table>

      <Heading num="06">紐付けが最も事故る</Heading>
      <p>
        プロトコルが正しくても、ここを誤ると乗っ取りが成立します。<Term>メールアドレスが同じだから同一人物、と判断してはいけません</Term>。
      </p>
      <p>
        筋道はこうです。攻撃者があるIdPで被害者のアドレスを名乗るアカウントを作り、それでログインする。アプリが「同じメールだから既存アカウントに紐付けよう」と判断すれば、被害者のアカウントに入れてしまいます。
      </p>

      <table>
        <thead>
          <tr><th>原則</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">識別子で紐づける</td><td>メールアドレスは変わる。<strong>IdPごとの識別子と自前のIDを対応表で持つ</strong></td></tr>
          <tr><td className="hl">確認済みかを見る</td><td>未確認のメールで自動的に紐付けない</td></tr>
          <tr><td className="hl">紐付けは本人の操作で</td><td>既存アカウントへの追加は、<strong>ログイン済みの状態から明示的に行わせる</strong></td></tr>
          <tr><td className="hl">複数を想定する</td><td>1利用者に複数の外部アカウントが紐づく設計にしておく</td></tr>
        </tbody>
      </table>

      <pre>
        <code>{`-- 紐付けは別テーブルで持つ
CREATE TABLE user_identities (
  provider    TEXT NOT NULL,          -- 'google' | 'github' | ...
  provider_id TEXT NOT NULL,          -- IdP 側の識別子
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
          <tr><td className="hl">認証ライブラリ</td><td><strong>第一候補</strong>。細部と、IdPごとの差異を吸収してくれる</td></tr>
          <tr><td className="hl">認証サービス</td><td>多要素や不正検知まで委譲できる。費用と、乗り換えの難しさが代償</td></tr>
          <tr><td className="hl">標準準拠のクライアント実装</td><td>細かく制御したい場合。検証済みの実装を使う</td></tr>
          <tr><td className="hl">完全な自前実装</td><td><strong>避ける</strong>。上の検証を1つ落とすだけで破られる</td></tr>
        </tbody>
      </table>

      <p>
        認証は<Term>自作の価値が最も低い領域の1つ</Term>です。<Link href="/design/principles-modern">車輪の再発明</Link>を避けるべき典型例と考えてください。
      </p>

      <Heading num="08">ログイン後は自前のセッションに切り替える</Heading>
      <p>
        認証が終わったら、<Term>IdPのトークンをそのままAPIの認証に使い続けない</Term>のが基本です。自分のシステムのセッション、または<Link href="/backend/auth-token">自前のトークン</Link>を発行し、以後はそちらで動かします。
      </p>

      <table>
        <thead>
          <tr><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">権限・有効期限・失効を、自分で制御できる</td></tr>
          <tr><td className="hl">複数のIdPに対応しても、認証後の扱いが1本化される</td></tr>
          <tr><td className="hl">IdPのアクセストークンは、<strong>そのIdPのAPIを叩くためだけ</strong>に使う</td></tr>
        </tbody>
      </table>

      <p>
        ログアウトにも注意が要ります。自分のセッションを消しても<Term>IdP側のログイン状態は残ります</Term> ― もう一度ボタンを押すと、パスワード入力なしで即座に戻ってきます。共用端末では問題になるため、必要ならIdPのログアウト用の入口へ誘導します。
      </p>

      <Analogy label="💡 たとえるなら">
        ホテルのチェックインで<Term>身分証そのものを預けず、フロント経由で本人確認を取る</Term>やり方に似ています。あなたは受付に「この番号で照会してください」という控えだけを渡し、ホテルは発行機関に<Term>直接電話して</Term>結果を受け取ります。控えが第三者の手に渡っても、ホテルが持つ照会用の合言葉が無ければ何も引き出せません。そして「同姓同名だから同じ人だろう」と部屋の鍵を渡す受付は、いずれ必ず事故を起こします。
      </Analogy>

      <Heading num="まとめ">標準に従い、紐付けを疑う</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ログインにはIDトークン</h4>
          <p>OAuthは認可、OIDCが認証。宛先が固定された証明だけをログインに使う。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>認可コードとPKCEを使う</h4>
          <p>照合用の値・使い捨ての値・戻り先の完全一致まで含めて1セット。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>メールで同一人物と判定しない</h4>
          <p>識別子で紐づける。既存アカウントへの追加は、本人の操作で。</p>
        </Card>
      </CardGrid>

      <p>
        次は、自前でパスワードを扱う場合に必要になる実装です。<Link href="/backend/auth-account">パスワードとアカウント回復</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/auth-oauth" />
    </DocsPage>
  );
}
