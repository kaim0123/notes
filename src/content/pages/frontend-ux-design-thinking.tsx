import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "デザイン思考" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>デザイン思考 ― 共感から改善サイクルまで</h1>
        <Lead>
          <Term>デザイン思考</Term>は、利用者の課題を深く理解し、解決案を素早く試して学び、改善を繰り返す進め方です。<Link href="/frontend/ux-basics">ダブルダイヤモンド</Link>のリズムを、実際に手を動かす手順まで落としたものと捉えると位置づけが分かりやすくなります。
        </Lead>
      </Hero>

      <Heading num="01">従来型との違い</Heading>
      <table>
        <thead>
          <tr><th>観点</th><th>従来型(仕様先行)</th><th>デザイン思考</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">出発点</td><td>要件定義書・仕様書</td><td>利用者の実態・課題の理解</td></tr>
          <tr><td className="hl">解決案</td><td>最初から1案に絞る</td><td>複数案を出してから選ぶ</td></tr>
          <tr><td className="hl">検証</td><td>完成後にテスト</td><td>試作の段階で早く確かめる</td></tr>
          <tr><td className="hl">変更</td><td>後戻りコストが高い</td><td>反復を前提に小さく学ぶ</td></tr>
        </tbody>
      </table>

      <p>
        どちらか一方が正しいわけではありません。<Link href="/dev/process-history">開発手法の変遷</Link>で見たのと同じ構図で、<Term>不確実性が高いほど反復が効き、低いほど計画が効きます</Term>。実装者にとって重要なのは、完成品を待たずに早くフィードバックを得るという姿勢そのものです。
      </p>

      <Heading num="02">5段階と、それぞれの道具</Heading>

      <DiagramFrame
        slug="frontend-ux-design-thinking"
        aspect="640 / 280"
        caption="デザイン思考の5段階を横並びで示した図。左から共感、問題定義、発想、試作、テストの順に矢印でつながる。共感と発想の段は広がる形、問題定義とテストの段は絞る形で描かれ、発散と収束が交互に来ることを表している。いちばん右のテストから左へ戻る大きな矢印があり、学んだことを共感や問題定義に戻して次の周回に入ることが示されている。5段階を一度通ることではなく、この戻りこそが本体である。"
      />

      <table>
        <thead>
          <tr><th>段階</th><th>やること</th><th>主な道具</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">共感</td><td>利用者の状況・感情・制約を理解する</td><td>ペルソナ、カスタマージャーニー、共感マップ</td></tr>
          <tr><td className="hl">問題定義</td><td>本当に解くべき課題を言語化する</td><td>「どうすれば〜できるか」への言い換え</td></tr>
          <tr><td className="hl">発想</td><td>解決案を量と質の両面で広げる</td><td>ブレインストーミング、視点を変えるチェックリスト、付箋の分類</td></tr>
          <tr><td className="hl">試作</td><td>早く・安く・粗く形にする</td><td>紙の試作、ワイヤーフレーム、モックアップ</td></tr>
          <tr><td className="hl">テスト</td><td>利用者で確かめ、学びを次に活かす</td><td>ユーザビリティテスト、比較検証</td></tr>
        </tbody>
      </table>

      <Heading num="03">共感 ― 利用者像と体験の地図</Heading>
      <p>
        <Term>ペルソナ</Term>は、代表的な利用者像を名前・目的・困りごとで具体化した仮想の人物です。「誰のための画面か」をチームで共有する道具で、議論が「自分だったらこうする」に流れるのを止める効果があります。
      </p>
      <p>
        <Term>カスタマージャーニー</Term>は、サービスに触れてから目的を達成するまでのステップを、感情やつまずきとともに並べた地図です。1画面ずつ見ていると気付けない<Term>画面と画面の間</Term>の問題 ― メールを待つ時間、別のアプリへの移動 ― が見えます。
      </p>
      <p>
        <Term>共感マップ</Term>は、利用者が見る・聞く・考える・感じることを整理し、<Term>観察した事実と自分の推測を切り分ける</Term>ための道具です。
      </p>

      <Aside label="⚠️ ペルソナが形骸化するとき">
        ペルソナは、調査ではなく想像から作ると「作り手にとって都合のよい利用者」になります。年齢や職業といった属性を細かく書き込んでも、<Term>その人が何に困っているか</Term>が観察に基づいていなければ、意思決定の役には立ちません。
      </Aside>

      <Heading num="04">問題定義と発想</Heading>
      <p>
        問題定義では「◯◯機能が足りない」という表面的な要求ではなく、<Term>利用者が本当に達成したいこと</Term>まで掘り下げます。要求を「どうすれば〜できるだろうか」という問いの形に言い換えると、解決策を1つに固定しないまま考えを進められます。
      </p>
      <p>
        発想段階では、最初から良い案を1つ選ぶのではなく<Term>量を出してから絞ります</Term>。批判を止めて案を出し合う、既存案に変形の視点を当てる、出た意見を付箋で分類する ― どれも、最初に思いついた案に引きずられないための仕掛けです。
      </p>

      <Analogy label="💡 たとえるなら">
        発想段階は新メニューの開発です。最初から1品に決めず、素材・調理法・盛り付けの案をたくさん出し、試食で絞り込みます。会議室で「これはダメだ」と論じるより、安い試作を作って食べてもらうほうが早く正確に分かります。
      </Analogy>

      <Heading num="05">試作 ― 粗さを段階で選ぶ</Heading>
      <p>
        試作は精度の高さが価値ではありません。<Term>確かめたいことに対して、いちばん安い形</Term>を選びます。
      </p>

      <table>
        <thead>
          <tr><th>種類</th><th>内容</th><th>向いている段階</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">紙の試作</td><td>手書きで操作の流れだけ再現する</td><td>アイデアの初期、その場での合意形成</td></tr>
          <tr><td className="hl">ワイヤーフレーム</td><td>色や装飾を省き、配置と優先順位だけ示す</td><td>画面構成の確定、部品分割の前</td></tr>
          <tr><td className="hl">モックアップ</td><td>見た目に近い静止画。操作は疑似</td><td>見た目の方向性の合意</td></tr>
          <tr><td className="hl">動くプロトタイプ</td><td>主要な操作だけ本当に動く</td><td>操作を完了できるかの検証</td></tr>
        </tbody>
      </table>

      <p>
        よくある失敗は、精度を上げすぎることです。作り込んだ試作を見せられると、人は<Term>もう決まったこと</Term>として扱い、根本的な指摘をしなくなります。粗い見た目には「まだ変えられる」という合図としての機能があります。
      </p>

      <Heading num="06">改善サイクルが本体</Heading>
      <p>
        デザイン思考は5段階で終わりではありません。テストで得た学びを共感・定義へ戻し、試作を更新する<Term>周回</Term>が本体です。実装後も同じで、リリース後の計測とフィードバックを次のUI改善に反映する流れは変わりません。
      </p>

      <Heading num="まとめ">早く学び、小さく直す</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>利用者理解が出発点</h4>
          <p>ペルソナ・ジャーニー・共感マップで、事実と推測を切り分ける。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>案を広げてから絞る</h4>
          <p>最初に思いついた案に引きずられないための手続き。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>試作は安いほどよい</h4>
          <p>作り込むほど根本的な指摘が出なくなる。粗さは「まだ変えられる」の合図。</p>
        </Card>
      </CardGrid>

      <p>
        次は、決まった構造を実際に目に見える形にする<Link href="/frontend/ux-visual">視覚デザイン</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/ux-design-thinking" />
    </DocsPage>
  );
}
