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
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "開発環境",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>開発環境 ― ターミナルとシェルを使いこなす</h1>
        <Lead>
          プログラマーが真っ黒な画面に文字を打ち込んでいる ―
          あの画面が<Term>ターミナル</Term>で、そこに命令を打ち込んで対話する相手が<Term>シェル</Term>です。この2つを区別できるようになると、「エラーが出た画面」の正体が急にわかりやすくなります。
        </Lead>
      </Hero>

      <p>前のページ「<Link href="/os">OSの仕組み</Link>」で、OSと対話する方法にはアイコンをクリックする<Term>GUI</Term>と、文字で命令を打ち込む<Term>CLI</Term>の2種類があると紹介しました。ここからは、実際に開発をするうえで避けて通れないCLIの世界 ― ターミナルとシェル ― を詳しく見ていきます。</p>

      <Heading num="01">GUIとCLI、2つの操作方法</Heading>
      <p>ふだん私たちがパソコンを使うときは、ほとんどが<Term>GUI(グラフィカルユーザーインターフェース)</Term>です。アイコンをダブルクリックしたり、ファイルをドラッグ&ドロップしたりする、目で見て直感的に操作できる方式です。一方<Term>CLI(コマンドラインインターフェース)</Term>は、キーボードで文字の命令(コマンド)を打ち込んでコンピュータを操作する方式です。</p>
      <CardGrid>
        <Card><CardNumber>👆</CardNumber><h4>GUI</h4><p>アイコン・ウィンドウ・マウス操作。直感的だが、細かい操作や自動化には向かない。</p></Card>
        <Card><CardNumber>⌨️</CardNumber><h4>CLI</h4><p>文字によるコマンド入力。覚えるまでが大変だが、正確で速く、自動化(スクリプト化)しやすい。</p></Card>
      </CardGrid>
      <Analogy label="💡 たとえるなら">
        GUIは「絵文字で気持ちを伝える」ようなもの、CLIは「文章で正確に指示を伝える」ようなものです。絵文字は直感的ですが細かいニュアンスは伝えにくく、文章は多少覚える手間があっても、複雑な指示や同じ指示の繰り返しには圧倒的に向いています。開発の現場でCLIがよく使われるのは、この「正確さ」と「繰り返しやすさ(自動化)」のためです。
      </Analogy>

      <Heading num="02">ターミナルとは ― ただの「窓口」</Heading>
      <p><Term>ターミナル(端末)</Term>という言葉は、もともと1970年代以前にコンピュータ本体につないで使っていた、キーボードと画面だけの物理的な機械(テレタイプ端末)に由来します。現在の「ターミナルアプリ」は、その物理端末の役割をソフトウェアで再現したもので、正体は<strong>文字を入力し、結果を表示するだけの「窓口」</strong>です。ターミナル自身は命令の意味を理解しません。入力された文字を次に紹介する「シェル」に渡し、シェルが返してきた結果を画面に映しているだけです。</p>

      <Heading num="03">シェルとは ― 命令を解釈する通訳</Heading>
      <p><Term>シェル</Term>は、ターミナルから受け取った文字列(コマンド)を解釈し、OSのカーネルに「これを実行してほしい」と伝えるプログラムです。英語のshell(貝殻)の名の通り、カーネルという核を覆う殻のような立ち位置にいます。macOSやLinuxでは<code>bash</code>や<code>zsh</code>、Windowsでは<code>PowerShell</code>や<code>cmd</code>が代表的なシェルです。</p>
      <table>
        <thead>
          <tr><th>シェル</th><th>主な環境</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">bash</td><td>Linux(標準)、旧 macOS</td><td>最も普及している、多くの解説記事の対象</td></tr>
          <tr><td className="hl">zsh</td><td>macOS(標準)</td><td>bash互換+補完やテーマなどの拡張が豊富</td></tr>
          <tr><td className="hl">fish</td><td>Linux/macOS(任意導入)</td><td>初期状態から入力補完・色付けが親切</td></tr>
          <tr><td className="hl">PowerShell</td><td>Windows(標準)</td><td>結果を文字列でなくオブジェクトとしてやり取りできる</td></tr>
        </tbody>
      </table>

      <Diagram caption="ターミナルは窓口、シェルは通訳。実際に命令を実行するのはカーネル">
        <svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
          <rect x={10} y={75} width={130} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={75} y={105} fill="#f2f2f2" fontSize="13" textAnchor="middle">あなた</text>

          <rect x={180} y={75} width={130} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={245} y={98} fill="#f2f2f2" fontSize="12" textAnchor="middle">ターミナル</text>
          <text x={245} y={114} fill="#9a9a9a" fontSize="10" textAnchor="middle">(窓口・画面)</text>

          <rect x={350} y={75} width={130} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={415} y={98} fill="#f2f2f2" fontSize="12" textAnchor="middle">シェル</text>
          <text x={415} y={114} fill="#9a9a9a" fontSize="10" textAnchor="middle">(通訳・解釈)</text>

          <rect x={520} y={75} width={110} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={575} y={98} fill="#f2f2f2" fontSize="12" textAnchor="middle">カーネル</text>
          <text x={575} y={114} fill="#9a9a9a" fontSize="10" textAnchor="middle">(実行)</text>

          <line x1={140} y1={100} x2={178} y2={100} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <line x1={310} y1={100} x2={348} y2={100} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <line x1={480} y1={100} x2={518} y2={100} stroke="#5f5f5f" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f5f5f" />
            </marker>
          </defs>
          <text x={320} y={165} fill="#9a9a9a" fontSize="11" textAnchor="middle">「打ち込む→表示する」だけの窓口と、「意味を理解して伝える」通訳は別の役割</text>
        </svg>
      </Diagram>

      <Analogy label="💡 たとえるなら">
        レストランで考えると、<strong>ターミナル</strong>は「注文を伝えるための伝票とカウンター」、<strong>シェル</strong>は「注文を聞いて厨房に正確に伝えるウェイター」、<strong>カーネル</strong>は「実際に料理を作る厨房」です。あなたがウェイター(シェル)に「コーヒーをください」と伝えると、ウェイターは厨房(カーネル)に指示を出し、できあがったコーヒーがカウンター(ターミナル)経由であなたに届きます。
      </Analogy>

      <Heading num="04">覚えておきたい基本コマンド</Heading>
      <p>シェルに打ち込む命令のことを<Term>コマンド</Term>と呼びます。まずはファイルやフォルダを操作する、最低限のコマンドだけ押さえておきましょう。</p>
      <table>
        <thead>
          <tr><th>コマンド</th><th>意味</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><code>pwd</code></td><td>今いる場所(フォルダ)を表示</td><td><code>pwd</code></td></tr>
          <tr><td className="hl"><code>ls</code></td><td>今のフォルダの中身を一覧表示</td><td><code>ls -la</code></td></tr>
          <tr><td className="hl"><code>cd</code></td><td>フォルダを移動する</td><td><code>cd projects</code></td></tr>
          <tr><td className="hl"><code>mkdir</code></td><td>新しいフォルダを作る</td><td><code>mkdir new-app</code></td></tr>
          <tr><td className="hl"><code>rm</code></td><td>ファイル・フォルダを削除する</td><td><code>rm -r old-app</code></td></tr>
          <tr><td className="hl"><code>cat</code></td><td>ファイルの中身を表示する</td><td><code>cat package.json</code></td></tr>
        </tbody>
      </table>
      <Aside label="注意">
        GUIのゴミ箱と違い、<code>rm</code>で消したファイルは基本的に元に戻せません。特に<code>rm -r</code>(フォルダごと削除)は実行前にパスをよく確認する習慣をつけましょう。
      </Aside>

      <Heading num="05">コマンドが実行されるまでの5ステップ</Heading>
      <p>たとえば <code>ls</code> と打ち込んでEnterを押したとき、裏側では次のようなことが起きています。</p>
      <Steps>
        <li><strong>入力</strong>ターミナル上でコマンド文字列がシェルに渡される</li>
        <li><strong>構文解析</strong>シェルがコマンド名・オプション・引数に分解する</li>
        <li><strong>検索</strong>シェルが<code>PATH</code>という設定を頼りに、そのコマンドの実体(プログラム)を探す</li>
        <li><strong>プロセス生成</strong>シェルがOSに依頼し、そのプログラム用の新しいプロセスを作って実行する</li>
        <li><strong>結果表示</strong>カーネルが実行し、出力結果をシェル経由でターミナルに返す</li>
      </Steps>
      <p>「プロセス」については前のページ「<Link href="/os">OSの仕組み</Link>」で扱った通り、OSが管理する実行中のプログラムの単位でした。コマンドを打つたびに、裏では小さなプロセスが生まれては消えている、というわけです。</p>

      <Heading num="まとめ">ターミナルとシェルの役割分担</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ターミナルは窓口</h4><p>文字を入力し、結果を表示するだけの画面。命令の意味は理解していません。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>シェルは通訳</h4><p>入力されたコマンドを解釈し、OSのカーネルに実行を依頼する役目を担います。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>慣れが必要な道具</h4><p>最初は覚えることが多く感じますが、繰り返し使ううちに手に馴染んでいきます。</p></Card>
      </CardGrid>
      <p>ターミナルとシェルの使い方がわかったところで、次はいよいよ「コードをどう管理し、どう動く形に組み立てるか」という話に進みます。次のページ「<Link href="/dev/tooling">パッケージ管理とビルド</Link>」では、npm・pnpm・Viteといった、実際の開発で毎日触れる道具を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/tooling" tag="開発">パッケージ管理とビルド</RelatedLink>
                    <RelatedLink href="/network/applications/ssh" tag="ネットワーク">SSH接続 ― リモートサーバーへ</RelatedLink>
                    <RelatedLink href="/os" tag="OS">OSの仕組み</RelatedLink>
                    <RelatedLink href="/os/shell" tag="OS">シェルの系譜</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
