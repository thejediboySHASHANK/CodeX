"use client"

import {usePathname} from "next/navigation";
import Link from "next/link";
import styles from "@/components/globals/Navbar/navbar.module.css";
import React from "react";

const MaInNav = ({className, ...props}: React.HTMLAttributes<HTMLElement>) => {

    const pathName = usePathname();


    const routes = [
        {
            href: '/',
            label: 'Homepage',
            active: pathName === '/',
        },
        {
            href: '/contact',
            label: 'Contact',
            active: pathName === '/contact',
        },
        {
            href: '/about',
            label: 'About',
            active: pathName === '/about',
        },
    ];

    return (
        <div className={className}>
            {routes.map((route) => (
                <Link key={route.href} href={route.href}>
                    <div className={route.active ? styles.activeLink : styles.inactiveLink}>
                        {route.label}
                    </div>
                </Link>
            ))}
        </div>
    );
};
export default MaInNav;
