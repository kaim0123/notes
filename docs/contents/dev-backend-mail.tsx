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
  title: "メール送信と通知",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド &middot; 機能実装</Eyebrow>
        <h1>メール送信と通知 ― 届かないことを前提に組む</h1>
        <Lead>
          <Link href="/network/applications/mail">メールの仕組み</Link>でSMTPの流れを見ました。ここではアプリからメールを送る側の実装を扱います。要点は<strong>「送信した」と「届いた」はまったく別のこと</strong>だという点です。技術的に成功しても、迷惑メールフォルダに入れば存在しないのと同じです。設定・実装・運用の3方向から、届く仕組みを作ります。
        </Lead>
      </Hero>

      <Heading num="01">自前でSMTPサーバーを立てない</Heading>
      <p>最初の判断です。技術的には<code>nodemailer</code>で直接SMTPを喋れますが、<strong>自前のサーバーから直接送ったメールは、ほぼ確実に迷惑メール判定されます</strong>。</p>
      <table>
        <thead>
          <tr><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">新しいIPアドレスには送信実績(<Term>レピュテーション</Term>)が無く、受信側は信用しない</td></tr>
          <tr><td className="hl">クラウドのIP帯は、そもそも送信元としてブロックされていることが多い</td></tr>
          <tr><td className="hl">バウンス(宛先不明)や苦情の処理を自前で実装する必要がある</td></tr>
          <tr><td className="hl">主要な受信事業者の要件変更に追従し続ける運用が発生する</td></tr>
        </tbody>
      </table>
      <p>したがって、<Link href="/cloud/aws">Amazon SES</Link>、SendGrid、Resendのような<Term>送信サービス</Term>を使います。接続方法はSMTPとHTTP APIの両方が提供されますが、<strong>HTTP APIを選ぶ</strong>のが基本です ― タイムアウトやエラーの扱いが通常のHTTPクライアントと同じになり、<Link href="/dev/backend/ops/resilience">リトライ</Link>の設計も揃えられます。</p>

      <Heading num="02">到達性 ― 3つのDNSレコード</Heading>
      <p>「自分のドメインから送っている」ことを受信側に証明する仕組みが3つあり、いずれもDNSに設定します。<strong>この3つが揃っていないと、大手の受信事業者は受け取りを拒否します</strong>。</p>
      <table>
        <thead>
          <tr><th>仕組み</th><th>証明すること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Term>SPF</Term></td><td>「このIPアドレスからの送信を許可している」という送信元の宣言</td></tr>
          <tr><td className="hl"><Term>DKIM</Term></td><td>電子署名。<strong>本文が改ざんされていない</strong>ことと、ドメインの所有を証明する</td></tr>
          <tr><td className="hl"><Term>DMARC</Term></td><td>SPF/DKIMに失敗したメールをどう扱うかの方針表明と、結果レポートの受け取り</td></tr>
        </tbody>
      </table>
      <p>設定の実務は<Link href="/network/applications/mail/hosting">会社ドメインのメールを用意する</Link>と同じ考え方です。加えて、送信サービス側でドメイン認証(提示されたDNSレコードの登録)を済ませます。</p>
      <Aside label="サブドメインを分ける">
        通知メールは<code>notify.example.com</code>のような<strong>サブドメイン</strong>から送るのが定石です。万一大量配信で評価を落としても、本体ドメイン(社員が日常業務で使うメール)の到達率を巻き添えにしません。同じ理由で、<strong>取引メールと宣伝メールも別のサブドメインに分けます</strong>。
      </Aside>

      <Heading num="03">2種類のメールを混ぜない</Heading>
      <p>メールは性質で明確に分かれ、扱いも法的な要件も違います。</p>
      <table>
        <thead>
          <tr><th></th><th>トランザクションメール</th><th>マーケティングメール</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">例</td><td>登録確認、パスワード再設定、注文確定、領収書</td><td>キャンペーン告知、おすすめ、ニュースレター</td></tr>
          <tr><td className="hl">きっかけ</td><td>利用者の操作に対する応答</td><td>送信側の都合</td></tr>
          <tr><td className="hl">同意</td><td>不要(サービス提供に必要)</td><td><strong>事前の同意が必要</strong></td></tr>
          <tr><td className="hl">配信停止</td><td>付けない(止められると業務に支障が出る)</td><td><strong>必須</strong>。1クリックで解除できること</td></tr>
          <tr><td className="hl">優先度</td><td>即時性が重要</td><td>遅れても問題ない</td></tr>
        </tbody>
      </table>
      <p>日本では特定電子メール法、海外向けにはGDPRやCAN-SPAM法が関わります。<strong>配信停止した人に送ってしまう</strong>のは法的なリスクであると同時に、苦情としてカウントされ到達率を直接下げます。配信停止の状態は、テンプレート側ではなく<strong>送信の直前に必ず確認</strong>します。</p>

      <Heading num="04">実装 ― ジョブ経由で送る</Heading>
      <p>メール送信は、<Link href="/dev/backend/jobs">ジョブキュー</Link>の代表的な用途です。リクエストの中で直接送ってはいけません。</p>
      <table>
        <thead>
          <tr><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">送信サービスが遅ければ、APIの応答も遅くなる</td></tr>
          <tr><td className="hl">送信サービスが落ちていれば、<strong>ユーザー登録そのものが失敗する</strong></td></tr>
          <tr><td className="hl">失敗しても再試行できない</td></tr>
          <tr><td className="hl">大量配信でリクエストがタイムアウトする</td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// application/register-user.ts
async execute(input: RegisterInput) {
  const user = await this.uow.run(async (tx) => {
    const user = User.register(input);
    await this.users.save(user, tx);
    // 同じトランザクションで送信予約を記録する(Outbox)
    await this.outbox.enqueue({ type: "welcome_mail", userId: user.id }, tx);
    return user;
  });
  return user;   // メールの成否は登録の成否と切り離す
}`}</code>
      </pre>
      <p>ワーカー側では、<strong>冪等に</strong>送ります。<Link href="/dev/backend/jobs">最低1回配信</Link>の性質上、ジョブは2回実行され得ます ― 送信記録テーブルに一意キーで先に書き込み、既に記録があればスキップします。「登録完了メールが2通届く」は、実装の不備が最も可視化されやすい形です。</p>

      <Heading num="05">中身の作り方</Heading>
      <table>
        <thead>
          <tr><th>項目</th><th>方針</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">テンプレート</td><td>コードに直書きしない。文言の修正が開発者の作業にならないようにする</td></tr>
          <tr><td className="hl">HTMLとテキスト</td><td><strong>両方を送る</strong>(multipart)。テキスト版が無いと迷惑メール判定されやすい</td></tr>
          <tr><td className="hl">HTMLの書き方</td><td>メールクライアントのCSS対応は貧弱。テーブルレイアウトとインラインCSSが今も現役</td></tr>
          <tr><td className="hl">差し込み値</td><td>必ず<strong>エスケープ</strong>する。利用者名にHTMLを入れられる余地を残さない</td></tr>
          <tr><td className="hl">リンク</td><td>絶対URLで書く。トークン付きリンクは有効期限を短く</td></tr>
          <tr><td className="hl">言語</td><td><Link href="/dev/frontend/i18n">利用者の言語設定</Link>に従う。送信時点の設定を使う</td></tr>
          <tr><td className="hl">件名</td><td>本文と一貫させる。過度な記号や煽り文句はスコアを下げる</td></tr>
        </tbody>
      </table>
      <Aside label="⚠️ 個人情報を本文に書きすぎない">
        メールは経路上で暗号化される保証がなく、受信箱に残り続けます。パスワードそのものを書くのは論外として、注文内容や住所も<strong>「詳細はこちら」とリンクで見せる</strong>方が安全です。
      </Aside>

      <Heading num="06">送った後 ― バウンスと苦情の処理</Heading>
      <p>送信APIが200を返しても、まだ届いていません。その後に起きることを受け取る必要があります。</p>
      <table>
        <thead>
          <tr><th>イベント</th><th>意味</th><th>対応</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ハードバウンス</td><td>宛先が存在しない</td><td><strong>そのアドレスへの送信を永久に停止する</strong></td></tr>
          <tr><td className="hl">ソフトバウンス</td><td>容量超過、一時的な障害</td><td>間隔を空けて再試行。続くなら停止</td></tr>
          <tr><td className="hl">苦情(スパム報告)</td><td>受信者が迷惑メールとして報告した</td><td><strong>即座に配信停止</strong>。放置は到達率を破壊する</td></tr>
          <tr><td className="hl">配信停止リクエスト</td><td>本人が解除した</td><td>該当種別の送信を止める</td></tr>
        </tbody>
      </table>
      <p>これらは送信サービスからWebhookで通知されます。<strong>受け取って抑制リストに反映する処理を実装しない限り</strong>、存在しないアドレスへ延々と送り続け、送信ドメインの評価が下がります。Webhookの受信には署名検証を必ず入れ、<Link href="/dev/backend/jobs">冪等</Link>に処理します。</p>

      <Heading num="07">開発環境での扱い</Heading>
      <p>メール実装で最も怖い事故は、<strong>本番データを使ったテストで実在の顧客に誤送信すること</strong>です。仕組みで防ぎます。</p>
      <table>
        <thead>
          <tr><th>対策</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ローカル</td><td>Mailpit / MailHog のようなダミーSMTPで受け止め、ブラウザで確認する</td></tr>
          <tr><td className="hl">ステージング</td><td>送信サービスのサンドボックスモード、または<strong>全宛先を開発チームのアドレスに強制置換</strong></td></tr>
          <tr><td className="hl">環境の判定</td><td>本番以外では、許可リストに無い宛先への送信を<strong>コード側で例外にする</strong></td></tr>
          <tr><td className="hl">テスト</td><td>送信処理をインターフェース化し(<Link href="/dev/backend/layers">Notifier</Link>)、テストでは記録するだけの実装に差し替える</td></tr>
        </tbody>
      </table>

      <Heading num="08">メールだけが通知ではない</Heading>
      <p>最後に視野を広げます。通知チャネルは複数あり、性質で使い分けます。</p>
      <table>
        <thead>
          <tr><th>チャネル</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">メール</td><td>記録が残る。緊急性は低い。到達は不確実</td></tr>
          <tr><td className="hl">アプリ内通知</td><td>確実に届く(見に来れば)。<strong>まずこれを実装すべき</strong>ことが多い</td></tr>
          <tr><td className="hl">プッシュ通知</td><td>即時性が高い。許可を得る必要があり、乱発すると切られる</td></tr>
          <tr><td className="hl">SMS</td><td>到達率が高く即時。費用が高い。認証コードなどに限定する</td></tr>
          <tr><td className="hl">Slack等</td><td>社内向け・運用アラート向け</td></tr>
        </tbody>
      </table>
      <p>設計としては、<strong>「通知イベント」と「配信チャネル」を分離</strong>します。業務側は「注文が確定した」というイベントを発行するだけにし、どのチャネルへ何を送るかは通知側の関心事として切り出します。こうすると、後からチャネルを増やしても業務ロジックを触らずに済みます ― <Link href="/design/architecture/sys/event-driven">イベント駆動</Link>の素直な適用例です。</p>
      <p>あわせて、利用者が<strong>通知の種類ごとに受け取り方を選べる</strong>設定を用意します。全部か無かしか選べない通知は、結局すべて切られます。</p>

      <Analogy label="💡 たとえるなら">
        メール送信は、郵便の差し出しに似ています。ポストに入れた(APIが200を返した)ことと、相手が読んだことの間には大きな距離があります。差出人が誰か証明できなければ配達員は怪しんで届けませんし(SPF/DKIM/DMARC)、宛先不明の手紙が何度も返ってくるのに同じ住所へ出し続ければ、郵便局はその差出人自体を警戒し始めます(レピュテーション)。だから「返ってきた通知」をきちんと読んで、宛先簿を手入れすることが、次の手紙が届くかどうかを決めるのです。
      </Analogy>

      <Heading num="まとめ">送信は非同期、到達は運用</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>送信サービス+3つのDNS</h4><p>自前SMTPは届かない。SPF・DKIM・DMARCを揃え、サブドメインを分ける。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>リクエストから切り離す</h4><p>ジョブ経由で冪等に送る。送信サービスの障害が登録の失敗になってはいけない。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>バウンスと苦情を処理する</h4><p>Webhookを受けて抑制リストに反映しないと、到達率は下がり続ける。</p></Card>
      </CardGrid>
      <p>次は認証まわりを掘り下げます。<Link href="/dev/backend/express/auth">認証・認可</Link>で扱った基礎の先、<Link href="/dev/backend/auth/token">トークンの運用</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/network/applications/mail" tag="ネットワーク">メールの仕組み</RelatedLink>
            <RelatedLink href="/network/applications/mail/hosting" tag="ネットワーク">会社ドメインのメールを用意する</RelatedLink>
            <RelatedLink href="/dev/backend/jobs" tag="バックエンド">ジョブキューとワーカー</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
