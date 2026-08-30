import type { Metadata } from "next";
import Link from "next/link";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DocsFooter,
  Analogy,
  Aside,
  Diagram,
  Card,
  CardGrid,
  CardNumber,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "PE・LBO・MBOの仕組み",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>会計・財務</Eyebrow>
        <h1>PE・LBO・MBOの仕組み ― レバレッジで儲ける</h1>
        <Lead>
          <Term>プライベートエクイティ（PE）</Term>とは、機関投資家（生保・年金・ソブリンファンド）の資金を預かり、会社の株を<Term>安く買って高く売る</Term>ことでキャピタルゲインを狙う投資です。その武器が、借入を使って自己資金を何倍にも効かせる<Term>レバレッジ</Term>。ニュースで見る「MBO」「非公開化」「ファンドによる買収」の裏側の仕組みを、数字で解きほぐします。
        </Lead>
      </Hero>

      <Heading num="01">アクティビストとの違い ― どこまで関わるか</Heading>
      <p>同じ「物言う投資家」でも、株式の一部を持って発言するアクティビストと、会社を丸ごと買って経営に入るPEでは、関与の深さがまったく違います。</p>
      <table>
        <thead>
          <tr><th>観点</th><th>アクティビスト</th><th>PE</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">投資規模</td><td>発行済株式の5〜10%（マイノリティ）</td><td>支配権取得（100%買収）</td></tr>
          <tr><td className="hl">関与度</td><td>発言権の行使</td><td>経営そのものに参画</td></tr>
          <tr><td className="hl">エグジット</td><td>市場で少しずつ売却（容易）</td><td>会社丸ごと売却 or 再上場（大掛かり）</td></tr>
        </tbody>
      </table>

      <Heading num="02">MBOとLBO ― 「誰が」買うか、「どう」買うか</Heading>
      <p>混同されがちですが、着目点が違うだけで実務ではセットで使われます。</p>
      <table>
        <thead>
          <tr><th>用語</th><th>着目点</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">MBO（Management Buyout）</td><td>誰が買うか</td><td>経営陣が自社を買い取る</td></tr>
          <tr><td className="hl">LBO（Leveraged Buyout）</td><td>どうやって買うか</td><td>買収対象の資産・CFを担保に、銀行から巨額を借り入れる</td></tr>
        </tbody>
      </table>
      <p>典型フロー（500億円の買収）は次のとおり。PE＋経営陣が①ペーパーカンパニー（SPV）を設立 → ②自己資本20%（100億）＋<Term>銀行借入80%（400億）</Term> → ③TOBで上場株を100%取得し非公開化 → ④事業会社と合併し、その事業が生むCFで借入を返済していきます。</p>
      <Diagram caption="LBOの資本構成 ― 自己資本はわずか2割。残り8割は買収先の資産・CFを担保にした借入">
        <svg viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg">
          <text x={300} y={24} fill="#9a9a9a" fontSize="11" textAnchor="middle">買収金額 500億円</text>
          <rect x={80} y={40} width={88} height={60} rx="6" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={124} y={66} fill="#f2f2f2" fontSize="12" textAnchor="middle">自己資本</text>
          <text x={124} y={84} fill="#9a9a9a" fontSize="11" textAnchor="middle">100億(20%)</text>

          <rect x={168} y={40} width={352} height={60} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={344} y={66} fill="#f2f2f2" fontSize="12" textAnchor="middle">銀行借入</text>
          <text x={344} y={84} fill="#9a9a9a" fontSize="11" textAnchor="middle">400億(80%) ← 買収先のCFで返済</text>

          <text x={300} y={130} fill="#9a9a9a" fontSize="10" textAnchor="middle">改革で価値を上げ、借入を返しながら5年後に高く売る（or 再上場）</text>
        </svg>
      </Diagram>

      <Heading num="03">儲けの本質 ― レバレッジの数値例</Heading>
      <p>合言葉は<Term>「安く借りた金を使い、安く買い、改革して価値を上げ、高く売る」</Term>。数字で見ると、自己資金がどう膨らむかが一目瞭然です。</p>
      <table>
        <thead>
          <tr><th>項目</th><th>投資時</th><th>5年後</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">営業利益率</td><td>5%</td><td>リストラで10%へ</td></tr>
          <tr><td className="hl">事業価値（EV/EBITDA×8倍）</td><td>800億円</td><td>1,200億円（年8.4%成長）</td></tr>
          <tr><td className="hl">借入残高</td><td>640億円</td><td>320億円（返済済）</td></tr>
          <tr><td className="hl">エクイティ持分</td><td>160億円</td><td>880億円</td></tr>
          <tr><td className="hl">IRR</td><td>—</td><td>約40%／年</td></tr>
        </tbody>
      </table>
      <p>売上成長はわずか年1.9%でも、<Term>利益率改善</Term>と<Term>レバレッジ（借入返済でエクイティが厚くなる）</Term>の合わせ技で、自己出資160億円が880億円になります。これは<Link href="/finance/metrics">ROA・ROE</Link>で見た「自己資本を薄くし借入を使うと資本効率が上がる」議論と本質的に同じ構造です。</p>
      <Aside label="📎">
        PEの報酬は、管理報酬（預かり資産の約2%／年）＋<Term>キャリー（利益の約20%）</Term>。ファンドが儲かれば運用者も「気分が悪くなるほど儲かる」仕組みになっています。だからこそ高い利益率を狙って強いプレッシャーで改革を進めます。
      </Aside>

      <Heading num="04">日本が狙われる理由と「衣食住」</Heading>
      <p>世界的に金利上昇・買い手過多で儲けにくくなるなか、<Term>極端な低金利＝日本</Term>にPE資金が集中しています。借入コストが安いほどレバレッジが効くからです。</p>
      <p>PEが好むのは<Term>キャッシュが安定的に出る＋改善余地がある</Term>事業。典型は外食など<Term>衣食住</Term>です（毎日現金が入り、銀行も喜んで貸す）。逆に避けるのは、価格競争に晒されるコモディティや構造的な赤字事業です。</p>
      <Aside label="📎">
        <Term>キオクシア（旧・東芝メモリ）</Term>は例外的な大成功例。本来メモリはサイクル変動が激しくPE対象外ですが、①国策②AIによるスーパーサイクルが重なり、再上場後は時価総額約13兆円規模へ。教科書どおりでない「例外」も市場では起こります。
      </Aside>

      <Heading num="05">光と影 ― レバレッジは諸刃の剣</Heading>
      <p>レバレッジは利益を増幅しますが、<Term>金利が上がればすべてが逆回転</Term>します。借入が重石になり、必要な投資すらできなくなる失敗も珍しくありません。</p>
      <p>失敗例が<Term>マクロミル</Term>。再上場時に長期借入368億円（売上350億超）を背負い「BSが汚れる」状態に。借入負担で必要投資ができず、再び非公開化しました。構造的リスクは他にもあります ― 身の丈を超える借入、経営者が全株を現金化してやる気が下がる、PE撤退後の孤独。「MBOブームに軽い気持ちで乗るな」という戒めがついて回ります。</p>
      <Analogy label="💡 たとえるなら">
        LBOは「頭金2割・ローン8割で買った投資用マンション」に似ています。家賃（事業CF）でローンを返し、価値が上がったところで売れば、頭金は何倍にもなります。しかし空室（業績悪化）や金利上昇が来れば、ローンだけが重くのしかかる。レバレッジは追い風では強力、向かい風では致命的 ― この非対称性が本質です。
      </Analogy>

      <Heading num="まとめ">PE・LBO・MBOの要点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>安く買って高く売る</h4><p>PEは支配権を取り経営に参画し、キャピタルゲインを狙います。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>MBO×LBO</h4><p>誰が買うか（経営陣）と、どう買うか（借入）をセットで使います。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>レバレッジ</h4><p>利益率改善＋借入返済で、自己資金が数倍に膨らみます。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>諸刃の剣</h4><p>金利上昇で逆回転。過大な借入は投資も自由も奪います。</p></Card>
      </CardGrid>
      <p>PEの儲けの構造は、<Link href="/finance/thinking">ファイナンス思考</Link>（キャッシュと資本効率で決める）の応用そのものです。会社を「読む」第1章から「決める」この第5章まで、財務・会計の視点は一本の線でつながっています。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/finance/thinking" tag="会計・財務">会計 vs ファイナンス</RelatedLink>
                    <RelatedLink href="/finance/metrics" tag="会計・財務">収益性と効率の指標（ROA・CCC）</RelatedLink>
                    <RelatedLink href="/finance/valuation" tag="会計・財務">企業価値と株価（PBR）</RelatedLink>
                    <RelatedLink href="/finance/cash" tag="会計・財務">現金がすべて ― 黒字倒産と負債</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
