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
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "CodeBuild" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>CodeBuild ― 使い捨ての環境で、同じ結果を出す</h1>
        <Lead>
          <Link href="/infra/aws-cicd">CI/CD</Link>で見た2つの役割のうち、<Term>実行エンジン</Term>にあたる部分です。値打ちは速さではなく<strong>再現性</strong>にあります ― 毎回まっさらな環境で走るので、手元にだけ入っているものに依存したビルドは、ここで必ず落ちます。それは不便ではなく、<strong>依存を明示させる仕組み</strong>です。
        </Lead>
      </Hero>

      <Heading num="01">手順を書き下す</Heading>
      <p>
        ビルドの手順は設定ファイルに書きます。段階に分かれていて、依存の取得、ビルド前の準備、ビルド、後処理、そして成果物の指定という順に並びます。<strong>手元で叩いているコマンドを、そのまま書き写す</strong>のが出発点です。
      </p>
      <p>
        ここで落ちるのは、たいてい「手元には入っているが、書いていないもの」です ― 特定のバージョンの処理系、環境変数、認証情報。<strong>落ちた分だけ、暗黙の依存が可視化された</strong>ということなので、面倒でも設定へ足していきます。
      </p>

      <Heading num="02">使い捨てと、速さの両立</Heading>

      <DiagramFrame
        slug="infra-aws-codebuild-flow"
        aspect="760 / 280"
        caption="ビルドが使い捨ての環境で走ることと、それでも速さを保つ仕組み。実行のたびに何も入っていない環境が用意され、ソースを取得し、手順書どおりに依存の取得・ビルド・テストが走り、成果物を保存して環境は破棄される。毎回まっさらであることが再現性を生む一方、依存の取得を毎回やり直すと遅いため、依存やビルドの中間結果だけを外へ保存して次回に読み込む。環境は使い捨てのまま、遅い部分だけを持ち越す。"
      />

      <p>
        キャッシュの設計は、<strong>何を持ち越すと結果が変わらないか</strong>で決めます。取得した依存は同じバージョンなら同じもの ― 持ち越して安全です。一方でビルドの生成物を丸ごと持ち越すと、消し忘れた古い成果物が混ざる危険があります。<strong>入力から決まるものだけを持ち越す</strong>のが基準です。
      </p>

      <Heading num="03">実行環境の選び方</Heading>
      <table>
        <thead>
          <tr><th>決めること</th><th>目安</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">土台のイメージ</td><td>言語と版を明示する。既定のまま使うと、更新のタイミングで挙動が変わる</td></tr>
          <tr><td className="hl">計算資源の大きさ</td><td>並列にテストを走らせるなら大きく。時間単価と実行時間の積で比べる</td></tr>
          <tr><td className="hl">ネットワークの位置</td><td>非公開のデータベースに触れるテストを走らせるなら、その区画の中で動かす</td></tr>
          <tr><td className="hl">権限</td><td>成果物の保存先など、必要な操作だけを許す(<Link href="/security/authz">最小権限</Link>)</td></tr>
        </tbody>
      </table>

      <Aside label="ビルドの中に秘密を置かない">
        ビルドのログは、後から見られることを前提に残ります。ログに秘密が出力される事故は珍しくなく、原因はたいてい環境変数の一覧を出力するようなデバッグ用の行です。秘密は<Link href="/infra/aws-secrets-manager">保管サービス</Link>から実行時に取得し、<strong>ログへ出さない</strong>ことを明示的に確認します。
      </Aside>

      <Heading num="04">遅いビルドは、使われないビルド</Heading>
      <p>
        待ち時間が長いと、開発者は結果を待たずに次の作業へ移り、失敗に気づくのが遅れます。速さは快適さではなく<strong>フィードバックの速さ</strong>の問題です。効果の大きい順に、依存のキャッシュ、テストの並列化、そして<strong>変更のあった部分だけを対象にする</strong>という順に手を入れます(<Link href="/test/strategy">テスト戦略</Link>で言う、速いものから走らせる考え方と同じです)。
      </p>

      <Heading num="まとめ">再現性を買っている</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>落ちるのは、暗黙の依存</h4>
          <p>毎回まっさらだから、書いていないものは動かない。それが可視化の仕組みになる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>持ち越すのは入力から決まるものだけ</h4>
          <p>依存はよいが、生成物を丸ごと持ち越すと古いものが混ざる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>速さはフィードバックの速さ</h4>
          <p>待たされるほど結果は見られなくなる。快適さではなく、気づきの速さの問題。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-codebuild" />
    </DocsPage>
  );
}
