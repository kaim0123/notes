import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Aside, DiagramFrame, Steps,
} from "@/components/docs";

export const metadata: Metadata = { title: "依存とバージョン" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>依存とバージョン ― ロックファイルが守っているもの</h1>
        <Lead>
          「自分の環境では動くのに、CIでは落ちる」の原因の多くは依存関係です。<code>^1.2.3</code>という書き方が何を許しているのか、ロックファイルは何を固定しているのか、なぜ<code>install</code>ではなく<code>ci</code>なのか ―
          ここを理解すると、環境差のトラブルは目に見えて減ります。
        </Lead>
      </Hero>

      <p>
        道具の全体像は<Link href="/dev/tooling">開発環境とツール</Link>で扱いました。ここではバージョン指定と依存解決の中身に踏み込みます。
      </p>

      <Heading num="01">バージョン範囲の記法 ― 何を許しているのか</Heading>
      <p>
        <code>package.json</code>に書く依存のバージョンは、多くの場合<Term>1つの値ではなく範囲</Term>です。<Link href="/dev/git-release">セマンティックバージョニング</Link>の桁の意味と対応しています。
      </p>

      <table>
        <thead>
          <tr><th>記法</th><th>許す範囲</th><th>意味</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl"><code>^1.2.3</code></td>
            <td>1.2.3 以上 2.0.0 未満</td>
            <td>破壊的変更以外は受け入れる(既定)</td>
          </tr>
          <tr>
            <td className="hl"><code>~1.2.3</code></td>
            <td>1.2.3 以上 1.3.0 未満</td>
            <td>バグ修正だけ受け入れる</td>
          </tr>
          <tr>
            <td className="hl"><code>1.2.3</code></td>
            <td>その版のみ</td>
            <td>完全固定</td>
          </tr>
          <tr>
            <td className="hl"><code>*</code> / <code>latest</code></td>
            <td>制限なし</td>
            <td>使わない。いつ壊れるか分からない</td>
          </tr>
        </tbody>
      </table>

      <p>
        つまり<code>^</code>は<Term>作者がバージョン付けの約束を守ってくれる</Term>という信頼の上に成り立っています。守られないこともあるので、範囲だけでは再現性を保証できません。そこでロックファイルが必要になります。
      </p>

      <Heading num="02">ロックファイルが固定するもの</Heading>

      <DiagramFrame
        slug="dev-tooling-lockfile"
        aspect="640 / 290"
        caption="package.jsonとロックファイルの役割の違い。左のpackage.jsonには「この範囲ならどれでもよい」という希望が書かれ、直接依存は10個ほど。中央のように解決すると裏には数百の間接依存が広がる。右のロックファイルには、実際に入った正確なバージョン・取得元・ハッシュが、間接依存も含めてすべて記録される。範囲の宣言だけでは入る版が変わるため、ロックファイルがあって初めて手元でもCIでも本番でも同じものが入る。"
      />

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>推移的依存も固定する</h4>
          <p>
            自分が入れた10個の裏にある数百の間接依存まで、まとめて固定します。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>取得元とハッシュ</h4>
          <p>
            同じバージョン名で中身がすり替わっていないかを検証できます。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>必ずコミットする</h4>
          <p>
            アプリケーションでは必須です。無いと「いつ入れたか」で結果が変わります。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>ライブラリでは扱いが違う</h4>
          <p>
            公開ライブラリでは利用者側の解決に委ねるため、配布物に含めません。
          </p>
        </Card>
      </CardGrid>

      <Aside label="install と ci の違い">
        <code>npm install</code>は<Term>ロックファイルを更新しうる</Term>コマンドです。CIやデプロイでこれを使うと、テストした版と別の版が入る可能性があります。<code>npm ci</code>(pnpmなら<code>--frozen-lockfile</code>)はロックファイルに厳密に従い、食い違えば失敗するため、<Link href="/dev/git-ci">自動化</Link>では必ずこちらを使います。
      </Aside>

      <Heading num="03">依存の種類を正しく分ける</Heading>

      <table>
        <thead>
          <tr><th>種類</th><th>意味</th><th>本番に含まれるか</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl"><code>dependencies</code></td>
            <td>実行時に必要</td>
            <td>含まれる</td>
          </tr>
          <tr>
            <td className="hl"><code>devDependencies</code></td>
            <td>開発・ビルド・テストにのみ必要</td>
            <td>含まれない</td>
          </tr>
          <tr>
            <td className="hl"><code>peerDependencies</code></td>
            <td>利用側が用意する前提</td>
            <td>自分では入れない</td>
          </tr>
          <tr>
            <td className="hl"><code>optionalDependencies</code></td>
            <td>無くても動く(OS依存のバイナリなど)</td>
            <td>入れば使う</td>
          </tr>
        </tbody>
      </table>

      <p>
        分類を間違えると、本番イメージが不必要に肥大化したり、逆に<Term>本番で「モジュールが見つからない」</Term>で落ちたりします。peer依存は「同じインスタンスを共有したい」といった<Term>二重読み込みを避ける</Term>ための仕組みで、噛み合わないと実行時に不可解な不具合として現れます。
      </p>

      <Heading num="04">同じパッケージが2つ入るとき</Heading>
      <p>
        AがあるライブラリのV4を、BがV5を要求している ―
        これは<Term>入れ子で両方インストールする</Term>ことで解決されます。エラーにはなりませんが、副作用があります。
      </p>

      <table>
        <thead>
          <tr><th>影響</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">サイズ増加</td>
            <td>同じライブラリが複数入り、配布物が膨らむ</td>
          </tr>
          <tr>
            <td className="hl">状態の分裂</td>
            <td>ひとつだけ存在する前提のライブラリで、インスタンスが2つになる</td>
          </tr>
          <tr>
            <td className="hl">型の不一致</td>
            <td>「同じ名前なのに別の型」と怒られる</td>
          </tr>
        </tbody>
      </table>

      <p>
        対処は版を揃える設定を入れる、依存元を更新する、などですが、<Term>まずは重複が起きていることに気付ける</Term>ようにするのが先です。
      </p>

      <Heading num="05">更新戦略 ― 溜めない</Heading>
      <p>
        依存の更新を後回しにすると、いつか「1年分をまとめて上げる」羽目になり、そのときには破壊的変更が積み重なって手が付けられません。
      </p>

      <Steps>
        <li>自動更新の仕組みを入れる ― 更新のPRが自動で作られるようにする</li>
        <li>小さい更新は自動マージ ― 検査が緑なら人手を挟まない設定にする</li>
        <li>破壊的変更は個別に扱う ― 移行手順を読み、影響範囲を確認する</li>
        <li>まとめすぎない ― 1つに大量の更新を混ぜると、壊れたとき切り分けられない</li>
        <li>定期的に実行する ― 週次など間隔を決め、溜めない</li>
      </Steps>

      <p>
        これが機能する前提は<Term>テストが信頼できること</Term>です。テストが薄い状態での自動マージは危険なので、まずテストを整えるところから始めます。
      </p>

      <Heading num="06">依存を増やす前に考える</Heading>
      <p>
        パッケージは無料ではありません。追加のたびに、保守コスト(更新に追随し続ける義務)、攻撃面(<Link href="/dev/tooling-security">供給網</Link>の拡大)、サイズと起動時間、そして廃止リスクを一緒に受け取ります。
      </p>
      <p>
        判断材料は「最終更新日・未解決の課題数・メンテナの人数・自分たちが使う機能の割合」です。<Term>10行で書ける処理のために依存を増やさない</Term>、逆に<Term>暗号や日時のように自作が危険な領域では迷わず定評のあるものを使う</Term> ―
        この線引きが実務的です。
      </p>

      <Heading num="07">よくあるトラブルと原因</Heading>

      <table>
        <thead>
          <tr><th>症状</th><th>典型的な原因</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">CIだけ落ちる</td>
            <td>
              <code>install</code>を使っている / ロックファイルをコミットしていない
            </td>
          </tr>
          <tr>
            <td className="hl">昨日まで動いていたのに壊れた</td>
            <td>範囲指定で新しい版が入った。ロックファイルで固定する</td>
          </tr>
          <tr>
            <td className="hl">本番だけ「モジュールがない」</td>
            <td>
              実行時に必要なものを<code>devDependencies</code>に置いている
            </td>
          </tr>
          <tr>
            <td className="hl">実行環境のバージョン差で壊れる</td>
            <td>使うバージョンを設定ファイルで指定し、CIと揃える</td>
          </tr>
          <tr>
            <td className="hl">インストールが遅い・巨大</td>
            <td>不要な依存の蓄積。棚卸しを検討する</td>
          </tr>
        </tbody>
      </table>

      <Heading num="まとめ">再現性は宣言ではなく記録で担保する</Heading>
      <p>
        <code>package.json</code>は<Term>希望(この範囲なら動くはず)</Term>を書く場所、ロックファイルは<Term>事実(実際にこれで動いた)</Term>を記録する場所です。この2つの役割が分かれば、「なぜCIと手元で違うのか」という問いにはたいてい即答できます。
      </p>

      <DocsFooter href="/dev/tooling-deps" />
    </DocsPage>
  );
}
