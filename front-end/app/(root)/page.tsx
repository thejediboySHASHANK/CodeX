import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/globals/Navbar/navbar";

// Importing CSS modules
import styles from "./homepage.module.css"
import Featured from "@/components/globals/Featured/featured";
import CategoryList from "@/components/globals/categoryList/categoryList";
import CardList from "@/components/globals/cardList/cardList";
import Menu from "@/components/globals/Menu/menu";

export default function Home() {
    return (
        <div className={styles.container}>
            <Featured />
            <CategoryList />
            <div className={styles.content}>
                <CardList />
                <Menu />
            </div>
        </div>
    );
}
