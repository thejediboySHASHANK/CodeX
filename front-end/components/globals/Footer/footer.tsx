import React from 'react'
import styles from "./footer.module.css"
import Image from "next/image";

import Logo from "../../../public/pic.jpeg"
import {Github, Instagram, Linkedin} from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.logo}>
                    <Image src={Logo} alt="logo.png" width={50} height={50} style={{borderRadius: "50%"}} />
                    <h1 className={styles.logoText}>CodeX.</h1>
                </div>
                <p className={styles.desc}>
                    Welcome to CodeX., a community-driven blog where coding stories and expertise converge. Dive into insightful articles by [Your Name] and fellow developers. Want to share your knowledge? [Contribute a Blog] and join our growing community. Stay updated and connected by subscribing to our newsletter and following us on [Social Media Links].
                </p>
                <div className={styles.icons}>
                    <Linkedin />
                    <Instagram />
                    <Github />
                </div>
            </div>
            <div className={styles.links}>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Links</span>
                    <Link href="/">Homepage</Link>
                    <Link href="/">Blog</Link>
                    <Link href="/">About</Link>
                    <Link href="/">Contact</Link>
                </div>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Tags</span>
                    <Link href="/">DSA</Link>
                    <Link href="/">System Design</Link>
                    <Link href="/">Startups</Link>
                    <Link href="/">AI/ML</Link>
                </div>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Social</span>
                    <Link href="/">LinkedIn</Link>
                    <Link href="/">Instagram</Link>
                    <Link href="/">Github</Link>
                </div>
            </div>
        </div>
    )
}
export default Footer
