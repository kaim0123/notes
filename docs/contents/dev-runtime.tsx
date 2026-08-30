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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ランタイム",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発</Eyebrow>
        <h1>ランタイム ― JavaScriptはどこで動くのか</h1>
        <Lead>
          前のページ「<Link href="/dev/language">JavaScript・TypeScript</Link>」で見た言語の文法は、あくまで「書き方のルール」です。そのコードを実際に解釈し実行する環境が<Term>ランタイム</Term>で、ブラウザ・<Term>Node.js</Term>・<Term>Deno</Term>・<Term>Bun</Term>など、複数の選択肢があります。
        </Lead>
      </Hero>

      <Heading num="01">ランタイムとは何か</Heading>
      <p>JavaScriptのコードを実際に解釈・実行するプログラムを<Term>JSエンジン</Term>と呼びます(代表例: Google製の<Term>V8</Term>)。しかしJSエンジン単体では、ファイルを読み書きしたり画面に何かを表示したりはできません。JSエンジンに、その実行環境ならではの機能(ブラウザなら画面操作、サーバーならファイル操作など)を組み合わせた「動かすための土台一式」が<Term>ランタイム</Term>です。</p>

      <Heading num="02">ブラウザという実行環境</Heading>
      <p>私たちが最初にJavaScriptを実行する場所として出会うのはブラウザです。「コンピュータ基礎」の「<Link href="/network/applications/web">Webの仕組み</Link>」で見た通り、ブラウザはHTML・CSSからDOM・CSSOMを組み立てて画面を描きますが、JavaScriptはそのDOMを直接書き換えることで、クリックへの反応やアニメーションを実現します。ブラウザにはこの他にも、通信を行う<code>fetch</code>や、時間差で処理を実行する<code>setTimeout</code>など、<Term>Web API</Term>と呼ばれる豊富な機能が用意されています。</p>

      <Heading num="03">Node.js ― JavaScriptをサーバーでも動かす</Heading>
      <p>2009年、Ryan DahlはブラウザのV8エンジンを取り出し、ファイルの読み書きやネットワーク通信などサーバー用途の機能を組み合わせた<Term>Node.js</Term>を作りました。これにより、それまでブラウザの中だけで完結していたJavaScriptを、サーバー側のプログラムとしても動かせるようになりました。フロントエンドとバックエンドを同じ言語で書けるようになったことは、JavaScriptが爆発的に普及する大きな転機になりました。世界最大のパッケージ管理エコシステム<Term>npm</Term>(前のカテゴリ「開発基盤」の「<Link href="/dev/tooling">パッケージ管理とビルド</Link>」参照)も、このNode.jsを前提に育ってきたものです。</p>

      <Heading num="04">Deno ― 生みの親が「作り直した」ランタイム</Heading>
      <p>2018年、Node.jsの作者であるRyan Dahl自身が、Node.jsの設計上の反省点(パッケージ管理の複雑さ、デフォルトで何でもファイル・ネットワークにアクセスできてしまうセキュリティの緩さなど)を踏まえて新たに開発したのが<Term>Deno</Term>です。デフォルトでファイル・ネットワークへのアクセスを拒否し、必要な権限を明示的に許可する<Term>セキュアバイデフォルト</Term>の設計や、TypeScriptを追加の設定なしにそのまま実行できる点が特徴です。</p>

      <Heading num="05">Bun ― 実行・バンドル・パッケージ管理を1つに</Heading>
      <p><Term>Bun</Term>は2023年に正式版が公開された、比較的新しいランタイムです。JavaScriptエンジンにApple製の<Term>JavaScriptCore</Term>を採用し、システムプログラミング言語のZigで実装することで高速な起動・実行を目指しています。最大の特徴は、ランタイム・パッケージ管理・バンドラー(前のカテゴリで見たViteのような役割)が1つのツールにまとまっている点で、複数の道具を組み合わせずに済みます。</p>

      <table>
        <thead>
          <tr><th>ランタイム</th><th>登場年</th><th>JSエンジン</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ブラウザ</td><td>―</td><td>V8 / SpiderMonkey など</td><td>DOM操作やWeb APIを備える、最初の実行環境</td></tr>
          <tr><td className="hl">Node.js</td><td>2009年</td><td>V8</td><td>事実上の業界標準。npmエコシステムの中心</td></tr>
          <tr><td className="hl">Deno</td><td>2018年</td><td>V8</td><td>セキュアバイデフォルト、TypeScriptを標準サポート</td></tr>
          <tr><td className="hl">Bun</td><td>2023年</td><td>JavaScriptCore</td><td>ランタイム+バンドラー+パッケージ管理を一体化、高速起動</td></tr>
        </tbody>
      </table>

      <Diagram caption="同じJavaScript/TypeScriptのコードでも、どのランタイムで動かすかによって使える機能や前提が変わる">
        <svg viewBox="0 0 620 130" xmlns="http://www.w3.org/2000/svg">
          <rect x={230} y={10} width={160} height={40} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={310} y={35} fill="#f2f2f2" fontSize="12" textAnchor="middle">JS / TSのコード</text>
          <rect x={20} y={80} width={130} height={40} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={85} y={105} fill="#f2f2f2" fontSize="11" textAnchor="middle">ブラウザ</text>
          <rect x={170} y={80} width={100} height={40} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={220} y={105} fill="#f2f2f2" fontSize="11" textAnchor="middle">Node.js</text>
          <rect x={290} y={80} width={100} height={40} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={340} y={105} fill="#f2f2f2" fontSize="11" textAnchor="middle">Deno</text>
          <rect x={410} y={80} width={100} height={40} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={460} y={105} fill="#f2f2f2" fontSize="11" textAnchor="middle">Bun</text>
          <line x1={290} y1={50} x2={90} y2={78} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={300} y1={50} x2={220} y2={78} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={320} y1={50} x2={340} y2={78} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={330} y1={50} x2={460} y2={78} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </Diagram>

      <Analogy label="💡 たとえるなら">
        JavaScriptという「言語」は世界共通でも、それを動かす「ランタイム」は国のようなものです。同じ日本語を話せても、日本とアメリカでは通貨も交通ルールも違うように、同じJavaScriptのコードでも、ブラウザとNode.jsとDenoとBunでは、使える機能(API)や前提となる仕組みが異なります。
      </Analogy>

      <Heading num="まとめ">言語は1つ、実行環境は複数</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>ランタイム=JSエンジン+実行環境の機能</h4><p>JSエンジンだけではファイル操作や画面操作はできません。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>Node.jsが業界標準を築いた</h4><p>ブラウザの外でJavaScriptを動かし、npmエコシステムを育てました。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>DenoとBunは異なる方向の改善</h4><p>Denoはセキュリティ、Bunは速度と一体化を軸にNode.jsの課題に応えています。</p></Card>
      </CardGrid>
      <p>言語と実行環境がわかったところで、次はその上に積み上がる「アプリの骨組み」を見ていきます。次のページ「<Link href="/dev/frontend/framework">フレームワーク・ライブラリ</Link>」では、React・Next.js・Express・Honoといった、開発の型を決める道具を扱います。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/dev/frontend/framework" tag="開発">フレームワーク・ライブラリ</RelatedLink>
                    <RelatedLink href="/dev/language" tag="開発">JavaScript・TypeScript</RelatedLink>
                    <RelatedLink href="/network/applications/web" tag="インターネット">Webの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
