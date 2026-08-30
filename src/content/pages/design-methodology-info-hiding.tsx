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
  DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "情報隠蔽",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>情報隠蔽 ― 変わりそうなものを軸にモジュールを切る</h1>
        <Lead>
          1972年、David Parnasは論文「On the Criteria to Be Used in Decomposing Systems into Modules」で、モジュールの分け方そのものを問い直しました。処理の手順で分けるのではなく、<Term>変わりやすい設計判断</Term>を1つのモジュールの中に閉じ込め、外部からは見えなくする ―
          これが方法論としての<Term>情報隠蔽</Term>です。
        </Lead>
      </Hero>

      <Aside label="設計原則の「情報隠蔽」との違い">
        <Link href="/design/principles-foundations">黎明期の原則</Link>で扱う情報隠蔽は「1つのクラスの内部状態を外部から直接触らせない」という実装レベルのルールです。ここで扱うのはもう1段上の話で、<Term>そもそもシステム全体をどんな軸でモジュールに分割するか</Term>という設計思想そのものを指します。
      </Aside>

      <Heading num="01">解決したかった問題</Heading>
      <p>
        当時主流だったモジュール分割は、フローチャートの処理手順をそのまま区切る<Term>処理手順ベース分割</Term>でした。この分け方は「次にどの処理をするか」を基準にするため、仕様の一部が変わっただけで、関係する複数のモジュールを同時に書き換える必要が生じがちでした。Parnasは、キーワード索引を作るシステムを例に、モジュールの区切り方を変えるだけで変更の影響範囲が大きく変わることを示しました。
      </p>

      <DiagramFrame
        slug="design-methodology-info-hiding-split"
        aspect="680 / 300"
        caption="処理手順ベース分割と情報隠蔽ベース分割の比較。左は読み込む・並べ替える・出力するという手順で分けた形で、データ形式を変えると3つすべてに変更が波及する。右は行の保持方法・並べ替えアルゴリズム・出力形式という変わりやすい判断ごとに分けた形で、データ形式を変えても該当する1モジュールの内側だけが変わる。分ける数は同じでも、軸が違えば波及範囲がまるで変わる。"
      />

      <table>
        <thead>
          <tr>
            <th>分割方針</th>
            <th>軸にするもの</th>
            <th>弱点</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">処理手順ベース分割</td>
            <td>「次に何をするか」という処理の流れ</td>
            <td>データ形式や実装方式の変更が複数モジュールへ波及する</td>
          </tr>
          <tr>
            <td className="hl">情報隠蔽ベース分割</td>
            <td>「将来変わりそうな設計判断」という秘密</td>
            <td>設計時に「何が変わりやすいか」を見極める必要がある</td>
          </tr>
        </tbody>
      </table>

      <Heading num="02">モジュールに「秘密」を持たせる</Heading>
      <p>
        Parnasの提案はシンプルです。それぞれのモジュールに1つの<Term>秘密(secret)</Term> ―
        「データがどんな形で保持されているか」「アルゴリズムがどう実装されているか」といった、将来変わる可能性が高い設計判断 ―
        を割り当て、その秘密を安定したインターフェースの内側に閉じ込めます。秘密が変わっても、インターフェースを呼び出す側のコードは書き換える必要がありません。「何を軸にモジュールを切り出すか」を最初に決めるという点で、これは実装のテクニックというより設計そのものの方法論です。
      </p>

      <Analogy label="💡 たとえるなら">
        家電製品は、ボタンやコンセントという安定したインターフェースを外に見せ、内部の回路がどう実装されているかは箱の中に隠しています。次のモデルで内部回路が総入れ替えになっても、同じボタン配置・同じコンセント形状であれば、使う側は何も変える必要がありません。情報隠蔽は、この考え方をソフトウェアのモジュール分割に適用したものです。
      </Analogy>

      <Heading num="03">特徴と向き不向き</Heading>
      <p>
        「変わりやすいものを隠す」という発想は、後のほぼすべての設計思想の土台になっています。<Link href="/design/methodology-responsibility-driven">責務駆動設計</Link>の責務も、<Link href="/design/methodology-ddd">ドメイン駆動設計</Link>の集約も、突き詰めれば「何を1つの秘密として閉じ込めるか」という同じ問いへの答えです。一方で、何が変わりやすいかを設計時に正しく見積もるのは簡単ではなく、見積もりを誤ると、隠したはずの境界をまたいで変更が波及します。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>処理手順ではなく秘密で分ける</h4>
          <p>「次に何をするか」ではなく「何が変わりやすいか」を軸にモジュールを切る。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>秘密はインターフェースの内側へ</h4>
          <p>変わりやすい設計判断を1モジュールに閉じ込め、外部への波及を止める。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>後続の方法論の共通土台</h4>
          <p>責務駆動設計・DDDなど、以降の方法論はすべてこの発想の延長線上にある。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/design/methodology-info-hiding" />
    </DocsPage>
  );
}
