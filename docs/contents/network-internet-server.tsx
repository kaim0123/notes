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
  title: "サーバーの全体像",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インターネット</Eyebrow>
        <h1>サーバーの全体像 ― 「モノ」なのか「役割」なのか</h1>
        <Lead>
          「<Link href="/network/applications/web">Webの仕組み</Link>」ではリクエストを受け取って応答を返す側として、「<Link href="/dev/frontend/framework">フレームワーク・ライブラリ</Link>」ではExpress・Honoのようなソフトウェアとして、それぞれ「サーバー」という言葉に触れてきました。ところが日常会話では「サーバーが落ちた」という一言が、巨大な機械の故障を指すこともあれば、1つのプログラムの不調を指すこともあります。何が同じで、何が違うのかを整理します。
        </Lead>
      </Hero>

      <Heading num="01">共通点 ― 「頼まれて、応える側」</Heading>
      <p>種類がどれだけ増えても、サーバーの定義そのものは単純です。<strong>リクエスト(依頼)を受け取り、それに応じたレスポンス(応答)を返す側</strong>。依頼する側を<Term>クライアント</Term>と呼び、この2者の関係を<Term>クライアント・サーバーモデル</Term>と呼びます。「<Link href="/network/applications/web">Webの仕組み</Link>」で見たブラウザ(クライアント)とWebサーバーのやり取りは、その最も身近な一例にすぎません。</p>

      <Heading num="02">軸1: 「機械そのもの」か「その上で動くプログラム」か</Heading>
      <p>混乱の一番の原因は、「サーバー」が2つの異なるレベルを指せてしまうことです。</p>
      <table>
        <tbody>
          <tr><th>レベル</th><th>指しているもの</th></tr>
          <tr><td className="hl">ハードウェアとしてのサーバー</td><td>24時間稼働を前提にした、高性能な物理・仮想マシンそのもの</td></tr>
          <tr><td className="hl">ソフトウェアとしてのサーバー</td><td>そのマシン上で動き、リクエストを待ち受けて応答するプログラム(Nginx、Express、PostgreSQLなど)</td></tr>
        </tbody>
      </table>
      <p>1台の物理マシンの上に、Webサーバー用ソフト・DBサーバー用ソフトが同居することもあれば、逆に1つの役割だけのために何百台ものマシンが並ぶこともあります。「サーバー」という言葉だけでは、そのどちらの規模の話をしているのか分かりません。</p>

      <Heading num="03">軸2: 「何の依頼を受け付けるか」という役割による分類</Heading>
      <p>ソフトウェアとしてのサーバーは、受け付ける依頼の種類によってさらに細かく呼び分けられます。</p>
      <table>
        <tbody>
          <tr><th>種類</th><th>受け付ける依頼</th><th>代表例</th></tr>
          <tr><td className="hl">Webサーバー</td><td>HTTPリクエストを受けてHTML・JSONなどを返す</td><td>Nginx、Express、Next.js</td></tr>
          <tr><td className="hl">APサーバー(アプリケーションサーバー)</td><td>業務ロジックを実行し、結果を組み立てる</td><td>Node.jsプロセス</td></tr>
          <tr><td className="hl">DBサーバー</td><td>データの保存・検索を専門に行う</td><td>PostgreSQL、MySQL</td></tr>
          <tr><td className="hl">メールサーバー</td><td>メールの送受信を中継する</td><td>SMTP/IMAPサーバー</td></tr>
          <tr><td className="hl">ファイルサーバー</td><td>ファイルの共有・保存場所を提供する</td><td>社内ファイル共有</td></tr>
        </tbody>
      </table>

      <Diagram caption="1つのWebサービスの裏側では、役割ごとに異なるサーバーが連携している">
        <svg viewBox="0 0 680 160" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={50} width={120} height={48} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={80} y={78} fill="#f2f2f2" fontSize="13" textAnchor="middle">ブラウザ</text>
          <text x={80} y={93} fill="#9a9a9a" fontSize="10" textAnchor="middle">クライアント</text>

          <rect x={190} y={50} width={140} height={48} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={260} y={72} fill="#f2f2f2" fontSize="13" textAnchor="middle">Webサーバー</text>
          <text x={260} y={87} fill="#9a9a9a" fontSize="10" textAnchor="middle">HTTPを受け付ける</text>

          <rect x={380} y={50} width={140} height={48} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={450} y={72} fill="#f2f2f2" fontSize="13" textAnchor="middle">APサーバー</text>
          <text x={450} y={87} fill="#9a9a9a" fontSize="10" textAnchor="middle">業務ロジックを実行</text>

          <rect x={550} y={50} width={110} height={48} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={605} y={72} fill="#f2f2f2" fontSize="13" textAnchor="middle">DBサーバー</text>
          <text x={605} y={87} fill="#9a9a9a" fontSize="10" textAnchor="middle">データを保存・検索</text>

          <line x1={140} y1={74} x2={188} y2={74} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowSrv)" />
          <line x1={330} y1={74} x2={378} y2={74} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowSrv)" />
          <line x1={520} y1={74} x2={548} y2={74} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowSrv)" />

          <text x={340} y={135} fill="#9a9a9a" fontSize="11" textAnchor="middle">1台のマシンに全部同居させることも、役割ごとに別マシンに分けることもできる</text>

          <defs>
            <marker id="arrowSrv" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>

      <Analogy label="💡 たとえるなら">
        会社の受付(Webサーバー)がまず要件を聞き、担当部署(APサーバー)が実際の処理をこなし、必要な資料は倉庫(DBサーバー)から取り寄せる ― という分業に似ています。小さな会社なら1人がすべてを兼任することもあれば(1台のマシンに全役割を同居)、大きな会社なら部署ごとに建物すら分かれることもあります(役割ごとに別マシン)。
      </Analogy>

      <Heading num="04">「サーバーが落ちた」があいまいになる理由</Heading>
      <p>ここまでの2つの軸を踏まえると、「サーバーが落ちた」という一言がどれだけ広い範囲を指せてしまうか分かります。物理マシンごと電源が落ちたのか、Webサーバーのソフトだけがクラッシュしたのか、DBサーバーだけが応答不能になっているのか ― 実害も対処法もまったく異なるのに、同じ一言で表現されてしまいます。障害対応では、まず<strong>「機械」か「特定のプログラム」か、どの役割のサーバーか</strong>を切り分けることが第一歩になります。</p>

      <Aside label="豆知識">
        自分のPC上で <code>npm run dev</code> を実行したときに立ち上がる<Term>開発サーバー</Term>(「<Link href="/dev/tooling">パッケージ管理とビルド</Link>」参照)も、役割としては立派な「Webサーバー」の一種です。ただし本番の利用者を受け付けることを想定しておらず、自分の手元で動作確認をするためだけの存在という点が大きく異なります。
      </Aside>

      <Heading num="まとめ">覚えておきたい4つのポイント</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>サーバー=依頼に応える側</h4><p>クライアントからのリクエストを受け取り、レスポンスを返す。これが唯一の共通点です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>「機械」と「プログラム」は別レベル</h4><p>物理・仮想マシンそのものと、その上で動くソフトウェアは、それぞれ独立して「サーバー」と呼ばれます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>役割ごとに別の名前がつく</h4><p>Web・AP・DB・メール・ファイルなど、受け付ける依頼の種類で呼び分けられます。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>「落ちた」はまず切り分ける</h4><p>機械全体か、特定のプロセスか、どの役割かを分けて考えることが障害対応の第一歩です。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/network/applications/web" tag="インターネット">Webの仕組み</RelatedLink>
                    <RelatedLink href="/dev/frontend/framework" tag="開発">フレームワーク・ライブラリ</RelatedLink>
                    <RelatedLink href="/dev/tooling" tag="開発">パッケージ管理とビルド</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
