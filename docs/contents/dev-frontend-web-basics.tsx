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
  title: "Web基礎",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>Web基礎 ― HTMLとCSSでページの骨格と見た目を作る</h1>
        <Lead>
          「コンピュータ基礎」の<Link href="/network/applications/web">Webの仕組み</Link>で、ブラウザが受け取ったHTML・CSSを<Term>DOM</Term>・<Term>CSSOM</Term>というツリーに変換し、画面に描き出す流れを見ました。この記事では、その材料であるHTMLとCSS自体をどう書くのかを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">HTML ― 文書の構造を表すマークアップ言語</Heading>
      <p><Term>HTML(HyperText Markup Language)</Term>は、文書の中身に「これは見出しである」「これはリンクである」といった意味づけをするための言語です。<code>&lt;p&gt;本文&lt;/p&gt;</code>のように、<Term>タグ</Term>で内容を囲んだものを<Term>要素</Term>と呼び、タグの中に書く<code>href=&quot;...&quot;</code>のような追加情報を<Term>属性</Term>と呼びます。</p>
      <table>
        <thead>
          <tr><th>タグ</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>&lt;header&gt; / &lt;main&gt; / &lt;footer&gt;</code></td><td>ページの中でその部分が何であるかを表す(意味づけ)</td></tr>
          <tr><td className="hl"><code>&lt;div&gt; / &lt;span&gt;</code></td><td>意味を持たない、レイアウトのためだけの汎用の箱</td></tr>
          <tr><td className="hl"><code>&lt;a href=&quot;...&quot;&gt;</code></td><td>別のページやページ内の場所へのリンク</td></tr>
          <tr><td className="hl"><code>&lt;img src=&quot;...&quot;&gt;</code></td><td>画像の埋め込み</td></tr>
          <tr><td className="hl"><code>&lt;form&gt; / &lt;input&gt; / &lt;button&gt;</code></td><td>ユーザーからの入力を受け取る部品</td></tr>
          <tr><td className="hl"><code>&lt;ul&gt; / &lt;li&gt;</code></td><td>順序のないリストとその項目</td></tr>
        </tbody>
      </table>
      <Heading num="02">セマンティックなタグ ― 意味を持つ要素で構造を表す</Heading>
      <p><code>&lt;div&gt;</code>や<code>&lt;span&gt;</code>だけで組んでも画面は表示できますが、<code>&lt;header&gt;</code>や<code>&lt;nav&gt;</code>のように意味を持つ<Term>セマンティックなタグ</Term>を使うと、スクリーンリーダー(視覚障害者向けの読み上げソフト)や検索エンジンのクローラーが「ここがナビゲーションで、ここが本文だ」と文書の構造を正しく理解できるようになります。これは「動けばいい」を超えて、誰もが使えるページ(<Term>アクセシビリティ</Term>)や検索順位(<Term>SEO</Term>)につながる基本的な配慮です。</p>
      <table>
        <thead>
          <tr><th>タグ</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>&lt;header&gt;</code></td><td>ページ、またはセクションの導入部。ロゴ・タイトル・グローバルナビなど</td></tr>
          <tr><td className="hl"><code>&lt;nav&gt;</code></td><td>他ページやページ内の場所へのリンクをまとめた案内部分</td></tr>
          <tr><td className="hl"><code>&lt;main&gt;</code></td><td>そのページの主題となる中心コンテンツ。1ページに1つだけ置く</td></tr>
          <tr><td className="hl"><code>&lt;article&gt;</code></td><td>単体で切り出しても意味が通る、独立したまとまり(記事・投稿・カードなど)</td></tr>
          <tr><td className="hl"><code>&lt;section&gt;</code></td><td>見出しを伴う、ひとつのテーマでまとまった区画</td></tr>
          <tr><td className="hl"><code>&lt;aside&gt;</code></td><td>本文から独立した補足情報(サイドバー・関連リンク・広告など)</td></tr>
          <tr><td className="hl"><code>&lt;figure&gt; / &lt;figcaption&gt;</code></td><td>図・画像・コードなどと、そのキャプションのひとまとまり</td></tr>
          <tr><td className="hl"><code>&lt;time datetime=&quot;...&quot;&gt;</code></td><td>日付・時刻を、人にも機械にも読める形式で表す</td></tr>
          <tr><td className="hl"><code>&lt;footer&gt;</code></td><td>ページ、またはセクションの末尾。著作権表示や関連リンクなど</td></tr>
        </tbody>
      </table>
      <Diagram caption="よくあるページ構成をセマンティックなタグで表した例">
        <svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg">
          <rect x={10} y={10} width={460} height={50} rx="6" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={24} y={30} fill="#f2f2f2" fontSize="12">&lt;header&gt;</text>
          <rect x={280} y={22} width={170} height={26} rx="4" fill="none" stroke="#5f5f5f" />
          <text x={294} y={39} fill="#9a9a9a" fontSize="11">&lt;nav&gt;</text>

          <rect x={10} y={70} width={460} height={170} rx="6" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={24} y={90} fill="#f2f2f2" fontSize="12">&lt;main&gt;</text>

          <rect x={22} y={100} width={300} height={125} rx="4" fill="none" stroke="#5f5f5f" />
          <text x={34} y={118} fill="#9a9a9a" fontSize="11">&lt;article&gt;</text>
          <rect x={34} y={128} width={276} height={40} rx="3" fill="none" strokeDasharray="3 3" stroke="#5f5f5f" />
          <text x={44} y={151} fill="#6a6a6a" fontSize="10">&lt;section&gt;</text>

          <rect x={334} y={100} width={148} height={125} rx="4" fill="none" stroke="#5f5f5f" />
          <text x={346} y={118} fill="#9a9a9a" fontSize="11">&lt;aside&gt;</text>

          <rect x={10} y={250} width={460} height={40} rx="6" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={24} y={274} fill="#f2f2f2" fontSize="12">&lt;footer&gt;</text>
        </svg>
      </Diagram>

      <Heading num="03">メタタグ ― &lt;head&gt;で伝える文書情報とセキュリティ設定</Heading>
      <p><code>&lt;head&gt;</code>の中に置く<code>&lt;meta&gt;</code>タグは、画面には表示されませんが、ブラウザや検索エンジンに文書についての情報を伝えます。近年は、ページの安全性に関わる設定もここで行います。</p>
      <table>
        <thead>
          <tr><th>タグ</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>&lt;meta charset=&quot;UTF-8&quot;&gt;</code></td><td>文字コードを明示する。省略や誤指定は文字コードの解釈違いを悪用したXSSの原因になりうるため、文書の先頭付近に必ず置く</td></tr>
          <tr><td className="hl"><code>&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;</code></td><td>モバイル端末がレイアウトの基準にする画面幅を指定する(詳しくは06章)</td></tr>
          <tr><td className="hl"><code>&lt;meta http-equiv=&quot;Content-Security-Policy&quot; content=&quot;...&quot;&gt;</code></td><td>実行してよいスクリプトや読み込んでよいリソースの出どころを制限し、<Term>XSS</Term>が起きても被害を抑える(<Term>CSP</Term>)</td></tr>
          <tr><td className="hl"><code>&lt;meta name=&quot;referrer&quot; content=&quot;strict-origin-when-cross-origin&quot;&gt;</code></td><td>他サイトへ移動するときに送る<Term>Referer</Term>情報の範囲を絞り、URLに含まれる機密情報の漏洩を防ぐ</td></tr>
          <tr><td className="hl"><code>&lt;meta name=&quot;robots&quot; content=&quot;noindex, nofollow&quot;&gt;</code></td><td>検索エンジンにインデックス・追跡してほしくないページであることを伝える(管理画面など)</td></tr>
        </tbody>
      </table>
      <Aside label="⚠️ 注意">
        <code>X-Frame-Options</code>や<code>X-Content-Type-Options</code>のような重要なセキュリティ設定は<code>&lt;meta&gt;</code>タグでは指定できず、サーバーが返す<Term>HTTPレスポンスヘッダー</Term>として送る必要があります。CSPも<code>&lt;meta&gt;</code>版より、HTTPヘッダーの<code>Content-Security-Policy</code>で送るほうが制限なく設定でき、より確実です。また、<code>target=&quot;_blank&quot;</code>で外部リンクを新しいタブで開くときは<code>rel=&quot;noopener noreferrer&quot;</code>を付け、開いた先のページから元のページを操作されないようにするのも基本的な対策です。
      </Aside>

      <Heading num="04">CSS ― 見た目を指定するスタイルシート</Heading>
      <p><Term>CSS(Cascading Style Sheets)</Term>は、HTMLで作った要素に色・大きさ・配置などの見た目を与える言語です。「どの要素に(<Term>セレクタ</Term>)」「何を(<Term>プロパティ</Term>)」「どうするか(<Term>値</Term>)」という3点セットで指定します。</p>
      <Diagram caption="セレクタでHTML要素を選び、プロパティと値でスタイルを指定する">
        <svg viewBox="0 0 560 110" xmlns="http://www.w3.org/2000/svg">
          <text x={20} y={50} fontSize="20" fill="#f2f2f2" fontFamily="monospace">.card {"{"} color: white; {"}"}</text>
          <line x1={30} y1={62} x2={70} y2={85} stroke="#5f5f5f" />
          <text x={10} y={100} fontSize="11" fill="#39ff6a">セレクタ</text>
          <line x1={170} y1={62} x2={200} y2={85} stroke="#5f5f5f" />
          <text x={140} y={100} fontSize="11" fill="#39ff6a">プロパティ</text>
          <line x1={280} y1={62} x2={300} y2={85} stroke="#5f5f5f" />
          <text x={270} y={100} fontSize="11" fill="#39ff6a">値</text>
        </svg>
      </Diagram>
      <p>CSSの名前にある「カスケード(滝)」は、同じ要素に複数のスタイル指定がぶつかったとき、<Term>詳細度(specificity)</Term>やコードの記述順によって、上から下へ流れるように優先順位が決まっていく様子を表しています。IDセレクタはクラスセレクタより強く、クラスセレクタはタグセレクタより強い、というのが基本原則です。</p>

      <Heading num="05">ボックスモデル ― すべての要素は箱である</Heading>
      <p>ブラウザ上のすべてのHTML要素は、内側から<Term>content(中身)</Term>・<Term>padding(内側の余白)</Term>・<Term>border(枠線)</Term>・<Term>margin(外側の余白)</Term>という4層の入れ子の箱として扱われます。これを<Term>ボックスモデル</Term>と呼びます。</p>
      <Diagram caption="ボックスモデル: content → padding → border → margin の4層構造">
        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
          <rect x={10} y={10} width={380} height={180} fill="none" stroke="#5f5f5f" strokeDasharray="4 4" />
          <text x={20} y={26} fontSize="10" fill="#9a9a9a">margin</text>
          <rect x={40} y={40} width={320} height={130} fill="none" stroke="#5f5f5f" />
          <text x={50} y={56} fontSize="10" fill="#9a9a9a">border</text>
          <rect x={65} y={65} width={270} height={80} fill="none" stroke="#39ff6a" strokeDasharray="3 3" />
          <text x={75} y={81} fontSize="10" fill="#39ff6a">padding</text>
          <rect x={95} y={90} width={210} height={30} fill="none" stroke="#f2f2f2" />
          <text x={200} y={109} fontSize="11" fill="#f2f2f2" textAnchor="middle">content</text>
        </svg>
      </Diagram>
      <p>要素をどう並べるかは、<code>display</code>プロパティで決めます。近年は<Term>Flexbox</Term>(1方向の並び)と<Term>Grid</Term>(縦横2方向の格子状の並び)という2つのレイアウト方式が主流です。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>得意なこと</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>display: flex</code></td><td>要素を横一列・縦一列に並べ、余白の分配や中央揃えを行う</td></tr>
          <tr><td className="hl"><code>display: grid</code></td><td>縦横の格子(グリッド)を定義し、要素をマス目に配置する</td></tr>
        </tbody>
      </table>

      <Heading num="06">レスポンシブデザイン ― 画面サイズに合わせる</Heading>
      <p>スマートフォンからPCまで様々な画面幅に対応するため、<code>@media (max-width: 640px) {"{"} ... {"}"}</code>のような<Term>メディアクエリ</Term>を使い、画面幅ごとに異なるCSSを適用します。03章で見た<code>&lt;meta name=&quot;viewport&quot;&gt;</code>タグとセットで使い、モバイル端末が「PC向けの縮小表示」ではなく「実際の画面幅」を基準にレイアウトするよう指示するのが基本です。</p>

      <Analogy label="💡 たとえるなら">
        HTMLは家の「骨組みと部屋割り」です。どこがリビングで、どこが玄関かという構造そのものを決めます。CSSは、その骨組みに施す「内装と色使い」です。同じ骨組みでも、CSSを変えれば見た目はまったく違う家になります。
      </Analogy>

      <Heading num="まとめ">骨格と見た目を分けて考える</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>HTMLは意味づけされた骨格</h4><p>タグと属性で、文書の構造と意味を表現します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>CSSはカスケードする見た目のルール</h4><p>セレクタ・プロパティ・値の3点セットで、優先順位を持ちながらスタイルを適用します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>すべての要素は箱</h4><p>ボックスモデルとFlexbox/Gridで、要素の並びと余白を制御します。</p></Card>
      </CardGrid>
      <p>HTML・CSSだけでも静的なページは作れますが、ボタンを押したときの反応やデータの取得といった「動き」を持たせるには、もう1つの要素が必要です。次のページ「<Link href="/dev/language">JavaScript・TypeScript</Link>」では、ページに命を吹き込む言語そのものを見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/language" tag="開発">JavaScript・TypeScript</RelatedLink>
                    <RelatedLink href="/network/applications/web" tag="インターネット">Webの仕組み</RelatedLink>
                    <RelatedLink href="/dev" tag="開発">実装 一覧</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
