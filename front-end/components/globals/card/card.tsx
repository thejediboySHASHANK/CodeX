import styles from "./card.module.css"
import React from "react";
import Image from "next/image";

import Image1 from "../../../public/p1.jpeg"
import Link from "next/link";

type Props = {};
const Card = (props: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image src={Image1} className={styles.image} alt="jpg" fill />
            </div>
            <div className={styles.textContainer}>
                <div className={styles.detail}>
                    <span className={styles.date}>17.05.2024 - </span>
                    <span className={styles.category}>CULTURE</span>
                </div>
                <Link href="/">
                    <h1>
                        Apple’s all new design language

                    </h1>
                </Link>
                <p className={styles.desc}>
                    Over the year’s Apple has revolutionized the industry over and over. In terms of UI’s they did it multiple times with Lisa (Personal computing), iPhone (Mobile Computing), Lately Vision pro (Spatial computing) and so many other iterations in between.
                </p>
                <Link href="/" className={styles.link}>
                    Read More
                </Link>
            </div>

        </div>
    );
};
export default Card;
