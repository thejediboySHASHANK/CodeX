import React from 'react'
import styles from "./navbar.module.css"
import Link from "next/link";
import ThemeToggle from "@/components/globals/themeToggle/themeToggle";
import AuthLinks from "@/components/globals/authLinks/authLinks";
import Image from "next/image";

// Social Media Icons Import
import Facebook from "../../../public/facebook.png"
import Instagram from "../../../public/instagram.png"
import TikTok from "../../../public/tiktok.png"
import Youtube from "../../../public/youtube.png"
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import MaInNav from "@/components/globals/Navbar/maIn-nav";




const Navbar = () => {

    return (
        <div className={styles.container}>
            <div className={styles.logo}>CodeX.</div>

            <div className={styles.links}>
                <MaInNav className={styles.links} />
            </div>

            <div className={styles.social}>
                <ThemeToggle />
                <AuthLinks />
                {/*<Image width={24} height={24} src={Facebook} alt="facebook.png" />*/}
                {/*<Image width={24} height={24} src={Instagram} alt="facebook.png" />*/}
                {/*<Image width={24} height={24} src={TikTok} alt="facebook.png" />*/}
                {/*<Image width={24} height={24} src={Youtube} alt="facebook.png" />*/}
            </div>
        </div>
    )
}
export default Navbar
