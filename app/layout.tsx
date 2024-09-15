import type { Metadata } from 'next'
import { Inter, Qwitcher_Grypen } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import Providers from './providers'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })
// const logoFont = Qwitcher_Grypen({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 're-Book',
  description: 'Your site for exchanging and buying used books',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning={true}>
        <body className={inter.className} suppressHydrationWarning={true}>
          <Providers>
            <Navbar />
            <main className='container py-8'>{children}</main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
