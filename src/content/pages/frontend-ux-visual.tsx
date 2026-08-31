import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "視覚デザイン" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>視覚デザイン ― レイアウト・配色・文字</h1>
        <Lead>
          骨格が決まったら、実際に目に入る形にします。ここでは情報の並べ方、色、文字の原則を整理します。実装者にとっては、CSSやTailwindで値を決めるときの<Term>なぜその値なのか</Term>に答えるための材料です。
        </Lead>
      </Hero>

      <Heading num="01">近接・整列・対比 ― 3つの原則で足りる</Heading>
      <p>
        視覚的な整理は、突き詰めると3つの操作でできています。
      </p>

      <table>
        <thead>
          <tr><th>原則</th><th>やること</th><th>伝わること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">近接</td><td>関係のあるものを近づけ、無いものを離す</td><td>どれとどれが仲間か</td></tr>
          <tr><td className="hl">整列</td><td>見えない線に端を揃える</td><td>全体が意図して置かれていること</td></tr>
          <tr><td className="hl">対比</td><td>大きさ・太さ・色で差を付ける</td><td>どれが重要か、どこから読むか</td></tr>
        </tbody>
      </table>

      <p>
        「なんとなく散らかって見える」画面は、たいていこの3つのどれかが崩れています。とくに<Term>中途半端な差</Term>は最も悪く、16pxと18pxのように「違うが違って見えない」値が混ざると、意図なのか事故なのか読めなくなります。差を付けるなら<Term>はっきり付ける</Term>のが原則です。
      </p>

      <Heading num="02">余白は「空いている場所」ではない</Heading>
      <p>
        <Term>余白</Term>は無駄な隙間ではなく、<Term>関係を伝える手段</Term>です。要素どうしの距離が近ければ仲間、遠ければ別物 ― 人はそう読みます。だから見出しと本文の間より、段落と次の見出しの間を広く取ります。
      </p>
      <p>
        余白の値は、有限の刻み(4・8・12・16・24・32…)から選びます。刻みを決めておくと、迷わず決まり、全体もそろいます。Tailwindの間隔スケールがまさにこれで、<Link href="/frontend/styling">デザイントークン</Link>の最も基本的な適用先です。
      </p>

      <Heading num="03">配色 ― 役割で3層に分ける</Heading>
      <p>
        色を「好きな色を選ぶ」問題として扱うと破綻します。<Term>役割ごとに層を分ける</Term>と管理できるようになります。
      </p>

      <DiagramFrame
        slug="frontend-ux-visual-color"
        aspect="640 / 300"
        caption="配色を役割で3層に分けた図。いちばん広い面積を占めるのがベース色で、背景や面の主色として画面全体のトーンを決める。次がテキスト色で、本文と補足の2段階を持ち、背景とのコントラスト比が基準を満たす必要がある。いちばん狭い面積がアクセント色で、ボタンやリンクなど操作すべき場所だけに使う。面積の比率が大きく違うことが図示されており、アクセントを広く使うと、どこを押せばよいかの手がかりが失われることが示されている。右側にダークテーマは色の反転ではなく別のセットとして定義するという注記がある。"
      />

      <table>
        <thead>
          <tr><th>層</th><th>役割</th><th>決め方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ベース</td><td>背景・面。画面全体のトーンを決める</td><td>ほぼ無彩色。面の階層は明度差だけで作る</td></tr>
          <tr><td className="hl">テキスト</td><td>本文・見出し・補足</td><td>背景とのコントラスト比を満たす。強弱は2〜3段階まで</td></tr>
          <tr><td className="hl">アクセント</td><td>ボタン・リンク・現在位置</td><td>1色に絞る。使う面積を狭く保つ</td></tr>
        </tbody>
      </table>

      <p>
        アクセントを広く使うと、<Term>どこを押せばよいかの手がかりが消えます</Term>。目立つ色が画面の1割を超えたら、それはもう目立っていません。
      </p>

      <Aside label="意味を色だけに載せない">
        エラーを赤、成功を緑で示すのは自然ですが、<Term>色だけ</Term>で示すと色覚特性のある人には伝わりません。アイコンと文言を必ず添えます。同じ理由で、グラフの系列を色だけで区別するのも避け、形や直接のラベルを併用します。実装側の基準は<Link href="/frontend/ux-a11y">ユーザビリティとアクセシビリティ</Link>で扱います。
      </Aside>

      <p>
        <Term>ダークテーマ</Term>は色の反転ではありません。暗い背景では明るい色が膨張して見え、影による階層表現も効かなくなります。ベース・テキスト・アクセントを<Term>別のセットとして定義する</Term>のが実務上の答えで、だからこそトークン化しておく価値があります。
      </p>

      <Heading num="04">タイポグラフィ ― 読ませるための設定</Heading>
      <p>
        文字は、美しさより<Term>読めること</Term>が先です。実装に直結するのは次の4点です。
      </p>

      <table>
        <thead>
          <tr><th>要素</th><th>目安</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">本文サイズ</td><td>16px相当を下回らない。<code>rem</code>で指定し、拡大に追従させる</td></tr>
          <tr><td className="hl">行間</td><td>本文は文字サイズの1.5〜1.8倍。日本語は英語より広めが読みやすい</td></tr>
          <tr><td className="hl">行長</td><td>1行あたり全角35〜45字程度。画面幅いっぱいに伸ばさない</td></tr>
          <tr><td className="hl">階層</td><td>見出し・本文・補足で段階を付け、1画面に出すサイズの種類を増やしすぎない</td></tr>
        </tbody>
      </table>

      <p>
        行長は見落とされがちですが影響が大きい項目です。広い画面で本文が端から端まで伸びると、行を折り返したとき<Term>目が次の行頭を見失います</Term>。本文に最大幅を設けるのはこのためで、装飾ではなく機能です。
      </p>

      <Analogy label="💡 たとえるなら">
        レイアウトと文字組みは新聞の版面です。見出しの大きさ、段組み、余白が「どこから読むか」を決めます。文字を美しく整えても、記事の優先順位が版面に出ていなければ読者は迷います。そして段の幅が広すぎる新聞が存在しないのは、行長の問題が昔から知られているからです。
      </Analogy>

      <Heading num="05">情報設計との接続</Heading>
      <p>
        視覚デザインは<Term>情報設計の結論を目に見える形にする</Term>作業です。何を目立たせるかは、色や大きさを決める前に決まっていなければなりません。決まっていないまま見た目を調整すると、「全部を目立たせる」画面になります。
      </p>
      <p>
        実装側では、決めた優先順位を<Link href="/frontend/web">セマンティックなタグ</Link>としてコードにも反映します。見出しレベルは見た目の大きさではなく、この優先順位に従わせます。
      </p>

      <Heading num="まとめ">差を付けるなら、はっきり付ける</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>近接・整列・対比</h4>
          <p>散らかって見える画面は、この3つのどれかが崩れている。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>色は役割で分ける</h4>
          <p>ベース・テキスト・アクセント。アクセントは1色、狭い面積に保つ。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>文字は読めることが先</h4>
          <p>サイズ・行間・行長。とくに行長は装飾ではなく機能。</p>
        </Card>
      </CardGrid>

      <p>
        次は、画面を構成する具体的な部品 ― <Link href="/frontend/ux-gui">GUIの部品</Link>を見ていきます。
      </p>

      <DocsFooter href="/frontend/ux-visual" />
    </DocsPage>
  );
}
