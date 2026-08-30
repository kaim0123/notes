import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "クラス・接尾辞の命名" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>クラス・接尾辞の命名 ― 役割を名前で語る</h1>
        <Lead>
          クラス名は<Term>PascalCase</Term>が基本ですが、それ以上に重要なのが<Term>接尾辞</Term>です。<code>Service</code>・<code>Repository</code>・<code>Controller</code>といった接尾辞は、そのクラスがどんな責務を負い、どの層にいるのかを名前だけで伝えます。
        </Lead>
      </Hero>

      <Heading num="01">よく使う接尾辞</Heading>
      <p>
        関数とオブジェクトを優先し、クラスは必要なときだけ使う設計であっても、この語彙は「どんな責務を1つのまとまりにするか」を考える道具として役立ちます。
      </p>
      <table>
        <thead>
          <tr><th>接尾辞</th><th>役割</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Service</td><td>業務手順を実行する</td><td><code>OrderService</code></td></tr>
          <tr><td className="hl">Repository</td><td>自前のデータの保存・取得を担当する</td><td><code>UserRepository</code></td></tr>
          <tr><td className="hl">Controller</td><td>リクエストの入口で処理を振り分ける</td><td><code>ContactController</code></td></tr>
          <tr><td className="hl">Client</td><td>外部API・サービスと通信する</td><td><code>StripeClient</code></td></tr>
          <tr><td className="hl">Handler</td><td>特定のイベント・処理にだけ応答する</td><td><code>SubmitErrorHandler</code></td></tr>
          <tr><td className="hl">Factory</td><td>オブジェクトの生成をまとめる</td><td><code>FormFieldFactory</code></td></tr>
          <tr><td className="hl">Validator</td><td>入力値の検証を行う</td><td><code>ContactFormValidator</code></td></tr>
          <tr><td className="hl">Manager</td><td>状態やリソースを継続的に管理する</td><td><code>ConnectionManager</code></td></tr>
        </tbody>
      </table>

      <Heading num="02">層としてのつながり</Heading>

      <DiagramFrame
        slug="design-conventions-classes-layers"
        aspect="660 / 280"
        caption="クラスの接尾辞と層の対応。Controllerがリクエストの入口で振り分け、Serviceが業務手順を実行し、その下でRepositoryが自前のデータを扱い、Clientが外部サービスと通信する。接尾辞がそのクラスの居場所を名前だけで伝える一方、接尾辞が付けにくいクラスは責務が曖昧になっている兆候でもある。"
      />

      <p>
        <code>Repository</code>は自前のデータ、<code>Client</code>は外部サービスが対象、という違いを押さえておくと、<code>Service</code>(業務手順)とどちらに処理を書くべきかで迷いにくくなります。この並びは、そのまま<Link href="/design/architecture-app-layered">レイヤー系アーキテクチャ</Link>の層に対応します。
      </p>

      <Heading num="03">やりたいことから接尾辞を選ぶ</Heading>
      <table>
        <thead>
          <tr><th>やりたいこと</th><th>接尾辞</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">注文キャンセルの一連の流れをまとめる</td><td>Service</td></tr>
          <tr><td className="hl">お知らせをDBから取得する</td><td>Repository</td></tr>
          <tr><td className="hl">POST /contact を受け付ける</td><td>Controller</td></tr>
          <tr><td className="hl">決済サービスのAPIを呼ぶ</td><td>Client</td></tr>
          <tr><td className="hl">429エラーを利用者向け文言に変換する</td><td>Handler</td></tr>
          <tr><td className="hl">メール形式を検証する</td><td>Validator</td></tr>
          <tr><td className="hl">フィールド種別ごとにValidatorを作る</td><td>Factory</td></tr>
        </tbody>
      </table>

      <Aside label="Manager と Util は危険信号">
        <code>Manager</code>や<code>Util</code>は何でも入る名前です。付けたくなったときは「このクラスは何を管理しているのか」を一言で言えるか確かめます。言えないなら、責務が定まっていないというサインで、これは<Link href="/design/principles-solid">単一責任の原則</Link>の話そのものです。名前が付けられないことは、設計が決まっていないことの現れです。
      </Aside>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>接尾辞が層を語る</h4><p>Controller・Service・Repository・Clientで、居場所が名前から分かる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>自前か外部かで分ける</h4><p>Repository は自前のデータ、Client は外部サービス。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>名付けられない=責務が曖昧</h4><p>Manager や Util に逃げたくなったら、設計を見直す合図。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/conventions-classes" />
    </DocsPage>
  );
}
