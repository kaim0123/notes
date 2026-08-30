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
  title: "デバッグの技法",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; デバッグ</Eyebrow>
        <h1>デバッグの技法 ― 勘で直さない</h1>
        <Lead>
          バグ修正にかかる時間の大半は、直す作業ではなく<strong>原因を特定する作業</strong>です。そしてその時間は、才能ではなく手順で短縮できます。再現させ、範囲を半分に切り、仮説を1つずつ潰す ―
          この進め方を身に付けているかどうかで、同じ不具合にかける時間は何倍も変わります。
        </Lead>
      </Hero>

      <Heading num="01">デバッグは推測ではなく調査</Heading>
      <p>うまくいかないデバッグには共通の形があります ― <strong>「たぶんここだろう」と当たりを付けて修正し、動くかどうか試す</strong>やり方です。これは運が良ければ速いですが、外れると何も学べないまま時間だけが過ぎ、しかも<strong>直っていないのに直ったように見える</strong>ことがあります。</p>
      <Steps>
        <li><strong>再現させる</strong> ― 確実に起こせるようにする。これができなければ、直ったことも確認できない</li>
        <li><strong>観察する</strong> ― 実際に何が起きているかを事実として集める(ログ・値・状態)</li>
        <li><strong>仮説を立てる</strong> ― 「Xが原因なら、Yも起きているはず」と検証可能な形にする</li>
        <li><strong>検証する</strong> ― 仮説を1つだけ変えて確かめる。同時に2つ変えない</li>
        <li><strong>修正して確認する</strong> ― 再現手順で直ったことを確かめ、テストとして残す</li>
      </Steps>
      <Analogy label="💡 たとえるなら">
        医者が症状だけを見て薬を出すのではなく、検査で原因を特定してから治療するのと同じです。「とりあえず効きそうな薬を全部出す」やり方は、たまたま治っても<strong>何が効いたのか分からない</strong>ままです。
      </Analogy>

      <Heading num="02">まず再現させる ― 再現手順の作り方</Heading>
      <p>再現できない不具合は直せません。報告を受けたら、まず次を確定させます。</p>
      <table>
        <tbody>
          <tr><th>項目</th><th>確認すること</th></tr>
          <tr><td className="hl">環境</td><td>本番/ステージング/ローカル、ブラウザ、OS、バージョン</td></tr>
          <tr><td className="hl">操作手順</td><td>どの画面で、何を入力し、どの順に操作したか</td></tr>
          <tr><td className="hl">データ</td><td>どのアカウント・どのレコードで起きるか。他では起きないか</td></tr>
          <tr><td className="hl">頻度</td><td>毎回か、たまにか。たまになら<Link href="/dev/concurrency/race">並行処理</Link>や時刻を疑う</td></tr>
          <tr><td className="hl">期待と実際</td><td>「どうなるはずが、どうなったか」を分けて書く</td></tr>
          <tr><td className="hl">いつから</td><td>直前のリリース・設定変更・データ移行と対応していないか</td></tr>
        </tbody>
      </table>
      <p>次に、再現手順を<strong>できるだけ小さくします</strong>。20手順のうち関係するのが3手順だと分かれば、調査範囲は劇的に狭まります。最終的に「この入力をこの関数に渡すと落ちる」まで縮められれば、それはそのまま<Link href="/test/unit">テストコード</Link>になります。</p>

      <Heading num="03">二分探索で範囲を半分に切る</Heading>
      <p>デバッグで最も効く発想が<strong>二分探索</strong>です。「怪しいところを探す」のではなく、<strong>問題の範囲を機械的に半分にする</strong>ことを繰り返します。</p>
      <table>
        <tbody>
          <tr><th>切る対象</th><th>やり方</th></tr>
          <tr><td className="hl">時間(履歴)</td><td><code>git bisect</code> で「壊れ始めたコミット」を特定する(「<Link href="/dev/git/recovery">履歴のやり直しと復旧</Link>」)</td></tr>
          <tr><td className="hl">コードの流れ</td><td>処理の中間地点で値を確認し、正常なのはどこまでかを判定する</td></tr>
          <tr><td className="hl">入力データ</td><td>データを半分に減らして再現するか試す。壊れる最小の入力まで縮める</td></tr>
          <tr><td className="hl">構成要素</td><td>設定・プラグイン・依存を半分無効にして切り分ける</td></tr>
          <tr><td className="hl">環境</td><td>ローカルで再現するか。しないなら差分(データ・設定・並行数)が原因</td></tr>
        </tbody>
      </table>
      <p>1000行のコードでも、範囲を半分にする操作を10回行えば1行に到達します(<Link href="/theory/algorithms/complexity">O(log n)</Link>)。<strong>「どこが怪しいか」を考える前に、「どこまでは正常か」を確定させる</strong>ほうが速いのはこのためです。</p>

      <Heading num="04">スタックトレースを読む</Heading>
      <p>スタックトレースは「エラーが起きた瞬間の、関数呼び出しの積み重なり」です(「<Link href="/computer/memory/stack">スタックと関数呼び出し</Link>」)。読み方には順序があります。</p>
      <Steps>
        <li><strong>例外の種類とメッセージを読む</strong> ― 何が起きたのか(nullアクセス、型不一致、接続失敗)</li>
        <li><strong>最上段を見る</strong> ― 実際に落ちた場所。ただしライブラリ内部のことも多い</li>
        <li><strong>自分のコードの最初の行を探す</strong> ― <strong>ここが調査の起点</strong>。ライブラリは正しく呼ばれ方が間違っていることが大半</li>
        <li><strong>下へたどる</strong> ― 誰がその値を渡したのか、呼び出し元をさかのぼる</li>
        <li><strong>原因例外(caused by)を見る</strong> ― 包み直されている場合、根本原因は下にある</li>
      </Steps>
      <Aside label="スタックトレースを壊さない">
        <code>catch</code> して独自のエラーを投げ直すとき、元の例外を捨てると<strong>原因の場所が永久に分からなくなります</strong>。必ず <code>cause</code> に元のエラーを持たせるか、ログに元のスタックを残してください(「<Link href="/design/errors">エラー設計</Link>」)。非同期処理ではスタックが途切れやすい点にも注意します。
      </Aside>

      <Heading num="05">ログとデバッガの使い分け</Heading>
      <table>
        <tbody>
          <tr><th></th><th>ログ(print)</th><th>デバッガ</th></tr>
          <tr><td className="hl">向く場面</td><td>本番・CI・並行処理・時間のかかる処理</td><td>手元で再現する、複雑な状態を追う</td></tr>
          <tr><td className="hl">利点</td><td>いつでも使える。履歴が残る</td><td>全変数を見られる。ステップ実行できる</td></tr>
          <tr><td className="hl">欠点</td><td>入れる場所を先に決める必要がある</td><td>止めると<strong>タイミングが変わり</strong>再現しないことがある</td></tr>
        </tbody>
      </table>
      <p>デバッガで使える道具も知っておくと効率が変わります。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>条件付きブレークポイント</h4><p>「id が 42 のときだけ止める」。ループの中を追うのに必須。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>例外で止める</h4><p>捕捉済み例外も含めて、投げられた瞬間に止める設定。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ウォッチ式</h4><p>特定の式を常時監視し、値の変化を追う。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>ログポイント</h4><p>止めずに値だけ出力する。コードを書き換えずにログを足せる。</p></Card>
      </CardGrid>
      <p>ログを入れる場合も、闇雲に増やさず<strong>二分探索の判定に必要な場所</strong>に置きます。「処理の中間地点で、期待した値になっているか」を確かめるのが目的です。</p>

      <Heading num="06">よくある思い込みと、その外し方</Heading>
      <table>
        <tbody>
          <tr><th>思い込み</th><th>確認方法</th></tr>
          <tr><td className="hl">「このコードは実行されているはず」</td><td>ログを1行入れて確認する。実は通っていないことが非常に多い</td></tr>
          <tr><td className="hl">「この値は正しいはず」</td><td>実際に出力する。型・null・空文字・前後の空白を疑う</td></tr>
          <tr><td className="hl">「修正が反映されているはず」</td><td>ビルド・キャッシュ・再起動・デプロイ先を確認する</td></tr>
          <tr><td className="hl">「ライブラリのバグだ」</td><td>ほぼ自分のコード。まず最小再現コードを書いてみる</td></tr>
          <tr><td className="hl">「環境は同じはず」</td><td>バージョン・環境変数・タイムゾーン・データを実際に比較する</td></tr>
        </tbody>
      </table>
      <p>デバッグが行き詰まる原因のほとんどは、<strong>検証していない前提を信じていること</strong>です。「はず」という言葉が出たら、それが次に確認すべき対象だと考えてください。</p>

      <Heading num="07">それでも分からないとき</Heading>
      <Steps>
        <li><strong>説明してみる</strong> ― 人(または物)に順を追って説明すると、前提の矛盾に自分で気付く(ラバーダック・デバッグ)</li>
        <li><strong>いったん離れる</strong> ― 疲れているときの調査は精度が落ちる。翌朝5分で解けることは珍しくない</li>
        <li><strong>逆から攻める</strong> ― 「動いている状態」から、壊れるまで少しずつ近づける</li>
        <li><strong>差分を疑う</strong> ― 動く環境と動かない環境の違いを列挙し、1つずつ揃える</li>
        <li><strong>記録を残す</strong> ― 試したことと結果をメモする。同じ検証を繰り返さないため</li>
      </Steps>

      <Heading num="08">直したら終わりにしない</Heading>
      <p>原因が分かった時点で、次の3つをセットで行うと同じ不具合が二度と出ません。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>回帰テストを書く</h4><p>最小再現をテストにする。修正前に書けば、失敗することを確認できる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>同種の箇所を探す</h4><p>同じ誤りは他にもある。検索して横展開する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>気付ける仕組みを足す</h4><p>次に起きたら早く分かるよう、ログ・アラート・型・検証を追加する。</p></Card>
      </CardGrid>
      <p>本番で起きた障害の場合は、これに<Link href="/infra/monitoring/incident">振り返り(ポストモーテム)</Link>が加わります ― 個人の不注意ではなく、<strong>仕組みとして防げなかった理由</strong>を扱うのが要点です。</p>

      <Heading num="まとめ">手順にすれば速くなる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>再現が最優先</h4><p>再現できなければ、直ったことも確認できない。手順を最小化する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>半分に切る</h4><p>怪しい場所を探すより、正常な範囲を確定させるほうが速い。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>「はず」を疑う</h4><p>検証していない前提こそが、行き詰まりの原因。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/debug/profiling" tag="実装">プロファイリング</RelatedLink>
            <RelatedLink href="/design/errors" tag="設計">エラー設計</RelatedLink>
            <RelatedLink href="/dev/git/recovery" tag="実装">履歴のやり直しと復旧</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
