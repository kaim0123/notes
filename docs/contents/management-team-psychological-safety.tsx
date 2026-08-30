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
  title: "心理的安全性",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>心理的安全性 ― 率直に言える場をつくる</h1>
        <Lead>
          職場の生産性を高める、最もシンプルで効果的な方法は何でしょうか。意外にも、それは<Term>あなたが笑顔でいること</Term>から始まります。楽しんで働けること、仲間と関わり合えること、そして率直にものが言えること ― これらが生産性と創造性に直結することは、いまや科学的に裏づけられています。ここでは、その中核概念である<Term>心理的安全性</Term>を、<Link href="/management/team">チームのマネジメント（メゾ）</Link>の土台として掘り下げます。
        </Lead>
      </Hero>

      <Heading num="01">ウェルビーイングが生産性を生む</Heading>
      <p>職場の生産性を高める最も簡単な方法は、<Term>仕事を楽しみ、自分が笑顔でいる</Term>ことです。人は楽しんでいると、脳が「もっと楽しめるように」創意工夫をはたらかせ、仕事に前向きに取り組めます。逆に意味を感じられなくなると、意欲は下がっていきます。近年の経営学では、<Term>ウェルビーイング</Term>（幸せ・良き生き方）が生産性・創造性に直結することが実証され、研究の最前線は「職場で良き人生を歩むこと」へと回帰しています。集団の視点に広げれば、<Term>みんなが笑顔であること</Term>こそが、チームの生産性を高める条件です。</p>

      <Heading num="02">かつての日本の強さ ― コンベアラインの助け合い</Heading>
      <p>戦後日本の高度経済成長で生産性が高かった理由は、技術の高さ以上に、<Term>コンベアラインで隣の人を助け合っていた</Term>ことにあります。仲間関係がつくられ、仕事が社会のためになると感じられたからこそ、不良品の少ない高品質なものづくりが実現しました。一方、欧米では「<Term>自分の仕事は自分でやり切る</Term>」という個人主義的なジョブ観が強く、助け合いを前提としていませんでした。</p>
      <p>時代は流れ、ホワイトカラー労働・デスクワーク・テレワークが中心になるなかで、かつての助け合いは当たり前ではなくなり、社内競争的な働き方が一般化しました。だからこそ今、<Term>関わり合い・助け合い・つながり</Term>を意識的にデザインし直す必要があるのです。20世紀には自明だったことが、21世紀に再びエビデンスベースで重要性を取り戻しています。</p>

      <Heading num="03">関わり合いの3つのメリット</Heading>
      <p>研究で確認されている、関わり合いのメリットは次の3つです。</p>
      <table>
        <thead>
          <tr><th>メリット</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">助け合い</td><td>困ったときに助けられる職場は、メンバーのパフォーマンスが上がる</td></tr>
          <tr><td className="hl">情報フロー</td><td>自然なコミュニケーションを通じて、情報が組織のなかを循環する</td></tr>
          <tr><td className="hl">課題解決</td><td>人と人の間に落ちた仕事も、お互いに手を伸ばして拾い、解決できる</td></tr>
        </tbody>
      </table>

      <Heading num="04">『人を動かす』の6原則</Heading>
      <p>関わり合いを個人の心がけとしてどうつくるか。思想家<Term>デール・カーネギー</Term>の『人を動かす』には、後の研究でほぼ科学的に妥当と検証された原則が詰まっています。</p>
      <table>
        <thead>
          <tr><th>原則</th><th>ポイント</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">健全な関心を寄せる</td><td>相手そのものに、打算でなく素直な関心を向ける</td></tr>
          <tr><td className="hl">笑顔で接する</td><td>笑顔は伝染する。自分の笑顔が場をあたためる</td></tr>
          <tr><td className="hl">名前で呼びかける</td><td>名前を呼ばれることは、脳科学的にも重要な承認になる</td></tr>
          <tr><td className="hl">聞き手に回る</td><td>話すより聴く。相手に語ってもらう</td></tr>
          <tr><td className="hl">相手の関心事を話題にする</td><td>自分ではなく、相手が話したいことから入る</td></tr>
          <tr><td className="hl">相手にとって大切になる</td><td>「あなたは大切な存在だ」と伝わる関わりを持つ</td></tr>
        </tbody>
      </table>

      <Heading num="05">心理的安全性とは何か</Heading>
      <p>個人の心がけに対し、<Term>場のデザイン</Term>にあたる概念が<Term>心理的安全性（Psychological Safety）</Term>です。1999年に<Term>エドモンドソン</Term>教授が定義し、Googleの社内研究で生産性への決定的な効果が確認されたことで、世界的に注目されました。</p>
      <p>その定義は、チームのなかで「これを言ったら空気を悪くするかな」「個人攻撃と受け取られるかな」という心配なく、<Term>率直に発言できる</Term>状態です。ここで決定的に重要なのは、心理的安全性は<Term>ぬるい職場・居心地がいいだけの職場ではない</Term>という点です。むしろ、耳の痛いことも遠慮なく言い合えることを指します。</p>
      <Aside label="よくある誤解">「仲良しで衝突がない」ことと心理的安全性は別物です。心理的安全性が担保するのは、対立や失敗を率直に口に出せること。詳しくは<Link href="/management/team/conflict">コンフリクトマネジメント</Link>を参照してください。</Aside>

      <Heading num="06">心理的安全性 × 仕事の要求水準</Heading>
      <p>心理的安全性だけでは不十分で、<Term>仕事の要求水準も高いこと</Term>が必要です。この2軸を交差させると、職場は次の4象限に分かれます。</p>
      <table>
        <thead>
          <tr><th></th><th>要求水準：低い</th><th>要求水準：高い</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">心理的安全性：高い</td><td>ぬるい職場</td><td>学習する職場（理想）</td></tr>
          <tr><td className="hl">心理的安全性：低い</td><td>ぬるい職場</td><td>メンタルにきつい職場</td></tr>
        </tbody>
      </table>
      <p>心理的安全性が高く、要求水準も高いときにこそ、<Term>学習する職場</Term>が生まれます。高いゴールを目指しながら、互いに率直に意見が言える ― この状態が、最も生産性の高い職場です。目標そのものを高く保つ考え方は、<Link href="/management/individual/motivation">エンゲージメントと内発的動機づけ</Link>とも響き合います。</p>

      <Heading num="07">つくり方 ― 犯人探しをしない</Heading>
      <p>心理的安全性のつくり方の核心は、ただ一つ、<Term>犯人探しをしない</Term>ことです。問題行動が起きたとき、それを個人の性格の問題ととらえるのではなく、<Term>環境・構造の問題</Term>と考えます。行動科学の知見では、行動は「<Term>きっかけ → 行動 → 反応</Term>」という流れのなかで生まれます。だから、誰かのせいにする代わりに、この流れ（構造）そのものをデザインし直すのです。</p>
      <p>問題を「職場の問題」としてみんなで解決する姿勢こそが、心理的安全性を担保する唯一の道です。個人を責める文化からは、率直な発言も、失敗からの学習も生まれません。</p>

      <Analogy label="💡 たとえるなら">
        心理的安全性は、<Term>スポーツチームのロッカールーム</Term>に似ています。強いチームのロッカールームは、和気あいあいとぬるいのではありません。「あのパスは判断が遅い」と率直に指摘し合えるのに、それが人格攻撃にはならない ― だからこそミスを隠さず、次のプレーが良くなります。高い目標(要求水準)と、率直に言い合える空気(心理的安全性)。この両方がそろって、はじめてチームは学習し、勝ち続けられます。
      </Analogy>

      <Heading num="まとめ">率直さが学習を生む</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>まず自分が笑顔で</h4><p>ウェルビーイングは生産性と創造性に直結します。笑顔と楽しさが出発点です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>関わり合いを設計する</h4><p>助け合い・情報フロー・課題解決。希薄になった今こそ意識的につなぎます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>心理的安全性は率直さ</h4><p>ぬるさではなく、耳の痛いことも言い合える状態。1999年エドモンドソンの定義です。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>高い要求と両立させる</h4><p>安全性×高い要求水準で「学習する職場」に。犯人探しをやめ、構造で解決します。</p></Card>
      </CardGrid>
      <p>最も大切なのは、あなたが笑顔でいること、そして仲間も笑顔にできるよう場を整えることです。個人の側でこうした強さを支えるのが<Link href="/management/individual/capital">心理資本（レジリエンス）</Link>であり、場の側で支えるのが心理的安全性 ― この両輪で、チームは健やかに力を発揮します。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/team" tag="マネジメント">チームのマネジメント（メゾ）</RelatedLink>
                    <RelatedLink href="/management/team/efficacy" tag="マネジメント">組織効力感</RelatedLink>
                    <RelatedLink href="/management/team/conflict" tag="マネジメント">コンフリクトマネジメント</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
