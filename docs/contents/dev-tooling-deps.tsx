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
  Aside,
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "依存とバージョン",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; 開発環境</Eyebrow>
        <h1>依存とバージョン ― ロックファイルが守っているもの</h1>
        <Lead>
          「自分の環境では動くのに、CIでは落ちる」の原因の多くは依存関係です。<code>^1.2.3</code> という書き方が何を許しているのか、ロックファイルは何を固定しているのか、なぜ <code>npm install</code> ではなく <code>npm ci</code> なのか ―
          ここを理解すると、環境差のトラブルは目に見えて減ります。
        </Lead>
      </Hero>

      <p>npm / pnpm の使い分けなど道具の全体像は「<Link href="/dev/tooling">パッケージ管理とビルド</Link>」で扱いました。ここではバージョン指定と依存解決の中身に踏み込みます。</p>

      <Heading num="01">バージョン範囲の記法 ― 何を許しているのか</Heading>
      <p><code>package.json</code> に書く依存のバージョンは、多くの場合<strong>1つの値ではなく範囲</strong>です。<Link href="/dev/git/release">セマンティックバージョニング</Link>の桁の意味と対応しています。</p>
      <table>
        <tbody>
          <tr><th>記法</th><th>許す範囲</th><th>意味</th></tr>
          <tr><td className="hl"><code>^1.2.3</code></td><td>1.2.3 以上 2.0.0 未満</td><td>破壊的変更以外は受け入れる(npm の既定)</td></tr>
          <tr><td className="hl"><code>~1.2.3</code></td><td>1.2.3 以上 1.3.0 未満</td><td>バグ修正だけ受け入れる</td></tr>
          <tr><td className="hl"><code>1.2.3</code></td><td>その版のみ</td><td>完全固定</td></tr>
          <tr><td className="hl"><code>*</code> / <code>latest</code></td><td>制限なし</td><td><strong>使わない</strong>。いつ壊れるか分からない</td></tr>
          <tr><td className="hl"><code>0.x.y</code> に対する <code>^</code></td><td>0.x.y 以上 0.(x+1).0 未満</td><td>0系はMINORで壊れうるため、扱いが変わる</td></tr>
        </tbody>
      </table>
      <p>つまり <code>^</code> は「<strong>作者がSemVerを守ってくれる</strong>」という信頼の上に成り立っています。守られないこともあるので、範囲だけでは再現性は保証できません ― そこでロックファイルが必要になります。</p>

      <Heading num="02">ロックファイルが固定するもの</Heading>
      <p><code>package-lock.json</code> / <code>pnpm-lock.yaml</code> は、実際にインストールされた<strong>すべてのパッケージの正確なバージョンと取得元、ハッシュ</strong>を記録したものです。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>直接依存だけでなく推移的依存も</h4><p>自分が入れた10個の裏に、数百の間接依存がある。それら全部を固定する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>取得元とハッシュ</h4><p>同じバージョン名で中身がすり替わっていないかを検証できる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>必ずコミットする</h4><p>アプリケーションでは必須。これが無いと「いつ入れたか」で結果が変わる。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>ライブラリでは扱いが違う</h4><p>公開ライブラリの場合、利用者側の解決に委ねるためロックは配布物に含めない。</p></Card>
      </CardGrid>
      <Aside label="install と ci の違い">
        <code>npm install</code> は<strong>ロックファイルを更新しうる</strong>コマンドです。CIやデプロイでこれを使うと、テストした版と別の版が入る可能性があります。<code>npm ci</code>(pnpm なら <code>--frozen-lockfile</code>)は<strong>ロックファイルに厳密に従い、食い違えば失敗する</strong>ため、自動化では必ずこちらを使います。
      </Aside>

      <Heading num="03">依存の種類を正しく分ける</Heading>
      <table>
        <tbody>
          <tr><th>種類</th><th>意味</th><th>本番に含まれるか</th></tr>
          <tr><td className="hl"><code>dependencies</code></td><td>実行時に必要</td><td>含まれる</td></tr>
          <tr><td className="hl"><code>devDependencies</code></td><td>開発・ビルド・テストにのみ必要</td><td>含まれない(<code>--omit=dev</code>)</td></tr>
          <tr><td className="hl"><code>peerDependencies</code></td><td>利用側が用意する前提(React本体など)</td><td>自分では入れない</td></tr>
          <tr><td className="hl"><code>optionalDependencies</code></td><td>無くても動く(OS依存のバイナリなど)</td><td>入れば使う</td></tr>
        </tbody>
      </table>
      <p>分類を間違えると、本番イメージが不必要に肥大化したり、逆に<strong>本番で「モジュールが見つからない」</strong>で落ちたりします。バンドルして配布するフロントエンドと、実行時に <code>node_modules</code> を参照するサーバーでは、境界の考え方が変わる点にも注意します。</p>
      <p>peer依存は「同じReactのインスタンスを共有したい」といった<strong>二重読み込みを避ける</strong>ための仕組みです。バージョンが噛み合わないと警告が出ますが、無視すると実行時に不可解な不具合(Hooksのエラーなど)として現れます。</p>

      <Heading num="04">同じパッケージが2つ入るとき</Heading>
      <p>AがlodashのV4を、BがV5を要求している ― npmはこれを<strong>入れ子で両方インストールする</strong>ことで解決します。エラーにはなりませんが、副作用があります。</p>
      <table>
        <tbody>
          <tr><th>影響</th><th>内容</th></tr>
          <tr><td className="hl">サイズ増加</td><td>同じライブラリが複数入り、バンドルが膨らむ</td></tr>
          <tr><td className="hl">状態の分裂</td><td>シングルトン前提のライブラリで、インスタンスが2つになる</td></tr>
          <tr><td className="hl">型の不一致</td><td>TypeScriptで「同じ名前なのに別の型」と怒られる</td></tr>
        </tbody>
      </table>
      <p>対処は、<code>overrides</code>(npm)や <code>resolutions</code> で版を揃える、依存元を更新する、そもそも重複を検出する仕組みを入れる、など。<strong>まずは重複が起きていることに気付ける</strong>ようにするのが先です(<code>npm ls &lt;package&gt;</code> で確認できます)。</p>

      <Heading num="05">更新戦略 ― 溜めない</Heading>
      <p>依存の更新を後回しにすると、いつか「1年分をまとめて上げる」羽目になり、そのときには破壊的変更が積み重なって手が付けられません。</p>
      <Steps>
        <li><strong>自動更新の仕組みを入れる</strong> ― Dependabot / Renovate がPRを自動で作る</li>
        <li><strong>PATCH / MINOR は自動マージ</strong> ― CIが緑なら人手を挟まない設定にする</li>
        <li><strong>MAJORは個別に扱う</strong> ― 移行手順を読み、影響範囲を確認する</li>
        <li><strong>まとめすぎない</strong> ― 1PRに大量の更新を混ぜると、壊れたときの切り分けができない</li>
        <li><strong>定期的に実行する</strong> ― 週次など間隔を決め、溜めない</li>
      </Steps>
      <p>これが機能する前提は<strong>テストが信頼できること</strong>です。テストが薄い状態での自動マージは危険なので、まずテストを整えるところから始めます(「<Link href="/test/strategy">品質戦略</Link>」)。</p>

      <Heading num="06">依存を増やす前に考える</Heading>
      <p>パッケージは無料ではありません。追加のたびに、次のコストを一緒に受け取ります。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>保守コスト</h4><p>更新に追随し、破壊的変更に対応し続ける義務が生まれる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>攻撃面</h4><p>その裏にある数十の間接依存すべてが、<Link href="/dev/tooling/security">供給網</Link>の一部になる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>サイズと起動時間</h4><p>フロントエンドでは配信量、サーバーでは起動時間として跳ね返る。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>廃止リスク</h4><p>作者が更新をやめたとき、自分たちで引き受けることになる。</p></Card>
      </CardGrid>
      <p>判断材料は「最終更新日・未解決のIssue数・メンテナの人数・自分たちが使う機能の割合」です。<strong>10行で書ける処理のために依存を増やさない</strong>、逆に<strong>暗号や日時のように自作が危険な領域では迷わず定評のあるものを使う</strong> ― この線引きが実務的です。</p>

      <Heading num="07">よくあるトラブルと原因</Heading>
      <table>
        <tbody>
          <tr><th>症状</th><th>典型的な原因</th></tr>
          <tr><td className="hl">CIだけ落ちる</td><td><code>npm install</code> を使っている / ロックファイルをコミットしていない</td></tr>
          <tr><td className="hl">昨日まで動いていたのに壊れた</td><td>範囲指定で新しい版が入った。ロックファイルで固定する</td></tr>
          <tr><td className="hl">本番だけ「モジュールがない」</td><td>実行時に必要なものを <code>devDependencies</code> に置いている</td></tr>
          <tr><td className="hl">Node.jsのバージョン差で壊れる</td><td><code>engines</code> と <code>.nvmrc</code> を指定し、CIと揃える</td></tr>
          <tr><td className="hl">インストールが遅い・巨大</td><td>不要な依存の蓄積。pnpm への移行や依存の棚卸しを検討する</td></tr>
        </tbody>
      </table>

      <Heading num="まとめ">再現性は宣言ではなく記録で担保する</Heading>
      <p><code>package.json</code> は<strong>希望(この範囲なら動くはず)</strong>を書く場所、ロックファイルは<strong>事実(実際にこれで動いた)</strong>を記録する場所です。この2つの役割が分かれば、「なぜCIとローカルで違うのか」という問いにはたいてい即答できます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/tooling/security" tag="実装">依存の脆弱性とサプライチェーン</RelatedLink>
            <RelatedLink href="/dev/tooling/build" tag="実装">ビルドの中身</RelatedLink>
            <RelatedLink href="/dev/git/release" tag="実装">バージョニングとリリース</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
