import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame, Steps,
} from "@/components/docs";

export const metadata: Metadata = { title: "Gitの仕組み" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>Gitの仕組み ― スナップショットと3つの領域</h1>
        <Lead>
          Gitのコマンドが覚えられないのは、暗記する量が多いからではなく、<Term>裏側のデータ構造を知らないまま操作を丸暗記している</Term>からです。コミットとは何か、ブランチとは何か ―
          この2つの正体が分かれば、多くの操作が「ポインタを動かしているだけ」だと見えてきます。
        </Lead>
      </Hero>

      <p>
        <Link href="/dev/git-ci">Git・CI/CD</Link>ではチームでの合流の設計を扱いました。ここはその土台 ―
        Gitが何を保存し、どう指し示しているのかを見ていきます。
      </p>

      <Heading num="01">差分ではなくスナップショットを保存する</Heading>
      <p>
        多くのバージョン管理システムは「前回からの変更点」を積み上げて履歴を作ります。Gitは違い、コミットのたびに<Term>その時点のファイル全体の状態</Term>を記録します。毎回全部コピーしているように見えますが、<Term>内容が同じファイルは同じ実体を指すだけ</Term>なので無駄がありません。
      </p>

      <DiagramFrame
        slug="dev-git-objects"
        aspect="640 / 300"
        caption="Gitのデータ構造。3つのコミットがそれぞれ1つ前を親として指し、履歴が鎖になっている。各コミットはその時点の全体を表すtreeを持ち、treeはファイルの中身であるblobを指す。変わっていないファイルは同じ実体を指すだけ。上のブランチ名は特定のコミットを指す付箋にすぎず、HEADはいまどこにいるかを指す。名前は中身のハッシュなので、1つ書き換えると以降のコミットのハッシュもすべて変わる。"
      />

      <table>
        <thead>
          <tr><th>オブジェクト</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">blob</td>
            <td>ファイルの中身そのもの。ファイル名は持たない</td>
          </tr>
          <tr>
            <td className="hl">tree</td>
            <td>ディレクトリ。ファイル名とblob・別のtreeの対応表</td>
          </tr>
          <tr>
            <td className="hl">commit</td>
            <td>ルートのtree + 親コミット + 作者・日時・メッセージ</td>
          </tr>
        </tbody>
      </table>

      <p>
        これらはすべて<Term>中身から計算したハッシュ値</Term>で名前が付きます。1バイトでも違えば別の名前になるため、同じハッシュなら中身も完全に同じだと保証できます。履歴の改ざんが検知できるのはこの仕組みのおかげです。
      </p>
      <p>
        親を指しているということは、<Term>コミットを1つ書き換えると、それ以降のコミットのハッシュもすべて変わる</Term>ということです。リベースや直前コミットの修正が「履歴を作り直す」操作であり、共有ブランチで危険なのはこのためです。
      </p>

      <Heading num="02">3つの領域 ― なぜ add が要るのか</Heading>
      <p>
        Gitには手元のファイルとコミットの間に<Term>ステージング</Term>という中間置き場があります。<Term>次のコミットに何を含めるかを組み立てる作業台</Term>だと理解すると腑に落ちます。
      </p>

      <table>
        <thead>
          <tr><th>領域</th><th>状態</th><th>次へ移す操作</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">作業ツリー</td>
            <td>いま編集しているファイル</td>
            <td>
              <code>add</code>でステージへ
            </td>
          </tr>
          <tr>
            <td className="hl">ステージ</td>
            <td>次のコミットに入れると決めた変更</td>
            <td>
              <code>commit</code>で履歴へ
            </td>
          </tr>
          <tr>
            <td className="hl">ローカルリポジトリ</td>
            <td>コミット済みの履歴(手元に完全なコピーがある)</td>
            <td>
              <code>push</code>でリモートへ
            </td>
          </tr>
          <tr>
            <td className="hl">リモートリポジトリ</td>
            <td>チームで共有する履歴</td>
            <td>
              <code>fetch</code>で手元へ
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        ステージがあるおかげで、1つのファイルの中の<Term>一部の変更だけ</Term>をコミットに含められます。「機能追加とデバッグ用の一時コードが混ざった」というとき、意味の単位に切り直す道具になります。
      </p>

      <Analogy label="💡 たとえるなら">
        作業ツリーは机の上、ステージは<strong>宅配便に入れる箱</strong>、コミットは箱を封して発送記録を残すことです。机の上のものを全部入れる必要はなく、今回送るものだけを箱に入れます。
      </Analogy>

      <Heading num="03">ブランチの正体はポインタ</Heading>
      <p>
        ブランチは、コピーでもフォルダでもありません。<Term>1つのコミットハッシュを書いたファイル</Term>にすぎません。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ブランチを作る</h4>
          <p>
            今のコミットを指す付箋を1枚増やすだけ。一瞬で終わり、容量もほぼ使いません。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>コミットする</h4>
          <p>新しいコミットを作り、いま指している付箋を1つ前へずらします。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>HEAD</h4>
          <p>
            いま自分がどのブランチにいるかを指す特別なポインタ。切り替え操作はこれを動かします。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>切り離されたHEAD</h4>
          <p>
            ブランチではなくコミットを直接指した状態。ここでのコミットはどの付箋からも辿れず、迷子になりやすい状態です。
          </p>
        </Card>
      </CardGrid>

      <p>
        「ブランチを削除したらコミットも消えるのでは」と不安になりますが、消えるのは付箋だけです。どこからも辿れなくなったコミットも、しばらくは<Link href="/dev/git-recovery">操作の記録から救出</Link>できます。
      </p>

      <Heading num="04">リモートとの同期</Heading>
      <p>
        Gitは分散型なので、手元にも完全な履歴があります。リモートの状態は<Term>リモート追跡ブランチ</Term>として手元に写し取られます。
      </p>

      <table>
        <thead>
          <tr><th>操作</th><th>すること</th><th>作業ツリーへの影響</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">
              <code>fetch</code>
            </td>
            <td>リモートの最新を取得し、追跡ブランチを更新する</td>
            <td>なし(安全)</td>
          </tr>
          <tr>
            <td className="hl">
              <code>pull</code>
            </td>
            <td>fetch + 現在のブランチへ取り込み</td>
            <td>あり。衝突が起きうる</td>
          </tr>
          <tr>
            <td className="hl">
              <code>push</code>
            </td>
            <td>手元のコミットをリモートへ送る</td>
            <td>リモートが進んでいると拒否される</td>
          </tr>
        </tbody>
      </table>

      <p>
        pushが拒否されるのは「リモートに自分が知らないコミットがある」ときです。正しい対処は強制ではなく、<Term>いったん取り込んでから送り直す</Term>ことです。
      </p>

      <Aside label="fast-forward という言葉">
        分岐がなく、単に相手が先に進んでいるだけの場合、Gitはポインタを前へずらすだけで合流を完了できます。これが<Term>fast-forward</Term>です。「マージコミットができるかどうか」の違いはここにあります。
      </Aside>

      <Heading num="05">履歴を読む道具</Heading>
      <p>
        Gitの価値は「戻せること」以上に<Term>なぜそうなったかを追えること</Term>にあります。調査でよく使うのは次の5つです。
      </p>

      <Steps>
        <li>
          <code>log --oneline --graph --all</code> ― 分岐と合流を含めた全体像を見る
        </li>
        <li>
          <code>show</code> ― そのコミットが何を変えたかを見る
        </li>
        <li>
          <code>blame</code> ― 各行が「いつ・誰の・どのコミットで」入ったかを見る
        </li>
        <li>
          <code>log -S</code> ― その文字列が増減したコミットを探す(消えたコードの捜索に強い)
        </li>
        <li>
          <code>log -- パス</code> ― 特定のファイルやディレクトリの履歴だけを追う
        </li>
      </Steps>

      <p>
        <code>blame</code>で出てくるのが「整形だけの巨大コミット」だと、調査はそこで行き止まりになります。整形と機能変更を別コミットにする理由は、レビューのためだけでなく<Term>将来の調査のため</Term>でもあります。
      </p>

      <Heading num="まとめ">全部ポインタの移動だと分かれば怖くない</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>コミット = スナップショット</h4>
          <p>
            中身のハッシュで名前が付き、親を指します。1つ書き換えれば以降すべてが別物になります。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ブランチ = 付箋</h4>
          <p>コミットを指すだけ。作るのも消すのも一瞬で、コードは移動しません。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ステージ = 作業台</h4>
          <p>
            次のコミットの中身を組み立てる場所。意味の単位に切り直すための機構です。
          </p>
        </Card>
      </CardGrid>

      <p>
        次は、この履歴が分岐したときに起きること ―
        <Link href="/dev/git-conflict">マージ・リベースとコンフリクト解決</Link>を見ていきます。
      </p>

      <DocsFooter href="/dev/git-basics" />
    </DocsPage>
  );
}
