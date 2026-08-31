import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "レート制限" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>レート制限 ― 使いすぎを止める</h1>
        <Lead>
          公開されたAPIには、想定を超える量のリクエストが必ず来ます。悪意ある攻撃だけでなく、バグで無限ループしたクライアント、善意の全件取得、想定外に流行した機能。<Term>レート制限</Term>は、そうした過剰な利用からサービス全体を守る最後の砦です。
        </Lead>
      </Hero>

      <Heading num="01">何から守るのか</Heading>
      <table>
        <thead>
          <tr><th>守る対象</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">サービスの可用性</td><td>1人の過剰利用で、他の全利用者が遅くなるのを防ぐ</td></tr>
          <tr><td className="hl">下流の資源</td><td>接続の本数、外部APIの割り当て ― <strong>自分より先に壊れるもの</strong></td></tr>
          <tr><td className="hl">コスト</td><td>従量課金の処理。<strong>請求書が攻撃対象になる</strong></td></tr>
          <tr><td className="hl">認証</td><td>総当たりと、他所で漏れた組み合わせを試す攻撃</td></tr>
          <tr><td className="hl">データ</td><td>一括での取得</td></tr>
          <tr><td className="hl">迷惑行為</td><td>投稿の連投、メールの大量送信</td></tr>
        </tbody>
      </table>

      <p>
        とくに見落とされやすいのが<Term>コスト</Term>です。1回の呼び出しに数十円かかる処理に制限が無ければ、悪意ある利用者は<Term>無料で他人の財布を減らせます</Term>。従量課金の処理には、必ず利用者単位の上限を置きます。
      </p>

      <Heading num="02">できるだけ手前で止める</Heading>
      <p>
        アプリまで届いた時点で、すでに接続とCPUを消費しています。
      </p>

      <table>
        <thead>
          <tr><th>層</th><th>できること</th><th>できないこと</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">配信網 / 前段の防御</td><td>大量の攻撃をアプリに届く前に遮断する</td><td>利用者やプランを区別した細かい制御</td></tr>
          <tr><td className="hl">負荷分散 / ゲートウェイ</td><td>キー単位の上限。アプリの実装が不要</td><td>業務ロジックに依存した判断</td></tr>
          <tr><td className="hl">アプリケーション</td><td><strong>利用者・プラン・エンドポイントごとの精密な制御</strong></td><td>そこに届く前の負荷を減らすこと</td></tr>
        </tbody>
      </table>

      <p>
        両方使うのが正解です。<Term>粗い防御を手前に、細かい制御をアプリに</Term>置きます。
      </p>

      <Heading num="03">数え方の違い</Heading>
      <DiagramFrame
        slug="backend-ops-rate-window"
        aspect="640 / 330"
        caption="区切りごとに数え直す方式の境界問題と、持ち玉を消費する方式の違いを示した図。上段では、1つ目の区間の終わり際に100回、区間が変わった直後にもう100回を投げると、どちらの区間も上限内なのに境界をまたぐ2秒間には200回が通ってしまう。下段は一定の速度で補充される持ち玉を消費する方式で、玉が溜まっていれば一度にまとめて使えるため、画面を開いた瞬間に何本かまとめて呼ぶような正常な使い方を許せる。ただし補充の速度が上限なので、継続的に使い続けることはできない。"
      />

      <table>
        <thead>
          <tr><th>方式</th><th>仕組み</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">区切りごとに数え直す</td><td>「毎分0秒からの100回」を数える</td><td>実装が最も簡単。<strong>境界の問題</strong>がある</td></tr>
          <tr><td className="hl">直近の一定時間を数える</td><td>「直近60秒間の100回」を数える</td><td>公平。実装はやや複雑</td></tr>
          <tr><td className="hl"><Term>持ち玉を消費する</Term></td><td>一定速度で補充される玉を使う</td><td><strong>一時的な集中を許容できる</strong>。最も実用的</td></tr>
          <tr><td className="hl">一定速度で流す</td><td>溢れた分を捨てる</td><td>下流への流量を平準化したいとき</td></tr>
        </tbody>
      </table>

      <p>
        実務では3つ目が好まれます。<Term>普段は静かだが、画面を開いた瞬間にまとめて呼ぶ</Term>という正常な使い方を許しつつ、継続的な過剰利用は抑えられるためです。
      </p>

      <Heading num="04">何を単位に数えるか</Heading>
      <p>
        方式より重要なのが<Term>キーの設計</Term>です。ここを誤ると、守れないか、正規の利用者を締め出すかのどちらかになります。
      </p>

      <table>
        <thead>
          <tr><th>キー</th><th>適する場面</th><th>問題点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">利用者ID</td><td>ログイン後のAPI。<strong>最も正確</strong></td><td>未認証の経路には使えない</td></tr>
          <tr><td className="hl">APIキー / 契約単位</td><td>外部提供のAPI。プラン別の上限</td><td>―</td></tr>
          <tr><td className="hl">送信元アドレス</td><td>ログイン・登録など未認証の経路</td><td><strong>同じ回線の組織が丸ごと1つに見える</strong></td></tr>
          <tr><td className="hl">送信元とエンドポイントの組</td><td>ログイン試行のような特定操作</td><td>―</td></tr>
        </tbody>
      </table>

      <Aside label="プロキシ配下でのアドレス取得">
        負荷分散装置や配信網の背後では、素朴に取った送信元は<Term>プロキシのアドレス</Term>になります。これを単位に数えると、全利用者が1つのキーに集約されて<Term>全員がまとめてブロックされます</Term>。かといって転送元を示すヘッダーをそのまま信用すると、攻撃者が自由に偽装できます。<Term>信頼するプロキシの段数を明示</Term>し、その分だけ遡った値を使います。ここは本番でのみ壊れる箇所なので、必ず実環境で確認します。
      </Aside>

      <p>
        あわせて、<Term>エンドポイントごとに上限を変えます</Term>。一律の値では、軽い読み取りに厳しすぎるか、重い処理に緩すぎるかのどちらかになります。
      </p>

      <table>
        <thead>
          <tr><th>種類</th><th>目安</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ログイン・パスワードリセット</td><td>厳しく(毎分5回程度)</td></tr>
          <tr><td className="hl">一般的な読み取り</td><td>緩く(毎分100回程度)</td></tr>
          <tr><td className="hl">書き込み</td><td>中程度</td></tr>
          <tr><td className="hl">重い処理</td><td>回数ではなく<strong>コストで数える</strong></td></tr>
        </tbody>
      </table>

      <Heading num="05">分散環境では共有の数え場所が要る</Heading>
      <p>
        プロセス内で数えると、サーバーが3台あれば実質3倍まで通ります。<Link href="/backend/cache">キャッシュ</Link>と同じ問題です。
      </p>

      <pre>
        <code>{`// 区切りごとに数える最小実装 ― 加算と期限設定を続けて行う
async function consume(key: string, limit: number, windowSec: number) {
  const bucket = \`rl:\${key}:\${Math.floor(Date.now() / 1000 / windowSec)}\`;

  const count = await redis.incr(bucket);
  if (count === 1) await redis.expire(bucket, windowSec);

  return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
}`}</code>
      </pre>

      <pre>
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

      <p>
        より厳密にするなら、判定と更新を<Term>1つの不可分な操作</Term>にまとめます。上の実装は、加算と期限設定の間で落ちるとキーが消えずに残る隙があります。
      </p>

      <Heading num="06">断り方が結果を変える</Heading>
      <table>
        <thead>
          <tr><th>要素</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>429</code></td><td>制限による拒否。<strong>403や500で返さない</strong></td></tr>
          <tr><td className="hl"><code>Retry-After</code></td><td>何秒後に再試行してよいか。<strong>これが無いと即座に再試行される</strong></td></tr>
          <tr><td className="hl">残量を示すヘッダー</td><td>上限・残り・回復時刻。良識ある呼び出し側は事前に減速できる</td></tr>
          <tr><td className="hl">本文</td><td>機械可読なコードと、人間向けの説明</td></tr>
        </tbody>
      </table>

      <p>
        呼ぶ側は<Link href="/backend/ops-resilience">間隔を空けて</Link>再試行します。即座に再試行するクライアントは、制限を強めるほど<Term>より激しく叩いてくる</Term>ため、状況を悪化させます。
      </p>

      <Heading num="07">締め出さないための配慮</Heading>
      <table>
        <thead>
          <tr><th>配慮</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">まず記録だけする</td><td>導入時は<strong>止めずにログだけ出し</strong>、実際の分布を見てから閾値を決める</td></tr>
          <tr><td className="hl">許可リスト</td><td>社内のバッチ、監視、死活確認は対象外にする</td></tr>
          <tr><td className="hl">プラン別の上限</td><td>有料には高い上限を。<strong>制限は商品設計の一部でもある</strong></td></tr>
          <tr><td className="hl">段階的に</td><td>いきなり遮断せず、まず遅延させる</td></tr>
          <tr><td className="hl">監視</td><td>拒否の発生数を見る。<strong>急増は攻撃か、自社クライアントのバグ</strong></td></tr>
        </tbody>
      </table>

      <p>
        レート制限は攻撃者を止める機能であると同時に、<Term>自社のクライアントのバグを検知する機能</Term>でもあります。拒否が急増したら、まず自分たちのリリース履歴を確認する価値があります。
      </p>

      <Analogy label="💡 たとえるなら">
        入口の整理券です。目的は特定の客を罰することではなく、店内が満員で誰も食事できない状態を防ぐこと。だから断るときは「いま満席です、15分後にお越しください」と<Term>次に来るべき時刻を伝える</Term>。それを言わずに追い返せば、客は1分ごとにドアを叩き続け、かえって受付が混雑します。
      </Analogy>

      <Heading num="まとめ">手前で止め、待つ時間を伝える</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>下流とコストを守る</h4>
          <p>接続や従量課金の処理が先に壊れる。請求書も攻撃対象になる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>キー設計が肝心</h4>
          <p>認証後は利用者、未認証は送信元。プロキシ配下の取得は実環境で確認する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>断り方で結果が変わる</h4>
          <p>再試行の指針が無いと、制限が状況を悪化させる。導入時はまず記録だけ。</p>
        </Card>
      </CardGrid>

      <p>
        次は、自分が呼び出す側になったときの守り方です。<Link href="/backend/ops-resilience">タイムアウト・リトライ・遮断</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/ops-rate-limit" />
    </DocsPage>
  );
}
