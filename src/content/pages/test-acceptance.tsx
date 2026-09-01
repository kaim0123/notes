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

export const metadata: Metadata = { title: "受入れ基準とレビュー技法" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>受入れ基準とレビュー技法 ― 「できた」と「受け取る」を突き合わせる</h1>
        <Lead>
          <Link href="/test/code-review">コードレビュー</Link>までは、作る側の内部での確認でした。最後に残るのが、<strong>作る側の「できました」と、受け取る側の「受け取ります」を突き合わせる工程</strong>です。ここで揉めるかどうかは、確認のやり方ではなく<Term>基準をいつ書いたか</Term>でほぼ決まります。あわせて、これまで各所で触れてきたレビュー技法を、選び方の軸として整理します。
        </Lead>
      </Hero>

      <Heading num="01">受入れテストと検収 ― 責任が入れ替わる</Heading>
      <p>
        <Term>受入れテスト</Term>は、発注者や利用者が「納品してよいか」を自らの視点で確認するテストです。要件どおりに動くと確認できたら、正式に成果物を受け取る<Term>検収</Term>へ進みます。<strong>検収が済んだ時点で、成果物の責任は作る側から受け取る側へ移ります</strong>。
      </p>

      <Analogy label="💡 たとえるなら">
        引っ越しの立ち会いです。業者が「運び終わりました」と言っても、施主が傷や不足がないかを自分の目で確認し(受入れテスト)、問題なければ受領のサインをする(検収)。<strong>サインした瞬間から、以後の管理責任は施主に移ります</strong>。
      </Analogy>

      <p>
        ここまでの段階のテストとの違いは、<Term>誰の視点で確認するか</Term>にあります。開発側のテストは「仕様どおりに作れているか」を見ますが、受入れテストは<strong>「その仕様で、本当にやりたかったことができるか」</strong>を見ます。仕様そのものが間違っていた場合、それが表面化する最後の機会です。
      </p>

      <Heading num="02">基準を書く時期が、確認の性質を決める</Heading>

      <DiagramFrame
        slug="test-acceptance-timing"
        aspect="640 / 320"
        caption="受入れ基準を書く時期による違い。あとから突き合わせる場合、要件を決め、作り、テストしたあとの確認の段で初めて基準を照合するため、解釈の違いが見つかると要件まで戻ることになり、手戻りが最大の位置で発覚する。先に書く場合、要件を決める段で受入れ基準も書くため、作る側は完成の定義が分かった状態で作り始められ、テスト項目もその基準から導ける。同じ工程を同じ順に通っていて、違うのは基準を書く時期だけ。先に書くと、最後の確認が交渉ではなく照合に変わる。"
      />

      <p>
        <Link href="/test/strategy">シフトレフト</Link>の具体例が、これです。基準を先に書くという一手だけで、<strong>最後の確認が「交渉」ではなく「照合」に変わります</strong>。実装が始まってから「そういう意味ではなかった」と分かるのと、着手前に分かるのとでは、修正の総額が桁で違います。
      </p>

      <Heading num="03">基準は、確認できる形で書く</Heading>
      <p>
        「使いやすいこと」は基準になりません。<Link href="/test/non-functional">機能以外のテスト</Link>で見た閾値の話と同じで、<strong>誰が確認しても同じ結論になる形</strong>まで落とす必要があります。
      </p>

      <table>
        <thead>
          <tr><th>基準になっていない</th><th>基準になっている</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">注文をキャンセルできること</td><td>発送前の自分の注文をキャンセルすると、一覧の表示が「キャンセル済」に変わり、在庫が戻る</td></tr>
          <tr><td className="hl">エラーが適切に表示されること</td><td>理由が未入力のとき、入力欄の直下に理由を促す表示が出て、送信されない</td></tr>
          <tr><td className="hl">動作が速いこと</td><td>一覧の表示が、95パーセンタイルで1秒以内に完了する</td></tr>
          <tr><td className="hl">セキュリティに配慮すること</td><td>他人の注文のURLを直接開くと、内容が表示されない</td></tr>
        </tbody>
      </table>

      <p>
        右の列は、そのまま<Link href="/test/e2e-viewpoints">項目表</Link>の行になります。<strong>受入れ基準と、テストの項目は、書き方が同じ</strong>です ― 違うのは、前者が合意の対象で、後者が実行の対象だという点だけ。だから受入れ基準を先に書くと、テスト項目を別途起こす手間も減ります。
      </p>

      <Aside label="「完成の定義」として共有する">
        1つの機能について「これが満たされたら完成」という条件をチームで共有しておくと、<strong>作る側が自分で完成を判定できるようになります</strong>。テストが書かれているか、レビューを通ったか、非機能の基準を満たしているか ― 受入れ基準に、これらの工程上の条件を足した形が、いわゆる完成の定義です。
      </Aside>

      <Heading num="04">レビュー技法を、2つの軸で選ぶ</Heading>
      <p>
        <Link href="/test/review">レビューと品質確認</Link>で挙げた4種類は、名前で覚えるより<strong>形式の重さと人数の軸に置いてみる</strong>と選びやすくなります。
      </p>

      <DiagramFrame
        slug="test-acceptance-techniques"
        aspect="700 / 320"
        caption="レビューの4つの技法を、形式の重さと参加人数の2軸に配置したもの。ペアやモブでの確認は書きながらその場で見る最も軽い技法。ウォークスルーは作成者が説明して参加者が質問する形で、教育と知識共有にも向く。技術レビューは専門家が技術的な妥当性を評価する。インスペクションは役割を定めチェックリストで欠陥を潰す最も形式的な技法。重い技法ほど見つかる欠陥は多いが、そのぶん時間と人数を消費するため、リスクの大きさに応じて選ぶ。"
      />

      <table>
        <thead>
          <tr><th>状況</th><th>選ぶ技法</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">日常的な実装の確認</td><td>ペア・モブでの確認、または軽いウォークスルー</td></tr>
          <tr><td className="hl">新メンバーへの知識共有を兼ねたい</td><td>ウォークスルー(作成者が説明する形が教育になる)</td></tr>
          <tr><td className="hl">アーキテクチャの選択</td><td>技術レビュー(<Link href="/design/docs-adr">決定記録</Link>を対象にする)</td></tr>
          <tr><td className="hl">壊れたときの影響が特に大きい箇所</td><td>インスペクション(役割を定め、チェックリストで潰す)</td></tr>
          <tr><td className="hl">要件・受入れ基準そのもの</td><td>インスペクション寄り(ここでの欠陥が最も高くつく)</td></tr>
        </tbody>
      </table>

      <p>
        最終行が、このページの主題と技法の軸が交わるところです。<strong>受入れ基準は、最も丁寧にレビューする価値のある成果物</strong>です ― <Link href="/test/review">工程ごとの修正コスト</Link>で見たとおり、ここでの取りこぼしはすべての後工程を巻き込みます。
      </p>

      <Heading num="05">合意しても、解釈は分かれる</Heading>
      <p>
        基準を先に書き、レビューも通した ― それでも解釈の違いは残ります。<strong>文章は、書いた人と読む人で違う絵を描かせる</strong>からです。差を減らす手立ては、突き詰めると1つに集約されます。
      </p>

      <table>
        <thead>
          <tr><th>手立て</th><th>効く理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">具体例を添える</td><td>「発送前なら」ではなく「発送準備中はどうなるか」まで書く</td></tr>
          <tr><td className="hl">画面や動きを見せる</td><td>文章より解釈の幅が狭い。早い段階で見せるほど安い</td></tr>
          <tr><td className="hl">対象外を明記する</td><td>やらないことを書かないと、やると思われる</td></tr>
          <tr><td className="hl">小さく区切って何度も渡す</td><td>ずれが小さいうちに見つかる。1回の受け渡しを大きくしない</td></tr>
        </tbody>
      </table>

      <p>
        3行目は<Link href="/test/e2e-viewpoints">観点表の「対象外」列</Link>とまったく同じ発想です ― <strong>書かれていないものは、まだ気づいていないのか意図的に外したのか、後から誰にも分かりません</strong>。受入れ基準においては、それが期待値の食い違いとして表面化します。
      </p>

      <Heading num="まとめ">先に書けば、最後は照合になる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>検収で責任が移る</h4>
          <p>受け取る側の視点で「やりたかったことができるか」を見る、最後の機会。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>違うのは、基準を書く時期だけ</h4>
          <p>先に書けば交渉が照合に変わる。工程も順序も同じまま。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>受入れ基準とテスト項目は同じ形</h4>
          <p>合意の対象か、実行の対象かが違うだけ。先に書けば二度手間も減る。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>やらないことを書く</h4>
          <p>書かれていない範囲は、やると思われる。</p>
        </Card>
      </CardGrid>

      <p>
        テストセクションはここまでです。自動チェックの配分から、段階ごとの書き方、安定させる手立て、機能以外の物差し、そして人の目による確認まで ― <Link href="/test">テスト</Link>の全体像に戻って見返すと、それぞれの位置づけがはっきりします。
      </p>

      <DocsFooter href="/test/acceptance" />
    </DocsPage>
  );
}
