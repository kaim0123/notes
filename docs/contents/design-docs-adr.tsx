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
  title: "ADR ― 設計判断の記録",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>設計</Eyebrow>
        <h1>ADR ― 設計判断の記録</h1>
        <Lead>
          「なぜこのライブラリを使っているんですか」「なぜマイクロサービスにしなかったんですか」―
          半年後、決めた本人すら答えられなくなります。理由が失われたルールは、守る意味が分からないまま守られるか、事情を知らないまま壊されるかのどちらかです。<Term>ADR(Architecture Decision Record)</Term>は、その理由を1件1ファイルで残す仕組みです。
        </Lead>
      </Hero>

      <Heading num="01">何を解決するのか</Heading>
      <table>
        <tbody>
          <tr><th>記録がないと起きること</th><th>ADRがあると</th></tr>
          <tr><td className="hl">同じ議論を何度も繰り返す</td><td>「その案は2年前に検討し、Xの理由で見送った」と即答できる</td></tr>
          <tr><td className="hl">事情を知らずに変更し、壊す</td><td>制約が明記されているため、影響を予測できる</td></tr>
          <tr><td className="hl">前提が変わったのに決定が残り続ける</td><td>前提が書いてあるので、<strong>覆すべき時が分かる</strong></td></tr>
          <tr><td className="hl">新メンバーが背景を理解できない</td><td>読めば経緯を追える。口頭伝承に依存しない</td></tr>
          <tr><td className="hl">担当者の退職で理由が消える</td><td>組織に残る</td></tr>
        </tbody>
      </table>
      <Analogy label="💡 たとえるなら">
        法律の条文だけでなく<strong>立法趣旨</strong>が残されているのと同じです。趣旨が分かれば、想定外の事例にどう適用すべきか判断でき、時代に合わなくなったときに改正すべきかも判断できます。条文だけでは、守るか無視するかの二択になります。
      </Analogy>

      <Heading num="02">1件のADRに書くこと</Heading>
      <p>形式は自由ですが、次の5項目が揃っていれば十分です。1ファイル1決定、長さは1ページに収めます。</p>
      <table>
        <tbody>
          <tr><th>項目</th><th>内容</th></tr>
          <tr><td className="hl">状態</td><td>提案中 / 承認 / 却下 / <strong>置き換え済み(supersededされた)</strong></td></tr>
          <tr><td className="hl">背景</td><td>どんな問題に直面していたか。制約・前提(期限、人数、既存資産)</td></tr>
          <tr><td className="hl">決定</td><td>何を選んだか。1文で言い切る</td></tr>
          <tr><td className="hl">検討した選択肢</td><td>他に何を検討し、<strong>なぜ選ばなかったか</strong>。ここが最も価値がある</td></tr>
          <tr><td className="hl">結果(影響)</td><td>これにより何が可能になり、何を諦めたか。今後の負債は何か</td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`# 0007. セッション管理にRedisを使う

状態: 承認 (2026-03-14)

## 背景
アプリを複数インスタンスで動かすため、プロセス内メモリのセッションでは
インスタンスをまたぐとログアウトしてしまう。想定同時接続は最大5,000。

## 決定
セッションストアとして Redis (マネージドサービス) を使う。

## 検討した選択肢
- **DB(PostgreSQL)に保存**: 追加コンポーネント不要だが、
  毎リクエストの読み書きが主DBに集中する。将来のボトルネックになる懸念。
- **JWTでステートレス化**: ストア不要。ただし即時失効ができず、
  管理者による強制ログアウト要件(#312)を満たせない。
- **スティッキーセッション**: 実装は最小。インスタンス障害で
  セッションが失われ、スケールインのたびに影響が出る。

## 結果
- 運用対象が1つ増える(監視・バックアップ・コスト月額約Xドル)。
- 将来、キャッシュ用途でも同じ基盤を使える。
- Redis障害時は全ユーザーがログアウトされる。可用性構成が必要。`}</code>
      </pre>

      <Heading num="03">いつ書くか</Heading>
      <p>すべての判断を記録すると続きません。基準は<strong>「後から変えるのが高くつくか」</strong>です。</p>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>書くべき</h4>
          <p>データベースの選定、認証方式、アーキテクチャの分割方針、外部サービスの採用、APIの互換性方針。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>書くべき(意外と多い)</h4>
          <p><strong>あえて採用しなかった</strong>判断。「今はマイクロサービスにしない」も立派な決定。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>書かなくてよい</h4>
          <p>変数名、ファイル配置、いつでも戻せる実装の詳細。規約に属するものは<Link href="/design/conventions">規約</Link>へ。</p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>書くタイミング</h4>
          <p>決めた直後。<strong>議論の記憶があるうちに</strong>。後回しにすると、却下理由から先に失われる。</p>
        </Card>
      </CardGrid>

      <Heading num="04">決定は覆せる ― supersede という考え方</Heading>
      <p>ADRは<strong>書き換えません</strong>。前提が変わって別の判断をするときは、新しいADRを作り、古いほうを「置き換え済み」にします。</p>
      <Steps>
        <li>新しいADR(例: 0021)を書き、背景に「0007の前提がこう変わった」と記す</li>
        <li>古いADR(0007)の状態を「0021により置き換え済み」に変更し、リンクを張る</li>
        <li>古い内容は<strong>消さない</strong> ― 当時の判断が誤りだったとは限らず、経緯こそが資産</li>
      </Steps>
      <p>この運用により、<strong>「いつ、なぜ方針が変わったか」の履歴</strong>が残ります。技術選定の変遷を追えることは、同じ失敗を繰り返さないための最も具体的な材料になります。</p>

      <Heading num="05">運用を軽く保つ</Heading>
      <table>
        <tbody>
          <tr><th>方針</th><th>理由</th></tr>
          <tr><td className="hl">リポジトリの <code>docs/adr/</code> に置く</td><td>コードと一緒にレビューでき、PRで議論できる</td></tr>
          <tr><td className="hl">連番 + 短い題名のファイル名</td><td><code>0007-session-store-redis.md</code>。一覧が目次になる</td></tr>
          <tr><td className="hl">1ページに収める</td><td>長い文書は書かれないし読まれない</td></tr>
          <tr><td className="hl">PRとして提案する</td><td>「提案中」で出し、レビューで議論し、承認でマージする</td></tr>
          <tr><td className="hl">テンプレートを置く</td><td>書き始めのコストを下げる。項目の抜けを防ぐ</td></tr>
        </tbody>
      </table>
      <Aside label="議事録ではない">
        ADRは会議の記録ではありません。<strong>結論と、その理由</strong>だけを残します。発言の経緯や日程調整まで書き始めると、書くのも読むのも重くなり、続かなくなります。議論の詳細はIssueに残し、ADRからリンクすれば十分です。
      </Aside>

      <Heading num="06">コードとの結び付け</Heading>
      <p>ADRは、参照されて初めて機能します。</p>
      <table>
        <tbody>
          <tr><th>結び付け方</th><th>効果</th></tr>
          <tr><td className="hl">コードのコメントからADR番号を参照</td><td>不自然に見える実装の理由がその場で分かる</td></tr>
          <tr><td className="hl">READMEから一覧へリンク</td><td>新規参加者が経緯にたどり着ける</td></tr>
          <tr><td className="hl">PRテンプレートに「ADRが必要か」の項目</td><td>書き忘れを防ぐ</td></tr>
          <tr><td className="hl">設計レビューでADRを起点にする</td><td>議論が「好み」ではなく「前提と制約」の話になる</td></tr>
        </tbody>
      </table>
      <p>最後の効果が実は最大です。ADRを書こうとすると、<strong>選択肢を挙げ、比較軸を言語化し、捨てるものを認識する</strong>必要が生じます。記録が残ること以上に、この思考の強制に価値があります(「<Link href="/dev/sdlc/review">レビューと品質確認</Link>」)。</p>

      <Heading num="まとめ">理由を残す</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>却下理由こそ資産</h4><p>選んだ理由より、選ばなかった理由のほうが後から必要になる。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>重い判断だけ書く</h4><p>後から変えるのが高くつく決定に絞る。全部書こうとすると続かない。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>書き換えず、置き換える</h4><p>前提が変われば新しいADRを積む。変遷そのものが記録になる。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/design/docs" tag="設計">ドキュメンテーション</RelatedLink>
            <RelatedLink href="/design/architecture" tag="設計">アーキテクチャ一覧</RelatedLink>
            <RelatedLink href="/dev/sdlc/management/change" tag="開発工程">変更管理</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
