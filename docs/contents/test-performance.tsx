import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Heading,
  DocsFooter,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Aside,
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "性能テストと負荷テスト",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>性能テストと負荷テスト ― 壊れる前に壊れ方を知る</h1>
        <Lead>
          機能テストが「正しく動くか」を確かめるのに対し、性能テストは<strong>「どれだけの量に耐えられるか」「限界でどう壊れるか」</strong>を確かめます。キャンペーン当日に初めて限界を知るのと、事前に知っておくのとでは、打てる手がまったく違います。
        </Lead>
      </Hero>

      <Heading num="01">目的別に4種類ある</Heading>
      <table>
        <tbody>
          <tr><th>種類</th><th>かける負荷</th><th>知りたいこと</th></tr>
          <tr><td className="hl">負荷テスト</td><td>想定される最大の負荷</td><td>その負荷で目標の応答時間を満たすか</td></tr>
          <tr><td className="hl">ストレステスト</td><td>限界を超えるまで増やす</td><td><strong>どこで壊れ、どう壊れるか</strong>。回復するか</td></tr>
          <tr><td className="hl">耐久テスト</td><td>中程度の負荷を長時間</td><td>メモリリーク、接続の枯渇、ログの肥大</td></tr>
          <tr><td className="hl">スパイクテスト</td><td>急激な立ち上がり</td><td>オートスケールが間に合うか、キャッシュが効くか</td></tr>
        </tbody>
      </table>
      <p>最初にやる価値が高いのは<strong>ストレステスト</strong>です。「毎秒何件までさばけるか」を知らないままでは、必要なサーバー台数も、レート制限の値も、アラートの閾値も決められません。</p>
      <Analogy label="💡 たとえるなら">
        橋の設計で、想定通行量で問題ないことを確かめるのが負荷テスト、<strong>何トンで崩れるか</strong>を確かめるのがストレステストです。後者を知っていれば、重量制限の標識を安全な位置に立てられます。
      </Analogy>

      <Heading num="02">何を測るか</Heading>
      <table>
        <tbody>
          <tr><th>指標</th><th>意味</th><th>注意</th></tr>
          <tr><td className="hl">スループット</td><td>単位時間あたりの処理件数(rps)</td><td>これが頭打ちになる点が限界</td></tr>
          <tr><td className="hl">応答時間</td><td>1件あたりの所要時間</td><td><strong>平均でなく p95 / p99</strong> を見る</td></tr>
          <tr><td className="hl">エラー率</td><td>失敗した割合</td><td>速くてもエラーが増えていれば意味がない</td></tr>
          <tr><td className="hl">飽和度</td><td>CPU・メモリ・接続数・キュー長</td><td><strong>どの資源が先に尽きるか</strong>を特定する</td></tr>
          <tr><td className="hl">同時実行数</td><td>並行して処理している数</td><td>負荷のかけ方の指定にも使う</td></tr>
        </tbody>
      </table>
      <p>典型的な結果は「負荷を上げるとスループットが伸び、ある点から伸びなくなり、さらに上げると<strong>応答時間だけが急増する</strong>」という形になります。その折れ点が実質的な限界です。</p>

      <Heading num="03">シナリオを現実に近づける</Heading>
      <p>1つのAPIを叩き続けるだけのテストは、たいてい実態と合いません。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>利用者の動線で組む</h4><p>ログイン → 検索 → 詳細 → 購入。比率も実際のアクセス分布に合わせる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>考える時間を入れる</h4><p>人間は連続でクリックしない。間隔なしの負荷は非現実的に厳しい。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>データを散らす</h4><p>同じIDばかり引くとキャッシュが効きすぎ、<strong>実力より良い結果</strong>が出る。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>書き込みを含める</h4><p>参照だけでは楽観的すぎる。更新はロックとレプリケーションに効く。</p></Card>
      </CardGrid>
      <p>とくに3番目は結果を大きく歪めます。本番相当のデータ量と分布(「よく見られる商品」「めったに見られない商品」)を用意してください。</p>

      <Heading num="04">環境をどうするか</Heading>
      <table>
        <tbody>
          <tr><th>環境</th><th>得られるもの</th><th>限界</th></tr>
          <tr><td className="hl">ローカル</td><td>相対比較(改善前後)</td><td>絶対値は当てにならない</td></tr>
          <tr><td className="hl">本番同等のステージング</td><td><strong>信頼できる数値</strong></td><td>コストがかかる。データ量を揃える手間</td></tr>
          <tr><td className="hl">縮小環境</td><td>傾向の把握</td><td>単純な比例では換算できない</td></tr>
          <tr><td className="hl">本番(の一部)</td><td>最も正確</td><td>影響が出る。慎重な設計が必要</td></tr>
        </tbody>
      </table>
      <Aside label="外部への負荷に注意">
        負荷テストは<strong>外部APIや決済にも同じ負荷をかけます</strong>。相手にとっては攻撃と区別が付きません。必ずサンドボックスかスタブに向け、対象範囲を明示してから実行してください。クラウド事業者やSaaSによっては事前申請が必要な場合もあります。
      </Aside>

      <Heading num="05">結果の読み方 ― ボトルネックを1つ特定する</Heading>
      <Steps>
        <li>負荷を段階的に上げ、スループットが頭打ちになる点を見つける</li>
        <li>その時点で<strong>どの資源が飽和しているか</strong>を確認する(CPU・接続数・ディスクI/O・キュー長)</li>
        <li>飽和していないのに遅い場合は、待ち(ロック・外部API・<Link href="/dev/concurrency/deadlock">プール枯渇</Link>)を疑う</li>
        <li>その1点を改善し、<strong>同じ条件で測り直す</strong></li>
        <li>ボトルネックは移動する ― 次はどこが詰まるかを再度特定する</li>
      </Steps>
      <p>負荷試験は「合否判定」より<strong>ボトルネックの発見装置</strong>として使うほうが実利があります。詳細な特定手順は「<Link href="/dev/debug/profiling">プロファイリング</Link>」を参照してください。</p>

      <Heading num="06">壊れ方を設計する</Heading>
      <p>限界を超えたときに<strong>全体が巻き添えで落ちる</strong>のか、<strong>受け付けを絞って生き残る</strong>のかは、設計の問題です。</p>
      <table>
        <tbody>
          <tr><th>望ましくない壊れ方</th><th>望ましい壊れ方</th></tr>
          <tr><td className="hl">すべてのリクエストが遅くなり、全員がタイムアウト</td><td>受け付け上限を超えた分は<strong>即座に429で断る</strong></td></tr>
          <tr><td className="hl">メモリ枯渇でプロセスが落ち、処理中の全件が失われる</td><td>キューの長さを制限し、生産側を止める(<Link href="/dev/concurrency/patterns">バックプレッシャー</Link>)</td></tr>
          <tr><td className="hl">1つの遅い依存が全体を道連れにする</td><td>タイムアウトと<Link href="/dev/backend/ops/resilience">遮断</Link>で切り離し、機能を縮退させる</td></tr>
        </tbody>
      </table>
      <p>ストレステストの本当の価値はここにあります ― <strong>限界値そのものより、限界での挙動</strong>を確認し、必要なら壊れ方を設計し直します。</p>

      <Heading num="07">CIに組み込む</Heading>
      <p>本格的な負荷テストは毎回は回せませんが、性能の劣化を早期に検知する軽量な方法はあります。</p>
      <table>
        <tbody>
          <tr><th>手法</th><th>内容</th></tr>
          <tr><td className="hl">スモーク負荷テスト</td><td>数分・低負荷のシナリオを毎回実行し、明らかな劣化を検出する</td></tr>
          <tr><td className="hl">クエリ数の検証</td><td>1リクエストのSQL発行数を上限で縛る。<strong>N+1の混入を防げる</strong></td></tr>
          <tr><td className="hl">性能予算</td><td>バンドルサイズや主要画面の指標に上限を設ける(「<Link href="/test/quality-plan">品質計画</Link>」)</td></tr>
          <tr><td className="hl">定期実行</td><td>本格的な負荷テストは夜間・週次で実行し、傾向を追う</td></tr>
        </tbody>
      </table>
      <p>2行目は費用対効果がとくに高い手法です。<strong>実装の誤りを性能問題になる前に</strong>、機能テストと同じ速度で捕まえられます。</p>

      <Heading num="まとめ">限界を知ってから決める</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>限界と壊れ方を知る</h4><p>何rpsまで耐え、超えたらどうなるか。台数も閾値もここから決まる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>シナリオを現実に寄せる</h4><p>単一APIの連打とキャッシュの効きすぎは、実力を誤認させる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ボトルネックは移動する</h4><p>1つ直したら測り直す。合否ではなく発見のために使う。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/debug/profiling" tag="実装">プロファイリング</RelatedLink>
            <RelatedLink href="/dev/backend/ops/resilience" tag="バックエンド">タイムアウト・リトライ・遮断</RelatedLink>
            <RelatedLink href="/ops/performance" tag="サービス運営">パフォーマンス</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
