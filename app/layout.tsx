import "./globals.css";
import "./kinetic.css";
import "./brand.css";
import { Inter, Space_Grotesk } from "next/font/google";
import Nav from "../components/Nav";
import SiteFooter from "../components/SiteFooter";
import { Experience } from "../components/Experience";
const inter = Inter({subsets:["latin"], variable:"--font-inter"});
const space = Space_Grotesk({subsets:["latin"], variable:"--font-space"});
export const metadata = {title:"Prabidhi Uthaan — Ideas into enduring ventures", description:"An incubation and venture-building platform for ambitious founders."};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="en"><body className={`${inter.variable} ${space.variable}`}><Experience /><Nav/>{children}<SiteFooter /></body></html>
}