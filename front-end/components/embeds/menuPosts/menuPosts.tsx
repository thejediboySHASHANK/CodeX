import styles from "@/components/globals/Menu/menu.module.css";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Image1 from "@/public/p1.jpeg";

type Props = {};
const MenuPosts = ({withImage}: any) => {
    return (
        <div className={styles.items}>
            <Link href="/" className={styles.item}>
                {withImage && <div className={styles.imageContainer}>
                    <Image src={Image1} alt="" fill className={styles.image}/>
                </div>}
                <div className={styles.textContainer}>
                    <span className={`${styles.category} ${styles.travel}`}>Travel</span>
                    <h3 className={styles.postTitle}>
                        Hi this is a text!
                    </h3>
                    <div className={styles.detail}>
                        <span className={styles.username}>John Doe</span>
                        <span className={styles.date}> - 17.05.24</span>
                    </div>
                </div>
            </Link>

            <Link href="/" className={styles.item}>
                {withImage && <div className={styles.imageContainer}>
                    <Image src={Image1} alt="" fill className={styles.image}/>
                </div>}
                <div className={styles.textContainer}>
                    <span className={`${styles.category} ${styles.culture}`}>Travel</span>
                    <h3 className={styles.postTitle}>
                        Hi this is a text!
                    </h3>
                    <div className={styles.detail}>
                        <span className={styles.username}>John Doe</span>
                        <span className={styles.date}> - 17.05.24</span>
                    </div>
                </div>
            </Link>

            <Link href="/" className={styles.item}>
                {withImage && <div className={styles.imageContainer}>
                    <Image src={Image1} alt="" fill className={styles.image}/>
                </div>}
                <div className={styles.textContainer}>
                    <span className={`${styles.category} ${styles.food}`}>Travel</span>
                    <h3 className={styles.postTitle}>
                        Hi this is a text!
                    </h3>
                    <div className={styles.detail}>
                        <span className={styles.username}>John Doe</span>
                        <span className={styles.date}> - 17.05.24</span>
                    </div>
                </div>
            </Link>

            <Link href="/" className={styles.item}>
                {withImage && <div className={styles.imageContainer}>
                    <Image src={Image1} alt="" fill className={styles.image}/>
                </div>}
                <div className={styles.textContainer}>
                    <span className={`${styles.category} ${styles.fashion}`}>Travel</span>
                    <h3 className={styles.postTitle}>
                        Hi this is a text!
                    </h3>
                    <div className={styles.detail}>
                        <span className={styles.username}>John Doe</span>
                        <span className={styles.date}> - 17.05.24</span>
                    </div>
                </div>
            </Link>

            <Link href="/" className={styles.item}>
                {withImage && <div className={styles.imageContainer}>
                    <Image src={Image1} alt="" fill className={styles.image}/>
                </div>}
                <div className={styles.textContainer}>
                    <span className={`${styles.category} ${styles.coding}`}>Travel</span>
                    <h3 className={styles.postTitle}>
                        Hi this is a text!
                    </h3>
                    <div className={styles.detail}>
                        <span className={styles.username}>John Doe</span>
                        <span className={styles.date}> - 17.05.24</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};
export default MenuPosts;
