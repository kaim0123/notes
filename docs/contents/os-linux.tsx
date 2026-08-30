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
  RelatedList,
  RelatedLink,
  Timeline,
  TimelineItem,
  TimelineLabel,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Linuxの歴史",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>OS</Eyebrow>
        <h1>Linuxの歴史 ― 趣味のプロジェクトが世界を動かすまで</h1>
        <Lead>
          1991年、フィンランドの大学生が「趣味で作っている、GNUほど大きくもプロにもならない」と控えめに宣言したOSカーネル ―
          それが今や、スーパーコンピュータの100%、スマートフォンの約70%、クラウドの大半を動かしています。Linuxの歴史は、<strong>1人の趣味が世界中の協力で巨大プロジェクトへと育っていく</strong>物語です。
        </Lead>
      </Hero>

      <p>
        <Link href="/os/unix">UNIXの歴史と哲学</Link>で見た「小さく作って組み合わせる」思想と、<Link href="/os/gnu">GNUとフリーソフトウェア</Link>が10年かけて用意したツール群 ― この2つが土台となって、Linuxは生まれました。ここではその誕生から現在の支配的地位までを、5つの時期に分けてたどります。
      </p>

      <Heading num="01">Linuxとは ― マスコットTuxと「カーネル」という正体</Heading>
      <p>
        <Term>Linux</Term>は、リーナス・トーバルズが開発した<strong>オープンソースのOSカーネル</strong>です。厳密にはカーネル単体を指しますが、一般には Linux カーネルに GNU ツールなどを組み合わせた<strong>Linux系OS全体</strong>を指すことが多くあります。私たちが毎日使うスマートフォンの<strong>Android</strong>も、Linux カーネルをベースに Google が独自のUI・アプリ環境を築いたものです。2023年時点で世界のスマートフォンの<strong>約70%</strong>が Android ＝ Linux 上で動いています。
      </p>
      <p>
        マスコットのペンギン<Term>Tux(タックス)</Term>は、1996年にリーナス自身が提案しました。デザインはラリー・ユイング。きっかけは、リーナスがオーストラリアの動物園で<strong>ペンギンに噛まれた</strong>体験だったといいます。
      </p>

      <Heading num="02">主要マイルストーン年表</Heading>
      <Timeline>
        <TimelineItem era="1991/8">comp.os.minix投稿<br />「趣味のOS」宣言</TimelineItem>
        <TimelineItem era="1991末">GPLへ変更<br />商用利用が可能に</TimelineItem>
        <TimelineItem era="1994">バージョン1.0<br />約17.6万行</TimelineItem>
        <TimelineItem era="1996">カーネル2.0<br />SMP対応</TimelineItem>
        <TimelineItem era="2004">Ubuntu登場<br />初心者向け普及</TimelineItem>
        <TimelineItem era="2007">Android発表<br />最大の普及要因</TimelineItem>
        <TimelineItem era="2022">Rustサポート<br />メモリ安全性へ</TimelineItem>
      </Timeline>
      <TimelineLabel>趣味の投稿 → GPL → ディストリビューション → 企業参入 → スマホ・クラウド支配。30年で「1人の学生」が「世界のインフラ」になりました。</TimelineLabel>

      <Heading num="03">第1期 ― 誕生と黎明(1991〜1994)</Heading>
      <h3>リーナス・トーバルズという人物</h3>
      <p>
        リーナスは<strong>1969年生まれ</strong>、フィンランド・ヘルシンキ大学の統計学教授の息子です。名前はノーベル賞科学者リーナス・ポーリングに由来します。<strong>11歳</strong>で祖父の Commodore VIC-20 でプログラミングを始め、1988年に大学へ入学。教科書で知った<Term>Minix</Term>(タネンバウム教授による教育用のUNIX互換OS)を使うものの、386の保護モードなどを十分に活かせない設計に不満を募らせていきます。
      </p>
      <h3>ターミナルエミュレーターから、いつのまにかOSへ</h3>
      <p>
        1990年末、リーナスは約15万円相当のローンで Intel 386DX PC を購入します。当初の目的は大学のUNIXへダイヤルアップ接続するための<strong>ターミナルエミュレーター</strong>を作ることでした。ところがファイルシステムが欲しくなり、タスクスイッチングが欲しくなり ― 必要な機能を足していくうちに、気づけば<strong>OSカーネルそのもの</strong>を書いていたのです。
      </p>
      <Analogy label="💡 たとえるなら">
        「電話をかけるアプリ」を作るつもりが、電話を鳴らすために時計が要り、時計のために電源管理が要り…と足していったら、いつのまにか「スマホのOS」を作っていた ― そんな成り行きでLinuxは生まれました。
      </Analogy>
      <p>
        <strong>1991年8月25日</strong>、リーナスは comp.os.minix に「386用の自由なOSを作っている。趣味だからGNUのように大きくプロにはならない」と投稿し、あわせて<strong>意見募集</strong>も行いました。この「未完成でも公開し、みんなの意見を取り込む」姿勢が、後のコミュニティ開発の原型になります。
      </p>
      <h3>GPLへの変更 ― 運命の決断</h3>
      <p>
        当初のLinuxは<strong>独自ライセンス(商用利用禁止)</strong>でした。しかし<strong>1991年末</strong>、リーナスはライセンスを<Term>GPL(GNU General Public License)</Term>へ変更します。GPLの要点は「誰でも自由に使い・改変できるが、改変版も同じGPLで公開しなければならない」という<Term>コピーレフト</Term>です。この一手により Red Hat などの<strong>企業が参入可能</strong>になり、Linuxエコシステムの拡大が決定づけられました。
      </p>

      <Heading num="04">第2期 ― バザール方式とコミュニティの成長(1992〜1996)</Heading>
      <h3>カテドラル vs バザール</h3>
      <p>
        従来のソフトウェア開発は<Term>カテドラル方式</Term> ― 少数の設計者が密室で完璧に設計してから公開する ― が主流でした。リーナスが実践したのは<Term>バザール方式</Term> ― 未完成でも公開し、バグ報告を受け、パッチを取り込み、改良を高速に反復する ― です。この対比は、後にエリック・レイモンドが『The Cathedral and the Bazaar』で理論化しました。有名な<strong>「Linusの法則」</strong>=「目玉の数が十分にあれば、どんなバグも深刻ではない」も、この考え方から生まれています。
      </p>
      <h3>Tanenbaum–Torvalds論争(1992)</h3>
      <p>
        Minixの作者 Andrew S. Tanenbaum は、Linuxを<strong>モノリシックカーネル＝時代遅れ</strong>と批判しました。Minixは機能を分離した<strong>マイクロカーネル</strong>を採用していたからです。これに対しリーナスは<strong>実用性・性能</strong>を重視して反論。理論上はマイクロカーネルが優れていても、<strong>実際の性能はモノリシックが勝った</strong>のです。タネンバウムは1980年代に Minix を「すぐ時代遅れになる」と予言していましたが、その予想は完全に外れ、Linuxは数十億台のデバイスで動くことになりました。カーネル設計の違いは<Link href="/os/kernel">カーネルの役割と設計</Link>で詳しく扱っています。
      </p>
      <h3>ディストリビューションとバージョン1.0</h3>
      <p>
        カーネルだけでは一般ユーザーは使えません。そこで<strong>カーネル＋ツール＋アプリ＋インストーラー</strong>をパッケージ化した<Term>ディストリビューション(distro)</Term>が1993年に約100種登場します(<strong>Slackware・Debian</strong> など)。そして<strong>1994年3月14日、バージョン1.0</strong>。約17.6万行に達し、ネットワーク・ファイルシステム・ドライバーが充実。Webサーバーとしての採用が始まりました。
      </p>

      <Heading num="05">第3期 ― 企業参入とサーバーOSとしての確立(1994〜2000)</Heading>
      <table>
        <tbody>
          <tr><th>出来事</th><th>内容</th></tr>
          <tr><td className="hl">Red Hat設立(1994)</td><td>Linux本体は無料、<strong>サポート・トレーニング・保守契約</strong>で収益を得る「保険」のようなビジネスモデルを確立(社名は創業者が赤い帽子を被っていたことに由来)</td></tr>
          <tr><td className="hl">業界の支持(1995〜)</td><td>Intel・Netscape・Oracle がLinuxサポートを表明。1996年には Linux Journal 創刊 ― 趣味を超えた産業へ</td></tr>
          <tr><td className="hl">カーネル2.0(1996)</td><td><Term>SMP(対称型マルチプロセッシング)</Term>対応で複数CPUを同時利用可能に。x86以外(Alpha・SPARC・MIPS)にも対応し、本格的なサーバーOSとして認知される</td></tr>
          <tr><td className="hl">IBMの20億ドル投資(2000)</td><td>テレビCMまで展開。「Linux」を一般層に広め、企業ITへの信頼性が決定的に</td></tr>
        </tbody>
      </table>

      <Heading num="06">第4期 ― デスクトップ化と開発基盤の革新(2001〜2008)</Heading>
      <h3>カーネル2.4 → 2.6と開発モデル改革</h3>
      <p>
        従来は<strong>奇数＝開発版・偶数＝安定版</strong>という番号ルールで、新機能が安定版に入るまで数年かかっていました。<strong>2.6(2003年12月)</strong>ではこの区別を廃止し、全バージョンを安定版として<strong>頻繁にリリース</strong>する方式へ転換。O(1)スケジューラ、NPTL、プリエンプションなどでデスクトップ性能が劇的に改善しました。
      </p>
      <h3>Ubuntu ― 「普通の人向けのLinux」</h3>
      <p>
        <strong>2004年</strong>、Canonical(マーク・シャトルワース)が<Term>Ubuntu</Term>をリリースします。名はアフリカの言葉で「他者への思いやり」。インストール・設定が簡単で、6か月ごとの定期リリース、無料CDの郵送、充実したフォーラム ― <strong>初心者に優しいdistro</strong>としてデスクトップ普及に大きく貢献しました。
      </p>
      <h3>Git ― 二度目の世界変革</h3>
      <p>
        カーネルは長らく BitKeeper で管理されていましたが、ライセンス問題が生じ、リーナスは<strong>2005年に Git を約2週間で開発</strong>しました。当初はLinuxカーネル管理のためのツールでしたが、GitHub などを通じて<strong>世界中のソフトウェア開発の標準</strong>になります。リーナスは<strong>Linux と Git の2つ</strong>で世界を変えた人物といえます。
      </p>
      <h3>Android ― 最大の普及</h3>
      <p>
        <strong>2007年に Google が Android を発表</strong>、翌<strong>2008年に HTC Dream</strong> が初のAndroidスマホとして登場します。Linuxカーネルに独自UI・アプリ環境(Dalvik/ART など)を載せたこのOSが、Linuxを数十億台のデバイスへと押し上げました。
      </p>

      <Heading num="07">第5期 ― 巨大プロジェクトとしての現代Linux(2008〜現在)</Heading>
      <table>
        <tbody>
          <tr><th>観点</th><th>現在の姿</th></tr>
          <tr><td className="hl">開発規模</td><td>コード<strong>3,000万行超</strong>、開発者4,000人以上、参加企業500社以上(Intel・Red Hat・Google・Huawei・Oracle 等)。1日平均8.5個の変更が取り込まれ、再構築コストは50億ドル以上と試算される</td></tr>
          <tr><td className="hl">メンテナー構造</td><td>各サブシステムにメンテナーがいて(ネットワーク＝David S. Miller など)、最終的に<strong>リーナスが承認</strong>。リーナス自身は直接のコーディングより、パッチ承認・全体バランスが主な仕事に</td></tr>
          <tr><td className="hl">2018年の謝罪</td><td>メーリングリストでの厳しすぎる言葉遣いを反省し、1か月の休暇を取得。<strong>技術基準は下げず、建設的なフィードバック</strong>を心がける姿勢へ</td></tr>
        </tbody>
      </table>
      <h3>カーネル開発の「鉄則」</h3>
      <p>Linuxが長く信頼される理由は、いくつかの厳格な原則にあります。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>壊れたユーザー空間は修正しない</h4><p>一度動いたプログラムはカーネル更新後も動き続ける ― <strong>後方互換性</strong>の徹底。20年前のプログラムも最新カーネルで動作する</p></Card>
        <Card><CardNumber>2</CardNumber><h4>リーナスのマシンで動かなきゃダメ</h4><p>日常利用マシンでの問題が最優先で修正され、デスクトップユーザーの利益が守られる</p></Card>
        <Card><CardNumber>3</CardNumber><h4>厳格なコーディングスタイル</h4><p>タブ幅8文字・1行80文字など。数千人規模でも一貫性を維持するための規律</p></Card>
      </CardGrid>

      <Heading num="08">Linuxが支配する領域</Heading>
      <table>
        <tbody>
          <tr><th>分野</th><th>シェア・事例</th></tr>
          <tr><td className="hl">スーパーコンピュータ</td><td>TOP500の<strong>100%</strong>(2017年11月以降)。日本の富岳もRHELベース</td></tr>
          <tr><td className="hl">スマートフォン</td><td>Android経由で<strong>約70%</strong></td></tr>
          <tr><td className="hl">Webサーバー</td><td><strong>3分の1以上</strong></td></tr>
          <tr><td className="hl">クラウド</td><td>AWSなどの仮想マシンの<strong>90%以上</strong>がLinux。Googleインフラも全Linux。AzureでもLinux VMがWindowsより多い</td></tr>
          <tr><td className="hl">宇宙</td><td>ISSのラップトップ(2013年にXP→Debian)、火星探査機 Perseverance など</td></tr>
          <tr><td className="hl">映画CG</td><td>Pixar・DreamWorks・ILMのレンダリングファーム(アバター、トイ・ストーリー、アベンジャーズ 等)</td></tr>
          <tr><td className="hl">自動車</td><td><strong>AGL(Automotive Grade Linux)</strong> ― トヨタ・Honda・日産・Mercedes・BMW 等。カーナビから自動運転まで</td></tr>
          <tr><td className="hl">AI / ML</td><td>TensorFlow・PyTorch、ChatGPTの学習もLinuxサーバー群。NVIDIA GPUドライバ・CUDAもLinux最優先</td></tr>
        </tbody>
      </table>
      <p>
        かつて Microsoft の CEO スティーブ・バルマーは「Linuxはがん」と発言しました。しかし現在の Microsoft は<strong>Linuxカーネル開発に貢献</strong>し、<Term>WSL(Windows Subsystem for Linux)</Term>を提供しています ― まさに<strong>敵から協力者へ</strong>の転換です。
      </p>

      <Heading num="09">未来への進化とリーナスの思想</Heading>
      <p>
        <strong>Rust(2022年正式サポート)</strong>により、30年以上続いたC言語中心の開発から、<Term>メモリ安全性</Term>の高いRustへ段階的に移行しつつあります(3,000万行の全面置換には数十年かかる見込み)。また<strong>PREEMPT_RTパッチ</strong>が30年ぶりにメインラインへ統合され、工場制御・医療機器など「決まった時間内に処理する」リアルタイム用途にも対応しはじめました。
      </p>
      <Aside label="リーナスの名言">
        「Talk is cheap. Show me the code.(口先は安い。コードを見せろ)」 ― 理論より実装を重んじる姿勢。もう一つ、「Bad programmers worry about the code. Good programmers worry about data structures.」 ― 良いプログラマは<strong>データ構造(設計)</strong>を心配する、という言葉も知られています。
      </Aside>
      <p>
        リーナスは1997年に米国へ移住し、現在はオレゴン州で家族と暮らしています。メディア露出は少なくプライベートを重視。ミレニアム技術賞(2012)やIEEEメダル・オブ・オナー(2018)を受賞しても、本人は「特別じゃない。良いアイデアを認識できるだけ」と謙虚です。
      </p>

      <Heading num="まとめ">趣味が世界標準になった理由</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>公開して巻き込む</h4><p>未完成でも公開するバザール方式と意見募集が、世界中の開発者を惹きつけました。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>GPLという土台</h4><p>コピーレフトが企業参入を可能にし、無料と商用が共存するエコシステムを生みました。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>後方互換性への執念</h4><p>「動いていたものは動き続ける」という鉄則が、インフラとしての信頼を積み上げました。</p></Card>
      </CardGrid>
      <p>
        1人の学生の「趣味」が、GNUのツール群とGPL、そして世界中の協力を得て、地球上で最も使われるOSの一つになりました。次は、このLinuxが「本物のUNIX」やBSDとどう違うのか ― <Link href="/os/posix">UNIX・BSD・Linuxの違い</Link>で整理しましょう。
      </p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/os/gnu" tag="OS">GNUとフリーソフトウェア</RelatedLink>
                    <RelatedLink href="/os/unix" tag="OS">UNIXの歴史と哲学</RelatedLink>
                    <RelatedLink href="/os/posix" tag="OS">UNIX・BSD・Linuxの違い</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
