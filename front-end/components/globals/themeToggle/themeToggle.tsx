"use client"

import styles from "./themeToggle.module.css"
import Image from "next/image";
import Moon from "../../../public/moon.png"
import Sun from "../../../public/sun.png"
import {useContext} from "react";
import {ThemeContext} from "@/context/theme-context";
import {Simulate} from "react-dom/test-utils";


type Props = {};
const ThemeToggle = (props: Props) => {

    const {toggle, theme}: any = useContext(ThemeContext)

    return (
        <div
            className={styles.container}
            onClick={toggle}
            style={
                theme === "dark" ? {backgroundColor: "white"} : {backgroundColor: "#0f172a"}
            }
        >
            <Image src={Moon} alt="moon.png" width={14} height={14}/>
            <div
                className={styles.ball}
                style={theme === "dark"
                    ? {left: 1, background: "#0f172a"}
                    : {right: 1, background: "white"}}>
            </div>
            <Image src={Sun} alt="moon.png" width={14} height={14}/>
        </div>
    );
};
export default ThemeToggle;
