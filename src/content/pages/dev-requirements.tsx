import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "要件定義" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>要件定義 ― 何を作るかを決める</h1>
        <Lead>
          開発の最上流にあるのが要件定義です。ここで「何を作るか」を取り違えると、その誤りは設計・実装・テストのすべてに波及します。中心となるのは<Term>機能要件</Term>と<Term>非機能要件</Term>の区別、要件を<Term>判定できる形</Term>にすること、そして関係者との<Term>合意</Term>です。
        </Lead>
      </Hero>

      <Heading num="01">機能要件と非機能要件</Heading>
      <p>
        要件は大きく2種類に分かれます。「何ができるか」を表す機能要件と、「どれだけうまく動くか」を表す非機能要件です。
      </p>

      <table>
        <thead>
          <tr><th>区分</th><th>内容</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">機能要件</td>
            <td>システムが何ができるか</td>
            <td>業務機能、画面、帳票、検索・登録・集計などの処理</td>
          </tr>
          <tr>
            <td className="hl">非機能要件</td>
            <td>機能をどれだけうまく提供するか</td>
            <td>性能、可用性、セキュリティ、運用・保守のしやすさ</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        レストランにたとえると、機能要件は「メニューに何があるか」、非機能要件は「何分で出てくるか・衛生的か・混雑時でも捌けるか」です。料理の種類が揃っていても、1時間待たされたり不衛生だったりすれば、店として成立しません。
      </Analogy>

      <Heading num="02">「速い」ではなく「3秒以内」</Heading>
      <p>
        非機能要件は、そのままの言葉では合否を判定できません。性能なら<Term>レスポンスタイム</Term>(要求してから応答が返るまでの時間)や<Term>スループット</Term>(単位時間あたりの処理量)といった具体的な数値で表します。
      </p>

      <DiagramFrame
        slug="dev-requirements-quantify"
        aspect="640 / 280"
        caption="あいまいな要求を、テストで判定できる要件に変換する流れ。左の「速いこと」「落ちないこと」「安全であること」「使いやすいこと」は、そのままでは合否を判定できない。中央で「いつ(条件)・どの操作が・どれだけ(基準)」の3点を数値で埋めると、右のように「ピーク時、検索の応答が3秒以内」といった判定可能な形になる。数値が決まらない要件は、合意されていない要件と同じ。"
      />

      <p>
        判定できない要件は、受け入れの場で必ずもめます。<Term>数値が決まらない要件は、合意されていない要件と同じ</Term>と考え、決められないなら「誰がいつ決めるか」までを要件として書き残します。
      </p>

      <Heading num="03">ステークホルダと合意</Heading>
      <p>
        要件は誰か一人の頭の中だけでは決まりません。<Term>ステークホルダ</Term>(利害関係者)には発注者、利用部門、運用部門などがいて、それぞれ求めるものが異なります。要件の合意には、関係者を特定し、認識のずれを埋めるやり取りが不可欠です。
      </p>
      <p>
        なお、システム全体に対する<Term>システム要件定義</Term>と、その中のソフトウェアに対する<Term>ソフトウェア要件定義</Term>は区別されます。ハードウェアや人手による運用を含む全体像を先に定め、その一部としてソフトウェアの要件を詰めていく、という関係です。
      </p>

      <Aside label="反復型でも要件定義は消えない">
        <Link href="/dev/process-agile">アジャイル</Link>では要件を一度に固めませんが、要件定義という行為がなくなるわけではありません。<Term>まとめて先にやるか、少しずつ繰り返しやるか</Term>が違うだけで、「誰が何のために使うのか」「どこまでできたら完成か」を決める必要は同じです。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>2種類の要件を分ける</h4>
          <p>
            「何ができるか」の機能要件と、「どれだけうまく」の非機能要件を区別します。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>非機能は数値で表す</h4>
          <p>テストで判定できる形に定量化して、初めて要件になります。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>合意はやり取りで作る</h4>
          <p>
            ステークホルダを特定し、認識のずれを埋めることが要件確定の前提です。
          </p>
        </Card>
      </CardGrid>

      <p>
        要件を「何を作るか」の言葉で決めたら、次はそれを<Link href="/dev/requirements-modeling">図や表で表現</Link>し、設計へ渡せる形にしていきます。
      </p>

      <DocsFooter href="/dev/requirements" />
    </DocsPage>
  );
}
