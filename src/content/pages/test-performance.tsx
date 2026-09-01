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

export const metadata: Metadata = { title: "性能テストと負荷テスト" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>性能テストと負荷テスト ― 限界と、壊れ方を先に知る</h1>
        <Lead>
          <Link href="/test/non-functional">機能以外のテスト</Link>で見たとおり、非機能は測って閾値と比べます。性能はその代表格ですが、<strong>測る目的は「速いことの確認」だけではありません</strong>。どこまでなら耐えるのか、限界を超えたときどう壊れるのか ― <Term>壊れ方を事前に知っておく</Term>ことが、本番の設計判断を支えます。
        </Lead>
      </Hero>

      <Heading num="01">目的別に4種類ある</Heading>
      <p>
        「負荷テスト」と一括りにされがちですが、<strong>かける負荷の形が違えば、分かることも違います</strong>。
      </p>

      <DiagramFrame
        slug="test-performance-types"
        aspect="700 / 300"
        caption="負荷のかけ方が異なる4種類の性能テスト。負荷テストは想定される最大まで上げてそのまま保ち、目標の応答時間を満たすかを見る。ストレステストは限界を超えるまで上げ続け、どこでどう壊れ回復するかを見る。耐久テストは中程度の負荷を長時間かけ、メモリの漏れや接続の枯渇を見つける。スパイクテストは急激に立ち上げて、自動増設が間に合うかを見る。最初にやる価値が高いのはストレステストで、毎秒何件までさばけるかが分からなければ、必要な台数もレート制限の値もアラートの閾値も決められない。"
      />

      <Analogy label="💡 たとえるなら">
        橋の設計です。想定通行量で問題ないことを確かめるのが負荷テスト、<strong>何トンで崩れるか</strong>を確かめるのがストレステストです。後者を知っていて初めて、重量制限の標識を安全な位置に立てられます。
      </Analogy>

      <Heading num="02">何を測るか ― 平均を見ない</Heading>
      <table>
        <thead>
          <tr><th>指標</th><th>意味</th><th>注意</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">スループット</td><td>単位時間あたりの処理件数</td><td>これが頭打ちになる点が限界</td></tr>
          <tr><td className="hl">応答時間</td><td>1件あたりの所要時間</td><td><strong>平均ではなく p95 / p99</strong> を見る</td></tr>
          <tr><td className="hl">エラー率</td><td>失敗した割合</td><td>速くてもエラーが増えていれば意味がない</td></tr>
          <tr><td className="hl">飽和度</td><td>CPU・メモリ・接続数・キュー長</td><td><strong>どの資源が先に尽きるか</strong>を特定する</td></tr>
          <tr><td className="hl">同時実行数</td><td>並行して処理している数</td><td>負荷のかけ方の指定にも使う</td></tr>
        </tbody>
      </table>

      <p>
        2行目は繰り返す価値があります。<strong>平均は、遅い数％を完全に覆い隠します</strong>。1000件のうち950件が50ミリ秒で50件が3秒なら平均は約200ミリ秒ですが、その50件を踏んだ利用者にとっては「3秒かかるサービス」です。
      </p>

      <Heading num="03">結果を読む ― 折れ点を探す</Heading>

      <DiagramFrame
        slug="test-performance-curve"
        aspect="640 / 320"
        caption="負荷を上げていったときのスループットと応答時間の変化。スループットは負荷に比例して伸びたあと、ある点から鈍って水平になる。応答時間はそれまで横ばいだったのが、その付近から急激に立ち上がる。2本の線の性質が入れ替わる地点が実質的な限界で、これより右では処理できる件数は増えず、待たされる時間だけが伸びる。読むときは平均ではなくp95・p99を見る。"
      />

      <p>
        折れ点を見つけたら、次にやることは1つです ― <strong>そのとき何が先に尽きたのかを特定する</strong>。CPUなのか、DBの接続数なのか、キューの長さなのか。ボトルネックを1つに絞れないまま増設しても、同じ壁に同じ位置でぶつかります。
      </p>

      <Heading num="04">シナリオを現実に近づける</Heading>
      <p>
        1つのエンドポイントを叩き続けるだけのテストは、たいてい実態と合いません。<strong>合わない方向は「実力より良い結果が出る」側</strong>であることが多く、その分だけ危険です。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>利用者の動線で組む</h4>
          <p>ログイン → 検索 → 詳細 → 購入。比率も実際のアクセス分布に合わせる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>考える時間を入れる</h4>
          <p>人間は連続でクリックしない。間隔なしの負荷は非現実的に厳しい。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>データを散らす</h4>
          <p>同じIDばかり引くとキャッシュが効きすぎ、実力より良い結果が出る。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>書き込みを含める</h4>
          <p>参照だけでは楽観的すぎる。更新はロックと複製に効く。</p>
        </Card>
      </CardGrid>

      <p>
        3番目は結果を最も大きく歪めます。本番相当のデータ量と<Term>分布</Term> ― よく見られる商品と、めったに見られない商品 ― を用意してください。<Link href="/backend/cache">キャッシュ</Link>が実際にどれだけ効くかは、この分布で決まります。
      </p>

      <Heading num="05">どの環境で測るか</Heading>
      <table>
        <thead>
          <tr><th>環境</th><th>得られるもの</th><th>限界</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">手元</td><td>相対比較(改善の前後)</td><td>絶対値は当てにならない</td></tr>
          <tr><td className="hl">本番同等の検証環境</td><td><strong>信頼できる数値</strong></td><td>費用がかかる。データ量を揃える手間</td></tr>
          <tr><td className="hl">縮小した環境</td><td>傾向の把握</td><td>単純な比例では換算できない</td></tr>
          <tr><td className="hl">本番(の一部)</td><td>最も正確</td><td>影響が出る。慎重な設計が要る</td></tr>
        </tbody>
      </table>

      <Aside label="外部への負荷に注意">
        負荷テストは<strong>外部APIや決済にも同じ負荷をかけます</strong>。相手にとっては攻撃と区別が付きません。必ず試験用の環境か代役に向け、対象範囲を明示してから実行してください。事業者によっては事前の申請が必要な場合もあります。
      </Aside>

      <Heading num="06">壊れ方を設計する</Heading>
      <p>
        ストレステストで得られる最も価値ある情報は「限界値」ではなく、<Term>限界を超えたときの振る舞い</Term>です。同じ限界でも、壊れ方には大きな差があります。
      </p>

      <table>
        <thead>
          <tr><th>壊れ方</th><th>結果</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">全体が応答しなくなる</td><td>全員が使えない。回復にも時間がかかる</td></tr>
          <tr><td className="hl">超過分だけ断る</td><td>受け付けた分は正常に返る。<strong>これが望ましい形</strong></td></tr>
          <tr><td className="hl">遅くなり続ける</td><td>タイムアウトが連鎖し、上流まで巻き込む</td></tr>
        </tbody>
      </table>

      <p>
        2行目を選ぶための手立てが、<Link href="/backend/ops-rate-limit">レート制限</Link>と<Link href="/backend/ops-resilience">タイムアウト・遮断</Link>です。<strong>それらの値をいくつにするかは、ストレステストの結果からしか決められません</strong> ― 限界を知らずに設定した閾値は、ただの願望です。
      </p>

      <Heading num="07">CIにどう組み込むか</Heading>
      <p>
        本格的な負荷試験は数時間かかるので、毎コミットには載りません。<Link href="/test/non-functional">実行頻度で層を分ける</Link>という原則がそのまま当てはまります。
      </p>

      <table>
        <thead>
          <tr><th>頻度</th><th>置くもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">毎コミット</td><td>単一リクエストの応答時間の劣化検知(数十秒で終わる範囲)</td></tr>
          <tr><td className="hl">毎日</td><td>主要動線に対する、短時間の負荷テスト</td></tr>
          <tr><td className="hl">リリース前・定期</td><td>本格的な負荷・ストレス・耐久試験</td></tr>
        </tbody>
      </table>

      <p>
        毎コミットの層で重要なのは合否よりも<strong>値を記録し続けること</strong>です。性能はある日突然閾値を超えるのではなく、少しずつ悪くなって超えます。記録があれば「どのコミットから傾きが変わったか」を辿れます。
      </p>

      <Heading num="まとめ">限界を知ってから決める</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>4つは目的が違う</h4>
          <p>まずストレステスト。限界を知らないと、他の値が決められない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>平均を見ない</h4>
          <p>p95・p99で見る。平均は遅い数%を完全に隠す。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>シナリオの歪みは良い方に出る</h4>
          <p>データを散らさないと、実力より良い結果が出てしまう。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>壊れ方は選べる</h4>
          <p>超過分だけ断る形にする。そのための閾値は測定からしか出ない。</p>
        </Card>
      </CardGrid>

      <p>
        次は、非機能のもう1つの柱へ。<Link href="/test/security">セキュリティテスト</Link>へ進みます。
      </p>

      <DocsFooter href="/test/performance" />
    </DocsPage>
  );
}
