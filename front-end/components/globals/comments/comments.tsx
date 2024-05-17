import styles from "./comments.module.css"
import Link from "next/link";
import Image from "next/image";

import Image1 from "../../../public/p1.jpeg"

type Props = {};
const Comments = (props: Props) => {

    const status = "authenticated";

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Comments</h1>
            {status === "authenticated" ? (
                <div className={styles.write}>
                    <textarea placeholder="write a comment" className={styles.input}></textarea>
                    <button className={styles.button}>
                        Send
                    </button>
                </div>
            ) : (
                <Link href="/login">Login to write a comment</Link>
            )}
            <div className={styles.comments}>
                <div className={styles.comment}>
                    <div className={styles.user}>
                        <Image src={Image1} alt="" width={50} height={50} className={styles.image} />
                        <div className={styles.userInfo}>
                            <span className={styles.username}>John Doe</span>
                            <span className={styles.date}>17.05.24</span>
                        </div>
                    </div>
                    <p className={styles.desc}>
                        Blah blah blah
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Comments;
