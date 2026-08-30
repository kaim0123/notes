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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "画面設計と入力チェック",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>画面設計と入力チェック ― 業務画面を正しく作る</h1>
        <Lead>
          業務システムの画面は、見た目の良さだけでなく「入力ミスをどう防ぐか」「データをどう識別するか」まで設計します。ここでは画面構成の考え方、入力値を検査する各種チェック、そしてデータに意味を持たせるコード設計を整理します。
        </Lead>
      </Hero>

      <Heading num="01">UXデザインと画面構成</Heading>
      <p><Term>UXデザイン</Term>は、製品やサービスを通じて利用者が得る体験全体を設計することです。個々の画面の使いやすさ(UI)より広く、使う前後の印象や満足まで含みます。情報を分かりやすく伝えるための設計を<Term>情報デザイン</Term>と呼びます。</p>
      <p>画面を設計するときは、関連する項目をまとめ、視線の流れ(左上から右下へ)に沿って配置し、操作の順序と画面の並びを一致させる、といった<Term>画面構成</Term>の原則を意識します。よく使う機能を押しやすい位置に置くことも、使いやすさに直結します。</p>

      <Heading num="02">入力チェック ― 不正なデータを止める</Heading>
      <p>利用者の入力には、打ち間違いや想定外の値が必ず混じります。それを受け入れる前に検査するのが<Term>入力チェック(バリデーション)</Term>です。代表的な種類を押さえておきます。</p>
      <table>
        <thead>
          <tr><th>チェック</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ニューメリックチェック</td><td>数値であるべき項目に数字だけが入っているか</td></tr>
          <tr><td className="hl">フォーマットチェック</td><td>形式が正しいか(日付・メールアドレスなど)</td></tr>
          <tr><td className="hl">リミットチェック(範囲チェック)</td><td>値が許容範囲に収まっているか(例: 月は1〜12)</td></tr>
          <tr><td className="hl">シーケンスチェック</td><td>データが正しい順番に並んでいるか</td></tr>
          <tr><td className="hl">照合チェック</td><td>既存のマスタなどに存在する値か</td></tr>
          <tr><td className="hl">バランスチェック</td><td>合計値どうしが一致するか(借方と貸方など)</td></tr>
        </tbody>
      </table>
      <p>入力コードの誤りを検出するために、コードの末尾に検査用の桁を付け加えることがあります。この桁を<Term>チェックキャラクター(チェックディジット)</Term>と呼び、一定の計算式で導いた値を付けておくことで、入力時の誤りを機械的に見つけられます。</p>

      <Analogy label="💡 たとえるなら">
        入力チェックは「宅配便の受付での確認」です。宛先が空欄でないか(必須)、郵便番号が数字7桁か(フォーマット)、サイズが規定内か(リミット)を、荷物を預かる前に確かめます。受け取ってから不備に気づくより、入口で止めるほうがずっと安全です。
      </Analogy>

      <Heading num="03">帳票設計とコード設計</Heading>
      <p>紙やPDFで出力する<Term>帳票</Term>は、見出し・明細・合計といった領域を整理し、一覧性と印刷のしやすさを考えて設計します。</p>
      <p>データを識別・分類するために割り振る番号や記号の付け方が<Term>コード設計</Term>です。付け方によって種類が分かれます。</p>
      <table>
        <thead>
          <tr><th>コードの種類</th><th>付け方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">順番コード</td><td>発生順に単純な連番を振る(1, 2, 3…)</td></tr>
          <tr><td className="hl">区分コード</td><td>桁の範囲でグループを分ける(1〜99は関東、100〜は関西など)</td></tr>
          <tr><td className="hl">表意コード(ニモニックコード)</td><td>意味を連想できる記号にする(TYO=東京など)</td></tr>
          <tr><td className="hl">合成コード</td><td>複数のコードを組み合わせて1つにする</td></tr>
        </tbody>
      </table>
      <p>コードは「短く・重複せず・拡張しやすい」ことが望まれます。意味を持たせすぎると、分類が変わったときに振り直しが必要になるため、可読性と将来の変更のしやすさのバランスで選びます。</p>

      <Heading num="まとめ">見た目・検査・識別を設計する</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>画面構成は視線と操作順に沿わせる</h4><p>関連項目をまとめ、自然な流れで操作できるよう配置します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>入力チェックは入口で止める</h4><p>数値・形式・範囲・合計などを検査し、不正なデータの混入を防ぎます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>コード設計はデータの識別法</h4><p>順番・区分・表意・合成を、可読性と拡張性のバランスで選びます。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/frontend/ux/web" tag="ユーザーインタフェース">Web UIデザイン</RelatedLink>
                    <RelatedLink href="/dev/frontend/ux/gui" tag="ユーザーインタフェース">GUIの部品</RelatedLink>
                    <RelatedLink href="/dev/frontend/web-basics" tag="フロントエンド">Web基礎</RelatedLink>
                    <RelatedLink href="/dev/frontend/react/forms" tag="フロントエンド">フォームの値を管理する</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
