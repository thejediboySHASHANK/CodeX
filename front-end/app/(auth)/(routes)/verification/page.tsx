"use client"

import {toast} from "react-hot-toast";
import {useRef, useState} from "react";
import styles from "./verification.module.css"
import {BadgeCheck} from "lucide-react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/user-context";
import axios from "axios";

type Props = {};

type VerifyNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
};
const VerificationPage = (props: Props) => {
    const router = useRouter();
    // const [activation, {isSuccess, error}] = useActivationMutation();
    const [invalidError, setInvalidError] = useState<boolean>(false);
    const {token}: any = useAuth();

    // useEffect(() => {
    //     if (isSuccess) {
    //         toast.success("Account activated successfully");
    //         router.push(`/login`);
    //     }
    //     if (error) {
    //         if ("data" in error) {
    //             const errorData = error as any;
    //             toast.error(errorData.data.message);
    //             setInvalidError(true);
    //         } else {
    //             console.log("An error occurred", error);
    //         }
    //     }
    // }, [isSuccess, error]);

    const inputRefs: any = [
        useRef<HTMLElement>(null),
        useRef<HTMLElement>(null),
        useRef<HTMLElement>(null),
        useRef<HTMLElement>(null),
    ];

    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        0: "",
        1: "",
        2: "",
        3: "",
    });

    const verificationHandler = async () => {
        const verificationNumber = Object.values(verifyNumber).join("");
        if (verificationNumber.length !== 4) {
            setInvalidError(true);
            return;
        }

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}activate-user`, {
                activation_token: token,
                activation_code: verificationNumber,
            })
            const message = res.data.message || "Account Activated Successfully, please login";
            toast.success(message);
            router.push(`/login`);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                // If the error is that the email already exists
                const errorMessage = error.response.data.message || "Invalid OTP entered";
                toast.error(errorMessage);
            } else {
                // For unexpected errors
                toast.error("An unexpected error occurred");
            }
        }
        // await activation({
        //     activation_token: token,
        //     activation_code: verificationNumber,
        // });
    }

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false);
        const newVerifyNumber = {...verifyNumber, [index]: value};
        setVerifyNumber(newVerifyNumber);

        if (value === "" && index > 0) {
            inputRefs[index - 1].current?.focus();
        } else if (value.length === 1 && index < 3) {
            inputRefs[index + 1].current?.focus();
        }

    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2 style={{textAlign: "center", marginBottom: "15px"}}><span
                    style={{"textDecoration": "underline"}}>Verify</span> Your Account</h2>
                <div className={styles.divIcon}>
                    <div className={styles.embedDiv}>
                        <BadgeCheck size={40}/>
                    </div>
                </div>
                <br/>
                <br/>
                <div className={styles.OTPdiv}>
                    {Object.keys(verifyNumber).map((key, index) => (
                        <input
                            type="number"
                            key={key}
                            ref={inputRefs[index]}
                            className={`${styles.inputBox} ${
                                invalidError
                                    ? `${styles.error}`
                                    : `${styles.border}`
                            }`}
                            placeholder=""
                            maxLength={1}
                            value={verifyNumber[key as keyof VerifyNumber]}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                    ))}
                </div>
                <div className={styles.passDiv}>
                    <button
                        className={styles.button}
                        onClick={verificationHandler}
                    >
                        Verify OTP
                    </button>
                </div>
                <div className={styles.subtext}>
                    Go back to signIn?{" "}
                    <Link href={`/login`} style={{textDecoration: "underline"}}>
                        Log in
                    </Link>
                </div>
            </div>

        </div>
    );
};
export default VerificationPage;
