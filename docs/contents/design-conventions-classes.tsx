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
  Analogy,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "クラス・接尾辞の命名",
};

const suffixRows = [
  { suffix: "Service", role: "ビジネスロジックを実行する", example: "ContactSubmissionService" },
  { suffix: "Repository", role: "データの保存・取得を担当する", example: "AnnouncementRepository" },
  { suffix: "Controller", role: "リクエストの入口で処理を振り分ける", example: "ContactController" },
  { suffix: "Manager", role: "状態やリソースを継続的に管理する", example: "ModalManager" },
  { suffix: "Handler", role: "特定のイベント・処理にだけ応答する", example: "SubmitErrorHandler" },
  { suffix: "Factory", role: "オブジェクトの生成をまとめる", example: "FormFieldFactory" },
  { suffix: "Validator", role: "入力値の検証を行う", example: "ContactFormValidator" },
  { suffix: "Client", role: "外部API・サービスと通信する", example: "Web3FormsClient" },
];

const useCaseRows = [
  { goal: "お問い合わせ送信の一連の流れ", pick: "Service" },
  { goal: "お知らせをDBから取得する", pick: "Repository" },
  { goal: "POST /contact を受け付ける", pick: "Controller" },
  { goal: "モーダルの開閉状態を保持する", pick: "Manager" },
  { goal: "429エラーをユーザー向け文言に変換する", pick: "Handler" },
  { goal: "フィールド種別ごとにValidatorを生成する", pick: "Factory" },
  { goal: "メール形式を検証する", pick: "Validator" },
  { goal: "外部APIを呼ぶ", pick: "Client" },
];

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計 &middot; コーディング規約・スタイル</Eyebrow>
        <h1>クラス・接尾辞の命名 ― 役割を名前で語る</h1>
        <Lead>
          <Link href="/design/conventions/variables">変数</Link>が「名詞」で対象を表すのに対し、クラス名は<Term>PascalCase</Term>を使い、「名詞」または「名詞 + 役割を示す接尾辞」で表す。<code>Service</code>や<code>Repository</code>のような接尾辞は、レイヤードアーキテクチャなどで層ごとの責務を切り分けるときの共通語彙で、クラス名を見ただけで「何をするクラスか」が伝わるようにする。
        </Lead>
      </Hero>

      <Heading num="01">よく使う接尾辞</Heading>
      <p>関数・オブジェクトを優先し、クラスは必要なときだけ使う設計でも、この8つの接尾辞は「どんな責務を1つのまとまりにするか」を考える語彙として役立つ。</p>
      <table>
        <thead>
          <tr><th>接尾辞</th><th>役割</th><th>例</th></tr>
        </thead>
        <tbody>
          {suffixRows.map((row) => (
            <tr key={row.suffix}>
              <td className="hl"><code>{row.suffix}</code></td>
              <td>{row.role}</td>
              <td><code>{row.example}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading num="02">レイヤーとしてのつながり</Heading>
      <p>バックエンドやフルスタックでクラスを分けるときは、次のような配置が定番になる。</p>
      <div className="my-5 rounded-xl border border-border bg-card p-5 font-mono text-[0.85rem] leading-relaxed whitespace-pre">
{`HTTPリクエスト
    ↓
Controller   … 入口・ルーティング
    ↓
Service      … ビジネスロジック
    ↓
Repository   … 自前DB / ストレージ
Client       … 外部API

横断:
  Validator  … 入力チェック(Serviceの手前でも可)
  Factory    … 上記クラスの生成
  Manager    … キャッシュ・セッション等の状態管理
  Handler    … エラー・Webhook等の単発イベント`}
      </div>
      <p><code>Repository</code>は自前のデータ、<code>Client</code>は外部サービスが対象、という違いを押さえておくと、<code>Service</code>(業務手順)とどちらに処理を書くべきかで迷いにくくなる。</p>

      <Analogy label="💡 たとえるなら">
        <code>Controller</code>は受付窓口、<code>Service</code>はその案件を実際に処理する担当者、<code>Repository</code>は社内の書庫、<code>Client</code>は外部業者への発注窓口です。<code>Validator</code>は受付前のチェックリスト、<code>Factory</code>は担当者を人選する人事、<code>Manager</code>は備品や座席を管理する庶務、<code>Handler</code>はクレーム専門の対応係と考えると、役割の違いが掴みやすくなります。
      </Analogy>

      <Heading num="03">やりたいことから接尾辞を選ぶ</Heading>
      <table>
        <thead>
          <tr><th>やりたいこと</th><th>第一候補</th></tr>
        </thead>
        <tbody>
          {useCaseRows.map((row) => (
            <tr key={row.goal}>
              <td>{row.goal}</td>
              <td className="hl"><code>{row.pick}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      <CardGrid>
        <Card><h4>Service vs Repository</h4><p>複数ステップの業務手順は<code>Service</code>、データの読み書きだけなら<code>Repository</code>。</p></Card>
        <Card><h4>Controller vs Handler</h4><p><code>Controller</code>はリソース単位の入口(複数メソッド)、<code>Handler</code>は1種類のイベントに1対1で応答する。</p></Card>
        <Card><h4>Factory vs Builder</h4><p><code>Factory</code>は1回の生成、複数プロパティを順に組み立てるなら<code>Builder</code>を検討する。</p></Card>
      </CardGrid>

      <p>クラスや関数の役割が定まったら、最後は<Term>ファイル名・ディレクトリ名</Term>にその役割を反映させる番になる。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/design/conventions/variables" tag="設計">変数・略語の命名</RelatedLink>
                    <RelatedLink href="/design/conventions/files" tag="設計">ファイル・ディレクトリの命名</RelatedLink>
                    <RelatedLink href="/design/architecture/app/layered" tag="設計">レイヤー系アーキテクチャ</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
