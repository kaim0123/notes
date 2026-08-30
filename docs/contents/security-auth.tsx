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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "認証",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>認証 ― 「あなたは誰か」を確認する</h1>
        <Lead>
          <Term>認証(Authentication)</Term>は「あなたは誰ですか」を確認する仕組みです。次のページで扱う<Term>認可(Authorization)</Term>は「あなたは何をしてよいですか」を判定する仕組みで、この2つはよく混同されますが、まったく別の役割です。このページでは、認証の入口である「ログイン」を安全に作るための要点を見ていきます。
        </Lead>
      </Hero>

      <p>前のページ「<Link href="/security/session">セッションとCookie管理</Link>」で見た「ログイン後の状態をどう維持するか」に対して、このページのテーマは一歩手前 ―「そもそもログインという行為自体をどう安全に成立させるか」です。</p>

      <Heading num="01">ログイン処理そのものに穴を残さない</Heading>
      <p>ログインフォームは、ユーザー名やパスワードといった入力をそのままデータベースへの問い合わせに使うことが多く、これまで見てきた脆弱性が集中しやすい場所です。ログインのSQL文が<Link href="/security/sqli">SQLインジェクション</Link>に対して脆弱であれば、パスワードを知らなくてもログインを突破されかねません。また、ログイン成功時にセッションIDを再発行しないと<Link href="/security/session">セッション固定化攻撃</Link>の入口になります。認証を守るというのは、突き詰めればこれまでのページで見てきた対策を、ログインという最も重要な処理に対して漏れなく適用することでもあります。</p>

      <Heading num="02">パスワードの強度を促す・弱いものは拒否する</Heading>
      <p>あまりに単純なパスワード(<code>123456</code>や<code>password</code>など)は、攻撃者が辞書やリストを使って総当たりで試す<Term>辞書攻撃</Term>・<Term>ブルートフォース攻撃</Term>にすぐ突破されます。最低文字数の設定や、既知の漏洩パスワードリストとの照合などで、あまりに弱いパスワードは登録時点で拒否します。</p>

      <Heading num="03">試行回数を制限し、二段階認証で補強する</Heading>
      <p>パスワードそのものを強くしても、無制限にログインを試行できてしまえば、時間をかければいずれ突破されます。一定回数失敗したらアカウントを一時的にロックする、間隔を空けさせる、異常なログイン試行を監視するといった対策が必要です。可能であれば、パスワードに加えてスマートフォンのアプリやSMSなど別の手段で確認する<Term>二段階認証(2FA)</Term>を導入すると、パスワードだけが漏れても突破されにくくなります。</p>

      <Heading num="04">パスワードは「ハッシュ化」して保存する</Heading>
      <p>最も重要な原則は、パスワードを平文のまま保存しないことです。データベースが漏洩した瞬間に、全ユーザーのパスワードがそのまま流出してしまうためです。</p>
      <p>ここで区別しておきたいのが<Term>暗号化</Term>と<Term>ハッシュ関数</Term>の違いです。<Term>暗号化</Term>は「鍵」を使って変換前のデータに戻すことができる<Term>双方向</Term>の仕組みです(<Link href="/network/applications/web">Webの仕組み</Link>ページで見たHTTPSの通信路の暗号化がその代表例です)。一方<Term>ハッシュ関数</Term>は「同じ入力からは必ず同じ出力が得られるが、出力から入力を逆算することはできない」<Term>一方向</Term>の変換です。</p>

      <table>
        <thead>
          <tr><th></th><th>暗号化</th><th>ハッシュ関数</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">変換の向き</td><td>双方向(暗号化 ⇄ 復号)</td><td>一方向(元には戻せない)</td></tr>
          <tr><td className="hl">鍵</td><td>必要 ― 鍵があれば元に戻せる</td><td>不要</td></tr>
          <tr><td className="hl">主な用途</td><td>通信内容の秘匿(例: HTTPS)</td><td>パスワードの照合、改ざんの検知</td></tr>
        </tbody>
      </table>

      <p>パスワードは「元に戻せてしまう」こと自体がリスクなので、暗号化ではなく<Term>ハッシュ関数</Term>で保存します。かといって、汎用のハッシュ関数をそのまま使うのも不十分です。パスワード専用のハッシュ関数(bcryptやargon2など)は、これに加えて<Term>ソルト</Term>(ユーザーごとに異なるランダムな値を混ぜて、同じパスワードでも異なるハッシュ値になるようにする)と、計算に意図的に時間がかかる<Term>コストパラメータ</Term>(総当たり攻撃を遅く・高くつくものにする)を備えています。</p>

      <table>
        <thead>
          <tr><th>保存方式</th><th>DB漏洩時の影響</th><th>可否</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">平文保存</td><td>全パスワードがそのまま流出する</td><td>NG</td></tr>
          <tr><td className="hl">単純な暗号化(復号可能)</td><td>鍵も一緒に漏れれば全て復号されてしまう</td><td>NG</td></tr>
          <tr><td className="hl">ソルト付きハッシュ</td><td>元のパスワードを復元することはできない</td><td>OK</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        ハッシュ化は「絵の具を一度混ぜ合わせてしまう」ことに似ています。一度混ぜた絵の具を、元の色に完全に分離して取り戻すことはできません。しかし「同じ手順でもう一度混ぜてみて、同じ色になるかどうか」を確認することはできます。ログイン時のパスワード照合は、まさにこの「もう一度混ぜて色を比べる」作業です。サーバーは「元のパスワードを覚えている」のではなく、「入力されたパスワードを同じ手順で混ぜ直し、保存済みの色(ハッシュ値)と一致するかを確かめている」だけなのです。
      </Analogy>

      <Heading num="05">ログインフォームとエラーメッセージの作り方</Heading>
      <ul>
        <li><strong>HTTPS化</strong> ― ログインフォームは通信経路上で盗聴されないよう、必ずHTTPSで保護する。</li>
        <li><strong>入力のマスク表示</strong> ― パスワード入力欄は肩越しに盗み見られないよう伏字表示にする。</li>
        <li><strong>エラーメッセージを区別しない</strong> ― 「そのIDは存在しません」と「パスワードが違います」を出し分けると、攻撃者はどのIDが実在するかを一つずつ確認できてしまいます(<Term>ユーザー列挙攻撃</Term>)。どちらの場合も「IDまたはパスワードが違います」という同一のメッセージにまとめます。</li>
      </ul>

      <Heading num="06">自動ログインとログアウト</Heading>
      <p>「次回から自動的にログイン」という機能は、専用のトークンを発行して制御し、ログアウト操作でそのトークンを確実に無効化できるようにします。ログアウト自体も、状態を変更する操作である以上<code>POST</code>で行い、サーバー側のセッションデータを確実に破棄します。これは前のページで見た「変更操作はPOSTで」「ログアウト時にサーバー側のセッションも削除する」という原則の再確認です。</p>

      <Heading num="まとめ">ログインは「守るべき対策」が集まる場所</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ログイン処理自体を堅牢に</h4><p>SQLi対策・セッション再発行など、これまでの対策をログインという最重要処理に漏れなく適用する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>パスワードはハッシュで保存</h4><p>ソルト付きハッシュ関数で、復元不可能な形で保存し、照合だけを行う。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>試行制限と2FAで補強</h4><p>パスワード単体に頼らず、試行回数の制限や二段階認証で突破のハードルを上げる。</p></Card>
      </CardGrid>
      <p>これで「あなたが誰か」を確認する認証の要点が揃いました。しかし認証だけでは、ログインした人が「何をしてよいか」までは決まりません。次のページ「<Link href="/security/authz">認可</Link>」では、この「誰が・何をしてよいか」を判定する仕組みを見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/session" tag="セキュリティ">セッションとCookie管理</RelatedLink>
                    <RelatedLink href="/security/csrf" tag="セキュリティ">CSRF対策</RelatedLink>
                    <RelatedLink href="/security/authz" tag="セキュリティ">認可</RelatedLink>
                    <RelatedLink href="/security/identity" tag="セキュリティ">認証プロトコルの変遷</RelatedLink>
                    <RelatedLink href="/dev/backend/auth/account" tag="バックエンド">パスワードとアカウント回復</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
