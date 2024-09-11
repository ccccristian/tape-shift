import localFont from "next/font/local"
import { Roboto_Mono } from "next/font/google"

export const mainFont = Roboto_Mono({
    subsets: ['cyrillic'],
    variable: '--mainFont',
    weight: ['400', '500', '700']
  })
export const secondaryFont = localFont({ 
src: './ocr-b.ttf',
variable: '--secFont'
})