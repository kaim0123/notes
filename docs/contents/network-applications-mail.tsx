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
  title: "メールの仕組み",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>ネットワーク</Eyebrow>
        <h1>メールの仕組み ― SMTP・POP・IMAPとなりすまし対策</h1>
        <Lead>
          「メールが届かない」「取引先を装った不審なメールが来た」―
          メールほど毎日使うのに仕組みを知らないまま使われているサービスも珍しくありません。送信と受信でまったく別のプロトコルが使われていること、そして「送信者を名乗るだけなら誰でもできてしまう」というメールの弱点にどう対処しているかを見ていきます。
        </Lead>
      </Hero>

      <Heading num="01">送信はSMTP、受信はPOP/IMAP</Heading>
      <p>メールは1つのプロトコルで完結しているわけではありません。<Term>送信</Term>と<Term>受信</Term>で、それぞれ役割の違うプロトコルが使われています。</p>

      <Diagram caption="送信はSMTPのリレーで運ばれ、受信はPOP/IMAPで取り出す">
        <svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={80} width={110} height={50} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={75} y={109} fill="#f2f2f2" fontSize="12" textAnchor="middle">送信者</text>

          <line x1={130} y1={105} x2={210} y2={105} stroke="#39ff6a" strokeWidth="1.5" />
          <text x={170} y={95} fill="#39ff6a" fontSize="11" textAnchor="middle">SMTP</text>

          <rect x={210} y={80} width={140} height={50} rx="6" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={280} y={102} fill="#f2f2f2" fontSize="12" textAnchor="middle">送信側メールサーバー</text>
          <text x={280} y={118} fill="#9a9a9a" fontSize="10" textAnchor="middle">(SMTPサーバー)</text>

          <line x1={350} y1={105} x2={430} y2={105} stroke="#39ff6a" strokeWidth="1.5" />
          <text x={390} y={95} fill="#39ff6a" fontSize="11" textAnchor="middle">SMTP</text>
          <text x={390} y={125} fill="#9a9a9a" fontSize="10" textAnchor="middle">(中継/リレー)</text>

          <rect x={430} y={80} width={140} height={50} rx="6" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={500} y={102} fill="#f2f2f2" fontSize="12" textAnchor="middle">受信側メールサーバー</text>
          <text x={500} y={118} fill="#9a9a9a" fontSize="10" textAnchor="middle">(メールボックス保管)</text>

          <line x1={500} y1={130} x2={500} y2={165} stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={545} y={152} fill="#9a9a9a" fontSize="11" textAnchor="middle">POP / IMAP</text>

          <rect x={430} y={165} width={140} height={45} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={500} y={192} fill="#f2f2f2" fontSize="12" textAnchor="middle">受信者</text>
        </svg>
      </Diagram>

      <p><Term>SMTP(Simple Mail Transfer Protocol)</Term>は、メールを「送る」「サーバー間で中継する」ときに使われるプロトコルです。一方、サーバーに届いたメールを自分の端末に「取りに行く」段階では、<Term>POP</Term>または<Term>IMAP</Term>が使われます。送信と受信で別のプロトコルが登場するのは、メールが「差出人→(複数の)サーバー→受取人」という郵便に近い仕組みになっているためです。</p>

      <Heading num="02">POP と IMAP ― 受信の2つの方式</Heading>
      <p><Term>POP(Post Office Protocol)</Term>は、サーバーにあるメールを端末に<strong>ダウンロードして、サーバー側からは削除する</strong>のが基本の動作です。一方<Term>IMAP(Internet Message Access Protocol)</Term>は、メールの実体をサーバー上に置いたまま、端末側はその状態を<strong>同期して閲覧する</strong>方式です。</p>
      <table>
        <tbody>
          <tr><th></th><th>POP</th><th>IMAP</th></tr>
          <tr><td className="hl">メールの実体</td><td>端末にダウンロードされる(既定では削除)</td><td>サーバー上に残り続ける</td></tr>
          <tr><td className="hl">複数端末での閲覧</td><td>不向き(先に受信した端末にしか残らない)</td><td>得意(どの端末からも同じ状態が見える)</td></tr>
          <tr><td className="hl">オフライン閲覧</td><td>ダウンロード後は快適</td><td>事前にキャッシュされていれば可能</td></tr>
          <tr><td className="hl">サーバー容量</td><td>消費しにくい(ダウンロード後に削除)</td><td>消費し続ける(メールを残す前提)</td></tr>
        </tbody>
      </table>
      <p>スマホ・PC・タブレットなど複数の端末で同じメールを確認するのが当たり前になった現在は、フォルダ分けや既読状態までサーバー上で同期できるIMAPが主流です。POPは「1台の端末だけで完結させたい」「サーバー容量を圧迫したくない」といった限られた場面で使われます。</p>

      <Analogy label="💡 たとえるなら">
        POPは「郵便受けの手紙を持ち帰って、郵便受けを空にする」やり方。IMAPは「郵便受けはそのままにして、そこにある手紙をどの場所からでも確認できる」やり方です。1人で1つの郵便受けしか見ないならPOPで十分ですが、家族それぞれが同じ郵便受けを別々のタイミングで確認したいならIMAPの方が便利です。
      </Analogy>

      <Heading num="03">メール中継(リレー)</Heading>
      <p>送信者のメールサーバーから受信者のメールサーバーまで、メールは必ずしも1回のSMTP通信だけで届くとは限りません。複数のSMTPサーバーを経由して転送されていくことがあり、これを<Term>メール中継(リレー)</Term>と呼びます。組織内のメールサーバーが、外部にメールを送る際に一度プロバイダのリレーサーバーを経由する、といった構成はよくある例です。</p>
      <p>この「誰でも中継できてしまう」という仕組みの柔軟さは、裏を返せば悪用の余地でもあります。設定が甘いメールサーバーが、無関係な第三者からのメールを勝手に中継してしまう<Term>オープンリレー</Term>状態になると、迷惑メールの送信元として悪用されるリスクが生まれます。次のセクションで見るSPF・DKIM・DMARCは、こうした「なりすまし」への対策として整備されてきました。</p>

      <Heading num="04">なりすまし対策 ― SPF・DKIM・DMARC</Heading>
      <p>SMTPの元々の仕組みでは、送信者アドレス(From)は自己申告に過ぎず、他人のドメインを名乗ったメールを送ること自体は技術的に難しくありませんでした。この弱点を補うために生まれたのが、SPF・DKIM・DMARCという3つの仕組みです。それぞれ<strong>検証する対象が異なる</strong>点が理解のポイントです。</p>
      <table>
        <tbody>
          <tr><th></th><th>検証する対象</th><th>仕組み</th></tr>
          <tr><td className="hl">SPF</td><td>送信元のIPアドレス</td><td>ドメインのDNSに「このドメインからのメールは、このIPアドレス群からしか送られない」と登録し、受信側がIPアドレスを照合する</td></tr>
          <tr><td className="hl">DKIM</td><td>メール本文・ヘッダの署名</td><td>送信側が秘密鍵でメールに電子署名を付け、受信側がDNSに公開された公開鍵で検証する。改ざんされていないか、正規の送信元が発行した署名かを確認する</td></tr>
          <tr><td className="hl">DMARC</td><td>SPF・DKIMの結果とFromアドレスの一致、その後の対応方針</td><td>SPF・DKIMがFromのドメインと整合しているかを見た上で、失敗した場合「隔離するか」「拒否するか」をドメイン所有者がDNSで宣言する</td></tr>
        </tbody>
      </table>
      <p>SPFだけでは「経由したサーバーのIP」しか見ておらず、メールの中身が途中で改ざんされても検知できません。DKIMだけでは「署名が正しいこと」しか分からず、その署名がFromに表示されているドメイン本人のものかまでは保証されません。DMARCは、この2つの結果を突き合わせたうえで「一致していなければどう扱うか」まで送信側が指定できるようにする、いわば仕上げの役割を持っています。3つがそろって初めて、「誰が送ったかの検証」から「不一致だった場合の具体的な対処」までが一貫します。</p>

      <Aside label="豆知識">
        SPF・DKIM・DMARCはいずれもDNSにレコードを追加することで有効になります。メールサーバーを移行したり、新しい配信サービス(メルマガ配信ツールなど)を使い始めたりする際に、このDNS設定を更新し忘れると、正規のメールなのに迷惑メール扱いされてしまうことがあります。
      </Aside>

      <Heading num="05">迷惑メール(スパムフィルタの考え方)</Heading>
      <p>受信側のメールサーバーやメールソフトは、届いたメールを利用者に見せる前に<Term>スパムフィルタ</Term>で判定しています。判定材料は1つではなく、複数の観点を組み合わせて「怪しさ」を点数化するのが一般的な考え方です。</p>
      <ul>
        <li>SPF・DKIM・DMARCの認証結果(なりすましの疑いがないか)</li>
        <li>送信元IPアドレスやドメインの過去の評判(レピュテーション)</li>
        <li>本文中の特徴的な単語・リンク先URLのパターン</li>
        <li>大量の宛先に短時間で送られていないかといった送信挙動</li>
      </ul>
      <p>これらを組み合わせたスコアが一定を超えると、迷惑メールフォルダに振り分けられたり、そもそも受信サーバーの時点で拒否されたりします。前のセクションのSPF・DKIM・DMARCは、この判定材料のうち「なりすましかどうか」という重要な一角を担っている、と位置づけると全体像がつながります。</p>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>送信と受信でプロトコルが違う</h4>
          <p>送信・中継はSMTP、受信の取り出しはPOP(ダウンロード型)またはIMAP(同期型)が担当します。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>SPF・DKIM・DMARCは検証対象が違う</h4>
          <p>送信元IP(SPF)、署名(DKIM)、両者の一致とその後の方針(DMARC)を組み合わせて、なりすましを見抜きます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>迷惑メール判定は多角的</h4>
          <p>認証結果だけでなく、送信元の評判や本文の特徴、送信挙動まで組み合わせてスコアリングされています。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/network/applications/mail/hosting" tag="インターネット">会社ドメインのメールを用意する</RelatedLink>
                    <RelatedLink href="/network/applications" tag="ネットワーク">アプリケーション層のプロトコル</RelatedLink>
                    <RelatedLink href="/infra/storage/backup" tag="インフラ">バックアップと復旧</RelatedLink>
                    <RelatedLink href="/computer/printer" tag="コンピュータ">プリンターの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
