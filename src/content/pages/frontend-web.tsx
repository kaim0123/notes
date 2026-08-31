import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "Web基礎" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>Web基礎 ― ブラウザに渡す2つの材料</h1>
        <Lead>
          フロントエンドの仕事は、突き詰めれば<Term>ブラウザに渡す材料を用意すること</Term>です。材料は2つ ― 意味づけされた文書(HTML)と、その見せ方の規則(CSS)。ブラウザはこれをツリーに変換し、位置を計算し、画面に塗ります。ReactもTailwindも、最後はこの2つを生成する道具にすぎません。ここではその土台を押さえます。
        </Lead>
      </Hero>

      <p>
        HTMLがネットワークを越えて届くまでの流れはネットワークセクション、できあがったDOMをJavaScriptから触るAPIは<Link href="/language/js-browser">ブラウザ ― Web API</Link>の担当です。ここはその間 ― 届く材料そのものをどう書くかを見ます。
      </p>

      <Heading num="01">届いてから描かれるまで</Heading>
      <p>
        ブラウザは受け取ったHTMLを解析して<Term>DOM</Term>という木構造にし、CSSを解析して<Term>CSSOM</Term>にします。この2つを突き合わせて「画面に出る要素とその見た目」の木を作り、位置と大きさを計算し(<Term>レイアウト</Term>)、実際に色を置きます(<Term>ペイント</Term>)。
      </p>

      <DiagramFrame
        slug="frontend-web-render"
        aspect="640 / 250"
        caption="ブラウザが画面を描くまでの流れ。HTMLはDOMに、CSSはCSSOMに変換され、両者を突き合わせてレンダーツリーができる。そこから位置と大きさを計算するレイアウト、色を置くペイントへ進む。JavaScriptがDOMやスタイルを書き換えると、その変更点に応じてレイアウトから、あるいはペイントからやり直しになる。この「やり直しの範囲」が表示速度の話につながる。"
      />

      <p>
        JavaScriptがDOMを書き換えると、この工程の途中からやり直しになります。要素の位置に関わる変更ならレイアウトから、色だけならペイントから ― <Term>どこからやり直しになるかで負荷が変わる</Term>ことが、後の<Link href="/frontend/perf">表示速度</Link>の話の前提になります。
      </p>

      <Heading num="02">HTML ― 意味づけのための言語</Heading>
      <p>
        HTMLは見た目を作る言語ではありません。<Term>ここは見出しである・ここはリンクである</Term>と中身に意味を与える言語です。タグで内容を囲んだものを<Term>要素</Term>、タグの中に書く追加情報を<Term>属性</Term>と呼びます。
      </p>
      <p>
        意味を持たない<code>&lt;div&gt;</code>だけでも画面は作れます。それでもセマンティックなタグを選ぶのは、<Term>読み手が人間だけではない</Term>からです。スクリーンリーダーは<code>&lt;nav&gt;</code>を見て「ここは案内だ」と読み飛ばせるようにし、検索エンジンは<code>&lt;main&gt;</code>を見て本文を判断します。
      </p>

      <DiagramFrame
        slug="frontend-web-semantic"
        aspect="640 / 330"
        caption="よくあるページ構成をセマンティックなタグで表した例。上端のheaderの中に案内のnavが入り、mainの中に独立したまとまりであるarticleと、その中のテーマ区画であるsection、脇に補足のasideが並び、下端にfooterが来る。同じ見た目はdivだけでも作れるが、タグを選ぶことで読み上げソフトや検索エンジンに構造が伝わる。"
      />

      <table>
        <thead>
          <tr><th>タグ</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>&lt;header&gt;</code></td><td>ページやセクションの導入部。ロゴ・タイトル・グローバルナビ</td></tr>
          <tr><td className="hl"><code>&lt;nav&gt;</code></td><td>他ページやページ内へのリンクをまとめた案内部分</td></tr>
          <tr><td className="hl"><code>&lt;main&gt;</code></td><td>そのページの主題となる中心コンテンツ。1ページに1つだけ</td></tr>
          <tr><td className="hl"><code>&lt;article&gt;</code></td><td>単体で切り出しても意味が通る独立したまとまり</td></tr>
          <tr><td className="hl"><code>&lt;section&gt;</code></td><td>見出しを伴う、1つのテーマでまとまった区画</td></tr>
          <tr><td className="hl"><code>&lt;aside&gt;</code></td><td>本文から独立した補足情報</td></tr>
          <tr><td className="hl"><code>&lt;figure&gt; / &lt;figcaption&gt;</code></td><td>図とそのキャプションのひとまとまり</td></tr>
          <tr><td className="hl"><code>&lt;time datetime&gt;</code></td><td>日時を、人にも機械にも読める形で表す</td></tr>
        </tbody>
      </table>

      <p>
        見出しの<code>&lt;h1&gt;</code>〜<code>&lt;h6&gt;</code>は<Term>文字の大きさではなく階層</Term>です。大きく見せたいという理由で<code>&lt;h3&gt;</code>を飛ばすと、読み上げソフトの目次が壊れます。大きさはCSSの仕事です。
      </p>

      <Heading num="03">headに書く情報と安全設定</Heading>
      <p>
        <code>&lt;head&gt;</code>の中身は画面に出ませんが、ブラウザや検索エンジンへの申し送りになります。近年はページの安全性に関わる設定もここに入ります。
      </p>

      <table>
        <thead>
          <tr><th>指定</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>&lt;meta charset=&quot;UTF-8&quot;&gt;</code></td><td>文字コードの明示。省略は文字コードの解釈違いを突く攻撃の入口になるため、先頭付近に必ず置く</td></tr>
          <tr><td className="hl"><code>&lt;meta name=&quot;viewport&quot;&gt;</code></td><td>モバイル端末がレイアウトの基準にする幅。これがないと「PC画面の縮小表示」になる</td></tr>
          <tr><td className="hl"><code>&lt;title&gt;</code></td><td>タブ・検索結果・ブックマークに出る名前。ページごとに固有にする</td></tr>
          <tr><td className="hl"><code>&lt;link rel=&quot;canonical&quot;&gt;</code></td><td>同じ内容が複数URLで見えるときの正規URL</td></tr>
          <tr><td className="hl"><code>&lt;meta name=&quot;robots&quot;&gt;</code></td><td>検索エンジンに載せてよいかどうか(管理画面などで使う)</td></tr>
        </tbody>
      </table>

      <Aside label="ヘッダーで送るべきものはheadに書けない">
        <code>X-Frame-Options</code>や<code>X-Content-Type-Options</code>のような設定は<code>&lt;meta&gt;</code>では効かず、サーバーが返す<Term>HTTPレスポンスヘッダー</Term>として送る必要があります。<code>Content-Security-Policy</code>も<code>&lt;meta&gt;</code>版は制約が多く、ヘッダーで送るほうが確実です。詳しくはセキュリティセクションの担当ですが、「HTMLに書けるのは一部だけ」という切り分けはここで覚えておく価値があります。
      </Aside>

      <Heading num="04">CSS ― 誰に・何を・どうするか</Heading>
      <p>
        CSSは<Term>セレクタ(どの要素に)</Term>・<Term>プロパティ(何を)</Term>・<Term>値(どうするか)</Term>の3点セットです。名前にある「カスケード(滝)」は、同じ要素に複数の指定がぶつかったとき、上から下へ流れるように優先順位が決まっていく様子を指します。
      </p>
      <p>
        優先順位を決めるのは、大まかに<Term>詳細度</Term>と<Term>記述順</Term>の2つです。IDセレクタはクラスより強く、クラスはタグより強い。同じ強さなら後に書いたほうが勝つ。<code>!important</code>はこの序列そのものを飛び越えるので、使い始めると<Term>次はもっと強い指定が必要になる</Term>という悪循環に入ります。
      </p>

      <Heading num="05">すべての要素は箱である</Heading>
      <p>
        画面上の要素はすべて、内側から<Term>content</Term>・<Term>padding</Term>・<Term>border</Term>・<Term>margin</Term>という4層の箱として扱われます。これが<Term>ボックスモデル</Term>です。
      </p>

      <DiagramFrame
        slug="frontend-web-boxmodel"
        aspect="640 / 300"
        caption="ボックスモデルの4層。中心のcontentを、内側の余白であるpadding、枠線のborder、外側の余白であるmarginが順に包む。box-sizingがcontent-boxのときwidthはcontentだけの幅を指すが、border-boxのときはborderまでを含んだ幅を指す。指定した幅とはみ出しの食い違いは、ほぼこの違いから生まれる。"
      />

      <p>
        つまずきやすいのが<code>box-sizing</code>です。既定の<code>content-box</code>では<code>width</code>は中身だけの幅を指すため、<code>padding</code>を足すと見た目の幅が増えます。<code>border-box</code>にすると<code>width</code>が枠線までを含むようになり、<Term>指定した幅どおりに収まる</Term>ようになります。現代のCSSはほぼ例外なく全要素に<code>border-box</code>を当てるところから始めます。
      </p>

      <Analogy label="💡 たとえるなら">
        HTMLは家の骨組みと部屋割りです。どこがリビングでどこが玄関かという構造そのものを決めます。CSSはそこに施す内装で、同じ骨組みでもまったく違う家に見せられます。骨組みを内装の都合でねじ曲げると(見た目のために見出しレベルを選ぶと)、住み心地 ― ここでは読み上げソフトからの使い勝手 ― が壊れます。
      </Analogy>

      <Heading num="06">画面幅を前提にしない</Heading>
      <p>
        表示先の幅は分かりません。<Term>メディアクエリ</Term>で幅ごとに規則を切り替えるのが基本ですが、近年はそもそも切り替えずに済ませる書き方が増えました。<code>clamp()</code>で「最小・可変・最大」を一度に指定する、Gridの<code>auto-fit</code>で列数を自動にする、といった手です。
      </p>
      <p>
        さらに<Term>コンテナクエリ</Term>を使うと、画面幅ではなく<Term>自分が置かれた親の幅</Term>で切り替えられます。同じカードをサイドバーにも本文にも置く、という部品志向の作り方と相性がよく、コンポーネント設計の側から見ても自然な単位です。
      </p>

      <Heading num="まとめ">材料は2つ、役割は別</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>HTMLは意味、CSSは見た目</h4>
          <p>見た目の都合でタグを選ばない。タグは読み上げソフトと検索エンジンへの申し送り。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>カスケードには序列がある</h4>
          <p>詳細度と記述順で勝敗が決まる。<code>!important</code>は序列を壊し、悪循環を呼ぶ。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>すべては箱</h4>
          <p>4層のボックスモデルと<code>box-sizing</code>。幅の食い違いはほぼここが原因。</p>
        </Card>
      </CardGrid>

      <p>
        土台が分かったら、次はこの箱を実際に<Link href="/frontend/styling">どう並べるか</Link>です。この見出しの配下では、できあがった画面が<Link href="/frontend/perf">十分に速いか</Link>、そして<Link href="/frontend/i18n">言語と時間帯を前提にしていないか</Link>を扱います。
      </p>

      <DocsFooter href="/frontend/web" />
    </DocsPage>
  );
}
