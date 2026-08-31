import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "スタイリング" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>スタイリング ― CSSが大きくなると何が壊れるか</h1>
        <Lead>
          CSSは書き始めるのが最も簡単で、育てるのが最も難しい言語です。難しさの正体は文法ではなく、<Term>すべての規則が全要素に届いてしまう</Term>ことにあります。ここでは、その一点から生まれる問題と、歴史的にどう手当てされてきたかを整理します。個々のレイアウト手法とTailwindは、この見出しの配下で扱います。
        </Lead>
      </Hero>

      <p>
        セレクタ・カスケード・ボックスモデルという文法の側は<Link href="/frontend/web">Web基礎</Link>で押さえました。ここはその先 ― <Term>人数とページ数が増えたときに何が起きるか</Term>の話です。
      </p>

      <Heading num="01">壊れ方は3つしかない</Heading>
      <p>
        規模が大きくなったCSSで起きる問題は、突き詰めると3種類です。どの手法も、このどれかを解こうとしています。
      </p>

      <table>
        <thead>
          <tr><th>問題</th><th>症状</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">グローバル</td>
            <td>すべての規則が全要素に届く。別ページ用に書いた<code>.title</code>が、思わぬ場所に当たる</td>
          </tr>
          <tr>
            <td className="hl">詳細度の競り上がり</td>
            <td>上書きのために強いセレクタを重ね、次はさらに強い指定が必要になる。最後は<code>!important</code></td>
          </tr>
          <tr>
            <td className="hl">消せないコード</td>
            <td>そのクラスがどこで使われているか分からず、誰も消せない。CSSだけが増え続ける</td>
          </tr>
        </tbody>
      </table>

      <p>
        3つ目が最も厄介です。CSSは<Term>使われていないことを機械的に証明しにくい</Term>言語で、クラス名が文字列として組み立てられていれば静的解析も効きません。結果として「消すリスクより残すコスト」を選び続けることになります。
      </p>

      <Heading num="02">手当ての系譜</Heading>
      <p>
        歴史的な打ち手は、大きく<Term>命名で解く</Term>・<Term>仕組みで解く</Term>・<Term>そもそも名前を付けない</Term>の3系統に分かれます。
      </p>

      <DiagramFrame
        slug="frontend-styling-approaches"
        aspect="640 / 320"
        caption="スタイリング手法を、スコープの効き方と名前付けの必要性で並べた図。左端の素のCSSは全体に効きグローバルで、命名規約のBEMは規律で衝突を避けるが強制力がない。中央のCSS Modulesとcss-in-jsはビルドやランタイムがクラス名を機械的に固有化するため、仕組みとして衝突しない。右端のユーティリティファーストはそもそも意味のあるクラス名を作らないため、名前の衝突も未使用クラスの判定問題も起きない。下部に、どの手法も未使用コードを消せるかという同じ問いに答えようとしていると注記がある。"
      />

      <table>
        <thead>
          <tr><th>手法</th><th>解き方</th><th>弱点</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">命名規約(BEM等)</td>
            <td><code>block__element--modifier</code>のような規約で衝突を避ける</td>
            <td>強制力がない。守られなくなった瞬間に元へ戻る</td>
          </tr>
          <tr>
            <td className="hl">CSS Modules</td>
            <td>ビルド時にクラス名を固有な文字列へ変換する</td>
            <td>ファイルの往復は残る。命名の悩みも残る</td>
          </tr>
          <tr>
            <td className="hl">CSS-in-JS</td>
            <td>コンポーネントの中にスタイルを閉じ込める</td>
            <td>実行時コストと、サーバー描画との噛み合わせ</td>
          </tr>
          <tr>
            <td className="hl">ユーティリティファースト</td>
            <td>意味のあるクラス名を作らない。役割1つのクラスを組み合わせる</td>
            <td>マークアップが長くなる</td>
          </tr>
        </tbody>
      </table>

      <p>
        近年の主流が右へ寄っているのは、<Term>クラス名という間接層をなくすと3つの問題が同時に消える</Term>からです。名前がなければ衝突せず、上書き合戦も起きず、マークアップを消せばスタイルも一緒に消えます。代償はマークアップの見た目 ― この取引をどう見るかが<Link href="/frontend/tailwind">Tailwind CSS</Link>の評価を分けます。
      </p>

      <Heading num="03">現代のCSSが取り戻したもの</Heading>
      <p>
        一方で、CSS自身も進化しました。かつてプリプロセッサやJSが担っていた役割の多くが、標準機能に降りてきています。
      </p>

      <table>
        <thead>
          <tr><th>機能</th><th>できること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">カスタムプロパティ</td><td><code>--color-primary</code>のような変数。実行時に切り替えられるのでテーマ切替に使える</td></tr>
          <tr><td className="hl">ネスト</td><td>入れ子で書ける。プリプロセッサなしで階層が表現できる</td></tr>
          <tr><td className="hl"><code>:has()</code></td><td>「この子を持つ親」を選べる。JSなしで親の見た目を変えられる</td></tr>
          <tr><td className="hl"><code>@layer</code></td><td>カスケードの優先順位を層として明示する。詳細度の競り上がりを止める</td></tr>
          <tr><td className="hl">コンテナクエリ</td><td>画面幅ではなく親の幅で切り替える。部品として持ち運べる</td></tr>
          <tr><td className="hl"><code>clamp()</code></td><td>最小・可変・最大を1行で。分岐なしで可変にできる</td></tr>
        </tbody>
      </table>

      <Aside label="@layer が効く場面">
        リセットCSS・共通スタイル・コンポーネント・ユーティリティ、といった層を<code>@layer</code>で宣言しておくと、<Term>後の層が必ず勝つ</Term>ようになります。詳細度を上げなくても上書きできるので、「打ち勝つためにセレクタを長くする」という悪循環が構造的に起きません。外部ライブラリのCSSを取り込むときにも効きます。
      </Aside>

      <Heading num="04">デザイントークン ― 数値を1か所に寄せる</Heading>
      <p>
        どの手法を選んでも共通して必要なのが、<Term>色・余白・角丸・書体を有限の選択肢にする</Term>ことです。これを<Term>デザイントークン</Term>と呼びます。
      </p>
      <p>
        トークンがないと、似た灰色が20種類でき、余白が13pxと14pxで混在します。個々のページを見ている限り誰も困りませんが、全体を並べた瞬間に<Term>まとまりのなさ</Term>として現れ、あとから揃えるのはほぼ不可能になります。逆にトークンさえあれば、テーマ切替もダークモードも「トークンの値を差し替える」だけの作業になります。
      </p>
      <p>
        トークンをコンポーネントの語彙にまで押し上げる話は、UX・UI側の<Link href="/frontend/ux-system">コンポーネントとデザインシステム</Link>で扱います。
      </p>

      <Analogy label="💡 たとえるなら">
        素のCSSは、全員が同じ部屋で大声を出している状態です。BEMは「発言の前に名前を名乗ろう」という取り決め ― 守られている間はうまくいきます。CSS Modulesは各自に個室を与える設備投資。ユーティリティファーストは、そもそも会話をやめて<strong>共通の手信号だけで済ませる</strong>やり方です。声の大きさ(詳細度)で争う余地をなくしたぶん、身振りは増えます。
      </Analogy>

      <Heading num="まとめ">名前を減らすか、閉じ込めるか</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>問題はグローバルであること</h4>
          <p>衝突・詳細度の競り上がり・消せないコード。3つとも同じ根から出ている。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>解き方は2方向</h4>
          <p>スコープを仕組みで閉じるか、クラス名という間接層そのものをなくすか。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>トークンはどの手法でも要る</h4>
          <p>色と余白を有限にしておかないと、まとまりは後から取り戻せない。</p>
        </Card>
      </CardGrid>

      <p>
        この見出しの配下では、箱をどう並べるかという<Link href="/frontend/layout">CSSレイアウト</Link>と、ユーティリティファーストの実装である<Link href="/frontend/tailwind">Tailwind CSS</Link>を扱います。
      </p>

      <DocsFooter href="/frontend/styling" />
    </DocsPage>
  );
}
