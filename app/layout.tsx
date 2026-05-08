import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AURELIA ESTATES | Ultra-Premium Architectural Residences',
  description: 'Discover extraordinary architectural masterpieces. Luxury villas, futuristic bungalows, and cinematic penthouses designed for the world\'s most discerning clientele.',
  keywords: ['luxury real estate', 'architectural villas', 'premium homes', 'luxury properties', 'modern mansions'],
  authors: [{ name: 'AURELIA ESTATES' }],
  openGraph: {
    title: 'AURELIA ESTATES | Ultra-Premium Architectural Residences',
    description: 'Extraordinary architectural masterpieces for the world\'s most discerning clientele.',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F0E8' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1815' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
