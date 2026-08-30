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
  Timeline,
  TimelineItem,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "開発手法の変遷",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装</Eyebrow>
        <h1>開発手法の変遷 ― 何を「中心」に据えてきたか</h1>
        <Lead>
          ソフトウェア開発の手法は、60年以上をかけて<Term>中心に据えるもの</Term>を移し替えてきました。最初はコードそのもの、次に設計・工程、やがてオブジェクトやユーザー、テスト、そして運用の自動化へ。2020年代にはAIとの対話までが中心に入ってきます。個々の手法は本サイトの各ページで詳しく扱っているので、このページはそれらを時系列で串刺しにする<strong>地図</strong>として読んでください。
        </Lead>
      </Hero>

      <Timeline>
        <TimelineItem era="1960s">構造化<br />中心=コード</TimelineItem>
        <TimelineItem era="1970s">ウォーターフォール<br />中心=工程・設計</TimelineItem>
        <TimelineItem era="1980s">オブジェクト指向<br />中心=オブジェクト・リスク</TimelineItem>
        <TimelineItem era="1990s">反復・DDD<br />中心=ユーザー・再利用</TimelineItem>
        <TimelineItem era="2000s">アジャイル・TDD<br />中心=変化・テスト</TimelineItem>
        <TimelineItem era="2010s">DevOps・IaC<br />中心=運用・自動化</TimelineItem>
        <TimelineItem era="2020s">Platform・AI<br />中心=基盤・AIとの対話</TimelineItem>
      </Timeline>

      <Heading num="01">全体像 ― 手法と「中心になるもの」の年表</Heading>
      <p>
        時代ごとに新しい手法が生まれてきましたが、古いものが消えたわけではありません。構造化もオブジェクト指向もテストも、いまも土台として使われ続けています。むしろ「何を開発の<strong>主役</strong>に置くか」という重心が、時代の課題に合わせて移動してきた、と捉えると流れが見えてきます。
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr><th>年代</th><th>手法・考え方</th><th>中心になるもの</th></tr>
          </thead>
          <tbody>
            <tr><td className="hl">1960年代</td><td><Link href="/design/paradigm/structured">構造化プログラミング</Link></td><td>コード</td></tr>
            <tr><td className="hl">1970年代</td><td>トップダウン設計</td><td>設計</td></tr>
            <tr><td className="hl">1970年代</td><td>ボトムアップ設計</td><td>部品</td></tr>
            <tr><td className="hl">1970年代</td><td><Link href="/dev/sdlc/process">ウォーターフォール</Link></td><td>工程</td></tr>
            <tr><td className="hl">1970年代</td><td><Link href="/design/methodology/info-hiding">情報隠蔽</Link></td><td>モジュール</td></tr>
            <tr><td className="hl">1980年代</td><td><Link href="/design/paradigm/oop">オブジェクト指向開発</Link></td><td>オブジェクト</td></tr>
            <tr><td className="hl">1980年代</td><td><Link href="/dev/sdlc/process">スパイラルモデル</Link></td><td>リスク</td></tr>
            <tr><td className="hl">1980年代</td><td>プロトタイピング</td><td>試作品</td></tr>
            <tr><td className="hl">1980年代</td><td>リバースエンジニアリング</td><td>既存コード</td></tr>
            <tr><td className="hl">1990年代</td><td>RAD</td><td>高速開発</td></tr>
            <tr><td className="hl">1990年代</td><td><Link href="/design/methodology/use-case-driven">ユースケース駆動開発</Link></td><td>ユーザー</td></tr>
            <tr><td className="hl">1990年代</td><td>RUP</td><td>反復開発</td></tr>
            <tr><td className="hl">1990年代</td><td>コンポーネント指向</td><td>再利用</td></tr>
            <tr><td className="hl">1990年代</td><td><Link href="/design/methodology/ddd">ドメイン駆動設計(DDD)</Link></td><td>業務知識</td></tr>
            <tr><td className="hl">1990年代</td><td>テストファースト</td><td>テスト</td></tr>
            <tr><td className="hl">2000年代</td><td><Link href="/dev/sdlc/process/agile">アジャイル</Link></td><td>変化</td></tr>
            <tr><td className="hl">2000年代</td><td><Link href="/dev/sdlc/process/agile">XP</Link></td><td>品質</td></tr>
            <tr><td className="hl">2000年代</td><td><Link href="/test/strategy">テスト駆動開発(TDD)</Link></td><td>テスト</td></tr>
            <tr><td className="hl">2000年代</td><td>BDD</td><td>振る舞い</td></tr>
            <tr><td className="hl">2000年代</td><td>ATDD</td><td>受け入れ条件</td></tr>
            <tr><td className="hl">2000年代</td><td>MDD(Model Driven Development)</td><td>モデル</td></tr>
            <tr><td className="hl">2000年代</td><td>MDA</td><td>UMLモデル</td></tr>
            <tr><td className="hl">2010年代</td><td>Specification by Example</td><td>仕様</td></tr>
            <tr><td className="hl">2010年代</td><td>Specification Driven Development</td><td>仕様</td></tr>
            <tr><td className="hl">2010年代</td><td><Link href="/cloud/aws/iac">Infrastructure as Code</Link></td><td>インフラ</td></tr>
            <tr><td className="hl">2010年代</td><td><Link href="/ops/deploy">DevOps</Link></td><td>運用</td></tr>
            <tr><td className="hl">2010年代</td><td><Link href="/ops/deploy">CI/CD</Link></td><td>自動化</td></tr>
            <tr><td className="hl">2010年代</td><td>GitOps</td><td>Git</td></tr>
            <tr><td className="hl">2020年代</td><td>Platform Engineering</td><td>開発基盤</td></tr>
            <tr><td className="hl">2020年代</td><td>Prompt Driven Development(PDD)</td><td>AIプロンプト</td></tr>
            <tr><td className="hl">2020年代</td><td>AI Assisted Development</td><td>AI</td></tr>
            <tr><td className="hl">2020年代</td><td>Vibe Coding</td><td>AIとの対話</td></tr>
            <tr><td className="hl">2020年代</td><td>Context Engineering</td><td>AIへの文脈設計</td></tr>
          </tbody>
        </table>
      </div>

      <Heading num="02">1960〜70年代 ― コードから設計・工程へ</Heading>
      <p>
        黎明期の関心は「正しく動くコードをどう書くか」でした。<Link href="/design/paradigm/structured">構造化プログラミング</Link>は、<code>goto</code>を廃して順次・分岐・反復の3構造だけでロジックを組み立て、コードの読みやすさと正しさを担保する考え方です。1970年代に入ると関心はコード単体から一段上がり、<strong>どう設計し、どんな順序で作るか</strong>へ移ります。
      </p>
      <p>
        大きな機能を段階的に分割していく<Term>トップダウン設計</Term>と、汎用的な部品を組み上げていく<Term>ボトムアップ設計</Term>という2方向が整理され、工程を要件定義→設計→実装→テストと直線的に並べる<Link href="/dev/sdlc/process">ウォーターフォール</Link>が定着しました。さらにパルナスが提唱した<Link href="/design/methodology/info-hiding">情報隠蔽</Link>は、「変わりやすい部分をモジュールの内側に隠す」ことで変更に強い構造を作る原則で、後のオブジェクト指向へ直接つながります。
      </p>

      <Heading num="03">1980年代 ― オブジェクトとリスクが主役に</Heading>
      <p>
        データと手続きをひとまとめにする<Link href="/design/paradigm/oop">オブジェクト指向開発</Link>が実用化し、開発の中心は「手続きの流れ」から「オブジェクトの責務」へ移ります。同時に、ウォーターフォールの「後戻りできない」弱点への反省から、<strong>作りながら確かめる</strong>手法が広がりました。
      </p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>スパイラルモデル</h4>
          <p>ボーム提唱。反復のたびに<strong>リスク</strong>を評価し、危険な部分から先に潰していく。工程の中心にリスク分析を据えた。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>プロトタイピング</h4>
          <p>完成前に<strong>試作品</strong>を作って利用者に確認してもらい、要件の認識ずれを早期に発見する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>リバースエンジニアリング</h4>
          <p><strong>既存コード</strong>から設計や仕様を読み解く。保守や再構築が課題として意識され始めた時代を映す。</p>
        </Card>
      </CardGrid>

      <Heading num="04">1990年代 ― 反復・ユーザー・再利用</Heading>
      <p>
        ウォーターフォールの直線的な進め方への限界感から、<strong>短い反復を繰り返す</strong>アプローチが本格化します。<Term>RAD(高速開発)</Term>やIBMの<Term>RUP</Term>は反復開発を体系化し、<Link href="/design/methodology/use-case-driven">ユースケース駆動開発</Link>は「ユーザーが何をしたいか」を起点に設計を組み立てました。
      </p>
      <p>
        同時に「作ったものを<strong>再利用</strong>する」志向も強まり、部品を組み合わせる<Term>コンポーネント指向</Term>が広がります。エヴァンスの<Link href="/design/methodology/ddd">ドメイン駆動設計(DDD)</Link>は、技術ではなく<strong>業務知識</strong>をソフトウェアの中心に据える設計思想として登場しました。そしてこの時代、実装より先にテストを書く<Term>テストファースト</Term>の発想が芽生え、次の10年のテスト駆動開発へつながります。
      </p>

      <Heading num="05">2000年代 ― 変化への適応とテスト駆動</Heading>
      <p>
        2001年の<Term>アジャイルソフトウェア開発宣言</Term>は、それまでの反復型手法を「変化への対応」という価値観のもとに束ね直しました。中心に置かれたのは詳細な計画ではなく<strong>変化そのもの</strong>です。<Link href="/dev/sdlc/process/agile">XP(エクストリーム・プログラミング)</Link>はペアプロやリファクタリングで<strong>品質</strong>を作り込む実践を提示しました。
      </p>
      <p>
        テストは「後で確認するもの」から「開発を駆動するもの」へ格上げされます。<Link href="/test/strategy">TDD(テスト駆動開発)</Link>を起点に、テストの表現を利用者視点へ広げる派生が生まれました。
      </p>
      <table>
        <tbody>
          <tr><th>手法</th><th>中心</th><th>要点</th></tr>
          <tr><td className="hl">TDD</td><td>テスト</td><td>失敗するテストを先に書き、通す最小実装→リファクタを繰り返す</td></tr>
          <tr><td className="hl">BDD</td><td>振る舞い</td><td>「〜のとき〜する」という<strong>振る舞い</strong>を自然言語に近い形で記述し、仕様と検証を一体化</td></tr>
          <tr><td className="hl">ATDD</td><td>受け入れ条件</td><td>顧客との<strong>受け入れ条件</strong>を先に合意し、それをテストとして固定する</td></tr>
          <tr><td className="hl">MDD / MDA</td><td>モデル</td><td>UMLなどの<strong>モデル</strong>を主成果物とし、そこからコードを生成する(OMGが推進)</td></tr>
        </tbody>
      </table>

      <Heading num="06">2010年代 ― 仕様の明確化と、運用の自動化</Heading>
      <p>
        前半は、アジャイルとテストの流れを受けて「仕様を実例で固める」動きが続きます。<Term>Specification by Example</Term>や<Term>Specification Driven Development</Term>は、あいまいな要求を具体例(実行可能な仕様)に落とし込み、そのまま自動テストにする考え方です。
      </p>
      <p>
        後半の主役は、開発と運用の壁を壊す<Link href="/ops/deploy">DevOps</Link>と、それを支える自動化群でした。開発の中心が「動くコードを書く」ことから「<strong>安全に速く本番へ届け続ける</strong>」ことへと広がった時代です。
      </p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>Infrastructure as Code</h4>
          <p><Link href="/cloud/aws/iac">インフラ</Link>をコードで定義し、環境構築を再現可能にする。サーバーを「手作業の設定」から「バージョン管理された成果物」へ。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>CI/CD</h4>
          <p>ビルド・テスト・デプロイを<Link href="/ops/deploy">自動化</Link>し、push から本番反映までを再現性のあるパイプラインにする。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>GitOps</h4>
          <p><strong>Git</strong>のリポジトリを「あるべき状態」の単一の正とし、その差分を自動で環境へ反映する。運用操作もコードレビューの対象に。</p>
        </Card>
      </CardGrid>

      <Heading num="07">2020年代 ― 開発基盤と、AIとの協働</Heading>
      <p>
        自動化が進むほど、各チームがCI/CDやインフラを個別に組む負担が無視できなくなりました。<Term>Platform Engineering</Term>は、社内の開発者が使う<strong>共通の開発基盤(内部プラットフォーム)</strong>を専門チームが整備し、アプリ開発者が本質に集中できるようにする流れです。DevOpsの「各自でやる」を、基盤として提供する形へ再編したものと言えます。
      </p>
      <p>
        そして2022年以降の生成AIの実用化が、コードを書く行為そのものに新しい語彙をもたらしました。これらはまだ発展途上の概念で、言葉の定義も固まりきっていませんが、おおむね次のように整理できます。
      </p>
      <table>
        <tbody>
          <tr><th>用語</th><th>中心</th><th>意味合い</th></tr>
          <tr><td className="hl">AI Assisted Development</td><td>AI</td><td>コード補完やレビュー支援などで、AIを<strong>補助</strong>として使う開発全般。人間が主で、AIが助手。</td></tr>
          <tr><td className="hl">Prompt Driven Development(PDD)</td><td>AIプロンプト</td><td>実装の起点を<strong>プロンプト</strong>に置き、「何を作りたいか」を自然言語で指示してAIに生成させる進め方。</td></tr>
          <tr><td className="hl">Vibe Coding</td><td>AIとの対話</td><td>細部のコードを逐一読まず、<strong>AIとの対話</strong>で「動く感触」を確かめながら作る、より即興的なスタイル。</td></tr>
          <tr><td className="hl">Context Engineering</td><td>AIへの文脈設計</td><td>AIに与える<strong>文脈</strong>(仕様・既存コード・制約・例)をどう設計・供給するかを工学的に扱う。出力品質は文脈で決まる、という認識。</td></tr>
        </tbody>
      </table>
      <Aside label="注意">
        2020年代の用語は業界で使われ始めたばかりで、人によって指す範囲が異なります。「AIに任せきる」印象の強い Vibe Coding も、実務では人間のレビューと設計判断が前提になるのが一般的で、テストや構成管理といった従来の規律が消えるわけではありません。むしろ Context Engineering のように、<strong>AIをどう統制するか</strong>が新しい技能として問われ始めています。
      </Aside>

      <Analogy label="💡 たとえるなら">
        開発手法の変遷は、料理の主役が移り変わってきた歴史に似ています。最初は「包丁さばき(コード)」、次に「献立と段取り(設計・工程)」、やがて「食材の役割分担(オブジェクト)」「お客さんの好み(ユーザー)」「味見の徹底(テスト)」「厨房の自動化(DevOps)」へ。いまは「調理を手伝うAI」との組み方が新しい主役になりつつあります。どの技も捨てられたわけではなく、重ねられてきたのです。
      </Analogy>

      <Heading num="まとめ">年表から見える3つの流れ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>中心は「上へ」移ってきた</h4>
          <p>コード→設計・工程→オブジェクト→ユーザー・業務知識→変化→運用→基盤・AIへと、関心の重心はより上流・より広い範囲へ移動してきました。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>手法は消えず積み重なる</h4>
          <p>構造化・OOP・テスト・DevOpsはいずれも現役です。新しい手法は古いものを置き換えるより、その上に別の主役を乗せてきました。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>後戻りコストを下げ続けてきた</h4>
          <p>反復・プロトタイピング・TDD・CI/CD ― 通底するのは「早く小さく確かめて、間違いを安く直す」こと。AI協働もこの延長線上にあります。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/sdlc" tag="開発工程">開発の全体像</RelatedLink>
                    <RelatedLink href="/dev/sdlc/process" tag="開発工程">開発プロセスと手法</RelatedLink>
                    <RelatedLink href="/dev/sdlc/process/agile" tag="開発工程">スクラムとアジャイル実践</RelatedLink>
                    <RelatedLink href="/design/paradigm" tag="設計">パラダイム一覧</RelatedLink>
                    <RelatedLink href="/test/strategy" tag="テスト">品質戦略とテストピラミッド</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
