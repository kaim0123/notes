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
  title: "資産管理 ― 台帳・在庫・棚卸",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>資産管理 ― 台帳・在庫・棚卸</h1>
        <Lead>
          端末管理のすべての土台になるのが「今、会社に何があって、それを誰がどこで使っているか」を正確に知っていることです。この把握を支えるのが<Term>台帳(資産管理)</Term>・<Term>在庫管理</Term>・<Term>棚卸</Term>の3点セット。地味ですが、ここが崩れると他のすべての業務が成り立ちません。
        </Lead>
      </Hero>

      <Heading num="01">資産台帳 ― すべての管理の出発点</Heading>
      <p><Term>資産管理</Term>とは、組織が保有するPC・スマートフォン・サーバー・ネットワーク機器などを<Term>台帳</Term>として記録・管理することです。1台ごとに、次のような情報を紐づけて管理します。</p>
      <table>
        <thead>
          <tr><th>項目</th><th>例</th><th>何に使うか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">型番・機種</td><td>ThinkPad X1</td><td>スペック把握・調達判断</td></tr>
          <tr><td className="hl">シリアル番号</td><td>PF-XXXXX</td><td>個体の一意な識別・保証照会</td></tr>
          <tr><td className="hl">利用者・部署</td><td>営業部 山田</td><td>「誰の端末か」の特定</td></tr>
          <tr><td className="hl">設置場所</td><td>本社3F / 在宅</td><td>所在の把握・棚卸</td></tr>
          <tr><td className="hl">購入日・購入価格</td><td>2024-04 / 18万円</td><td>減価償却・更改計画</td></tr>
          <tr><td className="hl">保証期限</td><td>2027-03</td><td>故障時の修理判断</td></tr>
        </tbody>
      </table>
      <p>台帳があることで、「このPCはいつ買ったものか」「保証は生きているか」「そろそろ買い替えるべき台数はどれくらいか」といった問いに即答できます。会計上は<Term>減価償却</Term>(高額な資産の価値を耐用年数にわたって費用計上する処理)の対象になるため、資産台帳は経理・監査の観点でも欠かせません。</p>

      <Heading num="02">在庫管理 ― 予備を切らさない</Heading>
      <p>稼働中の端末だけでなく、まだ誰にも割り当てていない<Term>予備PC</Term>や、マウス・モニター・ケーブル・変換アダプタといった<Term>周辺機器・消耗品</Term>の数を把握するのが<Term>在庫管理</Term>です。入社が集中する4月に「配る予備PCが足りない」といった事態を避けるため、いくつ持っておけばよいかの<Term>適正在庫</Term>を定め、残りが一定数(<Term>発注点</Term>)を下回ったら補充します。</p>
      <p>多すぎる在庫は保管コストと資産の遊休化を招き、少なすぎる在庫は業務の停止を招きます。この2つのバランスを取るのが在庫管理の勘所です。</p>

      <Heading num="03">棚卸 ― 台帳と現実を突き合わせる</Heading>
      <p>台帳は放っておくと必ず現実とズレます。返却されずに退職者が持ち帰った、部署間で勝手に貸し借りした、記録し忘れた──こうした差異を定期的に洗い出すのが<Term>棚卸(実地棚卸)</Term>です。年1〜2回、実機と台帳を1台ずつ突き合わせ、<Term>台帳にあるのに現物がない(所在不明)</Term>／<Term>現物があるのに台帳にない(未登録)</Term>を見つけて是正します。</p>
      <p>台数が多いと目視での突合は大変なので、機器に<Term>バーコード</Term>や<Term>QRコード</Term>、<Term>RFIDタグ</Term>を貼り、リーダーで読み取って自動照合する仕組みもよく使われます。所在不明の端末はそのまま情報漏えいリスクになるため、棚卸はセキュリティ上も重要な統制です。</p>

      <Analogy label="💡 たとえるなら">
        <strong>資産台帳</strong>は図書館の蔵書リスト、<strong>在庫管理</strong>は「貸出中でない本が書架にいくつあるか」の把握、そして<strong>棚卸</strong>は年に一度図書館を閉めて「リスト通りに本が棚にあるか」を1冊ずつ確認する蔵書点検にあたります。リストと現実が一致していてはじめて、貸出も購入計画も成り立ちます。
      </Analogy>

      <Aside label="豆知識">
        資産管理には、人が記録する<strong>台帳(静的な情報)</strong>と、端末が自動で報告する<strong>インベントリ収集(動的な情報)</strong>の2種類があります。後者は MDM や資産管理ツールが各PCから OS バージョンやインストール済みソフトを自動収集する仕組みで、手作業の台帳更新を大幅に減らせます。詳しくは<strong>端末セキュリティ管理</strong>のページで扱います。
      </Aside>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>台帳がすべての土台</h4>
          <p>型番・シリアル・利用者・保証期限を1台ごとに記録し、管理・監査・減価償却の基準にします。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>在庫は多すぎず少なすぎず</h4>
          <p>予備PCや周辺機器の適正在庫を決め、発注点を下回ったら補充して業務停止を防ぎます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>棚卸で現実とのズレを是正</h4>
          <p>年1〜2回、実機と台帳を突き合わせ、所在不明の端末をなくすことがセキュリティにも直結します。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/client" tag="コンピュータ">クライアント管理の実務(総論)</RelatedLink>
                    <RelatedLink href="/computer/client/kitting" tag="コンピュータ">キッティングと配布・回収</RelatedLink>
                    <RelatedLink href="/computer/client/license" tag="コンピュータ">ライセンス管理</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
