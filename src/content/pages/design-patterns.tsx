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
  title: "設計パターン",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>設計パターン ― クラス数個の粒度で繰り返し現れる定石</h1>
        <Lead>
          設計パターンと言うと1994年の<Term>GoF</Term>の23個を指すことが多いですが、実際にはエンタープライズ開発・DDD・マイクロサービス・並行処理・関数型といった文脈ごとに、独自のパターン集が育っています。<Link href="/design/architecture">アーキテクチャ</Link>がシステムやアプリ全体の骨組みだとすれば、設計パターンはその骨組みの中の関節部分 ―
          クラス・オブジェクト数個の粒度で何度も現れる解決策のカタログです。
        </Lead>
      </Hero>

      <Heading num="01">パターンは「名前のついた解決策」</Heading>
      <p>
        パターンの価値は、目新しい技法である点ではありません。多くは知らないうちに書いているような形です。価値は<Term>名前がついていること</Term>にあります。「ここはStrategyで切り出そう」の一言で、構造も意図も相手に伝わる ―
        設計の会話を短くするための語彙、というのがパターンの実務的な役割です。
      </p>
      <p>
        一方で、カタログの存在が「使うべきもの」という圧力になりがちな点には注意が要ります。パターンは問題があってはじめて意味を持ちます。分岐が1つしかないところにStrategyを入れれば、間接的になっただけで何も良くなりません。
      </p>

      <Heading num="02">GoFの23パターン</Heading>
      <p>
        1994年にErich Gammaら4名(通称<Term>Gang of Four</Term>)がまとめた、最も有名なパターン集です。オブジェクト指向を前提に、23個を3つのグループへ分類しています。
      </p>

      <DiagramFrame
        slug="design-patterns-gof-categories"
        aspect="700 / 340"
        caption="GoFデザインパターン23個を3分類に整理した一覧図。生成(5個)はオブジェクトの作り方を柔軟にするSingleton・Factory Method・Abstract Factory・Builder・Prototype。構造(7個)は組み合わせ方を整理するAdapter・Bridge・Composite・Decorator・Facade・Flyweight・Proxy。振る舞い(11個)は責務の分担と通信を整理するChain of Responsibility・Command・Interpreter・Iterator・Mediator・Memento・Observer・State・Strategy・Template Method・Visitorで、最も数が多い。"
      />

      <h3>生成 ― どうやってインスタンスを作るか</h3>
      <table>
        <thead>
          <tr>
            <th>パターン</th>
            <th>目的</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Singleton</td>
            <td>インスタンスを1つに制限し、どこからでも同じものを参照させる</td>
          </tr>
          <tr>
            <td className="hl">Factory Method</td>
            <td>どのクラスを生成するかの決定を、サブクラス側に委ねる</td>
          </tr>
          <tr>
            <td className="hl">Abstract Factory</td>
            <td>関連する一連のオブジェクト群を、組み合わせごとまとめて生成する</td>
          </tr>
          <tr>
            <td className="hl">Builder</td>
            <td>複雑なオブジェクトの組み立て手順を分離し、段階的に構築する</td>
          </tr>
          <tr>
            <td className="hl">Prototype</td>
            <td>既存オブジェクトを複製して新しいインスタンスを作る</td>
          </tr>
        </tbody>
      </table>

      <Aside label="Singletonが敬遠される理由">
        Singletonはグローバルな状態そのものです。どこからでも書き換えられるため、テストごとに状態が持ち越されて結果が不安定になります。現代では、生成を1つに保つ役目はDI(依存性注入)コンテナの「シングルトンスコープ」に移り、パターンとして自分で書く機会は減りました。
      </Aside>

      <h3>構造 ― どう組み合わせて大きな構造を作るか</h3>
      <table>
        <thead>
          <tr>
            <th>パターン</th>
            <th>目的</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Adapter</td>
            <td>互換性のないインターフェース同士を変換してつなぐ</td>
          </tr>
          <tr>
            <td className="hl">Bridge</td>
            <td>抽象(何をするか)と実装(どうするか)を分け、独立に拡張できるようにする</td>
          </tr>
          <tr>
            <td className="hl">Composite</td>
            <td>個別のオブジェクトとその集合(木構造)を、同じインターフェースで扱う</td>
          </tr>
          <tr>
            <td className="hl">Decorator</td>
            <td>オブジェクトを包んで、動的に機能を追加する</td>
          </tr>
          <tr>
            <td className="hl">Facade</td>
            <td>複雑なサブシステム群に対して、単純な入口を用意する</td>
          </tr>
          <tr>
            <td className="hl">Flyweight</td>
            <td>共通部分を共有し、大量のオブジェクトのメモリ使用量を抑える</td>
          </tr>
          <tr>
            <td className="hl">Proxy</td>
            <td>本体への代理を挟み、アクセス制御・遅延生成・キャッシュなどを行う</td>
          </tr>
        </tbody>
      </table>

      <h3>振る舞い ― どう責務を分担し、どう通信するか</h3>
      <table>
        <thead>
          <tr>
            <th>パターン</th>
            <th>目的</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Chain of Responsibility</td>
            <td>処理できる担当が見つかるまで、要求を数珠つなぎに渡していく</td>
          </tr>
          <tr>
            <td className="hl">Command</td>
            <td>操作そのものをオブジェクトにして、実行・記録・取り消しを可能にする</td>
          </tr>
          <tr>
            <td className="hl">Interpreter</td>
            <td>簡易な言語の文法を、クラス構造として表現し解釈する</td>
          </tr>
          <tr>
            <td className="hl">Iterator</td>
            <td>内部構造を見せずに、要素を順に取り出す手段を提供する</td>
          </tr>
          <tr>
            <td className="hl">Mediator</td>
            <td>オブジェクト同士を直接つながせず、仲介役を経由させる</td>
          </tr>
          <tr>
            <td className="hl">Memento</td>
            <td>内部状態をカプセル化を破らずに保存し、後で復元する</td>
          </tr>
          <tr>
            <td className="hl">Observer</td>
            <td>状態の変化を、登録された複数の購読者へ通知する</td>
          </tr>
          <tr>
            <td className="hl">State</td>
            <td>状態ごとに異なる振る舞いを、状態オブジェクトとして切り出す</td>
          </tr>
          <tr>
            <td className="hl">Strategy</td>
            <td>アルゴリズムを交換可能な部品として切り出し、実行時に差し替える</td>
          </tr>
          <tr>
            <td className="hl">Template Method</td>
            <td>処理の骨組みを親クラスで定め、詳細な手順はサブクラスに任せる</td>
          </tr>
          <tr>
            <td className="hl">Visitor</td>
            <td>データ構造を変更せずに、新しい操作を追加できるようにする</td>
          </tr>
        </tbody>
      </table>

      <Heading num="03">Strategyを例に、構造を1つだけ見ておく</Heading>
      <p>
        パターンの構造がどういうものかは、代表格の<Term>Strategy</Term>を1つ見れば掴めます。「条件によって処理を変えたい」という、分岐で書きがちな要求への答えです。
      </p>

      <DiagramFrame
        slug="design-patterns-strategy"
        aspect="660 / 300"
        caption="Strategyパターンの構造図。左の商品一覧画面(Context)は、右の並び替え戦略というインターフェースだけを知って呼び出す。そのインターフェースには名前順・価格順・人気順という3つの実装がぶら下がり、それぞれがインターフェースを満たす。Contextは具体的な並び替え方法を知らないまま、実行時に戦略を差し替えられる。"
      />

      <p>
        分岐で書けば、並び替え方法を1つ増やすたびに呼び出し側のコードを書き換えることになります。Strategyでは実装クラスを1つ追加するだけで済み、呼び出し側は変更されません。<Link href="/design/principles">設計原則</Link>の<Term>開放閉鎖の原則(OCP)</Term>が言っているのは、まさにこの形です。
      </p>
      <p>
        なお、関数を値として渡せる言語では、インターフェースとクラスを作らずに関数を渡すだけで同じ効果が得られます。JavaScriptで比較関数を<code>sort</code>に渡すのは、Strategyの最小形と言えます。
      </p>

      <Heading num="04">エンタープライズパターン</Heading>
      <p>
        業務システムで「データをどう永続化し、業務ロジックをどこに置くか」を体系化したパターン集です(Martin Fowler)。実務での登場頻度はGoF以上です。
      </p>
      <table>
        <thead>
          <tr>
            <th>パターン</th>
            <th>目的</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Repository</td>
            <td>コレクションのように振る舞う窓口の背後に、永続化の詳細を隠す</td>
          </tr>
          <tr>
            <td className="hl">Unit of Work</td>
            <td>1つの処理単位で行われた変更をまとめて追跡し、一括でコミットする</td>
          </tr>
          <tr>
            <td className="hl">Data Mapper</td>
            <td>ドメインオブジェクトとDBスキーマの変換を、専用のクラスに担わせる</td>
          </tr>
          <tr>
            <td className="hl">Active Record</td>
            <td>1つのオブジェクトが、自身のデータと保存・削除の処理を両方持つ</td>
          </tr>
          <tr>
            <td className="hl">Service Layer</td>
            <td>アプリが提供する操作の境界を、トランザクション単位でまとめて定義する</td>
          </tr>
          <tr>
            <td className="hl">Domain Model</td>
            <td>業務ロジックを、オブジェクトの振る舞いとして表現する</td>
          </tr>
          <tr>
            <td className="hl">Transaction Script</td>
            <td>1つの業務処理を、そのまま1つの手続きとして書く</td>
          </tr>
          <tr>
            <td className="hl">Lazy Load</td>
            <td>関連データの読み込みを、実際に必要になるまで遅らせる</td>
          </tr>
        </tbody>
      </table>
      <p>
        Lazy Loadは、便利さの裏で<Term>N+1問題</Term>(一覧の各行ごとに追加のクエリが飛ぶ)の温床にもなります。ORMが自動でやってくれる挙動だからこそ、何が起きているかを知っておく必要があります。詳しくは<Link href="/database/performance">パフォーマンスチューニング</Link>で扱います。
      </p>

      <Heading num="05">DDDパターン</Heading>
      <p>
        <Term>ドメイン駆動設計(DDD)</Term>で体系化された、業務知識をそのままコードに表現するためのパターンです。
      </p>
      <table>
        <thead>
          <tr>
            <th>パターン</th>
            <th>目的</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Entity</td>
            <td>IDによって同一性が決まるオブジェクト(属性が変わっても同じもの)</td>
          </tr>
          <tr>
            <td className="hl">Value Object</td>
            <td>値によって同一性が決まる、不変なオブジェクト(金額・住所など)</td>
          </tr>
          <tr>
            <td className="hl">Aggregate</td>
            <td>整合性をまとめて保つべきオブジェクトの集まりと、その代表窓口</td>
          </tr>
          <tr>
            <td className="hl">Domain Service</td>
            <td>特定のオブジェクトに属さない業務ロジックの置き場</td>
          </tr>
          <tr>
            <td className="hl">Bounded Context</td>
            <td>1つのモデルが一貫した意味を持つ境界を明示する</td>
          </tr>
          <tr>
            <td className="hl">Ubiquitous Language</td>
            <td>その境界の中で、業務担当者とエンジニアが共有する統一語彙</td>
          </tr>
          <tr>
            <td className="hl">Anti-Corruption Layer</td>
            <td>異なる境界のモデルが混ざらないよう、変換層で隔離する</td>
          </tr>
        </tbody>
      </table>
      <p>
        <Term>境界づけられたコンテキスト</Term>は、マイクロサービスの分割単位を決める際の第一候補になる考え方でもあります。「同じ『顧客』という言葉が、営業と配送では別の意味で使われている」といったズレを、無理に1つのモデルへ統合せず、境界として認めるのが要点です。
      </p>

      <Heading num="06">マイクロサービスパターン</Heading>
      <table>
        <thead>
          <tr>
            <th>パターン</th>
            <th>目的</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">API Gateway</td>
            <td>外部からの入口を1箇所に集約し、認証・ルーティングをまとめて担う</td>
          </tr>
          <tr>
            <td className="hl">Saga</td>
            <td>サービスをまたぐ処理を段階的に実行し、失敗時は補償処理で取り消す</td>
          </tr>
          <tr>
            <td className="hl">TCC</td>
            <td>Tryで予約し、成功ならConfirm、失敗ならCancelで整合性を保つ</td>
          </tr>
          <tr>
            <td className="hl">Circuit Breaker</td>
            <td>呼び先の障害を検知したら、一定期間は呼び出し自体を遮断する</td>
          </tr>
          <tr>
            <td className="hl">Retry</td>
            <td>一時的な失敗に対し、間隔を空けながら呼び出しをやり直す</td>
          </tr>
          <tr>
            <td className="hl">CQRS</td>
            <td>更新系と参照系のモデル・経路を分離する</td>
          </tr>
          <tr>
            <td className="hl">Outbox</td>
            <td>DB更新とイベント発行を、1つのトランザクションで確実に両立させる</td>
          </tr>
          <tr>
            <td className="hl">Strangler Fig</td>
            <td>既存システムを一括ではなく、少しずつ新システムへ置き換える</td>
          </tr>
        </tbody>
      </table>
      <p>
        <Link href="/database/distributed-transactions">分散トランザクション</Link>では、2相コミット・Saga・TCCの違いと使い分けを詳しく扱っています。RetryとCircuit Breakerは対になる道具で、リトライだけを入れると障害時に負荷を掛け続けてしまうため、遮断の仕組みとセットで考えます。
      </p>

      <Heading num="07">並行処理・関数型のパターン</Heading>
      <p>
        複数の処理を同時に進める場面と、関数を値として扱う場面にも、それぞれ定石があります。多くはランタイムやライブラリの内部実装として、意識せずに使っているものです。
      </p>
      <table>
        <thead>
          <tr>
            <th>系統</th>
            <th>代表的なパターン</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">並行処理</td>
            <td>
              Producer-Consumer(キューで速度差を吸収)、Thread Pool(スレッドを使い回す)、Reactor(1つのイベントループがI/O完了を監視する)、Actor Model(共有メモリなしにメッセージだけでやり取りする)
            </td>
          </tr>
          <tr>
            <td className="hl">関数型</td>
            <td>
              純粋関数、イミュータビリティ、高階関数、関数合成、map/filter/reduce、カリー化、部分適用、Option/Result型によるエラー表現
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Node.jsのイベントループはReactorの実装ですし、DBのコネクションプールはThread Poolと同じ発想です。名前を知っておくと、フレームワークの内部で何が起きているかを言葉にできるようになります。
      </p>

      <Analogy label="💡 アーキテクチャとの関係">
        設計パターンは、アーキテクチャの中で実際に使われる部品です。Strategyはイベント駆動アーキテクチャのハンドラ切り替えに、Observerはイベント通知の仕組みそのものに、CommandはCQRSの書き込み処理の表現に使われます。アーキテクチャが建物の骨組みなら、パターンはその継ぎ手の作り方にあたります。
      </Analogy>

      <Heading num="08">パターンは目的から引く</Heading>
      <p>
        カタログを頭から覚えるより、困りごとから引けるようにしておくほうが実用的です。
      </p>
      <table>
        <thead>
          <tr>
            <th>困っていること</th>
            <th>候補</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">条件分岐が増え続ける</td>
            <td>Strategy、State</td>
          </tr>
          <tr>
            <td className="hl">外部ライブラリの形が合わない</td>
            <td>Adapter、Facade</td>
          </tr>
          <tr>
            <td className="hl">機能を後から足したい</td>
            <td>Decorator、Chain of Responsibility</td>
          </tr>
          <tr>
            <td className="hl">変更を他所へ知らせたい</td>
            <td>Observer、イベント駆動</td>
          </tr>
          <tr>
            <td className="hl">DBの都合が業務ロジックに漏れる</td>
            <td>Repository、Data Mapper</td>
          </tr>
          <tr>
            <td className="hl">外部呼び出しが不安定</td>
            <td>Retry、Circuit Breaker</td>
          </tr>
        </tbody>
      </table>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>価値は共通の語彙</h4>
          <p>
            構造そのものより、名前で意図が伝わることがパターンの効用です。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>カタログは1つではない</h4>
          <p>
            GoF・エンタープライズ・DDD・マイクロサービス・並行処理・関数型と、文脈ごとに育っています。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>問題が先、パターンが後</h4>
          <p>
            困りごとから引く。使う場所がないのに当てはめると、複雑さだけが残ります。
          </p>
        </Card>
      </CardGrid>

      <p>
        最後は、ここまでの設計判断を実際のコードとして書くときの表記の取り決め ―
        <Link href="/design/conventions">コーディング規約</Link>を見ていきます。
      </p>

      <DocsFooter href="/design/patterns" />
    </DocsPage>
  );
}
