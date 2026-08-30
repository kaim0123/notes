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
  title: "設計のアンチパターン",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>データベース &middot; 発展</Eyebrow>
        <h1>設計のアンチパターン ― やってはいけない設計と、条件つきで許される設計</h1>
        <Lead>
          「<Link href="/database/design">ER図と正規化</Link>」の理屈どおりに作っても、現場では「一見便利だが後で必ず苦しむ」設計に手が伸びがちです。ここでは典型的な<Term>アンチパターン</Term>(避けるべき設計)と、状況次第で許容される<Term>グレーノウハウ</Term>(判断が要る設計)を整理します。名前を知っておくだけで、レビューで「それは○○では」と指摘できるようになります。
        </Lead>
      </Hero>

      <Heading num="01">アンチパターン ― 避けるべき設計</Heading>
      <p>いずれも「その場では楽」ですが、データの整合性が崩れたり、後の改修が困難になったりする設計です。</p>
      <table>
        <thead>
          <tr><th>アンチパターン</th><th>何が問題か</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">非スカラ値</td><td>1つの列に「A,B,C」のように複数の値を詰め込む。<Link href="/database/design">第1正規形</Link>に違反し、個々の値での検索・結合・件数集計がまともにできなくなる</td></tr>
          <tr><td className="hl">ダブルミーニング</td><td>1つの列が状況によって別の意味を持つ(同じ数値列が、ある行では「年齢」別の行では「勤続年数」)。列の意味が一意に定まらず、集計も制約も破綻する</td></tr>
          <tr><td className="hl">単一参照テーブル</td><td>あらゆる区分値(都道府県・性別・ステータス…)を1つの巨大なコードマスタに押し込む。参照が集中し、型や外部キー制約も効かせにくくなる</td></tr>
          <tr><td className="hl">テーブル分割</td><td>意味的に同じデータを「2023年注文」「2024年注文」のように水平分割したり、列を勝手に別テーブルへ垂直分割したりする。全期間の集計や構造変更のたびに苦しむ</td></tr>
          <tr><td className="hl">不適切なキー</td><td>変わりうる値(氏名・電話番号など)を主キーにする。値が変わると関連する全行を直す羽目になる</td></tr>
          <tr><td className="hl">ダブルマスタ</td><td>同じ実体を表すマスタが二重に存在する(統合し損ねた「顧客」テーブルが2つ)。どちらが正か分からなくなり、不整合の温床になる</td></tr>
          <tr><td className="hl">ゾンビマートと多段マート</td><td>使われなくなった集計テーブル(データマート)が残り続けたり、マートからマートを作って依存が何段にも連なったりする。更新漏れや出所不明の数字を生む</td></tr>
        </tbody>
      </table>
      <p>共通する教訓は、<strong>「1つの列・1つのテーブルには、1つの明確な意味だけを持たせる」</strong>ことです。楽をするために意味を兼用させた瞬間から、整合性を保つ責任がDBMSからアプリ側へこぼれ落ちていきます。</p>

      <Analogy label="💡 たとえるなら">
        非スカラ値やダブルミーニングは、1つの引き出しに「ハサミも、鍵も、電池も」まとめて放り込むようなものです。しまうのは一瞬で楽ですが、何かを探すたびに全部ひっくり返す羽目になります。ラベルどおり「ハサミの引き出し」を分けておくのが正規化された設計です。
      </Analogy>

      <Heading num="02">グレーノウハウ ― 条件つきで許される設計</Heading>
      <p>一方、原則から外れていても、目的と代償を理解したうえでなら妥当な設計もあります。「禁止」ではなく「使いどころを選ぶ」テクニックです。</p>
      <table>
        <thead>
          <tr><th>ノウハウ</th><th>何のために使うか / 代償</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">代理キー</td><td>自然キーが不安定・複雑なとき、意味を持たない連番の<Term>サロゲートキー</Term>を主キーにする。安定する反面、キー自体が業務的な意味を持たないため、一意性の担保は別途必要</td></tr>
          <tr><td className="hl">タイムスタンプ</td><td>「いつの状態か」を記録する列を足し、履歴やイベントを時系列で残す。行数は増えるが、変更の追跡や監査ができる</td></tr>
          <tr><td className="hl">インターバル</td><td>開始日・終了日の2列で「有効期間」を表現する。期間の重なりチェックなど、扱いに注意が要る</td></tr>
          <tr><td className="hl">列持ちテーブル</td><td>本来は行で持つべきデータ(1月〜12月など)を列に展開する。帳票の集計は楽になるが、項目が増えるたびに列(=構造)を変える必要があり柔軟性を失う</td></tr>
          <tr><td className="hl">データクレンジング</td><td>設計・移行の前に、表記ゆれや欠損など汚れたデータを洗浄しておく。地味だが、これを怠るとどんな設計も破綻する前提整備</td></tr>
        </tbody>
      </table>
      <Aside label="補足">
        グレーノウハウが「グレー」なのは、<strong>正しいかどうかが文脈で決まる</strong>からです。代理キーも列持ちテーブルも、理由を説明できるなら妥当な選択ですが、「なんとなく楽だから」で採用すると、そのままアンチパターンに転落します。判断の分かれ目は、代償を意識して選んでいるかどうかです。
      </Aside>

      <Heading num="まとめ">意味を兼用させない、代償を意識して選ぶ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>1列・1テーブルに意味は1つ</h4><p>非スカラ値・ダブルミーニング・単一参照テーブルは、意味の兼用が整合性を壊す典型例です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>「同じもの」を二重に持たない</h4><p>ダブルマスタや安易なテーブル分割は、どれが正しいデータか分からなくなる不整合の温床です。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>グレーは理由とセットで採用する</h4><p>代理キーや列持ちは、代償を理解して選べば妥当。理由なく使えばアンチパターンに転落します。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/database/design" tag="データベース">ER図と正規化</RelatedLink>
            <RelatedLink href="/database/performance" tag="データベース">パフォーマンスチューニング</RelatedLink>
            <RelatedLink href="/database/model" tag="データベース">関係モデルと3層スキーマ</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
