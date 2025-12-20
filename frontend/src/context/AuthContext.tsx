"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { api } from "@/lib/api";

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: () => { },
    logout: () => { },
    isAuthenticated: false,
    refreshProfile: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const refreshProfile = useCallback(async () => {
        const currentToken = localStorage.getItem("adminToken") || token;
        if (!currentToken) return;

        try {
            const profile = await api.getProfile(currentToken);
            if (profile) {
                setUser(profile);
            }
        } catch (error) {
            console.error("Failed to refresh profile:", error);
            if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
                // logout(); // Optional: force logout on invalid token
            }
        }
    }, [token, pathname]);

    useEffect(() => {
        const storedToken = localStorage.getItem("adminToken");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            refreshProfile();
        }
    }, [token, refreshProfile]);

    const login = (newToken: string) => {
        localStorage.setItem("adminToken", newToken);
        setToken(newToken);
        router.push("/admin/dashboard");
    };

    const logout = () => {
        localStorage.removeItem("adminToken");
        setToken(null);
        setUser(null);
        router.push("/admin/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated: !!token,
                refreshProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
