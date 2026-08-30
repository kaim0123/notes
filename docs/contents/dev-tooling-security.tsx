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
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "依存の脆弱性とサプライチェーン",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; 開発環境</Eyebrow>
        <h1>依存の脆弱性とサプライチェーン ― 自分が書いていないコードの責任</h1>
        <Lead>
          いまどきのアプリは、自分で書いた行数より<strong>取り込んだコードのほうが桁違いに多い</strong>のが普通です。10個のパッケージを入れれば、その裏に数百の間接依存がぶら下がります。そのすべてが本番で動き、CIで実行され、開発者のPCでインストールスクリプトを走らせます。ここを守るのが供給網(サプライチェーン)対策です。
        </Lead>
      </Hero>

      <p>アプリケーション自体の脆弱性対策は「<Link href="/security/countermeasures">セキュリティ対策の概観</Link>」で扱っています。このページは<strong>取り込んだ依存</strong>に絞ります。</p>

      <Heading num="01">攻撃はどこから入るのか</Heading>
      <table>
        <tbody>
          <tr><th>経路</th><th>手口</th></tr>
          <tr><td className="hl">既知の脆弱性</td><td>古い版を使い続けている。公開済みのCVEをそのまま突かれる</td></tr>
          <tr><td className="hl">タイポスクワッティング</td><td><code>reqeusts</code> のような紛らわしい名前で偽パッケージを公開する</td></tr>
          <tr><td className="hl">アカウント乗っ取り</td><td>正規パッケージの新バージョンに悪意あるコードが混入する</td></tr>
          <tr><td className="hl">インストールスクリプト</td><td><code>postinstall</code> が<strong>インストールしただけで</strong>任意コードを実行する</td></tr>
          <tr><td className="hl">依存混同</td><td>社内用の名前と同名のパッケージを公開レジストリに置き、そちらを取得させる</td></tr>
          <tr><td className="hl">ビルド環境</td><td>CIやビルドツールを侵害し、成果物そのものに仕込む</td></tr>
        </tbody>
      </table>
      <Analogy label="💡 たとえるなら">
        自社の製品に他社の部品を組み込むのと同じです。部品メーカーが1社でも汚染された材料を混ぜれば、完成品は汚染されています。しかもソフトウェアの場合、部品メーカーの下請けが<strong>数百社</strong>いて、その全部を自分の名前で出荷しています。
      </Analogy>

      <Heading num="02">脆弱性を見つける ― SCA</Heading>
      <p><Term>SCA(Software Composition Analysis)</Term>は、依存しているパッケージの一覧と既知の脆弱性データベースを突き合わせる仕組みです。npmなら <code>npm audit</code>、GitHubならDependabotアラートが該当します。</p>
      <Steps>
        <li>ロックファイルから、間接依存を含めた全パッケージと版を取得する</li>
        <li>脆弱性データベース(CVE / GHSA)と照合する</li>
        <li>深刻度(CVSSスコア)と、修正版の有無を提示する</li>
        <li>CIに組み込み、一定以上の深刻度が出たら失敗させる</li>
      </Steps>
      <Aside label="全部を直そうとしない">
        <code>npm audit</code> は<strong>開発時にしか使わない依存</strong>の警告も出します。すべてをゼロにしようとすると疲弊し、やがて誰も見なくなります。判断基準は<strong>「その脆弱性は自分たちの使い方で到達可能か」</strong>です。到達しないものは記録を残して見送り、本番の実行経路にあるものを優先します。
      </Aside>

      <Heading num="03">SBOM ― 何が入っているかの部品表</Heading>
      <p><Term>SBOM(Software Bill of Materials)</Term>は、成果物に含まれる部品の一覧です。新しい脆弱性が公表されたとき、<strong>「自社の、どの製品の、どのバージョンが影響を受けるか」を数分で答えられる</strong>ようにするためのものです。</p>
      <p>形式はCycloneDXやSPDXが一般的で、ビルド時に自動生成してリリース成果物と一緒に保存します。政府調達や大企業との取引では提出を求められることが増えており、「<Link href="/dev/sdlc/management/config">構成管理</Link>」の一部として扱われます。</p>

      <Heading num="04">インストール時に起きることを減らす</Heading>
      <p>多くの人が見落とすのが、<strong>パッケージのインストールそのものがコード実行だ</strong>という点です。<code>postinstall</code> スクリプトは、開発者のPCとCIランナーの権限で動きます。</p>
      <table>
        <tbody>
          <tr><th>対策</th><th>内容</th></tr>
          <tr><td className="hl">スクリプトを無効化</td><td><code>npm ci --ignore-scripts</code>。必要なパッケージだけ個別に許可する</td></tr>
          <tr><td className="hl">CIを隔離する</td><td>インストール工程には本番の資格情報を渡さない</td></tr>
          <tr><td className="hl">ネットワーク制限</td><td>ビルド環境からの外向き通信を制限し、外部への持ち出しを防ぐ</td></tr>
          <tr><td className="hl">プロキシ/社内レジストリ</td><td>取得元を社内ミラーに集約し、承認したものだけを配布する</td></tr>
        </tbody>
      </table>
      <p>pnpm は既定でスクリプト実行を制限する方向に進んでおり、意識せずとも安全側に倒れます。ここでも<strong>既定値が安全なツールを選ぶ</strong>ことが効きます。</p>

      <Heading num="05">固定するか、追随するか</Heading>
      <p>「バージョンを固定すれば安全」でも「常に最新なら安全」でもありません。両方の危険があります。</p>
      <table>
        <tbody>
          <tr><th>方針</th><th>守れるもの</th><th>危険</th></tr>
          <tr><td className="hl">完全固定して放置</td><td>予期せぬ変更が入らない</td><td><strong>既知の脆弱性が残り続ける</strong></td></tr>
          <tr><td className="hl">常に最新へ自動追随</td><td>脆弱性の修正が早く入る</td><td>汚染された版を即座に取り込む</td></tr>
          <tr><td className="hl">固定 + 定期更新(推奨)</td><td>再現性と修正の両立</td><td>更新のレビュー工数が要る</td></tr>
        </tbody>
      </table>
      <p>実務解は3つ目です ― <strong>ロックファイルで固定し、自動PRで定期的に上げ、CIで検証してからマージする</strong>。加えて、公開直後の版をすぐに取り込まない「熟成期間(数日待つ)」を設ける運用も、汚染版を踏む確率を下げます。</p>

      <Heading num="06">出所を検証する</Heading>
      <p>近年は「そのパッケージが<strong>本当にそのソースコードから、そのCIでビルドされたか</strong>」を検証する仕組みが整ってきました。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>署名</h4><p>公開者の鍵で署名し、改ざんを検知する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>来歴(provenance)</h4><p>「どのリポジトリのどのコミットから、どのワークフローで作られたか」を証明として添付する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>ハッシュ検証</h4><p>ロックファイルの <code>integrity</code> により、取得物の中身が記録と一致するか確認する。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>再現可能ビルド</h4><p>同じ入力から常に同一の成果物が出ることで、第三者が検証できる。</p></Card>
      </CardGrid>
      <p>コンテナイメージでも同じ考え方が使えます(「<Link href="/infra/container/security">コンテナセキュリティ</Link>」)。<strong>タグではなくダイジェストで固定する</strong>のは、CIのアクションをSHAで固定するのと同じ発想です。</p>

      <Heading num="07">最低限やること</Heading>
      <p>すべてを一度に導入する必要はありません。効果の大きい順に並べると次のようになります。</p>
      <Steps>
        <li>ロックファイルをコミットし、CIでは <code>npm ci</code> を使う</li>
        <li>Dependabot / Renovate を有効にし、更新を溜めない</li>
        <li>CIで脆弱性スキャンを回し、高深刻度は失敗させる</li>
        <li>秘密情報のコミットを検出するスキャンを入れる</li>
        <li>CIの権限を最小化し、<Link href="/dev/ci/actions">外部アクションをSHAで固定</Link>する</li>
        <li>リリース成果物にSBOMを添付し、影響調査に備える</li>
      </Steps>

      <Heading num="まとめ">取り込んだ時点で自分の責任になる</Heading>
      <p>利用者から見れば、脆弱性が自作コードにあったか依存にあったかは関係ありません。<strong>依存の選定と更新は、実装作業の一部</strong>です。固定して再現性を確保し、定期的に上げて修正を取り込み、インストールとCIの権限を絞る ― この3点だけでも、現実的なリスクの大半は下げられます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/tooling/deps" tag="実装">依存とバージョン</RelatedLink>
            <RelatedLink href="/security/management" tag="セキュリティ">リスクマネジメント</RelatedLink>
            <RelatedLink href="/infra/container/security" tag="インフラ">コンテナセキュリティ</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
