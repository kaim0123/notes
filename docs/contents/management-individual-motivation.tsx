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
  Timeline,
  TimelineItem,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "モチベーション理論の歴史",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>モチベーション理論の歴史 ― 人はなぜ働くのか</h1>
        <Lead>
          「どうすれば人は意欲的に働くのか」という問いへの答えは、100年かけて大きく塗り替えられてきました。<Term>アメとムチ</Term>で動く経済人モデルから始まり、人間関係、心の中の欲求、動機づけが生まれる過程、そして<Term>内発的動機づけ</Term>へ。この歴史をたどると、現代のエンゲージメントや心理的安全性がどこから来たのかが見えてきます。ここは<Link href="/management/individual">個人のマネジメント（ミクロ）</Link>の第4節「モチベーション」を、理論の系譜として深掘りするページです。
        </Lead>
      </Hero>

      <Heading num="01">見取り図 ― 関心はどう移ってきたか</Heading>
      <p>モチベーション研究の関心は、大きく「外側 → 内側」「静的 → 動的」へと移動してきました。最初は<Term>お金や罰</Term>という外的な刺激に注目し、次に人の<Term>心の中の欲求</Term>へ、さらに欲求がどう行動に変わるかという<Term>過程</Term>へ、そして最後に、報酬がなくても湧いてくる<Term>内発的な動機</Term>へと焦点が深まっていきます。</p>
      <Timeline>
        <TimelineItem era="1910s">科学的管理法 ― 経済的インセンティブ</TimelineItem>
        <TimelineItem era="1920-30s">人間関係論 ― ホーソン実験</TimelineItem>
        <TimelineItem era="1940-60s">内容理論 ― 欲求に注目</TimelineItem>
        <TimelineItem era="1960s">過程理論 ― 動機づけの仕組み</TimelineItem>
        <TimelineItem era="1970-80s">内発的動機づけ ― 自己決定理論</TimelineItem>
        <TimelineItem era="2000s-">エンゲージメント・心理的安全性</TimelineItem>
      </Timeline>
      <p>大きくは<Term>内容理論</Term>（何が人を動機づけるか＝欲求の中身）と<Term>過程理論</Term>（どのように動機づけられるか＝心の働き）の2系統に分かれます。以降はこの流れに沿って、代表的な理論を順に見ていきます。</p>

      <Heading num="02">前史 ― 経済人から社会人へ</Heading>
      <p>最初期の答えは<Term>科学的管理法</Term>（F.W.テイラー、1911年）でした。作業を分解して標準時間を定め、出来高に応じて賃金を払えば人は最も効率的に働く ― 人間を<Term>経済人</Term>（金銭で動く存在）と捉えるモデルです。生産性を飛躍させた一方、人を機械の部品のように扱う限界も抱えていました。</p>
      <p>これを覆したのが<Term>ホーソン実験</Term>（エルトン・メイヨーら、1924〜1932年）です。照明の明るさと生産性の関係を調べたところ、明るさそのものより「<Term>注目され、期待されている</Term>」という感覚や職場の人間関係が生産性を左右することが分かりました。ここから人間を<Term>社会人</Term>（人とのつながりの中で働く存在）と捉える<Term>人間関係論</Term>が生まれ、以降の研究は「心の中」へと向かっていきます。</p>
      <Aside label="ホーソン効果">観察・注目されること自体が行動を変える現象。以降のエンゲージメントや1on1の考え方の遠い源流にあたります。</Aside>

      <Heading num="03">内容理論 ― 「何が」人を動機づけるか</Heading>
      <p>1940〜60年代は、人の内側にある<Term>欲求</Term>そのものを解き明かそうとした時代です。「この欲求を満たせば人は動く」という発想で、複数のモデルが提案されました。</p>
      <table>
        <thead>
          <tr><th>理論</th><th>提唱者・年</th><th>要点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">欲求段階説</td><td>マズロー / 1943</td><td>生理→安全→社会的→承認→自己実現の5段階。低次が満たされると高次を求める</td></tr>
          <tr><td className="hl">ERG理論</td><td>アルダファ / 1969</td><td>生存(E)・関係(R)・成長(G)の3つ。段階を飛ばしたり後退したりし、同時にも働く</td></tr>
          <tr><td className="hl">二要因理論</td><td>ハーズバーグ / 1959</td><td>満足を生む「動機づけ要因」と、不満を防ぐだけの「衛生要因」は別物</td></tr>
          <tr><td className="hl">X理論・Y理論</td><td>マクレガー / 1960</td><td>人間観の前提。X=怠ける→統制、Y=自ら働く→権限委譲。前提が施策を決める</td></tr>
          <tr><td className="hl">欲求理論</td><td>マクレランド / 1961</td><td>達成・権力・親和の3欲求。人により支配的な欲求が違う</td></tr>
        </tbody>
      </table>
      <p>とりわけ実務への影響が大きいのが<Term>ハーズバーグの二要因理論</Term>です。給与・労働条件・対人関係といった<Term>衛生要因</Term>は、不足すると不満を生むものの、いくら満たしても「不満がない」状態止まりで、やる気そのものは生みません。やる気を生むのは、達成・承認・仕事そのものの面白さ・責任・成長といった<Term>動機づけ要因</Term>です。「給料を上げれば頑張る」が長続きしない理由を、この理論はうまく説明します。</p>
      <p>また<Term>マクレガーのX理論・Y理論</Term>は、マネージャーが持つ<Term>人間観</Term>そのものを問いました。「人は放っておくと怠ける（X）」と考えれば管理と統制に向かい、「人は条件が整えば自ら働く（Y）」と考えれば<Link href="/management/org/delegation">権限委譲</Link>へ向かう ― 前提が組織のマネジメントスタイルを丸ごと決めてしまう、という洞察です。</p>

      <Heading num="04">過程理論 ― 「どのように」動機づけられるか</Heading>
      <p>内容理論が「欲求の中身」を問うたのに対し、1960年代からは「その欲求が<Term>どういう心の計算を経て</Term>行動になるのか」という過程に関心が移ります。</p>
      <p>その中心が<Term>期待理論</Term>（ヴルーム、1964年）です。人のやる気は、次の3つの<Term>掛け算</Term>で決まると考えます。どれか1つがゼロなら、全体もゼロになるのがポイントです。</p>
      <Diagram caption="期待理論 ― 3つのどれか1つでも欠けると、やる気は生まれない">
        <svg viewBox="0 0 620 120" xmlns="http://www.w3.org/2000/svg">
          <rect x={10} y={30} width={150} height={54} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={85} y={53} fill="#f2f2f2" fontSize="12" textAnchor="middle">期待</text>
          <text x={85} y={70} fill="#9a9a9a" fontSize="9.5" textAnchor="middle">努力→成果は出せる</text>
          <text x={180} y={62} fill="#39ff6a" fontSize="18" textAnchor="middle">×</text>
          <rect x={200} y={30} width={150} height={54} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={275} y={53} fill="#f2f2f2" fontSize="12" textAnchor="middle">用具性</text>
          <text x={275} y={70} fill="#9a9a9a" fontSize="9.5" textAnchor="middle">成果→報酬につながる</text>
          <text x={370} y={62} fill="#39ff6a" fontSize="18" textAnchor="middle">×</text>
          <rect x={390} y={30} width={150} height={54} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={465} y={53} fill="#f2f2f2" fontSize="12" textAnchor="middle">誘意性</text>
          <text x={465} y={70} fill="#9a9a9a" fontSize="9.5" textAnchor="middle">その報酬に魅力がある</text>
          <text x={562} y={62} fill="#9a9a9a" fontSize="16" textAnchor="middle">=</text>
          <text x={590} y={58} fill="#c9ffd8" fontSize="11" textAnchor="middle">やる</text>
          <text x={590} y={72} fill="#c9ffd8" fontSize="11" textAnchor="middle">気</text>
        </svg>
      </Diagram>
      <p>「頑張っても成果を出せる気がしない（期待ゼロ）」「成果を出しても報われない（用具性ゼロ）」「報われても、その報酬に魅力がない（誘意性ゼロ）」 ― どれか1つでもゼロなら、人は動きません。同じ時期に、他の過程理論も登場します。</p>
      <table>
        <thead>
          <tr><th>理論</th><th>提唱者・年</th><th>要点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">期待理論</td><td>ヴルーム / 1964</td><td>やる気 ＝ 期待 × 用具性 × 誘意性。1つでもゼロなら動かない</td></tr>
          <tr><td className="hl">公平理論</td><td>アダムス / 1965</td><td>自分の「貢献÷報酬」の比率を他者と比べ、不公平を感じると是正行動をとる</td></tr>
          <tr><td className="hl">目標設定理論</td><td>ロック / 1968</td><td>具体的で挑戦的な目標＋フィードバックが高い業績を生む</td></tr>
        </tbody>
      </table>
      <p><Term>ロックの目標設定理論</Term>は、後の<Term>MBO</Term>や<Term>OKR</Term>の理論的な土台です。「具体的で、少し背伸びした目標」が人を伸ばすという発見は、実践編の<Link href="/management/team/goals">目標設定</Link>で扱う「7割見えて3割分からない野心的目標」の考え方に直結します。<Term>アダムスの公平理論</Term>は、評価や報酬に<Term>納得感</Term>がなぜ必要かを説明し、<Link href="/management/individual">評価</Link>の設計に効いてきます。</p>

      <Heading num="05">内発的動機づけ ― 報酬の「外」から「内」へ</Heading>
      <p>ここまでは、程度の差こそあれ「報酬でどう動かすか」という発想が残っていました。1970年代以降、これを根本から問い直したのが<Term>内発的動機づけ</Term>の研究です。人は面白さ・成長・意味そのものを求めて動く ― この内なる動機を、外的報酬がむしろ<Term>損なう</Term>ことがある、と示されました。</p>
      <p>その代表が、デシとライアンの<Term>自己決定理論（SDT）</Term>です。人には<Term>自律性</Term>（自分で決めている感覚）・<Term>有能感</Term>（できるという感覚）・<Term>関係性</Term>（人とつながっている感覚）という3つの心理的欲求があり、これらが満たされるほど内発的動機づけが高まります。金銭など外的報酬を与えると、かえってやる気が下がる<Term>アンダーマイニング効果</Term>（過正当化効果）も、この理論から説明されます。</p>
      <Aside label="フロー理論">チクセントミハイ（1975）は、挑戦と能力が釣り合ったときに人が没入する状態を「フロー」と呼びました。簡単すぎれば退屈、難しすぎれば不安 ― ちょうど良い難易度が没入を生むという知見は、目標設定やアサイン設計と響き合います。</Aside>
      <p>SDTの示す「自律性」は、Y理論や<Link href="/management/org/delegation">権限委譲</Link>とまっすぐつながります。「決められる範囲が広いほど自分ごと感が生まれ、大きな成果を生む」という実務の観察は、内発的動機づけの理論的な裏づけを持っているわけです。</p>

      <Heading num="06">現代の潮流 ― エンゲージメント・心理的安全性・3.0</Heading>
      <p>2000年代以降は、これらの蓄積が実務の言葉に翻訳されていきます。<Term>エンゲージメント</Term>（仕事や組織への自発的な貢献意欲）は、内発的動機づけを組織サーベイで測る試みといえます。エイミー・エドモンドソンの<Term>心理的安全性</Term>（1999年）は、対人リスクを恐れず発言・挑戦できる場が、学習と成果を生むことを示しました ― 関係性の欲求（SDT）が、チームの生産性に直結することの再発見です。</p>
      <p>これらを一般向けに束ねたのが、ダニエル・ピンクの<Term>モチベーション3.0</Term>（2009年）です。生存本能（1.0）、アメとムチ（2.0）に続く第3のOSとして、<Term>自律性（Autonomy）・熟達（Mastery）・目的（Purpose）</Term>を挙げました。これはSDTの3欲求をほぼなぞっており、100年の研究が「人は自ら選び、上達し、意味を感じるときに最も動く」という一点に収束してきたことを示しています。</p>

      <Heading num="07">実務への落とし込み</Heading>
      <p>理論は、現場の施策に翻訳してはじめて意味を持ちます。代表的な対応関係を整理します。</p>
      <table>
        <thead>
          <tr><th>理論</th><th>実務での使いどころ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">二要因理論</td><td>給与・環境（衛生要因）で不満をなくしたうえで、仕事の裁量・承認（動機づけ要因）で意欲を上げる</td></tr>
          <tr><td className="hl">期待理論</td><td>「頑張れば届く」「成果は報われる」「報酬に魅力がある」の3点が欠けていないか点検する</td></tr>
          <tr><td className="hl">公平理論</td><td>評価と報酬の納得感・説明責任を担保する。不透明さは不公平感を生む</td></tr>
          <tr><td className="hl">目標設定理論</td><td>具体的で挑戦的な目標を、フィードバックとセットで置く（<Link href="/management/team/goals">目標設定</Link>）</td></tr>
          <tr><td className="hl">自己決定理論</td><td>自律性・有能感・関係性を満たす。過度な金銭誘導や監視を避ける（<Link href="/management/org/delegation">権限委譲</Link>）</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        モチベーション理論の歴史は、人を<Term>火</Term>にたとえると分かりやすくなります。かつては「薪をくべれば（＝報酬を与えれば）燃える」と考えていました。しかし研究が進むほど、外から薪を足すより、<Term>もともと内側にある種火</Term>（面白さ・成長・意味）を消さないことが大事だと分かってきた ― 現代のマネジメントは「燃やす」より「消さない」に軸足を移しているのです。
      </Analogy>

      <Heading num="まとめ">100年の研究が収束した先</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>外側から内側へ</h4><p>金銭・罰から、欲求、過程、そして内発的動機づけへ。関心は人の心の奥へ深まってきました。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>内容理論と過程理論</h4><p>「何が動機づけるか」（マズロー・ハーズバーグ）と「どう動機づけられるか」（ヴルーム・ロック）の2系統があります。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>自律・熟達・目的</h4><p>SDTからモチベーション3.0まで、答えは「自ら選び、上達し、意味を感じる」に収束しています。</p></Card>
      </CardGrid>
      <p>個々の理論家の位置づけは<Link href="/management/theory">マネジメント理論家</Link>のページでも俯瞰できます。理論を踏まえたうえで、次は現場でどう意欲を設計するか ― <Link href="/management/team/goals">目標設定</Link>や<Link href="/management/org/delegation">権限委譲</Link>へ進みましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/individual" tag="マネジメント">個人のマネジメント（ミクロ）</RelatedLink>
                    <RelatedLink href="/management/theory" tag="マネジメント">マネジメント理論家</RelatedLink>
                    <RelatedLink href="/management/team/goals" tag="マネジメント">実践編 ― 目標設定</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
