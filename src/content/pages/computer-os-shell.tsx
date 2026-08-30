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
  Timeline,
  TimelineItem,
  TimelineLabel,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "シェルの系譜",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ・OS</Eyebrow>
        <h1>シェルの系譜 ― 「核(カーネル)」を守る「殻」</h1>
        <Lead>
          ターミナルに文字を打ち込むと、コンピュータが応えてくれる ―
          この当たり前のやり取りを支えているのが<Term>シェル</Term>です。ユーザーが入力したコマンドを解釈し、カーネルに橋渡しして、結果を返す。半世紀以上かけて磨かれてきた「人とOSの対話の窓口」の歴史をたどります。いま手元のターミナルをどう使うかはターミナルとシェルで扱います。
        </Lead>
      </Hero>

      <p>「OSの仕組み」では、私たちがアイコンをクリックして操作するGUIの裏に、文字でOSに指示を出すCLI ― その入力窓口である<strong>ターミナル</strong>と、命令を解釈してカーネルに伝える<strong>シェル</strong>があることに触れました。ここからは、そのシェルがどう生まれ、どう進化してきたのかを詳しく見ていきます。</p>

      <Timeline>
        <TimelineItem era="1964〜">Multics<br />コマンドプロセッサ</TimelineItem>
        <TimelineItem era="1969">Thompson Shell<br />sh の原型</TimelineItem>
        <TimelineItem era="1977">Bourne Shell<br />スクリプト/自動化</TimelineItem>
        <TimelineItem era="1978">C Shell<br />ヒストリー/エイリアス</TimelineItem>
        <TimelineItem era="1989">Bash<br />良いとこ取り</TimelineItem>
        <TimelineItem era="2006">PowerShell<br />オブジェクト指向</TimelineItem>
        <TimelineItem era="2019">macOS/zsh<br />デフォルト変更</TimelineItem>
      </Timeline>
      <TimelineLabel>パンチカードに穴を開けていた時代から、AIに日本語で頼む時代まで。「コマンドを解釈して実行する」という核は60年間変わっていません。</TimelineLabel>

      <Heading num="01">シェルとは何か ― 殻が核を守る</Heading>
      <p><Term>シェル(shell)</Term>は、ユーザーが入力したコマンドを<strong>解釈・実行</strong>し、結果を返すプログラムです。対話型の<Term>コマンドラインインターフェイス(CLI)</Term>の中核を担います。</p>
      <p>カーネルはハードウェアを直接制御しますが、一般ユーザーがカーネルを直接触ることはありません。ユーザーはシェルを経由して間接的にOSを操作します ― つまりシェルは、名前のとおり「<strong>殻(shell)</strong>」として「<strong>核(kernel)</strong>」を包んで守る役割を果たしています。</p>

      <Analogy label="💡 たとえるなら">
        カーネルが「厨房で火を扱う料理長」なら、シェルは「注文を受けて厨房に伝えるホールスタッフ」です。お客さん(ユーザー)は厨房に立ち入らず、スタッフ(シェル)に注文を伝えるだけ。危険な火元(ハードウェア)は殻の内側で守られています。
      </Analogy>

      <Aside label="毎日シェルを使っている">
        AndroidやiOSの内部でもシェルコマンドが動作しています。普段は意識しなくても、私たちは毎日シェルの恩恵を受けているのです。
      </Aside>

      <Heading num="02">Multics と UNIX ― 最初のシェル(1960年代)</Heading>
      <p>シェルの先祖は、<strong>1964年</strong>から開発された大型OS<Term>Multics</Term>の<strong>コマンドプロセッサ</strong>にさかのぼります。しかしMulticsは複雑すぎて開発が難航し、1969年にベル研究所はプロジェクトから撤退しました。</p>
      <p>撤退したケン・トンプソンとデニス・リッチーは、より<strong>シンプルなOS</strong>を目指して1969年に<strong>UNIX</strong>を開発します。その最初のシェルが<Term>Thompson Shell(sh)</Term>でした。機能は「コマンドを入力して実行する」だけの極めてシンプルなものでしたが、当時は<strong>パンチカードに穴を開けて命令を伝える</strong>のが主流。その場で文字を打ち、修正できること自体が画期的でした。</p>

      <h3>パイプとリダイレクト(1971年)</h3>
      <p>1971年、Thompson Shellに<Term>パイプ(|)</Term>と<Term>リダイレクト</Term>が追加されます。あるコマンドの<strong>出力を別コマンドの入力につなぐ</strong>仕組みです。</p>
      <p>たとえば「ファイル一覧を表示 → 特定の文字列で絞り込み → 件数をカウント」を1行で連鎖実行できます。<strong>「小さなプログラムを組み合わせて大きな仕事をする」</strong> ― これはUNIXとシェルの核心哲学であり、60年以上経った今もプログラミングの重要な考え方として受け継がれています。</p>

      <Heading num="03">Bourne Shell と C Shell ― 二大勢力(1977〜1980年代)</Heading>
      <p>1970年代後半、シェルは「対話」から「自動化」へと役割を広げ、二大勢力の時代を迎えます。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>Bourne Shell(sh) ― 自動化の時代</h4>
          <p>1977年、スティーブン・ボーンが開発。<Term>シェルスクリプト</Term>が本格的に書けるようになり、<strong>if・for</strong>などの制御構文や<strong>変数</strong>によって、対話だけでなく処理の自動化が可能になりました(毎朝8時のログバックアップ、エラー時の管理者メール送信など)。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>C Shell(csh) ― 使いやすさの追求</h4>
          <p>1978年、UCバークレーのビル・ジョイが開発。構文を<strong>C言語に似せ</strong>、Cプログラマーに直感的にしました。過去のコマンドを再実行する<Term>ヒストリー</Term>、長いコマンドに短い別名を付ける<Term>エイリアス</Term>を導入。</p>
        </Card>
      </CardGrid>
      <p>Bourne ShellとC Shellが並び立ち、シェルの世界はいわば「戦国時代」を迎えました。</p>

      <Heading num="04">Bash の台頭と世界標準化(1989〜2000年代)</Heading>
      <p><strong>1989年</strong>、GNUプロジェクトのブライアン・フォックスが<Term>Bash(Bourne Again Shell)</Term>を開発しました。名前のとおりBourne Shellを継承しつつ、C Shellの良いところも取り込んだ「良いとこ取り」のシェルです。</p>
      <table>
        <tbody>
          <tr><th>革新機能</th><th>内容</th></tr>
          <tr><td className="hl">コマンドライン編集</td><td>矢印キーでのカーソル移動、Ctrl+Aで行頭へ。当時は「一度入力したら修正困難」だった</td></tr>
          <tr><td className="hl">タブ補完</td><td>数文字入力＋Tabでコマンド名・ファイル名を自動補完</td></tr>
          <tr><td className="hl">配列</td><td>1つの変数名で複数データを管理し、より複雑なスクリプトが可能に</td></tr>
        </tbody>
      </table>
      <p><strong>1991年</strong>、リーナス・トーバルズがLinuxカーネルを開発し、<strong>デフォルトシェルとしてBashを採用</strong>します。Linuxの爆発的な普及とともにBashも世界中に広がり、<strong>インターネットサーバーの大半</strong>がLinux + Bashで動くようになりました。</p>
      <p>Bash 3.0(2004)、Bash 4.0(2009)では連想配列・正規表現・高度なデバッグ機能などが追加されました。成功の秘訣は<strong>後方互換性</strong>の重視 ― 古いスクリプトも新しいBashで動くよう設計され、既存資産が無駄になりません。</p>

      <Heading num="05">現代の多様なシェル(2000年代〜)</Heading>
      <p>2000年代以降、用途や好みに応じて選べる多彩なシェルが登場しました。</p>
      <table>
        <tbody>
          <tr><th>シェル</th><th>登場</th><th>特徴</th></tr>
          <tr><td className="hl">PowerShell</td><td>2006 / Microsoft</td><td>従来のシェルが<strong>テキスト</strong>で処理するのに対し、<strong>構造化されたオブジェクト</strong>を直接扱える。ファイルのサイズや日付をプロパティから直接取り出せる</td></tr>
          <tr><td className="hl">Z Shell(zsh)</td><td>2010年代〜</td><td>Bashの拡張版。より賢いタブ補完・スペルチェック・テーマ。<strong>Oh My Zsh</strong>フレームワークで簡単にカスタマイズでき大ヒット</td></tr>
          <tr><td className="hl">Fish</td><td>2013</td><td>Friendly Interactive Shell。設定不要で、インストール直後からシンタックスハイライト・賢い補完・分かりやすいエラーメッセージが使える</td></tr>
          <tr><td className="hl">Nushell</td><td>2019</td><td>テーブル形式のデータ表示、<strong>SQL風の検索・フィルタ</strong>。CSV・JSON・XMLを直接扱える構造化データ特化型</td></tr>
        </tbody>
      </table>
      <p>なお<strong>2019年</strong>には、macOSがデフォルトシェルをBashからzshへ変更しました(ライセンスなどの事情)。zshはBashとほぼ互換のため、スムーズに移行できました。</p>

      <Analogy label="💡 たとえるなら">
        PowerShellの違いは「レシートの束(テキスト)を目で読んで金額を拾う」のか「会計データ(オブジェクト)から合計欄だけを直接読む」のかの差です。後者ならデータをそのまま計算に回せます。
      </Analogy>

      <Heading num="06">シェルの未来と現代の役割</Heading>
      <p>シェルは古い技術に見えて、現代の開発・運用の中核であり続けています。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>AIとの融合</h4><p>「昨日変更されたファイルを全部zipに圧縮して」と日本語で指示すると、シェルコマンドに変換して実行するツールが開発中。初心者の学習ツールとして革命的です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>クラウドネイティブ</h4><p>ローカルPCだけでなく、AWS・GCP・Azureなどクラウド上のサーバーも1つのシェルから同じ感覚で操作できる方向へ。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>DevOps・コンテナの中核</h4><p>テスト・デプロイ・監視の自動化の中心。Docker・Kubernetesの操作、データの前処理、ログ解析やセキュリティ監視まで担います。</p></Card>
      </CardGrid>

      <Heading num="まとめ">小さな道具を、組み合わせる</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>殻がカーネルを守る</h4><p>シェルはコマンドを解釈してカーネルに橋渡しする「殻」。ユーザーはハードウェアを直接触らずに、安全にOSを操作できます。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>パイプという発明</h4><p>「小さなプログラムを組み合わせて大きな仕事をする」というUNIX哲学は、1971年のパイプから今日まで一貫しています。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>後方互換性が普及を生む</h4><p>Bashが世界標準になれたのは、古いスクリプトを動かし続ける後方互換性のおかげ。既存資産を守ることが信頼につながりました。</p></Card>
      </CardGrid>
      <p>シェルが「コマンドをカーネルに伝える」とき、その裏では何が起きているのでしょうか。次は、アプリとカーネルをつなぐ唯一の正式な窓口 ―「システムコール」を見ていきましょう。</p>

      <DocsFooter href="/computer/os-shell" />
    </DocsPage>
  );
}
