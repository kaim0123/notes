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
  title: "文字列探索",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>基礎理論</Eyebrow>
        <h1>文字列探索 ― 長い文章から短い語を見つける</h1>
        <Lead>
          エディタの検索、<code>grep</code>、ログの絞り込み、全文検索 ―
          どれも「長いテキストの中から、あるパターンが現れる位置を見つける」という同じ問題です。素朴に総当たりしても動きますが、
          <strong>「一致しなかった」という情報を捨てずに使う</strong>
          ことで、比較の回数は大きく減らせます。
        </Lead>
      </Hero>

      <Heading num="01">素朴な方法とその限界</Heading>
      <p>
        テキストの各位置にパターンを重ね、先頭から1文字ずつ比べる ― これが素朴法(力まかせ法)です。
      </p>
      <table>
        <tbody>
          <tr>
            <th>項目</th>
            <th>内容</th>
          </tr>
          <tr>
            <td className="hl">計算量</td>
            <td>最悪 O(n×m)(n=テキスト長、m=パターン長)</td>
          </tr>
          <tr>
            <td className="hl">実際の速さ</td>
            <td>普通の文章では十分速い。不一致がすぐ見つかるため</td>
          </tr>
          <tr>
            <td className="hl">苦手な入力</td>
            <td>
              <code>aaaaaaaa...</code> に <code>aaab</code> を探すような、
              <strong>ほぼ一致して最後で外れる</strong>ケース
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        問題は、不一致が起きたときに<strong>1文字だけずらして最初から比べ直す</strong>
        ことです。それまでに得た「途中まで一致していた」という情報を毎回捨てています。
      </p>

      <DiagramFrame
        slug="theory-string-search-shift"
        aspect="820 / 320"
        caption="素朴法とボイヤー・ムーア法のずらし方の違い。素朴法は不一致のたびに1文字だけずらして先頭から比べ直す。ボイヤー・ムーア法は末尾から比較し、不一致だった文字がパターンに含まれていなければパターンの長さぶん一気に飛ばせるため、多くの文字を読まずに済む。"
      />

      <Heading num="02">KMP法 ― 一致した分を無駄にしない</Heading>
      <p>
        <Term>KMP法(Knuth-Morris-Pratt)</Term>
        は、パターン自身をあらかじめ解析し、「途中で外れたとき、次はどこまで戻ればよいか」の表を作っておきます。
      </p>
      <Analogy label="💡 たとえるなら">
        合言葉を照合していて、10文字目で外れたとします。素朴法は「1文字ずらして1文字目から」やり直しますが、KMPは
        <strong>
          「9文字目までは合っていた。その中で先頭と重なる部分は3文字だから、4文字目から続ければよい」
        </strong>
        と知っています。すでに読んだ分を読み直しません。
      </Analogy>
      <p>
        テキストを一度も後戻りせずに読み切れるため、計算量は O(n+m) になります。ストリームのように
        <strong>戻れないデータ</strong>を扱えるのも利点です。
      </p>

      <Heading num="03">ボイヤー・ムーア法 ― 後ろから比べて大きく飛ぶ</Heading>
      <p>
        <Term>ボイヤー・ムーア法</Term>はパターンの<strong>末尾から</strong>
        比較します。不一致だった文字がパターンに含まれていなければ、
        <strong>パターンの長さぶん一気にずらせます</strong>。
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>KMP法</th>
            <th>ボイヤー・ムーア法</th>
          </tr>
          <tr>
            <td className="hl">比較の向き</td>
            <td>前から</td>
            <td>後ろから</td>
          </tr>
          <tr>
            <td className="hl">最悪計算量</td>
            <td>O(n+m)</td>
            <td>O(n×m)</td>
          </tr>
          <tr>
            <td className="hl">実際の速さ</td>
            <td>安定</td>
            <td>
              <strong>多くの場合こちらが速い</strong>(文字を読み飛ばせる)
            </td>
          </tr>
          <tr>
            <td className="hl">向く場面</td>
            <td>ストリーム、最悪値の保証が要る場面</td>
            <td>長いパターン、大きな文字集合(通常のテキスト検索)</td>
          </tr>
        </tbody>
      </table>
      <p>
        多くのエディタや <code>grep</code>{" "}
        の実装は、このボイヤー・ムーア系の手法(またはその改良)を採用しています。
        <strong>全文字を読まずに済む</strong>のが強みで、パターンが長いほど有利になります。
      </p>

      <Heading num="04">ラビン・カープ法 ― ハッシュで当たりを付ける</Heading>
      <p>
        <Term>ラビン・カープ法</Term>
        は、パターンのハッシュ値と、テキストの各位置の部分文字列のハッシュ値を比較します。ハッシュが一致したときだけ実際の文字列を確認します。
      </p>
      <p>
        鍵になるのは<strong>ローリングハッシュ</strong>です ―
        1文字ずらすたびに全体を計算し直すのではなく、「先頭を引いて末尾を足す」だけで次のハッシュが得られます。この工夫で全体を
        O(n+m) にできます(<Link href="/theory/hash">ハッシュ表</Link>と同じ発想の応用です)。
      </p>
      <Aside label="複数パターンの同時検索に強い">
        探したい語が1000個ある場合、ラビン・カープなら
        <strong>1000個のハッシュ値を集合に入れておくだけ</strong>
        で、テキストを1回走査するだけで済みます。剽窃検知や、複数キーワードのフィルタリングで使われるのはこの性質のためです。
      </Aside>

      <Heading num="05">辞書を引く ― トライとオートマトン</Heading>
      <p>
        「テキストが固定でパターンが変わる」のか、「パターンが固定でテキストが流れてくる」のかで、適した構造は変わります。
      </p>
      <table>
        <tbody>
          <tr>
            <th>状況</th>
            <th>適した手段</th>
          </tr>
          <tr>
            <td className="hl">パターンが多数、テキストは1回走査</td>
            <td>
              <Link href="/theory/tree">トライ</Link>を使ったAho-Corasick法
            </td>
          </tr>
          <tr>
            <td className="hl">テキストが固定、何度も検索する</td>
            <td>
              <strong>索引を作る</strong>(転置索引・接尾辞配列)
            </td>
          </tr>
          <tr>
            <td className="hl">パターンが正規表現</td>
            <td>
              有限オートマトンに変換して照合(「
              <Link href="/theory/formal">形式言語</Link>」)
            </td>
          </tr>
          <tr>
            <td className="hl">あいまい一致を許す</td>
            <td>
              <Link href="/theory/dp">編集距離</Link>(動的計画法)
            </td>
          </tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="theory-string-search-index"
        aspect="820 / 320"
        caption="転置索引の仕組み。文書ごとに含まれる語を並べた表を裏返し、語ごとに「どの文書に出てくるか」の一覧を持たせる。検索時はテキストを走査せず、語を引いて文書番号の並びを取り出すだけで済む。全文検索エンジンやデータベースの索引と同じ考え方。"
      />

      <p>
        2行目が全文検索エンジンの発想です。毎回テキスト全体を走査するのではなく、
        <strong>あらかじめ「どの語がどの文書に出るか」の索引を作っておく</strong> ―{" "}
        <Link href="/database/index">データベースのインデックス</Link>と同じ考え方です。
      </p>

      <Heading num="06">正規表現と実装の落とし穴</Heading>
      <p>
        正規表現は、内部的には<strong>状態機械への変換</strong>
        で照合されます。実装には大きく2系統あります。
      </p>
      <table>
        <tbody>
          <tr>
            <th>方式</th>
            <th>特徴</th>
            <th>危険</th>
          </tr>
          <tr>
            <td className="hl">オートマトン型</td>
            <td>入力長に対して線形時間を保証する</td>
            <td>後方参照など一部機能が使えない</td>
          </tr>
          <tr>
            <td className="hl">バックトラック型</td>
            <td>機能が豊富(JavaScriptなど多数の言語が採用)</td>
            <td>
              <strong>入力次第で指数時間</strong>になりうる
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        後者で <code>(a+)+b</code>{" "}
        のような入れ子の繰り返しを書くと、失敗の判定に膨大な組み合わせを試すことになり、短い入力でも処理が止まったようになります。これを突かれるのが
        <Term>ReDoS</Term>(正規表現によるサービス妨害)です。
      </p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>入れ子の繰り返しを避ける</h4>
          <p>
            <code>(x+)+</code> や <code>(x|x)*</code> のような書き方をしない。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>外部入力を正規表現にしない</h4>
          <p>
            利用者が渡した文字列をパターンとして使わない。使うならエスケープする。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>入力長を制限する</h4>
          <p>照合対象の長さに上限を設ける。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>単純な処理で置き換える</h4>
          <p>
            <code>includes</code> や <code>startsWith</code>{" "}
            で足りるなら、正規表現を使わない。
          </p>
        </Card>
      </CardGrid>

      <Heading num="07">実務での判断</Heading>
      <table>
        <tbody>
          <tr>
            <th>場面</th>
            <th>選択</th>
          </tr>
          <tr>
            <td className="hl">数KB程度のテキストを1回検索</td>
            <td>
              標準の <code>indexOf</code> / <code>includes</code> で十分。自前実装は不要
            </td>
          </tr>
          <tr>
            <td className="hl">大量の文書を何度も検索</td>
            <td>
              全文検索エンジン(索引を作る)。
              <Link href="/database/features">検索機能のDB設計</Link>も参照
            </td>
          </tr>
          <tr>
            <td className="hl">ログをリアルタイムに絞り込む</td>
            <td>単純な部分一致を優先。正規表現は必要な場所だけ</td>
          </tr>
          <tr>
            <td className="hl">表記ゆれを吸収したい</td>
            <td>
              正規化(全角半角・大文字小文字)を先に行う。
              <Link href="/theory/encoding">文字コード</Link>の理解が前提
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        日本語では、単語の区切りが空白で示されないため<strong>形態素解析やN-gram</strong>
        による分割が必要になります。「文字列探索」と「検索機能」の間には、この言語処理の層が挟まる点も押さえておきます。
      </p>

      <Heading num="まとめ">情報を捨てないと速くなる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>不一致も情報</h4>
          <p>
            KMPもボイヤー・ムーアも、失敗から「どれだけ飛べるか」を導いている。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>繰り返すなら索引</h4>
          <p>同じテキストを何度も探すなら、走査ではなく索引を作る。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>正規表現は計算量を持つ</h4>
          <p>
            便利さの裏で指数時間になりうる。外部入力と組み合わせるときは特に注意する。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/theory/string-search" />
    </DocsPage>
  );
}
