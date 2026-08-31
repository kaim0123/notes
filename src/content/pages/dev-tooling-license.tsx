import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "知的財産とライセンス" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>知的財産とライセンス ― 誰のもので、どう使ってよいか</h1>
        <Lead>
          プログラムやデータには、それを生み出した人の権利があります。開発では、自分たちが作るものの権利と、他者が作ったものを使う条件の両方を理解しておく必要があります。中心となるのが<Term>著作権</Term>と<Term>特許</Term>、そして利用条件を定める<Term>ライセンス</Term>です。
        </Lead>
      </Hero>

      <Heading num="01">知的財産権 ― 表現とアイデア</Heading>

      <table>
        <thead>
          <tr><th>権利</th><th>保護する対象</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">著作権</td>
            <td>表現されたもの(プログラム、文書、画像など)</td>
            <td>創作した時点で自動的に発生。登録は不要</td>
          </tr>
          <tr>
            <td className="hl">特許</td>
            <td>発明(技術的アイデア)</td>
            <td>出願・審査・登録が必要。一定期間、独占的に実施できる</td>
          </tr>
        </tbody>
      </table>

      <p>
        プログラムそのものは著作権で守られ、その背後にある新規な技術的アイデアは特許の対象になり得ます。<Term>「表現」を守るのが著作権、「アイデア」を守るのが特許</Term>と捉えると区別しやすくなります。
      </p>

      <Analogy label="💡 たとえるなら">
        著作権と特許は「小説」と「新しい調理法」の違いに似ています。書き上げた小説の文章は書いた瞬間に守られますが、誰でも似た物語は書けます。一方、新しい調理法を独占したいなら、届け出て認められる必要があります。
      </Analogy>

      <Heading num="02">職務著作 ― 会社で作ったものは誰のものか</Heading>
      <p>
        従業員が業務として作成したプログラムの著作権は、原則として<Term>職務著作</Term>として会社に帰属します。個人が趣味で作ったものとは扱いが異なる点は、実務でも押さえておく必要があります。副業や個人開発では、就業規則と職務との関連の有無が問題になりやすい部分です。
      </p>

      <Heading num="03">OSSライセンス ― 義務がどこまで及ぶか</Heading>
      <p>
        <Term>ライセンス</Term>は、ソフトウェアを「どう使ってよいか」を定めた利用許諾です。実務で効いてくるのは、<Term>それを組み込んだ自分の配布物にどこまで義務が及ぶか</Term>という一点です。
      </p>

      <DiagramFrame
        slug="dev-tooling-license-spectrum"
        aspect="640 / 280"
        caption="OSSライセンスを、自分の配布物にどこまで義務が及ぶかで並べたスペクトル。左の寛容型は著作権表示を残せば自分のコードは公開不要。中央の準コピーレフトは改変したファイルだけを同じ条件で公開する。右の強いコピーレフトは、組み込んだ配布物全体を同じ条件で公開する義務が生じる。義務は間接依存にも及ぶため、直接依存だけを確認しても足りない。"
      />

      <table>
        <thead>
          <tr><th>分類</th><th>義務</th><th>使いどころ</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">寛容型</td>
            <td>著作権表示と免責事項を残す</td>
            <td>商用製品にも組み込みやすい。多くの依存がこれ</td>
          </tr>
          <tr>
            <td className="hl">準コピーレフト</td>
            <td>改変したファイルは同じ条件で公開する</td>
            <td>ライブラリとして使うぶんには扱いやすい</td>
          </tr>
          <tr>
            <td className="hl">強いコピーレフト</td>
            <td>組み込んだ配布物全体を同じ条件で公開する</td>
            <td>公開を前提にできる場合に限る</td>
          </tr>
        </tbody>
      </table>

      <Aside label="間接依存まで見る">
        ライセンスの義務は、直接入れたパッケージだけでなく<Link href="/dev/tooling-deps">その裏にある数百の間接依存</Link>にも及びます。人力で全部を確認するのは不可能なので、依存ツリー全体のライセンスを機械的に収集し、許可した一覧に無いものが混ざったらCIで落とす、という形にします。<Link href="/dev/tooling-security">部品表(SBOM)</Link>があれば、この確認はそのまま流用できます。
      </Aside>

      <p>
        判断に迷う組み合わせは自己判断せず、法務に確認するのが安全です。<Term>あとから外すのは非常に高くつきます</Term> ―
        設計の根幹に入り込んだ後では、置き換えが実質不可能になることもあります。
      </p>

      <Heading num="04">自分たちが出す側になるとき</Heading>
      <p>
        社内ツールを公開する、ライブラリを配る、といった場面では、<Term>ライセンスを明示していないものは「使ってよい」ことにならない</Term>点に注意します。リポジトリにライセンスファイルが無ければ、法的には全権利が留保された状態です。公開するなら、どう使ってほしいかを明示的に選んで書きます。
      </p>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>表現とアイデア</h4>
          <p>表現を守るのが著作権、技術的アイデアを守るのが特許です。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>義務の範囲で分類する</h4>
          <p>
            自分の配布物にどこまで公開義務が及ぶか。これが実務上の分かれ目です。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>機械的に確認する</h4>
          <p>
            間接依存まで及ぶため、収集とCIでの検査を仕組みにします。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/dev/tooling-license" />
    </DocsPage>
  );
}
