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

export const metadata: Metadata = { title: "セキュリティ、アイデンティティ、コンプライアンス" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>セキュリティとアイデンティティ ― 誰が、何に、何をできるか</h1>
        <Lead>
          <Link href="/infra/aws">AWS</Link>で見たとおり、事故の多くは基盤が破られたからではなく<strong>権限と公開範囲の設定</strong>で起きます。この分野の中心にあるのは、その設定を書くための仕組み ― <Term>IAM</Term>です。人だけでなく<strong>サービス自身にも同じ枠組みで権限を与える</strong>のが特徴で、これが「鍵を配らずに済む」という性質を生みます。そのうえで、鍵そのものの管理と、記録による監視が加わって3本柱になります。
        </Lead>
      </Hero>

      <Heading num="01">権限は4つの要素で決まる</Heading>

      <DiagramFrame
        slug="infra-aws-security-iam"
        aspect="760 / 300"
        caption="権限の判定が決まる4つの要素と、判定の順序。誰が、何に、どの操作を、どんな条件でという4つが揃って1つの許可になる。判定は既定ですべて拒否から始まり、どこかに明示的な許可があれば通るが、明示的な拒否が1つでもあれば必ず拒否される。この順序があるため、広く許可したうえで危険な操作だけを拒否で塞ぐ書き方が成立する。サービス自身にも同じ枠組みで権限を与えられるため、鍵を配らずに済む。"
      />

      <p>
        判定の順序が実務では重要です ― <strong>既定は拒否、許可があれば通る、拒否があれば必ず止まる</strong>。この3段があるので、「開発者には広く許可を与えつつ、本番の削除だけは組織の方針として拒否する」といった書き方ができます。<Link href="/security/authz">認可</Link>で見た最小権限の原則を、実際に書き下すための道具立てです。
      </p>

      <Heading num="02">鍵を配らないという発想</Heading>
      <p>
        アクセスキーを発行してアプリに埋め込む、という方法は避けられます。実行しているリソースそのもの ― サーバー、コンテナ、関数 ― に<Term>役割</Term>を与えると、必要なときだけ<strong>短命な資格情報が自動で発行されます</strong>。配布も更新も要らず、漏れる対象がそもそも存在しません。
      </p>
      <p>
        考え方は<Link href="/security/token">トークンの全体像</Link>と同じで、長期の秘密を持ち回らず、短命なものを都度受け取る形です。逆に言えば、<strong>長期のアクセスキーがコードやリポジトリに存在している時点で設計が古い</strong>、と判断できます。
      </p>

      <Aside label="人の側は多要素認証と役割の切り替えで">
        人が使うアカウントには多要素認証を必須にし、日常は権限の小さい状態で作業して、必要なときだけ強い役割へ切り替える形にします。<strong>強い権限を常時持たない</strong>ことが、操作ミスと乗っ取りの両方に効きます。最上位の管理者アカウントは、日常の作業には使いません。
      </Aside>

      <Heading num="03">鍵と秘密の管理</Heading>
      <table>
        <thead>
          <tr><th>対象</th><th>扱い方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">暗号鍵</td><td>鍵管理のサービスに預け、<strong>鍵そのものは取り出さず</strong>、暗号化と復号を依頼する形にする。誰がいつ使ったかも記録に残る</td></tr>
          <tr><td className="hl">パスワード・APIキー</td><td>秘密の保管サービスへ。アプリは値を持たず、必要なときに取得する(<Link href="/infra/aws-secrets-manager">Secrets Manager</Link>)</td></tr>
          <tr><td className="hl">保存データの暗号化</td><td>ストレージやデータベース側の設定で有効にする。ほとんど手間がかからないので、既定で入れておく</td></tr>
        </tbody>
      </table>

      <Heading num="04">記録と、その使い道</Heading>
      <p>
        誰がいつどの操作をしたかの記録は、監査のためだけのものではありません。<strong>障害調査で最も速く原因にたどり着く材料</strong>でもあります ― 「その時刻に誰かが設定を変えていないか」を突き合わせるだけで、原因の候補が一気に絞れます(<Link href="/infra/aws-monitoring">モニタリングと管理</Link>)。
      </p>
      <p>
        あわせて、設定が方針から外れていないかを自動で点検する仕組みや、不審な振る舞いを検知する仕組みも用意されています。共通しているのは<strong>人が定期的に見に行く運用にしない</strong>ことで、これは<Link href="/security/management">リスクマネジメント</Link>で見た「仕組みで担保する」という考え方の実装にあたります。
      </p>

      <Heading num="まとめ">3本柱で捉える</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>権限 ― 既定は拒否</h4>
          <p>4要素で1つの許可。明示的な拒否が最優先なので、広く許して危険だけ塞げる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>鍵 ― 配らない</h4>
          <p>リソースに役割を与えれば、短命な資格情報が自動で渡る。長期の鍵は設計の負債。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>記録 ― 監査と調査の両方</h4>
          <p>操作の記録は、原因究明で最も速い材料でもある。点検は人ではなく仕組みに任せる。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-security" />
    </DocsPage>
  );
}
