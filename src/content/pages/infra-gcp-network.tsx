import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "ネットワーキングとコンテンツ配信" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>ネットワーキング ― 境界が広い、ということ</h1>
        <Lead>
          <Link href="/infra/gcp">Google Cloud</Link>の構造上の特徴が最も出るのがこの分野です。ネットワークの区画が<Term>リージョンをまたいで1つ</Term>であり、入口も<Term>世界で1つのアドレス</Term>にできます。設定は減りますが、<strong>意図せず広くつながる</strong>という裏返しもあります。境界が広いぶん、通す相手を明示的に絞る作業の重みが増えます。
        </Lead>
      </Hero>

      <Heading num="01">1つのネットワーク、リージョンごとの区画</Heading>
      <p>
        ネットワークはグローバルな1つで、その中に<strong>リージョンごとのサブネット</strong>が並びます。だからリージョンをまたぐ通信も内側の話として扱え、追加の接続設定は要りません。一方、<strong>広い範囲に何を通すか</strong>は自分で決める必要があり、既定のまま使うと想定より広い範囲がつながります。
      </p>
      <p>
        通信の制御は、対象を<strong>ラベルやサービスアカウントで指定できる</strong>のが便利な点です。「この役割のマシンから、この役割のマシンへ」と書けるので、アドレスの範囲で書くより意図が読み取れます(<Link href="/security/network-defense">ネットワーク層の防御</Link>)。
      </p>

      <Heading num="02">世界で1つのアドレス</Heading>

      <DiagramFrame
        slug="infra-gcp-network-lb"
        aspect="700 / 300"
        caption="1つのアドレスで世界中からの通信を受け、最も近い拠点へ届ける仕組み。利用者はどこにいても同じアドレスへ接続するが、経路の仕組みで最寄りの拠点に着き、そこから最も近い健全なサービスへ転送される。ある地域のサービスが落ちていれば別の地域へ回される。地域ごとに別のアドレスを配る方式と違い、名前解決の保持時間に左右されないので切り替わりが速い。"
      />

      <p>
        この形の利点は<strong>切り替わりの速さ</strong>です。名前解決の答えを変えて切り替える方式では、保持時間の分だけ古い宛先が使われ続けます(<Link href="/infra/aws-route53">Route 53</Link>)。入口が1つなら、その内側で振り分けを変えるだけで済みます。
      </p>

      <Heading num="03">外へ出る経路と、内で完結する経路</Heading>
      <p>
        非公開のマシンから外部へ通信するには、変換の出口が要ります。ここで見落とされやすいのが<strong>クラウド事業者のサービスへの通信</strong>で、保存先やデータベースへの接続が外部経由になっていると、余計な転送料と遅延がかかります。
      </p>
      <p>
        内側の経路で到達できる設定にしておくと、<strong>費用も遅延も下がり、外向きの経路を開けずに済みます</strong>。「非公開のはずのマシンが、実は外向きの通信をしていた」という状態を減らせるので、セキュリティの面でも効きます。
      </p>

      <Aside label="広い境界は、設計で狭める">
        グローバルなネットワークは便利ですが、<strong>既定で広くつながる</strong>ということでもあります。プロジェクトを分ける、サブネットを用途で分ける、通信の許可をラベルで書く ― 境界を自分で作る作業は、AWSより意識的に行う必要があります。
      </Aside>

      <Heading num="まとめ">広さを、利点にも弱点にもする</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ネットワークは1つ</h4><p>リージョンをまたぐ通信が内側の話になる。そのぶん、通す相手は明示する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>入口も1つにできる</h4><p>名前解決に頼らないので、切り替わりが速い。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>内側の経路を使う</h4><p>事業者のサービスへは内側から。費用も遅延も安全性も同時に改善する。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-network" />
    </DocsPage>
  );
}
