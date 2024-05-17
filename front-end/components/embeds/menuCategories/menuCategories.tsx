import React from "react";
import styles from "./menuCategories.module.css"
import Link from "next/link";

type Props = {};
const MenuCategories = (props: Props) => {
    return (
        <div className={styles.categoryList}>
            <Link href="/blog?cat=style" className={`${styles.categoryItem} ${styles.dsa}`}>
                Style
            </Link>
            <Link href="/blog?cat=style" className={`${styles.categoryItem} ${styles.ai}`}>
                Style
            </Link>
            <Link href="/blog?cat=style" className={`${styles.categoryItem} ${styles.blockchain}`}>
                Style
            </Link>
            <Link href="/blog?cat=style" className={`${styles.categoryItem} ${styles.design}`}>
                Style
            </Link>
            <Link href="/blog?cat=style" className={`${styles.categoryItem} ${styles.startup}`}>
                Style
            </Link>
            <Link href="/blog?cat=style" className={`${styles.categoryItem} ${styles.lifestyle}`}>
                Style
            </Link>

        </div>

    );
};
export default MenuCategories;
