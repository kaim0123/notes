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
  title: "リーダーシップの実践",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>リーダーシップの実践 ― PM理論と3つのスタイル</h1>
        <Lead>
          リーダーシップに万能の正解はありません。だからこそ、自分の型を見つけるための<Term>枠組み</Term>が要ります。ここでは日本発の<Term>PM理論</Term>で「良きリーダーの2軸」を押さえ、それを実現する<Term>カリスマ・サーバント・オーセンティック</Term>の3スタイルを見ていきます。特性論から現代までの理論の変遷は<Link href="/management/org/theory">組織・リーダーシップ理論の歴史</Link>で扱うので、本ページは「現場でどう発揮するか」に絞ります。
        </Lead>
      </Hero>

      <Heading num="01">偉人論から心理現象へ</Heading>
      <p>古代ギリシャ以来、リーダーシップ研究は長らく<Term>偉人論（特性論）</Term>でした。カエサルやナポレオンといった歴史上の偉人を取り上げ、その資質 ― 雄弁・野心・独立性・攻撃性 ― に学ぶスタイルです。しかしこの見方には、「そもそも私たちはどんなときに、誰をリーダーと感じるのか」という<Term>心理的な側面</Term>が抜けていました。20世紀半ばから、リーダーシップは<Term>心理現象</Term>として捉え直され、リーダーとフォロワーの心の中で何が起きているかが研究されるようになります。その代表的な成果が、次に見るPM理論です。</p>

      <Heading num="02">PM理論 ― 良きリーダーの2軸</Heading>
      <p><Term>PM理論</Term>は、心理学者の<Term>三隅二不二（みすみ・じゅうじ）</Term>が1960年代に提唱した、日本発のリーダーシップ理論です。三隅は日本に<Term>グループダイナミクス（集団力学）</Term>を広めた研究者で、半世紀以上を経てもPM理論は世界的にリーダーシップ論の基礎枠組みとして使われています。リーダーの具体的な手法は人や状況で千差万別ですが、その背後には<Term>一貫して共通する2種類の心への働きかけ</Term>がある、というのが理論の核です。</p>
      <table>
        <thead>
          <tr><th>軸</th><th>名称</th><th>働きかけの中身</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">P</td><td>パフォーマンス</td><td>アウトプット（ゴール）へ向かわせる力。「こっちを目指そう」「到達したらこうなる」と方向づける</td></tr>
          <tr><td className="hl">M</td><td>メンテナンス</td><td>インプット（エネルギー補給）の側。疲弊せず「ここにいたい」と思える場・状況を整える</td></tr>
        </tbody>
      </table>
      <p><Term>P</Term>はゴールへ向かわせる働きかけで、共感型から「黙ってついてこい」型まで表出は多様ですが、共通するのは「ゴールに向かおうと思わせる心へのタッチ」です。<Term>M</Term>は、ひたすら走るだけでは人も組織も疲弊するため、リソースを与え、心を慮り、仲間と手を取り合える場をつくる働きかけです。気持ちへのタッチでも仕組みへのタッチでも構いません。両軸のバランスが取れたとき、人は組織で力を発揮できます。</p>

      <Heading num="03">4タイプの自己診断 ― 「熱いリーダー」を目指す</Heading>
      <p>PMの2軸を組み合わせると、リーダーは4タイプに分かれます。大切なのは、<Term>自分がどのタイプに偏りがちかを自己診断し、足りない軸を補っていく</Term>ことです。</p>
      <table>
        <thead>
          <tr><th>タイプ</th><th>特徴</th><th>他者からの印象</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">P強・M弱</td><td>成果は出させるが、配慮・維持が弱い</td><td>「きつい上司」</td></tr>
          <tr><td className="hl">M強・P弱</td><td>居心地は良いが、ゴールへ向かわせる力が弱い</td><td>「ぬるい上司」</td></tr>
          <tr><td className="hl">P弱・M弱</td><td>両方とも弱い</td><td>非効果的</td></tr>
          <tr><td className="hl">P強・M強</td><td>両方をバランスよく発揮</td><td>「熱いリーダー」（目指す姿）</td></tr>
        </tbody>
      </table>
      <p>ここでの<Term>「熱い」</Term>は熱血・バリバリ型という意味ではありません。<Term>フォロワーの心が温まり</Term>、「ゴールに向かおう」「ここに居続けて頑張ろう」と思える状態をつくれるリーダーを指します。PM理論の真価は、正解の手法を一つに固定しない点にあります。Pの出し方もMの出し方も自分なりに見つけるしかなく、PM理論はその<Term>「自分流」を探すためのメタな枠組み</Term>を与えてくれます。</p>

      <Heading num="04">3つのスタイル ― P・Mをどう実現するか</Heading>
      <p>では、P・Mを具体的にどう発揮するのか。リーダーシップ研究は代表的な3つのスタイルを提示してきました。スタイルは「How（技）」の話であり、状況に応じて使い分けます。</p>
      <table>
        <thead>
          <tr><th>スタイル</th><th>特徴</th><th>効きやすい状況</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">カリスマ型</td><td>力強い信念を示し、行動で見せる（1970年代〜）</td><td>組織・社会が危機に陥ったとき</td></tr>
          <tr><td className="hl">サーバント型</td><td>傾聴・共感・癒し・気づき・説得で下支えする</td><td>平常時で、メンバーが成熟しているとき</td></tr>
          <tr><td className="hl">オーセンティック型</td><td>人格・誠実さという「心（Why）」で人を動かす（2000年代〜）</td><td>技の中心に常に据えるべき土台</td></tr>
        </tbody>
      </table>
      <p><Term>カリスマ型</Term>は、集団が揺らぐ危機に力強く方向を指し示すスタイルです。ジャンヌ・ダルクやナポレオンのように、社会の危機にはカリスマが現れます ― これは良くも悪くも<Term>DNAに刻まれた人間の特徴</Term>だと説明されます。<Term>サーバント型</Term>はその真逆で、平常時に自立したメンバーの力を引き出す下支えとして機能します。カリスマが「引っ張り上げる」なら、サーバントは「引き出す」アプローチです。</p>
      <p>そして<Term>オーセンティック型</Term>は、「カリスマ性や場づくりという<Term>技</Term>だけが本当にリーダーシップなのか」という問いから生まれました。人が最終的についていきたいと思う理由は、その人の<Term>人格・正義・誠実さ</Term>にある、という考え方です。典型例は<Term>稲盛和夫</Term>で、京セラ・KDDI・JALの3社を成功に導いた本人が「成功理由は<Term>正しいことを追求するという強さ</Term>」と語りました。日本資本主義の父<Term>渋沢栄一</Term>も「<Term>道義経済一致</Term>（道理にかなって利益も出る）」を掲げています。技ではなく<Term>心の部分</Term>こそが人々を共感させ、明確なゴールを与えるのです。</p>

      <Heading num="05">オーセンティシティの5要素</Heading>
      <p>ついていきたいと思わせる<Term>オーセンティシティ（誠実さ・真正さ）</Term>は、次の5つの要素で構成されます。これらが整うと「この人はゴールに一直線で曇りがなく、人を傷つけない」という納得感が生まれます。</p>
      <table>
        <thead>
          <tr><th>要素</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">明確な理想像・目的</td><td>こういう社会・集団にしたい、という一直線の姿勢</td></tr>
          <tr><td className="hl">真心をもった活動</td><td>実践において誠実であること</td></tr>
          <tr><td className="hl">価値観</td><td>何が良く、何が悪いかの基準を持っている</td></tr>
          <tr><td className="hl">自己統制</td><td>自分を自分でコントロールできている</td></tr>
          <tr><td className="hl">良き人間関係</td><td>人々と良き関わり合いを持っている</td></tr>
        </tbody>
      </table>

      <Heading num="06">リーダーシップを高める2ステップ</Heading>
      <p>自分のリーダーシップを育てたい人が取り組むべきことは、2つに集約されます。</p>
      <p>第一は<Term>自己認識</Term>です。自分のパーソナリティ、得意なスタイル、集団への貢献パターンを把握する。PMの2軸で自分がどこに偏るかを知ることが出発点になります。第二は<Term>他者との関わり方の構築</Term>です。リーダーシップは究極的には他者とのコミュニケーションであり、人付き合いを整えていく姿勢そのものがリーダーシップの形をつくります。</p>
      <p>状況に応じてカリスマ的にもサーバント的にも振る舞いつつ、<Term>中心には常にオーセンティシティを据える</Term> ― この2つが整ったとき、あなた独自のリーダーシップが見えてきます。Mの側面 ―「ここにいたい」と思える場づくり ― は、<Link href="/management/team/psychological-safety">心理的安全性</Link>とまっすぐつながります。また、ゴールへ向かわせるPの力は、メンバーの<Link href="/management/individual/motivation">内発的動機</Link>に火をつけることでいっそう強まります。</p>
      <Aside label="チーム運営の中で">リーダーシップは単独で機能する技ではなく、目標設定や日々の対話と組み合わさって効きます。全体像は<Link href="/management/team/operation">チーム運営と3つの力</Link>で扱っています。</Aside>

      <Analogy label="💡 たとえるなら">
        PM理論は<Term>焚き火</Term>に似ています。P（パフォーマンス）は薪をくべて炎を高くする力、M（メンテナンス）は風から火を守り、消えないよう場を整える力です。どちらか一方では、燃え上がってすぐ消えるか、暖かいだけで前に進みません。両方がそろって初めて、人の心が温まり、長く燃え続ける「熱いリーダー」の火になります。
      </Analogy>

      <Heading num="まとめ">2軸を知り、心を土台に技を使い分ける</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>PMの2軸で自己診断</h4><p>P（ゴールへ向かわせる）とM（場を維持する）。自分の偏りを知り、足りない軸を補います。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>スタイルは使い分ける</h4><p>危機にはカリスマ、平常・成熟時にはサーバント。状況に応じて技を選びます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>中心はオーセンティシティ</h4><p>技の土台は人格と誠実さ。稲盛和夫や渋沢栄一が示した「心」こそが人を動かします。</p></Card>
      </CardGrid>
      <p>理論の歴史的な流れをたどりたい場合は<Link href="/management/org/theory">組織・リーダーシップ理論の歴史</Link>へ、リーダーシップを含むチーム運営全体は<Link href="/management/team/operation">チーム運営と3つの力</Link>へ進みましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/team" tag="マネジメント">チームのマネジメント（メゾ）</RelatedLink>
                    <RelatedLink href="/management/org/theory" tag="マネジメント">組織・リーダーシップ理論の歴史</RelatedLink>
                    <RelatedLink href="/management/team/operation" tag="マネジメント">チーム運営と3つの力</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
