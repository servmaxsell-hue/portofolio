"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    FaHome,
    FaProjectDiagram,
    FaNewspaper,
    FaCogs,
    FaEnvelope,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaComments
} from "react-icons/fa";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, logout, token } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Protect route
    useEffect(() => {
        if (pathname === "/admin/login") return;

        // Small delay to allow context to sync or for hydration
        const timer = setTimeout(() => {
            if (!isAuthenticated && !localStorage.getItem("adminToken")) {
                router.push("/admin/login");
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [isAuthenticated, router, pathname]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Skip layout for login page - MUST BE AFTER HOOKS
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }


    if (!isAuthenticated && !token) {
        // Return simple loader or null while redirecting
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const menuItems = [
        { icon: FaHome, label: "Dashboard", href: "/admin/dashboard" },
        { icon: FaProjectDiagram, label: "Projets", href: "/admin/projects" },
        { icon: FaNewspaper, label: "Articles", href: "/admin/articles" },
        { icon: FaComments, label: "Commentaires", href: "/admin/comments" },
        { icon: FaCogs, label: "Services", href: "/admin/services" },
        { icon: FaEnvelope, label: "Messages", href: "/admin/messages" },
    ];

    const SidebarContent = ({ isCollapsed = false, onLogout = () => { } }) => (
        <>
            <div className="p-6 flex items-center gap-3 border-b border-white/5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex-shrink-0" />
                {!isCollapsed && (
                    <span className="font-bold text-lg tracking-tight">Admin<span className="text-gray-500">Panel</span></span>
                )}
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <div className={`
                            flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200
                            ${isActive
                                    ? "bg-purple-600/10 text-purple-400 border border-purple-600/20"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }
                        `}>
                                <item.icon className="text-xl flex-shrink-0" />
                                {!isCollapsed && <span className="font-medium">{item.label}</span>}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={onLogout}
                    className={`
                    w-full flex items-center gap-4 px-4 py-3 rounded-xl 
                    text-red-400 hover:bg-red-500/10 transition-all duration-200
                `}
                >
                    <FaSignOutAlt className="text-xl flex-shrink-0" />
                    {!isCollapsed && <span className="font-medium">Déconnexion</span>}
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex">
            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                className="fixed left-0 top-0 h-full bg-[#111] border-r border-white/5 z-40 hidden md:flex flex-col overflow-hidden"
            >
                <SidebarContent isCollapsed={!isSidebarOpen} onLogout={logout} />
            </motion.aside>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 h-full w-[280px] bg-[#111] border-r border-white/5 z-[60] flex md:hidden flex-col"
            >
                <div className="absolute top-4 right-4 text-gray-400 p-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <FaTimes size={20} />
                </div>
                <SidebarContent onLogout={logout} />
            </motion.aside>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 w-full ${isSidebarOpen ? "md:ml-[280px]" : "md:ml-[80px]"}`}>
                <header className="h-16 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-gray-400 hover:text-white p-2 hidden md:block"
                        >
                            <FaBars />
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="text-gray-400 hover:text-white p-2 md:hidden"
                        >
                            <FaBars />
                        </button>
                        <span className="md:hidden font-bold tracking-tight ml-2">Admin<span className="text-gray-500">Panel</span></span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 ring-2 ring-white/10" />
                    </div>
                </header>

                <main className="p-4 md:p-10 max-w-7xl mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );

}
