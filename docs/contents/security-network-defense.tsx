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
  title: "ネットワーク層の防御",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>ネットワーク層の防御 ― コードの外側を守る</h1>
        <Lead>
          どれだけ入力検証や認可のコードを書き込んでも、それだけではサーバーは守れません。<Term>マルウェア</Term>に感染した端末、パスワードだけで突破されるログイン、社内ネットワークに潜む攻撃者
          ― コードの外側にも、守るべき領域が広がっています。
        </Lead>
      </Hero>

      <p><Link href="/security">セキュリティ</Link>の多層防御の表で見た通り、アプリケーション層・セッション層の対策はここまでの各ページで扱ってきました。このページでは、その外側 ―
      ネットワーク層以下と、PCやスマートフォンといった<Term>エンドポイント</Term>の防御を扱います。攻撃者はアプリのコードだけでなく、通信経路や端末そのものも同じように狙ってきます。</p>

      <Heading num="01">悪意あるプログラムとの戦い</Heading>
      <p>ネットワーク層以下の防御を語る前に、まず何と戦っているのかを確認します。相手は多くの場合、端末に入り込む<Term>マルウェア(悪意あるプログラム)</Term>です。</p>

      <h3>ウイルス ― 他のファイルに寄生して広がる</h3>
      <p>正規のファイルやプログラムに自分のコードを埋め込み、そのファイルが実行されるたびに一緒に動き出して増殖します。人が動かなければ広がらない生物のウイルスに似た性質から、この名前が付いています。</p>

      <h3>ランサムウェア ― データを人質に取る</h3>
      <p>端末やサーバー内のファイルを勝手に暗号化し、元に戻す代金(身代金)を要求する攻撃です。個人のPC1台だけでなく、企業の基幹システムやサーバー群がまるごと暗号化され、業務が完全に停止する被害が近年多発しています。バックアップを取っていても、そのバックアップ先までネットワーク越しに暗号化されてしまうケースがあるため、<Term>オフラインの世代管理バックアップ</Term>が重要な防御策になります。</p>

      <Heading num="02">エンドポイントを守る ― EDRとXDR</Heading>
      <p>ウイルス対策ソフト(アンチウイルス)は「既知の悪意あるファイルのパターン(シグネチャ)」と照合して検知する仕組みでした。しかし攻撃者は毎日新しい亜種を作るため、パターンにない未知の攻撃をすり抜けられてしまいます。そこで生まれたのが、端末の挙動そのものを継続的に監視する仕組みです。</p>

      <table>
        <thead>
          <tr><th></th><th>EDR</th><th>XDR</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">正式名称</td><td>Endpoint Detection and Response</td><td>Extended Detection and Response</td></tr>
          <tr><td className="hl">監視の範囲</td><td>PC・サーバーなど個々のエンドポイント</td><td>エンドポイントに加え、ネットワーク・メール・クラウドなど複数領域</td></tr>
          <tr><td className="hl">やること</td><td>不審な挙動(未知のプロセス起動、異常な通信など)を検知し、端末の隔離・調査を行う</td><td>複数領域のログを横断的に相関分析し、単独では気づけない攻撃の全体像を把握する</td></tr>
        </tbody>
      </table>
      <p>つまりXDRは、EDRが持つ「検知して対応する(Detection and Response)」という考え方を、エンドポイントだけでなくネットワーク機器やクラウドサービスのログにまで広げたものです。1台の端末だけを見ていては気づけない、組織全体をまたぐ攻撃の兆候を見つけやすくなります。</p>

      <Heading num="03">「社内ネットワークだから安全」を捨てる ― ゼロトラスト</Heading>
      <p>従来の防御は、社内ネットワークの内側と外側の間に境界線を引き、ファイアウォールや<Term>VPN</Term>(インターネット越しに安全な専用線のような接続を作る技術)で外側からの侵入を防ぐという考え方が中心でした。境界の内側にいったん入れれば、比較的自由に社内システムへアクセスできる ― これが<Term>境界防御</Term>です。</p>

      <Analogy label="💡 たとえるなら">
        境界防御は「城壁で囲まれた城」です。頑丈な城壁(ファイアウォール)と跳ね橋(VPN)で外敵の侵入を防ぎますが、一度城門をくぐって中に入ってしまえば、城内は比較的自由に歩き回れます。ところが現代の「城」は、社員が自宅やカフェから接続し、データはクラウド上に置かれ、外部の取引先もアクセスしてくる ―
        そもそも「城壁の内側」がどこなのか曖昧になってしまいました。<Term>ゼロトラスト</Term>は、城壁への信頼をやめ、「社内ネットワークだから安全」という前提を捨てる考え方です。城の中であっても、部屋(システム)に入るたびに毎回身分証を確認します。
      </Analogy>

      <Diagram caption="境界防御:城壁の内側は信頼される / ゼロトラスト:アクセスのたびに毎回検証する">
        <svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
          <rect x={40} y={30} width={220} height={160} rx={8} fill="none" stroke="#5f5f5f" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={150} y={20} fill="#9a9a9a" fontSize="13" textAnchor="middle">境界防御</text>
          <rect x={70} y={60} width={60} height={30} rx={4} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={100} y={80} fill="#9a9a9a" fontSize="11" textAnchor="middle">利用者</text>
          <line x1={130} y1={75} x2={175} y2={75} stroke="#39ff6a" strokeWidth="1.5" />
          <polygon points="175,75 165,70 165,80" fill="#39ff6a" />
          <text x={152} y={65} fill="#39ff6a" fontSize="10" textAnchor="middle">1回だけ認証</text>
          <rect x={175} y={100} width={60} height={30} rx={4} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={205} y={120} fill="#9a9a9a" fontSize="11" textAnchor="middle">社内A</text>
          <rect x={90} y={140} width={60} height={30} rx={4} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={120} y={160} fill="#9a9a9a" fontSize="11" textAnchor="middle">社内B</text>
          <text x={150} y={205} fill="#9a9a9a" fontSize="11" textAnchor="middle">境界の内側は自由に移動できる</text>

          <rect x={360} y={30} width={240} height={160} rx={8} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={480} y={20} fill="#9a9a9a" fontSize="13" textAnchor="middle">ゼロトラスト</text>
          <rect x={385} y={90} width={60} height={30} rx={4} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={415} y={110} fill="#9a9a9a" fontSize="11" textAnchor="middle">利用者</text>
          <line x1={445} y1={105} x2={490} y2={70} stroke="#39ff6a" strokeWidth="1.5" />
          <text x={500} y={65} fill="#39ff6a" fontSize="10" textAnchor="middle">毎回検証</text>
          <rect x={490} y={45} width={70} height={28} rx={4} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={525} y={64} fill="#9a9a9a" fontSize="11" textAnchor="middle">システムA</text>
          <line x1={445} y1={105} x2={490} y2={150} stroke="#39ff6a" strokeWidth="1.5" />
          <text x={500} y={135} fill="#39ff6a" fontSize="10" textAnchor="middle">毎回検証</text>
          <rect x={490} y={150} width={70} height={28} rx={4} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={525} y={169} fill="#9a9a9a" fontSize="11" textAnchor="middle">システムB</text>
        </svg>
      </Diagram>

      <p>この「毎回検証する」を実現する要となるのが<Term>MFA(多要素認証)</Term>です。パスワード(知っているもの)だけでなく、スマートフォンの認証アプリ(持っているもの)や指紋(本人自身の特徴)など、複数の要素を組み合わせて本人確認を行います。詳しくは<Link href="/security/auth">認証</Link>のページで扱っています。ゼロトラストのもとでも<Term>ファイアウォール</Term>や<Term>VPN</Term>が不要になるわけではありません。境界を「唯一の壁」として過信せず、内側でも1つ1つのアクセスを検証する層を重ねる ― これもまた多層防御の一部です。</p>

      <Heading num="04">通信を監視・遮断する</Heading>
      <p>境界防御であれゼロトラストであれ、ネットワークを流れる通信そのものを検査する仕組みは欠かせません。</p>

      <h3>ファイアウォールとWAF</h3>
      <p><Term>ファイアウォール</Term>は、IPアドレスやポート番号といった通信の宛先・送信元をもとに、通してよい通信と拒否する通信を判定する仕組みです。主にネットワーク層・トランスポート層で働きます。一方<Term>WAF(Web Application Firewall)</Term>は、通信の中身、つまりHTTPリクエストの内容そのものを検査し、<Link href="/security/sqli">SQLインジェクション</Link>や<Link href="/security/xss">XSS</Link>のような攻撃パターンを検知・遮断します。ファイアウォールが「誰と通信してよいか」を見るのに対し、WAFは「何を送ってきたか」を見る ― アプリケーション層を守る点で、本サイトの他ページで扱ってきた対策と地続きの存在です。</p>

      <h3>IDSとIPS ― 気づくだけか、止めるかの違い</h3>
      <p>ネットワークを流れる通信を監視し、不審な通信パターンを検知する仕組みが<Term>IDS(不正侵入検知システム)</Term>と<Term>IPS(不正侵入防止システム)</Term>です。両者の違いは、検知した後の振る舞いにあります。</p>

      <table>
        <thead>
          <tr><th></th><th>IDS</th><th>IPS</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">正式名称</td><td>Intrusion Detection System</td><td>Intrusion Prevention System</td></tr>
          <tr><td className="hl">検知</td><td>する</td><td>する</td></tr>
          <tr><td className="hl">遮断</td><td>しない(通知・記録のみ)</td><td>する(通信をその場で遮断する)</td></tr>
          <tr><td className="hl">設置のイメージ</td><td>通信の脇に立って監視するだけ(ミラーポート)</td><td>通信経路上に割り込む(インライン設置)</td></tr>
        </tbody>
      </table>
      <p>IDSは「見張り」、IPSは「見張りに加えて実際に止める門番」と考えると分かりやすいでしょう。IPSは自動遮断できる分、正常な通信を誤って攻撃と判定してしまう<Term>誤検知(フォールスポジティブ)</Term>が起きたときの影響が大きく、検知精度のチューニングが特に重要になります。</p>

      <Heading num="05">見えない対策 ― ログ・監査・権限管理</Heading>
      <p>マルウェア対策やファイアウォールのような「防ぐ」仕組みだけでなく、「何が起きたかを後から追える」仕組みも防御の一部です。</p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ログ</h4>
          <p>誰が・いつ・どこから・何にアクセスしたかを記録する。侵入の予兆に気づき、事後に被害範囲を調査するための土台になる。アプリケーション側のログ設計は<Link href="/security/logging">ログ出力設計</Link>で詳しく扱っている。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>監査</h4>
          <p>ログや設定、権限の付与状況を定期的に第三者の目でチェックする。「対策を導入した」で終わらせず、実際に機能しているかを継続的に確認する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>権限管理</h4>
          <p>「必要な人に、必要な範囲の権限だけを与える」最小権限の原則。退職者・異動者のアカウントを放置しないことも含め、権限そのものが攻撃対象になり得るという意識が要になる。</p>
        </Card>
      </CardGrid>

      <Aside label="豆知識">
        マルウェアに感染した端末や、パスワードだけで突破されたアカウントが「入口」になったとしても、その後の異常な振る舞い(普段アクセスしないサーバーへの接続、深夜の大量ダウンロードなど)をログと監査で捉えられれば、被害を最小限に抑えられます。侵入を100%防ぐことよりも、侵入されても早く気づける仕組みの方が、現実的には重要です。
      </Aside>

      <Heading num="まとめ">層を重ねて、外側から守る</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>端末はEDR/XDRで継続監視する</h4>
          <p>既知のパターン照合だけに頼らず、端末やネットワークの挙動そのものを見て未知の脅威に気づく。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>「境界の内側は安全」を前提にしない</h4>
          <p>ゼロトラストは、社内ネットワークであってもアクセスのたびに検証する考え方。MFAがその土台になる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>防ぐ仕組みと、気づく仕組みの両方を持つ</h4>
          <p>ファイアウォール・WAF・IDS/IPSで通信を検査しつつ、ログと監査で「何が起きたか」を後から追えるようにする。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/auth" tag="セキュリティ">認証</RelatedLink>
                    <RelatedLink href="/security/session" tag="セキュリティ">セッションとCookie管理</RelatedLink>
                    <RelatedLink href="/infra/monitoring" tag="インフラ">監視・保守</RelatedLink>
                    <RelatedLink href="/infra/incident" tag="インフラ">障害の切り分け</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
