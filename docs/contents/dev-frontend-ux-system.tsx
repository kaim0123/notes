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
  title: "コンポーネントとデザインシステム",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>コンポーネントとデザインシステム ― 部品として再利用する</h1>
        <Lead>
          画面を1枚ずつ手作りすると、ボタンの角丸やフォームのエラー表示がページごとにバラけます。<Term>コンポーネント</Term>として部品化し、<Term>デザインシステム</Term>でルールとトークンを共有すると、ReactやTailwindでの実装が速く、保守も楽になります。
        </Lead>
      </Hero>

      <Heading num="01">UIコンポーネント ― 繰り返し現れる部品</Heading>
      <p>多くの画面で同じパターンが繰り返されます。部品ごとに役割と設計の要点を揃えておくと、実装の判断が減ります。</p>
      <table>
        <thead>
          <tr>
            <th>部品</th>
            <th>役割</th>
            <th>設計の要点</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">ボタン</td>
            <td>操作を促す。Primary(主操作)とSecondary(副操作)を区別</td>
            <td>1画面にPrimaryは1つが目安。無効状態・ローディング状態も定義</td>
          </tr>
          <tr>
            <td className="hl">フォーム</td>
            <td>入力・選択・送信。ラベルと入力欄の対応</td>
            <td>エラーはフィールド近くに。placeholderだけにラベルを頼らない</td>
          </tr>
          <tr>
            <td className="hl">ダイアログ</td>
            <td>確認・警告・短い入力。主画面の操作を一時中断</td>
            <td>閉じ方(Esc・背景クリック)とフォーカス管理を決める</td>
          </tr>
          <tr>
            <td className="hl">タブ</td>
            <td>同階層の内容を切り替え。設定画面など</td>
            <td>現在位置が分かる表示。中身が独立ページならURLも検討</td>
          </tr>
          <tr>
            <td className="hl">テーブル</td>
            <td>行と列のデータ一覧。ソート・フィルタと組み合わせる</td>
            <td>列数が多いときは横スクロールか列の取捨選択</td>
          </tr>
          <tr>
            <td className="hl">カード</td>
            <td>関連情報を1つの枠にまとめる。一覧の単位</td>
            <td>クリック可能なら全体をタップ領域に。影と余白でグルーピング</td>
          </tr>
        </tbody>
      </table>
      <p>GUI部品の詳細(ウィンドウ・メニュー・標準フォーム部品など)は<Link href="/dev/frontend/ux/gui">GUIの部品</Link>、Web向けの画面設計は<Link href="/dev/frontend/ux/screen">画面設計と入力チェック</Link>も参照してください。</p>

      <Heading num="02">Atomic Design ― 部品の粒度</Heading>
      <p>Brad Frostの<Term>Atomic Design</Term>は、UIを次の5段階の粒度で分解する考え方です。</p>
      <table>
        <thead>
          <tr>
            <th>段階</th>
            <th>内容</th>
            <th>例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Atoms(原子)</td>
            <td>これ以上分けられない最小部品</td>
            <td>ボタン、入力欄、ラベル、アイコン</td>
          </tr>
          <tr>
            <td className="hl">Molecules(分子)</td>
            <td>原子の組み合わせ</td>
            <td>ラベル+入力欄、検索ボックス</td>
          </tr>
          <tr>
            <td className="hl">Organisms(有機体)</td>
            <td>分子のまとまり</td>
            <td>ヘッダー、フォーム全体、カード一覧</td>
          </tr>
          <tr>
            <td className="hl">Templates(テンプレート)</td>
            <td>レイアウトの骨組み。中身はプレースホルダ</td>
            <td>2カラム+サイドバーの枠</td>
          </tr>
          <tr>
            <td className="hl">Pages(ページ)</td>
            <td>実データを載せた完成形</td>
            <td>具体的な商品一覧ページ</td>
          </tr>
        </tbody>
      </table>
      <p>Reactでは、Atoms/Moleculesが小さなコンポーネント、Organisms/Pagesがページ断片やレイアウトに対応することが多いです。見た目の粒度をコードの責務分割に落とす手順は<Link href="/dev/frontend/components">コンポーネント設計</Link>、組み合わせの実装パターンは<Link href="/dev/frontend/react/composition">コンポーネントを組み合わせる</Link>で扱います。</p>

      <Analogy label="💡 たとえるなら">
        Atomic Designは「LEGO」です。最小ブロック(原子)を組み合わせて車(有機体)を作り、説明書(テンプレート)に沿って街(ページ)を並べます。同じブロックを使い回すほど、形が揃い、追加も速くなります。
      </Analogy>

      <Heading num="03">Design Token ― デザイン値を名前で共有</Heading>
      <p><Term>Design Token</Term>は、色・フォントサイズ・余白・角丸などのデザイン値に、<code>color.primary</code>のような名前を付けてコードとデザインツールの両方で共有する仕組みです。</p>
      <p>Token化の利点は、ブランドカラー変更時に1箇所を直せば全体に反映されること、ダークモード切り替えをTokenセットの差し替えで行えることです。CSSでは<code>:root</code>のカスタムプロパティ、Tailwindでは<code>theme.extend</code>でToken相当の値を定義します(<Link href="/dev/frontend/ux/visual">視覚デザイン</Link>)。</p>

      <Heading num="04">コンポーネントライブラリとデザインシステム</Heading>
      <p><Term>コンポーネントライブラリ</Term>は、Button・Dialogなど実装済み部品の集合です。Storybookで部品カタログを公開したり、npmパッケージとして社内共有したりします。</p>
      <p><Term>デザインシステム</Term>は、コンポーネントライブラリに加え、使い方のガイドライン(いつPrimaryボタンを使うか、エラー文言のトーンなど)とDesign Tokenを含む<strong>設計の共通言語</strong>全体を指します。Material Design、Apple HIG、社内DSなど、プロダクトの規模が大きくなるほど整備の価値が上がります。</p>
      <p>フロントエンド実装では、shadcn/uiのように「コピーして自分のコードベースに置く」方式や、Radix UIのようなヘッドレス(見た目なし)プリミティブをTailwindで装飾する方式がよく使われます。いずれも、上記の部品設計とTokenの考え方が前提になります。</p>

      <Heading num="まとめ">部品・粒度・Token・ルール</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>代表部品の役割を揃える</h4>
          <p>ボタン・フォーム・ダイアログなど、繰り返しパターンを表で共有します。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>Atomic Designで粒度を分ける</h4>
          <p>原子→分子→有機体と、Reactコンポーネントの分割に対応づけます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>Tokenとガイドでスケール</h4>
          <p>Design Tokenとライブラリ+ルールが、デザインシステムの本体です。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/components" tag="フロントエンド">
              コンポーネント設計
            </RelatedLink>
            <RelatedLink href="/dev/frontend/react" tag="フロントエンド">
              React
            </RelatedLink>
            <RelatedLink href="/dev/frontend/react/composition" tag="フロントエンド">
              コンポーネントを組み合わせる
            </RelatedLink>
            <RelatedLink href="/dev/frontend/tailwind" tag="フロントエンド">
              Tailwind CSS
            </RelatedLink>
            <RelatedLink href="/dev/frontend/ux/gui" tag="設計">
              GUIの部品
            </RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
