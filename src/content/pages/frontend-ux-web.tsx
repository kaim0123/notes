import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "Web UIデザイン" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>Web UIデザイン ― 画面の大きさが分からない前提で作る</h1>
        <Lead>
          Webが他の画面と決定的に違うのは、<Term>表示される環境を作り手が選べない</Term>ことです。幅も、文字サイズも、入力手段も、通信速度も分かりません。この不確定さを前提にした作り方が、Web特有のUIデザインになります。
        </Lead>
      </Hero>

      <Heading num="01">構造と見た目を分ける</Heading>
      <p>
        Webページは、文書の構造を表すHTMLと、見た目を表すCSSに役割を分けて作ります。分けておくと、デザインだけを差し替えたり、複数ページの見た目を一括で変えたりできます。
      </p>
      <p>
        ただし本当の理由はもう1つあります。<Term>見た目が適用されない状態でも意味が通る</Term>ことです。CSSが読めない環境、読み上げソフト、検索エンジンのクローラー ― これらはHTMLの構造だけを見ます。見た目のために構造をねじ曲げると、この層で意味が壊れます。実装の詳細は<Link href="/frontend/web">Web基礎</Link>で扱いました。
      </p>

      <Analogy label="💡 たとえるなら">
        HTMLとCSSの関係は原稿とレイアウト指定です。原稿はそのままに、フォントや余白の指示書だけを差し替えれば、雑誌風にも新聞風にも仕上がります。そして指示書が届かなくても、原稿だけで内容は読めます。
      </Analogy>

      <Heading num="02">ワイヤーフレーム ― 装飾を我慢する下書き</Heading>
      <p>
        <Term>ワイヤーフレーム</Term>は、色や装飾を省いて<Term>どこに何を置くか</Term>だけを描いた設計図です。作り込む前に配置を検討できるため、早い段階で情報の優先順位と操作の流れを合意できます。
      </p>
      <p>
        意図的に色を使わないことに意味があります。色が付いていると、人はまず色の話をします。「このボタンは青がいい」という議論が始まった時点で、<Term>そもそもこのボタンが要るのか</Term>という議論は終わってしまいます。
      </p>

      <Heading num="03">レスポンシブ ― 1つのHTMLが応答する</Heading>
      <p>
        <Term>レスポンシブWebデザイン</Term>は、1つのHTMLで画面幅に応じてレイアウトを切り替える手法です。PC用とスマホ用に別ページを用意する方式に比べ、管理が1本で済み、どの端末にも同じ内容が届きます。
      </p>

      <DiagramFrame
        slug="frontend-ux-web-responsive"
        aspect="640 / 300"
        caption="1つのHTMLが画面幅に応じて異なるレイアウトになる様子を示した図。左は狭い画面で、ヘッダーの下に本文とサイドバーの内容が縦に積まれ、ナビゲーションは畳まれている。中央は中くらいの画面で、カードが2列に並ぶ。右は広い画面で、本文とサイドバーが横に並び、ナビゲーションは展開されている。3つとも中身のHTMLは同じで、切り替えているのはCSSだけであることが下部に注記されている。あわせて、狭い画面を既定として書き、広い画面で上書きしていくのが基本の順序であることが示されている。"
      />

      <table>
        <thead>
          <tr><th>手段</th><th>切り替えの基準</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">メディアクエリ</td><td>画面の幅。ページ全体の骨格を変えるときに使う</td></tr>
          <tr><td className="hl">コンテナクエリ</td><td>親要素の幅。同じ部品を狭い場所にも広い場所にも置けるようになる</td></tr>
          <tr><td className="hl">自動で折り返すレイアウト</td><td>そもそも切り替えない。<code>auto-fit</code>や<code>flex-wrap</code>に任せる</td></tr>
          <tr><td className="hl">可変の値</td><td><code>clamp()</code>で最小・可変・最大を1行にする</td></tr>
        </tbody>
      </table>

      <p>
        書く順序は<Term>狭い画面を既定にする</Term>のが基本です。狭い画面は制約が厳しいので、そこから始めれば「本当に必要なもの」が先に決まります。逆にPCから作り始めると、狭い画面で入りきらないものを削る作業になり、たいてい削り方が乱暴になります。
      </p>

      <Heading num="04">幅以外に変わるもの</Heading>
      <p>
        レスポンシブというと幅の話になりがちですが、<Term>変わるのは幅だけではありません</Term>。
      </p>

      <table>
        <thead>
          <tr><th>変わるもの</th><th>設計への影響</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">入力手段</td><td>タッチではホバーが存在しない。ホバーでしか出ない情報は届かない</td></tr>
          <tr><td className="hl">指先の大きさ</td><td>タップ領域を十分に取る。密集した小さなリンクは押し間違える</td></tr>
          <tr><td className="hl">文字サイズ設定</td><td>利用者が拡大している前提。固定の高さは崩れる</td></tr>
          <tr><td className="hl">通信速度</td><td>同じページが何倍も遅く届く。<Link href="/frontend/perf">表示速度</Link>の前提</td></tr>
          <tr><td className="hl">縦横の向き</td><td>横向きでは高さが極端に低くなる。縦に長い固定要素が邪魔になる</td></tr>
        </tbody>
      </table>

      <Aside label="ホバーに情報を隠さない">
        ツールチップ、ホバーで現れるメニュー、マウスを載せると出る操作ボタン ― どれもタッチ環境では存在しないか、タップで代替されて誤操作を生みます。<Term>ホバーは補助であって、唯一の経路にしない</Term>。同じ内容にキーボードとタッチからも到達できるかを確かめます。
      </Aside>

      <Heading num="まとめ">分けて、下書きして、応答させる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>構造と見た目を分ける</h4>
          <p>見た目が適用されない状態でも意味が通ることが、本当の目的。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>下書きから色を抜く</h4>
          <p>色が付いた瞬間、議論は色の話になる。装飾を我慢することに意味がある。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>変わるのは幅だけではない</h4>
          <p>入力手段・文字サイズ・通信速度・向き。ホバーを唯一の経路にしない。</p>
        </Card>
      </CardGrid>

      <p>
        次は、こうして作った画面を<Term>部品として使い回す</Term>ための枠組み ―
        <Link href="/frontend/ux-system">コンポーネントとデザインシステム</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/ux-web" />
    </DocsPage>
  );
}
