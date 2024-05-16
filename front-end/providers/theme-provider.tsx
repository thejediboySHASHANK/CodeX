"use client"

import {useContext, useEffect, useState} from "react";
import {ThemeContext} from "@/context/theme-context";

type Props = {};
const ThemeProvider = ({
                           children
                       }: {
    children: React.ReactNode
}) => {

    const {theme}: any = useContext(ThemeContext)
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (mounted) {
        return (
            <div className={theme}>
                {children}
            </div>
        );
    };
};
export default ThemeProvider;
