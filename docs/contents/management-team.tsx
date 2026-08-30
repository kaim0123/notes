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
  title: "チームのマネジメント（メゾ）",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>マネジメント</Eyebrow>
        <h1>チームのマネジメント（メゾ） ― 協働を設計する</h1>
        <Lead>
          個人が集まれば自動的にチームになるわけではありません。<Term>メゾマネジメント</Term>は、チームや部署という単位を対象に、メンバーの力を掛け合わせて「1＋1を2より大きく」する営みです。チームを形づくり、率い、対話でつなぎ、対立を扱い、知を共有する ― この5つのテーマを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">チームビルディング ― 段階を踏んで育つ</Heading>
      <p><Term>チームビルディング</Term>とは、集まった個人を一つのチームへと育てる働きかけです。チームがどう成熟するかを示す古典が<Term>タックマンモデル</Term>で、次の段階を踏むとされます。</p>
      <Diagram caption="タックマンモデル ― チームは混乱を経て機能する段階へ育つ">
        <svg viewBox="0 0 620 90" xmlns="http://www.w3.org/2000/svg">
          <text x={60} y={30} fill="#f2f2f2" fontSize="12" textAnchor="middle">形成期</text>
          <text x={60} y={46} fill="#9a9a9a" fontSize="9" textAnchor="middle">Forming</text>
          <text x={185} y={30} fill="#f2f2f2" fontSize="12" textAnchor="middle">混乱期</text>
          <text x={185} y={46} fill="#9a9a9a" fontSize="9" textAnchor="middle">Storming</text>
          <text x={310} y={30} fill="#f2f2f2" fontSize="12" textAnchor="middle">統一期</text>
          <text x={310} y={46} fill="#9a9a9a" fontSize="9" textAnchor="middle">Norming</text>
          <text x={435} y={30} fill="#f2f2f2" fontSize="12" textAnchor="middle">機能期</text>
          <text x={435} y={46} fill="#9a9a9a" fontSize="9" textAnchor="middle">Performing</text>
          <text x={560} y={30} fill="#f2f2f2" fontSize="12" textAnchor="middle">散会期</text>
          <text x={560} y={46} fill="#9a9a9a" fontSize="9" textAnchor="middle">Adjourning</text>
          <line x1={95} y1={40} x2={150} y2={40} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowT)" />
          <line x1={220} y1={40} x2={275} y2={40} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowT)" />
          <line x1={345} y1={40} x2={400} y2={40} stroke="#39ff6a" strokeWidth="1.5" markerEnd="url(#arrowTg)" />
          <line x1={470} y1={40} x2={525} y2={40} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrowT)" />
          <defs>
            <marker id="arrowT" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" /></marker>
            <marker id="arrowTg" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#39ff6a" /></marker>
          </defs>
        </svg>
      </Diagram>
      <p>重要なのは、<Term>混乱期（Storming）</Term>を避けないことです。意見のぶつかり合いは失敗ではなく、機能するチームへ育つための通過点です。役割分担を考えるうえでは、メンバーが自然に担う役割を9つに類型化した<Term>ベルビン（Belbin）理論</Term>も参考になります。異なるタイプが噛み合うことでチームの<Term>多様性</Term>が力になります。そして機能するチームには「自分たちならやれる」という共有された確信 ―<Link href="/management/team/efficacy">組織効力感</Link>― が育ちます。</p>

      <Heading num="02">リーダーシップ ― 状況で使い分ける</Heading>
      <p><Term>リーダーシップ</Term>に唯一の正解はありません。状況・相手・目的によって有効なスタイルは変わります。代表的な理論を押さえておきましょう（特性論から変革型・奉仕型までの変遷は<Link href="/management/org/theory">組織・リーダーシップ理論の歴史</Link>で詳しく扱います）。</p>
      <table>
        <thead>
          <tr><th>理論</th><th>要点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">PM理論</td><td>成果を出す力（Performance）と集団を維持する力（Maintenance）の2軸でリーダー行動を捉える</td></tr>
          <tr><td className="hl">SL理論</td><td>部下の成熟度に応じて、指示型から委任型へとスタイルを変える（状況対応リーダーシップ）</td></tr>
          <tr><td className="hl">サーバントリーダーシップ</td><td>まず奉仕（支援）し、メンバーの成長を通じて成果を導く</td></tr>
          <tr><td className="hl">変革型リーダーシップ</td><td>ビジョンを示し、メンバーの内発的動機に火をつけて変化を起こす</td></tr>
        </tbody>
      </table>
      <p>とりわけ<Term>SL理論</Term>の「相手の習熟度でスタイルを変える」という発想は、<Link href="/management/org/structure">アサインの設計</Link>や<Link href="/management/org/delegation">権限委譲</Link>とも直結します。育ちきっていない相手には手厚く、育った相手には任せる ― この切り替えが要です。日本発のPM理論や、カリスマ・サーバント・オーセンティックの3スタイルは<Link href="/management/team/leadership">リーダーシップの実践</Link>で、業績と人の2軸でリーダーを捉える<Link href="/management/team/grid">マネジリアル・グリッド</Link>は別ページで詳しく扱います。</p>

      <Heading num="03">コミュニケーション ― 対話でつなぐ</Heading>
      <p>チームを動かすのは、日々の<Term>コミュニケーション</Term>です。技術として磨けるものが多く、代表的なものを挙げます。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>1on1</h4><p>定期的な1対1の対話。評価面談と違い、メンバーのための時間として関係と成長を支えます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ファシリテーション</h4><p>会議で議論を整理し、全員の参加と合意形成を促す進行技術。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>傾聴</h4><p>評価や助言を急がず、相手の話を受け止めて理解する聴き方。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>アサーション</h4><p>相手を尊重しつつ自分の考えも率直に伝える、対等な自己表現。</p></Card>
      </CardGrid>
      <p>会議運営も重要なテーマです。目的の不明確な会議はチームの時間を奪います。ファシリテーションで「何を決める場か」を明確にし、傾聴とアサーションで健全な対話を保つことが、チームの生産性を左右します。1on1・傾聴・アサーション・ファシリテーション・会議運営の具体的な技は<Link href="/management/team/communication">コミュニケーション</Link>で掘り下げます。こうした率直な対話が成り立つ土台となる<Link href="/management/team/psychological-safety">心理的安全性</Link>は、独立したテーマとして扱います。</p>

      <Heading num="04">コンフリクトマネジメント ― 対立を成果に変える</Heading>
      <p><Term>コンフリクト（対立）</Term>は、なくすべき悪ではありません。異なる視点がぶつかること自体は、より良い答えを生む源泉になり得ます。問題は対立の有無ではなく、それを<Term>建設的に扱えるか</Term>です。</p>
      <p>コンフリクトマネジメントには、対立の解消、利害を調整する<Term>交渉</Term>、根本原因に向き合う<Term>問題解決</Term>、そして当事者の<Term>感情マネジメント</Term>が含まれます。感情が高ぶった状態では論理は届かないため、まず感情を落ち着かせ、次に事実と論点を切り分け、共通の利益を探る ― という順序が基本です。課題・過程のコンフリクトとハーバード流交渉術（Win-Win）の詳細は<Link href="/management/team/conflict">コンフリクトマネジメント</Link>で扱います。</p>

      <Heading num="05">ナレッジマネジメント ― 知を組織の資産に</Heading>
      <p><Term>ナレッジマネジメント</Term>は、個人の中にある知を組織で共有し、活かす仕組みづくりです。鍵になるのが<Term>暗黙知</Term>と<Term>形式知</Term>の区別です。</p>
      <table>
        <thead>
          <tr><th>種類</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">暗黙知</td><td>言葉にしにくい、経験・勘・コツ。個人に属し、共有が難しい</td></tr>
          <tr><td className="hl">形式知</td><td>文書・マニュアル・数式など、言語化・記号化された知。共有しやすい</td></tr>
        </tbody>
      </table>
      <p>この2つの知が変換を繰り返して組織に広がる過程を説明したのが、野中郁次郎らの<Term>SECIモデル</Term>（共同化・表出化・連結化・内面化）です。属人的なコツをマニュアル化し、共有し、また個人の実践に落とし込む ― この循環が組織の学習を生みます。ドキュメントツールでの記録・共有は、その具体的な手段です。</p>

      <Analogy label="💡 たとえるなら">
        チームのマネジメントは<Term>オーケストラの指揮</Term>に似ています。優れた演奏者を集めても（採用）、それだけでは音楽になりません。パートを組み（チームビルディング）、テンポを示し（リーダーシップ）、互いの音を聴き合わせ（対話）、ずれを調整し（コンフリクト）、良い演奏を楽譜として残す（ナレッジ）。指揮者の仕事は、自分が一番大きな音を出すことではありません。
      </Analogy>

      <Heading num="まとめ">チームマネジメントの5テーマ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>チームビルディング</h4><p>混乱期を通過点として、機能するチームへ段階的に育てる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>リーダーシップ</h4><p>唯一解はない。相手の成熟度と状況でスタイルを使い分ける。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>コミュニケーション</h4><p>1on1・傾聴・アサーションは磨ける技術。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>コンフリクト</h4><p>対立は源泉。感情を鎮め、論点を分け、共通利益を探す。</p></Card>
        <Card><CardNumber>5</CardNumber><h4>ナレッジ</h4><p>暗黙知を形式知に変え、SECIの循環で組織に広げる。</p></Card>
      </CardGrid>
      <p>チームの内側を押さえたら、次はさらに視野を広げて<Link href="/management/org">組織のマネジメント（マクロ）</Link>へ進みましょう。制度と構造の話に移ります。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/management/org" tag="マネジメント">組織のマネジメント（マクロ）</RelatedLink>
                    <RelatedLink href="/management/team/rules" tag="マネジメント">実践編 ― ルールと相互理解</RelatedLink>
                    <RelatedLink href="/management/team/momentum" tag="マネジメント">実践編 ― 戦略方針とモメンタム</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
