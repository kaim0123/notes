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
  Diagram,
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Gitの仕組み",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; Git</Eyebrow>
        <h1>Gitの仕組み ― スナップショットと3つの領域</h1>
        <Lead>
          Gitのコマンドが覚えられないのは、暗記する量が多いからではなく、<strong>裏側のデータ構造を知らないまま操作を丸暗記している</strong>からです。コミットとは何か、ブランチとは何か ―
          この2つの正体が分かれば、<code>reset</code> も <code>rebase</code> も「ポインタを動かしているだけ」だと見えてきます。
        </Lead>
      </Hero>

      <p>「<Link href="/dev/git">Gitとブランチ戦略</Link>」ではチームでの合流の設計を扱いました。このページはその土台 ― Gitが何を保存し、どう指し示しているのかを見ていきます。</p>

      <Heading num="01">Gitは差分ではなくスナップショットを保存する</Heading>
      <p>多くのバージョン管理システムは「前回からの変更点(差分)」を積み上げて履歴を作ります。Gitは違います。コミットのたびに<strong>その時点のファイル全体の状態(スナップショット)</strong>を記録します。</p>
      <p>「毎回全ファイルをコピーしたら容量が爆発するのでは」と思うかもしれませんが、Gitは<strong>内容が同じファイルは同じ実体を指すだけ</strong>で済ませます。変わっていないファイルは前回のものへの参照になるため、無駄がありません。</p>
      <table>
        <tbody>
          <tr><th>オブジェクト</th><th>役割</th></tr>
          <tr><td className="hl">blob</td><td>ファイルの中身そのもの。ファイル名は持たない</td></tr>
          <tr><td className="hl">tree</td><td>ディレクトリ。ファイル名と blob / 別の tree の対応表</td></tr>
          <tr><td className="hl">commit</td><td>ルートの tree + 親コミット + 作者・日時・メッセージ</td></tr>
          <tr><td className="hl">tag(注釈付き)</td><td>特定のコミットに付ける、メッセージ付きの印</td></tr>
        </tbody>
      </table>
      <p>これらはすべて<strong>中身から計算したハッシュ値(SHA-1 / SHA-256)</strong>で名前が付きます。中身が1バイトでも違えば別の名前になるため、同じハッシュなら中身も完全に同じだと保証できます。履歴の改ざんが検知できるのはこの仕組みのおかげです。</p>

      <Heading num="02">コミットは親を指す ― 履歴は鎖になる</Heading>
      <p>各コミットは<strong>親コミットのハッシュ</strong>を持っています。したがって履歴は「新しいものから古いものへ」たどれる鎖(有向グラフ)になります。マージコミットだけは親を2つ持ちます。</p>
      <Diagram caption="コミットは親を指す。ブランチ名はコミットを指す付箋にすぎない">
        <svg viewBox="0 0 420 160" xmlns="http://www.w3.org/2000/svg">
          <circle cx={60} cy={80} r={18} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={60} y={85} fill="#f2f2f2" fontSize="11" textAnchor="middle">A</text>
          <circle cx={150} cy={80} r={18} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={150} y={85} fill="#f2f2f2" fontSize="11" textAnchor="middle">B</text>
          <circle cx={240} cy={80} r={18} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={240} y={85} fill="#f2f2f2" fontSize="11" textAnchor="middle">C</text>
          <line x1={132} y1={80} x2={78} y2={80} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={222} y1={80} x2={168} y2={80} stroke="#5f5f5f" strokeWidth="1.5" />
          <rect x={200} y={20} width={80} height={26} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={240} y={38} fill="#39ff6a" fontSize="12" textAnchor="middle">main</text>
          <line x1={240} y1={46} x2={240} y2={62} stroke="#39ff6a" strokeWidth="1.5" />
          <rect x={300} y={110} width={90} height={26} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={345} y={128} fill="#9a9a9a" fontSize="12" textAnchor="middle">HEAD → main</text>
          <line x1={300} y1={120} x2={262} y2={92} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 4" />
          <text x={20} y={145} fill="#9a9a9a" fontSize="11">古い</text>
          <text x={250} y={145} fill="#9a9a9a" fontSize="11">新しい</text>
        </svg>
      </Diagram>
      <p>親を指しているということは、<strong>コミットを1つ書き換えると、それ以降のコミットのハッシュもすべて変わる</strong>ということです。<code>rebase</code> や <code>commit --amend</code> が「履歴を作り直す」操作であり、共有ブランチで危険なのはこのためです。</p>

      <Heading num="03">3つの領域 ― なぜ <code>add</code> が要るのか</Heading>
      <p>Gitには手元のファイルとコミットの間に<Term>ステージングエリア(インデックス)</Term>という中間置き場があります。ここが他のツールと違って戸惑うところですが、<strong>「次のコミットに何を含めるかを組み立てる作業台」</strong>だと理解すると腑に落ちます。</p>
      <table>
        <tbody>
          <tr><th>領域</th><th>状態</th><th>移す操作</th></tr>
          <tr><td className="hl">作業ツリー</td><td>いま編集しているファイル</td><td><code>git add</code> でステージへ</td></tr>
          <tr><td className="hl">ステージ</td><td>次のコミットに入れると決めた変更</td><td><code>git commit</code> でリポジトリへ</td></tr>
          <tr><td className="hl">ローカルリポジトリ</td><td>コミット済みの履歴(手元に完全なコピーがある)</td><td><code>git push</code> でリモートへ</td></tr>
          <tr><td className="hl">リモートリポジトリ</td><td>チームで共有する履歴</td><td><code>git fetch</code> で手元へ</td></tr>
        </tbody>
      </table>
      <p>ステージがあるおかげで、1つのファイルの中の<strong>一部の変更だけ</strong>をコミットに含める(<code>git add -p</code>)といった芸当ができます。「機能追加とデバッグ用の一時コードが混ざってしまった」というとき、意味の単位に切り直す道具になります。</p>
      <Analogy label="💡 たとえるなら">
        作業ツリーは机の上、ステージは<strong>宅配便に入れる箱</strong>、コミットは箱を封して発送記録を残すことです。机の上のものを全部入れる必要はなく、今回送るものだけを箱に入れます。
      </Analogy>

      <Heading num="04">ブランチの正体は「ポインタ」</Heading>
      <p>ブランチは、コピーでもフォルダでもありません。<strong>1つのコミットハッシュを書いたファイル</strong>にすぎません(<code>.git/refs/heads/main</code> の中身は41バイト程度)。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ブランチを作る</h4>
          <p>今のコミットを指す付箋を1枚増やすだけ。一瞬で終わり、容量もほぼ使わない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>コミットする</h4>
          <p>新しいコミットを作り、いま指している付箋を1つ前へずらす。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>HEAD</h4>
          <p>「いま自分がどのブランチにいるか」を指す特別なポインタ。<code>checkout</code> / <code>switch</code> はこれを動かす操作。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>detached HEAD</h4>
          <p>ブランチではなくコミットを直接指した状態。ここでのコミットはどの付箋からも辿れず、迷子になりやすい。</p>
        </Card>
      </CardGrid>
      <p>「ブランチを削除したらコミットも消えるのでは」と不安になりますが、消えるのは付箋だけです。他から辿れるコミットは残ります(逆に、どこからも辿れなくなったコミットは、しばらく後にGCで回収されます ― それまでは <Link href="/dev/git/recovery"><code>reflog</code></Link> から救出できます)。</p>

      <Heading num="05">リモートとの同期 ― fetch と pull の違い</Heading>
      <p>Gitは分散型なので、手元にも完全な履歴があります。リモートの状態は <code>origin/main</code> という<Term>リモート追跡ブランチ</Term>として手元に写し取られます。</p>
      <table>
        <tbody>
          <tr><th>コマンド</th><th>すること</th><th>作業ツリーへの影響</th></tr>
          <tr><td className="hl"><code>git fetch</code></td><td>リモートの最新を取得し、<code>origin/main</code> を更新する</td><td>なし(安全)</td></tr>
          <tr><td className="hl"><code>git pull</code></td><td>fetch + 現在のブランチへマージ(または rebase)</td><td>あり。コンフリクトが起きうる</td></tr>
          <tr><td className="hl"><code>git push</code></td><td>手元のコミットをリモートへ送る</td><td>リモートが進んでいると拒否される</td></tr>
        </tbody>
      </table>
      <p>push が拒否されるのは「リモートに自分が知らないコミットがある」ときです。正しい対処は <code>--force</code> ではなく、いったん取り込んでから送り直すことです。<code>git pull --rebase</code> にしておくと、余計なマージコミットが積まれず履歴が読みやすくなります。</p>
      <Aside label="fast-forward という言葉">
        分岐がなく、単に相手が先に進んでいるだけの場合、Gitはポインタを前へずらすだけでマージを完了できます。これが<strong>fast-forward</strong>です。「マージコミットができるかどうか」の違いはここにあります。
      </Aside>

      <Heading num="06">追跡されるファイル・されないファイル</Heading>
      <p><code>.gitignore</code> は「まだ追跡していないファイル」を無視するための設定です。すでにコミットしてしまったファイルは、後から <code>.gitignore</code> に書いても追跡され続けます ― <code>git rm --cached</code> で追跡を外す必要があります。</p>
      <p>秘密情報を誤ってコミットした場合、追跡を外しても<strong>履歴の中には残り続けます</strong>。対応の優先順位は「履歴の消去」ではなく<strong>鍵の無効化と再発行</strong>です(「<Link href="/dev/dotenv">.envと.gitignore</Link>」参照)。</p>

      <Heading num="07">履歴を読む道具</Heading>
      <p>Gitの価値は「戻せること」以上に「<strong>なぜそうなったかを追えること</strong>」にあります。調査でよく使うのは次の5つです。</p>
      <Steps>
        <li><code>git log --oneline --graph --all</code> ― 分岐と合流を含めた全体像を見る</li>
        <li><code>git show &lt;commit&gt;</code> ― そのコミットが何を変えたかを見る</li>
        <li><code>git blame &lt;file&gt;</code> ― 各行が「いつ・誰の・どのコミットで」入ったかを見る</li>
        <li><code>git log -S &quot;関数名&quot;</code> ― その文字列が増減したコミットを探す(消えたコードの捜索に強い)</li>
        <li><code>git log -- &lt;path&gt;</code> ― 特定ファイル・ディレクトリの履歴だけを追う</li>
      </Steps>
      <p><code>blame</code> で出てくるのが「整形だけの巨大コミット」だと、調査はそこで行き止まりになります。整形と機能変更を別コミットにする理由は、レビューのためだけでなく<strong>将来の調査のため</strong>でもあります。</p>

      <Heading num="まとめ">全部ポインタの移動だと分かれば怖くない</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>コミット=スナップショット</h4><p>中身のハッシュで名前が付き、親を指す。1つ書き換えれば以降すべてが別物になる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ブランチ=付箋</h4><p>コミットを指すだけ。作るのも消すのも一瞬で、コードは移動しない。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ステージ=作業台</h4><p>次のコミットの中身を組み立てる場所。意味の単位に切り直すための機構。</p></Card>
      </CardGrid>
      <p>次は、この履歴が分岐したときに起きること ― マージ・リベースとコンフリクトの解決を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/git/conflict" tag="実装">マージ・リベースとコンフリクト解決</RelatedLink>
            <RelatedLink href="/dev/git" tag="実装">Gitとブランチ戦略</RelatedLink>
            <RelatedLink href="/dev/sdlc/management/config" tag="開発工程">構成管理</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
