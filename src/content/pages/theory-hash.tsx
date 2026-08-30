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
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ハッシュ表",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>基礎理論</Eyebrow>
        <h1>ハッシュ表 ― 鍵から置き場所を計算する</h1>
        <Lead>
          配列は「何番目か」が分かれば一瞬で取り出せますが、「田中さんのデータ」を探すには先頭から順に見るしかありません。
          <strong>鍵そのものから置き場所を計算してしまえば</strong>、名前でも一瞬で取り出せる ―
          この単純な着想が、辞書・連想配列・<code>Map</code>{" "}
          ・キャッシュ・データベースの索引まで、あらゆる場所で使われています。
        </Lead>
      </Hero>

      <Heading num="01">仕組み ― 鍵を数値に変えて添字にする</Heading>
      <p>
        <Term>ハッシュ表</Term>は、鍵(key)を<Term>ハッシュ関数</Term>
        で整数に変換し、その値を配列の添字として使うデータ構造です。
      </p>

      <DiagramFrame
        slug="theory-hash-bucket"
        aspect="820 / 320"
        caption="鍵をハッシュ関数に通して得た数値を、そのまま配列の添字として使う仕組み。&quot;tanaka&quot;は3番地に置かれる。異なる鍵が同じ番地になった場合(衝突)は、その番地にリストとして繋ぐのがチェイニング方式。"
      />

      <p>
        探すときも同じ計算をするだけなので、比較の回数はほぼ1回 ― 平均 <Term>O(1)</Term>{" "}
        で読み書きできます。要素が100万個あっても、10億個あっても変わりません。
      </p>
      <Analogy label="💡 たとえるなら">
        図書館で本を探すのに、棚を1つずつ見て回るのが線形探索です。ハッシュ表は「タイトルから請求番号を計算する規則」を持っているようなもので、いきなり目的の棚へ行けます。
      </Analogy>

      <Heading num="02">衝突 ― 違う鍵が同じ場所を指す</Heading>
      <p>
        鍵は無限に作れますが、配列の大きさは有限です。したがって
        <strong>異なる鍵が同じ添字になること(衝突)は必ず起きます</strong>
        。ハッシュ表の実装とは、実質「衝突をどう捌くか」の設計です。
      </p>
      <table>
        <tbody>
          <tr>
            <th>方式</th>
            <th>やり方</th>
            <th>特徴</th>
          </tr>
          <tr>
            <td className="hl">チェイニング(連鎖法)</td>
            <td>同じ場所に来たものをリストで繋ぐ</td>
            <td>実装が単純。削除が容易。リストが伸びると遅くなる</td>
          </tr>
          <tr>
            <td className="hl">オープンアドレス法</td>
            <td>空いている別の場所を探して入れる</td>
            <td>メモリ効率が良い。削除の扱いが厄介</td>
          </tr>
        </tbody>
      </table>
      <p>
        後者では、次の場所の探し方に線形探査(隣を順に)・二次探査・ダブルハッシュなどの選択肢があります。線形探査は
        <strong>塊(クラスタ)ができやすく</strong>、埋まってくると急激に遅くなる性質があります。
      </p>

      <Heading num="03">負荷率とリハッシュ</Heading>
      <p>
        <Term>負荷率</Term>
        (格納数 ÷ 配列サイズ)が上がるほど衝突が増え、性能が落ちます。そこで実装は、一定の負荷率を超えたら
        <strong>より大きな配列を用意して全要素を入れ直します</strong>(リハッシュ)。
      </p>
      <table>
        <tbody>
          <tr>
            <th>負荷率</th>
            <th>状態</th>
          </tr>
          <tr>
            <td className="hl">0.5 以下</td>
            <td>快適。ほぼ衝突しない</td>
          </tr>
          <tr>
            <td className="hl">0.75 前後</td>
            <td>多くの実装が拡張を始める閾値</td>
          </tr>
          <tr>
            <td className="hl">1.0 に近い</td>
            <td>オープンアドレス法では致命的に遅くなる</td>
          </tr>
        </tbody>
      </table>
      <p>
        リハッシュ自体は O(n) かかりますが、頻度が低いため
        <Link href="/theory/complexity">償却</Link>すると1操作あたり O(1) に収まります。とはいえ
        <strong>その1回だけ遅くなる</strong>
        ため、応答時間が厳しい処理では、あらかじめ十分な大きさを確保しておく手もあります。
      </p>

      <Heading num="04">良いハッシュ関数の条件</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>一様に散る</h4>
          <p>出力が偏らない。偏れば衝突が集中し、O(n)に近づく。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>速い</h4>
          <p>読み書きのたびに呼ばれる。ここが重いと全体が遅くなる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>決定的</h4>
          <p>
            同じ鍵からは常に同じ値。実行ごとに変わってはならない(プロセス内では)。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>入力の全体を使う</h4>
          <p>先頭数文字だけ見ると、似た鍵が集中して衝突する。</p>
        </Card>
      </CardGrid>
      <Aside label="暗号学的ハッシュとは別物">
        SHA-256のような暗号学的ハッシュ関数は「元に戻せない」「衝突を意図的に作れない」ことを重視し、そのぶん低速です。ハッシュ表で使うのは速度重視の非暗号学的ハッシュで、目的が異なります。ただし
        <strong>外部入力を鍵にする場合</strong>
        は、衝突を狙った攻撃を防ぐため、実行ごとにランダムな種を混ぜる実装が使われます。
      </Aside>

      <Heading num="05">配列・木との使い分け</Heading>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>ハッシュ表</th>
            <th>配列</th>
            <th>
              <Link href="/theory/tree">平衡二分探索木</Link>
            </th>
          </tr>
          <tr>
            <td className="hl">鍵での検索</td>
            <td>
              <strong>O(1)</strong>
            </td>
            <td>O(n)</td>
            <td>O(log n)</td>
          </tr>
          <tr>
            <td className="hl">添字での取得</td>
            <td>不可</td>
            <td>
              <strong>O(1)</strong>
            </td>
            <td>不可</td>
          </tr>
          <tr>
            <td className="hl">順序を保つ</td>
            <td>保証しない</td>
            <td>保つ</td>
            <td>
              <strong>常に整列</strong>
            </td>
          </tr>
          <tr>
            <td className="hl">範囲検索(20〜30)</td>
            <td>苦手</td>
            <td>要走査</td>
            <td>
              <strong>得意</strong>
            </td>
          </tr>
          <tr>
            <td className="hl">最悪ケース</td>
            <td>O(n)</td>
            <td>O(n)</td>
            <td>O(log n)</td>
          </tr>
        </tbody>
      </table>
      <p>
        「等価一致だけならハッシュ、範囲や順序が要るなら木」が原則です。
        <Link href="/database/index">データベースの索引</Link>で B木 が主流なのは、範囲検索(
        <code>WHERE price BETWEEN ...</code>)と整列(<code>ORDER BY</code>
        )を同じ索引で賄えるからです。
      </p>

      <Heading num="06">実務でのハッシュ表</Heading>
      <table>
        <tbody>
          <tr>
            <th>場面</th>
            <th>使われ方</th>
          </tr>
          <tr>
            <td className="hl">
              JavaScriptの <code>Map</code> / <code>Set</code>
            </td>
            <td>
              存在確認を O(1) にする。配列の <code>includes</code> をループで呼ぶ O(n²) の解消
            </td>
          </tr>
          <tr>
            <td className="hl">オブジェクトのプロパティ</td>
            <td>実質は文字列鍵のハッシュ表(エンジンによる最適化あり)</td>
          </tr>
          <tr>
            <td className="hl">キャッシュ</td>
            <td>鍵から値を引く。キャッシュの基本構造</td>
          </tr>
          <tr>
            <td className="hl">重複排除・集計</td>
            <td>ID集合の管理、出現回数のカウント</td>
          </tr>
          <tr>
            <td className="hl">データの分散</td>
            <td>鍵のハッシュでシャード/パーティションを決める</td>
          </tr>
        </tbody>
      </table>
      <pre>
        <code>{`// O(n²) ― 件数が増えると急激に遅くなる
const result = orders.filter((o) => vipIds.includes(o.userId));

// O(n) ― 一度 Set にすれば、判定は毎回 O(1)
const vipSet = new Set(vipIds);
const result = orders.filter((o) => vipSet.has(o.userId));`}</code>
      </pre>
      <p>
        これは実務で最も費用対効果の高い最適化の一つです。1万件×1万件なら1億回の比較が2万回程度になります。
      </p>

      <Heading num="07">分散環境での工夫 ― コンシステントハッシュ</Heading>
      <p>
        複数のサーバーにデータを振り分けるとき、素朴に「ハッシュ値 ÷ サーバー台数の余り」で決めると、
        <strong>台数が変わった瞬間にほぼ全データの配置が変わります</strong>
        。キャッシュなら全滅です。
      </p>

      <DiagramFrame
        slug="theory-hash-consistent"
        aspect="820 / 340"
        caption="コンシステントハッシュの円環。サーバーと鍵を同じ円周上に配置し、鍵から時計回りで最初に出会うサーバーが担当になる。サーバーCを追加しても、担当が変わるのは直前の区間にある鍵だけで、残りの配置はそのまま保たれる。"
      />

      <p>
        <Term>コンシステントハッシュ</Term>
        は、サーバーと鍵を同じ円環上に配置し、鍵から時計回りで最初に出会うサーバーを担当とする方式です。台数が変わっても
        <strong>移動するのは一部だけ</strong>
        で済みます。分散キャッシュや分散データベースで広く使われています。
      </p>

      <Heading num="まとめ">計算して行き先を決める</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>平均O(1)、最悪O(n)</h4>
          <p>
            速さは衝突の少なさに支えられている。外部入力では最悪ケースを意識する。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>順序は保証されない</h4>
          <p>範囲検索や整列が必要なら木を選ぶ。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>まずSet/Mapを思い出す</h4>
          <p>
            ループ内の <code>includes</code> は、ハッシュ表に置き換えるだけで桁違いに速くなる。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/theory/hash" />
    </DocsPage>
  );
}
