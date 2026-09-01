import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  Heading,
  DiagramFrame,
  Card,
  CardGrid,
  CardNumber,
  Analogy,
  Aside,
  DocsFooter,
} from "@/components/docs";

export const metadata: Metadata = { title: "セキュリティ対策・実装" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>セキュリティ対策・実装 ― どこに置くかで、効き方が変わる</h1>
        <Lead>
          <Link href="/security/attacks">攻撃手法</Link>で手口を、<Link href="/security/auth">認証・認可</Link>で入口の固め方を見てきました。残るのは、それらを<strong>どこに配置するか</strong>です。同じ「不正な通信を止める」でも、CDNで止めるのとアプリの中で止めるのでは、見えているものも、止められるものも違います。このページは対策の地図 ― 経路のどこに何を置き、どれが何の代わりにならないのかを並べます。
        </Lead>
      </Hero>

      <Heading num="01">対策は、通信が通る経路の上に並ぶ</Heading>
      <p>
        個々の製品名から入ると「何を買えばいいか」の話になりますが、順番は逆です。外から来た通信がどこを通ってデータに届くのかを描き、<Term>その経路のどこで、どれだけ深く中身を見るか</Term>で対策が決まります。
      </p>

      <DiagramFrame
        slug="security-countermeasures-layers"
        aspect="760 / 312"
        caption="外から来る通信が通る順に対策を並べたもの。CDNとDDoS対策が量で押し潰す攻撃を吸収し、ファイアウォールがIPとポートで絞り、WAFがHTTPの中身を見て弾き、アプリケーションが入力検証と認証・認可を行い、データベースが最小権限と暗号化で守る。下の2本は箱ではなく運用 ― ログを集めて突き合わせること、更新を当てて権限を絞ることは、どの箱にも同じだけ効く。"
      />

      <p>
        この並びで大事なのは、<strong>手前が奥の代わりにならない</strong>ことです。手前ほど広く粗く、奥ほど狭く細かく見ます。手前で粗く弾くのは処理を軽くするためであって、奥の検査を省いてよいからではありません。<Link href="/security/basics">多層防御</Link>が「壁の枚数ではなく破られ方の違い」だったのと同じ話が、そのまま配置の話になっています。
      </p>

      <Heading num="02">境界を守る ― 見る深さで役割が分かれる</Heading>
      <p>
        ネットワークの出入り口に置く仕組みは、名前が多い割に、違いは<Term>パケットのどこまでを開けて見るか</Term>にほぼ集約されます。
      </p>

      <table>
        <thead>
          <tr><th>仕組み</th><th>見るもの・やること</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ファイアウォール(FW)</td><td>IPアドレス・ポート・プロトコルで通信の可否を判断する</td></tr>
          <tr><td className="hl">WAF</td><td>HTTPの中身まで検査し、SQLiやXSSなどWebアプリへの攻撃を弾く</td></tr>
          <tr><td className="hl">IDS(侵入検知)</td><td>不正な通信のパターンを検知し、管理者に知らせる</td></tr>
          <tr><td className="hl">IPS(侵入防止)</td><td>検知に加えて、その通信を自動で遮断する</td></tr>
          <tr><td className="hl">DMZ</td><td>外部公開サーバーを内部ネットワークから隔離した区画に置く</td></tr>
          <tr><td className="hl">SIEM</td><td>各機器のログを集約・相関分析し、単体では見えない兆候を見つける</td></tr>
        </tbody>
      </table>

      <DiagramFrame
        slug="security-countermeasures-inspection"
        aspect="640 / 312"
        caption="ファイアウォールとWAFが、同じ1つの通信のどこまでを見ているか。FWが届くのはIPヘッダとTCPヘッダまでで、WAFはHTTPヘッダと本文を開いて見る。本文にSQLインジェクションの文字列が入っていても、FWから見れば正しいポート宛に届いた形の正しいHTTP通信でしかなく、中身は判断材料に入らない。"
      />

      <p>
        ここで押さえておきたいのは、<Term>WAFはアプリの穴を塞ぐものではない</Term>ということです。パターンで弾く以上、書き方を変えられれば抜けますし、正常なリクエストを誤って弾くこともあります。WAFが買えるのは<strong>時間</strong>です ― 脆弱性が公表されてから修正版を出すまでの数日を、外側で凌ぐ。恒久的な対策はアプリケーション側にしか置けません。機器そのものの保護やポートセキュリティ、AAAは<Link href="/network/security">ネットワークのセキュリティ</Link>が扱います。
      </p>

      <Heading num="03">通信を守る ― どの層で暗号化するか</Heading>
      <p>
        盗聴と改ざんを防ぐ手立ては、<Link href="/security/crypto">暗号技術</Link>で見た仕組みを、どの層に適用するかで分かれます。
      </p>

      <table>
        <thead>
          <tr><th>プロトコル</th><th>守る範囲</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">TLS(HTTPS)</td><td>アプリケーション同士の通信。証明書で相手の正当性も確かめる</td></tr>
          <tr><td className="hl">IPsec</td><td>IP層。上位のプロトコルを問わず、拠点間をまとめて暗号化する</td></tr>
          <tr><td className="hl">SSH</td><td>サーバーへの遠隔ログインと操作</td></tr>
          <tr><td className="hl">VPN</td><td>公共回線の上に、暗号化された仮想的な専用線を作る</td></tr>
        </tbody>
      </table>

      <p>
        どれを使うかは<Term>暗号を解く鍵を、どこからどこまでが持つか</Term>で決まります。TLSはアプリとアプリの間なので、途中の経路をいくつ経由しても中身は読まれません。一方VPNやIPsecは拠点と拠点の間なので、<strong>拠点の内側に入ってからは平文</strong>です。「VPNを張っているから安全」が成り立つのは、その拠点の内側を信用してよい場合だけになります。VPNとWANの構成そのものは<Link href="/network/architecture">ネットワークアーキテクチャ</Link>で扱っています。
      </p>

      <Heading num="04">運用で守る ― 買えないほうの対策</Heading>
      <p>
        機器と暗号を並べ終えても、実際の侵害の多くは<Term>既知の脆弱性が放置されていた</Term>ことから始まります。ここから先は買って設置するものではなく、続けることで効く対策です。
      </p>

      <table>
        <thead>
          <tr><th>対策</th><th>やること</th><th>効かなくなる原因</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">パッチ管理</td><td>更新を把握し、期限を決めて当てる</td><td>棚卸しが無く、何が動いているか分からない</td></tr>
          <tr><td className="hl">アクセス制御</td><td>必要最小限の権限だけを与える</td><td>付けた権限を外す手順が無い</td></tr>
          <tr><td className="hl">マルウェア対策</td><td>導入と定義の更新、検知後の隔離</td><td>警告が多すぎて誰も見ない</td></tr>
          <tr><td className="hl">セキュアプログラミング</td><td>入力検証・出力エスケープを既定にする</td><td>個人の心がけに任せている</td></tr>
          <tr><td className="hl">ログ設計</td><td>誰が何をしたかを、あとから追える形で残す</td><td>必要な項目が入っていない、保存期間が短い</td></tr>
        </tbody>
      </table>

      <p>
        右の列がこの節の主題です。<strong>どれも「やっていない」ではなく「続いていない」で失敗します</strong>。最小権限は、付けるより外すほうが難しく、退職や異動のたびに権限だけが残っていきます。ログは、事故が起きてから見に行って初めて足りないと分かります ― <Term>残っていない記録は、あとから作れません</Term>。依存ライブラリごと脆弱性を取り込む経路は<Link href="/dev/tooling-security">依存の脆弱性とサプライチェーン</Link>、業務端末の更新と資産管理は<Link href="/computer/client-security">端末セキュリティ管理</Link>、アプリ側のログ実装は<Link href="/backend/express-logging">ログ</Link>と<Link href="/backend/ops-tracing">リクエストIDと分散トレーシング</Link>が扱います。
      </p>

      <Aside label="実装側の細部は、配下の4ページで">
        配信の入口でヘッダを足して抑えられる攻撃は<Link href="/security/headers">セキュリティヘッダ</Link>、個人向けページが他人に配られてしまう事故は<Link href="/security/cache">キャッシュ制御と情報漏洩</Link>、予兆に気づける記録の残し方は<Link href="/security/logging">ログ出力設計</Link>、そしてコードの外側で守る設計は<Link href="/security/network-defense">ネットワーク層の防御</Link>で、それぞれ個別に扱います。
      </Aside>

      <Heading num="05">「内側」が定義できなくなった</Heading>
      <p>
        ここまでの配置は、境界の外は危険で内側は安全、という前提に立っています。この前提が崩れたのが現在です。業務はクラウドの上に移り、端末は社外から繋ぎ、外部の事業者にも権限を渡す。<strong>守るものが社内から出ていった以上、内側という区画そのものが引けません</strong>。
      </p>

      <DiagramFrame
        slug="security-countermeasures-zero-trust"
        aspect="760 / 312"
        caption="境界型とゼロトラストの違い。左の境界型では、社内ネットワークという枠の内側に検査が無いため、1台が乗っ取られるとそこから横へ自由に動けてしまう。右のゼロトラストは内側と外側の区別をやめ、資源のひとつ手前に検査点を置いて、どの通信も毎回認証と認可を受ける。守る位置が、ネットワークの外周から資源の手前へ移っている。"
      />

      <p>
        <Term>ゼロトラスト</Term>は製品の名前ではなく、検査点の置き場所を変える設計です。境界型の弱点は、突破後の<Term>横移動</Term> ― 1台の端末が乗っ取られたあと、内側では誰も確かめないので、そこから他のサーバーへ次々に手が伸びます。<Link href="/security/attacks">キルチェーン</Link>の後半で起きているのがこれです。資源のひとつ手前で毎回確かめれば、1台の侵害が1台で止まります。端末の側の挙動を継続的に監視するEDR/XDRも、この考え方と組み合わせて使われます。
      </p>

      <Analogy label="💡 たとえるなら">
        オフィスの入口で社員証を確かめて、あとは館内どこでも自由に歩ける方式が境界型です。ゼロトラストは、入口ではなく<strong>部屋ごとに</strong>確かめる方式です。手間は増えますが、1人の来訪者が入り込んでも、開けられる部屋はその人に許された部屋だけになります。
      </Analogy>

      <Heading num="まとめ">置き場所が、効き方を決める</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>手前は奥の代わりにならない</h4>
          <p>手前ほど広く粗く、奥ほど細かく見る。WAFが買えるのは修正までの時間で、恒久対策はアプリ側にしかない。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>暗号は範囲で選ぶ</h4>
          <p>TLSはアプリ間、VPNは拠点間。拠点の内側に入れば平文に戻るので「張っているから安全」は成り立たない。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>運用は続けないと落ちる</h4>
          <p>買える対策と違い、パッチ・権限・ログは止めた日から効果が下がる。残っていない記録は後から作れない。</p>
        </Card>
      </CardGrid>

      <DocsFooter href="/security/countermeasures" />
    </DocsPage>
  );
}
