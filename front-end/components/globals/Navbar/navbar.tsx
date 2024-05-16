import React from 'react'
import styles from "./navbar.module.css"
import Link from "next/link";
import ThemeToggle from "@/components/globals/themeToggle/themeToggle";
import AuthLinks from "@/components/globals/authLinks/authLinks";
import Image from "next/image";
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
            </div>
        </div>
    )
}
export default Navbar
