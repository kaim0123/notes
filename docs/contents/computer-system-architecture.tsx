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
  Aside,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "処理形態とシステム構成",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>処理形態とシステム構成 ― 1台を超えた組み方</h1>
        <Lead>
          ここまでは主に「1台のコンピュータの中身」を見てきました。ここからは<strong>複数の機械を組み合わせてシステムをつくる</strong>視点に移ります。処理のさせ方(集中/分散・バッチ/リアルタイム)、クライアントサーバの層構成、止めないための冗長化、そしてストレージ・仮想化・クラウドの構成用語を、試験で問われる概要レベルで整理します。
        </Lead>
      </Hero>

      <p>この章は用語が多めですが、「<strong>どこで処理するか</strong>」「<strong>どう役割を分けるか</strong>」「<strong>どう二重化するか</strong>」の3つの軸で見ると整理できます。</p>

      <Heading num="01">処理形態 ― どこで・いつ処理するか</Heading>
      <table>
        <tbody>
          <tr><th>形態</th><th>内容</th></tr>
          <tr><td className="hl">集中処理</td><td>1か所の大型機に処理を集める。管理は楽だが単一障害点になりやすい。</td></tr>
          <tr><td className="hl">分散処理</td><td>複数の機械に処理を分ける。負荷や障害に強いが、管理は複雑。</td></tr>
          <tr><td className="hl">バッチ処理</td><td>データをためて一括処理。給与計算・夜間バッチなど。</td></tr>
          <tr><td className="hl">リアルタイム処理</td><td>発生した処理を即座にこなす。制御系・オンライン取引など。</td></tr>
          <tr><td className="hl">対話型処理</td><td>人の入力に応じて逐次応答する。</td></tr>
          <tr><td className="hl">トランザクション処理</td><td>一連の処理を「全部成功か全部取消か」の単位で扱う。</td></tr>
        </tbody>
      </table>

      <Heading num="02">クライアントサーバと3層構成</Heading>
      <p><Term>クライアントサーバ</Term>は、サービスを要求する側(クライアント)と提供する側(サーバ)に役割を分ける構成です。とくに業務システムでは、機能を3つの層に分ける<Term>3層クライアントサーバシステム</Term>が定番です。</p>
      <table>
        <tbody>
          <tr><th>層</th><th>役割</th></tr>
          <tr><td className="hl">プレゼンテーション層</td><td>画面表示・入力受付(ユーザーとの接点)</td></tr>
          <tr><td className="hl">ファンクション層</td><td>業務ロジックの処理(アプリケーション)</td></tr>
          <tr><td className="hl">データベースアクセス層</td><td>データの永続化・検索</td></tr>
        </tbody>
      </table>
      <p>これに対し、クライアントとサーバ(DB)だけの構成が<Term>2層クライアントサーバシステム</Term>です。処理をサーバ側に寄せ、手元は最小限にする形態を<Term>シンクライアント</Term>と呼びます。</p>

      <Heading num="03">止めないための冗長構成</Heading>
      <p>1か所が壊れても止まらないよう、あらかじめ予備を用意しておくのが<Term>冗長構成</Term>です。処理を複数に振り分けて偏りを防ぐのが<Term>負荷分散</Term>です。</p>
      <table>
        <tbody>
          <tr><th>構成</th><th>内容</th></tr>
          <tr><td className="hl">デュアルシステム</td><td>2系統で同じ処理を行い結果を照合。高信頼だがコスト大。</td></tr>
          <tr><td className="hl">デュプレックスシステム</td><td>本番系と待機系を用意し、障害時に待機系へ切り替える。</td></tr>
          <tr><td className="hl">クラスタ</td><td>複数台を1つのシステムのように束ね、可用性や性能を高める。</td></tr>
        </tbody>
      </table>
      <Aside label="バックアップサイト">
        災害に備えた予備拠点を<Term>バックアップサイト</Term>といい、復旧の速さで3種類に分かれます。<strong>ホットサイト</strong>(即座に切替可能・常時稼働)、<strong>ウォームサイト</strong>(機材はあり、データ投入が必要)、<strong>コールドサイト</strong>(場所と電源のみ・構築から始める)。速いほど費用も高くなります。
      </Aside>

      <Heading num="04">ストレージ構成 ― RAID・NAS・SAN</Heading>
      <p>データを安全・高速に置くための構成です。</p>
      <table>
        <tbody>
          <tr><th>用語</th><th>内容</th></tr>
          <tr><td className="hl">RAID</td><td>複数ディスクを組み合わせて速度や耐障害性を高める。RAID0=ストライピング(高速化)、RAID1=ミラーリング(二重化)、RAID5=パリティで1台故障に耐える。</td></tr>
          <tr><td className="hl">NAS</td><td>ネットワークに直接つなぐファイル共有ストレージ。</td></tr>
          <tr><td className="hl">SAN</td><td>ストレージ専用の高速ネットワークを構築する方式。</td></tr>
        </tbody>
      </table>

      <Heading num="05">仮想化とクラウド（概要）</Heading>
      <p><Term>仮想化</Term>は、1台の物理マシン上に複数の仮想マシン(<Term>VM</Term>)を動かす技術です。デスクトップ環境をサーバ側に集約する<Term>VDI</Term>もこの応用です。<Term>クラウドコンピューティング</Term>は、こうした資源をネットワーク越しにサービスとして借りる形態で、提供範囲で分類されます。</p>
      <table>
        <tbody>
          <tr><th>区分</th><th>借りる範囲</th></tr>
          <tr><td className="hl">IaaS</td><td>サーバ・ストレージなどのインフラ</td></tr>
          <tr><td className="hl">PaaS</td><td>アプリを動かす実行基盤まで</td></tr>
          <tr><td className="hl">SaaS</td><td>完成したアプリそのもの</td></tr>
          <tr><td className="hl">FaaS</td><td>関数単位の実行(サーバレス)</td></tr>
        </tbody>
      </table>
      <p>ブラウザから利用する<Term>Webシステム</Term>も、3層構成やクラウドの上で動く代表的な形態です。</p>
      <Aside label="このページでは概要まで">
        仮想化・クラウド・Webは e-Words 上ここに含まれますが、運用や実装の詳細は別セクションで扱います。仕組みは「<Link href="/infra/virtualization">仮想化の仕組み</Link>」、構築は「<Link href="/cloud/aws">AWS</Link>」、Webの仕組みは「<Link href="/network/applications/web">Webの仕組み</Link>」を参照してください。
      </Aside>

      <Heading num="まとめ">この章の3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>処理形態は3つの軸で捉える</h4>
          <p>どこで(集中/分散)・いつ(バッチ/リアルタイム)・どう扱うか(トランザクション)。用語はこの軸に振り分けられます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>役割分担は層で分ける</h4>
          <p>クライアントサーバ、とくに3層(プレゼン・ファンクション・DBアクセス)が業務システムの定番です。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>止めない工夫は二重化</h4>
          <p>冗長構成・負荷分散・クラスタ・バックアップサイト・RAIDで、障害があっても止まらない/失わない設計にします。</p>
        </Card>
      </CardGrid>

      <p>「どう組むか」を見たら、次は「どれだけ壊れにくいか」を測る番です。信頼性の指標と設計思想へ進みます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/system/reliability" tag="コンピュータ">信頼性と冗長化 ― RASIS・MTBF/MTTR</RelatedLink>
                    <RelatedLink href="/computer/system/metrics" tag="コンピュータ">性能と経済性の評価 ― スループット・TCO</RelatedLink>
                    <RelatedLink href="/infra/virtualization" tag="インフラ">仮想化の仕組み</RelatedLink>
                    <RelatedLink href="/network/applications/web" tag="インターネット">Webの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
