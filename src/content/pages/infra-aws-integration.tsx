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
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "アプリケーション統合" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>アプリケーション統合 ― 直接呼ばないという選択</h1>
        <Lead>
          サービスAがサービスBを直接呼ぶと、Bが落ちればAも失敗し、Bが遅ければAも遅くなります。<Link href="/design/architecture-event-driven">イベント駆動</Link>や<Link href="/backend/jobs">非同期処理</Link>で見た「間に何かを挟む」という設計を、そのまま部品として提供するのがこの分野です。挟むものは3種類あり、<Term>溜めるか、配るか、振り分けるか</Term>で選びます。どれを選んでも共通して手に入るのは、<strong>相手の都合から切り離される</strong>ことです。
        </Lead>
      </Hero>

      <Heading num="01">3つの形</Heading>

      <DiagramFrame
        slug="infra-aws-integration-compare"
        aspect="760 / 300"
        caption="サービス同士をつなぐ3つの仕組みの違い。キューは1つの受け手に確実に届き、受け手が自分の速さで取りに行くので処理速度の差を吸収する。通知は1つの出来事を購読している全員へ一斉に配り、送る側は宛先を知らない。イベントバスは届いた出来事の中身を見て条件に合う宛先だけへ振り分け、送る側も受け手も互いを知らない。溜めたいのか、配りたいのか、内容で振り分けたいのかで選ぶ。"
      />

      <table>
        <thead>
          <tr><th></th><th>キュー</th><th>通知</th><th>イベントバス</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">届く相手</td><td>1通につき1つの受け手</td><td>購読している全員</td><td>条件に合った宛先だけ</td></tr>
          <tr><td className="hl">受け取り方</td><td>受け手が取りに行く</td><td>送りつけられる</td><td>送りつけられる</td></tr>
          <tr><td className="hl">溜まるか</td><td>溜まる</td><td>溜まらない</td><td>溜まらない</td></tr>
          <tr><td className="hl">主な用途</td><td>速度差の吸収、確実な処理</td><td>1つの出来事に複数が反応</td><td>つなぎ方を設定として外に出す</td></tr>
        </tbody>
      </table>

      <p>
        「溜まるか」の行が実務では効きます。通知やイベントバスは<strong>その瞬間に受け手がいなければ届きません</strong>(再試行はありますが、受け手が長く落ちていれば失われます)。取りこぼしが許されない処理では、宛先をキューにしておくのが定石です。
      </p>

      <Heading num="02">よく使う組み合わせ</Heading>
      <p>
        実際の構成では、<strong>通知の宛先を複数のキューにする</strong>形が頻出します。1つの出来事を複数の処理へ広げつつ、それぞれの受け手は自分の速さで処理でき、失敗しても再配達される ― 2つの仕組みの利点を同時に取れます(詳しくは<Link href="/infra/aws-sns">SNS</Link>)。
      </p>
      <p>
        もう1つは、<strong>イベントバスを起点にして処理を並べる</strong>形です。出来事の種類ごとに条件を書いておけば、どのサービスがどの出来事に反応するかが<strong>コードではなく設定として一覧できます</strong>。増やすときも既存のコードを触りません。
      </p>

      <Aside label="間に挟むと、確認が難しくなる">
        非同期にすると呼び出し元は結果を知りません。「送ったのに処理されていない」を追うには、どこまで進んだかを追跡できる仕組みが要ります ― 共通のIDを載せる、失敗した分を退避先に貯める、処理済みを記録する。<Link href="/infra/observability">オブザーバビリティ</Link>の設計を、非同期の経路にも同じように用意しておきます。
      </Aside>

      <Heading num="03">選ぶ順序</Heading>
      <p>
        迷ったときは、次の順に問うと決まります。
      </p>
      <ul>
        <li><strong>取りこぼしが許されないか</strong> ― 許されないならキューを使う(あるいは宛先をキューにする)。</li>
        <li><strong>受け手は1つか、複数か</strong> ― 複数で、後から増える可能性があるなら通知かイベントバス。</li>
        <li><strong>受け手の選択を、送る側の外に出したいか</strong> ― 出したいならイベントバス。条件が設定として残る。</li>
      </ul>
      <p>
        逆に、<strong>すぐに結果が必要な処理は直接呼びます</strong>。何でも非同期にすると、追跡と整合の手間だけが増えます。挟むのは「相手の都合から切り離したい」という理由があるときだけです。
      </p>

      <Heading num="まとめ">切り離すために挟む</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>3つの形</h4>
          <p>溜める・配る・振り分ける。届く相手と、溜まるかどうかが違う。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>宛先をキューにする</h4>
          <p>広げつつ取りこぼさない、いちばん実用的な組み合わせ。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>理由がなければ直接呼ぶ</h4>
          <p>非同期は追跡と整合の手間を伴う。切り離す理由があるときだけ挟む。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-integration" />
    </DocsPage>
  );
}
