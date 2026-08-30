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
  Steps,
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "障害の切り分け",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ</Eyebrow>
        <h1>障害の切り分け ― どこで止まっているかを特定する</h1>
        <Lead>
          「サイトが繋がりません」という報告を受けたとき、原因はアプリのバグとは限りません。ケーブルが抜けているのか、DNSが引けないのか、サーバーが落ちているのか
          ― どこで止まっているかを知らなければ、直しようがありません。ここでは<strong>原因を特定する順番</strong>を扱います。誰が指揮を執り何を記録するかという対応の進め方は<Link href="/infra/monitoring/incident">インシデント対応の型</Link>で扱います。
        </Lead>
      </Hero>

      <p><Link href="/infra/monitoring">監視・保守</Link>で紹介した障害対応フロー「①検知→②切り分け→③暫定対応→④根本原因の調査→⑤恒久対応→⑥ポストモーテム」のうち、このページでは特に②<Term>切り分け</Term>の具体的な手順を、インフラの階層ごとに掘り下げます。</p>

      <Heading num="01">なぜ「下から」確認するのか</Heading>
      <p>ブラウザに表示されるエラーは、常に本当の原因を教えてくれるとは限りません。「ページが真っ白」「表示が遅い」といった上位層(アプリケーション)の症状に見えて、実は物理層やネットワーク層といった下位層で止まっていることが少なくありません。通信は下位層の土台の上に上位層が乗って成立しているため、下位層が壊れれば上位層はすべて機能しなくなります。だからこそ切り分けは、疑わしい箇所に飛びつくのではなく、<Term>物理→ネットワーク→DNS→サーバー→アプリ</Term>という積み重なった階層の順に、下から1段ずつ確認していくのが定石です。</p>

      <Diagram caption="下位層が壊れると、上位層はすべて症状として現れる">
        <svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg">
          <rect x={140} y={10} width={200} height={36} rx={6} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={240} y={33} fill="#f2f2f2" fontSize="13" textAnchor="middle">⑤ アプリケーション</text>

          <rect x={140} y={56} width={200} height={36} rx={6} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={240} y={79} fill="#f2f2f2" fontSize="13" textAnchor="middle">④ サーバー</text>

          <rect x={140} y={102} width={200} height={36} rx={6} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={240} y={125} fill="#f2f2f2" fontSize="13" textAnchor="middle">③ DNS</text>

          <rect x={140} y={148} width={200} height={36} rx={6} fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={240} y={171} fill="#f2f2f2" fontSize="13" textAnchor="middle">② ネットワーク</text>

          <rect x={140} y={194} width={200} height={36} rx={6} fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={240} y={217} fill="#39ff6a" fontSize="13" textAnchor="middle">① 物理</text>

          <line x1={360} y1={230} x2={360} y2={28} stroke="#39ff6a" strokeWidth="1.5" />
          <polygon points="360,20 353,32 367,32" fill="#39ff6a" />
          <text x={400} y={125} fill="#9a9a9a" fontSize="11" textAnchor="middle" transform="rotate(-90 400 125)">確認する順番</text>
        </svg>
      </Diagram>

      <Heading num="02">切り分けの5階層</Heading>
      <p>それぞれの階層で「何を確認するか」「どんなコマンド・ツールを使うか」を順番に見ていきます。</p>

      <Steps>
        <li><strong>① 物理</strong>ケーブルの抜け・電源断・ハードウェア故障を確認する。クラウド環境ではラックを見に行く代わりに、利用しているクラウド事業者の障害情報ページ(ステータスページ)を確認する。</li>
        <li><strong>② ネットワーク</strong><code>ping</code>で対象ホストにICMPが到達するか確認する。応答がなければ<code>traceroute</code>(Windowsでは<code>tracert</code>)で経路上のどこで途切れているかを1ホップずつ辿る。</li>
        <li><strong>③ DNS</strong><code>nslookup</code>や<code>dig</code>で名前解決ができるか、返ってくるIPアドレスが正しいかを確認する。名前解決の仕組み自体は<Link href="/network/applications/dns">DNS</Link>で詳しく扱っている。</li>
        <li><strong>④ サーバー</strong>IPアドレスまでは届くのに応答がない場合、<code>telnet</code>や<code>curl</code>で該当ポート(80番・443番など)に接続できるか確認する。接続できてもエラーが返る場合は、サーバー自体のCPU・メモリ・ディスクの逼迫を疑う(<Link href="/infra/monitoring/server">サーバー・機器の監視</Link>で見た指標)。</li>
        <li><strong>⑤ アプリケーション</strong>ここまでで問題がなければ、ようやくアプリのログやヘルスチェックエンドポイントを確認する段階になる。<Link href="/infra/monitoring">監視・保守</Link>で扱ったメトリクス・ログ・トレースの出番はここから。</li>
      </Steps>

      <Analogy label="💡 たとえるなら">
        これは電気製品が動かないときの点検に似ています。いきなり製品を分解する前に、まずコンセントが刺さっているか(物理)、ブレーカーが落ちていないか(ネットワーク)を確認しますよね。それでも動かなければ、ようやく製品本体の中身(アプリケーション)を疑います。下位層の点検を飛ばして上位層から調べ始めると、電源タップの故障(物理層の問題)を製品本体の故障だと勘違いして、見当違いの修理をしてしまいかねません。
      </Analogy>

      <Heading num="03">上位層の症状に、下位層の原因が隠れている</Heading>
      <p>実務でよくあるのは、「アプリのエラーに見えたのに、原因は物理層やネットワーク層だった」というパターンです。</p>

      <table>
        <thead>
          <tr><th>見えている症状(上位層)</th><th>実際の原因(下位層)であり得るもの</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ページが真っ白なまま固まる</td><td>DNSの応答待ちで止まっている(サーバー自体は正常)</td></tr>
          <tr><td className="hl">「サーバーに接続できません」</td><td>途中経路のルーターやスイッチの故障、ケーブルの物理的な断線</td></tr>
          <tr><td className="hl">一部の利用者だけ繋がらない</td><td>特定拠点のネットワーク機器の異常(全員ではなく一部にだけ症状が出る)</td></tr>
          <tr><td className="hl">急にアクセスできなくなった</td><td>DNSの設定変更ミスで、名前の指す先自体が変わってしまった</td></tr>
        </tbody>
      </table>

      <Aside label="豆知識">
        アプリのコードを何度読み返しても再現しないエラーに遭遇したら、一度アプリの外を疑ってみる価値があります。「ping は通るのにブラウザではタイムアウトする」であればアプリ・サーバー寄りの問題、「ping すら通らない」であればネットワークより下の問題、という切り分けだけでも、調査すべき範囲を大きく絞り込めます。
      </Aside>

      <Heading num="まとめ">階層を疑う順番を決めておく</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>下位層から順に確認する</h4>
          <p>物理→ネットワーク→DNS→サーバー→アプリの順で1段ずつ確認すれば、見当違いの調査を避けられる。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>階層ごとに使う道具を覚えておく</h4>
          <p>ping・traceroute・nslookup/dig・telnet/curl・アプリログという対応関係を手札として持っておく。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>上位層の症状を鵜呑みにしない</h4>
          <p>「アプリが壊れて見える」ことと「アプリが原因である」ことは別。原因は往々にしてもっと下にある。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/infra/monitoring/incident" tag="インフラ">インシデント対応の型</RelatedLink>
                    <RelatedLink href="/infra/monitoring" tag="インフラ">監視・保守</RelatedLink>
                    <RelatedLink href="/infra/monitoring/server" tag="インフラ">サーバー・機器の監視</RelatedLink>
                    <RelatedLink href="/security/network-defense" tag="セキュリティ">ネットワーク層の防御</RelatedLink>
                    <RelatedLink href="/network/applications/dns" tag="インターネット">DNS</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
