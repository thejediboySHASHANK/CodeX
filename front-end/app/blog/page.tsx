import styles from "./blogPage.module.css"
import CardList from "@/components/globals/cardList/cardList";
import Menu from "@/components/globals/Menu/menu";

type Props = {};
const BlogPage = (props: Props) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Style Blog</h1>
            <div className={styles.content}>
                <CardList />
                <Menu />
            </div>
        </div>
    );
};
export default BlogPage;
