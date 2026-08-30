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
  title: "アーキテクチャ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>アーキテクチャ ― システムとアプリ、2つの粒度で見る</h1>
        <Lead>
          アーキテクチャという言葉には、粒度の異なる2つの話が混ざっています。複数のサービス・プロセスをどう分割して連携させるかという<Term>システムアーキテクチャ</Term>と、1つのアプリケーションの内部をどう役割に分けるかという<Term>アプリケーションアーキテクチャ</Term>です。会話が噛み合わないときは、たいていこの2つを取り違えています。まず両者を分けて眺め、最後に「どう選ぶか」を整理します。
        </Lead>
      </Hero>

      <Heading num="01">同じ言葉が指す、2つの粒度</Heading>

      <DiagramFrame
        slug="design-architecture-two-scales"
        aspect="700 / 340"
        caption="アーキテクチャの2つの粒度を並べた図。左のシステムアーキテクチャでは、注文・在庫・決済・通知の4つのサービスが線でつながれ、複数サービスをどう分割して連携させるかを表す。右のアプリケーションアーキテクチャは、その注文サービス1つの中身を拡大したもので、プレゼンテーション層・業務ロジック層・データアクセス層が上から下への矢印で並ぶ。同じ「分けて疎に保つ」発想を、粒度を変えて適用したものである。"
      />

      <p>
        両者は独立ではありません。マイクロサービスに分けても、1つ1つのサービスの内部が混沌としていれば保守性は上がりませんし、逆に内部がきれいに層で分かれていれば、後からサービスとして切り出すのも容易になります。
      </p>

      <Heading num="02">システムアーキテクチャの代表的なスタイル</Heading>
      <p>
        いずれも「その時代に何が苦しかったか」への回答として登場しています。年代と、解決したかった問題をセットで見るのが理解の近道です。
      </p>

      <table>
        <thead>
          <tr>
            <th>年代</th>
            <th>スタイル</th>
            <th>解決したかった問題</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">1970年代</td>
            <td>レイヤード</td>
            <td>UI・業務処理・DB処理が混在して保守しづらい。責務を水平な層に分け、隣接する層としか通信しない</td>
          </tr>
          <tr>
            <td className="hl">1970年代後半</td>
            <td>パイプライン</td>
            <td>データ変換処理を段階的に再利用したい。フィルターとパイプで一方向に連結する</td>
          </tr>
          <tr>
            <td className="hl">1980年代</td>
            <td>マイクロカーネル</td>
            <td>機能追加のたびに本体を変更するのを避けたい。最小限のコアにプラグインを差し込む</td>
          </tr>
          <tr>
            <td className="hl">1990年代後半</td>
            <td>SOA</td>
            <td>社内システムごとに機能が重複していた。共通サービス群として再利用する</td>
          </tr>
          <tr>
            <td className="hl">2000年代前半</td>
            <td>イベント駆動</td>
            <td>同期通信でシステム同士が密結合になる。起きたことを非同期に伝えて疎結合にする</td>
          </tr>
          <tr>
            <td className="hl">2000年代前半</td>
            <td>スペースベース</td>
            <td>アクセス集中でDBがボトルネックになる。メモリ上の処理ユニットで捌く</td>
          </tr>
          <tr>
            <td className="hl">2000年代後半</td>
            <td>サービスベース</td>
            <td>SOAはサービスの粒度が細かすぎた。数個程度の粗い粒度のドメインサービスに分ける</td>
          </tr>
          <tr>
            <td className="hl">2011年頃</td>
            <td>マイクロサービス</td>
            <td>独立して開発・デプロイできない。境界ごとにデータまで含めて独立させる</td>
          </tr>
          <tr>
            <td className="hl">2018年頃</td>
            <td>モジュラーモノリス</td>
            <td>マイクロサービスの運用コストが高すぎる。単一デプロイのまま内部だけを疎結合にする</td>
          </tr>
        </tbody>
      </table>

      <p>
        並べて分かるのは、<Term>分割の粒度が行き過ぎては揺り戻す</Term>という流れです。SOAは細かく分けすぎて複雑になり、サービスベースが粗い粒度に戻しました。マイクロサービスは再び細かく分け、その運用コストへの反動としてモジュラーモノリスが出てきました。「新しいほど良い」ではなく、規模と体制に見合う分割点を探し続けている、と読むのが実態に近いです。
      </p>

      <Aside label="分けると増えるコスト">
        サービスを分けると、それまで関数呼び出しで済んでいた処理がネットワーク越しの通信になります。ネットワークは失敗しうるのでリトライやタイムアウトが要り、複数サービスにまたがる更新は1つのトランザクションで守れなくなります。この最後の問題への答えが、<Link href="/database/distributed-transactions">分散トランザクション</Link>で扱うSagaやTCCです。
      </Aside>

      <Heading num="03">アプリケーションアーキテクチャの代表的なスタイル</Heading>
      <p>
        こちらは1つのアプリの内部の話です。数は多いものの、発想の系統でまとめると見通しがよくなります。
      </p>

      <table>
        <thead>
          <tr>
            <th>系統</th>
            <th>代表例</th>
            <th>何を分けるか</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">レイヤー系</td>
            <td>レイヤード、3層アーキテクチャ</td>
            <td>表示・業務・永続化という役割で水平に分ける</td>
          </tr>
          <tr>
            <td className="hl">GUI系</td>
            <td>MVC、MVP、MVVM</td>
            <td>表示と、表示のための状態・ロジックを分ける</td>
          </tr>
          <tr>
            <td className="hl">Web系</td>
            <td>Front Controller、Template View</td>
            <td>リクエストの受け口と、HTMLの組み立てを分ける</td>
          </tr>
          <tr>
            <td className="hl">ドメインモデル系</td>
            <td>Domain Model、Transaction Script</td>
            <td>業務ルールをオブジェクトに持たせるか、手続きとして書くか</td>
          </tr>
          <tr>
            <td className="hl">データアクセス系</td>
            <td>Active Record、Data Mapper、Repository</td>
            <td>オブジェクトとテーブルの対応づけを、どこに持たせるか</td>
          </tr>
          <tr>
            <td className="hl">ドメイン中心系</td>
            <td>Hexagonal、Onion、Clean Architecture</td>
            <td>業務ルールを中心に置き、技術的な詳細を外側へ追い出す</td>
          </tr>
          <tr>
            <td className="hl">高度な設計系</td>
            <td>CQRS、イベントソーシング</td>
            <td>読み取りと書き込みを別のモデル・別の経路に分ける</td>
          </tr>
        </tbody>
      </table>

      <p>
        データアクセス系の<Term>Active Record</Term>と<Term>Data Mapper</Term>は対になる選択です。前者は1レコードに相当するオブジェクト自身が保存・削除まで持つ形で、書き始めが速い代わりに業務ルールとDBの都合が混ざります。後者は変換専任の層を挟む形で、手間は増えますが業務ルールをDBから独立させられます。
      </p>

      <Heading num="04">依存の向きで見ると違いがはっきりする</Heading>
      <p>
        層に分けるという点ではレイヤードもドメイン中心系も同じで、違いは<Term>依存の矢印をどちらへ向けるか</Term>だけです。ここを押さえると、Clean ArchitectureやHexagonalが何をしたかったのかが一言で説明できます。
      </p>

      <DiagramFrame
        slug="design-architecture-dependency-direction"
        aspect="700 / 340"
        caption="依存の向きで見たアーキテクチャの対比図。左のレイヤードアーキテクチャは、UI・業務ロジック・データアクセス・データベースの4段が縦に積まれ、矢印は常に上から下へ向かうため、業務ロジックがデータベースに依存する。右のドメイン中心アーキテクチャは同心円で、外側からインフラ、ユースケース、中心にドメインが置かれ、矢印はすべて外側から中心へ向かう。ドメインが何にも依存しない中心になる。"
      />

      <p>
        矢印を内向きに揃えるための道具が、<Link href="/design/principles">設計原則</Link>で見た<Term>依存性逆転の原則(DIP)</Term>です。ドメイン側にインターフェースを置き、DBアクセスの実装がそれを満たす形にすれば、コードの依存はDBからドメインへ向きます。「フレームワークやDBを後から差し替えられる」という主張は、この矢印の向きから来ています。
      </p>

      <Analogy label="💡 どちらが正しいわけではない">
        レイヤードは素直で、読み始めるコストがほとんどありません。ドメイン中心は差し替えやすさと引き換えに、インターフェースと実装の往復が増え、小さなアプリではただ回りくどいだけになります。業務ルールが薄いCRUD中心のアプリならレイヤード、業務ルールが厚く長生きするならドメイン中心、というのが実務的な目安です。
      </Analogy>

      <Heading num="05">どう選ぶか</Heading>
      <p>
        アーキテクチャの選択は、技術的な優劣ではなく<Term>制約</Term>から決まります。判断材料になるのは、だいたい次の4つです。
      </p>

      <table>
        <thead>
          <tr>
            <th>判断材料</th>
            <th>見るポイント</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">チームの数と規模</td>
            <td>独立してデプロイしたいチームが複数あるか。1チームならモノリスで足りることが多い</td>
          </tr>
          <tr>
            <td className="hl">変更の頻度と場所</td>
            <td>頻繁に変わる部分と滅多に変わらない部分の境界。そこが分割線の候補になる</td>
          </tr>
          <tr>
            <td className="hl">スケール要件</td>
            <td>負荷が集中する機能だけを独立してスケールさせる必要があるか</td>
          </tr>
          <tr>
            <td className="hl">運用体制</td>
            <td>分散した障害を追える監視・ログ基盤と、それを運用する人がいるか</td>
          </tr>
        </tbody>
      </table>

      <p>
        迷ったときの現実的な出発点は、<Term>内部をモジュールで疎結合にしたモノリス</Term>です。分割の境界が正しかったかは実際に運用してみないと分からず、モノリス内部の境界なら引き直すのが安く済みます。境界が実証できてから、その線に沿ってサービスとして切り出せば手戻りが小さくなります。
      </p>

      <Heading num="まとめ">押さえておきたい4点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>まず粒度を確認する</h4>
          <p>
            システムの話かアプリ内部の話か。同じ「レイヤード」でも指しているものが違います。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>歴史は行き過ぎと揺り戻し</h4>
          <p>
            分割の粒度は細かくなっては戻る。新しいほど良いのではなく、規模に合う点を探しています。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>違いは依存の向き</h4>
          <p>
            レイヤードは上から下へ、ドメイン中心は外から内へ。DIPがその矢印を反転させます。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>制約から選ぶ</h4>
          <p>
            チーム数・変更頻度・スケール要件・運用体制。技術的な好みでは決まりません。
          </p>
        </Card>
      </CardGrid>

      <p>
        次は、このアーキテクチャの中で実際に使われる部品の作り方 ―
        <Link href="/design/patterns">設計パターン</Link>を見ていきます。
      </p>

      <DocsFooter href="/design/architecture" />
    </DocsPage>
  );
}
