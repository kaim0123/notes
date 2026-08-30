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
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ハッシュ関数と衝突攻撃",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>ハッシュ関数と衝突攻撃 ― Web全体の信頼を支える「一方向の壁」</h1>
        <Lead>
          2004年、ある学会で中国人研究者<Term>王小雲(ワン・シャオユン)</Term>の発表が終わると、聴衆は総立ちになりました。表向きは「条件を満たす数の組を見つけた」という地味な成果。しかし専門家には意味が分かりました ― 広く使われていた<Term>MD5</Term>で、意図的に同じハッシュ値を作れることを示したのです。これはWebの信頼の基盤が揺らいだ瞬間でした。<Link href="/security/auth">パスワードの保存</Link>も、電子署名も、<Link href="/network/applications/web">HTTPS</Link>の改ざん検知も、その裏では<Term>ハッシュ関数</Term>が動いています。このページでは、ハッシュ関数の性質と、それを壊す「衝突」を手計算のデモで見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">ハッシュ関数とは ― 戻せないことに価値がある</Heading>
      <p><Term>ハッシュ(hash)</Term>は「切り刻む」という意味です。<Term>ハッシュ関数</Term>は、任意の長さのデータを固定長の値(<Term>ハッシュ値</Term>)に変換します。暗号との決定的な違いは、<strong>元に戻すことを目的にしていない</strong>点です。ハッシュ関数には次の性質が求められます。</p>

      <table>
        <thead>
          <tr><th>性質</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">一方向性</td><td>ハッシュ値から元データを逆算するのが極めて困難</td></tr>
          <tr><td className="hl">決定性</td><td>同じ入力なら、必ず同じ出力になる</td></tr>
          <tr><td className="hl">雪崩効果(avalanche)</td><td>入力が1ビット変わるだけで、出力は一見ランダムに大きく変わる</td></tr>
          <tr><td className="hl">衝突耐性</td><td>同じハッシュ値になる別々の入力を、意図的に作れない</td></tr>
        </tbody>
      </table>

      <p><Term>雪崩効果</Term>が重要なのは、たとえば「35 と 36 を入れると出力も 1 しか変わらない」ような関数だと、規則性から総当たりで即座に破られてしまうからです。1文字違えば出力が丸ごと変わることで、初めて「ランダムっぽい」変換になります。</p>

      <Heading num="02">身近な用途 ― 気づかないうちに1日数万回</Heading>
      <table>
        <thead>
          <tr><th>用途</th><th>仕組みのイメージ</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">パスワード保存</td><td>平文ではなくハッシュだけを保存。漏洩しても元のパスワードに戻しにくい。ログイン時は入力をハッシュして照合する</td></tr>
          <tr><td className="hl">電子署名</td><td>巨大なファイル全体に署名するのは重いので、まずハッシュを取り、その短い値に秘密鍵で署名する</td></tr>
          <tr><td className="hl">HTTPS(TLS)</td><td>配信内容が改ざんされていないかを、ハッシュと証明書の組み合わせで検証する</td></tr>
        </tbody>
      </table>
      <p>サイトを1ページ開くだけでも、現代のWebでは数十回はハッシュ計算に依存しています。スマホ・PCの裏側で、1日に数万回は静かに動いている技術です。</p>

      <Heading num="03">デモ ― 「堀本法」で雪崩効果を体感する</Heading>
      <p>仕組みを直感でつかむために、<Term>堀本法</Term>という単純なハッシュを定義してみます。</p>
      <Steps>
        <li>アルファベットを A=1 … Z=26 に変換する</li>
        <li>初期値 1 から、1文字ごとに <code>現状の値 × 7 + 文字番号</code> を計算する</li>
        <li>常に<strong>下2桁だけ</strong>を残す(100で割った余り＝MOD 100)</li>
      </Steps>

      <Diagram caption="入力が近くても出力はバラバラ(雪崩効果)。逆に文字列として遠い bat と hat が 68 と 62 で近くなることもある。">
        <div style={{ fontFamily: "monospace", fontSize: "0.9rem", lineHeight: 2 }}>
          cat &rarr; 17<br />
          bat &rarr; 68&nbsp;&nbsp;(c&rarr;b の1文字差なのに大きく変化)<br />
          hat &rarr; 62
        </div>
      </Diagram>

      <p>ポイントは、値を大きく<strong>増幅してから桁を捨てる</strong>ことです。掛けて伸ばし、下2桁だけ残して情報を落とす。この「増幅して捨てる」操作の繰り返しが、一見ランダムで元に戻せない変換を生みます。</p>

      <Heading num="04">衝突攻撃 ― 同じハッシュ値を狙って作る</Heading>
      <p>次にハッカーの視点で、「<code>cat</code> と同じハッシュ値 17 を出す<strong>別の文字列</strong>」を探します。堀本法の計算を式に展開すると <code>343 + 49×X₁ + 7×X₂ + X₃</code> のような形になり、1文字目の係数49が大きいこと、下2桁は100の倍数付近を狙えば調整しやすいことが見えてきます。この観察から、<code>cat</code> と同じ 17 になる別の文字列を意図的に作れます。これが<Term>衝突(collision)</Term>で、ハッシュ関数にとって致命的な弱点です。</p>

      <table>
        <thead>
          <tr><th>用途</th><th>衝突が起きると</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">パスワード保存</td><td>本来のパスワードと違う文字列でも、同じハッシュならログインが通ってしまう</td></tr>
          <tr><td className="hl">電子署名</td><td>「A社へ1億円振込め」の指示書と同じハッシュになるよう別内容のPDFを作れば、署名はそのままで中身だけすり替えられる</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        ハッシュ値は「書類の指紋」です。指紋が一致すれば「同じ書類だ」と信じて署名や照合をします。衝突攻撃とは、<strong>まったく別の書類なのに指紋だけを一致させる</strong>技術。指紋を信頼している仕組みは、これが可能になった瞬間に土台から崩れます。
      </Analogy>

      <Heading num="05">MD5の陥落 ― Web全体の信頼が揺れた</Heading>
      <p>王小雲らが破ったMD5の手法は、堀本法デモと同型の「式の展開と係数の観察」でしたが、はるかに複雑で、論文は400ページ規模の手計算に及んだと言われます。悪用すれば、証明書の偽装が理論上可能になります。実際に<Term>Stuxnet / Flame</Term>という国家レベルのマルウェアは、ハッシュ衝突を使って<strong>Microsoft風の証明書を偽装</strong>し、Windows更新に見せかけて拡散しました。</p>
      <p>「フィッシング対策はドメインをよく見ること」は今も有効ですが、<strong>証明書まで本物そっくりに偽装される</strong>攻撃の前では、URL確認だけでは不十分になりえます。だからこそ、重要なサイトはブックマークから開く、といった対策が推奨されます。</p>

      <Aside label="ゼロデイとの関係">
        発見された弱点が実際に悪用されるまでには、数年かかることも多く、その間に業界は対策(SHA-1廃止やブラウザ警告など)を進めます。<Term>ゼロデイ攻撃</Term>とは、この「発見から悪用までのタイムラグ」が極端に短い ― 対策が間に合わないケースの呼び名です。
      </Aside>

      <Heading num="06">世代交代 ― 破られる前に次を用意する</Heading>
      <p>ハッシュ関数の歴史は、暗号と同じく「破られては次へ乗り換える」の連続です。暗号学界は<strong>どうせいつか破られる</strong>という歴史観のもと、移行先をあらかじめ決めておきます。</p>
      <table>
        <thead>
          <tr><th>世代</th><th>経緯</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">MD4</td><td>弱点が指摘され、改良してMD5へ</td></tr>
          <tr><td className="hl">MD5</td><td>2004年、王小雲らにより衝突攻撃。廃止・警告へ</td></tr>
          <tr><td className="hl">SHA-1</td><td>同様に危険視され、順次淘汰</td></tr>
          <tr><td className="hl">SHA-2(SHA-256 など)</td><td><strong>現在の主流</strong>。まだ実用的な衝突は知られておらず常用</td></tr>
          <tr><td className="hl">SHA-3</td><td>破られる前の移行先として、コンペで選定され既に標準化済み</td></tr>
        </tbody>
      </table>
      <p>SHA-2がまだ現役のうちからSHA-3を用意しておく ― これが「破られる前に次を持っておく」という現代暗号の姿勢です。ちなみに、数学者が純粋な好奇心で研究した「一方向性」などの理論が、数十年後にインターネット全体の基盤になった、という点も見逃せません。</p>

      <Heading num="07">応用 ― ブロックチェーンとの接続</Heading>
      <p>ハッシュの性質は、暗号資産の基盤技術にも直結します。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>マイニング</h4><p>意味のないデータを付け足しながら、ハッシュの先頭に0が並ぶ値を探し続ける作業。「狙ったハッシュ値を出す」という点で、王小雲の衝突探索と構造が似ています。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>ブロックチェーン</h4><p>前ブロックの情報をまとめたハッシュを次ブロックに載せる鎖。過去の1ブロックを改ざんすると以降のハッシュが全て変わり、改ざんコストが跳ね上がります。これが信頼性の技術的な裏付けです。</p></Card>
      </CardGrid>
      <p>暗号資産の価格や詐欺案件のイメージと、ハッシュという技術そのものの美しさは、切り分けて考えたいところです。優れた仕組みの上で悪用が起きうるのは、どんな技術にも共通する話です。</p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>戻せないから守れる</h4><p>ハッシュは暗号と違い「元に戻せないこと」に価値があります。パスワードや改ざん検知は、この一方向性の上に成り立っています。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>衝突が起きると全部崩れる</h4><p>別のデータで同じハッシュ値を作れると、パスワード照合も電子署名も信頼できなくなります。衝突耐性はハッシュの生命線です。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>常に次の世代を用意する</h4><p>MD5→SHA-1→SHA-2→SHA-3という乗り換えのように、「破られる前提で移行先を先に決めておく」のが暗号運用の基本姿勢です。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/crypto" tag="セキュリティ">暗号の歴史と公開鍵暗号</RelatedLink>
                    <RelatedLink href="/security/auth" tag="セキュリティ">認証</RelatedLink>
                    <RelatedLink href="/network/applications/web" tag="インターネット">Webと暗号化通信</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
