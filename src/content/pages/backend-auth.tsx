import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "認証の実装" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>認証の実装 ― 誰かを確かめ、それを持ち回る</h1>
        <Lead>
          <Link href="/security">セキュリティ</Link>セクションにも認証・認可の項があります。あちらが<Term>なぜその方式が安全なのか</Term>という原理と攻撃の手口を扱うのに対し、この見出しは<Term>実際にどう組むか</Term>を扱います。同じ話題を2つの角度から見る形なので、原理が知りたければあちら、手順が知りたければこちらです。
        </Lead>
      </Hero>

      <Heading num="01">認証と認可は別の問い</Heading>
      <p>
        最初に区別しておきます。<Term>認証</Term>は「あなたは誰か」、<Term>認可</Term>は「その人がこれをしてよいか」です。混ぜると、ログインしていれば何でもできる設計になります。
      </p>

      <table>
        <thead>
          <tr><th></th><th>認証</th><th>認可</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">問い</td><td>あなたは誰か</td><td>それをしてよいか</td></tr>
          <tr><td className="hl">失敗時</td><td><code>401</code>(名乗り直せ)</td><td><code>403</code>(名乗りは分かったが、駄目)</td></tr>
          <tr><td className="hl">判断の材料</td><td>提示された証</td><td>証＋対象データ＋操作の種類</td></tr>
          <tr><td className="hl">置き場所</td><td>入口のミドルウェア</td><td><strong>操作ごと</strong>。ユースケースの中</td></tr>
        </tbody>
      </table>

      <p>
        最後の行が実装上いちばん重要です。認証は入口で一度済みますが、<Term>認可は対象データを見ないと判断できない</Term>ため、入口だけでは足りません。「ログイン済みか」は入口で、「その注文は本当にこの人のものか」は取得したあとで確かめます。
      </p>

      <Heading num="02">実装で決める4つのこと</Heading>
      <DiagramFrame
        slug="backend-auth-flow"
        aspect="640 / 350"
        caption="認証の実装で決めることを一連の流れとして示した図。本人であることを確かめる段、確かめた結果を証として発行する段、以降のリクエストでその証を毎回検証する段、そしてその人がこの操作をしてよいかを判定する認可の段が並ぶ。第1段にはパスワードで確かめるか外部のIdPに委ねるかの分岐がある。それぞれの段の下に、対応するページが示されている。下部には境界の説明があり、なぜその方式が安全なのかという原理と攻撃の手口はセキュリティのセクションが扱い、ここでは実装の手順を扱うことが記されている。"
      />

      <table>
        <thead>
          <tr><th>ページ</th><th>答える問い</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Link href="/backend/auth-token">トークンの運用</Link></td><td>証をどう発行し、どこに置き、どう失効させるか</td></tr>
          <tr><td className="hl"><Link href="/backend/auth-oauth">外部IdP連携</Link></td><td>本人確認そのものを、外部に委ねるには</td></tr>
          <tr><td className="hl"><Link href="/backend/auth-account">パスワードとアカウント回復</Link></td><td>自前で持つ場合の保管と、忘れたときの導線</td></tr>
        </tbody>
      </table>

      <p>
        Expressでの最小の実装は<Link href="/backend/express-auth">認証・認可の実装</Link>にあります。この見出しは、その先 ― <Term>実運用でぶつかる問題</Term>を扱います。
      </p>

      <Heading num="03">共通する原則</Heading>
      <p>
        3つのページに共通して効いてくる考え方が3つあります。
      </p>

      <table>
        <thead>
          <tr><th>原則</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">自前で作らない</td><td>暗号も認証手順も、既存の実装を使う。<strong>自作は必ず負ける</strong></td></tr>
          <tr><td className="hl">寿命を短くする</td><td>失効できない仕組みほど、短い寿命で埋め合わせる</td></tr>
          <tr><td className="hl">漏れる前提で層を重ねる</td><td>1つの対策が破られても、被害が「全部」にならない形にする</td></tr>
        </tbody>
      </table>

      <Aside label="いちばん多い事故">
        認証の不備で最も多いのは、暗号の弱さではなく<Term>認可の抜け</Term>です。<code>/orders/123</code>のIDを別の数字に変えるだけで他人の注文が見える ― 認証は完璧に動いているのに、<Term>取得したデータが本当にその人のものかを確かめていない</Term>だけで成立します。入口の認証が通ったことと、その操作が許されることは、まったく別です。
      </Aside>

      <Analogy label="💡 たとえるなら">
        建物の入館証です。受付で本人確認をして証を渡すのが認証、その証で入れる部屋が決まっているのが認可。証を持っていることと、その部屋に入ってよいことは別です。そして証には期限があり、落としたときのために短くしてある ― この見出しで扱うのは、その運用の作法です。
      </Analogy>

      <Heading num="まとめ">確かめるのは一度、確認は毎回</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>認証と認可を混ぜない</h4>
          <p>401と403は違う。認可は対象データを見ないと判断できない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>原理はセキュリティ、手順はここ</h4>
          <p>同じ話題を2つの角度から。使い分けて読む。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>事故の多くは認可の抜け</h4>
          <p>暗号が破られるより、IDを差し替えられるほうがずっと多い。</p>
        </Card>
      </CardGrid>

      <p>
        まずは、確かめた結果をどう持ち回るかから。<Link href="/backend/auth-token">トークンの運用</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/auth" />
    </DocsPage>
  );
}
