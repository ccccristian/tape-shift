import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto_Mono } from 'next/font/google'
import "./globals.css";
 
// Font files can be colocated inside of `pages`
const mainFont = Roboto_Mono({
  subsets: ['cyrillic'],
  variable: '--mainFont',
  weight: ['400', '500', '700']
})
const secondaryFont = localFont({ 
  src: './fonts/ocr-b.ttf',
  variable: '--secFont'
 })
export const metadata: Metadata = {
  title: "TapeShift - Online Video Converter",
  description: "Online video converter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mainFont.variable} ${secondaryFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
