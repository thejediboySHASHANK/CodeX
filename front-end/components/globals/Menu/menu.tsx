import React from 'react'
import styles from "./menu.module.css"
import Link from "next/link";
import Image from "next/image";

import Image1 from "../../../public/p1.jpeg"
import MenuPosts from "@/components/embeds/menuPosts/menuPosts";
import MenuCategories from "@/components/embeds/menuCategories/menuCategories";

const Menu = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.subtitle}>{"What's trending"}</h2>
            <h1 className={styles.title}>Most Popular</h1>
            <MenuPosts withImage={false}/>

            {/*Categories Component*/}
            <h2 className={styles.subtitle}>{"Discover by topics"}</h2>
            <h1 className={styles.title}>{"Categories"}</h1>
            <MenuCategories />
            {/*Categories Component Ends*/}

            {/*Second Menu Item Component */}

            <h2 className={styles.subtitle}>{"Chosen by the editor"}</h2>
            <h1 className={styles.title}>{"Editor's Pick"}</h1>
            <MenuPosts withImage={true}/>




        </div>
    )
}
export default Menu
