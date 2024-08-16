import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokédex",
  description: "a Next.js Pokédex by Niels",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header></Header> 
        {children}
      </body>
    </html>
  );
}
