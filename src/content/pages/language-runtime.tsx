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
  title: "ランタイム",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>言語</Eyebrow>
        <h1>ランタイム ― JavaScriptはどこで動くのか</h1>
        <Lead>
          <Link href="/language/js">JavaScript・TypeScript</Link>で見た文法は、あくまで書き方のルールです。そのコードを実際に解釈して動かす環境が<Term>ランタイム</Term>で、ブラウザ・Node.js・Deno・Bunという複数の選択肢があります。「同じコードなのに動かない」の原因の多くは文法ではなく、その環境にその機能が無いことです。
        </Lead>
      </Hero>

      <Heading num="01">ランタイムとは何か</Heading>
      <p>
        JavaScriptのコードを解釈・実行するプログラムを<Term>JSエンジン</Term>と呼びます(代表例はGoogle製の<Term>V8</Term>)。しかしJSエンジン単体では、ファイルを読み書きしたり画面に何かを表示したりはできません。エンジンにその実行環境ならではの機能を組み合わせた「動かすための土台一式」が<Term>ランタイム</Term>です。
      </p>

      <DiagramFrame
        slug="language-runtime-layers"
        aspect="640 / 300"
        caption="同じJS/TSのコードが、ランタイムによって違う顔を持つことを示した層構造。ブラウザはV8などのエンジンにDOM操作・fetch・ストレージを組み合わせたもので、ファイルは触れない。Node.jsはV8にファイルシステム・ネットワーク・プロセスの機能を組み合わせたもので、DOMは存在しない。DenoもV8を使うが、ファイルとネットワークへのアクセスを既定で拒否する。BunはJavaScriptCoreを使い、パッケージ管理とバンドラを内蔵する。どれも「JSエンジン + その環境固有の機能」でできている。"
      />

      <Heading num="02">ブラウザ ― 最初の実行環境</Heading>
      <p>
        最初にJavaScriptを実行する場所として出会うのはブラウザです。ブラウザはHTMLとCSSからDOMを組み立てて画面を描き、JavaScriptはそのDOMを直接書き換えることで、クリックへの反応やアニメーションを実現します。通信を行う<code>fetch</code>、時間差で処理を実行する<code>setTimeout</code>など、<Term>Web API</Term>と呼ばれる機能群もブラウザが提供しているもので、言語仕様の一部ではありません。
      </p>

      <Heading num="03">Node.js ― JavaScriptをサーバーでも動かす</Heading>
      <p>
        2009年、ライアン・ダールはブラウザからV8エンジンを取り出し、ファイルの読み書きやネットワーク通信といったサーバー用途の機能を組み合わせた<Term>Node.js</Term>を作りました。これにより、ブラウザの中だけで完結していたJavaScriptがサーバー側でも動くようになります。フロントエンドとバックエンドを同じ言語で書けるようになったことは、この言語が爆発的に普及する転機になりました。世界最大のパッケージ生態系である<Term>npm</Term>も、Node.jsを前提に育ってきたものです。
      </p>

      <Heading num="04">Deno ― 生みの親が作り直したランタイム</Heading>
      <p>
        2018年、Node.jsの作者自身が、設計上の反省点(パッケージ管理の複雑さ、既定で何にでもアクセスできてしまう緩さ)を踏まえて開発したのが<Term>Deno</Term>です。ファイルやネットワークへのアクセスを既定で拒否し、必要な権限を明示的に許可する<Term>セキュアバイデフォルト</Term>の設計と、TypeScriptを追加設定なしで実行できる点が特徴です。
      </p>

      <Heading num="05">Bun ― 実行・バンドル・パッケージ管理を1つに</Heading>
      <p>
        <Term>Bun</Term>は2023年に正式版が公開された比較的新しいランタイムです。JSエンジンにApple製の<Term>JavaScriptCore</Term>を採用し、Zigで実装することで高速な起動・実行を目指しています。最大の特徴は、ランタイム・パッケージ管理・バンドラが1つの道具にまとまっている点です。
      </p>

      <table>
        <thead>
          <tr>
            <th>ランタイム</th>
            <th>登場年</th>
            <th>JSエンジン</th>
            <th>特徴</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">ブラウザ</td>
            <td>―</td>
            <td>V8 / SpiderMonkey など</td>
            <td>DOM操作やWeb APIを備える、最初の実行環境</td>
          </tr>
          <tr>
            <td className="hl">Node.js</td>
            <td>2009年</td>
            <td>V8</td>
            <td>事実上の業界標準。npm生態系の中心</td>
          </tr>
          <tr>
            <td className="hl">Deno</td>
            <td>2018年</td>
            <td>V8</td>
            <td>セキュアバイデフォルト、TypeScriptを標準サポート</td>
          </tr>
          <tr>
            <td className="hl">Bun</td>
            <td>2023年</td>
            <td>JavaScriptCore</td>
            <td>ランタイム・バンドラ・パッケージ管理を一体化</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        JavaScriptという言語が世界共通でも、それを動かすランタイムは国のようなものです。同じ言葉を話せても、国が違えば通貨も交通ルールも違うように、同じコードでもブラウザ・Node.js・Deno・Bunでは使えるAPIや前提が異なります。
      </Analogy>

      <Aside label="Node.jsの運用上の性質">
        Node.jsは1本のスレッドでイベントループを回すため、重いCPU計算を書くとその間すべてのリクエストが止まります。逆にI/O待ちには強く、少ないメモリで多数の接続をさばけます。この性質は<Link href="/language/concurrency-models">並行モデル</Link>で扱うイベントループそのもので、Node.jsの運用はこの1点を理解しているかで大きく変わります。
      </Aside>

      <Heading num="まとめ">言語は1つ、実行環境は複数</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ランタイム = エンジン + 環境の機能</h4>
          <p>JSエンジンだけではファイル操作も画面操作もできません。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>Node.jsが標準を築いた</h4>
          <p>ブラウザの外でJavaScriptを動かし、npm生態系を育てました。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>DenoとBunは別方向の改善</h4>
          <p>Denoはセキュリティ、Bunは速度と一体化を軸にしています。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/language/runtime" />
    </DocsPage>
  );
}
