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
  Timeline,
  TimelineItem,
  TimelineLabel,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "インターネットの歴史",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インターネット</Eyebrow>
        <h1>インターネットの歴史 ― 「壊れない通信網」を作る戦いから始まった</h1>
        <Lead>
          インターネットはもともと「便利な情報共有ツール」として生まれたわけではありません。冷戦時代、「一箇所が破壊されても機能し続ける通信網をどう作るか」という軍事的な課題への答えとして誕生しました。
        </Lead>
      </Hero>

      <Heading num="01">きっかけは、ソ連の人工衛星</Heading>
      <p>1957年、ソ連は世界初の人工衛星<strong>スプートニク1号</strong>の打ち上げに成功します。アメリカはこれに大きな衝撃を受け(「スプートニク・ショック」)、科学技術で後れを取らないよう研究機関ARPA(高等研究計画局)を設立します。この危機感が、後のインターネットの母体となる研究への投資につながりました。</p>

      <h3>ポール・バランの「分散ネットワーク」</h3>
      <p>当時の通信網の多くは、電話交換局のような<strong>1つの中心</strong>にすべての回線が集まる構造でした。しかしこれでは、その中心が攻撃で破壊された瞬間、ネットワーク全体が機能停止してしまいます。1964年、研究者<strong>ポール・バラン</strong>は、通信網には大きく3つの構造がありうると整理しました。</p>

      <Diagram caption="バランが示した3つのネットワーク構造。インターネットは③の考え方を受け継いでいる">
        <svg viewBox="0 0 640 210" xmlns="http://www.w3.org/2000/svg">
          <circle cx={100} cy={90} r="7" fill="#39ff6a" />
          <circle cx={60} cy={40} r="5" fill="#5f5f5f" /><line x1={100} y1={90} x2={60} y2={40} stroke="#5f5f5f" />
          <circle cx={140} cy={40} r="5" fill="#5f5f5f" /><line x1={100} y1={90} x2={140} y2={40} stroke="#5f5f5f" />
          <circle cx={45} cy={90} r="5" fill="#5f5f5f" /><line x1={100} y1={90} x2={45} y2={90} stroke="#5f5f5f" />
          <circle cx={155} cy={90} r="5" fill="#5f5f5f" /><line x1={100} y1={90} x2={155} y2={90} stroke="#5f5f5f" />
          <circle cx={60} cy={140} r="5" fill="#5f5f5f" /><line x1={100} y1={90} x2={60} y2={140} stroke="#5f5f5f" />
          <circle cx={140} cy={140} r="5" fill="#5f5f5f" /><line x1={100} y1={90} x2={140} y2={140} stroke="#5f5f5f" />
          <text x={100} y={190} fill="#f2f2f2" fontSize="13" textAnchor="middle">①集中型</text>
          <text x={100} y={205} fill="#9a9a9a" fontSize="11" textAnchor="middle">中心が壊れると全滅</text>

          <circle cx={320} cy={60} r="6" fill="#39ff6a" />
          <circle cx={270} cy={100} r="6" fill="#39ff6a" />
          <circle cx={370} cy={100} r="6" fill="#39ff6a" />
          <circle cx={245} cy={140} r="5" fill="#5f5f5f" /><line x1={270} y1={100} x2={245} y2={140} stroke="#5f5f5f" />
          <circle cx={295} cy={150} r="5" fill="#5f5f5f" /><line x1={270} y1={100} x2={295} y2={150} stroke="#5f5f5f" />
          <circle cx={345} cy={150} r="5" fill="#5f5f5f" /><line x1={370} y1={100} x2={345} y2={150} stroke="#5f5f5f" />
          <circle cx={395} cy={140} r="5" fill="#5f5f5f" /><line x1={370} y1={100} x2={395} y2={140} stroke="#5f5f5f" />
          <line x1={320} y1={60} x2={270} y2={100} stroke="#39ff6a" />
          <line x1={320} y1={60} x2={370} y2={100} stroke="#39ff6a" />
          <line x1={270} y1={100} x2={370} y2={100} stroke="#39ff6a" />
          <text x={320} y={190} fill="#f2f2f2" fontSize="13" textAnchor="middle">②分散型</text>
          <text x={320} y={205} fill="#9a9a9a" fontSize="11" textAnchor="middle">複数の中心がある</text>

          <circle cx={500} cy={50} r="5" fill="#39ff6a" />
          <circle cx={550} cy={60} r="5" fill="#39ff6a" />
          <circle cx={600} cy={50} r="5" fill="#39ff6a" />
          <circle cx={480} cy={100} r="5" fill="#39ff6a" />
          <circle cx={530} cy={105} r="5" fill="#39ff6a" />
          <circle cx={580} cy={100} r="5" fill="#39ff6a" />
          <circle cx={500} cy={150} r="5" fill="#39ff6a" />
          <circle cx={550} cy={145} r="5" fill="#39ff6a" />
          <circle cx={600} cy={150} r="5" fill="#39ff6a" />
          <g stroke="#39ff6a" strokeWidth="0.8">
            <line x1={500} y1={50} x2={550} y2={60} /><line x1={550} y1={60} x2={600} y2={50} />
            <line x1={500} y1={50} x2={480} y2={100} /><line x1={550} y1={60} x2={530} y2={105} /><line x1={600} y1={50} x2={580} y2={100} />
            <line x1={480} y1={100} x2={530} y2={105} /><line x1={530} y1={105} x2={580} y2={100} />
            <line x1={480} y1={100} x2={500} y2={150} /><line x1={530} y1={105} x2={550} y2={145} /><line x1={580} y1={100} x2={600} y2={150} />
            <line x1={500} y1={150} x2={550} y2={145} /><line x1={550} y1={145} x2={600} y2={150} />
          </g>
          <text x={550} y={190} fill="#f2f2f2" fontSize="13" textAnchor="middle">③分散(網の目)型</text>
          <text x={550} y={205} fill="#9a9a9a" fontSize="11" textAnchor="middle">どこが壊れても迂回できる</text>
        </svg>
      </Diagram>

      <Analogy label="💡 たとえるなら">
        <strong>集中型</strong>は「1つの巨大物流センターからすべての店舗へ配送する」仕組み。センターが被災すれば全店が止まります。<strong>網の目型</strong>は「無数の道がお互いにつながった道路網」。1本の道が通行止めでも、迂回路がいくらでもあります。軍事的に「どこか1点が破壊されても通信を継続できる」ことが求められた結果、この網の目のような設計が選ばれました。
      </Analogy>

      <Heading num="02">パケット交換 ― データを小分けにして送る</Heading>
      <p>従来の電話回線は<Term>回線交換方式</Term>でした。通話中は相手との回線を専有し続ける方式です。バランと、同時期に研究していたイギリスの<strong>ドナルド・デイヴィス</strong>(「パケット」の名付け親)は、これに代わる<Term>パケット交換方式</Term>を提案します。データを小さな「パケット」に分割し、それぞれが独立して複数の経路を経由して届き、受け取った側で元の形に組み立て直すという方式です。</p>

      <Analogy label="💡 たとえるなら">
        回線交換は「引っ越し荷物を1台の大きなトラックで、専用の道を1本借り切って運ぶ」ようなもの。パケット交換は「荷物を小さな箱に分けて、複数の宅配業者にバラバラの道順で送り、届いた先で組み立て直す」ようなものです。1つの経路が渋滞・通行止めでも、他の経路を使えば届きます。
      </Analogy>

      <Heading num="03">ARPANETからTCP/IPへ</Heading>
      <p>1969年、この考え方をもとにした実験的ネットワーク<strong>ARPANET</strong>で、カリフォルニア大学ロサンゼルス校とスタンフォード研究所の間で初めての接続が行われました。これが今日のインターネットの直接の祖先です。1971年には早くも電子メールが実装されています。</p>
      <p>1974年、研究者<strong>ヴィント・サーフ</strong>と<strong>ボブ・カーン</strong>が、異なる種類のネットワーク同士を相互接続するための方式をまとめた論文を発表します。これが<Term>TCP/IP</Term>の原型です。そして1983年1月1日、ARPANET上の全てのコンピュータが一斉にTCP/IPへ切り替える「フラッグデー」を迎え、TCP/IPは名実ともにネットワークの共通言語になりました。同じ頃、異なるメーカーの機器同士が通信するための設計指針として<Term>OSI参照モデル</Term>も整理されていきます(層構造の詳細は後述の「通信プロトコル」ページで扱います)。</p>
      <p>ネットワークの中身についても簡単に触れておくと、確実な到達を保証する<strong>TCP</strong>、宛先を決める<strong>IP</strong>、その2つを組み合わせた仕組み全体が<strong>TCP/IP</strong>です。到達確認をせず、とにかく速さを優先する<strong>UDP</strong>という方式もあり、動画配信など「多少の欠けより速さが大事」な用途で使われます。</p>

      <Analogy label="💡 たとえるなら">
        <strong>TCP</strong>は「配達記録が残る書留郵便」。届いたかどうかを確認し、届いていなければ再送します。<strong>UDP</strong>は「普通のはがき」。速く送れますが、届いたかの保証はありません。
      </Analogy>

      <Heading num="04">WWWの発明とブラウザ戦争</Heading>
      <p>1989年、CERN(欧州原子核研究機構)の研究者<strong>ティム・バーナーズ=リー</strong>が<Term>WWW(World Wide Web)</Term>を提案し、1991年に一般公開します。ページの書き方である<strong>HTML</strong>、ページの住所である<strong>URL</strong>、それを取得するための通信手順である<strong>HTTP</strong>という3つの要素が組み合わさり、既存のTCP/IPネットワークの上で動作する新しい情報共有の仕組みが生まれました。詳しい中身は後述の「Webの仕組み」ページで扱います。</p>

      <TimelineLabel>Webとブラウザの時代</TimelineLabel>
      <Timeline>
        <TimelineItem era="1993">Mosaic<br />画像表示に対応した草分け</TimelineItem>
        <TimelineItem era="1994">Netscape<br />Navigator登場</TimelineItem>
        <TimelineItem era="1995">JavaScript<br />誕生</TimelineItem>
        <TimelineItem era="1997">ECMAScript<br />として標準化</TimelineItem>
        <TimelineItem era="2003">Safari<br />登場</TimelineItem>
        <TimelineItem era="2004">Firefox<br />登場</TimelineItem>
        <TimelineItem era="2005">AJAX<br />という言葉が定着</TimelineItem>
        <TimelineItem era="2008">Chrome / V8<br />登場</TimelineItem>
        <TimelineItem era="2009">Node.js<br />登場</TimelineItem>
      </Timeline>

      <p>1993年に登場した<strong>Mosaic</strong>は、文字だけでなく画像もページ内に表示できた初期の代表的ブラウザです。1994年には<strong>Netscape Navigator</strong>が登場し、最盛期にはブラウザ市場の大半を占めるほどのシェアを獲得しました。同じ1994年、<strong>ハーコン・ウィウム・リー</strong>が見た目を整えるための仕組み<strong>CSS</strong>を提案します。1995年にはWindows 95の登場と時を同じくして<strong>Internet Explorer</strong>が登場し、後にOSへ統合されていく中で、ブラウザの主導権をめぐる「ブラウザ戦争」が本格化していきます。</p>
      <p>同じく1995年、Netscapeの<strong>ブレンダン・アイク</strong>がわずか10日間で<strong>JavaScript</strong>を開発します。ページに動きを与えるこの言語は、1997年に<Term>ECMAScript</Term>として標準化されました。</p>
      <p>2000年代に入ると、家庭のネット回線もダイヤルアップ(最大56kbps程度)から、ADSL(数Mbps〜)、さらに光ファイバー(FTTH、100Mbps以上)へと高速化していきます。ブラウザも<strong>Mozilla(2002)</strong>、<strong>Safari(2003)</strong>、<strong>Firefox(2004)</strong>と多様化し、2005年には<Term>AJAX</Term>という技術(のちの呼び名)が広まります。これは<code>XMLHttpRequest</code>という機能を使い、ページ全体を再読み込みせずに必要なデータだけをサーバーと通信して画面を更新する手法で、今日の「サクサク動くWebアプリ」の基礎になりました。</p>
      <p>2007年の<strong>iPhone</strong>発売でインターネットは本格的にポケットの中へ。2008年には高速なJavaScriptエンジン<strong>V8</strong>を積んだ<strong>Chrome</strong>が登場し、翌2009年にはそのV8を使ってブラウザの外でJavaScriptを動かす<strong>Node.js</strong>が生まれます。2013年にはChromeのレンダリングエンジンが独自の<strong>Blink</strong>としてフォーク(分岐)し、現在に至ります。</p>

      <Heading num="まとめ">3つの流れ</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>壊れない通信網から始まった</h4><p>冷戦下の軍事的必要性から「網の目状」でどこが壊れても迂回できるネットワーク設計が採用されました。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>共通言語としてのTCP/IP</h4><p>異なるネットワーク・機器同士がやり取りできるよう、1983年に共通の通信規約TCP/IPへ統一されました。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>WWWとブラウザが「使いやすさ」を作った</h4><p>HTML・URL・HTTPの組み合わせと、ブラウザ同士の競争が、今日の使いやすいWebを形作りました。</p></Card>
      </CardGrid>
      <p>複数のコンピュータ同士がつながる歴史を見たところで、次はもう一度視点を1台のコンピュータの中に戻し、「OSの仕組み」を見ていきましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/history" tag="コンピュータ">コンピュータの歴史</RelatedLink>
                    <RelatedLink href="/os" tag="OS">OSの仕組み</RelatedLink>
                    <RelatedLink href="/network/layers" tag="ネットワーク">階層モデル ― OSI参照モデルとTCP/IP</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
