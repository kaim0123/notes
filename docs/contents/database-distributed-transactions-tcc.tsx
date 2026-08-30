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
  title: "TCC",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>データベース &middot; 分散トランザクション</Eyebrow>
        <h1>TCC ― Try / Confirm / Cancel</h1>
        <Lead>
          <Term>TCC(Try-Confirm-Cancel)</Term>は、複数サービスにまたがる処理を3フェーズで進める分散トランザクションの方式です。各参加者はまず<Term>Try</Term>でリソースを<Term>予約</Term>し、全体が成功すれば<Term>Confirm</Term>で確定、どこかで失敗すれば<Term>Cancel</Term>で予約を解放します。<Link href="/database/distributed-transactions/saga">Saga</Link>が「確定後の補償」であるのに対し、TCCは「確定前の予約」で整合性を保つ点が特徴です。
        </Lead>
      </Hero>

      <Heading num="01">TCCが解決する問題</Heading>
      <p>サービスごとにDBが分かれた環境では、在庫を引いたあと決済が失敗する、といった不整合が起こりえます。<Link href="/database/distributed-transactions/saga">Saga</Link>は確定後に補償で戻しますが、在庫・口座残高・座席数のように「他者に奪われないよう先に確保しておきたい」リソースでは、確定前の段階で<Term>仮押さえ</Term>を持つ設計の方が自然なことが多いです。</p>
      <p>TCCは各参加者がTry/Confirm/Cancelの3 APIを実装し、コーディネータ(または各サービス)がフェーズを進めます。2PCのように全員の合意で一斉コミットするのではなく、各サービスが疎結合のまま進められる点でSagaと共通します。2PC・Sagaとの全体像は<Link href="/database/distributed-transactions">分散トランザクション</Link>で整理しています。</p>

      <Heading num="02">3つのフェーズ</Heading>
      <p>各参加者(サービス)は、同じビジネストランザクションIDに対して次の3操作を提供します。</p>
      <table>
        <thead>
          <tr><th>フェーズ</th><th>内容</th><th>例(在庫)</th><th>例(口座)</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Try</td>
            <td>リソースを<Term>予約</Term>する。まだ確定ではないが、他トランザクションから奪えない状態にする</td>
            <td>在庫数から「仮引当」分を減らし、reserved 列に記録</td>
            <td>残高から「仮引当」分を減らし、hold レコードを作成</td>
          </tr>
          <tr>
            <td className="hl">Confirm</td>
            <td>全員のTryが成功したら、予約を<Term>確定</Term>する</td>
            <td>仮引当 → 本引当(売上計上)</td>
            <td>仮引当 → 本振替</td>
          </tr>
          <tr>
            <td className="hl">Cancel</td>
            <td>どこかで失敗したら、予約を<Term>解放</Term>する</td>
            <td>仮引当を戻し、在庫を利用可能に戻す</td>
            <td>hold を解除し、残高を元に戻す</td>
          </tr>
        </tbody>
      </table>
      <p>TCCの要点は、Tryの時点で「他のトランザクションから奪えない状態」にしておき、Confirm/Cancelで確定か取り消しかを決めることです。Sagaの補償が「すでに確定した変更をビジネス上の逆操作で取り消す」ことに対し、TCCは「確定前に予約段階で止めておき、失敗時はCancelで予約だけ解く」というイメージに近いです。</p>

      <Heading num="03">データ設計 ― 予約状態をどう表現するか</Heading>
      <p>TCCを実装するには、通常の「確定済み」データとは別に<Term>予約中</Term>の状態を表現する必要があります。代表的なパターンは次のとおりです。</p>
      <table>
        <thead>
          <tr><th>パターン</th><th>内容</th><th>メリット</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">状態列の追加</td><td>available / reserved / confirmed のように在庫行や残高に状態を持つ</td><td>シンプル。1テーブルで完結しやすい</td></tr>
          <tr><td className="hl">予約テーブルの分離</td><td>holds や reservations テーブルに仮押さえを記録し、Confirm で本テーブルへ反映</td><td>監査・タイムアウト解除がしやすい</td></tr>
          <tr><td className="hl">二重カウントの防止</td><td>Try 時に利用可能数 = 総数 − 確定済み − 予約中、として計算する</td><td>同時リクエストでも超売れを防げる</td></tr>
        </tbody>
      </table>
      <Aside label="タイムアウト">
        Try したまま Confirm/Cancel が来ない「宙ぶらり」の予約は、一定時間で自動 Cancel する<Term>予約の有効期限</Term>を設けるのが一般的です。期限切れ予約の解放は、バッチや定期ジョブで行います。
      </Aside>

      <Heading num="04">設計で押さえるポイント</Heading>
      <table>
        <thead>
          <tr><th>観点</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">冪等性</td><td>Try / Confirm / Cancel はいずれも同じトランザクションIDで再実行しても安全であること。Confirm 済みに再度 Confirm しても問題ない(空操作)設計にする</td></tr>
          <tr><td className="hl">空きチェックのタイミング</td><td>利用可能数の判定は Try の中で行う。Confirm 時点ではすでに予約済みであることを前提にする</td></tr>
          <tr><td className="hl">コーディネーション</td><td>全参加者の Try 結果を集約し、成功なら全員に Confirm、失敗なら全員に Cancel を指示する仕組み(オーケストレータやSagaマネージャに近い)</td></tr>
          <tr><td className="hl">API の明示</td><td>通常の CRUD とは別に Try/Confirm/Cancel を公開する。呼び出し側がフェーズを理解している必要がある</td></tr>
        </tbody>
      </table>

      <Heading num="05">Sagaとの違いと使い分け</Heading>
      <table>
        <thead>
          <tr><th>観点</th><th>Saga</th><th>TCC</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">基本方針</td><td>各ステップを確定させ、失敗時は補償で取り消す</td><td>Try で予約し、成功なら Confirm、失敗なら Cancel</td></tr>
          <tr><td className="hl">失敗時の処理</td><td>補償トランザクション(ビジネス上の逆操作)を設計する</td><td>Cancel で予約を解放する(Confirm 前なら比較的機械的)</td></tr>
          <tr><td className="hl">実装の負担</td><td>補償ロジックを業務ごとに考える必要がある</td><td>Try/Confirm/Cancel の3 API と予約用のデータ設計が要る</td></tr>
          <tr><td className="hl">向いている例</td><td>配送手配・ポイント付与・通知など、補償が自然に定義できる長い業務フロー</td><td>在庫・残高・座席など、リソースの「仮押さえ」が明確なドメイン</td></tr>
        </tbody>
      </table>
      <p>1つの業務フローの中で、在庫・決済は TCC、配送・通知は Saga(補償)と組み合わせることもあります。</p>

      <Analogy label="💡 たとえるなら">
        旅行の予約で、航空券・ホテルそれぞれを「仮押さえ(Try)」し、全部取れたら本予約(Confirm)、どれかダメなら仮押さえだけ解除(Cancel)する方式が TCC です。Saga の「取ったあとキャンセル料で取り消す」流れとの対比は<Link href="/database/distributed-transactions/saga">Saga</Link>のページで詳しく見ています。
      </Analogy>

      <p>次のページでは、検索や更新を速くする<Link href="/database/index">索引とアクセス制御</Link>を見ていきます。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>確定前の予約が本質</h4><p>Try で仮押さえ、Confirm/Cancel で確定か解放かを決める。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>予約状態のデータ設計が要る</h4><p>available / reserved / confirmed や holds テーブルで表現する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>在庫・残高など「奪い合い」ドメイン向き</h4><p>補償より予約モデルが自然な場面で選ぶ。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/database/distributed-transactions" tag="データベース">分散トランザクション</RelatedLink>
            <RelatedLink href="/database/distributed-transactions/saga" tag="データベース">Saga</RelatedLink>
            <RelatedLink href="/database/transaction" tag="データベース">トランザクションと整合性</RelatedLink>
            <RelatedLink href="/design/architecture/sys/microservices" tag="設計">マイクロサービスアーキテクチャ</RelatedLink>
            <RelatedLink href="/design/patterns" tag="設計">設計パターン</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
