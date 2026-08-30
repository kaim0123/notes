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
  Diagram,
  Steps,
  Timeline,
  TimelineItem,
  TimelineLabel,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "DNS",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>DNS ― 名前をIPアドレスに変える、インターネットの電話帳</h1>
        <Lead>
          2021年秋、Facebook・Instagram・WhatsAppが約6時間同時にダウンした原因は、ハッキングでもサーバー故障でもなく、名前をIPアドレスへ変換する仕組み――DNSへ辿り着く経路が一時的に消えたことでした。ここでは「インターネットの電話帳」であるDNSの仕組みと、1983年の設計転換から現在まで続く40年の攻防を辿ります。
        </Lead>
      </Hero>

      <Heading num="01">DNSとは ― 名前解決とレコード</Heading>
      <p>人間は<code>example.com</code>のような名前でサイトを覚えますが、コンピュータ同士の通信で使うのは<Term>IPアドレス</Term>という数字の住所だけです。この名前から番号への変換を担うのが<Term>DNS(Domain Name System)</Term>で、変換処理そのものを<Term>名前解決(レゾリューション)</Term>と呼びます。1つのページを開くだけで、広告・画像・外部の部品まで含めて何十回もこの変換が裏側で走ることがあります。</p>

      <table>
        <tbody>
          <tr><th>レコード</th><th>意味</th></tr>
          <tr><td className="hl">Aレコード</td><td>IPv4の番号</td></tr>
          <tr><td className="hl">AAAAレコード</td><td>IPv6の番号</td></tr>
          <tr><td className="hl">MXレコード</td><td>メールの宛て先</td></tr>
          <tr><td className="hl">CNAME</td><td>ある名前を別の名前へ転送</td></tr>
          <tr><td className="hl">TXTレコード</td><td>自由な情報(送信者認証・ドメイン所有者確認など)</td></tr>
        </tbody>
      </table>
      <p>DNSは単なる番号案内にとどまらず、その名前にまつわる道しるべの集合体でもあります。乗っ取られたり止まったりすると、接続だけでなくメールの送受信や本人確認まで崩れる恐れがあります。</p>

      <Heading num="02">DNS以前 ― HOSTS.TXTという単一障害点</Heading>
      <p>1970年代のARPANETでは、全ホストの名前と番号の対応を、世界にたった1つのテキストファイル<Term>HOSTS.TXT</Term>で管理していました。更新はSRI(スタンフォード研究所)の<strong>エリザベス・ファインラー</strong>らのチームが手作業で行い、更新版を世界中のホストがダウンロードしてコピーする方式でした。</p>
      <p>台数が数百のうちは回っていましたが、増えるほどファイルは膨らみ、更新が追いつかず、配布だけで回線がパンクしかけました。名前の重複も人手で裁定する必要があり、管理組織が倒れれば新規登録も更新もすべて止まる、典型的な<Term>単一障害点(SPOF)</Term>でした。</p>

      <Analogy label="💡 たとえるなら">
        HOSTS.TXTは「町内会が手作業で刷って全戸配布する電話帳」のようなものです。町が数十軒のうちは配れても、都市規模に膨れ上がれば印刷と配布だけで人手が尽きてしまいます。
      </Analogy>

      <Heading num="03">1983年、分散と階層への転換</Heading>
      <p>発想の転換は明確でした。全部を1箇所で管理しようとするから破綻するなら、管理を世界中に分けて任せればいい。1983年、南カリフォルニア大学の<strong>ポール・モカペトリス</strong>がこの設計をRFC 882/883として提案します。</p>
      <ul>
        <li><Term>分散</Term> ― <code>.com</code>の担当、<code>.jp</code>の担当……各自が自分の範囲だけ責任を持つ</li>
        <li><Term>階層(ツリー)</Term> ― 根から枝・葉へ降りていく。<code>.com</code>の下で各社が自分のサーバー名を自分で登録し、中央は1行ずつ書き足す必要がない</li>
        <li><Term>委任(デリゲーション)</Term> ― 上の階層が下に管理を任せる。責任のバトンを下へ渡していく</li>
      </ul>

      <table>
        <tbody>
          <tr><th>TLDの種類</th><th>例</th></tr>
          <tr><td className="hl">gTLD</td><td><code>.com</code>・<code>.org</code>など分野別</td></tr>
          <tr><td className="hl">ccTLD</td><td><code>.jp</code>・<code>.uk</code>など国別</td></tr>
        </tbody>
      </table>

      <Diagram caption="委任の連鎖。上位が下位に管理を任せるので、中央がすべてを1行ずつ書き足す必要はない">
        <svg viewBox="0 0 640 275" xmlns="http://www.w3.org/2000/svg">
          <g fontSize="12" fill="#f2f2f2" textAnchor="middle">
            <rect x={280} y={10} width={80} height={34} rx={6} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={320} y={32}>ルート ( . )</text>

            <line x1={320} y1={44} x2={170} y2={80} stroke="#5f5f5f" strokeDasharray="3 3" />
            <line x1={320} y1={44} x2={470} y2={80} stroke="#5f5f5f" strokeDasharray="3 3" />

            <rect x={110} y={80} width={120} height={34} rx={6} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={170} y={102}>.com (gTLD)</text>

            <rect x={410} y={80} width={120} height={34} rx={6} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={470} y={102}>.jp (ccTLD)</text>

            <line x1={170} y1={114} x2={170} y2={150} stroke="#5f5f5f" strokeDasharray="3 3" />
            <rect x={90} y={150} width={160} height={34} rx={6} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={170} y={172}>example.com</text>

            <line x1={470} y1={114} x2={470} y2={150} stroke="#5f5f5f" strokeDasharray="3 3" />
            <rect x={390} y={150} width={160} height={34} rx={6} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
            <text x={470} y={172}>example.co.jp</text>

            <line x1={130} y1={184} x2={80} y2={220} stroke="#5f5f5f" strokeDasharray="3 3" />
            <line x1={210} y1={184} x2={260} y2={220} stroke="#5f5f5f" strokeDasharray="3 3" />
            <rect x={20} y={220} width={120} height={30} rx={6} fill="none" stroke="#5f5f5f" strokeWidth="1" />
            <text x={80} y={240} fontSize="11" fill="#9a9a9a">www.example.com</text>
            <rect x={200} y={220} width={120} height={30} rx={6} fill="none" stroke="#5f5f5f" strokeWidth="1" />
            <text x={260} y={240} fontSize="11" fill="#9a9a9a">mail.example.com</text>
          </g>
        </svg>
      </Diagram>

      <p>当時はまだ数百台規模でしたが、無数の機械がつながる前提で最初から無限に拡張できる形を選びました。人手の住所録係を、機械同士が勝手に名前を引き合える仕組みで置き換えたからこそ、この設計は40年経った今も現役で動いています。</p>

      <Heading num="04">名前解決の仕組み ― リゾルバ・キャッシュ・エニーキャスト</Heading>
      <p>利用者が名前を入力すると、まずプロバイダー等が用意する代理人である<Term>フルサービスリゾルバ</Term>(再帰リゾルバ)が動きます。</p>

      <table>
        <tbody>
          <tr><th>段階</th><th>役割</th></tr>
          <tr><td className="hl">ルートサーバー</td><td>世界の住所録の入り口。番号自体は知らないが「<code>.com</code>ならあっち」と案内する</td></tr>
          <tr><td className="hl">TLDサーバー</td><td>そのドメインの最終的な権威サーバーはここだと教える</td></tr>
          <tr><td className="hl">権威サーバー</td><td>本物のIPアドレスを返す</td></tr>
        </tbody>
      </table>

      <Steps>
        <li><strong>① スタブリゾルバ</strong>ブラウザ・OSがまず手元のキャッシュを確認する</li>
        <li><strong>② フルサービスリゾルバへ</strong>見つからなければプロバイダー等の代理人に丸投げする(再帰)</li>
        <li><strong>③ ルートサーバーへ</strong>「<code>.com</code>ならあっち」という案内を受け取る</li>
        <li><strong>④ TLDサーバーへ</strong>該当ドメインの権威サーバーの場所を教わる</li>
        <li><strong>⑤ 権威サーバーへ</strong>本物のIPアドレスを受け取る</li>
        <li><strong>⑥ キャッシュして返す</strong>結果をTTLの間だけ覚えておき、利用者へ返す</li>
      </Steps>

      <p>利用者側は代理人に丸投げ(再帰)し、代理人はルート→TLD→権威と自分で1段ずつ聞いていきます(反復)。一度引いた番号は<Term>TTL(生存時間)</Term>の間だけキャッシュされ、その間は同じ名前を辿らず即答します。初めて開くサイトが一瞬もたつくのはこの名前解決が原因で、2度目のアクセスが速いのはキャッシュのおかげです。</p>
      <p>「ルートサーバーは13個」というのはよくある誤解です。住所としては13系統ですが、各系統が<Term>エニーキャスト</Term>で世界中に同じ顔のコピーをばらまいており、同じIPを名乗って広告し、問い合わせはネットワーク的に最寄りの1台へ自動で届きます。通信は普段<Term>UDPの53番</Term>(速さ優先・1往復)で行われ、答えが大きすぎるときだけTCPに切り替えます。</p>

      <Analogy label="💡 たとえるなら">
        フルサービスリゾルバは「秘書」です。自分で電話帳をめくる代わりに秘書に丸投げし(再帰)、秘書は「まず総合案内→次に部門案内→最後に担当者」と1段ずつ聞いて回ります(反復)。一度聞いた答えはメモ(キャッシュ)しておき、次に同じ質問が来たら聞き直さず即答します。
      </Analogy>

      <Heading num="05">ガバナンスの危機 ― ポステルとICANN</Heading>
      <p>技術としてのDNSは分散していましたが、ルートを誰が握るかは長い間ほぼ1人に委ねられていました。<strong>ジョン・ポステル</strong>は番号やドメインの割り当てを一手に引き受け、「神に最も近い男」と呼ばれた人物です。</p>
      <p>1998年1月28日、当時13あったルートサーバーの運用者にメールを送り、8つの参照先を自分の大学のマシンへ切り替えさせました。事実上、インターネットの根を1人で掌握して見せたのです。本人は「いざという時のテスト」と説明しましたが、アメリカ政府は強く反発し即時の現状回復を迫りました。</p>
      <p>数日で元に戻りましたが、問いが残りました――世界のインフラの根が1人の善意と判断に委ねられていてよいのか。この一件が引き金となり、根の管理を国際的な組織へ移す流れが生まれます――<Term>ICANN</Term>の設立です。皮肉にもポステル自身はその技術トップに就く予定でしたが、同年秋、心臓の手術中に亡くなりました。教訓は、<strong>技術の分散と権力の分散は別問題</strong>だということ。後者は人間と政治の問題として、改めて戦わなければなりませんでした。</p>

      <Heading num="06">技術の危機 ― カミンスキー攻撃とDNSSEC</Heading>
      <p>2008年、セキュリティ研究者<strong>ダン・カミンスキー</strong>がDNSの致命的な穴を発見します。<Term>キャッシュポイズニング</Term>と呼ばれる、攻撃者が本物の権威サーバーより先に偽の答えをリゾルバに食わせて覚え込ませる攻撃です。</p>
      <p>当時の弱点は、問い合わせの16ビット識別番号さえ一致すれば相手を本物と信じてしまう点にありました。カミンスキーの手口は、存在しない名前を次々に問い合わせ、当たるまで偽の答えを打ち込むというもの。正しい答えが一度入るとしばらく上書きできませんが、毎回新しい名前で問い合わせればキャッシュは空のまま勝負を繰り返せます。当たった瞬間、ドメイン全体の権威サーバー情報まで忍び込ませれば、そのドメインが丸ごと攻撃者の手に落ちます。</p>
      <p>カミンスキーはいきなり公表せず、Microsoftや主要DNSソフト開発者を秘密裏に集めて協調パッチを準備し、2008年7月8日、世界中で一斉にパッチが公開されました。公表前に詳細が一部漏れ、攻撃者と管理者の時間競争になりましたが、大きな被害が広がる前に大半がパッチを当てきりました。</p>
      <p>応急処置の肝は、識別番号に加え<Term>ソースポートもランダム化</Term>し、当てる組み合わせを桁違いに増やすことでした。根本治療は答えに電子署名を付ける<Term>DNSSEC</Term>ですが、全員が足並みを揃えないと信頼の鎖が切れてしまうため、普及は今も途上です。現実的な防御は、DNSSECとランダム化を組み合わせた多重防御になっています。</p>

      <Heading num="07">現実に世界が止まった日</Heading>
      <h3>2016年 Dyn攻撃</h3>
      <p>Twitter・Netflix・Spotify・Redditなどが米東海岸で一斉につながらなくなりました。狙われたのは大手DNS事業者<Term>Dyn</Term>。多くの有名サービスの名前解決を引き受けていたところへ、史上最大級の<Term>DDoS</Term>攻撃が仕掛けられました。攻撃部隊の正体は、乗っ取られた監視カメラ・家庭用ルーター・ウェブカメラなど、弱いパスワードのまま放置された機器が軍隊のように殺到した<Term>Mirai</Term>ボットネットです。多くの企業がDNSをたった1社に任せきりだったことが教訓となり、今は複数事業者の併用が広がっています。</p>

      <h3>2021年 Facebook障害</h3>
      <p>設定変更のミスで、自分の居場所を世界に知らせる<Term>BGP経路広告</Term>ごと丸ごと引っ込めてしまいました。DNSサーバー自体は壊れていません。だがそこへ向かう道が消えただけで、世界中から名前が引けなくなりました。社内の人間まで建物に入れなくなるほど、インフラが連鎖して倒れました。外からの攻撃でも、たった1つの設定ミスでも、名前が引けなくなった瞬間、巨人ですら沈黙するのです。</p>

      <TimelineLabel>DNS、40年の主な出来事</TimelineLabel>
      <Timeline>
        <TimelineItem era="1970年代">ARPANET<br />HOSTS.TXTで一元管理</TimelineItem>
        <TimelineItem era="1983">モカペトリス<br />RFC 882/883で分散設計を提案</TimelineItem>
        <TimelineItem era="1998">ポステル<br />ルート掌握のテストとICANN設立へ</TimelineItem>
        <TimelineItem era="2008">カミンスキー<br />攻撃の発見と協調パッチ</TimelineItem>
        <TimelineItem era="2016">Dyn攻撃<br />Miraiボットネットの大規模DDoS</TimelineItem>
        <TimelineItem era="2021">Facebook障害<br />BGP撤回で名前解決の道が消失</TimelineItem>
      </Timeline>

      <Heading num="08">今日から使える話 ― パブリックDNS・プライバシー・検閲</Heading>
      <p>ネットが急に重い・つながらないとき、DNSを変えると治ることがあります。例えばGoogleの<code>8.8.8.8</code>やCloudflareの<code>1.1.1.1</code>――プロバイダーの代理人を、別の優秀な代理人に取り替える操作です。</p>
      <p>背景には、かつて一部プロバイダーが存在しない名前を引くとエラーではなく自社の広告ページへ誘導していたことへの反発があります。余計なことをしない中立なDNSという旗印で、<Term>パブリックDNS</Term>が広まりました。皮肉なのは、みんなが巨大テックのDNSに集まれば、分散させたはずの名前解決がまた一握りに集中してしまう<Term>再中央集権化</Term>が起きることです。</p>
      <p>最初の数秒画面が真っ白で固まる体感は、多くの場合DNSの応答待ちによるものですが、原因は常にDNSとは限りません。どのDNSを使うかは、誰に閲覧履歴を預けるかという<Term>プライバシー</Term>の問題でもあり、近年は問い合わせ自体を暗号化する<Term>DNS over HTTPS(DoH)</Term>のような動きも進んでいます。</p>
      <p>DNSは検閲・フィルタにも使われます。学校や会社が「そんな住所はありません」と嘘の答えを返してアクセスをブロックすることがあり、逆に信頼できるDNSに切り替えると急に見られるようになるのもこのためです。変える先は信頼できるところに限ります――怪しいDNSはそれ自体が汚染の温床になります。</p>

      <Heading num="まとめ">1983年から変わらない設計</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>分散と階層が土台</h4><p>1983年のモカペトリスの設計は、中央集権のHOSTS.TXTが抱えた単一障害点を、委任の連鎖で解消しました。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>技術の分散と権力の分散は別問題</h4><p>ポステルの一件は、根の管理を1人の善意に委ねてよいのかという政治的な問いを突きつけました。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>危機のたびに多重防御が積まれた</h4><p>カミンスキー攻撃はソースポートのランダム化とDNSSECを、Dyn・Facebookの障害は事業者の分散を教訓として残しました。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>普段は空気、止まれば道連れ</h4><p>サーバーが生きていても、名前が引けなければ誰もたどり着けません。</p></Card>
      </CardGrid>
      <p>次にネットが急につながらなくなったら、サーバーが死んだのではなく、電話帳が一瞬迷子になっただけかもしれません。名前解決の後、実際にコンテンツがブラウザへ届くまでの続きは「<Link href="/network/applications/web">Webの仕組み</Link>」で見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/network/layers" tag="ネットワーク">階層モデル ― OSI参照モデルとTCP/IP</RelatedLink>
                    <RelatedLink href="/network/applications/web" tag="インターネット">Webの仕組み ― URLからレンダリングまで</RelatedLink>
                    <RelatedLink href="/cloud/aws/network/route53" tag="AWS">Route 53 ― ドメイン名を宛先へ振り分ける</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
