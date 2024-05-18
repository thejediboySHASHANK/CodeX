import styles from "./loginPage.module.css"
import {Github} from "lucide-react";

type Props = {};
const LoginPage = (props: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.social}>
                    Google Sign In
                </div>
                <div className={styles.social}>
                    <Github />
                    Github Sign In
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
