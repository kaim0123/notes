import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "法令・コンプライアンス" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>法令・コンプライアンス ― 何を扱っているかを知る</h1>
        <Lead>
          技術的に動いていても、守るべき決まりを満たしていなければ公開し続けられません。ここは法律の解説をする場所ではなく、<Term>技術側が用意しておくこと</Term>を扱います。出発点はひとつ ― <strong>自分たちが何のデータを、どこから集め、どこへ渡しているかを把握すること</strong>。この棚卸しができていないと、どの決まりが自分に関係するかも判断できません。
        </Lead>
      </Hero>

      <Heading num="01">4つの領域</Heading>

      <DiagramFrame
        slug="infra-ops-compliance-map"
        aspect="700 / 300"
        caption="公開したサービスが守る決まりごとを4つの領域に分けた図。個人情報の扱いでは、何を集め何に使いどこへ渡すのかを示し、求められたときに消せるようにしておく。同意の管理では、計測や広告のための仕組みを同意の前に動かさないようにする。表示の義務では、事業者の情報や取引の条件など掲示が求められるものを整える。使えることの保証では、目や耳、操作に制約のある人にも届く形にする。"
      />

      <Heading num="02">個人情報 ― まず棚卸しから</Heading>
      <p>
        何を持っているかを知らなければ、方針も書けません。実務としては、<strong>集めている項目</strong>・<strong>集めている場所</strong>・<strong>渡している先</strong>を一覧にします。3つ目は見落とされがちで、<strong>外部の計測ツールや広告の仕組みも「渡している先」</strong>に含まれます。
      </p>
      <p>
        技術側で用意するのは、<strong>削除できる仕組み</strong>と<strong>取り出せる仕組み</strong>です。「利用者の求めに応じて消す」という方針を書いても、実際に消せる作りになっていなければ守れません。<Link href="/security/logging">ログ</Link>やバックアップの中に残った分をどう扱うかまで含めて、設計として考えます。
      </p>

      <Heading num="03">同意 ― 既定で動かさない</Heading>
      <p>
        計測や広告の仕組みは、<strong>同意を得る前に動かさない</strong>のが原則です。技術的には、同意の状態を保持し、それに応じて読み込むかどうかを切り替える形になります。
      </p>
      <p>
        実装で注意したいのは、<strong>同意しない選択が同じ手間でできること</strong>と、<strong>後から変更できること</strong>です。同意を撤回する導線が無い作りは、方針として書いた内容と矛盾します。
      </p>

      <Heading num="04">使えることの保証</Heading>
      <p>
        目・耳・操作に制約のある人にも届く形にすることは、要件として求められる場面が増えています。技術側の基本は<Link href="/frontend/ux-a11y">ユーザビリティとアクセシビリティ</Link>にありますが、運営として押さえるのは<strong>継続的に確認する仕組み</strong>です ― 一度直しても、更新のたびに崩れます。自動で検査できる部分は<Link href="/test/non-functional-ci">継続的な検査</Link>に組み込みます。
      </p>

      <Aside label="判断が必要なところは、判断できる人に渡す">
        技術側で完結できるのは「何を扱っているかを示すこと」と「求められた操作をできるようにすること」までです。<strong>どこまでが義務か</strong>の判断は、扱う商材や対象の地域によって変わります。棚卸しの結果を判断できる人へ渡せる形にしておくことが、技術側の仕事の終点になります。
      </Aside>

      <Heading num="まとめ">把握が、すべての起点</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>棚卸しから始める</h4><p>何を集め、どこへ渡しているか。外部の計測ツールも「渡している先」。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>消せる・取り出せる作りにする</h4><p>方針を書くだけでは守れない。ログとバックアップまで含めて考える。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>崩れる前提で確認を続ける</h4><p>一度直しても更新で崩れる。自動で検査できる部分は仕組みに載せる。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/ops-compliance" />
    </DocsPage>
  );
}
