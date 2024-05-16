import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/globals/Navbar/navbar";
import Footer from "@/components/globals/Footer/footer";
import {ThemeContextProvider} from "@/context/theme-context";
import ThemeProvider from "@/providers/theme-provider";

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
        <ThemeContextProvider>
            <ThemeProvider>
                <div className="container">
                    <div className="wrapper">
                        <Navbar/>
                        {children}
                        <Footer/>
                    </div>
                </div>
            </ThemeProvider>
        </ThemeContextProvider>
        </body>
        </html>
    );
}
