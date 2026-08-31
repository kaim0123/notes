import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame, Steps,
} from "@/components/docs";

export const metadata: Metadata = { title: "マージ・リベースとコンフリクト解決" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>マージ・リベースとコンフリクト解決 ― 分かれた履歴を合わせる</h1>
        <Lead>
          コンフリクトは事故ではなく、<Term>「同じ場所を2人が違うように変えた」という事実の報告</Term>です。Gitは自動で決められないときだけ人間に判断を求めます。ここでは合流の3つの方法と、コンフリクトが起きたときに何を見て、どう決着させるかを手順として整理します。
        </Lead>
      </Hero>

      <Heading num="01">Gitはどうやって自動マージしているのか</Heading>
      <p>
        2つのブランチを合わせるとき、Gitは<Term>3-wayマージ</Term>という方法を使います。比べるのは2つではなく<Term>3つ</Term>です。
      </p>

      <DiagramFrame
        slug="dev-git-3way"
        aspect="640 / 290"
        caption="3-wayマージの判定。共通の祖先から自分側と相手側が分かれており、Gitはこの3つを比べる。片方だけが変えていればその変更をそのまま採用でき、自動でマージが成立する。両方が同じ箇所を違うように変えていれば、どちらが正しいかは判断できないためコンフリクトとして報告される。行が離れていれば自動マージは成功してしまうため、意味的な衝突は検知されない。"
      />

      <Analogy label="💡 たとえるなら">
        原本のコピーを2人が持ち帰って赤入れした状態です。1人しか直していない行はそのまま反映できますが、同じ行に2人が違う修正を入れていたら、編集者(あなた)がどちらを採るか決めるしかありません。
      </Analogy>

      <Heading num="02">3つの合流方法</Heading>

      <table>
        <thead>
          <tr><th></th><th>マージ</th><th>リベース</th><th>スカッシュ</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">履歴</td>
            <td>分岐と合流が残る</td>
            <td>分岐が無かった形に積み直す</td>
            <td>まとめて1コミットになる</td>
          </tr>
          <tr>
            <td className="hl">ハッシュ</td>
            <td>変わらない</td>
            <td>すべて作り直される</td>
            <td>1つに潰される</td>
          </tr>
          <tr>
            <td className="hl">コンフリクト</td>
            <td>1回で解決</td>
            <td>コミットごとに繰り返し起きうる</td>
            <td>1回で解決</td>
          </tr>
          <tr>
            <td className="hl">向いている場面</td>
            <td>共有ブランチ同士の統合</td>
            <td>自分のブランチを最新に追随させる</td>
            <td>mainへの取り込み</td>
          </tr>
        </tbody>
      </table>

      <p>
        実務でよく使う組み合わせは、<Term>自分の作業ブランチはリベースで最新に追随させ、mainへはスカッシュで入れる</Term>です。mainの履歴は1つの変更 = 1コミットで読みやすく、作業中は余計なマージコミットが積まれません(<Link href="/dev/git-ci">ブランチ戦略</Link>)。
      </p>

      <Heading num="03">コンフリクトの読み方</Heading>
      <p>コンフリクトが起きると、ファイルにマーカーが入ります。</p>

      <pre>
        <code>{`<<<<<<< HEAD
const TAX_RATE = 0.1;   // 自分側(取り込む先)の内容
=======
const TAX_RATE = 0.08;  // 相手側(取り込む元)の内容
>>>>>>> feature/tax-update`}</code>
      </pre>

      <p>
        ここで<Term>やってはいけないのは「片方を機械的に選ぶ」こと</Term>です。両方の変更が必要な場合もあれば、両方を捨てて書き直すのが正解の場合もあります。判断のためには「なぜ相手がその変更をしたか」を知る必要があります。
      </p>

      <Steps>
        <li>双方がそのファイルに加えた変更とメッセージを読む</li>
        <li>
          意図が読み取れなければ、書いた人に聞く ― コンフリクトは技術ではなく認識合わせの問題であることが多い
        </li>
        <li>マーカーを消し、両者の意図を満たすコードにする</li>
        <li>ビルドとテストを通す ― マーカーを消しただけでは正しいとは限らない</li>
        <li>解決済みとして記録し、続きの操作へ進む</li>
      </Steps>

      <Aside label="迷ったら中止できる">
        解決の途中で混乱したら、中止の操作で<Term>開始前の状態に完全に戻せます</Term>。「もう後戻りできない」と思って無理に進めるのが一番危険です。まず中止して、ブランチを最新化してからやり直すほうが速いこともあります。
      </Aside>

      <Heading num="04">よく起きるコンフリクトと対処</Heading>

      <table>
        <thead>
          <tr><th>種類</th><th>対処</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">ロックファイル</td>
            <td>
              手で直さない。片方を採用してから<Link href="/dev/tooling-deps">依存を入れ直して生成させる</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">マイグレーションの連番</td>
            <td>連番方式は必ず衝突する。時刻ベースにするか、番号を振り直す</td>
          </tr>
          <tr>
            <td className="hl">整形の差分</td>
            <td>整形ツールと設定をリポジトリで統一し、整形だけのコミットは分ける</td>
          </tr>
          <tr>
            <td className="hl">改行コード・文字コード</td>
            <td>設定で統一する。OS差で全行が差分になるのを防ぐ</td>
          </tr>
          <tr>
            <td className="hl">同じ関数を両方が大改修</td>
            <td>Gitの外の問題。作業分担かブランチ寿命を見直すサイン</td>
          </tr>
          <tr>
            <td className="hl">生成物</td>
            <td>
              そもそもコミットしない(<Link href="/dev/dotenv">.gitignore</Link>)
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        同じ解決を機械的に繰り返している場合、解決内容を記録して再利用する機能を有効にすると、長いリベースの苦痛が大きく減ります。
      </p>

      <Heading num="05">コンフリクトを減らす設計</Heading>
      <p>解決の腕を上げるより、<Term>起きにくくする</Term>ほうが効果的です。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ブランチを短命にする</h4>
          <p>
            最大の要因は寿命です。1日で終わる大きさに切ると、大半が消えます。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>こまめに追随する</h4>
          <p>毎朝mainを取り込み、小さな衝突を早く小さく処理します。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ファイルを分ける</h4>
          <p>
            定数の集約や再エクスポートの巨大ファイルは衝突の温床です。責務ごとに分割します。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>担当範囲を重ねない</h4>
          <p>
            同じ時期に同じモジュールを2人で大改修しない。分担を先に相談します。
          </p>
        </Card>
      </CardGrid>

      <Heading num="06">意味的なコンフリクト ― 検知されない衝突</Heading>
      <p>
        最も危険なのは、<Term>コンフリクトが起きずにマージが成功してしまう衝突</Term>です。
      </p>

      <table>
        <thead>
          <tr><th>状況</th><th>結果</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Aが関数名を変更、Bがその関数を新しい場所から呼ぶ</td>
            <td>行が離れているため自動マージされる。ビルドが壊れる</td>
          </tr>
          <tr>
            <td className="hl">Aが引数の意味を変更、Bが従来の前提で呼び出しを追加</td>
            <td>ビルドは通るが動作が壊れる</td>
          </tr>
          <tr>
            <td className="hl">Aがテーブル列を削除、Bがその列を使う問い合わせを追加</td>
            <td>本番で初めて落ちる</td>
          </tr>
        </tbody>
      </table>

      <p>
        これを捕まえられるのは<Link href="/dev/git-ci">マージ後にも走るCI</Link>と型検査だけです。「PRの時点で緑だった」は、mainの最新と合わせた状態を検証したことにはなりません。
      </p>

      <Heading num="まとめ">合流は判断であって作業ではない</Heading>
      <p>
        Gitが聞いてくるのは「どちらが正しいか」であって、機械的に選べる問いではありません。だから<Term>意図を読む・聞く</Term>ことが解決の中心になり、そもそも衝突を減らす設計と短いブランチが最良の対策になります。
      </p>

      <DocsFooter href="/dev/git-conflict" />
    </DocsPage>
  );
}
