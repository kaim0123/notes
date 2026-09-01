import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "Cloud DNS" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>Cloud DNS ― 外向きと、内向きを分ける</h1>
        <Lead>
          名前解決の仕組みそのものは<Link href="/network/nat-dhcp-dns">DNS</Link>のとおりです。クラウドで管理する場合に特徴的なのは、<Term>誰から引けるか</Term>でゾーンを分けられることです。インターネットの誰からでも引ける定義と、自分のネットワークの内側からしか引けない定義を、別のものとして持てます。この分離が、<strong>内部の構成を外へ晒さない</strong>ための素直な手段になります。
        </Lead>
      </Hero>

      <Heading num="01">2種類のゾーン</Heading>

      <DiagramFrame
        slug="infra-gcp-dns-zones"
        aspect="700 / 260"
        caption="名前解決の設定を2種類のゾーンに分けて持つ図。公開ゾーンはインターネットの誰からでも引ける定義でサービスの入口を指し、限定公開ゾーンは自分のネットワークの内側からしか引けない定義で内部のサーバーやデータベースに名前を与える。同じドメイン名で外からは公開の宛先、内からは内部の宛先を返す形にもできる。内部の名前を公開ゾーンに書かないことが基本になる。"
      />

      <p>
        内部向けの名前を公開ゾーンに書くと、<strong>構成が外から読めます</strong> ― どんなサーバーがあり、どんな役割の名前を使っているか。攻撃の下調べに使える情報なので、内向きの定義は内向きのゾーンに置きます。
      </p>

      <Heading num="02">名前で参照するという設計</Heading>
      <p>
        内部のサービスをアドレスではなく名前で参照する形にしておくと、<strong>移設や入れ替えのときにアプリを変えずに済みます</strong>。接続先を設定として外に出すという<Link href="/dev/dotenv">原則</Link>の、さらに一段外側の話です。
      </p>
      <p>
        注意点は保持時間で、<strong>切り替えを想定する名前は短く設定しておきます</strong>。長い保持時間のまま切り替えると、古い宛先を掴んだままの利用者が残ります(<Link href="/infra/aws-route53">同じ注意</Link>がここにもあります)。
      </p>

      <Aside label="ドメインの期限も監視の対象">
        名前解決の設定が正しくても、ドメインそのものが失効すればすべて止まります。証明書と並んで<strong>必ず起きると分かっている障害</strong>なので、自動更新と支払い方法の有効性まで含めて確認しておきます(<Link href="/infra/monitoring">監視と障害対応</Link>)。
      </Aside>

      <Heading num="まとめ">引ける相手で分ける</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>内向きは内向きのゾーンへ</h4><p>公開ゾーンに書くと、構成が外から読める。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>名前で参照する</h4><p>アドレスを直接書かなければ、移設や入れ替えでアプリを触らずに済む。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>切り替える名前は保持時間を短く</h4><p>長いままだと、切り替えても古い宛先が使われ続ける。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-dns" />
    </DocsPage>
  );
}
