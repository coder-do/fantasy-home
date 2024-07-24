import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { LoginProvider } from "./context/loginContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fantasy Home",
  description: "Fantasy Home",
  keywords: 'Fantasy Home Responsive web template, Bootstrap Web Templates, Flat Web Templates, Android Compatible web template, Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, Sony Ericsson, Motorola web design'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LoginProvider>
      <html lang="en">
        <head>
          <link href="//fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" />
          <link href="//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet" />
        </head>
        <body className={inter.className}>
          {children}
          <Script src="/js/bootstrap-3.1.1.min.js" strategy="beforeInteractive" />
          <Script src="/js/easing.js" />
          <Script src="/js/jquery-2.1.4.min.js" strategy="beforeInteractive" />
          <Script src="/js/jquery.countup.js" strategy="beforeInteractive" />
          <Script src="/js/jquery.waypoints.min.js" strategy="beforeInteractive" />
          <Script src="/js/main.js" strategy="beforeInteractive" />
          <Script src="/js/modernizr.js" strategy="beforeInteractive" />
          <Script src="/js/move-top.js" strategy="beforeInteractive" />
          <Script src="/js/simpleLightbox.js" strategy="beforeInteractive" />
          <Script src="/js/SmoothScroll.min.js" strategy="beforeInteractive" />
        </body>
      </html>
    </LoginProvider>
  );
}
