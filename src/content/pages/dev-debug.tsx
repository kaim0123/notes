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
  title: "デバッグと性能改善",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>デバッグと性能改善 ― 勘で直さない</h1>
        <Lead>
          バグ修正にかかる時間の大半は、直す作業ではなく<Term>原因を特定する作業</Term>です。そしてその時間は、才能ではなく手順で短縮できます。再現させ、範囲を半分に切り、仮説を1つずつ潰す ―
          この進め方を身に付けているかどうかで、同じ不具合にかける時間は何倍も変わります。性能改善もまったく同じ構造で、違うのは「正しさ」を追うか「速さ」を追うかだけです。
        </Lead>
      </Hero>

      <Heading num="01">デバッグは推測ではなく調査</Heading>
      <p>
        うまくいかないデバッグには共通の形があります ―
        <Term>「たぶんここだろう」と当たりを付けて修正し、動くかどうか試す</Term>やり方です。運が良ければ速いですが、外れると何も学べないまま時間だけが過ぎ、しかも直っていないのに直ったように見えることがあります。
      </p>

      <Steps>
        <li>
          再現させる ― 確実に起こせるようにする。これができなければ、直ったことも確認できない
        </li>
        <li>観察する ― 実際に何が起きているかを事実として集める(ログ・値・状態)</li>
        <li>
          仮説を立てる ― 「Xが原因なら、Yも起きているはず」と検証可能な形にする
        </li>
        <li>検証する ― 仮説を1つだけ変えて確かめる。同時に2つ変えない</li>
        <li>修正して確認する ― 再現手順で直ったことを確かめ、テストとして残す</li>
      </Steps>

      <Analogy label="💡 たとえるなら">
        医者が症状だけを見て薬を出すのではなく、検査で原因を特定してから治療するのと同じです。「とりあえず効きそうな薬を全部出す」やり方は、たまたま治っても<strong>何が効いたのか分からない</strong>ままです。
      </Analogy>

      <Heading num="02">まず再現させる</Heading>
      <p>再現できない不具合は直せません。報告を受けたら、まず次を確定させます。</p>

      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>確認すること</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">環境</td>
            <td>本番・検証・手元のどれか。ブラウザ、OS、バージョン</td>
          </tr>
          <tr>
            <td className="hl">操作手順</td>
            <td>どの画面で、何を入力し、どの順に操作したか</td>
          </tr>
          <tr>
            <td className="hl">データ</td>
            <td>どのアカウント・どのレコードで起きるか。他では起きないか</td>
          </tr>
          <tr>
            <td className="hl">頻度</td>
            <td>
              毎回か、たまにか。たまになら<Link href="/language/concurrency-race">並行処理</Link>や時刻を疑う
            </td>
          </tr>
          <tr>
            <td className="hl">期待と実際</td>
            <td>「どうなるはずが、どうなったか」を分けて書く</td>
          </tr>
          <tr>
            <td className="hl">いつから</td>
            <td>直前のリリース・設定変更・データ移行と対応していないか</td>
          </tr>
        </tbody>
      </table>

      <p>
        次に、再現手順を<Term>できるだけ小さくします</Term>。20手順のうち関係するのが3手順だと分かれば、調査範囲は劇的に狭まります。最終的に「この入力をこの関数に渡すと落ちる」まで縮められれば、それはそのままテストコードになります。
      </p>

      <Heading num="03">二分探索で範囲を半分に切る</Heading>
      <p>
        デバッグで最も効く発想が<Term>二分探索</Term>です。「怪しいところを探す」のではなく、<Term>問題の範囲を機械的に半分にする</Term>ことを繰り返します。
      </p>

      <DiagramFrame
        slug="dev-debug-bisect"
        aspect="640 / 290"
        caption="二分探索でデバッグの範囲を絞り込む様子。上段は処理の流れで、中間地点で値を確認し、そこまで正常なら探す範囲は後ろ半分に絞られる。これを繰り返すと1000行でも10回の確認で1行に到達する。下段は同じ考え方を時間軸に当てはめたもので、動いていたコミットと壊れているコミットの間を二分して、壊れ始めたコミットを特定する。"
      />

      <table>
        <thead>
          <tr>
            <th>切る対象</th>
            <th>やり方</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">時間(履歴)</td>
            <td>
              壊れ始めたコミットを二分探索で特定する(<Link href="/dev/git-ci">Git</Link>の<code>bisect</code>)
            </td>
          </tr>
          <tr>
            <td className="hl">コードの流れ</td>
            <td>処理の中間地点で値を確認し、正常なのはどこまでかを判定する</td>
          </tr>
          <tr>
            <td className="hl">入力データ</td>
            <td>データを半分に減らして再現するか試す。壊れる最小の入力まで縮める</td>
          </tr>
          <tr>
            <td className="hl">構成要素</td>
            <td>設定・プラグイン・依存を半分無効にして切り分ける</td>
          </tr>
          <tr>
            <td className="hl">環境</td>
            <td>手元で再現するか。しないなら差分(データ・設定・並行数)が原因</td>
          </tr>
        </tbody>
      </table>

      <p>
        1000行のコードでも、範囲を半分にする操作を10回行えば1行に到達します(<Link href="/theory/complexity">対数時間</Link>)。<Term>「どこが怪しいか」を考える前に、「どこまでは正常か」を確定させる</Term>ほうが速いのはこのためです。
      </p>

      <Heading num="04">スタックトレースを読む</Heading>
      <p>
        スタックトレースは「エラーが起きた瞬間の、関数呼び出しの積み重なり」です(<Link href="/language/js-engine">実行の仕組み</Link>)。読み方には順序があります。
      </p>

      <Steps>
        <li>例外の種類とメッセージを読む ― 何が起きたのか</li>
        <li>最上段を見る ― 実際に落ちた場所。ただしライブラリ内部のことも多い</li>
        <li>
          自分のコードの最初の行を探す ― ここが調査の起点。ライブラリは正しく、呼ばれ方が間違っていることが大半
        </li>
        <li>下へたどる ― 誰がその値を渡したのか、呼び出し元をさかのぼる</li>
        <li>原因例外を見る ― 包み直されている場合、根本原因は下にある</li>
      </Steps>

      <Aside label="スタックトレースを壊さない">
        例外を捕まえて独自のエラーを投げ直すとき、元の例外を捨てると<Term>原因の場所が永久に分からなくなります</Term>。必ず元のエラーを持たせるか、ログに元のスタックを残してください(<Link href="/design/errors">エラー設計</Link>)。非同期処理ではスタックが途切れやすい点にも注意します。
      </Aside>

      <Heading num="05">ログとデバッガの使い分け</Heading>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>ログ</th>
            <th>デバッガ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">向く場面</td>
            <td>本番・CI・並行処理・時間のかかる処理</td>
            <td>手元で再現する、複雑な状態を追う</td>
          </tr>
          <tr>
            <td className="hl">利点</td>
            <td>いつでも使える。履歴が残る</td>
            <td>全変数を見られる。ステップ実行できる</td>
          </tr>
          <tr>
            <td className="hl">欠点</td>
            <td>入れる場所を先に決める必要がある</td>
            <td>止めるとタイミングが変わり、再現しないことがある</td>
          </tr>
        </tbody>
      </table>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>条件付きブレークポイント</h4>
          <p>「idが42のときだけ止める」。ループの中を追うのに必須です。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>例外で止める</h4>
          <p>捕捉済み例外も含めて、投げられた瞬間に止める設定です。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ウォッチ式</h4>
          <p>特定の式を常時監視し、値の変化を追います。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>ログポイント</h4>
          <p>止めずに値だけ出力します。コードを書き換えずにログを足せます。</p>
        </Card>
      </CardGrid>

      <p>
        ログを入れる場合も、闇雲に増やさず<Term>二分探索の判定に必要な場所</Term>に置きます。「処理の中間地点で、期待した値になっているか」を確かめるのが目的です。
      </p>

      <Heading num="06">よくある思い込みと、その外し方</Heading>

      <table>
        <thead>
          <tr>
            <th>思い込み</th>
            <th>確認方法</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">「このコードは実行されているはず」</td>
            <td>ログを1行入れて確認する。実は通っていないことが非常に多い</td>
          </tr>
          <tr>
            <td className="hl">「この値は正しいはず」</td>
            <td>実際に出力する。型・null・空文字・前後の空白を疑う</td>
          </tr>
          <tr>
            <td className="hl">「修正が反映されているはず」</td>
            <td>ビルド・キャッシュ・再起動・デプロイ先を確認する</td>
          </tr>
          <tr>
            <td className="hl">「ライブラリのバグだ」</td>
            <td>ほぼ自分のコード。まず最小再現コードを書いてみる</td>
          </tr>
          <tr>
            <td className="hl">「環境は同じはず」</td>
            <td>バージョン・環境変数・タイムゾーン・データを実際に比較する</td>
          </tr>
        </tbody>
      </table>

      <p>
        デバッグが行き詰まる原因のほとんどは、<Term>検証していない前提を信じていること</Term>です。「はず」という言葉が出たら、それが次に確認すべき対象だと考えてください。
      </p>

      <Heading num="07">性能改善も、手順は同じ</Heading>
      <p>
        「遅い」も不具合の一種で、進め方は変わりません。違うのは、観察の道具が<Term>プロファイラ</Term>になることだけです。
      </p>

      <table>
        <thead>
          <tr>
            <th>手順</th>
            <th>性能改善での中身</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">再現させる</td>
            <td>どの操作が、どの条件で、どれくらい遅いのかを数字で確定させる</td>
          </tr>
          <tr>
            <td className="hl">観察する</td>
            <td>プロファイラや計測で、時間がどこに使われているかを分解する</td>
          </tr>
          <tr>
            <td className="hl">仮説を立てる</td>
            <td>「ここが支配的なら、この部分を削れば全体もこれだけ縮む」</td>
          </tr>
          <tr>
            <td className="hl">検証する</td>
            <td>1か所だけ直して測り直す。同時に2つ直すと効果が分からない</td>
          </tr>
        </tbody>
      </table>

      <p>
        ここでも<Term>推測で直さない</Term>のが要点です。<Link href="/language/compare">Web APIの応答時間の内訳</Link>で見たとおり、支配的でない部分をいくら速くしても全体はほとんど縮みません。まず測り、いちばん太い部分から手を付けます。同じ理由で、キャッシュも「遅いから足す」のではなく、<Term>測って、繰り返し同じ結果を返していると分かってから</Term>足すものです。
      </p>

      <Heading num="08">直したら終わりにしない</Heading>
      <p>
        原因が分かった時点で、次の3つをセットで行うと同じ不具合が二度と出ません。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>回帰テストを書く</h4>
          <p>
            最小再現をテストにします。修正前に書けば、失敗することを確認できます。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>同種の箇所を探す</h4>
          <p>同じ誤りは他にもあります。検索して横展開します。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>気付ける仕組みを足す</h4>
          <p>
            次に起きたら早く分かるよう、ログ・アラート・型・検証を追加します。
          </p>
        </Card>
      </CardGrid>

      <Aside label="それでも分からないとき">
        人(または物)に順を追って説明すると前提の矛盾に自分で気付きます。いったん離れるのも有効で、疲れているときの調査は精度が落ちます。「動いている状態」から壊れるまで少しずつ近づける逆方向の攻め方、動く環境と動かない環境の差分を1つずつ揃える方法もあります。そして<Term>試したことと結果をメモする</Term> ―
        同じ検証を繰り返さないためです。
      </Aside>

      <Heading num="まとめ">手順にすれば速くなる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>再現が最優先</h4>
          <p>
            再現できなければ、直ったことも確認できません。手順を最小化します。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>半分に切る</h4>
          <p>
            怪しい場所を探すより、正常な範囲を確定させるほうが速く進みます。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>「はず」を疑う</h4>
          <p>検証していない前提こそが、行き詰まりの原因です。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/dev/debug" />
    </DocsPage>
  );
}
