import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "JSON API" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>JSON API ― 送るのは一発、受け取るには段が要る</h1>
        <Lead>
          WebのAPIが扱うデータ形式は、いまや<Term>JSON</Term>が事実上の標準です。Expressでは返す側と受け取る側の両方で扱いますが、<Term>この2つは対称ではありません</Term>。その理由を押さえると、最初につまずく「本文が空になる」問題を避けられます。
        </Lead>
      </Hero>

      <Heading num="01">回線を流れるのは文字列だけ</Heading>
      <p>
        JSONは、オブジェクトや配列を<Term>文字列として表現するための書式</Term>です。もともとJavaScriptの記法から生まれましたが、いまでは言語をまたいでデータを受け渡すための共通語になっています。
      </p>

      <table>
        <thead>
          <tr><th></th><th>JavaScriptのオブジェクト</th><th>JSON</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">正体</td><td>メモリ上のデータ構造</td><td><strong>ただの文字列</strong></td></tr>
          <tr><td className="hl">キー</td><td>クオート省略可</td><td>必ずダブルクオート</td></tr>
          <tr><td className="hl">書けないもの</td><td>―</td><td>関数、コメント、日付型</td></tr>
        </tbody>
      </table>

      <p>
        ネットワークを流れるのは文字列だけなので、APIのやり取りは常に<Term>オブジェクトと文字列の変換</Term>とセットになります。そして<Term>この変換が入る位置が、送受信で違う</Term> ― これが非対称さの正体です。
      </p>

      <Heading num="02">返す側と受け取る側</Heading>
      <DiagramFrame
        slug="backend-express-json-asym"
        aspect="640 / 320"
        caption="JSONを返すときと受け取るときが対称でないことを示した図。上段の返す側では、手元のオブジェクトから文字列への変換と形式の宣言までを1つの呼び出しがまとめて引き受け、そのまま回線へ送り出す。下段の受け取る側では、回線から届くのは生のバイト列であり、集めて文字列にし、解釈してオブジェクトに戻す段を通して初めてリクエストの本文に入る。この段を登録していなければ本文は空のままになる。下部には、返す側では変換が最後の一手で済むのに対し、受け取る側では変換が最初の一手として要る、という非対称の理由が記されている。"
      />

      <pre>
        <code>{`// 返す ― これだけで文字列化も形式の宣言も済む
app.get("/users", (req, res) => {
  res.json([{ id: 1, name: "Alice" }]);
});

// 受け取る ― ハンドラより「前」に登録しておく
app.use(express.json());

app.post("/users", (req, res) => {
  const { name } = req.body;
  res.status(201).json({ id: 2, name });
});`}</code>
      </pre>

      <Aside label="登録の位置が効く">
        本文が読めない原因の大半は、この段の書き忘れです。しかも<Term>ハンドラより前に登録しないと効きません</Term>。<Link href="/backend/express-middleware">ミドルウェアは登録順に実行される</Link>ため、変換係が先に並んでいる必要があります。
      </Aside>

      <Heading num="03">受け取る側には上限を設ける</Heading>
      <p>
        解釈の段には、実は重要な設定があります。<Term>本文のサイズ上限</Term>です。
      </p>

      <pre>
        <code>{`app.use(express.json({ limit: "100kb" }));   // 既定値も概ねこの程度`}</code>
      </pre>

      <p>
        上限を大きくすると、<Term>巨大な本文を送りつけるだけでメモリを圧迫できる</Term>ようになります。<Link href="/backend/upload">ファイルアップロード</Link>で見たのと同じ構図で、必要な大きさだけを許すのが原則です。
      </p>
      <p>
        あわせて、<Term>解釈に失敗したときの扱い</Term>も決めておきます。壊れたJSONが送られてくれば、この段が例外を投げます ― それを<Link href="/backend/express-error">まとめて受け止める段</Link>で<code>400</code>に変換しておかないと、利用者のミスがサーバーのエラーとして記録され続けます。
      </p>

      <Heading num="04">歴史的な名残</Heading>
      <p>
        かつてExpressには本文を解釈する機能がなく、別パッケージを追加するのが定番でした。あまりに誰もが使うため、その機能が本体に取り込まれ、標準で呼べるようになりました。古い記事には別パッケージを読み込むコードが残っていますが、<Term>中身は同じもの</Term>です。
      </p>
      <p>
        これは<Link href="/backend/express">薄いExpressに、みんなが使う機能が少しずつ取り込まれてきた</Link>という設計思想の一例でもあります。
      </p>

      <Heading num="05">この形が、前後をつなぐ</Heading>
      <p>
        「対象と操作の組で、JSONをやり取りする」という様式が<Link href="/backend/api-rest">REST API</Link>です。そしてこのJSONを画面側で受け取るのが<Link href="/frontend/http">HTTP通信</Link>の役目でした。<Term>JSONを吐くバックと、それを受けて描くフロント</Term> ― この分担が、いまのWebアプリケーションの典型的な形です。
      </p>

      <Analogy label="💡 たとえるなら">
        JSONは、海外へ荷物を送るときの<Term>共通の梱包規格</Term>です。中身はそのままでは国境を越えられないので、決まった箱に詰め直して送ります。返す側は「送る前に規格どおり梱包する係」、受け取る側は「届いた箱を開けて中身を取り出す係」。<Term>開梱係を受付に配置し忘れると、箱は届いても中身が取り出せません</Term>。
      </Analogy>

      <Heading num="まとめ">変換の位置が、非対称を生む</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>返すのは一発</h4>
          <p>文字列化も形式の宣言も、1つの呼び出しが引き受ける。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>受け取るには段が要る</h4>
          <p>ハンドラより前に登録する。無ければ本文は空のまま。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>上限と失敗を決めておく</h4>
          <p>サイズを制限し、壊れた本文は4xxとして返す。</p>
        </Card>
      </CardGrid>

      <p>
        データをやり取りできるようになったら、次はその取得に時間がかかる場合です。<Link href="/backend/express-async">非同期処理</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/express-json" />
    </DocsPage>
  );
}
