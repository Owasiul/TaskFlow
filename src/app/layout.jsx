import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "./Components/navbar";
import Footer from "./Components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import { getServerSession } from "next-auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Task Manager",
  description: "Your Daily Task Solver",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col dark:bg-slate-950 dark:text-white bg-white text-slate-800">
        <Providers session={session}>
          <header>
            <Navbar />
          </header>
          <main className="w-[98%] mx-auto my-4">{children}</main>
          <footer>
            <Footer />
          </footer>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
