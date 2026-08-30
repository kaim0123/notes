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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Server/Clientコンポーネントの境界",
};

function TierBadge() {
  return <Mark tier="must">必須</Mark>;
}

const rows = [
  { name: "Server Component(デフォルト)", desc: "何も書かなければサーバー側でのみ実行され、JSにバンドルされないコンポーネント" },
  { name: '"use client"境界', desc: "インタラクティブ性が必要な部分だけを、明示的にクライアントコンポーネントとして切り出す境界線" },
  { name: "Composition Pattern(Server→Client)", desc: "Server ComponentをClient Componentの子要素(children/props)として渡し、Server Component自体はクライアントに送らずに済ませる合成テクニック" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; Next.js &middot; パターン</Eyebrow>
        <h1>Server/Clientコンポーネントの境界 ― どこにuse clientを置くか</h1>
        <Lead>
          Next.js(App Router)では、<Term>レイアウト</Term>と<Term>ページ</Term>は何も書かなければ<Term>Server Component</Term>です。状態やイベントハンドラ、ブラウザAPIが必要な部分だけを<code>&quot;use client&quot;</code>で明示的に切り出す、というのがApp Routerの基本設計です。この境界線をどこに引くかが、バンドルサイズと開発体験の両方を左右する最初の設計判断になります。
        </Lead>
      </Hero>

      <Heading num="01">3つの基本テクニック</Heading>
      <table>
        <thead>
          <tr><th>テクニック</th><th>内容</th><th>区分</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="hl">{row.name}</td>
              <td>{row.desc}</td>
              <td><TierBadge /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">なぜServer Componentがデフォルトなのか</Heading>
      <p>Server Componentはサーバー上でのみレンダリングされ、そのコンポーネント自身のコードはクライアントのJavaScriptバンドルに含まれません。データベースやAPIキーなど機密情報を扱うロジックをクライアントに晒さずに書けること、そしてページの本文はサーバーで組み上げて先に届けられることが最大の利点です。<code>page.tsx</code>を<code>async function</code>にしてそのまま<code>await</code>でデータ取得できるのも、Server Componentであることが前提です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// app/[id]/page.tsx ― 何も書かなければ Server Component
import LikeButton from "@/app/ui/like-button";
import { getPost } from "@/lib/data";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id); // サーバー上でDB/APIに直接アクセス

  return (
    <main>
      <h1>{post.title}</h1>
      <LikeButton likes={post.likes} />
    </main>
  );
}`}</code>
      </pre>

      <Heading num="03">&quot;use client&quot;はどこに置くべきか</Heading>
      <p>ファイル先頭に<Term>&quot;use client&quot;</Term>ディレクティブを置くと、そのファイルとそこから直接importされるものすべてがクライアントバンドルに含まれます。ページ全体をClient Componentにするのではなく、本当にインタラクティブな部分だけを<strong>木の葉(leaf)に近いところ</strong>で切り出すのが基本原則です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// app/layout.tsx ― Layout自体はServer Component
import Search from "./search"; // Client Component
import Logo from "./logo";     // Server Component

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Logo />
        <Search />{/* 検索バーだけがインタラクティブ */}
      </nav>
      <main>{children}</main>
    </>
  );
}

// app/search.tsx
"use client";

export default function Search() {
  const [query, setQuery] = useState("");
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}`}</code>
      </pre>

      <Heading num="04">Server ComponentをClient Componentの中に&quot;差し込む&quot;</Heading>
      <p>Client Componentが<code>children</code>としてServer Componentを受け取る場合、そのServer Componentはクライアントの<Term>モジュールグラフ</Term>には含まれず、サーバーで先にレンダリングされた結果だけが渡されます。クライアント状態でON/OFFを切り替える<code>&lt;Modal&gt;</code>の中に、データ取得が必要な<code>&lt;Cart&gt;</code>をそのまま差し込めるのはこのためです。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// app/ui/modal.tsx ― 開閉状態だけを持つClient Component
"use client";

export default function Modal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return open ? <div className="modal">{children}</div> : null;
}

// app/page.tsx ― Server ComponentからCartをchildrenとして渡す
import Modal from "./ui/modal";
import Cart from "./ui/cart"; // データ取得を行うServer Component

export default function Page() {
  return (
    <Modal>
      <Cart />
    </Modal>
  );
}`}</code>
      </pre>
      <p><code>&lt;Cart /&gt;</code>はサーバーで実行された結果(RSC Payload)としてクライアントに渡るだけで、<code>&lt;Cart /&gt;</code>自体のコードはバンドルされません。Context Providerも同じ考え方で、<code>createContext</code>を使うClient Componentを用意し、それを親のServer Componentから<code>children</code>付きで呼び出します。</p>

      <Analogy label="💡 たとえるなら">
        Server Componentは「厨房で調理まで済ませて出す料理」、Client Componentは「客席で客自身が仕上げる焼肉」です。焼肉(操作が必要な部分)だけをテーブル(クライアント)に出し、それ以外の前菜やご飯(静的な部分)は厨房(サーバー)で完成させてしまう方が、テーブルに運ぶ荷物(JSバンドル)は少なく済みます。
      </Analogy>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Server Componentがデフォルト</h4><p>DB/APIアクセスをサーバー側に閉じ、JSバンドルを増やさない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>&quot;use client&quot;は葉に置く</h4><p>ページ全体でなく、本当にインタラクティブな部分だけを切り出す。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>childrenで差し込む</h4><p>Client Componentの中にServer Componentをchildren経由で渡し、サーバー処理を保つ。</p></Card>
      </CardGrid>

      <p>次のページでは、この境界を前提にした<Link href="/dev/frontend/nextjs/data">データフェッチ・キャッシュ・再検証</Link>の定石を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/frontend/nextjs/data" tag="開発">データフェッチ・キャッシュ・再検証</RelatedLink>
                    <RelatedLink href="/dev/frontend/nextjs/rendering" tag="開発">配信を最適化する</RelatedLink>
                    <RelatedLink href="/design/patterns" tag="設計">設計パターン一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
