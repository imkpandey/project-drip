import "./globals.css";
import Nav from "./components/Nav";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Hydrate from "./components/Hydrate";
import {Roboto, Bebas_Neue} from 'next/font/google'

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-robot",
})
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
})

export const metadata = {
  title: "Project Drip",
  description: "Not your average ecommerce website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //fetch user
  const session = await getServerSession(authOptions);

  return (
      <html className={`${roboto.variable} ${bebas.variable}`} lang="en">
        <Hydrate>
          <Nav user={session?.user} expires={session?.expires as string} />
          {children}
        </Hydrate>
    </html>
  );
}
