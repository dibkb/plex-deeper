import type { Metadata } from "next";
import { geistSans, geistMono } from "@/lib/fonts";
import "./globals.css";
import { Providers } from "./providers";
import { ModeToggle } from "@/src/components/theme-toggle";

export const metadata: Metadata = {
  title: "Query X",
  description: "Blazing fast AI search engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Providers>
            <ModeToggle />
            <main className="w-full h-screen">{children}</main>
          </Providers>
        </body>
      </html>
    </>
  );
}
