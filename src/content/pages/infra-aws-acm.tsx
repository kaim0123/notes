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

export const metadata: Metadata = { title: "ACM" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>ACM ― 期限切れという障害を消す</h1>
        <Lead>
          サーバー証明書は、通信を暗号化するためと、<strong>その名前の持ち主であることを示すため</strong>にあります(仕組みは<Link href="/security/crypto">暗号技術</Link>)。運用上の問題は暗号の強さではなく、<Term>期限が来ること</Term>です。切れた瞬間にサイト全体が見られなくなり、しかも必ず起きると分かっている。マネージドな証明書サービスの値打ちは、この<strong>予定された障害を、人の作業から外してしまう</strong>ところにあります。
        </Lead>
      </Hero>

      <Heading num="01">発行から自動更新まで</Heading>

      <DiagramFrame
        slug="infra-aws-acm-flow"
        aspect="700 / 280"
        caption="証明書が発行され、自動で更新されるまでの流れ。発行を申し込むと、そのドメインを本当に持っているかを確かめるための値が示される。それを名前情報として登録すると、読み取られて所有が確認され、証明書が発行される。この登録を残しておけば期限が近づいたときに同じ手順が自動で繰り返され、人手を介さずに更新される。期限切れはサイト全体が見えなくなる障害なので、更新を人の作業から消しておくことが最大の対策になる。"
      />

      <p>
        所有の確認方法は主に2つで、<strong>名前情報として値を登録する方式</strong>と、そのドメイン宛のメールを受け取る方式です。自動更新まで含めて考えるなら前者一択になります ― <strong>登録を消さない限り、更新のたびに自動で確認が通る</strong>からです。後者は毎回人がメールを受け取って操作する必要があり、そこが止まれば期限切れになります。
      </p>

      <Heading num="02">使えるサービスと、使えない場所</Heading>
      <p>
        発行された証明書は、ファイルとして取り出せません。<strong>指定したサービスに紐づけて使う</strong>形になります ― ロードバランサ、配信網、APIの入口など。逆に言えば、自分で立てたサーバーの中に置いて使うことはできず、その場合は別の方法(無料の認証局と自動更新の仕組みなど)を選ぶことになります。
      </p>

      <Aside label="リージョンの例外に注意">
        <Link href="/infra/aws-cloudfront">配信網</Link>に付ける証明書だけは、特定のリージョンで発行したものに限られます。同じドメインでも、ロードバランサ用とは<strong>別に発行し直す</strong>必要があります。証明書は無料なので発行し直すこと自体は問題ありませんが、知らないと「作ったのに一覧に出てこない」で止まります。
      </Aside>

      <Heading num="03">ワイルドカードと、その限界</Heading>
      <p>
        <code>*.example.com</code> の形で発行すると、その直下のすべての名前に1枚で対応できます。サブドメインを頻繁に増やす構成では管理が楽になりますが、注意点が2つあります ― <strong>階層をまたげない</strong>(<code>*.example.com</code> は <code>a.b.example.com</code> を含みません)ことと、<strong>1枚が漏れたときの影響範囲が広い</strong>ことです。
      </p>

      <Heading num="04">それでも期限は監視する</Heading>
      <p>
        自動更新は万能ではありません。確認用の登録を誤って消した、ドメインの管理を別の場所へ移した、紐づけていたサービスを作り直した ― こうした変更で更新が止まることがあります。<strong>自動化したものが動いていることを監視する</strong>のは、自動化とセットで必要な仕事です(<Link href="/infra/monitoring">監視と障害対応</Link>)。
      </p>
      <p>
        実務では、外形監視で<strong>証明書の残り日数</strong>を見ておくのが確実です。仕組みの内側ではなく、外から見える結果を測る ― これがいちばん裏切られにくい方法です。
      </p>

      <Heading num="まとめ">人の作業から外す</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>確認は名前情報で行う</h4>
          <p>登録を残しておけば更新も自動で通る。メール方式は人が止まると期限切れになる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>紐づけて使う</h4>
          <p>取り出せない代わりに漏れない。自前サーバー用には別の手段を選ぶ。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>自動化も監視する</h4>
          <p>止まる理由はいくつもある。外から残り日数を見るのがいちばん確実。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-acm" />
    </DocsPage>
  );
}
