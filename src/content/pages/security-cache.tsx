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
  Analogy,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "キャッシュ制御と情報漏洩" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>キャッシュ制御と情報漏洩 ― 個人向けの応答を使い回さない</h1>
        <Lead>
          <Link href="/security/authz">認可</Link>を正しく実装しても、それより手前の層で応答が使い回されれば意味がなくなります。<Term>キャッシュ</Term>は「一度作った応答を保存して次回はそのまま返す」仕組みで、速度のためには欠かせません。ただしその応答が<strong>特定の利用者だけのために作られたもの</strong>だった場合、使い回された瞬間に他人の画面が別の人に配られます。
        </Lead>
      </Hero>

      <Heading num="01">キャッシュは「使い回し」である</Heading>
      <p>
        トップページや商品一覧のように「誰が見ても同じ内容」なら、使い回しは純粋な利点です。問題になるのは、マイページや注文履歴のように<Term>見る人によって中身が変わる</Term>ページを、同じ仕組みに載せてしまったときです。
      </p>

      <DiagramFrame
        slug="security-cache-shared"
        aspect="760 / 300"
        caption="共有キャッシュで個人向けページが他人に配られる流れ。ユーザーAのマイページの応答が、キャッシュ禁止を明示していないためにCDNへ保存され、数秒後に同じURLを開いたユーザーBに対して、オリジンへ問い合わせることなくそのまま返される。オリジンにはこの事故の記録すら残らない。"
      />

      <p>
        <strong>自分のブラウザの中だけの話ではない</strong>のがこの事故の怖さです。多くのサイトはCDNやプロキシを経由していて、そこのキャッシュは<Term>多数の利用者で共有</Term>されています。ブラウザ内のキャッシュなら被害はその端末に閉じますが、共有キャッシュでは配られる相手が桁違いに増えます。しかも、オリジンのログには何も残りません。
      </p>

      <Analogy label="💡 たとえるなら">
        個人宛の郵便物を、ラベルも貼らずに共有の受け取り棚へ置くようなものです。次に来た人が自分宛だと思って持ち帰るかもしれません。個人宛のものは共有の棚に置かない ― 結論としてはそれだけの話です。
      </Analogy>

      <Heading num="02">指定と、残る場所の対応</Heading>
      <p>
        「キャッシュしてよいか」は<code>Cache-Control</code>ヘッダで明示します。ここで危ないのは、禁止し忘れることではなく<Term>何も書かないこと</Term>です。指定がなければ、判断は各機器の実装と設定に委ねられます。
      </p>

      <DiagramFrame
        slug="security-cache-control"
        aspect="760 / 316"
        caption="Cache-Controlの指定によって、応答がどこまで残るかの対応。指定なしでは判断が各機器に委ねられ、ブラウザにも共有CDNにも残る可能性がある。publicはどちらにも保存され、privateは共有キャッシュには保存されずブラウザの中だけに残り、no-storeはどちらにも残らない。いちばん危ないのは指定なしの行で、書かなければ安全側に倒れるという保証はどこにもない。"
      />

      <table>
        <thead>
          <tr><th>ページの性質</th><th>指定</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">誰が見ても同じ(公開ページ・静的アセット)</td><td><code>public</code> と有効期間</td></tr>
          <tr><td className="hl">ログイン後の画面だが、再取得の負荷を下げたい</td><td><code>private</code>(共有キャッシュには置かせない)</td></tr>
          <tr><td className="hl">個人情報・決済・管理画面</td><td><code>no-store</code>(どこにも残さない)</td></tr>
        </tbody>
      </table>

      <p>
        加えて、CDNやプロキシの<strong>設定側でも</strong>認証付きの応答をキャッシュ対象から外します。ヘッダとインフラ設定の両方で言っておくのは二度手間に見えますが、片方の設定変更で事故が起きる構成にしないためです。キャッシュそのものの設計判断は<Link href="/dev/cache">キャッシュの全体像</Link>、サーバー側の実装は<Link href="/backend/cache">サーバーサイドキャッシュ</Link>を参照してください。
      </p>

      <Aside label="Varyヘッダも同じ問題を持つ">
        認証状態によって内容が変わる応答をキャッシュ可能にする場合、キャッシュの鍵に何を含めるかを<code>Vary</code>で指定します。ただし<strong>指定を間違えれば、やはり別人の応答が返ります</strong>。「正しく設定すれば個人向けページもキャッシュできる」のは事実ですが、設定を1つ間違えたときの被害が大きいので、迷ったら<code>no-store</code>に倒すのが安全です。
      </Aside>

      <Heading num="03">URLに乱数を付けるだけでは足りない</Heading>
      <p>
        「URLの末尾に毎回ランダムな値を付ければキャッシュされないはず」という対処は、根本的な解決になりません。共有キャッシュ側の設定によってはクエリの違いを無視して保存する場合がありますし、そもそも<Term>この応答は保存してはいけない</Term>という意図がサーバーから示されていない点は変わらないからです。
      </p>
      <p>
        同じ理由で、「そのURLは知られていないから大丈夫」も通用しません。<Link href="/security/authz">認可</Link>で見た「隠すことによる安全」と同じ構図で、URLは共有され、ログに残り、参照元ヘッダに載ります。<strong>意図はヘッダで明示する</strong> ― これが唯一の確実な伝え方です。
      </p>

      <Heading num="04">サーバーの中でも、同じ形の事故が起きる</Heading>
      <p>
        キャッシュに限らず、<Term>1つの応答のための値を、複数の処理で共有してしまう</Term>とまったく同じ事故が起きます。あるリクエストの処理中にしか使わないはずの利用者情報を、モジュール直下の変数(いわゆるグローバル変数)や、リクエストをまたいで生き続けるオブジェクトに置くと、同時に処理された別のリクエストにその値が混ざります。
      </p>
      <p>
        現れ方が厄介です ― <strong>負荷が低いうちは再現せず、アクセスが集中したときにだけ、他人の名前が画面に出ます</strong>。テストでも気づきにくく、原因の特定にも時間がかかります。リクエスト単位の値はリクエスト単位のスコープに置く、というのが唯一の予防で、どうしても共有が必要な場合は<Link href="/language/concurrency-lock">排他制御</Link>の対象として扱います。
      </p>

      <Heading num="まとめ">使い回してよいかを、必ず書く</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>共有キャッシュが本番</h4>
          <p>ブラウザ内なら被害はその端末に閉じる。CDNやプロキシでは、配られる相手が桁違いに増える。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>いちばん危ないのは「指定なし」</h4>
          <p>書かなければ安全側に倒れる保証はない。個人向けの応答には明示的に禁止を書く。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>サーバー内の共有も同じ事故</h4>
          <p>リクエスト固有の値を共有の場所に置くと、混雑時にだけ他人の情報が混ざる。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/security/cache" />
    </DocsPage>
  );
}
