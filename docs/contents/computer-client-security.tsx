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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "端末セキュリティ管理",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>端末セキュリティ管理 ― 端末を守りの最前線にする</h1>
        <Lead>
          従業員の端末は、社外に持ち出され、社内ネットワークにもつながる「守りの最前線」です。紛失・盗難、マルウェア感染、内部からの情報持ち出し──端末をめぐる脅威に、<Term>BitLocker・MDM・ウイルス対策・USB制御</Term>という複数の対策を重ねて備えます。1つで守り切るのではなく、層を重ねる<Term>多層防御</Term>が基本です。
        </Lead>
      </Hero>

      <Heading num="01">BitLocker ― 紛失・盗難に備えるディスク暗号化</Heading>
      <p>ノートPCは持ち出される分、紛失・盗難のリスクが常につきまといます。端末そのものが第三者の手に渡っても、中のデータを読み取られなければ被害は最小限で済みます。<Term>BitLocker</Term>は Windows 標準のディスク<Term>暗号化</Term>機能で、ディスクの中身を丸ごと暗号化しておくことで、正規のログイン情報(または<Term>回復キー</Term>)なしにはデータを読み出せないようにします。回復キーは情シスが一元管理し、いざというとき復旧できるようにしておきます。</p>

      <Heading num="02">MDM ― 遠隔から状態を把握・制御する</Heading>
      <p><Term>MDM(Mobile Device Management)</Term>は、稼働中の端末の状態(OS バージョン、インストール済みソフト、セキュリティ設定など)を継続的に収集し、遠隔から制御する仕組みです。元はスマートフォン管理の言葉ですが、いまはPCも含めて統合管理する製品が主流です。次のような操作を一元的に行えます。</p>
      <table>
        <thead>
          <tr><th>機能</th><th>できること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">構成プロファイル配布</td><td>Wi-Fi・証明書・パスワードポリシーを一括適用</td></tr>
          <tr><td className="hl">アプリ配布・更新</td><td>業務アプリを全台へ一斉インストール・更新</td></tr>
          <tr><td className="hl">リモートロック</td><td>紛失時に遠隔で画面をロックし操作不能にする</td></tr>
          <tr><td className="hl">リモートワイプ</td><td>遠隔でデータを消去し、情報漏えいを防ぐ</td></tr>
          <tr><td className="hl">インベントリ収集</td><td>各端末の構成情報を自動で台帳に反映</td></tr>
        </tbody>
      </table>
      <p>MDM は端末セキュリティの<Term>司令塔</Term>であり、暗号化の強制・ウイルス対策の導入確認・USB制御といった他の対策も、MDM のポリシーとして配信することが多くなっています。</p>

      <Heading num="03">ウイルス対策 ― 侵入と実行を止める</Heading>
      <p>マルウェアの侵入・実行を防ぐのが<Term>ウイルス対策(アンチマルウェア)</Term>です。従来は既知のパターンと照合して検知する<Term>EPP(Endpoint Protection Platform)</Term>が中心でしたが、パターンに載らない未知の攻撃も増えたため、近年は端末の<Term>振る舞い</Term>を監視して不審な動きを検知・追跡する<Term>EDR(Endpoint Detection and Response)</Term>を組み合わせます。「入れない」EPP と「入られた後に気づいて封じ込める」EDR は、役割の違う二段構えです。</p>

      <Heading num="04">USB制御 ― 出口と入口をふさぐ</Heading>
      <p>USB メモリは、<Term>情報を勝手に持ち出す出口</Term>にも、<Term>マルウェアを持ち込む入口</Term>にもなります。<Term>USB制御(デバイス制御)</Term>は、USB ストレージの利用を禁止したり、許可した機器だけに限定したり、書き込みだけを禁じたりする対策です。これも MDM のポリシーとして全台へ配信するのが一般的です。</p>

      <Diagram caption="端末を中心に、脅威の種類ごとに対策を重ねる多層防御">
        <svg viewBox="0 0 620 170" xmlns="http://www.w3.org/2000/svg">
          <rect x={250} y={65} width={120} height={44} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={310} y={90} fill="#f2f2f2" fontSize="12" textAnchor="middle">従業員の端末</text>

          {[
            { x: 20, y: 20, label: "紛失・盗難", def: "→ BitLocker" },
            { x: 20, y: 110, label: "遠隔管理", def: "→ MDM" },
            { x: 430, y: 20, label: "マルウェア", def: "→ EPP / EDR" },
            { x: 430, y: 110, label: "持出し・持込み", def: "→ USB制御" },
          ].map((n) => (
            <g key={n.label}>
              <rect x={n.x} y={n.y} width={170} height={40} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" strokeDasharray="4 3" />
              <text x={n.x + 85} y={n.y + 18} fill="#9a9a9a" fontSize="11" textAnchor="middle">{n.label}</text>
              <text x={n.x + 85} y={n.y + 33} fill="#f2f2f2" fontSize="11" textAnchor="middle">{n.def}</text>
            </g>
          ))}
        </svg>
      </Diagram>

      <Analogy label="💡 たとえるなら">
        端末セキュリティは<strong>1軒の家の防犯</strong>に似ています。<strong>BitLocker</strong>は金庫(盗まれても中身は開けられない)、<strong>MDM</strong>は家全体を見張る管理室(遠隔で施錠もできる)、<strong>ウイルス対策</strong>は玄関の鍵と侵入センサー、<strong>USB制御</strong>は勝手口の出入り管理。どれか1つでは守り切れず、組み合わせてはじめて安心できます。
      </Analogy>

      <Aside label="豆知識">
        近年は「社内ネットワークの中なら安全」という前提を捨て、すべてのアクセスを毎回検証する<strong>ゼロトラスト</strong>の考え方が広がっています。その前提となるのが「端末が管理下にあり、暗号化され、最新で、マルウェアに感染していない」ことの証明であり、まさに MDM が把握する情報です。端末管理はゼロトラスト時代のセキュリティの土台になっています。
      </Aside>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>脅威ごとに対策を重ねる</h4>
          <p>紛失には暗号化、遠隔管理には MDM、マルウェアにはウイルス対策、持出しには USB制御。多層で守ります。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>MDM が司令塔になる</h4>
          <p>暗号化の強制もウイルス対策の確認も USB制御も、MDM のポリシーとして全台へ配信します。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>端末は守りの最前線</h4>
          <p>管理された端末であること自体が、ゼロトラスト時代のセキュリティの前提になります。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/basics" tag="セキュリティ">情報セキュリティの目的と脅威</RelatedLink>
                    <RelatedLink href="/security/management" tag="セキュリティ">リスクマネジメント</RelatedLink>
                    <RelatedLink href="/computer/client/maintenance" tag="コンピュータ">更新管理と保守・故障対応</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
