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
  Steps,
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "SNS",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>AWS &middot; アプリケーション統合</Eyebrow>
        <h1>SNS ― 1つの出来事を複数の宛先へ一斉配信する</h1>
        <Lead>
          <Term>SNS(Simple Notification Service)</Term>は、1件のメッセージを<Term>トピック</Term>に発行するだけで、そのトピックを購読している複数の宛先へ同時に配信する<Term>Pub/Sub(パブリッシュ/サブスクライブ)</Term>型のサービスです。<Link href="/cloud/aws/integration/sqs">SQS</Link>が「1対1」で受信側を1つ想定するのに対し、SNSは「1対多」の配信を前提にしています。
        </Lead>
      </Hero>

      <Heading num="01">トピックと購読 ― 発行側は宛先を知らない</Heading>
      <p>発行側(パブリッシャー)は<Term>トピック</Term>と呼ばれる送信先の窓口に1件メッセージを送るだけで、そのトピックに誰が<Term>購読(サブスクライブ)</Term>しているかを一切気にする必要がありません。購読者を後から追加・削除しても、発行側のコードは変更不要です。この「発行側が受信側の存在を知らなくてよい」性質が、SQSの1対1配送よりも一段強い疎結合を生みます。</p>

      <Heading num="02">配信できる宛先(プロトコル)</Heading>
      <p>SNSのトピックは、性質の異なる複数の宛先へ同時に配信できます。</p>
      <table>
        <thead>
          <tr><th>宛先</th><th>用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">SQS</td><td>複数のキューへ複製し、それぞれ独立に処理させる(ファンアウト)</td></tr>
          <tr><td className="hl">Lambda</td><td>通知を受けて関数を即座に起動する</td></tr>
          <tr><td className="hl">HTTP/HTTPS</td><td>外部のWebhookエンドポイントへ通知する</td></tr>
          <tr><td className="hl">Eメール・SMS</td><td>人間への直接通知(アラート、確認コードなど)</td></tr>
          <tr><td className="hl">モバイルプッシュ</td><td>スマートフォンアプリへのプッシュ通知</td></tr>
        </tbody>
      </table>

      <Heading num="02.5">ファンアウトパターン ― SNS + 複数のSQS</Heading>
      <p>最も代表的な使い方が<Term>ファンアウトパターン</Term>です。1件のイベント(例: 「注文が確定した」)をSNSトピックに発行すると、在庫更新用・請求処理用・通知メール用など複数のSQSキューへ同時に複製されます。各キューの受信側は他の受信側の処理状況を知らずに、自分の担当分だけを<Link href="/cloud/aws/integration/sqs">SQS</Link>のPull型キューから安全に取り出して処理できます。SNS単体でも複数宛先へ配信できますが、SQSを間に挟むことで、受信側が一時的に処理できない状態でもメッセージを取りこぼさずに済みます。</p>

      <Heading num="03">サブスクリプションフィルターポリシー ― 必要な購読者にだけ届ける</Heading>
      <p>トピックの購読者全員に同じメッセージを届けるだけでなく、<Term>フィルターポリシー</Term>をサブスクリプションごとに設定すれば、メッセージの属性(例: 「注文金額が1万円以上」)に一致するものだけを特定の購読者に絞り込んで配信できます。これにより、購読者側で不要なメッセージを受け取ってから捨てる無駄を減らせます。</p>

      <Analogy label="💡 たとえるなら">
        SNSは「館内放送」に似ています。放送室(発行側)は「◯◯部署に伝える」と意識せず、館内全体にアナウンスを流すだけです。それを聞いている各部署(購読者)がそれぞれ自分の仕事を始めます。SQSが「1人の窓口係に手渡す整理券」だとすれば、SNSは「同時に複数の部署へ届く館内放送」で、伝える相手の数の想定が根本的に違います。
      </Analogy>

      <Heading num="04">実装イメージ ― 「注文確定」をコードで見る</Heading>
      <p>ここまでの説明を、実際にどうコードやインフラへ落とし込むかで見てみます。ECサイトで注文が確定した場面を例にします。</p>
      <Steps>
        <li><strong>発行側は1回 publish するだけ</strong> ― 注文確定処理の最後に<code>sns.publish({"{"} TopicArn: &quot;order-created&quot;, Message: JSON.stringify(order) {"}"})</code>を呼ぶ。メール送信や在庫更新を行う関数の名前は、発行側のコードのどこにも登場しない。</li>
        <li><strong>購読はインフラ側で宣言する</strong> ― どの処理がこのイベントに反応するかは、CDKやTerraformなどのIaCで「order-createdトピックにこのSQSキューをsubscribeする」という形で定義する。アプリケーションのコードを触らずに購読者を増減できる。</li>
        <li><strong>受信側はSQSトリガーで自動起動</strong> ― 各SQSキューをイベントソースに設定したLambda関数が、メッセージが届くたびに自動起動され、<code>event.Records</code>からペイロードを取り出して自分の担当処理だけを行う。</li>
        <li><strong>必要なら派生イベントを発行する</strong> ― 処理を終えたLambdaは、呼び出し元へ直接応答するのではなく、必要であれば別のSNSトピックへ<code>publish</code>し、次の処理へフローをつなげる。</li>
      </Steps>

      <Diagram caption="注文確定 → order-createdトピック → 3つのSQS+Lambdaへ同時配信(ファンアウト)">
        <svg viewBox="0 0 660 260" xmlns="http://www.w3.org/2000/svg">
          <rect x={10} y={105} width={130} height={50} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={75} y={125} fill="#f2f2f2" fontSize="13" textAnchor="middle">注文確定処理</text>
          <text x={75} y={143} fill="#9a9a9a" fontSize="11" textAnchor="middle">publish() を1回呼ぶ</text>

          <rect x={220} y={105} width={140} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={290} y={125} fill="#f2f2f2" fontSize="13" textAnchor="middle">order-created</text>
          <text x={290} y={143} fill="#9a9a9a" fontSize="11" textAnchor="middle">SNSトピック</text>

          <line x1={140} y1={130} x2={218} y2={130} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrow2)" />

          <rect x={440} y={20} width={210} height={50} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={545} y={40} fill="#f2f2f2" fontSize="13" textAnchor="middle">メール送信Lambda</text>
          <text x={545} y={58} fill="#9a9a9a" fontSize="11" textAnchor="middle">email-queue(SQS)経由</text>

          <rect x={440} y={105} width={210} height={50} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={545} y={125} fill="#f2f2f2" fontSize="13" textAnchor="middle">在庫更新Lambda</text>
          <text x={545} y={143} fill="#9a9a9a" fontSize="11" textAnchor="middle">inventory-queue(SQS)経由</text>

          <rect x={440} y={190} width={210} height={50} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={545} y={210} fill="#f2f2f2" fontSize="13" textAnchor="middle">出荷準備Lambda</text>
          <text x={545} y={228} fill="#9a9a9a" fontSize="11" textAnchor="middle">shipping-queue(SQS)経由</text>

          <line x1={360} y1={130} x2={438} y2={45} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrow2)" />
          <line x1={360} y1={130} x2={438} y2={130} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrow2)" />
          <line x1={360} y1={130} x2={438} y2={215} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrow2)" />

          <defs>
            <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>

      <p>この図で発行側(注文確定処理)のコードには、メール送信・在庫更新・出荷準備のどの関数名もLambdaのARNも一切登場しません。これが「発行側は受信側の存在を知らなくてよい」という疎結合の、実装レベルでの正体です。後から「SMS通知」を追加したくなっても、購読(サブスクリプション)を1つ増やすだけで済み、発行側のコード変更やデプロイは不要です。</p>

      <Heading num="まとめ">SNSが担う役割</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>発行側は購読者の存在を知らなくてよい</h4><p>トピックに送るだけで、誰が何人購読しているかを気にせず疎結合を保てる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>SQS・Lambda・メールなど宛先を選べる</h4><p>システム向けの配信から人間への直接通知まで、1つのトピックで幅広くカバーする。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>SQSと組み合わせてファンアウトする</h4><p>1件のイベントを複数のキューへ複製し、それぞれ独立して安全に処理させる。</p></Card>
      </CardGrid>
      <div className="mb-1.5"><Mark tier="niche">補足</Mark></div>
      <MarkNote>→ SNSの配信は「購読しているかどうか」だけが基準です。メッセージの内容そのものに応じて振り分け先を柔軟に変えたい場合は、次に見る<Link href="/cloud/aws/integration/eventbridge">EventBridge</Link>のルールベースのルーティングがより向いています。</MarkNote>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/cloud/aws/integration/sqs" tag="AWS">SQS</RelatedLink>
                    <RelatedLink href="/cloud/aws/integration/eventbridge" tag="AWS">EventBridge</RelatedLink>
                    <RelatedLink href="/design/architecture/sys/event-driven" tag="設計">イベント駆動アーキテクチャ</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
