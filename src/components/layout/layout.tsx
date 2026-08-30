import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "notes",
  description: "個人の学習内容をまとめる知識サイト",
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full" suppressHydrationWarning>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <AppHeader />
            {/* data-pagefind-body: 検索対象を本文だけに絞る(サイドバー等を除外)。 */}
            <main
              data-pagefind-body
              className="flex min-w-0 flex-1 flex-col pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0"
            >
              {children}
            </main>
          </SidebarInset>
          <MobileBottomNav />
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
