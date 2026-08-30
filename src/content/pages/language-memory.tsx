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
  title: "メモリ管理とGC",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>メモリ管理とGC ― 誰がいつ片付けるのか</h1>
        <Lead>
          確保したメモリを解放し忘れれば、プロセスは肥大化してやがて落ちます。まだ使っているメモリを解放してしまえば、原因不明のクラッシュや脆弱性になります。この<Term>「いつ片付けるか」を誰が決めるか</Term>という設計判断が、言語の性格を最も大きく分けています。
        </Lead>
      </Hero>

      <Heading num="01">スタックとヒープ ― 片付け方が違う</Heading>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>スタック</th>
            <th>ヒープ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">用途</td>
            <td>関数のローカル変数、引数、戻り先</td>
            <td>実行時に大きさが決まるデータ、長生きするデータ</td>
          </tr>
          <tr>
            <td className="hl">解放</td>
            <td>関数を抜ければ自動</td>
            <td>誰かが明示的に、または自動で回収する必要がある</td>
          </tr>
          <tr>
            <td className="hl">速度</td>
            <td>非常に速い(ポインタを動かすだけ)</td>
            <td>遅い(空き領域の管理が要る)</td>
          </tr>
          <tr>
            <td className="hl">問題</td>
            <td>深い再帰でオーバーフロー</td>
            <td>リーク・二重解放・断片化</td>
          </tr>
        </tbody>
      </table>

      <p>
        つまり「メモリ管理が難しい」と言うとき、対象はほぼヒープです。詳しい構造は<Link href="/computer/memory-stack">スタックと関数呼び出しの舞台裏</Link>と<Link href="/computer/os-memory">記憶管理と仮想記憶</Link>を参照してください。
      </p>

      <Heading num="02">手動管理 ― 速いが、間違えると危ない</Heading>
      <p>
        C/C++のように、確保(<code>malloc</code>・<code>new</code>)と解放(<code>free</code>・<code>delete</code>)をプログラマが書く方式です。制御は完全ですが、次の誤りが起こります。
      </p>

      <table>
        <thead>
          <tr>
            <th>誤り</th>
            <th>結果</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">解放し忘れ(メモリリーク)</td>
            <td>使用量が増え続け、いずれ枯渇する</td>
          </tr>
          <tr>
            <td className="hl">二重解放</td>
            <td>ヒープの管理情報が壊れ、クラッシュや脆弱性になる</td>
          </tr>
          <tr>
            <td className="hl">解放後の使用(use-after-free)</td>
            <td>典型的な深刻な脆弱性。攻撃に利用される</td>
          </tr>
          <tr>
            <td className="hl">境界外アクセス</td>
            <td>隣のデータを破壊する。バッファオーバーフロー</td>
          </tr>
        </tbody>
      </table>

      <p>
        大規模なC/C++製品で報告される深刻な脆弱性の多くが、このメモリ安全性に起因すると報告されています。だからこそ、後続の言語はこの領域を言語側で引き受けてきました。
      </p>

      <Heading num="03">参照カウント ― 使っている人を数える</Heading>
      <p>
        オブジェクトごとに「いくつの参照から指されているか」を数え、<Term>0になった瞬間に解放</Term>する方式です。Pythonの主機構、Swiftの<Term>ARC</Term>、C++の<code>shared_ptr</code>が該当します。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>利点 ― 即座に解放</h4>
          <p>不要になった瞬間に片付きます。メモリ使用量が予測しやすい方式です。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>利点 ― 停止時間が短い</h4>
          <p>まとめて止まる時間がありません。実時間性が要る用途に向きます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>欠点 ― 循環参照</h4>
          <p>
            AがBを、BがAを指すと、どちらもカウントが0にならず永久に残ります。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>欠点 ― 更新コスト</h4>
          <p>
            参照の増減のたびにカウンタを操作します。並行環境ではさらに高くつきます。
          </p>
        </Card>
      </CardGrid>

      <Heading num="04">トレーシングGC ― 根からたどって、届かないものを捨てる</Heading>
      <p>
        Java・C#・Go・JavaScriptが採用する主流の方式です。「参照されているか」を数えるのではなく、<Term>根(グローバル変数・スタック上の変数)から実際にたどれるか</Term>で判定します。
      </p>

      <DiagramFrame
        slug="language-memory-reachability"
        aspect="640 / 300"
        caption="トレーシングGCが到達可能性で判定することを示したオブジェクトグラフ。根から矢印をたどれるAとBには印が付き、生き残る。右側のCとDはどこからも指されておらず、互いに指し合う循環参照になっている。参照カウント方式ではCとDのカウントが1のまま0にならず永久に残るが、トレーシングGCは根からたどれるかどうかだけを見るため、CとDはまとめて回収される。"
      />

      <Steps>
        <li>マーク ― 根から参照をたどり、到達できたオブジェクトに印を付ける</li>
        <li>スイープ ― 印の付いていないオブジェクトを回収する</li>
        <li>
          コンパクション(方式による) ― 生き残りを詰めて配置し、断片化を解消する
        </li>
      </Steps>

      <Analogy label="💡 たとえるなら">
        参照カウントが「この本を借りている人が何人いるか」を数える方式なら、トレーシングGCは<strong>閉館後に入口から通路をたどって行ける棚を確認し、どこからも行けない棚ごと処分する</strong>方式です。互いに貸し借りしているだけの本(循環参照)も、入口から行けなければ処分されます。
      </Analogy>

      <p>
        たどれないものを捨てるため、循環参照も正しく回収できます。代償は「たどる作業そのもののコスト」と、その間の停止です。
      </p>

      <Heading num="05">世代別GC ― ほとんどのオブジェクトはすぐ死ぬ</Heading>
      <p>
        経験則として、生成されたオブジェクトの大半はごく短命です(世代仮説)。そこで、新しい領域と古い領域を分けます。
      </p>

      <table>
        <thead>
          <tr>
            <th>領域</th>
            <th>回収の頻度</th>
            <th>コスト</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">新世代(young)</td>
            <td>頻繁</td>
            <td>対象が少なく、ほとんどがゴミなので安い</td>
          </tr>
          <tr>
            <td className="hl">旧世代(old)</td>
            <td>まれ</td>
            <td>対象が多く、時間がかかる</td>
          </tr>
        </tbody>
      </table>

      <p>
        新世代を何度か生き延びたオブジェクトだけを旧世代へ移すことで、大部分の回収を安く済ませます。V8・JVM・.NETはいずれもこの構造を持っています。
      </p>

      <Heading num="06">GCの代償 ― 停止時間とスループット</Heading>

      <table>
        <thead>
          <tr>
            <th>指標</th>
            <th>意味</th>
            <th>効くところ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">停止時間(pause)</td>
            <td>回収のためにアプリが止まる時間</td>
            <td>応答時間、特にテール(p99)</td>
          </tr>
          <tr>
            <td className="hl">スループット</td>
            <td>全体のうちアプリ処理に使える割合</td>
            <td>バッチ処理の総処理量</td>
          </tr>
          <tr>
            <td className="hl">メモリ使用量</td>
            <td>余裕を持たせるほど回収は減る</td>
            <td>コンテナのメモリ上限</td>
          </tr>
        </tbody>
      </table>

      <p>
        Goのように停止時間の短さを最優先する実装もあれば、JVMのように用途別に複数のGCを選べる実装もあります。<Term>「GCがあるから遅い」ではなく、何を優先した設計かを見る</Term>のが正しい理解です。
      </p>

      <Aside label="コンテナでのメモリ設定">
        コンテナのメモリ上限とランタイムのヒープ上限が食い違うと、GCが動く前にOSに強制終了される(OOM Kill)という事故が起きます。ランタイム側に上限を認識させる設定を必ず確認してください。
      </Aside>

      <Heading num="07">所有権 ― GCなしで安全にする</Heading>
      <p>
        Rustは第3の道を採ります ―
        <Term>コンパイル時に解放位置を決める</Term>ことで、実行時のGCも手動解放も不要にしました。
      </p>

      <table>
        <thead>
          <tr>
            <th>規則</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">所有権</td>
            <td>各値の所有者は常に1つ。所有者がスコープを抜けたら解放される</td>
          </tr>
          <tr>
            <td className="hl">移動(move)</td>
            <td>代入や関数渡しで所有権が移る。元の変数はもう使えない</td>
          </tr>
          <tr>
            <td className="hl">借用(borrow)</td>
            <td>所有権を移さず一時的に参照する。可変の借用は同時に1つだけ</td>
          </tr>
          <tr>
            <td className="hl">ライフタイム</td>
            <td>参照が元の値より長生きしないことをコンパイラが検査する</td>
          </tr>
        </tbody>
      </table>

      <p>
        この規則により、use-after-freeもデータ競合もコンパイル時に排除されます(<Link href="/language/concurrency-race">競合状態とデータ競合</Link>)。代償は学習コストで、コンパイラを納得させる書き方を覚える必要があります。C++の<Term>RAII</Term>(オブジェクトの寿命に資源の解放を結びつける)も同じ発想で、こちらは規約として実現しています。
      </p>

      <Heading num="08">GCがある言語でもリークする</Heading>
      <p>
        「GCがあるからメモリリークは起きない」は誤りです。<Term>参照が残っている限り回収されない</Term>ため、意図せず参照を持ち続けると同じ結果になります。
      </p>

      <table>
        <thead>
          <tr>
            <th>原因</th>
            <th>典型例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">グローバルな入れ物</td>
            <td>
              モジュールスコープの<code>Map</code>にキャッシュを溜め続ける(上限を設けない)
            </td>
          </tr>
          <tr>
            <td className="hl">イベントリスナ</td>
            <td>登録したまま解除しない。参照が残り続ける</td>
          </tr>
          <tr>
            <td className="hl">クロージャ</td>
            <td>不要になった大きなオブジェクトを閉じ込めている</td>
          </tr>
          <tr>
            <td className="hl">タイマー</td>
            <td>
              <code>setInterval</code>を止めていない
            </td>
          </tr>
          <tr>
            <td className="hl">未解放の資源</td>
            <td>ファイルハンドル・DB接続。GCの対象外なので明示的に閉じる</td>
          </tr>
        </tbody>
      </table>

      <p>
        調べ方は共通しています ―
        時間経過に対するメモリ使用量を監視し、右肩上がりなら疑う。次にヒープのスナップショットを2点で取り、増えているオブジェクトの種類と参照元をたどります。
      </p>

      <Heading num="まとめ">3つの方式と、その代償</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>手動</h4>
          <p>最速・最も制御できますが、リークと脆弱性の責任をすべて負います。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>自動(GC)</h4>
          <p>
            安全で書きやすい方式。代償は停止時間とメモリの余裕で、それでもリークはしえます。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>所有権</h4>
          <p>
            実行時コストなしで安全性を得ます。代償はコンパイラとの対話コストです。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/language/memory" />
    </DocsPage>
  );
}
