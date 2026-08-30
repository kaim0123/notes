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
  Mark,
  MarkNote,
  Analogy,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "SQS",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>AWS &middot; アプリケーション統合</Eyebrow>
        <h1>SQS ― 積み残さずに、確実に1回処理するキュー</h1>
        <Lead>
          <Term>SQS(Simple Queue Service)</Term>は、送信側と受信側の間にメッセージを一時的に溜めておく、フルマネージドの<Term>メッセージキュー</Term>です。受信側の処理が追いつかない瞬間があっても、メッセージはキューに積まれたまま待ち続けるため、送信側は受信側の状況を気にせず処理を投げっぱなしにできます。
        </Lead>
      </Hero>

      <Heading num="01">キューが解決する問題 ― 処理速度の差を吸収する</Heading>
      <p>送信側と受信側を直接つないでいると、受信側の処理が遅い・一時的に落ちているだけで送信側の処理まで止まってしまいます。SQSを間に挟むと、送信側は「キューに置く」だけで処理を終えられ、受信側は自分のペースでキューから取り出して処理できます。この<Term>非同期化</Term>により、アクセスが急増した瞬間もメッセージが失われず積み上がるだけで済み、受信側は自分の処理能力に合わせて追いつけばよくなります。</p>

      <Heading num="02">Pull型 ― 受信側が「取りに行く」</Heading>
      <p>SQSの受信は<Term>Pull型</Term>です。受信側が<Term>ポーリング</Term>と呼ばれる問い合わせを行い、キューにメッセージがあれば受け取ります。何もない間ずっと問い合わせ続ける<Term>ショートポーリング</Term>は無駄な呼び出しが多くなるため、実務では一定時間だけ応答を待つ<Term>ロングポーリング</Term>を使い、無駄な問い合わせ回数とコストを抑えます。</p>

      <Heading num="03">可視性タイムアウト ― 処理中のメッセージを隠す</Heading>
      <p>受信側がメッセージを取り出しても、その時点ではキューから削除されません。取り出されたメッセージは<Term>可視性タイムアウト</Term>という一定時間だけ他の受信側から見えなくなり、その間に処理を終えて明示的に削除するまでは「処理中」の状態を保ちます。もし可視性タイムアウト内に削除されなければ、処理が失敗したとみなされ、メッセージは再びキューに戻って別の受信側が取り出せるようになります。この仕組みにより、同じメッセージが複数の受信側で同時に処理される事態を防ぎます。</p>

      <Heading num="04">標準キューとFIFOキュー</Heading>
      <p>SQSには特性の異なる2種類のキュータイプがあります。</p>
      <table>
        <thead>
          <tr><th></th><th>標準キュー</th><th>FIFOキュー</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">順序保証</td><td>保証しない(前後する場合がある)</td><td>送信した順序どおりに届く</td></tr>
          <tr><td className="hl">配信回数</td><td>まれに重複して届くことがある(少なくとも1回)</td><td>重複排除の仕組みにより原則1回だけ届く</td></tr>
          <tr><td className="hl">スループット</td><td>ほぼ無制限</td><td>標準キューより低い(グループ単位で制御)</td></tr>
          <tr><td className="hl">向いている用途</td><td>順序が処理結果に影響しない大量のタスク</td><td>注文処理や決済など、順序と重複排除が重要な処理</td></tr>
        </tbody>
      </table>
      <p>受信側は、重複して同じメッセージを受け取っても結果が変わらないように処理を<Term>冪等(べきとう)</Term>に作っておくと、標準キューの「重複の可能性」に振り回されずに済みます。</p>

      <Heading num="05">デッドレターキュー ― 処理できないメッセージの退避先</Heading>
      <p>データ形式の不備や下流サービスの障害などで、同じメッセージが何度リトライしても処理に失敗し続けることがあります。<Term>デッドレターキュー(DLQ)</Term>を設定しておくと、指定回数だけ処理に失敗したメッセージは自動的にDLQへ退避され、正常なメッセージの処理を妨げなくなります。退避されたメッセージは後から人手で内容を確認し、原因を調査できます。</p>

      <Analogy label="💡 たとえるなら">
        SQSは「順番待ちの整理券」に似ています。窓口(受信側)が混んでいても、来客(メッセージ)は整理券を取って列に並ぶだけで待ち合わせ場所を離れられます。窓口係は呼び出した客への対応中は次の番号を呼ばず(可視性タイムアウト)、対応が終わって初めて整理券を回収します(メッセージの削除)。もし対応中に窓口係が席を外したまま戻らなければ、その番号はまた列に戻され、別の窓口係が呼び出します。
      </Analogy>

      <Heading num="まとめ">SQSが担う役割</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>送信側と受信側の速度差を吸収する</h4><p>キューに積んでおくことで、受信側の処理が追いつかなくてもメッセージは失われない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>可視性タイムアウトで二重処理を防ぐ</h4><p>処理中のメッセージは一時的に隠され、失敗すれば自動的にキューへ戻る。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>標準・FIFO・DLQを使い分ける</h4><p>スループット優先か順序保証優先か、失敗時の退避先をどう設けるかで選択肢が分かれる。</p></Card>
      </CardGrid>
      <div className="mb-1.5"><Mark tier="niche">補足</Mark></div>
      <MarkNote>→ SQSは基本的に1対1(1つのメッセージを1つの受信側が処理する)のキューです。同じ出来事を複数の宛先に一斉配信したい場合は、次に見る<Link href="/cloud/aws/integration/sns">SNS</Link>と組み合わせます。</MarkNote>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/integration" tag="AWS">アプリケーション統合</RelatedLink>
                    <RelatedLink href="/cloud/aws/integration/sns" tag="AWS">SNS</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/event-driven" tag="設計">イベント駆動アーキテクチャ</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
