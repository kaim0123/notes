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

export const metadata: Metadata = { title: "セキュリティ" };

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>セキュリティ</Eyebrow>
        <h1>セキュリティ</h1>
        <Lead>
          <Term>攻撃者が何を狙い、こちらは何をどこで止めるか</Term>を並べるセクションです。まず守る目的 ― 機密性・完全性・可用性 ― を決め、どのリスクにいくら払うかを組織の判断として置きます。そのうえで攻める側の手口を狙い別に俯瞰し、通信の土台になる暗号、入口を固める認証・認可、そして機器と運用による配置へと進みます。手口の暗記ではなく<strong>どこに手を打てばよいかの対応づけ</strong>を作る構成です。テストで穴を探す側は<Link href="/test">テスト</Link>、認証の実装手順は<Link href="/backend">バックエンド</Link>が担当します。
        </Lead>
      </Hero>

      <CardGrid>
        <Card>
          <CardNumber>1</CardNumber>
          <h4>
            <Link href="/security/basics">情報セキュリティの目的と脅威</Link>
          </h4>
          <p>
            何が守れていれば守れたと言えるのか。CIAの3本、リスクの掛け算、層ごとに違う壁。
          </p>
        </Card>
        <Card>
          <CardNumber>2</CardNumber>
          <h4>
            <Link href="/security/management">リスクマネジメント</Link>
          </h4>
          <p>
            どこまでやるかを先に決める。洗い出しと評価、4つの対応、事故が起きたあとの動き方。
          </p>
        </Card>
        <Card>
          <CardNumber>3</CardNumber>
          <h4>
            <Link href="/security/attacks">攻撃手法</Link>
          </h4>
          <p>
            何を狙い、どこから手を入れるか。段取りとしての侵害、認証破り、通信への割り込み、入力の命令化。
          </p>
        </Card>
        <Card>
          <CardNumber>4</CardNumber>
          <h4>
            <Link href="/security/crypto">暗号技術</Link>
          </h4>
          <p>
            経路が信用できなくても成り立つ仕組み。鍵配送問題、公開鍵と署名、証明書、そして次の脅威。
          </p>
        </Card>
        <Card>
          <CardNumber>5</CardNumber>
          <h4>
            <Link href="/security/auth">認証・認可</Link>
          </h4>
          <p>
            誰かを確かめ、何をしてよいかを決める。3要素と多要素、パスワードの預かり方、状態の持ち回り。
          </p>
        </Card>
        <Card>
          <CardNumber>6</CardNumber>
          <h4>
            <Link href="/security/countermeasures">セキュリティ対策・実装</Link>
          </h4>
          <p>
            経路のどこに何を置くか。境界・通信・運用の3面と、内側が定義できなくなった先のゼロトラスト。
          </p>
        </Card>
      </CardGrid>

      <DocsFooter href="/security" />
    </DocsPage>
  );
}
