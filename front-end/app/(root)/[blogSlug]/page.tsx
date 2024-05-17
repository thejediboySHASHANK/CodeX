import styles from "./singlePage.module.css"
import Menu from "@/components/globals/Menu/menu";
import Image from "next/image";

import Img from "../../../public/pic.jpeg"
import Img2 from "../../../public/p1.jpeg"
import Comments from "@/components/globals/comments/comments";

type Props = {};
const SinglePage = (props: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>How You Can Start a 5 Figure Side Business as Software Engineer</h1>
                    <div className={styles.user}>
                        <div className={styles.userImageContainer}>
                            <Image src={Img} alt="" fill className={styles.avatar} />
                        </div>
                        <div className={styles.userTextContainer}>
                            <span className={styles.username}>Shashank Dewangan</span>
                            <span className={styles.date}>17.05.24</span>
                        </div>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <Image src={Img2} alt="" fill className={styles.image} />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.post}>
                    <div className={styles.description}>
                        <p>
                            If you’re a software engineer interested in starting your own business I’m going to lay out some practical, no-nonsense advice for you to start and what I’d do differently if I was beginning today.
                        </p>
                        <p>
                            As a coder, you have a top tier skill and help others makes boat loads of money by implementing their ideas. Why not build your own?
                        </p>
                        <p>
                            Unfortunately, you’re probably going to make 1 of the 4 business-killing mistakes I did. I want to help you avoid these pitfalls and get the best chance at success.
                        </p>
                    </div>
                    <div className={styles.comment}>
                        <Comments />
                    </div>
                </div>
                <Menu />

            </div>

        </div>
    );
};
export default SinglePage;
