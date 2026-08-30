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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "フロントエンド監視",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ</Eyebrow>
        <h1>フロントエンド監視 ― ユーザーの画面で本当に速いか</h1>
        <Lead>
          サーバーが200を返し、レスポンスタイムが数ミリ秒でも、ユーザーの画面に中身が出るまで5秒かかっていることがあります。サーバー側の監視だけでは、<Term>ユーザーが実際に体感する速さ</Term>は見えません。フロントエンド監視は、ブラウザ側で起きていることを計測します。
        </Lead>
      </Hero>

      <p><Link href="/infra/monitoring/server">サーバー・機器の監視</Link>や<Link href="/infra/monitoring">アプリケーション側の監視</Link>は、いずれもサーバーの内側を見ています。しかしユーザーが触れるのはブラウザに描画された画面です。ネットワークの遅延、重いスクリプト、描画の詰まり ― これらはサーバーのメトリクスには現れません。視点をブラウザ側に移すのがフロントエンド監視です。</p>

      <Heading num="01">2つのアプローチ ― リアルユーザー監視とシンセティック監視</Heading>
      <p>フロントエンドの速さを測る方法は、大きく2つに分かれます。どちらか一方ではなく、両方を補い合わせて使います。</p>

      <table>
        <thead>
          <tr><th></th><th>リアルユーザー監視(RUM)</th><th>シンセティック監視</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">計測元</td><td>実際のユーザーのブラウザから計測値を送信する</td><td>決まった環境から定期的に合成アクセスして計測する</td></tr>
          <tr><td className="hl">強み</td><td>本物のデバイス・回線・地域の多様性がそのまま反映される</td><td>条件が一定なので基準線が安定し、リグレッションを検知しやすい</td></tr>
          <tr><td className="hl">弱み</td><td>環境がばらつくため、値の変動が自環境由来か判別しづらい</td><td>実ユーザーの多様な環境は再現できない</td></tr>
          <tr><td className="hl">リリース前</td><td>ユーザーが到達しないと計測できない</td><td>ユーザーが1人もいなくても計測できる(公開前の検証も可能)</td></tr>
        </tbody>
      </table>
      <p>RUMは「現実に何が起きているか」を、シンセティック監視は「同じ条件でどう変化したか」を教えてくれます。シンセティック監視は<Link href="/infra/monitoring">監視・保守</Link>で触れた外形監視(ヘルスチェック)と地続きで、応答の有無だけでなく描画の速さまで踏み込んだものと捉えられます。</p>

      <Heading num="02">なぜ表示が遅くなるのか ― DOMとスクリプトの同期ロード</Heading>
      <p>フロントエンドが遅くなる典型的な原因を理解するには、ブラウザがページを組み立てる手順を知る必要があります。</p>
      <p>ブラウザはHTMLを上から順に読み、<Term>DOM</Term>という文書構造へパースしていきます。このパースの途中で<code>&lt;script&gt;</code>タグに遭遇すると、デフォルトでは<Term>DOMのパースを一旦停止</Term>します。そしてスクリプトをリクエストするHTTPコネクションが張られ、スクリプトがダウンロードされ、実行され、その完了を待ってからDOMのパースが再開されます。</p>

      <Diagram caption="同期スクリプトはDOMのパースを止める ― ダウンロードと実行が終わるまで描画が待たされる">
        <svg viewBox="0 0 560 140" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={40} width={110} height={32} rx={5} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={75} y={60} fill="#f2f2f2" fontSize="12" textAnchor="middle">DOMパース</text>

          <rect x={150} y={40} width={150} height={32} rx={5} fill="none" stroke="#ffb43c" strokeWidth="1.5" />
          <text x={225} y={56} fill="#ffb43c" fontSize="11" textAnchor="middle">スクリプト</text>
          <text x={225} y={68} fill="#ffb43c" fontSize="11" textAnchor="middle">DL・実行(停止)</text>

          <rect x={320} y={40} width={110} height={32} rx={5} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={375} y={60} fill="#f2f2f2" fontSize="12" textAnchor="middle">パース再開</text>

          <line x1={130} y1={56} x2={150} y2={56} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={300} y1={56} x2={320} y2={56} stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={225} y={100} fill="#9a9a9a" fontSize="11" textAnchor="middle">この間、画面は先に進めない</text>
        </svg>
      </Diagram>

      <p>だから重いスクリプトを<code>&lt;head&gt;</code>に無防備に置くと、その分だけ本文の表示が後ろにずれます。これを避けるために、スクリプトの読み込みをパースと並行させる<code>async</code>や、パース完了後まで実行を遅らせる<code>defer</code>といった属性があります。フロントエンドが遅い原因の多くは、この同期ロードの詰まりに行き着きます。関連する仕組みは<Link href="/dev/frontend/web-basics">Web基礎</Link>や<Link href="/dev/runtime">ランタイム</Link>でも扱っています。</p>

      <Heading num="03">表示の速さを数値化する ― Navigation Timing API</Heading>
      <p>「遅い」を感覚でなく数値で語るために、ブラウザはページ読み込みの各段階のタイムスタンプを記録しています。これを取得するのが<Term>Navigation Timing API</Term>です。</p>

      <table>
        <thead>
          <tr><th>タイミング</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">navigationStart</td><td>ブラウザによってページリクエストが開始されたタイミング(すべての起点)</td></tr>
          <tr><td className="hl">domLoading</td><td>DOMのパースとロードが始まったタイミング</td></tr>
          <tr><td className="hl">domInteractive</td><td>ページが操作可能になったと考えられるタイミング</td></tr>
          <tr><td className="hl">domContentLoaded</td><td>(遅延なしの)すべてのスクリプトが実行されたタイミング</td></tr>
          <tr><td className="hl">domComplete</td><td>ページがすべてのロードを終えたタイミング</td></tr>
        </tbody>
      </table>
      <p>これらは単独の値というより、<Term>差分を取ることで意味が出ます</Term>。navigationStartからdomInteractiveまでが「触れるようになるまでの時間」、domInteractiveからdomCompleteまでが「残りのリソース読み込みにかかった時間」というように、遅さがどの段階に潜んでいるかを分解できます。</p>

      <Aside label="豆知識">
        近年はNavigation Timingの生の値に加え、ユーザー体感に寄せたCore Web Vitals(LCP=主要コンテンツの表示、INP=操作への反応、CLS=レイアウトのガタつき)が指標として重視されます。いずれも「サーバーが返すまで」ではなく「ユーザーの画面でどうか」を測る発想は共通です。
      </Aside>

      <Heading num="04">計測を仕込む ― analytics.jsとRUMツール</Heading>
      <p>RUMを実現するには、各ユーザーのブラウザで計測値を集めて収集サーバーへ送る仕組みが要ります。古くから使われる<Term>analytics.js</Term>のような計測スニペットをページに埋め込むと、Navigation Timingの値やユーザーの行動が自動で収集サーバーに送られます。</p>
      <p>ここで重要なのは、<Term>監視のためのコードがページを遅くしては本末転倒</Term>だという点です。計測スニペット自体はまさに前述の同期ロード問題を避け、非同期(async)で読み込み、送信もページ描画を妨げないタイミングで行うのが定石です。集めた値は<Link href="/infra/monitoring/data">監視データと統計</Link>で見たように、平均だけでなく分位数(p95/p99)で「大多数」と「最悪のユーザー」を分けて評価します。</p>

      <Analogy label="💡 たとえるなら">
        サーバー側の監視が「厨房が注文をさばく速さ」を測るものだとすれば、フロントエンド監視は「料理が客のテーブルに届き、実際に食べ始められるまでの速さ」を測るものです。厨房がどれだけ速くても、配膳の動線が詰まっていれば客の体感は遅い。しかも客の席(デバイス・回線)はバラバラなので、実際の客から声を集める(RUM)のと、覆面調査員が定点観測する(シンセティック)の両方が要ります。
      </Analogy>

      <Heading num="まとめ">ユーザー側から速さを測る</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>RUMとシンセティックを併用する</h4><p>実ユーザーの多様性(RUM)と、安定した基準線でのリグレッション検知(シンセティック)を補い合わせる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>同期スクリプトの詰まりを疑う</h4><p>DOMのパースを止めるスクリプトが遅さの主因になりやすい。async/deferで並行化する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>段階の差分で分解する</h4><p>Navigation Timingの各タイムスタンプの差分を取り、どの段階で時間を食っているかを特定する。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/infra/monitoring" tag="インフラ">監視・保守</RelatedLink>
            <RelatedLink href="/infra/monitoring/data" tag="インフラ">監視データと統計</RelatedLink>
            <RelatedLink href="/dev/frontend/web-basics" tag="実装">Web基礎</RelatedLink>
            <RelatedLink href="/ops/performance" tag="サービス運営">パフォーマンス</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
