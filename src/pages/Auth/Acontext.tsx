import { createContext, useState, useEffect } from "react";
import { usingContext } from "./../../context/Context";

interface AuthUser {
    [key: string]: string;
}

interface AuthContextType {
    auth: AuthUser | null;
    fetchuser: () => Promise<void>;
    logout: () => Promise<void>;
}

export const Acontext = createContext<AuthContextType | undefined>(undefined);

export const Aprovider = ({ children }: { children: React.ReactNode }) => {
    const { url } = usingContext();

    const [auth, setAuth] = useState<AuthUser | null>(null);

    const fetchuser = async (): Promise<void> => {
        try {
            const res = await fetch(`${url}/api/admin/info`, {
                credentials: "include",
            });

            const data = await res.json();

            if (data.success) {
                setAuth(data.user);
            } else {
                setAuth(null);
            }
        } catch (error) {
            console.error("Fetch user error:", error);
            setAuth(null);
        }
    };

    const logout = async (): Promise<void> => {
        try {
            const res = await fetch(`${url}/api/admin/logout`, {
                credentials: "include",
            });

            const data = await res.json();

            if (data.success) {
                setAuth(null);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        fetchuser();
    }, [url]);

    return (
        <Acontext.Provider value={{ fetchuser, auth, logout }}>
            {children}
        </Acontext.Provider>
    );
};