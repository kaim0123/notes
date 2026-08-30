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
  title: "コーディング規約",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>コーディング規約 ― 読み書きのコストを下げる取り決め</h1>
        <Lead>
          書く人ごとにコードの見た目がばらばらだと、レビューでは本質と関係ない差分に目を取られ、読むたびに書き手の癖を推測する手間がかかります。<Term>コーディング規約</Term>は、機械的に決められる部分を統一してしまい、人間はロジックの検討に集中できるようにするための取り決めとツール群です。設計の話題の中では最も小さい粒度にあたります。
        </Lead>
      </Hero>

      <Heading num="01">規約と呼ばれるものの内訳</Heading>
      <table>
        <thead>
          <tr>
            <th>種類</th>
            <th>内容</th>
            <th>代表例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">命名規則</td>
            <td>変数・関数・クラスなどの名前の付け方を統一するルール</td>
            <td>camelCase、PascalCase、snake_case</td>
          </tr>
          <tr>
            <td className="hl">フォーマッタ</td>
            <td>インデント・改行・空白など、見た目を自動で統一するツール</td>
            <td>Prettier、gofmt、Black</td>
          </tr>
          <tr>
            <td className="hl">リンター</td>
            <td>規約違反や潜在的なバグを、実行せずに静的解析で検出するツール</td>
            <td>ESLint、RuboCop、Pylint</td>
          </tr>
          <tr>
            <td className="hl">スタイルガイド</td>
            <td>命名・構造・コメントなどの方針をまとめた文書</td>
            <td>Airbnb JavaScript Style Guide、Google Style Guides</td>
          </tr>
          <tr>
            <td className="hl">コミットメッセージ規約</td>
            <td>変更内容を一定の形式で書くルール</td>
            <td>Conventional Commits</td>
          </tr>
        </tbody>
      </table>

      <p>
        このうちフォーマッタが扱う範囲(インデント幅・セミコロンの有無・改行位置)は、<Term>どちらでもよいが揃っている必要がある</Term>類の話です。議論に時間を使う価値はほとんどないので、ツールの既定値をそのまま採用してしまうのが最も安上がりです。
      </p>

      <Heading num="02">規約はツールで強制して初めて機能する</Heading>
      <p>
        文書に書いて呼びかけるだけの規約は、忙しくなると守られなくなります。守られない規約は、レビューで指摘する人の負担になるだけで、かえって害があります。実効性を持たせる方法は1つで、<Term>機械が自動で適用・検査する</Term>ことです。
      </p>

      <DiagramFrame
        slug="design-conventions-toolchain"
        aspect="700 / 270"
        caption="コーディング規約が自動で適用される流れの図。コードを書く、保存時にフォーマッタが見た目を統一する、コミット前にリンターが規約違反と潜在的なバグを検出する、CIで同じチェックを再実行して通らなければマージしない、という4段階が順につながる。その結果、人間のレビューはロジックが正しいかどうかだけに集中できる。"
      />

      <p>
        エディタの設定はリポジトリに含めて共有し、CIでも同じチェックを走らせるのが基本形です。ローカルだけで検査していると、設定を入れていない人の変更がそのまま入ってしまいます。逆にCIだけだと、指摘が遅れて手戻りが大きくなります。両方に置いて、CIを最後の砦にします。
      </p>

      <Aside label="既存コードへの一括適用">
        途中からフォーマッタを導入すると、初回に全ファイルが書き換わる巨大な差分が生まれます。これは機能変更のコミットとは必ず分けます。混ぜてしまうと、後から変更履歴を追うときに「この行が変わった理由」を追跡できなくなります。
      </Aside>

      <Heading num="03">命名記法 ― どれが正しいかではなく、どこに合わせるか</Heading>

      <DiagramFrame
        slug="design-conventions-naming"
        aspect="660 / 300"
        caption="代表的な命名記法5種と用途の対応表。camelCase(userName、getTotal)はJavaScript・TypeScriptの変数と関数、PascalCase(OrderService、User)はクラス・型・コンポーネント、snake_case(user_name)はPythonの変数やデータベースの列名、kebab-case(user-profile.tsx)はファイル名やURL、UPPER_SNAKE_CASE(MAX_RETRY_COUNT)は定数に使われる。どれが正しいかではなく、その言語・その場所の慣習に合わせることが要点。"
      />

      <p>
        記法そのものに優劣はありません。判断基準は<Term>その言語・その場所の慣習に合っているか</Term>だけです。JavaScriptのコードにsnake_caseの変数が混ざっていれば、読み手はそこで一瞬つまずきます。つまずきをなくすことが目的なので、多数派に合わせるのが常に正解になります。
      </p>

      <Heading num="04">名前の付け方</Heading>

      <h3>関数 ― 動詞から始める</h3>
      <p>
        関数は動作なので、<Term>動詞+名詞</Term>が基本形です(<code>fetchUser</code>、<code>calculateTotal</code>)。真偽値を返すものは<code>is</code>・<code>has</code>・<code>can</code>で始めると、条件式に置いたときそのまま英文として読めます(<code>isPublished</code>、<code>hasPermission</code>)。
      </p>
      <p>
        イベント関連では、<code>on</code>で始まる名前は「いつ呼ばれるか」を受け取る側のprops名に、<code>handle</code>で始まる名前は「何をするか」を実装する側に使う、という使い分けが定着しています(<code>onClick</code>を受け取り、<code>handleClick</code>を渡す)。
      </p>

      <h3>変数 ― 省略しない、ただし慣習は使う</h3>
      <p>
        意味の分かる名前を優先し、独自の省略は避けます。一方で、<code>id</code>・<code>url</code>・<code>req</code>・<code>res</code>・<code>i</code>のように広く通じる略語まで律儀に書き下すと、かえって読みにくくなります。基準は「初見の人がその場で意味を取れるか」です。
      </p>
      <p>
        単数形と複数形も情報です。<code>user</code>と<code>users</code>を意識して使い分けるだけで、配列かどうかが型を見なくても分かります。
      </p>

      <h3>クラス・モジュール ― 役割を接尾辞で示す</h3>
      <p>
        <code>OrderService</code>・<code>UserRepository</code>・<code>PaymentController</code>のように、役割を示す接尾辞を付けると、名前だけでどの層に属するものかが伝わります。裏を返せば、接尾辞が付けにくいクラスは責務が曖昧になっている兆候でもあります。ここは<Link href="/design/principles">設計原則</Link>の単一責任の原則と地続きです。
      </p>

      <h3>ファイル・ディレクトリ</h3>
      <p>
        ファイル名は、その中身の主役と一致させるのが原則です。Reactコンポーネントを収めるファイルなら、コンポーネント名と対応させます。大文字小文字の扱いがOSによって違う(macOSは区別しないがLinuxは区別する)ため、全体をkebab-caseに揃えておくと、環境差による事故を避けられます。
      </p>

      <Heading num="05">コメントは「なぜ」を書く</Heading>
      <p>
        規約の話でよく抜けるのがコメントです。<Term>何をしているか</Term>はコードを読めば分かります。読んでも分からないのは<Term>なぜそうしたか</Term> ―
        検討して捨てた代替案、外部の制約、直感に反する処理の理由です。
      </p>
      <table>
        <thead>
          <tr>
            <th>書かないほうがよい</th>
            <th>書く価値がある</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>コードをそのまま日本語にしただけの説明</td>
            <td>なぜ素直な実装を採らなかったのかという理由</td>
          </tr>
          <tr>
            <td>更新されずに嘘になった説明</td>
            <td>外部APIの仕様上、この順序でないと動かないといった制約</td>
          </tr>
          <tr>
            <td>コメントアウトされた古いコード</td>
            <td>意図的に例外を握りつぶしている場合の、その判断の根拠</td>
          </tr>
        </tbody>
      </table>
      <p>
        古いコードをコメントアウトして残すのは、バージョン管理があれば不要です。消しても履歴から復元できます。
      </p>

      <Heading num="06">なぜ規約を「設計」に含めるのか</Heading>
      <p>
        命名やフォーマットは、個々のコードの正しさそのものには関わりません。それでも設計の一部として扱うのは、<Term>名前がその設計意図を伝える最後の接点</Term>だからです。どれだけ責務をきれいに分けても、クラス名が<code>Manager</code>や<code>Util</code>のままでは、次に読む人にその分割は伝わりません。
      </p>

      <Analogy label="💡 たとえるなら">
        <Link href="/design/principles">設計原則</Link>が「何を1つの単位にまとめるか」という文章の構成方針だとすれば、コーディング規約は「句読点の打ち方・字下げ」という表記のルールです。構成がどれだけ良くても表記がばらばらなら読みにくく、逆に表記さえ揃っていれば、複数人で書いた文章でも1つの文書として読めます。
      </Analogy>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>議論せず既定値に従う</h4>
          <p>
            フォーマットは揃っていることだけが重要。ツールの既定値をそのまま使うのが安上がりです。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ツールで強制する</h4>
          <p>
            保存時のフォーマッタ、コミット前のリンター、CIでの再チェック。呼びかけでは機能しません。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>名前は設計意図の接点</h4>
          <p>
            分け方がどれだけ良くても、名前が曖昧なら次に読む人には伝わりません。
          </p>
        </Card>
      </CardGrid>

      <p>
        これで設計の5つのテーマを一通り見終えました。どう書くかの<Link href="/design/paradigm">パラダイム</Link>、判断基準としての<Link href="/design/principles">設計原則</Link>、全体の骨組みである<Link href="/design/architecture">アーキテクチャ</Link>、部品の定石である<Link href="/design/patterns">設計パターン</Link>、そして表記を揃えるコーディング規約 ―
        粒度の違う5つのレベルを通して「どう組み立てるか」を眺めたことになります。
      </p>

      <DocsFooter href="/design/conventions" />
    </DocsPage>
  );
}
