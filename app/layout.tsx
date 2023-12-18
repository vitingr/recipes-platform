"use client"

import type { Metadata } from 'next'
import './globals.scss'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { usePathname } from 'next/navigation'
import { checkIsPublicRoute } from '@/utils/functions/check-route'
import Provider from '@/utils/Provider'
import { UserProvider } from '@/utils/common/userContext'
import { ApolloContext } from '@/utils/common/apolloContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const path = usePathname()

  const isPublic = checkIsPublicRoute(path)

  const metadata: Metadata = {
    title: 'Recipes Website',
    description: 'An platform to share your best recipes',
  }

  return (
    <html lang="en">
      <body>
        <Provider>
          <ApolloContext>
            {isPublic && (
              <>
                <UserProvider>
                  <Navbar />
                  <main className='min-h-[62vh] pt-[80px] flex flex-col items-center w-full selection:text-white selection:bg-[#f1656a]'>
                    {children}
                  </main>
                  <Footer />
                </UserProvider>
              </>
            )}

            {!isPublic && (
              <>
                <UserProvider>
                  <Navbar />
                  <main className='min-h-[62vh] pt-[80px] flex flex-col items-center w-full selection:text-white selection:bg-[#f1656a]'>
                    {children}
                  </main>
                  <Footer />
                </UserProvider>
              </>
            )}
          </ApolloContext>
        </Provider>
      </body>

    </html>
  )
}
