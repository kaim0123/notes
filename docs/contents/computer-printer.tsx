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
  title: "プリンターの仕組み",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>コンピュータ</Eyebrow>
        <h1>プリンターの仕組み ― 地味だが止まると業務が止まる</h1>
        <Lead>
          クラウドやAIの話題に比べると地味に思われがちなプリンターですが、オフィスの現場では「印刷できない」「スキャンがメールで届かない」という一報が、他のどんな障害よりも頻繁に飛んできます。ネットワーク・IPアドレス・ドライバーといった基礎知識が、そのまま日常のトラブル対応力に直結する領域です。
        </Lead>
      </Hero>

      <Heading num="01">共有プリンタ ― 1台を複数人・複数PCで使う</Heading>
      <p>家庭用のプリンタはPCに直接USBでつなぐことが多いですが、オフィスでは1台のプリンタをフロア中の全員で共有するのが一般的です。この形を<Term>共有プリンタ(ネットワークプリンタ)</Term>と呼びます。プリンタ本体がLANに直接つながり、各PCはネットワーク越しに「印刷して」という指示(印刷ジョブ)を送ります。</p>

      <Diagram caption="複数のPCが、ネットワーク越しに1台の共有プリンタへ印刷ジョブを送る">
        <svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
          <rect x={40} y={30} width={110} height={44} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={95} y={57} fill="#f2f2f2" fontSize="12" textAnchor="middle">PC A</text>
          <rect x={40} y={90} width={110} height={44} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={95} y={117} fill="#f2f2f2" fontSize="12" textAnchor="middle">PC B</text>
          <rect x={40} y={150} width={110} height={44} rx="6" fill="none" stroke="#5f5f5f" strokeWidth="1" />
          <text x={95} y={177} fill="#f2f2f2" fontSize="12" textAnchor="middle">PC C</text>

          <line x1={150} y1={52} x2={280} y2={110} stroke="#5f5f5f" strokeDasharray="4 3" />
          <line x1={150} y1={112} x2={280} y2={112} stroke="#5f5f5f" strokeDasharray="4 3" />
          <line x1={150} y1={172} x2={280} y2={114} stroke="#5f5f5f" strokeDasharray="4 3" />

          <rect x={280} y={85} width={120} height={54} rx="6" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={340} y={108} fill="#f2f2f2" fontSize="12" textAnchor="middle">LAN</text>
          <text x={340} y={124} fill="#9a9a9a" fontSize="10" textAnchor="middle">(社内ネットワーク)</text>

          <line x1={400} y1={112} x2={480} y2={112} stroke="#39ff6a" strokeWidth="1.5" />

          <rect x={480} y={80} width={130} height={64} rx="6" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={545} y={106} fill="#f2f2f2" fontSize="13" textAnchor="middle">共有プリンタ</text>
          <text x={545} y={124} fill="#9a9a9a" fontSize="11" textAnchor="middle">固定IP: 192.168.1.50</text>
        </svg>
      </Diagram>

      <Heading num="02">プリンタにも固定IPを振る理由</Heading>
      <p>プリンタもネットワーク機器の一種なので、PCと同じように<Term>IPアドレス</Term>を持ちます。ここで問題になるのが、多くの環境で標準になっている<Term>DHCP</Term>(接続のたびに空いているアドレスを自動で割り当てる仕組み)です。DHCPのままだと、プリンタを再起動しただけでIPアドレスが変わってしまうことがあります。</p>
      <p>各PCは「印刷先のプリンタ」としてIPアドレスを登録して使っているため、プリンタ側のIPアドレスが勝手に変わると、それまで印刷できていたPCから急に印刷できなくなります。これを避けるため、プリンタには変わらない<Term>固定IP(静的IPアドレス)</Term>を割り当てておくのが定石です。「プリンタだけ急に見えなくなった」という障害の多くは、実はこのIPアドレスのズレが原因です。</p>

      <Aside label="豆知識">
        DHCPサーバー側で「この機器(MACアドレス)には常に同じIPアドレスを渡す」と紐付けておく<Term>DHCP予約</Term>という方法もあります。プリンタ本体の設定を固定IPにする代わりに、ネットワーク側で実質的に固定化できるため、管理を一箇所にまとめたい場合によく使われます。
      </Aside>

      <Heading num="03">ドライバー ― PCの指示をプリンタが分かる形に翻訳する</Heading>
      <p>PC上で「印刷」ボタンを押したとき、Word文書や画像がそのままプリンタに送られているわけではありません。<Term>プリンタドライバー</Term>が、PC上のデータをそのプリンタの機種が理解できる命令形式に変換しています。同じメーカーでも機種が違えば対応する機能(両面印刷、ステープル留めなど)が異なるため、正しい機種のドライバーが入っていないと、一部の機能が使えなかったり、そもそも印刷できなかったりします。</p>

      <Heading num="04">プリントサーバー ― 複数台・複数人を仲介する</Heading>
      <p>プリンタとPCが数台程度なら、各PCが直接プリンタとやり取りしても大きな問題は起きません。しかし、複数台のプリンタと何十人ものユーザーが混在するオフィスでは、話が変わってきます。「誰がどのプリンタを使えるか」「印刷ジョブが混み合ったときにどの順番で処理するか」「エラーになったジョブをどう扱うか」といった調整役が必要になり、これを担うのが<Term>プリントサーバー</Term>です。</p>
      <p>プリントサーバーは、各PCから送られてきた印刷ジョブを一旦受け取り、待ち行列(キュー)に並べたうえで、それぞれのプリンタへ順番に送り出します。ドライバーの管理も一箇所に集約できるため、PCを新しく用意するたびに全機種分のドライバーを入れて回る必要がなくなる、という運用上のメリットもあります。</p>

      <Analogy label="💡 たとえるなら">
        プリントサーバーは、レストランの「オーダーを厨房に伝える係」です。お客(各PC)が席から直接それぞれの厨房(プリンタ)に怒鳴り込んでいたら収拾がつきませんが、伝票を一箇所で受け取り、順番に厨房へ回してくれる係がいれば、注文が混雑してもさばききれます。
      </Analogy>

      <Heading num="05">スキャンの行き先 ― SMB保存とメール送信</Heading>
      <p>複合機(プリンタ・スキャナー・コピー機が一体になった機器)では、紙をスキャンした後の「データの行き先」も重要な設定項目です。代表的な2つの運用方法があります。</p>
      <table>
        <tbody>
          <tr><th>方式</th><th>仕組み</th><th>向いている場面</th></tr>
          <tr><td className="hl">SMB保存</td><td>スキャンしたPDF/画像を、<Term>SMB</Term>プロトコル経由でファイルサーバーの共有フォルダに直接書き込む</td><td>社内の決まった場所に整理して保存したい、複数人で参照したいデータ</td></tr>
          <tr><td className="hl">メール送信</td><td>複合機自身がメール送信機能を持ち、スキャン結果を指定した宛先へ添付ファイルとして送信する</td><td>社外の相手にすぐ送りたい、個人の手元にすぐ届けたいデータ</td></tr>
        </tbody>
      </table>
      <p>SMB保存を使うには、複合機に「どのファイルサーバーの、どの共有フォルダに、どのアカウントで書き込むか」をあらかじめ登録しておく必要があります。メール送信の場合は、複合機に送信用メールサーバー(<Term>SMTP</Term>)の情報を設定しておく必要があり、社内メールサーバーの設定変更につられて複合機側の設定も見直しが必要になることがあります。どちらも「複合機自身がネットワーク越しに別のサーバーへアクセスする」という点で、プリンタ単体の設定だけでは完結しない機能です。</p>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>プリンタも固定IPで管理する</h4>
          <p>DHCPのままだとIPアドレスが変わり、PCから見えなくなることがあります。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>プリントサーバーが交通整理をする</h4>
          <p>複数台・複数人になるほど、印刷ジョブの待ち行列とドライバー管理を集約する役割が重要になります。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>スキャンは複合機からの「発信」</h4>
          <p>SMB保存もメール送信も、複合機自身が別のサーバー(ファイルサーバー・メールサーバー)へアクセスする設定が必要です。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/network/link" tag="ネットワーク">データリンク層と物理層</RelatedLink>
                    <RelatedLink href="/network/applications/mail" tag="インターネット">メールの仕組み</RelatedLink>
                    <RelatedLink href="/network/internet/server" tag="インターネット">サーバーの全体像</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
