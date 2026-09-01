import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "データ管理" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>データ管理 ― 性質ごとに、扱いを変える</h1>
        <Lead>
          運営としてのデータ管理は、技術の選定ではなく<Term>分類</Term>から始まります。同じシステムの中にも、失うと業務が止まるものと、消えても作り直せるものが混ざっています。これを一律に扱おうとすると、<strong>守るべきものが守られず、守らなくてよいものに費用がかかる</strong>という両方の失敗が起きます。まず分け、それから置き場所と守り方を決めます。
        </Lead>
      </Hero>

      <Heading num="01">性質で4つに分ける</Heading>

      <DiagramFrame
        slug="infra-ops-data-lifecycle"
        aspect="760 / 280"
        caption="扱うデータを性質ごとに置き場所と扱いへ振り分ける図。応答のために読み書きするものは低遅延の置き場所へ置き、日々のバックアップと世代を用意する。大きくてあまり変わらないものはオブジェクトの置き場所へ置き、期間が過ぎたら安いクラスへ自動で移す。後からまとめて集計する記録は分析用へ流し、期間を区切って読む。消えても作り直せるものは守る対象から外す。性質の違うものを1か所にまとめると、費用も性能も要件を満たせなくなる。"
      />

      <p>
        4つ目 ― <strong>守らないと決める</strong> ― が意外に重要です。キャッシュや中間生成物までバックアップの対象に含めると、容量も時間も費用も膨らみます。<strong>作り直せるものは作り直す</strong>という判断を明示しておくと、守るべきものに資源を回せます。
      </p>

      <Heading num="02">失う前提で備える</Heading>
      <p>
        置き場所を決めたら、次は<strong>どこまで失ってよいか</strong>と<strong>どれだけで戻すか</strong>です。この2つの目標値から、取得の間隔と復元の方式が決まります(<Link href="/infra/storage-backup">バックアップと復旧</Link>)。
      </p>
      <p>
        運営として最も見落とされるのは、<Term>戻せることの確認</Term>です。取得の成功は監視されていても、復元の実測が一度もない ― という状態は珍しくありません。定期的に別の場所へ戻し、時間を測り、手順書を更新する。<strong>やっていないものは、無いのと同じ</strong>です。
      </p>

      <Heading num="03">構造の変更をどう運ぶか</Heading>
      <p>
        運用が続けば、データの形も変わります。ここで効いてくるのが<Link href="/backend/data-migration">マイグレーション</Link>の設計で、要点は<strong>やり直せる形にしておく</strong>ことと、<strong>アプリと構造の変更を同時に切り替えない</strong>ことです。
      </p>
      <p>
        後者は具体的には、まず両方の形で動くようにアプリを出し、次に構造を変え、最後に古い形への対応を消す、という順序を取ります。1回で切り替えようとすると、<Link href="/infra/deploy">切り戻し</Link>ができなくなります ― コードは戻せてもデータは戻らないからです。
      </p>

      <Aside label="消す設計も、運用のうち">
        <strong>いつまで持つか</strong>を決めていないデータは増え続けます。法令上の保管義務があるもの、業務上必要なもの、そのどちらでもないもの ― 分けて、最後のものには保持期間を設定します。これは費用の話であると同時に、<Link href="/infra/ops-compliance">持ちすぎない</Link>という意味でのリスク管理でもあります。
      </Aside>

      <Heading num="まとめ">分けてから、決める</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>性質で分類する</h4><p>一律に扱うと、守るべきものが守られず、守らなくてよいものに費用がかかる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>戻せることを確かめる</h4><p>取得の成功は確認されていても、復元は試されていないことが多い。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>構造の変更は段階で</h4><p>コードは戻せてもデータは戻らない。同時に切り替えない。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/ops-data" />
    </DocsPage>
  );
}
