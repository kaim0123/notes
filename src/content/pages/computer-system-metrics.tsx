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
} from "@/components/docs";

export const metadata: Metadata = {
  title: "性能と経済性の評価",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ・OS</Eyebrow>
        <h1>性能と経済性の評価 ― 速さと費用でシステムを測る</h1>
        <Lead>
          システムは作って終わりではなく、<strong>どれだけ速く、どれだけの費用で回っているか</strong>を測り、比べ、改善し続ける対象です。ここでは、性能を表すレスポンスタイム・スループット、比較のためのベンチマーク、規模を変える考え方、そして総所有費用(TCO)という経済性の指標を整理します。「<Link href="/computer/system-reliability">信頼性と冗長化</Link>」と対になる、評価の章です。
        </Lead>
      </Hero>

      <Heading num="01">速さの2つの見方 ― レスポンスとスループット</Heading>
      <table>
        <tbody>
          <tr><th>指標</th><th>意味</th></tr>
          <tr><td className="hl">レスポンスタイム</td><td>1件の要求を出してから応答が返るまでの時間。短いほど「速い」と感じる。</td></tr>
          <tr><td className="hl">スループット</td><td>単位時間あたりに処理できる件数。大きいほど「たくさんさばける」。</td></tr>
        </tbody>
      </table>
      <Analogy label="💡 たとえるなら">
        レストランで、注文してから料理が出るまでの時間が<strong>レスポンスタイム</strong>、店全体が1時間に何皿出せるかが<strong>スループット</strong>です。1人客への速さと、店全体の処理量は別物 ― この2つは必ずしも一致しません。
      </Analogy>

      <Heading num="02">性能を比べる ― ベンチマーク</Heading>
      <p>異なるシステムの性能を同じ土俵で比べるため、標準的な試験プログラムで測るのが<Term>ベンチマーク</Term>です。代表的なものがあります。</p>
      <table>
        <tbody>
          <tr><th>ベンチマーク</th><th>対象</th></tr>
          <tr><td className="hl">TPC</td><td>トランザクション処理性能(データベース処理など)</td></tr>
          <tr><td className="hl">SPECint</td><td>整数演算の性能</td></tr>
          <tr><td className="hl">SPECfp</td><td>浮動小数点演算の性能</td></tr>
        </tbody>
      </table>

      <Heading num="03">規模の変え方 ― スケールアップとスケールアウト</Heading>
      <table>
        <tbody>
          <tr><th>方式</th><th>内容</th></tr>
          <tr><td className="hl">スケールアップ</td><td>1台の性能を上げる(CPU・メモリ増強)。単純だが上限と単一障害点がある。</td></tr>
          <tr><td className="hl">スケールアウト</td><td>台数を増やして処理を分担する。柔軟に伸ばせるが分散の設計が要る。</td></tr>
        </tbody>
      </table>
      <Aside label="測って備える">
        システムの状態を継続的に観測することを<Term>モニタリング</Term>、将来の負荷を予測して必要な資源を見積もることを<Term>キャパシティプランニング(容量・能力管理)</Term>といいます。「今どうか」を測り、「これからどうなるか」に備える、運用の両輪です(詳細は運用の領域)。
      </Aside>

      <Heading num="04">経済性 ― 総所有費用（TCO）</Heading>
      <p>システムの費用は、買うときの値段だけでは測れません。導入から廃棄までにかかる費用の総額が<Term>総所有費用(TCO)</Term>です。</p>
      <table>
        <tbody>
          <tr><th>分類</th><th>内容</th></tr>
          <tr><td className="hl">初期コスト</td><td>導入時にかかる費用(機器購入・構築など)。イニシャルコスト。</td></tr>
          <tr><td className="hl">運用コスト</td><td>稼働後にかかる費用(電気代・保守・人件費など)。ランニングコスト。</td></tr>
          <tr><td className="hl">直接コスト</td><td>機器・ライセンスなど、費用として見えやすいもの。</td></tr>
          <tr><td className="hl">間接コスト</td><td>利用者の学習・トラブル対応など、見えにくいもの。</td></tr>
        </tbody>
      </table>
      <p>安く見えても運用や間接コストがかさめば、総額では割高になることがあります。TCOは「一見の安さ」に惑わされないための視点です。</p>

      <Heading num="まとめ">この章の3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>速さは2つの見方で測る</h4>
          <p>1件の速さ(レスポンスタイム)と、全体の処理量(スループット)。両者は一致するとは限りません。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>比較はベンチマーク、拡張はスケール</h4>
          <p>TPC・SPECで同じ土俵で比べ、性能はスケールアップ(増強)かスケールアウト(台数)で伸ばします。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>費用は総額(TCO)で見る</h4>
          <p>初期＋運用、直接＋間接。導入時の値段だけでなく、廃棄までの総額で判断します。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/computer/system-metrics" />
    </DocsPage>
  );
}
