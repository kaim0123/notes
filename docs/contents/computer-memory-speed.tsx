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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "速さの壁 ― キャッシュ・帯域・HBM",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>速さの壁 ― キャッシュ・帯域・HBM</h1>
        <Lead>
          メモリの物語は、ある時点で主役を交代します。「どれだけ覚えられるか(量)」から、「どれだけ速くデータを運べるか(速度・帯域)」へ。CPUは飛躍的に速くなったのに、メモリはそれについていけませんでした。この“速さの壁”をめぐる工夫が、キャッシュを生み、HBMを生み、そしてAI時代の最大のボトルネックになっています。
        </Lead>
      </Hero>

      <p>前のページでは、メモリ容量が潤沢になり、その分ソフトウェアが肥大化する「量」の物語を見ました。ここからは「速さ」の物語です。実は容量が足りる時代になっても、別の「足りない」がすぐに姿を現しました。</p>

      <Heading num="01">CPUとメモリの、広がり続ける速度差</Heading>
      <p>2000年代初頭、ある深刻な問題が明らかになります。CPUは速くなり続けたのに、DRAMのアクセス速度がほとんど伸びなかったのです。</p>

      <table>
        <tbody>
          <tr><th>時代</th><th>状況</th></tr>
          <tr><td className="hl">1990年代</td><td>CPUのクロックが毎年50〜60%も向上していた</td></tr>
          <tr><td className="hl">2000年代〜</td><td>熱と電力の壁にぶつかり、4〜5GHz台で頭打ちに</td></tr>
          <tr><td className="hl">DRAM</td><td>アクセス速度の向上は年率7%程度にとどまった</td></tr>
          <tr><td className="hl">結果</td><td>CPUとDRAMの速度差が100倍以上に。CPU実行時間の半分以上が「メモリ待ち」だという研究も</td></tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        CPUは100m走のトップ選手、DRAMはのんびり歩くおじさんです。選手がどれだけ速く走れても、おじさんが資料を届けてくれるまで待つしかありません。この<strong>メモリ待ち(ストール)</strong>は、渋滞した道路で高性能スポーツカーが1mmも進めないのと同じ。エンジン(CPU)をいくら強化しても、道(メモリ)が詰まっていれば意味がないのです。
      </Analogy>

      <Heading num="02">キャッシュ階層 ― 倉庫の手前に棚を置く</Heading>
      <p>この速度差を埋めるのが<Term>キャッシュ</Term>です。遠い倉庫(DRAM)とCPUの間に、よく使うものを置く小さな棚(キャッシュ)を何段も設ける発想。CPUに近いほど速く小さく、遠いほど遅く大きくなります。</p>

      <table>
        <tbody>
          <tr><th>レベル</th><th>アクセス時間の目安</th><th>容量</th></tr>
          <tr><td className="hl">L1</td><td>ナノ秒オーダー</td><td>数十〜数百KB</td></tr>
          <tr><td className="hl">L2</td><td>数ナノ秒</td><td>数百KB〜数MB</td></tr>
          <tr><td className="hl">L3</td><td>数十ナノ秒</td><td>数MB〜数十MB</td></tr>
          <tr><td className="hl">DRAM</td><td>60〜100ナノ秒</td><td>GB単位</td></tr>
        </tbody>
      </table>

      <p>キャッシュが効くのは<Term>局所性</Term>という性質のおかげです。プログラムは「同じデータ」「近くのデータ」に繰り返しアクセスする傾向があり、一度棚に載せたものはまた使われる可能性が高い。棚にある割合(<strong>キャッシュヒット率</strong>)が高いほど速くなり、逆に外れると一気にDRAMまで取りに行くことになり遅くなります。</p>

      <Aside label="投機的実行 ― もう一つの誤魔化し">
        キャッシュで隠しても、CPUとDRAMの速度差は本質的には残ります。そこで現代のCPUは<strong>投機的実行(アウトオブオーダー実行)</strong>も使います。メモリ待ちの間、「次はたぶんこれを計算する」と予測して先に処理を進めておくのです。当たれば待ち時間を有効活用できますが、外れるとやり直しでかえって遅くなることもあります。根っこの「CPUは速いがデータが届かない」構造は今も消えていません。
      </Aside>

      <h3>WinFSの失敗 ― リソースの壁に散った野望</h3>
      <p>速さとリソースの壁を軽く見た結果、大きな失敗も生まれました。Windows Longhorn(後のVista)の開発中に構想された<Term>WinFS</Term>です。全ファイルをデータベース化してSQLで検索できる、という壮大な計画でした。</p>
      <table>
        <tbody>
          <tr><th>年</th><th>出来事</th></tr>
          <tr><td className="hl">開発中</td><td>WinFSを有効化するだけで、ビルド全体がXPより体感で遅くなるほどの深刻なメモリリークと性能問題</td></tr>
          <tr><td className="hl">2004年</td><td>Microsoftがついにデスクトップの開発をリセットし、コードを作り直す決断</td></tr>
          <tr><td className="hl">2006年</td><td>Vistaから切り離され、WinFSは製品化されなかった</td></tr>
          <tr><td className="hl">2006→2009年</td><td>失敗の教訓がVista→Windows 7の設計に折り込まれ、7はVistaより確実に軽快になった</td></tr>
        </tbody>
      </table>
      <p>「便利さ」の裏でメモリと速度がどれだけ必要かを見誤ると、どんな大企業の壮大な構想も足元から崩れる ― という教訓です。ただし、その失敗は次の世代(Windows 7)への学習コストとしてきちんと回収されました。</p>

      <Heading num="03">スマホ ― PCと正反対の哲学</Heading>
      <p>速さと省エネの制約がもっとも厳しいのがスマートフォンです。スマホは、PCとは<strong>逆の設計思想</strong>を選びました。</p>
      <table>
        <tbody>
          <tr><th>項目</th><th>PC</th><th>スマホ</th></tr>
          <tr><td className="hl">設計思想</td><td>メモリをどんどん増やす</td><td>少ないメモリで快適に動かす</td></tr>
          <tr><td className="hl">2007年 初代iPhone</td><td>―</td><td>RAMは128MB</td></tr>
          <tr><td className="hl">バックグラウンド</td><td>アプリを生かし続ける</td><td>使っていないアプリを容赦なく終了して節約</td></tr>
          <tr><td className="hl">よくある誤解</td><td>―</td><td>「16GB/32GB」はストレージ容量。実際のRAMは4〜8GBが普通</td></tr>
        </tbody>
      </table>
      <p>スマホがアプリを裏でどんどん終了させるのは、不親切なのではなく<strong>限られたメモリを守るための積極的な戦略</strong>です。「1ビットも無駄にしない」磁気コア時代の精神が、手のひらの中でよみがえっているとも言えます。</p>

      <Aside label="Apple Siliconの統合メモリ">
        Apple SiliconはCPUとGPUが同じメモリ空間を共有する<strong>統合メモリ</strong>を採用しました。従来はCPU用メモリとGPU用メモリの間でデータをコピーする必要がありましたが、それが不要になり、速度と電力効率が大きく向上しました。これも「データを運ぶコスト」を削る工夫の一つです。
      </Aside>

      <Heading num="04">GPU・VRAM・HBM ― 帯域という新しい戦場</Heading>
      <p>GPUはもともと「画面を映す係」でしたが、今や<strong>並列演算の巨大な工場</strong>です。3DゲームやAIの行列計算では、大量のデータを高速に出し入れする必要があり、GPU専用の高速メモリ<Term>VRAM</Term>が使われます。そしてその究極形が<Term>HBM(High Bandwidth Memory)</Term>です。</p>

      <Diagram caption="従来のGDDR(横並び)と、HBM(縦積み+TSV)の違い">
        <svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">
          <text x={150} y={24} fill="#9a9a9a" fontSize="12" textAnchor="middle">従来 GDDR ― 基板に横並び</text>
          <rect x={40} y={150} width={220} height={18} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={150} y={185} fill="#9a9a9a" fontSize="11" textAnchor="middle">基板</text>
          <rect x={50} y={110} width={40} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <rect x={110} y={110} width={40} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <rect x={170} y={110} width={40} height={38} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={70} y={133} fill="#f2f2f2" fontSize="10" textAnchor="middle">DRAM</text>
          <text x={130} y={133} fill="#f2f2f2" fontSize="10" textAnchor="middle">DRAM</text>
          <text x={190} y={133} fill="#f2f2f2" fontSize="10" textAnchor="middle">DRAM</text>
          <text x={150} y={210} fill="#9a9a9a" fontSize="11" textAnchor="middle">配線が長い → 帯域に限界</text>

          <text x={480} y={24} fill="#9a9a9a" fontSize="12" textAnchor="middle">HBM ― 縦に多層積み</text>
          <rect x={420} y={150} width={140} height={18} fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <rect x={455} y={54} width={70} height={22} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <rect x={455} y={78} width={70} height={22} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <rect x={455} y={102} width={70} height={22} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <rect x={455} y={126} width={70} height={22} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={490} y={69} fill="#f2f2f2" fontSize="10" textAnchor="middle">DRAM</text>
          <text x={490} y={93} fill="#f2f2f2" fontSize="10" textAnchor="middle">DRAM</text>
          <text x={490} y={117} fill="#f2f2f2" fontSize="10" textAnchor="middle">DRAM</text>
          <text x={490} y={141} fill="#f2f2f2" fontSize="10" textAnchor="middle">DRAM</text>
          <line x1={490} y1={54} x2={490} y2={150} stroke="#39ff6a" strokeWidth="1" strokeDasharray="2 2" />
          <text x={490} y={210} fill="#9a9a9a" fontSize="11" textAnchor="middle">TSVで直結 → 帯域が桁違い</text>
        </svg>
      </Diagram>

      <p>従来のGDDRは基板の上にメモリチップを<strong>横並び</strong>に配置します。対してHBMは、DRAMチップを<strong>縦に何層も積み上げ</strong>、<Term>TSV(シリコン貫通電極)</Term>という縦穴の配線で直接つなぎます。配線経路が短くなるので、同じ面積に何倍もの配線を通せて、<strong>帯域幅が桁違い</strong>になります(HBM3Eでは毎秒1TBを超えます)。課題は熱・製造コスト・消費電力です。</p>

      <Analogy label="💡 たとえるなら">
        GDDRが平屋の家を横に並べた住宅街だとすれば、HBMは<strong>タワーマンション</strong>です。同じ土地(面積)に何倍もの世帯(データの通り道)を収容でき、上下の移動(TSV)も一瞬。ただし高層ビルと同じで、熱がこもりやすく、建てるコストも高くつきます。
      </Analogy>

      <Heading num="05">AIのボトルネックは「計算」ではなく「読み出し」</Heading>
      <p>そして今、この帯域の問題が最前線に立っているのが<strong>大規模言語モデル(LLM)</strong>です。LLMのパラメータは数百GBにもなり、推論(応答生成)のたびにその膨大な重みを<strong>何度も読み返す</strong>必要があります。</p>
      <Analogy label="💡 たとえるなら">
        LLMの推論は、<strong>100万人分の分厚い辞書を毎回めくり直しながら会話している</strong>ようなものです。頭の回転(計算)がどれだけ速くても、辞書のページをめくる速度(メモリ帯域)が追いつかなければ、会話は先に進みません。
      </Analogy>
      <p>その結果、意外なことが起きています。NVIDIA H100はHBMで<strong>毎秒3.35TB</strong>という途方もない帯域を持ちますが、LLM推論時のハードウェア活用率は<strong>数%程度</strong>にとどまることがあります。行列演算のように連続して読み出せれば帯域をフル活用できますが、LLM推論は<strong>アクセスパターンが不規則</strong>で、飛び飛びの読み出しになるため帯域を使い切れないのです。問題は「量」から「帯域」へ、はっきりと移りました。</p>

      <Heading num="結論">永遠に解決しないループ</Heading>
      <p>ここまで60年をたどってきました。パンチカード → 水銀 → 磁気コア → DRAM → 仮想メモリ → キャッシュ → HBM。形は違えど、すべて<strong>同じ欲求</strong>から生まれています。</p>
      <Diagram caption="足りなさが工夫を生み、工夫がまた新しい足りなさを生む">
        <svg viewBox="0 0 640 120" xmlns="http://www.w3.org/2000/svg">
          <text x={70} y={65} fill="#f2f2f2" fontSize="12" textAnchor="middle">余裕が</text>
          <text x={70} y={82} fill="#f2f2f2" fontSize="12" textAnchor="middle">できる</text>
          <text x={155} y={73} fill="#9a9a9a" fontSize="16" textAnchor="middle">→</text>
          <text x={230} y={65} fill="#f2f2f2" fontSize="12" textAnchor="middle">使い切る</text>
          <text x={310} y={73} fill="#9a9a9a" fontSize="16" textAnchor="middle">→</text>
          <text x={390} y={65} fill="#f2f2f2" fontSize="12" textAnchor="middle">足りなく</text>
          <text x={390} y={82} fill="#f2f2f2" fontSize="12" textAnchor="middle">なる</text>
          <text x={470} y={73} fill="#9a9a9a" fontSize="16" textAnchor="middle">→</text>
          <text x={555} y={65} fill="#39ff6a" fontSize="12" textAnchor="middle">工夫する</text>
          <text x={555} y={82} fill="#39ff6a" fontSize="12" textAnchor="middle">(新技術)</text>
          <path d="M555 95 q0 20 -240 20 q-245 0 -245 -20" fill="none" stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
          <polygon points="70,95 64,105 76,105" fill="#5f5f5f" />
        </svg>
      </Diagram>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>壁を超えても、次の壁が現れる</h4>
          <p>量の壁を超えたら速さの壁。速さの壁の次は<strong>電力と冷却</strong>です。大規模AI学習には原子力発電所1基分に迫る電力が要るという試算もあります。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>失敗は学習コストとして回収される</h4>
          <p>WinFSの失敗はWindows 7へ、磁気ドラムの苦労は現代の最適化へ。うまくいかなかった挑戦も、次の世代の糧になります。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>言っていることは60年変わらない</h4>
          <p>黎明期のプログラマも今日のAIエンジニアも、同じ「足りない」を口にしています。舞台も桁も変わったのに、言葉だけは変わりません。</p>
        </Card>
      </CardGrid>

      <Aside label="いちばん効く節約術">
        壮大な話の最後に、拍子抜けするほど実践的な結論を。あなたのPCのメモリを今すぐ楽にする一番の方法は ―<strong>開きっぱなしのタブを閉じること</strong>です。60年の歴史も、結局そこに戻ってきます。
      </Aside>

      <p>ここまでは記憶装置を「上から」眺めてきました。最後に視点をぐっと下げ、プログラムが関数を呼ぶたびにメモリの中で何が起きているのか ―「スタックと関数呼び出しの舞台裏」を覗いてみましょう。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/computer/memory/stack" tag="コンピュータ">スタックと関数呼び出しの舞台裏</RelatedLink>
                    <RelatedLink href="/computer/memory/virtual" tag="コンピュータ">仮想メモリとソフトウェアの肥大化</RelatedLink>
                    <RelatedLink href="/computer/memory" tag="コンピュータ">メモリの仕組み ― 記憶階層と4領域</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
