import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Heading,
  DocsFooter,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Aside,
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "主要言語の比較",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; 言語</Eyebrow>
        <h1>主要言語の比較 ― 何を優先して設計されたか</h1>
        <Lead>
          言語の優劣を並べても意味がありません。どの言語も<strong>「何かを得るために何かを捨てる」</strong>という設計判断の結果です。実行方式・型・メモリ管理・並行モデルという4つの軸で並べると、それぞれが何を優先したのかが見えてきます。
        </Lead>
      </Hero>

      <p>ここまでに見た<Link href="/dev/language-basics/compile">実行方式</Link>・<Link href="/dev/language-basics/types">型システム</Link>・<Link href="/dev/language-basics/memory">メモリ管理</Link>・<Link href="/dev/concurrency/models">並行モデル</Link>の軸を使って、主要言語を横に並べます。</p>

      <Heading num="01">4軸で並べる</Heading>
      <table>
        <tbody>
          <tr><th>言語</th><th>実行方式</th><th>型</th><th>メモリ</th><th>並行モデル</th></tr>
          <tr><td className="hl">C / C++</td><td>コンパイル(機械語)</td><td>静的・弱め</td><td>手動 / RAII</td><td>OSスレッド + ロック</td></tr>
          <tr><td className="hl">Rust</td><td>コンパイル(機械語)</td><td>静的・強い・推論</td><td><strong>所有権</strong></td><td>スレッド + 型による安全性</td></tr>
          <tr><td className="hl">Go</td><td>コンパイル(機械語)</td><td>静的・簡素</td><td>GC(低停止時間重視)</td><td><strong>goroutine + チャネル</strong></td></tr>
          <tr><td className="hl">Java / C#</td><td>バイトコード + JIT</td><td>静的・公称・強い</td><td>GC(世代別)</td><td>スレッド / 仮想スレッド</td></tr>
          <tr><td className="hl">Python</td><td>バイトコード + VM</td><td>動的・強い(注釈あり)</td><td>参照カウント + GC</td><td>asyncio / マルチプロセス</td></tr>
          <tr><td className="hl">JavaScript / TS</td><td>JIT</td><td>動的・弱い / 静的・構造的</td><td>GC(世代別)</td><td><strong>イベントループ</strong></td></tr>
        </tbody>
      </table>
      <p>この表の各行は「歴史的にどんな問題を解こうとしたか」の要約でもあります(「<Link href="/dev/language-basics/history">プログラミング言語の歴史</Link>」)。</p>

      <Heading num="02">何を優先したのか</Heading>
      <CardGrid>
        <Card>
          <CardNumber>C</CardNumber>
          <h4>ハードウェアへの近さ</h4>
          <p>OSや組込みを書くため、メモリを直接扱える。安全性は書き手の責任に置いた。</p>
        </Card>
        <Card>
          <CardNumber>Go</CardNumber>
          <h4>大規模開発の単純さ</h4>
          <p>機能を意図的に絞り、誰が書いても似たコードになることを重視。ビルドが速く、1バイナリで配布できる。</p>
        </Card>
        <Card>
          <CardNumber>Rust</CardNumber>
          <h4>安全性と性能の両立</h4>
          <p>GCなしでメモリ安全とデータ競合の排除を実現。代償として学習コストを受け入れた。</p>
        </Card>
        <Card>
          <CardNumber>Py</CardNumber>
          <h4>書きやすさ</h4>
          <p>読みやすい構文と豊富なライブラリ。速度はC実装のライブラリに委ねる設計。</p>
        </Card>
      </CardGrid>

      <Heading num="03">性能の話をするときの注意</Heading>
      <p>「この言語は速い/遅い」という比較は、たいてい前提が抜けています。</p>
      <table>
        <tbody>
          <tr><th>観点</th><th>実際のところ</th></tr>
          <tr><td className="hl">CPU計算</td><td>C・Rust・Goが有利。JITのJava/JSも条件次第で近い水準に達する</td></tr>
          <tr><td className="hl">I/O待ちが支配的な処理</td><td><strong>言語による差はほぼ出ない</strong>。ネットワークとDBの待ちが大半を占める</td></tr>
          <tr><td className="hl">起動時間</td><td>ネイティブコンパイルが有利。JVMは起動が遅い(サーバーレスで効く)</td></tr>
          <tr><td className="hl">メモリ使用量</td><td>GC言語は余裕が必要。コンテナの上限設定に影響する</td></tr>
          <tr><td className="hl">開発速度</td><td>多くのプロジェクトでは、実行速度よりこちらが支配的な要因になる</td></tr>
        </tbody>
      </table>
      <p>Webアプリケーションの応答時間の大半は<strong>DBアクセスと外部API</strong>です。言語を変えて数割速くするより、<Link href="/database/performance">クエリを直す</Link>ほうが桁違いに効くのが普通です。</p>

      <Heading num="04">エラーの扱い方も分かれている</Heading>
      <table>
        <tbody>
          <tr><th>方式</th><th>言語</th><th>特徴</th></tr>
          <tr><td className="hl">例外</td><td>Java・Python・JS・C#</td><td>正常系が読みやすい。<strong>どこで捕まえるかが曖昧になりがち</strong></td></tr>
          <tr><td className="hl">戻り値でエラー</td><td>Go</td><td>すべての呼び出しで明示的に扱う。冗長だが見落としにくい</td></tr>
          <tr><td className="hl">Result型</td><td>Rust・Scala・Kotlin(一部)</td><td>型で成功/失敗を表し、<strong>未処理をコンパイルエラーにできる</strong></td></tr>
          <tr><td className="hl">検査例外</td><td>Java</td><td>宣言を強制する。実務では握りつぶされやすく賛否がある</td></tr>
        </tbody>
      </table>
      <p>どの方式でも設計上の要点は同じです ― <strong>回復できる失敗と、できないバグを区別する</strong>こと。詳細は「<Link href="/design/idioms/essentials">必修イディオム</Link>」も参照してください。</p>

      <Heading num="05">用途から選ぶ</Heading>
      <table>
        <tbody>
          <tr><th>作るもの</th><th>よく選ばれる言語</th><th>理由</th></tr>
          <tr><td className="hl">Webフロントエンド</td><td>TypeScript</td><td>ブラウザで動くのが実質これだけ</td></tr>
          <tr><td className="hl">Web API</td><td>TS(Node)・Go・Java・Python・C#</td><td>I/O主体なので言語差は小さく、チームの習熟が決め手</td></tr>
          <tr><td className="hl">CLIツール</td><td>Go・Rust</td><td>1バイナリで配布でき、起動が速い</td></tr>
          <tr><td className="hl">データ処理・機械学習</td><td>Python</td><td>ライブラリ生態系が圧倒的</td></tr>
          <tr><td className="hl">インフラ基盤・低レイヤ</td><td>Go・Rust・C</td><td>性能と資源制御。Kubernetes等の実装言語</td></tr>
          <tr><td className="hl">モバイル</td><td>Kotlin・Swift</td><td>各プラットフォームの標準</td></tr>
        </tbody>
      </table>
      <Analogy label="💡 たとえるなら">
        言語選びは工具選びです。ネジを回すのにハンマーは使えませんが、ネジが1本ならドライバーの銘柄はほとんど問題になりません。<strong>用途が合っているかが第一、その中では慣れている道具が最良</strong>です。
      </Analogy>

      <Heading num="06">選定で実際に効く基準</Heading>
      <p>技術的な優劣より、次のほうが結果を左右します。</p>
      <Steps>
        <li><strong>チームが書けるか</strong> ― 学習期間と、採用・引き継ぎのしやすさ</li>
        <li><strong>生態系が揃っているか</strong> ― 必要なライブラリ、クライアントSDK、フレームワークの成熟度</li>
        <li><strong>運用経験があるか</strong> ― 本番での監視・デバッグ・性能調整の知見</li>
        <li><strong>採用言語を増やしすぎないか</strong> ― 言語が1つ増えるたびにCI・監視・セキュリティ更新も増える</li>
        <li><strong>撤退できるか</strong> ― 合わなかったときに置き換えられる規模で始める</li>
      </Steps>
      <Aside label="言語を増やすコスト">
        「この部分だけRustで」は魅力的に見えますが、ビルド基盤・依存管理・脆弱性対応・レビューできる人の確保が<strong>言語の数だけ必要</strong>になります。小さなチームでは、多少の非効率を受け入れて1〜2言語に集約するほうが総合的に速いことが多くあります。
      </Aside>

      <Heading num="07">複数言語を学ぶ意味</Heading>
      <p>言語が変わっても、移せる知識と移せない知識があります。</p>
      <table>
        <tbody>
          <tr><th>移せるもの</th><th>移せないもの</th></tr>
          <tr><td className="hl">設計原則・<Link href="/design/paradigm">パラダイム</Link></td><td>標準ライブラリのAPI名</td></tr>
          <tr><td className="hl">計算量・データ構造の判断</td><td>ビルドツールの使い方</td></tr>
          <tr><td className="hl">並行処理・トランザクションの考え方</td><td>言語特有の落とし穴</td></tr>
          <tr><td className="hl">テスト・設計の進め方</td><td>フレームワークの流儀</td></tr>
        </tbody>
      </table>
      <p>左の列は言語をまたいで効き続ける資産です。2つ目の言語を学ぶと、<strong>1つ目で「言語の仕様」だと思っていたものが、実は設計判断だった</strong>と気付けます ― これが複数言語を学ぶ最大の効用です。</p>

      <Heading num="まとめ">捨てたものを見る</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>4軸で読む</h4><p>実行方式・型・メモリ・並行モデル。この組み合わせが言語の性格を作る。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>性能差は文脈次第</h4><p>I/O主体のアプリでは言語差は小さい。ボトルネックを測ってから判断する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>選定はチームの問題</h4><p>書ける人・運用経験・生態系。技術的な優劣より効く。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/language-basics/history" tag="実装">プログラミング言語の歴史</RelatedLink>
            <RelatedLink href="/dev/stack" tag="実装">技術スタックの組み合わせ</RelatedLink>
            <RelatedLink href="/design/paradigm" tag="設計">パラダイム一覧</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
