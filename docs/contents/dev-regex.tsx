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
  title: "正規表現",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; 言語</Eyebrow>
        <h1>正規表現 ― 文字列のパターンを書く小さな言語</h1>
        <Lead>
          ログの絞り込み、入力の検証、一括置換、ファイルの検索 ― 正規表現はエディタからシェル、あらゆる言語まで共通して使える道具です。記号の呪文に見えますが、
          <strong>「何を」「どれだけ」「どこで」</strong>の3要素の組み合わせにすぎません。仕組みを知れば、書けるだけでなく<strong>危険な書き方を避けられる</strong>ようになります。
        </Lead>
      </Hero>

      <p>オートマトンや形式言語としての位置づけは「<Link href="/theory/formal">形式言語</Link>」で扱っています。ここでは実務で書くための整理です。</p>

      <Heading num="01">3つの構成要素</Heading>
      <table>
        <tbody>
          <tr><th>要素</th><th>役割</th><th>例</th></tr>
          <tr><td className="hl">文字クラス(何を)</td><td>どんな文字にマッチするか</td><td><code>\d</code> 数字、<code>\w</code> 英数字と_、<code>.</code> 任意の1文字、<code>[a-z]</code></td></tr>
          <tr><td className="hl">量指定子(どれだけ)</td><td>何回繰り返すか</td><td><code>*</code> 0回以上、<code>+</code> 1回以上、<code>?</code> 0か1回、<code>&#123;2,4&#125;</code></td></tr>
          <tr><td className="hl">アンカー(どこで)</td><td>位置の指定</td><td><code>^</code> 行頭、<code>$</code> 行末、<code>\b</code> 単語境界</td></tr>
        </tbody>
      </table>
      <p>これに<strong>グループ化</strong>(<code>( )</code>)と<strong>選択</strong>(<code>|</code>)が加われば、実務で書くものの大半は表現できます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`/^\\d{3}-\\d{4}$/          // 郵便番号 ― 行頭から数字3つ、ハイフン、数字4つ、行末
/\\berror\\b/i             // 単語としての error(大文字小文字を無視)
/(\\d{4})-(\\d{2})-(\\d{2})/  // 日付 ― 3つのグループとして取り出せる`}</code>
      </pre>

      <Heading num="02">貪欲マッチとその制御</Heading>
      <p>量指定子は既定で<Term>貪欲(greedy)</Term>です ― <strong>できるだけ長く</strong>マッチしようとします。これが最初につまずく点です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`const html = "<b>太字</b>と<i>斜体</i>";

html.match(/<.+>/)[0];    // "<b>太字</b>と<i>斜体</i>"  ← 最後の > まで飲み込む
html.match(/<.+?>/)[0];   // "<b>"                      ← ? を付けると最短(lazy)
html.match(/<[^>]+>/)[0]; // "<b>"                      ← 「> 以外」を使うのが最も速い`}</code>
      </pre>
      <p>3つ目の書き方(否定文字クラス)は、意図が明確なうえに<strong>後戻りが起きにくい</strong>ため、性能面でも推奨されます。</p>

      <Heading num="03">グループと取り出し</Heading>
      <table>
        <tbody>
          <tr><th>記法</th><th>意味</th></tr>
          <tr><td className="hl"><code>(...)</code></td><td>キャプチャグループ。マッチした部分を取り出せる</td></tr>
          <tr><td className="hl"><code>(?:...)</code></td><td>非キャプチャ。まとめたいだけのとき。無駄な取り出しをしない</td></tr>
          <tr><td className="hl"><code>(?&lt;year&gt;...)</code></td><td>名前付きキャプチャ。<strong>番号ではなく名前で参照</strong>でき、読みやすい</td></tr>
          <tr><td className="hl"><code>(?=...)</code> / <code>(?!...)</code></td><td>先読み ― 「後ろがこうなっている位置」。消費しない</td></tr>
          <tr><td className="hl"><code>(?&lt;=...)</code> / <code>(?&lt;!...)</code></td><td>後読み ― 「前がこうなっている位置」</td></tr>
        </tbody>
      </table>
      <p>先読み・後読みは「マッチはさせたいが、結果には含めたくない」ときに使います。ただし可読性を大きく下げるため、<strong>コードで書けるならコードで</strong>のほうが良い場面も多くあります。</p>

      <Heading num="04">正規表現を使うべきでない場面</Heading>
      <p>強力なので何にでも使いたくなりますが、向かない対象があります。</p>
      <table>
        <tbody>
          <tr><th>対象</th><th>理由</th><th>代わりに</th></tr>
          <tr><td className="hl">HTML / XML</td><td>入れ子構造は正規表現では表現できない(<Link href="/theory/formal">正規言語の限界</Link>)</td><td>DOMパーサ</td></tr>
          <tr><td className="hl">JSON</td><td>同上。入れ子と引用符の組み合わせで破綻する</td><td><code>JSON.parse</code></td></tr>
          <tr><td className="hl">CSV</td><td>引用符の中の改行やカンマを扱えない</td><td>CSVパーサ</td></tr>
          <tr><td className="hl">メールアドレス</td><td>仕様が複雑すぎる。厳密な検証は現実的でない</td><td>簡易チェック + <strong>実際に確認メールを送る</strong></td></tr>
          <tr><td className="hl">単純な部分一致</td><td>読みにくく、遅い</td><td><code>includes</code> / <code>startsWith</code></td></tr>
        </tbody>
      </table>
      <Analogy label="💡 たとえるなら">
        正規表現は「線を引く定規」です。直線は完璧に引けますが、<strong>入れ子の円や階層構造は描けません</strong>。HTMLのように入れ子が本質の対象に定規を当てようとすると、いつまでも近似が終わりません。
      </Analogy>

      <Heading num="05">ReDoS ― 正規表現が止まる</Heading>
      <p>JavaScriptを含む多くの言語の正規表現エンジンは<strong>バックトラック型</strong>で、マッチに失敗すると別の分け方を試し直します。書き方によっては、この試行が入力長に対して指数的に増えます。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 危険 ― 繰り返しの入れ子。少し長い入力で処理が事実上停止する
/^(a+)+$/.test("aaaaaaaaaaaaaaaaaaaaaaaaaaaaX");

// 危険 ― 同じ文字にマッチしうる選択肢の繰り返し
/^(\\w+\\s?)*$/.test(input);

// 安全 ― 曖昧さがない
/^a+$/.test(input);`}</code>
      </pre>
      <p>これを外部入力に対して行えば、1リクエストでCPUを占有できてしまいます ― <Term>ReDoS</Term>と呼ばれる攻撃です。単一スレッドのNode.jsでは、<strong>1つの正規表現がサーバー全体を止めます</strong>。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>入れ子の繰り返しを書かない</h4><p><code>(x+)+</code> <code>(x*)*</code> <code>(a|a)*</code> の形を避ける。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>否定文字クラスを使う</h4><p><code>.+?</code> より <code>[^&quot;]+</code>。曖昧さが減り、後戻りが起きない。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>入力長を制限する</h4><p>照合前に長さの上限を設ける。単純だが効果が大きい。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>利用者の文字列をパターンにしない</h4><p>検索語をそのまま正規表現にしない。必ずエスケープする。</p></Card>
      </CardGrid>

      <Heading num="06">実務での書き方</Heading>
      <Steps>
        <li><strong>名前を付けて定数にする</strong> ― <code>const POSTAL_CODE = /^\d&#123;3&#125;-\d&#123;4&#125;$/</code>。意図が読める</li>
        <li><strong>コメントで例を書く</strong> ― マッチする例・しない例を1行ずつ添える</li>
        <li><strong>テストを書く</strong> ― 正規表現は「ちょっとした修正」で壊れやすい。境界値でテストする</li>
        <li><strong>ループ内で作らない</strong> ― リテラルで書くか、外で1度だけ生成する</li>
        <li><strong><code>g</code> フラグの状態に注意</strong> ― <code>lastIndex</code> が保持され、同じ正規表現の使い回しで結果が変わる</li>
      </Steps>
      <Aside label="検証は正規表現だけに頼らない">
        入力検証では、正規表現は<strong>形式のチェック</strong>にとどめます。「そのIDが存在するか」「その日付が実在するか(2月30日)」は正規表現では判定できません。スキーマ検証ライブラリと組み合わせ、意味的な妥当性は別途確認します(「<Link href="/dev/backend/express/validation">バリデーション</Link>」)。
      </Aside>

      <Heading num="07">言語・ツールによる違い</Heading>
      <table>
        <tbody>
          <tr><th>環境</th><th>注意点</th></tr>
          <tr><td className="hl">JavaScript</td><td>後読みは比較的新しい機能。<code>s</code>(dotAll)・<code>u</code>(Unicode)フラグを意識する</td></tr>
          <tr><td className="hl">grep / sed</td><td>基本正規表現(BRE)では <code>+</code> や <code>?</code> にエスケープが要る。<code>grep -E</code> で拡張(ERE)にする</td></tr>
          <tr><td className="hl">Go・Rust</td><td>線形時間を保証するエンジン(後方参照は使えない)。ReDoSが起きない</td></tr>
          <tr><td className="hl">データベース</td><td>製品ごとに方言がある。索引が効かず全件走査になりやすい</td></tr>
          <tr><td className="hl">日本語</td><td><code>\w</code> は全角文字を含まない。Unicodeプロパティ(<code>\p&#123;...&#125;</code>)を使う</td></tr>
        </tbody>
      </table>
      <p>「手元のエディタでは動いたのに、シェルやDBでは動かない」の原因はほぼ方言の違いです。どの構文体系かを最初に確認してください。</p>

      <Heading num="まとめ">強力な道具ほど、限界を知る</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>3要素の組み合わせ</h4><p>何を・どれだけ・どこで。この分解で読み書きの負荷が下がる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>入れ子構造には使わない</h4><p>HTML・JSON・CSVは専用パーサへ。正規言語の限界を超えている。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ReDoSを避ける</h4><p>繰り返しの入れ子を書かない。外部入力には長さ制限を設ける。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/theory/formal" tag="情報科学">形式言語</RelatedLink>
            <RelatedLink href="/theory/algorithms/string" tag="情報科学">文字列探索</RelatedLink>
            <RelatedLink href="/os/shell" tag="OS">シェルの系譜</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
