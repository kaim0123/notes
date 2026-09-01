import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "コンテンツ管理" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>コンテンツ管理 ― 誰が書くかで、道具が決まる</h1>
        <Lead>
          更新の仕組みを選ぶとき、機能の比較から入ると失敗します。先に決めるのは<Term>誰が書き、誰が公開してよいか</Term>という体制です。開発者しか書かないなら仕組みはほとんど要りませんし、外部の書き手が入るなら権限の設計が必須になります。<strong>体制が先、道具は後</strong> ― この順序を逆にすると、使われない管理画面か、誤公開の事故のどちらかが待っています。
        </Lead>
      </Hero>

      <Heading num="01">体制で3つに分かれる</Heading>

      <DiagramFrame
        slug="infra-ops-content-flow"
        aspect="760 / 280"
        caption="コンテンツを更新する体制を、誰が書くかで3つに分けた図。開発者だけが更新するならコードと同じ流れに乗せるのが最も単純で、レビューも履歴もそのまま使える。社内の非開発者も書くなら管理画面が要るが、公開前に確認する場所と、誰が公開してよいかの区別を用意する。外部の書き手を含むなら、下書きと公開の分離に加えて役割ごとの権限が必須になる。体制が先で、道具は後になる。"
      />

      <Heading num="02">どの方式でも要るもの</Heading>
      <table>
        <thead><tr><th>要素</th><th>なぜ要るか</th></tr></thead>
        <tbody>
          <tr><td className="hl">下書きと公開の分離</td><td>書きかけが公開されない。確認してから出せる</td></tr>
          <tr><td className="hl">公開前の確認場所</td><td>本番と同じ見え方で確かめる。<Link href="/dev/environments">環境</Link>の話と地続き</td></tr>
          <tr><td className="hl">履歴と巻き戻し</td><td>間違った更新から戻せる。<Link href="/infra/deploy">切り戻し</Link>と同じ考え方</td></tr>
          <tr><td className="hl">公開の権限</td><td>書ける人と、出してよい人を分ける</td></tr>
        </tbody>
      </table>

      <Heading num="03">画像とメディアの扱い</Heading>
      <p>
        運営で最も費用と速度に効くのが画像です。<strong>元のサイズのまま置いて、そのまま配る</strong>という状態は、放置すると表示速度と転送料の両方を悪化させます。
      </p>
      <p>
        仕組みとして解くなら、<strong>アップロード時に複数のサイズを作る</strong>か、<strong>配信時に必要なサイズへ変換する</strong>かのどちらかです。後者は<Link href="/infra/cloudflare">エッジでの処理</Link>と相性がよく、元は1つだけ持てば済みます。どちらにせよ、<strong>人の手で縮小してもらう運用は続きません</strong>。
      </p>

      <Aside label="どこに置くか">
        本文と画像は置き場所が違います。本文はデータベースかリポジトリ、画像は<Link href="/infra/aws-s3">オブジェクトストレージ</Link>。アプリのサーバーに直接置く構成は、台数を増やせず、入れ替えで消えるので避けます(<Link href="/backend/upload">ファイルアップロード</Link>)。
      </Aside>

      <Heading num="まとめ">体制から決める</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>誰が書くかが最初の問い</h4><p>開発者だけなら仕組みは要らない。人が増えるほど権限が要る。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>下書き・確認・巻き戻し</h4><p>どの方式でも要る4点。デプロイの原則と同じ形をしている。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>画像は仕組みで処理する</h4><p>人が縮小する運用は続かない。作るか、配信時に変換する。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/ops-content" />
    </DocsPage>
  );
}
