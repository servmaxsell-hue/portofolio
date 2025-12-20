"use client";

import React from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPhp, FaLaravel, FaPython, FaGoogle, FaDatabase, FaWordpress, FaVuejs, FaGithub, FaShopify } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiPrisma, SiPostgresql, SiN8N, SiSemrush, SiMake } from "react-icons/si";

const techs = [
    { name: "Next.js", icon: SiNextdotjs },
    { name: "React", icon: FaReact },
    { name: "Vue.js", icon: FaVuejs },
    { name: "Laravel", icon: FaLaravel },
    { name: "WordPress", icon: FaWordpress },
    { name: "Shopify", icon: FaShopify },
    { name: "GitHub", icon: FaGithub },
    { name: "Make.com", icon: SiMake },
    { name: "n8n", icon: SiN8N },
    { name: "Semrush", icon: SiSemrush },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "Python", icon: FaPython },
    { name: "PHP", icon: FaPhp },
    { name: "PostgreSQL", icon: SiPostgresql },
];

export default function TechMarquee() {
    return (
        <div className="py-10 overflow-hidden bg-white/5 backdrop-blur-sm border-y border-white/10 mt-20">
            <div className="animate-marquee whitespace-nowrap flex items-center">
                {[...techs, ...techs].map((tech, index) => (
                    <div
                        key={index}
                        className="inline-flex items-center gap-3 px-8 text-gray-500 hover:text-[#e94560] transition-colors group cursor-default"
                    >
                        <tech.icon size={30} className="group-hover:scale-110 transition-transform" />
                        <span className="text-lg font-bold uppercase tracking-widest">{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
