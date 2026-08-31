import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "キャッシュの全体像" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>キャッシュの全体像 ― 場所が変わっても定義は同じ</h1>
        <Lead>
          CPUの中にも、ブラウザにも、CDNにも、データベースにも「キャッシュ」があります。同じ言葉が1台のコンピュータの内部からインターネットの向こう側まで何段階にもわたって登場するため、別々の技術に見えてしまいます。ここでは、それらを1枚の地図として整理します。
        </Lead>
      </Hero>

      <Heading num="01">キャッシュ = 「使い回し」という共通の発想</Heading>
      <p>
        場所や規模が変わっても、定義はいつも同じです。<Term>一度作った・調べた結果を保存しておき、次回は同じ処理をやり直さずに使い回す</Term>。これだけです。異なるのは「何を」「どこで」「誰の代わりに」使い回すかだけです。
      </p>

      <Heading num="02">軸1 ― 1台のコンピュータの内部</Heading>
      <p>
        <Link href="/computer/memory">メモリの仕組み</Link>で見た<Term>記憶階層</Term>そのものが、キャッシュの階層でもあります。CPUに近いほど速いが容量が小さく、遠いほど遅いが大きいという構造の中で、各段階が1つ手前の段階のキャッシュとして働いています。
      </p>

      <table>
        <thead>
          <tr><th>層</th><th>何のキャッシュか</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">CPUキャッシュ</td>
            <td>メモリの中でよく使うデータを、CPUの手元に置いておく</td>
          </tr>
          <tr>
            <td className="hl">メモリ</td>
            <td>ストレージの中で今使っているデータを、電源が入っている間だけ置く</td>
          </tr>
          <tr>
            <td className="hl">OS・アプリのキャッシュ</td>
            <td>一度読み込んだファイルの中身を残し、次回の読み込みを省略する</td>
          </tr>
        </tbody>
      </table>

      <Heading num="03">軸2 ― リクエストが通る経路上</Heading>
      <p>
        ブラウザでアクセスしてから応答が返るまでの経路上にも、いくつものキャッシュが並んでいます。
      </p>

      <DiagramFrame
        slug="dev-cache-layers"
        aspect="640 / 300"
        caption="リクエストの経路上に並ぶキャッシュ。左のブラウザとDNSは利用者ごとの専用、CDN・プロキシから右は複数の利用者で共有される。右へ行くほど応答までの距離と時間が長くなるため、できるだけ左で返せたほうが速い。一方で右へ行くほど共有の度合いが上がるため、個人向けの応答を共有キャッシュに乗せると他人に配信される事故になる。専用と共有の境目がどこにあるかが、キャッシュ設計で最も重要な線になる。"
      />

      <table>
        <thead>
          <tr><th>場所</th><th>使い回すもの</th><th>専用か共有か</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">ブラウザ</td>
            <td>一度読み込んだ画像・CSS・スクリプト</td>
            <td>利用者ごとの専用</td>
          </tr>
          <tr>
            <td className="hl">DNS</td>
            <td>ホスト名からIPアドレスへの変換結果</td>
            <td>端末・組織単位</td>
          </tr>
          <tr>
            <td className="hl">CDN・プロキシ</td>
            <td>サーバーの応答そのもの</td>
            <td>複数の利用者で共有</td>
          </tr>
          <tr>
            <td className="hl">アプリケーション</td>
            <td>組み立てた結果、問い合わせの結果</td>
            <td>共有</td>
          </tr>
          <tr>
            <td className="hl">データベース</td>
            <td>よくアクセスされる行や索引</td>
            <td>共有</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        経路上のキャッシュは、リレーの各走者が持つ「前回と同じ荷物」です。手前の走者が荷物を持っていれば、その先まで走る必要がありません。手前で返せるほど速くなりますが、その荷物が<strong>個人宛の郵便物</strong>だった場合、共有の棚に置くと別の人に渡ってしまいます。
      </Analogy>

      <Heading num="04">「共有か、専用か」が一番大事な軸</Heading>
      <p>
        種類の多さより大事なのは、そのキャッシュが<Term>自分専用か、複数人で共有されているか</Term>です。ブラウザキャッシュは自分専用なのでログイン後の内容を保存していても事故になりにくいですが、CDNやサーバー側の共有キャッシュに個人向けの応答を乗せると、<Term>他人にそのまま配信されます</Term>。
      </p>

      <Aside label="キャッシュは「遅いから足す」ものではない">
        キャッシュを足すと、必ず<Term>古い値が返る可能性</Term>と<Term>いつ消すかという問題</Term>が生まれます。だから<Link href="/dev/debug-profiling">まず測って</Link>、同じ結果を繰り返し作っていると確認してから足します。そして足すときは、必ず<Term>いつ無効になるか</Term>をセットで決めます。期限のないキャッシュは、いつか必ず古いデータを配ります。
      </Aside>

      <Heading num="05">どこに置くかの判断</Heading>

      <table>
        <thead>
          <tr><th>置き場所</th><th>向いているもの</th><th>注意</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">プロセスのメモリ</td>
            <td>更新が少なく、ずれても困らない小さな値</td>
            <td>
              <Link href="/language/concurrency-race">複数プロセス</Link>で内容がずれる
            </td>
          </tr>
          <tr>
            <td className="hl">共有ストア</td>
            <td>全インスタンスで同じ値を見たいもの</td>
            <td>ネットワーク越しの往復コストがかかる</td>
          </tr>
          <tr>
            <td className="hl">CDN</td>
            <td>誰に対しても同じ静的な応答</td>
            <td>個人向けの応答を絶対に乗せない</td>
          </tr>
          <tr>
            <td className="hl">ブラウザ</td>
            <td>再訪問時に使い回せる資源</td>
            <td>更新時に確実に取り直させる仕組みが要る</td>
          </tr>
        </tbody>
      </table>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>発想は1つ</h4>
          <p>
            場所が変わっても「作り直さず、保存済みの結果を使い回す」定義は同じです。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>手前で返すほど速い</h4>
          <p>
            内部の記憶階層も経路上の階層も、近いほど速いという構造は共通です。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>専用と共有の線を引く</h4>
          <p>
            共有キャッシュに個人向けデータを乗せないことが、最も重要な注意点です。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/dev/cache" />
    </DocsPage>
  );
}
