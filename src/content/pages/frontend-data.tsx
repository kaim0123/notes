import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "通信とデータ保存" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>フロントエンド</Eyebrow>
        <h1>通信とデータ保存 ― 誰が口火を切り、どこに残すか</h1>
        <Lead>
          画面に出るデータは、どこかから来てどこかに置かれます。この見出しでは、その2つ ―
          <Term>サーバーとどうやり取りするか</Term>と<Term>手元のどこに残すか</Term>を扱います。設計上の問いは意外に少なく、「誰が口火を切るのか」と「いつ消えてほしいのか」のほぼ2つに集約されます。
        </Lead>
      </Hero>

      <Heading num="01">データが通る4つの場所</Heading>
      <p>
        フロントエンドから見ると、1つのデータは次の4つのどこかに居ます。どこに置くかを間違えると、消えてほしいものが残り、残ってほしいものが消えます。
      </p>

      <DiagramFrame
        slug="frontend-data-places"
        aspect="640 / 320"
        caption="フロントエンドから見たデータの4つの居場所を示した図。いちばん奥がサーバーで、これが正本。手前にメモリ上のキャッシュがあり、リロードで消える。その手前がブラウザの永続領域で、CookieとWeb StorageとIndexedDBがあり、明示的に消すまで残る。いちばん手前がURLで、検索条件や選択中のタブのように共有・リロード・戻る操作に追従してほしい状態を置く。Cookieだけはサーバーへ自動送信される点で他と性質が異なる。"
      />

      <table>
        <thead>
          <tr><th>場所</th><th>寿命</th><th>向いているもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">サーバー</td><td>正本。消えない</td><td>失われて困るものすべて</td></tr>
          <tr><td className="hl">メモリ(state・キャッシュ)</td><td>リロードで消える</td><td>取得済みデータ、画面の一時的な状態</td></tr>
          <tr><td className="hl">ブラウザの永続領域</td><td>明示的に消すまで</td><td>設定・下書き・オフライン用の控え</td></tr>
          <tr><td className="hl">URL</td><td>そのリンクが生きている限り</td><td>検索条件・選択中のタブ・ページ番号</td></tr>
        </tbody>
      </table>

      <p>
        見落とされやすいのが4つ目のURLです。<Term>共有できる・リロードで復元する・戻るボタンが効く</Term>という3つを同時に満たすのはURLだけで、これらが要る状態をstateに閉じ込めると、あとから取り返せません。
      </p>

      <Heading num="02">誰が口火を切るのか</Heading>
      <p>
        通信の形を決めるのは、<Term>やり取りを始めるのがどちらか</Term>です。HTTPは原則としてクライアントが訊き、サーバーが答えます。サーバー側で起きた変化を訊かれる前に届けたいときだけ、別の仕組みが要ります。
      </p>

      <table>
        <thead>
          <tr><th>口火を切る側</th><th>手段</th><th>典型</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">クライアント</td><td>HTTPリクエスト(1往復)</td><td>一覧の取得、フォームの送信</td></tr>
          <tr><td className="hl">クライアント(繰り返し)</td><td>ポーリング</td><td>数十秒の遅れが許せる更新</td></tr>
          <tr><td className="hl">サーバー(片方向)</td><td>SSE</td><td>通知・進捗・逐次出力</td></tr>
          <tr><td className="hl">両方</td><td>WebSocket</td><td>チャット・共同編集</td></tr>
        </tbody>
      </table>

      <p>
        下に行くほどできることは増えますが、運用の複雑さも増えます。判断は必ず<Term>上から順に</Term>行い、「本当に双方向が要るのか」を一度疑うのが定石です。詳しくは<Link href="/frontend/realtime">リアルタイム通信</Link>で扱います。
      </p>

      <Heading num="03">いつ消えてほしいのか</Heading>
      <p>
        保存先を選ぶ問いも1つです。<Term>いつ消えてほしいか</Term>。ここを言語化しないまま「とりあえず<code>localStorage</code>」と書くと、共有端末に前の人の下書きが残り、ログアウトしても設定が残ります。
      </p>

      <table>
        <thead>
          <tr><th>消えてほしいタイミング</th><th>置き場所</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">画面を離れたら</td><td>コンポーネントのstate</td></tr>
          <tr><td className="hl">タブを閉じたら</td><td>sessionStorage</td></tr>
          <tr><td className="hl">利用者が消すまで</td><td>localStorage / IndexedDB</td></tr>
          <tr><td className="hl">サーバーが失効させるまで</td><td>Cookie(サーバー発行)</td></tr>
        </tbody>
      </table>

      <p>
        Cookieだけは他と性質が違い、<Term>すべてのリクエストに自動で付いて回ります</Term>。だから小さく、そして盗まれない工夫が要る ― この非対称性が<Link href="/frontend/storage">ブラウザストレージ</Link>の中心的な論点になります。
      </p>

      <Heading num="04">境界 ― ここで扱わないこと</Heading>
      <p>
        通信の相手側、つまりAPIをどう設計しどう実装するかはバックエンドセクションの担当です。プロトコルそのもの(TCP/IP・HTTPの詳細)はネットワークセクション、認証の仕組みとXSS・CSRFの原理はセキュリティセクションが扱います。
      </p>

      <Aside label="キャッシュはどこの話か">
        キャッシュは層をまたぐ話題で、総論は<Link href="/dev/cache">キャッシュの全体像</Link>にあります。ここで扱うのはそのうちブラウザ側 ― 取得済みデータをメモリに持つこと、そして永続領域に控えを置くことだけです。サーバー側のキャッシュや配信網の話とは分けて考えます。
      </Aside>

      <Analogy label="💡 たとえるなら">
        通信は「取りに行くか、届くのを待つか」、保存は「どの引き出しに入れるか」です。取りに行く回数を増やせば新鮮さは上がりますが足は疲れ、届く仕組みを敷けば速い代わりに配線の保守が要ります。引き出しのほうは、鍵のかかる引き出し(HttpOnly Cookie)、机の上(メモリ)、玄関の掲示板(URL)を取り違えないことが全てです。
      </Analogy>

      <Heading num="まとめ">問いは2つしかない</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>誰が口火を切るか</h4>
          <p>クライアント駆動で足りるかを先に疑う。常時接続は最後の手段。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>いつ消えてほしいか</h4>
          <p>寿命から置き場所が決まる。「とりあえずlocalStorage」は答えではない。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>URLも置き場所のひとつ</h4>
          <p>共有・復元・戻るが要る状態は、stateではなくURLに置く。</p>
        </Card>
      </CardGrid>

      <p>
        配下では、1往復のやり取りを扱う<Link href="/frontend/http">HTTP通信</Link>、サーバーから届く更新を扱う<Link href="/frontend/realtime">リアルタイム通信</Link>、そして手元の保存先を選ぶ<Link href="/frontend/storage">ブラウザストレージ</Link>を順に見ていきます。
      </p>

      <DocsFooter href="/frontend/data" />
    </DocsPage>
  );
}
