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
  title: "セキュリティ対策と実装",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>セキュリティ対策と実装 ― 技術的な防御の全体像</h1>
        <Lead>
          攻撃手法とリスクマネジメントを踏まえ、実際に使われる技術的な対策を俯瞰します。ネットワークの境界を守る機器、通信を暗号化するプロトコル、そして日々の運用で守る仕組み ― それぞれの役割を整理し、より深い実装は個別ページへ橋渡しします。
        </Lead>
      </Hero>

      <Heading num="01">境界を守る ― ファイアウォール・WAF・IDS/IPS</Heading>
      <p>ネットワークの出入り口で不正な通信を止める仕組みです。検査する層の深さで役割が分かれます。</p>
      <table>
        <thead>
          <tr><th>機器・仕組み</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ファイアウォール(FW)</td><td>IP・ポート・プロトコルなどで通信の可否を判断する</td></tr>
          <tr><td className="hl">WAF(Web Application Firewall)</td><td>HTTPの中身まで検査し、SQLi・XSSなどWebアプリへの攻撃を防ぐ</td></tr>
          <tr><td className="hl">IDS(侵入検知)</td><td>不正な通信を検知して管理者に通知する</td></tr>
          <tr><td className="hl">IPS(侵入防止)</td><td>検知に加えて、その通信を自動で遮断する</td></tr>
          <tr><td className="hl">DMZ(非武装地帯)</td><td>外部公開サーバーを内部NWから隔離した中間区画に置く</td></tr>
          <tr><td className="hl">SIEM</td><td>各機器のログを集約・相関分析し、脅威の兆候を見つける</td></tr>
        </tbody>
      </table>
      <p>これらのネットワーク層の防御をより深く掘り下げた実務は「<Link href="/security/network-defense">ネットワーク層の防御</Link>」で扱います。機器としての位置づけは「<Link href="/network/topology">トポロジと接続装置</Link>」とも対応します。</p>

      <Heading num="02">通信を守る ― 暗号化プロトコル</Heading>
      <p>盗聴・改ざんを防ぐため、通信経路を暗号化するプロトコルが使われます。</p>
      <table>
        <thead>
          <tr><th>プロトコル</th><th>用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">SSL/TLS</td><td>Web(HTTPS)などアプリケーション通信の暗号化</td></tr>
          <tr><td className="hl">IPsec</td><td>IP層での暗号化。拠点間VPNなどで使う</td></tr>
          <tr><td className="hl">SSH</td><td>サーバーへの遠隔ログイン・操作を暗号化する</td></tr>
          <tr><td className="hl">VPN</td><td>公共回線上に暗号化された仮想的な専用線を作る</td></tr>
        </tbody>
      </table>
      <p>暗号化そのものの仕組み(共通鍵・公開鍵・ハッシュ)は「<Link href="/security/crypto">暗号の歴史と公開鍵暗号</Link>」「<Link href="/security/hash">ハッシュ関数と衝突攻撃</Link>」で扱います。</p>

      <Heading num="03">運用で守る ― マルウェア対策・アクセス制御・パッチ管理</Heading>
      <p>機器や通信の防御に加え、日々の運用そのものが対策になります。マルウェア対策ソフトの導入と定義ファイルの更新、必要最小限の権限だけを与える<Term>アクセス制御</Term>、脆弱性を放置しない<Term>パッチ管理</Term>、そして開発段階で脆弱性を作り込まない<Term>セキュアプログラミング</Term>(入力検証・出力エスケープ)が基本です。配信時のHTTPヘッダやログ設計といった実装面は、個別ページで詳しく扱います。</p>

      <Analogy label="💡 たとえるなら">
        セキュリティ対策は「建物の総合防犯」です。門と警備員(FW・IDS/IPS)、金庫室への暗号錠(TLS・VPN)、そして日々の戸締まり点検と設備更新(パッチ管理・運用)。どれか1つでなく、入口・通路・日常運用の全部を組み合わせて初めて守れます。
      </Analogy>

      <Heading num="まとめ">境界・通信・運用の3面で守る</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>境界はFW・WAF・IDS/IPS</h4><p>検査する層の深さで役割が分かれ、組み合わせて多層に守ります。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>通信はTLS・IPsec・VPN</h4><p>経路を暗号化し、盗聴・改ざん・なりすましを防ぎます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>運用が最後の砦</h4><p>パッチ管理・アクセス制御・セキュアプログラミングを継続します。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/network-defense" tag="セキュリティ">ネットワーク層の防御</RelatedLink>
                    <RelatedLink href="/security/headers" tag="セキュリティ">セキュリティヘッダ</RelatedLink>
                    <RelatedLink href="/security/crypto" tag="セキュリティ">暗号の歴史と公開鍵暗号</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
