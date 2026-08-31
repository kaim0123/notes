import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "国際化と日時" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>国際化と日時 ― 言語・地域・時間帯を前提から外す</h1>
        <Lead>
          日本語だけのアプリでも、<Term>日時と数値の扱いは必ず問題になります</Term>。海外から使われた瞬間に日付が1日ずれ、集計の締めが合わなくなる ― これは翻訳の話ではなく設計の話です。ここでは国際化の全体像を押さえたうえで、標準の<Term>Intl</Term>、保存と表示の分離、そしてサーバーレンダリングとの噛み合わせを扱います。
        </Lead>
      </Hero>

      <Heading num="01">i18nとl10n ― 何を分けるのか</Heading>
      <table>
        <thead>
          <tr><th>用語</th><th>意味</th><th>誰がやるか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">国際化(i18n)</td><td>言語や地域を差し替えられる構造にすること</td><td>開発者(一度きり)</td></tr>
          <tr><td className="hl">地域化(l10n)</td><td>実際に各言語の文言やデータを用意すること</td><td>翻訳者(言語ごとに継続)</td></tr>
        </tbody>
      </table>

      <p>
        重要なのは、<Term>i18nは後付けが極めて高くつく</Term>という点です。文字列がコード中に直書きされていれば全ファイルを直すことになり、日時をローカル時刻で保存していればデータそのものの移行になります。「いまは日本語だけ」でも、構造だけは最初から用意しておくのが安全です。
      </p>

      <Heading num="02">言語が変わると何が変わるか</Heading>
      <p>
        翻訳だけでは済まない部分が多くあります。ここを知らないと、翻訳ファイルを用意したのに表示が壊れる、ということが起きます。
      </p>

      <table>
        <thead>
          <tr><th>要素</th><th>地域による違い</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">日付</td><td>年月日の順が入れ替わり、区切り文字も変わる</td></tr>
          <tr><td className="hl">数値</td><td><code>1,234.56</code>と<code>1.234,56</code> ― 小数点と桁区切りが逆になる</td></tr>
          <tr><td className="hl">通貨</td><td>記号の位置、小数の桁数(円は0桁、ドルは2桁)</td></tr>
          <tr><td className="hl">複数形</td><td>英語は2形、ロシア語は4形。「1件」「2件」で済むのは日本語だけ</td></tr>
          <tr><td className="hl">並び順</td><td>アルファベット順の規則そのものが言語ごとに違う</td></tr>
          <tr><td className="hl">文字の長さ</td><td>ドイツ語は英語の1.3〜2倍に膨らむ。ボタンからはみ出す</td></tr>
          <tr><td className="hl">書字方向</td><td>アラビア語・ヘブライ語は右から左。レイアウトが左右反転する</td></tr>
        </tbody>
      </table>

      <Heading num="03">文言を外に出す ― キー設計と補間</Heading>
      <p>
        まずコードから文字列を追い出します。文言は言語ごとのファイルに置き、コードからはキーで参照します。
      </p>

      <pre>
        <code>{`// messages/ja.json
{
  "cart": {
    "title": "カート",
    "itemCount": "{count}点の商品",
    "checkout": "レジへ進む"
  }
}

// 使う側
t("cart.itemCount", { count: 3 });  // → "3点の商品"`}</code>
      </pre>

      <p>
        設計上の要点は2つです。1つは<Term>文を分割しないこと</Term>。数値と単位を別々のキーにして連結すると、語順が違う言語で破綻します。文全体を1つのキーにし、変数はプレースホルダとして埋め込みます。
      </p>
      <p>
        もう1つはキーの命名です。日本語の文言そのものをキーにすると、文言を直すたびに全言語のキーが変わります。<code>cart.checkout</code>のように<Term>意味を表すキー</Term>にします。
      </p>

      <Aside label="複数形は自前で書かない">
        「1 item / 2 items」の切り替えを条件分岐で書くと、3形以上を持つ言語に対応できません。<code>Intl.PluralRules</code>や、i18nライブラリのメッセージ記法に判定そのものを任せます。ここは「がんばれば書ける」ではなく「書いてはいけない」種類の処理です。
      </Aside>

      <Heading num="04">Intl ― ライブラリを入れる前に</Heading>
      <p>
        日付や数値の書式は、ブラウザとNode.jsに<Term>標準で入っている</Term><code>Intl</code>で大半が解決します。この用途のために巨大なライブラリを追加する必要はほとんどありません ― <Link href="/frontend/perf">表示速度</Link>の観点でも重要です。
      </p>

      <pre>
        <code>{`const d = new Date("2026-08-08T15:30:00Z");

// 日付 ― ロケールとタイムゾーンを明示する
new Intl.DateTimeFormat("ja-JP", {
  dateStyle: "long", timeStyle: "short", timeZone: "Asia/Tokyo",
}).format(d);                       // → 2026年8月9日 0:30

// 数値・通貨
new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" })
  .format(1234);                    // → ￥1,234

// 相対時間
new Intl.RelativeTimeFormat("ja", { numeric: "auto" })
  .format(-3, "day");               // → 3 日前

// 並び替え(言語ごとの規則に従う)
["さくら", "あんず", "うめ"].sort(new Intl.Collator("ja").compare);`}</code>
      </pre>

      <table>
        <thead>
          <tr><th>API</th><th>用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>Intl.DateTimeFormat</code></td><td>日時の書式。タイムゾーン変換もここで行う</td></tr>
          <tr><td className="hl"><code>Intl.NumberFormat</code></td><td>数値・通貨・パーセント・単位</td></tr>
          <tr><td className="hl"><code>Intl.RelativeTimeFormat</code></td><td>「3日前」「5分後」</td></tr>
          <tr><td className="hl"><code>Intl.PluralRules</code></td><td>複数形の判定</td></tr>
          <tr><td className="hl"><code>Intl.Collator</code></td><td>言語に応じた並び替え・比較</td></tr>
          <tr><td className="hl"><code>Intl.ListFormat</code></td><td>「A、B、C」のような列挙の連結</td></tr>
        </tbody>
      </table>

      <Heading num="05">時刻 ― UTCで保存し、表示だけ現地に直す</Heading>
      <p>
        ここが最も事故が多く、そして原則は単純です。
      </p>

      <DiagramFrame
        slug="frontend-i18n-utc"
        aspect="640 / 280"
        caption="時刻の扱いを層ごとに分けた図。データベースへの保存とAPIでのやり取りは常にUTCの絶対時刻で行い、利用者のタイムゾーンへの変換は表示の直前で1回だけ行う。同じ絶対時刻が、東京では9時間進んだ表示に、ニューヨークでは4時間戻った表示になる。保存側を現地時刻にすると、サーバーの移設やサマータイムで基準そのものが動いてしまう。"
      />

      <table>
        <thead>
          <tr><th>層</th><th>扱い方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">保存(DB)</td><td>常にUTC。タイムゾーン付きの型を使う</td></tr>
          <tr><td className="hl">通信(API)</td><td>ISO 8601のUTC(<code>2026-08-08T15:30:00Z</code>)</td></tr>
          <tr><td className="hl">表示(UI)</td><td>そこで初めて利用者のタイムゾーンに変換する</td></tr>
        </tbody>
      </table>

      <p>
        「日本のサービスだから日本時間で保存する」という判断は、サマータイムのある地域を扱った瞬間に破綻し、サーバーを海外リージョンへ移した瞬間にも破綻します。<Term>保存は絶対時刻、表示は見え方</Term>と割り切ります。
      </p>

      <Aside label="⚠️ 日付の境界">
        「今日の売上」の集計は、タイムゾーンによって範囲が変わります。UTCの8月8日0時は、日本時間では8月8日の午前9時です。<Term>どのタイムゾーンにおける「今日」か</Term>を仕様として決めない限り、集計結果は永遠に食い違います。同じ理由で、誕生日・請求月・営業日のように<strong>時刻を持たない日付</strong>は、日時型ではなく日付そのものとして扱うほうが安全です。
      </Aside>

      <p>
        なお標準の<code>Date</code>は「実行環境のローカルタイムゾーン」で解釈する箇所が多く、扱いを誤りやすいAPIです。任意のタイムゾーンで計算したいなら、<code>Intl.DateTimeFormat</code>の<code>timeZone</code>指定か、新しい<code>Temporal</code>、あるいは軽量な日付ライブラリを使います。
      </p>

      <Heading num="06">ロケールをどう決め、URLにどう出すか</Heading>
      <p>
        利用者の言語を決める材料は複数あり、<Term>優先順位</Term>を決めておく必要があります。
      </p>

      <table>
        <thead>
          <tr><th>優先度</th><th>材料</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1</td><td>URLに含まれるロケール(<code>/ja/products</code>)</td></tr>
          <tr><td className="hl">2</td><td>利用者が明示的に選んだ設定(Cookieに保存)</td></tr>
          <tr><td className="hl">3</td><td><code>Accept-Language</code>ヘッダー(ブラウザの言語設定)</td></tr>
          <tr><td className="hl">4</td><td>既定のロケール</td></tr>
        </tbody>
      </table>

      <p>
        URLにロケールを含める方式が勧められます。理由は<Term>URLだけで表示内容が確定する</Term>からです。共有したリンクが相手の環境で別の言語になったり、検索エンジンが各言語版を別ページと認識できなかったりする問題を避けられます。実装は<Link href="/frontend/nextjs-routing">動的セグメント</Link>で<code>[locale]</code>を切り、入口で判定してリダイレクトする構成が一般的です。
      </p>
      <p>
        あわせて<code>&lt;html lang&gt;</code>を正しく設定します。読み上げソフトが発音を切り替えるために必要で、<Link href="/frontend/ux-a11y">アクセシビリティ</Link>の要件でもあります。
      </p>

      <Heading num="07">サーバーレンダリングとの噛み合わせ</Heading>
      <p>
        サーバー側で描くとき、<Term>サーバーとブラウザでロケールもタイムゾーンも一致しません</Term>。サーバーはUTCで動いており、利用者は東京にいます。同じ書式化が両者で違う文字列を返し、ハイドレーションの不一致になります。
      </p>

      <pre>
        <code>{`// ✗ 環境依存 ― サーバーとクライアントで結果が変わる
new Date(iso).toLocaleString();

// ○ ロケールもタイムゾーンも明示する
new Intl.DateTimeFormat("ja-JP", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: userTimeZone,   // 利用者設定から取得した値
}).format(new Date(iso));`}</code>
      </pre>

      <p>
        原則は<Term>環境の既定に頼らない</Term>ことです。ロケールはURLから、タイムゾーンは利用者設定から取り、書式化には必ず引数で渡します。どうしても端末のタイムゾーンが要る箇所だけ、表示後に描き直します。あわせて<code>&lt;time dateTime&gt;</code>で元の絶対時刻も残しておくと、機械可読な形が失われません。
      </p>

      <Heading num="08">レイアウトへの影響 ― 伸びる文字と反転する画面</Heading>
      <p>
        翻訳すると文字数が変わるため、<Term>固定幅のボタンやタブは高確率で崩れます</Term>。<Link href="/frontend/layout">CSSレイアウト</Link>で見たとおり、幅を固定せず中身に応じて伸びる作りにしておくのが基本です。
      </p>
      <p>
        右から左に読む言語に対応する場合は、<code>left</code>/<code>right</code>ではなく<Term>論理プロパティ</Term>を使います。<code>margin-inline-start</code>は「文の始まる側」を意味するので、左横書きでは左、右横書きでは自動的に右になります。Tailwindの<code>ms-4</code>・<code>me-4</code>がこれに対応します。
      </p>

      <Analogy label="💡 たとえるなら">
        UTCで保存して表示だけ変換するのは、世界の空港がすべてUTCで運航記録を付けているのと同じ発想です。出発地と到着地の時計は違いますが、記録が1つの基準で書かれているからこそ、どの国の管制官も同じ出来事について話せます。掲示板が現地時刻を出すのは、あくまで<strong>表示上の翻訳</strong>にすぎません。各空港が自分の時計で記録していたら、便の前後関係すら分からなくなります。
      </Analogy>

      <Heading num="まとめ">構造だけは最初から用意する</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>文言はキーで参照する</h4>
          <p>文を分割せず、変数はプレースホルダで埋める。キーは意味で名付ける。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>保存はUTC、変換は表示時</h4>
          <p>DBとAPIは絶対時刻。どのタイムゾーンの「今日」かを仕様で決める。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>Intlに任せる</h4>
          <p>書式・複数形・並び順は標準APIで足りる。ロケールとTZは必ず明示する。</p>
        </Card>
      </CardGrid>

      <p>
        文字そのものの表現については<Link href="/theory/encoding">文字コード</Link>が土台になります。Web基礎の配下はここまでです。次の見出し ―
        <Link href="/frontend/styling">スタイリング</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/i18n" />
    </DocsPage>
  );
}
