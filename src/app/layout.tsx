import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "@/components/theme-provider";

import Header from "@/components/layout/header";
import Sider from "@/components/layout/sider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Video App",
    description: "This is a video app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionProvider>
            <html lang="en">
                <body className={cn("min-h-screen w-full flex flex-col items-center", inter.className)}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <Header />
                        <div className="w-full flex flex-1 justify-between">
                            <Sider />
                            <main className="w-full py-4 px-2 sm:p-8">{children}</main>
                        </div>
                    </ThemeProvider>
                </body>
            </html>
        </SessionProvider>
    );
}
