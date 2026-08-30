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
  title: "Integrationテスト",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>Integrationテスト ― モジュールをつないだ先で起きる不具合を捕まえる</h1>
        <Lead>
          個々の関数が正しく動いても、DBへの書き込みが1件ずれる、外部APIのレスポンス形式を誤解している、モジュール同士のインターフェースが噛み合っていない ― こうした「つなぎ目」の不具合は<Link href="/test/unit">Unitテスト</Link>だけでは見つかりません。<Term>Integrationテスト</Term>は、この繋ぎ目を実際に結合した状態で検証する層です。
        </Lead>
      </Hero>

      <Heading num="01">UnitとE2Eの境界 ― どこからIntegrationになるのか</Heading>
      <p>3層の境目は厳密に決まっているわけではありませんが、目安として次のように考えると整理しやすくなります。Unitテストは「1つの関数・クラスを、依存をすべてテストダブルに置き換えて」検証します。Integrationテストは「複数のモジュール、あるいはDB・外部APIなど本物に近い依存を含めて」検証します。E2Eテストは「ブラウザを含めた、ユーザーから見えるシステム全体を」検証します。Integrationテストは「本物の依存を使うが、ブラウザ越しの画面操作までは行わない」、UnitとE2Eの中間に位置する層だと捉えると分かりやすいでしょう。</p>

      <Analogy label="💡 たとえるなら">
        Unitテストが「部品単体の動作確認」、E2Eテストが「完成した車の試乗」だとすると、Integrationテストは「エンジンとトランスミッションを実際に組み付けて、正しくかみ合うか確認する工程」にあたります。部品それぞれは正常でも、組み付けた瞬間に規格の不一致が発覚することがあります。
      </Analogy>

      <Heading num="02">DBを含むテスト</Heading>
      <p>データの読み書きを伴う処理は、DBアクセスをモックに置き換えてしまうと「SQLの書き間違い」「トランザクションの境界」「一意制約違反時の挙動」といった、DBそのものに依存する不具合を検出できません。Integrationテストでは、テスト専用のデータベース(Dockerコンテナで都度起動する、あるいはインメモリDBを使う)に対して実際にクエリを実行し、結果を検証します。各テストの前後でデータを初期化し、テスト同士が互いのデータに影響しないようにする点が重要です。</p>

      <Heading num="03">外部APIを含むテスト</Heading>
      <p>決済サービスや外部の認証基盤など、自分たちで制御できないAPIに依存する処理も同様です。毎回本物のAPIを呼ぶとテストが不安定になり(相手側の障害やレート制限の影響を受ける)、料金が発生する場合もあります。代表的な対処法は、実際のAPIレスポンスを記録しておいて再生する<Term>VCR</Term>のような仕組みや、モックサーバーを立てて相手のAPIの挙動を模倣する方法です。「自分のコードが、相手のAPIの仕様通りにリクエストを組み立て、レスポンスを正しく解釈できるか」を検証するのが目的です。</p>

      <Heading num="04">複数モジュール結合のテスト</Heading>
      <p>外部システムを介さない場合でも、自社コード内の複数モジュールを結合した際に不具合が出ることがあります。例えば「注文モジュール」が「在庫モジュール」を呼び出し、在庫モジュールが返す例外の型を注文モジュール側が想定していなかった、といったケースです。各モジュールをUnitテストで個別に保証していても、インターフェースの認識違いはモジュール同士を実際に繋いで初めて発覚します。</p>

      <Heading num="05">テスト用データの扱い</Heading>
      <p>Integrationテストは本物に近い依存を使う分、テストデータの管理が難しくなります。次の観点を押さえておくと安定します。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>テストごとに独立させる</h4><p>あるテストが作ったデータを別のテストが読んでしまわないよう、テストの前後でデータを初期化・削除します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>再現可能な状態から始める</h4><p>「今のDBの状態」に依存せず、毎回同じ初期データ(シード)から始まるようにします。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>個人情報を使わない</h4><p>本番データのコピーではなく、ダミーデータや生成したテストデータを使います。</p></Card>
      </CardGrid>

      <Aside label="実行速度とのトレードオフ">
        Integrationテストは本物のDBやAPIを使う分、Unitテストより実行が遅くなります。すべてのケースをIntegrationテストで書こうとせず、「モジュールのつなぎ目でしか検証できない部分」に絞ることで、テストピラミッドの中間層として適切な数に抑えられます。
      </Aside>

      <Heading num="まとめ">Integrationテストで押さえたい観点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>つなぎ目を検証する層</h4><p>Unitでは見えないDB・外部API・モジュール間の不整合を捕まえます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>本物に近い依存を使う</h4><p>DBやAPIはモックに置き換えず、テスト用の実体に対して検証します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>テストデータを管理する</h4><p>独立性・再現性・個人情報の非利用を守り、安定して繰り返し実行できるようにします。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/test/unit" tag="テスト">Unitテスト</RelatedLink>
                    <RelatedLink href="/test/e2e" tag="テスト">E2Eテスト</RelatedLink>
                    <RelatedLink href="/test/strategy" tag="テスト">テストの段階</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
