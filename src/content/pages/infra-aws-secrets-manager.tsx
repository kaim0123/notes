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
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "Secrets Manager" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>Secrets Manager ― 秘密を持たせず、入れ替えを自動にする</h1>
        <Lead>
          データベースのパスワードや外部サービスのAPIキーを、どこに置くか。設定ファイルに書けばリポジトリに残り、環境変数に入れれば起動時の値のまま固定されます。<Link href="/infra/aws-security">鍵を配らない</Link>という発想をここにも当てはめると、答えは<Term>アプリに持たせず、必要なときに取りに行く</Term>形になります。そしてこの形にして初めて、<strong>秘密の入れ替えを人の作業から外せます</strong>。
        </Lead>
      </Hero>

      <Heading num="01">保管のされ方</Heading>
      <p>
        値は暗号化されて保管され、取り出すには権限が要ります。つまり<strong>「どこに置くか」だけでなく「誰が読めるか」まで一緒に決まる</strong>のが、ファイルや環境変数との違いです。誰がいつ取得したかも記録に残るので、漏えいが疑われたときに追跡できます。
      </p>
      <p>
        アプリ側は起動時に一度だけ取得するのではなく、<strong>必要になったときに取得して、短時間だけ手元に置く</strong>のが基本形です。毎回問い合わせると呼び出しの料金と遅延が積み上がるので、数分程度は手元に保持し、期限が来たら取り直します。
      </p>

      <Heading num="02">入れ替えを自動にする</Heading>

      <DiagramFrame
        slug="infra-aws-secrets-rotation"
        aspect="700 / 280"
        caption="保管した秘密を自動で入れ替える流れ。新しい値を作り、相手側にも設定し、実際に接続できるかを試し、確認できてから参照する印を新しい値へ切り替える。この順序なので、確認が失敗すれば切り替えは行われず古い値のまま動き続ける。アプリが値を持たず毎回取得する形にしておけば、入れ替えのたびに再配布も再起動も要らない ― それが自動化できる条件になる。"
      />

      <p>
        重要なのは順序です。<strong>新しい値を作る → 相手にも設定する → 試す → 切り替える</strong>。試して初めて切り替わるので、途中で失敗しても止まりません。そして、この自動化が成立する前提は1つだけ ― <strong>アプリが値を保持していないこと</strong>です。設定ファイルに書き込んで起動時に読む形のままでは、入れ替えのたびに全台の再起動が要ります。
      </p>

      <Aside label="なぜ入れ替えるのか">
        「漏れていないなら替えなくてよい」ではありません。漏れたかどうかは<strong>分からない</strong>のが普通で、定期的に入れ替えておけば、漏れていた場合の有効期間が自動的に短くなります。<Link href="/security/auth">認証</Link>で見た「秘密は短命であるほど安全」という原則の、運用側での現れ方です。
      </Aside>

      <Heading num="03">設定値との使い分け</Heading>
      <p>
        すべてを秘密として扱う必要はありません。接続先のホスト名や機能フラグのような<strong>秘密ではない設定値</strong>は、より安価な設定の保管場所に置くほうが理にかなっています。
      </p>
      <table>
        <thead>
          <tr><th>置くもの</th><th>置き場所</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">パスワード、APIキー</td><td>秘密の保管サービス</td><td>入れ替えの自動化と、取得の記録が要る</td></tr>
          <tr><td className="hl">接続先、機能フラグ</td><td>設定値の保管場所</td><td>秘密ではない。料金も安く、階層で整理できる</td></tr>
          <tr><td className="hl">環境ごとに変わる値</td><td>どちらか(性質による)</td><td>いずれにせよ<Link href="/dev/dotenv">コードの外</Link>に置く</td></tr>
        </tbody>
      </table>

      <Heading num="まとめ">持たせないことが前提条件</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>アプリは値を持たない</h4>
          <p>必要なときに取得し、短時間だけ保持する。この形が自動入れ替えの条件になる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>試してから切り替える</h4>
          <p>作る・設定する・試す・切り替える。順序があるから、失敗しても止まらない。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>秘密でないものは分ける</h4>
          <p>全部を秘密にすると料金も手間も増える。性質で置き場所を分ける。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-secrets-manager" />
    </DocsPage>
  );
}
