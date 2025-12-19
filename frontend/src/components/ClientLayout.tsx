"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPath = pathname?.startsWith("/admin");

    return (
        <>
            {!isAdminPath && <Navbar />}
            <main className={isAdminPath ? "" : ""}>{children}</main>
            {!isAdminPath && <Footer />}
        </>
    );
}
