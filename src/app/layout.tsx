import type { Metadata } from "next";
import "./globals.css";
import Gnb from "@/components/styles/gnb";

export const metadata: Metadata = {
  title: "Todo List",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Gnb />
        {children}
      </body>
    </html>
  );
}
