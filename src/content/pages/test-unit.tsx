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

export const metadata: Metadata = { title: "Unitテスト" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>Unitテスト ― 土台を、書きやすく壊れにくくする</h1>
        <Lead>
          <Link href="/test/levels">テストの段階</Link>で見たとおり、Unitテストは自分が書いたロジックだけを本物のまま動かす、最も内側の段階です。ピラミッドの土台であり、数が最も多くなります。<strong>数が多いからこそ、1件ずつの書き方に型がないと、すぐに「読めない・信用できない」資産になります</strong>。ここでは書き方の型と、テストしやすさを決める設計判断を扱います。
        </Lead>
      </Hero>

      <Heading num="01">FIRST原則 ― 良いUnitテストの5条件</Heading>
      <p>
        満たすべき性質を頭文字で表したものが<Term>FIRST原則</Term>です。5つは独立した項目に見えて、破ったときの結末は共通しています ― <strong>そのテストが実行されなくなる、あるいは信用されなくなる</strong>。
      </p>

      <CardGrid>
        <Card><CardNumber>F</CardNumber><h4>Fast(速い)</h4><p>ミリ秒から数十ミリ秒で終わる。遅いテストは、やがて回されなくなる。</p></Card>
        <Card><CardNumber>I</CardNumber><h4>Independent(独立)</h4><p>他のテストの実行順序や結果に依存しない。</p></Card>
        <Card><CardNumber>R</CardNumber><h4>Repeatable(再現可能)</h4><p>環境やタイミングによらず、何度実行しても同じ結果になる。</p></Card>
        <Card><CardNumber>S</CardNumber><h4>Self-Validating(自己検証)</h4><p>合否をテスト自身が判定する。ログを人が目で見て判断する形にしない。</p></Card>
        <Card><CardNumber>T</CardNumber><h4>Timely(タイムリー)</h4><p>実装と同時期に書く。後回しにしたテストは書かれない。</p></Card>
      </CardGrid>

      <p>
        IとRは、<Link href="/test/stability">テストを安定させる</Link>で見た「不安定さの3つの源」への処方箋そのものです。Unitテストの段階でこの2つを守れていれば、外側の段階での作業はずっと楽になります。
      </p>

      <Heading num="02">3段構成と、名前の3要素</Heading>
      <p>
        1件のテストは、準備(Arrange)・実行(Act)・検証(Assert)の3段で書くと見通しが良くなります。<Term>Given-When-Then</Term>(与えられた状況で・何かをしたら・こうなる)もほぼ同じ考え方で、こちらは仕様書寄りの言い回しです。
      </p>

      <DiagramFrame
        slug="test-unit-aaa"
        aspect="640 / 310"
        caption="1件のUnitテストの構造。テスト名には対象・条件・期待結果の3要素を含め、失敗ログだけで当たりがつくようにする。本体はArrange(テストデータと依存をそろえる)、Act(対象を1回だけ呼ぶ)、Assert(1つの関心事について確かめる)の3段に分ける。Arrangeが10行を超えるならテストの書き方ではなく対象の設計を疑い、Actが複数行になるなら確かめたいことが2つ混ざっている。"
      />

      <Aside label="Arrangeの長さは、設計の測定器">
        準備が長いという事実は、<strong>テストの問題ではなく対象の問題</strong>を示しています。10行の準備が必要な関数は、10個のことを知っている関数です。<Link href="/test/tdd">TDD</Link>が「書きにくさは設計の合図」と呼んだものが、ここでは行数として現れます。
      </Aside>

      <Heading num="03">1テスト1アサーションの是非</Heading>
      <p>
        「1件につき検証は1つだけにすべきか」という論点があります。厳密に1つに絞れば失敗箇所の特定は容易になりますが、関連する複数の値(税込み価格と内訳など)を確かめたい場面でテスト数が増えすぎます。
      </p>
      <p>
        実務的な落とし所は<strong>「1つの関心事につき1テスト」</strong>です。関連する複数の値をまとめて検証すること自体は問題なく、<Term>無関係な検証を1つのテストに詰め込まない</Term>ことが本質です。判断の目安は「このテストが落ちたとき、原因の説明が1文で済むか」。
      </p>

      <Heading num="04">純粋関数として切り出す</Heading>
      <p>
        テストのしやすさは、書き方以上にコードの分け方で決まります。<Link href="/test/quality-plan">品質計画</Link>で見た2つの条件 ― 同じ入力なら常に同じ出力、外の世界に触れない ― を満たす処理は、意識的に切り出します。
      </p>
      <p>
        税込み価格の計算、入力値の検証、文字列の整形、配列の並べ替えや絞り込みが好例です。切り出せば準備も後片付けも不要になり、<Link href="/test/design-techniques">境界値分析</Link>との相性も最良になります ― 純粋関数はまさに「入力を変えれば出力が決まる」対象だからです。
      </p>

      <Analogy label="💡 たとえるなら">
        純粋関数は電卓です。同じボタンを同じ順で押せば、いつどこで押しても同じ答えが出て、電卓自体の中身も変わりません。だから確かめるのは「押した結果が合っているか」だけで済みます。
      </Analogy>

      <Heading num="05">副作用のある処理は、依存注入で扱う</Heading>
      <p>
        「ボタンを押したらAPIを呼ぶ」「フォーム送信でDBに書き込む」は、副作用を起こすこと自体が目的なので純粋関数にはできません。ここで効くのが<Term>依存性注入</Term>です。
      </p>

      <DiagramFrame
        slug="test-unit-di"
        aspect="640 / 320"
        caption="副作用のある処理を依存性注入でテスト可能にする方法の比較。左は依存を関数の中に直接書いた場合で、内部から本物の送信APIを呼ぶため、テストを走らせると本当にメールが飛ぶ。差し替える隙間がないので対象にできない。右は送信手段を引数で受け取る場合で、本番では本物を、テストでは代役を渡せる。副作用そのものは消えていないが、消えたのは「差し替えられない」という性質のほう。"
      />

      <p>
        注意すべきは、これが<strong>やりすぎると逆に働く</strong>ことです。外部との境界だけを差し替え可能にするのは正しい設計ですが、内部のクラスまで注入で組み立て始めると、テストは実装の呼び出し順序に結合します。境界の引き方は<Link href="/test/doubles">テストダブル</Link>で詳しく扱います。
      </p>

      <Heading num="06">実行順序に依存させない</Heading>
      <p>
        あるテストが別のテストの作った状態に依存していると、順序を変えただけで落ちるようになります。各テストは<strong>実行前に自分で必要な状態を用意し、終了後に片付ける</strong>のが原則です。モジュールのトップレベルに置いた変数、テストファイル間で共有するオブジェクト、前のテストが書いたファイル ― これらが典型的な原因になります。
      </p>
      <p>
        Unitテストの段階でこれを守っておくと、並列実行がそのまま安全になります。実行時間はテストの本数ではなく、<strong>並列に走らせられる本数</strong>で決まるためです。
      </p>

      <Heading num="まとめ">土台は、型を決めて量産する</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>FIRSTを破ると回されなくなる</h4>
          <p>5条件の結末は共通している ― 実行されないか、信用されないか。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>3段構成と、3要素の名前</h4>
          <p>失敗ログだけで当たりがつく状態を、書式で担保する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>1つの関心事につき1テスト</h4>
          <p>落ちたときの説明が1文で済むかを目安にする。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>切り出すか、注入するか</h4>
          <p>純粋な処理は切り出し、副作用は外から渡す。境界だけを差し替える。</p>
        </Card>
      </CardGrid>

      <p>
        代役に置き換えられない依存は、次の段階が引き受けます。<Link href="/test/integration">Integrationテスト</Link>へ進みます。
      </p>

      <DocsFooter href="/test/unit" />
    </DocsPage>
  );
}
