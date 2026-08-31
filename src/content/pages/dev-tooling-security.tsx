import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame, Steps,
} from "@/components/docs";

export const metadata: Metadata = { title: "依存の脆弱性とサプライチェーン" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>依存の脆弱性とサプライチェーン ― 自分が書いていないコードの責任</h1>
        <Lead>
          いまどきのアプリは、自分で書いた行数より<Term>取り込んだコードのほうが桁違いに多い</Term>のが普通です。10個のパッケージを入れれば、その裏に数百の間接依存がぶら下がります。そのすべてが本番で動き、CIで実行され、開発者の手元でインストールスクリプトを走らせます。ここを守るのが供給網(サプライチェーン)対策です。
        </Lead>
      </Hero>

      <Heading num="01">攻撃はどこから入るのか</Heading>

      <DiagramFrame
        slug="dev-tooling-supplychain"
        aspect="640 / 300"
        caption="依存の供給網に攻撃が入り込む4つの経路。①古い版を使い続けて既知の弱点を突かれる、②紛らわしい名前や社内用と同名の偽パッケージを取得してしまう、③信頼していたパッケージの新しい版に悪意あるコードが混入する、④インストールしただけで開発者のPCやCIの権限で任意コードが動く。守り方は、ロックとハッシュで固定する・定期的に上げる・権限を絞る、の3つ。"
      />

      <table>
        <thead>
          <tr><th>経路</th><th>手口</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">既知の脆弱性</td>
            <td>古い版を使い続けている。公開済みの弱点をそのまま突かれる</td>
          </tr>
          <tr>
            <td className="hl">紛らわしい名前</td>
            <td>1文字違いの名前で偽パッケージを公開する</td>
          </tr>
          <tr>
            <td className="hl">アカウント乗っ取り</td>
            <td>正規パッケージの新バージョンに悪意あるコードが混入する</td>
          </tr>
          <tr>
            <td className="hl">インストールスクリプト</td>
            <td>インストールしただけで任意コードが実行される</td>
          </tr>
          <tr>
            <td className="hl">依存混同</td>
            <td>社内用の名前と同名のものを公開側に置き、そちらを取得させる</td>
          </tr>
          <tr>
            <td className="hl">ビルド環境</td>
            <td>CIやビルドツールを侵害し、成果物そのものに仕込む</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        自社の製品に他社の部品を組み込むのと同じです。部品メーカーが1社でも汚染された材料を混ぜれば、完成品は汚染されています。しかもソフトウェアの場合、部品メーカーの下請けが<strong>数百社</strong>いて、その全部を自分の名前で出荷しています。
      </Analogy>

      <Heading num="02">脆弱性を見つける</Heading>
      <p>
        依存しているパッケージの一覧と既知の脆弱性データベースを突き合わせる仕組みがあります。
      </p>

      <Steps>
        <li>ロックファイルから、間接依存を含めた全パッケージと版を取得する</li>
        <li>脆弱性データベースと照合する</li>
        <li>深刻度と、修正版の有無を提示する</li>
        <li>CIに組み込み、一定以上の深刻度が出たら失敗させる</li>
      </Steps>

      <Aside label="全部を直そうとしない">
        検査は<Term>開発時にしか使わない依存</Term>の警告も出します。すべてをゼロにしようとすると疲弊し、やがて誰も見なくなります。判断基準は<Term>その脆弱性は自分たちの使い方で到達可能か</Term>です。到達しないものは記録を残して見送り、本番の実行経路にあるものを優先します。
      </Aside>

      <Heading num="03">SBOM ― 何が入っているかの部品表</Heading>
      <p>
        <Term>SBOM(ソフトウェア部品表)</Term>は、成果物に含まれる部品の一覧です。新しい脆弱性が公表されたとき、<Term>「自社の、どの製品の、どのバージョンが影響を受けるか」を数分で答えられる</Term>ようにするためのものです。ビルド時に自動生成してリリース成果物と一緒に保存し、<Link href="/dev/git-config-change">構成管理</Link>の一部として扱います。
      </p>

      <Heading num="04">インストール時に起きることを減らす</Heading>
      <p>
        多くの人が見落とすのが、<Term>パッケージのインストールそのものがコード実行だ</Term>という点です。インストール時のスクリプトは、開発者の手元とCIの権限で動きます。
      </p>

      <table>
        <thead>
          <tr><th>対策</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">スクリプトを無効化</td>
            <td>既定で実行しない設定にし、必要なものだけ個別に許可する</td>
          </tr>
          <tr>
            <td className="hl">CIを隔離する</td>
            <td>インストール工程には本番の資格情報を渡さない</td>
          </tr>
          <tr>
            <td className="hl">ネットワーク制限</td>
            <td>ビルド環境からの外向き通信を制限し、持ち出しを防ぐ</td>
          </tr>
          <tr>
            <td className="hl">社内ミラー</td>
            <td>取得元を集約し、承認したものだけを配布する</td>
          </tr>
        </tbody>
      </table>

      <p>
        既定でスクリプト実行を制限する方向に進んでいるツールもあり、意識せずとも安全側に倒れます。ここでも<Term>既定値が安全なツールを選ぶ</Term>ことが効きます。
      </p>

      <Heading num="05">固定するか、追随するか</Heading>
      <p>
        「バージョンを固定すれば安全」でも「常に最新なら安全」でもありません。両方に危険があります。
      </p>

      <table>
        <thead>
          <tr><th>方針</th><th>守れるもの</th><th>危険</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">完全固定して放置</td>
            <td>予期せぬ変更が入らない</td>
            <td>既知の脆弱性が残り続ける</td>
          </tr>
          <tr>
            <td className="hl">常に最新へ自動追随</td>
            <td>脆弱性の修正が早く入る</td>
            <td>汚染された版を即座に取り込む</td>
          </tr>
          <tr>
            <td className="hl">固定 + 定期更新</td>
            <td>再現性と修正の両立</td>
            <td>更新のレビュー工数が要る</td>
          </tr>
        </tbody>
      </table>

      <p>
        実務解は3つ目です ―
        <Link href="/dev/tooling-deps">ロックファイルで固定</Link>し、自動のPRで定期的に上げ、CIで検証してからマージする。加えて、公開直後の版をすぐ取り込まない「数日待つ」運用も、汚染版を踏む確率を下げます。
      </p>

      <Heading num="06">出所を検証する</Heading>
      <p>
        近年は「そのパッケージが<Term>本当にそのソースコードから、そのCIでビルドされたか</Term>」を検証する仕組みが整ってきました。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>署名</h4>
          <p>公開者の鍵で署名し、改ざんを検知します。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>来歴</h4>
          <p>
            どのリポジトリのどのコミットから、どの手順で作られたかを証明として添えます。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ハッシュ検証</h4>
          <p>取得物の中身が、記録と一致するかを確認します。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>再現可能ビルド</h4>
          <p>
            同じ入力から常に同一の成果物が出ることで、第三者が検証できます。
          </p>
        </Card>
      </CardGrid>

      <p>
        コンテナイメージでも同じ考え方が使えます。<Term>タグではなくダイジェストで固定する</Term>のは、<Link href="/dev/ci-actions">CIのアクションをハッシュで固定する</Link>のと同じ発想です。
      </p>

      <Heading num="07">最低限やること</Heading>
      <p>
        すべてを一度に導入する必要はありません。効果の大きい順に並べると次のようになります。
      </p>

      <Steps>
        <li>ロックファイルをコミットし、CIでは厳密インストールを使う</li>
        <li>更新の自動PRを有効にし、溜めない</li>
        <li>CIで脆弱性スキャンを回し、高深刻度は失敗させる</li>
        <li>秘密情報のコミットを検出するスキャンを入れる</li>
        <li>CIの権限を最小化し、外部アクションをハッシュで固定する</li>
        <li>リリース成果物に部品表を添付し、影響調査に備える</li>
      </Steps>

      <Heading num="まとめ">取り込んだ時点で自分の責任になる</Heading>
      <p>
        利用者から見れば、脆弱性が自作コードにあったか依存にあったかは関係ありません。<Term>依存の選定と更新は、実装作業の一部</Term>です。固定して再現性を確保し、定期的に上げて修正を取り込み、インストールとCIの権限を絞る ―
        この3点だけでも、現実的なリスクの大半は下げられます。
      </p>

      <DocsFooter href="/dev/tooling-security" />
    </DocsPage>
  );
}
