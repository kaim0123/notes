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
  title: "インジェクション攻撃の基本形",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>インジェクション攻撃の基本形 ― 入力を「命令」と誤解釈させる攻撃</h1>
        <Lead>
          Webアプリを狙う攻撃には様々な名前がついていますが、その多くは実は同じ1つの構造を持っています。「データのつもりで受け取った入力が、命令として実行されてしまう」―
          これが<Term>インジェクション(injection、注入)</Term>と呼ばれる脆弱性です。まずはこの共通の型を理解しておくと、この後の各ページの話がぐっと繋がって見えてきます。
        </Lead>
      </Hero>

      <Heading num="01">名前は違っても、中身は同じ攻撃</Heading>
      <p>次の表は、代表的な5つのインジェクション系脆弱性です。狙われる場所(インターフェース)はバラバラですが、「攻撃者が用意した文字列を、本来はデータとして扱われるべき場所に紛れ込ませ、命令として実行させる」という悪用の型はすべて共通しています。</p>

      <table>
        <thead>
          <tr><th>脆弱性名</th><th>狙われるインターフェース</th><th>悪用の手口</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">クロスサイトスクリプティング(XSS)</td><td>HTML</td><td>JavaScriptをページに注入する</td></tr>
          <tr><td className="hl">HTTPヘッダインジェクション</td><td>HTTP</td><td>HTTPレスポンスヘッダに余計な行を注入する</td></tr>
          <tr><td className="hl">SQLインジェクション</td><td>SQL</td><td>SQL文そのものを書き換えて注入する</td></tr>
          <tr><td className="hl">OSコマンドインジェクション</td><td>シェルスクリプト</td><td>OSに実行させるコマンドを注入する</td></tr>
          <tr><td className="hl">メールヘッダインジェクション</td><td>Sendmailコマンド</td><td>メールヘッダ・本文を注入する</td></tr>
        </tbody>
      </table>

      <p>この後のページで詳しく扱う<Link href="/security/xss">XSS</Link>と<Link href="/security/sqli">SQLインジェクション</Link>は、この表の中でも特によく話題になる2つの具体例です。まずはこのページで、5つ全部に共通する「なぜ起きるのか」「どう防ぐのか」を先に押さえておきましょう。</p>

      <Heading num="02">インジェクションが生まれる3つの段階</Heading>
      <p>インジェクションは、だいたいいつも次の3段階を経て発生します。どこか1段階だけの対策では防ぎきれず、3段階すべてに気を配る必要があります。</p>

      <Steps>
        <li><strong>① 入力</strong>アプリが、外部から来た不正なデータをそのまま受け入れてしまう</li>
        <li><strong>② 処理</strong>受け取った入力を、検証・分離せずにそのまま「命令の一部」として組み立ててしまう</li>
        <li><strong>③ 出力</strong>組み立てた結果を、エスケープ(無害化)せずにそのまま実行・表示してしまう</li>
      </Steps>

      <Analogy label="💡 たとえるなら">
        これは、レストランの注文用紙に「今日の日替わり」を書く欄があるのに、そこに「厨房を燃やせ」と書かれた紙を、店員が疑わずにそのまま厨房に手渡してしまうようなものです。本来「注文内容(データ)」を書く欄のはずなのに、店員(アプリ)がその中身を確認せず、書いてあることを「指示(命令)」として実行してしまう ― これがインジェクションの本質です。
      </Analogy>

      <Heading num="03">3段階それぞれに対応する防御</Heading>
      <p>防御も同じ3段階に対応させて考えると整理しやすくなります。</p>

      <CardGrid>
        <Card><CardNumber>①</CardNumber><h4>入力:検証・正規化</h4><p>受け取った時点で、想定外のデータを弾く・正しい形に整える</p></Card>
        <Card><CardNumber>②</CardNumber><h4>処理:パラメータ化・安全なAPI</h4><p>命令の組み立て方そのものを、注入されようがない安全な仕組みに変える</p></Card>
        <Card><CardNumber>③</CardNumber><h4>出力:エスケープ</h4><p>実行・表示する直前に、特別な意味を持つ文字を無害な文字に置き換える</p></Card>
      </CardGrid>

      <p>特に重要なのは、<strong>この3つは「どれか1つで足りる」ものではなく、3つとも重ねて対策する</strong>という考え方です。これは前のページ「<Link href="/security">セキュリティ</Link>」で紹介した多層防御と同じ発想で、入力検証をすり抜けた不正な文字列があっても、処理や出力の段階でもう一度食い止められるようにしておきます。</p>

      <Heading num="04">入力検証は「クライアントだけ」では意味がない</Heading>
      <p>フォームにJavaScriptで「半角英数字のみ」のようなチェックをつけると、一見安全なように感じます。しかし、これは<strong>あくまでユーザーの入力ミスを防ぐための親切機能</strong>であり、セキュリティ対策にはなりません。攻撃者はブラウザの開発者ツールやツールを使って、JavaScriptによるチェックを簡単に無視し、ブラウザを介さず直接サーバーへ不正なリクエストを送ることができるからです。</p>

      <Aside label="重要">
        入力検証は<strong>必ずサーバー側でも行う</strong>のが大原則です。クライアント側の検証は「ユーザー体験の向上」、サーバー側の検証は「セキュリティの担保」と役割が異なると考えてください。
      </Aside>

      <Heading num="05">具体的な入力検証のテクニック</Heading>
      <p>サーバー側で行う入力検証には、いくつか代表的な手法があります。</p>

      <table>
        <thead>
          <tr><th>手法</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">制御文字の除去</td><td>改行コードやNULL文字など、表示や処理に予期しない影響を与える制御文字を排除する</td></tr>
          <tr><td className="hl">文字数制限</td><td>想定外に長い入力(大量のデータや巨大な攻撃文字列)を受け付けない</td></tr>
          <tr><td className="hl">許可文字の制限(ホワイトリスト)</td><td>「英数字のみ」のように、許可する文字の範囲をあらかじめ決めておき、それ以外を拒否する</td></tr>
          <tr><td className="hl">タグの禁止</td><td><code>&lt;</code> <code>&gt;</code> のような、HTMLタグを構成する文字の入力を拒否・無害化する</td></tr>
        </tbody>
      </table>

      <p>ここでのポイントは、「危険な文字を1つずつ探して拒否する(ブラックリスト方式)」よりも、「許可する文字だけをあらかじめ決めておく(ホワイトリスト方式)」の方が、想定外の抜け道を作りにくく安全性が高いということです。</p>

      <Heading num="まとめ">共通の型を押さえてから、個別の攻撃を見ていく</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>正体は「データと命令の混同」</h4><p>XSSもSQLiもOSコマンドインジェクションも、根っこにあるのは同じ問題です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>入力・処理・出力の3段防御</h4><p>1箇所だけでなく、検証・パラメータ化・エスケープを重ねて対策します。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>検証は必ずサーバー側で</h4><p>クライアント側のチェックは利便性のためのもので、セキュリティの担保にはなりません。</p></Card>
      </CardGrid>
      <p>次のページでは、この型の中でも特に身近な攻撃である「<Link href="/security/xss">XSS(クロスサイトスクリプティング)</Link>」を、出力エスケープの観点から詳しく見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/security/xss" tag="セキュリティ">XSSと出力エスケープ</RelatedLink>
                    <RelatedLink href="/security/sqli" tag="セキュリティ">SQLインジェクション対策</RelatedLink>
                    <RelatedLink href="/network/applications/web" tag="インターネット">Webの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
