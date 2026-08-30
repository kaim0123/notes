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
  title: "レート制限",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド &middot; 本番運用</Eyebrow>
        <h1>レート制限 ― 使いすぎを止める</h1>
        <Lead>
          公開されたAPIには、想定を超える量のリクエストが必ず来ます。悪意ある攻撃だけでなく、バグで無限ループしたクライアント、善意の全件取得スクリプト、想定外に流行した機能。<Term>レート制限</Term>は、そうした過剰な利用から<strong>サービス全体を守る最後の砦</strong>です。<Link href="/security/network-defense">ネットワーク層の防御</Link>で扱った視点を、アプリケーション層で実装します。
        </Lead>
      </Hero>

      <Heading num="01">何から守るのか</Heading>
      <table>
        <thead>
          <tr><th>守る対象</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">サービスの可用性</td><td>1人の過剰利用で、他の全利用者が遅くなるのを防ぐ</td></tr>
          <tr><td className="hl">下流の資源</td><td>DB接続、外部APIのクォータ ― <strong>自分より先に壊れるもの</strong>を守る</td></tr>
          <tr><td className="hl">コスト</td><td>従量課金のAI API、SMS送信、画像変換。<strong>請求書が攻撃対象になる</strong></td></tr>
          <tr><td className="hl">認証</td><td>総当たり、クレデンシャルスタッフィング(<Link href="/dev/backend/auth/account">前章</Link>)</td></tr>
          <tr><td className="hl">データ</td><td>スクレイピングによる一括取得</td></tr>
          <tr><td className="hl">迷惑行為</td><td>スパム投稿、メール爆撃</td></tr>
        </tbody>
      </table>
      <p>特に見落とされやすいのが<strong>コスト</strong>です。1回の呼び出しが数十円かかる処理に制限が無ければ、悪意ある利用者は無料で他人の財布を減らせます。従量課金の処理には、必ず利用者単位の上限を置きます。</p>

      <Heading num="02">どの層で止めるか</Heading>
      <p>制限は<strong>できるだけ手前で</strong>かけるのが原則です。アプリまで届いた時点で、すでにコネクションとCPUを消費しているためです。</p>
      <table>
        <thead>
          <tr><th>層</th><th>できること</th><th>できないこと</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">CDN / WAF</td><td>大量の攻撃をアプリに届く前に遮断する</td><td>利用者やプランを区別した細かい制御</td></tr>
          <tr><td className="hl">ロードバランサ / APIゲートウェイ</td><td>APIキー単位の上限。アプリの実装が不要</td><td>業務ロジックに依存した判断</td></tr>
          <tr><td className="hl">アプリケーション</td><td><strong>利用者・プラン・エンドポイントごとの精密な制御</strong></td><td>そこに届く前の負荷を減らすこと</td></tr>
        </tbody>
      </table>
      <p>両方使うのが正解です。<strong>粗い防御を手前に、細かい制御をアプリに</strong>置きます。</p>

      <Heading num="03">アルゴリズム</Heading>
      <table>
        <thead>
          <tr><th>方式</th><th>仕組み</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">固定ウィンドウ</td><td>「毎分0秒からの100回」を数える</td><td>実装が最も簡単。<strong>境界問題</strong>あり</td></tr>
          <tr><td className="hl">スライディングウィンドウ</td><td>「直近60秒間の100回」を数える</td><td>公平。実装はやや複雑</td></tr>
          <tr><td className="hl"><Term>トークンバケット</Term></td><td>一定速度で補充されるトークンを消費する</td><td><strong>バースト(一時的な集中)を許容できる</strong>。最も実用的</td></tr>
          <tr><td className="hl">リーキーバケット</td><td>一定速度で処理し、溢れた分を捨てる</td><td>下流への流量を平準化したいとき</td></tr>
        </tbody>
      </table>
      <p>固定ウィンドウの<strong>境界問題</strong>とは、「毎分100回」の制限に対し、59秒に100回・61秒に100回を投げると、実質2秒で200回通ってしまう現象です。厳密さが要るなら、スライディングウィンドウかトークンバケットを選びます。</p>
      <p>実務では<strong>トークンバケット</strong>が好まれます。「普段は静かだが、画面を開いた瞬間に10本まとめて呼ぶ」という正常な使い方を許しつつ、継続的な過剰利用は抑えられるためです。</p>

      <Heading num="04">何を単位に数えるか</Heading>
      <p>アルゴリズムより重要なのが<strong>キーの設計</strong>です。ここを誤ると、守れないか、正規の利用者を締め出すかのどちらかになります。</p>
      <table>
        <thead>
          <tr><th>キー</th><th>適する場面</th><th>問題点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">利用者ID</td><td>ログイン後のAPI。<strong>最も正確</strong></td><td>未認証の経路には使えない</td></tr>
          <tr><td className="hl">APIキー / テナントID</td><td>外部提供のAPI。プラン別の上限</td><td>―</td></tr>
          <tr><td className="hl">IPアドレス</td><td>ログイン・登録など未認証の経路</td><td><strong>NAT配下の企業や学校が丸ごと1つに見える</strong>。IPv6は簡単に変えられる</td></tr>
          <tr><td className="hl">IP + エンドポイント</td><td>ログイン試行のような特定操作</td><td>―</td></tr>
        </tbody>
      </table>
      <Aside label="⚠️ プロキシ配下でのIP取得">
        ロードバランサやCDNの背後では、<code>req.ip</code>は<strong>プロキシのアドレス</strong>になります。これを単位に数えると、全利用者が1つのキーに集約されて全員がブロックされます。かといって<code>X-Forwarded-For</code>をそのまま信用すると、<strong>攻撃者が自由に偽装できます</strong>。Expressでは<code>app.set(&quot;trust proxy&quot;, n)</code>で<strong>信頼するプロキシの段数を明示</strong>し、その分だけ右から遡った値を使います。ここは本番でのみ壊れる箇所なので、必ず実環境で確認します。
      </Aside>
      <p>あわせて、<strong>エンドポイントごとに上限を変えます</strong>。一律の値では、軽い読み取りに厳しすぎるか、重い検索に緩すぎるかのどちらかになります。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>目安</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ログイン・パスワードリセット</td><td>厳しく(5回/分程度)</td></tr>
          <tr><td className="hl">一般的な読み取り</td><td>緩く(100回/分程度)</td></tr>
          <tr><td className="hl">書き込み</td><td>中程度</td></tr>
          <tr><td className="hl">重い処理(検索・エクスポート・AI呼び出し)</td><td>回数ではなく<strong>コストで数える</strong></td></tr>
        </tbody>
      </table>

      <Heading num="05">実装 ― 分散環境では共有カウンタが要る</Heading>
      <p>プロセス内のメモリで数えると、サーバーが3台あれば実質3倍まで通ります。<Link href="/dev/backend/cache">キャッシュ</Link>と同じ問題です。正確に制限するにはRedisなどの共有ストアを使います。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 固定ウィンドウの最小実装 ― INCR と EXPIRE を原子的に行う
async function consume(key: string, limit: number, windowSec: number) {
  const bucket = \`rl:\${key}:\${Math.floor(Date.now() / 1000 / windowSec)}\`;

  const count = await redis.incr(bucket);
  if (count === 1) await redis.expire(bucket, windowSec);

  return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
}`}</code>
      </pre>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// ミドルウェアとして差し込む
export const rateLimit = (opts: Options) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const key = req.user?.id ?? req.ip;
    const { allowed, remaining } = await consume(key, opts.limit, opts.window);

    res.setHeader("RateLimit-Limit", opts.limit);
    res.setHeader("RateLimit-Remaining", remaining);

    if (!allowed) {
      res.setHeader("Retry-After", opts.window);
      return res.status(429).json({ code: "rate_limited" });
    }
    next();
  };

router.post("/login", rateLimit({ limit: 5, window: 60 }), loginHandler);`}</code>
      </pre>
      <p>より厳密な制御が必要なら、判定と更新を1つのLuaスクリプトにまとめて<strong>原子的に</strong>実行します。上の実装は、<code>INCR</code>と<code>EXPIRE</code>の間で落ちるとキーが永続化する隙があります。</p>

      <Heading num="06">返し方 ― 429と待つべき時間</Heading>
      <p>制限にかかったことは、<strong>クライアントが正しく対処できる形</strong>で伝えます。</p>
      <table>
        <thead>
          <tr><th>要素</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>429 Too Many Requests</code></td><td>制限による拒否。<strong>403や500で返さない</strong></td></tr>
          <tr><td className="hl"><code>Retry-After</code></td><td>何秒後に再試行してよいか。<strong>これが無いとクライアントは即座に再試行する</strong></td></tr>
          <tr><td className="hl"><code>RateLimit-*</code>ヘッダー</td><td>上限・残り・リセット時刻。良識あるクライアントは事前に減速できる</td></tr>
          <tr><td className="hl">応答本文</td><td>機械可読なコードと、人間向けの説明</td></tr>
        </tbody>
      </table>
      <p>クライアント側は、429を受けたら<Link href="/dev/backend/ops/resilience">指数バックオフ</Link>で待ちます。即座に再試行するクライアントは、制限を強めるほど<strong>より激しく叩いてくる</strong>ため、状況を悪化させます。</p>

      <Heading num="07">締め出さないための配慮</Heading>
      <table>
        <thead>
          <tr><th>配慮</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">まず記録だけする</td><td>導入時は<strong>ブロックせずログだけ出し</strong>、実際の分布を見てから閾値を決める</td></tr>
          <tr><td className="hl">許可リスト</td><td>社内のバッチ、監視、ヘルスチェックは対象外にする</td></tr>
          <tr><td className="hl">プラン別の上限</td><td>有料プランには高い上限を。<strong>制限は商品設計の一部でもある</strong></td></tr>
          <tr><td className="hl">段階的な対応</td><td>いきなり遮断せず、まず遅延させる(<Term>スロットリング</Term>)</td></tr>
          <tr><td className="hl">監視</td><td>429の発生数を監視する。<strong>急増は攻撃か、自社クライアントのバグ</strong></td></tr>
        </tbody>
      </table>
      <p>レート制限は「攻撃者を止める機能」であると同時に、<strong>「自社のクライアントのバグを検知する機能」</strong>でもあります。429が急増したら、まず自分たちのアプリのリリース履歴を確認する価値があります。</p>

      <Analogy label="💡 たとえるなら">
        レート制限は、食べ放題の店の「1人◯皿まで」ではなく、<strong>入口の整理券</strong>です。目的は特定の客を罰することではなく、店内が満員で誰も食事できない状態を防ぐこと。だから断るときは「いま満席です、15分後にお越しください」と<strong>次に来るべき時刻を伝える</strong>(<code>Retry-After</code>)。それを言わずに追い返せば、客は1分ごとにドアを叩き続け、かえって受付が混雑します。
      </Analogy>

      <Heading num="まとめ">手前で止め、待つ時間を伝える</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>下流とコストを守る</h4><p>DB接続や従量課金の処理が先に壊れる。請求書も攻撃対象になる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>キー設計が肝心</h4><p>認証後は利用者ID、未認証はIP。プロキシ配下のIP取得は必ず実環境で確認する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>429とRetry-After</h4><p>再試行の指針を返さないと、制限が状況を悪化させる。導入時はまず記録だけする。</p></Card>
      </CardGrid>
      <p>次は、自分が呼び出す側になったときの守り方です。<Link href="/dev/backend/ops/resilience">タイムアウト・リトライ・サーキットブレーカー</Link>へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/security/network-defense" tag="セキュリティ">ネットワーク層の防御</RelatedLink>
            <RelatedLink href="/dev/backend/auth/account" tag="バックエンド">パスワードとアカウント回復</RelatedLink>
            <RelatedLink href="/dev/backend/express/middleware" tag="バックエンド">ミドルウェア</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
