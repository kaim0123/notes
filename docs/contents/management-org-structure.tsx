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
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "組織構造とアサイン",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>組織構造とアサイン ― 器と配置を設計する</h1>
        <Lead>
          チームの形に唯一の正解はありません。<Term>文鎮型・構造型・プロジェクト型</Term>をはじめとする組織のパターンを、チームのフェーズに合わせて選び分けます。そして器が決まったら、メンバーの<Term>Will（意欲）</Term>と<Term>Can（スキル）</Term>を把握し、成果を最大化するアサインを設計します。
        </Lead>
      </Hero>

      <Heading num="01">マネージャーの管理幅</Heading>
      <p>まず前提として、マネージャー1人が直接見られるメンバーの数には限界があります。目安は<Term>おおよそ5名が最適、10名が限界</Term>です。20〜30名になると組織は崩壊しやすく、2名程度なら余裕があります。実務感覚としては<Term>7名でかなりパツパツ、8名以上はきつい</Term>というイメージです。ただし担当業務や、マネージャー自身がプレイヤーを兼ねるかどうかで変わるため、絶対的な数ではありません。</p>

      <Heading num="02">組織構造のパターン</Heading>
      <p>組織の形は、<Term>マネージャー・リーダー・PM（プロジェクトマネージャー）</Term>といった役割をどう置くかで整理できます。基本は文鎮型・構造型・プロジェクト型の3つで、これにマトリックス型・セル型・スクラム型を加えると、現場でよく見る形はほぼ網羅できます。まず「どの役割が存在するか」で全体像をつかみます。</p>
      <table>
        <thead>
          <tr><th>パターン</th><th>Manager</th><th>Leader</th><th>PM</th><th>現場の特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">文鎮型</td><td>○</td><td>×</td><td>×</td><td>Managerが直接全員を見る</td></tr>
          <tr><td className="hl">構造型</td><td>○</td><td>○</td><td>×</td><td>Leaderが現場を管理</td></tr>
          <tr><td className="hl">プロジェクト型</td><td>△</td><td>△</td><td>○</td><td>案件単位でチーム編成</td></tr>
          <tr><td className="hl">マトリックス型</td><td>○</td><td>○</td><td>○</td><td>ManagerとPMの二重管理</td></tr>
          <tr><td className="hl">セル型</td><td>△</td><td>○</td><td>×</td><td>小チームが自律運営</td></tr>
          <tr><td className="hl">スクラム型</td><td>×（または最小限）</td><td>サーバント型</td><td>PO・SM</td><td>チームが自己組織化</td></tr>
        </tbody>
      </table>
      <p>それぞれにメリットとデメリットがあります。基本の3型に加え、二軸で管理する<Term>マトリックス型</Term>、小さな自律チームを束ねる<Term>セル型</Term>、チームの自己組織化を前提とする<Term>スクラム型</Term>を並べると次のとおりです。</p>
      <table>
        <thead>
          <tr><th>型</th><th>メリット</th><th>デメリット</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">文鎮型</td><td>「決めて→実行→振り返り」のPDCAが速い</td><td>人数が増えるとマネージャーがキャパオーバー。メンバーが全体を把握しにくく、重要なチャンス・リスクを見逃しやすい</td></tr>
          <tr><td className="hl">構造型</td><td>人数が増えてもチームが機能しやすい</td><td>意思決定から実行・振り返りまでのスピードが遅くなりやすい</td></tr>
          <tr><td className="hl">プロジェクト型</td><td>案件に応じて機動的にチームを組める</td><td>リソース管理が難しく稼働の低い人材が出やすい。固定のラインがなく、誰が育成にコミットするかが曖昧になる</td></tr>
          <tr><td className="hl">マトリックス型</td><td>専門性（機能ライン）とプロジェクトの機動性を両立できる</td><td>指揮系統が二重になり、ManagerとPMの調整コストや板挟みが生じやすい</td></tr>
          <tr><td className="hl">セル型</td><td>小チームが現場で素早く判断でき、セルを増やす形でスケールしやすい</td><td>セル間の連携・標準化が難しく、全体最適が効きにくい</td></tr>
          <tr><td className="hl">スクラム型</td><td>短いサイクルで適応的に進め、チームの自律性が高い</td><td>成熟したチームと規律が前提。大規模化には別の仕組み（LeSS等）が要る</td></tr>
        </tbody>
      </table>

      <Heading num="03">状況別の組織体制の選び方</Heading>
      <p>正解は1つではなく、<Term>チームのフェーズ（状況）にフィットする型を選ぶ</Term>ことが重要です。まず「今うちのチームはどの状況か」をラベリングし、それに合った体制を選びます。</p>
      <table>
        <thead>
          <tr><th>状況</th><th>選ぶ型</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">立ち上げ</td><td>文鎮型</td><td>間にリーダーがいると意思決定が遅くなる。失敗して学ぶPDCAを速く回す</td></tr>
          <tr><td className="hl">新規事業スタジオ</td><td>プロジェクト型</td><td>事業A・Bごとにチームを組み、終わったメンバーを他プロジェクトへ流す</td></tr>
          <tr><td className="hl">拡大フェーズ</td><td>構造型</td><td>これ以外だと組織が壊れる</td></tr>
          <tr><td className="hl">成功の継続</td><td>ハイブリッド</td><td>既存は構造型、新規はマネージャーがコミットする文鎮型</td></tr>
          <tr><td className="hl">軌道修正</td><td>文鎮型に戻す</td><td>マネージャーが現場に降りて直接把握する</td></tr>
          <tr><td className="hl">立て直し</td><td>プロジェクト型</td><td>SNS・SEO・AI記事など複数手法を並行し、ダメなものは潰して筋のある所に人を寄せる</td></tr>
        </tbody>
      </table>
      <p><Term>よくある失敗</Term>は、立ち上げから拡大フェーズに入っているのに文鎮型のまま放置すること、あるいは立ち上げなのに「3人に1人リーダー必須」といった固定ルールを適用して遅くなることです。同じ会社内でも事業・部署ごとに文鎮型と構造型を<Term>併存させる</Term>のが自然で、全部を同じ型に統一しようとするのは良くありません。</p>

      <Heading num="04">文鎮型から構造型への移行</Heading>
      <p>人数が増えて文鎮型が限界に来たら構造型へ移行しますが、最大の悩みは「<Term>間に置ける人がいない</Term>」ことです。逃げ道が2つあります。</p>
      <Steps>
        <li><strong>一部構造型</strong>：全部ではなく、小さなチーム単位でもよいのでチームリーダーを置く。</li>
        <li><strong>補佐スタッフ</strong>：マネージャーの横に配置し、承認・会議・報告資料・数値管理表の更新・メンバーの稼働管理などのマネジメント業務を補佐する。次期マネージャー育成の場にもなる。</li>
      </Steps>
      <Aside label="注意">
        補佐スタッフは<Term>メンバーの上司ではない</Term>立て付けにすることが重要です。上司扱いにすると「なんであの人が」という時期尚早な反発が起きやすくなります。任せられるのは、数値・アクション管理表の更新、メンバーの稼働把握、一部の会議参加・進行、報告資料の準備などです。
      </Aside>

      <Heading num="05">構造型における「階層飛ばし」への対処</Heading>
      <p>メンバーがチームリーダーBを飛び越えて、マネージャーAに直接訴えてくることがあります。これは<Term>禁止しなくてよい</Term>ものです（禁止すると不満が別の形で溜まります）。ただしAが「B最悪ですね、僕から言っときます」と<Term>メンバーにコミットしてBを批判してはいけません</Term>。Bからは信用されていないと感じられ、メンバーからも「Bを選んだのは誰ですか」と、かえってAの信頼を失います。</p>
      <p>正しい対処は次の2つです。(1)メンバーには「Bさんを信頼している」と伝える。(2)Bには「メンバーがこう言っていた。今後どう対応するか考えてほしい」と委ねる。Aは参考情報として聞くにとどめ、<Term>自分で対処しない</Term>のが原則です。これはCEOと幹部のあいだでも同じ構造の罠になります。</p>

      <Heading num="06">Willを聞く意味と聞き方</Heading>
      <p><Term>Will</Term>（やりたいこと・意欲）は大事ですが、<Term>Willに振り回されるのは良くありません</Term>。Willを聞く根本的な理由は、Can（スキル）と同様に、<Term>成果を最大化するアサインのための情報収集</Term>です。義務でも善意でもなく、アセット把握のために聞く ― この位置づけを、聞く前に本人へ伝えておくことが肝心です。</p>
      <Analogy label="💡 聞き方の枕言葉">
        「あなたにお願いしたい業務は、最終的には私が決めます。しかし、あなたがどんなことをやってみたいかを知っておくことは、あなたやチームがより良い仕事をするためにとても大事だと思っているので、じっくり聞かせてください。」 ― こう最初に言い切ることで、なぜ聞かれているのかが伝わり、たとえ叶えられなくてもマネージャーを恨まずに済みます。優しいマネージャーほど叶えようとして会社の目的とズレ、結果的にメンバーも会社も不幸になるので注意が要ります。
      </Analogy>

      <Heading num="07">Will × Can の4つのアサイン領域</Heading>
      <p>WillとCanの高低を掛け合わせると、アサインは4つの領域に分かれます。</p>
      <table>
        <thead>
          <tr><th></th><th>Can 高</th><th>Can 低</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Will 高</td><td><strong>最適アサイン</strong>（やる気もあり成果も出る）</td><td><strong>ポテンシャルアサイン</strong>（やる気はあるがすぐ成果は出ない）</td></tr>
          <tr><td className="hl">Will 低</td><td><strong>淡々アサイン</strong>（できるがやりたくはない）</td><td><strong>絶望アサイン</strong>（できないしやりたくない＝人が去るゾーン）</td></tr>
        </tbody>
      </table>
      <p><Term>最適アサイン</Term>がベストで、<Term>絶望アサインは原則避けます</Term>。WillもCanも把握していないと、知らないうちに絶望アサインを続けて人が去ることがあります。もっとも、大企業のローテーションでは最適アサインはそもそも少なく、<Term>淡々・ポテンシャルアサインを受け入れる心構え</Term>も必要です。</p>

      <Heading num="08">淡々アサインの3つの扱い方</Heading>
      <p>「できるが、やりたくはない」仕事です。会社として必要な人数も多く、<Term>100%淡々にしない</Term>ことが重要です。</p>
      <Steps>
        <li><strong>お願いする</strong>：「うちの会社にとって必要なこと」「あなたにしかできないこと」として助けてほしいと伝える。期間限定であること、業務の100%ではないこと（例：7割淡々＋3割ポテンシャル）も明示する。</li>
        <li><strong>工夫の余地を伝える</strong>：「本当に工夫の余地はないか」と問い、AI活用・工程変更・スキル拡張など新しい可能性を示してWillを上げる。</li>
        <li><strong>成長課題として位置づける</strong>：「なぜ希望通りの仕事ができないか分かりますか。あなたの課題はここにあり、淡々アサインの要素がその克服に含まれている」と、将来の最適・ポテンシャルアサインへの道筋として説明する。</li>
      </Steps>
      <p>淡々アサインを放置すると「このままでいいのか」となり、離職につながりやすくなります。<Term>最適5〜6割、ポテンシャル2割、淡々2割</Term>のようなポートフォリオで握るイメージが有効です。</p>

      <Heading num="09">ポテンシャルアサインの注意</Heading>
      <p>Willが高くCanが低い領域では、<Term>密なフォロー（マイクロマネジメント）が前提</Term>です。2日に1回は状況確認・アドバイス・一緒に手を動かす、といった関わりが要ります。放置するとできないままWillも下がり、絶望アサインへ落ちてしまいます。「やりたいと言ったのにできない」で対立するパターンも多いので、振り返り（なぜできなかったか・次はどうすればよかったか）を一緒に行い、折れずに次のチャレンジへつなげます。</p>
      <p>優先順位としては、<Term>最適＞ポテンシャル＞淡々</Term>です。最適アサイン以外では、<Term>ポテンシャル→最適の方が淡々→最適より行きやすい</Term>傾向があります。Willはコントロールしにくく、Canは習熟で上がるためで、特に若い人ほどこの傾向が強く出ます。</p>

      <Heading num="まとめ">フェーズで器を選び、Will×Canで配置する</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>管理幅は5〜10名</h4><p>7名でパツパツ。人数が限界を超えたら構造を変える合図です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>型はフェーズで選ぶ</h4><p>文鎮型・構造型・プロジェクト型を、状況に合わせて併存・移行させます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>Will×Canで最適配置</h4><p>絶望を避け、淡々を100%にせず、ポテンシャルを密に伴走させます。</p></Card>
      </CardGrid>

      <p>器と配置が決まったら、次は仕事を実際に「渡す」段です。<Link href="/management/org/delegation">権限委譲</Link>へ進みましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/org/delegation" tag="マネジメント">権限委譲</RelatedLink>
                    <RelatedLink href="/management/individual/onboarding" tag="マネジメント">採用・オンボーディング・育成</RelatedLink>
                    <RelatedLink href="/management/team/operation" tag="マネジメント">チーム運営と3つの力</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
