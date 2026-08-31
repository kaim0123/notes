import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "人間中心設計と評価" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>人間中心設計と評価 ― 思い込みをどう検証するか</h1>
        <Lead>
          良いUIは、作り手の思い込みではなく実際の利用者の観察から生まれます。ここでは、利用者を設計の中心に据える<Term>人間中心設計</Term>の反復プロセス、誰もが使えることを目指すユニバーサルデザインとアクセシビリティ規格、そして使いやすさを確かめる評価手法を整理します。
        </Lead>
      </Hero>

      <Heading num="01">4つの活動を回す</Heading>
      <p>
        人間中心設計は、国際規格として<Term>4つの活動の反復</Term>という形で定義されています。重要なのは順番そのものではなく、<Term>評価で終わらず前の活動へ戻る</Term>という点です。
      </p>

      <DiagramFrame
        slug="frontend-ux-hcd-cycle"
        aspect="640 / 270"
        caption="人間中心設計の4つの活動を輪にした図。利用状況の把握と理解から始まり、要求事項の明確化、設計による解決、評価へと進む。評価が要求を満たしていれば完了となるが、満たしていなければ矢印が前の活動へ戻り、もう一周する。戻り先は評価で何が分かったかによって変わり、要求の取り違えなら要求事項へ、そもそも利用者の状況を誤解していたなら把握と理解まで戻る。一度作って終わりにしないことが、この図の要点。"
      />

      <table>
        <thead>
          <tr><th>活動</th><th>やること</th><th>この段で間違えると</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">利用状況の把握・理解</td><td>誰が、どんな環境で、何のために使うのかを調べる</td><td>存在しない利用者のために作ることになる</td></tr>
          <tr><td className="hl">要求事項の明確化</td><td>満たすべきことを言語化する</td><td>何をもって完成とするかが決まらない</td></tr>
          <tr><td className="hl">設計による解決</td><td>案を作り、形にする</td><td>やり直しが効く。ここは最も安い失敗</td></tr>
          <tr><td className="hl">評価</td><td>要求を満たしたかを確かめる</td><td>間違いに気付かないまま出す</td></tr>
        </tbody>
      </table>

      <p>
        戻り先は評価で何が分かったかによって変わります。<Term>操作に迷う</Term>なら設計へ、<Term>そもそも欲しくない</Term>なら利用状況の理解まで戻ることになります。後者に気付くのが遅れるほど損失が大きいので、早く小さく確かめる価値があります。
      </p>

      <Heading num="02">ユニバーサルデザインと規格</Heading>
      <p>
        <Term>ユニバーサルデザイン</Term>は、年齢・能力・状況にかかわらず、できるだけ多くの人がそのまま使えるよう<Term>最初から</Term>設計する考え方です。特別な対応を後付けするのではない、という点が要です。
      </p>
      <p>
        Webには具体的な指針があります。国際的な指針が<Term>WCAG</Term>、日本の規格が<Term>JIS X 8341</Term>で、色だけに頼らない・キーボードだけで操作できる・画像に代替テキストを付ける、といった達成基準を定めています。実務では<Term>レベルAA</Term>を目標に置くのが一般的で、実装上の中身は<Link href="/frontend/ux-a11y">ユーザビリティとアクセシビリティ</Link>で扱います。
      </p>

      <Analogy label="💡 たとえるなら">
        ユニバーサルデザインは自動ドアです。車いすの人も、荷物で手がふさがった人も、子どもも、特別な操作なしに通れます。あとからスロープを付け足すのではなく、最初から誰もが通れる形にしておく発想で、結果として全員が楽になります。
      </Analogy>

      <Heading num="03">評価手法 ― 専門家に見せるか、利用者に使わせるか</Heading>
      <p>
        設計した画面が本当に使いやすいかは、確かめて初めて分かります。手法は大きく2系統です。
      </p>

      <table>
        <thead>
          <tr><th>手法</th><th>やり方</th><th>見つかるもの</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">ヒューリスティック評価</td>
            <td>専門家が経験則に照らして問題点を洗い出す</td>
            <td>原則からの逸脱。低コストで数を出せる</td>
          </tr>
          <tr>
            <td className="hl">ユーザビリティテスト</td>
            <td>実際の利用者に課題を操作してもらい、つまずきを観察する</td>
            <td>作り手が想定していなかった詰まり方</td>
          </tr>
          <tr>
            <td className="hl">認知的ウォークスルー</td>
            <td>初めて使う人の思考を追い、各ステップで「次に何をするか分かるか」を検討する</td>
            <td>初回利用時の迷い</td>
          </tr>
          <tr>
            <td className="hl">アンケート・ログ分析</td>
            <td>満足度や離脱箇所を数で把握する</td>
            <td>どこで起きているか。ただし理由は分からない</td>
          </tr>
        </tbody>
      </table>

      <Aside label="観察のコツ ― 助けない">
        ユーザビリティテストで最も価値があるのは<Term>詰まっている場面</Term>です。つい説明したくなりますが、そこで助けてしまうと本番で起きることが見えません。「いま何を考えていますか」と声に出してもらいながら操作を見る方法が使われるのはこのためです。また、人数は多くなくてよく、少数でも主要な問題の大半は見つかることが知られています。
      </Aside>

      <Heading num="04">評価をいつ・何回やるか</Heading>
      <p>
        評価は完成後に1回やるものではありません。<Term>形になっている度合いに応じて、手法を変えて何度も行います</Term>。
      </p>

      <table>
        <thead>
          <tr><th>段階</th><th>確かめられること</th><th>向く手法</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">紙・ワイヤーフレーム</td><td>流れが理解できるか</td><td>認知的ウォークスルー、簡易テスト</td></tr>
          <tr><td className="hl">モックアップ</td><td>見た目と優先順位が伝わるか</td><td>ヒューリスティック評価</td></tr>
          <tr><td className="hl">動くもの</td><td>実際に操作を完了できるか</td><td>ユーザビリティテスト</td></tr>
          <tr><td className="hl">リリース後</td><td>実利用で何が起きているか</td><td>ログ分析、比較検証</td></tr>
        </tbody>
      </table>

      <p>
        コードを書いたあとの評価は、直すコストが最も高い段階での評価です。紙とワイヤーフレームの段階で見つけられた問題は、ほぼ無料で直せます。
      </p>

      <Heading num="まとめ">確かめてから次へ進む</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>評価は終点ではなく折り返し</h4>
          <p>満たしていなければ前の活動へ戻る。戻り先は、何が分かったかで変わる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>最初から誰もが使える形に</h4>
          <p>後付けのスロープではなく自動ドア。規格は達成基準として使う。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>早い段階ほど安く直せる</h4>
          <p>紙で見つかる問題を、実装後に見つけない。</p>
        </Card>
      </CardGrid>

      <p>
        次は、この反復を実践の手順に落とした<Link href="/frontend/ux-design-thinking">デザイン思考</Link>を見ていきます。
      </p>

      <DocsFooter href="/frontend/ux-hcd" />
    </DocsPage>
  );
}
