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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "権限委譲",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>権限委譲 ― 渡して、任せて、口を出さない</h1>
        <Lead>
          マネージャーが抱え込みすぎるとチームは伸びません。かといって「あとはよろしく」の丸投げも機能しません。<Term>権限委譲</Term>とは、自分の業務を「決める」と「実行する」に分解し、渡してよいものを見極め、渡したあとは相手を<Term>決める人</Term>として扱いきることです。
        </Lead>
      </Hero>

      <Heading num="01">マネージャーの2つの業務 ― 「決める」か「実行する」か</Heading>
      <p>マネージャーの業務は、大別すると<Term>決める</Term>か<Term>実行する</Term>のどちらかしかありません。この2つはそれぞれ性質が違うので、投げるべき問いも変わります。まず自分の仕事を全部この2種類に振り分け、それぞれに問いを当てて「自分が手を離せるもの」を精査する ― これが権限委譲の第一歩です。</p>

      <Heading num="02">「決める」業務への2つの問い</Heading>
      <p>決定に関する業務は、次の2つの軸で見極めます。</p>
      <table>
        <thead>
          <tr><th>問い</th><th>見るもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">その決定は後戻りしにくいか？</td><td><Term>不可逆性</Term>。一度決めるとやり直しがきかないか</td></tr>
          <tr><td className="hl">その決定は事業に大きなインパクトがあるか？</td><td>間違えたときに事業へ与える影響の大きさ</td></tr>
        </tbody>
      </table>
      <p>後戻りができて、しかもインパクトも小さいなら、それは<Term>自分が決める必要のない</Term>決定です。逆に不可逆でインパクトも大きい決定こそ、マネージャーが握るべき領域です。</p>

      <Heading num="03">「実行する」業務への2つの問い</Heading>
      <p>手を動かす業務は、別の2軸で見ます。</p>
      <table>
        <thead>
          <tr><th>問い</th><th>見るもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">その業務はどれほど重要か？</td><td><Term>重要度</Term></td></tr>
          <tr><td className="hl">あなたがやったら結果が変わるか？</td><td><Term>関与度</Term>。担当者が誰でも結果が同じなら関与度は低い</td></tr>
        </tbody>
      </table>
      <p>重要でもなく、誰がやっても結果が変わらない業務は、<Term>渡すべき</Term>です。自分がやると結果が変わる業務にこそ、限られた時間を割きます。</p>

      <Heading num="04">権限設計表で棚卸しする</Heading>
      <p>頭の中だけで整理せず、決める・実行する業務を書き出して、<Term>不可逆性 × 影響インパクト</Term>（決める業務）または<Term>重要度 × 関与度</Term>（実行業務）で整理します。次はその一例です。</p>
      <table>
        <thead>
          <tr><th>業務の例</th><th>不可逆性</th><th>インパクト</th><th>判断</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">メンバーの評価</td><td>高</td><td>高</td><td>マネージャーが関与</td></tr>
          <tr><td className="hl">解職の判断</td><td>高</td><td>低〜中</td><td>チームリーダーに任せる</td></tr>
          <tr><td className="hl">チーム会議の実施判断</td><td>低</td><td>低</td><td>任せる</td></tr>
          <tr><td className="hl">定例ミーティングへの参加</td><td>—</td><td>自分が出なくても結果が変わらない</td><td>議事録でキャッチアップで十分</td></tr>
          <tr><td className="hl">パートナーA社の定例</td><td>中</td><td>一部関与（重要局面のみ）</td><td>基本は任せ、重要局面のみ関与</td></tr>
        </tbody>
      </table>
      <Aside label="ブレやすい軸に注意">
        <Term>不可逆性</Term>は比較的客観的に判断できますが、影響インパクト・重要度・関与度は主観や状況でブレます。1人の判断で決めきらず、上司レビューを挟むなど、目線を合わせる工夫が要ります。また「重要度も関与度も低い」と面と向かって言われるとメンバーのモチベーションは下がるので、伝え方には配慮します。
      </Aside>

      <Heading num="05">権限設計のフレームワーク ― 誰が何をするか</Heading>
      <p>「自分から剥がす」だけで終わらせず、その業務を<Term>誰が</Term>担うのかまで決めきります。表にするのが早道です。</p>
      <table>
        <thead>
          <tr><th>軸</th><th>置くもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">横軸</td><td>マネージャー／リーダー／メンバー（CEO／部長などに読み替えても可）</td></tr>
          <tr><td className="hl">縦軸</td><td>決めなければいけないこと・やらなければいけないタスク</td></tr>
        </tbody>
      </table>
      <p>最初から完璧を目指さず、<Term>30分程度</Term>でライトに作り、運用しながら項目を足し引きします。関係者が増えるほど ― とくに<Term>中途採用が多い組織</Term>ほど ― 効果が大きくなります。口頭で済む小さなチームでは必須ではありませんが、「これ誰が決めるんだっけ？」で迷う時間はもったいないものです。</p>

      <Heading num="06">権限がないと何が起きるか</Heading>
      <p>業務を任されても、1つ1つ上司の確認が必要な状態では、確認コストばかりかかって成果が出ません。さらに深刻なのは、<Term>「これは私の仕事ではない」という所有感の欠如</Term>です。自分ごとに思えないので、モチベーションが下がります。</p>
      <p>逆に、自分で決められる範囲が広いほど自分ごと感が生まれ、大きな成果につながります。パフォーマンスが出ていなかったメンバーに権限を渡したら劇的に改善した、という例もあります ― 不調の原因が、実は権限不足だったわけです。</p>

      <Heading num="07">渡したあとのコーチング ― 「じゃあ、それで」</Heading>
      <p>権限を渡したあとにやりがちなのが、口を出してしまうことです。「どうしたらいいですか？」と聞かれたら、答えを言わずに<Term>「どうしたらいいと思いますか？」</Term>と返します（コーチングへの切り替え）。権限設計で渡した以上、その人が<Term>決める人</Term>です。どんな答えが返ってきても<Term>「じゃあ、それで」</Term>と言いきります。</p>
      <p>もし明らかに危険な答えが返ってくるなら、そもそもその権限を渡すべきではありませんでした。渡すと決めたなら、<Term>クリティカルでない失敗はさせる</Term>覚悟が要ります。完璧主義は禁物です。</p>

      <Analogy label="💡 たとえるなら">
        権限委譲は、自転車の後ろを支えていた手を離す瞬間に似ています。ふらついても大けがしない場所を選んで手を離すのがマネージャーの仕事で、離すと決めたのに走りながら横で支え続けたら、いつまでも乗れるようになりません。「じゃあ、それで」は、その手を離す合図です。
      </Analogy>

      <Heading num="まとめ">権限委譲の要点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>業務を2種類に分ける</h4><p>「決める」は不可逆性×インパクト、「実行する」は重要度×関与度で見極める。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>誰が担うかまで決める</h4><p>権限設計表を30分で作り、運用しながら育てる。剥がすだけで終わらせない。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>渡したら決める人にする</h4><p>「どうしたいと思う？」と返し、「じゃあ、それで」。クリティカルでない失敗はさせる。</p></Card>
      </CardGrid>
      <p>権限委譲は、どんなチーム構造の上で行うかによって渡し方が変わります。文鎮型・構造型といった<Link href="/management/org/structure">組織構造とアサイン</Link>とあわせて考えると、より実践的になります。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/org/structure" tag="マネジメント">組織構造とアサイン</RelatedLink>
                    <RelatedLink href="/management/team/rules" tag="マネジメント">ルールと相互理解</RelatedLink>
                    <RelatedLink href="/management/team/operation" tag="マネジメント">チーム運営と3つの力</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
