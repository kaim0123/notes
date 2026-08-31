import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "CSSレイアウト" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>CSSレイアウト ― 要素をどう並べ、どう重ねるか</h1>
        <Lead>
          <Link href="/frontend/web">Web基礎</Link>で、すべての要素が箱であることまで見ました。ここではその箱を<Term>どう並べるか</Term>を決める仕組みを扱います。<Term>Flexbox</Term>で1方向に並べ、<Term>Grid</Term>で2次元の区画を切り、<Term>position</Term>で流れから外し、<Term>z-index</Term>で重なりを決める ― この4つで画面の配置はほぼ表現できます。
        </Lead>
      </Hero>

      <Heading num="01">通常フロー ― 何も指定しないときの並び方</Heading>
      <p>
        レイアウトの指定を何もしなければ、要素は<Term>通常フロー</Term>と呼ばれる既定の規則で並びます。ここを理解しないまま<code>flex</code>を足すと、「なぜ効かないのか」が分からなくなります。
      </p>

      <table>
        <thead>
          <tr><th>表示種別</th><th>並び方</th><th>代表的な要素</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ブロック</td><td>親の幅いっぱいに広がり、上から下へ積まれる</td><td><code>div</code> <code>p</code> <code>section</code></td></tr>
          <tr><td className="hl">インライン</td><td>文章の流れに沿って左から右へ。幅・高さの指定が効かない</td><td><code>span</code> <code>a</code> <code>strong</code></td></tr>
          <tr><td className="hl">インラインブロック</td><td>並びはインライン、中身の扱いはブロック(幅・高さが効く)</td><td><code>img</code> <code>button</code></td></tr>
        </tbody>
      </table>

      <p>
        <code>display: flex</code>や<code>display: grid</code>を指定すると、その要素は<Term>コンテナ</Term>になり、<Term>直接の子要素だけ</Term>が別の規則で並べられます。孫要素には影響しません ― これが最初につまずきやすい点です。
      </p>

      <Heading num="02">Flexbox ― 1方向に並べる</Heading>
      <p>
        Flexboxは子要素を<Term>1本の軸</Term>に沿って並べる仕組みです。ヘッダーの左右振り分け、ボタンの横並び、カードの縦積み ― 日常的なレイアウトの大半はこれで足ります。
      </p>
      <p>
        要は<Term>主軸</Term>と<Term>交差軸</Term>という2本の軸です。<code>flex-direction</code>が主軸の向きを決め、<code>justify-content</code>は主軸方向、<code>align-items</code>は交差軸方向の配置を指定します。この対応さえ覚えれば、プロパティ名で迷うことはありません。
      </p>

      <DiagramFrame
        slug="frontend-layout-flex-axes"
        aspect="640 / 280"
        caption="Flexboxの2本の軸を示した図。flex-directionがrowのとき、主軸は横方向で、その向きの詰め方をjustify-contentが決める。交差軸は縦方向で、その向きの揃え方をalign-itemsが決める。flex-directionをcolumnに変えると2本の軸が入れ替わり、justify-contentが縦の詰め方を、align-itemsが横の揃え方を意味するようになる。プロパティ名が上下左右ではなく軸で定義されているのはこのため。"
      />

      <pre>
        <code>{`.header {
  display: flex;
  flex-direction: row;             /* 主軸を横に(既定値) */
  justify-content: space-between;  /* 主軸方向: 両端に寄せる */
  align-items: center;             /* 交差軸方向: 中央揃え */
  gap: 16px;                       /* 子要素の間隔。margin より扱いやすい */
}`}</code>
      </pre>

      <table>
        <thead>
          <tr><th>プロパティ</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>flex-direction</code></td><td><code>row</code>(横) / <code>column</code>(縦)。主軸の向きを切り替える</td></tr>
          <tr><td className="hl"><code>justify-content</code></td><td>主軸方向の詰め方。<code>center</code> <code>space-between</code>など</td></tr>
          <tr><td className="hl"><code>align-items</code></td><td>交差軸方向の揃え方。既定は<code>stretch</code>(高さが揃う)</td></tr>
          <tr><td className="hl"><code>gap</code></td><td>子要素どうしの間隔。端には隙間が付かない</td></tr>
          <tr><td className="hl"><code>flex-wrap</code></td><td><code>wrap</code>で入りきらない子を折り返す(既定は折り返さない)</td></tr>
        </tbody>
      </table>

      <p>
        子要素側では<code>flex</code>で「余った空間をどう分けるか」を指定します。<code>flex: 1</code>は<Term>基準幅を0として、余りを等分に取る</Term>という意味です。サイドバーを固定幅、本文を<code>flex: 1</code>にする構成が典型例になります。
      </p>

      <Aside label="⚠️ はみ出しの原因はほぼこれ">
        Flexの子要素は既定で<code>min-width: auto</code>を持ち、<Term>中身より小さくなりません</Term>。長いテキストや横スクロールを入れた子が親からはみ出すのはこれが原因で、<code>min-width: 0</code>(Tailwindなら<code>min-w-0</code>)を指定すると解決します。理屈を知らないと延々と<code>overflow</code>をいじることになる、代表的な落とし穴です。
      </Aside>

      <Heading num="03">Grid ― 2次元で区画を切る</Heading>
      <p>
        Gridは行と列という<Term>2方向</Term>の格子を先に定義し、そこへ子要素を配置します。Flexboxが「並べた結果として位置が決まる」のに対し、Gridは<Term>先に器を決めてから中身を置く</Term>という順序です。
      </p>

      <pre>
        <code>{`.cards {
  display: grid;
  /* 1fr は「余った空間の1つ分」。3等分の列を作る */
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* 画面幅に応じて列数が自動で増減するカードグリッド */
.responsive-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}`}</code>
      </pre>

      <p>
        2つ目の<code>repeat(auto-fit, minmax(240px, 1fr))</code>は覚えておく価値があります。「最低240px、余裕があれば伸びる列を、入るだけ並べる」という意味で、<Term>メディアクエリを1つも書かずに</Term>レスポンシブなカード一覧が完成します。
      </p>

      <table>
        <thead>
          <tr><th>プロパティ</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>grid-template-columns</code></td><td>列の数と幅。<code>fr</code>は余白の分配比率を表す単位</td></tr>
          <tr><td className="hl"><code>grid-template-rows</code></td><td>行の高さ。省略すると中身に応じて自動で決まる</td></tr>
          <tr><td className="hl"><code>grid-column: span 2</code></td><td>子要素が列を2つ分またぐ</td></tr>
          <tr><td className="hl"><code>grid-template-areas</code></td><td>区画に名前を付け、レイアウトを文字で図示するように書く</td></tr>
          <tr><td className="hl"><code>place-items</code></td><td>各セル内での縦横の揃え方をまとめて指定する</td></tr>
        </tbody>
      </table>

      <Heading num="04">FlexとGrid ― どちらを選ぶか</Heading>
      <p>
        どちらでも組めることは多いのですが、判断の軸は<Term>配置を決めるのは親か、中身か</Term>です。
      </p>

      <table>
        <thead>
          <tr><th>状況</th><th>選ぶもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1方向に並べたい(ツールバー・ボタン列・縦積み)</td><td>Flexbox</td></tr>
          <tr><td className="hl">中身の量に応じて自然に伸縮させたい</td><td>Flexbox</td></tr>
          <tr><td className="hl">行と列の両方を揃えたい(表形式・カード一覧)</td><td>Grid</td></tr>
          <tr><td className="hl">ページ全体の骨格(ヘッダー・サイドバー・本文)</td><td>Grid</td></tr>
        </tbody>
      </table>

      <p>
        実務では<Term>入れ子にして併用</Term>します。ページ全体の骨格をGridで切り、その各区画の中身をFlexboxで並べる ― これが最も素直な組み方です。
      </p>

      <Heading num="05">position ― 通常フローから外す</Heading>
      <p>
        <code>position</code>は、要素を通常フローから外して自由な位置に置くためのプロパティです。バッジ・ドロップダウン・固定ヘッダーなど「他の要素の上に乗せたい」場面で使います。
      </p>

      <table>
        <thead>
          <tr><th>値</th><th>挙動</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>static</code></td><td>既定値。通常フローのまま。<code>top</code>等は効かない</td></tr>
          <tr><td className="hl"><code>relative</code></td><td>元の位置を占めたまま、見た目だけずれる。子の<code>absolute</code>の基準にもなる</td></tr>
          <tr><td className="hl"><code>absolute</code></td><td>フローから外れ、最も近い<code>static</code>以外の祖先を基準に配置される</td></tr>
          <tr><td className="hl"><code>fixed</code></td><td>フローから外れ、画面(ビューポート)を基準に固定される</td></tr>
          <tr><td className="hl"><code>sticky</code></td><td>通常フローに従うが、指定位置に達するとその場に貼り付く</td></tr>
        </tbody>
      </table>

      <p>
        最も重要なのは<code>absolute</code>の<Term>基準の決まり方</Term>です。基準になるのは「最も近い、<code>position</code>が<code>static</code>以外の祖先」。つまり<Term>親に<code>relative</code>、子に<code>absolute</code></Term>という組み合わせが定石で、親に付け忘れると基準がページ全体まで遡り、意図しない場所へ飛びます。
      </p>

      <Heading num="06">重なり順 ― z-indexとスタッキングコンテキスト</Heading>
      <p>
        要素が重なったときどちらが手前に来るかを決めるのが<code>z-index</code>です。ただし数値が大きいほど必ず手前、という単純な話ではありません。「<code>z-index: 9999</code>にしたのにモーダルの裏に隠れる」の原因が<Term>スタッキングコンテキスト</Term>です。
      </p>
      <p>
        スタッキングコンテキストとは<Term>重なり順を比較する土俵</Term>のことです。ある要素が土俵を作ると、その子孫の<code>z-index</code>は<Term>その内側でしか比較されません</Term>。親どうしの順序が先に決まり、子がいくら大きな値を持っていても親の順序を追い越せないのです。
      </p>

      <DiagramFrame
        slug="frontend-layout-stacking"
        aspect="640 / 320"
        caption="スタッキングコンテキストによって z-index が効かなくなる仕組みを示した図。左側の親要素は z-index が1で、その内側の子は z-index に9999を指定している。右側の親要素は z-index が2。比較はまず親どうしで行われるため、右の親が手前になり、その結果として左側の子は9999を指定していても右の親の裏に隠れる。子の値は親が作った土俵の内側でしか意味を持たない。下部に、最前面が必要ならDOM上の位置そのものを移すのが確実だという注記がある。"
      />

      <table>
        <thead>
          <tr><th>スタッキングコンテキストを作る主な条件</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>position</code>が<code>static</code>以外 かつ <code>z-index</code>が<code>auto</code>以外</td></tr>
          <tr><td className="hl"><code>opacity</code>が1未満</td></tr>
          <tr><td className="hl"><code>transform</code> <code>filter</code> <code>backdrop-filter</code>が指定されている</td></tr>
          <tr><td className="hl"><code>position: fixed</code> / <code>sticky</code></td></tr>
          <tr><td className="hl"><code>isolation: isolate</code>(意図的に土俵を作りたいときに使う)</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        スタッキングコンテキストはトーナメント表のブロックです。ある選手がどれだけ強くても(<code>z-index: 9999</code>)、自分の所属ブロックが1回戦で負ければ決勝の舞台には立てません。順位はまずブロックどうしで決まり、その中の順位は内側だけの話です。だから「手前に出したい要素の値を上げる」のではなく、<strong>どの土俵で戦っているか</strong>をまず確認するのが正しい手順になります。
      </Analogy>

      <Aside label="実務での対処">
        モーダル・トースト・ツールチップのように「必ず最前面に出したい」ものは、<code>z-index</code>を上げるのではなく、DOM上で<code>body</code>直下へ描画する(Reactの<code>createPortal</code>)のが確実です。土俵そのものを最上位に移してしまう発想です。あわせて、値はアプリ全体で変数に集約し、その場しのぎの数値を散らかさないようにします。
      </Aside>

      <Heading num="07">Tailwindでの対応</Heading>
      <p>
        <Link href="/frontend/tailwind">Tailwind CSS</Link>のクラスは、ここまでのプロパティにほぼ1対1で対応します。プロパティを知っていればクラス名は自然に読めます。
      </p>

      <table>
        <thead>
          <tr><th>CSS</th><th>Tailwind</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>display: flex; align-items: center; gap: 8px</code></td><td><code>flex items-center gap-2</code></td></tr>
          <tr><td className="hl"><code>justify-content: space-between</code></td><td><code>justify-between</code></td></tr>
          <tr><td className="hl"><code>flex-direction: column</code></td><td><code>flex-col</code></td></tr>
          <tr><td className="hl"><code>grid-template-columns: repeat(3, 1fr)</code></td><td><code>grid grid-cols-3</code></td></tr>
          <tr><td className="hl"><code>position: absolute; top: 0; right: 0</code></td><td><code>absolute top-0 right-0</code></td></tr>
          <tr><td className="hl"><code>z-index: 10</code></td><td><code>z-10</code></td></tr>
        </tbody>
      </table>

      <p>
        複雑な値は任意値記法で書けますが、結局CSSを書いていることに変わりはありません。<Term>CSSを知らずにTailwindだけを覚える</Term>ことはできない、というのがここでの結論です。
      </p>

      <Heading num="まとめ">器を決めてから、中身を置く</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>Flexは1方向、Gridは2方向</h4>
          <p>並べた結果で決まるならFlex、先に区画を切るならGrid。骨格をGrid、中身をFlexで入れ子にする。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>absoluteは親のrelativeが基準</h4>
          <p>基準は「最も近いstatic以外の祖先」。付け忘れるとページ全体まで遡る。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>z-indexは土俵の中でしか効かない</h4>
          <p>土俵を跨いだ比較はできない。最前面が必要ならDOMごと移す。</p>
        </Card>
      </CardGrid>

      <p>
        次は、ここで見たプロパティをクラス名として使う書き方 ―
        <Link href="/frontend/tailwind">Tailwind CSS</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/layout" />
    </DocsPage>
  );
}
