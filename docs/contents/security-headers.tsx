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
  title: "セキュリティヘッダ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>セキュリティヘッダ ― 配信の入口で守る</h1>
        <Lead>
          アプリのコードを1行も変えなくても、サーバーが返すHTTPレスポンスに数行の<Term>ヘッダ</Term>を足すだけで、<Link href="/security/xss">XSS</Link>やクリックジャッキングの被害を大きく減らせます。しかも、この設定はアプリの中ではなく<strong>配信するホスティング側</strong>に書くのが基本です。静的サイトほど、この「配信の入口での防御」が主役になります。
        </Lead>
      </Hero>

      <p>これまでのページで見てきた入力検証や出力エスケープは、いわば「アプリ本体の中の防御」でした。それに対してセキュリティヘッダは、アプリが返すレスポンスに付けてブラウザに「このページはこう扱ってほしい」と指示する、<strong>ブラウザ側に効かせる防御</strong>です。多層防御(<Link href="/security">セキュリティ概要</Link>)のもう一枚の壁として重ねます。</p>

      <Heading num="01">なぜ「ホスティング側」なのか</Heading>
      <p>セキュリティヘッダは、リクエストごとにレスポンスへ差し込む必要があります。動的なサーバーがあればアプリのコードで付けられますが、<Term>静的サイト</Term>(あらかじめHTML/CSS/JSに書き出して、ファイルをそのまま配るだけのサイト)には、リクエストを処理する自前のサーバーコードがありません。ではどこが差し込むのか ―
      ファイルを配信している<strong>ホスティング/CDNのレイヤー</strong>です。</p>

      <Analogy label="💡 たとえるなら">
        静的サイトは「印刷済みのチラシを封筒に入れて配る」ようなものです。チラシ(HTML)自体は刷り上がっていて中身は変えられませんが、封筒の表面(HTTPヘッダ)に「取扱注意」「開封は本人のみ」といったスタンプを押すことはできます。このスタンプを押すのは、チラシを書いた人ではなく、封筒を配る配送業者(ホスティング/CDN)の仕事です。
      </Analogy>

      <Aside label="Next.jsの静的エクスポートでの注意">
        Next.jsには<code>next.config</code>で<code>headers()</code>を定義する仕組みがありますが、これは動作するサーバー(<code>next start</code>やサーバーレス)がある場合に効くものです。<code>output: &quot;export&quot;</code>で静的HTMLに書き出す構成では<code>headers()</code>は無視されるため、ヘッダは必ず配信先(Vercel・Netlify・CloudFrontなど)側で設定します。
      </Aside>

      <Diagram caption="静的サイトでは、ヘッダを差し込むのは配信レイヤー(ホスティング/CDN)">
        <svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={70} width={130} height={60} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={85} y={95} fill="#f2f2f2" fontSize="13" textAnchor="middle">ビルド成果物</text>
          <text x={85} y={113} fill="#9a9a9a" fontSize="11" textAnchor="middle">HTML/CSS/JS</text>

          <rect x={255} y={60} width={150} height={80} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={330} y={90} fill="#f2f2f2" fontSize="13" textAnchor="middle">ホスティング/CDN</text>
          <text x={330} y={110} fill="#39ff6a" fontSize="11" textAnchor="middle">ここでヘッダを付与</text>
          <text x={330} y={126} fill="#9a9a9a" fontSize="11" textAnchor="middle">CSP・HSTS など</text>

          <rect x={500} y={70} width={120} height={60} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={560} y={95} fill="#f2f2f2" fontSize="13" textAnchor="middle">ブラウザ</text>
          <text x={560} y={113} fill="#9a9a9a" fontSize="11" textAnchor="middle">ヘッダに従う</text>

          <line x1={150} y1={100} x2={253} y2={100} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowH)" />
          <line x1={405} y1={100} x2={498} y2={100} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowH)" />

          <defs>
            <marker id="arrowH" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>

      <Heading num="02">まず入れておきたい主要ヘッダ</Heading>
      <p>数あるヘッダの中でも、まず優先して設定したいのが次の5つです。どれも「ブラウザにこう振る舞ってほしい」という宣言です。</p>

      <table>
        <thead>
          <tr><th>ヘッダ</th><th>防ぐもの</th><th>ざっくり何を指示するか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Content-Security-Policy</td><td>XSS・不正なスクリプト読込</td><td>「このページで読み込んで実行してよいスクリプト・画像・通信先はここだけ」と出所を制限する</td></tr>
          <tr><td className="hl">Strict-Transport-Security</td><td>HTTPへの盗聴・改ざん</td><td>「今後このサイトへは必ずHTTPSで来い」とブラウザに覚えさせる(HSTS)</td></tr>
          <tr><td className="hl">X-Frame-Options</td><td>クリックジャッキング</td><td>「このページを他サイトの&lt;iframe&gt;に埋め込むな」と拒否する</td></tr>
          <tr><td className="hl">X-Content-Type-Options</td><td>MIMEタイプの推測誤り</td><td>「Content-Typeを推測せず、宣言どおりに扱え(nosniff)」と指示する</td></tr>
          <tr><td className="hl">Referrer-Policy</td><td>URL経由の情報漏れ</td><td>「他サイトへ遷移するとき、どこまでの参照元URLを送ってよいか」を絞る</td></tr>
        </tbody>
      </table>

      <h3>CSP ― 最も強力で、最も設定が難しい</h3>
      <p><Term>Content-Security-Policy(CSP)</Term>は、<Link href="/security/xss">XSSのページ</Link>でも「多層防御の一枚」として登場しました。「スクリプトの出所」をブラウザに教えておくことで、万一XSSでスクリプトが注入されても、許可していない出所のものは<strong>ブラウザが実行を拒否</strong>します。エスケープ漏れが起きても、もう一段階で食い止める保険です。ただし、外部のスクリプトやスタイルを使っていると許可リストの調整が必要で、厳しくしすぎると自分のサイトの機能まで止まってしまうため、設定難度は高めです。まずは<code>frame-ancestors</code>(埋め込み制限)や<code>default-src</code>から段階的に絞っていくのが現実的です。</p>

      <Aside label="X-Frame-Options と CSP の関係">
        埋め込み拒否は、古くからある<code>X-Frame-Options: DENY</code>と、CSPの<code>frame-ancestors &apos;none&apos;</code>のどちらでも指定できます。新しいブラウザではCSPの<code>frame-ancestors</code>が優先されますが、両方入れておくと古い環境も含めて広くカバーできます。
      </Aside>

      <h3>HSTS ― 「次からは必ずHTTPS」の記憶</h3>
      <p><Term>HSTS(HTTP Strict Transport Security)</Term>は、一度アクセスしたブラウザに「このサイトは以後HTTPSでしか繋がない」と覚えさせるヘッダです。最初のうっかりHTTP接続で盗聴・改ざんされる隙(中間者攻撃)を塞ぎます。<strong>HTTPSで配信できている場合にだけ</strong>付けてください。HTTPしか用意していないサイトに付けると、ブラウザが繋げなくなります。</p>

      <Heading num="03">どこに書くか ― 配信先ごとの設定場所</Heading>
      <p>「ホスティング側に書く」と言っても、書く場所はサービスごとに違います。代表的な配信先での置き場所は次の通りです。</p>

      <table>
        <thead>
          <tr><th>配信先</th><th>設定を書く場所</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Vercel</td><td>プロジェクト直下の<code>vercel.json</code>の<code>headers</code>フィールド</td></tr>
          <tr><td className="hl">Netlify / Cloudflare Pages</td><td>公開ディレクトリに置く<code>_headers</code>ファイル(またはNetlifyは<code>netlify.toml</code>)</td></tr>
          <tr><td className="hl">AWS CloudFront</td><td><Term>レスポンスヘッダポリシー</Term>(Response Headers Policy)をディストリビューションに割り当てる</td></tr>
          <tr><td className="hl">Nginx / Apache</td><td>サーバー設定ファイルの<code>add_header</code> / <code>Header set</code></td></tr>
        </tbody>
      </table>

      <p>下は<strong>Vercel(<code>vercel.json</code>)</strong>で最小構成のヘッダを付ける例です。書き方はサービスごとに違いますが、「パスにマッチさせて、キーと値のヘッダを列挙する」という考え方はどこも共通です。</p>

      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; frame-ancestors 'none'"
        }
      ]
    }
  ]
}`}</code>
      </pre>

      <Aside label="補足">
        上のCSPは最小例です。実際のサイトで外部フォントや解析スクリプトを読み込んでいる場合、そのままだと止まってしまうことがあります。CSPは<strong>まず緩めに入れて、ブラウザのコンソールに出る違反レポートを見ながら段階的に締める</strong>のが安全です。<code>Content-Security-Policy-Report-Only</code>を使えば、実際にブロックせず「もし適用したら何が止まるか」だけを先に確認できます。
      </Aside>

      <Heading num="04">効いているか確認する</Heading>
      <p>設定したら、本当にヘッダが返っているかを必ず確かめます。手元では次のように確認できます。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ブラウザの開発者ツール</h4>
          <p>Networkタブでトップページのリクエストを選び、Response Headersに設定した値が並んでいるかを見る。CSP違反があればConsoleに赤いエラーとして出る。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>コマンドで確認</h4>
          <p><code>curl -I https://例のURL</code>でレスポンスヘッダだけを表示し、目視で確認する。CDNのキャッシュ更新には少し時間がかかることがある。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>診断サイトで採点</h4>
          <p>公開後は、ヘッダ構成を採点してくれる外部の診断サービス(securityheaders.com など)に通すと、抜けや弱い設定に気づきやすい。</p>
        </Card>
      </CardGrid>

      <Heading num="まとめ">封筒にスタンプを押す</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>静的サイトの防御は配信レイヤーで</h4>
          <p>サーバーコードがない静的サイトでは、ヘッダはホスティング/CDN側に書く。Next.jsの静的エクスポートでは<code>next.config</code>の<code>headers()</code>は効かない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>まずは5つから</h4>
          <p>CSP・HSTS・X-Frame-Options・X-Content-Type-Options・Referrer-Policyを入れておくだけで、代表的な攻撃面をまとめて塞げる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>CSPは段階的に、確認は必ず</h4>
          <p>CSPはReport-Onlyで慣らしてから締める。設定後はブラウザや診断サイトで、実際にヘッダが返っているかを確かめる。</p>
        </Card>
      </CardGrid>

      <p>セキュリティヘッダはあくまで「もう一枚の壁」です。<Link href="/security/xss">出力エスケープ</Link>のような根本対策を土台にしたうえで重ねてこそ、多層防御になります。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/xss" tag="セキュリティ">XSSと出力エスケープ</RelatedLink>
                    <RelatedLink href="/security/network-defense" tag="セキュリティ">ネットワーク層の防御</RelatedLink>
                    <RelatedLink href="/network/applications/web" tag="インターネット">Webの仕組み</RelatedLink>
                    <RelatedLink href="/ops/deploy" tag="サービス運営">公開先とデプロイ経路</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
