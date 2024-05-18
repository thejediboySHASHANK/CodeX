"use client"

import styles from "./writePage.module.css"
import Image from "next/image";

import PlusImg from "../../public/plus.png"
import Img from "../../public/image.png"
import External from "../../public/external.png"
import Video from "../../public/video.png"
import {useState} from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css"

type Props = {};
const WritePage = (props: Props) => {

    const [open, setOpen] = useState(false);
    const [value, setValue]: any = useState(false)

    return (
        <div className={styles.container}>
            <input type="text" placeholder="Title" className={styles.input}/>
            <div className={styles.editor}>
                <button className={styles.button} onClick={() => setOpen(!open)}>
                    <Image src={PlusImg} alt="" width={16} height={16} />
                </button>
                {open &&
                    <div className={styles.add}>
                        <button className={styles.addButton}>
                            <Image src={Img} alt="" width={16} height={16} />
                        </button>
                        <button className={styles.addButton}>
                            <Image src={External} alt="" width={16} height={16} />
                        </button>
                        <button className={styles.addButton}>
                            <Image src={Video} alt="" width={16} height={16} />
                        </button>
                    </div>
                }
                <ReactQuill className={styles.textArea} theme="bubble" value={value} onChange={setValue} placeholder="Share your wisdom" />
            </div>
            <button className={styles.publish}>Publish</button>
        </div>
    );
};
export default WritePage;
