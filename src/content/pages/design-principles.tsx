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
  title: "設計原則",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>設計原則 ― コードの良し悪しを判断する物差し</h1>
        <Lead>
          <Term>設計原則</Term>は、「このクラスは責務を持ちすぎていないか」「この依存関係は変更に弱くないか」といった、日々のコードレベルの意思決定を支える判断基準です。<Link href="/design/paradigm">パラダイム</Link>が書き方の流派、<Link href="/design/architecture">アーキテクチャ</Link>が全体の骨組みだとすれば、原則はそのどちらを選んでも共通して効いてくる物差しにあたります。
        </Lead>
      </Hero>

      <Heading num="01">4つのグループで整理する</Heading>
      <p>
        設計原則は数が多く、しかも略語(SRP・DRY・KISS…)ばかりで、一覧で眺めても頭に入りません。登場した時期と目的でグループに分けると、それぞれが何に答えようとしたものかが見えてきます。
      </p>

      <table>
        <thead>
          <tr>
            <th>年代</th>
            <th>グループ</th>
            <th>中身</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">1960-70年代</td>
            <td>黎明期の原則</td>
            <td>関心の分離・情報隠蔽・最小権限の原則</td>
          </tr>
          <tr>
            <td className="hl">1970年代〜</td>
            <td>保守性の基本</td>
            <td>高凝集・低結合・DRY・KISS・YAGNI</td>
          </tr>
          <tr>
            <td className="hl">1990年代後半</td>
            <td>SOLID</td>
            <td>SRP・OCP・LSP・ISP・DIP</td>
          </tr>
          <tr>
            <td className="hl">2000年代〜</td>
            <td>現代の原則</td>
            <td>Fail Fast・継承より合成・不変性・SSOT・明示は暗黙に勝る</td>
          </tr>
        </tbody>
      </table>

      <p>
        並べてみると、どのグループも突き詰めれば<Term>複雑さを分割し、変更の影響範囲を読める形に保つ</Term>という同じ目的に向かっていることが分かります。
      </p>

      <Heading num="02">黎明期の原則 ― 分けて、隠す</Heading>

      <h3>関心の分離(Separation of Concerns)</h3>
      <p>
        異なる関心事を1箇所に混ぜないという原則です。画面表示のコードの中にSQLが埋まっていると、画面の変更でもDBの変更でも同じファイルを触ることになり、変更の理由が交錯します。「これは何の関心事か」で切り分けるのが出発点です。
      </p>

      <h3>情報隠蔽(Information Hiding)</h3>
      <p>
        モジュールの内部の作りを外から見えなくし、外に見せるのは<Term>使い方</Term>だけにするという原則です。内部を隠しておけば、外に見せた約束さえ守る限り、中身は自由に作り替えられます。<Term>カプセル化</Term>はこの考え方をオブジェクト単位で実現した仕組みです。
      </p>

      <h3>最小権限の原則(Least Privilege)</h3>
      <p>
        必要最小限の権限しか与えないという原則です。もとはセキュリティの考え方ですが、コード上でも「とりあえず<code>public</code>」をやめて既定を<code>private</code>にする、読み取りしか要らない場所には読み取り専用の型を渡す、といった形で日常的に効いてきます。
      </p>

      <Heading num="03">高凝集・低結合 ― 分け方そのものの評価軸</Heading>
      <p>
        <Term>凝集度(cohesion)</Term>は1つのモジュールの中身がどれだけ関係の深いものだけで構成されているか、<Term>結合度(coupling)</Term>はモジュール同士がどれだけ強く依存し合っているかを表します。目指すのは<Term>高凝集・低結合</Term>です。
      </p>

      <DiagramFrame
        slug="design-principles-cohesion-coupling"
        aspect="680 / 300"
        caption="低凝集・高結合と高凝集・低結合の対比図。左では6つの部品がまとまりなく散らばり、互いに多数の線で絡み合っているため、どこを直すと何が壊れるか読めない。右では同じ6つの部品が3つずつ2つのモジュールにまとめられ、モジュール内は密に、モジュール間は1本の線だけでつながっている。部品の数は同じでも、まとめ方を変えるだけで影響範囲を読める形になる。"
      />

      <p>
        重要なのは、この2つが<Term>同じ操作の裏表</Term>だという点です。関係の深いものを1箇所に集める(凝集を上げる)と、モジュールをまたいだやり取りは自然に減ります(結合が下がる)。逆に、意味のつながりを無視して機械的にファイルを分けると、凝集は下がり結合は上がります。「ファイルを小さくする」ことと「うまく分ける」ことは別物です。
      </p>

      <Heading num="04">SOLID ― オブジェクト指向設計の5原則</Heading>
      <p>
        <Term>SOLID</Term>は、5つの原則の頭文字をつないだ総称です。名前自体に意味はないので、5つの中身を個別に理解すれば十分です。
      </p>

      <table>
        <thead>
          <tr>
            <th>略語</th>
            <th>原則</th>
            <th>言っていること</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">S / SRP</td>
            <td>単一責任の原則</td>
            <td>1つのクラス・関数が変更される理由は1つだけにする</td>
          </tr>
          <tr>
            <td className="hl">O / OCP</td>
            <td>開放閉鎖の原則</td>
            <td>既存コードを書き換えずに、追加で振る舞いを拡張できるようにする</td>
          </tr>
          <tr>
            <td className="hl">L / LSP</td>
            <td>リスコフの置換原則</td>
            <td>派生型は、基底型として使われている場所にそのまま置き換えられること</td>
          </tr>
          <tr>
            <td className="hl">I / ISP</td>
            <td>インターフェース分離の原則</td>
            <td>使わないメソッドまで実装させる大きなインターフェースを作らない</td>
          </tr>
          <tr>
            <td className="hl">D / DIP</td>
            <td>依存性逆転の原則</td>
            <td>具体的な実装ではなく、抽象(インターフェース)に依存する</td>
          </tr>
        </tbody>
      </table>

      <Aside label="SRPの「責任」は誰から見た責任か">
        単一責任の原則でいう責任とは「機能が1つ」ではなく「<Term>変更を要求してくる人が1人</Term>」という意味です。同じ請求書クラスでも、金額の計算ルールは経理部門、帳票のレイアウトは営業部門から変更を頼まれるなら、それは2つの責任であり分けるべきだ、と判断します。
      </Aside>

      <Heading num="05">DIP ― 依存の矢印を反転させる</Heading>
      <p>
        5つの中でもアーキテクチャに直結するのが<Term>依存性逆転の原則(DIP)</Term>です。素直に書くと、業務ルールを持つ上位のコードが、DBアクセスという下位の具体的な技術に依存します。この向きのままだと、DBを差し替えるたびに業務ルール側のコードまで巻き込まれます。
      </p>

      <DiagramFrame
        slug="design-principles-dip"
        aspect="700 / 370"
        caption="依存性逆転の原則の前後を比べた図。上段の通常の依存では、上位の注文サービスから下位のMySQL用保存処理へ矢印が直接伸びており、DBを差し替えると上位のコードも変わる。下段のDIP適用後では、注文サービスは注文リポジトリというインターフェース(抽象)にだけ依存し、MySQL実装とテスト用のインメモリ実装がそのインターフェースに向かって矢印を伸ばす。依存の矢印が実装側から抽象へ逆転している。"
      />

      <p>
        間に<Term>インターフェース(抽象)</Term>を1枚挟み、上位も下位もその抽象に依存する形にすると、依存の矢印が実装側から抽象へ向きます。これが「逆転」の意味です。結果として、本番ではMySQL実装を、テストではインメモリ実装を渡す、といった差し替えが上位のコードを一切変えずにできるようになります。<Link href="/design/architecture">アーキテクチャ</Link>で扱うClean ArchitectureやHexagonal Architectureは、この原則をシステム全体に適用したものです。
      </p>

      <Heading num="06">DRY・KISS・YAGNI ― 日々の判断基準</Heading>

      <h3>DRY(Don&apos;t Repeat Yourself)</h3>
      <p>
        同じ<Term>知識</Term>を複数箇所に重複させない、という原則です。注意したいのは、これが「同じ見た目のコードを1つにまとめよ」という意味ではないことです。たまたま今は同じ形をしているだけの2箇所を無理に共通化すると、片方の都合で変更するたびにもう片方に影響が出て、かえって変更しづらくなります。まとめるべきなのはコードの形ではなく、<Term>変更されるときに必ず一緒に変わるもの</Term>です。
      </p>

      <h3>KISS(Keep It Simple, Stupid)</h3>
      <p>
        必要以上に複雑な設計にしないという原則です。抽象化のレイヤーを1枚増やすたびに、読む人が追う手間も増えます。「将来の拡張に備えて」という理由で入れた仕組みは、その将来が来ないまま複雑さだけ残ることがよくあります。
      </p>

      <h3>YAGNI(You Aren&apos;t Gonna Need It)</h3>
      <p>
        今必要でない機能を先回りして作らない、という原則です。実際に必要になった時点で作れば、そのときには要件がはっきりしているぶん、より適切なものが作れます。
      </p>

      <Heading num="07">現代の原則</Heading>
      <table>
        <thead>
          <tr>
            <th>原則</th>
            <th>言っていること</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">Fail Fast</td>
            <td>おかしな状態はごまかさず、その場で失敗させる。原因から遠い場所でおかしくなるほど調査は難しくなる</td>
          </tr>
          <tr>
            <td className="hl">継承より合成</td>
            <td>振る舞いの再利用は、継承で親に縛られるより、部品を持たせて組み合わせるほうが変更に強い</td>
          </tr>
          <tr>
            <td className="hl">不変性を優先する</td>
            <td>既定は書き換えないデータ。書き換えを許す箇所を意図的に絞ると、状態の追跡が楽になる</td>
          </tr>
          <tr>
            <td className="hl">SSOT(単一の情報源)</td>
            <td>同じ事実を2箇所で持たない。持つとずれる</td>
          </tr>
          <tr>
            <td className="hl">明示は暗黙に勝る</td>
            <td>暗黙の前提や自動的な魔法より、読めば分かる形を選ぶ</td>
          </tr>
        </tbody>
      </table>

      <Heading num="08">原則同士はしばしば衝突する</Heading>
      <p>
        実務で難しいのは、原則を知らないことよりも、<Term>原則同士がぶつかったときにどちらを取るか</Term>です。原則は法律ではなく、トレードオフの言語化だと考えたほうが実態に合います。
      </p>

      <table>
        <thead>
          <tr>
            <th>ぶつかる場面</th>
            <th>判断の目安</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">DRY と KISS</td>
            <td>共通化すると間接的で読みにくくなるとき。「2箇所が同じ理由で変わるか」で決める。理由が違うなら重複を許す</td>
          </tr>
          <tr>
            <td className="hl">OCP と YAGNI</td>
            <td>拡張点を先に作るか。実際に2回目の変更が来てから抽象化しても遅くないことが多い</td>
          </tr>
          <tr>
            <td className="hl">SRP と KISS</td>
            <td>分けすぎるとファイル間の行き来が増える。「一緒に変更されるものは一緒に置く」を優先する</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        SOLIDは「1人1役」を徹底する原則群です。SRPは1人に仕事を1つだけ持たせること、OCPはその人のやり方を変えずに新しい仕事を足せるようにすること、DIPは上司が特定の部下ではなく役職(インターフェース)に指示を出すこと。役割分担という同じテーマを、違う角度から言い換えたものだと考えると全体像がつかみやすくなります。
      </Analogy>

      <Heading num="まとめ">まず押さえておきたい5つ</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>SRP(単一責任)</h4>
          <p>変更を要求してくる相手が違うなら、それは別の責任として分ける。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>DIP(依存性逆転)</h4>
          <p>具体実装ではなく抽象に依存する。差し替えとテストが一気に楽になる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>高凝集・低結合</h4>
          <p>関係の深いものを集めれば、モジュール間のやり取りは自然に減る。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>DRY(ただし知識の重複)</h4>
          <p>見た目が同じかではなく、一緒に変更されるかで判断する。</p>
        </Card>
        <Card>
          <CardNumber>5</CardNumber>
          <h4>KISS・YAGNI</h4>
          <p>今いらないものは作らない。複雑さは常にコストとして返ってくる。</p>
        </Card>
      </CardGrid>

      <p>
        次は、これらの原則をシステム全体の骨組みに適用した結果である<Link href="/design/architecture">アーキテクチャ</Link>を見ていきます。
      </p>

      <DocsFooter href="/design/principles" />
    </DocsPage>
  );
}
