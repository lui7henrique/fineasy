import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

import './globals.css'
import { Header } from '@/components/header'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { CdiContextProvider } from '@/context/cdi/cdi'
import { getCdiRate } from 'selic'

export const metadata = {
  title: 'Fineasy',
  description: 'Finanças facilitadas',
}

const inter = Inter({
  display: 'fallback',
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cdiRate = await getCdiRate()

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>

      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.className,
        )}
      >
        <ThemeProvider>
          <CdiContextProvider cdiRate={cdiRate}>
            <Header />
            {children}
          </CdiContextProvider>
        </ThemeProvider>

        <Toaster />
      </body>
    </html>
  )
}
