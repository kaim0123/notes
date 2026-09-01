import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "Google Cloudの基礎" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>Google Cloudの基礎 ― 入れ物と、範囲の広さ</h1>
        <Lead>
          <Link href="/infra/gcp">Google Cloud</Link>で、構造の違いは<Term>プロジェクト</Term>と<Term>ネットワークの境界</Term>の2つだと見ました。ここではその前提となる土台を整理します。押さえるのは2点だけです ― <strong>すべての資源はプロジェクトに属する</strong>ことと、<strong>資源ごとに属する範囲の広さが違う</strong>こと。この2つが分かれば、権限も請求も可用性も同じ地図の上で読めるようになります。
        </Lead>
      </Hero>

      <Heading num="01">プロジェクトが入れ物</Heading>
      <p>
        仮想マシンもバケットもデータベースも、必ずどこかのプロジェクトの中に作られます。プロジェクトは単なる整理棚ではなく、<strong>請求先・権限・使えるAPIの有効化</strong>がまとめて紐づく単位です。だから「開発用と本番用でプロジェクトを分ける」という判断は、フォルダを分けるより重い ― <Link href="/infra/aws-basics">AWSでアカウントを分ける</Link>のに近い意味を持ちます。
      </p>
      <p>
        大きな組織では、上に<Term>組織</Term>と<Term>フォルダ</Term>を置いて階層にします。権限は上から下へ引き継がれるので、この階層の形がそのまま権限設計の骨格になります(<Link href="/infra/gcp-security">セキュリティ</Link>)。
      </p>

      <Aside label="使う前に有効化する">
        多くのサービスは、プロジェクトごとに明示的に有効化してから使います。「権限はあるはずなのに動かない」というときの原因の一定数がこれで、権限の設定を疑う前に有効化を確認すると早く解決します。
      </Aside>

      <Heading num="02">範囲の広さで、性質が変わる</Heading>

      <DiagramFrame
        slug="infra-gcp-basics-scope"
        aspect="700 / 300"
        caption="資源が属する範囲の広さを4段階で示した図。いちばん狭いのがゾーンで、仮想マシンや永続ディスクはここに属する。次がリージョンで、複数のゾーンにまたがって動くものが属する。その上に複数リージョンにまたがる範囲があり、保存先の一部はここを選べる。いちばん広いのはどのリージョンにも属さない範囲で、権限や名前解決の定義が該当する。広いほど壊れにくく、狭いほど速くて安い。"
      />

      <p>
        実務で効くのは<strong>ゾーンとリージョンの区別</strong>です。仮想マシンとその永続ディスクは同じゾーンにいなければならず、別のゾーンへ移すにはスナップショットを経由します。逆に、マネージドなデータベースやネットワークの区画はリージョン単位なので、ゾーンの障害を自動で吸収します ― <strong>自分で並べたものは自分で分散させる、任せたものは任せた範囲で分散される</strong>、という切り分けです。
      </p>

      <Heading num="03">名前とラベルを最初に決める</Heading>
      <p>
        プロジェクトのIDは世界で一意で、<strong>後から変えられません</strong>。命名の規則(用途と環境が読み取れる形)を最初に決めておかないと、増えたときに一覧が読めなくなります。
      </p>
      <p>
        あわせて、資源に付ける<Term>ラベル</Term>の規則も決めます。費用の内訳はラベル単位で集計できるので、「どのサービスにいくらかかっているか」を後から知りたければ、<strong>作るときに付けておくしかありません</strong>(<Link href="/infra/ops">コスト管理</Link>)。後から全部に付け直すのは、たいてい実現しません。
      </p>

      <Heading num="まとめ">地図を持ってから使う</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>すべてはプロジェクトの中</h4><p>請求も権限も有効化もこの単位。環境ごとに分けると、境界が構造として手に入る。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>範囲の広さを見る</h4><p>ゾーンかリージョンか、それとも全体か。可用性も費用も、この違いから出てくる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>名前とラベルは作るときに</h4><p>IDは変えられず、ラベルは後から付け直せない。最初の5分が後の数か月を決める。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-basics" />
    </DocsPage>
  );
}
