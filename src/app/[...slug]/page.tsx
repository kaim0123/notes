import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routes } from "@/content/routes";

// output: "export" では未定義のURLを確実に404にするため必須。
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(routes).map((urlPath) => ({
    slug: urlPath.split("/").filter(Boolean),
  }));
}

function toUrlPath(slug: string[]) {
  return "/" + slug.join("/");
}

// 静的な metadata export とは共存できないため generateMetadata を使う。
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = routes[toUrlPath(slug)];
  if (!entry) return {};
  const mod = await entry.load();
  return mod.metadata ?? {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const entry = routes[toUrlPath(slug)];
  if (!entry) notFound();
  const mod = await entry.load();
  const Content = mod.default;
  return <Content />;
}
