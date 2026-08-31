import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "GUIの部品" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>GUIの部品 ― 選択肢の数と性質で決まる</h1>
        <Lead>
          <Term>GUI</Term>は、対象を画面に表示して直接指し示す操作方式です。文字で命令を打つ<Term>CUI</Term>と違い、<Term>何が選べるかが目に見えている</Term>のが本質的な違いになります。ここでは画面を構成する基本要素と、入力部品の選び方を整理します。
        </Lead>
      </Hero>

      <Heading num="01">GUIの基本要素</Heading>
      <p>
        画面を構成する要素として、独立した作業領域を表す<Term>ウィンドウ</Term>、機能やファイルを絵柄で表す<Term>アイコン</Term>、操作対象を選ぶ<Term>メニュー</Term>、そして位置を指し示す<Term>ポインタ</Term>があります。操作を担う機器は<Term>ポインティングデバイス</Term>と総称され、マウス・タッチパッド・タッチパネルなどが含まれます。
      </p>

      <Analogy label="💡 たとえるなら">
        CUIが「店員に商品名を口頭で伝えて注文する」方式なら、GUIは「棚に並んだ商品を手に取ってカゴに入れる」方式です。何が選べるかが目に見えているぶん、初めてでも迷いにくい。一方で、品目が数万あるならCUIのほうが速い ― 熟練者向けにコマンドが残り続けるのはこのためです。
      </Analogy>

      <Heading num="02">入力部品を選ぶ ― 何個選べるか、いくつあるか</Heading>
      <p>
        入力部品の選択は、感覚ではなく<Term>選べる数</Term>と<Term>選択肢の個数</Term>の2軸でほぼ決まります。
      </p>

      <DiagramFrame
        slug="frontend-ux-gui-parts"
        aspect="640 / 310"
        caption="入力部品を2つの軸で選ぶ表。縦軸は1つだけ選ぶか複数選べるか、横軸は選択肢が少ないか多いか。1つだけ選ぶ場合、選択肢が少なければラジオボタンかセグメント、多ければプルダウンやコンボボックスを使う。複数選べる場合、選択肢が少なければチェックボックスを並べ、多ければ複数選択できるリストやタグ入力を使う。表の下に、単一選択の場面でチェックボックスを使うと複数選べてしまい意図しない入力を招くこと、逆に2択で切り替えが即座に反映される場面ではスイッチを使うことが注記されている。"
      />

      <table>
        <thead>
          <tr><th>部品</th><th>使う場面</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ラジオボタン</td><td>1つだけ選ぶ。選択肢が2〜5個で、全部見せたいとき</td></tr>
          <tr><td className="hl">プルダウン</td><td>1つだけ選ぶ。選択肢が多く、畳んでおきたいとき</td></tr>
          <tr><td className="hl">チェックボックス</td><td>いくつでも選ぶ。単独なら「同意する」のような二値にも使う</td></tr>
          <tr><td className="hl">スイッチ</td><td>切り替えが<strong>即座に反映される</strong>設定。送信ボタンを伴わない</td></tr>
          <tr><td className="hl">テキストボックス</td><td>選択肢を用意できない自由入力</td></tr>
          <tr><td className="hl">コンボボックス</td><td>候補から選びたいが、絞り込みや自由入力も要るとき</td></tr>
        </tbody>
      </table>

      <p>
        取り違えで最も多いのが<Term>単一選択なのにチェックボックスを使う</Term>ケースです。複数選べてしまい、後段の処理が壊れます。逆に、<Term>スイッチとチェックボックスの混同</Term>もよくあります。スイッチは「その場で効く」もの、チェックボックスは「送信して効く」もの ― 見た目の好みではなく、反映のタイミングで選びます。
      </p>

      <Aside label="選択肢を減らせないか、を先に考える">
        部品選びの前に、そもそも<Term>選ばせる必要があるか</Term>を疑う価値があります。既定値で9割が正しいなら選択肢を隠して既定に任せる、入力から推測できるなら自動で埋める ― 選ばせないのが最も速い入力です。「設定項目が多いほど親切」という前提は、たいてい成り立ちません。
      </Aside>

      <Heading num="03">操作の結果を返す</Heading>
      <p>
        GUIの部品は、押した結果が<Term>目に見えて返ってくる</Term>ことで初めて成立します。押せることが分かる見た目、押している最中の反応、処理中の表示、完了の通知 ― この連鎖のどこが欠けても、利用者は「効いたのか分からない」状態になり、同じ操作を繰り返します。
      </p>

      <table>
        <thead>
          <tr><th>状態</th><th>示すこと</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">通常</td><td>押せる要素だと分かる見た目</td></tr>
          <tr><td className="hl">ホバー・フォーカス</td><td>いまどこを指しているか。キーボード操作でも必ず要る</td></tr>
          <tr><td className="hl">押下中</td><td>受け付けたこと</td></tr>
          <tr><td className="hl">処理中</td><td>待ちが発生していること。あわせて二重押下を止める</td></tr>
          <tr><td className="hl">無効</td><td>いま押せない理由が分かること(理由を添える)</td></tr>
        </tbody>
      </table>

      <p>
        無効状態は特に扱いを誤りがちです。理由を示さずに灰色にすると、利用者は<Term>どうすれば押せるようになるのか</Term>が分からず止まります。無効にするより、押させてから何が足りないかを返すほうが親切な場面も多くあります。
      </p>

      <Heading num="まとめ">見えるものを直接操作する</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>選べる数と個数で決まる</h4>
          <p>単一か複数か、選択肢が少ないか多いか。この2軸でほぼ自動的に決まる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>スイッチは即時、チェックは送信後</h4>
          <p>見た目の好みではなく、反映のタイミングで選ぶ。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>結果が返らない操作は不安を生む</h4>
          <p>処理中と無効の表示を省くと、同じ操作が繰り返される。</p>
        </Card>
      </CardGrid>

      <p>
        次は、これらの部品を組み合わせて画面を組み立てるときの考え方 ―
        <Link href="/frontend/ux-screen">画面設計と入力チェック</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/ux-gui" />
    </DocsPage>
  );
}
