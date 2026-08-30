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
  title: "ライセンス管理",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>ライセンス管理 ― 目に見えない資産を数える</h1>
        <Lead>
          PC やモニターと違い、ソフトウェアの<Term>ライセンス(利用権)</Term>は目に見えません。しかし「何本の利用権を持ち、実際に何台にインストールしているか」がズレると、足りなければ<Term>法令違反</Term>、余っていれば<Term>無駄なコスト</Term>になります。見えない資産を正確に数えるのがライセンス管理です。
        </Lead>
      </Hero>

      <Heading num="01">ライセンスとは「利用する権利」</Heading>
      <p>ソフトウェアを買っても、手に入るのはプログラムの所有権ではなく、決められた条件の範囲で使ってよいという<Term>利用権(ライセンス)</Term>です。この条件は<Term>使用許諾契約(EULA)</Term>で定められ、「何台まで」「何人まで」「何年間」といった制約が付きます。条件を超えて使うと契約違反・著作権侵害となり、ソフトウェアメーカーの<Term>ライセンス監査</Term>で発覚すれば追徴金や賠償のリスクがあります。</p>

      <Heading num="02">ライセンスの主な形態</Heading>
      <p>ライセンスは「何を単位に数えるか」「買い切りか継続課金か」で分類できます。Office や Adobe など、企業でよく使うソフトはこの組み合わせで提供されています。</p>
      <table>
        <thead>
          <tr><th>分類</th><th>数える単位・条件</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">デバイス単位</td><td>インストールする端末ごとに1本</td><td>PCにひも付くライセンス</td></tr>
          <tr><td className="hl">ユーザー単位</td><td>利用する人ごとに1本(複数端末で使える)</td><td>Microsoft 365</td></tr>
          <tr><td className="hl">買い切り(永続)</td><td>一度購入すれば使い続けられる</td><td>Office 2021</td></tr>
          <tr><td className="hl">サブスクリプション</td><td>月額・年額で契約し、やめると使えなくなる</td><td>Adobe Creative Cloud</td></tr>
          <tr><td className="hl">ボリュームライセンス</td><td>企業向けに一括契約し、まとめて数十〜数千本</td><td>企業向け一括契約</td></tr>
          <tr><td className="hl">OEM</td><td>PC本体に付属し、その端末専用</td><td>プリインストールの OS</td></tr>
        </tbody>
      </table>
      <p>近年は買い切りからサブスクリプションへの移行が進み、「使う人が増減するたびに契約数を調整する」運用が中心になっています。</p>

      <Heading num="03">保有数と利用数を突き合わせる</Heading>
      <p>ライセンス管理の核心は、<Term>契約している本数(保有数)</Term>と<Term>実際にインストール・利用している数(消費数)</Term>を突き合わせ、過不足をなくすことです。</p>
      <table>
        <thead>
          <tr><th>状態</th><th>何が起きるか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">利用数 &gt; 保有数(不足)</td><td>ライセンス違反。監査で追徴・賠償のリスク</td></tr>
          <tr><td className="hl">利用数 &lt; 保有数(過剰)</td><td>使っていない分の費用が無駄になる</td></tr>
          <tr><td className="hl">利用数 = 保有数(適正)</td><td>コンプライアンスとコストの両立</td></tr>
        </tbody>
      </table>
      <p>この突合を組織的に行うことを<Term>SAM(Software Asset Management)</Term>と呼びます。退職者のライセンスを回収して新入社員に再割り当てする、使われていないサブスクを解約する、といった調整を続けることで、違反リスクと無駄コストの両方を抑えられます。資産台帳のインストール情報と契約情報を紐づけて管理するのが基本形です。</p>

      <Analogy label="💡 たとえるなら">
        ライセンスは<strong>映画館の座席指定券</strong>のようなものです。50人分のチケットしか買っていないのに60人を入れれば契約違反(不足)、逆に80人分買って50人しか入れなければ払いすぎ(過剰)。情シスは「今日は何枚のチケットを持っていて、何人が実際に座っているか」を常に照合し、席とチケットの数を合わせ続けます。
      </Analogy>

      <Aside label="豆知識">
        ライセンス違反は悪意がなくても起こります。「便利だから」と社員が勝手にインストールしたソフト、退職者のPCに残ったまま再割り当てされていないライセンス──こうした<strong>シャドーIT</strong>が積み重なると、監査時に想定外の不足が発覚します。MDM や資産管理ツールで「どのPCに何のソフトが入っているか」を自動収集しておくことが、正確な突合の前提になります。
      </Aside>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>買うのは「権利」であって「モノ」ではない</h4>
          <p>台数・人数・期間といった使用許諾の条件を超えると、著作権侵害になります。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>形態を理解して数える</h4>
          <p>デバイス/ユーザー単位、買い切り/サブスクなど、何を単位に数えるかを把握します。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>保有数と利用数を合わせ続ける</h4>
          <p>不足は違反、過剰は無駄。SAM として突合と再割り当てを回すのがライセンス管理です。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/client/asset" tag="コンピュータ">資産管理 ― 台帳・在庫・棚卸</RelatedLink>
                    <RelatedLink href="/dev/sdlc/management/ip" tag="開発工程">知的財産とライセンス</RelatedLink>
                    <RelatedLink href="/ops/cost" tag="サービス運営">コスト管理</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
