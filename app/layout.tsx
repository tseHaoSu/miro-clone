import { ConvexClientProvider } from "@/providers/convex-client-provider";
import {
  SignedIn as Authenticated,
  SignIn,
  SignedOut as Unauthenticated,
} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";

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
            <Authenticated>
              <Toaster />
              <ModalProvider />
              {children}
            </Authenticated>
            <Unauthenticated>
              <div className="flex flex-col items-center justify-center min-h-screen">
                <SignIn routing="hash" />
              </div>
            </Unauthenticated>
          </main>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
