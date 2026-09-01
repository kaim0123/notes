import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DiagramFrame,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Aside,
  Steps,
  Timeline,
  TimelineItem,
  TimelineLabel,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "ハッシュ関数と衝突攻撃" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>ハッシュ関数と衝突攻撃 ― 戻せない壁と、その壊し方</h1>
        <Lead>
          <Link href="/security/crypto">暗号技術</Link>で、改ざんの検知と電子署名はハッシュ関数の上に成り立っていると見ました。暗号が「元に戻せること」を目的にするのに対し、ハッシュは<strong>元に戻せないこと</strong>に価値があります。ここではその性質を手計算で確かめ、性質のうち1つ ― 衝突耐性 ― が失われると何が起きるのかを見ます。2004年にMD5でそれが起きたとき、揺らいだのはWebの信頼の土台そのものでした。
        </Lead>
      </Hero>

      <Heading num="01">求められる4つの性質</Heading>
      <p>
        <Term>ハッシュ関数</Term>は、任意の長さのデータを固定長の値(<Term>ハッシュ値</Term>)に変換します。ただの変換ではなく、次の4つを同時に満たす必要があります。
      </p>

      <table>
        <thead>
          <tr><th>性質</th><th>意味</th><th>失われると</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">一方向性</td><td>ハッシュ値から元データを逆算できない</td><td>保存したハッシュから元の値が復元される</td></tr>
          <tr><td className="hl">決定性</td><td>同じ入力からは必ず同じ出力になる</td><td>照合そのものが成り立たない</td></tr>
          <tr><td className="hl">雪崩効果</td><td>入力が1ビット変わると出力が全く別の値になる</td><td>規則性から総当たりで破られる</td></tr>
          <tr><td className="hl">衝突耐性</td><td>同じ値になる別の入力を意図的に作れない</td><td>署名も改ざん検知も信用できなくなる</td></tr>
        </tbody>
      </table>

      <Heading num="02">雪崩効果を手で確かめる</Heading>
      <p>
        性質の中で直感が働きにくいのが雪崩効果です。ごく単純な自作のハッシュで確かめてみます。
      </p>

      <Steps>
        <li>アルファベットを A=1 … Z=26 の番号に置き換える</li>
        <li>初期値 1 から始め、1文字ごとに <code>いまの値 × 7 + 文字番号</code> を計算する</li>
        <li>毎回、<strong>下2桁だけ</strong>を残す(100で割った余り)</li>
      </Steps>

      <DiagramFrame
        slug="security-hash-avalanche"
        aspect="700 / 300"
        caption="自作ハッシュで雪崩効果を確かめた計算過程。catは10、71を経て17になり、1文字目だけを変えたbatは9、64を経て68になる。入力の違いは1文字でも、7倍で値を伸ばしては下2桁だけ残して情報を捨てる、という操作を繰り返すため、出力は近い値にならない。逆に、出力が近くても入力が近いとは限らない。"
      />

      <p>
        肝は<Term>増幅してから捨てる</Term>ことです。掛けて値を伸ばし、桁を落として情報を捨てる。この繰り返しで、入力との対応が追えない変換になります。もし「35と36を入れると出力も1しか変わらない」ような関数なら、規則性から即座に逆算されてしまいます。
      </p>

      <Heading num="03">気づかないうちに、1日に何万回</Heading>
      <table>
        <thead>
          <tr><th>用途</th><th>使われ方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">パスワード保存</td><td>平文ではなくハッシュだけを保存し、ログイン時は入力を同じ手順で変換して照合する</td></tr>
          <tr><td className="hl">電子署名</td><td>大きなファイル全体ではなく、そのハッシュ値に対して秘密鍵で署名する</td></tr>
          <tr><td className="hl">改ざん検知</td><td>配布物のハッシュ値を公開し、受け取った側が計算し直して一致を確かめる</td></tr>
          <tr><td className="hl">重複の検出</td><td>内容が同じかどうかを、全体を比べずに固定長の値だけで判定する</td></tr>
        </tbody>
      </table>

      <p>
        2番目に注目してください。<strong>署名は文書そのものではなく、その短いハッシュ値に対して作られます</strong>。この事実が、次に見る衝突攻撃の効きどころになります。
      </p>

      <Heading num="04">衝突 ― 同じ値になる別の入力を作る</Heading>
      <p>
        ハッシュ値は固定長なので、入力の種類のほうが圧倒的に多く、<Term>同じ値になる別の入力は数学的には必ず存在します</Term>。問題は、それを<strong>狙って作れるかどうか</strong>です。作れてしまう状態を衝突耐性が破れたと呼びます。
      </p>

      <DiagramFrame
        slug="security-hash-collision"
        aspect="760 / 300"
        caption="衝突が電子署名を壊す仕組み。本来の指示書と、攻撃者が用意した別内容の指示書のハッシュ値を、見えない位置に調整用のデータを詰めることで一致させる。署名は文書ではなくこの短い値に対して作られているため、値が同じなら、本来の文書のために作られた署名を別内容の文書にそのまま貼り替えられる。検証は通り、受け取った側は改ざんに気づけない。"
      />

      <p>
        パスワード保存でも同じことが起きます。本来のパスワードとは違う文字列でも、ハッシュ値が一致すれば照合は通ってしまいます。<strong>ハッシュ値を信頼している仕組みは、衝突が作れるようになった瞬間に、まとめて土台から崩れます</strong>。
      </p>

      <Analogy label="💡 たとえるなら">
        ハッシュ値は「書類の指紋」です。指紋が一致すれば同じ書類だと信じて処理をします。衝突攻撃は、まったく別の書類なのに指紋だけを一致させる技術で、指紋を信頼していた仕組みはすべて同時に効かなくなります。
      </Analogy>

      <Heading num="05">MD5の陥落と、世代交代</Heading>
      <p>
        2004年、王小雲(ワン・シャオユン)らが、広く使われていた<Term>MD5</Term>で意図的に衝突を作れることを示しました。地味な発表に見えて、意味は重大でした ― 証明書の偽装が理論上可能になったのです。実際に<Term>Flame</Term>と呼ばれるマルウェアは、ハッシュ衝突を使ってMicrosoft風の署名を偽装し、Windows更新に見せかけて広がりました。
      </p>

      <Timeline>
        <TimelineItem era="1990年代">MD4 / MD5<br />広く普及した初期の標準</TimelineItem>
        <TimelineItem era="2004">MD5に衝突攻撃<br />意図的に同じ値を作れると判明</TimelineItem>
        <TimelineItem era="2005〜">SHA-1に警告<br />理論的な弱点が示され移行が始まる</TimelineItem>
        <TimelineItem era="2017">SHA-1で実際に衝突<br />同じ値になる2つのPDFが公開される</TimelineItem>
        <TimelineItem era="現在">SHA-2(SHA-256 など)<br />実用的な衝突は知られていない</TimelineItem>
        <TimelineItem era="標準化済み">SHA-3<br />破られる前に用意された移行先</TimelineItem>
      </Timeline>
      <TimelineLabel>
        SHA-2がまだ現役のうちにSHA-3が選定・標準化されている点が要点です。壊れてから代わりを探すのではなく、壊れる前に用意しておく ― 暗号運用の基本姿勢がここにも出ています。
      </TimelineLabel>

      <Aside label="移行はアルゴリズムを差し替えるだけでは終わらない">
        古いハッシュで作られた値は、すでにデータベースや過去の署名の中に残っています。アルゴリズムを新しくしても、<strong>古い値をどう扱うか</strong>を決めないと移行は完了しません。パスワードなら「次回ログイン時に新方式で保存し直す」、署名なら「有効期限を切って再発行させる」といった、データ側の移行計画がセットになります。
      </Aside>

      <Heading num="06">用途で選ぶ ― パスワードには専用のものを</Heading>
      <p>
        最後に、実務でいちばん間違えやすい点を。<Term>汎用のハッシュ関数は、パスワード保存には向きません</Term>。SHA-256は速いことが長所ですが、パスワードの保存では<strong>速いこと自体が弱点</strong>になります ― 攻撃者は同じ速さで総当たりできるからです。
      </p>

      <table>
        <thead>
          <tr><th>用途</th><th>選ぶもの</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">改ざん検知・署名</td><td>SHA-256 など</td><td>大量のデータを速く処理する必要がある</td></tr>
          <tr><td className="hl">パスワード保存</td><td>bcrypt・Argon2 など</td><td>ソルトと計算コストを備え、意図的に遅い</td></tr>
          <tr><td className="hl">メッセージ認証</td><td>HMAC</td><td>鍵を混ぜることで、値の作り直しを防ぐ</td></tr>
        </tbody>
      </table>

      <p>
        パスワード保存で必要なソルトとストレッチングの中身は<Link href="/security/auth">認証・認可</Link>で扱っています。同じ「ハッシュ」という言葉でも、求められる速さが正反対になる点だけ、ここで押さえておいてください。
      </p>

      <Heading num="まとめ">戻せないから守れる、揃うと壊れる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>増幅して、捨てる</h4>
          <p>値を伸ばして桁を落とす繰り返しが、逆算できず規則性も見えない変換を作る。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>署名は値に対して作られる</h4>
          <p>だから値が一致すれば、署名は別内容の文書に貼り替えられる。衝突耐性は生命線。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>速さの要求は用途で逆転する</h4>
          <p>改ざん検知は速いほどよく、パスワード保存は遅いほどよい。同じ言葉でも選ぶものが違う。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/security/hash" />
    </DocsPage>
  );
}
