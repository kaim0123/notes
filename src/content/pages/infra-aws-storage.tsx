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

export const metadata: Metadata = { title: "ストレージ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>ストレージ ― データをどの形で置くか</h1>
        <Lead>
          <Link href="/infra/server">サーバーとストレージ</Link>で見た3つの形 ― ブロック・ファイル・オブジェクト ― が、そのままサービスとして並んでいる分野です。名前を覚える必要はありません。<Term>アクセスの単位は何か</Term>という1つの問いに答えれば、選択肢は自動的に絞られます。そして実務では、もう1つの問いが費用を左右します ― <strong>それは本当に、いつも読むデータか</strong>。
        </Lead>
      </Hero>

      <Heading num="01">3つの形と、その代表</Heading>
      <table>
        <thead>
          <tr><th>形</th><th>代表</th><th>置くもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">オブジェクト</td><td>S3</td><td>画像・動画・バックアップ・ログ。HTTPで直接配信できる</td></tr>
          <tr><td className="hl">ブロック</td><td>EBS</td><td>OSの領域、データベースの実体。1台のサーバーに付ける</td></tr>
          <tr><td className="hl">ファイル</td><td>EFS</td><td>複数のサーバーから同時に読み書きする共有ディレクトリ</td></tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="infra-aws-storage-choice"
        aspect="700 / 300"
        caption="保存先を選ぶ判断の流れ。まず複数のサーバーから同時に読み書きするかを問い、必要ならファイル共有型を選ぶ。そうでなければ、ファイルの一部を頻繁に書き換えるかを問い、部分更新が続くならブロック型、書いたら丸ごと読むだけならオブジェクト型になる。オブジェクト型はHTTPで直接配信でき容量の上限も気にしなくてよいため、画像や動画、バックアップの置き場所になる。"
      />

      <Heading num="02">オブジェクトストレージが既定になる理由</Heading>
      <p>
        迷ったときの既定はオブジェクト型です。容量の上限を考えなくてよく、耐久性が桁違いに高く、そのまま配信網に載せられます。アプリが増えても<strong>置き場所の管理という仕事が増えません</strong>。
      </p>
      <p>
        逆に向かないのは、ファイルの一部を頻繁に書き換える用途です。更新は丸ごとの置き換えになるため、データベースの実体をここに置くことはできません。詳しくは<Link href="/infra/aws-s3">S3</Link>で扱います。
      </p>

      <Heading num="03">ブロックストレージの落とし穴</Heading>
      <p>
        ブロック型は特定の1つのゾーンに属し、<strong>同じゾーンのサーバーにしか付けられません</strong>。別のゾーンへ移したいときは、いったんスナップショットを取ってから復元します。これは制約というより、<Link href="/infra/aws-basics">AZという障害の単位</Link>がそのまま現れているだけです。
      </p>
      <p>
        費用の面では、<strong>付けていなくても、置いてあれば課金されます</strong>。サーバーを消したのにディスクだけ残っている、という状態が典型的な無駄で、<Link href="/infra/ops">コスト管理</Link>で最初に見つかるのはたいていこれです。性能の種類(容量あたりの読み書き速度)も選べるので、データベース用途では<Link href="/database/physical">物理設計</Link>と併せて決めます。
      </p>

      <Heading num="04">ファイル共有型は「本当に共有が要るか」</Heading>
      <p>
        複数のサーバーから同じディレクトリを見たい ― この要件は、実際には別の方法で解けることが多いものです。アップロードされたファイルの共有ならオブジェクト型で足りますし、セッションの共有ならキーバリューストアが適します。ファイル共有型は<strong>単価が高く、遅延も大きい</strong>ので、既存のアプリがファイルシステム前提で書かれている場合の橋渡し、と捉えるとちょうどよい距離感になります。
      </p>

      <Aside label="バックアップは別の話">
        ここで扱ったのは「どこに置くか」であって、「戻せるか」ではありません。スナップショットは同じ基盤の上にあり、権限を取られれば一緒に消えます。世代と切り離しの設計は<Link href="/infra/storage-backup">バックアップと復旧</Link>にあります。
      </Aside>

      <Heading num="まとめ">単位で選び、頻度で値段を決める</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>問いは1つ</h4>
          <p>アクセスの単位は何か。共有か、区画か、丸ごとか。ここが決まれば選択肢は1つに絞れる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>既定はオブジェクト型</h4>
          <p>上限を考えなくてよく、そのまま配信できる。部分更新が要るときだけ、下の層へ降りる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>置いてあるだけで課金される</h4>
          <p>付けていないディスク、消し忘れた世代。使っていないものほど気づかれない。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-storage" />
    </DocsPage>
  );
}
