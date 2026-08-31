import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
  Timeline, TimelineItem, TimelineLabel,
} from "@/components/docs";

export const metadata: Metadata = { title: "開発手法の変遷" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>開発手法の変遷 ― 何を「中心」に据えてきたか</h1>
        <Lead>
          ソフトウェア開発の手法は、60年以上をかけて<Term>中心に据えるもの</Term>を移し替えてきました。最初はコードそのもの、次に設計・工程、やがてオブジェクトやユーザー、テスト、そして運用の自動化へ。2020年代にはAIとの協働までが中心に入ってきます。ここは個々の手法を時系列で串刺しにする<Term>地図</Term>です。
        </Lead>
      </Hero>

      <Timeline>
        <TimelineItem era="1960年代">構造化 ― 中心はコード</TimelineItem>
        <TimelineItem era="1970年代">ウォーターフォール・情報隠蔽 ― 中心は工程と設計</TimelineItem>
        <TimelineItem era="1980年代">オブジェクト指向・スパイラル ― 中心はオブジェクトとリスク</TimelineItem>
        <TimelineItem era="1990年代">反復開発・DDD ― 中心はユーザーと業務知識</TimelineItem>
        <TimelineItem era="2000年代">アジャイル・TDD ― 中心は変化とテスト</TimelineItem>
        <TimelineItem era="2010年代">DevOps・IaC ― 中心は運用と自動化</TimelineItem>
        <TimelineItem era="2020年代">Platform Engineering・AI協働 ― 中心は基盤とAI</TimelineItem>
      </Timeline>
      <TimelineLabel>
        新しい手法が古いものを置き換えたのではなく、その上に別の主役を乗せてきた。
      </TimelineLabel>

      <Heading num="01">重心は「上へ」移ってきた</Heading>
      <p>
        時代ごとに新しい手法が生まれてきましたが、古いものが消えたわけではありません。構造化もオブジェクト指向もテストも、いまも土台として使われ続けています。むしろ<Term>何を開発の主役に置くか</Term>という重心が、時代の課題に合わせて移動してきた、と捉えると流れが見えてきます。
      </p>

      <DiagramFrame
        slug="dev-process-history-center"
        aspect="640 / 300"
        caption="開発手法の中心が時代とともに上流へ移ってきたことを示す階段。1960年代のコードから、設計と工程、オブジェクト、ユーザーと業務知識、変化とテスト、運用と自動化を経て、2020年代の基盤とAI協働へと右上へ上がっていく。関心の重心がより上流・より広い範囲へ移動してきたことを表す。ただし下の段は消えておらず、すべて土台として現役で残っている。"
      />

      <Heading num="02">1960〜70年代 ― コードから設計・工程へ</Heading>
      <p>
        黎明期の関心は「正しく動くコードをどう書くか」でした。<Link href="/design/paradigm-structured">構造化プログラミング</Link>は、任意の場所へ飛ぶ書き方を廃して順次・分岐・反復の3構造だけでロジックを組み立て、読みやすさと正しさを担保する考え方です。
      </p>
      <p>
        1970年代に入ると関心は一段上がり、<Term>どう設計し、どんな順序で作るか</Term>へ移ります。大きな機能を段階的に分割する<Term>トップダウン設計</Term>と、汎用的な部品を組み上げる<Term>ボトムアップ設計</Term>という2方向が整理され、工程を直線的に並べる<Link href="/dev/process">ウォーターフォール</Link>が定着しました。さらに<Link href="/design/methodology-info-hiding">情報隠蔽</Link>は、「変わりやすい部分をモジュールの内側に隠す」ことで変更に強い構造を作る原則で、後のオブジェクト指向へ直接つながります。
      </p>

      <Heading num="03">1980年代 ― オブジェクトとリスクが主役に</Heading>
      <p>
        データと手続きをひとまとめにする<Link href="/design/paradigm-oop">オブジェクト指向</Link>が実用化し、開発の中心は「手続きの流れ」から「オブジェクトの責務」へ移ります。同時に、ウォーターフォールの「後戻りできない」弱点への反省から、<Term>作りながら確かめる</Term>手法が広がりました。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>スパイラルモデル</h4>
          <p>
            反復のたびにリスクを評価し、危険な部分から先に潰していきます。工程の中心にリスク分析を据えた形です。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>プロトタイピング</h4>
          <p>
            完成前に試作品を作って確認してもらい、要件の認識ずれを早期に発見します。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>リバースエンジニアリング</h4>
          <p>
            既存コードから設計や仕様を読み解きます。保守と再構築が課題として意識され始めた時代を映しています。
          </p>
        </Card>
      </CardGrid>

      <Heading num="04">1990年代 ― 反復・ユーザー・再利用</Heading>
      <p>
        直線的な進め方への限界感から、<Term>短い反復を繰り返す</Term>アプローチが本格化します。高速開発(RAD)や反復開発の体系化が進み、<Link href="/design/methodology-use-case-driven">ユースケース駆動開発</Link>は「ユーザーが何をしたいか」を起点に設計を組み立てました。
      </p>
      <p>
        同時に<Term>再利用</Term>志向も強まり、部品を組み合わせるコンポーネント指向が広がります。<Link href="/design/methodology-ddd">ドメイン駆動設計</Link>は、技術ではなく業務知識をソフトウェアの中心に据える設計思想として登場しました。そしてこの時代、実装より先にテストを書く<Term>テストファースト</Term>の発想が芽生えます。
      </p>

      <Heading num="05">2000年代 ― 変化への適応とテスト駆動</Heading>
      <p>
        2001年の<Term>アジャイルソフトウェア開発宣言</Term>は、それまでの反復型手法を「変化への対応」という価値観のもとに束ね直しました。中心に置かれたのは詳細な計画ではなく<Term>変化そのもの</Term>です(<Link href="/dev/process-agile">スクラムとアジャイル実践</Link>)。
      </p>
      <p>
        テストは「後で確認するもの」から「開発を駆動するもの」へ格上げされます。
      </p>

      <table>
        <thead>
          <tr><th>手法</th><th>中心</th><th>要点</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">TDD</td>
            <td>テスト</td>
            <td>失敗するテストを先に書き、通す最小実装 → 整理を繰り返す</td>
          </tr>
          <tr>
            <td className="hl">BDD</td>
            <td>振る舞い</td>
            <td>「〜のとき〜する」を自然言語に近い形で書き、仕様と検証を一体化する</td>
          </tr>
          <tr>
            <td className="hl">ATDD</td>
            <td>受け入れ条件</td>
            <td>顧客との受け入れ条件を先に合意し、それをテストとして固定する</td>
          </tr>
          <tr>
            <td className="hl">MDD / MDA</td>
            <td>モデル</td>
            <td>モデルを主成果物とし、そこからコードを生成する</td>
          </tr>
        </tbody>
      </table>

      <Heading num="06">2010年代 ― 仕様の明確化と、運用の自動化</Heading>
      <p>
        前半は「仕様を実例で固める」動きが続きます。あいまいな要求を具体例(実行可能な仕様)に落とし込み、そのまま自動テストにする考え方です。後半の主役は、開発と運用の壁を壊す<Term>DevOps</Term>と、それを支える自動化群でした。開発の中心が「動くコードを書く」ことから<Term>安全に速く本番へ届け続ける</Term>ことへ広がった時代です。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>Infrastructure as Code</h4>
          <p>
            インフラをコードで定義し、環境構築を再現可能にします。サーバーが手作業の設定から、版管理された成果物になりました。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>CI/CD</h4>
          <p>
            ビルド・テスト・デプロイを<Link href="/dev/git-ci">自動化</Link>し、変更から本番反映までを再現性のあるパイプラインにします。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>GitOps</h4>
          <p>
            リポジトリを「あるべき状態」の唯一の正とし、差分を自動で環境へ反映します。運用操作もレビューの対象になりました。
          </p>
        </Card>
      </CardGrid>

      <Heading num="07">2020年代 ― 開発基盤と、AIとの協働</Heading>
      <p>
        自動化が進むほど、各チームがCI/CDやインフラを個別に組む負担が無視できなくなりました。<Term>Platform Engineering</Term>は、社内の開発者が使う共通の開発基盤を専門チームが整備し、アプリ開発者が本質に集中できるようにする流れです。DevOpsの「各自でやる」を、基盤として提供する形へ再編したものと言えます。
      </p>
      <p>
        そして生成AIの実用化が、コードを書く行為そのものに新しい語彙をもたらしました。まだ発展途上の概念で定義も固まりきっていませんが、おおむね次のように整理できます。
      </p>

      <table>
        <thead>
          <tr><th>用語</th><th>中心</th><th>意味合い</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">AI Assisted Development</td>
            <td>AI</td>
            <td>補完やレビュー支援など、AIを補助として使う開発全般。人間が主で、AIが助手</td>
          </tr>
          <tr>
            <td className="hl">Prompt Driven Development</td>
            <td>プロンプト</td>
            <td>実装の起点をプロンプトに置き、作りたいものを自然言語で指示する</td>
          </tr>
          <tr>
            <td className="hl">Vibe Coding</td>
            <td>AIとの対話</td>
            <td>細部を逐一読まず、対話で「動く感触」を確かめながら作る即興的なスタイル</td>
          </tr>
          <tr>
            <td className="hl">Context Engineering</td>
            <td>文脈設計</td>
            <td>AIに与える文脈(仕様・既存コード・制約・例)の設計を工学的に扱う</td>
          </tr>
        </tbody>
      </table>

      <Aside label="用語はまだ動いている">
        2020年代の語は使われ始めたばかりで、人によって指す範囲が異なります。「AIに任せきる」印象の強い言葉でも、実務では人間のレビューと設計判断が前提で、テストや構成管理といった従来の規律が消えるわけではありません。むしろ<Term>AIをどう統制するか</Term>が新しい技能として問われ始めています。
      </Aside>

      <Analogy label="💡 たとえるなら">
        開発手法の変遷は、料理の主役が移り変わってきた歴史に似ています。最初は包丁さばき(コード)、次に献立と段取り(設計・工程)、やがて食材の役割分担(オブジェクト)、お客さんの好み(ユーザー)、味見の徹底(テスト)、厨房の自動化(DevOps)へ。いまは調理を手伝うAIとの組み方が新しい主役になりつつあります。
      </Analogy>

      <Heading num="まとめ">年表から見える3つの流れ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>中心は上へ移ってきた</h4>
          <p>
            コード → 設計・工程 → オブジェクト → ユーザー → 変化 → 運用 → 基盤とAIへ。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>手法は消えず積み重なる</h4>
          <p>
            新しい手法は古いものを置き換えるより、その上に別の主役を乗せてきました。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>後戻りコストを下げ続けてきた</h4>
          <p>
            通底するのは「早く小さく確かめて、間違いを安く直す」こと。AI協働もこの延長です。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/dev/process-history" />
    </DocsPage>
  );
}
