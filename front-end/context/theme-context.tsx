"use client"

import {createContext, useEffect, useState} from "react";

// @ts-ignore
export const ThemeContext = createContext();

// Get Local theme settings from the browser
const getFromLocalStorage = () => {
    // default return is light, if no preferences are set
    if (typeof window !== "undefined") {
        const value = localStorage.getItem("theme");
        return value || "light";
    }
}

export const ThemeContextProvider = ({
                                         children
                                     }: {
    children: React.ReactNode
}) => {

    const [theme, setTheme]: any = useState(() => {
        return getFromLocalStorage();
    });

    const toggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    return <ThemeContext.Provider value={{theme, toggle}}>{children}</ThemeContext.Provider>
}