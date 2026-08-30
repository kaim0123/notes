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
  title: "セキュリティ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>セキュリティ ― 機器そのものと、誰が何をできるかを守る</h1>
        <Lead>
          ここまでの章では「正しく通信をつなぐ」方法を見てきましたが、ネットワーク機器自体が乗っ取られたり、不正な機器が紛れ込んだりすれば、その土台が崩れてしまいます。機器へのアクセスの守り方、スイッチレベルの防御、そして「誰が何をできるか」を管理する<Term>AAA</Term>を見ていきます。
        </Lead>
      </Hero>

      <Heading num="00">ネットワークデバイスの保護</Heading>
      <p>
        ルーターやスイッチの管理画面(CLI)に誰でもログインできてしまうと、設定を書き換えられて重大な被害につながります。基本的な対策は次の通りです。
      </p>
      <ul>
        <li>
          <Term>Telnetではなく SSH</Term>を使う ― Telnetは通信内容(パスワードを含む)が平文で流れるため、経路上で盗聴されると筒抜けになる
        </li>
        <li>
          パスワードは<Term>暗号化して保存</Term>する ― 設定ファイルをそのまま見られても、平文のパスワードが読み取れないようにする
        </li>
        <li>
          <Term>特権レベル</Term>を分ける ― 参照だけできる権限と、設定を変更できる権限を分離し、必要以上の操作をさせない
        </li>
      </ul>

      <Heading num="01">スイッチのセキュリティ機能</Heading>
      <p>
        アクセス層のスイッチは、外部から物理的に一番手を出しやすい場所でもあります。<Term>ポートセキュリティ</Term>は、各ポートに接続してよい機器のMACアドレスを制限する機能です。
      </p>

      <DiagramFrame
        slug="network-port-security"
        aspect="700 / 380"
        caption="ポートセキュリティ。スイッチポートGi0/1には許可するMACアドレスAA:AA:AA:AA:AA:AAが登録されている。そのMACを持つ正規のPCが接続すると一致して通信が許可されるが、別のMACを持つ不正な機器が接続すると不一致となり違反が検知されてポートがシャットダウンされる。"
      />

      <p>
        登録されていないMACアドレスの機器が接続すると<Term>違反(violation)</Term>とみなされ、設定に応じてポートを止める(shutdown)、その機器の通信だけ止める(restrict)などの対応が取られます。このほか、代表的なスイッチのセキュリティ機能には次のようなものがあります。
      </p>
      <table>
        <tbody>
          <tr>
            <th>機能</th>
            <th>内容</th>
          </tr>
          <tr>
            <td className="hl">DHCP Snooping</td>
            <td>信頼できないポートからの不正なDHCPサーバー応答を遮断する</td>
          </tr>
          <tr>
            <td className="hl">Dynamic ARP Inspection</td>
            <td>DHCP Snoopingの情報をもとに、なりすましのARP応答を検知・遮断する</td>
          </tr>
        </tbody>
      </table>

      <Heading num="02">AAA ― 誰が・何を・したかを管理する</Heading>
      <p>
        <Term>AAA(Authentication, Authorization, Accounting)</Term>は、「誰か」「何をしてよいか」「実際に何をしたか」を一元管理する枠組みです。機器単体でユーザーを管理するのではなく、専用の<Term>AAAサーバー</Term>(RADIUSやTACACS+)に問い合わせる形にすることで、多数の機器のアカウントを一箇所で管理できます。
      </p>

      <DiagramFrame
        slug="network-aaa-flow"
        aspect="640 / 420"
        caption="AAA。ネットワーク機器がAAAサーバーに対して、まず認証(あなたは誰か)、次に認可(何をしてよいか)、最後にアカウンティング(何をしたかの記録)という3段階のやり取りを行う。"
      />

      <table>
        <tbody>
          <tr>
            <th>要素</th>
            <th>内容</th>
          </tr>
          <tr>
            <td className="hl">Authentication(認証)</td>
            <td>ID/パスワードなどで「あなたは誰か」を確認する</td>
          </tr>
          <tr>
            <td className="hl">Authorization(認可)</td>
            <td>確認できた相手に「何をしてよいか」の権限を割り当てる</td>
          </tr>
          <tr>
            <td className="hl">Accounting(アカウンティング)</td>
            <td>実際に何をしたかを記録し、あとから監査できるようにする</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        AAAは、セキュリティが厳しいビルの入館管理に似ています。受付で身分証を確認し(認証)、入館証に応じて入れる階を制限し(認可)、いつ誰がどの部屋に入ったかを記録に残す(アカウンティング)、という3つの役割がそれぞれ独立しています。
      </Analogy>

      <Aside label="つながり">
        AAAサーバーへの通信そのものを暗号化して守る話は、「NAT・DHCP・DNS」で見た仕組みとは別に、拠点間なら「ネットワークアーキテクチャ」で見たVPNと組み合わせて使われることもあります。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>SSHと権限分離が基本</h4>
          <p>平文のTelnetを避け、参照権限と設定変更権限を分けて必要以上の操作をさせません。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>ポートセキュリティで物理層を守る</h4>
          <p>許可したMACアドレス以外の接続を検知し、ポートを止めるなどの対応を取ります。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>AAAは認証・認可・記録の3点セット</h4>
          <p>誰かを確認し、権限を割り当て、行動を記録するという3つの役割で管理します。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/network/security" />
    </DocsPage>
  );
}
