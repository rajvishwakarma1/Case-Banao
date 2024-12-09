import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provoder";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";
import { constructMetadata } from "@/lib/utils";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata = constructMetadata();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <body className={recursive.className}>
            <Navbar />
            <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)] dark:bg-[#1E293A]">
              <div className="flex-1 flex flex-col h-full">
                <Provider>
                  {children}
                </Provider>
              </div>
              <Footer />
            </main>
            <Toaster />
          </body>
        </ThemeProvider>
      </head>
    </html>
  );
}
