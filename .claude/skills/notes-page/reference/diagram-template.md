# 図解HTMLの雛形

保存先は `src/content/diagrams/<slug>.html`。既存350枚すべてがこの `<style>` ブロックを共有しているので、**変更せずそのままコピーする**。変えるのは `viewBox` と `<svg>` の中身だけ。

## 雛形

```html
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      :root {
        --bg: oklch(0 0 0);
        --fg: oklch(1 0 0);
        --card: oklch(0.12 0 0);
        --muted: oklch(0.7 0 0);
        --border: oklch(1 0 0 / 14%);
        --primary: oklch(0.85 0.29 142);
        --primary-fg: oklch(0 0 0);
      }
      * {
        box-sizing: border-box;
      }
      html,
      body {
        margin: 0;
        height: 100%;
        background: var(--bg);
      }
      body {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
      }
      svg {
        width: 100%;
        height: auto;
        max-height: 100%;
        font-family:
          -apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN",
          "Hiragino Sans", "Yu Gothic", Meiryo, sans-serif;
      }
      svg text {
        fill: var(--fg);
      }
      .mono {
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      }
      .muted {
        fill: var(--muted);
      }
      .accent {
        fill: var(--primary);
      }
    </style>
  </head>
  <body>
    <div style="width: 100%">
      <svg
        viewBox="0 0 640 300"
        role="img"
        aria-label="(この図が何を示しているかを文章で。単語の羅列にしない)"
      >
        <defs>
          <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--muted)" />
          </marker>
          <marker id="arp" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--primary)" />
          </marker>
        </defs>

        <!-- ここに図を描く -->
      </svg>
    </div>
  </body>
</html>
```

## パレットの使い分け

`globals.css` のトークンと対応している。**データ区分用の多色パレットは持たない**(緑1色+グレースケール)。

| 変数 | 使いどころ |
|---|---|
| `--bg` | 背景(bodyが敷く。図の中で塗り直さない) |
| `--card` | ノード・ボックスの塗り |
| `--border` | 枠線・矢印以外の線・区切り |
| `--fg` | 通常のテキスト |
| `--muted` (`.muted`) | 補足ラベル・添字・凡例 |
| `--primary` (`.accent`) | **強調1箇所**。図の主役・注目させたい経路 |
| `--primary-fg` | `--primary` で塗った面の上に載せる文字 |

緑を塗り過ぎると強調が消える。1枚につき「ここを見てほしい」1系統だけに使う。

## 描くときの決まり

- **JSは動かない**(`sandbox=""` で埋め込まれる)。アニメーション・`<script>`・インタラクションは不可。
- **外部依存なし**。CDN・Webフォント・外部画像を参照しない。フォントは雛形のシステムフォントスタック。
- 文字サイズは12〜18px程度(viewBox座標系)。11px未満は縮小表示で潰れる。
- テキストは `text-anchor="middle"` などで明示的に揃える。図形からはみ出さないよう、ノード幅は文字数から逆算する。
- 矢印は `marker-end="url(#ar)"`(通常)/ `url(#arp)`(強調)。
- 角丸は `rx="6"`〜`rx="8"`(`--radius` 0.5rem 系のスケールに合わせる)。
- viewBoxの外に要素を置かない。描き終えたら、最小・最大のx/y座標がviewBox内に収まっているか確認する。
- 幅は640を基準に、横に広い比較図なら760〜820。高さは内容次第で260〜340が目安。

## 埋め込み

ページ側の `aspect` は viewBox と同じ比にする。ずれると図が縦に潰れる/余白が出る。

```tsx
// viewBox="0 0 640 300" なら
<DiagramFrame slug="..." aspect="640 / 300" caption="…" />
```

## 図にする価値があるか

文章で足りるものを図にしない。逆に、次が本文に出てきたら図を検討する(`03_diagram-policy.md`)。

- 構造・階層(層、木、包含関係)
- フロー(処理の順序、リクエストの経路)
- 状態遷移
- 比較(2つの方式の違いを並べる)
- 対応関係(同じものの2つの表現 ― 木と配列、URLとファイル、など)
