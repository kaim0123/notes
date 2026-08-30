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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "品質戦略とテストピラミッド",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>品質戦略とテストピラミッド ― どこにどれだけテストを積むか</h1>
        <Lead>
          「テストを書きましょう」だけでは方針になりません。どのレイヤーに、どのくらいの数のテストを配置するのか、いつ・誰が・何を基準に品質を判断するのか。<Term>品質戦略</Term>とは、この配分と判断基準をチーム全体で共有できる形に落とし込んだものです。
        </Lead>
      </Hero>

      <Heading num="01">品質戦略という文書に何を書くか</Heading>
      <p>プロジェクトの規模が大きくなるほど、「なんとなく頑張ってテストする」では品質は揃いません。品質目標・テスト方針・レビュー方針・自動化方針・リスク対応・リリース基準・品質指標のように、判断のよりどころとなる項目をあらかじめ言語化しておくことで、メンバーが増えても同じ基準で意思決定できるようになります。</p>

      <table>
        <thead>
          <tr><th>項目</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">品質目標</td><td>バグ件数、可用性99.9%、レスポンス1秒以内</td></tr>
          <tr><td className="hl">テスト方針</td><td>テストピラミッドを採用する</td></tr>
          <tr><td className="hl">レビュー方針</td><td>コードレビューを必須にする</td></tr>
          <tr><td className="hl">自動化方針</td><td>単体テスト・CIを自動化する</td></tr>
          <tr><td className="hl">リスク対応</td><td>決済機能を重点的にテストする</td></tr>
          <tr><td className="hl">リリース基準</td><td>重大バグ0件でリリースする</td></tr>
          <tr><td className="hl">品質指標</td><td>テストカバレッジ、バグ密度、障害件数など</td></tr>
        </tbody>
      </table>

      <p>これらはすべて「何を、どこまでやれば十分と言えるか」という問いへの答えです。答えが曖昧なままだと、テストを書く量も止め時もレビューアの判断も人によってばらつき、結果として品質が運任せになります。</p>

      <Heading num="02">テストピラミッド ― 何を、どの層にどれだけ積むか</Heading>
      <p>テスト方針の中でも中心となる考え方が<Term>テストピラミッド</Term>です。テストを①単体テスト(Unit Test)②統合テスト(Integration Test)③E2Eテスト(End to End)の3層に分け、下の層ほど数を多く、上の層ほど数を絞って構成します。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>単体テスト ― 土台・最多</h4><p>関数やクラス単位の検証。実行が速く壊れにくいため、大量に書いて土台を固めます。詳しくは<Link href="/test/unit">Unitテスト</Link>で扱います。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>統合テスト ― 中間</h4><p>複数モジュールやDB・外部APIとの結合を検証。単体より遅く数は絞ります。詳しくは<Link href="/test/integration">Integrationテスト</Link>で扱います。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>E2Eテスト ― 頂点・最少</h4><p>ブラウザ越しにユーザー動線を丸ごと検証。最も遅く壊れやすいため、代表的な動線だけに絞ります。詳しくは<Link href="/test/e2e">E2Eテスト</Link>で扱います。</p></Card>
      </CardGrid>

      <Analogy label="💡 たとえるなら">
        テストピラミッドは「食事のバランス」に似ています。米や野菜(単体テスト)を主食として大量に摂り、肉や魚(統合テスト)を適量、デザート(E2Eテスト)は少しだけ。デザートばかり食べる(E2Eに偏る)と実行が重く壊れやすい食生活になり、逆に主食だけ(単体だけ)では画面をまたぐ不具合を見落とします。
      </Analogy>

      <p>この形が逆三角形になっている状態は俗に「アイスクリームコーン型」と呼ばれ、E2Eテストばかりが増えて実行時間が長く、失敗原因の特定も難しい状態を指します。テストが「遅くて、たまに落ちて、誰も直したがらない」ようになったら、ピラミッドの形が崩れている合図です。</p>

      <Heading num="03">テストピラミッドの派生形 ― システムの特性で形は変わる</Heading>
      <p>テストピラミッドは「手動・E2E中心の開発」がアイスクリームコーン型に陥りやすいことへの反省から広まった考え方ですが、あらゆるシステムに同じ配分が最適とは限りません。実際には、対象システムの構造に合わせてピラミッドを変形させた派生形がいくつも提案されています。</p>

      <Diagram caption="手動・E2E中心 → アイスクリームコーン(反面教師) → テストピラミッド → 現場ごとの派生形">
        <svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg">
          <rect x={230} y={12} width={180} height={36} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={320} y={35} fill="#9a9a9a" fontSize="12" textAnchor="middle">手動・E2E中心</text>

          <line x1={320} y1={48} x2={320} y2={68} stroke="#5f5f5f" strokeWidth="1.5" />
          <rect x={190} y={68} width={260} height={36} rx="8" fill="none" stroke="#ff4d4d" strokeWidth="1.5" />
          <text x={320} y={91} fill="#ff4d4d" fontSize="12" textAnchor="middle">アイスクリームコーン型(反面教師)</text>

          <line x1={320} y1={104} x2={320} y2={126} stroke="#5f5f5f" strokeWidth="1.5" />
          <rect x={210} y={126} width={220} height={36} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={149} fill="#39ff6a" fontSize="12" textAnchor="middle">テストピラミッド(Unit重視)</text>

          <line x1={320} y1={162} x2={320} y2={180} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={100} y1={210} x2={320} y2={180} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={540} y1={210} x2={320} y2={180} stroke="#5f5f5f" strokeWidth="1.5" />

          <rect x={20} y={210} width={160} height={56} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={100} y={232} fill="#f2f2f2" fontSize="12" textAnchor="middle">テストダイヤモンド</text>
          <text x={100} y={250} fill="#9a9a9a" fontSize="10" textAnchor="middle">Integrationを増やす</text>

          <rect x={240} y={210} width={160} height={56} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={320} y={232} fill="#f2f2f2" fontSize="12" textAnchor="middle">テスティングトロフィー</text>
          <text x={320} y={250} fill="#9a9a9a" fontSize="10" textAnchor="middle">React・SPA向け</text>

          <rect x={460} y={210} width={160} height={56} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={540} y={232} fill="#f2f2f2" fontSize="12" textAnchor="middle">テストハニカム</text>
          <text x={540} y={250} fill="#9a9a9a" fontSize="10" textAnchor="middle">マイクロサービス向け</text>
        </svg>
      </Diagram>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>テストダイヤモンド ― Integrationを増やす</h4><p>単体テストの数を絞り、代わりに複数モジュールをまたぐ統合テストを最も厚くする配分です。DB・外部APIとの結合など、モジュール間の連携そのものにバグが出やすいシステムで有効です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>テスティングトロフィー ― React・SPA向け</h4><p>静的解析を土台に置き、その上に統合テストを最も厚く積み、単体テストとE2Eテストを薄くする配分です。コンポーネント同士の結合込みで検証したいSPA・フロントエンド開発でよく採用されます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>テストハニカム ― マイクロサービス向け</h4><p>サービスごとの単体テストに加え、サービス間連携を検証する統合テストを蜂の巣状に組み合わせる配分です。サービスの数だけ「単体+結合」のペアが並ぶマイクロサービス構成に向いています。</p></Card>
      </CardGrid>

      <p>どの派生形も「アイスクリームコーン型を避ける」という目的は共通していますが、どの層を厚くするかはシステムの構造(モジュール分割の粒度、フロントエンドかバックエンドか、サービスの数)によって変わります。自分たちのアーキテクチャに合わない配分をそのまま輸入すると、かえって遅く壊れやすいテストスイートになるため、まずは自分たちがどの形に近いかを見極めることが大切です。</p>

      <Heading num="04">シフトレフト ― 欠陥は早く見つけるほど安い</Heading>
      <p><Term>シフトレフト</Term>とは、開発の工程を左から右へ時系列で並べたとき、テストや品質チェックをできるだけ左側(早い工程)に寄せるという考え方です。要件定義や設計の段階でレビューを行い、コードを書いている最中に静的解析や単体テストを回し、本番に近い環境での確認は最後に薄く残す。欠陥は発見が遅れるほど、原因調査・修正・再テストのコストが跳ね上がるため、「早く・小さく」見つけることが結果的に安く済みます。</p>

      <Heading num="05">リスクベースドテスト ― 全部を同じ密度でテストしない</Heading>
      <p>時間もテスト要員も有限です。<Term>リスクベースドテスト</Term>は、機能ごとに「壊れたときの影響の大きさ」と「壊れる確率」を見積もり、リスクが高い機能ほどテストを厚くする考え方です。決済や個人情報を扱う機能は重点的に、影響の小さい表示崩れ程度の機能は薄く、といった濃淡をつけることで、限られたリソースを効果的に配分できます。</p>

      <Heading num="まとめ">品質戦略で押さえたい観点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>判断基準を言語化する</h4><p>品質目標からリリース基準まで、感覚ではなく文書で共有します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>下に厚く、上に薄く積む</h4><p>単体・統合・E2Eの3層で数のバランスを取り、アイスクリームコーン型を避けます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>形は現場に合わせて変える</h4><p>ダイヤモンド・トロフィー・ハニカムなど、アーキテクチャに合った派生形を選びます。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>欠陥は早く見つける</h4><p>シフトレフトで、後工程に問題を持ち越さないようにします。</p></Card>
        <Card><CardNumber>5</CardNumber><h4>リスクに応じて濃淡をつける</h4><p>すべてを均等にではなく、影響が大きい機能を重点的にテストします。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/test/design-techniques" tag="テスト">テスト設計技法</RelatedLink>
                    <RelatedLink href="/test/unit" tag="テスト">Unitテスト</RelatedLink>
                    <RelatedLink href="/test/quality-plan" tag="テスト">品質計画</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
