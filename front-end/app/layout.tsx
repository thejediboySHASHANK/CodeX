import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {Source_Serif_4} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/globals/Navbar/navbar";
import Footer from "@/components/globals/Footer/footer";
import {ThemeContextProvider} from "@/context/theme-context";
import ThemeProvider from "@/providers/theme-provider";
import {Toaster} from "react-hot-toast";
import {Providers} from "@/app/redux-provider";
import {AuthProvider} from "@/context/user-context";
import axios from "axios";

const inter = Inter({subsets: ["latin"]});
const sourceSerif = Source_Serif_4({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "CodeX Blogs",
    description: "Blogs for the devs, by the devs",
};

axios.defaults.withCredentials = true

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={sourceSerif.className}>
        <AuthProvider>
            <ThemeContextProvider>
                <ThemeProvider>
                    <div className="container">
                        <div className="wrapper">
                            <Navbar/>
                            {children}
                            <Toaster position='top-center' reverseOrder={false} />
                            <Footer/>
                        </div>
                    </div>
                </ThemeProvider>
            </ThemeContextProvider>
        </AuthProvider>
        </body>
        </html>
    );
}
