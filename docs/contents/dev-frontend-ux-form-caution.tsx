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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "フォーム作成時の注意",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>フォーム作成時の注意 ― 送信から保存まで押さえる観点</h1>
        <Lead>
          フォームは「入力欄を並べる」だけでは完成しません。二重送信、再送信、権限、セキュリティ、DB更新まで、フロントとサーバー双方で守るべき点が散らばっています。実装前に観点と代表的な対策を一覧で確認しておきましょう。
        </Lead>
      </Hero>

      <Heading num="01">チェックリスト</Heading>
      <p>フォームを設計・実装するときに見返す代表的な観点です。詳細は各項目のリンク先や関連ページで深掘りします。</p>
      <table>
        <thead>
          <tr>
            <th>観点</th>
            <th>代表的な対策</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">二重送信</td>
            <td>disabled、冪等性</td>
          </tr>
          <tr>
            <td className="hl">再送信</td>
            <td>PRG、冪等性</td>
          </tr>
          <tr>
            <td className="hl">入力</td>
            <td>バリデーション</td>
          </tr>
          <tr>
            <td className="hl">セキュリティ</td>
            <td>CSRF、XSS、SQLi</td>
          </tr>
          <tr>
            <td className="hl">大量アクセス</td>
            <td>レートリミット</td>
          </tr>
          <tr>
            <td className="hl">権限</td>
            <td>サーバー側で認可</td>
          </tr>
          <tr>
            <td className="hl">hidden値</td>
            <td>信用しない</td>
          </tr>
          <tr>
            <td className="hl">ファイル</td>
            <td>サイズ・形式・保存先チェック</td>
          </tr>
          <tr>
            <td className="hl">DB</td>
            <td>トランザクション</td>
          </tr>
          <tr>
            <td className="hl">エラー</td>
            <td>入力値保持</td>
          </tr>
          <tr>
            <td className="hl">UX</td>
            <td>ローディング、分かりやすいエラー</td>
          </tr>
          <tr>
            <td className="hl">アクセシビリティ</td>
            <td>label、キーボード操作等</td>
          </tr>
        </tbody>
      </table>

      <Heading num="02">送信まわり ― 二重送信と再送信</Heading>
      <p>
        利用者が送信ボタンを連打すると、同じリクエストが複数回届きます。フロントでは送信中にボタンを<Term>disabled</Term>にする、ローディング表示を出すなどで抑止します。ただしネットワーク遅延やタブの復帰で二重送信は完全には防げないため、サーバー側の<Term>冪等性</Term>(同じ操作を2回実行しても結果が変わらない性質)も必須です。
      </p>
      <p>
        送信後にブラウザの「再読み込み」で同じPOSTが繰り返される問題には、<Term>PRG(Post/Redirect/Get)</Term>パターンが有効です。POSTで処理したあと302などでGET先へリダイレクトし、表示はGETで行います。再読み込みしてもGETだけが繰り返されるため、意図しない再送信を避けられます。
      </p>
      <Aside label="注意">
        disabledだけに頼ると、JavaScriptが無効な環境や、送信直前の二重クリックでは防げません。冪等キーや一意制約など、サーバー側の安全網をセットで設計してください。
      </Aside>

      <Heading num="03">入力とエラー表示</Heading>
      <p>
        クライアント側の<Term>バリデーション</Term>はUX向上に有効ですが、改ざんを防げないため<Term>サーバー側でも必ず検証</Term>します。必須・形式・範囲・照合など、<Link href="/dev/frontend/ux/screen">画面設計と入力チェック</Link>で整理した種類を意識しておきましょう。
      </p>
      <p>
        検証に失敗したときは、利用者が入力した値をフォームに<Term>保持</Term>して返します。空のフォームに戻されると、何が間違っていたか分からず離脱につながります。エラーメッセージは項目の近くに、原因と直し方が分かる文言で示します。
      </p>

      <Heading num="04">セキュリティと権限</Heading>
      <p>
        状態を変えるフォームには<Term>CSRF</Term>対策(トークン、SameSite Cookieなど)が必要です。出力時は<Term>XSS</Term>を防ぐエスケープ、DB問い合わせは<Term>SQLi</Term>を防ぐプレースホルダ(パラメータ化)を徹底します。詳しくは<Link href="/security/csrf">CSRF対策</Link>や<Link href="/security/xss">XSSと出力エスケープ</Link>を参照してください。
      </p>
      <p>
        <code>hidden</code>フィールドの値(価格、在庫、ユーザーIDなど)は<Term>信用してはいけません</Term>。表示用に埋め込んでも、送信値は改ざん可能です。サーバー側でセッションやDBから正しい値を再取得し、認可(その利用者がその操作をしてよいか)も必ずサーバーで判定します。
      </p>

      <Heading num="05">ファイル・DB・負荷</Heading>
      <p>
        ファイルアップロードでは、拡張子だけでなく<Term>実体(MIME)</Term>と<Term>サイズ上限</Term>を検査し、保存先はWeb公開ディレクトリ外に置きます。実行可能な拡張子の混入にも注意します。
      </p>
      <p>
        複数テーブルを更新する処理は<Term>トランザクション</Term>でまとめ、途中失敗時に中途半端なデータが残らないようにします。<Link href="/dev/backend/data/transaction">トランザクション境界</Link>で、どの層で開始・終了するかも決めておきましょう。
      </p>
      <p>
        ログインや問い合わせフォームなど、悪用されやすい入口には<Term>レートリミット</Term>を設けます。<Link href="/dev/backend/ops/rate-limit">レートリミット</Link>で、IP・ユーザー・エンドポイント単位の制限を検討してください。
      </p>

      <Heading num="06">UXとアクセシビリティ</Heading>
      <p>
        送信中はボタンを無効化するだけでなく、処理中であることが分かる<Term>ローディング</Term>表示を出します。エラーは技術用語より「何をどう直すか」が伝わるメッセージにします。
      </p>
      <p>
        各入力には<Term>label</Term>を関連付け、<Term>キーボードだけ</Term>でも操作できるようにします。必須項目・エラー状態は色だけに頼らず、テキストやARIAで伝えます。実装の詳細は<Link href="/dev/frontend/a11y">アクセシビリティ実装</Link>を参照してください。
      </p>

      <Analogy label="💡 たとえるなら">
        フォームは「受付カウンター」です。入口(バリデーション)で書類の不備を指摘し、整理券(PRG)で同じ用紙の二重提出を防ぎ、窓口の裏(サーバー)で本人確認(認可)と記録(DB)を行い、混雑時は整理(レートリミット)をかける ― 見える部分だけ整えても、裏側が抜けると事故になります。
      </Analogy>

      <Heading num="まとめ">フロントとサーバーで二重に守る</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>送信は抑止と冪等性のセット</h4>
          <p>disabled・PRGで体験を守り、サーバーで二重実行を無害にします。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>検証と権限はサーバーが正</h4>
          <p>hidden値やクライアント検証は信用せず、認可と整合性をサーバーで担保します。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>失敗しても入力を失わない</h4>
          <p>値の保持と分かりやすいエラー、labelとキーボード操作で離脱を減らします。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/ux/screen" tag="ユーザーインタフェース">
              画面設計と入力チェック
            </RelatedLink>
            <RelatedLink href="/dev/frontend/react/forms" tag="フロントエンド">
              フォームの値を管理する
            </RelatedLink>
            <RelatedLink href="/security/csrf" tag="セキュリティ">
              CSRF対策
            </RelatedLink>
            <RelatedLink href="/dev/concurrency/patterns" tag="並行処理">
              実装パターン(冪等性)
            </RelatedLink>
            <RelatedLink href="/dev/frontend/a11y" tag="フロントエンド">
              アクセシビリティ実装
            </RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
