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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "貸借対照表（BS）の読み方",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>会計・財務</Eyebrow>
        <h1>貸借対照表（BS）の読み方 ― 右から読む・縦縦横横</h1>
        <Lead>
          <Term>貸借対照表（BS）</Term>は、期末時点で「どこからいくら調達し、それを何に使っているか」を示す財産目録です。左右の合計が必ず一致するので<Term>バランスシート</Term>と呼ばれます。読み方の鉄則はただ2つ ― <Term>右から読む</Term>ことと、<Term>豚の貯金箱を縦・縦・横・横の順に見る</Term>こと。この2つで、数字の羅列が「会社の性格」に変わります。
        </Lead>
      </Hero>

      <Heading num="01">基本構造 ― 右から読む</Heading>
      <p>BSの読み方の鉄則は<Term>右から読む</Term>こと。右がお金の<Term>調達源</Term>（どこから来たか）、左がその<Term>運用先</Term>（何に使っているか）です。同じ金額が「調達 → 運用」と姿を変えているだけなので、左右は必ず一致します。</p>
      <table>
        <thead>
          <tr><th>位置</th><th>区分</th><th>別名</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">右・上</td><td>負債</td><td>他人資本</td><td>主に借入。<strong>返済義務あり</strong></td></tr>
          <tr><td className="hl">右・下</td><td>純資産</td><td>自己資本</td><td>資本金＋利益剰余金。<strong>返済義務なし</strong></td></tr>
          <tr><td className="hl">左</td><td>資産</td><td>―</td><td>調達したお金の運用先（現金が形を変えたもの）</td></tr>
        </tbody>
      </table>
      <Diagram caption="右で調達し（負債・純資産）、左で運用する（資産）。左右は必ず一致する">
        <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg">
          <rect x={60} y={30} width={180} height={150} rx="4" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={150} y={22} fill="#f2f2f2" fontSize="11" textAnchor="middle">左：資産（運用先）</text>
          <text x={150} y={110} fill="#9a9a9a" fontSize="11" textAnchor="middle">現金・売掛金・在庫</text>
          <text x={150} y={128} fill="#9a9a9a" fontSize="11" textAnchor="middle">建物・土地 など</text>

          <rect x={280} y={30} width={180} height={70} rx="4" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={370} y={22} fill="#f2f2f2" fontSize="11" textAnchor="middle">右上：負債（他人資本）</text>
          <text x={370} y={70} fill="#9a9a9a" fontSize="11" textAnchor="middle">借入・買掛金（要返済）</text>

          <rect x={280} y={110} width={180} height={70} rx="4" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={370} y={102} fill="#f2f2f2" fontSize="11" textAnchor="middle">右下：純資産（自己資本）</text>
          <text x={370} y={150} fill="#9a9a9a" fontSize="11" textAnchor="middle">資本金＋利益剰余金</text>
        </svg>
      </Diagram>
      <p>BSは決算日時点の<Term>スナップショット</Term>（12月決算なら12/31時点）です。健全性の代表指標が<Term>自己資本比率＝純資産 ÷ 総資産</Term>。財務の世界では<Term>30%前後</Term>が安全の目安、国内平均はおよそ40%、<Term>50%超で「優良」</Term>とされます。</p>

      <Heading num="02">負債と純資産 ― 名前は違えど、負債は実質すべて借入金</Heading>
      <p>負債は科目名こそ違いますが、実態は「誰かがお金を待ってくれている＝借入」です。純資産は返済不要の自前のお金です。</p>
      <table>
        <thead>
          <tr><th>科目</th><th>実態</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">長期借入金</td><td>銀行からの借入</td></tr>
          <tr><td className="hl">買掛金</td><td>仕入先からの借入（翌月払いなら決算日時点で未払い）</td></tr>
          <tr><td className="hl">未払金</td><td>カード会社・社員からの借入（給与翌月払い＝社員が1ヶ月待ってくれている）</td></tr>
          <tr><td className="hl">役員借入金</td><td>役員が会社に貸したお金（返済義務あり。資本金とは別物）</td></tr>
          <tr><td className="hl">資本金（純資産）</td><td>設立時に社長が入れたお金（返済義務なし）</td></tr>
          <tr><td className="hl">利益剰余金（純資産）</td><td>設立以来の利益の累計（1年分ではなく累積。返済義務なし）</td></tr>
        </tbody>
      </table>

      <Heading num="03">資産 ― 現金が形を変えたもの</Heading>
      <p>左側の資産は、調達したお金が現金・売掛金・在庫・建物などに姿を変えたものです。総資産1億円の会社の運用内訳の例を見てみましょう。ここで、財務（投資家）と経営者では読み方が大きく分かれます。</p>
      <table>
        <thead>
          <tr><th>資産</th><th>金額</th><th>資金繰りへの影響（経営者の見方）</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">現金預金</td><td>1,000万</td><td><strong>これだけを最大化する</strong></td></tr>
          <tr><td className="hl">売掛金</td><td>2,500万</td><td>客への一時的な貸付。回収を早める</td></tr>
          <tr><td className="hl">貸付金</td><td>500万</td><td>個人・関係者への貸付。減らす</td></tr>
          <tr><td className="hl">商品（在庫）</td><td>2,000万</td><td>売れるまで経費にならない。圧縮する</td></tr>
          <tr><td className="hl">建物・車両</td><td>1,800万</td><td>固定資産。減価償却で徐々に経費化</td></tr>
          <tr><td className="hl">土地</td><td>2,000万</td><td><strong>1円も経費にならない</strong></td></tr>
          <tr><td className="hl">敷金</td><td>200万</td><td>経費にならない。交渉で減らせる</td></tr>
        </tbody>
      </table>
      <Analogy label="💡 視点の分岐点">
        財務（投資家）は「純資産が厚い＝安全」と見ます。一方、経営者の視点では「<Term>事業では現金以外の資産は資金繰りを悪化させる負の資産</Term>」と見る。この会社の実際の現金はたった1,000万 ― 純資産が3,000万あっても、現金とはイコールではありません。この違和感が、<Link href="/finance/cash">現金がすべて ― 黒字倒産と負債</Link>の核心につながります。
      </Analogy>

      <Heading num="04">豚の貯金箱を「縦・縦・横・横」で読む</Heading>
      <p>BSを<Term>豚の貯金箱</Term>に見立て、<Term>縦・縦・横・横（右→左→下→上）</Term>の順に4か所を見ると、翌日も芋づる式に思い出せます（風船会計メソッド）。まず各部位の名前を対応させます。</p>
      <table>
        <thead>
          <tr><th>部位</th><th>会計用語</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">胴体・上半身</td><td>流動資産</td><td>現金化しやすい（現金・売掛金・在庫など）</td></tr>
          <tr><td className="hl">胴体・下半身</td><td>固定資産</td><td>建物・機械など、すぐ現金にならない</td></tr>
          <tr><td className="hl">右・上</td><td>負債</td><td>返さなければならない借金</td></tr>
          <tr><td className="hl">右・下</td><td>純資産</td><td>積み上げた利益＋株主出資（返済不要）</td></tr>
        </tbody>
      </table>
      <p>そのうえで、次の4ステップで見ます。</p>
      <table>
        <thead>
          <tr><th>STEP</th><th>見る場所</th><th>問い</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1（縦①）</td><td>右・純資産比率</td><td>何%を自分たちの努力で積み上げたか？（平均40%、50%超で優良）</td></tr>
          <tr><td className="hl">2（縦②）</td><td>左・流動 vs 固定</td><td>上半身ぶり？下半身ぶり？寸胴？（業種で普通の形が違う）</td></tr>
          <tr><td className="hl">3（横①）</td><td>固定資産 vs 純資産</td><td>社長のイケイケ度は？（純資産で固定資産を賄えていれば安全）</td></tr>
          <tr><td className="hl">4（横②）</td><td>流動性チェック（3段階）</td><td>1年以内の支払いに耐えられるか？</td></tr>
        </tbody>
      </table>

      <Heading num="05">横②：流動性は3段階で厳しくしていく</Heading>
      <p><Term>流動負債</Term>＝1年以内に返すお金。それを賄えるかを、甘い順に3段階で見ていきます。ステップ1は通っても、ステップ3で「現金だけでは足りない＝回りにくい体質」が露呈することがあります。<Term>最も大事なのは現金</Term>です。</p>
      <table>
        <thead>
          <tr><th>ステップ</th><th>比較</th><th>厳しさ</th><th>除外するもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1</td><td>流動資産 vs 流動負債</td><td>甘い</td><td>なし</td></tr>
          <tr><td className="hl">2</td><td>当座資産 vs 流動負債</td><td>中</td><td>在庫（1年内に売れるか不明）を除外</td></tr>
          <tr><td className="hl">3</td><td>現金のみ vs 流動負債</td><td>最厳</td><td>売掛金なども除外し、手元現金だけで見る</td></tr>
        </tbody>
      </table>
      <Aside label="📎">
        キャッシュを食う「お化け」＝売掛金・受取手形（居酒屋のツケ客）・在庫。数字上は「将来もらえる／売れる」でも、現金化しなければ豚はガリガリに痩せます。逆に支払を後ろにずらす買掛金・支払手形は現金を残す「ラッキーアイテム」。必要な現金の目安は <strong>運転資金＝（売掛＋在庫）−買掛</strong> の1.5倍程度です。
      </Aside>

      <Heading num="06">A社 vs B社 ― 同じ総資産でも中身はまるで違う</Heading>
      <p>同じ10年・同じ総資産1,200万のカフェでも、割って中身を見ると別の会社です。良し悪しではなく「投資・経営スタイルの違い」が見えるのがBS分析の面白さです。</p>
      <table>
        <thead>
          <tr><th>分析</th><th>A社</th><th>B社</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">縦① 純資産比率</td><td>10%（120万）／借金90%</td><td>50%（600万）／借金50%</td></tr>
          <tr><td className="hl">縦② 資産構成</td><td>固定73%（下半身ぶり）</td><td>固定50%（寸胴バランス型）</td></tr>
          <tr><td className="hl">横① 固定 vs 純資産</td><td>差760万＝<strong>イケイケすぎ</strong></td><td>ほぼフラット＝<strong>堅実</strong></td></tr>
          <tr><td className="hl">横② 流動性</td><td>現金127万＜流動負債230万＝<strong>回らない</strong></td><td>現金400万で余裕＝<strong>キャッシュ豊富</strong></td></tr>
        </tbody>
      </table>
      <p>外観（総資産）は同じでも、A社は借金頼みでイケイケ、B社は堅実でキャッシュに余裕 ― 数字の羅列が「その会社の性格・ストーリー」に変わります。</p>

      <p>BSで「安全性」を読んだら、次は<Link href="/finance/cf">キャッシュフローと三表のつながり</Link>で現金の実際の動きを見ます。BSを投資家でなく経営者の目で読み直すと、まったく違う結論が出る ― それが<Link href="/finance/cash">現金がすべて ― 黒字倒産と負債</Link>のテーマです。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/finance/cf" tag="会計・財務">キャッシュフローと三表のつながり</RelatedLink>
                    <RelatedLink href="/finance/cash" tag="会計・財務">現金がすべて ― 黒字倒産と負債</RelatedLink>
                    <RelatedLink href="/finance/analysis" tag="会計・財務">三表から会社を診断する</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
