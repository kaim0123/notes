import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "データ層" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>データ層 ― 理論を、どこに書くか</h1>
        <Lead>
          <Link href="/database">データベース</Link>セクションでは、ACIDや分離レベル、索引といった<Term>データベースそのものの理論</Term>を扱いました。この見出しで扱うのは、その理論を<Term>アプリケーションのコードのどこに書くか</Term>です。同じ知識でも、置き場所を間違えれば壊れたデータが本番に残ります。
        </Lead>
      </Hero>

      <Heading num="01">アプリとデータベースの間にあるもの</Heading>
      <p>
        <Link href="/backend/layers">層に分けた構成</Link>では、SQLはリポジトリの中に閉じました。しかし閉じただけでは決まらないことが4つ残ります。
      </p>

      <DiagramFrame
        slug="backend-data-concerns"
        aspect="640 / 340"
        caption="アプリケーションとデータベースの間にある4つの関心事を示した図。両者の間の帯に、キャッシュ、クエリの回数と接続の本数、トランザクションの境界、スキーマの変更、という4つの層が縦に並ぶ。それぞれに問いが添えられており、同じ問いに毎回答えるべきか、1回の依頼で何往復し何本の接続を使うか、どこからどこまでを一括りにするか、動いたまま形を変えられるか、と示されている。下部には境界の説明があり、データベースそのものの理論はデータベースのセクションが扱い、ここではアプリケーションの側からどう使うかを扱うことが記されている。"
      />

      <Heading num="02">4つの問いと、その順序</Heading>
      <p>
        4つは独立していません。<Term>上から順に考えると、下の問題が減ります</Term>。
      </p>

      <table>
        <thead>
          <tr><th>問い</th><th>間違えたときに起きること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Link href="/backend/data-transaction">どこまでを1つにするか</Link></td><td>途中まで書けた壊れたデータが残る</td></tr>
          <tr><td className="hl"><Link href="/backend/data-pool">何往復し、何本使うか</Link></td><td>台数を増やすほど遅くなる。接続が枯渇して全体が止まる</td></tr>
          <tr><td className="hl"><Link href="/backend/data-migration">どう形を変えるか</Link></td><td>デプロイの数分間だけ本番が落ちる</td></tr>
          <tr><td className="hl"><Link href="/backend/cache">毎回答えるべきか</Link></td><td>古い情報が返る。あるいは、キャッシュが落ちた瞬間に全部が本体へ殺到する</td></tr>
        </tbody>
      </table>

      <p>
        順序に意味があるのは、<Term>キャッシュは最後の手段だから</Term>です。往復の回数を減らせば済む問題にキャッシュを被せると、遅さは隠れますが、古い情報という新しい問題が加わります。
      </p>

      <Heading num="03">共通する原則 ― 占有する時間を短くする</Heading>
      <p>
        4つの問いは、突き詰めると1つの資源をめぐる話です。<Term>データベースへの接続は有限で、しかも思っているよりずっと少ない</Term>。数百のリクエストを同時に捌くアプリでも、接続はせいぜい数十本です。
      </p>

      <table>
        <thead>
          <tr><th>やってしまいがち</th><th>占有時間への影響</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">トランザクションの中で外部APIを呼ぶ</td><td>相手が3秒遅ければ、3秒間ロックを握り続ける</td></tr>
          <tr><td className="hl">一覧の各行でクエリを1本ずつ発行する</td><td>件数に比例して往復が増える</td></tr>
          <tr><td className="hl">読み取りだけの処理までトランザクションで包む</td><td>要らない占有が全体に広がる</td></tr>
          <tr><td className="hl">巨大なテーブルに、止めて索引を張る</td><td>その間、書き込みが全部待たされる</td></tr>
        </tbody>
      </table>

      <p>
        どれも「動くけれど、負荷が上がったときだけ壊れる」種類の問題です。<Term>開発環境では絶対に再現しない</Term>ことが、この層の厄介さの本質です。
      </p>

      <Aside label="ここで扱わないこと">
        正規化・索引の設計・実行計画の読み方といった<Term>データベース側の設計</Term>は<Link href="/database/design">データベース</Link>セクションの担当です。複数のデータベースにまたがる整合性は<Link href="/database/distributed-transactions">分散トランザクション</Link>、本番のバックアップや冗長化はインフラセクションが扱います。
      </Aside>

      <Analogy label="💡 たとえるなら">
        銀行の窓口です。窓口の数(接続)は限られていて、1人が長く占有すれば後ろの列が伸びます。1つの手続きを途中で止めないこと(トランザクション)、要らない用事で並ばないこと(往復を減らす)、混む前に整理券を配ること(キャッシュ)、そして改装工事を営業しながら行う方法(スキーマ変更) ― この見出しで扱うのは、その全部です。
      </Analogy>

      <Heading num="まとめ">置き場所を決めるのが仕事</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>理論はデータベース側、置き場所はこちら</h4>
          <p>知っていることと、正しい場所に書けることは別。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>接続は有限</h4>
          <p>4つの問いはすべて、占有時間をめぐる話に帰着する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>キャッシュは最後</h4>
          <p>先に往復を減らす。隠すのは、減らせないと分かってから。</p>
        </Card>
      </CardGrid>

      <p>
        まず、いちばん上の問いから見ます。<Link href="/backend/data-transaction">トランザクション境界</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/data" />
    </DocsPage>
  );
}
