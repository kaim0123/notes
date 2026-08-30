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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "40%キーボードとレイヤー設計",
};

const preClass =
  "overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.8rem] leading-relaxed";

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; 開発環境</Eyebrow>
        <h1>40%キーボードとレイヤー設計 ― キーを減らして日本語も記号も速く打つ</h1>
        <Lead>
          <Term>40%キーボード</Term>は物理キーを40〜48個ほどに削ぎ落とした小型キーボードです。数字列も記号列も矢印もありません。その代わり<Term>レイヤー</Term>という「キーの切り替え面」を重ねることで、指をホームポジションから動かさずにすべての入力をこなします。日本語話者がUS配列で使う場合、鍵になるのは<strong>日本語/英語の切り替え</strong>と<strong>プログラミング記号</strong>をどのレイヤーに割り当てるか。この2点を軸に、削るキーと残すキー、そして各レイヤーのおすすめ配置を設計します。
        </Lead>
      </Hero>

      <Heading num="01">なぜ40%か ― 「指を動かさない」ための引き算</Heading>
      <p>
        フルサイズキーボードは104キー前後あり、数字列・記号列・矢印・テンキー・ファンクションキーが外周に並びます。速く打とうとすると、これらへ手を伸ばすたびにホームポジション(<code>ASDF</code> / <code>JKL;</code>)が崩れ、指が「戻る」動作を強いられます。40%キーボードの発想は逆で、<strong>キーを外周に増やすのではなく、ホームポジションの真下に別の意味を重ねる</strong>というものです。
      </p>
      <p>
        「1つのキーに複数の役割を持たせる」ための道具が2つあります。1つは<Term>レイヤー</Term>(面の切り替え)、もう1つは<Term>デュアルファンクション</Term>(1キーに<em>タップ</em>と<em>長押し</em>で別の機能)。この2つを組み合わせると、48キーでもフルサイズ相当の入力を、ホームポジションを崩さずに実現できます。
      </p>
      <Analogy label="💡 たとえるなら">
        レイヤーは「ピアノのペダル」です。同じ鍵盤でも、ペダルを踏んでいる間は音の性質が変わります。キーボードでは、親指でレイヤーキーを踏んでいる間だけ、<code>U I O</code>が<code>7 8 9</code>に化ける。指はどこにも移動していないのに、押した「面」が違うので別の文字が出る ― これが40%キーボードの中心的な仕掛けです。
      </Analogy>

      <Heading num="02">レイヤーとデュアルファンクションの仕組み</Heading>
      <p>
        レイヤーの起動方法にはいくつか種類があり、用途で使い分けます。40%運用ではとくに<Term>長押しで一時起動(MO / LT)</Term>と<Term>ワンショット(OSL)</Term>が主役です。
      </p>
      <table>
        <thead>
          <tr><th>方式</th><th>挙動</th><th>向いている用途</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">MO(momentary)</td><td>押している間だけレイヤーON、離すと戻る</td><td>記号・数字など、押しながら打つレイヤー</td></tr>
          <tr><td className="hl">LT(layer-tap)</td><td>タップ=通常キー / 長押し=レイヤーON</td><td>親指キー(例: タップでSpace、長押しでナビ)</td></tr>
          <tr><td className="hl">OSL(one-shot)</td><td>1回押すと「次の1打だけ」レイヤーON</td><td>単発の記号を押しっぱなしにせず出したいとき</td></tr>
          <tr><td className="hl">TG(toggle)</td><td>押すとON/OFFが切り替わり固定される</td><td>テンキー連打モードなど、状態を保ちたいとき</td></tr>
        </tbody>
      </table>
      <p>
        デュアルファンクションの代表が<Term>モッドタップ</Term>(タップ=文字、長押し=修飾キー)です。これを応用して修飾キー(Ctrl/Shift/Alt/GUI)をホーム段の指の下に置くのが<Term>ホームロウモッド(Home Row Mods)</Term>で、40%運用では定番のテクニックです。<code>Ctrl</code>や<code>Shift</code>のために小指を隅へ伸ばす必要がなくなります。
      </p>
      <Aside label="ファーム">
        こうした挙動は<Term>ファームウェア</Term>側で定義します。自作・小型キーボードでは<Term>QMK</Term>(C。<Term>Vial</Term>を使えばGUIで書き換え可能)や<Term>ZMK</Term>(無線向け)が主流です。この記事のキーコードはQMK表記で示します。
      </Aside>

      <Heading num="03">ベースレイヤー ― ホームロウモッドと親指クラスタ</Heading>
      <p>
        すべての土台になるのがベースレイヤーです。ここには<strong>アルファベットと、他レイヤーへの入口(親指キー)、そして修飾キー</strong>だけを置きます。日本語をローマ字入力する以上、かな入力も英字入力も<em>同じアルファベット面</em>を使うので、ベースレイヤーは日英で共用できる点がポイントです。切り替えるのはIMEのON/OFFだけで済みます。
      </p>
      <p>
        修飾キーはホームロウモッドに逃がします。ホーム段の8キーに、内側の強い指から順にShift・GUI・Alt・Ctrlを重ねるのが一般的な並びです(左右対称)。
      </p>
      <Diagram caption="ベースレイヤー(QWERTY・36キー例)。ホーム段の下段表記が長押し時の修飾キー、親指は入口キー">
        <div className="text-left">
          <pre className={preClass}>
            <code>{`┌───┬───┬───┬───┬───┐   ┌───┬───┬───┬───┬───┐
│ Q │ W │ E │ R │ T │   │ Y │ U │ I │ O │ P │
├───┼───┼───┼───┼───┤   ├───┼───┼───┼───┼───┤
│ A │ S │ D │ F │ G │   │ H │ J │ K │ L │ ; │
│Gui│Alt│Ctl│Sft│   │   │   │Sft│Ctl│Alt│Gui│  ← 長押し=修飾キー
├───┼───┼───┼───┼───┤   ├───┼───┼───┼───┼───┤
│ Z │ X │ C │ V │ B │   │ N │ M │ , │ . │ / │
└───┴───┴───┴───┴───┘   └───┴───┴───┴───┴───┘
        ┌────┬─────┬──────┐ ┌──────┬─────┬────┐
        │Esc │Space│ 英数 │ │ かな │Enter│Bsp │  親指クラスタ
        │Fn  │Nav  │ Num  │ │ Sym  │     │Del │  ← 長押し=レイヤー
        └────┴─────┴──────┘ └──────┴─────┴────┘`}</code>
          </pre>
        </div>
      </Diagram>
      <p>
        親指クラスタの設計思想は<strong>「片方の親指でレイヤーを踏み、反対の手で打つ」</strong>です。左親指のレイヤー(Nav)は右手で操作し、右親指のレイヤー(Sym/Num)は左手で操作します。こうすると「レイヤーを押す指」と「文字を打つ指」がぶつからず、押しっぱなしのまま連打できます。内側の親指2つを<Term>英数</Term>/<Term>かな</Term>に充てているのが最大のポイントで、これは次章の主役です。
      </p>

      <Heading num="04">日本語/英語の切り替え ― 内側親指に英数・かなを置く</Heading>
      <p>
        日英を頻繁に切り替えるなら、<strong>トグル(押すたびにON/OFF反転)は避けるべき</strong>です。今どちらの状態か分からなくなり、打ってから気づいて打ち直す事故が必ず起きます。macOSが採用している<Term>英数キー(常に英語へ)</Term>と<Term>かなキー(常に日本語へ)</Term>の2キー方式が最善で、状態を「見なくても確定できる」のが強みです。これを一番押しやすい<strong>左右の内側親指</strong>に置きます(macOSのスペース両脇と同じ配置)。
      </p>
      <p>
        US配列の物理キーボードにはこの2キーがありませんが、ファームウェアから専用キーコードを送れば再現できます。OSごとに送るコードが違います。
      </p>
      <table>
        <thead>
          <tr><th>OS</th><th>英数(英語へ)</th><th>かな(日本語へ)</th><th>追加設定</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">macOS</td><td><code>KC_LNG2</code></td><td><code>KC_LNG1</code></td><td>不要(OSが直接解釈)</td></tr>
          <tr><td className="hl">Windows</td><td><code>KC_INT5</code>(無変換)</td><td><code>KC_INT4</code>(変換)</td><td>IME側で割り当て(下記)</td></tr>
        </tbody>
      </table>
      <p>
        Windowsには<code>英数</code>/<code>かな</code>という概念が無いため、<Term>無変換</Term>キーと<Term>変換</Term>キーを送り、IME側で「無変換=IMEオフ(半角英数)」「変換=IMEオン(ひらがな)」に割り当てます。Microsoft IMEなら「キーとタッチのカスタマイズ」、Google日本語入力ならキー設定で、<code>無変換</code>→<code>IME無効化</code>、<code>変換</code>→<code>ひらがなに入力切替</code>を全モードに設定すれば、macOSと同じ2キー運用になります。
      </p>
      <pre className={preClass}>
        <code>{`// QMK: 親指キーに割り当てる例(OSごとに定義を切り替える)
// --- macOS ---
#define K_EISU KC_LNG2   // 英数(常に英語)
#define K_KANA KC_LNG1   // かな(常に日本語)

// --- Windows(IME側で 無変換→オフ / 変換→オン を設定) ---
#define K_EISU KC_INT5   // 無変換
#define K_KANA KC_INT4   // 変換

// 内側親指: タップでIME切替、長押しでレイヤー
LT(_NUM, K_EISU)   // 左内側: タップ=英数, 長押し=数字レイヤー
LT(_SYM, K_KANA)   // 右内側: タップ=かな, 長押し=記号レイヤー`}</code>
      </pre>
      <Aside label="ローマ字の利点">
        ローマ字入力では日本語も英字と同じキーを叩くので、切り替えは<strong>IMEのON/OFFだけ</strong>。専用のかな配列を覚える必要はなく、ベースレイヤーを日英で完全に共用できます。だからこそ「2つのIMEキー」を最優先で親指に置く価値があります。
      </Aside>

      <Heading num="05">記号レイヤー ― プログラミングの括弧と演算子を左手に</Heading>
      <p>
        プログラミングで頻出する記号を、右内側親指(かな)の長押しで開く<Term>記号レイヤー</Term>にまとめ、<strong>左手</strong>で打てるようにします。数字列の上段記号(<code>! @ # $ %</code> …)をそのまま並べるのではなく、<strong>使用頻度で並べ替える</strong>のがコツです。括弧類 <code>() [] {} &lt;&gt;</code> と、代入・比較でよく使う <code>= + - * / &amp; | ! ?</code> をホーム段付近に集約します。
      </p>
      <Diagram caption="記号レイヤー例。右親指(かな)長押し中に左手で入力。括弧はペアで隣接させると打ちやすい">
        <div className="text-left">
          <pre className={preClass}>
            <code>{`┌───┬───┬───┬───┬───┐   ┌───┬───┬───┬───┬───┐
│ ! │ @ │ { │ } │ | │   │ ^ │ ( │ ) │ = │ + │
├───┼───┼───┼───┼───┤   ├───┼───┼───┼───┼───┤
│ # │ $ │ ( │ ) │ \` │   │ * │ - │ : │ ; │ " │
├───┼───┼───┼───┼───┤   ├───┼───┼───┼───┼───┤
│ % │ ^ │ [ │ ] │ ~ │   │ & │ / │ < │ > │ ? │
└───┴───┴───┴───┴───┘   └───┴───┴───┴───┴───┘
              押しながら → │かな長押し│  ← ここを保持`}</code>
          </pre>
        </div>
      </Diagram>
      <p>
        ペアになる括弧(<code>()</code>・<code>[]</code>・<code>{}</code>)は隣同士に置くと、開いて閉じる動作が指の連続運動になって速くなります。<code>-</code>(アロー<code>-&gt;</code>や<code>--</code>)、<code>=</code>(<code>==</code>・<code>=&gt;</code>)、<code>&amp;</code>・<code>|</code>(論理演算)といった連続で押しがちな記号はホーム段に寄せます。バッククォート <code>`</code> やチルダ <code>~</code>、パイプ <code>|</code> はシェルやMarkdownで多用するので、埋もれない位置に確保しておきます。
      </p>

      <Heading num="06">数字レイヤー ― テンキー型に並べる</Heading>
      <p>
        数字は左内側親指(英数)の長押しで開く<Term>数字レイヤー</Term>に、<strong>右手でテンキー型</strong>に並べます。数字列のように横1列で覚えるより、電卓と同じ<code>7 8 9 / 4 5 6 / 1 2 3</code>の3×3配置のほうが、数値をまとめて打つときに圧倒的に速く正確です。
      </p>
      <Diagram caption="数字レイヤー例。左親指(英数)長押し中に右手でテンキー入力">
        <div className="text-left">
          <pre className={preClass}>
            <code>{`┌───┬───┬───┬───┬───┐   ┌───┬───┬───┬───┬───┐
│   │   │   │   │   │   │ / │ 7 │ 8 │ 9 │ - │
├───┼───┼───┼───┼───┤   ├───┼───┼───┼───┼───┤
│Gui│Alt│Ctl│Sft│   │   │ * │ 4 │ 5 │ 6 │ + │
├───┼───┼───┼───┼───┤   ├───┼───┼───┼───┼───┤
│   │   │   │   │   │   │ 0 │ 1 │ 2 │ 3 │ . │
└───┴───┴───┴───┴───┘   └───┴───┴───┴───┴───┘
  英数長押し → │保持│  押しながら右手で数字`}</code>
          </pre>
        </div>
      </Diagram>
      <p>
        左手側のホーム段には修飾キー(ホームロウモッド)を残しておくと、<code>Ctrl</code>+数字や<code>Alt</code>+数字(タブ切り替えなど)がこのレイヤーのまま押せて便利です。テンキーを連打し続けたい会計作業のような場面では、MOではなく<strong>TG(トグル)</strong>で固定するレイヤーを別に用意する手もあります。
      </p>

      <Heading num="07">ナビ・矢印・ファンクションレイヤー</Heading>
      <p>
        矢印やHome/End、ファンクションキーは<Term>ナビレイヤー</Term>と<Term>Fnレイヤー</Term>に逃がします。矢印は<Term>Vim</Term>由来の<code>HJKL</code>(←↓↑→)に割り当てるのが定番で、左親指のSpace長押しで開き、右手のホーム段でカーソルを操作します。指がホームポジションから一切動かないのが最大の利点です。
      </p>
      <Diagram caption="ナビレイヤー例。左親指(Space)長押し中に右手でカーソル操作。HJKLが矢印になる">
        <div className="text-left">
          <pre className={preClass}>
            <code>{`┌───┬───┬───┬───┬───┐   ┌────┬────┬────┬────┬────┐
│   │   │   │   │   │   │Undo│Cut │Copy│Pste│Redo│
├───┼───┼───┼───┼───┤   ├────┼────┼────┼────┼────┤
│Gui│Alt│Ctl│Sft│   │   │ ←  │ ↓  │ ↑  │ →  │    │  H J K L
├───┼───┼───┼───┼───┤   ├────┼────┼────┼────┼────┤
│   │   │   │   │   │   │Home│PgDn│PgUp│End │    │
└───┴───┴───┴───┴───┘   └────┴────┴────┴────┴────┘
  Space長押し → │保持│`}</code>
          </pre>
        </div>
      </Diagram>
      <p>
        コピー・カット・ペースト・アンドゥ・リドゥを上段にまとめておくと、編集作業がこのレイヤー内で完結します。<code>F1</code>〜<code>F12</code>はさらに使用頻度が低いので、左親指(Esc/Fn)長押しのFnレイヤーへ。数字レイヤーのテンキー位置(<code>7〜9</code>=<code>F7〜F9</code> …)に対応させて並べると、配置を1つ覚えるだけで済みます。
      </p>

      <Heading num="08">削ったキーの行き先 ― 残す・削るの判断表</Heading>
      <p>
        ここまでの設計を、フルサイズにあるキーごとの「残す/削る/代替」としてまとめます。判断軸はシンプルで、<strong>打鍵頻度が高くホームポジションで押したいものは残し(またはタップ側)、頻度が低いものはレイヤーへ逃がす</strong>です。
      </p>
      <table>
        <thead>
          <tr><th>キー</th><th>扱い</th><th>代替・行き先</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">アルファベット</td><td>残す</td><td>ベースレイヤー(日英共用)</td></tr>
          <tr><td className="hl">Space</td><td>残す</td><td>左親指タップ / 長押し=ナビ</td></tr>
          <tr><td className="hl">Enter</td><td>残す</td><td>右親指タップ</td></tr>
          <tr><td className="hl">Backspace</td><td>残す</td><td>右親指タップ / 長押し=Delete</td></tr>
          <tr><td className="hl">Esc / Tab</td><td>残す</td><td>親指タップ or コンボ(隣接2キー同時押し)</td></tr>
          <tr><td className="hl">英数 / かな</td><td>追加</td><td>左右の内側親指(最優先)</td></tr>
          <tr><td className="hl">Caps Lock</td><td>削る</td><td>廃止 or Esc・Ctrlに転用</td></tr>
          <tr><td className="hl">数字列</td><td>削る</td><td>数字レイヤー(右手テンキー型)</td></tr>
          <tr><td className="hl">記号列</td><td>削る</td><td>記号レイヤー(左手・頻度順)</td></tr>
          <tr><td className="hl">矢印</td><td>削る</td><td>ナビレイヤーの <code>HJKL</code></td></tr>
          <tr><td className="hl">Home / End</td><td>削る</td><td>ナビレイヤー下段</td></tr>
          <tr><td className="hl">PgUp / PgDn</td><td>削る</td><td>ナビレイヤー下段</td></tr>
          <tr><td className="hl">Fキー</td><td>削る</td><td>Fnレイヤー(テンキー位置に対応)</td></tr>
          <tr><td className="hl">テンキー</td><td>削る</td><td>数字レイヤー(TG固定も可)</td></tr>
          <tr><td className="hl">Ctrl / Alt / Shift / GUI</td><td>移設</td><td>ホームロウモッド(ホーム段長押し)</td></tr>
        </tbody>
      </table>

      <Heading num="09">誤爆対策 ― 速いローマ字入力とホームロウモッドの相性</Heading>
      <p>
        デュアルファンクションの弱点は<Term>誤爆</Term>です。とくにホームロウモッドは、ローマ字を速く打つと「長押し」と誤判定され、意図しない<code>Ctrl</code>や<code>Shift</code>が混入します。日本語ローマ字は同じ手の指を素早く転がす(<code>ka</code>・<code>sa</code>・<code>ta</code> など)場面が多く、ここが実用の分かれ目になります。ファームウェアの設定で対策します。
      </p>
      <table>
        <thead>
          <tr><th>設定</th><th>効果</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">tapping term を短め</td><td>長押し判定までの時間を調整(150〜180ms前後から)</td></tr>
          <tr><td className="hl">permissive hold</td><td>別キーが先に離れたらタップ扱いにし、ロール入力の誤爆を減らす</td></tr>
          <tr><td className="hl">同手内は無効化(Achordion等)</td><td>同じ手で連続入力したときは修飾を発動させない</td></tr>
          <tr><td className="hl">per-key tapping term</td><td>指ごとに判定時間を変える(小指は長め、人差し指は短め)</td></tr>
        </tbody>
      </table>
      <p>
        誤爆がどうしても収まらない場合は、<strong>ホームロウモッドを人差し指だけ外す</strong>(Shiftを親指のワンショットに移す)、あるいは修飾キーをすべて親指に集約する、といった段階的な妥協が有効です。まずは記号・数字レイヤーとIMEキーだけ導入し、ホームロウモッドは後から足すと、移行がスムーズです。
      </p>
      <Aside label="慣らし期間">
        40%への移行直後は速度が半分ほどに落ちます。1〜2週間は「配置を身体に覚えさせる期間」と割り切り、レイヤーは一度に全部作らず、記号→数字→ナビの順で1枚ずつ増やすのが挫折しにくい進め方です。
      </Aside>

      <Heading num="まとめ">2つのIMEキーと3枚のレイヤーから始める</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>内側親指に英数・かな</h4><p>トグルは避け、状態が確定できる2キー方式に。日英切り替えの体感がもっとも変わる最優先の一手。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>記号は左手・数字は右手テンキー</h4><p>プログラミングの括弧・演算子は頻度順に。数字は電卓型の3×3で正確に打つ。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>矢印・Fn・修飾はレイヤーとホーム段へ</h4><p>HJKL矢印、Fnレイヤー、ホームロウモッドで、指をホームポジションから動かさない。</p></Card>
      </CardGrid>
      <p>
        40%キーボードは「キーを覚える」より「レイヤーという面を切り替える」感覚に慣れるかどうかがすべてです。まずはIMEの2キーと記号・数字・ナビの3レイヤーだけを作り、誤爆対策を詰めながらホームロウモッドを足していく ― この順序なら、日本語も英語も記号も、ホームポジションから一歩も動かずに打てる環境にたどり着けます。キーマップは<Link href="/dev/workspace">開発環境</Link>の一部として、シェルやエディタの操作と合わせて育てていくのがおすすめです。
      </p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/workspace" tag="開発">開発環境 ― ターミナルとシェル</RelatedLink>
            <RelatedLink href="/os/shell" tag="OS">シェルの系譜</RelatedLink>
            <RelatedLink href="/theory/encoding" tag="情報科学">文字コード</RelatedLink>
            <RelatedLink href="/dev/frontend/ux/usability" tag="UI">UI・ユーザビリティ</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
