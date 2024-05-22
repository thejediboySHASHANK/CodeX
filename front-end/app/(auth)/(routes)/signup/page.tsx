'use client'

import styles from "./signupPage.module.css"
import {useFormik} from "formik";
import * as Yup from "yup";
import {FC, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Eye, EyeOff} from "lucide-react";
import Link from "next/link";
import {useActivationMutation, useRegisterMutation} from "@/redux/features/auth/authApi";
import {toast} from "react-hot-toast";
import axios from "axios";
import {useAuth} from "@/context/user-context";

type Props = {};

const schema = Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string().email("Invalid email").required("Please enter your email"),
    passwordHash: Yup.string().required("Please enter your password").min(6),
});

const SignUpPage: FC<Props> = (props: Props) => {

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    // const [register, {data, error, isSuccess}] = useRegisterMutation();
    const router = useRouter();
    const {setToken}: any = useAuth();


    const formik = useFormik({
        initialValues: {name: "", email: "", passwordHash: ""},
        validationSchema: schema,
        onSubmit: async ({name, email, passwordHash}) => {
            const data = {
                name, email, passwordHash
            }

            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}registration`, data);
                const message = res.data.message || "Registration Successful";
                const activationToken = res.data.activationToken;
                setToken(activationToken);
                toast.success(message);
                router.push(`/verification`);
            } catch (error) {
                console.log(error);
                if (axios.isAxiosError(error) && error.response) {
                    // If the error is that the email already exists
                    const errorMessage = error.response.data.message || "Email already exists or some other error occurred";
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
                <h2 style={{textAlign: "center", marginBottom: "15px"}}>Signup</h2>
                <form onSubmit={handleSubmit}>

                    <div>
                        <label
                            className={styles.label}
                            htmlFor="email"
                        >
                            Enter your name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            id="name"
                            placeholder="your name"
                            className={`${errors.name && touched.name ? styles.errorInput : ''} ${styles.input}`}
                        />
                        {errors.name && touched.name && (
                            <span className={styles.errorMsg}>{errors.name}</span>
                        )}
                    </div>

                    <div className={styles.passDiv}>
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
                    </div>

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
                            placeholder="password"
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
                    </div>
                    {errors.passwordHash && touched.passwordHash && (
                        <span className={styles.errorMsg}>{errors.passwordHash}</span>
                    )}
                    <div className={styles.passDiv}>
                        <input
                            type="submit"
                            value="Sign Up"
                            className={styles.button}
                        />
                    </div>
                    <div className={styles.subtext}>
                        Already an account?{" "}
                        <Link href={`/login`} style={{textDecoration: "underline"}}>
                            Log in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default SignUpPage;
