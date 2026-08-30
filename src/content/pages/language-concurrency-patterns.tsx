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
  Analogy,
  Aside,
  DiagramFrame,
  Steps,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "並行処理の実装パターン",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>実装パターン ― 並列度・キャンセル・冪等性</h1>
        <Lead>
          原因(競合)と対処(排他)、その副作用(デッドロック)、そしてモデルの選択を見てきました。最後は、実際にコードを書くときに繰り返し現れる型を集めます。どれも「同時に走らせると壊れる」を避けるための、地味だが効く定石です。
        </Lead>
      </Hero>

      <Heading num="01">全部同時に投げない ― 並列度を絞る</Heading>
      <p>
        最もよくある事故がこれです。<code>Promise.all</code>は書きやすいぶん、渡した数だけ<Term>一斉に</Term>実行します。
      </p>

      <pre>
        <code>{`// 危険 ― 5000件なら5000本のリクエストが同時に飛ぶ
const results = await Promise.all(userIds.map((id) => fetchProfile(id)));`}</code>
      </pre>

      <p>
        結果として、相手のAPIにレート制限で弾かれる、DBのコネクションプールが枯渇する、メモリを使い切る、といった被害が出ます。<Term>同時に走る数には必ず上限を設ける</Term>のが原則です。
      </p>

      <pre>
        <code>{`// 同時実行を limit 本に抑える最小限の実装
async function mapLimit<T, U>(items: T[], limit: number,
                              fn: (x: T) => Promise<U>): Promise<U[]> {
  const results = new Array<U>(items.length);
  let cursor = 0;
  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (cursor < items.length) {
        const index = cursor++; // 取り出しは同期的 ― ここに await を挟まない
        results[index] = await fn(items[index]);
      }
    },
  );
  await Promise.all(workers);
  return results;
}

const profiles = await mapLimit(userIds, 10, fetchProfile);`}</code>
      </pre>

      <Aside label="上限はどう決めるか">
        勘で決めず、<Term>一番細い管</Term>に合わせます ―
        DBのプール上限、相手APIのレート制限、CPUのコア数のうち最も厳しいものです。プール上限が10なら、DBを叩く並列度も10以下にしなければ、待ち行列が伸びるだけで速くなりません。
      </Aside>

      <Heading num="02">ファンアウトとファンイン ― 部分的な失敗をどう扱うか</Heading>
      <p>
        複数の処理に分けて投げ、結果を集めるときは、<Term>1つ失敗したらどうするか</Term>を先に決めます。
      </p>

      <table>
        <thead>
          <tr>
            <th>やり方</th>
            <th>挙動</th>
            <th>使う場面</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">
              <code>Promise.all</code>
            </td>
            <td>1つでも失敗したら即座に失敗を返す</td>
            <td>全部揃わないと意味がない処理</td>
          </tr>
          <tr>
            <td className="hl">
              <code>Promise.allSettled</code>
            </td>
            <td>全部の成否を集める</td>
            <td>一部欠けても表示できるダッシュボードなど</td>
          </tr>
          <tr>
            <td className="hl">
              <code>Promise.race</code>
            </td>
            <td>最初に決着した1つを採用</td>
            <td>タイムアウトとの競走</td>
          </tr>
          <tr>
            <td className="hl">
              <code>Promise.any</code>
            </td>
            <td>最初に成功した1つを採用</td>
            <td>複数の代替ソースから取得</td>
          </tr>
        </tbody>
      </table>

      <p>
        注意すべきは、<code>Promise.all</code>が失敗を返した時点でも<Term>他の処理は止まっていない</Term>ことです。裏で走り続け、後から解決し、誰にも捕まえられない例外を投げることがあります。止めたいならキャンセルが必要です。
      </p>

      <Heading num="03">タイムアウトとキャンセル</Heading>
      <p>
        並行処理では「待ち続けない」ことが安全装置になります。JavaScriptでは<code>AbortSignal</code>がその標準的な手段です。
      </p>

      <pre>
        <code>{`// タイムアウトと外部からの中断を1つのシグナルにまとめる
const signal = AbortSignal.any([
  AbortSignal.timeout(3000),
  request.signal, // 利用者が画面を離れたら中断
]);
const res = await fetch(url, { signal });`}</code>
      </pre>

      <p>
        重要なのは、<Term>キャンセルは協調的</Term>だということです。呼ばれた側がシグナルを見て自分で止まらない限り、処理は続きます。自前の長い処理を書くときは、区切りごとに中断されたかを確認して抜ける必要があります。
      </p>

      <Analogy label="💡 たとえるなら">
        キャンセルは「肩を叩いて中断をお願いする」行為です。強制的に電源を切るわけではないので、相手が振り向かなければ作業は続きます。振り向くポイントを自分で用意しておくのが書き手の責任です。
      </Analogy>

      <Heading num="04">バックプレッシャー ― 詰まりを上流へ伝える</Heading>
      <p>
        受け手より送り手が速いと、その差はキューやメモリに溜まります。溜まり続ければ、遅延の増大かメモリ枯渇でいずれ倒れます。<Term>バックプレッシャー</Term>とは、詰まりを上流に伝えて<Term>生産側を減速させる</Term>仕組みです。
      </p>

      <DiagramFrame
        slug="language-concurrency-backpressure"
        aspect="640 / 290"
        caption="バックプレッシャーの有無の比較。上段は上限を設けない場合で、毎秒1000件の流入に対し受け手は毎秒100件しかさばけず、差がキューに溜まり続けて遅延とメモリが伸び続ける。下段はキューに上限を設け、溢れたぶんを断る場合で、断られた送り手が速度を落とすためキューの長さは一定に保たれ、受け手は本来の速度で処理を続けられる。"
      />

      <table>
        <thead>
          <tr>
            <th>層</th>
            <th>どう効かせるか</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">HTTP</td>
            <td>同時リクエスト数を制限し、超過分は429を返す</td>
          </tr>
          <tr>
            <td className="hl">ストリーム</td>
            <td>読み込みを一時停止する(Node.jsのStreamは自動的に行う)</td>
          </tr>
          <tr>
            <td className="hl">ジョブキュー</td>
            <td>キューの長さを監視し、上限で投入を拒否する</td>
          </tr>
          <tr>
            <td className="hl">サービス間</td>
            <td>タイムアウトやサーキットブレーカで呼び出し自体を止める</td>
          </tr>
        </tbody>
      </table>

      <p>
        やってはいけないのは、無制限のキューでとりあえず受け取ることです。<Term>「あとで処理する」は「無限に溜め込む」ではありません</Term> ―
        溢れたら早く断るほうが、全体としては健全に動きます。
      </p>

      <Heading num="05">冪等性 ― 二重実行に備える</Heading>
      <p>
        並行処理と再試行がある世界では、<Term>同じ処理が2回走ることは避けられません</Term>。ネットワークのタイムアウト、ジョブの再配信、利用者の二度押し ―
        どれも日常的に起きます。そこで、2回実行されても結果が変わらない性質 ―
        <Term>冪等性</Term>を持たせます。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>冪等キー</h4>
          <p>
            クライアントが発行した一意のキーを受け取り、同じキーの2回目は前回の結果を返します。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>一意制約</h4>
          <p>
            DBに一意制約を張れば、同時に来ても片方は必ず失敗します。アプリの判定に頼りません。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>絶対値で書く</h4>
          <p>
            「1増やす」ではなく「この状態にする」のように、何度実行しても同じ結果になる更新にします。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>実行記録</h4>
          <p>
            処理IDをテーブルに記録し、記録できたときだけ実行します。
          </p>
        </Card>
      </CardGrid>

      <p>
        冪等性が備わっていれば、分散ロックが一瞬外れても、ジョブが二重配信されても、最終的な結果は壊れません。<Term>ロックで防ぎきるより、二重実行を無害にするほうが堅牢</Term>です。
      </p>

      <Heading num="06">一度だけ実行したい ― 定期処理の重複起動</Heading>
      <p>
        複数インスタンスで動くアプリに定期実行を仕込むと、インスタンスの数だけ同時に走ります。「毎朝の集計メールが3通届く」の原因はこれです。
      </p>

      <Steps>
        <li>
          実行主体を1つにする ― スケジューラをアプリの外に出す
        </li>
        <li>
          排他キーで守る ― 「日付 + ジョブ名」を一意キーとして先に登録し、成功した1人だけが実行する
        </li>
        <li>
          リーダー選出 ― 分散ロックを取れたインスタンスだけがスケジューラとして振る舞う
        </li>
      </Steps>

      <p>
        ①が最も単純で確実です。アプリ内で解決しようとする前に、実行場所を分離できないか検討してください。
      </p>

      <Heading num="07">順序が必要なら、キーごとに直列化する</Heading>
      <p>
        並列度を上げると順序は保証されません。しかし全体を直列にすると遅くなります。折衷案が<Term>キー単位の直列化</Term>です。
      </p>
      <p>
        「同じ注文IDの処理は必ず1本で順番に、異なる注文IDは並列で」というように、対象ごとにレーンを分けます。これは実質的に、キーごとの小さな<Link href="/language/concurrency-models">アクター</Link>を作ることに相当します。
      </p>

      <Heading num="08">テストとデバッグ ― 偶然に頼らない</Heading>
      <p>
        並行処理のバグは「たまに落ちる」形で現れるため、通常のテストでは捕まりません。次の手段を組み合わせます。
      </p>

      <table>
        <thead>
          <tr>
            <th>手段</th>
            <th>何を確かめるか</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">意図的に同時実行するテスト</td>
            <td>
              同じ処理を<code>Promise.all</code>で10本同時に走らせ、結果が1件だけになるか
            </td>
          </tr>
          <tr>
            <td className="hl">遅延の注入</td>
            <td>クリティカルセクションの途中に待ちを差し込み、割り込みを再現させる</td>
          </tr>
          <tr>
            <td className="hl">負荷テスト</td>
            <td>本番相当の同時接続数で、プールの枯渇やロック待ちが出ないか</td>
          </tr>
          <tr>
            <td className="hl">再試行の検証</td>
            <td>同じジョブを2回投入して、結果が変わらないか(冪等性のテスト)</td>
          </tr>
          <tr>
            <td className="hl">監視</td>
            <td>デッドロック回数・プール待ち・キュー長を常時見る</td>
          </tr>
        </tbody>
      </table>

      <p>
        とくに1行目は費用対効果が高く、ユニットテストのレベルで書けます。「同時に来たらどうなるか」を1本書いておくだけで、競合の大半は開発中に見つかります。
      </p>

      <Heading num="まとめ">並行処理の設計チェックリスト</Heading>

      <Steps>
        <li>その状態は本当に共有する必要があるか ― 共有しない設計にできないか</li>
        <li>
          読み取りと書き込みの間に<code>await</code>やネットワーク越しの往復が挟まっていないか
        </li>
        <li>更新は1つのアトミックな操作にまとめられないか</li>
        <li>
          ロックを使うなら、取得順序は全体で統一されているか。必ずタイムアウトするか
        </li>
        <li>同時実行数に上限はあるか ― 一番細い管に合わせているか</li>
        <li>二重に実行されても壊れないか(冪等性)。再試行は安全か</li>
        <li>詰まったときに溜め込まず、断れるか(バックプレッシャー)</li>
      </Steps>

      <DocsFooter href="/language/concurrency-patterns" />
    </DocsPage>
  );
}
