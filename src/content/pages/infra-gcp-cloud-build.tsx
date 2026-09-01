import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "Cloud Build" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>Cloud Build ― 手順そのものがコンテナ</h1>
        <Lead>
          ビルドを使い捨ての環境で走らせるという性質は<Link href="/infra/aws-codebuild">CodeBuild</Link>と同じです。特徴的なのは書き方で、<Term>手順の各段がそれぞれ別のコンテナとして実行される</Term>点です。段ごとに使うイメージを変えられるため、言語や道具が混在する構成でも1本の手順で書けます。そして<strong>ビルド環境そのものが構成として書かれる</strong>ので、暗黙の依存が入り込みにくくなります。
        </Lead>
      </Hero>

      <Heading num="01">段はコンテナ、作業場所は共有</Heading>

      <DiagramFrame
        slug="infra-gcp-cloud-build-steps"
        aspect="700 / 280"
        caption="ビルドの手順がコンテナを順に走らせる形で表されることを示した図。各段はそれぞれ独立したコンテナとして実行され、指定したイメージの中でコマンドが動く。段と段の間では作業ディレクトリが共有されるため、前の段が作ったファイルを次の段が使える。段ごとに環境を切り替えられるので、言語や道具が混在する構成でも1本の手順で書け、手元で同じイメージを動かせば同じ結果が得られる。"
      />

      <p>
        「この段はNode.jsのイメージで、次の段はコンテナを作るためのイメージで」と切り替えられるので、<strong>ビルド用のマシンに何を入れておくか</strong>という悩みが消えます。必要な道具は、その段のイメージが持っています。
      </p>

      <Heading num="02">速くするための3手</Heading>
      <ul>
        <li><strong>依存の取得結果を持ち越す</strong> ― 入力から決まるものだけを持ち越すのが原則です(<Link href="/infra/aws-codebuild">同じ基準</Link>)。</li>
        <li><strong>並列にできる段を分ける</strong> ― 依存関係のない検査(型検査と静的解析など)は同時に走らせます。</li>
        <li><strong>マシンの大きさを上げる</strong> ― 時間単価と実行時間の積で比べます。速いほうが安くなることもあります。</li>
      </ul>
      <p>
        速さの目的は快適さではなく<strong>フィードバックの速さ</strong>です。待たされるほど結果は見られなくなり、失敗の発見が遅れます(<Link href="/test/strategy">テスト戦略</Link>)。
      </p>

      <Heading num="03">ビルドにも権限がある</Heading>
      <p>
        ビルドは、イメージの登録先や配置先に対する権限を持って動きます。<strong>必要な操作だけを許す</strong>のは他と同じですが、ここで特に注意したいのは<strong>ログに秘密を出さない</strong>ことです。ビルドのログは後から参照される前提で残るため、環境変数を一覧するようなデバッグ用の行が事故になります。
      </p>

      <Aside label="供給経路も検査の対象">
        ビルドは、外部から取得した依存を実行する場所でもあります。取得元を固定し、版を固定し、<Link href="/dev/tooling-security">脆弱性の検査</Link>をビルドの一部として走らせる ― ここを通さないものが本番に載らない、という関門にしておくと効きます。
      </Aside>

      <Heading num="まとめ">環境ごと手順に書く</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>段ごとにイメージを選ぶ</h4><p>ビルド用マシンに何を入れるかという悩みが消える。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>持ち越すのは入力から決まるもの</h4><p>依存はよいが、生成物を丸ごと持ち越すと古いものが混ざる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ログに秘密を出さない</h4><p>ビルドのログは残る。デバッグ用の一行が事故になる。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-cloud-build" />
    </DocsPage>
  );
}
