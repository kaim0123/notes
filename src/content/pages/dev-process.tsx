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
  title: "開発プロセス",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>開発プロセス ― 工程の地図と、その回し方</h1>
        <Lead>
          システム開発は、いきなりコードを書き始めるわけではありません。<Term>要件定義</Term>から<Term>保守</Term>まで、いくつかの工程を進み、各工程で決まった成果物を作りながら次へ引き継いでいきます。ここではまず工程の地図を押さえ、続いてその工程を「どういう順番で・どの単位で」回すのかという進め方の型を見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">開発ライフサイクル ― 6つの工程</Heading>
      <p>
        典型的な開発は、次の工程を上流から下流へ流れていきます。それぞれが「何を決め、何を残すか」を押さえるのが第一歩です。
      </p>

      <table>
        <thead>
          <tr>
            <th>工程</th>
            <th>主な活動</th>
            <th>主な成果物</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">要件定義</td>
            <td>
              利害関係者から要求を聞き、<Term>何を作るか</Term>を文書化する。機能要件と非機能要件を分けて明確にする
            </td>
            <td>要件定義書</td>
          </tr>
          <tr>
            <td className="hl">設計</td>
            <td>
              要件を実現する<Term>仕組み</Term>を決める。画面や帳票などの外部設計と、モジュール分割やDB物理設計などの内部設計
            </td>
            <td>基本設計書・詳細設計書</td>
          </tr>
          <tr>
            <td className="hl">実装</td>
            <td>設計に基づいてプログラムを作る。規約と単体テストをセットで</td>
            <td>ソースコード</td>
          </tr>
          <tr>
            <td className="hl">テスト</td>
            <td>単体 → 結合 → システム → 受入れと、範囲を広げながら検証する</td>
            <td>テスト仕様書・結果報告</td>
          </tr>
          <tr>
            <td className="hl">導入・運用</td>
            <td>本番リリース、教育、運用開始</td>
            <td>リリース手順・運用マニュアル</td>
          </tr>
          <tr>
            <td className="hl">保守</td>
            <td>不具合修正(是正)、仕様変更への追随(適応)、予防</td>
            <td>変更記録</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        開発工程は料理のコースに似ています。何を作るか献立を決め(要件定義)、レシピを書き(設計)、調理し(実装)、味見して(テスト)、配膳し(導入)、反応を見て次に活かす(保守)。前の工程の成果物が次の工程の材料になる、という流れは共通です。
      </Analogy>

      <Aside label="このセクションでの扱い">
        工程のうち<Term>設計</Term>は<Link href="/design">設計セクション</Link>、<Term>テスト</Term>とレビューはテストセクション、<Term>導入と保守</Term>はインフラセクションが担当します。ここに置くのは、工程そのものの地図と進め方の型、そして要件定義です。同じ話題を工程軸と主題軸の2か所で管理しないためです。
      </Aside>

      <Heading num="02">ウォーターフォール ― 工程を順番に流す</Heading>
      <p>
        <Term>ウォーターフォールモデル</Term>は、工程を上流から下流へ一方向に進める考え方です。滝のように前の工程が終わってから次へ進み、各工程の終わりに成果物をレビューして品質を固めてから次に渡します。全体像を早く見通せる一方、後の工程で前工程の誤りが見つかると手戻りが大きくなります。
      </p>

      <DiagramFrame
        slug="dev-process-waterfall-agile"
        aspect="640 / 300"
        caption="ウォーターフォールとアジャイルの比較。上段のウォーターフォールは6工程が一直線に並び、前の工程が終わってから次へ進む。全体像は早く見通せるが、テストの段階で要件の誤りが見つかると最初まで戻る大きな手戻りになる。下段のアジャイルは、設計から実装・テスト・リリースまでの短い反復を繰り返す。1回の反復ごとに動くものが出てくるため、認識のずれは1反復ぶんの手戻りで済む。"
      />

      <Heading num="03">早く形にする ― プロトタイピングと段階的モデル</Heading>
      <p>
        ウォーターフォールの「後戻りが高くつく」弱点を補うため、早い段階で一部を形にして確かめる考え方があります。
      </p>

      <table>
        <thead>
          <tr>
            <th>モデル</th>
            <th>考え方</th>
            <th>ねらい</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">プロトタイピング</td>
            <td>試作品を早期に作り、利用者に確認してもらう</td>
            <td>要求の認識ずれを早く発見する</td>
          </tr>
          <tr>
            <td className="hl">段階的モデル</td>
            <td>システムを複数の部分に分け、優先度の高いものから開発・リリースする</td>
            <td>重要な機能を早く届け、リスクを分散する</td>
          </tr>
        </tbody>
      </table>

      <Heading num="04">アジャイル ― 変化を前提に小さく回す</Heading>
      <p>
        <Term>アジャイル</Term>は、短い期間で「設計 → 実装 → テスト → リリース」を繰り返し、要求の変化に合わせて計画を見直していく考え方の総称です。その価値観をまとめたのが<Term>アジャイルソフトウェア開発宣言</Term>で、「プロセスやツールよりも個人と対話を」「包括的なドキュメントよりも動くソフトウェアを」「契約交渉よりも顧客との協調を」「計画に従うことよりも変化への対応を」と、左記も尊重しつつ右記により価値を置くと述べています。
      </p>

      <table>
        <thead>
          <tr>
            <th>観点</th>
            <th>ウォーターフォール</th>
            <th>アジャイル</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">進め方</td>
            <td>工程を順番に一度だけ</td>
            <td>短い反復を繰り返す</td>
          </tr>
          <tr>
            <td className="hl">要求の変化</td>
            <td>固めてから着手(変更に弱い)</td>
            <td>変化を前提に見直す</td>
          </tr>
          <tr>
            <td className="hl">成果物の確認</td>
            <td>各工程末のレビュー</td>
            <td>反復ごとに動くものを確認</td>
          </tr>
          <tr>
            <td className="hl">向く場面</td>
            <td>要求が明確・大規模で統制が要る</td>
            <td>要求が不確実・素早く価値を出したい</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        フルコースを一度に出すか、少しずつ料理を運ぶかの違いです。前者は献立を最初に確定させて一気に仕上げる。後者は一皿ずつ出して感想を聞き、次の皿に反映する。要求が固まっているならフルコース、変わりやすいなら小出しが向きます。
      </Analogy>

      <Aside label="どちらか一方ではない">
        実務では、契約や監査の都合で工程の区切りはウォーターフォール的に置きつつ、中の開発は反復で回す、という混合がよくあります。大事なのは名前ではなく<Term>要求がどれだけ確定しているか</Term>で、確定していない部分ほど反復で確かめる回数を増やす、という判断です。
      </Aside>

      <Heading num="05">構造化手法 ― 大きな問題を分けて詳しくする</Heading>
      <p>
        プロセスモデルとは別に、各工程を進める技法として<Term>構造化手法</Term>があります。システムを機能のまとまりで階層構造化し、大まかな仕様から少しずつ詳細へ落としていく<Term>段階的詳細化</Term>で全体を組み立てます。設計面での具体的な手法は<Link href="/design/paradigm-structured">構造化</Link>で扱っています。
      </p>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>工程には成果物がある</h4>
          <p>
            「何を決めて何を残すか」を工程ごとに押さえると、全体の流れが見えます。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>順番に流すか、反復するか</h4>
          <p>
            ウォーターフォールは一方向、アジャイルは短い反復。同じ工程の並べ替えです。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>要求の性質で選ぶ</h4>
          <p>
            要求が固いか変わりやすいかで、向くプロセスと手戻りのコストが変わります。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/dev/process" />
    </DocsPage>
  );
}
