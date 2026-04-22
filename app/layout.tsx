import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BidWon â€” AI Contract Discovery",
  description: "AI-powered SAM.gov bid assistant for certified small businesses",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
