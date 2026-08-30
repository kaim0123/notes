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
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "履歴のやり直しと復旧",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; Git</Eyebrow>
        <h1>履歴のやり直しと復旧 ― 消したつもりでも残っている</h1>
        <Lead>
          間違ったコミットをした、mainに直接コミットしてしまった、リセットして作業が消えた ―
          Gitでの「やらかし」は、ほとんどの場合<strong>元に戻せます</strong>。コミットは削除されず、しばらくは参照が残るからです。ここでは状況別に、どのコマンドを使うのが正しいかを整理します。
        </Lead>
      </Hero>

      <p>前提として押さえておきたいのは、「<Link href="/dev/git/basics">Gitの仕組み</Link>」で見た2点です ― <strong>コミットは中身のハッシュで名前が付く</strong>こと、<strong>ブランチはただのポインタ</strong>であること。やり直し系のコマンドは、この2つを操作しているだけです。</p>

      <Heading num="01">最初の分岐 ― 公開済みかどうか</Heading>
      <p>どのコマンドを使うかは、この一点でほぼ決まります。</p>
      <table>
        <tbody>
          <tr><th>状況</th><th>方針</th><th>使うもの</th></tr>
          <tr><td className="hl">まだ手元だけ(push していない)</td><td>履歴を作り直してよい</td><td><code>amend</code> / <code>reset</code> / <code>rebase -i</code></td></tr>
          <tr><td className="hl">共有済み(push した・他の人が取得した)</td><td><strong>作り直さない</strong>。打ち消す変更を積む</td><td><code>revert</code></td></tr>
        </tbody>
      </table>
      <p>共有済みの履歴を書き換えると、他の人の手元と食い違い、全員が復旧作業に巻き込まれます。「自分のブランチなら自由、mainは絶対に書き換えない」を境界にしておくと事故が起きません。</p>

      <Heading num="02">直前のコミットを直す ― amend</Heading>
      <p>メッセージの誤字、ファイルの入れ忘れ、余計なデバッグコード ― 直前のコミットの修正は <code>--amend</code> で行います。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`git add forgotten-file.ts
git commit --amend --no-edit      # 直前のコミットに含めて作り直す(メッセージは据え置き)`}</code>
      </pre>
      <p>これは「修正」ではなく<strong>新しいコミットを作って付箋を移す</strong>操作です。元のコミットは残りますが、どこからも辿れなくなります(後述の <code>reflog</code> からは辿れます)。</p>

      <Heading num="03">コミットを取り消す ― reset の3つのモード</Heading>
      <p><code>reset</code> はブランチのポインタを指定のコミットへ動かします。<strong>作業ツリーとステージをどう扱うか</strong>でモードが3つあります。</p>
      <table>
        <tbody>
          <tr><th>モード</th><th>履歴</th><th>ステージ</th><th>作業ツリー(手元のファイル)</th></tr>
          <tr><td className="hl"><code>--soft</code></td><td>戻る</td><td>そのまま残る</td><td>そのまま残る</td></tr>
          <tr><td className="hl"><code>--mixed</code>(既定)</td><td>戻る</td><td>クリアされる</td><td>そのまま残る</td></tr>
          <tr><td className="hl"><code>--hard</code></td><td>戻る</td><td>クリアされる</td><td><strong>変更が消える</strong></td></tr>
        </tbody>
      </table>
      <p>「コミットは取り消したいが、変更内容は手元に残したい」なら <code>--soft</code>。コミットをまとめ直すときの定番です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`# 直近3コミットを1つにまとめ直したい
git reset --soft HEAD~3
git commit -m "feat: 注文キャンセル機能を追加"`}</code>
      </pre>
      <Aside label="⚠️ hard reset で消えるもの">
        <code>--hard</code> で失われるのは<strong>コミットしていない変更だけ</strong>です。コミット済みのものは <code>reflog</code> から戻せます。逆に言えば、コミットさえしておけばほぼ何でも救えます ― <strong>不安な作業の前にコミットする</strong>のが最良の保険です。
      </Aside>

      <Heading num="04">公開済みを打ち消す ― revert</Heading>
      <p><code>revert</code> は履歴を消さず、<strong>逆の変更を行う新しいコミットを積みます</strong>。共有ブランチで唯一安全なやり直しです。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`git revert <commit>              # 1コミットを打ち消す
git revert -m 1 <merge-commit>   # マージコミットを打ち消す(-m 1 = mainの側を残す)`}</code>
      </pre>
      <p>本番障害時に<strong>「まず戻す」</strong>を選べるかどうかは、リリース単位が小さいかどうかで決まります。スカッシュマージでPRが1コミットになっていれば、revert 1回で機能ごと戻せます ― これがスカッシュを勧める実務上の最大の理由です。</p>

      <Heading num="05">コミットを整える ― 対話的リベース</Heading>
      <p>PRを出す前に、手元のコミットを意味の単位に整えるのが <code>git rebase -i</code> です。</p>
      <table>
        <tbody>
          <tr><th>指定</th><th>効果</th></tr>
          <tr><td className="hl"><code>reword</code></td><td>メッセージだけ書き直す</td></tr>
          <tr><td className="hl"><code>squash</code> / <code>fixup</code></td><td>前のコミットに統合する(fixupはメッセージを捨てる)</td></tr>
          <tr><td className="hl"><code>edit</code></td><td>その時点で止めて内容を修正する</td></tr>
          <tr><td className="hl"><code>drop</code></td><td>そのコミットを取り除く</td></tr>
          <tr><td className="hl">並び替え</td><td>行の順序を入れ替えるとコミット順が変わる</td></tr>
        </tbody>
      </table>
      <p>ただし、PRをスカッシュマージするなら手元のコミットは最終的に1つに潰れます。<strong>過度に整える必要はありません</strong> ― レビュー中に「コミット単位で読んでほしい」場合にだけ手をかければ十分です。</p>

      <Heading num="06">作業を一時退避する ― stash と worktree</Heading>
      <p>「作業途中だが、急ぎの修正を別ブランチでやりたい」ときの選択肢は2つです。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4><code>git stash</code></h4>
          <p>変更を退避して作業ツリーをきれいにする。<code>stash pop</code> で戻す。手軽だが、溜め込むと中身が分からなくなる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4><code>git worktree</code></h4>
          <p>同じリポジトリの<strong>別ブランチを別ディレクトリに同時に展開</strong>する。切り替えずに済むため、依存の再インストールも不要。</p>
        </Card>
      </CardGrid>
      <p>頻繁に割り込みが入る環境では、worktree のほうが事故が少なく快適です。stash は「数分で戻す」用途に限定するのが安全です。</p>

      <Heading num="07">最後の砦 ― reflog</Heading>
      <p><Term>reflog</Term>は、HEAD やブランチが<strong>どのコミットを指していたかの移動履歴</strong>です。リセットやリベースで「消えた」ように見えるコミットは、ここから探して復旧できます。</p>
      <Steps>
        <li><code>git reflog</code> で、直前までの移動履歴を一覧する</li>
        <li>作業が残っていた時点のコミット(<code>HEAD@&#123;3&#125;</code> など)を特定する</li>
        <li><code>git branch rescue HEAD@&#123;3&#125;</code> のように、そこへブランチを生やして救出する</li>
      </Steps>
      <Analogy label="💡 たとえるなら">
        reflog は「ゴミ箱」ではなく<strong>防犯カメラの録画</strong>です。ファイルを保管しているのではなく、「あなたがどこにいたか」を記録しています。だから位置さえ分かれば、そこにあった状態を取り戻せます。
      </Analogy>
      <p>ただし reflog はローカル限定で、既定では90日ほどで消えます。他人の環境や、cloneし直したリポジトリには存在しません。</p>

      <Heading num="08">原因のコミットを探す ― bisect</Heading>
      <p>「いつからか壊れているが、どの変更が原因か分からない」ときは <code>git bisect</code> が最短です。動いていたコミットと壊れているコミットを指定すると、Gitが二分探索で候補を絞り込みます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`git bisect start
git bisect bad                    # いまは壊れている
git bisect good v1.4.0            # このタグでは動いていた
# 以後、提示されたコミットを確認して good / bad を answer する
git bisect run npm test           # テストで自動判定させることもできる`}</code>
      </pre>
      <p>1000コミットあっても10回程度の判定で原因にたどり着けます(<Link href="/theory/algorithms/complexity">O(log n)</Link>)。これが機能するのは<strong>各コミットが単体で動く状態</strong>になっている場合だけです ― 「意味の単位でコミットする」規律は、ここで効いてきます。</p>

      <Heading num="まとめ">状況別の早見表</Heading>
      <table>
        <tbody>
          <tr><th>やりたいこと</th><th>コマンド</th></tr>
          <tr><td className="hl">直前のコミットに修正を含めたい</td><td><code>git commit --amend</code></td></tr>
          <tr><td className="hl">コミットを取り消し、変更は手元に残したい</td><td><code>git reset --soft HEAD~1</code></td></tr>
          <tr><td className="hl">手元の変更を全部捨てたい</td><td><code>git restore .</code> / <code>git reset --hard</code></td></tr>
          <tr><td className="hl">公開済みの変更を取り消したい</td><td><code>git revert &lt;commit&gt;</code></td></tr>
          <tr><td className="hl">他ブランチの1コミットだけ欲しい</td><td><code>git cherry-pick &lt;commit&gt;</code></td></tr>
          <tr><td className="hl">消えた作業を探したい</td><td><code>git reflog</code></td></tr>
          <tr><td className="hl">壊れ始めた変更を特定したい</td><td><code>git bisect</code></td></tr>
        </tbody>
      </table>
      <p>共通する原則は1つ ― <strong>不安なら、まずコミットする</strong>。コミットさえされていれば、Gitはほぼすべてを取り戻せます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/git/basics" tag="実装">Gitの仕組み</RelatedLink>
            <RelatedLink href="/dev/git/conflict" tag="実装">マージ・リベースとコンフリクト解決</RelatedLink>
            <RelatedLink href="/dev/tooling/monorepo" tag="実装">モノレポとワークスペース</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
