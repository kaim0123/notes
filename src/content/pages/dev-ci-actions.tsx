import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Aside, DiagramFrame, Steps,
} from "@/components/docs";

export const metadata: Metadata = { title: "GitHub Actionsの実務" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>GitHub Actionsの実務 ― トリガー・再利用・権限</h1>
        <Lead>
          基本形は<Link href="/dev/git-ci">Git・CI/CD</Link>で扱いました。ここはその先 ―
          いつ走らせるかの選び分け、ジョブ間の受け渡し、コピーを増やさない再利用、そして<Term>権限とサプライチェーン</Term>です。CIは本番の鍵を持つ実行環境なので、最後の2つが実務では最も重要になります。
        </Lead>
      </Hero>

      <Heading num="01">トリガーを選び分ける</Heading>
      <p>同じ検査でも「いつ走らせるか」で費用と安全性が変わります。</p>

      <table>
        <thead>
          <tr><th>きっかけ</th><th>使いどころ</th><th>注意</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">PRの作成・更新</td>
            <td>PRごとの検査。基本形</td>
            <td>外部からのPRには秘密情報が渡されない(意図的な安全設計)</td>
          </tr>
          <tr>
            <td className="hl">mainへのpush</td>
            <td>マージ後の本流の検証、デプロイ</td>
            <td>
              PRで通っても、<Link href="/dev/git-conflict">マージ結果</Link>では壊れることがある
            </td>
          </tr>
          <tr>
            <td className="hl">手動実行</td>
            <td>入力を受け取れる。本番デプロイのきっかけに向く</td>
            <td>誰が実行できるかを権限で絞る</td>
          </tr>
          <tr>
            <td className="hl">定時実行</td>
            <td>夜間の重いテスト、依存の脆弱性スキャン</td>
            <td>時刻はUTC。混雑時は遅延する</td>
          </tr>
          <tr>
            <td className="hl">タグの作成</td>
            <td>リリース成果物のビルドと配布</td>
            <td>
              <Link href="/dev/git-release">タグ名をバージョンとして扱う</Link>設計にする
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        加えて、変更されたパスで絞ると<Link href="/dev/tooling-monorepo">モノレポ</Link>では実行時間を大幅に削れます。ただし必須チェックと組み合わせると<Term>スキップされた検査が永遠に完了しない</Term>状態になり得るため、その場合は「常に走って中身を判断する」形にします。
      </p>

      <Heading num="02">ジョブ間で成果物を受け渡す</Heading>
      <p>
        ジョブはそれぞれ別のマシンで動きます。同じジョブ内でしかファイルは共有されないため、ビルド結果を後段へ渡すには明示的な受け渡しが必要です。ここで重要なのは<Term>各環境で作り直さない</Term>ことです。検証と本番で別々にビルドすると、テストしたものと出したものが別物になります。
      </p>

      <Heading num="03">組み合わせを回す</Heading>
      <p>
        複数のバージョンやOSで同じ検査を行う場合、組み合わせを並列展開できます。ただし組み合わせは掛け算で増えるため、費用も掛け算で増えます。<Term>PRでは代表1構成、mainや定時実行で全構成</Term>のように段階を分けるのが実務的です。
      </p>

      <Heading num="04">再利用 ― コピーを増やさない</Heading>
      <p>
        ワークフローが増えると、同じ手順のコピーが散らばり、修正漏れが起きます。再利用の手段は2つあります。
      </p>

      <table>
        <thead>
          <tr><th></th><th>再利用可能ワークフロー</th><th>複合アクション</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">単位</td>
            <td>ジョブ全体</td>
            <td>ステップの束</td>
          </tr>
          <tr>
            <td className="hl">向く用途</td>
            <td>「検査一式」「デプロイ一式」など工程まるごと</td>
            <td>「準備 + 依存インストール」などの前処理</td>
          </tr>
          <tr>
            <td className="hl">秘密情報</td>
            <td>まとめて引き渡せる</td>
            <td>入力として渡す</td>
          </tr>
        </tbody>
      </table>

      <p>
        共通のものは専用リポジトリに置き、タグで参照すると変更の影響範囲を制御できます。ただし<Term>共通化しすぎて何が起きているか読めなくなる</Term>のも失敗なので、分岐だらけの巨大な共通ワークフローは避けます。
      </p>

      <Heading num="05">権限は既定で最小にする</Heading>
      <p>
        ワークフローに渡されるトークンは、既定でリポジトリへの広い権限を持ちうる資格情報です。<Term>先頭で最小権限を宣言する</Term>のが基本です。
      </p>
      <p>
        権限を絞る理由は、<Term>取り込んだ外部アクションやテストコードがそのトークンを使えてしまう</Term>からです。CIは常に「実行するコード全部にその権限を渡している」と考えます。
      </p>

      <Heading num="06">クラウドの認証は長期キーをやめる</Heading>
      <p>
        アクセスキーを秘密情報として保存する方式は、漏洩時の被害が大きく、失効も手間です。現在の標準は<Term>短命な資格情報</Term>を実行のたびに発行する方式です。
      </p>

      <DiagramFrame
        slug="dev-ci-oidc"
        aspect="640 / 290"
        caption="CIからクラウドへ認証する2つの方式。上段の長期キーを保存する方式は、失効させるまで有効なため漏れれば長期間悪用でき、入れ替えも手作業になる。下段は実行ごとに「どのリポジトリのどのブランチからか」を含む署名付きトークンを発行し、クラウド側が信頼条件と照合して数十分だけ有効な資格情報を返す方式。保存される長期キーが存在しないため、漏れる対象がそもそも無い。"
      />

      <Steps>
        <li>クラウド側に「このリポジトリの、このブランチからの実行を信頼する」設定を作る</li>
        <li>ワークフローにトークン発行の権限を与える</li>
        <li>実行時に発行された署名付きトークンをクラウドが検証し、短命な資格情報を返す</li>
      </Steps>

      <p>
        信頼条件にブランチや環境を含めれば、「mainからの実行だけが本番にデプロイできる」という制約も表現できます。
      </p>

      <Heading num="07">環境と承認 ― 本番だけ手を挟む</Heading>
      <p>
        デプロイ先ごとに秘密情報と保護ルールを束ねる仕組みがあります。
      </p>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>環境ごとの秘密情報</h4>
          <p>検証と本番で別の値を持たせ、取り違えを防ぎます。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>必須レビュー</h4>
          <p>本番デプロイのジョブだけ、指定した人の承認を待たせます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>ブランチ制限</h4>
          <p>本番環境はmainからの実行のみを許可します。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>デプロイ履歴</h4>
          <p>いつ誰がどのコミットを出したかが記録として残ります。</p>
        </Card>
      </CardGrid>

      <p>
        「本番だけ承認を挟む」は、自動化と統制の折衷として現実的です。<Term>すべてに承認を付けると形骸化し</Term>、誰も中身を見ずに押すようになります。
      </p>

      <Heading num="08">サプライチェーンを固める</Heading>
      <p>
        外部アクションをタグで参照するのは<Term>動く参照</Term>です。作者(または乗っ取った攻撃者)がタグを付け替えれば、次の実行から別のコードが動きます。
      </p>

      <table>
        <thead>
          <tr><th>対策</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">コミットハッシュで固定</td>
            <td>更新は自動PRのツールに任せる</td>
          </tr>
          <tr>
            <td className="hl">許可リスト</td>
            <td>組織設定で、使用可能なアクションを制限する</td>
          </tr>
          <tr>
            <td className="hl">秘密情報を渡さない</td>
            <td>外部アクションを使うジョブに、本番の資格情報を持ち込まない</td>
          </tr>
          <tr>
            <td className="hl">ログの扱い</td>
            <td>秘密は自動マスクされるが、加工して出力すると漏れる</td>
          </tr>
        </tbody>
      </table>

      <Aside label="CIは最も価値の高い攻撃対象">
        CIは<Term>ソースコード・本番の鍵・デプロイ権限のすべてに触れる場所</Term>です。攻撃者から見れば、開発者1人の端末より価値があります。<Link href="/dev/tooling-security">依存の供給網</Link>と同じ目線で、権限と取り込むコードを絞ってください。
      </Aside>

      <Heading num="09">遅い・落ちるCIを直す</Heading>

      <table>
        <thead>
          <tr><th>症状</th><th>よくある原因と対処</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">毎回10分以上かかる</td>
            <td>依存のキャッシュ未設定、ジョブが直列。並列化と依存関係の見直し</td>
          </tr>
          <tr>
            <td className="hl">たまに落ちる</td>
            <td>
              時刻・順序・外部依存に依存したテスト。再実行で誤魔化さず原因を特定する
            </td>
          </tr>
          <tr>
            <td className="hl">手元では通る</td>
            <td>環境変数・タイムゾーン・ファイル名の大小文字。コンテナで揃える</td>
          </tr>
        </tbody>
      </table>

      <Heading num="まとめ">CIは実行環境であり、攻撃対象でもある</Heading>
      <p>
        トリガーと再利用は費用と保守性の話ですが、権限とサプライチェーンは<Term>事故の大きさ</Term>の話です。最小権限を宣言し、長期キーを置かず、外部アクションをハッシュで固定する ―
        この3つを最初に決めておけば、後から足すより安く済みます。
      </p>

      <DocsFooter href="/dev/ci-actions" />
    </DocsPage>
  );
}
