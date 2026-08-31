import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "画面設計と入力チェック" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>画面設計と入力チェック ― 入る前に止める</h1>
        <Lead>
          業務で使われる画面は、見た目の良さだけでなく<Term>間違ったデータを入れさせない</Term>ことが要件になります。ここでは画面構成の原則、入力値を検査する種類、そしてデータに識別子を与えるコード設計を整理します。地味な領域ですが、後から効いてくる部分でもあります。
        </Lead>
      </Hero>

      <Heading num="01">画面構成 ― 操作の順序と並びを一致させる</Heading>
      <p>
        画面設計の原則は数が少なく、どれも当たり前に見えますが、守られていない画面は驚くほど多くあります。
      </p>

      <table>
        <thead>
          <tr><th>原則</th><th>中身</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">関連する項目をまとめる</td><td>住所は住所で、支払いは支払いで固める。<Link href="/frontend/ux-visual">近接</Link>そのもの</td></tr>
          <tr><td className="hl">操作の順序と並びを一致させる</td><td>実際に行う順に上から並べる。画面上を行ったり来たりさせない</td></tr>
          <tr><td className="hl">よく使う機能を近くに置く</td><td>頻度の高い操作ほど、到達までの距離を短くする</td></tr>
          <tr><td className="hl">同じものは同じ場所に置く</td><td>画面ごとに保存ボタンの位置が変わらない</td></tr>
          <tr><td className="hl">1画面で1つのことをさせる</td><td>目的が2つある画面は、たいてい2画面に分けたほうが速い</td></tr>
        </tbody>
      </table>

      <p>
        入力欄の並びは、<Term>利用者の手元にある資料の順序</Term>に合わせるのが実務上のコツです。伝票を見ながら打ち込む画面なら、伝票と同じ順に並べる。システムの都合(テーブルの列順)で並べると、視線が資料と画面を往復し続けることになります。
      </p>

      <Heading num="02">入力チェックの種類</Heading>
      <p>
        利用者の入力には、打ち間違いや想定外の値が必ず混じります。受け入れる前に検査するのが<Term>入力チェック</Term>です。
      </p>

      <table>
        <thead>
          <tr><th>チェック</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ニューメリックチェック</td><td>数値であるべき項目に数字だけが入っているか</td></tr>
          <tr><td className="hl">フォーマットチェック</td><td>形式が正しいか(日付・メールアドレスなど)</td></tr>
          <tr><td className="hl">リミットチェック</td><td>値が許容範囲に収まっているか(月は1〜12)</td></tr>
          <tr><td className="hl">シーケンスチェック</td><td>データが正しい順番に並んでいるか</td></tr>
          <tr><td className="hl">照合チェック</td><td>既存のマスタなどに存在する値か</td></tr>
          <tr><td className="hl">バランスチェック</td><td>合計値どうしが一致するか(借方と貸方など)</td></tr>
          <tr><td className="hl">重複チェック</td><td>同じものが二重に登録されていないか</td></tr>
        </tbody>
      </table>

      <p>
        入力コードの誤りを機械的に見つけるために、末尾に検査用の桁を付けることがあります。この桁を<Term>チェックディジット</Term>と呼び、一定の計算式で導いた値を付けておくことで、桁の打ち間違いや入れ替わりを検出できます。
      </p>

      <Heading num="03">どこで検査するか ― 二重に置く理由</Heading>
      <p>
        検査は1か所では足りません。<Term>目的が層ごとに違う</Term>からです。
      </p>

      <DiagramFrame
        slug="frontend-ux-screen-validation"
        aspect="640 / 300"
        caption="入力検査を層ごとに並べた図。いちばん手前がブラウザでの検査で、目的は利用者にその場で気付かせることであり、体験を良くするためのもの。次がサーバーでの検査で、目的は不正なデータを絶対に通さないことであり、こちらが本体。いちばん奥がデータベースの制約で、最後の砦として一意性や参照整合性を守る。ブラウザ側の検査は改ざんできるため、それだけに頼ることはできない。3層は重複しているように見えるが、それぞれ守っている対象が違うことが示されている。"
      />

      <table>
        <thead>
          <tr><th>層</th><th>目的</th><th>省くとどうなるか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ブラウザ</td><td>その場で気付かせる。往復を減らす</td><td>送信して初めてエラーが分かる。体験が悪い</td></tr>
          <tr><td className="hl">サーバー</td><td>不正なデータを絶対に通さない</td><td>改ざんされた値がそのまま入る。<strong>これが本体</strong></td></tr>
          <tr><td className="hl">データベース</td><td>一意性・参照整合性の最後の砦</td><td>アプリの抜け道から矛盾したデータが残る</td></tr>
        </tbody>
      </table>

      <p>
        <Term>ブラウザ側の検査は体験のためであって、防御ではありません</Term>。開発者ツールから直接リクエストを送れば素通りします。「フロントで検査しているからサーバーでは省く」は成立しません。
      </p>

      <Aside label="エラーの伝え方">
        検査に落ちたとき最も大事なのは、<Term>どの項目が、なぜ、どうすればよいか</Term>が分かることです。画面上部にまとめて「入力に誤りがあります」とだけ出す形は、項目数が多いほど役に立ちません。該当欄の近くに、原因と直し方を書きます。そして<Term>入力した値は必ず保持</Term>します。空のフォームに戻されるのは、離脱の最大の原因の1つです。
      </Aside>

      <Heading num="04">コード設計 ― 識別子の付け方</Heading>
      <p>
        データを識別・分類するために割り振る番号や記号の付け方が<Term>コード設計</Term>です。
      </p>

      <table>
        <thead>
          <tr><th>種類</th><th>付け方</th><th>弱点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">順番コード</td><td>発生順に連番を振る</td><td>意味を持たない。並び以外の情報がない</td></tr>
          <tr><td className="hl">区分コード</td><td>桁の範囲でグループを分ける</td><td>区分が増えると空きが尽きる</td></tr>
          <tr><td className="hl">表意コード</td><td>意味を連想できる記号にする</td><td>意味が変わると振り直しになる</td></tr>
          <tr><td className="hl">合成コード</td><td>複数のコードを組み合わせる</td><td>桁が長くなり、構成要素の変更に弱い</td></tr>
        </tbody>
      </table>

      <p>
        設計上の要点は<Term>コードに意味を持たせすぎない</Term>ことです。分類を桁に埋め込むと、組織変更や商品カテゴリの再編のたびに全件の振り直しが発生します。分類は属性として別に持ち、<Term>コードは単なる識別子に徹する</Term>のが、長く保つための原則です。
      </p>

      <Analogy label="💡 たとえるなら">
        入力チェックは空港の保安検査です。搭乗口の前(ブラウザ)で軽く確認するのは列を短くするための工夫で、本当に危険物を止めるのは保安検査場(サーバー)です。手前の確認を厚くしても、保安検査場を通さずに機内へ入れる経路があれば意味がありません。
      </Analogy>

      <Heading num="まとめ">入口で止め、識別子は軽くする</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>並びは操作の順序に従う</h4>
          <p>テーブルの列順ではなく、利用者の手元の資料の順に並べる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>検査は3層、目的はそれぞれ違う</h4>
          <p>ブラウザは体験、サーバーは防御、DBは最後の砦。省略できるのは無い。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>コードに意味を埋め込まない</h4>
          <p>分類は属性として別に持つ。埋め込むと再編のたびに振り直しになる。</p>
        </Card>
      </CardGrid>

      <p>
        次は、フォームを実装する前に確認しておく観点をまとめた<Link href="/frontend/ux-form">フォーム作成時の注意</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/ux-screen" />
    </DocsPage>
  );
}
