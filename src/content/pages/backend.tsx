import Link from "next/link";
import type { Metadata } from "next";
import {
  DocsPage,
  Hero,
  Eyebrow,
  Lead,
  Term,
  DocsFooter,
  Card,
  CardGrid,
  CardNumber,
} from "@/components/docs";

export const metadata: Metadata = { title: "バックエンド" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>バックエンド</Eyebrow>
        <h1>バックエンド</h1>
        <Lead>
          画面の向こう側で<Term>リクエストを受け取り、データを返す側の実装</Term>を扱うセクションです。外に向けた窓口をどう決めるかから始めて、受けた依頼をコードの中でどう配り、データをどう読み書きし、相手が誰かをどう確かめ、落ちない形でどう動かし続けるか、という順に降りていきます。最後にNode.jsとExpressという具体的な道具で、それらを実際のコードとして書きます。データベースそのものは<Link href="/database">データベース</Link>セクション、本番のサーバーやネットワークの用意は<Link href="/infra">インフラ</Link>セクション、攻撃と暗号の原理は<Link href="/security">セキュリティ</Link>セクションの担当です。
        </Lead>
      </Hero>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>
            <Link href="/backend/api">API</Link>
          </h4>
          <p>
            外に向けた窓口をどう決めるか。方式の選択、RESTの作法、契約の固定と廃止まで。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>
            <Link href="/backend/layers">アプリケーションの組み立て</Link>
          </h4>
          <p>
            受けた依頼をコードの中でどう配るか。層の分け方と、よくある機能の置きどころ。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>
            <Link href="/backend/data">データ層</Link>
          </h4>
          <p>
            どこまでを一括りに扱うか(トランザクション)、接続をどう使い回すか、スキーマをどう変えるか。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>
            <Link href="/backend/auth">認証の実装</Link>
          </h4>
          <p>
            相手が誰かをどう確かめ、その証をどう持ち回るか。外部IdPへの委譲とアカウント回復。
          </p>
        </Card>
        <Card>
          <CardNumber>5</CardNumber>
          <h4>
            <Link href="/backend/ops">本番運用</Link>
          </h4>
          <p>
            落ちないための設計。流量を絞る、諦める、安全に止める、追えるようにする。
          </p>
        </Card>
        <Card>
          <CardNumber>6</CardNumber>
          <h4>
            <Link href="/backend/express">Node.js・Express</Link>
          </h4>
          <p>
            ここまでの判断を実際のコードにする。最小のサーバーからデータベース連携まで。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/backend" />
    </DocsPage>
  );
}
