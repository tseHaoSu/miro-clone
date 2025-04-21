import { ConvexClientProvider } from "@/providers/convex-client-provider";
import {
  SignedIn as Authenticated,
  SignInButton,
  SignedOut as Unauthenticated
} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Miro Clone",
  description: "A collaborative whiteboard application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ConvexClientProvider>
          <main>
            <Authenticated>{children}</Authenticated>
            <Unauthenticated>
              <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] gap-4">
                <h2 className="text-2xl font-medium">Welcome to Miro Clone</h2>
                <p className="text-muted-foreground mb-4">
                  Please sign in to continue
                </p>
                <SignInButton mode="modal">
                  <button className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                    Sign In
                  </button>
                </SignInButton>
              </div>
            </Unauthenticated>
          </main>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
