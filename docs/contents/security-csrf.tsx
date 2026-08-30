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
  title: "CSRF対策",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>CSRF(クロスサイトリクエストフォージェリ)対策</h1>
        <Lead>
          ログイン中のあなたのブラウザに、あなたの意思とは関係なく「送金」や「削除」を実行させてしまう攻撃 ―
          それが<Term>CSRF</Term>です。攻撃者はサイトに侵入する必要すらありません。Cookieが自動で送られてしまうという、ブラウザのごく普通の仕様を悪用するだけで成立します。
        </Lead>
      </Hero>

      <p>前のページ「<Link href="/security/xss">XSSと出力エスケープ</Link>」で見た攻撃は、狙ったサイトに悪意あるスクリプトを送り込む必要がありました。CSRFはそれとは違うアプローチを取ります。攻撃者は自分のサイト(<code>evil.example</code>)を用意するだけで、標的サイト(<code>bank.example.com</code>)には一切手を加えません。</p>

      <Heading num="01">CSRFの仕組み ― 「本人のふり」ではなく「本人のブラウザ」を使う</Heading>
      <p>ブラウザには「あるドメイン宛てのリクエストには、そのドメインのCookieを自動で付ける」という仕様があります。これは通常とても便利な仕組みですが、悪用されると危険です。CSRFはこの仕様を突いて、被害者が気づかないうちに、被害者のブラウザから標的サイトへリクエストを送らせます。</p>

      <Diagram caption="CSRFの流れ:悪意あるサイトを開いただけで、別サイトへの操作が意図せず実行される">
        <svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
          <text x={20} y={24} fill="#9a9a9a" fontSize="13">① あなたは bank.example.com にログイン中(セッションCookieを保持)</text>

          <rect x={20} y={40} width={180} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={110} y={62} fill="#f2f2f2" fontSize="13" textAnchor="middle">あなたのブラウザ</text>
          <text x={110} y={78} fill="#9a9a9a" fontSize="11" textAnchor="middle">(bank.example.com のCookie保持)</text>

          <text x={20} y={116} fill="#9a9a9a" fontSize="13">② 別タブで evil.example を開く(メールのリンク等から)</text>
          <rect x={20} y={132} width={180} height={50} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={110} y={154} fill="#f2f2f2" fontSize="13" textAnchor="middle">evil.example</text>
          <text x={110} y={170} fill="#9a9a9a" fontSize="11" textAnchor="middle">隠しフォームを自動送信</text>

          <line x1={200} y1={157} x2={420} y2={157} stroke="#9a9a9a" strokeWidth="1.5" />
          <text x={310} y={148} fill="#9a9a9a" fontSize="11" textAnchor="middle">③ 自動送信</text>

          <rect x={430} y={132} width={190} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={525} y={154} fill="#f2f2f2" fontSize="13" textAnchor="middle">bank.example.com/transfer</text>
          <text x={525} y={170} fill="#9a9a9a" fontSize="11" textAnchor="middle">POST 送金リクエスト</text>

          <text x={525} y={210} fill="#39ff6a" fontSize="12" textAnchor="middle">④ ブラウザがCookieを自動で添付</text>
          <text x={525} y={228} fill="#39ff6a" fontSize="12" textAnchor="middle">→ サーバーは「本人からの正当な依頼」と誤認して処理してしまう</text>
        </svg>
      </Diagram>

      <Analogy label="💡 たとえるなら">
        これは「本人のサイン入りの依頼書さえ持ってくれば、誰の代筆でも本人の依頼として処理してしまう窓口」のようなものです。Cookieは「あなたが持っている本人確認証」であって、「あなたが今まさに望んでいる意思」の証明ではありません。銀行の窓口が本当に守るべきなのは、「その場でしか使えない、一度きりの整理券(CSRFトークン)」を毎回確認することです。整理券を持っていない依頼(=偽サイトからの自動送信)は、たとえ本人確認証(Cookie)が正しくても突き返せます。
      </Analogy>

      <Heading num="02">対策① 状態を変える処理はPOSTで行う</Heading>
      <p>まず大前提として、データを変更する処理(送金・削除・設定変更など)は<code>GET</code>ではなく<code>POST</code>で行います。<code>GET</code>リクエストはリンクの埋め込みや、ブラウザ・拡張機能の先読み(プリフェッチ)などでも意図せず発生し得るため、「画面を表示するだけ」の操作に限定しておくべきです。「見るだけ」と「変える」を分けておくことが、他の対策の前提になります。</p>

      <Heading num="03">対策② CSRFトークン ― 「その場限りの整理券」</Heading>
      <p>最も基本的な対策が<Term>CSRFトークン</Term>です。サーバーはフォームを表示するたびに推測不能なランダム値(トークン)を発行し、hiddenフィールドに埋め込みます。フォーム送信時にサーバーはこのトークンを検証し、一致しなければ処理を拒否します。</p>
      <p>攻撃者のサイト(<code>evil.example</code>)は標的サイトの正規ページを表示できないため、正しいトークンの値を知る術がありません。ブラウザがCookieを自動送信してしまっても、トークンという「もう1つの合言葉」まではコピーできないため、リクエストは弾かれます。</p>

      <Heading num="04">対策③ CookieのSameSite属性</Heading>
      <p>Cookieに<Term>SameSite</Term>属性を設定すると、そもそも他サイトを起点としたリクエストにCookieを付けないようブラウザに指示できます。<code>Strict</code>は自サイトからの遷移以外では一切送らない最も厳しい設定、<code>Lax</code>はページ遷移(リンククリック等)の際は送るがフォーム自動送信のような場合は送らない、といった中間の設定です。CSRFトークンと合わせて設定することで、二重に守る形になります。</p>

      <Heading num="05">その他の対策</Heading>
      <ul>
        <li><strong>クライアント側の値を信用しない</strong> ― 価格や権限といった値は、hiddenフィールドで受け渡すのではなく、サーバー側で保持・再計算する。フォームの中身は書き換えられる前提で設計する。</li>
        <li><strong>重要操作の再認証</strong> ― 送金や退会などの重い操作は、実行直前にパスワードの再入力を求める。仮にCSRFが成立してしまっても、最後の一線を守れる。</li>
        <li><strong>Refererチェックは補助的に</strong> ― リクエスト元を示す<code>Referer</code>ヘッダも参考にはなるが、仕様上送信されないケースがあるため、これ単体を主たる防御にはしない。</li>
      </ul>

      <Aside label="注意">
        CSRFトークンは、XSSでページ内のトークンの値を盗み読まれてしまえば意味を失います。前のページで見た<Link href="/security/xss">出力エスケープ</Link>と、このページのCSRF対策は独立した対策ではなく、互いを支え合う関係にあります。片方だけを完璧にしても、もう片方に穴があれば突破されます。
      </Aside>

      <Heading num="まとめ">「本人確認」と「本人の意思確認」は別物</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>変更操作はPOSTで</h4><p>「見るだけ」のGETと「変える」操作を分けるのが全対策の前提。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>CSRFトークンで意思を確認</h4><p>Cookieは本人確認証、トークンはその場限りの整理券。両方揃って初めて正当なリクエストとみなす。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>SameSiteで自動送信を防ぐ</h4><p>他サイト起点のリクエストにはそもそもCookieを付けさせない、ブラウザレベルの防御。</p></Card>
      </CardGrid>
      <p>CSRFトークンもSameSite Cookieも、結局は「Cookie(セッションID)がどう扱われているか」という話に行き着きます。次のページ「<Link href="/security/session">セッションとCookie管理</Link>」では、このセッションの仕組み自体をもう一段掘り下げて見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/session" tag="セキュリティ">セッションとCookie管理</RelatedLink>
                    <RelatedLink href="/security/xss" tag="セキュリティ">XSSと出力エスケープ</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
