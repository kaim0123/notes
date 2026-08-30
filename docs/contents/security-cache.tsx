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
  title: "キャッシュ制御と情報漏洩",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>キャッシュ制御と情報漏洩</h1>
        <Lead>
          <Term>キャッシュ</Term>は「一度作った応答を保存しておき、次回は作り直さずに使い回す」ことでサイトを高速化する仕組みです。とても便利な一方、その応答が<strong>特定のログインユーザーだけのための個人向けデータ</strong>だった場合、使い回された瞬間に「他人の画面が、別の人に表示されてしまう」という重大な事故につながります。
        </Lead>
      </Hero>

      <Heading num="01">キャッシュは「使い回し」である</Heading>
      <p>Webサイトを速くする方法の1つに、一度生成したレスポンスを保存しておき、同じリクエストが来たら作り直さずにその保存済みの内容をそのまま返す、というものがあります。これがキャッシュです。トップページや商品一覧ページのように「誰が見ても同じ内容」のページなら、使い回しても何の問題もありません。しかし「マイページ」「注文履歴」のように<strong>見る人によって中身が変わる</strong>ページを不用意にキャッシュしてしまうと、Aさん向けに作られた応答がBさんに配られてしまう恐れがあります。</p>

      <Analogy label="💡 たとえるなら">
        個人宛の郵便物を、コンビニの「みんなが使う共有の受け取り棚」にラベルも貼らずポンと置いてしまうようなものです。次にその棚に来た別のお客さんが、自分宛だと勘違いして(あるいは深く考えずに)持ち帰ってしまうかもしれません。個人宛のものは、共有の棚(共有キャッシュ)には置かない ― これがこのページの結論です。
      </Analogy>

      <Heading num="02">サーバー内部でも「使い回し」に注意する</Heading>
      <p>キャッシュに限らず、サーバー内部の実装でも似た事故は起こります。あるリクエストの処理中にしか使わないはずの値(そのユーザー固有のデータ)を、うっかりサーバーの<Term>共有変数(グローバル変数)</Term>に置いてしまうと、複数のリクエストが同時に処理されたときにデータが混ざり、別のユーザーの画面に他人の情報が紛れ込むことがあります。もしどうしても複数のリクエストで値を共有する必要がある場合は、<Term>ロック</Term>や<Term>トランザクション</Term>によって、同時に触られないよう排他制御する必要があります。</p>

      <Heading num="03">個人向けページには no-store を明示する</Heading>
      <p>マイページや注文履歴のような個人向けのページには、HTTPレスポンスヘッダで<code>Cache-Control: no-store</code>のような指定を行い、「このページはキャッシュしてはいけない」とブラウザやその先にある機器にはっきり伝える必要があります。何も指定しなければ「キャッシュしてよいかどうか」の判断は各機器の実装や設定に委ねられてしまい、意図せずキャッシュされてしまう可能性が残ります。</p>

      <Heading num="04">自分のブラウザだけの問題ではない ― CDN・プロキシ</Heading>
      <p>キャッシュは利用者自身のブラウザの中だけで起きるとは限りません。多くのWebサイトは<Term>CDN</Term>や<Term>プロキシ</Term>と呼ばれる、サーバーとブラウザの間に立つ共有インフラを経由しています。これらは多数の利用者からのアクセスを効率よく捌くために積極的にキャッシュを行いますが、そのキャッシュは<strong>複数の利用者で共有</strong>されている点が重要です。個人向けの応答をここでキャッシュされてしまうと、他人にそのまま配信される規模がブラウザ内キャッシュの比ではありません。CDN・プロキシの設定でも、認証付き・個人向けの応答はキャッシュ対象から明示的に除外する必要があります。</p>

      <Diagram caption="共有CDN/プロキシでの個人向けページのキャッシュ事故">
        <svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={20} width={120} height={44} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={80} y={47} fill="#f2f2f2" fontSize="13" textAnchor="middle">ユーザーA</text>

          <rect x={260} y={20} width={140} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={330} y={40} fill="#f2f2f2" fontSize="12" textAnchor="middle">共有CDN</text>
          <text x={330} y={56} fill="#9a9a9a" fontSize="10" textAnchor="middle">/mypage をキャッシュ</text>

          <line x1={140} y1={42} x2={258} y2={42} stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={195} y={35} fill="#9a9a9a" fontSize="10" textAnchor="middle">GET /mypage</text>

          <rect x={490} y={20} width={130} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={555} y={40} fill="#f2f2f2" fontSize="12" textAnchor="middle">オリジン</text>
          <text x={555} y={56} fill="#9a9a9a" fontSize="10" textAnchor="middle">(no-store指定なし)</text>
          <line x1={400} y1={42} x2={488} y2={42} stroke="#5f5f5f" strokeWidth="1.5" />

          <rect x={20} y={130} width={120} height={44} rx="8" fill="none" stroke="#ff4d4d" strokeWidth="1.5" />
          <text x={80} y={150} fill="#f2f2f2" fontSize="13" textAnchor="middle">ユーザーB</text>
          <text x={80} y={166} fill="#9a9a9a" fontSize="10" textAnchor="middle">(数秒後にアクセス)</text>

          <line x1={140} y1={152} x2={258} y2={152} stroke="#ff4d4d" strokeWidth="1.5" />
          <text x={195} y={145} fill="#9a9a9a" fontSize="10" textAnchor="middle">GET /mypage</text>

          <line x1={330} y1={64} x2={330} y2={130} stroke="#5f5f5f" strokeWidth="1.5" strokeDasharray="4 3" />

          <rect x={260} y={130} width={140} height={44} rx="8" fill="none" stroke="#ff4d4d" strokeWidth="1.5" />
          <text x={330} y={150} fill="#ff4d4d" fontSize="12" textAnchor="middle">キャッシュ済みの</text>
          <text x={330} y={166} fill="#ff4d4d" fontSize="12" textAnchor="middle">Aさんの画面を返す</text>

          <text x={320} y={200} fill="#9a9a9a" fontSize="12" textAnchor="middle">no-store が無いと、共有キャッシュがAさん向けの応答をBさんにそのまま配ってしまう</text>
        </svg>
      </Diagram>

      <Heading num="05">URLに乱数を付けるだけでは安心できない</Heading>
      <p>「URLの末尾に毎回ランダムな文字列を付ければキャッシュされないはず」という小手先の対応だけに頼るのは危険です。共有キャッシュ側の設定次第では、クエリ文字列の違いを無視してキャッシュしてしまう場合もありますし、そもそも根本原因である「このレスポンスはキャッシュしてはいけない」という意図がサーバー側から明示されていない点は変わりません。個人向けの応答かどうかは、URLの見た目の工夫ではなく<code>Cache-Control</code>ヘッダなどで明示的に、かつ確実に伝える必要があります。</p>

      <Aside label="豆知識">
        「認証情報(ログイン中かどうか)によって内容が変わるページはキャッシュしない」という発想は、前のページで扱った<Link href="/security/authz">認可</Link>の考え方(「その人に見せてよいか」を毎回判定する)と地続きです。せっかく正しく認可を実装しても、キャッシュの層で使い回されてしまえば意味がなくなってしまいます。
      </Aside>

      <Heading num="まとめ">キャッシュ制御の5つの原則</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>キャッシュ=使い回し</h4><p>個人向けの応答を使い回すと、他人にそのまま配信されてしまいます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>サーバー内部の共有変数にも注意</h4><p>リクエスト固有の値を共有変数に置かないこと自体も、広い意味でのキャッシュ事故対策です。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>no-store を明示する</h4><p>個人向けページには、キャッシュ禁止であることをヘッダで明確に伝えます。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>共有インフラ全体に効かせる</h4><p>ブラウザだけでなく、CDN・プロキシの設定でも個人向け応答を除外します。</p></Card>
      </CardGrid>
      <p>ここまでで、攻撃を防ぐための8つのテーマを見てきました。最後のページでは視点を変えて、「攻撃を未然に防ぎきれなかったときに、どう気づき、どう調べるか」を支える「<Link href="/security/logging">ログ出力設計</Link>」を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/authz" tag="セキュリティ">認可</RelatedLink>
                    <RelatedLink href="/security/session" tag="セキュリティ">セッションとCookie管理</RelatedLink>
                    <RelatedLink href="/security/logging" tag="セキュリティ">ログ出力設計</RelatedLink>
                    <RelatedLink href="/dev/cache" tag="実装">キャッシュの全体像</RelatedLink>
                    <RelatedLink href="/dev/backend/cache" tag="バックエンド">サーバーサイドキャッシュ</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
