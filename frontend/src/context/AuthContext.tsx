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

    const login = useCallback((newToken: string) => {
        localStorage.setItem("adminToken", newToken);
        setToken(newToken);
        router.push("/admin/dashboard");
    }, [router]);

    const logout = useCallback(() => {
        localStorage.removeItem("adminToken");
        setToken(null);
        setUser(null);
        router.push("/admin/login");
    }, [router]);

    const refreshProfile = useCallback(async () => {
        const currentToken = localStorage.getItem("adminToken") || token;
        if (!currentToken) return;

        try {
            const profile = await api.getProfile(currentToken);
            if (profile) {
                setUser(profile);
            }
        } catch (error: any) {
            console.error("Failed to refresh profile:", error);
            // Check if error message contains 401 (API Error: 401)
            if (error.message && error.message.includes("401")) {
                console.warn("Token expired or invalid, logging out...");
                logout();
            }
        }
    },
        [token, pathname, logout]
    );

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
