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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "スクラムとアジャイル実践",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装</Eyebrow>
        <h1>スクラムとアジャイル実践 ― 反復を支える役割と仕組み</h1>
        <Lead>
          <Link href="/dev/sdlc/process">開発プロセスと手法</Link>で見た<Term>アジャイル</Term>の価値観を、実際のチーム運営に落とし込む代表的な枠組みが<Term>スクラム</Term>です。役割・会議・成果物を軽く決めて短い反復を回す仕組みと、<Term>XP</Term>や<Term>TDD</Term>といった実践、そして<Term>CI/CD</Term>・<Term>DevOps</Term>の考え方までを一続きで見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">スクラムの役割 ― 誰が何を担うか</Heading>
      <p>スクラムでは、少人数のチームが短い期間（<Term>スプリント</Term>、通常1〜4週間）を単位に開発を繰り返します。中心となる役割は次の通りです。</p>
      <table>
        <thead>
          <tr><th>役割</th><th>責任</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">プロダクトオーナー</td><td>何を作るかの優先順位を決め、プロダクトの価値を最大化する</td></tr>
          <tr><td className="hl">スクラムマスター</td><td>スクラムが円滑に回るよう支援し、チームの障害を取り除く</td></tr>
          <tr><td className="hl">開発チーム</td><td>スプリントで動く成果物（インクリメント）を作る</td></tr>
        </tbody>
      </table>

      <Heading num="02">バックログとスプリント ― 何をどの順で作るか</Heading>
      <p>作るものは一覧で管理します。プロダクト全体でやりたいことを優先順位つきで並べたのが<Term>プロダクトバックログ</Term>、その中から今回のスプリントで取り組む分を抜き出したのが<Term>スプリントバックログ</Term>です。各項目は利用者視点の要求である<Term>ユーザーストーリー</Term>の形で書かれることが多く、スプリントの終わりには<Term>レトロスペクティブ</Term>（振り返り）で改善点を話し合います。振り返りの整理には、続ける・やめる・試すを挙げる<Term>KPT</Term>（Keep・Problem・Try）がよく使われます。</p>

      <Analogy label="💡 たとえるなら">
        スクラムは「短距離走を繰り返す」進め方です。ゴールまでの全行程（プロダクトバックログ）を一気に走らず、区間（スプリント）ごとに全力で走り、走り終えるたびにフォームを見直す（レトロスペクティブ）。区間ごとに必ず「進んだ距離」という成果が残るのが特徴です。
      </Analogy>

      <Heading num="03">エンジニアリングの実践 ― XP・TDD・ペアプロ</Heading>
      <p>アジャイルを技術面で支える実践群として、<Term>XP</Term>（エクストリームプログラミング）があります。中でも代表的なのが、テストを先に書いてから実装する<Term>TDD</Term>（テスト駆動開発）、2人が1台で協力して書く<Term>ペアプログラミング</Term>、そして小さな改善を積み重ねる<Term>リファクタリング</Term>です。いずれも「変化に強いコードを、こまめに確かめながら育てる」という発想でつながっています。</p>

      <Heading num="04">CI/CDとDevOps ― 反復を自動化で支える</Heading>
      <p>短い反復を現実的に回すには、統合とリリースの自動化が欠かせません。変更をこまめに統合して自動テストする<Term>継続的インテグレーション</Term>（CI）、そこから自動でリリース可能な状態まで持っていく<Term>継続的デリバリー</Term>（CD）、開発と運用が協調して速く安全に届ける<Term>DevOps</Term>、それにセキュリティを組み込んだ<Term>DevSecOps</Term>。ここでは考え方の入口までとし、具体的なパイプライン構築は<Link href="/cloud/aws/cicd">CI/CD</Link>や<Link href="/ops/deploy">公開先とデプロイ経路</Link>に委ねます。</p>

      <Heading num="まとめ">アジャイル実践で押さえたいこと</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>役割は3つ</h4><p>プロダクトオーナー・スクラムマスター・開発チームで、決める人と作る人と支える人を分けます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>反復で価値を刻む</h4><p>バックログを優先順位で並べ、スプリントごとに動くものを出して振り返ります。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>実践と自動化が支える</h4><p>TDD・ペアプロなどの実践と、CI/CD・DevOpsの自動化が反復を成立させます。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/sdlc/process" tag="開発工程">開発プロセスと手法</RelatedLink>
                    <RelatedLink href="/cloud/aws/cicd" tag="AWS">CI/CD</RelatedLink>
                    <RelatedLink href="/ops/deploy" tag="サービス運営">公開先とデプロイ経路</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
