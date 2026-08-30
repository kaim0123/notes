import type { Metadata } from "next";
import Link from "next/link";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DocsFooter,
  Analogy,
  Aside,
  Diagram,
  CardGrid,
  Card,
  CardNumber,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "財務三表の全体像",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>会計・財務</Eyebrow>
        <h1>財務三表の全体像 ― 決算書は3枚で会社を語る</h1>
        <Lead>
          <Term>決算書</Term>とは、企業が1年間に行った経済活動を数値で記録・集計したものです。会社がどれだけ成果を出し、いま何を持ち、現金がどう動いたか ― この3つを一覧化した書類で、すべての企業が毎年つくります。主役は<Term>財務三表</Term>（PL・BS・CF）。まずはこの3枚が「それぞれ何を表すか」を、図で大づかみにしましょう。
        </Lead>
      </Hero>

      <Heading num="01">決算書とは何か</Heading>
      <p>決算書は、会社の1年間の成績と、期末時点の状態を数値でまとめた書類です。中心となるのが次の3つ ― <Term>損益計算書（PL）</Term>・<Term>貸借対照表（BS）</Term>・<Term>キャッシュフロー計算書（CF）</Term>です。この3表を組み合わせて初めて、会社の全体像が見えます。</p>
      <table>
        <thead>
          <tr><th>名称</th><th>別名</th><th>何を表すか</th><th>イメージ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">損益計算書（PL）</td><td>Profit &amp; Loss</td><td><strong>1年間</strong>でどれだけ儲かったか（成績表）</td><td>5段の階段／風船</td></tr>
          <tr><td className="hl">貸借対照表（BS）</td><td>バランスシート</td><td><strong>期末時点</strong>でどんな財産をどう調達して持っているか</td><td>財産目録／豚の貯金箱</td></tr>
          <tr><td className="hl">キャッシュフロー計算書（CF）</td><td>―</td><td><strong>1年間</strong>で現金がどう動いたか</td><td>家計簿</td></tr>
        </tbody>
      </table>
      <p>ポイントは「対象とする時間の違い」です。PLとCFは<Term>1年間の動き（フロー）</Term>を、BSは<Term>期末時点のスナップショット（ストック）</Term>を表します。同じ会社を、動画で見るか写真で見るかの違いだと考えると整理しやすくなります。</p>

      <Heading num="02">3枚はそれぞれ別の問いに答える</Heading>
      <p>3表は「儲かったか・何を持っているか・現金は増えたか」という別々の問いに答えます。どれか1枚だけでは会社を語れません。</p>
      <Diagram caption="PLは1年の儲け、BSは期末の財産、CFは1年の現金の動きを表す">
        <svg viewBox="0 0 600 170" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={50} width={170} height={70} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={105} y={78} fill="#f2f2f2" fontSize="13" textAnchor="middle">PL（損益計算書）</text>
          <text x={105} y={98} fill="#9a9a9a" fontSize="10" textAnchor="middle">1年で儲かったか</text>
          <text x={105} y={112} fill="#9a9a9a" fontSize="10" textAnchor="middle">フロー</text>

          <rect x={215} y={50} width={170} height={70} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={300} y={78} fill="#f2f2f2" fontSize="13" textAnchor="middle">BS（貸借対照表）</text>
          <text x={300} y={98} fill="#9a9a9a" fontSize="10" textAnchor="middle">期末に何を持つか</text>
          <text x={300} y={112} fill="#9a9a9a" fontSize="10" textAnchor="middle">ストック</text>

          <rect x={410} y={50} width={170} height={70} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={495} y={78} fill="#f2f2f2" fontSize="13" textAnchor="middle">CF（キャッシュフロー）</text>
          <text x={495} y={98} fill="#9a9a9a" fontSize="10" textAnchor="middle">現金がどう動いたか</text>
          <text x={495} y={112} fill="#9a9a9a" fontSize="10" textAnchor="middle">フロー</text>

          <text x={300} y={25} fill="#f2f2f2" fontSize="12" textAnchor="middle">同じ1社を、3つの角度から見る</text>
        </svg>
      </Diagram>
      <p>詳しくは各ページで扱いますが、まずは大まかに ― <Link href="/finance/pl">損益計算書（PL）</Link>は売上から費用を順に引く「儲けの階段」、<Link href="/finance/bs">貸借対照表（BS）</Link>は「どこから調達し、何に使っているか」の財産目録、<Link href="/finance/cf">キャッシュフロー計算書（CF）</Link>は現金の増減を活動別に分けた家計簿、と押さえておけば十分です。</p>

      <Heading num="03">3枚は1本の線でつながる</Heading>
      <p>3表はバラバラではなく、1本の線でつながっています。<Term>稼ぐ力（PL）→ 安全性（BS）→ 潤沢な現金（CF）</Term>という順で、すべての原点は「稼ぐ力」にあります。PLで生んだ利益はBSの利益剰余金へ積み上がり、その活動の結果として現金がどう動いたかがCFに表れます。会社を分析するとは、この線を読む作業にほかなりません。</p>
      <Aside label="📎">
        PLの最終利益（当期純利益）は、BSの<strong>純資産の中にある利益剰余金</strong>へ積み上がります。だからPLとBSは地続きです。3表がどう連動するかは<Link href="/finance/cf">キャッシュフローと三表のつながり</Link>で詳しく見ます。
      </Aside>

      <Analogy label="💡 なぜ読めると差がつくか">
        「一番わかりやすいのはPL（儲けの話）。難しいのはBSとCF」と言われます。実際、日本の経営者の8割はBSまで読めないとも言われ、上場企業でBSまで<Term>ちゃんと分析できる人は5〜10%程度</Term>。裏を返せば、決算書を読めるだけで少数派に入れるということです。コツは、数字をいきなり読まず、まず図（階段・貯金箱・家計簿）に置き換えて全体像を掴み、必要なら数字に降りること。
      </Analogy>

      <Heading num="まとめ">財務三表の全体像</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>PLは儲け</h4><p>1年でいくら稼いだかを示す成績表。5段の階段で読みます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>BSは財産</h4><p>期末時点で、何をどう調達して持っているかのスナップショット。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>CFは現金</h4><p>1年で現金がどう動いたかを、営業・投資・財務に分けて示します。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>3枚で1社</h4><p>稼ぐ力→安全性→現金と、1本の線でつながって初めて全体像が見えます。</p></Card>
      </CardGrid>
      <p>まずは一番わかりやすい<Link href="/finance/pl">損益計算書（PL）― 5つの利益</Link>から読み解いていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/finance/pl" tag="会計・財務">損益計算書（PL）― 5つの利益</RelatedLink>
                    <RelatedLink href="/finance/bs" tag="会計・財務">貸借対照表（BS）の読み方</RelatedLink>
                    <RelatedLink href="/finance/cf" tag="会計・財務">キャッシュフローと三表のつながり</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
