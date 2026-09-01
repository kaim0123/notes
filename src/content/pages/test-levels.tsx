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

export const metadata: Metadata = { title: "テストの段階" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>テストの段階 ― どこまでを本物のまま動かすか</h1>
        <Lead>
          <Link href="/test/strategy">品質計画と戦略</Link>では、どの層にどれだけ積むかという配分を決めました。では、その「層」は何によって分かれているのでしょうか。Unit・Integration・E2Eという名前は規模の大小のように聞こえますが、<strong>実際に分けているのは「どこまでを本物のまま動かすか」という範囲</strong>です。この一点が分かると、どのテストをどこに置くべきかが自分で決められるようになります。
        </Lead>
      </Hero>

      <Heading num="01">段階を分けている基準</Heading>
      <p>
        テストは必ず、<Term>本物のまま動かす部分</Term>と<Term>代役に置き換える部分</Term>に分かれます。データベースを本物のまま使うのか、それとも偽物を挟むのか。ブラウザを本当に立ち上げるのか、関数を直接呼ぶだけなのか。<strong>この境界線をどこに引いたかが、そのテストの段階を決めます</strong>。
      </p>
      <p>
        「大きいテスト・小さいテスト」という言い方では、この境界が見えません。同じ1つの機能を確かめるテストでも、境界の引き方を変えれば別の段階のテストになります。
      </p>

      <DiagramFrame
        slug="test-levels-scope"
        aspect="640 / 340"
        caption="4つの段階を入れ子で示したもの。最も内側のUnitは自分が書いたロジックだけを本物のまま動かし、外側はすべて代役に置き換える。Integrationはデータベースや外部サービスとの境界までを本物にし、APIはHTTPの入口とルーティングまで、E2Eはブラウザと画面まで含めて丸ごと本物のまま動かす。外側へ行くほど確かめられることは増えるが、1回の実行は遅くなり、落ちたときに原因を探す範囲も広がる。"
      />

      <Heading num="02">4つの段階と、その守備範囲</Heading>
      <p>
        この見出しの配下では、内側から順に次の段階を扱います。名前ではなく<strong>「何を本物のまま動かすか」の列</strong>で読んでください。
      </p>

      <table>
        <thead>
          <tr><th>段階</th><th>本物のまま動かすもの</th><th>そこでしか見つからない不具合</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Unit</td><td>自分が書いたロジックだけ</td><td>条件分岐の取り違え、境界値の扱い、計算誤り</td></tr>
          <tr><td className="hl">Integration</td><td>DB・外部サービスとの境界まで</td><td>SQLの誤り、スキーマとコードのずれ、外部APIの解釈違い</td></tr>
          <tr><td className="hl">API</td><td>HTTPの入口とルーティングまで</td><td>ステータスコード、認証の抜け、リクエストの検証漏れ</td></tr>
          <tr><td className="hl">E2E</td><td>ブラウザと画面まで丸ごと</td><td>画面遷移の断絶、フロントとバックの契約のずれ</td></tr>
        </tbody>
      </table>

      <p>
        右の列が、その段階を置く理由です。<strong>1つ内側の段階では原理的に見つけられないものだけ</strong>が、そこに書く価値のあるテストです。逆に言えば、内側で見つかるものを外側に置いても、遅くて壊れやすいだけの重複になります。
      </p>

      <Aside label="APIを独立した段階として置く理由">
        Integrationの一種と見ることもできますが、確かめる対象がはっきり違います。<Link href="/backend/api-rest">RESTの作法</Link>やステータスコード、認証の要否といった<Term>外に向けた契約</Term>は、関数を直接呼ぶテストでは検証できません。かといってブラウザを立ち上げる必要もない ― この中間に居場所があります。
      </Aside>

      <Heading num="03">外へ行くほど、遅く、原因が絞れなくなる</Heading>
      <p>
        段階に沿って、2つの性質が逆を向いて動きます。<strong>片方を得れば、もう片方を失う</strong>という関係です。
      </p>

      <DiagramFrame
        slug="test-levels-tradeoff"
        aspect="640 / 280"
        caption="段階に沿った2つの性質の逆転。上の楔は左端で最も厚く、速さと原因の特定しやすさがUnit側ほど高いことを示す。下の楔は逆に右端で最も厚く、本番への近さと落ちたときの意味の重さがE2E側ほど大きいことを示す。どちらか一方を選ぶ問題ではなく、下に厚く積んで速さと診断しやすさを取り、上に薄く残して現実味を確保する ― これがテストピラミッドの理屈にあたる。"
      />

      <p>
        Unitテストが落ちたとき、原因はそのテストが囲んだ枠の中にしかありません。E2Eが落ちたときは、フロント・API・ロジック・DB・ネットワーク・テストの待ち方まで、すべてが容疑者になります。<Term>1件で確かめられる量が多いほど、落ちたときに絞り込む量も多い</Term> ― これが「上に薄く」の実務上の理由です。
      </p>

      <Analogy label="💡 たとえるなら">
        健康診断に似ています。血液検査(Unit)は項目ごとに数値が出るので、異常があればどこが悪いかすぐ分かります。フルマラソンを走ってみる(E2E)のは最も現実に近い確認ですが、途中で倒れたとき、心臓なのか膝なのか脱水なのかは、それだけでは分かりません。
      </Analogy>

      <Heading num="04">同じ不具合を2つの段階で捕まえない</Heading>
      <p>
        段階を意識せずに書くと、同じ不具合が複数の段階で重複して検出されるようになります。害は2つあります。<strong>実行時間が無駄に伸びること</strong>と、<strong>1つの修正で複数のテストが同時に落ちて、原因の場所が分かりにくくなること</strong>です。
      </p>

      <table>
        <thead>
          <tr><th>よくある重複</th><th>本来の置き場所</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">E2Eで入力値のバリデーションを全パターン試す</td><td>Unit。E2Eには代表の1本だけ残す</td></tr>
          <tr><td className="hl">E2Eでエラーメッセージの文言をすべて確認する</td><td>Unit、または表示部分のテスト</td></tr>
          <tr><td className="hl">Integrationで計算ロジックの分岐を網羅する</td><td>Unit。DBを挟む必要がない</td></tr>
          <tr><td className="hl">Unitでモックを重ねてDBの挙動を再現する</td><td>Integration。代役では本物とずれる</td></tr>
        </tbody>
      </table>

      <p>
        最後の行は逆向きの間違いです。<strong>内側に寄せすぎても壊れます</strong> ― 代役で本物の挙動を模倣しようとした時点で、そのテストが確かめているのは「自分が書いた代役の正しさ」になってしまいます。境界の引き方そのものは<Link href="/test/stability">テストを安定させる</Link>で扱います。
      </p>

      <Heading num="05">道具は段階に対応する</Heading>
      <p>
        JavaScript・TypeScriptの世界では、内側の3段階をVitest、最も外側をPlaywrightが担当する構成が標準的です。<strong>道具が2つに分かれているのは、境界の引き方が違うから</strong>であって、優劣ではありません。
      </p>
      <p>
        Unit・Integration・APIはいずれもプロセスの中で完結するので、同じテストランナーで書けます。E2Eだけはブラウザを本当に起動して操作する必要があり、そのための別の仕組みが要ります。ここで<Link href="/language/js-async">非同期処理</Link>の待ち方が問題になり始めるのですが、その話は配下の各ページに譲ります。実行を<Link href="/dev/ci-actions">CI</Link>にどう載せるかも同じく、段階ごとに扱いが変わります。
      </p>

      <Heading num="まとめ">境界の位置が、段階を決める</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>分けているのは規模ではない</h4>
          <p>どこまでを本物のまま動かすか ― 境界線の位置が段階を決める。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>その段階でしか見つからないものを書く</h4>
          <p>内側で捕まるものを外側に置いても、遅い重複が増えるだけ。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>広く見るほど、原因は絞れない</h4>
          <p>1件で確かめられる量と、落ちたときに疑う量は同じだけ増える。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>内側に寄せすぎても壊れる</h4>
          <p>代役で本物を模倣したテストは、代役の正しさしか確かめていない。</p>
        </Card>
      </CardGrid>

      <p>
        段階の並びが見えたところで、書く順序そのものを反転させる進め方を見ます。<Link href="/test/tdd">テスト駆動開発(TDD)</Link>へ進みます。
      </p>

      <DocsFooter href="/test/levels" />
    </DocsPage>
  );
}
