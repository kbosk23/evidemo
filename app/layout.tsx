import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, BarChart, Users } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reading Road",
  description: "Interactive voice-based reading tutor powered by Hume AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {/* Header with Logo and Navigation */}
          <header className="bg-white border-b sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="https://letter-trace-app.azurewebsites.net/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Image
                    src="/reading-road-logo.png"
                    alt="Reading Road"
                    width={60}
                    height={60}
                    className="h-15 w-auto"
                    priority
                  />
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-6">
                  <Link 
                    href="/dashboard/learner" 
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Learner</span>
                  </Link>
                  <Link 
                    href="/dashboard/instructor" 
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Users className="h-4 w-4" />
                    <span>Instructor</span>
                  </Link>
                  <Link 
                    href="/dashboard/ell-parent" 
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Users className="h-4 w-4" />
                    <span>Parent Dashboard</span>
                  </Link>
                  <Link 
                    href="/dashboard/analytics" 
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <BarChart className="h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </nav>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
