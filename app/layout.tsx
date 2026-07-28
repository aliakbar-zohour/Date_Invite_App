import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const yekanBakh = localFont({
  src: [
    {
      path: "../public/fonts/YekanBakhFaNum-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/YekanBakhFaNum-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/YekanBakhFaNum-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/YekanBakhFaNum-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/YekanBakhFaNum-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/YekanBakhFaNum-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/YekanBakhFaNum-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-yekan",
  display: "swap",
});

export const metadata: Metadata = {
  title: "با من میای سر قرار؟",
  description: "یه سوال ساده… و یه جواب درست ❤️",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#e85a71",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${yekanBakh.variable} h-full`}>
      <body className={`${yekanBakh.className} min-h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
