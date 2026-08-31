import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "React" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>React ― 完成形を書き、更新はReactに任せる</h1>
        <Lead>
          DOMを直接書き換えていく方法は、状態が複雑になるほど「いま画面がどうなっているか」を追えなくなります。Reactの答えは単純で、<Term>このデータのときはこの見た目</Term>という完成形だけを書き、実際の書き換えはReactが引き受ける、というものです。この一点から、Reactの語彙のほとんどが導かれます。
        </Lead>
      </Hero>

      <Heading num="01">命令的と宣言的</Heading>
      <table>
        <thead>
          <tr><th>方式</th><th>書き方</th><th>状態が複雑になると</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">命令的</td>
            <td>「この要素を追加、あの要素の色を変える」と手順を1つずつ指示する</td>
            <td>どの手順を経ていまの画面になったのかを追えなくなる</td>
          </tr>
          <tr>
            <td className="hl">宣言的</td>
            <td>「このデータのときはこの見た目」という完成形だけを書く</td>
            <td>いまのデータさえ分かれば、画面は常に一意に決まる</td>
          </tr>
        </tbody>
      </table>

      <p>
        命令的な書き方が破綻するのは、<Term>手順の数だけ組み合わせが増える</Term>からです。5つの状態変化があれば、その順序の組み合わせは膨大になり、そのすべてで画面が正しくなるよう手順を書き分けることになります。宣言的なら、書くのは「状態から見た目への1本の対応」だけです。
      </p>

      <DiagramFrame
        slug="frontend-react-declarative"
        aspect="640 / 310"
        caption="命令的な更新と宣言的な更新を比べた図。上段の命令的な方式では、状態が変わるたびにDOMをどう書き換えるかの手順を書く必要があり、状態の組み合わせが増えるほど手順の分岐も増えていく。下段の宣言的な方式では、状態から見た目への対応を1本だけ書き、状態が変わるとReactがコンポーネントを再実行して新しい完成形を作る。それを前回の結果と比べ、実際に変わった部分だけを本物のDOMへ反映する。作り直しているように見えて、DOMの書き換えは最小限に抑えられている。" />

      <Heading num="02">再実行と差分 ― 「全部作り直す」の意味</Heading>
      <p>
        状態が変わると、Reactは<Term>そのコンポーネントの関数をもう一度実行します</Term>。返ってくるのは新しい完成形の記述で、これを前回のものと比べ、<Term>実際に変わった部分だけ</Term>を本物のDOMへ反映します。
      </p>
      <p>
        ここを誤解すると、Reactの挙動全体が不可解に見えます。「関数がもう一度実行される」ということは、関数の中に書いたローカル変数は毎回作り直されるということです。だから値を保ち続けたければ状態やrefという仕組みが要る ― <Link href="/frontend/react-state">State</Link>や<Link href="/frontend/react-ref">Ref</Link>が存在する理由はここにあります。
      </p>

      <table>
        <thead>
          <tr><th>用語</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">コンポーネント</td><td>UIの部品を関数として表したもの。組み合わせて画面を作る</td></tr>
          <tr><td className="hl">props</td><td>親から子へ渡す入力値。子からは変更できない</td></tr>
          <tr><td className="hl">state</td><td>コンポーネントが持つ、再実行をまたいで保たれる変化しうる値</td></tr>
          <tr><td className="hl">再レンダリング</td><td>状態やpropsの変化を受けて、関数がもう一度実行されること</td></tr>
          <tr><td className="hl">差分検出</td><td>新旧の結果を比べ、変わった部分だけをDOMへ反映する処理</td></tr>
        </tbody>
      </table>

      <Heading num="03">3つの設計指針</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>コンポーネント</h4>
          <p>状態は必要最小限に持ち、外の世界との同期は分離し、繰り返す処理はフックとして切り出す。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>一方向データフロー</h4>
          <p>データは親から子へ一方向に流れる。共有したいときは共通の親まで持ち上げる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>合成</h4>
          <p>継承で拡張するのではなく、小さな部品を組み合わせて大きな画面を作る。</p>
        </Card>
      </CardGrid>

      <p>
        3つとも、突き詰めれば<Term>「いまの状態から画面が一意に決まる」を壊さないための制約</Term>です。データが双方向に流れれば、どちらが正しいのか決まらなくなります。継承で振る舞いを差し込めば、外から読んで分からなくなります。
      </p>

      <Heading num="04">制御の反転 ― ライブラリとの違い</Heading>
      <p>
        Reactを使うとき、あなたはメインの処理の流れを自分で書きません。決められた場所にコードを差し込み、<Term>Reactがそれを適切なタイミングで呼び出します</Term>。この主導権の向きが、ライブラリとフレームワークを分ける本質的な違いです。
      </p>

      <DiagramFrame
        slug="frontend-react-ioc"
        aspect="640 / 260"
        caption="ライブラリとフレームワークの違いを主導権の向きで示した図。左側のライブラリでは、上にあるあなたのコードが主導権を持ち、必要なタイミングで下のライブラリの関数を呼び出す。右側のフレームワークでは上下が逆転し、上にあるフレームワークが主導権を持ち、下にあるあなたのコードを決められたタイミングで呼び出す。この向きの反転が制御の反転と呼ばれるもので、フレームワークが決めた型に沿う代わりに、全体の流れを自分で組み立てる必要がなくなる。"
      />

      <p>
        この違いは実務上の感覚にも表れます。ライブラリは合わなければ呼ぶのをやめれば済みますが、フレームワークは<Term>合わないと分かった時点で作り直しになる</Term>。だから選定の重みが違います。
      </p>

      <Heading num="05">境界は何度も引き直されてきた</Heading>
      <p>
        「フロントエンドはReact、バックエンドはAPI」という分業は、最初から決まっていたわけではありません。約30年のあいだに、境界線は何度も引き直されてきました。
      </p>

      <table>
        <thead>
          <tr><th>時期</th><th>画面側</th><th>構成</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">1995〜2003</td><td>HTML + わずかなJS</td><td>サーバーがHTMLを組み立てて返す</td></tr>
          <tr><td className="hl">2004〜2010</td><td>jQuery</td><td>サーバー中心。画面は部分的に動く</td></tr>
          <tr><td className="hl">2010〜2016</td><td>jQuery + 非同期通信</td><td>ページの一部だけを書き換える</td></tr>
          <tr><td className="hl">2016〜2020</td><td>React・Vue・Angular</td><td>画面はブラウザで組み立て、サーバーはAPIに徹する</td></tr>
          <tr><td className="hl">2018〜2023</td><td>Next.jsなど</td><td>初期表示のためサーバー側の組み立てが戻ってくる</td></tr>
          <tr><td className="hl">2023〜</td><td>Next.js(App Router)</td><td>コンポーネント単位でサーバーとクライアントを分ける</td></tr>
        </tbody>
      </table>

      <p>
        流れは<Term>行って戻ってきている</Term>ように見えますが、同じ場所に戻ったわけではありません。かつては「ページ単位でサーバーか、ブラウザか」だった選択が、いまは<Term>コンポーネント単位</Term>になっています。この変化の帰結が<Link href="/frontend/nextjs">Next.js</Link>です。
      </p>

      <Heading num="06">Reactだけでは足りないもの</Heading>
      <p>
        Reactが提供するのは「コンポーネント単位でUIを宣言的に組み立てる」部分だけです。実際のアプリを作るには、周辺の役割を別のもので埋めることになります。
      </p>

      <table>
        <thead>
          <tr><th>役割</th><th>何をするか</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ルーティング</td><td>URLと画面の対応。Next.jsは標準で持つ</td></tr>
          <tr><td className="hl">サーバー側の組み立て</td><td>初期表示のHTMLをサーバーで作る</td></tr>
          <tr><td className="hl">データ取得・キャッシュ</td><td>取得の重複排除、再検証、読み込み状態</td></tr>
          <tr><td className="hl">クライアント状態の共有</td><td>複数画面から触る値の保持</td></tr>
          <tr><td className="hl">フォーム</td><td>複数項目の値と検証、送信の管理</td></tr>
          <tr><td className="hl">スキーマ検証</td><td>外から来たデータの形を確かめ、型を付ける</td></tr>
          <tr><td className="hl">ヘッドレスUI</td><td>見た目を持たない、操作性の担保された部品</td></tr>
          <tr><td className="hl">ビルド</td><td>配信用に変換してまとめる</td></tr>
        </tbody>
      </table>

      <Aside label="選ぶ順序">
        この表の埋め方には順序があります。まず<Term>フレームワークが標準で持っているか</Term>を見て、次に<Term>標準のAPIで足りるか</Term>を見て、それでも足りないときに初めてライブラリを足します。逆順にすると、フレームワークが用意した仕組みと衝突するライブラリを抱え込むことになります。
      </Aside>

      <Analogy label="💡 たとえるなら">
        命令的なUIは、料理人に手順を1つずつ指示することです。「野菜を切って、次に炒めて」と全工程を管理しなければなりません。宣言的なReactは、完成させたい料理の写真を渡すだけ。実際に鍋を振る作業は厨房が引き受けます。ただし厨房の段取りに口は出せません ― それが制御の反転です。
      </Analogy>

      <Heading num="07">この見出しの進み方</Heading>
      <p>
        配下は3つのまとまりに分かれます。順に読むと、Reactの語彙がなぜその形をしているのかが繋がります。
      </p>

      <table>
        <thead>
          <tr><th>まとまり</th><th>ページ</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">見方を作る</td>
            <td>
              <Link href="/frontend/react-functional">関数型として読むReact</Link> /{" "}
              <Link href="/frontend/react-typescript">TypeScriptでコンポーネントを書く</Link> /{" "}
              <Link href="/frontend/react-jsx">JSXとレンダリング</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">中核の語彙</td>
            <td>
              <Link href="/frontend/react-props">Props</Link> /{" "}
              <Link href="/frontend/react-state">State</Link> /{" "}
              <Link href="/frontend/react-effects">Effects</Link> /{" "}
              <Link href="/frontend/react-ref">Ref</Link> /{" "}
              <Link href="/frontend/react-performance">メモ化</Link> /{" "}
              <Link href="/frontend/react-context">Context</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">組み立てる</td>
            <td>
              <Link href="/frontend/react-logic-reuse">ロジックを再利用する</Link> /{" "}
              <Link href="/frontend/react-composition">コンポーネントを組み合わせる</Link> /{" "}
              <Link href="/frontend/react-forms">フォームの値を管理する</Link> /{" "}
              <Link href="/frontend/react-boundary">エラー境界とフォールバックUI</Link>
            </td>
          </tr>
        </tbody>
      </table>

      <Heading num="まとめ">完成形を書き、更新は任せる</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>宣言的に書く</h4>
          <p>状態から見た目への対応を1本書く。手順の組み合わせ爆発から解放される。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>関数はもう一度実行される</h4>
          <p>だから値を保つ仕組みが要る。stateもrefも、この前提から出てくる。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>主導権はReactにある</h4>
          <p>決められた場所にコードを置く。合わないと分かったときの代償が大きい。</p>
        </Card>
      </CardGrid>

      <p>
        まずは、Reactの制約が<Term>なぜその形なのか</Term>を説明する視点から ―
        <Link href="/frontend/react-functional">関数型として読むReact</Link>へ進みます。
      </p>

      <DocsFooter href="/frontend/react" />
    </DocsPage>
  );
}
