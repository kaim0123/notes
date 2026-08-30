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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "国際化と日時",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>国際化と日時 ― 言語・地域・時間帯を前提から外す</h1>
        <Lead>
          日本語だけのアプリでも、<strong>日時と数値の扱いは必ず問題になります</strong>。海外から使われた瞬間に日付が1日ずれ、集計の締めが合わなくなる ― これは翻訳の話ではなく、<Term>タイムゾーン</Term>の設計の話です。ここでは<Term>i18n</Term>の全体像を押さえたうえで、標準の<Term>Intl</Term> API、時刻の保存と表示の分離、そしてサーバーレンダリングとの噛み合わせを扱います。
        </Lead>
      </Hero>

      <Heading num="01">i18nとl10n ― 何を分けるのか</Heading>
      <table>
        <thead>
          <tr><th>用語</th><th>意味</th><th>誰がやるか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Term>国際化(i18n)</Term></td><td>言語や地域を<strong>差し替えられる構造</strong>にすること</td><td>開発者(一度きり)</td></tr>
          <tr><td className="hl"><Term>地域化(l10n)</Term></td><td>実際に各言語の文言やデータを用意すること</td><td>翻訳者(言語ごとに継続)</td></tr>
        </tbody>
      </table>
      <p>重要なのは、<strong>i18nは後付けが極めて高くつく</strong>という点です。文字列がコード中に直書きされていれば全ファイルを直す必要があり、日時をローカル時刻で保存していればデータそのものを移行することになります。「いまは日本語だけ」でも、<strong>構造だけは最初から用意しておく</strong>のが安全です。</p>

      <Heading num="02">言語が変わると何が変わるか</Heading>
      <p>翻訳だけでは済まない部分が多くあります。ここを知らないと、翻訳ファイルを用意したのに表示が壊れる、ということが起きます。</p>
      <table>
        <thead>
          <tr><th>要素</th><th>地域による違い</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">日付</td><td><code>2026/08/08</code> / <code>08/08/2026</code> / <code>08.08.2026</code>(月日の順が逆になる)</td></tr>
          <tr><td className="hl">数値</td><td><code>1,234.56</code> と <code>1.234,56</code>(小数点と桁区切りが入れ替わる)</td></tr>
          <tr><td className="hl">通貨</td><td>記号の位置、小数の桁数(円は0桁、ドルは2桁)</td></tr>
          <tr><td className="hl">複数形</td><td>英語は2形、ロシア語は4形。「1件」「2件」で済むのは日本語だけ</td></tr>
          <tr><td className="hl">並び順</td><td>アルファベット順の規則は言語ごとに違う</td></tr>
          <tr><td className="hl">文字の長さ</td><td>ドイツ語は英語の1.3〜2倍に膨らむ。ボタンからはみ出す</td></tr>
          <tr><td className="hl">書字方向</td><td>アラビア語・ヘブライ語は右から左(RTL)。レイアウトが左右反転する</td></tr>
        </tbody>
      </table>

      <Heading num="03">文言を外に出す ― キー設計と補間</Heading>
      <p>まず、コードから文字列を追い出します。文言は言語ごとのファイルに置き、コードからはキーで参照します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
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
      <p>設計上の要点は2つです。1つは<strong>文を分割しないこと</strong>。「<code>{"{"}count{"}"}件</code>」を「<code>{"{"}count{"}"}</code>」+「件」のように分けて連結すると、語順が違う言語で破綻します。文全体を1つのキーにし、変数は<strong>プレースホルダとして埋め込みます</strong>。</p>
      <p>もう1つはキーの命名です。<code>&quot;レジへ進む&quot;</code>という日本語をそのままキーにすると、文言を修正するたびに全言語のキーが変わってしまいます。<code>cart.checkout</code>のような<strong>意味を表すキー</strong>にします。</p>
      <Aside label="複数形は自前で書かない">
        「1 item / 2 items」の切り替えを<code>count === 1 ? ... : ...</code>と書くと、3形以上を持つ言語に対応できません。<code>Intl.PluralRules</code>や、i18nライブラリのICU MessageFormat記法(<code>{"{count, plural, one {# item} other {# items}}"}</code>)に任せます。
      </Aside>

      <Heading num="04">Intl ― ライブラリを入れる前に</Heading>
      <p>日付や数値の書式は、<strong>ブラウザとNode.jsに標準で入っている</strong><code>Intl</code>で大半が解決します。この用途のために巨大なライブラリを追加する必要はほとんどありません(<Link href="/dev/frontend/perf">表示速度</Link>の観点でも重要です)。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
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
          <tr><td className="hl"><code>Intl.DateTimeFormat</code></td><td>日時の書式。<strong>タイムゾーン変換もここで行う</strong></td></tr>
          <tr><td className="hl"><code>Intl.NumberFormat</code></td><td>数値・通貨・パーセント・単位</td></tr>
          <tr><td className="hl"><code>Intl.RelativeTimeFormat</code></td><td>「3日前」「5分後」</td></tr>
          <tr><td className="hl"><code>Intl.PluralRules</code></td><td>複数形の判定</td></tr>
          <tr><td className="hl"><code>Intl.Collator</code></td><td>言語に応じた並び替え・比較</td></tr>
          <tr><td className="hl"><code>Intl.ListFormat</code></td><td>「A、B、C」のような列挙の連結</td></tr>
        </tbody>
      </table>

      <Heading num="05">時刻 ― UTCで保存し、表示だけ現地に直す</Heading>
      <p>ここが最も事故が多く、そして原則は単純です。</p>
      <table>
        <thead>
          <tr><th>層</th><th>扱い方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">保存(DB)</td><td><strong>常にUTC</strong>。<code>timestamptz</code>のようなタイムゾーン付き型を使う</td></tr>
          <tr><td className="hl">通信(API)</td><td><strong>ISO 8601のUTC</strong>(<code>2026-08-08T15:30:00Z</code>)</td></tr>
          <tr><td className="hl">表示(UI)</td><td>そこで初めて利用者のタイムゾーンに変換する</td></tr>
        </tbody>
      </table>
      <p>「日本のサービスだから日本時間で保存する」という判断は、サマータイムのある地域を扱った瞬間に破綻し、サーバーを海外リージョンへ移した瞬間にも破綻します。<strong>保存は絶対時刻、表示は相対的な見え方</strong>と割り切ります。</p>
      <Aside label="⚠️ 日付の境界">
        「今日の売上」の集計は、タイムゾーンによって範囲が変わります。UTCで<code>2026-08-08</code>の0時は、日本時間では8月8日の午前9時です。<strong>どのタイムゾーンにおける『今日』か</strong>を仕様として決めない限り、集計結果は永遠に食い違います。同じ理由で、「誕生日」「請求月」「営業日」のように<strong>時刻を持たない日付</strong>は、<code>Date</code>ではなく<code>2026-08-08</code>という文字列(あるいは日付専用型)で扱う方が安全です。
      </Aside>
      <p>なお、標準の<code>Date</code>は「実行環境のローカルタイムゾーン」で解釈する箇所が多く、扱いを誤りやすいAPIです。任意のタイムゾーンで計算したい場合は、<code>Intl.DateTimeFormat</code>の<code>timeZone</code>指定か、新しい<code>Temporal</code> API、あるいは軽量な日付ライブラリを使います。</p>

      <Heading num="06">ロケールをどう決め、URLにどう出すか</Heading>
      <p>利用者の言語を決める材料は複数あり、<strong>優先順位</strong>を決めておく必要があります。</p>
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
      <p>URLにロケールを含める(<code>/ja/...</code> <code>/en/...</code>)方式が推奨されます。理由は、<strong>URLだけで表示内容が確定する</strong>からです。共有されたリンクが相手の環境で別の言語になったり、検索エンジンが各言語版を別ページとして認識できなかったりする問題を避けられます。</p>
      <p>実装面では、<Link href="/dev/frontend/nextjs/routing">動的セグメント</Link>として<code>app/[locale]/...</code>を切り、リクエストの入口(Proxy)で言語を判定してリダイレクトする構成が一般的です。あわせて<code>&lt;html lang=&quot;ja&quot;&gt;</code>を正しく設定します ― これは読み上げソフトが発音を切り替えるために必要で、<Link href="/dev/frontend/a11y">アクセシビリティ</Link>の要件でもあります。</p>

      <Heading num="07">サーバーレンダリングとの噛み合わせ</Heading>
      <p>SSRでは、<strong>サーバーとブラウザでロケールとタイムゾーンが一致しません</strong>。サーバーはUTCで動いており、利用者は東京にいます。同じ<code>toLocaleString()</code>が両者で違う文字列を返し、<Term>ハイドレーションの不一致</Term>になります。</p>
      <table>
        <thead>
          <tr><th>方針</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">明示する</td><td>書式化には<strong>必ずロケールとタイムゾーンを引数で渡す</strong>。環境の既定に頼らない</td></tr>
          <tr><td className="hl">サーバーで確定させる</td><td>ロケールはURLから、タイムゾーンは利用者設定(Cookie)から取る</td></tr>
          <tr><td className="hl">クライアントに委ねる</td><td>どうしても端末のタイムゾーンが要るなら、マウント後に描き直す</td></tr>
          <tr><td className="hl">機械可読な形も残す</td><td><code>&lt;time dateTime=&quot;2026-08-08T15:30:00Z&quot;&gt;</code>で元の値を保持する</td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// ✗ 環境依存 ― サーバーとクライアントで結果が変わる
new Date(iso).toLocaleString();

// ○ ロケールもタイムゾーンも明示する
new Intl.DateTimeFormat("ja-JP", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: userTimeZone,   // 利用者設定から取得した値
}).format(new Date(iso));`}</code>
      </pre>

      <Heading num="08">レイアウトへの影響 ― 伸びる文字と反転する画面</Heading>
      <p>最後にCSSの話です。翻訳すると文字数が変わるため、<strong>固定幅のボタンやタブは高確率で崩れます</strong>。<Link href="/dev/frontend/layout">CSSレイアウト</Link>で見たとおり、幅を固定せず中身に応じて伸びる作りにしておくのが基本です。</p>
      <p>RTL(右から左)言語に対応する場合は、<code>left</code>/<code>right</code>ではなく<Term>論理プロパティ</Term>を使います。<code>margin-inline-start</code>は「文の始まる側」を意味するため、LTRでは左、RTLでは自動的に右になります。Tailwindの<code>ms-4</code> / <code>me-4</code>(<code>ml-4</code>ではなく)がこれに対応します。</p>

      <Analogy label="💡 たとえるなら">
        UTCで保存して表示だけ変換するのは、世界の空港が<strong>すべてUTCで運航記録を付けている</strong>のと同じ発想です。出発地の時計と到着地の時計は違いますが、記録が1つの基準で書かれているからこそ、どの国の管制官も同じ出来事について話せます。各空港の掲示板が現地時刻を出すのは、あくまで<strong>表示上の翻訳</strong>にすぎません。もし各空港が自分の時計で記録を残していたら、便の前後関係すら分からなくなります。
      </Analogy>

      <Heading num="まとめ">構造だけは最初から用意する</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>文言はキーで参照する</h4><p>文を分割せず、変数はプレースホルダで埋める。キーは意味で名付ける。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>保存はUTC、変換は表示時</h4><p>DBとAPIは絶対時刻。どのタイムゾーンの「今日」かを仕様で決める。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Intlに任せる</h4><p>書式・複数形・並び順は標準APIで足りる。ロケールとTZは必ず明示する。</p></Card>
      </CardGrid>
      <p>これでフロントエンド側は一通り揃いました。次は<Link href="/dev/backend">バックエンド</Link>へ移り、まずAPIの内部構造をどう組み立てるかを見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/theory/encoding" tag="情報科学">文字コード</RelatedLink>
            <RelatedLink href="/dev/frontend/a11y" tag="フロントエンド">アクセシビリティ実装</RelatedLink>
            <RelatedLink href="/database/physical" tag="データベース">物理設計と運用</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
