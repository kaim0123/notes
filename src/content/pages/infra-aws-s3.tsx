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

export const metadata: Metadata = { title: "S3" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ・クラウド・運用</Eyebrow>
        <h1>S3 ― 入れ物とキーだけでできている</h1>
        <Lead>
          <Link href="/infra/aws-storage">ストレージ</Link>で見たオブジェクト型の代表です。構成要素は驚くほど少なく、<Term>バケット</Term>という入れ物と、その中のオブジェクトを一意に指す<Term>キー</Term>しかありません。難しさは仕組みではなく、<strong>階層があるように見えて無い</strong>ことと、<strong>公開範囲の設定を間違えると全部が読まれる</strong>ことの2点に集まっています。この2つを外さなければ、あとは素直な道具です。
        </Lead>
      </Hero>

      <Heading num="01">フォルダは、見た目だけ</Heading>
      <p>
        画面にはフォルダが並んでいるように見えますが、実際に保存されているのは<strong>1本の長い文字列をキーとするオブジェクト</strong>です。スラッシュは画面が区切って表示しているだけで、ディレクトリという実体はありません。
      </p>

      <DiagramFrame
        slug="infra-aws-s3-key"
        aspect="760 / 280"
        caption="キーが階層に見えて実際は平らであることを示した図。画面上はフォルダが並んで見えるが、保存されているのは1本の文字列をキーとするオブジェクトの集まりで、ディレクトリという実体は無い。一覧の取得はキーの前方一致による検索にすぎないため、どの単位で切り出したいかが、そのままキーの先頭に何を置くかの設計になる。日付を先に置けば期間で、利用者IDを先に置けば利用者ごとに絞れる。"
      />

      <p>
        だからキーの設計は、後の使い勝手をそのまま決めます。「先月分だけ消したい」「この利用者の分だけ取り出したい」といった操作は、<strong>その単位がキーの先頭に来ていれば簡単、来ていなければ全件を走査</strong>することになります。後から変えるには全部を置き直すしかないので、最初に決めます。
      </p>

      <Heading num="02">公開範囲 ― 事故が最も多い場所</Heading>
      <p>
        クラウドからの情報漏えいとして報じられるものの多くは、基盤が破られたのではなく<strong>置き場所を誰でも読める状態にしていた</strong>という設定の問題です。
      </p>

      <DiagramFrame
        slug="infra-aws-s3-access"
        aspect="760 / 300"
        caption="保存したファイルを外へ届ける2つの経路。上は保存先そのものを公開して直接読ませる形で、手軽だが設定を誤れば全部が読まれ、誰がいつ読んだかも絞れない。下は保存先を非公開のままにして配信網だけに読み取りを許す形で、キャッシュも効き、限定した相手にだけ有効な期限付きのリンクも発行できる。原則として保存先は非公開のままにし、公開は配信の層で行う。"
      />

      <p>
        原則は3つです。<strong>既定で塞ぐ</strong>(公開を一括で禁止する設定を入れておく)、<strong>公開は配信の層で行う</strong>(保存先には配信網だけが読める権限を与える)、<strong>限定した共有は期限付きのリンクで行う</strong>(署名付きのURLは、その場だけ有効です)。アプリからのアップロードで直接この署名を使う設計は<Link href="/backend/upload">ファイルアップロード</Link>にあります。
      </p>

      <Heading num="03">上書きと削除から戻す</Heading>
      <p>
        <Term>バージョニング</Term>を有効にすると、上書きや削除のたびに古い版が残ります。削除は「削除の印を最新版として置く」動きになるので、印を消せば元に戻ります ― <strong>誤操作からの復旧手段</strong>として、これが最も手軽です。
      </p>
      <p>
        ただし古い版は保存料として積み上がります。だからバージョニングとライフサイクル(一定期間で古い版を消す、安いクラスへ移す)は<strong>必ず対で設定します</strong>。片方だけ入れると、数か月後に請求で気づくことになります。
      </p>

      <Aside label="バックアップの代わりにはならない">
        バージョニングは同じバケットの中の話なので、バケットごと消されれば一緒に消えます。権限を分けた別の場所へのコピーがあって初めて<Link href="/infra/storage-backup">3-2-1</Link>を満たします。
      </Aside>

      <Heading num="04">保存クラスと移行</Heading>
      <p>
        <Link href="/infra/storage">ストレージの仕組み</Link>で見たとおり、同じ容量でも読み出しの頻度に応じて何段もの値段があります。運用としては、<strong>一定期間を過ぎたら自動で下のクラスへ移し、さらに過ぎたら消す</strong>という規則をライフサイクルとして書いておきます。人が判断する運用にすると、必ず消し忘れが積み上がります。
      </p>

      <Heading num="まとめ">4つの軸で押さえる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>キーが設計そのもの</h4>
          <p>階層は見た目だけ。切り出したい単位を先頭に置く。後から変えるのは全件の置き直し。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>公開は配信の層で</h4>
          <p>保存先は非公開のまま。既定で塞ぎ、限定共有は期限付きのリンクを使う。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>版と期限は対で入れる</h4>
          <p>戻せるようにすると、消えないものが増える。移行と削除の規則を同時に書く。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/infra/aws-s3" />
    </DocsPage>
  );
}
