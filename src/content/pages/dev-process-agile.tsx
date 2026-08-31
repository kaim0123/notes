import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "スクラムとアジャイル実践" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>スクラムとアジャイル実践 ― 反復を支える役割と仕組み</h1>
        <Lead>
          <Link href="/dev/process">開発プロセス</Link>で見た<Term>アジャイル</Term>の価値観を、実際のチーム運営に落とし込む代表的な枠組みが<Term>スクラム</Term>です。役割・会議・成果物を軽く決めて短い反復を回す仕組みと、それを技術面で支える実践までを一続きで見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">3つの役割 ― 決める人・作る人・支える人</Heading>
      <p>
        スクラムでは、少人数のチームが<Term>スプリント</Term>(通常1〜4週間)という短い期間を単位に開発を繰り返します。
      </p>

      <table>
        <thead>
          <tr><th>役割</th><th>責任</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">プロダクトオーナー</td>
            <td>何を作るかの優先順位を決め、プロダクトの価値を最大化する</td>
          </tr>
          <tr>
            <td className="hl">スクラムマスター</td>
            <td>スクラムが円滑に回るよう支援し、チームの障害を取り除く</td>
          </tr>
          <tr>
            <td className="hl">開発チーム</td>
            <td>スプリントで動く成果物(インクリメント)を作る</td>
          </tr>
        </tbody>
      </table>

      <p>
        重要なのは<Term>優先順位を決める人が1人に定まっている</Term>ことです。複数の関係者がそれぞれ「これを先に」と言える状態では、反復の単位が守れず、結局すべてが遅れます。
      </p>

      <Heading num="02">バックログとスプリント ― 何をどの順で作るか</Heading>
      <p>
        やりたいことを優先順位つきで並べたのが<Term>プロダクトバックログ</Term>、その中から今回のスプリントで取り組む分を抜き出したのが<Term>スプリントバックログ</Term>です。各項目は利用者視点の要求である<Term>ユーザーストーリー</Term>の形で書かれることが多く、スプリントの終わりには<Term>レトロスペクティブ</Term>で改善点を話し合います。振り返りの整理には、続ける・やめる・試すを挙げる<Term>KPT</Term>がよく使われます。
      </p>

      <DiagramFrame
        slug="dev-process-sprint"
        aspect="640 / 290"
        caption="スクラムの1スプリントの流れ。優先順位つきのプロダクトバックログから上位を取り出してスプリント計画を立て、1〜4週間の開発期間で動くものを作る。期間の終わりにレビューで成果物を見せ、続いて振り返りでやり方そのものを見直す。要望も改善点もいったんバックログへ戻り、次のスプリントの入力になる。区間ごとに必ず「動くもの」という成果が残るのが要点。"
      />

      <Analogy label="💡 たとえるなら">
        スクラムは「短距離走を繰り返す」進め方です。ゴールまでの全行程を一気に走らず、区間ごとに全力で走り、走り終えるたびにフォームを見直す。区間ごとに必ず「進んだ距離」という成果が残るのが特徴です。
      </Analogy>

      <Heading num="03">エンジニアリングの実践 ― XP・TDD・ペアプロ</Heading>
      <p>
        アジャイルを技術面で支える実践群が<Term>XP(エクストリームプログラミング)</Term>です。代表的なのは、テストを先に書いてから実装する<Term>TDD</Term>、2人が1台で協力して書く<Term>ペアプログラミング</Term>、小さな改善を積み重ねる<Term>リファクタリング</Term>で、いずれも「変化に強いコードを、こまめに確かめながら育てる」という発想でつながっています。
      </p>

      <Aside label="実践なしの反復は苦しくなる">
        テストが無いまま反復だけを短くすると、変更のたびに手作業の確認が増え、かえって遅くなります。反復を短くする前に、<Link href="/dev/git-ci">自動検査</Link>が回っていることを先に用意するのが順序です。仕組みが伴わない「アジャイル」は、単に計画を立てない開発になってしまいます。
      </Aside>

      <Heading num="04">CI/CDとDevOps ― 反復を自動化で支える</Heading>
      <p>
        短い反復を現実的に回すには、統合とリリースの自動化が欠かせません。変更をこまめに統合して自動テストする<Term>継続的インテグレーション</Term>、そこから自動でリリース可能な状態まで持っていく<Term>継続的デリバリー</Term>、開発と運用が協調して速く安全に届ける<Term>DevOps</Term>、それにセキュリティを組み込んだ<Term>DevSecOps</Term>という広がりがあります。具体的なパイプラインの組み方は<Link href="/dev/git-ci">Git・CI/CD</Link>で扱っています。
      </p>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>役割は3つ</h4>
          <p>決める人・作る人・支える人を分け、優先順位の決定者を1人に定めます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>反復で価値を刻む</h4>
          <p>
            バックログを優先順位で並べ、スプリントごとに動くものを出して振り返ります。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>実践と自動化が支える</h4>
          <p>TDDや自動検査が伴わない反復は、むしろ苦しくなります。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/dev/process-agile" />
    </DocsPage>
  );
}
