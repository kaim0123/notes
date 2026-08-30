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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "デザイン思考",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>デザイン思考 ― 共感から改善サイクルまで</h1>
        <Lead>
          <Term>デザイン思考(Design Thinking)</Term>は、利用者の課題を深く理解し、解決案を素早く試して学び、改善を繰り返す進め方です。従来の「要件を固定して一気に作る」開発と対比されることが多く、フロントエンドでもプロトタイプとユーザーテストを早い段階に組み込む考え方として使われます。
        </Lead>
      </Hero>

      <Heading num="01">従来開発との違い</Heading>
      <table>
        <thead>
          <tr>
            <th>観点</th>
            <th>従来型(ウォーターフォール寄り)</th>
            <th>デザイン思考</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">出発点</td>
            <td>要件定義書・仕様書</td>
            <td>利用者の実態・課題の理解</td>
          </tr>
          <tr>
            <td className="hl">解決案</td>
            <td>最初から1案に絞る</td>
            <td>複数案を出してから選ぶ</td>
          </tr>
          <tr>
            <td className="hl">検証</td>
            <td>完成後にテスト</td>
            <td>試作の段階で早く確かめる</td>
          </tr>
          <tr>
            <td className="hl">変更</td>
            <td>後戻りコストが高い</td>
            <td>反復を前提に小さく学ぶ</td>
          </tr>
        </tbody>
      </table>
      <p>どちらか一方が正しいわけではありません。規模や制約に応じて組み合わせます。フロントエンド実装者にとって重要なのは、「完成品を待たずに、ワイヤーフレームやモックアップで早くフィードバックを得る」という姿勢です。</p>

      <Heading num="02">5段階と主な道具</Heading>
      <p>デザイン思考は、次の5段階を反復します。各段階には代表的工具がありますが、すべてを毎回使う必要はありません。</p>
      <table>
        <thead>
          <tr>
            <th>段階</th>
            <th>やること</th>
            <th>主な道具</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">共感(Empathize)</td>
            <td>利用者の状況・感情・制約を理解する</td>
            <td>ペルソナ、カスタマージャーニー、共感マップ</td>
          </tr>
          <tr>
            <td className="hl">問題定義(Define)</td>
            <td>本当に解くべき課題を言語化する</td>
            <td>How Might We(どうすれば〜できるか)</td>
          </tr>
          <tr>
            <td className="hl">発想(Ideate)</td>
            <td>解決案を量と質の両面で広げる</td>
            <td>ブレインストーミング、SCAMPER、KJ法</td>
          </tr>
          <tr>
            <td className="hl">試作(Prototype)</td>
            <td>早く・安く・粗く形にする</td>
            <td>ペーパープロトタイプ、ワイヤーフレーム、モックアップ</td>
          </tr>
          <tr>
            <td className="hl">テスト(Test)</td>
            <td>利用者で確かめ、学びを次に活かす</td>
            <td>ユーザーテスト、A/Bテスト</td>
          </tr>
        </tbody>
      </table>

      <Heading num="03">共感 ― 利用者像と体験の地図</Heading>
      <p><Term>ペルソナ</Term>は、代表的な利用者像を「名前・目的・困りごと」などで具体化した仮想の人物像です。チーム内で「誰のための画面か」を共有する道具として使います。</p>
      <p><Term>カスタマージャーニー</Term>は、利用者がサービスに触れてから目的を達成するまでの一連のステップを、感情やつまずきとともに可視化した地図です。どの段階で離脱や混乱が起きやすいかが見えます。</p>
      <p><Term>共感マップ</Term>は、利用者が「見る・聞く・考える・感じる・言う・行う」ことを4象限などに整理し、思い込みと事実を切り分けるためのツールです。</p>

      <Heading num="04">問題定義と発想</Heading>
      <p>問題定義では、「〇〇機能が足りない」という表面的な要求ではなく、「利用者が本当に達成したいことは何か」を掘り下げます。<Term>How Might We</Term>は、「どうすれば〜できるだろうか」と問いを再構成し、発想の入口を広げるフレームです。</p>
      <p>発想段階では、最初から良い案を1つ選ぶのではなく、<strong>量を出してから絞る</strong>のが基本です。ブレインストーミングは批判を止めて案を出し合う手法、<Term>SCAMPER</Term>は Substitute(置き換え)・Combine(組み合わせ)など7つの視点で既存案を変形するチェックリスト、<Term>KJ法</Term>は付箋で出した意見をグルーピングして整理する手法です。</p>

      <Analogy label="💡 たとえるなら">
        発想段階は「レストランの新メニュー開発」です。最初から1品決めるのではなく、素材・調理法・盛り付けの案をたくさん出し、試食(試作)で絞り込みます。早い段階で「これはダメ」と言い切るより、安い試作で学ぶ方が後戻りが少ないです。
      </Analogy>

      <Heading num="05">試作とテスト ― 早く確かめる</Heading>
      <p>試作には段階があります。詳細は<Link href="/dev/frontend/ux/web">Web UIデザイン</Link>でも扱いますが、実装者視点では次の使い分けが重要です。</p>
      <table>
        <thead>
          <tr>
            <th>種類</th>
            <th>内容</th>
            <th>向いている段階</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">ペーパープロトタイプ</td>
            <td>紙や手書きで操作の流れだけ再現</td>
            <td>アイデアの初期、会議での合意形成</td>
          </tr>
          <tr>
            <td className="hl">ワイヤーフレーム</td>
            <td>色や装飾を省き、配置と情報の優先順位だけ示す</td>
            <td>画面構成の確定、Reactコンポーネント分割の前</td>
          </tr>
          <tr>
            <td className="hl">モックアップ</td>
            <td>見た目に近い静止画。クリックは疑似</td>
            <td>ビジュアル方向性の合意、ステークホルダー確認</td>
          </tr>
        </tbody>
      </table>
      <p>テスト段階では、実際の利用者に課題を操作してもらう<Term>ユーザーテスト</Term>でつまずきを観察します。リリース後は、2つの版を比較する<Term>A/Bテスト</Term>で数値的に効果を測ることもあります。評価手法の詳細は<Link href="/dev/frontend/ux/hcd">人間中心設計と評価</Link>を参照してください。</p>

      <Heading num="06">改善サイクル</Heading>
      <p>デザイン思考は5段階で終わりではありません。テストで得た学びを共感・定義に戻し、試作を更新する<strong>改善サイクル</strong>が本体です。フロントエンド実装でも、リリース後の計測・フィードバックを次のUI改善に反映する流れは同じです。</p>

      <Heading num="まとめ">早く学び、小さく直す</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>利用者理解が出発点</h4>
          <p>ペルソナ・ジャーニー・共感マップで、思い込みを可視化します。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>案を広げてから絞る</h4>
          <p>問題定義と発想で、解決の選択肢を増やしてから選びます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>試作で早く確かめる</h4>
          <p>WF・モックアップ・ユーザーテストで、完成前に学びます。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/ux/basics" tag="フロントエンド">
              UXの基礎
            </RelatedLink>
            <RelatedLink href="/dev/frontend/ux/web" tag="設計">
              Web UIデザイン
            </RelatedLink>
            <RelatedLink href="/dev/frontend/ux/hcd" tag="設計">
              人間中心設計と評価
            </RelatedLink>
            <RelatedLink href="/dev/frontend/ux/visual" tag="フロントエンド">
              視覚デザイン
            </RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
