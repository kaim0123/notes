import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "UX・UI" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>UX・UI ― 画面を書く前に決めておくこと</h1>
        <Lead>
          ここまでは「どう作るか」の話でした。この見出しは<Term>何を作るか、誰のために作るか</Term>を扱います。実装の前にここが決まっていないと、きれいに書かれたコンポーネントが使いにくい画面を構成する、ということが普通に起こります。逆にここが決まっていれば、実装中の細かい判断がほとんど自動的に決まります。
        </Lead>
      </Hero>

      <Heading num="01">UX・UI・ユーザビリティ ― 指す範囲が違う</Heading>
      <p>
        3つはよく一緒に語られますが、レイヤーが異なります。
      </p>

      <table>
        <thead>
          <tr><th>用語</th><th>指す範囲</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">UX(体験)</td><td>製品・サービス全体を通じて得る体験。目的達成のしやすさ、満足度、感情まで</td></tr>
          <tr><td className="hl">UI(接点)</td><td>画面・ボタン・入力欄など、人とシステムが触れる部分そのもの</td></tr>
          <tr><td className="hl">ユーザビリティ</td><td>特定の利用者が、目的をどれだけ効果的・効率的・満足に達成できるか</td></tr>
          <tr><td className="hl">アクセシビリティ</td><td>利用できる人の幅の広さ。誰もが使えるか</td></tr>
        </tbody>
      </table>

      <p>
        UIはUXを形にする手段の1つです。ボタンの配置や色が整っていても、全体の流れが分かりにくければ体験は悪いままです。逆に体験の設計が固まっていれば、UIの判断も一貫します。
      </p>

      <Analogy label="💡 たとえるなら">
        レストランなら、UXは「味・待ち時間・接客・雰囲気を含めた食事全体」、UIは「メニュー表・テーブル配置・注文端末」です。メニューが読みやすくても、料理が1時間来なければ体験はよくありません。そしてアクセシビリティは、そもそも入口の段差で入れない人がいないか、という話です。
      </Analogy>

      <Heading num="02">この見出しの地図</Heading>
      <p>
        配下のページは、大きく<Term>調べる・決める・見せる・確かめる</Term>の4つに分かれます。順番に読む必要はなく、いま手が止まっているところから入るのが実用的です。
      </p>

      <DiagramFrame
        slug="frontend-ux-map"
        aspect="640 / 300"
        caption="UX・UIの配下を4つの段階に整理した図。調べる段階には、UXの基礎と人間中心設計と評価、デザイン思考が入る。決める段階には、画面設計と入力チェック、フォーム作成時の注意が入る。見せる段階には、視覚デザイン、GUIの部品、Web UIデザイン、コンポーネントとデザインシステムが入る。確かめる段階には、ユーザビリティとアクセシビリティが入る。4つは一方通行ではなく、確かめた結果が調べる段階へ戻る循環になっている。"
      />

      <table>
        <thead>
          <tr><th>段階</th><th>ページ</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">調べる</td>
            <td>
              <Link href="/frontend/ux-basics">UXの基礎</Link> /{" "}
              <Link href="/frontend/ux-hcd">人間中心設計と評価</Link> /{" "}
              <Link href="/frontend/ux-design-thinking">デザイン思考</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">決める</td>
            <td>
              <Link href="/frontend/ux-screen">画面設計と入力チェック</Link> /{" "}
              <Link href="/frontend/ux-form">フォーム作成時の注意</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">見せる</td>
            <td>
              <Link href="/frontend/ux-visual">視覚デザイン</Link> /{" "}
              <Link href="/frontend/ux-gui">GUIの部品</Link> /{" "}
              <Link href="/frontend/ux-web">Web UIデザイン</Link> /{" "}
              <Link href="/frontend/ux-system">コンポーネントとデザインシステム</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">確かめる</td>
            <td>
              <Link href="/frontend/ux-a11y">ユーザビリティとアクセシビリティ</Link>
            </td>
          </tr>
        </tbody>
      </table>

      <Heading num="03">実装者がここを知る理由</Heading>
      <p>
        「デザインは専門の人がやる」としても、実装者がこの領域を知っておく理由は3つあります。
      </p>

      <table>
        <thead>
          <tr><th>理由</th><th>中身</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">判断が降りてこない部分がある</td>
            <td>読み込み中の見せ方、エラー時の文言、空状態の表示 ― 実装時に初めて必要になる画面は指示に含まれないことが多い</td>
          </tr>
          <tr>
            <td className="hl">部品の粒度は実装側の判断</td>
            <td>デザインの見た目が同じでも、どこで部品を切るかはコードの都合。切り方を誤ると再利用できない</td>
          </tr>
          <tr>
            <td className="hl">実現できない指示に気付ける</td>
            <td>色だけで状態を示す、フォーカスの行き先が決まっていない ― 早く指摘できれば作り直しにならない</td>
          </tr>
        </tbody>
      </table>

      <Aside label="設計セクションとの境界">
        UI・UXの話題は、このフロントエンドセクションに一本化しています。<Link href="/design/architecture-app-gui">GUIアーキテクチャ</Link>のように、画面の裏側をどう組み立てるかという構造の話は設計セクションの担当です。<Term>使う人から見た話がこちら、コードの構造の話があちら</Term>という切り分けになります。
      </Aside>

      <Heading num="まとめ">先に決まっていれば、実装は速い</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>UIは手段、UXは目的</h4>
          <p>接点だけ整えても体験は改善しない。流れを先に見る。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>4つの段階で見る</h4>
          <p>調べる・決める・見せる・確かめる。止まっているところから入る。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>実装者にも判断が回ってくる</h4>
          <p>読み込み中・エラー・空状態は、たいてい指示に含まれていない。</p>
        </Card>
      </CardGrid>

      <p>
        まずは語彙と枠組みから ― <Link href="/frontend/ux-basics">UXの基礎</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/ux" />
    </DocsPage>
  );
}
