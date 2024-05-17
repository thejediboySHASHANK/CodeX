import React from 'react'
import styles from "./categotyList.module.css"
import Link from "next/link";
import Image from "next/image";

import Style from "../../../public/style.png"
import Fashion from "../../../public/fashion.png"
import {BookCopy, Brain, Code, Coins, Component, Heart, icons} from "lucide-react";

const CategoryList = () => {

    const categories = [
        {
            name: "DSA",
            href: "/blog?cat=style",
            imageSrc: Style,
            imageAlt: "Style",
            imageWidth: 32,
            imageHeight: 32,
            icons: <Code  />
        },
        {
            name: "AI",
            href: "/blog",
            imageSrc: Fashion,
            imageAlt: "Style",
            imageWidth: 32,
            imageHeight: 32,
            icons: <Brain />
        },
        {
            name: "Blockchain",
            href: "/blog",
            imageSrc: Style,
            imageAlt: "Style",
            imageWidth: 32,
            imageHeight: 32,
            icons: <BookCopy />
        },
        {
            name: "Design",
            href: "/blog",
            imageSrc: Style,
            imageAlt: "Style",
            imageWidth: 32,
            imageHeight: 32,
            icons: <Component />
        },
        {
            name: "Startup",
            href: "/blog",
            imageSrc: Style,
            imageAlt: "Style",
            imageWidth: 32,
            imageHeight: 32,
            icons: <Coins />
        },
        {
            name: "Lifestyle",
            href: "/blog",
            imageSrc: Style,
            imageAlt: "Style",
            imageWidth: 32,
            imageHeight: 32,
            icons: <Heart />
        },
    ]

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Popular Categories</h1>
            <div className={styles.categories}>
                {categories.map((category) => (
                    <Link href={category.href} key={category.name} className={`${styles.category} ${styles[category.name.toLowerCase()]}`}>
                        {category.icons}
                        {category.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default CategoryList
