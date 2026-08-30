import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "マイクロカーネルアーキテクチャ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>マイクロカーネルアーキテクチャ ― 本体を小さく、拡張はプラグインで</h1>
        <Lead>
          <Term>マイクロカーネルアーキテクチャ</Term>(プラグインアーキテクチャとも呼ばれます)は、1980年代、「機能を追加するたびに本体そのものを書き換えなければならず、拡張性が低い」という問題への回答として登場しました。
        </Lead>
      </Hero>

      <Heading num="01">解決したかった問題</Heading>
      <p>
        本体に機能を追加し続けると、本体はどんどん巨大化し、1つの機能追加が既存の動作に影響を与えるリスクも増えます。「本体は最小限のまま保ち、機能は後から差し込めるようにしたい」というのが動機です。
      </p>

      <Heading num="02">コア・プラグイン・レジストリ・コントラクト</Heading>

      <DiagramFrame
        slug="design-architecture-microkernel-plugins"
        aspect="660 / 300"
        caption="マイクロカーネルアーキテクチャの構成。中央に最小限の機能だけを持つコアシステムがあり、プラグインA・B・Cは共通のコントラクト(決まった形の窓口)経由でコアとつながる。コアの脇のレジストリが、どのプラグインが存在しどう呼び出せるかを台帳として管理する。プラグインを足しても消しても、コアのコードには手を入れない。"
      />

      <table>
        <thead>
          <tr><th>要素</th><th>役割</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">コアシステム</td><td>最小限の必須機能だけを持つ本体。個々のプラグインの詳細は知らない</td></tr>
          <tr><td className="hl">プラグイン</td><td>独立した追加機能。本体を書き換えずに機能を拡張する</td></tr>
          <tr><td className="hl">レジストリ</td><td>どのプラグインが存在し、どう呼び出せるかをコアが把握するための台帳</td></tr>
          <tr><td className="hl">コントラクト</td><td>プラグインが実装すべき共通のインターフェース・約束事</td></tr>
        </tbody>
      </table>
      <p>
        コアシステムはコントラクトという決まった形の窓口さえ守っていれば、どんなプラグインが差し込まれても動作します。これは<Link href="/design/principles-solid">開放閉鎖の原則</Link>を、システム全体の粒度で実現したものと言えます。
      </p>

      <Analogy label="💡 たとえるなら">
        ノートPCのUSBポートのようなものです。本体はUSBの規格さえ守っていれば、マウスでもキーボードでも外付けディスクでも後から自由に挿し替えられます。OSは「今どんな機器が挿さっているか」を一覧で管理しています。エディタやブラウザの拡張機能も、この発想で作られています。
      </Analogy>

      <Heading num="03">向き不向き</Heading>
      <p>
        製品としての柔軟な拡張(プラグイン市場の形成)に向く一方、プラグイン同士が想定外に依存し合うと、結局は密結合になり利点が薄れます。コントラクトの設計が緩すぎても厳しすぎても拡張のしやすさが損なわれる点には注意が必要です。
      </p>

      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>本体は最小限</h4><p>コアには必須の機能だけを持たせ、肥大化させない。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>拡張はプラグインで</h4><p>本体を書き換えず、独立した部品を差し込んで機能を追加する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>コントラクトが要</h4><p>プラグインが守るべき共通インターフェースの設計が、柔軟性を左右する。</p></Card>
      </CardGrid>

      <DocsFooter href="/design/architecture-microkernel" />
    </DocsPage>
  );
}
