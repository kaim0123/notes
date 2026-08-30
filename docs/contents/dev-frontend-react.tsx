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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "React",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク・ライブラリ</Eyebrow>
        <h1>React ― 宣言的にUIを組み立てる</h1>
        <Lead>
          <Term>React</Term>はMeta(旧Facebook)が開発した、画面をコンポーネント単位で組み立てるためのフレームワークです。「コンピュータ基礎」の「<Link href="/network/applications/web">Webの仕組み</Link>」で見た通り、DOMを直接<code>appendChild</code>のような命令で書き換えていく方法は、状態が複雑になるほど「今どんな画面になっているか」を追いにくくなります。Reactは「このデータのときはこの見た目」という完成形だけを書く発想でこの問題に応えます。
        </Lead>
      </Hero>

      <Heading num="01">命令的UIと宣言的UIの違い</Heading>
      <p>ブラウザの画面を書き換える方法は、大きく2つに分けられます。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>書き方</th><th>状態が複雑になると</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">命令的(Imperative)</td><td>「この要素を追加、あの要素の色を変える」と手順を1つずつ指示する</td><td>どの手順を実行した結果、今の画面になっているかを追うのが難しくなる</td></tr>
          <tr><td className="hl">宣言的(Declarative)</td><td>「このデータのときはこの見た目」という完成形だけを書く</td><td>今のデータさえわかれば、画面がどうあるべきかは常に一意に決まる</td></tr>
        </tbody>
      </table>
      <p>Reactは<Term>宣言的UI</Term>を採用し、完成形の記述からDOMをどう更新するかという実際の作業は、React自身が引き受けます。開発者は「DOMをどう書き換えるか」ではなく「今の状態なら画面はどうあるべきか」だけを考えればよくなります。</p>
      <table>
        <thead>
          <tr><th>用語</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">コンポーネント</td><td>UIの部品を関数として表現したもの。組み合わせて画面全体を作る</td></tr>
          <tr><td className="hl">props</td><td>親コンポーネントから子コンポーネントに渡す入力値</td></tr>
          <tr><td className="hl">state(状態)</td><td>コンポーネントが内部で持つ、変化しうるデータ</td></tr>
          <tr><td className="hl">仮想DOM</td><td>実際のDOMの軽量なコピー。差分だけを計算し、必要な箇所だけ本物のDOMを更新する</td></tr>
        </tbody>
      </table>

      <Heading num="02">レンダリングの仕組み ― stateが変わると何が起きるか</Heading>
      <p>stateが変化すると、Reactはそのコンポーネントを再実行して新しい完成形(仮想DOM)を計算します。そのうえで前回計算した仮想DOMと今回のものを比較する<Term>差分検出(Reconciliation)</Term>を行い、実際に変わった部分だけを本物のDOMに反映します。DOMの書き換えはコストの高い処理のため、この「差分だけを最小限に反映する」仕組みが、宣言的に書きながらも実用的な速度を保つ鍵になっています。</p>

      <Heading num="03">3つの設計指針</Heading>
      <p>この宣言的UIという発想の上に、Reactは設計上の指針を3つ持っています。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>コンポーネント</h4><p>stateは必要最小限に持ち、データ取得などの副作用は<code>useEffect</code>で本体のロジックから分離し、繰り返し使う処理はカスタムフックとして再利用する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>単方向データフロー</h4><p>データは親から子へpropsで一方向にのみ流れる。複数の子で状態を共有したいときは、共通の親までstateを「リフトアップ」する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Composition(合成)</h4><p>大きな1つのコンポーネントを継承で拡張するのではなく、小さなコンポーネントを組み合わせて大きな画面を作る。</p></Card>
      </CardGrid>

      <Heading num="04">Reactだけでは足りないもの</Heading>
      <p>React自身が提供するのは、あくまで「コンポーネント単位でUIを宣言的に組み立てる」という部分だけです。複数ページ間の遷移を扱う<Term>ルーティング</Term>、サーバー側でHTMLを組み立てる<Term>SSR</Term>、ビルドやバンドルの設定などは、Reactの守備範囲に含まれません。次のページで見る<Term>Next.js</Term>は、これらの機能をReactの上に積み上げた<Term>メタフレームワーク</Term>です。</p>

      <Analogy label="💡 たとえるなら">
        命令的UIは「料理人に手順を1つずつ指示して料理を作らせる」ようなものです。「まず野菜を切って、次に炒めて…」と全工程を管理しなければなりません。宣言的UIのReactは「完成させたい料理の写真(データ)を渡すだけ」で、実際に鍋を振る作業(DOM更新)は厨房(React)に任せます。
      </Analogy>

      <Heading num="まとめ">完成形を書き、更新作業はReactに任せる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>宣言的UIで「今どうあるべきか」だけを書く</h4><p>DOMの手続き的な書き換えから解放される。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>差分検出で必要な箇所だけ更新</h4><p>stateが変わるたびに全体を作り直しているように見えて、実際のDOM更新は最小限に抑えられる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ルーティングやSSRは範囲外</h4><p>それらを補うのが次のページで見るNext.jsの役割。</p></Card>
      </CardGrid>
      <p>ReactにルーティングやSSRを足したものが「<Link href="/dev/frontend/nextjs">Next.js</Link>」です。この概要に続いて、まずは<Link href="/dev/frontend/react/functional">関数型としてReactを読む</Link>視点を押さえ、TypeScript・JSX・props・state・副作用・ref・メモ化・Contextという基礎から中核フックまでを順に見ていきます。そのうえで、ロジックの再利用・コンポーネントの組み合わせ・フォームの値管理といった実践的なパターンへ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/frontend/react/logic-reuse" tag="開発">ロジックを再利用する</RelatedLink>
                    <RelatedLink href="/dev/frontend/framework" tag="開発">フレームワーク・ライブラリ概要</RelatedLink>
                    <RelatedLink href="/dev/frontend/nextjs" tag="開発">Next.js</RelatedLink>
                    <RelatedLink href="/network/applications/web" tag="インターネット">Webの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
