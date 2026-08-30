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
  Mark,
  MarkNote,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "データフェッチ・キャッシュ・再検証",
};

type Tier = "must" | "niche";

function TierBadge({ tier }: { tier: Tier }) {
  if (tier === "must") return <Mark tier="must">必須</Mark>;
  return <Mark tier="niche">よく使う</Mark>;
}

type Row = { name: string; desc: string; tier: Tier; note?: string };

const rows: Row[] = [
  { name: '"use cache"ディレクティブ', desc: "関数やコンポーネントの戻り値を、明示的にキャッシュ対象にする", tier: "must", note: "→ このバージョンではfetchが自動キャッシュされないため、キャッシュしたい処理は自分で宣言する必要がある" },
  { name: "cacheLife / cacheTag", desc: "キャッシュの有効期限(stale/revalidate/expire)と、後から無効化するためのタグを指定する", tier: "niche" },
  { name: "revalidatePath / revalidateTag / updateTag", desc: "キャッシュ済みデータを、パス指定・タグ指定・即時反映の3つの粒度で再検証する", tier: "must" },
  { name: "Server Actions(Server Functions)", desc: '"use server"ディレクティブで、クライアントから直接呼べるサーバー側の関数(主にミューテーション)を定義する', tier: "must" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; Next.js &middot; パターン</Eyebrow>
        <h1>データフェッチ・キャッシュ・再検証 ― use cacheとServer Actions</h1>
        <Lead>
          Next.js 16では、<code>fetch</code>はデフォルトでキャッシュされません。「何もしなければ毎回最新データを取りに行き、キャッシュしたい処理だけを<Term>use cache</Term>ディレクティブで明示する」という考え方に変わりました。ここではキャッシュの付け方・寿命の決め方・更新後の再検証の3点を、Server Actionsによるミューテーションと合わせて見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">4つの技法</Heading>
      <table>
        <thead>
          <tr><th>技法</th><th>内容</th><th>区分</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="hl">{row.name}</td>
              <td>{row.desc}</td>
              <td><TierBadge tier={row.tier} />{row.note && <MarkNote>{row.note}</MarkNote>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">なぜ明示的なキャッシュが必要になったのか</Heading>
      <p>以前のNext.jsは<code>fetch</code>を自動的にキャッシュしていましたが、今のバージョンでは逆に「何もしなければキャッシュされない」がデフォルトです。同じ<code>fetch</code>呼び出しが1つのリクエスト内で重複しないよう自動でメモ化はされますが、結果そのものは次のリクエストのために保存されません。データを次のリクエストでも使い回したい場合は、関数の先頭に<code>&quot;use cache&quot;</code>を書いて明示的にキャッシュ対象にします。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// app/lib/data.ts
export async function getProducts() {
  "use cache";
  return db.query("SELECT * FROM products");
}

// キャッシュしたくない(常に最新であるべき)処理は "use cache" を付けず、
// <Suspense> で包んでストリーミングさせる
async function LatestOrders() {
  const orders = await fetchOrders(); // 毎リクエスト取得し直す
  return <OrderList orders={orders} />;
}`}</code>
      </pre>
      <p><code>&quot;use cache&quot;</code>はデータ取得関数だけでなく、コンポーネントやページ単位でも使えます。ファイルの先頭に置けば、そのファイルからexportされる関数すべてがキャッシュ対象になります。</p>

      <Heading num="03">キャッシュの寿命とタグを指定する</Heading>
      <p><Term>cacheLife</Term>は、キャッシュがいつ「古くなった(stale)」とみなされ、いつ再取得(revalidate)され、いつ完全に失効(expire)するかを、<code>hours</code>・<code>days</code>のようなプロファイル名か、秒単位のカスタム設定で指定します。<Term>cacheTag</Term>は、後から名前で無効化できるようにするための「ラベル」を付けます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import { cacheLife, cacheTag } from "next/cache";

export async function getProducts() {
  "use cache";
  cacheLife("hours"); // 1時間ごとに再取得、1日で完全失効
  cacheTag("products"); // このタグ名で後から無効化できる
  return db.query("SELECT * FROM products");
}`}</code>
      </pre>
      <p>ランタイムでしか分からない値(<code>cookies()</code>・<code>headers()</code>・<code>searchParams</code>)を使う処理は、<code>&quot;use cache&quot;</code>の外で読み取り、キャッシュ対象の関数へ引数として渡します。渡した値はキャッシュキーの一部になるため、ユーザーごとに異なるキャッシュを持たせることもできます。</p>

      <Heading num="04">更新した後にキャッシュを最新化する</Heading>
      <p>データを更新するServer Actionの中では、状況に応じて3つの再検証手段を使い分けます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`"use server";
import { revalidateTag, updateTag, revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const post = await db.post.create({
    data: { title: formData.get("title") },
  });

  // 投稿した本人には即座に反映したい → updateTag(Server Actionsのみ)
  updateTag("posts");

  // 他のタグ付きキャッシュは、少し遅れて背景で更新されればよい → revalidateTag
  revalidateTag("dashboard-stats", "max");

  // タグを付けていないページを丸ごと再検証したい場合だけ revalidatePath
  revalidatePath("/posts");
}`}</code>
      </pre>
      <p><Term>updateTag</Term>は「自分が今した変更を、自分がすぐ見られるようにする(read-your-own-writes)」ためのAPIで、Server Actionsの中でしか使えません。<Term>revalidateTag</Term>はstale-while-revalidate、つまり古い内容を一旦見せつつ裏側で更新するため、ブログの一覧のように多少の遅延が許容できる場面に向いています。<Term>revalidatePath</Term>はタグが分からない・付けていないルートをまとめて無効化する、粒度の粗い手段です。</p>

      <Analogy label="💡 たとえるなら">
        &quot;use cache&quot;は「この引き出しの中身は、頼まれるまで作り直さない」という指示です。cacheLifeは引き出しの「賞味期限」、cacheTagは引き出しに貼る「ラベル」。updateTagは自分でその引き出しを開けて中身をすぐ入れ替えること、revalidateTagは店員に「そのラベルの引き出し、あとで詰め替えておいて」と頼むことに近い動きです。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>use cache</h4><p>キャッシュしたい処理だけを明示的に宣言する。何もしなければキャッシュされない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>cacheLife / cacheTag</h4><p>寿命とラベルを付けて、あとで狙って無効化できるようにする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>revalidateTag / updateTag / revalidatePath</h4><p>背景更新・即時反映・パス丸ごとの3段階で再検証する。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>Server Actions</h4><p>&quot;use server&quot;でクライアントから直接呼べるサーバー関数を作り、更新と再検証を1箇所にまとめる。</p></Card>
      </CardGrid>

      <p>次は、キャッシュされない・ランタイムに依存する処理をどう配信するかを、<Link href="/dev/frontend/nextjs/rendering">配信を最適化する</Link>で見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/frontend/nextjs/components" tag="開発">Server/Clientコンポーネントの境界</RelatedLink>
                    <RelatedLink href="/dev/frontend/nextjs/rendering" tag="開発">配信を最適化する</RelatedLink>
                    <RelatedLink href="/design/patterns" tag="設計">設計パターン一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
