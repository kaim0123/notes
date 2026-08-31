import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "環境の全体像" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発の進め方</Eyebrow>
        <h1>環境の全体像 ― どこで、どの段階で動いているのか</h1>
        <Lead>
          <Link href="/dev/tooling">開発環境とツール</Link>では「環境」という言葉が4つの意味を持つことを見ました。ここではそのうち、公開に向けた<Term>段階</Term>としての環境を掘り下げます。開発・検証・本番をどう分け、環境差をどこまで許し、どこは絶対に揃えるのか ―
          「手元では動くのに本番で落ちる」の正体はここにあります。
        </Lead>
      </Hero>

      <Heading num="01">4つの意味を、もう一度分けておく</Heading>

      <table>
        <thead>
          <tr><th>意味</th><th>指すもの</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">開発環境</td>
            <td>自分の手元で作業するための道具一式</td>
          </tr>
          <tr>
            <td className="hl">実行環境</td>
            <td>
              プログラムが動く土台。<Link href="/language/runtime">ブラウザ・Node.js</Link>やOS
            </td>
          </tr>
          <tr>
            <td className="hl">ステージ</td>
            <td>開発・検証・本番という公開の段階(このページの主題)</td>
          </tr>
          <tr>
            <td className="hl">環境変数</td>
            <td>
              外から渡す設定値(<Link href="/dev/dotenv">.envと.gitignore</Link>)
            </td>
          </tr>
        </tbody>
      </table>

      <Analogy label="💡 たとえるなら">
        舞台に例えると、開発環境はリハーサル室、実行環境は劇場の照明や音響の設備、ステージは「リハーサル → 通し稽古 → 本番」という進行の段階、環境変数は公演ごとに貼り替える小道具の配置メモにあたります。
      </Analogy>

      <Heading num="02">3つのステージ</Heading>
      <p>
        同じアプリケーションを、影響範囲の小さい場所から順番に確認しながら公開していく考え方です。
      </p>

      <table>
        <thead>
          <tr><th>ステージ</th><th>目的</th><th>本番との違い</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">開発(dev)</td>
            <td>手元で書いて即座に確かめる</td>
            <td>データも規模も別物。速度優先の設定</td>
          </tr>
          <tr>
            <td className="hl">検証(staging)</td>
            <td>本番に近い条件でチームが確認する</td>
            <td>本番に「できるだけ近い」が同一ではない</td>
          </tr>
          <tr>
            <td className="hl">本番(production)</td>
            <td>実際の利用者が使う</td>
            <td>―</td>
          </tr>
        </tbody>
      </table>

      <p>
        ステージを増やすほど確認は丁寧になりますが、その全部を維持する手間とコストがかかります。<Term>検証環境が本番と乖離していると、通しても意味がない</Term>ため、維持できない数のステージを持つくらいなら、少ないステージをきちんと本番に寄せるほうが有効です。
      </p>

      <Heading num="03">環境差はどこから生まれるか</Heading>
      <p>
        「手元では動くのに本番で落ちる」を減らす鍵は、<Term>揃えるべき差と、違って当然の差を分ける</Term>ことです。
      </p>

      <DiagramFrame
        slug="dev-environments-diff"
        aspect="640 / 290"
        caption="環境差を5つの要素に分解した図。コードと依存は、同じコミット・同じロックファイルから作られていれば同一になるはずで、ここが違っていたら事故。設定・データ・規模は環境ごとに違って当然で、違いを前提に設計する対象になる。本番だけで起きる不具合は、たいてい下3つに原因がある。"
      />

      <p>
        上の2つ ―
        コードと依存 ― が環境間で違っていたら、それは事故です。<Link href="/dev/git-ci">同じ成果物を昇格させる</Link>運用と<Link href="/dev/tooling-deps">ロックファイル</Link>で揃えられます。一方、下の3つは違って当たり前で、揃えようとするより<Term>違いに耐える設計</Term>のほうが現実的です。
      </p>

      <Aside label="本番だけで起きる不具合の見つけ方">
        原因はほぼ「データ・規模・設定」のどれかです。データなら本番に近い件数を検証環境に用意する、規模なら<Link href="/language/concurrency-race">同時実行</Link>を再現する、設定なら環境変数の一覧を突き合わせる ―
        <Term>どの差が効いているかを1つずつ潰す</Term>のが、<Link href="/dev/debug">デバッグ</Link>と同じ手順になります。
      </Aside>

      <Heading num="04">環境ごとの設定をどう渡すか</Heading>

      <table>
        <thead>
          <tr><th>方式</th><th>切り替えのタイミング</th><th>注意</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="hl">ビルド時に埋め込む</td>
            <td>ビルドのたび</td>
            <td>環境ごとに再ビルドが要る。秘密は入れられない</td>
          </tr>
          <tr>
            <td className="hl">実行時に読む</td>
            <td>起動のたび</td>
            <td>同じ成果物を昇格できる。サーバー側の基本</td>
          </tr>
          <tr>
            <td className="hl">外部の設定サービス</td>
            <td>動作中でも変更できる</td>
            <td>変更の履歴と権限管理が要る</td>
          </tr>
        </tbody>
      </table>

      <p>
        原則は<Term>実行時に読む</Term>です。ビルド時に埋め込む方式は、そのぶん「検証したものと本番のものが別」になる危険を抱えます。フロントエンドは仕組み上ビルド時に埋め込まれるため、<Term>クライアントに渡る値に秘密は置けない</Term>という制約が付いて回ります。
      </p>

      <Heading num="まとめ">押さえておきたい3点</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>ステージは段階</h4>
          <p>
            影響範囲の小さい場所から順に確認します。維持できない数は作りません。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>差を2種類に分ける</h4>
          <p>
            コードと依存は揃える。設定・データ・規模は違いを前提に設計します。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>設定は実行時に読む</h4>
          <p>
            同じ成果物を昇格でき、「検証したものと違う」を防げます。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/dev/environments" />
    </DocsPage>
  );
}
