import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage, Hero, Eyebrow, Lead, Term, Heading, DocsFooter,
  Card, CardGrid, CardNumber, Analogy, Aside, DiagramFrame,
} from "@/components/docs";

export const metadata: Metadata = { title: "ファイルアップロード" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>ファイルアップロード ― サーバーを経由させない</h1>
        <Lead>
          ここまで扱ってきたリクエストは、せいぜい数KBのテキストでした。ファイルは桁が違います ― 数MBから数GB、しかも回線が遅ければ数分かかります。ここでは素朴な方式の限界を見たうえで、実務での本命である<Term>署名付きURL</Term>方式と、避けて通れない検証・配信の注意点を扱います。
        </Lead>
      </Hero>

      <Heading num="01">ファイルが特別な4つの理由</Heading>
      <table>
        <thead>
          <tr><th>性質</th><th>影響</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">大きい</td><td>メモリに全部載せると、数人が同時に送っただけで落ちる</td></tr>
          <tr><td className="hl">時間がかかる</td><td>リクエストが数分続き、途中の機器のタイムアウトに引っかかる</td></tr>
          <tr><td className="hl">中身が信用できない</td><td>拡張子が<code>.jpg</code>でも、中身は実行可能なスクリプトかもしれない</td></tr>
          <tr><td className="hl">保存先が要る</td><td>アプリのディスクに置くと、他の台から読めない</td></tr>
        </tbody>
      </table>

      <p>
        最後の点はとくに重要です。<Term>コンテナやサーバーレスのファイルシステムは一時的なもの</Term>で、入れ替えれば消えます。保存先は最初からオブジェクトストレージ、というのが現在の前提です。
      </p>

      <Heading num="02">素朴な方式とその限界</Heading>
      <p>
        フォームが送る<Term>multipart/form-data</Term>は、テキストの項目とファイルの中身を境界文字列で区切って1つの本文に詰め込む形式です。JSONの解釈では読めないため、専用のミドルウェアを使います。
      </p>

      <pre>
        <code>{`import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,   // 5MB。上限は必ず設定する
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    // 自己申告の種類なので、ここでの判定は一次フィルタでしかない
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    cb(null, allowed.includes(file.mimetype));
  },
});

router.post("/avatar", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ code: "file_required" });
  const url = await storage.put(req.file.buffer, req.file.mimetype);
  res.status(201).json({ url });
});`}</code>
      </pre>

      <p>
        <Term>上限の設定は必須です</Term>。設定しなければ、大きなファイルを送りつけるだけでメモリを枯渇させられます。これはコードの不備というより、<Term>そのまま使える攻撃の入口</Term>です。
      </p>
      <p>
        方式としての限界は明らかで、ファイルが<Term>アプリサーバーを通過する</Term>ため、帯域もメモリも実行時間もアプリが負担します。数MBの画像なら許容できますが、それ以上には向きません。
      </p>

      <Heading num="03">署名付きURL ― 許可証だけを出す</Heading>
      <p>
        実務での本命はこちらです。ブラウザからストレージへ直接送らせ、<Term>アプリサーバーは許可証を発行するだけ</Term>にします。
      </p>

      <DiagramFrame
        slug="backend-upload-presigned"
        aspect="640 / 320"
        caption="署名付きURLを使ったアップロードの流れを示した図。ブラウザがAPIサーバーへ許可を求め、APIサーバーは認証・認可・上限の判定を行ったうえで、短時間だけ有効な署名付きURLを返す。次にブラウザはファイル本体をストレージへ直接送る。この線だけが太く描かれ、本体がAPIサーバーを一切通らないことを示す。最後にブラウザが完了を通知し、APIサーバーは実際のサイズと形式を確認して記録し、重い後処理はジョブキューへ渡す。下部には、完了通知が来ないまま放置されたファイルは孤児として残るため、一定時間ひも付かないものを削除する仕組みが要ることが記されている。"
      />

      <pre>
        <code>{`// ① アップロード先を発行する(ここで認証・認可を効かせる)
router.post("/uploads", requireAuth, async (req, res) => {
  const { contentType, size } = UploadRequestSchema.parse(req.body);
  if (size > MAX_SIZE) return res.status(413).json({ code: "too_large" });

  const key = \`uploads/\${req.user.id}/\${crypto.randomUUID()}\`;

  const url = await getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: env.BUCKET,
      Key: key,
      ContentType: contentType,   // 種類も署名に含めて固定する
    }),
    { expiresIn: 300 },           // 5分だけ有効
  );

  res.json({ uploadUrl: url, key });
});`}</code>
      </pre>

      <p>
        効き目は帯域だけではありません。<Term>許可証を出す時点で、認証も認可も上限の判定も済ませられる</Term>ので、判断はアプリ側に残ったまま、運搬だけを外に出せます。サーバーレスの実行時間やリクエストサイズの制限も、この形なら関係がなくなります。
      </p>
      <p>
        代償は1つ。<Term>アップロードの完了をアプリが自動では知りません</Term>。完了通知を叩かせるか、ストレージ側のイベントで検知します。前者は通知が来ないまま放置される孤児ファイルが生まれるため、一定時間ひも付かないオブジェクトを消す仕組みを合わせて用意します。
      </p>

      <Heading num="04">拡張子もMIMEタイプも自己申告</Heading>
      <p>
        ここが最大の論点です。<code>Content-Type</code>もファイル名の拡張子も、<Term>送信側が自由に書ける値</Term>です。「<code>image/png</code>と書いてあるからPNG」という判断は成立しません。
      </p>

      <table>
        <thead>
          <tr><th>検証</th><th>方法</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">実際の形式</td><td>先頭のバイト列(<Term>マジックナンバー</Term>)を読んで判定する</td></tr>
          <tr><td className="hl">画像として妥当か</td><td>実際にデコードしてみる。失敗すれば不正</td></tr>
          <tr><td className="hl">サイズ</td><td>宣言値ではなく、<strong>受信した実バイト数</strong>で判定する</td></tr>
          <tr><td className="hl">ファイル名</td><td><strong>そのまま使わない</strong>。サーバー側で付け直す</td></tr>
          <tr><td className="hl">ウイルス</td><td>利用者間で共有されるファイルなら、検査を挟む</td></tr>
        </tbody>
      </table>

      <Aside label="ファイル名をそのまま使わない">
        <code>../../etc/passwd</code>のようなファイル名は、上の階層へ抜け出す攻撃の入口です。日本語名や絵文字、長すぎる名前も環境ごとに問題を起こします。保存名は<Term>必ずサーバー側で生成した一意な値</Term>にし、元のファイル名は表示用の文字列としてデータベースに持つだけにします。
      </Aside>

      <Heading num="05">置いた後のほうが危ない</Heading>
      <p>
        アップロードできても、配信の設計を誤ると事故になります。
      </p>

      <table>
        <thead>
          <tr><th>問題</th><th>対処</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">アップロードされたHTMLやSVGが実行される</td><td><strong>別ドメイン</strong>に置く。ダウンロードとして扱わせるヘッダーを付ける</td></tr>
          <tr><td className="hl">URLを知っていれば誰でも見られる</td><td>非公開のものは、閲覧側も署名付きURLを都度発行する</td></tr>
          <tr><td className="hl">URLが推測できる</td><td>連番ではなく、推測できない一意な値を使う</td></tr>
          <tr><td className="hl">中身から種類を推測されて実行される</td><td>推測を止めるヘッダーを付ける</td></tr>
          <tr><td className="hl">帯域の負荷</td><td>配信網を前段に置く</td></tr>
        </tbody>
      </table>

      <p>
        1つ目は見落とされがちです。利用者がアップロードしたSVGにはスクリプトを埋め込めるため、同じドメインで配信するとスクリプト実行が成立します。<Term>利用者のファイルは別ドメイン</Term>が原則です。詳しい攻撃の原理はセキュリティセクションの担当です。
      </p>

      <Heading num="06">後処理はジョブに逃がす</Heading>
      <p>
        サムネイル生成、動画の変換、文字認識、ウイルス検査 ― これらをアップロードのリクエスト内でやってはいけません。<Link href="/backend/jobs">ジョブキュー</Link>に投げ、完了したら状態を更新します。
      </p>

      <pre>
        <code>{`// ④ 完了通知 ― 検証だけ行い、重い処理はキューへ
router.post("/uploads/:key/complete", requireAuth, async (req, res) => {
  const meta = await storage.head(req.params.key);   // 実サイズ・実形式を確認
  assertOwnedBy(req.params.key, req.user.id);        // 他人のキーを弾く

  const asset = await assetRepo.create({
    key: req.params.key,
    status: "processing",
    ownerId: req.user.id,
  });
  await imageQueue.add("thumbnail", { assetId: asset.id });

  res.status(202).json({ id: asset.id, status: asset.status });
});`}</code>
      </pre>

      <p>
        画面側は処理中の間は仮の表示を出し、完了を待ちます。<Link href="/frontend/react-boundary">画面が持つ状態</Link>に「処理中」が1つ増える形です。
      </p>

      <Analogy label="💡 たとえるなら">
        署名付きURLは、宅配便の受け取り指定に似ています。荷物を一度会社の受付に運び込ませ、そこから倉庫へ運び直すのは二度手間です。代わりに受付は「この伝票番号で、5分以内に、この倉庫へ直接持ち込んでよい」という許可証だけを出す。荷物そのものは受付を通りません。ただし<Term>倉庫に届いた箱の中身が伝票どおりとは限らない</Term>ので、開けて確かめる工程は省けません。
      </Analogy>

      <Heading num="まとめ">経由させず、申告を信じない</Heading>
      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>本体はサーバーを通さない</h4>
          <p>許可証の発行と完了の記録に徹する。判断は残し、運搬だけ外に出す。</p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>申告された種類は信じない</h4>
          <p>実バイト列で判定し、保存名はサーバーが生成する。上限は必ず設定する。</p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>利用者のファイルは別ドメイン</h4>
          <p>同じドメインでの配信は事故の入口。非公開なら閲覧も署名付きで。</p>
        </Card>
      </CardGrid>

      <p>
        次は、もう1つの代表的な外部連携である<Link href="/backend/mail">メール送信と通知</Link>を見ていきます。
      </p>

      <DocsFooter href="/backend/upload" />
    </DocsPage>
  );
}
