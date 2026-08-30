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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Ref",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>開発 &middot; フレームワーク &middot; React &middot; Hooks</Eyebrow>
        <h1>Ref ― 再描画を起こさない可変の箱、宣言的モデルの脱出口</h1>
        <Lead>
          <code>useRef</code>は、<Link href="/dev/frontend/react/state">state</Link>とは対照的なフックです。stateは「変わったら再描画したい値」でしたが、refは「変えても再描画したくない値」や「DOM要素そのもの」を保持します。Reactの「UI = f(state)」という宣言的モデルの<Term>外</Term>に出て、命令的に何かへ触れるための<Term>脱出口(escape hatch)</Term>です。だからこそ、必要な場面に絞って使います。
        </Lead>
      </Hero>

      <Heading num="01">useRef ― 再描画をまたぐ可変の箱</Heading>
      <p><code>useRef</code>が返すのは、<code>.current</code>プロパティを持つオブジェクトです。<code>.current</code>を書き換えても<Term>再描画は起きず</Term>、しかし再描画をまたいで値は保持されます。「描画には関係ないが、覚えておきたい値」― タイマーID、直前の値、外部ライブラリのインスタンスなど ― の置き場所です。</p>
      <table>
        <thead>
          <tr><th></th><th>useState</th><th>useRef</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">変更すると</td><td>再描画が起きる</td><td>再描画は起きない</td></tr>
          <tr><td className="hl">再描画をまたいで</td><td>保持される</td><td>保持される</td></tr>
          <tr><td className="hl">用途</td><td>画面に映る値</td><td>画面に映さない値・DOM参照</td></tr>
        </tbody>
      </table>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`const timerRef = useRef<number | null>(null);
timerRef.current = setInterval(tick, 1000); // 書き換えても再描画されない`}</code>
      </pre>

      <Heading num="02">DOM要素への参照</Heading>
      <p>refの最も一般的な用途は、実際のDOM要素に直接触ることです。要素の<code>ref</code>属性にrefを渡すと、マウント後に<code>.current</code>へそのDOMノードが入ります。フォーカスの移動・スクロール位置の操作・要素サイズの計測など、Reactの宣言的APIでは表現しづらい命令的な操作に使います。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();  // マウント後に自動フォーカス
  }, []);
  return <input ref={inputRef} />;
}`}</code>
      </pre>

      <Heading num="03">refを子コンポーネントへ渡す（forwardRef）</Heading>
      <p>自作コンポーネントに<code>ref</code>を渡しても、そのままでは内部のDOMには届きません。従来は<code>forwardRef</code>でrefを受け取り、内部の要素へ転送していました。React 19以降は、関数コンポーネントが<code>ref</code>を<Term>通常のprops</Term>として直接受け取れるようになり、<code>forwardRef</code>のラップは不要になりました。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// React 19+: ref を普通の props として受け取れる
function TextInput({ ref, ...props }: React.ComponentProps<"input">) {
  return <input ref={ref} {...props} />;
}

// 従来(〜React 18): forwardRef でラップしていた
const TextInput = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <input ref={ref} {...props} />
));`}</code>
      </pre>

      <Heading num="04">useImperativeHandle ― 命令的APIを最小限だけ公開する</Heading>
      <p>親に「DOMそのもの」ではなく「特定の操作だけ」を公開したいときは、<code>useImperativeHandle</code>を使います。refを通じて呼べるメソッドを絞って定義することで、内部実装を隠しつつ<code>focus()</code>や<code>scrollToTop()</code>のような命令的な操作口だけを外に出せます。公開する操作は本当に必要なものだけに絞るのが原則です。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`function Modal({ ref }: { ref: React.Ref<{ open: () => void }> }) {
  const [visible, setVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),   // open だけを公開、内部stateは隠す
  }));
  return visible ? <div className="modal">...</div> : null;
}`}</code>
      </pre>

      <Heading num="05">refはあくまで脱出口</Heading>
      <p>refは便利ですが、使いすぎるとReactの宣言的モデルから外れ、「今の状態から画面が決まる」という追いやすさを損ないます。<Term>画面に反映したい値はstate、命令的にDOMや外部を触るときだけref</Term>、と線を引きます。「stateで書けないか」をまず考え、それでも命令的操作が避けられない場合の脱出口として使うのが健全です。</p>

      <Analogy label="💡 たとえるなら">
        stateが「掲示板 ― 書き換えると全員に見える」なら、refは「手帳のメモ ― 自分だけが持ち、書き換えても誰にも通知しない」ものです。DOMへのrefは、Reactという設計図の世界から一歩出て、現場の建材(実際のDOM)に直接触れる作業口。便利ですが、現場を直接いじりすぎると設計図と実物がずれていくので、触るのは本当に必要なときだけにします。
      </Analogy>

      <Heading num="まとめ">映さない値・DOMに触れるための限定ツール</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>再描画しない可変の箱</h4><p>タイマーIDなど「覚えたいが映さない値」を.currentに持つ。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>DOMに直接触れる</h4><p>フォーカス・計測など命令的操作に。React 19はrefをpropsで受け取れる。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>公開は最小限に</h4><p>useImperativeHandleで必要な操作だけ出す。まずstateで書けないか考える。</p></Card>
      </CardGrid>
      <p>ここまでで基本のフックが揃いました。次は、再描画のコストを抑える<Link href="/dev/frontend/react/performance">メモ化とパフォーマンス</Link>を見ます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/dev/frontend/react/performance" tag="開発">メモ化とパフォーマンス</RelatedLink>
            <RelatedLink href="/dev/frontend/react/forms" tag="開発">フォームの値を管理する</RelatedLink>
            <RelatedLink href="/dev/frontend/react/effects" tag="開発">副作用（Effects）</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
