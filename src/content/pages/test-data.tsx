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
  Steps,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "テストデータ管理" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>テストデータ管理 ― 自分の分は、自分で作って片付ける</h1>
        <Lead>
          <Link href="/test/doubles">テストダブル</Link>で外部への依存を断ちました。残るのが2つ目の源、<Term>共有された状態</Term>です。単独で走らせれば通るので書いた本人には見えず、CIで気まぐれに落ちる形で表面化します。ここで扱うのは、<strong>テストが使うデータをどう用意し、どう隔離し、どう片付けるか</strong>という一連の設計です。
        </Lead>
      </Hero>

      <Heading num="01">テストごとに独立させる4つの方式</Heading>
      <p>
        独立性を壊す最大の要因が共有されたデータベースです。対策には段階があり、<strong>速さと隔離の強さがトレードオフ</strong>になります。
      </p>

      <DiagramFrame
        slug="test-data-isolation"
        aspect="700 / 320"
        caption="テスト同士をデータベース上で隔離する4つの方式の比較。トランザクションで巻き戻す方式は最も速いが、テスト対象自身がトランザクションを張ると噛み合わない。テストごとにテーブルを空にする方式は分かりやすいが、同じDBを共有したまま並列実行すると互いのデータを消し合う。ワーカーごとにDBを分ける方式は速度は普通だが並列実行が安全にできる。実行のたびにコンテナを立てる方式は最も遅いが最も確実。実務では、ワーカーごとにDBを分けたうえで各テストはトランザクションで巻き戻す組み合わせが扱いやすい。"
      />

      <p>
        どれを選ぶかより、<strong>テスト間で状態が漏れないことを保証できるか</strong>のほうが重要です。それさえ言い切れれば、実行順序に依存する不具合は原理的に起きなくなります。
      </p>

      <Heading num="02">スキーマは、本番と同じ経路で作る</Heading>
      <p>
        テスト用DBを「テスト専用のSQLファイル」で作ると、本番のスキーマと少しずつずれていきます。必ず<strong>本番と同じマイグレーションを流して</strong>作ります。
      </p>

      <Steps>
        <li>空のDBを用意する</li>
        <li>本番と同じマイグレーションを最初から適用する</li>
        <li>マスタデータ(区分値など)だけをシードとして投入する</li>
        <li>業務データは、各テストが必要な分だけその場で作る</li>
      </Steps>

      <p>
        この手順には副次的な効果があります ― <strong>マイグレーション自体のテストになる</strong>ことです。CIで毎回実行されるので、壊れたマイグレーションはその場で発覚します(<Link href="/backend/data-migration">マイグレーション</Link>)。
      </p>

      <Heading num="03">必要な分だけ、その場で作る</Heading>
      <p>
        「全テストが同じ100件を前提にする」共有シードは、規模が大きくなると必ず破綻します。
      </p>

      <DiagramFrame
        slug="test-data-factory"
        aspect="640 / 320"
        caption="共有の巨大なシードデータと、ファクトリでその場で作る方式の比較。共有シードではテストコードに識別子だけが現れ、その42番が何者なのか読んでも分からない。1件直すと無関係な20個が落ち、何を前提にしたテストかも消える。ファクトリでは必要な項目だけを指定し残りは既定値で埋めるため、無料プランであること、5000円未満であることといった、そのテストが依存する条件だけがコードに現れる。テストデータは共有する資産ではなく、そのテストの一部。"
      />

      <p>
        <Term>ファクトリ</Term>の効果は、速さでも隔離でもなく<strong>可読性</strong>にあります。指定しなかった項目は既定値で埋まるので、<Term>書いてある項目がそのままこのテストの前提</Term>になります。20行のINSERTを書いた場合、そのうちどの値が本質でどれが埋め草かは、書いた本人にしか分かりません。
      </p>

      <pre>
        <code>{`// 何を前提にしたテストなのかが、1行目と2行目に出ている
const user = await createUser({ plan: "free" });
const order = await createOrder({ userId: user.id, total: 4999 });

expect(await calculateShipping(order)).toBe(500); // 5000円未満なので送料あり`}</code>
      </pre>

      <Heading num="04">時刻・乱数・IDを固定する</Heading>
      <p>
        「昨日は通っていたのに今日は落ちる」テストの典型原因です。3つ目の源である<Term>実行の時間と順序</Term>のうち、データ側から対処できる部分がここに集まります。
      </p>

      <table>
        <thead>
          <tr><th>要因</th><th>症状</th><th>対策</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">現在時刻</td><td>月末・年度末・うるう年で落ちる</td><td>時刻を注入し、テストでは固定する</td></tr>
          <tr><td className="hl">タイムゾーン</td><td>CIと手元で日付が1日ずれる</td><td>実行時のタイムゾーンを明示的に固定する</td></tr>
          <tr><td className="hl">乱数・ID生成</td><td>期待値が毎回変わる</td><td>種を固定するか、生成器を注入する</td></tr>
          <tr><td className="hl">自動採番</td><td>連番を期待値に書くと実行順で変わる</td><td>IDを固定値で期待しない</td></tr>
        </tbody>
      </table>

      <Aside label="固定する日付は、危ない日を選ぶ">
        固定する日時に「適当な日」を選ぶのはもったいない選択です。<strong>月末、年末、うるう日、夏時間の切り替え日</strong>を選べば、それだけでテストの価値が上がります ― 実装が日付計算をしているなら、これらは<Link href="/test/design-techniques">境界値</Link>そのものだからです。
      </Aside>

      <p>
        なお「月末に落ちるテスト」は、<strong>テストの問題ではなく実装が環境に依存しすぎている兆候</strong>であることが多くあります。時刻を引数で受け取る形にすること自体が、良い設計の副産物です。
      </p>

      <Heading num="05">本番データを持ち込まない</Heading>
      <p>
        「本番のデータをコピーすれば現実的なテストができる」という発想には、4つのリスクがあります。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>個人情報の拡散</h4>
          <p>開発環境・手元のPC・CIのログに個人データが広がる。漏洩時の影響は本番と同等。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>誤送信</h4>
          <p>本物のメールアドレスにテストメールが届く。決済が絡めば実際に課金されうる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>目的外利用</h4>
          <p>取得時に説明した利用目的の範囲を超える可能性がある。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>再現性がない</h4>
          <p>コピーした時点の状態に依存し、他の人と結果が揃わない。</p>
        </Card>
      </CardGrid>

      <p>
        どうしても現実的なデータ分布が必要なら、<strong>匿名化・仮名化を経て使います</strong> ― 氏名やメールを置換し、外部への送信先をすべてテスト用に差し替え、不要な列は落とす。そしてこの加工は<Term>自動化された手順</Term>にしておくことが前提です。人が手で加工したデータは、必ずどこかで加工漏れが起きます。
      </p>

      <Heading num="06">外部への副作用を、経路ごと塞ぐ</Heading>
      <p>
        テスト環境から実際に外部へ通信が出ると、事故と不安定さの両方が生じます。<Link href="/test/doubles">テストダブル</Link>で1つずつ差し替えるのが基本ですが、<strong>差し替え忘れを前提にした二重の防御</strong>を置いておくと安全です。
      </p>

      <table>
        <thead>
          <tr><th>手立て</th><th>効果</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">テスト実行時は外向き通信を遮断する</td><td>差し替え忘れが、事故ではなくテストの失敗として現れる</td></tr>
          <tr><td className="hl">送信先をテスト用受信箱に固定する</td><td>実際の宛先に届かない。内容の確認もできる</td></tr>
          <tr><td className="hl">本番の資格情報をテスト環境に置かない</td><td>そもそも本番へ到達できない状態を作る</td></tr>
        </tbody>
      </table>

      <p>
        1行目が特に効きます ― 遮断していれば、代役への差し替えを忘れた箇所は<strong>本番へ通信してしまう前に、テストが落ちて教えてくれます</strong>。
      </p>

      <Heading num="07">外側の段階では、データの作り方が変わる</Heading>
      <p>
        <Link href="/test/e2e">E2E</Link>では、テストコードとアプリケーションが別のプロセスで動くため、内側の段階のようにファクトリを直接呼べません。代わりに<strong>APIを経由してデータを作る</strong>のが基本形になります。
      </p>
      <p>
        このとき効くのが、ここまでと同じ原則です ― <Term>テストごとに固有のデータを作り、他のテストと共有しない</Term>。固定のメールアドレスや共有の管理者アカウントを使った瞬間、並列実行で衝突します。片付けについては、テストごとにDBを分けているなら不要になり、共有しているなら明示的に消す必要があります。
      </p>

      <Heading num="まとめ">データを制御下に置く</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>状態が漏れないことを保証する</h4>
          <p>方式の選択より、言い切れるかどうかが本質。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>スキーマは本番と同じ経路で</h4>
          <p>ずれを防ぎ、ついでにマイグレーション自体のテストになる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>書いてある項目が前提になる</h4>
          <p>ファクトリの効果は速さではなく、読めば前提が分かること。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>変わるものを固定する</h4>
          <p>時刻・乱数・ID。固定する日付には、危ない日を選ぶ。</p>
        </Card>
      </CardGrid>

      <p>
        データが制御下に入ったら、テストコード自体の書き方に定石があります。<Link href="/test/patterns">テストパターン</Link>へ進みます。
      </p>

      <DocsFooter href="/test/data" />
    </DocsPage>
  );
}
