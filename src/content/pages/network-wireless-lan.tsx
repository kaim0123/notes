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
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ワイヤレスLAN",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>ワイヤレスLAN ― ケーブルの代わりに電波でつなぐ</h1>
        <Lead>
          ここまでのイーサネットは物理的なケーブルを前提にしていましたが、<Term>Wi-Fi(IEEE 802.11)</Term>はケーブルの代わりに電波でLANを構成します。管理の仕方とセキュリティ方式の2つの軸で、無線LANの全体像を押さえます。
        </Lead>
      </Hero>

      <Heading num="00">無線LANの基礎</Heading>
      <p>
        無線LANでは、電波を送受信する<Term>AP(アクセスポイント)</Term>が有線LANとの橋渡し役になります。複数のAPが同じ<Term>SSID</Term>(ネットワーク名)を名乗ることで、利用者は歩き回りながらAPを切り替えても、同じネットワークにつながっているように利用できます。近くのAP同士が同じ<Term>チャネル(周波数)</Term>を使うと電波が干渉し合うため、チャネルの計画的な割り当ても運用上の課題になります。
      </p>

      <Heading num="01">アーキテクチャ ― 自律型か、集中管理型か</Heading>
      <p>
        APの管理方法には大きく2つの考え方があります。
      </p>

      <DiagramFrame
        slug="network-wlan-architecture"
        aspect="700 / 420"
        caption="無線LANアーキテクチャ。自律型APは各APが個別に設定を持ち、変更のたびに1台ずつ設定が必要になる。集中管理型ではWLC(コントローラ)がCAPWAPトンネルで各Lightweight APを一括管理し、設定はWLCで変更するだけで全APに自動配布される。"
      />

      <p>
        AP1台だけの小規模な環境では<Term>自律型AP</Term>で十分ですが、フロア全体・複数拠点など台数が増えると、1台ずつ設定を変更するのは現実的ではありません。<Term>WLC(Wireless LAN Controller)</Term>による集中管理型では、電波の管理や認証といった重い処理をコントローラ側に寄せた<Term>Lightweight AP</Term>を多数配置し、設定変更を1箇所で完結できます。
      </p>

      <Heading num="02">セキュリティ ― 暗号方式の変遷</Heading>
      <p>
        無線LANは電波が空間に広がる性質上、有線LANよりも盗聴・不正接続のリスクが高く、暗号化の方式が重要になります。
      </p>

      <DiagramFrame
        slug="network-wlan-security-evolution"
        aspect="900 / 260"
        caption="無線LANセキュリティの変遷。WEPは固定鍵で数分で解読可能な脆弱な方式で現在は非推奨、WPAはTKIPで鍵を動的に変更し、WPA2はAES(CCMP)による強力な暗号化を採用し、WPA3はSAEという鍵交換方式でさらに安全性を強化した現在の標準になっている。"
      />

      <p>
        初期の<Term>WEP</Term>は鍵が固定されており、専用ツールを使えば短時間で解読できてしまうため、現在は使用が推奨されません。<Term>WPA</Term>は鍵を動的に変更する<Term>TKIP</Term>で対策し、<Term>WPA2</Term>ではより強力な<Term>AES(CCMP)</Term>暗号化が標準になりました。最新の<Term>WPA3</Term>は<Term>SAE</Term>という鍵交換方式を採用し、オフラインでの総当たり攻撃への耐性をさらに高めています。
      </p>
      <p>
        認証方式にも、全員が同じ鍵を共有する<Term>事前共有鍵(PSK、家庭向け)</Term>と、ユーザーごとに個別のID/パスワードで認証する<Term>802.1Xによるエンタープライズ方式(企業向け)</Term>があります。PSKは1人が鍵を漏らすと全員のパスワードを変える必要がありますが、802.1Xならその人のアカウントだけを止めれば済みます。
      </p>

      <Analogy label="💡 たとえるなら">
        PSKは「建物の合鍵を全員で共有する」方式で、1人が鍵を無くすと全員分の鍵を交換しなければなりません。802.1Xは「社員証で1人ずつ認証する」方式で、退職者が出てもその人の社員証を無効化するだけで済みます。
      </Analogy>

      <Aside label="つながり">
        AAAサーバーを使ったユーザーごとの認証の仕組みは「セキュリティ」のAAAの節と同じ考え方です。802.1Xのエンタープライズ認証は、実際にはAAAサーバーへの問い合わせとして実装されます。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>同じSSIDでAP間を移動できる</h4>
          <p>複数のAPが同じSSIDを名乗ることで、利用者は切り替えを意識せず移動できます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>台数が増えたら集中管理型</h4>
          <p>WLCで一括管理すれば、1箇所の設定変更を全APに自動配布できます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>WEPは避け、WPA3を優先</h4>
          <p>暗号方式はWEP→WPA→WPA2→WPA3の順に強化されており、新しい方式を選びます。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/network/wireless-lan" />
    </DocsPage>
  );
}
