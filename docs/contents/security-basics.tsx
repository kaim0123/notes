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
  title: "情報セキュリティの目的と脅威",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>情報セキュリティの目的と脅威 ― 何を、なぜ守るのか</h1>
        <Lead>
          個別の攻撃と対策に入る前に、「そもそも情報セキュリティは何を守るのか」という目的を押さえます。中心にあるのが機密性・完全性・可用性の3原則(CIA)です。あわせて、守る対象(情報資産)と、それを脅かす脅威・脆弱性の関係、代表的なマルウェアの種類、そして「1つの壁に頼らない」多層防御の考え方を整理します。
        </Lead>
      </Hero>

      <Heading num="01">情報セキュリティの3要素 ― CIA</Heading>
      <p>情報セキュリティが守るべき性質は、頭文字をとって<Term>CIA</Term>と呼ばれる3つに集約されます。</p>
      <table>
        <thead>
          <tr><th>要素</th><th>意味</th><th>失われると</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">機密性(Confidentiality)</td><td>認められた人だけが情報にアクセスできる</td><td>情報漏えい</td></tr>
          <tr><td className="hl">完全性(Integrity)</td><td>情報が正確で、改ざんされていない</td><td>データの改ざん・破壊</td></tr>
          <tr><td className="hl">可用性(Availability)</td><td>必要なときに情報やシステムを使える</td><td>サービス停止(DoSなど)</td></tr>
        </tbody>
      </table>
      <p>この3つに加え、近年は<Term>真正性</Term>(なりすましでない本物か)、<Term>否認防止</Term>(後から「やっていない」と言わせない)、<Term>責任追跡性</Term>(誰が行ったか追える)、<Term>信頼性</Term>(意図通り動く)を加えた考え方も重視されます。</p>

      <Analogy label="💡 たとえるなら">
        CIAは金庫の3条件です。<strong>機密性</strong>は「鍵を持つ人だけが開けられる」、<strong>完全性</strong>は「中身がすり替えられていない」、<strong>可用性</strong>は「必要なときにちゃんと開く」。どれか1つでも欠ければ、金庫として役に立ちません。
      </Analogy>

      <Heading num="02">情報資産・脅威・脆弱性 ― リスクの3要素</Heading>
      <p>守る対象を<Term>情報資産</Term>(顧客データ・システム・信用など)と呼びます。これに対し、資産に損害を与えうる要因が<Term>脅威</Term>、脅威につけ込まれる弱点が<Term>脆弱性</Term>です。<strong>リスクは「脅威 × 脆弱性 × 資産の価値」</strong>で大きくなります。</p>
      <table>
        <thead>
          <tr><th>用語</th><th>意味</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">脅威</td><td>資産に損害を与えうる要因</td><td>攻撃者、マルウェア、災害、内部不正、操作ミス</td></tr>
          <tr><td className="hl">脆弱性</td><td>脅威につけ込まれる弱点</td><td>未更新のソフト、弱いパスワード、設定ミス</td></tr>
        </tbody>
      </table>
      <p>脅威があっても脆弱性がなければ被害は起きにくく、脆弱性があっても脅威がなければ顕在化しません。対策とは、この2つの掛け算を小さくする営みです。</p>

      <Heading num="03">マルウェアの種類</Heading>
      <p>悪意を持って作られたソフトウェアの総称が<Term>マルウェア</Term>です。感染の仕方や目的によって呼び名が分かれます。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ウイルス</td><td>他のファイルに寄生して増殖する。単独では動けない</td></tr>
          <tr><td className="hl">ワーム</td><td>単独で自己増殖し、ネットワーク越しに拡散する</td></tr>
          <tr><td className="hl">トロイの木馬</td><td>正規のソフトを装って侵入し、裏で不正動作する</td></tr>
          <tr><td className="hl">ランサムウェア</td><td>データを暗号化し、復号と引き換えに身代金を要求する</td></tr>
          <tr><td className="hl">スパイウェア</td><td>気づかれずに情報を収集し外部へ送信する</td></tr>
          <tr><td className="hl">ボット</td><td>感染端末を遠隔操作し、踏み台(ボットネット)にする</td></tr>
        </tbody>
      </table>

      <Heading num="04">多層防御 ― 1つの壁だけに頼らない</Heading>
      <p>セキュリティ対策は「これさえやれば安全」という単一の魔法ではありません。通信は<Term>物理層</Term>から<Term>アプリケーション層</Term>まで複数の階層を経て届くため、それぞれの階層に別々の脅威があり、それぞれに対策が必要です。この考え方を<Term>多層防御(Defense in Depth)</Term>と呼びます。</p>
      <table>
        <thead>
          <tr><th>階層(OSI参照モデル)</th><th>代表的な脅威</th><th>代表的な対策</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">アプリケーション層</td><td>SQLi、XSS、CSRF、認可不備、不正API利用</td><td>入力検証、出力エスケープ、認証・認可、レート制限、WAF</td></tr>
          <tr><td className="hl">プレゼンテーション層</td><td>盗聴・改ざん、不正な符号化</td><td>TLSによる暗号化</td></tr>
          <tr><td className="hl">セッション層</td><td>セッションハイジャック、固定化、なりすまし</td><td>セッション管理、Cookie管理</td></tr>
          <tr><td className="hl">トランスポート層</td><td>ポートスキャン、不正なTCP通信</td><td>不要ポート閉鎖、ファイアウォール、TLS終端の適切な配置</td></tr>
          <tr><td className="hl">ネットワーク層</td><td>不正ルーティング、IPスプーフィング、DDoS</td><td>ファイアウォール、VPN、IDS/IPS、セグメンテーション</td></tr>
          <tr><td className="hl">データリンク層</td><td>不正端末の接続、ARPスプーフィング</td><td>VLAN分割、内部NW分離、ポートセキュリティ</td></tr>
          <tr><td className="hl">物理層</td><td>機器への不正アクセス、ケーブル盗聴</td><td>入退室管理、ラック施錠</td></tr>
        </tbody>
      </table>
      <Analogy label="💡 たとえるなら">
        多層防御は「城の守り方」に似ています。城壁(ネットワーク層の防御)を突破されても、堀(トランスポート層)があり、さらに天守閣の鍵(アプリケーション層の認証・認可)があります。1つの壁が破られても、次の壁が食い止める ― これが「1つの対策に頼らない」ということの意味です。あわせて、設計の初期段階から安全性を織り込む<Term>セキュリティバイデザイン</Term>の考え方も重視されます。
      </Analogy>

      <Heading num="まとめ">守る目的を先に固める</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>目的はCIAの維持</h4><p>機密性・完全性・可用性、加えて真正性・否認防止を守ることが情報セキュリティの目的です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>リスク=脅威×脆弱性×資産価値</h4><p>脅威と脆弱性の掛け算を小さくすることが対策の本質です。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>多層で守る</h4><p>単一の壁に頼らず、各層に対策を重ねる多層防御が基本方針です。</p></Card>
      </CardGrid>
      <p>目的を押さえたら、次は攻撃者が実際にどんな手口を使うのか、「攻撃手法」を見ていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/attacks" tag="セキュリティ">攻撃手法</RelatedLink>
                    <RelatedLink href="/security/management" tag="セキュリティ">リスクマネジメント</RelatedLink>
                    <RelatedLink href="/network/layers" tag="ネットワーク">階層モデル</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
