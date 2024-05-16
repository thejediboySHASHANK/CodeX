import React from 'react'
import styles from "./featured.module.css"
import Image from "next/image";
import Image1 from "../../../public/system.jpg"
const Featured = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <b>Best of the week</b>
            </h1>
            <div className={styles.post}>
                <div className={styles.imgContainer}>
                    <Image src={Image1} alt="" fill className={styles.image} />
                </div>
                <div className={styles.textContainer}>
                    <h1 className={styles.postTitle}>Design a Notification System with AWS Serverless — Notes and Highlights</h1>
                    <p className={styles.postDesc}>
                        In recent years, the notification function has emerged as a prominent feature in many applications. Personally, I’ve taken on the challenge of developing notification systems for several products.
                        Building a scalable system capable of dispatching millions of notifications daily is no small feat. This is precisely why I find it valuable to document key insights and lessons from my experiences.
                    </p>
                    <button className={styles.button}>Read More</button>
                </div>
            </div>
        </div>
    )
}
export default Featured
