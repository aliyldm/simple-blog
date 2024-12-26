import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Blog",
  description: "Personal blog and portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <div className="fixed top-0 left-0 right-0 h-[60px] bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-40" />
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/20">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <Link 
              href="/" 
              className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
              scroll={true}
            >
              My Blog
            </Link>
            <div className="space-x-8">
              <Link 
                href="/" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
                scroll={true}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
                scroll={true}
              >
                About
              </Link>
              <Link 
                href="/projects" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
                scroll={true}
              >
                Projects
              </Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
