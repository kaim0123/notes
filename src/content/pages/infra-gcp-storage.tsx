import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "ストレージ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>ストレージ ― 形と、置く範囲</h1>
        <Lead>
          <Link href="/infra/server">3つの形</Link>(ブロック・ファイル・オブジェクト)という選び方は事業者を問いません。Google Cloud側で追加で決めるのは<Term>どの範囲に置くか</Term>です。1つのリージョンか、2つにまたがるか、複数にまたがるか ― この選択が耐障害性・料金・書き込みの反映の速さを同時に決め、<strong>あとから変えるには全部を移すことになります</strong>。
        </Lead>
      </Hero>

      <Heading num="01">形は3つ、選び方は同じ</Heading>
      <table>
        <thead><tr><th>形</th><th>用途</th><th>注意点</th></tr></thead>
        <tbody>
          <tr><td className="hl">オブジェクト</td><td>画像・動画・バックアップ・分析用の元データ</td><td>部分更新はできない。丸ごと置き換える</td></tr>
          <tr><td className="hl">ブロック</td><td>仮想マシンのディスク、データベースの実体</td><td>ゾーンに属する。付けていなくても課金される</td></tr>
          <tr><td className="hl">ファイル</td><td>複数のマシンから同時に読み書きする領域</td><td>単価が高い。本当に共有が要るかを先に問う</td></tr>
        </tbody>
      </table>

      <Heading num="02">置く範囲を選ぶ</Heading>

      <DiagramFrame
        slug="infra-gcp-storage-location"
        aspect="700 / 280"
        caption="保存先を置く範囲の3段階。1つのリージョンに置く形は最も安く、リージョン内では複製されるので通常の障害には耐える。2つのリージョンにまたがる形は片方が丸ごと使えなくなっても続けられる。複数のリージョンにまたがる形は広い地域から速く読め耐障害性も最も高いが、料金と反映の遅れが増える。後から変えるには全部を移すことになるので、作るときに決める。"
      />

      <p>
        判断の材料は<strong>どこから読むか</strong>と<strong>どこまでの障害に耐えたいか</strong>の2つです。国内の利用者だけが対象なら、1つのリージョンで十分なことがほとんどです。「広いほうが安全」で選ぶと、料金と反映の遅れという形で返ってきます。
      </p>

      <Aside label="分析用のデータは、置き場所も設計のうち">
        大量の記録を後からまとめて集計する用途では、保存先と分析基盤の位置関係が処理時間と費用に効きます。別のリージョンにあるデータを読むと転送量が発生するので、<strong>集計する場所の近くに置く</strong>のが基本です(<Link href="/infra/ops">コスト管理</Link>)。
      </Aside>

      <Heading num="03">保存クラスと自動移行</Heading>
      <p>
        読み出しの頻度に応じた段階があるのは<Link href="/infra/storage">共通</Link>です。運用も同じで、<strong>一定期間を過ぎたら安いクラスへ、さらに過ぎたら削除</strong>という規則を作成時に設定します。人が判断する運用にすれば、必ず消し忘れが積み上がります。
      </p>

      <Heading num="まとめ">形と範囲を、作るときに決める</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>形はアクセスの単位で</h4><p>丸ごとか、区画か、共有か。事業者が変わっても問いは同じ。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>範囲は読む場所と耐障害性で</h4><p>広いほど強く、高く、遅い。後から変えるのは全部を移すこと。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>移行と削除は自動で</h4><p>クラスの切り替えを規則として書く。人の判断に残さない。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-storage" />
    </DocsPage>
  );
}
