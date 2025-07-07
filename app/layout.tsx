import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { ReduxProvider } from "@/components/providers/redux-provider"

export const metadata: Metadata = {
  title: "فروشگاه مدرن - تجربه خرید هوشمند",
  description: "فروشگاه آنلاین مدرن با بهترین محصولات، قیمت مناسب و ارسال سریع",
  keywords: "فروشگاه آنلاین، خرید اینترنتی، موبایل، لپ تاپ، الکترونیک، تکنولوژی",
  authors: [{ name: "فروشگاه مدرن" }],
  creator: "فروشگاه مدرن",
  publisher: "فروشگاه مدرن",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://modern-store.com",
    title: "فروشگاه مدرن - تجربه خرید هوشمند",
    description: "فروشگاه آنلاین مدرن با بهترین محصولات، قیمت مناسب و ارسال سریع",
    siteName: "فروشگاه مدرن",
  },
  twitter: {
    card: "summary_large_image",
    title: "فروشگاه مدرن - تجربه خرید هوشمند",
    description: "فروشگاه آنلاین مدرن با بهترین محصولات، قیمت مناسب و ارسال سریع",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="font-loading">
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />
            <div className="pt-20">{children}</div>
            <Footer />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
