import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "サーバーサイドキャッシュ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>サーバーサイドキャッシュ ― 二度目を速くする代償</h1>
        <Lead>
          <Link href="/dev/cache">キャッシュの全体像</Link>で階層ごとのキャッシュを俯瞰しました。ここではアプリケーションサーバーの中に絞り、<Term>実際にどう実装し、どう壊れるか</Term>を扱います。キャッシュは最も効果の大きい高速化手段であると同時に、「古いデータが出続ける」「たまにしか再現しない」という最も厄介な不具合の発生源です。<Term>入れる前に、消し方を決める</Term>のが鉄則です。
        </Lead>
      </Hero>

      <Heading num="01">その前に ― 最後の手段である</Heading>
      <p>
        遅いから即キャッシュ、ではありません。キャッシュは<Term>整合性を犠牲にして速度を買う取引</Term>です。先に検討すべきことが必ずあります。
      </p>

      <table>
        <thead>
          <tr><th>先に試すこと</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl"><Link href="/database/index">索引を張る</Link></td><td>全件走査が索引経由になれば、キャッシュ無しで十分速い</td></tr>
          <tr><td className="hl"><Link href="/backend/data-pool">N+1を潰す</Link></td><td>101回のクエリが2回になれば、それだけで解決することが多い</td></tr>
          <tr><td className="hl">取得する量を減らす</td><td>使わない列をやめる、件数を区切る</td></tr>
          <tr><td className="hl">クエリを書き直す</td><td>集計を事前に持たせる、など</td></tr>
        </tbody>
      </table>

      <p>
        これらを尽くしてなお遅い、あるいは<Term>本質的に重い処理</Term>(外部の呼び出し、複雑な集計)がある場合に、初めて検討します。
      </p>

      <Heading num="02">どこに置くか</Heading>
      <table>
        <thead>
          <tr><th>置き場所</th><th>速度</th><th>問題点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">プロセス内のメモリ</td><td>最速(通信が要らない)</td><td><strong>台数分だけ内容がバラつく</strong>。再起動で消える</td></tr>
          <tr><td className="hl">共有のキャッシュ</td><td>速い(1往復)</td><td>運用対象が増える。単一障害点になり得る</td></tr>
          <tr><td className="hl">配信網や前段のプロキシ</td><td>アプリに届かない</td><td>公開コンテンツ限定。個人向けには使えない</td></tr>
          <tr><td className="hl">データベース内の実体化ビュー</td><td>データベース内で完結</td><td>更新のタイミング設計が要る</td></tr>
        </tbody>
      </table>

      <p>
        最も事故が多いのが<Term>プロセス内のメモリ</Term>です。手軽なので入れてしまいますが、サーバーが3台あれば3つの独立したキャッシュができます。「更新したのに、読み直すと古い値が出たり新しい値が出たりする」という再現困難な不具合の正体は、ほぼこれです。
      </p>

      <Aside label="使い分けの基準">
        プロセス内が許されるのは、<Term>ほとんど変わらないデータ</Term>(設定、区分値、地域コード)で、かつ<Term>数分の遅れが許容できる</Term>場合だけです。それ以外は共有のキャッシュを使います。
      </Aside>

      <Heading num="03">基本の形</Heading>
      <p>
        まず覚えるのは、アプリが自分でキャッシュを見て、無ければ取ってきて入れる素直な形です。
      </p>

      <pre>
        <code>{`async function getProduct(id: string): Promise<Product> {
  const key = \`product:v1:\${id}\`;

  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);          // ヒット

  const product = await productRepo.findById(id); // ミス → 取得
  if (product) {
    // 有効期限を必ず付ける。付け忘れたキーは永遠に古いまま残る
    await redis.set(key, JSON.stringify(product), "EX", 300);
  }
  return product;
}`}</code>
      </pre>

      <table>
        <thead>
          <tr><th>方式</th><th>書き込み時の扱い</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">脇に置く</td><td>更新時にキャッシュを削除する</td><td>最も一般的。障害時も本体から読めば動く</td></tr>
          <tr><td className="hl">同時に書く</td><td>本体とキャッシュを同時に更新する</td><td>常に最新だが、書き込みが遅くなる</td></tr>
          <tr><td className="hl">後から書く</td><td>キャッシュに書き、あとで本体へ</td><td>速いが、落ちるとデータが消える。<strong>基本的に避ける</strong></td></tr>
        </tbody>
      </table>

      <p>
        更新時は<Term>更新してから削除</Term>の順です。逆にすると、削除と更新の間に別のリクエストが古い値を読んで、キャッシュし直してしまいます。
      </p>

      <Heading num="04">キーの設計が運用を決める</Heading>
      <table>
        <thead>
          <tr><th>規則</th><th>例</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">種別を前に置く</td><td><code>product:123</code></td><td>他と混ざらない。まとめて消せる</td></tr>
          <tr><td className="hl">バージョンを含める</td><td><code>product:v2:123</code></td><td><strong>形式を変えたら上げる</strong>。古い形式を読んで壊れる事故を防ぐ</td></tr>
          <tr><td className="hl">条件をすべて含める</td><td><code>search:v1:tokyo:page2:ja</code></td><td>入れ忘れた条件があると、別の結果が返る</td></tr>
          <tr><td className="hl">利用者ごとに分ける</td><td><code>user:42:cart</code></td><td><strong>入れ忘れると他人のデータが見える</strong></td></tr>
        </tbody>
      </table>

      <Aside label="認可の結果をキャッシュしない">
        「この利用者はこれを見られるか」の判定結果をキャッシュするときは、キーに利用者と権限の版数を必ず含めます。含め忘れると、<Term>権限を外された人に見え続ける</Term>、あるいは他人の権限で通ってしまいます。個人情報を含む応答を、利用者を区別しないキーで保存するのは重大な事故です。
      </Aside>

      <Heading num="05">無効化 ― 手段は2つしかない</Heading>
      <table>
        <thead>
          <tr><th>方式</th><th>内容</th><th>性質</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">時間で失効</td><td>一定時間後に自動で消える</td><td><strong>単純で壊れにくい</strong>。その代わり最大でその時間だけ古い</td></tr>
          <tr><td className="hl">明示的に削除</td><td>更新処理からキーを消す</td><td>即座に反映される。<strong>消し漏れが起きる</strong></td></tr>
        </tbody>
      </table>

      <p>
        推奨は<Term>短めの有効期限を基本にし、重要なものだけ明示的に消す</Term>併用です。期限を付けておけば、消し漏れても最悪その時間で自然に回復します ― <Term>期限の無いキャッシュは、バグが永久に残るキャッシュ</Term>です。
      </p>
      <p>
        明示的な削除の難しさは<Term>依存関係</Term>にあります。商品を1件更新したとき、古くなるのはその1件だけではありません。それを含む一覧、検索結果、区分別の集計 ― すべてです。全部を追跡するのは現実的でないため、一覧系は短い期限に任せ、明示的な削除は単体取得に限る、という割り切りが要ります。
      </p>

      <Heading num="06">同時に失効した瞬間</Heading>
      <p>
        実運用で最も痛い失敗がこれです。人気のあるキーの期限が切れた瞬間、<Term>そのキーを待っていた大量のリクエストが一斉に本体へ流れ込みます</Term>。
      </p>

      <DiagramFrame
        slug="backend-cache-stampede"
        aspect="640 / 340"
        caption="キャッシュの有効期限が一斉に切れたときに起きる殺到を示した図。上段は期限を全部同じ長さにした場合で、複数のキーの有効期間の帯が完全に揃い、同じ瞬間にいっせいに切れる。その瞬間、待っていたリクエストがすべて本体へ流れ込み、負荷のグラフが鋭い山になる。落ちて復旧しても、また同じことが繰り返される。下段は期限に少しずつばらつきを持たせた場合で、帯の終わりがずれるため流れる量が時間的に散らばり、負荷のグラフはなだらかになる。右下には、加えて再計算をひとつに絞る、あるいは再計算中は古い値を返す、という対策が添えられている。"
      />

      <table>
        <thead>
          <tr><th>対策</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">期限をばらつかせる</td><td>一定値に乱数を足す。最も簡単で効果が大きい</td></tr>
          <tr><td className="hl">再計算を1本に絞る</td><td>最初の1件だけが本体を読み、他は待つか古い値を返す</td></tr>
          <tr><td className="hl">期限前に先回りする</td><td>切れが近づいたら、一部のリクエストにだけ再計算させる</td></tr>
          <tr><td className="hl">古い値を返し続ける</td><td>再計算の間は、期限切れの値をそのまま返す</td></tr>
        </tbody>
      </table>

      <p>
        関連する失敗に<Term>存在しないIDへの問い合わせ</Term>があります。「該当なし」をキャッシュしないと、存在しないIDを大量に投げるだけで全部が本体へ素通りします。<Term>空の結果も短い期限でキャッシュする</Term>のが対策です。
      </p>

      <Heading num="07">壊れ方を設計する</Heading>
      <p>
        キャッシュは<Term>落ちても動く</Term>ように組みます。キャッシュが応答しないときにアプリ全体が止まるなら、それは可用性を下げるために高速化したことになります。
      </p>

      <pre>
        <code>{`async function getWithCache<T>(key: string, load: () => Promise<T>): Promise<T> {
  try {
    const hit = await redis.get(key);
    if (hit) return JSON.parse(hit) as T;
  } catch (err) {
    // キャッシュの障害は「遅くなるだけ」に留める
    logger.warn({ err, key }, "cache read failed");
  }

  const value = await load();
  void redis.set(key, JSON.stringify(value), "EX", 300).catch(() => {});
  return value;
}`}</code>
      </pre>

      <p>
        ただし<Term>キャッシュ前提で本体の容量を設計してはいけません</Term>。ヒット率99%で運用していたシステムは、キャッシュが飛ぶと平常時の100倍の負荷が本体にかかります。そのまま復旧できず、長時間の障害になる事例は珍しくありません。
      </p>

      <Heading num="08">効果を測る</Heading>
      <table>
        <thead>
          <tr><th>指標</th><th>見方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ヒット率</td><td><strong>低ければ入れる意味が無い</strong>。半分を切るなら設計を見直す</td></tr>
          <tr><td className="hl">キー数とメモリ使用量</td><td>増え続けていれば、期限の付け忘れを疑う</td></tr>
          <tr><td className="hl">追い出しの件数</td><td>メモリ不足で強制削除されている。容量か期限の見直し</td></tr>
          <tr><td className="hl">有無での応答時間の差</td><td>効果が数ミリ秒なら、複雑さに見合わない</td></tr>
        </tbody>
      </table>

      <p>
        「入れたつもりで効いていないキャッシュ」は、複雑さだけを増やします。<Term>測って、効いていなければ外す</Term>のも立派な判断です。
      </p>

      <Analogy label="💡 たとえるなら">
        手元に置く写しです。原本を毎回取りに行かずに済むので速いのですが、原本が書き換わった瞬間、その写しは<Term>間違った情報</Term>に変わります。だから写しには必ず「〇月〇日まで有効」と書いておく。期限のない写しは、いつまでも古い情報を配り続けます。そして期限が全部同じ日だと、その日に全員が一斉に原本を取りに来て窓口が潰れます。期限は少しずつずらしておくのが賢明です。
      </Analogy>

      <Heading num="まとめ">入れる前に、消し方を決める</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>索引とN+1が先</h4>
          <p>整合性を犠牲にする取引。安い手を尽くしてから使う。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>期限を必ず付ける</h4>
          <p>消し漏れは必ず起きる。期限があれば自然に回復する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>落ちても動くように</h4>
          <p>障害は遅くなるだけに留める。ただし前提にした容量設計はしない。</p>
        </Card>
      </CardGrid>

      <p>
        データ層はここまでです。次は、相手が誰かをどう確かめるか ― <Link href="/backend/auth">認証の実装</Link>へ進みます。
      </p>

      <DocsFooter href="/backend/cache" />
    </DocsPage>
  );
}
