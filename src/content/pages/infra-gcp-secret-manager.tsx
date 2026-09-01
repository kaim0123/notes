import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "Secret Manager" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>Secret Manager ― 版を積み、参照を選ぶ</h1>
        <Lead>
          秘密の値を暗号化して保管し、権限を持つものだけが取得できるようにする ― 目的は<Link href="/infra/aws-secrets-manager">Secrets Manager</Link>と同じです。特徴的なのは、値が<Term>バージョンとして積み重なる</Term>点で、アプリがどの版を参照するかを選べます。この選択が、<strong>更新をいつ反映させるか</strong>という運用上の判断そのものになります。
        </Lead>
      </Hero>

      <Heading num="01">版と、参照の仕方</Heading>

      <DiagramFrame
        slug="infra-gcp-secret-versions"
        aspect="700 / 260"
        caption="秘密の値がバージョンとして積み重なることを示した図。値を更新するたびに新しいバージョンが追加され、古いものは残る。参照には特定の番号を指定する方法と、最新を指す別名を指定する方法がある。番号を指定すれば更新されても参照先は変わらず切り替えの時期を自分で決められ、最新を指せば即座に反映される代わりに意図しない時点で切り替わる。古い版は無効化して残せば、問題が起きたときに戻せる。"
      />

      <p>
        どちらを使うかは、<strong>切り替えの主導権を誰が持つか</strong>で決めます。運用チームが値を更新したら即座に全アプリへ反映させたいなら最新を指す形、アプリの配置に合わせて切り替えたいなら番号を指定する形です。後者は<Link href="/infra/deploy">戻せる形</Link>とも相性がよく、切り戻すと参照も一緒に戻ります。
      </p>

      <Heading num="02">アプリ側の作法</Heading>
      <p>
        値をコンテナのイメージや設定ファイルに焼き込まず、<strong>起動時あるいは必要なときに取得する</strong>のは共通の原則です。取得のたびに料金と遅延がかかるので、短時間だけ手元に保持し、期限が来たら取り直します。
      </p>
      <p>
        実行環境によっては、秘密をファイルや環境変数として<strong>自動で渡す仕組み</strong>が用意されています。アプリのコードから取得処理そのものを消せるので、可能ならそちらを使います ― <Link href="/dev/dotenv">設定を外に出す</Link>という原則を、コードを書かずに満たせます。
      </p>

      <Aside label="消すのは最後の手段">
        古い版は<strong>無効化して残す</strong>のが基本です。完全に削除すると、問題が起きたときに戻せません。消してよいのは、漏えいが確定して二度と使わないと決めたときだけです。
      </Aside>

      <Heading num="03">何を秘密として置くか</Heading>
      <p>
        すべてを秘密にすると、料金も取得の手間も増えます。<strong>漏れたときに実害があるものだけ</strong>を置き、接続先や機能フラグのような値は普通の設定として扱います。逆に、うっかり秘密でないものと同じ扱いにしてはいけないのは、<strong>権限を伴う値</strong>すべてです ― 外部サービスのAPIキーも、署名に使う鍵も、これに当たります。
      </p>

      <Heading num="まとめ">参照の仕方が運用を決める</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>版を選ぶ</h4><p>番号指定なら切り替えの主導権はアプリ側、最新指定なら運用側に来る。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>焼き込まず、取得する</h4><p>渡す仕組みがあるなら使う。取得処理をコードから消せる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>無効化して残す</h4><p>削除すると戻せない。消すのは、二度と使わないと決めたときだけ。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-secret-manager" />
    </DocsPage>
  );
}
