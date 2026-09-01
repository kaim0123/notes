import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DiagramFrame,
  Card, CardGrid, CardNumber, Aside, DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "Certificate Manager" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>Certificate Manager ― 対応表で束ねる</h1>
        <Lead>
          証明書を扱う目的は<Link href="/infra/aws-acm">ACM</Link>と同じで、<Term>期限切れという予定された障害を人の作業から外す</Term>ことです。加えてここでは、<strong>証明書と入口を対応表で結ぶ</strong>という構造を扱います。ドメインが増減する環境ほど効いてくる形で、追加のたびに入口の設定を作り直さずに済みます。
        </Lead>
      </Hero>

      <Heading num="01">証明書・対応表・入口</Heading>

      <DiagramFrame
        slug="infra-gcp-cert-managed"
        aspect="700 / 260"
        caption="証明書を負荷分散の入口に紐づけて使う構成。証明書そのものは独立した資源として管理され、どのドメインにどの証明書を使うかという対応表を介して入口に結び付けられる。ドメインを追加するときは対応表に1行足すだけで済み、入口の設定を作り直す必要がない。所有の確認と期限前の更新は自動で行われるため、人が触るのは対応表だけになる。"
      />

      <p>
        この分離の利点は、<strong>変更の影響範囲が小さいこと</strong>です。入口の設定は本番のトラフィックを受けている資源なので、触るたびに緊張します。証明書の追加が対応表の更新で済むなら、その緊張が要りません。
      </p>

      <Heading num="02">所有の確認と自動更新</Heading>
      <p>
        発行にはドメインの所有確認が必要で、<strong>名前情報として値を登録する方式</strong>を選ぶと更新も自動化できます。登録を残しておく限り、期限前に同じ手順が繰り返されるためです。この点は<Link href="/infra/aws-acm">ACM</Link>と変わりません。
      </p>
      <p>
        自前で証明書を用意して持ち込むこともできますが、その場合<strong>更新は自分の仕事に戻ります</strong>。特別な要件がなければ、自動更新される側を選ぶのが素直です。
      </p>

      <Aside label="自動化したものを監視する">
        更新が止まる原因はいくつもあります ― 確認用の登録を消した、ドメインの管理を移した、対応表から外れた。<strong>外形監視で残り日数を見る</strong>のが、いちばん裏切られにくい確認方法です(<Link href="/infra/monitoring-server">サーバー・機器の監視</Link>)。
      </Aside>

      <Heading num="まとめ">人が触るのは対応表だけ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>証明書と入口を分ける</h4><p>追加は対応表の1行。本番の入口を触らずに済む。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>名前情報で確認する</h4><p>登録を残せば更新も自動。持ち込みを選ぶと更新は自分の仕事に戻る。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>残り日数を外から見る</h4><p>自動化が止まる理由は複数ある。結果を測るのが確実。</p></Card>
      </CardGrid>

      <DocsFooter href="/infra/gcp-certificate-manager" />
    </DocsPage>
  );
}
