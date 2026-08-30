import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Heading,
  DocsFooter,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Aside,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "テストダブル",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>テスト</Eyebrow>
        <h1>テストダブル ― 何を偽物に置き換えるか</h1>
        <Lead>
          外部APIやDBを本物のまま使うとテストは遅く不安定になります。だからといって何もかもモックにすると、<strong>実装を書き換えるたびに壊れるのに、本番の不具合は見つけられない</strong>テストが出来上がります。置き換える対象を選ぶ基準を整理します。
        </Lead>
      </Hero>

      <p>5分類の定義は「<Link href="/test/unit">Unitテスト</Link>」で扱いました。ここでは<strong>どれをいつ使うか</strong>と、モックの使いすぎが招く問題を掘り下げます。</p>

      <Heading num="01">5種類の使い分け</Heading>
      <table>
        <tbody>
          <tr><th>種類</th><th>中身</th><th>使う場面</th></tr>
          <tr><td className="hl">ダミー</td><td>渡すだけで使われない</td><td>引数を埋めるためだけに必要なとき</td></tr>
          <tr><td className="hl">スタブ</td><td><strong>決まった値を返す</strong></td><td>「この条件のときの分岐」を試したいとき</td></tr>
          <tr><td className="hl">スパイ</td><td>呼ばれた記録を残す(本物も動かせる)</td><td>呼び出しの有無を後から確認したいとき</td></tr>
          <tr><td className="hl">モック</td><td><strong>呼ばれ方を事前に期待し、違えば失敗</strong></td><td>「メールを1度だけ送る」ような<strong>相互作用そのものが仕様</strong>のとき</td></tr>
          <tr><td className="hl">フェイク</td><td><strong>動く簡易実装</strong>(インメモリDBなど)</td><td>本物は重いが、振る舞いは必要なとき</td></tr>
        </tbody>
      </table>
      <p>実務で最もよく使うのはスタブとフェイクです。モックは強力ですが、<strong>「どう呼ばれるか」を固定する</strong>ため、実装の変更に弱くなります。</p>
      <Analogy label="💡 たとえるなら">
        映画のスタントダブルです。危険な場面(遅い・不安定・課金が発生する処理)だけ代役に任せ、顔が映る場面(検証したい本体のロジック)は本人が演じます。<strong>全部を代役にしたら、その俳優の演技は何も確認できません</strong>。
      </Analogy>

      <Heading num="02">状態の検証と、相互作用の検証</Heading>
      <p>テストの検証方法は2つに大別され、それぞれ向き不向きがあります。</p>
      <table>
        <tbody>
          <tr><th></th><th>状態の検証</th><th>相互作用の検証</th></tr>
          <tr><td className="hl">確かめるもの</td><td>戻り値、最終的な状態</td><td>どのメソッドが何回・どの引数で呼ばれたか</td></tr>
          <tr><td className="hl">実装変更への強さ</td><td><strong>強い</strong></td><td>弱い(内部の呼び方に依存する)</td></tr>
          <tr><td className="hl">向く対象</td><td>計算、変換、状態遷移</td><td>通知の送信、外部への副作用</td></tr>
        </tbody>
      </table>
      <p>原則は<strong>「まず状態で検証し、それが不可能なときだけ相互作用で検証する」</strong>です。メール送信のように「外に出ていく副作用」は結果を観測できないため、相互作用の検証が適切な数少ない例になります。</p>

      <Heading num="03">モックの使いすぎが招くこと</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>実装への結合</h4>
          <p>内部の呼び出し順を固定するため、<strong>リファクタリングのたびにテストが赤くなる</strong>。仕様は変わっていないのに。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>嘘の緑</h4>
          <p>モックが本物と違う振る舞いをしていても気付けない。<strong>全部通るのに本番で落ちる</strong>。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>読めないテスト</h4>
          <p>準備が20行のモック設定になり、何を保証しているのか分からなくなる。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>設計の問題の隠蔽</h4>
          <p>モックが5個必要なのは依存過多のサイン。モックで蓋をせず、設計を見直す合図と捉える。</p>
        </Card>
      </CardGrid>
      <p>2番目が最も危険です。モックは<strong>自分が書いた想像上の仕様</strong>なので、相手の実際の挙動(エラー時のレスポンス形式、タイムアウト、レート制限)とずれていても検出できません。</p>

      <Heading num="04">どこを置き換えるか ― 境界だけ</Heading>
      <p>置き換えの原則は<strong>「制御できないものだけを置き換える」</strong>です。</p>
      <table>
        <tbody>
          <tr><th>対象</th><th>扱い</th><th>理由</th></tr>
          <tr><td className="hl">外部API・決済・メール送信</td><td><strong>置き換える</strong></td><td>遅い、課金される、副作用が外に出る</td></tr>
          <tr><td className="hl">現在時刻・乱数・UUID</td><td><strong>置き換える</strong></td><td>実行のたびに変わり、再現できない</td></tr>
          <tr><td className="hl">ファイルシステム・ネットワーク</td><td>場合による</td><td>フェイク(インメモリ)が使えるなら望ましい</td></tr>
          <tr><td className="hl">自分たちのDB</td><td><strong>できれば本物</strong></td><td>SQLの誤りはモックでは絶対に見つからない</td></tr>
          <tr><td className="hl">自分たちのドメインロジック</td><td>置き換えない</td><td>それこそが検証対象</td></tr>
          <tr><td className="hl">値オブジェクト・純粋な関数</td><td>置き換えない</td><td>そのまま使うほうが速く、正確</td></tr>
        </tbody>
      </table>
      <p>とくに4行目は誤解が多い点です。DBをモックにしたテストは、<strong>クエリが間違っていても通ります</strong>。コンテナで実物のDBを起動して検証するほうが、得られる信頼度は桁違いに高くなります(「<Link href="/test/data">テストデータ管理</Link>」)。</p>

      <Heading num="05">依存を差し替えられる設計にする</Heading>
      <p>テストダブルを使うには、依存を外から渡せる構造になっている必要があります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// 差し替えられない ― 内部で直接生成・参照している
async function registerUser(input) {
  const now = new Date();                    // 時刻を固定できない
  await mailer.sendWelcome(input.email);     // 実際にメールが飛ぶ
}

// 差し替えられる ― 必要なものを引数で受け取る
async function registerUser(input, deps) {
  const now = deps.clock.now();
  await deps.mailer.sendWelcome(input.email);
}`}</code>
      </pre>
      <p>この形にすると、テストでは <code>clock</code> を固定値に、<code>mailer</code> を記録用の実装に差し替えられます。<strong>テストのためだけの改造ではなく</strong>、依存を明示する設計としても健全です(「<Link href="/design/methodology/info-hiding">情報隠蔽</Link>」)。</p>

      <Heading num="06">モックが本物とずれていないか確かめる</Heading>
      <p>スタブやフェイクを使う限り、「想像した仕様」と「実際の仕様」のずれは残ります。埋める手段は3つです。</p>
      <table>
        <tbody>
          <tr><th>手段</th><th>内容</th></tr>
          <tr><td className="hl">契約テスト</td><td>利用側が期待する形式を定義し、提供側がそれを満たすか検証する(「<Link href="/dev/backend/test">APIのテスト</Link>」)</td></tr>
          <tr><td className="hl">スキーマ検証</td><td>OpenAPIなどの定義からスタブを生成し、定義と実装のずれを検出する</td></tr>
          <tr><td className="hl">実物での確認</td><td>ステージング環境で、少数の結合テストを実際の相手に対して実行する</td></tr>
        </tbody>
      </table>
      <Aside label="記録して再生する">
        実際のレスポンスを1度記録し、以後はそれを再生する方式(VCR / スナップショット)は、現実に近いスタブを安く手に入れる方法です。ただし<strong>記録が古くなる</strong>ため、定期的に取り直す運用とセットにする必要があります。
      </Aside>

      <Heading num="07">選び方の指針</Heading>
      <table>
        <tbody>
          <tr><th>状況</th><th>選ぶもの</th></tr>
          <tr><td className="hl">分岐を試したい(異常系を含む)</td><td>スタブ</td></tr>
          <tr><td className="hl">呼ばれたことが仕様(通知・課金)</td><td>モック / スパイ</td></tr>
          <tr><td className="hl">繰り返し読み書きする必要がある</td><td>フェイク(インメモリ実装)</td></tr>
          <tr><td className="hl">自分たちのDBを使う処理</td><td>本物(コンテナで起動)</td></tr>
          <tr><td className="hl">時刻・乱数</td><td>注入して固定する</td></tr>
        </tbody>
      </table>

      <Heading num="まとめ">代役は最小限に</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>制御できないものだけ</h4><p>外部・時刻・乱数は置き換える。自分たちのロジックは本物で。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>状態の検証を優先</h4><p>呼ばれ方の検証は実装に結合する。副作用の確認に限る。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>モックが多いのは設計の合図</h4><p>数が増えたら、依存の多さを疑う。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/test/unit" tag="テスト">Unitテスト</RelatedLink>
            <RelatedLink href="/test/data" tag="テスト">テストデータ管理</RelatedLink>
            <RelatedLink href="/test/integration" tag="テスト">Integrationテスト</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
