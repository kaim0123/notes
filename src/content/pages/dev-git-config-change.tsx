import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "構成管理と変更管理" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>構成管理と変更管理 ― 「今どれが正か」を見失わない</h1>
        <Lead>
          開発が進むと、ソースコード・設計書・ライブラリ・設定など、無数の成果物が版を重ねていきます。どれが最新で、どれとどれが組み合わさって動くのか ―
          これを一貫して管理するのが<Term>構成管理</Term>、そしてその台帳をどう更新してよいかを定めるのが<Term>変更管理</Term>です。2つは対で働きます。
        </Lead>
      </Hero>

      <Heading num="01">構成品目 ― 管理する単位</Heading>
      <p>
        構成管理の対象となる一つひとつの成果物を<Term>構成品目</Term>と呼びます。プログラムだけでなく、設計書・テスト仕様・マニュアル・使用ライブラリなど、システムを構成するものはすべて管理対象になり得ます。何を構成品目とし、どう識別・管理するかを定めるのが構成管理計画です。
      </p>

      <DiagramFrame
        slug="dev-git-config-change"
        aspect="640 / 290"
        caption="構成管理と変更管理は対になっている。左の構成管理は「いま何が正なのか」を記録する台帳で、コード・設定・文書・依存の一覧・成果物にそれぞれ版が付く。右の変更管理は台帳をどう更新してよいかのルールで、変更要求・影響評価・承認・実施と確認の4段階からなる。この手順を通ったものだけが台帳を更新できる。現代のチームでは、台帳がリポジトリ、変更要求と承認がPRとレビュー、確認がCIに置き換わっている。"
      />

      <Analogy label="💡 たとえるなら">
        構成管理は映画の編集管理に似ています。撮影した膨大なカットに通し番号を振り、どのカットのどの版を繋いだものが公開版かを台帳で管理する。これがなければ、どのフィルムが完成品か分からなくなります。
      </Analogy>

      <Heading num="02">バージョン管理とリポジトリ</Heading>
      <p>
        構成品目の「版」を記録し、いつでも過去に戻せるようにするのが<Term>バージョン管理</Term>です。誰が・いつ・何を・なぜ変えたかを追跡でき、複数人の変更を突き合わせられるため、共同開発の基盤になります。仕組みそのものは<Link href="/dev/git-basics">Gitの仕組み</Link>で扱いました。
      </p>

      <Heading num="03">変更管理の手順</Heading>
      <p>
        変更管理の狙いは、変更を止めることではなく、変更を<Term>管理された形で通す</Term>ことです。
      </p>

      <table>
        <thead>
          <tr><th>手順</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">変更要求</td>
            <td>変更の内容と理由を記録して申請する</td>
          </tr>
          <tr>
            <td className="hl">影響評価</td>
            <td>コスト・工数・他機能への波及を分析する</td>
          </tr>
          <tr>
            <td className="hl">承認</td>
            <td>評価をもとに実施可否を判断する</td>
          </tr>
          <tr>
            <td className="hl">実施・確認</td>
            <td>変更を反映し、回帰テストで影響がないか確認する</td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        変更管理は建物の改築申請に似ています。壁を抜きたいと思っても、勝手に壊せば建物全体の強度に関わります。申請し、構造への影響を確認し、許可を得てから工事する ―
        この手続きが、システムの安全な変更を支えます。
      </Analogy>

      <Heading num="04">いまのチームでは何に置き換わっているか</Heading>
      <p>
        重い申請書と委員会を思い浮かべがちですが、現代のチームではこの2つの多くが日常の仕組みに置き換わっています。
      </p>

      <table>
        <thead>
          <tr><th>古典的な仕組み</th><th>いまの対応物</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">構成品目の台帳</td>
            <td>
              リポジトリと<Link href="/dev/tooling-deps">ロックファイル</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">変更要求</td>
            <td>課題チケットとPRの説明</td>
          </tr>
          <tr>
            <td className="hl">影響評価・承認</td>
            <td>
              <Link href="/dev/git-ci">レビューと必須チェック</Link>
            </td>
          </tr>
          <tr>
            <td className="hl">実施・確認</td>
            <td>CIの自動テストと、リリースのタグ付け</td>
          </tr>
          <tr>
            <td className="hl">部品表</td>
            <td>
              <Link href="/dev/tooling-security">SBOM</Link>の自動生成
            </td>
          </tr>
        </tbody>
      </table>

      <Aside label="形式ではなく機能を見る">
        大事なのは重い手続きを踏むことではなく、<Term>「今の正が1つに定まっていること」と「更新に承認と検証が挟まっていること」</Term>という機能が満たされているかです。これが満たされていれば、形式はPRでも申請書でも構いません。逆にPRを使っていても、誰も読まずに承認され検査が緑でなくてもマージできるなら、機能は果たされていません。
      </Aside>

      <Heading num="05">守っているのは一貫性</Heading>
      <p>
        変更管理が守ろうとするのは、システム全体の<Term>一貫性</Term>です。あるモジュールを変えたのに関連する設計書やテストが古いまま、という食い違いを防ぎます。構成管理が「何が今の正か」を記録する台帳だとすれば、変更管理は「その台帳をどう更新してよいか」を定めるルール ―
        両者がそろって初めて、成果物の整合が保たれます。
      </p>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>構成品目を定める</h4>
          <p>プログラムも文書もライブラリも、管理単位として識別します。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>版を一元管理する</h4>
          <p>履歴を追跡でき、過去へ戻せる状態を保ちます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>更新にルールを挟む</h4>
          <p>
            要求・評価・承認・確認。形式より、この機能が満たされているかを見ます。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/dev/git-config-change" />
    </DocsPage>
  );
}
