import './globals.css'

import { Source_Sans_3 } from 'next/font/google'
const SourceSans = Source_Sans_3({ subsets: ['latin'] })
import { Providers } from './providers.js'

import { Analytics } from '@vercel/analytics/react';

import { Navbar } from './navbar.js'

export const metadata = {
  metadataBase: new URL('https://blog.juanarbol.co/'),
  title: 'Juan Arboleda',
  description: '@juanarbol blog',
  openGraph: {
    title: 'Juan Arboleda',
    description: '@juanarbol blog',
    url: `https://blog.juanarbol.co/`,
    images: ['/computer.png']
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-stone-900 dark:text-white ${SourceSans.className}`}>
        <main className='max-w-prose m-auto'>
          <div className='px-3 md:px-0 pt-3 md:pt-6 pb-1 md:pb-3 min-h-screen'>
            <Providers attribute='class'>
              <Navbar />
              {children}
              <Analytics />
            </Providers>
          </div>
        </main>
      </body>
    </html>
  )
}
