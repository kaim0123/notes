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
  title: "バックアップと復旧",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>インフラ</Eyebrow>
        <h1>バックアップと復旧 ― データを失わないために</h1>
        <Lead>
          ハードディスクの故障、うっかり上書き保存、ランサムウェアによる暗号化 ―
          データを失う原因は日常のいたるところに転がっています。さらに厄介なのは「バックアップは取っていたのに、いざという時に復元できなかった」という事故が後を絶たないことです。この章では、失っては困るデータをどう守り、どう戻すかを整理します。
        </Lead>
      </Hero>

      <Heading num="01">なぜバックアップが必要か</Heading>
      <p>データが失われる原因は1つではありません。原因ごとに対策の考え方も変わってきます。</p>
      <table>
        <tbody>
          <tr><th>原因</th><th>具体例</th></tr>
          <tr><td className="hl">機器の故障</td><td>HDD/SSDの物理的な破損、サーバーの電源故障</td></tr>
          <tr><td className="hl">人為的なミス</td><td>ファイルの誤削除、上書き保存、フォルダごとの誤移動</td></tr>
          <tr><td className="hl">マルウェア・攻撃</td><td>ランサムウェアによるファイルの暗号化、悪意ある第三者による破壊</td></tr>
          <tr><td className="hl">災害・事故</td><td>火災、水害、地震によるオフィス・データセンターの被災</td></tr>
        </tbody>
      </table>
      <p>「機器はいつか壊れる」「人はいつか間違える」という前提に立つと、バックアップは「万が一のための保険」ではなく、システム運用に最初から組み込んでおくべき基本設計だと分かります。</p>

      <Heading num="02">3-2-1ルール ― 何個、何種類、どこに</Heading>
      <p>バックアップの基本方針として広く使われているのが<Term>3-2-1ルール</Term>です。</p>
      <ul>
        <li><strong>3</strong> ― データを合計3つ持つ(原本1つ+コピー2つ)</li>
        <li><strong>2</strong> ― 2種類以上の異なる媒体に保存する</li>
        <li><strong>1</strong> ― そのうち1つは物理的に離れた場所(遠隔地)に置く</li>
      </ul>

      <Diagram caption="3-2-1ルール:データ3つ・媒体2種類・そのうち1つは遠隔地">
        <svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg">
          <rect x={250} y={15} width={140} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={320} y={38} fill="#f2f2f2" fontSize="13" textAnchor="middle">原本</text>
          <text x={320} y={54} fill="#9a9a9a" fontSize="11" textAnchor="middle">本番環境のデータ</text>

          <line x1={320} y1={65} x2={130} y2={120} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={320} y1={65} x2={320} y2={120} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={320} y1={65} x2={510} y2={120} stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />

          <rect x={60} y={120} width={140} height={60} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={130} y={145} fill="#f2f2f2" fontSize="13" textAnchor="middle">コピー1</text>
          <text x={130} y={162} fill="#9a9a9a" fontSize="11" textAnchor="middle">社内NAS(媒体A)</text>

          <rect x={250} y={120} width={140} height={60} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1" strokeDasharray="4 3" />
          <text x={320} y={145} fill="#9a9a9a" fontSize="12" textAnchor="middle">(原本 = 1つ目)</text>
          <text x={320} y={162} fill="#9a9a9a" fontSize="11" textAnchor="middle">同じ場所・同じ媒体</text>

          <rect x={440} y={120} width={140} height={60} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={510} y={145} fill="#f2f2f2" fontSize="13" textAnchor="middle">コピー2</text>
          <text x={510} y={162} fill="#9a9a9a" fontSize="11" textAnchor="middle">クラウド(媒体B)</text>

          <rect x={440} y={195} width={140} height={30} rx="6" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={510} y={215} fill="#39ff6a" fontSize="12" textAnchor="middle">遠隔地(オフサイト)</text>
          <line x1={510} y1={180} x2={510} y2={195} stroke="#39ff6a" strokeWidth="1.5" />

          <text x={320} y={260} fill="#9a9a9a" fontSize="12" textAnchor="middle">
            データ3つ(原本+コピー2つ)・媒体2種類(NAS/クラウド)・うち1つは遠隔地
          </text>
          <text x={320} y={280} fill="#9a9a9a" fontSize="12" textAnchor="middle">
            同じ場所に置いた原本とコピーだけでは、火災や盗難で全部同時に失われる
          </text>
        </svg>
      </Diagram>

      <p>ポイントは「同じ場所に同じ形式で何個コピーを置いても、災害1つで全滅する」ということです。媒体を分ける(HDDだけでなくクラウドも使う)のは、特定の媒体の弱点(物理破損、ベンダー障害など)に引きずられないため。遠隔地に1つ置くのは、火災・水害・盗難のように「その場所ごと」データが失われる事態に備えるためです。</p>

      <Analogy label="💡 たとえるなら">
        大事な書類を1部しか持たず、金庫にしまっていても、その金庫がある建物ごと火事になれば意味がありません。コピーを取って自宅にも置き(媒体を分ける)、さらに実家など離れた場所にも1部預けておく(遠隔地)。3-2-1ルールは、この「複数箇所・複数手段で備える」という発想をデータに当てはめたものです。
      </Analogy>

      <Heading num="03">バックアップの取り方 ― フル・差分・増分</Heading>
      <p>毎回すべてのデータを丸ごとコピーするのは安全ですが、データ量が増えるほど時間もストレージも消費します。そこで実際の運用では、いくつかの方式を組み合わせます。</p>
      <table>
        <tbody>
          <tr><th>方式</th><th>取得する内容</th><th>特徴</th></tr>
          <tr><td className="hl">フルバックアップ</td><td>その時点の全データ</td><td>復元は最も簡単・速い。取得に時間と容量がかかる</td></tr>
          <tr><td className="hl">差分バックアップ</td><td>前回のフルバックアップ以降に変更された分</td><td>復元にはフル+最新の差分の2つだけで済む</td></tr>
          <tr><td className="hl">増分バックアップ</td><td>直前のバックアップ(フル or 増分)以降に変更された分</td><td>取得は最も速く軽いが、復元にはフル+全増分を順番に適用する必要がある</td></tr>
        </tbody>
      </table>
      <p>多くの現場では「週1回フル、毎日差分(または増分)」のように組み合わせ、バックアップ時間と復元のしやすさのバランスを取ります。</p>

      <h3>世代管理 ― 「最新」だけでは足りない</h3>
      <p>バックアップは最新の1世代だけでなく、複数世代(先週分、先月分、…)を残しておくのが基本です。これを<Term>世代管理</Term>と呼びます。理由は単純で、「壊れたデータをそのままバックアップしてしまっていた」場合、最新のバックアップだけでは壊れたデータしか戻せないからです。特にランサムウェアは、感染に気づくまで時間差があることが多く、気づいた時には直近のバックアップも暗号化後の状態を拾ってしまっている、ということが起こり得ます。複数世代残しておけば、感染前の状態まで遡って復元できます。</p>

      <h3>スナップショット ― 一瞬で「その時点」を凍結する</h3>
      <p><Term>スナップショット</Term>は、ストレージやサーバー(仮想マシン)の、ある瞬間の状態をまるごと記録する仕組みです。データ全体を複製するのではなく、「その時点以降に変更された差分だけ」を裏側で管理する方式(コピーオンライト)が使われることが多く、フルバックアップに比べて一瞬で取得できるのが特徴です。ただし、スナップショットは元のストレージと同じ基盤上に存在することが多く、それ単体では3-2-1ルールの「遠隔地」「別媒体」を満たさない点に注意が必要です。あくまで「短時間での巻き戻し」に強い手段であり、別の場所への本格的なバックアップと役割が異なります。</p>

      <Heading num="04">バックアップは「取ること」より「戻せること」が本番</Heading>
      <p>3-2-1ルールを守り、世代管理もしていても、いざ復元しようとした瞬間に問題が発覚することは珍しくありません。バックアップファイルが壊れていた、暗号化の鍵やパスワードが分からなくなっていた、復元手順書が古いままで今の環境と合わない ― こうした事態は、実際に復元してみるまで気づけません。</p>

      <Aside label="重要">
        「バックアップを取ってあるので安心」と「実際に復元できることを確認済み」はまったく別の話です。定期的に本番とは別の環境へ実際にリストアしてみる<Term>復元テスト</Term>を行い、手順・所要時間・データの整合性を確認しておかないと、バックアップは「あるはずのもの」でしかありません。
      </Aside>

      <Analogy label="💡 たとえるなら">
        消火器を設置しただけで満足し、使い方を一度も確認しないまま火事に遭ったら、いざという時にピンが抜けない・ホースが劣化していた、ということになりかねません。避難訓練を定期的に行うのと同じように、バックアップも定期的な「復元訓練(リストアテスト)」があって初めて、本当の意味での備えになります。
      </Analogy>

      <Heading num="05">DR(ディザスタリカバリ)とBCP(事業継続計画)</Heading>
      <p>バックアップと復元テストは、より大きな枠組みである<Term>DR(ディザスタリカバリ)</Term>と<Term>BCP(事業継続計画)</Term>の一部です。</p>
      <table>
        <tbody>
          <tr><th></th><th>DR(ディザスタリカバリ)</th><th>BCP(事業継続計画)</th></tr>
          <tr><td className="hl">対象</td><td>ITシステム・データの復旧</td><td>事業全体の継続(人、拠点、取引先を含む)</td></tr>
          <tr><td className="hl">問い</td><td>「システムをどれだけ早く、どの時点まで戻すか」</td><td>「災害時に事業をどう止めずに続けるか」</td></tr>
          <tr><td className="hl">具体策の例</td><td>遠隔地バックアップ、予備サーバーへの切り替え</td><td>代替オフィス、テレワーク体制、取引先との連携手順</td></tr>
        </tbody>
      </table>
      <p>DRの計画では、しばしば<Term>RTO(目標復旧時間)</Term>と<Term>RPO(目標復旧時点)</Term>という2つの指標が使われます。RTOは「障害からどれくらいの時間で復旧させるか」、RPOは「どの時点のデータまで戻せればよいか(=バックアップの間隔)」を表す目安です。この2つを事前に決めておくことで、「どれくらいの頻度でバックアップを取り、どれだけの復旧手段を用意しておくべきか」が具体的に定まります。</p>

      <Heading num="まとめ">覚えておきたい3つのポイント</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>3-2-1ルールが出発点</h4>
          <p>データ3つ・媒体2種類・遠隔地1箇所。同じ場所に同じ形式で置くだけでは、災害1つで全滅します。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>世代を残し、復元を試す</h4>
          <p>最新1世代だけでなく複数世代を保持し、定期的に実際に復元してみて初めて「使えるバックアップ」と言えます。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>DR・BCPはより広い視点</h4>
          <p>ITの復旧(DR)は、事業全体をどう止めずに続けるか(BCP)という、より大きな計画の一部です。</p>
        </Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/network/internet/server" tag="インターネット">サーバーの全体像</RelatedLink>
                    <RelatedLink href="/network/applications/mail" tag="インターネット">メールの仕組み</RelatedLink>
                    <RelatedLink href="/computer/printer" tag="コンピュータ">プリンターの仕組み</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
