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
  title: "SDNとネットワークの自動化",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>SDNとネットワークの自動化 ― 機器を1台ずつ触らない運用へ</h1>
        <Lead>
          ここまで見てきた機能の多くは、機器に1台ずつログインしてコマンドを打つ前提でした。ネットワークの規模が大きくなるほど、この前提そのものを見直す動きが出てきます。制御そのものを集約する<Term>SDN</Term>と、作業そのものをコード化する<Term>ネットワークの自動化</Term>を見ていきます。
        </Lead>
      </Hero>

      <Heading num="00">SDN ― コントロールプレーンを集約する</Heading>
      <p>
        ルーターやスイッチの内部は、大きく「どこへ転送するかを決める頭脳」の<Term>コントロールプレーン</Term>と、「決められた通りに実際にパケットを送り出す手足」の<Term>データプレーン</Term>に分けて考えられます。従来のネットワークでは、この両方が機器1台ごとに内蔵されていました。
      </p>

      <DiagramFrame
        slug="network-sdn-control-plane"
        aspect="700 / 420"
        caption="SDN。従来型は各機器が経路計算を行うコントロールプレーンとパケットを転送するデータプレーンの両方を自分の中に持つ。SDNではコントロールプレーンをSDNコントローラに集約し、各機器はOpenFlowなどで指示された通りに転送するデータプレーンだけを担当する。"
      />

      <p>
        <Term>SDN(Software-Defined Networking)</Term>は、この頭脳の部分を各機器から取り出し、<Term>SDNコントローラ</Term>という1箇所に集約する発想です。機器側は<Term>OpenFlow</Term>のようなプロトコルでコントローラから転送ルールを受け取り、データプレーンとして転送に専念します。ネットワーク全体の経路方針を、機器を1台ずつ回らずにコントローラだけで一元的に変更できるようになります。
      </p>

      <Analogy label="💡 たとえるなら">
        従来型は「各店舗の店長がそれぞれ仕入れ判断をするチェーン店」に似ています。SDNは「本部が全店舗の仕入れを一括で決め、各店舗はただ指示通りに品出しするだけ」という体制に近く、方針変更が本部の判断1つで全店に反映されます。
      </Analogy>

      <Heading num="01">ネットワークの自動化 ― 作業そのものをコード化する</Heading>
      <p>
        SDNが機器の内部構造を変える発想だったのに対し、<Term>ネットワークの自動化</Term>は、既存の機器はそのままに、設定作業のやり方を変える発想です。手作業でCLIに1台ずつログインして設定する代わりに、設定内容を<Term>定義ファイル</Term>として書いておき、自動化ツールにまとめて実行させます。
      </p>

      <DiagramFrame
        slug="network-automation-push"
        aspect="720 / 490"
        caption="ネットワーク自動化。手作業では担当者が4台のスイッチに1台ずつ順番にログインして同じコマンドを打つ必要がある。自動化ツールを使うと、担当者は1つの定義ファイルを実行するだけで、ツールが4台へ同時に設定を一括投入する。"
      />

      <p>
        機器を1台ずつ操作する手作業は、台数が増えるほど時間がかかるだけでなく、「1台だけ設定を打ち間違える」「1台だけ変更を忘れる」といったミスも起きやすくなります。定義ファイルに書いた内容を自動化ツールが一括で反映すれば、同じ内容が全台に確実に、かつ短時間で行き渡ります。あわせて、機器から情報を取得・設定する標準化されたインタフェースとして<Term>NETCONF</Term>や<Term>RESTCONF</Term>も使われます。
      </p>

      <Aside label="つながり">
        「ルータの機能とルーティング」から見てきた個々の技術(ACL・VLAN・OSPFなど)は、SDNや自動化のもとでも中身の意味は変わりません。変わるのは「その設定をどこで・どうやって投入するか」という運用の形です。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>SDNは頭脳を1箇所に集約</h4>
          <p>コントロールプレーンをコントローラに寄せ、機器はデータプレーンに専念します。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>自動化は作業のコード化</h4>
          <p>定義ファイルにして自動化ツールに実行させることで、速く確実に反映できます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>変わるのは運用の形</h4>
          <p>個々の技術の中身ではなく、それをどう投入するかという運用のやり方が変わります。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/network/sdn" />
    </DocsPage>
  );
}
