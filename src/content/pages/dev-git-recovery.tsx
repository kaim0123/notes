import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame, Steps,
} from "@/components/docs";

export const metadata: Metadata = { title: "履歴のやり直しと復旧" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>履歴のやり直しと復旧 ― 消したつもりでも残っている</h1>
        <Lead>
          間違ったコミットをした、mainに直接コミットしてしまった、リセットして作業が消えた ―
          Gitでの「やらかし」は、ほとんどの場合<Term>元に戻せます</Term>。コミットは削除されず、しばらくは参照が残るからです。ここでは状況別に、どの操作を使うのが正しいかを整理します。
        </Lead>
      </Hero>

      <p>
        前提として押さえておきたいのは、<Link href="/dev/git-basics">Gitの仕組み</Link>で見た2点です ―
        <Term>コミットは中身のハッシュで名前が付く</Term>こと、<Term>ブランチはただのポインタ</Term>であること。やり直し系の操作は、この2つを動かしているだけです。
      </p>

      <Heading num="01">最初の分岐 ― 公開済みかどうか</Heading>
      <p>どの操作を使うかは、この一点でほぼ決まります。</p>

      <DiagramFrame
        slug="dev-git-recovery-decision"
        aspect="640 / 290"
        caption="やり直しの方法を選ぶ判断の分かれ道。最初の問いは「その変更をすでに共有したか」。まだ手元だけなら履歴を作り直してよく、直前の修正・まとめ直し・順序の整理をそれぞれの操作で行う。すでに共有しているなら作り直さず、逆の変更を積んで打ち消す。消えたように見える作業は移動の記録から救出できる。共通する原則は「不安なら、まずコミットする」。"
      />

      <p>
        共有済みの履歴を書き換えると、他の人の手元と食い違い、全員が復旧作業に巻き込まれます。<Term>自分のブランチなら自由、mainは絶対に書き換えない</Term>を境界にしておくと事故が起きません。
      </p>

      <Heading num="02">直前のコミットを直す</Heading>
      <p>
        メッセージの誤字、ファイルの入れ忘れ、余計なデバッグコード ―
        直前のコミットの修正は<code>--amend</code>で行います。
      </p>

      <pre>
        <code>{`git add forgotten-file.ts
git commit --amend --no-edit   # 直前のコミットに含めて作り直す`}</code>
      </pre>

      <p>
        これは「修正」ではなく<Term>新しいコミットを作って付箋を移す</Term>操作です。元のコミットは残りますが、どこからも辿れなくなります。
      </p>

      <Heading num="03">コミットを取り消す ― resetの3つのモード</Heading>
      <p>
        <code>reset</code>はブランチのポインタを指定のコミットへ動かします。<Term>作業ツリーとステージをどう扱うか</Term>でモードが3つあります。
      </p>

      <table>
        <thead>
          <tr><th>モード</th><th>履歴</th><th>ステージ</th><th>手元のファイル</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl"><code>--soft</code></td>
            <td>戻る</td>
            <td>そのまま残る</td>
            <td>そのまま残る</td>
          </tr>
          <tr>
            <td className="hl"><code>--mixed</code>(既定)</td>
            <td>戻る</td>
            <td>クリアされる</td>
            <td>そのまま残る</td>
          </tr>
          <tr>
            <td className="hl"><code>--hard</code></td>
            <td>戻る</td>
            <td>クリアされる</td>
            <td>変更が消える</td>
          </tr>
        </tbody>
      </table>

      <pre>
        <code>{`# 直近3コミットを1つにまとめ直したい
git reset --soft HEAD~3
git commit -m "feat: 注文キャンセル機能を追加"`}</code>
      </pre>

      <Aside label="hard reset で消えるもの">
        <code>--hard</code>で失われるのは<Term>コミットしていない変更だけ</Term>です。コミット済みのものは移動の記録から戻せます。逆に言えば、コミットさえしておけばほぼ何でも救えます ―
        <Term>不安な作業の前にコミットする</Term>のが最良の保険です。
      </Aside>

      <Heading num="04">公開済みを打ち消す ― revert</Heading>
      <p>
        <code>revert</code>は履歴を消さず、<Term>逆の変更を行う新しいコミットを積みます</Term>。共有ブランチで唯一安全なやり直しです。
      </p>
      <p>
        本番障害時に<Term>まず戻す</Term>を選べるかどうかは、リリース単位が小さいかどうかで決まります。<Link href="/dev/git-ci">スカッシュマージ</Link>で1つの変更が1コミットになっていれば、1回の打ち消しで機能ごと戻せます ―
        これがスカッシュを勧める実務上の最大の理由です。
      </p>

      <Heading num="05">コミットを整える ― 対話的な積み直し</Heading>

      <table>
        <thead>
          <tr><th>指定</th><th>効果</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">reword</td>
            <td>メッセージだけ書き直す</td>
          </tr>
          <tr>
            <td className="hl">squash / fixup</td>
            <td>前のコミットに統合する(fixupはメッセージを捨てる)</td>
          </tr>
          <tr>
            <td className="hl">edit</td>
            <td>その時点で止めて内容を修正する</td>
          </tr>
          <tr>
            <td className="hl">drop</td>
            <td>そのコミットを取り除く</td>
          </tr>
          <tr>
            <td className="hl">並び替え</td>
            <td>行の順序を入れ替えるとコミット順が変わる</td>
          </tr>
        </tbody>
      </table>

      <p>
        ただし、最終的にスカッシュするなら手元のコミットは1つに潰れます。<Term>過度に整える必要はありません</Term> ―
        レビュー中に「コミット単位で読んでほしい」場合にだけ手をかければ十分です。
      </p>

      <Heading num="06">作業を一時退避する</Heading>
      <p>
        「作業途中だが、急ぎの修正を別ブランチでやりたい」ときの選択肢は2つです。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>退避(stash)</h4>
          <p>
            変更を退避して作業ツリーをきれいにします。手軽ですが、溜め込むと中身が分からなくなります。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>作業ツリーの追加</h4>
          <p>
            同じリポジトリの別ブランチを別ディレクトリに同時に展開します。切り替えずに済むため、依存の再インストールも不要です。
          </p>
        </Card>
      </CardGrid>

      <p>
        頻繁に割り込みが入る環境では後者のほうが事故が少なく快適です。退避は「数分で戻す」用途に限定するのが安全です。
      </p>

      <Heading num="07">最後の砦 ― 移動の記録</Heading>
      <p>
        <Term>reflog</Term>は、HEADやブランチが<Term>どのコミットを指していたかの移動履歴</Term>です。リセットや積み直しで「消えた」ように見えるコミットは、ここから探して復旧できます。
      </p>

      <Steps>
        <li>移動履歴を一覧する</li>
        <li>作業が残っていた時点のコミットを特定する</li>
        <li>そこへブランチを生やして救出する</li>
      </Steps>

      <Analogy label="💡 たとえるなら">
        これは「ゴミ箱」ではなく<strong>防犯カメラの録画</strong>です。ファイルを保管しているのではなく、「あなたがどこにいたか」を記録しています。だから位置さえ分かれば、そこにあった状態を取り戻せます。
      </Analogy>

      <p>
        ただし記録はローカル限定で、既定では数か月で消えます。他人の環境や、取得し直したリポジトリには存在しません。
      </p>

      <Heading num="08">原因のコミットを探す ― 二分探索</Heading>
      <p>
        「いつからか壊れているが、どの変更が原因か分からない」ときは、動いていたコミットと壊れているコミットを指定して<Term>二分探索</Term>させるのが最短です。1000コミットあっても10回程度の判定で原因にたどり着けます(<Link href="/dev/debug">デバッグと性能改善</Link>)。
      </p>
      <p>
        これが機能するのは<Term>各コミットが単体で動く状態</Term>になっている場合だけです ―
        「意味の単位でコミットする」規律は、ここで効いてきます。
      </p>

      <Heading num="まとめ">状況別の早見表</Heading>

      <table>
        <thead>
          <tr><th>やりたいこと</th><th>操作</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">直前のコミットに修正を含めたい</td>
            <td><code>commit --amend</code></td>
          </tr>
          <tr>
            <td className="hl">コミットを取り消し、変更は手元に残したい</td>
            <td><code>reset --soft HEAD~1</code></td>
          </tr>
          <tr>
            <td className="hl">手元の変更を全部捨てたい</td>
            <td><code>restore</code> / <code>reset --hard</code></td>
          </tr>
          <tr>
            <td className="hl">公開済みの変更を取り消したい</td>
            <td><code>revert</code></td>
          </tr>
          <tr>
            <td className="hl">他ブランチの1コミットだけ欲しい</td>
            <td><code>cherry-pick</code></td>
          </tr>
          <tr>
            <td className="hl">消えた作業を探したい</td>
            <td><code>reflog</code></td>
          </tr>
          <tr>
            <td className="hl">壊れ始めた変更を特定したい</td>
            <td><code>bisect</code></td>
          </tr>
        </tbody>
      </table>

      <p>
        共通する原則は1つ ― <Term>不安なら、まずコミットする</Term>。コミットさえされていれば、Gitはほぼすべてを取り戻せます。
      </p>

      <DocsFooter href="/dev/git-recovery" />
    </DocsPage>
  );
}
