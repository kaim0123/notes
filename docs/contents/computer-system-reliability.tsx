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
  title: "信頼性と冗長化",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>信頼性と冗長化 ― 壊れても止めない設計</h1>
        <Lead>
          機械はいつか壊れます。だからこそ、壊れても被害を最小にし、できれば止めないための設計思想と指標があります。「<Link href="/computer/system/architecture">処理形態とシステム構成</Link>」で見た冗長構成を、<strong>信頼性の観点</strong>から深掘りします。フォールトトレラント・RASIS・MTBF/MTTR・稼働率まで、試験頻出の用語と計算を整理します。
        </Lead>
      </Hero>

      <Heading num="01">壊れ方を設計する ― 3つのフェール</Heading>
      <p>障害が起きても被害を抑えるように、あらかじめ「壊れ方」を決めておく考え方です。故障してもシステム全体を動かし続ける設計を<Term>フォールトトレラント</Term>と呼びます。</p>
      <table>
        <tbody>
          <tr><th>用語</th><th>考え方</th></tr>
          <tr><td className="hl">フェールセーフ</td><td>故障時は<strong>安全な側</strong>へ倒す。例: 信号機が故障したら赤で止める。</td></tr>
          <tr><td className="hl">フェールソフト</td><td>故障時も<strong>機能を落として動かし続ける</strong>(縮退運転)。例: 一部エンジン停止でも飛び続ける。</td></tr>
          <tr><td className="hl">フールプルーフ</td><td>そもそも<strong>誤操作させない</strong>。例: ドアを閉めないと動かない電子レンジ。</td></tr>
        </tbody>
      </table>
      <Analogy label="💡 見分け方">
        フェール<strong>セーフ</strong>=「止めて安全に」、フェール<strong>ソフト</strong>=「弱めて継続」、フール<strong>プルーフ</strong>=「バカ(fool)でも間違えない」。主語が“故障への備え”か“人の誤操作への備え”かで区別できます。
      </Analogy>

      <Heading num="02">切り替えの構成 ― スタンバイとアクティブ</Heading>
      <table>
        <tbody>
          <tr><th>構成</th><th>内容</th></tr>
          <tr><td className="hl">アクティブ-スタンバイ</td><td>片方が稼働、もう片方は待機。障害時に待機系へ切り替える。</td></tr>
          <tr><td className="hl">アクティブ-アクティブ</td><td>両系が同時に稼働し処理を分担。1系が落ちても残りで継続。</td></tr>
        </tbody>
      </table>

      <Heading num="03">信頼性の総合指標 ― RASIS</Heading>
      <p>システムの品質を5つの観点でまとめたのが<Term>RASIS</Term>です。</p>
      <table>
        <tbody>
          <tr><th>頭字</th><th>観点</th></tr>
          <tr><td className="hl">R ― Reliability</td><td>信頼性(壊れにくさ)</td></tr>
          <tr><td className="hl">A ― Availability</td><td>可用性(使いたいとき使えるか)</td></tr>
          <tr><td className="hl">S ― Serviceability</td><td>保守性(直しやすさ)</td></tr>
          <tr><td className="hl">I ― Integrity</td><td>完全性(データが壊れない)</td></tr>
          <tr><td className="hl">S ― Security</td><td>安全性(不正から守る)</td></tr>
        </tbody>
      </table>

      <Heading num="04">壊れやすさを測る ― MTBF・MTTR・稼働率</Heading>
      <table>
        <tbody>
          <tr><th>指標</th><th>意味</th></tr>
          <tr><td className="hl">MTBF</td><td>平均故障間隔。故障から次の故障までの平均稼働時間。長いほど壊れにくい。</td></tr>
          <tr><td className="hl">MTTR</td><td>平均修復時間。故障してから直るまでの平均。短いほど直しやすい。</td></tr>
          <tr><td className="hl">稼働率</td><td>全体のうち正常に動いていた割合。可用性の指標。</td></tr>
        </tbody>
      </table>
      <Aside label="試験メモ ― 稼働率の計算">
        <strong>稼働率 ＝ MTBF ÷ (MTBF ＋ MTTR)</strong><br />
        例: MTBF 90時間、MTTR 10時間なら 90 ÷ (90＋10) ＝ <strong>0.9(90%)</strong>。<br />
        直列システム(全部動いて成立)の稼働率は各稼働率の<strong>積</strong>、並列システム(どれか動けば成立)は <strong>1 −(1 − 稼働率)の積</strong> で求めます。並列にするほど全体の稼働率は上がります。
      </Aside>

      <Heading num="05">故障のパターン ― バスタブ曲線</Heading>
      <p>機器の故障率は時間とともに一定ではありません。導入直後は初期不良で高く(初期故障期)、その後は安定して低く(偶発故障期)、寿命が近づくと再び上がります(摩耗故障期)。この形が浴槽に似ているため<Term>バスタブ曲線</Term>と呼ばれます。</p>

      <Heading num="まとめ">この章の3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>壊れ方を先に決める</h4>
          <p>フェールセーフ(安全に停止)・フェールソフト(縮退継続)・フールプルーフ(誤操作防止)を使い分けます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>RASISで総合評価</h4>
          <p>信頼性・可用性・保守性・完全性・安全性の5観点で品質を捉えます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>数字で測る</h4>
          <p>MTBF/MTTRから稼働率＝MTBF÷(MTBF+MTTR)。直列は積、並列は上がる、が計算の型です。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/system/metrics" tag="コンピュータ">性能と経済性の評価 ― スループット・TCO</RelatedLink>
                    <RelatedLink href="/computer/system/architecture" tag="コンピュータ">処理形態とシステム構成 ― 冗長構成・RAID</RelatedLink>
                    <RelatedLink href="/infra/monitoring/server" tag="インフラ">サーバー・機器の監視</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
