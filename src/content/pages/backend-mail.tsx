import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "メール送信と通知" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>メール送信と通知 ― 届かないことを前提に組む</h1>
        <Lead>
          要点は1つです ― <Term>「送信した」と「届いた」はまったく別のこと</Term>。技術的に成功しても、迷惑メールフォルダに入れば存在しないのと同じです。設定・実装・運用の3方向から、届く仕組みを作ります。
        </Lead>
      </Hero>

      <Heading num="01">自前でSMTPサーバーを立てない</Heading>
      <p>
        最初の判断です。技術的には直接SMTPを喋れますが、<Term>自前のサーバーから直接送ったメールは、ほぼ確実に迷惑メール判定されます</Term>。
      </p>

      <table>
        <thead>
          <tr><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">新しいIPアドレスには送信の実績(<Term>評価</Term>)が無く、受信側は信用しない</td></tr>
          <tr><td className="hl">クラウドのIP帯は、そもそも送信元としてブロックされていることが多い</td></tr>
          <tr><td className="hl">宛先不明や苦情の処理を、自前で実装する必要がある</td></tr>
          <tr><td className="hl">主要な受信事業者の要件変更に、追従し続ける運用が発生する</td></tr>
        </tbody>
      </table>

      <p>
        したがって送信サービスを使います。接続はSMTPとHTTP APIの両方が提供されますが、<Term>HTTP APIを選ぶ</Term>のが基本です ― タイムアウトやエラーの扱いが通常のHTTP通信と同じになり、<Link href="/backend/ops-resilience">リトライ</Link>の設計も揃えられます。
      </p>

      <Heading num="02">「送信した」から「届いた」までの距離</Heading>
      <p>
        送信サービスが<code>200</code>を返した地点は、まだ道半ばです。その先に受信側の判定があります。
      </p>

      <DiagramFrame
        slug="backend-mail-delivery"
        aspect="640 / 340"
        caption="送信したことと届いたことの間にある距離を示した図。アプリ、ジョブ、送信サービス、受信側の判定、受信箱の順に流れる。送信サービスが200を返す位置が「送信した」地点だが、その先の判定でSPF・DKIM・DMARCの有無、送信元の評価、苦情の割合が問われ、通らなければ迷惑メールか受け取り拒否になる。下部には戻りの経路があり、宛先不明や苦情の通知がアプリへ返って抑制リストに反映される。この戻りを処理しないと送信元の評価が下がり続け、次のメールも届かなくなることが示されている。"
      />

      <table>
        <thead>
          <tr><th>仕組み</th><th>証明すること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Term>SPF</Term></td><td>「このIPアドレスからの送信を許可している」という送信元の宣言</td></tr>
          <tr><td className="hl"><Term>DKIM</Term></td><td>電子署名。<strong>本文が改ざんされていない</strong>ことと、ドメインの所有を証明する</td></tr>
          <tr><td className="hl"><Term>DMARC</Term></td><td>前の2つに失敗したメールをどう扱うかの方針表明と、結果の受け取り</td></tr>
        </tbody>
      </table>

      <p>
        いずれもDNSに設定します。<Term>この3つが揃っていないと、大手の受信事業者は受け取りを拒否します</Term>。
      </p>

      <Aside label="サブドメインを分ける">
        通知メールは<code>notify.example.com</code>のようなサブドメインから送るのが定石です。万一大量配信で評価を落としても、<Term>社員が日常業務で使う本体ドメインを巻き添えにしません</Term>。同じ理由で、取引メールと宣伝メールも別のサブドメインに分けます。
      </Aside>

      <Heading num="03">2種類のメールを混ぜない</Heading>
      <table>
        <thead>
          <tr><th></th><th>取引メール</th><th>宣伝メール</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">例</td><td>登録確認、パスワード再設定、注文確定</td><td>キャンペーン告知、おすすめ、定期便</td></tr>
          <tr><td className="hl">きっかけ</td><td>利用者の操作に対する応答</td><td>送信側の都合</td></tr>
          <tr><td className="hl">同意</td><td>不要(サービス提供に必要)</td><td><strong>事前の同意が必要</strong></td></tr>
          <tr><td className="hl">配信停止</td><td>付けない(止まると業務に支障が出る)</td><td><strong>必須</strong>。1操作で解除できること</td></tr>
          <tr><td className="hl">優先度</td><td>即時性が重要</td><td>遅れても問題ない</td></tr>
        </tbody>
      </table>

      <p>
        日本では特定電子メール法、海外向けには各国の同種の法令が関わります。<Term>配信停止した人に送ってしまう</Term>のは法的なリスクであると同時に、苦情として数えられて到達率を直接下げます。配信停止の状態は、テンプレート側ではなく<Term>送信の直前に必ず確認</Term>します。
      </p>

      <Heading num="04">リクエストの中で送らない</Heading>
      <p>
        メール送信は<Link href="/backend/jobs">ジョブキュー</Link>の代表的な用途です。リクエストの中で直接送ると、送信サービスの障害が<Term>ユーザー登録そのものの失敗</Term>になってしまいます。
      </p>

      <pre>
        <code>{`// application/register-user.ts
async execute(input: RegisterInput) {
  const user = await this.uow.run(async (tx) => {
    const user = User.register(input);
    await this.users.save(user, tx);
    // 同じトランザクションで送信予約を記録する
    await this.outbox.enqueue({ type: "welcome_mail", userId: user.id }, tx);
    return user;
  });
  return user;   // メールの成否は登録の成否と切り離す
}`}</code>
      </pre>

      <p>
        ワーカー側では<Term>冪等に</Term>送ります。ジョブは<Link href="/backend/jobs">2回実行され得る</Link>ので、送信記録に一意キーで先に書き込み、すでに記録があれば飛ばします。「登録完了メールが2通届く」は、実装の不備が最も分かりやすく表に出る形です。
      </p>

      <Heading num="05">中身の作り方</Heading>
      <table>
        <thead>
          <tr><th>項目</th><th>方針</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">テンプレート</td><td>コードに直書きしない。文言修正を開発者の作業にしない</td></tr>
          <tr><td className="hl">HTMLとテキスト</td><td><strong>両方を送る</strong>。テキスト版が無いと迷惑メール判定されやすい</td></tr>
          <tr><td className="hl">HTMLの書き方</td><td>メールソフトのCSS対応は貧弱。表による組版と行内スタイルが今も現役</td></tr>
          <tr><td className="hl">差し込み値</td><td>必ず<strong>エスケープ</strong>する。利用者名にHTMLを入れられる余地を残さない</td></tr>
          <tr><td className="hl">リンク</td><td>絶対URLで書く。使い捨てのリンクは有効期限を短く</td></tr>
          <tr><td className="hl">言語</td><td><Link href="/frontend/i18n">利用者の言語設定</Link>に従う。送信時点の設定を使う</td></tr>
          <tr><td className="hl">件名</td><td>本文と一貫させる。過度な記号や煽り文句は評価を下げる</td></tr>
        </tbody>
      </table>

      <Aside label="個人情報を本文に書きすぎない">
        メールは経路上で暗号化される保証がなく、受信箱に残り続けます。パスワードそのものを書くのは論外として、注文内容や住所も<Term>「詳細はこちら」とリンクで見せる</Term>ほうが安全です。
      </Aside>

      <Heading num="06">送った後 ― 戻りを処理する</Heading>
      <table>
        <thead>
          <tr><th>出来事</th><th>意味</th><th>対応</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">恒久的な失敗</td><td>宛先が存在しない</td><td><strong>そのアドレスへの送信を永久に停止する</strong></td></tr>
          <tr><td className="hl">一時的な失敗</td><td>容量超過、一時的な障害</td><td>間隔を空けて再試行。続くなら停止</td></tr>
          <tr><td className="hl">苦情</td><td>受信者が迷惑メールとして報告した</td><td><strong>即座に配信停止</strong>。放置は到達率を壊す</td></tr>
          <tr><td className="hl">配信停止の申し出</td><td>本人が解除した</td><td>該当種別の送信を止める</td></tr>
        </tbody>
      </table>

      <p>
        これらは送信サービスから通知として届きます。<Term>受け取って抑制リストに反映しない限り</Term>、存在しないアドレスへ延々と送り続け、送信元の評価が下がっていきます。通知の受け口には署名の検証を必ず入れ、こちらも冪等に処理します。
      </p>

      <Heading num="07">開発環境での誤送信を仕組みで防ぐ</Heading>
      <p>
        メール実装で最も怖い事故は、<Term>本番データを使ったテストで実在の顧客に誤送信すること</Term>です。注意力ではなく仕組みで防ぎます。
      </p>

      <table>
        <thead>
          <tr><th>対策</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ローカル</td><td>受け止めるだけの偽サーバーに送り、ブラウザで確認する</td></tr>
          <tr><td className="hl">検証環境</td><td>送信サービスの試験モード、または<strong>全宛先を開発チームのアドレスに強制置換</strong></td></tr>
          <tr><td className="hl">環境の判定</td><td>本番以外では、許可リストに無い宛先への送信を<strong>コード側で例外にする</strong></td></tr>
          <tr><td className="hl">テスト</td><td>送信処理を<Link href="/backend/layers">インターフェースとして受け取り</Link>、記録するだけの実装に差し替える</td></tr>
        </tbody>
      </table>

      <Heading num="08">メールだけが通知ではない</Heading>
      <table>
        <thead>
          <tr><th>手段</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">メール</td><td>記録が残る。即時性は低い。到達は不確実</td></tr>
          <tr><td className="hl">アプリ内通知</td><td>確実に届く(見に来れば)。<strong>まずこれを実装すべき</strong>ことが多い</td></tr>
          <tr><td className="hl">プッシュ通知</td><td>即時性が高い。許可が要り、乱発すると切られる</td></tr>
          <tr><td className="hl">SMS</td><td>到達率が高く即時。費用が高い。認証コードなどに限定する</td></tr>
          <tr><td className="hl">チャットツール</td><td>社内向け・運用の警報向け</td></tr>
        </tbody>
      </table>

      <p>
        設計としては、<Term>「通知したい出来事」と「どう届けるか」を分離</Term>します。業務側は「注文が確定した」という出来事を発行するだけにし、どの手段で何を送るかは通知側の関心事として切り出します ― <Link href="/design/architecture-event-driven">イベント駆動</Link>の素直な適用例です。あわせて、利用者が<Term>種類ごとに受け取り方を選べる</Term>設定を用意します。全部か無かしか選べない通知は、結局すべて切られます。
      </p>

      <Analogy label="💡 たとえるなら">
        郵便の差し出しに似ています。ポストに入れたことと、相手が読んだことの間には大きな距離があります。差出人が誰か証明できなければ配達員は怪しんで届けませんし、宛先不明の手紙が何度も返ってくるのに同じ住所へ出し続ければ、郵便局は差出人自体を警戒し始めます。だから<Term>返ってきた通知をきちんと読んで宛先簿を手入れすること</Term>が、次の手紙が届くかどうかを決めます。
      </Analogy>

      <Heading num="まとめ">送信は非同期、到達は運用</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>送信サービスと3つのDNS</h4>
          <p>自前では届かない。SPF・DKIM・DMARCを揃え、サブドメインを分ける。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>リクエストから切り離す</h4>
          <p>ジョブ経由で冪等に。送信サービスの障害が登録の失敗になってはいけない。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>戻りを処理する</h4>
          <p>宛先不明と苦情を抑制リストに反映しないと、到達率は下がり続ける。</p>
        </Card>
      </CardGrid>

      <p>
        ここまで2回出てきた「後回しにする仕組み」そのものを、次に見ます。<Link href="/backend/jobs">ジョブキューとワーカー</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/mail" />
    </DocsPage>
  );
}
