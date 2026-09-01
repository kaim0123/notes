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

export const metadata: Metadata = { title: "CloudWatch" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>CloudWatch ― 測る、貯める、鳴らす</h1>
        <Lead>
          数値・ログ・警報を1つにまとめた仕組みです。<Link href="/infra/monitoring-data">監視データと統計</Link>で見た読み方を、そのまま実装として使える形にしたものだと考えると分かりやすくなります。押さえる点は3つ ― <Term>既定で出ている数値と、自分で出す数値の違い</Term>、<strong>警報が状態を持つこと</strong>、そして<strong>ログは貯めるだけでは使えないこと</strong>です。
        </Lead>
      </Hero>

      <Heading num="01">既定の数値と、自分で出す数値</Heading>
      <p>
        ほとんどのサービスは、何もしなくても基本的な数値を出しています。ただし<strong>サービスの外から見える範囲</strong>に限られます。たとえば仮想サーバーのCPU使用率は既定で見えますが、メモリの使用量やディスクの空きは<strong>中に入らないと分からない</strong>ので、別途エージェントを入れて送る必要があります。
      </p>
      <p>
        アプリ固有の数値 ― 注文の確定数、決済の成功率 ― も同じで、自分で送らない限り存在しません(<Link href="/infra/monitoring-app">アプリ監視</Link>)。数を送る方法にはいくつかありますが、実装として簡単なのは<strong>決まった形式でログに出し、そこから数値を抽出する</strong>やり方です。アプリ側は普通のログを書くだけで済みます。
      </p>

      <Aside label="細かさと料金は連動する">
        既定より短い間隔で数値を取る設定にすると、料金は上がります。また、数値は<strong>組み合わせごとに1つの系列</strong>として数えられるため、識別子のような値を軸に加えると系列が爆発します ― これは<Link href="/infra/observability">オブザーバビリティ</Link>で見たのと同じ問題で、費用の面でも同じように効いてきます。
      </Aside>

      <Heading num="02">警報は状態を持つ</Heading>

      <DiagramFrame
        slug="infra-aws-cloudwatch-alarm"
        aspect="760 / 300"
        caption="しきい値による警報が状態を持つことを示した図。監視する数値は一定間隔で評価され、決めた回数連続でしきい値を超えると警報の状態へ移って通知が送られる。データそのものが届かない場合は正常でも異常でもない第三の状態になり、どちらとして扱うかは設定で決める。値が戻れば自動で正常へ戻り、そのときにも通知できる。1回の逸脱で鳴らさず、何回中何回でという条件を置けることが誤報を減らす鍵になる。"
      />

      <p>
        誤報を減らす道具は主に3つです ― <strong>連続回数の条件</strong>(3回中3回超えたら)、<strong>データ不足の扱い</strong>(値が来ないことを異常とするか)、そして<strong>複数の警報の組み合わせ</strong>(エラー率とリクエスト数の両方が条件を満たしたときだけ)。最後のものは、アクセスが少ない時間帯に1件のエラーでエラー率100%になって鳴る、という典型的な誤報を防ぎます。
      </p>

      <Heading num="03">ログは、検索できて初めて使える</Heading>
      <p>
        集めたログは、そのままでは量が多すぎて読めません。<strong>問い合わせて絞り込める形</strong>にして初めて調査に使えます。実務上の効き目が大きいのは、アプリ側の出し方です ― 構造化した形式(項目名と値の組)で出しておけば、そのまま条件で絞れます。
      </p>
      <p>
        もう1つは<strong>保存期間の設定</strong>です。既定で無期限に保持される設定のまま放置すると、費用が静かに積み上がります。調査に使う期間だけ手元に置き、長期保管が要るものは安い保存先へ移す ― <Link href="/infra/storage">保存クラス</Link>の話がそのままここにも当てはまります。
      </p>

      <Heading num="04">ダッシュボードは、見る順序を固定する道具</Heading>
      <p>
        グラフを並べる画面は「きれいに見せる」ためではなく、<strong>障害時に見る順序を固定する</strong>ためにあります。<Link href="/infra/observability">降りる順番</Link>で見たとおり、上から下へ範囲を狭める並びにしておけば、深夜でも同じ手順で調べられます。
      </p>
      <p>
        並べるものの目安は、上から<strong>利用者から見た指標</strong>(エラー率、応答時間)、<strong>アプリの指標</strong>(処理数、キューの滞留)、<strong>土台の指標</strong>(CPU、メモリ、接続数)。逆順に並べると、原因から見ることになって影響が分かりません。
      </p>

      <Heading num="まとめ">出す・鳴らす・読むを設計する</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>中の数値は自分で出す</h4>
          <p>既定で見えるのは外から分かる範囲だけ。業務の数値は誰も出してくれない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>条件で誤報を減らす</h4>
          <p>連続回数、データ不足の扱い、複数条件の組み合わせ。1回の逸脱で鳴らさない。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ログは構造化して、期限を切る</h4>
          <p>絞れる形で出し、保存期間を決める。貯めるだけなら費用にしかならない。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-cloudwatch" />
    </DocsPage>
  );
}
