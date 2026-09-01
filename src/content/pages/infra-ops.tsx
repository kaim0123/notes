import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DiagramFrame,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "サービス運営" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>サービス運営 ― コードを書き終えた後に始まる仕事</h1>
        <Lead>
          公開は終点ではなく開始点です。<Link href="/infra/deploy">デプロイと公開</Link>で本番へ出したものを、<strong>動かし続け、安全に保ち、育てる</strong>ところから運営が始まります。ここで扱うのは新しい技術分野ではありません。これまでのセクションで学んだことを<Term>公開後の視点で束ね直す</Term>作業です。だから最初にやるのは、考えるべきことを並べて<strong>どこに本体があるかを決める</strong>こと ― 抜けと二重管理は、たいていこの一覧を作らないまま走ることで生まれます。
        </Lead>
      </Hero>

      <Heading num="01">運営で考えることの全体像</Heading>
      <p>
        公開されたサービスを「動いている状態」に保つには、コード以外にも考えることが並びます。そのうちいくつかは、すでに別のセクションが本体を持っています。
      </p>

      <DiagramFrame
        slug="infra-ops-map"
        aspect="760 / 320"
        caption="公開後の運営で考えることを分け、どこが本体を持つかで振り分けた図。左の7つ ― パフォーマンス、データ管理、分析・改善、コンテンツ管理、コスト管理、保守、法令・コンプライアンス ― はこの見出しの配下で扱う。右の4つは本体が別のセクションにあり、公開の経路はデプロイと公開、正常性は監視と障害対応、安全はセキュリティ、不具合の予防はテストが持つ。"
      />

      <table>
        <thead>
          <tr><th>ジャンル</th><th>何を考えるか</th><th>本体</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">インフラ・デプロイ</td><td>どこで動かし、どう届けるか</td><td><Link href="/infra/deploy">デプロイと公開</Link></td></tr>
          <tr><td className="hl">監視・障害対応</td><td>正常に動いているか、壊れたらどう動くか</td><td><Link href="/infra/monitoring">監視と障害対応</Link></td></tr>
          <tr><td className="hl">セキュリティ</td><td>安全に運用する</td><td><Link href="/security">セキュリティ</Link></td></tr>
          <tr><td className="hl">品質管理</td><td>不具合を出さない</td><td><Link href="/test">テスト</Link></td></tr>
          <tr><td className="hl">パフォーマンス</td><td>速く表示する</td><td>この見出しの配下</td></tr>
          <tr><td className="hl">データ管理</td><td>どこに保存し、どう戻せるようにするか</td><td>この見出しの配下</td></tr>
          <tr><td className="hl">分析・改善</td><td>使われ方を知り、次を決める</td><td>この見出しの配下</td></tr>
          <tr><td className="hl">コンテンツ管理</td><td>更新の流れを回す</td><td>この見出しの配下</td></tr>
          <tr><td className="hl">コスト管理</td><td>払い続ける額を把握する</td><td>この見出しの配下</td></tr>
          <tr><td className="hl">保守</td><td>劣化を先回りする</td><td>この見出しの配下</td></tr>
          <tr><td className="hl">法令・コンプライアンス</td><td>守るべき決まりを満たす</td><td>この見出しの配下</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        コードを書くのが建物を建てることなら、運営は建物を維持管理することです。電気と水道が止まっていないか(監視)、傷んだ箇所を直しているか(保守)、来場者数を数えて動線を変えているか(分析)、消防法を満たしているか(法令) ― 完成した瞬間ではなく、人が使い続ける間ずっと発生し続けます。
      </Analogy>

      <Heading num="02">動かし続ける ― 速さと費用</Heading>
      <p>
        公開直後は問題が無くても、コンテンツと利用者が増えるほど、表示速度と費用は静かに悪化します。どちらも<strong>誰も担当しないと悪くなる一方</strong>という共通の性質があります。
      </p>
      <p>
        速さの側は、利用者から見た体感を指標にして測ります(<Link href="/frontend/perf">フロントエンドのパフォーマンス</Link>)。何をどこにキャッシュするかという判断は<Link href="/dev/cache">キャッシュの考え方</Link>にまとまっていて、公開の形としてはCDNをどう使うかに現れます。
      </p>

      <DiagramFrame
        slug="infra-ops-cost"
        aspect="700 / 280"
        caption="クラウドの費用が発生する3つの場所。持っている時間(止め忘れた仮想マシン、確保したままのアドレス、消し忘れたディスク)、出ていくデータ(配信、別リージョンへの転送)、保存と回数(ログの保持期間、スナップショットの世代、API呼び出し)。どれも1件は小さく、請求書を見るまで気づきにくいので、上限や保持期間を先に決めておくことが対策になる。"
      />

      <p>
        コスト管理の実務は、安いサービスを探すことではなく<strong>止める・消す・保持期間を決める・上限で通知する</strong>という運用に落ちます。<Link href="/infra/aws">AWS</Link>で見たとおり、請求を押し上げるのは使用量そのものより「持ち続けていること」だからです。
      </p>

      <Heading num="03">育てる ― 計測して、直して、また出す</Heading>
      <p>
        公開後の改善は、思いつきではなく<Term>使われ方の観測</Term>から始めます。どのページが見られ、どこで離脱し、何が失敗しているのか。数字が無い状態での改善は、直した気になるだけで終わります。
      </p>

      <DiagramFrame
        slug="infra-ops-cycle"
        aspect="700 / 300"
        caption="公開したサービスを育てる繰り返し。利用状況を計測し、どこを直すと効くかを決め、直して出し、出したあとをまた計測する。中央にあるのは、この輪とは別に常時走っている保守 ― 依存ライブラリの更新、証明書の更新、非推奨機能への追従。保守は成果が見えにくいため後回しにされやすいが、止めた分はある日の全体障害としてまとめて返ってくる。"
      />

      <p>
        観測に使うデータは、<Link href="/infra/monitoring">監視と障害対応</Link>で集めるものと重なりますが、問いが違います。監視は「壊れていないか」を、分析は「どう使われているか」を問います。同じログとメトリクスから両方を読むために、何を記録するかを設計しておく必要があり、そこで個人情報をどこまで残してよいかという線引き ― <Link href="/security/logging">ログ出力設計</Link>の観点 ― が効いてきます。アクセス解析・SEO・コンテンツ更新の実務は、この見出しの配下で個別に扱います。
      </p>

      <Heading num="04">守る ― 保守と、決まりごと</Heading>
      <p>
        <Term>保守</Term>は、障害が起きてから動く監視の裏返しで、<strong>起きる前に手を打つ</strong>活動です。依存ライブラリの更新(<Link href="/dev/tooling-deps">依存管理</Link>)、証明書の更新、非推奨機能への追従 ― どれも今日やらなくても困りませんが、放置した分がまとめて返ってきます。とくに脆弱性の残った依存を抱えたままにするのは、時間とともに危険が増える唯一の種類の負債です(<Link href="/dev/tooling-security">依存の脆弱性とサプライチェーン</Link>)。
      </p>

      <Aside label="自動化できる保守は、監視の対象から外す">
        証明書の期限切れのように「必ず、その日に起きる」ことは、気づく仕組みで受けるべきではありません。自動更新に載せて<strong>発生自体を消す</strong>のが正解です。人が気づいて対応する枠は、予測できないことのために空けておきます。
      </Aside>

      <p>
        もう一つの「守る」は決まりごとの側です。個人情報の扱いとプライバシーポリシー、Cookieの同意、特定商取引法上の表示、そして<Link href="/frontend/ux-a11y">アクセシビリティ</Link>。技術的には動いていても、これらを満たしていなければ公開し続けられません。何が必要かは扱うデータと届ける相手で変わるため、公開前のチェックとして一度洗い出し、以後は変更のたびに見直す形にします。この分野の詳細は、この見出しの配下で個別に扱います。
      </p>

      <Heading num="まとめ">終わらない仕事を、仕組みに載せる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>まず担当を決める</h4>
          <p>運営で考えることの多くは既習の分野。どこに本体があるかを決めれば、抜けと二重管理が消える。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>放っておくと悪くなるものを見張る</h4>
          <p>速度・費用・依存の古さは、誰も担当しないと一方向に悪化する。数字と期限で捉える。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>予測できることは自動化する</h4>
          <p>必ず起きるものは仕組みで消し、人の注意力は予測できないことのために残す。</p>
        </Card>
      </CardGrid>

      <p>
        これでセクションを一周しました。土台(<Link href="/infra/virtualization">仮想化とコンテナ</Link>・<Link href="/infra/server">サーバーとストレージ</Link>)、動かし続ける仕組み(<Link href="/infra/monitoring">監視と障害対応</Link>・<Link href="/infra/deploy">デプロイと公開</Link>)、借りる先(<Link href="/infra/aws">AWS</Link>・<Link href="/infra/gcp">Google Cloud</Link>・<Link href="/infra/cloudflare">Cloudflare</Link>)、そして続けるための運営 ― どれも「本番でどう動かすか」という1つの問いの別々の面です。
      </p>

      <DocsFooter href="/infra/ops" />
    </DocsPage>
  );
}
