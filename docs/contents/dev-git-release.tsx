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
  Aside,
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "バージョニングとリリース",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>実装 &middot; Git</Eyebrow>
        <h1>バージョニングとリリース ― 何を出したかを言えるようにする</h1>
        <Lead>
          障害の第一報で必ず聞かれるのは「いま本番で動いているのはどれか」です。これに数秒で答えられるかどうかは、バージョン番号の付け方とタグ運用で決まります。番号の意味、履歴の残し方、緊急修正の流し方まで、リリースを事故なく回すための取り決めを整理します。
        </Lead>
      </Hero>

      <p>「<Link href="/dev/git">Gitとブランチ戦略</Link>」ではタグとバージョンの要点に触れました。ここでは<strong>自分たちのソフトウェアに番号を振って世に出す</strong>側の運用を掘り下げます(他人のパッケージのバージョンをどう受け取るかは「<Link href="/dev/tooling/deps">依存とバージョン</Link>」)。</p>

      <Heading num="01">セマンティックバージョニングの約束</Heading>
      <p><Term>セマンティックバージョニング(SemVer)</Term>は <code>MAJOR.MINOR.PATCH</code> の3つの数字で、<strong>利用者にとっての影響</strong>を表す規約です。数字は「開発の頑張り」ではなく「互換性」を示します。</p>
      <table>
        <tbody>
          <tr><th>上げる桁</th><th>意味</th><th>利用者がすること</th></tr>
          <tr><td className="hl">MAJOR</td><td>後方互換性のない変更(削除・仕様変更)</td><td>移行作業が必要。移行手順を書く義務がある</td></tr>
          <tr><td className="hl">MINOR</td><td>後方互換な機能追加</td><td>そのまま上げてよい</td></tr>
          <tr><td className="hl">PATCH</td><td>後方互換なバグ修正</td><td>そのまま上げてよい。むしろ上げるべき</td></tr>
        </tbody>
      </table>
      <p>加えて <code>1.0.0-rc.1</code>(プレリリース)や <code>+build.5</code>(ビルドメタデータ)を付けられます。<code>0.x.y</code> は「まだ互換性を約束しない」期間を意味し、この間はMINORでも破壊的変更が許されます。</p>
      <Aside label="破壊的変更の判定は利用者視点で">
        「内部実装しか変えていないから PATCH」は誤りになりがちです。エラーメッセージの形式、デフォルト値、レスポンスのフィールド順 ― 利用者が依存していれば、それは仕様です。<strong>誰かが壊れるならMAJOR</strong>と考えます。APIの場合の進め方は「<Link href="/dev/backend/api/versioning">バージョニングと廃止</Link>」も参照してください。
      </Aside>

      <Heading num="02">Webサービスでは日付ベースも合理的</Heading>
      <p>SemVerは<strong>他人が依存するもの</strong>(ライブラリ・API・SDK)のための規約です。自社だけが動かすWebサービスでは、互換性を伝える相手がいないため、次のような方式が使われます。</p>
      <table>
        <tbody>
          <tr><th>方式</th><th>例</th><th>向いている対象</th></tr>
          <tr><td className="hl">SemVer</td><td><code>2.4.1</code></td><td>ライブラリ、公開API、SDK</td></tr>
          <tr><td className="hl">日付ベース(CalVer)</td><td><code>2026.08.08</code></td><td>継続的にデプロイするWebサービス</td></tr>
          <tr><td className="hl">連番</td><td><code>build-1482</code></td><td>社内ツール、CIの成果物</td></tr>
          <tr><td className="hl">コミットハッシュ</td><td><code>a1b2c3d</code></td><td>コンテナイメージのタグ。<strong>一意で確実</strong></td></tr>
        </tbody>
      </table>
      <p>実務では併用が多くなります ― 人間向けには日付やSemVer、機械向け(イメージタグやロールバック指定)にはコミットハッシュを使います。</p>

      <Heading num="03">タグ ― 「これを出した」という印</Heading>
      <p>タグは特定のコミットに付ける不変の名前です。ブランチと違って動きません。</p>
      <Steps>
        <li>リリースするコミットに注釈付きタグを付ける(<code>git tag -a v2.4.1 -m &quot;...&quot;</code>)</li>
        <li>タグをリモートへ送る(<code>git push origin v2.4.1</code>)</li>
        <li><Link href="/dev/ci">CI</Link>がタグを検知し、そのコミットからビルド・デプロイする</li>
        <li>成果物にバージョンとコミットハッシュを埋め込む</li>
      </Steps>
      <p>4番目が重要です。稼働中のアプリが自分のバージョンを答えられるようにしておくと(<code>/version</code> エンドポイント、起動ログ、レスポンスヘッダ)、「本番はどれか」を推測ではなく事実として確認できます。</p>

      <Heading num="04">変更履歴は人が書かない</Heading>
      <p>変更履歴(CHANGELOG)を手で書く運用は必ず途切れます。<strong>コミットメッセージから自動生成する</strong>のが前提です。そのために、コミット規約(Conventional Commits)を機械が読める形にしておきます。</p>
      <table>
        <tbody>
          <tr><th>接頭辞</th><th>意味</th><th>バージョンへの影響</th></tr>
          <tr><td className="hl"><code>feat:</code></td><td>機能追加</td><td>MINOR</td></tr>
          <tr><td className="hl"><code>fix:</code></td><td>バグ修正</td><td>PATCH</td></tr>
          <tr><td className="hl"><code>feat!:</code> / <code>BREAKING CHANGE:</code></td><td>破壊的変更</td><td><strong>MAJOR</strong></td></tr>
          <tr><td className="hl"><code>docs:</code> <code>refactor:</code> <code>test:</code> 等</td><td>利用者に影響しない変更</td><td>なし(履歴には残す)</td></tr>
        </tbody>
      </table>
      <p>この規約があれば、バージョン番号の決定・タグ付け・変更履歴の生成・公開までを自動化できます。人間が判断するのは「これは破壊的変更か」だけになります。</p>

      <Heading num="05">リリースノートは利用者の言葉で書く</Heading>
      <p>自動生成された変更履歴は<strong>開発者向け</strong>です。利用者に届けるリリースノートは別物として、次の観点で書きます。</p>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>何ができるようになったか</h4><p>実装ではなく、利用者にとっての変化を書く。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>何が変わってしまうか</h4><p>破壊的変更と移行手順。ここが最も読まれる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>いつ廃止されるか</h4><p>非推奨の予告と期限。突然消さない。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>既知の問題</h4><p>把握している不具合を隠さない。信頼はここで決まる。</p></Card>
      </CardGrid>

      <Heading num="06">緊急修正(hotfix)の流し方</Heading>
      <p>本番だけで起きている障害を直すとき、開発中の未完成な変更を巻き込むわけにいきません。手順は次のようになります。</p>
      <Steps>
        <li><strong>まず revert かロールバックを検討する</strong> ― 原因の変更を戻せるなら、それが最速で最も安全</li>
        <li>戻せない場合、本番のタグ(<code>v2.4.1</code>)から hotfix ブランチを切る</li>
        <li>最小限の修正だけを入れ、<code>v2.4.2</code> としてタグを打ちリリースする</li>
        <li><strong>忘れずに main へ取り込む</strong> ― これを怠ると次のリリースで同じ不具合が復活する</li>
      </Steps>
      <Aside label="復活バグ">
        hotfix を本流へ戻し忘れて、修正済みの不具合が次のリリースで再発する事故は非常に多く起きます。「hotfix ブランチは main へマージするまでが作業」とチェックリストに入れておきます。
      </Aside>

      <Heading num="07">リリースの単位を小さく保つ</Heading>
      <p>リリースの大きさは、そのまま障害時の判断コストになります。</p>
      <table>
        <tbody>
          <tr><th>1回のリリースに含まれる変更</th><th>障害時にできること</th></tr>
          <tr><td className="hl">1件</td><td>戻せば確実に直る。原因調査もほぼ不要</td></tr>
          <tr><td className="hl">10件</td><td>戻すと関係ない機能まで消える。原因の特定が必要</td></tr>
          <tr><td className="hl">50件(月次リリース)</td><td>戻す判断自体が困難。前進復旧しか選べなくなる</td></tr>
        </tbody>
      </table>
      <p>「リリースを増やすとリスクが上がる」は直感に反して誤りです。小さく頻繁に出すほど、1回あたりの不確実性が下がり、戻すのも容易になります ― これが継続的デリバリーの根拠です。実際の切り替え方式は「<Link href="/dev/ci/deploy">デプロイ戦略とロールバック</Link>」で扱います。</p>

      <Heading num="まとめ">番号・タグ・戻し方をセットで決める</Heading>
      <p>バージョニングは飾りではなく、<strong>障害対応の速度を決める設計</strong>です。番号が互換性を語り、タグがコミットを指し、稼働中のアプリが自分のバージョンを答えられる ― この3つが揃っていれば、「何を出したか」で迷う時間がなくなります。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/ci/deploy" tag="実装">デプロイ戦略とロールバック</RelatedLink>
            <RelatedLink href="/dev/backend/api/versioning" tag="バックエンド">バージョニングと廃止</RelatedLink>
            <RelatedLink href="/dev/sdlc/management/change" tag="開発工程">変更管理</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
