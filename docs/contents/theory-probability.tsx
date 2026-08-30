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
  Aside,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "確率・統計と情報理論",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>情報科学</Eyebrow>
        <h1>確率・統計と情報理論 ― データを読む土台</h1>
        <Lead>
          信頼性の見積もり、データの読み方、圧縮や符号化 ― これらはすべて確率・統計と情報理論の上に成り立っています。ここでは確率の基本計算、代表値とばらつき、そして「情報量」という考え方までを、実務や試験で頻出の範囲にしぼって整理します。
        </Lead>
      </Hero>

      <Heading num="01">確率の基本</Heading>

      <h3>事象と確率</h3>
      <ul>
        <li><Term>試行</Term>: コインを投げる、サイコロを振る、といった行為</li>
        <li><Term>事象</Term>: 「表が出る」「1が出る」など、試行の結果の集合</li>
        <li><Term>確率</Term>: 事象が起きる可能性の大きさ。0〜1 の値で表す</li>
      </ul>
      <p>サイコロの例で考えると、出る目は 1〜6 の6通り(全事象)。「偶数が出る」は {"{2, 4, 6}"} なので、確率は 3/6 = 1/2 です。</p>

      <h3>加法定理と乗法定理</h3>
      <table>
        <tbody>
          <tr><th>定理</th><th>条件</th><th>式</th></tr>
          <tr><td className="hl">加法定理</td><td>互いに排反(同時に起きない)</td><td>P(A ∪ B) = P(A) + P(B)</td></tr>
          <tr><td className="hl">乗法定理</td><td>互いに独立(影響し合わない)</td><td>P(A ∩ B) = P(A) × P(B)</td></tr>
        </tbody>
      </table>
      <p>例) サイコロで「偶数(E)かつ3の倍数(M)」が出る確率を求めます。E = {"{2, 4, 6}"}、M = {"{3, 6}"} なので、両方を満たすのは E ∩ M = {"{6}"}。よって確率は 1/6 です。</p>

      <Heading num="02">統計の基礎 ― 代表値とばらつき</Heading>

      <h3>代表値</h3>
      <p>データ全体を1つの値で代表させる指標です。どれを使うべきかは、データの分布や外れ値の有無で変わります。</p>
      <table>
        <tbody>
          <tr><th>代表値</th><th>意味</th><th>性質</th></tr>
          <tr><td className="hl">平均値(mean)</td><td>値の合計 ÷ 個数</td><td>外れ値の影響を受けやすい</td></tr>
          <tr><td className="hl">中央値(median)</td><td>小さい順に並べた中央の値</td><td>外れ値の影響を受けにくい</td></tr>
          <tr><td className="hl">最頻値(mode)</td><td>最も頻繁に現れる値</td><td>カテゴリデータにも使える</td></tr>
        </tbody>
      </table>

      <h3>ばらつき ― 分散と標準偏差</h3>
      <ul>
        <li><Term>分散</Term>: 各データと平均の差を2乗して平均したもの。ばらつきが大きいほど値も大きくなる。</li>
        <li><Term>標準偏差</Term>: 分散の正の平方根。元のデータと同じ単位になるので、ばらつきの大きさを直感的に比べやすい。</li>
      </ul>

      <h3>正規分布と 68-95-99.7 の法則</h3>
      <p>平均を中心に左右対称な釣り鐘型に分布するのが<Term>正規分布</Term>です。標準偏差を σ とすると、データのおよそ 68% が「平均 ± σ」の範囲に、およそ 95% が「平均 ± 2σ」の範囲に入ります。「だいたいこの範囲に収まる」という感覚が、品質管理や異常検知の土台になります。</p>

      <Analogy label="💡 たとえるなら">
        平均だけを見るのは、川の「平均水深」だけを見て渡ろうとするようなものです。平均が腰の高さでも、真ん中が背丈より深いかもしれません。標準偏差(ばらつき)まで見て初めて、その川を安全に渡れるかが判断できます。
      </Analogy>

      <Aside label="もっと詳しく">
        手元の標本から、その背後にある母集団について「どこまで言えるか」を扱うのが推定・検定です。A/Bテストや品質検査の判断根拠になる考え方を「<Link href="/theory/probability/inference">推定と仮説検定</Link>」で扱っています。
      </Aside>

      <Heading num="03">情報量とハフマン符号</Heading>

      <h3>情報量の考え方</h3>
      <p>「起こりにくい事象が起こったときほど、得られる情報は多い」という直感を数値化したものが<Term>情報量</Term>です。確率 p の事象が起きたときの情報量は −log₂ p ビットで表します。</p>
      <table>
        <tbody>
          <tr><th>事象の確率</th><th>情報量</th></tr>
          <tr><td className="hl">1/2</td><td>1 ビット</td></tr>
          <tr><td className="hl">1/4</td><td>2 ビット</td></tr>
          <tr><td className="hl">1/8</td><td>3 ビット</td></tr>
        </tbody>
      </table>
      <p>直感的には、「はい／いいえ」で答える質問(1ビット)を何回すれば、その事象を特定できるか、というイメージです。</p>

      <h3>ハフマン符号のアイデア</h3>
      <p><Term>ハフマン符号</Term>は、出現頻度の高い記号に短いビット列を、頻度の低い記号に長いビット列を割り当て、全体の平均ビット長を最小にする符号化方式です。データ圧縮の基本的な考え方の一つです。</p>
      <ul>
        <li>各記号の符号を<Term>プレフィックスコード</Term>(他の符号の先頭にならない)にする → 区切りなしで一意に復号できる</li>
        <li>頻度に応じて2分木を作り、葉に記号を置くことで構成される</li>
      </ul>
      <p>木の詳しい作り方まで問われることは多くありませんが、「頻度の高いものに短い符号を割り当てる」という発想は、圧縮全般に通じる基本です。</p>

      <Heading num="04">アナログ・デジタルと A/D 変換</Heading>
      <p>音声などの<Term>アナログ信号</Term>をコンピュータで扱うには、連続的な波を離散的な数値へ変換する <Term>A/D変換</Term>が必要です。次の3ステップで行います。</p>
      <table>
        <tbody>
          <tr><th>ステップ</th><th>やること</th></tr>
          <tr><td className="hl">標本化(サンプリング)</td><td>一定時間ごとに信号の値を測る(1秒あたりの回数がサンプリングレート)</td></tr>
          <tr><td className="hl">量子化</td><td>測った値を有限個の段階に丸める(ビット数が多いほど細かい)</td></tr>
          <tr><td className="hl">符号化</td><td>量子化された値にビットパターンを対応させる</td></tr>
        </tbody>
      </table>
      <p>標本化定理(ナイキストの定理)では「信号の最大周波数の2倍以上のサンプリングレートが必要」とされますが、まずは<Term>標本化 → 量子化 → 符号化</Term>という流れを押さえておけば十分です。</p>

      <Aside label="つながり">
        「頻度の高い記号に短い符号を割り当てる」という発想は、文字を効率よくバイト列にする仕組みにも通じます。文字コードは「<Link href="/theory/encoding">文字コード</Link>」で扱っています。また、通信路での誤り検出・訂正の実装側は「<Link href="/network/layers">階層モデル</Link>」を参照してください。
      </Aside>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>確率は加法・乗法</h4>
          <p>排反なら足す、独立なら掛ける。この2つの見分けがつけば、多くの問題に対応できます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>平均だけでは足りない</h4>
          <p>代表値(平均・中央値・最頻値)とばらつき(標準偏差)をセットで見ると、データが正しく読めます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>珍しいほど情報が多い</h4>
          <p>情報量は −log₂ p。頻度の高い記号に短い符号を ― これが圧縮の基本発想です。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/theory/probability/inference" tag="情報科学">推定と仮説検定</RelatedLink>
                    <RelatedLink href="/theory/encoding" tag="情報科学">文字コード</RelatedLink>
                    <RelatedLink href="/security/hash" tag="セキュリティ">ハッシュ関数と衝突攻撃</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
