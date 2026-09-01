import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DiagramFrame,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "品質計画と戦略" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>品質計画と戦略 ― どこに、どれだけ積むか</h1>
        <Lead>
          <Link href="/dev/process">開発プロセス</Link>では、工程をどう回すかを見ました。その工程の終わりで「もう出してよい」と言うには、判断の根拠が要ります。<Term>品質戦略</Term>とは、その根拠 ― どこにどれだけテストを積み、何を満たしたら十分とみなすか ― を、チームの誰が見ても同じ結論になる形に書き下したものです。<strong>「テストを書きましょう」は方針ではありません</strong>。書く量も、止め時も、そこからは決まらないからです。
        </Lead>
      </Hero>

      <Heading num="01">「十分」を決めないと、止め時が来ない</Heading>
      <p>
        規模が小さいうちは、書ける人が書けるだけ書けば足ります。人が増えると、その方法は成り立たなくなります。ある人はロジックを丹念に固め、別の人は画面が動けば良しとする。どちらも悪意はなく、ただ<Term>「十分」の定義を共有していない</Term>だけです。品質戦略という文書は、その定義を先に置くためにあります。
      </p>

      <table>
        <thead>
          <tr><th>決めておく項目</th><th>書き方の例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">品質目標</td><td>可用性99.9%、主要画面の応答1秒以内</td></tr>
          <tr><td className="hl">テスト方針</td><td>テストピラミッドを採る。E2Eは代表動線のみ</td></tr>
          <tr><td className="hl">レビュー方針</td><td>コードレビューを必須にする</td></tr>
          <tr><td className="hl">自動化方針</td><td>Unitと静的解析は毎コミットでCIに載せる</td></tr>
          <tr><td className="hl">リスク対応</td><td>決済まわりは重点的に厚くする</td></tr>
          <tr><td className="hl">リリース基準</td><td>重大バグ0件。既知の脆弱性0件</td></tr>
          <tr><td className="hl">品質指標</td><td>カバレッジ、バグ密度、障害件数</td></tr>
        </tbody>
      </table>

      <p>
        どの行も、突き詰めれば同じ問いへの答えです ― <strong>何を、どこまでやれば十分と言えるのか</strong>。答えが曖昧なままだと、テストの量もレビューの厳しさも人によってばらつき、品質は運任せになります。この文書をどう作り、実際にどのチェックを並べるかは、この見出しの配下にある「品質計画」で扱います。
      </p>

      <Heading num="02">テストピラミッド ― 配分そのものが方針になる</Heading>
      <p>
        方針の中心にあるのが<Term>テストピラミッド</Term>です。テストを段階に分け、<strong>下の層ほど数を多く、上の層ほど数を絞る</strong>という配分の指針を指します。同じ数のテストでも、どの層に置くかで実行時間と原因の特定しやすさが変わるため、配分の決定がそのまま方針になります。
      </p>

      <DiagramFrame
        slug="test-strategy-pyramid"
        aspect="640 / 340"
        caption="テストピラミッドとアイスクリームコーン型の対比。左のピラミッドは底のUnitが最も厚く、頂点のE2Eが最も薄い ― 速く、落ちたときに原因の箇所がすぐ絞れる。右のアイスクリームコーン型は上下が逆で、E2Eばかりが積み上がっている。実行に時間がかかり、落ちても原因の範囲が広いため、やがて誰も直さなくなる。テストが「遅くて、たまに落ちて、誰も直したがらない」状態になったら、形が崩れた合図。"
      />

      <p>
        各段階が何をどこまで本物のまま動かすのか、その境界は<Link href="/test/levels">テストの段階</Link>で詳しく見ます。ここで押さえておきたいのは、<strong>上に積むほど1件あたりのコストが上がる</strong>という一点です。E2Eは1件で多くを確かめられますが、落ちたときに疑う範囲も同じだけ広がります。
      </p>

      <Analogy label="💡 たとえるなら">
        食事のバランスに似ています。主食(Unit)をしっかり摂り、おかず(Integration)を適量、デザート(E2E)は少しだけ。デザートばかりでは重くて続きませんが、主食だけでも画面をまたぐ不具合は見つかりません。
      </Analogy>

      <Heading num="03">派生形はアーキテクチャで決まる</Heading>
      <p>
        ピラミッドは、手動とE2Eに偏った開発への反省から広まった考え方です。ただし、<Term>あらゆるシステムに同じ配分が最適とは限りません</Term>。実際には構造に合わせた派生形がいくつも提案されています。
      </p>

      <DiagramFrame
        slug="test-strategy-variants"
        aspect="760 / 300"
        caption="4つの派生形を、段ごとの厚みの違いとして並べたもの。ピラミッドはUnitが最も厚い。ダイヤモンドはIntegrationを厚くしUnitを薄くする。トロフィーは静的解析とIntegrationをともに厚くする。ハニカムはIntegrationを厚くし、それをサービスの数だけ繰り返す。4つを見比べると動くのは主にIntegrationの厚みで、どの形もE2Eは薄いまま保たれている。"
      />

      <table>
        <thead>
          <tr><th>形</th><th>厚くする層</th><th>向くシステム</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">テストピラミッド</td><td>Unit</td><td>ロジックが中心にある一般的な構成</td></tr>
          <tr><td className="hl">テストダイヤモンド</td><td>Integration</td><td>DBや外部APIとのつなぎ目にバグが出る構成</td></tr>
          <tr><td className="hl">テスティングトロフィー</td><td>静的解析とIntegration</td><td>コンポーネントの結合込みで見たい<Link href="/frontend/react">React</Link>・SPA</td></tr>
          <tr><td className="hl">テストハニカム</td><td>Integration(サービスごと)</td><td><Link href="/design/architecture-microservices">マイクロサービス</Link>構成</td></tr>
        </tbody>
      </table>

      <p>
        どれを選んでも目的は同じ ― アイスクリームコーン型を避けることです。違うのは<strong>どの層を厚くすれば同じ効果が得られるか</strong>で、それはモジュールの分割粒度やサービスの数で決まります。合わない配分をそのまま輸入すると、かえって遅く壊れやすいスイートになります。
      </p>

      <Heading num="04">シフトレフト ― 欠陥は早く見つけるほど安い</Heading>
      <p>
        工程を左から右へ時系列に並べたとき、品質チェックをできるだけ左へ寄せる考え方を<Term>シフトレフト</Term>と呼びます。<Link href="/dev/requirements">要件定義</Link>や設計の段階でレビューを行い、コードを書いている最中に静的解析とUnitテストを回し、本番に近い環境での確認は最後に薄く残す。
      </p>
      <p>
        理由は単純で、<strong>欠陥は発見が遅れるほど、原因調査・修正・再テストの総額が跳ね上がる</strong>からです。要件の読み違いを要件レビューで直せば文書の修正で済みますが、リリース後に見つかれば、設計・実装・テスト・告知のすべてをやり直すことになります。工程ごとの費用の差は<Link href="/test/review">レビューと品質確認</Link>で図として見ます。
      </p>

      <Heading num="05">リスクベースドテスト ― 全部を同じ密度でテストしない</Heading>
      <p>
        時間も人も有限です。<Term>リスクベースドテスト</Term>は、機能ごとに「壊れたときの影響の大きさ」と「壊れる確率」を見積もり、<strong>その積が大きい機能ほどテストを厚くする</strong>考え方です。決済や個人情報の取り扱いは重点的に、表示崩れ程度で済む箇所は薄く、という濃淡をつけます。
      </p>
      <p>
        カバレッジを一律に何％と決める運用がうまくいかないのはこのためです。数字を揃えることが目的になると、リスクの低いコードに意味のないテストが積まれ、肝心の決済まわりは他と同じ厚みのまま残ります。<strong>カバレッジは目標ではなく、テストしていない箇所を見つける道具</strong>です。
      </p>

      <Aside label="この見出しで扱わないこと">
        テストケースを機械的に作る手順 ― 同値分割・境界値分析・デシジョンテーブル・ペアワイズ・状態遷移 ― は、この見出しの配下にある「テスト設計技法」が扱います。ここで決めるのは<Term>どこにどれだけ積むか</Term>まで、その配分の中で<Term>個々のケースをどう作るか</Term>はその先の話です。
      </Aside>

      <Heading num="まとめ">配分を決めるところまでが戦略</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>「十分」を先に書く</h4>
          <p>目標からリリース基準まで文書にする。書いていなければ、止め時は人によって変わる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>下に厚く、上に薄く</h4>
          <p>同じ数でも置く層で価値が変わる。配分そのものが方針になる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>形はアーキテクチャで決まる</h4>
          <p>動くのは主にIntegrationの厚み。合わない配分を輸入しない。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>早く、濃淡をつけて</h4>
          <p>左へ寄せるほど安く済む。リスクの大きい機能ほど厚くする。</p>
        </Card>
      </CardGrid>

      <p>
        配分が決まったら、次はその段が何をどこまで動かすのかを見ます。<Link href="/test/levels">テストの段階</Link>へ進みます。
      </p>

      <DocsFooter href="/test/strategy" />
    </DocsPage>
  );
}
