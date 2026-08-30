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
  Diagram,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "認可",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>認可 ― 「何をしてよいか」を判定する</h1>
        <Lead>
          前のページ「<Link href="/security/auth">認証</Link>」では「あなたは誰か」を確認する方法を見ました。しかし本人確認ができたからといって、その人が<strong>何でもしていい</strong>わけではありません。「この人は、このデータを見てよいか・この操作をしてよいか」を判定するのが<Term>認可(Authorization)</Term>です。認証と認可は別々の問いであり、別々に設計しなければなりません。
        </Lead>
      </Hero>

      <Heading num="01">「誰か」と「何をしてよいか」は別問題</Heading>
      <p>ログインさえできれば、そのユーザーはシステムの全データにアクセスしてよいのでしょうか。もちろん違います。会員Aさんは自分の注文履歴は見られても、会員Bさんの注文履歴を見る権限はありません。管理者だけが操作できる画面を、一般ユーザーが操作できてもいけません。「本人確認(認証)ができている」ことと「その操作が許されている(認可)」ことは、まったく別の軸で判定する必要があります。</p>

      <Analogy label="💡 たとえるなら">
        <strong>認証</strong>は「入館証を見せて、建物の中に入れてもらう」ことです。一方<strong>認可</strong>は、入館してからの話で「このフロアの、この部屋のドアを開けられるか」という話です。入館証を持っている(ログインしている)からといって、社長室のドアまで開けられるわけではありません。部屋番号(リソースのID)を知っているだけでは開かず、そのドアには別の鍵(権限の確認)が必要です。
      </Analogy>

      <Heading num="02">判定は必ずサーバー側・リクエストごとに</Heading>
      <p>認可の判定は、画面(クライアント側)ではなく<strong>サーバー側</strong>で、しかも<strong>リクエストが来るたびに毎回</strong>行う必要があります。「管理者用のボタンを一般ユーザーの画面には表示しない」という工夫だけでは、認可を実装したことにはなりません。ボタンを隠すのは見た目の親切さであって、セキュリティ対策ではないからです。</p>

      <Heading num="03">URLを知っていることは権限の証明にならない</Heading>
      <p>「このURLは公開していないから大丈夫」「画面にリンクを置いていないから見つからないはず」という考え方を<Term>セキュリティ・バイ・オブスキュリティ(隠すことによる安全)</Term>と呼びますが、これは対策として不十分です。URLはブラウザの開発者ツールやネットワークログから簡単に見つかりますし、番号を1つ変えるだけで別のページにたどり着けてしまうこともあります。「見つかりにくい」ことと「権限がない人には見せない」ことはまったく別物です。</p>

      <Heading num="04">IDOR ― IDを書き換えるだけで他人のデータが見える事故</Heading>
      <p>典型的な認可不備に<Term>IDOR(Insecure Direct Object Reference)</Term>があります。例えば自分の注文詳細ページが <code>/orders/123</code> だったとして、URLの数字を <code>/orders/124</code> に書き換えてみたら、他人の注文が表示されてしまった ― というような事故です。サーバーが「ログインしているか」だけを確認し、「そのリソース(注文123・124)の持ち主が本当にこのユーザーか」を確認していないと、このような事故が起こります。</p>

      <Diagram caption="IDOR: リソースIDを書き換えるだけで、所有者チェック漏れがあると他人のデータが見えてしまう">
        <svg viewBox="0 0 640 230" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={20} width={160} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={100} y={50} fill="#f2f2f2" fontSize="13" textAnchor="middle">ユーザーA(ログイン中)</text>

          <rect x={240} y={20} width={200} height={50} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={340} y={44} fill="#f2f2f2" fontSize="12" textAnchor="middle">GET /orders/123</text>
          <text x={340} y={60} fill="#9a9a9a" fontSize="10" textAnchor="middle">(自分の注文)</text>

          <rect x={490} y={20} width={130} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={555} y={50} fill="#f2f2f2" fontSize="12" textAnchor="middle">正常に表示</text>

          <line x1={180} y1={45} x2={238} y2={45} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={440} y1={45} x2={488} y2={45} stroke="#5f5f5f" strokeWidth="1.5" />

          <rect x={240} y={110} width={200} height={50} rx="8" fill="none" stroke="#ff4d4d" strokeWidth="1.5" />
          <text x={340} y={134} fill="#f2f2f2" fontSize="12" textAnchor="middle">GET /orders/124</text>
          <text x={340} y={150} fill="#9a9a9a" fontSize="10" textAnchor="middle">(他人Bの注文)</text>

          <line x1={100} y1={70} x2={100} y2={135} stroke="#5f5f5f" strokeWidth="1.5" />
          <line x1={100} y1={135} x2={238} y2={135} stroke="#5f5f5f" strokeWidth="1.5" />

          <rect x={490} y={110} width={130} height={50} rx="8" fill="none" stroke="#ff4d4d" strokeWidth="1.5" />
          <text x={555} y={130} fill="#f2f2f2" fontSize="12" textAnchor="middle">所有者確認なしだと</text>
          <text x={555} y={146} fill="#ff4d4d" fontSize="12" textAnchor="middle">→ そのまま表示</text>
          <line x1={440} y1={135} x2={488} y2={135} stroke="#5f5f5f" strokeWidth="1.5" />

          <text x={320} y={200} fill="#9a9a9a" fontSize="12" textAnchor="middle">「ログインしているか」だけでなく「この注文123/124の持ち主は本当にこのユーザーか」を毎回確認する</text>
        </svg>
      </Diagram>

      <Heading num="05">クライアント側の値は信じない</Heading>
      <p>フォームの<code>hidden</code>パラメータや、Cookieに入れた<code>role=admin</code>のような権限情報を、サーバー側がそのまま信用してはいけません。クライアント側の値はブラウザの開発者ツールで誰でも自由に書き換えられます。「管理者かどうか」「所有者かどうか」といった権限に関わる判断は、必ずサーバー側が保持しているデータ(データベース上のユーザーとリソースの紐付けなど)を根拠に行う必要があります。</p>

      <Heading num="06">デフォルト拒否 ― 許可リストで考える</Heading>
      <p>認可のルールは「誰が・何に対して・何をしてよいか」という形で要件として明文化し、全てのAPIエンドポイント・全ての画面に同じルールを一貫して適用します。設計の基本方針は<Term>デフォルト拒否(Deny by Default)</Term>です。「これは禁止」という禁止リストを増やしていくのではなく、「これは許可されている」という許可リストだけを明示し、リストにない操作は自動的に拒否されるようにします。実装漏れがあったときに、禁止リスト方式は「うっかり許可されてしまう」方向に倒れますが、許可リスト方式は「うっかり拒否される」方向に倒れるため、事故の被害が小さく済みます。</p>

      <table>
        <thead>
          <tr><th>方式</th><th>考え方</th><th>実装漏れが起きたときの結果</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">禁止リスト</td><td>「これはダメ」を列挙する</td><td>書き漏れた操作が誰でもできてしまう(危険)</td></tr>
          <tr><td className="hl">許可リスト(推奨)</td><td>「これだけがOK」を列挙する</td><td>書き漏れた操作は自動的に拒否される(安全側)</td></tr>
        </tbody>
      </table>

      <Aside label="注意">
        「本人の注文だから見られる」「管理者だから操作できる」といった判定ロジックは、フロントエンドのコードに書いても意味がありません。フロントエンドのコードはブラウザに丸ごと送られており、誰でも読める・書き換えられるためです。判定は必ずサーバー側に置きましょう。
      </Aside>

      <Heading num="まとめ">認可設計の6つの原則</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>認証と認可は別物</h4><p>「誰か」の確認と「何をしてよいか」の判定は、それぞれ別に設計します。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>判定はサーバー側・毎回</h4><p>ボタンを隠すだけでは対策になりません。リクエストのたびにサーバーで判定します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>IDは改ざんされる前提</h4><p>リソースIDの所有者・権限は、値を信用せず都度確認します(IDOR対策)。</p></Card>
        <Card><CardNumber>4</CardNumber><h4>デフォルト拒否</h4><p>許可リスト方式で、「明示的に許可されたことだけ」を実行可能にします。</p></Card>
      </CardGrid>
      <p>誰が・何をしてよいかが整理できたら、次は少し視点を変えて「<Link href="/security/cache">キャッシュ制御</Link>」を見ていきます。せっかく認証・認可を正しく実装しても、レスポンスのキャッシュのされ方によっては、個人向けのデータが他人に見えてしまう事故が起こり得ます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/auth" tag="セキュリティ">認証</RelatedLink>
                    <RelatedLink href="/security/session" tag="セキュリティ">セッションとCookie管理</RelatedLink>
                    <RelatedLink href="/security/cache" tag="セキュリティ">キャッシュ制御</RelatedLink>
                    <RelatedLink href="/security/identity" tag="セキュリティ">認証プロトコルの変遷</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
