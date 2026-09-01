import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "Cloud Storage" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>Cloud Storage ― 権限を、把握できる形で持つ</h1>
        <Lead>
          オブジェクトストレージの仕組みは<Link href="/infra/aws-s3">S3</Link>とほぼ同じです ― 入れ物とキーだけででき、階層は見た目にすぎず、キーの設計が使い勝手を決めます。ここでは差が出る部分に絞ります。中心にあるのは<Term>権限をどの粒度で持つか</Term>という設計判断で、これは公開範囲の事故を防げるかどうかに直結します。
        </Lead>
      </Hero>

      <Heading num="01">粒度をそろえる</Heading>

      <DiagramFrame
        slug="infra-gcp-cloud-storage-access"
        aspect="700 / 280"
        caption="保存先の権限を2つの方式で管理するときの違い。入れ物の単位でまとめて決める方式は、誰が読めるかが1か所で分かり見落としが起きにくい。ファイルごとに公開の可否を持たせる方式は細かく制御できる代わりに、どのファイルが誰に見えているのかを全体として把握できなくなる。個別に配りたいものは期限付きの署名済みリンクで渡すほうが安全で、公開範囲の事故は把握できない状態から生まれる。"
      />

      <p>
        原則は<strong>入れ物の単位に統一する</strong>ことです。ファイルごとに権限を持てる方式は柔軟に見えますが、数万件のオブジェクトの中で「1件だけ公開になっている」状態を見つける手段が事実上ありません。個別に配りたいものは権限ではなく<strong>期限付きの署名済みリンク</strong>で渡します ― その場だけ有効なので、後から広がることも消し忘れることもありません。
      </p>

      <Heading num="02">キーの設計は、後の運用を決める</Heading>
      <p>
        <Link href="/infra/aws-s3">S3</Link>と同じく、フォルダに見えるものは文字列の一部です。一覧の取得は前方一致の検索なので、<strong>切り出したい単位を先頭に置く</strong>と後の操作が楽になります ― 期間で消したいなら日付を、利用者ごとに扱いたいなら利用者IDを先に置く。
      </p>
      <p>
        もう1つ実務的な点として、<strong>キーが連番のように偏ると性能が落ちる</strong>ことがあります。大量に書き込む用途では、先頭にばらつきのある値を置くほうが安全です。
      </p>

      <Aside label="版と期限は対で">
        上書きや削除から戻せるようにする設定を入れると、古い版が残り続けて保存料が積み上がります。<Link href="/infra/aws-s3">同じ注意</Link>がここでも当てはまり、<strong>古い版を一定期間で消す規則</strong>を同時に設定します。
      </Aside>

      <Heading num="03">アプリからの使い方</Heading>
      <p>
        アップロードは、いったんアプリのサーバーを経由するより<strong>署名を発行して直接送らせる</strong>ほうが素直です。サーバーは大きなファイルを中継せずに済み、保存先の権限も広げずに済みます。この設計は<Link href="/backend/upload">ファイルアップロード</Link>にまとめています。
      </p>

      <Heading num="まとめ">把握できる形を選ぶ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>権限は入れ物の単位で</h4><p>1か所で読める形にする。個別配布は署名付きのリンクで。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>キーは切り出す単位で始める</h4><p>期間か、利用者か。後から変えるのは全件の置き直し。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>戻せる設定には期限を付ける</h4><p>版を残すなら、消す規則も同時に書く。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-cloud-storage" />
    </DocsPage>
  );
}
