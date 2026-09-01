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

export const metadata: Metadata = { title: "テストダブル" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>テストダブル ― 代役は、最小限に</h1>
        <Lead>
          <Link href="/test/stability">テストを安定させる</Link>で挙げた3つの源のうち、<Term>外部への依存</Term>を断つ手立てがこれです。外部APIやDBを本物のまま使えばテストは遅く不安定になりますが、だからといって何もかも代役にすると<strong>実装を書き換えるたびに壊れるのに、本番の不具合は見つけられない</strong>テストが出来上がります。ここで決めるのは、置き換える対象を選ぶ基準です。
        </Lead>
      </Hero>

      <Heading num="01">5種類は、目的で分かれている</Heading>
      <p>
        ひとくちに「モック」と呼ばれがちですが、実際には目的の違う5つがあります。名前を覚えることに意味はなく、<strong>どれを選ぶかで、テストが何に結合するかが変わる</strong>ことが要点です。
      </p>

      <DiagramFrame
        slug="test-doubles-types"
        aspect="700 / 330"
        caption="テストダブルの5種類を、決まった値を返すか・呼ばれ方そのものを検証するか・実装として動くか、の3つの性質で並べたもの。ダミーは引数を埋めるためだけに渡す。スタブは決まった値を返し、分岐を試したいときに使う。スパイは本物を動かしたまま呼び出しの履歴を残す。モックは呼ばれ方まで検証し、相互作用そのものが仕様のときに使う。フェイクは動く簡易実装で、本物は重いが振る舞いが必要なときに使う。実務でよく使うのはスタブとフェイクで、モックは「どう呼ばれるか」を固定するため実装の変更に弱い。"
      />

      <Analogy label="💡 たとえるなら">
        映画のスタントダブルです。危険な場面(遅い・不安定・課金が発生する処理)だけ代役に任せ、顔が映る場面(検証したい本体)は本人が演じます。<strong>全部を代役にしたら、その俳優の演技は何も確認できません</strong>。
      </Analogy>

      <Heading num="02">状態を確かめるか、呼ばれ方を確かめるか</Heading>
      <p>
        5種類の選択は、突き詰めると<Term>何を検証するか</Term>の2択に還元されます。
      </p>

      <table>
        <thead>
          <tr><th></th><th>状態の検証</th><th>相互作用の検証</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">確かめるもの</td><td>戻り値、最終的な状態</td><td>どのメソッドが何回・どの引数で呼ばれたか</td></tr>
          <tr><td className="hl">実装変更への強さ</td><td><strong>強い</strong></td><td>弱い(内部の呼び方に依存する)</td></tr>
          <tr><td className="hl">向く対象</td><td>計算、変換、状態遷移</td><td>通知の送信、外部への副作用</td></tr>
        </tbody>
      </table>

      <p>
        原則は<strong>「まず状態で検証し、それが不可能なときだけ相互作用で検証する」</strong>です。メール送信のように<Term>外に出ていく副作用</Term>は結果を観測できないため、相互作用の検証が適切な数少ない例になります。逆に、戻り値で確かめられるものを呼び出し回数で確かめているなら、それは<Link href="/test/tdd">TDD</Link>の言う「実装に結合したテスト」です。
      </p>

      <Heading num="03">置き換えすぎが招く4つのこと</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>実装への結合</h4>
          <p>内部の呼び出し順を固定するため、仕様は変わっていないのにリファクタリングで赤くなる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>嘘の緑</h4>
          <p>代役が本物と違う振る舞いをしていても気付けない。全部通るのに本番で落ちる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>読めないテスト</h4>
          <p>準備が20行の代役設定になり、何を保証しているのか分からなくなる。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>設計の問題の隠蔽</h4>
          <p>代役が5つ必要なのは依存過多のサイン。蓋をせず、設計を見直す合図と捉える。</p>
        </Card>
      </CardGrid>

      <p>
        <strong>2番目が最も危険です</strong>。代役は<Term>自分が書いた想像上の仕様</Term>なので、相手の実際の挙動 ― エラー時の応答形式、タイムアウト、レート制限 ― とずれていても、そのずれ自体は検出できません。
      </p>

      <Heading num="04">境界だけを置き換える</Heading>

      <DiagramFrame
        slug="test-doubles-boundary"
        aspect="640 / 330"
        caption="何を代役に置き換えてよいかの境界を入れ子の3層で示したもの。最も外側は置き換えるべきもので、外部API・決済・メール送信・現在時刻・乱数・IDの生成が入る。中間は自分たちのデータベースで、できれば本物を使う ― 代役にするとSQLが間違っていても緑になるため。最も内側は自分たちのドメインロジックと値オブジェクト・純粋関数で、ここは置き換えない。外側へ寄せすぎると遅く不安定になり、内側へ寄せすぎると代役の正しさしか確かめなくなる。"
      />

      <p>
        誤解が多いのは中間の層です。<strong>DBを代役にしたテストは、クエリが間違っていても通ります</strong>。実物を起動して検証するほうが、得られる信頼度は桁違いに高くなります ― この判断は<Link href="/test/integration">Integrationテスト</Link>の存在理由そのものです。
      </p>

      <Heading num="05">差し替えられる構造にしておく</Heading>
      <p>
        代役を使うには、依存を外から渡せる形になっている必要があります。<Link href="/test/unit">Unitテスト</Link>で見た依存注入が、ここで前提として効いてきます。
      </p>

      <pre>
        <code>{`// 差し替えられない ― 内部で直接生成・参照している
async function registerUser(input) {
  const now = new Date();                 // 時刻を固定できない
  await mailer.sendWelcome(input.email);  // 実際にメールが飛ぶ
}

// 差し替えられる ― 必要なものを引数で受け取る
async function registerUser(input, deps) {
  const now = deps.clock.now();
  await deps.mailer.sendWelcome(input.email);
}`}</code>
      </pre>

      <p>
        後者なら、テストでは時計を固定値に、送信手段を記録用の実装に差し替えられます。<strong>テストのためだけの改造ではありません</strong> ― 何に依存しているかが引数として表に出る、という点で<Link href="/design/methodology-info-hiding">情報隠蔽</Link>の観点からも健全な形です。
      </p>

      <Heading num="06">代役が本物とずれていないか、別途確かめる</Heading>
      <p>
        代役を使う限り、「想像した仕様」と「実際の仕様」のずれは残ります。<strong>これは代役の欠陥ではなく定義そのもの</strong>なので、別の手段で埋めるしかありません。
      </p>

      <table>
        <thead>
          <tr><th>手段</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">契約テスト</td><td>期待する形を1か所に置き、提供側と利用側の双方から当てる(<Link href="/test/api">APIのテスト</Link>)</td></tr>
          <tr><td className="hl">スキーマ検証</td><td>定義から代役を生成し、定義と実装のずれを検出する</td></tr>
          <tr><td className="hl">実物での確認</td><td>本番に近い環境で、少数の疎通テストを実際の相手に対して実行する</td></tr>
        </tbody>
      </table>

      <Aside label="記録して再生する">
        実際の応答を1度記録し、以後はそれを再生する方式は、<strong>現実に近い代役を安く手に入れる方法</strong>です。ただし記録は必ず古くなるため、定期的に取り直す運用とセットにしないと、いずれ「嘘の緑」に変わります。
      </Aside>

      <Heading num="07">選び方の早見</Heading>
      <table>
        <thead>
          <tr><th>状況</th><th>選ぶもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">分岐を試したい(異常系を含む)</td><td>スタブ</td></tr>
          <tr><td className="hl">呼ばれたこと自体が仕様(通知・課金)</td><td>モック / スパイ</td></tr>
          <tr><td className="hl">繰り返し読み書きする必要がある</td><td>フェイク(簡易実装)</td></tr>
          <tr><td className="hl">自分たちのDBを使う処理</td><td>本物(コンテナで起動)</td></tr>
          <tr><td className="hl">時刻・乱数</td><td>注入して固定する</td></tr>
        </tbody>
      </table>

      <Heading num="まとめ">制御できないものだけを置き換える</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>境界だけ</h4>
          <p>外部・時刻・乱数は置き換える。自分たちのロジックは本物で。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>状態の検証を優先する</h4>
          <p>呼ばれ方の検証は実装に結合する。外へ出る副作用に限る。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ずれは別の手段で埋める</h4>
          <p>代役が相手の変化を教えないのは、欠陥ではなく定義。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>数が増えたら設計を疑う</h4>
          <p>代役が5つ必要な関数は、5つのことを知りすぎている。</p>
        </Card>
      </CardGrid>

      <p>
        外部への依存を断ったら、次は共有された状態です。<Link href="/test/data">テストデータ管理</Link>へ進みます。
      </p>

      <DocsFooter href="/test/doubles" />
    </DocsPage>
  );
}
