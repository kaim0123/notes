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
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ER図と正規化",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>データベース</Eyebrow>
        <h1>ER図と正規化 ― エンティティ抽出からテーブルへ</h1>
        <Lead>
          「<Link href="/database/model">関係モデルと3層スキーマ</Link>」で見た<Term>概念スキーマ</Term>は、どうやって作ればよいのでしょうか。業務要件という文章から、エンティティを抽出し、ER図で関連を可視化し、<Term>正規化</Term>という手順でテーブルを段階的に分割していく ― この一連の流れを、「顧客が商品を注文する」という通しの例で見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">エンティティの抽出 ― 要件から名詞を拾う</Heading>
      <p>設計の出発点は、業務要件の文章から「記録しておくべきモノ・出来事」を洗い出すことです。次のような要件があったとします。</p>
      <Aside label="要件例">
        顧客は複数の注文を行う。1つの注文には複数の商品を含めることができ、1つの商品も複数の注文に含まれうる。注文ごとに、含まれる商品の数量を記録したい。
      </Aside>
      <p>この文章に出てくる名詞のうち、独立して存在し、複数の属性を持ちうるものを<Term>エンティティ(実体)</Term>候補として拾います。ここでは「顧客」「注文」「商品」の3つがエンティティにあたり、「複数の注文を行う」「複数の商品を含む」は、エンティティ同士の<Term>関連(リレーションシップ)</Term>を表しています。</p>

      <Heading num="02">エンティティの定義 ― 属性と識別子を決める</Heading>
      <p>エンティティが出そろったら、それぞれが持つ<Term>属性</Term>と、行を一意に特定する<Term>識別子(主キー候補)</Term>を決めます。</p>
      <table>
        <thead>
          <tr><th>エンティティ</th><th>属性</th><th>識別子</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">顧客</td><td>顧客ID、氏名、メールアドレス、郵便番号、住所</td><td>顧客ID</td></tr>
          <tr><td className="hl">注文</td><td>注文ID、受注日、顧客ID</td><td>注文ID</td></tr>
          <tr><td className="hl">商品</td><td>商品ID、商品名、単価</td><td>商品ID</td></tr>
        </tbody>
      </table>

      <Heading num="03">ER図の作成 ― エンティティと関連を図にする</Heading>
      <p><Term>ER図(実体関連図)</Term>は、エンティティを箱、関連を線で表し、線の両端に<Term>カーディナリティ(多重度)</Term>(1なのかN=多なのか)を書き添えた図です。前のページで見たとおり、多対多は直接表現できないため、<Term>注文明細</Term>という中間エンティティを挟んで2本の1対多に分解します。</p>
      <Diagram caption="顧客―注文は1対多、注文―商品は中間エンティティ「注文明細」を挟んで多対多を表現する">
        <svg viewBox="0 0 720 160" xmlns="http://www.w3.org/2000/svg">
          <rect x={10} y={55} width={130} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={75} y={85} fill="#f2f2f2" fontSize="12" textAnchor="middle">顧客</text>

          <rect x={220} y={55} width={130} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={285} y={85} fill="#f2f2f2" fontSize="12" textAnchor="middle">注文</text>

          <rect x={430} y={55} width={150} height={50} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={505} y={85} fill="#f2f2f2" fontSize="12" textAnchor="middle">注文明細</text>

          <rect x={640} y={55} width={70} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={675} y={85} fill="#f2f2f2" fontSize="12" textAnchor="middle">商品</text>

          <line x1={140} y1={80} x2={218} y2={80} stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={150} y={72} fill="#9a9a9a" fontSize="11">1</text>
          <text x={205} y={72} fill="#9a9a9a" fontSize="11">N</text>

          <line x1={350} y1={80} x2={428} y2={80} stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={358} y={72} fill="#9a9a9a" fontSize="11">1</text>
          <text x={415} y={72} fill="#9a9a9a" fontSize="11">N</text>

          <line x1={580} y1={80} x2={638} y2={80} stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={588} y={72} fill="#9a9a9a" fontSize="11">N</text>
          <text x={625} y={72} fill="#9a9a9a" fontSize="11">1</text>
        </svg>
      </Diagram>
      <p>注文明細は「注文ID + 商品ID」の組を主キーとし、そこに「数量」という、その組み合わせ固有の属性を持ちます。この注文明細が、後の節で正規化を説明する主役になります。</p>

      <Heading num="04">正規化とは ― なぜテーブルを分割するのか</Heading>
      <p><Term>正規化</Term>は、1つの表にすべての情報を詰め込んだ状態から、<Term>関数従属性(ある列の値が決まれば別の列の値も決まる、という依存関係)</Term>にもとづいてテーブルを段階的に分割し、データの重複と、それによって起きる3種類の<Term>更新時異常</Term>を取り除く手順です。</p>
      <p>次のような、注文・顧客・商品の情報を1つの表にまとめた(正規化前の)テーブルを例に考えます。</p>
      <table>
        <thead>
          <tr><th>注文ID</th><th>商品ID</th><th>顧客ID</th><th>顧客名</th><th>郵便番号</th><th>住所</th><th>商品名</th><th>単価</th><th>数量</th></tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>101</td><td>C1</td><td>山田</td><td>150-0001</td><td>東京都渋谷区</td><td>マグカップ</td><td>800</td><td>2</td></tr>
          <tr><td>1</td><td>102</td><td>C1</td><td>山田</td><td>150-0001</td><td>東京都渋谷区</td><td>ノート</td><td>300</td><td>1</td></tr>
          <tr><td>2</td><td>101</td><td>C2</td><td>佐藤</td><td>530-0001</td><td>大阪府大阪市</td><td>マグカップ</td><td>800</td><td>1</td></tr>
        </tbody>
      </table>
      <p>このテーブルには3種類の異常が潜んでいます。</p>
      <table>
        <thead>
          <tr><th>異常の種類</th><th>この例での具体例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">更新時異常</td><td>マグカップの単価を変えたいとき、マグカップが含まれる全行(注文1・注文2の行)を漏れなく更新しないと、同じ商品なのに単価が食い違ってしまう</td></tr>
          <tr><td className="hl">挿入時異常</td><td>まだ一度も注文していない新商品を登録したくても、「注文ID」が存在しないため行を作れない</td></tr>
          <tr><td className="hl">削除時異常</td><td>注文2(商品ID 101のみ)を取り消すと、その行にしか残っていなかった顧客「佐藤」の住所情報まで一緒に消えてしまう</td></tr>
        </tbody>
      </table>
      <p>正規化は、これらの異常を、テーブルを適切に分割することで防ぎます。分割は元のテーブルを<Term>結合(JOIN)</Term>すればいつでも復元できる形(<Term>無損失分解</Term>)で行われるため、情報が失われることはありません。</p>

      <Heading num="05">第一正規化 ― 繰り返しをなくす</Heading>
      <p><Term>第一正規化(1NF)</Term>は、すべてのセルが単一の値(<Term>原子値</Term>)だけを持つ状態にすることです。次のように、1つのセルに複数の値をカンマ区切りで詰め込んだ<Term>繰り返し項目</Term>を持つ表は1NFを満たしていません。</p>
      <table>
        <thead>
          <tr><th>注文ID</th><th>顧客ID</th><th>商品ID(カンマ区切り)</th></tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>C1</td><td>101, 102</td></tr>
        </tbody>
      </table>
      <p>この状態では「商品ID = 101の注文だけ検索する」といったSQLがうまく書けません。前節の例のように、1行1組み合わせ(注文ID・商品IDの組)になるまで行を分割すると1NFを満たします。</p>

      <Heading num="06">第二正規化 ― 部分関数従属をなくす</Heading>
      <p><Term>第二正規化(2NF)</Term>は、主キーが複数列からなる(<Term>複合主キー</Term>)テーブルが対象です。前節の表の主キーは「注文ID + 商品ID」ですが、「顧客名」「郵便番号」「住所」は主キーのうち<strong>注文ID側だけ</strong>で決まり、「商品名」「単価」は<strong>商品ID側だけ</strong>で決まっています。このように、複合主キーの一部だけで値が決まってしまう依存関係を<Term>部分関数従属</Term>と呼びます。</p>
      <p>部分関数従属している列を、決定する側の列を主キーとする別テーブルへ切り出します。</p>
      <table>
        <thead>
          <tr><th>分割後のテーブル</th><th>列</th><th>主キー</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">注文明細</td><td>注文ID、商品ID、数量</td><td>注文ID + 商品ID</td></tr>
          <tr><td className="hl">注文</td><td>注文ID、顧客ID、顧客名、郵便番号、住所</td><td>注文ID</td></tr>
          <tr><td className="hl">商品</td><td>商品ID、商品名、単価</td><td>商品ID</td></tr>
        </tbody>
      </table>
      <p>これで「マグカップの単価」は商品テーブルにただ1行だけ存在するようになり、05節の更新時異常は起きなくなりました。</p>

      <Heading num="07">第三正規化 ― 推移的関数従属をなくす</Heading>
      <p><Term>第三正規化(3NF)</Term>は、主キー以外の列同士が「主キー → 列A → 列B」という間接的な依存関係(<Term>推移的関数従属</Term>)を持つ場合が対象です。06節の注文テーブルでは、「郵便番号が決まれば住所が決まる」という関係があり、住所は主キー(注文ID)に直接ではなく、郵便番号を経由して間接的に決まっています。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`注文ID → 顧客ID → 郵便番号 → 住所
                        ~~~~~~~~~~~~~~~~
                        ここが推移的関数従属`}</code>
      </pre>
      <p>そこで「郵便番号 → 住所」の部分を、郵便番号を主キーとする別テーブルに切り出します。顧客テーブル自体も、注文テーブルから独立させます。</p>
      <table>
        <thead>
          <tr><th>分割後のテーブル</th><th>列</th><th>主キー</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">注文</td><td>注文ID、顧客ID</td><td>注文ID</td></tr>
          <tr><td className="hl">顧客</td><td>顧客ID、顧客名、郵便番号</td><td>顧客ID</td></tr>
          <tr><td className="hl">郵便番号マスタ</td><td>郵便番号、住所</td><td>郵便番号</td></tr>
        </tbody>
      </table>
      <p>ここまでの02〜07節を経て、最初の1つの表は「顧客」「注文」「注文明細」「商品」「郵便番号マスタ」の5テーブルに分割されました。実務のシステム設計では、多くの場合3NFまで満たしていれば十分とされます。</p>

      <Analogy label="💡 たとえるなら">
        正規化は「1冊の大福帳にすべてを書き込む」やり方から、「顧客台帳・注文台帳・商品台帳という専門の台帳に分けて、必要なときだけ突き合わせる」やり方への移行です。台帳を分けておけば、商品の値段が変わったときに書き換えるのは商品台帳の1か所だけで済みます。
      </Analogy>

      <Heading num="08">ボイス・コッド正規化、第四正規化、第五正規化 ― さらに厳密な正規化</Heading>
      <p>3NFより先にも、より厳密な正規形が定義されています。実務で意識する機会は少ないため、それぞれが「何を排除するか」だけ押さえておけば十分です。</p>
      <table>
        <thead>
          <tr><th>正規形</th><th>排除する対象</th><th>補足</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ボイス・コッド正規化(BCNF)</td><td>候補キーではない列を決定項とする関数従属</td><td>1つのテーブルに主キー候補(候補キー)が複数あり、それらが重なり合う特殊なケースで、3NFでは検出できない異常を防ぐ</td></tr>
          <tr><td className="hl">第四正規化(4NF)</td><td>互いに無関係な多値の事実が同じテーブルに同居する<Term>多値従属</Term></td><td>例:「社員が持つ複数の資格」と「社員が話せる複数の言語」を1つのテーブルに入れると、資格×言語の組み合わせが不必要に掛け合わされてしまう。資格テーブルと言語テーブルに分離する</td></tr>
          <tr><td className="hl">第五正規化(5NF)</td><td>候補キーだけからは導けない<Term>結合従属性</Term></td><td>3つ以上のエンティティが絡む特殊な関連で成立しうるが、実務で遭遇する頻度は非常に低い</td></tr>
        </tbody>
      </table>

      <Heading num="09">正規化のやりすぎに注意 ― 非正規化という選択</Heading>
      <p>正規化を進めるほど重複と更新時異常は減りますが、その代わりデータを読み出すときに<Term>結合(JOIN)</Term>するテーブルの数が増えます。テーブルが増えるほどJOINのコストも増えるため、「読み取り性能を優先して、あえて一部の重複を許し、正規化の段階を後退させる」<Term>非正規化</Term>という選択が取られることもあります。どこまで正規化し、どこで非正規化するかというトレードオフは、インデックス設計とあわせて別途扱います。</p>

      <Heading num="まとめ">要件からテーブルへ、段階的に分解する</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>設計の順番はエンティティ抽出→定義→ER図</h4><p>要件文の名詞からエンティティを拾い、属性と識別子を決め、関連を図にします。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>正規化は3種類の更新時異常を防ぐ分解</h4><p>更新時・挿入時・削除時の異常を、関数従属性にもとづいてテーブルを分けることで取り除きます。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>1NF→2NF→3NFの順に従属関係を断つ</h4><p>繰り返し(1NF)、部分関数従属(2NF)、推移的関数従属(3NF)の順に対処します。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>BCNF以降は実務では稀</h4><p>候補キーが重なる特殊なケースや多値従属など、遭遇する頻度は高くありません。</p></Card>
      </CardGrid>
      <p>ここまでで、要件から論理的なテーブル設計(概念スキーマ)を導く手順が固まりました。次は、これをSQLで操作する「<Link href="/database/sql">SQLとデータ操作</Link>」へ。実際のインデックス設計・冗長化・バックアップといった物理設計の実務は「<Link href="/database/physical">物理設計と運用</Link>」で扱います。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/database/model" tag="データベース">関係モデルと3層スキーマ</RelatedLink>
                    <RelatedLink href="/database/sql" tag="データベース">SQLとデータ操作</RelatedLink>
                    <RelatedLink href="/database/physical" tag="データベース">物理設計と運用</RelatedLink>
                    <RelatedLink href="/design/methodology/data-centric" tag="設計">データ中心設計</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
