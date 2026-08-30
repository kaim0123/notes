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
  title: "マージ・リベースとコンフリクト解決",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; Git</Eyebrow>
        <h1>マージ・リベースとコンフリクト解決 ― 分かれた履歴を合わせる</h1>
        <Lead>
          コンフリクトは事故ではなく、<strong>「同じ場所を2人が違うように変えた」という事実の報告</strong>です。Gitは自動で決められないときだけ人間に判断を求めます。ここでは合流の3つの方法と、コンフリクトが起きたときに何を見て、どう決着させるかを手順として整理します。
        </Lead>
      </Hero>

      <p>戦略としての使い分け(スカッシュマージが基本、共有ブランチをリベースしない)は「<Link href="/dev/git">Gitとブランチ戦略</Link>」で扱いました。ここでは実際の操作と、詰まったときの抜け方が主題です。</p>

      <Heading num="01">Gitはどうやって自動マージしているのか</Heading>
      <p>2つのブランチを合わせるとき、Gitは<Term>3-wayマージ</Term>という方法を使います。比べるのは2つではなく<strong>3つ</strong>です。</p>
      <table>
        <tbody>
          <tr><th>比べるもの</th><th>意味</th></tr>
          <tr><td className="hl">共通の祖先(ベース)</td><td>分岐する前の状態。「元はこうだった」</td></tr>
          <tr><td className="hl">自分側(ours)</td><td>取り込む先のブランチの状態</td></tr>
          <tr><td className="hl">相手側(theirs)</td><td>取り込む元のブランチの状態</td></tr>
        </tbody>
      </table>
      <p>ベースから見て<strong>片方だけが変えている</strong>なら、その変更を採用すれば済みます。<strong>両方が同じ箇所を違うように変えている</strong>ときだけ、Gitは判断を放棄してコンフリクトとして報告します。</p>
      <Analogy label="💡 たとえるなら">
        原本のコピーを2人が持ち帰って赤入れした状態です。1人しか直していない行はそのまま反映できますが、同じ行に2人が違う修正を入れていたら、編集者(あなた)がどちらを採るか決めるしかありません。
      </Analogy>

      <Heading num="02">3つの合流方法</Heading>
      <table>
        <tbody>
          <tr><th></th><th>マージ</th><th>リベース</th><th>スカッシュ</th></tr>
          <tr><td className="hl">履歴</td><td>分岐と合流が残る</td><td>分岐が無かった形に積み直す</td><td>PR全体が1コミットになる</td></tr>
          <tr><td className="hl">コミットのハッシュ</td><td>変わらない</td><td><strong>すべて作り直される</strong></td><td>1つに潰される</td></tr>
          <tr><td className="hl">コンフリクト</td><td>1回で解決</td><td><strong>コミットごとに繰り返し起きうる</strong></td><td>1回で解決</td></tr>
          <tr><td className="hl">向いている場面</td><td>共有ブランチ同士の統合</td><td>自分のブランチを最新に追随させる</td><td>mainへの取り込み</td></tr>
        </tbody>
      </table>
      <p>実務でよく使う組み合わせは、<strong>「自分の作業ブランチは <code>rebase</code> で最新に追随させ、mainへは squash で入れる」</strong>です。mainの履歴は1PR=1コミットで読みやすく、作業中は余計なマージコミットが積まれません。</p>

      <Heading num="03">コンフリクトの読み方</Heading>
      <p>コンフリクトが起きると、ファイルにマーカーが入ります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`<<<<<<< HEAD
const TAX_RATE = 0.1;          // 自分側(取り込む先)の内容
=======
const TAX_RATE = 0.08;         // 相手側(取り込む元)の内容
>>>>>>> feature/tax-update`}</code>
      </pre>
      <p>ここで<strong>やってはいけないのは「片方を機械的に選ぶ」こと</strong>です。両方の変更が必要な場合もあれば、両方を捨てて書き直すのが正解の場合もあります。判断のためには「なぜ相手がその変更をしたか」を知る必要があります。</p>
      <Steps>
        <li><code>git log --merge -p &lt;file&gt;</code> で、双方がそのファイルに加えた変更とメッセージを読む</li>
        <li>意図が読み取れなければ、書いた人に聞く(コンフリクトは技術ではなくコミュニケーションの問題であることが多い)</li>
        <li>マーカーを消し、<strong>両者の意図を満たすコード</strong>にする</li>
        <li>ビルドとテストを通す ― マーカーを消しただけでは正しいとは限らない</li>
        <li><code>git add</code> して解決済みとし、<code>git merge --continue</code> / <code>git rebase --continue</code> で先へ進む</li>
      </Steps>
      <Aside label="迷ったら中止できる">
        解決の途中で混乱したら、<code>git merge --abort</code> / <code>git rebase --abort</code> で<strong>開始前の状態に完全に戻せます</strong>。「もう後戻りできない」と思って無理に進めるのが一番危険です。まず中止して、ブランチを最新化してからやり直すほうが速いこともあります。
      </Aside>

      <Heading num="04">よく起きるコンフリクトと対処</Heading>
      <table>
        <tbody>
          <tr><th>種類</th><th>対処</th></tr>
          <tr><td className="hl">ロックファイル(<code>package-lock.json</code> 等)</td><td>手で直さない。<strong>片方を採用してから依存をインストールし直し、生成させる</strong></td></tr>
          <tr><td className="hl">マイグレーションの連番</td><td>連番方式は必ず衝突する。タイムスタンプ方式にするか、番号を振り直す</td></tr>
          <tr><td className="hl">整形の差分</td><td>整形ツールとその設定をリポジトリで統一する。整形だけのコミットは分ける</td></tr>
          <tr><td className="hl">改行コード・文字コード</td><td><code>.gitattributes</code> で統一する。OS差で全行が差分になるのを防ぐ</td></tr>
          <tr><td className="hl">同じ関数を両方が大改修</td><td>Gitの外の問題。作業分担かブランチ寿命を見直すサイン</td></tr>
          <tr><td className="hl">生成物(ビルド結果)</td><td>そもそもコミットしない。<code>.gitignore</code> に入れる</td></tr>
        </tbody>
      </table>
      <p>解決を機械的に繰り返している場合、<code>git rerere</code>(同じ解決を記録して再利用する機能)を有効にすると、長いリベースの苦痛が大きく減ります。</p>

      <Heading num="05">コンフリクトを減らす設計</Heading>
      <p>解決の腕を上げるより、<strong>起きにくくする</strong>ほうが効果的です。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ブランチを短命にする</h4>
          <p>最大の要因は寿命。1日で終わる大きさに切る。これだけで大半が消える。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>こまめに追随する</h4>
          <p>毎朝 <code>git pull --rebase origin main</code>。小さな衝突を早く小さく処理する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ファイルを分ける</h4>
          <p>巨大な共通ファイル(定数の集約・index の再エクスポート)は衝突の温床。責務ごとに分割する。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>担当範囲を重ねない</h4>
          <p>同じ時期に同じモジュールを2人で大改修しない。分担を先に相談する。</p>
        </Card>
      </CardGrid>

      <Heading num="06">意味的なコンフリクト ― Gitが検知できない衝突</Heading>
      <p>最も危険なのは、<strong>コンフリクトが起きずにマージが成功してしまう衝突</strong>です。</p>
      <table>
        <tbody>
          <tr><th>状況</th><th>結果</th></tr>
          <tr><td className="hl">Aが関数名を変更、Bがその関数を新しい場所から呼ぶ</td><td>行が離れているためGitは自動マージする。ビルドが壊れる</td></tr>
          <tr><td className="hl">Aが引数の意味を変更、Bが従来の前提で呼び出しを追加</td><td>ビルドは通るが<strong>動作が壊れる</strong></td></tr>
          <tr><td className="hl">Aがテーブル列を削除、Bがその列を使うクエリを追加</td><td>本番で初めて落ちる</td></tr>
        </tbody>
      </table>
      <p>これを検知できるのは人間ではなく<Link href="/dev/ci">CI</Link>です。<strong>マージ後の状態でテストを実行する</strong>設定(GitHubのマージキューや「main最新への追随を必須にする」ブランチ保護)にしておけば、壊れた状態がmainに残る時間をゼロに近づけられます。</p>

      <Heading num="まとめ">解決の前に、意図を読む</Heading>
      <p>コンフリクトの解決とは、テキストの選択ではなく<strong>2つの意図の統合</strong>です。マーカーを消すことがゴールではありません。そして最良の対策は、そもそも大きな衝突が起きないようブランチを短く保つこと ― Gitの操作ではなく、進め方の設計が効きます。</p>
      <p>次は、間違えたときに元へ戻す方法をまとめて見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/git/recovery" tag="実装">履歴のやり直しと復旧</RelatedLink>
            <RelatedLink href="/dev/git/basics" tag="実装">Gitの仕組み</RelatedLink>
            <RelatedLink href="/dev/ci" tag="実装">CI/CDパイプライン</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
