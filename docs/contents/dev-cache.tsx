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
  title: "キャッシュの全体像",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>キャッシュの全体像 ― 名前は同じでも、動く場所も目的も違う</h1>
        <Lead>
          「<Link href="/computer/memory">メモリの仕組み</Link>」ではCPUの<Term>キャッシュメモリ</Term>を、「<Link href="/network/applications/web">Webの仕組み</Link>」ではDNSの問い合わせ結果を、「<Link href="/network/applications">アプリケーション層</Link>」では<code>Cache-Control</code>ヘッダを、それぞれ見てきました。実は「キャッシュ」という同じ言葉が、1台のコンピュータの内部からインターネットの向こう側まで、何段階にもわたって登場します。このページでは、それらを1枚の地図として整理します。
        </Lead>
      </Hero>

      <Heading num="01">キャッシュ = 「使い回し」という共通の発想</Heading>
      <p>場所や規模が変わっても、キャッシュの定義はいつも同じです。<strong>一度作った・調べた結果を保存しておき、次回は同じ処理をやり直さずに、保存済みの結果をそのまま使い回す</strong>。これだけです。ただし「何を」「どこで」「誰の代わりに」使い回すかは層によって大きく異なるため、初めて聞いたときは別々の技術に見えてしまいます。まずは全体を大きく2つの軸に分けて見てみましょう。</p>

      <Heading num="02">軸1: 1台のコンピュータの「内部」にあるキャッシュ</Heading>
      <p>「<Link href="/computer/memory">メモリの仕組み</Link>」で見た<Term>記憶階層</Term>そのものが、実はキャッシュの階層でもあります。CPUに近いほど速いが容量が小さく、遠いほど遅いが容量が大きいという構造の中で、各段階が1つ手前の段階の「キャッシュ」として働いています。</p>
      <table>
        <tbody>
          <tr><th>層</th><th>何のキャッシュか</th></tr>
          <tr><td className="hl">CPUキャッシュ(L1/L2/L3)</td><td>RAMの中でよく使うデータを、CPUの手元に置いておく</td></tr>
          <tr><td className="hl">RAM(メモリ)</td><td>ストレージ(SSD/HDD)の中で今使っているデータを、電源が入っている間だけ手元に置いておく</td></tr>
          <tr><td className="hl">OS・アプリのキャッシュ</td><td>一度読み込んだファイルの中身を、RAM上に残しておいて次回の読み込みを省略する</td></tr>
        </tbody>
      </table>
      <p>詳しい仕組みや、なぜ段階を分ける必要があるのかは「<Link href="/computer/memory">メモリの仕組み</Link>」で扱った通りです。</p>

      <Heading num="03">軸2: リクエストが通る「経路上」にあるキャッシュ</Heading>
      <p>ここからが、このページで新しく整理する内容です。ブラウザでURLにアクセスしてから応答が返るまでの経路上にも、いくつものキャッシュが並んでいます。</p>

      <Diagram caption="リクエストが通る経路上には、段階ごとに別々のキャッシュがある">
        <svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={30} width={130} height={48} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={85} y={55} fill="#f2f2f2" fontSize="13" textAnchor="middle">ブラウザ</text>
          <text x={85} y={70} fill="#9a9a9a" fontSize="10" textAnchor="middle">画像・CSS・JS</text>

          <rect x={195} y={30} width={130} height={48} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={260} y={55} fill="#f2f2f2" fontSize="13" textAnchor="middle">CDN・プロキシ</text>
          <text x={260} y={70} fill="#9a9a9a" fontSize="10" textAnchor="middle">静的コンテンツ(共有)</text>

          <rect x={370} y={30} width={130} height={48} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={435} y={55} fill="#f2f2f2" fontSize="13" textAnchor="middle">Webサーバー</text>
          <text x={435} y={70} fill="#9a9a9a" fontSize="10" textAnchor="middle">生成済みの画面断片</text>

          <rect x={545} y={30} width={115} height={48} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={602} y={55} fill="#f2f2f2" fontSize="13" textAnchor="middle">データベース</text>
          <text x={602} y={70} fill="#9a9a9a" fontSize="10" textAnchor="middle">よく使う行・結果</text>

          <line x1={150} y1={54} x2={193} y2={54} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowCache)" />
          <line x1={325} y1={54} x2={368} y2={54} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowCache)" />
          <line x1={500} y1={54} x2={543} y2={54} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowCache)" />

          <rect x={20} y={140} width={200} height={40} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
          <text x={120} y={164} fill="#9a9a9a" fontSize="11" textAnchor="middle">DNSキャッシュ(名前→IP)</text>
          <line x1={120} y1={140} x2={85} y2={80} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="3 3" />

          <text x={85} y={215} fill="#9a9a9a" fontSize="11" textAnchor="middle">個人専用</text>
          <text x={260} y={215} fill="#ff9a4d" fontSize="11" textAnchor="middle">複数人で共有</text>
          <text x={435} y={215} fill="#ff9a4d" fontSize="11" textAnchor="middle">複数人で共有</text>
          <text x={602} y={215} fill="#9a9a9a" fontSize="11" textAnchor="middle">サーバー内部</text>

          <text x={340} y={245} fill="#9a9a9a" fontSize="11" textAnchor="middle">右に行くほど、より多くの利用者の分をまとめて使い回している</text>

          <defs>
            <marker id="arrowCache" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>

      <h3>ブラウザキャッシュ ― 自分専用の手元の保存棚</h3>
      <p>一度読み込んだ画像・CSS・JavaScriptファイルなどを、自分のブラウザの中に保存しておく仕組みです。同じサイトに再訪問したとき、サーバーへ取りに行かずに済むため表示が速くなります。どれくらいの期間保存してよいかは、サーバーが返す<code>Cache-Control</code>ヘッダで指示します(詳しくは「<Link href="/network/applications">アプリケーション層</Link>」)。</p>

      <h3>DNSキャッシュ ― 一度調べた住所を覚えておく</h3>
      <p>「<Link href="/network/applications/web">Webの仕組み</Link>」で見た通り、ホスト名からIPアドレスへの変換結果を一定時間覚えておくキャッシュです。ブラウザ自身や、その先のOS・DNSサーバーなど、複数の場所で行われています。</p>

      <h3>CDN・プロキシキャッシュ ― みんなで使う共有の棚</h3>
      <p><Term>CDN</Term>や<Term>プロキシ</Term>は、サーバーとブラウザの間に立つ共有インフラです。多数の利用者から同じファイルへのリクエストが来ることを見越して、サーバーに問い合わせる前にそこで応答を返してしまいます。ブラウザキャッシュと違い、<strong>複数の利用者で共有</strong>される点が重要です。</p>

      <h3>Webサーバーキャッシュ ― 作るのに時間がかかる画面を覚えておく</h3>
      <p>サーバー側のアプリケーションが、一度組み立てたHTMLの断片や計算結果を、次のリクエストのために保存しておく仕組みです。データベースへの問い合わせや複雑な計算を毎回やり直さずに済みます。</p>

      <h3>データベースキャッシュ ― よく使う行を手元に置いておく</h3>
      <p>データベース自身も内部に<Term>バッファプール</Term>と呼ばれる仕組みを持ち、よくアクセスされる行やインデックスをメモリ上に置いておきます。ディスクへ毎回読みに行くよりずっと高速です。</p>

      <Analogy label="💡 たとえるなら">
        ブラウザキャッシュは「自分の机の引き出し」。CDN・プロキシは「町内の共有倉庫」。Webサーバーキャッシュは「お店の厨房で作り置きしておく総菜」。データベースキャッシュは「倉庫の中でも、店員が一番手前に並べているよく出る商品」です。手前にあるものほど早く出せますが、共有の棚に個人宛のものを置いてはいけない、という注意点は場所によって変わります。
      </Analogy>

      <Heading num="04">「共有か、専用か」が一番大事な軸</Heading>
      <p>種類の多さより大事なのは、そのキャッシュが<strong>自分専用</strong>か<strong>複数人で共有</strong>されているかです。ブラウザキャッシュは自分専用なので、自分のログイン情報を保存していても問題になりにくいですが、CDN・プロキシ・Webサーバーキャッシュのような共有インフラに個人向けの応答を乗せてしまうと、他人にそのまま配信されてしまう事故につながります。</p>

      <Aside label="豆知識">
        この「共有キャッシュに個人向けデータを乗せてはいけない」という話を、実際の事故のパターンとどう防ぐかも含めて詳しく扱ったのが「セキュリティ」カテゴリの<Link href="/security/cache">キャッシュ制御と情報漏洩</Link>です。
      </Aside>

      <Heading num="まとめ">覚えておきたい4つのポイント</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>キャッシュ=使い回しという発想は共通</h4><p>場所が変わっても「作り直さず、保存済みの結果を使い回す」という定義は同じです。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>1台のコンピュータの中にも階層がある</h4><p>CPUキャッシュ→RAM→ストレージという記憶階層そのものがキャッシュの階層です。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>リクエストの経路上にも階層がある</h4><p>ブラウザ→CDN・プロキシ→Webサーバー→データベースと、段階ごとに別のキャッシュが働いています。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>「共有か専用か」が安全性を左右する</h4><p>複数人で共有されるキャッシュに個人向けデータを乗せないことが、最も注意すべき点です。</p></Card>
      </CardGrid>
      <p>キャッシュのほかにも、「サーバー」「オブジェクト」「ポート」など、コンピュータの世界には同じ言葉が文脈によって姿を変える例がいくつもあります。次のページ「<Link href="/network/internet/server">サーバーの全体像</Link>」から、続けてそれらを整理していきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/memory" tag="コンピュータ">メモリの仕組み</RelatedLink>
                    <RelatedLink href="/network/applications/web" tag="インターネット">Webの仕組み</RelatedLink>
                    <RelatedLink href="/security/cache" tag="セキュリティ">キャッシュ制御と情報漏洩</RelatedLink>
                    <RelatedLink href="/network/internet/server" tag="インターネット">サーバーの全体像</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
