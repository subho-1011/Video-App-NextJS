import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { StoreProvider } from "@/app/store-provider";

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
                        <StoreProvider>{children}</StoreProvider>
                    </ThemeProvider>
                </body>
            </html>
        </SessionProvider>
    );
}
