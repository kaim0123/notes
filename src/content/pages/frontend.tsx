import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  DocsFooter,
  Card,
  CardGrid,
  CardNumber,
} from "@/components/docs";

export const metadata: Metadata = { title: "フロントエンド" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>フロントエンド</h1>
        <Lead>
          利用者が直接触れる<Term>画面側の実装</Term>を扱うセクションです。ブラウザが解釈するHTMLとCSSという土台から、見た目の組み立て方、サーバーとのやり取りとデータの置き場所、使う人の側から見た設計、そして部品と状態の分け方へと進み、最後にReactとNext.jsという具体的な道具に降ります。言語そのもの(JavaScript・TypeScript)は<Link href="/language">言語</Link>セクション、APIの向こう側は<Link href="/backend">バックエンド</Link>セクションの担当です。
        </Lead>
      </Hero>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>
            <Link href="/frontend/web">Web基礎</Link>
          </h4>
          <p>
            HTML・CSS・DOM。ブラウザが何を受け取り、どう画面にするかという土台。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>
            <Link href="/frontend/styling">スタイリング</Link>
          </h4>
          <p>
            箱をどう並べ、どう重ねるか。素のCSSと、その上に乗るTailwindの位置づけ。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>
            <Link href="/frontend/data">通信とデータ保存</Link>
          </h4>
          <p>
            サーバーと話す手段(取りに行く / 届く)と、ブラウザに何をどこまで置くか。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>
            <Link href="/frontend/ux">UX・UI</Link>
          </h4>
          <p>
            使う人から見た設計。調べ方・作り方・見せ方と、誰もが使えるようにする配慮。
          </p>
        </Card>
        <Card>
          <CardNumber>5</CardNumber>
          <h4>
            <Link href="/frontend/components">コンポーネントと状態</Link>
          </h4>
          <p>
            画面をどの単位で部品に切るか。その部品が抱える状態をどこに置くか。
          </p>
        </Card>
        <Card>
          <CardNumber>6</CardNumber>
          <h4>
            <Link href="/frontend/react">React</Link>
          </h4>
          <p>
            宣言的にUIを書く。JSX・Props・State・Effect・Refという中核の語彙。
          </p>
        </Card>
        <Card>
          <CardNumber>7</CardNumber>
          <h4>
            <Link href="/frontend/nextjs">Next.js</Link>
          </h4>
          <p>
            サーバーとクライアントの境界を引き、ルーティング・データ取得・配信をまとめる。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/frontend" />
    </DocsPage>
  );
}
