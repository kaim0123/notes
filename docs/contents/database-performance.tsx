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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "パフォーマンスチューニング",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>データベース &middot; 発展</Eyebrow>
        <h1>パフォーマンスチューニング ― 遅いクエリを速くする</h1>
        <Lead>
          「<Link href="/database/design">ER図と正規化</Link>」で整えたテーブルは、そのままでは検索が遅くなることがあります。速さを引き出すには、正規化と速度のトレードオフを理解したうえで、インデックス・統計情報・パーティションといったDBMSの仕組みを使いこなす必要があります。「<Link href="/database/physical">物理設計と運用</Link>」で予告した「どのクエリがなぜ遅いのか」を、ここで掘り下げます。
        </Lead>
      </Hero>

      <Heading num="01">結合はパフォーマンスの敵 ― 正規化と速度のトレードオフ</Heading>
      <p>正規化されたテーブルからまとまった情報を取り出すには、複数のテーブルを<Term>結合(JOIN)</Term>する必要があります。必要な行だけを取り出す<Term>内部結合</Term>、片方の表にしか存在しない行も残す<Term>外部結合</Term>のいずれも、DBMSは内部で行同士を突き合わせる処理を行うため、結合するテーブルが増え、行数が多いほど負荷が高まります。「<strong>結合はパフォーマンスの敵</strong>」と言われるゆえんです。</p>
      <p>これを避けるために、あえて正規化を崩して結合を減らす設計もあります。たとえば注文明細に「顧客名」を持たせておけば、参照のたびに顧客テーブルと結合せずに済みます。集計済みの<Term>サマリデータ</Term>(合計金額など)を冗長に保持しておくのも同じ発想で、これらを<Term>非正規化(デノーマライズ)</Term>と呼びます。</p>
      <p>ただし冗長化はタダではありません。次の3つのコストと引き換えです。</p>
      <table>
        <thead>
          <tr><th>冗長化の代償</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">更新時のパフォーマンス</td><td>元データを更新するたびに、コピーしておいた値もすべて更新する必要があり、書き込みが重くなる</td></tr>
          <tr><td className="hl">データのリアルタイム性</td><td>サマリを再計算するタイミング次第で、元データとの間に一時的なズレ(不整合)が生じうる</td></tr>
          <tr><td className="hl">改修コストの大きさ</td><td>同じ値が複数箇所に散らばるため、後から仕様を変えるときの修正範囲が広がる</td></tr>
        </tbody>
      </table>
      <p>選択条件(<code>WHERE</code>)を冗長に持たせて絞り込みを速くする手も同様で、速さと引き換えに整合性・保守性を差し出します。<strong>まずは正規化で整合性を守り、性能上どうしても必要な箇所に限って冗長化する</strong>のが基本方針です。多くの場合、冗長化に踏み切る前に、次節以降のインデックスやパーティションで十分な効果が得られます。</p>

      <Heading num="02">インデックス設計 ― どの列に張るか</Heading>
      <p><Link href="/database/index">索引</Link>でも触れたとおり、<Term>インデックス</Term>は検索を劇的に速くします。その最大の利点は、<strong>アプリケーションのコードもテーブルの構造も変えずに(アプリケーション透過的・データ透過的)、大きな性能改善が得られる</strong>ことです。SQLを書き換えず、データを移し替えることもなく、後から張るだけで効くため、チューニングの第一手として真っ先に検討されます。</p>
      <p>もっとも一般的な<Term>B-treeインデックス</Term>は、どんな列にも効くわけではありません。次の5つの性質を満たす列ほど効果を発揮します。</p>
      <table>
        <thead>
          <tr><th>性質</th><th>効果が出やすい条件</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">均一性</td><td>値が特定の値に偏らず、平均的に分散している(=<Term>カーディナリティ</Term>が高い)ほど、1つの値で行を大きく絞り込める</td></tr>
          <tr><td className="hl">持続性</td><td>行数が多い(数万件以上が目安)ほど効く。件数が少なければフルスキャンの方が速いこともある</td></tr>
          <tr><td className="hl">処理汎用性</td><td>SELECTだけでなくUPDATE・DELETEの検索条件にも効く、汎用的な高速化手段である</td></tr>
          <tr><td className="hl">非等値性</td><td>等値(<code>=</code>)だけでなく、範囲検索(<code>&gt;</code>・<code>BETWEEN</code>)にも効く</td></tr>
          <tr><td className="hl">親ソート性</td><td>B-treeは値が整列済みのため、<code>ORDER BY</code>・<code>GROUP BY</code>のソート処理を省ける</td></tr>
        </tbody>
      </table>
      <p>ここで鍵になるのが<Term>カーディナリティ</Term>(その列がとる値の種類の多さ)です。「性別」のように2種類しかない列にインデックスを張っても半分しか絞り込めませんが、「顧客ID」のように値の種類が多い列なら、1つの値で目的の行までほぼ一直線に辿れます。<strong>カーディナリティが高く、かつ検索やJOINの条件に頻繁に使われる列</strong>が、インデックスの最有力候補です。</p>

      <Heading num="03">統計情報とオプティマイザ ― 実行計画を決める頭脳</Heading>
      <p>インデックスを張っても、それを「使うかどうか」を最終的に判断するのはDBMS自身です。同じSQLでも、DBMSは内部で複数の実行手順(フルスキャンするか、どのインデックスを使うか、どの順でJOINするか)を比較し、もっとも低コストな<Term>実行計画(アクセスパス)</Term>を1つ選びます。この一連の流れを担うのが次の部品です。</p>
      <Diagram caption="SQLはパーサで解析され、オプティマイザが統計情報をもとに実行計画を決めてテーブルにアクセスする">
        <svg viewBox="0 0 640 150" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={55} width={90} height={40} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={65} y={79} fill="#f2f2f2" fontSize="11" textAnchor="middle">SQL</text>
          <rect x={140} y={55} width={100} height={40} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={190} y={79} fill="#f2f2f2" fontSize="11" textAnchor="middle">パーサ</text>
          <rect x={270} y={55} width={120} height={40} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={330} y={79} fill="#f2f2f2" fontSize="11" textAnchor="middle">オプティマイザ</text>
          <rect x={520} y={55} width={100} height={40} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={570} y={79} fill="#f2f2f2" fontSize="11" textAnchor="middle">テーブル</text>
          <rect x={270} y={5} width={120} height={34} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x={330} y={26} fill="#9a9a9a" fontSize="10" textAnchor="middle">カタログマネージャ</text>
          <text x={330} y={124} fill="#9a9a9a" fontSize="10" textAnchor="middle">(統計情報を管理)</text>

          <line x1={110} y1={75} x2={138} y2={75} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={240} y1={75} x2={268} y2={75} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={390} y1={75} x2={518} y2={75} stroke="#39ff6a" strokeWidth="1.5" />
          <text x={455} y={68} fill="#9a9a9a" fontSize="10" textAnchor="middle">実行計画</text>
          <line x1={330} y1={39} x2={330} y2={53} stroke="#5f5f5f" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x={415} y={30} fill="#9a9a9a" fontSize="10" textAnchor="middle">統計情報</text>
        </svg>
      </Diagram>
      <table>
        <thead>
          <tr><th>部品</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">パーサ</td><td>SQL文の構文を解析し、DBMSが扱える形に変換する入口</td></tr>
          <tr><td className="hl">オプティマイザ</td><td>統計情報を手がかりに、実行計画の候補を比較して最適なものを選ぶ「頭脳」</td></tr>
          <tr><td className="hl">カタログマネージャ</td><td>各テーブルの行数や列値の分布といった<Term>統計情報</Term>を管理し、オプティマイザに提供する</td></tr>
        </tbody>
      </table>
      <p>オプティマイザの判断は<Term>統計情報</Term>の正しさに完全に依存します。大量のデータを投入したのに統計情報が古いままだと、オプティマイザは「まだ数件しかない」と誤解し、インデックスを使わずフルスキャンを選ぶといった事故が起きます。データ量が大きく変わったら統計情報を更新する運用が欠かせません。</p>
      <p>それでもオプティマイザが不適切な計画を選んでしまうことはあります。その最終手段が<Term>ヒント句</Term>です。SQLに特別な記述を添えて「このインデックスを使え」とアクセスパスを人間が明示的に指定します。強力ですが、DBMSごとに書き方が異なり、データ分布が変われば逆効果にもなるため、あくまで最後の手段です。</p>

      <Heading num="04">パーティション ― 大きな表を分割して絞り込む</Heading>
      <p>行数が数千万を超えるような巨大なテーブルでは、インデックスだけでは追いつかないことがあります。<Term>パーティション</Term>は、1つのテーブルを内部的に複数の区画(パーティション)に分割し、物理的な格納を分けておく仕組みです。アプリからは1つのテーブルに見えたまま、DBMSが区画ごとに管理します。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>分割の基準</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">レンジパーティション</td><td>値の範囲で分ける</td><td>注文日を月ごと・年ごとに分割</td></tr>
          <tr><td className="hl">リストパーティション</td><td>列挙した値の一致で分ける</td><td>地域コード(東日本/西日本)で分割</td></tr>
          <tr><td className="hl">ハッシュパーティション</td><td>ハッシュ関数で均等に分ける</td><td>顧客IDを一定数の区画に平準化して分散</td></tr>
        </tbody>
      </table>
      <p>最大の効果は<Term>パーティションプルーニング</Term>です。たとえば注文日でレンジパーティションを組んでおけば、「今月の注文」を検索したときに、DBMSは対象外の月の区画を丸ごと読み飛ばせます。テーブル全体ではなく必要な区画だけを走査するため、I/O量が大きく減ります。</p>

      <Heading num="05">さらなる高速化 ― パラレルクエリとオンメモリ</Heading>
      <p>それでも足りないときは、ハードウェアの力を引き出す手段があります。</p>
      <table>
        <thead>
          <tr><th>手段</th><th>仕組み</th><th>効くケース</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">パラレルクエリ</td><td>1つのクエリを複数のプロセス/スレッドに分けて同時に処理する</td><td>大量データの集計・全件走査。CPUコアを使い切れる場面</td></tr>
          <tr><td className="hl">オンメモリ(インメモリDB)</td><td>データをディスクではなくメモリ上に載せて扱う</td><td>低遅延が最優先の処理。ディスクI/Oそのものを削れる</td></tr>
        </tbody>
      </table>
      <p>いずれも強力ですが、パラレルクエリはCPUやメモリを一気に消費するため同時実行数の多いシステムでは奪い合いになりやすく、オンメモリは容量あたりのコストが高く、電源喪失に備えた永続化の設計も要ります。無条件の万能策ではなく、ボトルネックを見極めたうえで投入する切り札です。</p>

      <Analogy label="💡 たとえるなら">
        インデックスは本の巻末索引、オプティマイザは「どのルートで目的地へ向かうか」を選ぶカーナビ、統計情報はその判断材料となる最新の交通情報です。交通情報が古ければ、ナビは渋滞した道(フルスキャン)を選んでしまいます。パーティションは、巨大な図書館を「年代別の書架」に分けて、探す範囲を最初から限定しておくようなものです。
      </Analogy>

      <Aside label="補足">
        チューニングの鉄則は「推測するな、計測せよ」です。多くのDBMSは実行計画を確認する<code>EXPLAIN</code>を備えており、遅いクエリがフルスキャンになっていないか、意図したインデックスが使われているかを、まず計画で確かめてから手を打つのが定石です。
      </Aside>

      <Heading num="まとめ">速さは仕組みの理解から</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>結合を減らす冗長化は最後の手段</h4><p>非正規化は更新コスト・整合性・保守性と引き換え。まず正規化+インデックスで足りるか見極めます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>インデックスはカーディナリティの高い列に</h4><p>コードもデータ構造も変えずに効く第一手。値の種類が多く、検索条件に使う列を狙います。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>実行計画はオプティマイザと統計情報が決める</h4><p>統計情報が古いと誤った計画を選ぶ。最後の微調整だけヒント句で明示します。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>巨大な表はパーティションで分割する</h4><p>区画に分けてプルーニングで読み飛ばし、さらにパラレルクエリやオンメモリで底上げします。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/database/index" tag="データベース">索引とアクセス制御</RelatedLink>
            <RelatedLink href="/database/physical" tag="データベース">物理設計と運用</RelatedLink>
            <RelatedLink href="/database/design" tag="データベース">ER図と正規化</RelatedLink>
            <RelatedLink href="/database/antipattern" tag="データベース">設計のアンチパターン</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
