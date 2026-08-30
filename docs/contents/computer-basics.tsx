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
  title: "PCハードウェアの基礎",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>PCハードウェアの基礎 ― 中身を構成する部品たち</h1>
        <Lead>
          「OSの仕組み」や「メモリの仕組み」では、ソフトウェアの視点からコンピュータの内部を見てきました。ここでは視点を変えて、その土台になっている物理的な部品――CPU・GPU・ストレージ・電源・外部接続の規格――を1つずつ見ていきます。
        </Lead>
      </Hero>

      <Heading num="00">五大装置 ― コンピュータの地図</Heading>
      <p>個々の部品に入る前に、コンピュータ全体の「地図」を押さえておきます。どんなコンピュータも、役割で見ると次の<Term>五大装置</Term>に整理できます。この5つは以降のすべての話の土台です。</p>

      <table>
        <tbody>
          <tr><th>装置</th><th>役割</th><th>例</th></tr>
          <tr><td className="hl">入力装置</td><td>外部からデータや命令を取り込む</td><td>キーボード、マウス</td></tr>
          <tr><td className="hl">出力装置</td><td>処理結果を外に出す</td><td>ディスプレイ、プリンタ</td></tr>
          <tr><td className="hl">記憶装置</td><td>プログラムとデータを保持する</td><td>主記憶(メモリ)、補助記憶(SSD/HDD)</td></tr>
          <tr><td className="hl">演算装置</td><td>四則演算・論理演算を行う</td><td>CPUの一部</td></tr>
          <tr><td className="hl">制御装置</td><td>各装置への指示とタイミングを制御する</td><td>CPUの一部</td></tr>
        </tbody>
      </table>

      <p><strong>演算装置と制御装置をまとめたものが<Term>CPU</Term></strong>です。また記憶装置は、電源を切ると消える<Term>主記憶(揮発性)</Term>と、切っても残る<Term>補助記憶(不揮発性)</Term>の2種類に分かれます。CPUが記憶装置から命令を取り出して実行する流れは「<Link href="/computer/cpu">CPUと命令実行</Link>」で、記憶の速さと容量の階層は「<Link href="/computer/memory">メモリの仕組み</Link>」で詳しく扱います。</p>

      <p>ここから先は、この五大装置を実際の1台のPCとして開けたときに見える物理部品を、「計算し、記憶する部品」「起動時に信頼性を確保する仕組み」「電気を届け、外部とつなぐ規格」の3つの視点で見ていきます。</p>

      <Heading num="01">演算・記憶系 ― 計算する部品、覚えておく部品</Heading>
      <p>まずは、実際に「計算する」部品と、その結果やデータを「覚えておく」部品を見ていきます。</p>

      <Diagram caption="PC内部の主要パーツ。実線はデータのやり取り、破線は電源ユニットからの給電経路">
        <svg viewBox="0 0 640 380" xmlns="http://www.w3.org/2000/svg">
          <rect x={40} y={30} width={160} height={60} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={120} y={65} fill="#f2f2f2" fontSize="14" textAnchor="middle">CPU</text>

          <rect x={440} y={30} width={160} height={60} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={520} y={65} fill="#f2f2f2" fontSize="14" textAnchor="middle">GPU</text>

          <rect x={220} y={140} width={200} height={50} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={320} y={170} fill="#9a9a9a" fontSize="13" textAnchor="middle">マザーボード(バス)</text>

          <rect x={40} y={230} width={160} height={60} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={120} y={265} fill="#f2f2f2" fontSize="14" textAnchor="middle">メモリ(RAM)</text>

          <rect x={440} y={230} width={160} height={60} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={520} y={265} fill="#f2f2f2" fontSize="14" textAnchor="middle">SSD / HDD</text>

          <rect x={220} y={320} width={200} height={40} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={320} y={345} fill="#f2f2f2" fontSize="13" textAnchor="middle">電源ユニット(PSU)</text>

          <line x1={120} y1={90} x2={280} y2={140} stroke="#39ff6a" strokeWidth="1" />
          <line x1={520} y1={90} x2={360} y2={140} stroke="#39ff6a" strokeWidth="1" />
          <line x1={120} y1={230} x2={280} y2={190} stroke="#39ff6a" strokeWidth="1" />
          <line x1={520} y1={230} x2={360} y2={190} stroke="#39ff6a" strokeWidth="1" />

          <line x1={320} y1={320} x2={320} y2={190} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
        </svg>
      </Diagram>

      <h3>CPU ― すべての計算の中心</h3>
      <p><Term>CPU(Central Processing Unit、中央演算処理装置)</Term>は、プログラムの命令を1つずつ読み込んで実行する、パソコンの頭脳にあたる部品です。処理を担当する「コア」の数や、1秒間に何回計算できるかを表す「クロック周波数」が、CPUの処理能力を左右します。命令をどう1つずつ処理するか(命令サイクル)や、CPI・MIPSといった性能指標は「<Link href="/computer/cpu">CPUと命令実行</Link>」で詳しく扱います。</p>

      <h3>GPU ― 大量の計算を同時にこなす専門家</h3>
      <p><Term>GPU(Graphics Processing Unit)</Term>は、本来は画面に映る大量のピクセルを同時に計算するために生まれた部品です。CPUが「複雑な処理を順番にこなす少数の職人」だとすれば、GPUは「単純な計算を同時並行でこなす大人数の作業員」に近い構造をしています。この特性は画像処理だけでなく、近年では機械学習・AIの計算にも広く使われています。</p>

      <h3>メモリ(RAM) ― 一時的な作業スペース</h3>
      <p>実行中のプログラムを一時的に置いておく場所が<Term>メモリ(RAM)</Term>です。CPUがデータをやり取りする速度と、ストレージがデータを保存する速度の間を橋渡しする役割を持ちます。メモリの内部構造や、キャッシュ・スタック・ヒープといった詳しい階層については「<Link href="/computer/memory">メモリの仕組み</Link>」で扱っているので、ここでは深追いしません。</p>

      <h3>SSD と HDD ― 電源を切っても消えない保存先</h3>
      <p><Term>SSD(Solid State Drive)</Term>と<Term>HDD(Hard Disk Drive)</Term>は、どちらも電源を切ってもデータが消えない<Term>ストレージ</Term>ですが、記録の仕組みがまったく異なります。SSDはUSBメモリと同じ<Term>フラッシュメモリ</Term>にデータを記録する半導体方式で、可動部品を持ちません。HDDは磁気を帯びた円盤(プラッタ)を高速回転させ、そこへ磁気ヘッドでデータを読み書きする、モーターとアームを持つ機械式の装置です。</p>

      <table>
        <tbody>
          <tr><th>項目</th><th>SSD</th><th>HDD</th></tr>
          <tr><td className="hl">記録方式</td><td>フラッシュメモリ(半導体)</td><td>磁気ディスクの回転</td></tr>
          <tr><td className="hl">速度</td><td>非常に高速(可動部品なし)</td><td>低速(ヘッドとプラッタの物理動作)</td></tr>
          <tr><td className="hl">耐衝撃性</td><td>高い(可動部品なし)</td><td>低い(振動・衝撃に弱い)</td></tr>
          <tr><td className="hl">価格(容量あたり)</td><td>高め</td><td>安め</td></tr>
          <tr><td className="hl">主な用途</td><td>OS起動ドライブ、高速アクセスが必要なデータ</td><td>大容量アーカイブ・バックアップ</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        SSDは「本のページを直接開いて読む」ような装置で、どこを読んでも速度はほとんど変わりません。一方HDDは「レコード盤に針を落として音楽を聴く」ような装置で、目的の場所までアームと円盤を物理的に動かす必要があるぶん、待ち時間が発生します。
      </Analogy>

      <Heading num="02">起動・信頼の仕組み ― 電源を入れてOSが動き出すまで</Heading>
      <p>電源ボタンを押してからOSの画面が表示されるまでの間には、ハードウェアが自分自身の正しさを確認する、地味だが重要なプロセスが挟まっています。</p>

      <h3>BIOS ― 長年使われてきた起動プログラム</h3>
      <p><Term>BIOS(Basic Input/Output System)</Term>は、マザーボード上のチップに書き込まれた、OSを読み込む前に動く最初のプログラムです。電源投入直後にハードウェアの初期チェック(POST)を行い、起動ディスクを見つけてOSの読み込みに引き継ぎます。長年標準として使われてきましたが、扱えるディスク容量やセキュリティ機能に限界がありました。</p>

      <h3>UEFI ― BIOSを置き換えた新しい標準</h3>
      <p><Term>UEFI(Unified Extensible Firmware Interface)</Term>は、BIOSの後継として標準になった起動ファームウェアです。2TBを超える大容量ディスクの起動に対応し、マウス操作できるグラフィカルな設定画面を持ち、起動処理そのものも高速です。そして何より、後述する<Term>Secure Boot</Term>のような、起動時の安全性を確保する仕組みを備えている点が大きな違いです。</p>

      <h3>TPM ― 鍵を安全にしまっておく金庫</h3>
      <p><Term>TPM(Trusted Platform Module)</Term>は、暗号鍵やパスワードといった機密情報を、OSからも取り出しにくい形でハードウェア側に保管しておく専用チップです。ディスク全体の暗号化機能や生体認証データの保護などに使われ、たとえOSが乗っ取られても中身を簡単には読み取られない設計になっています。</p>

      <h3>Secure Boot ― 起動するプログラムの身元を確認する</h3>
      <p><Term>Secure Boot</Term>は、UEFIが起動処理を進める中で、読み込もうとしているブートローダーやOSに正規の署名があるかどうかを検証する仕組みです。署名を確認できないプログラムの起動を拒否することで、OSが立ち上がる前の段階でマルウェアが入り込むのを防ぎます。</p>

      <Analogy label="💡 たとえるなら">
        UEFIとSecure Bootの関係は「本人確認をするドアマン」に例えられます。UEFIという受付が、入館しようとするプログラム(起動プログラム)の身分証(署名)を1つずつ確認し、正規の身分証を持たないプログラムは建物(OS)の中に入れません。TPMはその身分証や鍵を保管する、受付の奥にある金庫です。
      </Analogy>

      <Heading num="03">電源と外部接続 ― 電気を届け、機器をつなぐ</Heading>
      <p>どれだけ高性能な部品を揃えても、それらに十分な電気を届け、周辺機器と正しくつなげられなければ動きません。</p>

      <h3>電源ユニット(PSU) ― 部品ごとに電気を届ける</h3>
      <p><Term>電源ユニット(PSU、Power Supply Unit)</Term>は、コンセントからの交流電流を、CPUやGPU、ストレージなど各部品が必要とする直流電流に変換して届ける部品です。搭載する部品の消費電力の合計に対して余裕を持った「容量(W、ワット数)」を選ぶ必要があり、特に消費電力の大きいGPUを積む構成では、電源ユニットの容量不足が起動不能や動作不安定の原因になります。</p>

      <h3>USB・Thunderbolt ― 周辺機器をつなぐ規格</h3>
      <p><Term>USB(Universal Serial Bus)</Term>はキーボード・マウス・外付けストレージなどをつなぐ汎用規格で、世代が進むごとに高速化しています。<Term>Thunderbolt</Term>はデータ・映像・給電を1本でまかなえる高速規格です。USBの世代別の速度、Thunderboltとの違い、DMAやプラグアンドプレイといった接続の仕組みは「<Link href="/computer/io/interface">入出力インタフェース</Link>」で詳しく扱います。</p>

      <Heading num="まとめ">覚えておきたい3つの視点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>演算・記憶系は役割分担</h4>
          <p>CPU・GPUが計算を担当し、メモリ・ストレージが速さと容量のトレードオフで記憶を担当します。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>起動の信頼はUEFIが土台</h4>
          <p>BIOSからUEFIへ移行し、TPMとSecure Bootが起動前の安全性を支えています。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>電源と規格が全体を支える</h4>
          <p>電源ユニットの容量、USBの世代、Thunderboltの規格が実際の使い勝手を左右します。</p>
        </Card>
      </CardGrid>
      <p>物理的な部品がそろったら、次はそれらのパソコンがどうやって他のコンピュータと通信するのかを見ていきましょう。まずは、実務で使うIPアドレスの設計とトラブルシュートを扱います。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/cpu" tag="コンピュータ">CPUと命令実行</RelatedLink>
                    <RelatedLink href="/network/ip" tag="ネットワーク">IPアドレスとルーティングの実務</RelatedLink>
                    <RelatedLink href="/computer/memory" tag="コンピュータ">メモリの仕組み</RelatedLink>
                    <RelatedLink href="/network/link/wireless" tag="ネットワーク">無線LAN(Wi-Fi)</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
