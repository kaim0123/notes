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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "サーバーサイドキャッシュ",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド &middot; 非同期処理</Eyebrow>
        <h1>サーバーサイドキャッシュ ― 二度目を速くする代償</h1>
        <Lead>
          <Link href="/dev/cache">キャッシュの全体像</Link>で、階層ごとのキャッシュを俯瞰しました。ここではアプリケーションサーバーの中に絞り、<strong>実際にどう実装し、どう壊れるか</strong>を扱います。キャッシュは最も効果の大きい高速化手段であると同時に、<strong>「古いデータが表示され続ける」「たまにしか再現しないバグ」</strong>という最も厄介な不具合の発生源でもあります。入れる前に、消し方を決めるのが鉄則です。
        </Lead>
      </Hero>

      <Heading num="01">その前に ― キャッシュは最後の手段</Heading>
      <p>遅いから即キャッシュ、ではありません。キャッシュは<strong>整合性を犠牲にして速度を買う</strong>取引です。先に検討すべきことが必ずあります。</p>
      <table>
        <thead>
          <tr><th>先に試すこと</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">索引を張る</td><td>フルスキャンが索引スキャンになれば、キャッシュ無しで十分速い</td></tr>
          <tr><td className="hl"><Link href="/dev/backend/data/pool">N+1を潰す</Link></td><td>101回のクエリが2回になれば、それだけで解決することが多い</td></tr>
          <tr><td className="hl">取得する量を減らす</td><td><code>SELECT *</code>をやめる、ページングする</td></tr>
          <tr><td className="hl">クエリを書き直す</td><td>集計を事前計算した列に持たせる、など</td></tr>
        </tbody>
      </table>
      <p>これらを尽くしてなお遅い、あるいは<strong>本質的に重い処理</strong>(外部API、複雑な集計)がある場合に、初めてキャッシュを検討します。</p>

      <Heading num="02">どこに置くか ― プロセス内か、共有か</Heading>
      <table>
        <thead>
          <tr><th>置き場所</th><th>速度</th><th>問題点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">プロセス内メモリ(<code>Map</code>など)</td><td>最速(ネットワーク不要)</td><td><strong>台数分だけ内容がバラつく</strong>。再起動で消える。メモリを圧迫する</td></tr>
          <tr><td className="hl">共有キャッシュ(Redis等)</td><td>速い(ネットワーク1往復)</td><td>運用対象が増える。単一障害点になり得る</td></tr>
          <tr><td className="hl">CDN / リバースプロキシ</td><td>アプリに届かない</td><td>公開コンテンツ限定。個人向けデータには使えない</td></tr>
          <tr><td className="hl">DBのマテリアライズドビュー</td><td>DB内で完結</td><td>更新のタイミング設計が要る</td></tr>
        </tbody>
      </table>
      <p>最も事故が多いのが<strong>プロセス内メモリ</strong>です。手軽なので入れてしまいますが、サーバーが3台あれば3つの独立したキャッシュができます。「更新したのに、リロードすると古い値が出たり新しい値が出たりする」という再現困難な不具合の正体は、ほぼこれです。</p>
      <Aside label="使い分けの基準">
        プロセス内メモリが許されるのは、<strong>ほとんど変わらないデータ</strong>(マスタ、設定、地域コード)で、かつ<strong>数分の遅れが許容できる</strong>場合だけです。それ以外は共有キャッシュを使います。
      </Aside>

      <Heading num="03">基本パターン ― Cache-Aside</Heading>
      <p>実装パターンはいくつかありますが、まず覚えるのは<Term>Cache-Aside(遅延読み込み)</Term>です。アプリが自分でキャッシュを見て、無ければDBから取って入れる、という素直な形です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`async function getProduct(id: string): Promise<Product> {
  const key = \`product:v1:\${id}\`;

  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);        // ヒット

  const product = await productRepo.findById(id); // ミス → 取得
  if (product) {
    // TTL を必ず付ける。付け忘れたキーは永遠に古いまま残る
    await redis.set(key, JSON.stringify(product), "EX", 300);
  }
  return product;
}`}</code>
      </pre>
      <table>
        <thead>
          <tr><th>パターン</th><th>書き込み時の扱い</th><th>特徴</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">Cache-Aside</td><td>更新時にキャッシュを削除する</td><td>最も一般的。障害時もDBから読めば動く</td></tr>
          <tr><td className="hl">Write-Through</td><td>DBとキャッシュを同時に更新する</td><td>常に最新だが、書き込みが遅くなる</td></tr>
          <tr><td className="hl">Write-Behind</td><td>キャッシュに書き、あとでDBへ</td><td>速いが、落ちるとデータが消える。<strong>基本的に避ける</strong></td></tr>
        </tbody>
      </table>
      <p>更新時は<strong>「更新してから削除」</strong>の順です。逆にすると、削除とDB更新の間に別のリクエストが古い値を読んでキャッシュし直してしまいます。</p>

      <Heading num="04">キー設計 ― 名前空間とバージョン</Heading>
      <p>キーの付け方が、後の運用を決めます。</p>
      <table>
        <thead>
          <tr><th>規則</th><th>例</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">種別を前置する</td><td><code>product:123</code></td><td>他のデータと混ざらない。まとめて消せる</td></tr>
          <tr><td className="hl">バージョンを含める</td><td><code>product:v2:123</code></td><td><strong>形式を変えたらv2にする</strong>。古い形式を読んで壊れる事故を防ぐ</td></tr>
          <tr><td className="hl">条件をすべて含める</td><td><code>search:v1:tokyo:page2:ja</code></td><td>含め忘れた条件があると、別の検索結果が返る</td></tr>
          <tr><td className="hl">利用者ごとの分離</td><td><code>user:42:cart</code></td><td><strong>含め忘れると他人のデータが見える</strong>。最悪の事故</td></tr>
        </tbody>
      </table>
      <Aside label="⚠️ 認可の結果をキャッシュしない">
        「この利用者はこの記事を見られるか」の判定結果をキャッシュするときは、キーに利用者IDと権限のバージョンを必ず含めます。含め忘れると、<strong>権限を剥奪された人が見え続ける</strong>、あるいは他人の権限で通ってしまいます。個人情報を含む応答を、利用者を区別しないキーで保存するのは重大な事故です(<Link href="/security/cache">キャッシュ制御</Link>)。
      </Aside>

      <Heading num="05">無効化 ― 2つの難問のうちの1つ</Heading>
      <p>「コンピュータサイエンスの難問は2つ、キャッシュの無効化と名前付けだ」という有名な言葉があります。手段は2つしかありません。</p>
      <table>
        <thead>
          <tr><th>方式</th><th>内容</th><th>性質</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">TTL(時間で失効)</td><td>一定時間後に自動で消える</td><td><strong>単純で壊れにくい</strong>。その代わり最大TTL分だけ古い</td></tr>
          <tr><td className="hl">明示的な削除</td><td>更新処理からキーを消す</td><td>即座に反映される。<strong>消し漏れが起きる</strong></td></tr>
        </tbody>
      </table>
      <p>推奨は<strong>「短めのTTLを基本にし、重要なものだけ明示的に消す」</strong>という併用です。TTLを付けておけば、消し漏れても最悪TTL分で自然回復します ― <strong>TTLの無いキャッシュは、バグが永久に残るキャッシュ</strong>です。</p>
      <p>明示的削除の難しさは、<strong>依存関係</strong>にあります。商品を1件更新したとき、消すべきなのは<code>product:123</code>だけではありません。その商品を含む一覧、検索結果、カテゴリ別の集計 ― すべてが古くなります。これを全部追跡するのは現実的でないため、一覧系は短いTTLに任せ、明示的削除は単体取得に限る、といった割り切りが要ります。</p>

      <Heading num="06">スタンピード ― 同時に失効した瞬間</Heading>
      <p>実運用で最も痛い失敗がこれです。人気のあるキーのTTLが切れた瞬間、<strong>そのキーを待っていた1000件のリクエストが一斉にDBへ流れ込みます</strong>。DBが落ち、復旧してもまた同じことが起きる ― <Term>キャッシュスタンピード</Term>です。</p>
      <table>
        <thead>
          <tr><th>対策</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">TTLをばらつかせる</td><td><code>300 + random(60)</code>秒にする。一斉失効を避ける最も簡単な方法</td></tr>
          <tr><td className="hl">再計算をロックで1本に絞る</td><td>最初の1件だけがDBを読み、他は待つか古い値を返す</td></tr>
          <tr><td className="hl">期限前の先回り更新</td><td>失効が近づいたら、確率的に一部のリクエストだけ再計算させる</td></tr>
          <tr><td className="hl">古い値を返し続ける</td><td>再計算中は期限切れの値を返す(<code>stale-while-revalidate</code>の考え方)</td></tr>
        </tbody>
      </table>
      <p>関連する失敗に、<strong>存在しないIDへの問い合わせ</strong>があります。「該当なし」をキャッシュしないと、存在しないIDを大量に投げるだけでDBに全部素通りします。<strong>空の結果も短いTTLでキャッシュする</strong>のが対策です。</p>

      <Heading num="07">壊れ方を設計する</Heading>
      <p>キャッシュは<strong>落ちても動く</strong>ように組みます。Redisが応答しないときにアプリ全体が止まるなら、それは可用性を下げるために高速化したことになります。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
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
      <p>ただし、<strong>キャッシュ前提でDBを設計してはいけません</strong>。ヒット率99%で運用していたシステムは、キャッシュが飛ぶと平常時の100倍の負荷がDBにかかります。復旧できずに長時間の障害になる、という事例は珍しくありません。</p>

      <Heading num="08">効果を測る</Heading>
      <table>
        <thead>
          <tr><th>指標</th><th>見方</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">ヒット率</td><td><strong>低ければ入れる意味が無い</strong>。50%を切るなら設計を見直す</td></tr>
          <tr><td className="hl">キー数とメモリ使用量</td><td>増え続けていればTTLの付け忘れを疑う</td></tr>
          <tr><td className="hl">追い出し(eviction)件数</td><td>メモリ不足で強制削除されている。容量かTTLの見直し</td></tr>
          <tr><td className="hl">キャッシュ有無での応答時間</td><td>効果が数ミリ秒なら、複雑さに見合わない</td></tr>
        </tbody>
      </table>
      <p>「入れたつもりで効いていないキャッシュ」は、複雑さだけを増やします。<strong>測って、効いていなければ外す</strong>のも立派な判断です。</p>

      <Analogy label="💡 たとえるなら">
        キャッシュは、手元に置く写しです。原本を毎回取りに行かずに済むので速いのですが、原本が書き換わった瞬間、その写しは<strong>間違った情報</strong>に変わります。だから写しには必ず「〇月〇日まで有効」と書いておく(TTL)。有効期限のない写しは、いつまでも古い情報を配り続けます。そして、有効期限が全部同じ日に設定されていると、その日に全員が一斉に原本を取りに来て窓口が潰れます(スタンピード)。期限は少しずつずらしておくのが賢明です。
      </Analogy>

      <Heading num="まとめ">入れる前に、消し方を決める</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>索引とN+1が先</h4><p>キャッシュは整合性を犠牲にする取引。安い手を尽くしてから使う。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>TTLを必ず付ける</h4><p>消し漏れは必ず起きる。TTLがあれば自然回復する。キーには利用者と条件を全部含める。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>落ちても動くように</h4><p>キャッシュ障害は遅くなるだけに留める。ただしキャッシュ前提の容量設計はしない。</p></Card>
      </CardGrid>
      <p>次からは機能実装に移ります。まず、リクエストの扱いが特殊になる<Link href="/dev/backend/upload">ファイルアップロード</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/cache" tag="実装">キャッシュの全体像</RelatedLink>
            <RelatedLink href="/security/cache" tag="セキュリティ">キャッシュ制御</RelatedLink>
            <RelatedLink href="/dev/backend/data/pool" tag="バックエンド">コネクションプールとN+1</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
