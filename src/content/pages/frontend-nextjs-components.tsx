import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "Server/Clientコンポーネントの境界" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>Server/Clientコンポーネントの境界 ― どこに <code>&quot;use client&quot;</code> を置くか</h1>
        <Lead>
          App Routerでは、レイアウトもページも<Term>何も書かなければサーバー側だけで動きます</Term>。状態・イベントハンドラ・ブラウザAPIが要る部分だけを明示的に切り出す ― この境界をどこに引くかが、バンドルサイズと書きやすさの両方を左右する最初の設計判断になります。
        </Lead>
      </Hero>

      <Heading num="01">なぜサーバー側が既定なのか</Heading>
      <p>
        サーバー側で動くコンポーネントは、<Term>そのコード自体がブラウザへ送られません</Term>。データベースに直接触れ、鍵を持ち、そして重い処理をしてもブラウザの負担にならない ― この3つが同時に手に入ります。
      </p>

      <pre>
        <code>{`// app/[id]/page.tsx ― 何も書かなければサーバー側だけで動く
import LikeButton from "@/app/ui/like-button";
import { getPost } from "@/lib/data";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);   // サーバー上で DB / API に直接アクセス

  return (
    <main>
      <h1>{post.title}</h1>
      <LikeButton likes={post.likes} />
    </main>
  );
}`}</code>
      </pre>

      <p>
        コンポーネントがそのまま<code>async</code>で書け、<code>await</code>でデータを取れるのも、サーバー側で動くからです。<Term>取得のための特別な仕組みが要らなくなる</Term>のは、この設計のいちばん大きな副産物かもしれません。
      </p>

      <Heading num="02">境界は下へ伝播する</Heading>
      <p>
        ファイルの先頭に<code>&quot;use client&quot;</code>を書くと、<Term>そのファイルと、そこからimportされるものすべて</Term>がブラウザ側になります。ここが最も誤解されやすい点です ― 境界は1ファイルの話ではなく、<Term>そこから下すべて</Term>に及びます。
      </p>

      <DiagramFrame
        slug="frontend-nextjs-boundary"
        aspect="640 / 320"
        caption="use clientの境界がどこまで及ぶかを示した図。上段は境界を上に置いた場合で、ページ全体にuse clientを書くと、そこからimportされる子も孫もすべてブラウザ側になり、静的な表示部分まで送られてしまう。下段は境界を葉に近い位置に置いた場合で、実際に操作が要る検索欄だけがブラウザ側になり、ロゴや本文はサーバー側のまま残る。同じ画面でも、境界の位置だけでブラウザへ送るコードの量が大きく変わる。境界は1ファイルの話ではなく、そこからimportされるもの全体に及ぶ。"
      />

      <pre>
        <code>{`// app/layout.tsx ― レイアウト自体はサーバー側のまま
import Search from "./search";   // ブラウザ側
import Logo from "./logo";       // サーバー側

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav>
        <Logo />
        <Search />   {/* 検索欄だけが操作を必要とする */}
      </nav>
      <main>{children}</main>
    </>
  );
}`}</code>
      </pre>

      <p>
        原則は<Term>できるだけ葉に近いところで切る</Term>ことです。ページ全体を切り替えるのは簡単ですが、その瞬間に静的な表示部分まで全部ブラウザへ送られます。
      </p>

      <Heading num="03">childrenで差し込む ― 境界を越える唯一の道</Heading>
      <p>
        「操作が要る部品の<Term>中に</Term>、データ取得が要る部品を置きたい」という要求はよくあります。素直にimportすると、内側もブラウザ側になってしまいます。
      </p>
      <p>
        解決は<code>children</code>です。ブラウザ側の部品が<code>children</code>として受け取る中身は、<Term>すでにサーバーで描かれた結果</Term>であり、そのコードはブラウザに送られません。
      </p>

      <pre>
        <code>{`// app/ui/modal.tsx ― 開閉状態だけを持つ、ブラウザ側の部品
"use client";

export default function Modal({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return open ? <div className="modal">{children}</div> : null;
}

// app/page.tsx ― サーバー側から、中身を children として渡す
import Modal from "./ui/modal";
import Cart from "./ui/cart";   // データ取得を行う、サーバー側の部品

export default function Page() {
  return (
    <Modal>
      <Cart />        {/* Cart のコードはブラウザに送られない */}
    </Modal>
  );
}`}</code>
      </pre>

      <Aside label="この形がすべての土台になる">
        Contextの提供元も同じ形で書きます。<code>createContext</code>を使う部品はブラウザ側になりますが、<Term>その中身は<code>children</code>としてサーバー側から渡せる</Term>ので、Providerで包んでもアプリ全体がブラウザ側になるわけではありません。<Link href="/frontend/react-props">合成</Link>がここでも効いてくる、という点は覚えておく価値があります。
      </Aside>

      <Heading num="04">境界を越えられないもの</Heading>
      <p>
        サーバー側からブラウザ側へ渡せるのは<Term>シリアライズできる値</Term>だけです。ここを知らないと、原因の分かりにくいエラーに当たります。
      </p>

      <table>
        <thead>
          <tr><th>渡せるもの</th><th>渡せないもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">文字列・数値・真偽値・null</td><td>関数(サーバー側の処理として登録したものを除く)</td></tr>
          <tr><td className="hl">配列・素のオブジェクト</td><td>クラスのインスタンス</td></tr>
          <tr><td className="hl">日付・Map・Set</td><td>DBの接続や、そこから返る独自オブジェクト</td></tr>
          <tr><td className="hl">JSX(描画済みの結果として)</td><td>環境変数を含んだ設定オブジェクトなど、秘密を含むもの</td></tr>
        </tbody>
      </table>

      <p>
        最後の行は機能ではなく<Term>安全</Term>の話です。propsとして渡した値は、実質的に<Term>ブラウザから読める</Term>と考えます。「表示には使っていないから大丈夫」は通用しません。
      </p>

      <Heading num="05">どちらに置くかの判断</Heading>
      <table>
        <thead>
          <tr><th>要件</th><th>置き場所</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">状態・イベントハンドラ</td><td>ブラウザ側</td></tr>
          <tr><td className="hl">ブラウザ固有のAPIに触る</td><td>ブラウザ側</td></tr>
          <tr><td className="hl">カスタムフックを使う</td><td>ブラウザ側</td></tr>
          <tr><td className="hl">データベースや鍵に触る</td><td>サーバー側</td></tr>
          <tr><td className="hl">大きな依存を使って結果だけ表示する</td><td>サーバー側(依存ごと送らずに済む)</td></tr>
          <tr><td className="hl">どちらでもよい</td><td>サーバー側(既定のまま)</td></tr>
        </tbody>
      </table>

      <p>
        5行目は見落とされがちな効きどころです。文章の整形やコードの色付けのように<Term>大きなライブラリを使うが結果は静的</Term>な処理は、サーバー側に置けばライブラリごと送らずに済みます。
      </p>

      <Analogy label="💡 たとえるなら">
        サーバー側の部品は厨房で仕上げて出す料理、ブラウザ側の部品は客席で客が自分で焼く焼肉です。焼く必要があるものだけをテーブルに出し、前菜やご飯は厨房で完成させてしまうほうが、運ぶ荷物は少なく済みます。そして<code>children</code>で差し込むのは、<strong>焼き網の上に、すでに調理済みの一皿を載せる</strong>ようなもの ― 網はテーブルにありますが、その皿は厨房で作られています。
      </Analogy>

      <Heading num="まとめ">葉で切り、childrenで越える</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>既定はサーバー側</h4>
          <p>コードが送られず、鍵に触れ、そのまま<code>await</code>できる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>境界は下へ伝播する</h4>
          <p>1ファイルの話ではない。できるだけ葉に近いところで切る。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>渡した値はブラウザから読める</h4>
          <p>表示に使っていなくても同じ。秘密を props に載せない。</p>
        </Card>
      </CardGrid>

      <p>
        境界が引けたら、次はサーバー側で取ったデータをどう保つか ―
        <Link href="/frontend/nextjs-data">データフェッチ・キャッシュ・再検証</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/nextjs-components" />
    </DocsPage>
  );
}
