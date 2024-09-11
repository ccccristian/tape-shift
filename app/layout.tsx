import type { Metadata } from "next"
import { mainFont, secondaryFont } from '@/app/fonts/fonts'
import "./buttons.css"
import "./globals.css"

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
