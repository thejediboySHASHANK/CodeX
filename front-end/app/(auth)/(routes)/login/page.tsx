'use client'

import styles from "./loginPage.module.css"
import {useFormik} from "formik";
import * as Yup from "yup";
import {FC, useState} from "react";
import {useRouter} from "next/navigation";
import {Eye, EyeOff} from "lucide-react";
import Link from "next/link";
import {useAuth} from "@/context/user-context";
import axios from "axios";
import {toast} from "react-hot-toast";

type Props = {};

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please enter your email"),
    passwordHash: Yup.string().required("Please enter your password").min(6),
});

const LoginPage: FC<Props> = (props: Props) => {

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const router = useRouter();
    const { login }: any = useAuth();

    const formik = useFormik({
        initialValues: {email: "", passwordHash: ""},
        validationSchema: schema,
        onSubmit: async ({email, passwordHash}) => {
            try {
                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}login`, { email, passwordHash }, {withCredentials: true});
                login (data.accessToken, data.user);
                toast.success("Successfully Logged in!")
                router.push('/');
            } catch (error) {
                console.error("Login failed:", error);
                if (axios.isAxiosError(error) && error.response) {
                    // If the error is that the email already exists
                    const errorMessage = error.response.data.message || "Invalid Email or password details entered";
                    toast.error(errorMessage);
                } else {
                    // For unexpected errors
                    toast.error("An unexpected error occurred");
                }
            }
        }
    })

    const {errors, touched, values, handleChange, handleSubmit} = formik;

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2 style={{textAlign: "center", marginBottom: "15px"}}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label
                        className={styles.label}
                        htmlFor="email"
                    >
                        Enter your email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        id="email"
                        placeholder="your@email.com"
                        className={`${errors.email && touched.email ? styles.errorInput : ''} ${styles.input}`}
                    />
                    {errors.email && touched.email && (
                        <span className={styles.errorMsg}>{errors.email}</span>
                    )}
                    <div className={styles.passDiv}>
                        <label
                            className={styles.label}
                            htmlFor="email"
                        >
                            Enter your password
                        </label>
                        <input
                            type={!show ? "passwordHash" : "text"}
                            name="passwordHash"
                            value={values.passwordHash}
                            onChange={handleChange}
                            id="passwordHash"
                            placeholder="passwordHash"
                            className={`${errors.passwordHash && touched.passwordHash ? styles.errorInput : ''} ${styles.input}`}
                        />
                        {!show ? (
                            <Eye
                                className={styles.icon}
                                onClick={() => setShow(true)}
                            />
                        ) : (
                            <EyeOff
                                className={styles.icon}
                                onClick={() => setShow(false)}
                            />
                        )}
                        {errors.passwordHash && touched.passwordHash && (
                            <span className={styles.errorMsg}>{errors.passwordHash}</span>
                        )}
                    </div>
                    <div className={styles.passDiv}>
                        <input
                            type="submit"
                            value="Login"
                            className={styles.button}
                        />
                    </div>
                    <div className={styles.subtext}>
                        Do not have an account yet?{" "}
                        <Link href={`/signup`} style={{textDecoration: "underline"}}>
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default LoginPage;
