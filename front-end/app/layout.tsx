import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/globals/Navbar/navbar";
import Footer from "@/components/globals/Footer/footer";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "CodeX Blogs",
    description: "Blogs for the devs, by the devs",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <div className="container">
            <div className="wrapper">
                <Navbar/>
                {children}
                <Footer/>
            </div>
        </div>
        </body>
        </html>
    );
}
