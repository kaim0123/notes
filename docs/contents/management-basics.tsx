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
  title: "人事マネジメントとは",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>人事マネジメントとは ― 人を通じて成果を出す</h1>
        <Lead>
          どんな戦略も、それを実行するのは人です。<Term>人事マネジメント</Term>とは、組織の目的を達成するために「人」という資源を採用・育成・配置・評価し、その力を最大限に引き出す一連の営みです。ここでは全体像として、人事の目的・人的資本経営・経営戦略との関係・組織と個人の関係、そして人事部と現場マネージャーの役割分担を押さえます。
        </Lead>
      </Hero>

      <Heading num="01">人事の目的 ― 「管理」から「価値創造」へ</Heading>
      <p>人事の仕事は、かつては勤怠や給与計算といった<Term>労務管理</Term>が中心で、「間違いなく回す」ことが主目的でした。しかし現在の人事の目的は、単なる管理ではなく<Term>組織の成果を最大化すること</Term>に置かれます。適切な人を採り、育て、正しく評価し、意欲高く働ける環境を整える ― この一連を通じて事業を前に進めるのが人事の存在意義です。</p>
      <p>つまり人事は「守り」の機能だけでなく、事業成長を駆動する「攻め」の機能でもあります。狭く「採用と育成」と捉えるか、「事業成長のためのHR施策すべて」と捉えるかで、人事が果たす役割の範囲は大きく変わります。</p>

      <Heading num="02">人的資本経営 ― 人はコストではなく資本</Heading>
      <p><Term>人的資本経営</Term>とは、人材を「コスト（費用）」ではなく「資本（投資対象）」と捉え、その価値を高める投資を通じて中長期的な企業価値の向上につなげる考え方です。従来の会計では人件費は削減対象の費用でしたが、人的資本経営では、教育・育成・働きやすさへの支出を「将来のリターンを生む投資」として位置づけます。</p>
      <Analogy label="💡 たとえるなら">
        人を「消耗品」と見るか「設備投資」と見るかの違いです。消耗品なら安く早く使い切る発想になりますが、高性能な設備なら、メンテナンスと改良に投資してより大きな産出を狙います。人的資本経営は後者の目線で人を捉え直す考え方です。
      </Analogy>

      <Heading num="03">経営戦略と人事戦略 ― 逆算でつながる</Heading>
      <p>人事戦略は、経営戦略から<Term>逆算</Term>して立てられます。「会社がどこを目指すか」という経営の方向性があって初めて、「そのためにどんな人材が、いつ、どれだけ必要か」という人事の打ち手が決まります。経営戦略と切り離された人事施策 ― 流行りの制度をとりあえず導入するようなもの ― は、往々にして現場に根づきません。</p>
      <Diagram caption="経営戦略から逆算して人事戦略・施策へと落ちていく">
        <svg viewBox="0 0 600 120" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={40} width={150} height={44} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={95} y={60} fill="#f2f2f2" fontSize="12" textAnchor="middle">経営戦略</text>
          <text x={95} y={76} fill="#9a9a9a" fontSize="10" textAnchor="middle">どこを目指すか</text>
          <rect x={225} y={40} width={150} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={300} y={60} fill="#f2f2f2" fontSize="12" textAnchor="middle">人事戦略</text>
          <text x={300} y={76} fill="#9a9a9a" fontSize="10" textAnchor="middle">どんな人材が要るか</text>
          <rect x={430} y={40} width={150} height={44} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={505} y={60} fill="#f2f2f2" fontSize="12" textAnchor="middle">人事施策</text>
          <text x={505} y={76} fill="#9a9a9a" fontSize="10" textAnchor="middle">採用・育成・制度</text>
          <line x1={170} y1={62} x2={223} y2={62} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowB)" />
          <line x1={375} y1={62} x2={428} y2={62} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowB)" />
          <defs>
            <marker id="arrowB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
        </svg>
      </Diagram>
      <p>この逆算がうまく回るかは、現場の<Link href="/management/team/goals">目標設定</Link>の質にも直結します。経営の大目標を各チームの状態目標へブレークダウンできて初めて、戦略は実行に移ります。</p>

      <Heading num="04">組織と個人の関係 ― 貢献と対価の交換</Heading>
      <p>組織と個人は、<Term>貢献</Term>と<Term>対価</Term>を交換する関係にあります。個人は労働・スキル・成果を提供し、組織は報酬・成長機会・意味を返します。この交換が個人にとって割に合わなくなれば人は去り、組織にとって割に合わなくなれば関係は続きません。健全なマネジメントとは、この交換のバランスを長期にわたって保ち続けることでもあります。</p>
      <p>近年は、個人のキャリア自律や多様な働き方が広がり、「会社が個人を囲い込む」関係から「互いに選び合う」関係へと重心が移っています。だからこそ、個人の意欲（Will）や強み（Can）を把握し、成果につながるアサインを設計する視点が重要になります。</p>

      <Heading num="05">人事部と現場マネージャーの役割</Heading>
      <p>人事の実務は、<Term>人事部（セントラル）</Term>と<Term>現場マネージャー（ライン）</Term>の分業で成り立ちます。両者の役割を混同すると、「制度はあるのに現場で機能しない」あるいは「現場の判断が全社でバラバラ」といった問題が起きます。</p>
      <table>
        <thead>
          <tr><th>役割</th><th>人事部（セントラル）</th><th>現場マネージャー（ライン）</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">採用</td><td>母集団形成・選考プロセス設計・オファー条件</td><td>要件定義・面接・口説き（アトラクト）</td></tr>
          <tr><td className="hl">育成</td><td>研修制度・キャリアパス整備</td><td>日々のOJT・1on1・個別育成計画</td></tr>
          <tr><td className="hl">評価</td><td>評価制度の設計・運用・調整</td><td>目標設定・フィードバック・評価の実施</td></tr>
          <tr><td className="hl">労務</td><td>就業規則・勤怠・労働時間の管理</td><td>メンバーの状態把握・過重労働の予防</td></tr>
        </tbody>
      </table>
      <p>近年は、人事部が事業部門に伴走する<Term>HRBP（HRビジネスパートナー）</Term>という役割も広がっています。制度を配るだけでなく、現場マネージャーと一緒に組織課題を解く伴走者です。ただし、採用や育成の当事者はあくまで成果に責任を持つ現場マネージャーであり、人事はそれを強力に支える立場だという原則は変わりません。</p>

      <Heading num="まとめ">人事マネジメントの基礎</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>目的は成果の最大化</h4><p>人事は勤怠管理にとどまらず、採用・育成・評価・環境整備を通じて事業を前に進める機能です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>人は資本</h4><p>人的資本経営では、人への支出を将来のリターンを生む投資と捉え直します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>経営から逆算する</h4><p>人事戦略は経営戦略から逆算して立て、現場の目標設定へと落とし込みます。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>セントラルとライン</h4><p>人事部が制度を、現場マネージャーが日々の運用を担い、両者の分業で機能します。</p></Card>
      </CardGrid>
      <p>基礎を押さえたら、次は対象を一人ひとりに絞った<Link href="/management/individual">個人のマネジメント（ミクロ）</Link>へ進みましょう。採用から労務までを見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/individual" tag="マネジメント">個人のマネジメント（ミクロ）</RelatedLink>
                    <RelatedLink href="/management/team/operation" tag="マネジメント">実践編 ― チーム運営と3つの力</RelatedLink>
                    <RelatedLink href="/management/theory" tag="マネジメント">マネジメント理論家</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
