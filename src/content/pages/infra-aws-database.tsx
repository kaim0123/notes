import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DiagramFrame,
  Card,
  CardGrid,
  CardNumber,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "データベース" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>データベース ― 運用を任せ、モデルを選ぶ</h1>
        <Lead>
          クラウドのデータベースサービスが引き受けるのは、<strong>運用の肩代わり</strong>です。バックアップ、更新の適用、故障時の切り替え、複製の追加 ― <Link href="/database">データベース</Link>そのものの仕組みは変わりません。選択で本当に迷うのは別の軸で、<Term>どのデータモデルを選ぶか</Term>と、<Term>複製を何のために増やすか</Term>の2つです。前者を間違えると後から作り直しになり、後者を取り違えると「複製したのに速くならない」という混乱が起きます。
        </Lead>
      </Hero>

      <Heading num="01">任せられること、残ること</Heading>
      <table>
        <thead>
          <tr><th>任せられる</th><th>自分に残る</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">バックアップの取得と保持</td><td>戻せるかの確認(<Link href="/infra/storage-backup">復元テスト</Link>)</td></tr>
          <tr><td className="hl">更新の適用と再起動の段取り</td><td>更新中の切断にアプリが耐えられるか</td></tr>
          <tr><td className="hl">故障時の待機系への切り替え</td><td>切り替え中の数十秒をどう扱うか</td></tr>
          <tr><td className="hl">複製の作成と維持</td><td>スキーマ設計、索引、遅いクエリ(<Link href="/database/performance">性能</Link>)</td></tr>
        </tbody>
      </table>
      <p>
        右の列は消えません。<strong>遅いのは、たいていサービスではなくクエリと索引</strong>です。管理を任せたぶん、こちらに集中できるようになった、と捉えるのが正しい理解です。
      </p>

      <Heading num="02">複製は、2つの別の目的を持つ</Heading>

      <DiagramFrame
        slug="infra-aws-database-replica"
        aspect="760 / 300"
        caption="データベースの複製が持つ2つの目的。上は待機系への複製で、同じ内容をもう1つのゾーンに持ち、主系が落ちたら切り替える。読み書きは常に主系だけなので性能は上がらず、目的は止めないこと。下は読み取り用の複製で、参照だけを振り分けて負荷を分散する。書き込みは主系にしか行えず、複製への反映にわずかな遅れがあるため、書いた直後に複製から読むと古い内容が返ることがある。"
      />

      <p>
        ここを混同すると、「待機系を用意したのに性能が変わらない」あるいは「読み取り複製を足したのに、落ちたら止まった」という結果になります。<strong>可用性のための複製と、性能のための複製は別物</strong>です。両方欲しければ両方用意します。
      </p>

      <Aside label="読み取り複製の遅れは、アプリの問題になる">
        登録した直後に一覧を表示すると、まだ反映されていない複製から読んで「登録できていない」ように見える ― これはよくある不具合です。対策は、<strong>書いた直後の参照だけ主系へ向ける</strong>か、画面側で書き込み結果をそのまま使うか。<Link href="/database/transaction">一貫性</Link>の議論が、そのままアプリの作りに出てくる場面です。
      </Aside>

      <Heading num="03">モデルの選択 ― 設計の出発点が逆になる</Heading>

      <DiagramFrame
        slug="infra-aws-database-model"
        aspect="700 / 280"
        caption="リレーショナル型とキーバリュー型で設計の出発点が逆になることを示した図。前者はまず構造を正規化して整え、問い合わせは後から結合と条件で組み立てる。後者はどんな問い合わせを何回するかを先に洗い出し、その取り出し方に合わせてキーの持ち方を決める。だから新しい取り出し方が必要になったとき、前者は問い合わせを書けば足りることが多く、後者はデータの持ち方そのものを作り直すことになりやすい。"
      />

      <p>
        キーバリュー型は、アクセスの形が決まっていれば桁違いに伸びます。裏を返せば、<strong>取り出し方が固まっていない段階で選ぶと苦しくなります</strong>。管理画面の集計、条件を変えた検索、新しい切り口のレポート ― こうした「後から出てくる要求」に弱いためです。
      </p>
      <p>
        判断の目安は、<strong>その規模が本当に来るのか</strong>。リレーショナル型で捌ける範囲なら、モデルの柔軟さを取るほうが総合的に速く進みます。両方を使い分ける構成(主要な業務データはリレーショナル、セッションや履歴はキーバリュー)も普通の選択です。
      </p>

      <Heading num="04">接続の数という上限</Heading>
      <p>
        クラウド特有の詰まりどころが、<strong>接続数</strong>です。<Link href="/infra/aws-lambda">関数</Link>やコンテナは負荷に応じて自動で増えますが、データベースの受けられる接続数は増えません。数百の実行環境が同時に立ち上がると、それぞれが接続を張ろうとして上限に当たります。
      </p>
      <p>
        対策は<Link href="/backend/data-pool">接続プール</Link>を挟むか、実行側の同時実行数を絞ること。「アプリは自動でスケールするのに、データベースは自動でスケールしない」という非対称は、設計時に必ず織り込んでおきます。
      </p>

      <Heading num="まとめ">任せた先に残るもの</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>運用は任せ、設計は残る</h4>
          <p>バックアップも切り替えも肩代わりされるが、スキーマとクエリは自分の仕事のまま。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>複製の目的を言い分ける</h4>
          <p>止めないためか、捌くためか。混同すると、どちらの効果も得られない。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>モデルは取り出し方で選ぶ</h4>
          <p>アクセスの形が固まっているならキーバリュー、変わるならリレーショナル。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-database" />
    </DocsPage>
  );
}
