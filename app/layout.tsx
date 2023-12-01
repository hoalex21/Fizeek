import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './ui/navbar'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/app/components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const session = await getServerSession();
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <main>
            <NavBar />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  )
}
