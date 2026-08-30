import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DocsFooter,
  Card,
  CardGrid,
  CardNumber,
  Aside,
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "テストデータ管理",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>テストデータ管理 ― 何度実行しても同じ結果にする</h1>
        <Lead>
          テストが不安定になる原因の多くは、ロジックではなく<strong>データと環境</strong>にあります。前のテストが残したレコード、実行順序への依存、日付をまたぐと落ちる検証、そして本番データの安易な流用 ―
          いずれも仕組みで防げます。ここではDBを使うテストを安定させる方法を整理します。
        </Lead>
      </Hero>

      <p>フィクスチャやファクトリといったコード上の定石は「<Link href="/test/patterns">テストパターン</Link>」で扱いました。ここでは<strong>データベースと環境の扱い</strong>が主題です。</p>

      <Heading num="01">テストごとに独立させる</Heading>
      <p>テストの独立性を壊す最大の要因が、共有されたデータベースです。対策には段階があります。</p>
      <table>
        <tbody>
          <tr><th>方式</th><th>やり方</th><th>速度 / 隔離</th></tr>
          <tr><td className="hl">トランザクションでロールバック</td><td>各テストをトランザクション内で実行し、最後に巻き戻す</td><td><strong>最速</strong> / 高い。ただしテスト対象がトランザクションを使うと難しい</td></tr>
          <tr><td className="hl">テストごとに削除</td><td>前後で対象テーブルを空にする</td><td>速い / 並列実行では衝突する</td></tr>
          <tr><td className="hl">スキーマを分ける</td><td>並列ワーカーごとに別スキーマ/別DBを使う</td><td>普通 / <strong>並列実行できる</strong></td></tr>
          <tr><td className="hl">コンテナを都度起動</td><td>テスト実行ごとにDBコンテナを立てる</td><td>遅い / 最も確実</td></tr>
        </tbody>
      </table>
      <p>実務では「CIではワーカーごとにDBを分け、各テストはトランザクションで巻き戻す」の組み合わせが扱いやすい構成です。<strong>テスト間で状態が漏れない</strong>ことが保証できれば、実行順序に依存する不具合は原理的に起きなくなります。</p>

      <Heading num="02">スキーマは本番と同じ経路で作る</Heading>
      <p>テスト用のDBを「別のSQLファイル」で作ると、本番のスキーマとずれていきます。必ず<strong>本番と同じマイグレーションを流して</strong>作ります。</p>
      <Steps>
        <li>空のDBを用意する</li>
        <li>本番と同じマイグレーションを最初から適用する</li>
        <li>マスタデータ(区分値など)だけをシードとして投入する</li>
        <li>業務データは各テストが必要な分だけ作る</li>
      </Steps>
      <p>この手順にしておくと、<strong>マイグレーション自体のテスト</strong>にもなります ― CIでいつも実行されるため、壊れたマイグレーションは即座に発覚します(「<Link href="/dev/backend/data/migration">マイグレーション</Link>」)。</p>

      <Heading num="03">データは「必要な分だけ」その場で作る</Heading>
      <p>共有の巨大なシードデータ(全テストが同じ100件を前提にする)は、次の理由で破綻します。</p>
      <table>
        <tbody>
          <tr><th>問題</th><th>内容</th></tr>
          <tr><td className="hl">テストが読めない</td><td>「ユーザー42」が何者か、テストコードを読んでも分からない</td></tr>
          <tr><td className="hl">変更が波及する</td><td>1件直すと、無関係な20個のテストが落ちる</td></tr>
          <tr><td className="hl">意図が消える</td><td>そのテストが何を前提にしているのかが暗黙になる</td></tr>
        </tbody>
      </table>
      <p>対して、<Term>ファクトリ</Term>(必要な項目だけ指定し、残りは既定値で埋める生成関数)を使うと、テストに<strong>そのテストが依存する条件だけ</strong>が現れます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 何を前提にしたテストなのかが一目で分かる
const user = await createUser({ plan: "free" });        // 他の項目は既定値
const order = await createOrder({ userId: user.id, total: 4999 });

expect(await calculateShipping(order)).toBe(500);       // 5000円未満なので送料あり`}</code>
      </pre>

      <Heading num="04">時刻・乱数・IDを固定する</Heading>
      <p>「昨日は通っていたのに今日は落ちる」テストの典型原因です。</p>
      <table>
        <tbody>
          <tr><th>要因</th><th>症状</th><th>対策</th></tr>
          <tr><td className="hl">現在時刻</td><td>月末・年度末・うるう年で落ちる</td><td>時刻を注入し、テストでは固定する</td></tr>
          <tr><td className="hl">タイムゾーン</td><td>CI(UTC)とローカル(JST)で日付が1日ずれる</td><td>タイムゾーンを明示的に固定する</td></tr>
          <tr><td className="hl">乱数・UUID</td><td>期待値が毎回変わる</td><td>種を固定するか、生成器を注入する</td></tr>
          <tr><td className="hl">自動採番ID</td><td>連番を期待値に書くと、実行順で変わる</td><td>IDを固定値で期待しない</td></tr>
        </tbody>
      </table>
      <Aside label="境界の日付を選ぶ">
        固定する日時は「適当な日」ではなく<strong>危ない日</strong>を選ぶと、テストの価値が上がります ― 月末、年末、うるう日、夏時間の切り替え日など。実装が日付計算をしているなら、これらは境界値そのものです(「<Link href="/test/design-techniques">テスト設計技法</Link>」)。
      </Aside>

      <Heading num="05">本番データを使わない</Heading>
      <p>「本番のデータをコピーすれば現実的なテストができる」という発想には、重大なリスクがあります。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>個人情報の拡散</h4><p>開発環境・ローカルPC・CIログに個人データが広がる。漏洩時の影響は本番と同等。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>誤送信</h4><p>本物のメールアドレスに<strong>テストメールが届く</strong>。決済連携なら実際に課金されうる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>法令上の問題</h4><p>目的外利用にあたる可能性がある(「<Link href="/ops/compliance">法令・コンプライアンス</Link>」)。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>再現性がない</h4><p>コピーした時点のスナップショットに依存し、他の人と結果が揃わない。</p></Card>
      </CardGrid>
      <p>どうしても現実的なデータ分布が必要なら、<strong>匿名化・仮名化</strong>を経て使います ― 氏名やメールを置換し、外部送信先をすべてテスト用に差し替え、不要な列は落とす。この加工を<strong>自動化された手順</strong>にしておくことが前提です。</p>

      <Heading num="06">外部への副作用を遮断する</Heading>
      <p>テスト環境から実際に外部へ通信が出ると、事故と不安定さの両方が生じます。</p>
      <table>
        <tbody>
          <tr><th>対象</th><th>遮断の方法</th></tr>
          <tr><td className="hl">メール</td><td>送信先を捕捉するダミーサーバーへ向ける。本物には出さない</td></tr>
          <tr><td className="hl">決済・外部API</td><td>サンドボックス環境、または<Link href="/test/doubles">スタブ</Link>を使う</td></tr>
          <tr><td className="hl">通信全般</td><td>テスト実行時に外向き通信を禁止し、漏れを検出する</td></tr>
          <tr><td className="hl">ファイル・オブジェクトストレージ</td><td>一時ディレクトリやローカル互換サーバーを使う</td></tr>
        </tbody>
      </table>

      <Heading num="07">E2Eのデータをどうするか</Heading>
      <p>E2Eテストでは、画面操作の前提となるデータをどう用意するかが問題になります。</p>
      <table>
        <tbody>
          <tr><th>方法</th><th>利点 / 欠点</th></tr>
          <tr><td className="hl">画面操作で作る</td><td>本番に近い / <strong>遅い・壊れやすい</strong>。前提作りで失敗すると本題に入れない</td></tr>
          <tr><td className="hl">APIで作る</td><td>速く安定 / APIの正しさに依存する。<strong>実務ではこれが主流</strong></td></tr>
          <tr><td className="hl">DBに直接入れる</td><td>最速 / 業務ルールを飛ばすため、不正な状態を作りやすい</td></tr>
          <tr><td className="hl">専用アカウントを固定</td><td>準備不要 / 状態が蓄積し、いずれ壊れる</td></tr>
        </tbody>
      </table>
      <p>原則は<strong>「検証したい操作だけを画面で行い、前提はAPIで作る」</strong>です。あわせて、テストごとに一意な値(メールアドレスに実行IDを含めるなど)を使うと、並列実行しても衝突しません(「<Link href="/test/e2e">E2Eテスト</Link>」)。</p>

      <Heading num="まとめ">データを制御下に置く</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>各テストが自分で用意する</h4><p>共有シードに頼らない。前提がテストコードに書かれている状態にする。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>時刻と乱数を固定する</h4><p>「たまに落ちる」の主因。注入して制御する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>本番データを持ち込まない</h4><p>漏洩・誤送信・法令のリスク。使うなら必ず匿名化する。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/test/flaky" tag="テスト">フレーキーテスト</RelatedLink>
            <RelatedLink href="/test/patterns" tag="テスト">テストパターン</RelatedLink>
            <RelatedLink href="/dev/backend/data/migration" tag="バックエンド">マイグレーション</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
