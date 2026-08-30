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
  Diagram,
  RelatedList,
  RelatedLink,
  Timeline,
  TimelineItem,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "データベースの歴史",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>データベース</Eyebrow>
        <h1>データベースの歴史 ― 50年経っても現役の理由</h1>
        <Lead>
          スマートフォンもWebフレームワークも数年で古くなるIT業界で、1970年代に生まれた<Term>SQL</Term>は今もコンビニ決済・口座残高照会・ネットショッピングの裏側で動き続けています。一度はNoSQLに主役を奪われかけながら、なぜ関係データベースは半世紀も生き残ったのか。粘土板から始まるデータ管理の系譜と、「<Link href="/database/model">関係モデルと3層スキーマ</Link>」で見た関係モデルがどんな必要から生まれたのかを、時間軸で追っていきます。
        </Lead>
      </Hero>

      <Timeline>
        <TimelineItem era="紀元前">粘土板<br />メソポタミアの取引記録</TimelineItem>
        <TimelineItem era="1890">パンチカード<br />国勢調査 → IBMへ</TimelineItem>
        <TimelineItem era="1950s">磁気テープ<br />シーケンシャルアクセス</TimelineItem>
        <TimelineItem era="1966">IMS<br />階層型DBMS</TimelineItem>
        <TimelineItem era="1970">関係モデル<br />コッドの論文</TimelineItem>
        <TimelineItem era="1979">Oracle<br />世界初の商用SQL</TimelineItem>
        <TimelineItem era="1981">ACID理論<br />信頼性の確立</TimelineItem>
        <TimelineItem era="2009">NoSQL<br />スケール重視</TimelineItem>
        <TimelineItem era="2012">Spanner<br />NewSQLの復活</TimelineItem>
        <TimelineItem era="2020s">ベクトルDB<br />AIとの融合</TimelineItem>
      </Timeline>

      <Heading num="01">データ管理の原点 ― 紙から粘土板へ</Heading>
      <p>「データを記録して後で引き出す」という営みは、コンピュータよりはるかに古くから存在します。人類最古の「データベース」と呼べるのは、紀元前メソポタミアの<Term>粘土板</Term>です。くさび形文字で取引を記録し、焼き固めれば半永久的に保存できました。</p>
      <p>19世紀後半には<Term>パンチカード</Term>が登場します。1890年のアメリカ国勢調査でハーマン・ホレリスが開発したもので、穴の有無で0/1を表現する発想は後のコンピュータの基礎になりました。ホレリスの会社は、のちに<strong>IBM</strong>へと発展します ― この後の歴史でIBMが繰り返し主役を務めることになる、その原点です。</p>
      <p>1950年代、電子計算機の登場とともにデータは<Term>磁気テープ</Term>に記録されるようになります。しかしテープはデータを順番にしか読めない<Term>シーケンシャルアクセス</Term>で、1万件の中から1件を探すのに、最悪の場合1万件すべてを読む必要がありました。「目的のデータへ素早く辿り着きたい」という要求が、この後のデータベースの進化をずっと駆動していきます。</p>

      <Heading num="02">第1世代DBMS ― 階層型・ネットワーク型という迷宮</Heading>
      <p>1960年代、企業向けコンピュータの普及とともに、専用のデータ管理ソフトウェア(<Term>DBMS</Term>)が登場します。最初の主流は<Term>階層型データベース</Term>でした。1966年にIBMが開発した<Term>IMS(Information Management System)</Term>が代表格で、データを木構造(会社 → 部署 → 社員)で整理します。</p>
      <p>階層型の弱点は、1つのデータが<strong>複数の親を持てない</strong>ことでした。これを解決するため、1971年にCODASYLが標準化した<Term>ネットワーク型データベース</Term>は複数の親子関係を許しましたが、今度は構造が複雑化し、<Term>ポインタ(データの物理的な住所)</Term>を辿るプログラミングが極めて困難になります。</p>
      <p>どちらの方式も根本の問題は同じでした。目的のデータへ辿り着く<strong>ルートをプログラマーがすべてコードに書く</strong>必要があり、しかもそのコードは<strong>データの物理的な格納場所に依存</strong>していたのです。要件が変わってデータ構造を組み替えると、住所を丸暗記していたプログラムが軒並み壊れて書き直しになりました。エンジニアはビジネスロジックより「データがどこにあるか」の迷宮探索に時間を奪われていました。</p>
      <Analogy label="💡 たとえるなら">
        階層型・ネットワーク型は「本の置き場所(棚番号)を丸暗記していないと本を取り出せない図書館」です。棚の配置替えが起きるたびに、利用者全員が覚え直さなければなりません。この不便さを解消する発想が、次のリレーショナルモデルでした。
      </Analogy>

      <Heading num="03">コッドとリレーショナルモデル ― 物理から論理を切り離す</Heading>
      <p>1970年、IBM研究所の数学者<Term>E. F. コッド</Term>が、歴史を変える論文「大規模共有データバンクのためのデータのリレーショナルモデル」を発表します。核心は、<strong>データがどこに物理的に保存されているかを人間が気にしなくてよい</strong>という、論理構造と物理構造の完全な分離でした。「<Link href="/database/model">関係モデルと3層スキーマ</Link>」で見た<Term>データ独立性</Term>や<Term>3層スキーマ</Term>の思想は、ここに源流があります。</p>
      <p>利用者は「どう取るか(手順)」ではなく「何が欲しいか」だけを宣言すればよい ― この考え方を<Term>宣言型</Term>と呼びます。図書館で棚番号を知らなくても、司書に「この本ください」と言えば済むように、です。コッドはこれを<Term>集合論</Term>で厳密に定義しました。データを<Term>関係(リレーション=テーブル)</Term>として扱い、集合演算で操作を記述したのです。</p>
      <Aside label="なぜ数学だったのか">
        コッドがモデルを数学の上に築いたことが、後の生存の根本理由になりました。数学に基づく以上、ハードウェアや記憶媒体がどれだけ変わっても本質は揺らぎません。事実、この後にディスクもメモリもネットワークも激変しましたが、関係モデルはそのまま生き延びました。
      </Aside>

      <Heading num="04">SEQUELからSQLへ ― 言語の誕生とIBMのジレンマ</Heading>
      <p>意外なことに、<Term>SQL</Term>という言語そのものを設計したのはコッドではありません。論文に触発されたIBMの<Term>チェンバリン</Term>と<Term>ボイス</Term>です。コッドが思想の父、SQLはその思想を実装する言語という関係でした。最初の名称は<Term>SEQUEL(Structured English Query Language)</Term>でしたが、商標問題でEを抜いてSQLになります。ベテランが今も「シークェル」と読むのはこの名残で、どちらの読みも間違いではありません。</p>
      <p>ところが、当のIBMは論文を喜びませんでした。当時、階層型の<strong>IMSが爆発的に売れていた</strong>ため、関係データベースを製品化することは自社の稼ぎ頭を自ら壊すことを意味したのです。これは後に<Term>イノベーションのジレンマ</Term>と呼ばれる典型でした。IBMの関係データベース研究<Term>System R</Term>は社内プロジェクトにとどまり、商品化は後回しにされます。一方で論文自体は学会誌で公開され、誰でも読める状態にありました。</p>

      <Heading num="05">ラリー・エリソンとOracle ― 先行者が利益をさらう</Heading>
      <p>公開された論文を熱心に読み込んだのが、後に<Term>Oracle</Term>を創業する<Term>ラリー・エリソン</Term>でした。「これは使える。先に製品化すれば勝てる」と判断します。アイデアそのものに特許も著作権もない以上、公開された技術知見を参考にゼロから独自実装するのは合法でした。</p>
      <table>
        <thead>
          <tr><th>年</th><th>出来事</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1977</td><td>エリソンがSoftware Development Laboratories(後のOracle)を設立</td></tr>
          <tr><td className="hl">1979</td><td>Oracleが<strong>世界初の商用SQLデータベース</strong>をリリース</td></tr>
          <tr><td className="hl">1981</td><td>IBMがようやく初の商用製品SQL/DSを投入(先行者優位はOracleが掌握)</td></tr>
          <tr><td className="hl">1981</td><td>コッド本人が<Term>チューリング賞</Term>(計算機科学のノーベル賞)を受賞</td></tr>
        </tbody>
      </table>
      <p>発明者の論文が大企業に製品化を躊躇させ、その隙にライバルが先行者利益をさらう ― コッドは製品化競争には敗れましたが、学術的名誉は得ました。そして彼のモデルは、この後さらに大きな試練をくぐり抜けて生き残っていきます。</p>

      <Heading num="06">ACID ― SQLが信頼される最大の理由</Heading>
      <p>世界中の銀行が今もSQLを使い続ける決定的な理由が<Term>ACID特性</Term>です。トランザクション(一連の処理のまとまり)が満たすべき4つの性質を指します。</p>
      <table>
        <thead>
          <tr><th>特性</th><th>日本語</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">A ― Atomicity</td><td>原子性</td><td>処理は<strong>全部成功</strong>か<strong>全部なかったこと</strong>の2択。中途半端な状態は存在しない</td></tr>
          <tr><td className="hl">C ― Consistency</td><td>一貫性</td><td>トランザクション前後で常に有効な状態を保つ(残高マイナス禁止など、DBレベルで制約を守る)</td></tr>
          <tr><td className="hl">I ― Isolation</td><td>独立性</td><td>複数ユーザーが同時操作しても途中の半端な状態は見えない(ダーティリード防止)</td></tr>
          <tr><td className="hl">D ― Durability</td><td>永続性</td><td>コミットしたデータは停電・サーバー障害後も消えない(多くは<Term>WAL</Term>で実現)</td></tr>
        </tbody>
      </table>
      <p>典型例がATMの振込です。①自分の口座から10万円引く、②相手の口座に10万円足す ― この①だけ成功した瞬間に停電すると、10万円が宙に消えてしまいます。これを防ぐのが原子性で、失敗すれば処理全体を取り消す(<Term>ロールバック</Term>)ことで、必ず①と②はセットで成立します。金融では「99.9%正確」は0点で、100%でなければ意味がありません。この<strong>絶対に嘘をつかない</strong>信頼感こそ、SQLが手放されなかった核心です。独立性の厳密さは<Term>分離レベル</Term>(Read Committed / Serializableなど)で整合性と性能のトレードオフとして調整できます。</p>

      <Heading num="07">2000年代 ― NoSQLブームと「SQLは死んだ」</Heading>
      <p>インターネットの普及で、扱うデータの規模が桁違いになります。Google・Facebook・Amazonといった億単位のユーザーを抱えるサービスの前で、従来のRDBは「古い・遅い・スケールしない」と批判されるようになりました。ACIDを守りながら複数サーバーに分散すると、整合性を確認する通信コストが重くのしかかったのです。</p>
      <Aside label="CAP定理 ― 分散システムの宿命">
        ネットワークが分断されたとき、<strong>一貫性(Consistency)</strong>・<strong>可用性(Availability)</strong>・<strong>分断耐性(Partition tolerance)</strong>の3つを同時に完全には保てない、という定理です。分散システムでは必ずトレードオフが生じます。2006年のGoogle Bigtable論文は、スピードとスケールを優先し、複数テーブルにまたがる分散トランザクションをあえて捨てました。
      </Aside>
      <p>こうして2009年頃、関係型以外のDBを総称する<Term>NoSQL(Not only SQL)</Term>が爆発的に広まります。用途に応じて4つのタイプに分かれます。</p>
      <table>
        <thead>
          <tr><th>タイプ</th><th>仕組み</th><th>代表例</th><th>向いている用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">キーバリュー型</td><td>キーと値のペアで保存</td><td>Redis、DynamoDB</td><td>超高速。複雑な検索は不可</td></tr>
          <tr><td className="hl">ドキュメント型</td><td>JSON/XMLなどの文書をそのまま保存</td><td>MongoDB、CouchDB</td><td>柔軟なスキーマ</td></tr>
          <tr><td className="hl">列指向型</td><td>行ではなく列単位で保存</td><td>Cassandra、HBase</td><td>特定列の集計が超高速</td></tr>
          <tr><td className="hl">グラフ型</td><td>データ間の関係性を効率的に扱う</td><td>Neo4j</td><td>SNSの友達関係、路線図</td></tr>
        </tbody>
      </table>
      <p>多くのNoSQLはACIDを完全には保証せず、より緩い一貫性モデル<Term>BASE(Basically Available, Soft state, Eventually consistent)</Term>を採用しました。時間が経てばデータは揃う(<Term>結果整合性</Term>)という考え方です。SNSのいいね数が一瞬ずれるのは許容できるので、こうした用途にはよく合いました。</p>

      <Heading num="08">NoSQLの限界とNewSQL ― SQLの復活</Heading>
      <p>ところが数年後、NoSQLを採用した企業から悲鳴が上がります。「在庫数や口座残高が<strong>いずれ正しくなる</strong>では話にならない」。ACIDを捨てた結果、SQLが自動でやっていた整合性の担保を<strong>アプリ側で手書き</strong>する羽目になったのです。SQLが50年かけて磨いた仕組みを、バグ入りで再発明することになりました。</p>
      <p>転機は2012年、Googleの<Term>Spanner</Term>論文でした。世界中のデータセンターに分散しながら<strong>ACIDを完全保証する</strong>SQLベースのDBです。GoogleがSQLに「負けた」のではなく、NoSQLの限界を超える次の段階として、SQLの思想を再び採用したのです。コッドの「論理構造と物理構造の分離」は、どのサーバーにデータがあるかをユーザーが意識しないという点で、分散時代にこそ理想的でした。</p>
      <Diagram caption="関係モデルは、NoSQLに主役を奪われかけた後、分散対応を獲得したNewSQLとして復活した">
        <svg viewBox="0 0 620 150" xmlns="http://www.w3.org/2000/svg">
          <line x1={40} y1={95} x2={580} y2={95} stroke="#5f5f5f" strokeWidth="1.5" />

          <circle cx={110} cy={95} r={6} fill="#39ff6a" />
          <text x={110} y={70} fill="#f2f2f2" fontSize="11" textAnchor="middle">1970〜</text>
          <text x={110} y={120} fill="#9a9a9a" fontSize="10" textAnchor="middle">関係型 + ACID</text>

          <circle cx={310} cy={95} r={6} fill="#ff8080" />
          <text x={310} y={70} fill="#f2f2f2" fontSize="11" textAnchor="middle">2009〜</text>
          <text x={310} y={120} fill="#9a9a9a" fontSize="10" textAnchor="middle">NoSQL(スケール優先)</text>

          <circle cx={510} cy={95} r={6} fill="#39ff6a" />
          <text x={510} y={70} fill="#f2f2f2" fontSize="11" textAnchor="middle">2012〜</text>
          <text x={510} y={120} fill="#9a9a9a" fontSize="10" textAnchor="middle">NewSQL(分散 + ACID)</text>
        </svg>
      </Diagram>
      <p>分散・高性能とSQL/ACIDを両立させるこの流れは<Term>NewSQL</Term>と呼ばれ、CockroachDB・YugabyteDB・TiDB・PlanetScaleなどが続きます。Amazonも、DynamoDBを推進した後、MySQL/PostgreSQL互換の<Term>Aurora</Term>で分散SQLを強化しました。結局、みなが最終的にSQLの方向へ回帰したのです。</p>

      <Heading num="09">クラウドとAI時代 ― SQLはどう使われているか</Heading>
      <p>2010年代以降、DBは自前サーバーを持たずインターネット上のサービスとして使う<Term>クラウド</Term>が主流になりました。AWS・GCP・Azureが提供する<Term>マネージドサービス</Term>(Amazon RDS、Cloud SQLなど)により、サーバー管理なしでSQLを利用できます。伝統的なPostgreSQL・MySQL・SQL Server・Oracleは今も業務システムで現役で、特にPostgreSQLはオープンソースかつJSON対応など時代に合わせて進化し、開発者調査で毎年上位に入ります。</p>
      <p>2020年代、AIとの融合が新しい章を開いています。</p>
      <table>
        <thead>
          <tr><th>技術</th><th>内容</th><th>代表例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ベクトルDB</td><td>画像や文章を<strong>ベクトル(数値配列)</strong>に変換して保存し、意味の近いものを類似検索する。生成AIの知識検索(RAG)の基盤</td><td>Pinecone、Milvus</td></tr>
          <tr><td className="hl">Text-to-SQL</td><td>LLMが自然言語を SQL に変換して実行。「先月の地域別売上を見せて」と聞くだけでよい</td><td>各種BIツール</td></tr>
          <tr><td className="hl">自己チューニングDB</td><td>AIがパフォーマンス最適化・パッチ適用・故障予測を自動実行</td><td>Oracle Autonomous DB</td></tr>
        </tbody>
      </table>
      <p>注目すべきは、<Term>Text-to-SQL</Term>で操作画面が自然言語になっても、<strong>裏側で実行されているのは依然としてSQL</strong>だという点です。AIが自然言語を受け取り、確実にデータを操作する最後の一手として、やはりSQLが選ばれています。どんなプログラミング言語からでも、DBとの通信は最終的にSQLに帰着する ― SQLはデータベースの共通語(lingua franca)であり続けています。</p>

      <Heading num="まとめ">なぜSQLは古びないのか</Heading>
      <p>技術には、一過性の<strong>流行</strong>と、本質的な問題を解く<strong>普遍的なもの</strong>があります。SQLは後者でした。「データを論理的に操作したい」という欲求は、コンピュータが速くなっても分散されても変わりません。コッドはそれを<strong>数学</strong>で解き、数学は古びなかったのです。SQL自体もANSI標準(SQL-92、SQL:1999…)でウィンドウ関数やJSON操作を取り込みながら進化してきましたが、宣言型という根本思想はずっと変わっていません。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>物理からの独立が始まりだった</h4><p>格納場所を意識せず「何が欲しいか」だけ書ける宣言型が、迷宮探索からエンジニアを解放しました。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>数学に基づくから媒体が変わっても不変</h4><p>集合論の上に築かれた関係モデルは、ハードウェアの激変を生き延びました。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ACIDが金融の信頼を勝ち取った</h4><p>「絶対に嘘をつかない」保証が、銀行や基幹系でSQLを手放させませんでした。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>NoSQLを経てNewSQLで復活</h4><p>スケールのためACIDを捨てた反動が、分散対応のSQLとして最強の姿で戻ってきました。</p></Card>
      </CardGrid>
      <p>データベースの土台となる考え方は「<Link href="/database/model">関係モデルと3層スキーマ</Link>」で、要件からテーブルを導く手順は「<Link href="/database/design">ER図と正規化</Link>」で、障害から守る仕組みは「<Link href="/database/physical">物理設計と運用</Link>」で、それぞれ詳しく見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/database" tag="データベース">データベース(開発者向け)</RelatedLink>
                    <RelatedLink href="/database/design" tag="データベース">ER図と正規化</RelatedLink>
                    <RelatedLink href="/database/physical" tag="データベース">物理設計と運用</RelatedLink>
                    <RelatedLink href="/dev/language-basics/history" tag="開発">プログラミング言語の歴史</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
