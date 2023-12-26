"use client";

import type { Metadata } from "next";
import "./globals.scss";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { checkIsPublicRoute } from "@/utils/functions/check-route";
import Provider from "@/utils/Provider";
import { UserProvider } from "@/utils/common/userContext";
import { ApolloContext } from "@/utils/common/apolloContext";
import Sidebar from "@/components/Sidebar";
import PrivateRoute from "@/components/config/PrivateRoute";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const isPublic = checkIsPublicRoute(path);

  const metadata: Metadata = {
    title: "Recipes Website",
    description: "An platform to share your best recipes",
  };

  return (
    <html lang="en">
      <Head>
        <meta name="theme-color" content="#fff"></meta>
      </Head>
      <body>
        <Provider>
          <ApolloContext>
            {isPublic && (
              <UserProvider>
                <Navbar />
                <main className="min-h-[62vh] pt-[80px] flex flex-col items-center w-full selection:text-white selection:bg-[#f1656a] sm:pt-[5%] sm:pb-[2.5%]">
                  {children}
                </main>
                <Footer />
              </UserProvider>
            )}

            {!isPublic && (
              <UserProvider>
                <PrivateRoute>
                  <Navbar />
                  <main className="min-h-[62vh] pt-[80px] flex justify-center gap-12 w-full selection:text-white selection:bg-[#f1656a] bg-[#fafafa] sm:pt-[5%] sm:pb-[2.5%]">
                    <div className="w-full flex flex-col items-center max-w-[1200px]">
                      {children}
                    </div>
                    <Sidebar />
                  </main>
                  <Footer />
                </PrivateRoute>
              </UserProvider>
            )}
          </ApolloContext>
        </Provider>
      </body>
    </html>
  );
}
