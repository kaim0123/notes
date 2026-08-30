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
  RelatedList,
  RelatedLink,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "ファイルアップロード",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド &middot; 機能実装</Eyebrow>
        <h1>ファイルアップロード ― サーバーを経由させない</h1>
        <Lead>
          <Link href="/dev/backend/express/json">JSON API</Link>で扱ってきたリクエストは、せいぜい数KBのテキストでした。ファイルは桁が違います ― 数MBから数GB、しかも回線が遅ければ数分間かかります。ここでは<Term>multipart/form-data</Term>という形式の理解から始め、<strong>本命である<Term>署名付きURL</Term>方式</strong>、そして避けて通れないセキュリティ上の注意点までを扱います。
        </Lead>
      </Hero>

      <Heading num="01">なぜファイルは特別なのか</Heading>
      <table>
        <thead>
          <tr><th>性質</th><th>影響</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">サイズが大きい</td><td>メモリに全部載せると、同時に数人で送っただけでサーバーが落ちる</td></tr>
          <tr><td className="hl">時間がかかる</td><td>リクエストが数分続く。ロードバランサのタイムアウトに引っかかる</td></tr>
          <tr><td className="hl">中身が信用できない</td><td>拡張子が<code>.jpg</code>でも中身は実行可能なスクリプトかもしれない</td></tr>
          <tr><td className="hl">保存先が要る</td><td>アプリサーバーのディスクに置くと、複数台構成で他の台から読めない</td></tr>
        </tbody>
      </table>
      <p>最後の点は特に重要です。<strong>コンテナやサーバーレスのファイルシステムは一時的なもの</strong>で、再デプロイすれば消えます。ファイルの保存先は最初から<Link href="/cloud/aws/storage/s3">S3</Link>のようなオブジェクトストレージ、というのが現在の標準的な前提です。</p>

      <Heading num="02">multipart/form-data ― 素朴な方式</Heading>
      <p>HTMLの<code>&lt;form enctype=&quot;multipart/form-data&quot;&gt;</code>が送る形式です。テキストの項目とファイルの中身を、境界文字列で区切って1つのボディに詰め込みます。</p>
      <p>Expressでは<code>express.json()</code>では解釈できないため、<code>multer</code>のような専用のミドルウェアを使います。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,   // 5MB。上限は必ず設定する
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    // ここでの判定はあくまで一次フィルタ(自己申告のMIMEタイプなので信用しない)
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
      <p><strong>上限の設定は必須</strong>です。設定しなければ、10GBのファイルを送りつけるだけでサーバーのメモリを枯渇させられます。これはコードの不備というより、<strong>そのまま使えるDoSの入口</strong>です。</p>
      <p>この方式の限界は明らかです。ファイルが<strong>アプリサーバーを通過する</strong>ため、帯域もメモリも実行時間もアプリが負担します。数MB程度の画像なら許容できますが、大きなファイルには向きません。</p>

      <Heading num="03">署名付きURL ― サーバーを経由させない</Heading>
      <p>実務での本命はこちらです。<strong>ブラウザからストレージへ直接アップロードさせ、アプリサーバーは許可証を発行するだけ</strong>にします。</p>
      <Diagram caption="ファイル本体はアプリサーバーを通らない">
        <svg viewBox="0 0 540 200" xmlns="http://www.w3.org/2000/svg">
          <rect x={20} y={75} width={110} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={48} y={105} fill="#f2f2f2" fontSize="12">ブラウザ</text>

          <rect x={215} y={15} width={110} height={50} rx="8" fill="none" stroke="#5f5f5f" strokeWidth="1.5" />
          <text x={240} y={45} fill="#9a9a9a" fontSize="12">API サーバー</text>

          <rect x={410} y={75} width={110} height={50} rx="8" fill="none" stroke="#39ff6a" strokeWidth="1.5" />
          <text x={425} y={105} fill="#f2f2f2" fontSize="12">ストレージ</text>

          <path d="M110 78 l100 -30" stroke="#5f5f5f" strokeWidth="1.2" />
          <text x={110} y={40} fill="#6a6a6a" fontSize="10">① 許可を求める</text>
          <path d="M215 60 l-100 22" stroke="#5f5f5f" strokeWidth="1.2" />
          <text x={112} y={70} fill="#6a6a6a" fontSize="10">② 署名付きURLを返す</text>

          <path d="M130 100 l272 0" stroke="#39ff6a" strokeWidth="2" />
          <path d="M402 100 l-9 -4 v8 z" fill="#39ff6a" />
          <text x={210} y={94} fill="#39ff6a" fontSize="11">③ 本体を直接送る</text>

          <path d="M325 45 l85 35" stroke="#5f5f5f" strokeWidth="1.2" strokeDasharray="3 3" />
          <text x={330} y={165} fill="#6a6a6a" fontSize="10">④ 完了をAPIに通知し、DBにURLを記録する</text>
        </svg>
      </Diagram>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// ① アップロード先を発行する(ここで認証・認可を効かせる)
router.post("/uploads", requireAuth, async (req, res) => {
  const { contentType, size } = UploadRequestSchema.parse(req.body);
  if (size > MAX_SIZE) return res.status(413).json({ code: "too_large" });

  const key = \`uploads/\${req.user.id}/\${crypto.randomUUID()}\`;

  const url = await getSignedUrl(s3, new PutObjectCommand({
    Bucket: env.BUCKET,
    Key: key,
    ContentType: contentType,   // 種類も署名に含めて固定する
  }), { expiresIn: 300 });      // 5分だけ有効

  res.json({ uploadUrl: url, key });
});`}</code>
      </pre>
      <table>
        <thead>
          <tr><th>利点</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">アプリサーバーの帯域・メモリ・実行時間を消費しない</td></tr>
          <tr><td className="hl">サーバーレスの実行時間制限やリクエストサイズ制限を回避できる</td></tr>
          <tr><td className="hl">大容量でも、分割アップロードや再開をストレージ側の機能に任せられる</td></tr>
          <tr><td className="hl">許可証の発行時点で認証・認可・上限の判定ができる</td></tr>
        </tbody>
      </table>
      <p>注意点は、<strong>アップロードの完了をアプリが自動では知らない</strong>ことです。完了通知のAPIを叩かせるか、ストレージ側のイベント通知(S3イベント → <Link href="/dev/backend/jobs">ジョブ</Link>)で検知します。前者は通知が来ないまま放置される「孤児ファイル」が生まれるため、<strong>一定時間ひも付かないオブジェクトを削除する仕組み</strong>をあわせて用意します。</p>

      <Heading num="04">検証 ― 拡張子もMIMEタイプも自己申告</Heading>
      <p>ここが最大のセキュリティ上の論点です。<code>Content-Type</code>ヘッダーもファイル名の拡張子も、<strong>送信側が自由に書ける値</strong>です。「<code>image/png</code>と書いてあるからPNG」という判断は成立しません。</p>
      <table>
        <thead>
          <tr><th>検証</th><th>方法</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">実際の形式</td><td>先頭のバイト列(<Term>マジックナンバー</Term>)を読んで判定する</td></tr>
          <tr><td className="hl">画像として妥当か</td><td>画像処理ライブラリで実際にデコードしてみる。失敗すれば不正</td></tr>
          <tr><td className="hl">サイズ</td><td>宣言値ではなく、<strong>受信した実バイト数</strong>で判定する</td></tr>
          <tr><td className="hl">ファイル名</td><td><strong>そのまま使わない</strong>。UUIDを付け直す</td></tr>
          <tr><td className="hl">ウイルス</td><td>利用者間で共有されるファイルならスキャンを挟む</td></tr>
        </tbody>
      </table>
      <Aside label="⚠️ ファイル名をそのまま使わない">
        <code>../../etc/passwd</code>のようなファイル名は<Term>パストラバーサル</Term>の入口です。また日本語名や絵文字、長すぎる名前も環境ごとに問題を起こします。保存名は<strong>必ずサーバー側で生成したUUID</strong>にし、元のファイル名は「表示用の文字列」としてDBに持つだけにします。
      </Aside>

      <Heading num="05">配信 ― 置いた後の方が危ない</Heading>
      <p>アップロードできても、配信の設計を誤ると事故になります。</p>
      <table>
        <thead>
          <tr><th>問題</th><th>対処</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">アップロードされたHTMLやSVGが実行される</td><td>同一オリジンで配信しない。<strong>別ドメイン</strong>に置き、<code>Content-Disposition: attachment</code>や<code>Content-Security-Policy</code>を付ける</td></tr>
          <tr><td className="hl">URLを知っていれば誰でも見られる</td><td>非公開ファイルはバケットを非公開にし、<strong>閲覧用の署名付きURL</strong>を都度発行する</td></tr>
          <tr><td className="hl">推測可能なURL</td><td>連番ではなくUUIDを使う</td></tr>
          <tr><td className="hl">MIMEタイプの推測による実行</td><td><code>X-Content-Type-Options: nosniff</code>を付ける(<Link href="/security/headers">セキュリティヘッダ</Link>)</td></tr>
          <tr><td className="hl">帯域の負荷</td><td><Link href="/cloud/aws/network/cloudfront">CDN</Link>を前段に置く</td></tr>
        </tbody>
      </table>
      <p>特に1つ目は見落とされがちです。利用者がアップロードしたSVGファイルにはスクリプトを埋め込めるため、同じドメインで配信すると<Link href="/security/xss">XSS</Link>が成立します。<strong>利用者コンテンツは別ドメイン</strong>が原則です。</p>

      <Heading num="06">後処理はジョブに逃がす</Heading>
      <p>サムネイル生成、動画のトランスコード、OCR、ウイルススキャン ― これらをアップロードのリクエスト内でやってはいけません。<Link href="/dev/backend/jobs">ジョブキュー</Link>に投げ、完了したらDBの状態を<code>processing</code>から<code>ready</code>に更新します。</p>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 px-[18px] text-[0.85rem] leading-relaxed">
        <code>{`// ④ 完了通知 ― 検証だけ行い、重い処理はキューへ
router.post("/uploads/:key/complete", requireAuth, async (req, res) => {
  const meta = await storage.head(req.params.key);   // 実サイズ・実形式を確認
  assertOwnedBy(req.params.key, req.user.id);        // 他人のキーを弾く

  const asset = await assetRepo.create({ key, status: "processing", ownerId: req.user.id });
  await imageQueue.add("thumbnail", { assetId: asset.id });

  res.status(202).json({ id: asset.id, status: asset.status });
});`}</code>
      </pre>
      <p>UI側は<code>processing</code>の間はプレースホルダを表示し、完了を待ちます。<Link href="/dev/frontend/react/boundary">4つの状態</Link>のうち「処理中」が1つ増える形です。</p>

      <Analogy label="💡 たとえるなら">
        署名付きURL方式は、宅配便の受け取り指定に似ています。荷物を一度会社の受付(APIサーバー)に運び込ませて、そこから倉庫へ運び直すのは二度手間です。代わりに受付は「この伝票番号で、5分以内に、この倉庫へ直接持ち込んでよい」という許可証だけを出す。荷物そのものは受付を通りません。ただし倉庫に届いた箱の中身が伝票どおりとは限らないので、<strong>開けて確かめる</strong>工程は省けません。
      </Analogy>

      <Heading num="まとめ">経由させず、申告を信じない</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>本体はサーバーを通さない</h4><p>署名付きURLで直接ストレージへ。APIは許可証の発行と完了の記録に徹する。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>拡張子もMIMEも自己申告</h4><p>実バイト列で判定し、保存名はサーバーが生成する。上限は必ず設定する。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>利用者ファイルは別ドメイン</h4><p>同一オリジン配信はXSSの入口。非公開なら閲覧も署名付きURLで。</p></Card>
      </CardGrid>
      <p>次は、もう1つの代表的な外部連携である<Link href="/dev/backend/mail">メール送信と通知</Link>を見ていきます。</p>

      <DocsFooter
        related={
          <RelatedList>
            <RelatedLink href="/cloud/aws/storage/s3" tag="クラウド">S3</RelatedLink>
            <RelatedLink href="/security/xss" tag="セキュリティ">XSSと出力エスケープ</RelatedLink>
            <RelatedLink href="/dev/backend/jobs" tag="バックエンド">ジョブキューとワーカー</RelatedLink>
          </RelatedList>
        }
      />
    </DocsPage>
  );
}
