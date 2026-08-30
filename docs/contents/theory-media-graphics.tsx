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
  title: "色・解像度・グラフィックス応用",
};

export default function Page() {
  return (
    <DocsPage>
      <Hero>
        <Eyebrow>情報メディア</Eyebrow>
        <h1>色・解像度・グラフィックス応用 ― 色の作り方とその先</h1>
        <Lead>
          デジタルの色は、いくつかの原色を混ぜて作られます。ここでは、光で作る色と絵の具で作る色の違い、色の細かさを表す階調、そしてCGやAR/VRといったグラフィックスの応用までを俯瞰します。
        </Lead>
      </Hero>

      <Heading num="01">色の作り方 ― 加法混色と減法混色</Heading>
      <p>色の作り方には、混ぜるほど明るくなる方式と、混ぜるほど暗くなる方式の2つがあります。</p>
      <table>
        <thead>
          <tr><th></th><th>加法混色</th><th>減法混色</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">原色</td><td>光の3原色 <Term>RGB</Term>(赤・緑・青)</td><td>色の3原色 <Term>CMY</Term>(シアン・マゼンタ・イエロー)</td></tr>
          <tr><td className="hl">混ぜると</td><td>明るくなり、3色すべてで白</td><td>暗くなり、3色すべてで黒(に近い)</td></tr>
          <tr><td className="hl">使われる場面</td><td>ディスプレイ・テレビなど発光する画面</td><td>印刷・絵の具など光を反射するもの</td></tr>
        </tbody>
      </table>
      <p>画面が光で色を作る(加法混色・RGB)のに対し、印刷はインクが光を吸収して色を作ります(減法混色・CMY)。印刷では黒を鮮明にするため、CMYに黒(K)を加えた<Term>CMYK</Term>が使われます。同じ画像でも、画面と印刷で色みが変わるのはこの原理の違いによります。</p>

      <Analogy label="💡 たとえるなら">
        加法混色は「暗い舞台に赤・緑・青のスポットライトを重ねる」ようなもので、重ねるほど明るくなります。減法混色は「白い紙に絵の具を塗り重ねる」ようなもので、重ねるほど暗くにごっていきます。
      </Analogy>

      <Heading num="02">階調と解像度 ― 色と細かさの段階</Heading>
      <p>1つの画素が表せる色の段階数を<Term>階調</Term>と呼びます。RGBそれぞれを何ビットで表すかで色数が決まり、各8ビット(256段階)なら約1677万色(フルカラー)を表現できます。階調が多いほど、グラデーションがなめらかになります。</p>
      <p>画像の細かさを表す<Term>解像度</Term>(<Term>dpi</Term>・<Term>ppi</Term>)については「<Link href="/theory/media/image">画像フォーマット</Link>」でも触れました。階調(色の深さ)と解像度(画素の密度)は別の軸で、両方が高いほど高品質になります。画像編集では、要素を透明なシートのように重ねて管理する<Term>レイヤー</Term>がよく使われます。</p>

      <Heading num="03">グラフィックスの応用 ― CG・CAD・XR</Heading>
      <p>コンピュータで画像を生成・加工する技術は、さまざまな分野に応用されています。</p>
      <table>
        <thead>
          <tr><th>用語</th><th>内容</th></tr>
        </thead>
        <tbody>
          <tr><td className="hl">CG(コンピュータグラフィックス)</td><td>コンピュータで生成した画像・映像。3DCGなど</td></tr>
          <tr><td className="hl">CAD</td><td>設計・製図をコンピュータで行う。建築・機械設計など</td></tr>
          <tr><td className="hl">モーションキャプチャ</td><td>人や物の動きを記録し、CGキャラクターの動きに反映する</td></tr>
          <tr><td className="hl">VR(仮想現実)</td><td>コンピュータが作った仮想空間に没入する</td></tr>
          <tr><td className="hl">AR(拡張現実)</td><td>現実の風景にデジタル情報を重ねて表示する</td></tr>
          <tr><td className="hl">MR(複合現実)</td><td>現実と仮想を融合し、相互に作用させる</td></tr>
        </tbody>
      </table>
      <p>VR・AR・MRを総称して<Term>XR</Term>と呼びます。これらの技術が作る、多人数が共有する仮想空間が<Term>メタバース</Term>です。</p>

      <Heading num="まとめ">色・段階・応用</Heading>
      <CardGrid>
        <Card><CardNumber>1</CardNumber><h4>画面はRGB、印刷はCMY(K)</h4><p>光で作る加法混色と、インクで作る減法混色は原理が逆です。</p></Card>
        <Card><CardNumber>2</CardNumber><h4>階調は色の段階、解像度は画素の密度</h4><p>別々の軸で、両方が高いほど高品質になります。</p></Card>
        <Card><CardNumber>3</CardNumber><h4>CG・CAD・XRへ応用が広がる</h4><p>VR・AR・MR(XR)やメタバースへと発展しています。</p></Card>
      </CardGrid>

      <DocsFooter
        related={
          <RelatedList>
                    <RelatedLink href="/theory/media/image" tag="情報メディア">画像フォーマット</RelatedLink>
                    <RelatedLink href="/theory/media/basics" tag="情報メディア">マルチメディアの全体像</RelatedLink>
                    <RelatedLink href="/theory/media/compression" tag="情報メディア">圧縮の考え方</RelatedLink>
                  </RelatedList>
        }
      />
    </DocsPage>
  );
}
