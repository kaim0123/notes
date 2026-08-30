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
  Aside,
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "CSSレイアウト",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>CSSレイアウト ― 要素をどう並べ、どう重ねるか</h1>
        <Lead>
          <Link href="/dev/frontend/web-basics">Web基礎</Link>では、すべての要素が箱であること(ボックスモデル)まで見ました。ここでは、その箱を<strong>どう並べるか</strong>を決める仕組みを扱います。<Term>Flexbox</Term>で1方向に並べ、<Term>Grid</Term>で2次元の区画を切り、<Term>position</Term>で流れから外し、<Term>z-index</Term>で重なりを決める ― この4つが分かれば、画面の配置はほぼ表現できます。<Link href="/dev/frontend/tailwind">Tailwind CSS</Link>の<code>flex</code>や<code>grid</code>といったクラスも、結局はここで学ぶプロパティを短く書いているだけです。
        </Lead>
      </Hero>

      <Heading num="01">通常フロー ― 何も指定しないときの並び方</Heading>
      <p>レイアウトの指定を何もしなければ、要素は<Term>通常フロー(normal flow)</Term>と呼ばれる既定の規則で並びます。ここを理解しないまま<code>flex</code>を足すと、「なぜ効かないのか」が分からなくなります。</p>
      <table>
        <thead>
          <tr><th>表示種別</th><th>並び方</th><th>代表的な要素</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ブロック(<code>block</code>)</td><td>親の幅いっぱいに広がり、上から下へ積まれる</td><td><code>div</code> <code>p</code> <code>section</code></td></tr>
          <tr><td className="hl">インライン(<code>inline</code>)</td><td>文章の流れに沿って左から右へ並ぶ。幅・高さの指定が効かない</td><td><code>span</code> <code>a</code> <code>strong</code></td></tr>
          <tr><td className="hl">インラインブロック</td><td>並び方はインライン、中身の扱いはブロック(幅・高さが効く)</td><td><code>img</code> <code>button</code></td></tr>
        </tbody>
      </table>
      <p>そして<code>display: flex</code>や<code>display: grid</code>を指定すると、その要素は<Term>コンテナ</Term>になり、<strong>直接の子要素だけ</strong>が通常フローとは別の規則で並べられます。孫要素には影響しません ― これが最初につまずきやすい点です。</p>

      <Heading num="02">Flexbox ― 1方向に並べる</Heading>
      <p><Term>Flexbox</Term>は、子要素を<strong>1本の軸</strong>に沿って並べる仕組みです。ヘッダーの左右振り分け、ボタンの横並び、カードの縦積みなど、日常的なレイアウトの大半はこれで足ります。</p>
      <p>要になるのは<Term>主軸(main axis)</Term>と<Term>交差軸(cross axis)</Term>という2本の軸です。<code>flex-direction</code>が主軸の向きを決め、<code>justify-content</code>は<strong>主軸方向</strong>の配置、<code>align-items</code>は<strong>交差軸方向</strong>の配置を指定します。この対応さえ覚えれば、プロパティ名で迷うことはありません。</p>
      <Diagram caption="flex-direction: row のとき、主軸は横・交差軸は縦になる">
        <svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg">
          <rect x={40} y={40} width={400} height={110} rx="8" fill="none" stroke="#5f5f5f" strokeDasharray="4 4" />
          <text x={40} y={32} fill="#9a9a9a" fontSize="11">display: flex</text>

          <rect x={60} y={65} width={70} height={60} rx="5" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <rect x={145} y={65} width={70} height={60} rx="5" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <rect x={230} y={65} width={70} height={60} rx="5" fill="none" stroke="#39ff6a" strokeWidth="1.5" />

          <line x1={60} y1={170} x2={420} y2={170} stroke="#39ff6a" strokeWidth="1.5" />
          <path d="M420 170 l-8 -4 v8 z" fill="#39ff6a" />
          <text x={180} y={190} fill="#39ff6a" fontSize="11">主軸 ― justify-content</text>

          <line x1={20} y1={40} x2={20} y2={150} stroke="#9a9a9a" strokeWidth="1.5" />
          <path d="M20 150 l-4 -8 h8 z" fill="#9a9a9a" />
          <text x={12} y={30} fill="#9a9a9a" fontSize="11">交差軸</text>
        </svg>
      </Diagram>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`.header {
  display: flex;
  flex-direction: row;        /* 主軸を横に(既定値) */
  justify-content: space-between;  /* 主軸方向: 両端に寄せる */
  align-items: center;        /* 交差軸方向: 中央揃え */
  gap: 16px;                  /* 子要素の間隔。margin より扱いやすい */
}`}</code>
      </pre>
      <table>
        <thead>
          <tr><th>プロパティ</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>flex-direction</code></td><td><code>row</code>(横) / <code>column</code>(縦)。主軸の向きを切り替える</td></tr>
          <tr><td className="hl"><code>justify-content</code></td><td>主軸方向の詰め方。<code>flex-start</code> <code>center</code> <code>space-between</code>など</td></tr>
          <tr><td className="hl"><code>align-items</code></td><td>交差軸方向の揃え方。<code>stretch</code>(既定) <code>center</code> <code>flex-start</code>など</td></tr>
          <tr><td className="hl"><code>gap</code></td><td>子要素どうしの間隔。端には隙間が付かない</td></tr>
          <tr><td className="hl"><code>flex-wrap</code></td><td><code>wrap</code>で入りきらない子を折り返す(既定は折り返さない)</td></tr>
        </tbody>
      </table>
      <p>子要素側では<code>flex</code>プロパティで「余った空間をどう分けるか」を指定します。<code>flex: 1</code>は<code>flex-grow:1; flex-shrink:1; flex-basis:0</code>の略で、「基準幅を0として、余りを等分に取る」という意味です。サイドバーを固定幅、本文を<code>flex:1</code>にする構成が典型例です。</p>
      <Aside label="⚠️ よくある落とし穴">
        Flexの子要素は既定で<code>min-width: auto</code>を持ち、<strong>中身より小さくなりません</strong>。長いテキストや<code>overflow-x: auto</code>を入れた子がはみ出すのはこれが原因で、<code>min-width: 0</code>(Tailwindなら<code>min-w-0</code>)を指定すると解決します。
      </Aside>

      <Heading num="03">Grid ― 2次元で区画を切る</Heading>
      <p><Term>Grid</Term>は、行と列という<strong>2方向</strong>の格子を先に定義し、そこへ子要素を配置する仕組みです。Flexboxが「並べた結果として位置が決まる」のに対し、Gridは「先に器を決めてから中身を置く」という順序になります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
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
      <p>2つ目の<code>repeat(auto-fit, minmax(240px, 1fr))</code>は覚えておく価値があります。「最低240px、余裕があれば伸びる列を、入るだけ並べる」という意味で、<Term>メディアクエリを1つも書かずに</Term>レスポンシブなカード一覧が完成します。実際このサイトの<code>CardGrid</code>もこの指定です。</p>
      <table>
        <thead>
          <tr><th>プロパティ</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>grid-template-columns</code></td><td>列の数と幅を定義する。<code>fr</code>は余白の分配比率を表す単位</td></tr>
          <tr><td className="hl"><code>grid-template-rows</code></td><td>行の高さを定義する。省略すると中身に応じて自動で決まる</td></tr>
          <tr><td className="hl"><code>grid-column: span 2</code></td><td>子要素が列を2つ分またぐ</td></tr>
          <tr><td className="hl"><code>grid-template-areas</code></td><td>区画に名前を付け、レイアウトを文字で図示するように書く</td></tr>
          <tr><td className="hl"><code>place-items</code></td><td>各セル内での縦横の揃え方をまとめて指定する</td></tr>
        </tbody>
      </table>

      <Heading num="04">FlexとGrid ― どちらを選ぶか</Heading>
      <p>どちらでも組めることは多いのですが、判断の軸は「<strong>配置を決めるのは親か、中身か</strong>」です。</p>
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
      <p>実務では<strong>入れ子にして併用</strong>します。ページ全体の骨格をGridで切り、その各区画の中身をFlexboxで並べる ― これが最も素直な組み方です。</p>

      <Heading num="05">position ― 通常フローから外す</Heading>
      <p><code>position</code>は、要素を通常フローから外して自由な位置に置くためのプロパティです。バッジ・ドロップダウン・固定ヘッダーなど、「他の要素の上に乗せたい」場面で使います。</p>
      <table>
        <thead>
          <tr><th>値</th><th>挙動</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>static</code></td><td>既定値。通常フローのまま。<code>top</code>等は効かない</td></tr>
          <tr><td className="hl"><code>relative</code></td><td>元の位置を<strong>占めたまま</strong>、見た目だけずれる。子の<code>absolute</code>の基準にもなる</td></tr>
          <tr><td className="hl"><code>absolute</code></td><td>フローから外れ、最も近い<code>static</code>以外の祖先を基準に配置される</td></tr>
          <tr><td className="hl"><code>fixed</code></td><td>フローから外れ、ビューポート(画面)を基準に固定される</td></tr>
          <tr><td className="hl"><code>sticky</code></td><td>通常フローに従うが、指定位置に達するとその場に貼り付く</td></tr>
        </tbody>
      </table>
      <p>最も重要なのは<code>absolute</code>の<Term>基準(包含ブロック)</Term>の決まり方です。「最も近い、<code>position</code>が<code>static</code>以外の祖先」が基準になります。つまり<strong>親に<code>relative</code>を付けて、子に<code>absolute</code></strong>という組み合わせが定石です。親に付け忘れると、基準がページ全体まで遡ってしまい、意図しない場所に飛びます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`.avatar {
  position: relative;   /* ← これが子の基準になる */
}
.badge {
  position: absolute;   /* .avatar の右上に重ねる */
  top: -4px;
  right: -4px;
}`}</code>
      </pre>

      <Heading num="06">重なり順 ― z-indexとスタッキングコンテキスト</Heading>
      <p>要素が重なったとき、どちらが手前に来るかを決めるのが<Term>z-index</Term>です。ただし数値が大きいほど必ず手前、という単純な話ではありません。「<code>z-index: 9999</code>にしたのにモーダルの裏に隠れる」という現象の原因が<Term>スタッキングコンテキスト</Term>です。</p>
      <p>スタッキングコンテキストとは、<strong>重なり順を比較する土俵</strong>のことです。ある要素がスタッキングコンテキストを作ると、その子孫の<code>z-index</code>は<strong>その内側でしか比較されません</strong>。親どうしの順序が先に決まり、子がいくら大きな値を持っていても親の順序を追い越せないのです。</p>
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
        スタッキングコンテキストは、トーナメント表のブロックです。ある選手がどれだけ強くても(<code>z-index: 9999</code>)、自分の所属ブロックが1回戦で負ければ、決勝の舞台には立てません。順位はまずブロックどうしで決まり、その中の順位は内側だけの話なのです。だから「手前に出したい要素の<code>z-index</code>を上げる」のではなく、「どの土俵で戦っているか」をまず確認するのが正しい手順になります。
      </Analogy>
      <Aside label="実務での対処">
        モーダル・トースト・ツールチップのように「必ず最前面に出したい」ものは、<code>z-index</code>を上げるのではなく、DOM上で<code>body</code>直下へ描画する(Reactの<code>createPortal</code>)のが確実です。土俵そのものを最上位に移してしまう発想です。あわせて、<code>z-index</code>の値はアプリ全体で<code>--z-modal: 100</code>のような変数に集約し、その場しのぎの数値を散らかさないようにします。
      </Aside>

      <Heading num="07">Tailwindでの対応</Heading>
      <p><Link href="/dev/frontend/tailwind">Tailwind CSS</Link>のクラスは、ここまでのプロパティにほぼ1対1で対応します。プロパティを知っていれば、クラス名は自然に読めます。</p>
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
      <p><code>repeat(auto-fit, minmax(240px,1fr))</code>のような複雑な値は、Tailwindでは<code>grid-cols-[repeat(auto-fit,minmax(240px,1fr))]</code>という任意値記法で書きます。結局CSSを書いているので、<strong>CSSを知らずにTailwindだけを覚える</strong>ことはできません。</p>

      <Heading num="まとめ">器を決めてから、中身を置く</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>Flexは1方向、Gridは2方向</h4><p>並べた結果で決まるならFlex、先に区画を切るならGrid。骨格をGrid、中身をFlexで入れ子にするのが定石。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>absoluteは親のrelativeが基準</h4><p>基準は「最も近いstatic以外の祖先」。親にrelativeを付け忘れるとページ全体まで遡る。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>z-indexは土俵の中でしか効かない</h4><p>スタッキングコンテキストを跨いだ比較はできない。最前面が必要ならPortalでDOMごと移す。</p></Card>
      </CardGrid>
      <p>配置ができたら、次はその画面が<strong>誰にでも使えるか</strong>です。マウス以外の操作手段や、読み上げソフトから見た構造を扱う<Link href="/dev/frontend/a11y">アクセシビリティ実装</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/web-basics" tag="フロントエンド">Web基礎</RelatedLink>
            <RelatedLink href="/dev/frontend/tailwind" tag="フロントエンド">Tailwind CSS</RelatedLink>
            <RelatedLink href="/dev/frontend/ux/web" tag="設計">Web UIデザイン</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
