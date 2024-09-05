import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ParentProvider from "./ParentWrapper";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="transition-colors duration-400">
      <head>
        <title>CapBlitz</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="A typing test to strengthen your typing skills."
        />
      </head>
      <body
        id="body"
        className={`${robotoMono.className} min-h-screen bg-transparent text-foreground max-w-[850px] mx-auto flex flex-col  ease-out m-0 p-0`}
      >
        <ParentProvider>
          <Header />
          <main className="flex-1 flex flex-col items-center justify-center">
            {children}
          </main>
          <Footer />
        </ParentProvider>
      </body>
    </html>
  );
}
