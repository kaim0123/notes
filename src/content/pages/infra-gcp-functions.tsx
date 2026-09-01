import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "Cloud Functions" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>Cloud Functions ― 契機が、性質を決める</h1>
        <Lead>
          関数を置いておくと、指定した契機で実行されます。仕組みは<Link href="/infra/aws-lambda">Lambda</Link>とほぼ同じ ― 実行環境が用意され、使い回され、片付けられます。ここで強調したいのは、実装よりも<Term>どの契機で呼ばれるか</Term>のほうが設計に効くという点です。同じコードでも、契機が違えば<strong>失敗したときに誰が後始末をするか</strong>が変わります。
        </Lead>
      </Hero>

      <Heading num="01">2つの契機</Heading>

      <DiagramFrame
        slug="infra-gcp-functions-events"
        aspect="700 / 280"
        caption="関数を起動する契機を2種類に分けた図。HTTPの要求はURLを叩かれたときに動いてその場で応答を返し、出来事はファイル追加やメッセージ到着をきっかけに動いて呼び出し元へは応答しない。前者は同期なので失敗すれば呼んだ側にエラーが返り、後者は非同期なので再試行され、それでも駄目なものは退避する。同じ関数でも契機が違えば、失敗したとき誰が後始末をするかが変わる。"
      />

      <Heading num="02">出来事で動く側の作法</Heading>
      <p>
        出来事を契機にする場合、<strong>同じ出来事が二度届くことがあります</strong>。再試行の仕組みがある以上これは避けられないので、処理は<Term>二度実行しても結果が変わらない</Term>形にします ― 処理済みの印を残して弾く、更新を条件付きにする(<Link href="/backend/jobs">非同期処理とジョブ</Link>)。
      </p>
      <p>
        もう1つは<strong>無限に呼び合う経路を作らない</strong>ことです。保存先へのファイル追加で起動する関数が、同じ場所へファイルを書けば、自分自身を延々と呼び続けます。書き込み先を分ける、条件で弾く、といった手当てを最初から入れておきます ― これは費用の事故として現れます。
      </p>

      <Heading num="03">起動の遅れとどう付き合うか</Heading>
      <p>
        しばらく呼ばれていない関数は、実行環境の用意から始まるため応答が遅れます。対策は<Link href="/infra/aws-lambda">共通</Link>で、<strong>重い準備を関数の外側に置く</strong>、<strong>最小の稼働数を確保する</strong>、あるいは<strong>遅れが許される契機に寄せる</strong>のいずれかです。
      </p>
      <p>
        利用者を待たせる経路であれば、そもそも関数ではなく<Link href="/infra/gcp-compute">常時動く形</Link>を選ぶほうが素直なこともあります。関数が向くのは、<strong>頻度が低く、遅れが許され、1つのことだけをする処理</strong>です。
      </p>

      <Aside label="小さく保つ">
        関数は増えるほど、全体像が見えなくなります。「どの出来事がどの関数を呼ぶのか」は<Link href="/infra/gcp-integration">つなぎ方の設定</Link>として一覧できるようにし、コードとして管理下に置きます。数が増えてから整理するのは、ほぼ不可能です。
      </Aside>

      <Heading num="まとめ">契機から設計する</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>同期か、非同期か</h4><p>失敗の後始末を誰がするかが変わる。呼ばれ方を知らずに書くと事故になる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>二度来ても壊れない</h4><p>再試行がある以上、重複は前提。印を残して弾く。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>呼び合う経路を作らない</h4><p>自分の書き込みが自分を呼ぶ形は、費用の事故として現れる。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-functions" />
    </DocsPage>
  );
}
