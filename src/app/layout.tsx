import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "uOttawa CSSA - Welcome",
  description: "Welcome to uOttawa from the uOttahack team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-mono antialiased">
        {children}
      </body>
    </html>
  );
}
