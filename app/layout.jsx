import { Archivo } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});

export const metadata = {
  title: { default: "Mario Iskander, front-end developer", template: "%s | Mario Iskander" },
  description:
    "Mario Iskander builds web apps that solve real problems, with AI built in where it helps. Front-end developer in Sydney.",
};

// Runs before paint so the saved theme never flashes the wrong colors.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={archivo.variable}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
