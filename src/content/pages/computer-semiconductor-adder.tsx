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
  Steps,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "足し算をつくる",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ・OS</Eyebrow>
        <h1>足し算をつくる ― 半加算器と全加算器</h1>
        <Lead>
          AND・OR・NOTの3つのゲートまでたどり着きました。いよいよ最終回、これらを組み合わせて<strong>本物の足し算</strong> ― 二進数の筆算を回路で実現します。ただの物質だった半導体から、任意の計算が生まれる瞬間です。
        </Lead>
      </Hero>

      <p>ゴールは「半導体で足し算ができるところまで理解する」でした。あと一歩です。</p>

      <Heading num="01">二進数の筆算と桁上がり</Heading>
      <p>二進数では0と1しか使わず、<strong>1+1で桁上がりして「10」</strong>と書きます。十進数の筆算と同じで、<strong>1桁ずつ</strong>計算しながら、<Term>桁上がり(キャリー)</Term>を次の桁へ渡していきます。</p>
      <p>まず、<strong>一番下の1桁分</strong>だけを計算する回路を考えます。入力は2つ ― その桁の <strong>a</strong> と <strong>b</strong>。出力も2つ ― その桁の答え <strong>s(sum)</strong> と、次の桁への桁上がり <strong>c(carry)</strong>です。</p>

      <table>
        <tbody>
          <tr><th>a</th><th>b</th><th>c(桁上がり)</th><th>s(その桁)</th></tr>
          <tr><td className="hl">0</td><td>0</td><td>0</td><td>0</td></tr>
          <tr><td className="hl">0</td><td>1</td><td>0</td><td>1</td></tr>
          <tr><td className="hl">1</td><td>0</td><td>0</td><td>1</td></tr>
          <tr><td className="hl">1</td><td>1</td><td>1</td><td>0</td></tr>
        </tbody>
      </table>

      <p>この表をよく見ると、<strong>桁上がり c は「両方1のときだけ1」＝ AND</strong>、<strong>答え s は「どちらか一方だけ1のときに1」</strong>になっています。前ページのゲートで、ちょうど作れそうです。</p>

      <Heading num="02">半加算器 ― 1桁分の足し算回路</Heading>
      <p>この「1桁分」を計算してくれる回路を<Term>半加算器(Half Adder)</Term>と呼びます。AND・OR・NOTをいくつか組み合わせると、上の表どおりに動く回路ができあがります。入力2つ(a, b)、出力2つ(s, c)の、小さなブロックです。</p>

      <DiagramFrame
        slug="computer-semiconductor-adder-half"
        aspect="560 / 200"
        caption="半加算器のブロック図。左から入力aとbを受け取り、AND・OR・NOTの組合せでできた半加算器が、その桁の答えsと桁上がりcの2つを出力する。"
      />

      <p>ただし半加算器には限界があります。入力が a と b の<strong>2つだけ</strong>なので、<strong>前の桁から来る桁上がりを受け取れない</strong>のです。2桁目以降の筆算では「前の桁からの繰り上がり」を足す必要があるので、これでは足りません。</p>

      <Heading num="03">全加算器 ― 前の桁の繰り上がりも足す</Heading>
      <p>そこで入力を1つ増やしたのが<Term>全加算器(Full Adder)</Term>です。a・b に加えて、<strong>前の桁からの桁上がり x</strong> を受け取り、3つの入力から「その桁の答え s」と「次の桁への桁上がり c」を出します。</p>
      <p>作り方はシンプルで、<strong>半加算器を2個</strong>使えば全加算器になります(2回に分けて足し合わせるイメージです)。</p>

      <DiagramFrame
        slug="computer-semiconductor-adder-full"
        aspect="560 / 230"
        caption="全加算器のブロック図。入力aとbに加えて、前の桁から来る桁上がりxも受け取る。中身は半加算器2個ぶんで、その桁の答えsと、次の桁へ送る桁上がりcを出力する。"
      />

      <Heading num="04">横に並べれば、何桁でも足せる</Heading>
      <p>あとは簡単です。<strong>全加算器を桁数だけ横に並べ</strong>、ある桁の <strong>c(桁上がり)</strong> を、隣の桁の <strong>x(前の桁からの桁上がり)</strong> につなぐだけ。これで<strong>多桁の二進数の足し算</strong>が完成します。</p>

      <DiagramFrame
        slug="computer-semiconductor-adder-ripple"
        aspect="560 / 180"
        caption="全加算器を横に3個並べた多桁の加算器。右から1桁目・2桁目・3桁目の順に並び、各段の下から答えs1・s2・s3が出る。各段が出した桁上がりcは左隣の段の入力xへつながり、筆算の繰り上がりと同じように順に伝わっていく。"
      />

      <p>たとえば6桁の足し算なら、半加算器1個(一番下の桁)と全加算器5個をつなぐだけ。桁数に応じて並べれば、何桁でも足せます。</p>

      <Heading num="05">足し算ができれば、四則演算も</Heading>
      <p>足し算の回路さえできれば、残りは芋づる式です。</p>
      <Steps>
        <li><strong>引き算</strong> ― 「マイナスを足す」と考えれば、同じ足し算回路で実現できます。</li>
        <li><strong>かけ算</strong> ― 「かける回数だけ足す」を繰り返せば計算できます。</li>
        <li><strong>割り算</strong> ― 「引ける回数だけ引く」を繰り返せば計算できます。</li>
      </Steps>
      <p>こうして、<strong>半導体というただの物質から、任意の計算を生み出せる</strong>ところまで到達しました。原理としては、半導体があって(そしてトランジスタを作る超絶技巧があれば)、理論上はコンピュータが作れてしまう ― これがこのシリーズのゴールです。</p>

      <Heading num="06">モジュール化こそが、この物語の骨法</Heading>
      <p>もし全加算器の中身を、全部トランジスタとゲートのレベルで描き出したら、模造紙1枚が真っ黒になるほどの配線になります。それでも私たちが設計を理解できるのは、<strong>半加算器をひとまとまり、全加算器をひとまとまり</strong>として扱っているからです。</p>
      <p>この<Term>モジュール化</Term> ― 「中身をいったん切り離して、こういう動きをするものだと仮定して先へ進む」こと ― こそが、コンピュータを作るうえで決定的に重要です。トランジスタ → ゲート → 半加算器 → 全加算器 → 加算器 と、階段を一段ずつ登ってこられたのは、下の段の中身を忘れられたからでした。</p>

      <Analogy label="🏙 ARMとチップ設計">
        <strong>ARM</strong>は、ゲートが大量に集まった設計図(IP)を売っている会社です。自社では製造せず、「こういう計算がしたければ、このモジュールを使うといい」という図面とライセンスを提供しています。『半導体の地政学』にはこうあります ―「一つのチップを設計する作業は、大都市を丸ごと設計するようなもの。1社で全トランジスタの図面を書くことはできない」。モジュールがあって初めて、都市規模の設計が成り立つのです。
      </Analogy>

      <Aside label="divide ではなく module">
        分割統治(デバイド&amp;コンカー)とも通じますが、今回の主役は「分ける」ことより「<strong>ひとまとまりとして切り出して仮定する</strong>」モジュール化です。これはエンジニアリング全体を貫く骨法でもあります。
      </Aside>

      <Heading num="まとめ">半導体シリーズの結論</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>加算器で二進数を足す</h4>
          <p>半加算器で1桁、全加算器で桁上がりも処理。横に並べれば何桁でも足せます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>足し算から四則演算へ</h4>
          <p>引き算・かけ算・割り算は、足し算の繰り返しで作れます。ただの物質から任意の計算が生まれました。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>モジュール化が支える</h4>
          <p>中身を切り離して積み上げるモジュール化こそ、都市規模のチップ設計を可能にする骨法です。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/computer/semiconductor-adder" />
    </DocsPage>
  );
}
