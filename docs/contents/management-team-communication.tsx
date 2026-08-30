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
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "コミュニケーション",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>コミュニケーション ― 対話でチームを動かす</h1>
        <Lead>
          マネジメントの実体は、その大半が<Term>コミュニケーション</Term>です。指示・相談・雑談・フィードバック ― どれも言葉のやり取りで成り立っています。そして幸いなことに、その多くは才能ではなく<Term>技術</Term>として磨けます。ここでは<Link href="/management/team">チームのマネジメント（メゾ）</Link>で挙げた対話の技を、1on1・傾聴・アサーション・ファシリテーション・会議運営に分けて実践的に掘り下げます。すべての土台となる<Link href="/management/team/psychological-safety">心理的安全性</Link>と対で押さえてください。
        </Lead>
      </Hero>

      <Heading num="01">マネジメントはコミュニケーションでできている</Heading>
      <p>リーダーシップは究極的には<Term>他者との関わり方</Term>そのものです。どれほど良い戦略も、伝わらなければ動きません。コミュニケーションは大きく2方向に分けられます。相手を理解する<Term>受信（聴く）</Term>と、自分の考えを届ける<Term>発信（伝える）</Term>です。多くの人は発信ばかりを鍛えようとしますが、実は<Term>受信の質が対話全体の質を決めます</Term>。相手が「わかってもらえた」と感じて初めて、こちらの言葉も届くからです。以下では受信（傾聴）から発信（アサーション）、そしてそれらを場に広げる技（ファシリテーション・会議運営）へと順に見ていきます。</p>

      <Heading num="02">1on1 ― メンバーのための時間</Heading>
      <p><Term>1on1</Term>は、上司とメンバーが定期的に行う1対1の対話です。評価面談との決定的な違いは、これが<Term>査定の場ではなく、メンバーのための時間</Term>だという点です。主役はメンバーであり、上司は聞き役に回ります。</p>
      <table>
        <thead>
          <tr><th></th><th>1on1</th><th>評価面談</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">目的</td><td>メンバーの成長・関係構築</td><td>成果の査定・処遇の伝達</td></tr>
          <tr><td className="hl">主役</td><td>メンバー</td><td>上司（評価者）</td></tr>
          <tr><td className="hl">頻度</td><td>週1〜隔週など高頻度</td><td>半期〜四半期に1回</td></tr>
        </tbody>
      </table>
      <p>よくある失敗は、1on1が<Term>進捗確認（詰めの場）</Term>になってしまうことです。それでは心を開けず、本音は出てきません。テーマはメンバーに委ね、仕事の悩み・キャリア・体調・チームへの違和感など、何を話してもいい場にします。上司の仕事は答えを出すことではなく、<Term>問いを投げ、話を引き出し、一緒に考える</Term>ことです。査定と育成を混ぜないためにも、処遇の話は評価面談へ切り分けます。</p>

      <Heading num="03">傾聴 ― まず受け止める</Heading>
      <p><Term>傾聴（アクティブリスニング）</Term>は、評価や助言を急がず、相手の話を最後まで受け止めて理解する聴き方です。人は「アドバイスされる」より先に「<Term>わかってもらえた</Term>」を求めています。ここを飛ばして助言に走ると、正しいことを言っても相手の心は閉じます。傾聴には具体的な技があります。</p>
      <table>
        <thead>
          <tr><th>技</th><th>やること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">うなずき・相づち</td><td>「聞いている」を態度で示し、話しやすくする</td></tr>
          <tr><td className="hl">オウム返し（バックトラッキング）</td><td>相手の言葉をそのまま返し、理解を確認する</td></tr>
          <tr><td className="hl">言い換え・要約</td><td>「つまり〜ということ？」と整理し、ズレを正す</td></tr>
          <tr><td className="hl">感情への言及</td><td>「それは大変だったね」と、事実の裏の気持ちを受け止める</td></tr>
          <tr><td className="hl">沈黙を待つ</td><td>相手が考えている間、口を挟まず待つ</td></tr>
        </tbody>
      </table>
      <p>ロジャーズが説いた傾聴の土台は、<Term>共感的理解・受容・自己一致</Term>の3つの態度です。技だけを真似ても、相手を評価しない受容の姿勢がなければ見透かされます。傾聴は<Link href="/management/team/psychological-safety">心理的安全性</Link>をつくる最も具体的な行為でもあります。</p>

      <Heading num="04">アサーション ― 尊重しつつ率直に伝える</Heading>
      <p>受け止めたら、今度は伝える番です。<Term>アサーション</Term>は、相手を尊重しながら自分の考えも率直に伝える、対等な自己表現です。伝え方は3タイプに分かれ、目指すのはその中間です。</p>
      <table>
        <thead>
          <tr><th>タイプ</th><th>特徴</th><th>結果</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">非主張的（ノン・アサーティブ）</td><td>言いたいことを飲み込む</td><td>自分が我慢し、不満が溜まる</td></tr>
          <tr><td className="hl">攻撃的（アグレッシブ）</td><td>相手を押しのけて主張する</td><td>相手を傷つけ、関係が壊れる</td></tr>
          <tr><td className="hl">アサーティブ</td><td>相手も自分も尊重して伝える</td><td>対等な対話が成り立つ（目指す姿）</td></tr>
        </tbody>
      </table>
      <p>実践のコツは2つです。第一に<Term>Iメッセージ</Term>。「（あなたは）なぜできないの」ではなく「（私は）こうしてもらえると助かる」と、主語を自分にして伝えると、相手は責められた感じを受けにくくなります。第二に<Term>DESC法</Term>という組み立てです。</p>
      <Steps>
        <li><strong>D（Describe）</strong>：事実を客観的に描写する ―「この資料、締切を2日過ぎているね」</li>
        <li><strong>E（Express）</strong>：自分の気持ちを伝える ―「進行が心配になっている」</li>
        <li><strong>S（Specify）</strong>：具体的な提案をする ―「次からは前日に一度共有してほしい」</li>
        <li><strong>C（Choose）</strong>：相手の選択・応答を待つ ―「どうかな？」</li>
      </Steps>
      <p>事実と感情と要望を切り分けることで、感情的な非難にならず、それでいて言うべきことは伝わります。これは<Link href="/management/team/conflict">コンフリクトマネジメント</Link>で感情と論点を分ける発想とも一致します。</p>

      <Heading num="05">ファシリテーション ― 議論を成果に変える</Heading>
      <p>1対1の技を集団に広げたものが<Term>ファシリテーション</Term>です。ファシリテーターは自分の意見を通す人ではなく、<Term>全員の参加と合意形成を促す進行役</Term>です。中立の立場で「場」を機能させることに徹します。基本の流れは次の通りです。</p>
      <Steps>
        <li><strong>発散</strong>：まず判断を保留し、意見をできるだけ多く出させる（ブレインストーミング）。</li>
        <li><strong>整理</strong>：出た意見をグルーピングし、論点を可視化する。</li>
        <li><strong>収束</strong>：評価軸を決めて絞り込み、結論へ導く。</li>
        <li><strong>合意</strong>：決まったこと・次のアクション・担当を明確にする。</li>
      </Steps>
      <p>コツは、<Term>発散と収束を混ぜない</Term>ことです。アイデアを出している最中に「それは無理」と評価が入ると、発言が止まります。声の大きい人だけが話す状態を避け、静かな人に話を振り、対立が出たら論点として板書する ― こうした関与が、多様な意見を成果に変えます。</p>

      <Heading num="06">会議運営 ― 目的なき会議を減らす</Heading>
      <p>会議は、うまく設計しなければチーム全員の時間をまとめて奪う装置になります。目的の不明確な会議ほど、生産性を下げるものはありません。良い会議は「何を決める場か」がはっきりしています。まず会議を目的で分類します。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>ゴール</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">意思決定</td><td>結論を出す。決裁者と選択肢を用意しておく</td></tr>
          <tr><td className="hl">アイデア出し</td><td>案を広げる。発散に徹し評価を後回しに</td></tr>
          <tr><td className="hl">情報共有</td><td>認識を揃える。多くは資料の非同期共有で代替できる</td></tr>
        </tbody>
      </table>
      <p>実務では、次の型を回すだけで会議の質は大きく変わります。</p>
      <Steps>
        <li><strong>アジェンダを事前配布</strong>：目的・議題・ゴール・時間配分を先に共有する。</li>
        <li><strong>ゴールを冒頭で宣言</strong>：「今日はAを決めます」と最初に言い切る。</li>
        <li><strong>議論はファシリテートする</strong>：発散→収束の順で進め、脱線は駐車場（parking lot）に退避。</li>
        <li><strong>決定事項とToDoで締める</strong>：「誰が・いつまでに・何を」を確認して終える。</li>
      </Steps>
      <Aside label="その会議は本当に必要か">最も効果的な会議改善は、<Term>会議をなくすこと</Term>です。単なる情報共有ならドキュメント共有で足り、参加者全員の時間を拘束する価値があるか(=意思決定や創発が起きるか)を毎回問い直します。ナレッジの非同期共有は<Link href="/management/team">ナレッジマネジメント</Link>の発想とも通じます。</Aside>

      <Analogy label="💡 たとえるなら">
        コミュニケーションの技は<Term>キャッチボール</Term>に似ています。まず相手の球をしっかり受ける（傾聴）。次に相手が捕りやすい球を投げ返す（アサーション）。上手い人は剛速球を投げつける人ではなく、相手が取れる位置に、取れる速さで返せる人です。ファシリテーションや会議運営は、これを大人数で同時に成立させる技 ― いわば全員参加のキャッチボールを回す司会役なのです。
      </Analogy>

      <Heading num="まとめ">受信を土台に、発信を場へ広げる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>1on1と傾聴</h4><p>メンバーのための時間で、まず「わかってもらえた」をつくる。受信が対話の質を決めます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>アサーション</h4><p>Iメッセージ・DESC法で、相手も自分も尊重して率直に伝えます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ファシリテーションと会議</h4><p>発散と収束を分け、目的とゴールを明確にして、対話を成果に変えます。</p></Card>
      </CardGrid>
      <p>対話の技は、率直に話せる土台があってこそ効きます。<Link href="/management/team/psychological-safety">心理的安全性</Link>とセットで押さえ、対立が起きたときの扱いは<Link href="/management/team/conflict">コンフリクトマネジメント</Link>へ進みましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/team" tag="マネジメント">チームのマネジメント（メゾ）</RelatedLink>
                    <RelatedLink href="/management/team/psychological-safety" tag="マネジメント">心理的安全性</RelatedLink>
                    <RelatedLink href="/management/team/conflict" tag="マネジメント">コンフリクトマネジメント</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
