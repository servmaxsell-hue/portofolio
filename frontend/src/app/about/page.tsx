"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCode, FaAd, FaRobot, FaDatabase, FaDocker, FaPython } from 'react-icons/fa';
import { SiLaravel, SiNextdotjs, SiMake, SiGoogleads } from 'react-icons/si';
import { skills } from '@/data';

interface SkillBarProps {
    name: string;
    level: number;
    delay: number;
}

const SkillBar = ({ name, level, delay }: SkillBarProps) => (
    <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="mb-6"
    >
        <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-800">{name}</span>
            <span className="text-sm text-gray-500">{level}%</span>
        </div>
        <div className="skill-bar">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
                className="skill-bar-fill"
            />
        </div>
    </motion.div>
);

export default function AboutPage() {
    const technicalSkills = skills.filter(s => s.category === 'technical');
    const marketingSkills = skills.filter(s => s.category === 'marketing');

    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto text-center mb-20"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        À propos de <span className="gradient-text">moi</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                        Passionné par la technologie et le marketing depuis plus de 5 ans
                    </p>
                </motion.div>

                {/* Bio Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden relative">
                            <Image
                                src="/images/profile.jpg"
                                alt="Paul Maxime Dossou"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/10 to-[#e94560]/10 mix-blend-overlay" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-3xl -z-10" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center"
                    >
                        <h2 className="text-3xl font-bold mb-6">
                            Développeur Web Fullstack & Expert Marketing Digital
                        </h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                Je suis Paul Maxime Dossou, un développeur web fullstack passionné avec une expertise
                                solide en marketing digital. Mon parcours unique me permet de créer des solutions
                                techniques tout en gardant une vision orientée business et conversion.
                            </p>
                            <p>
                                Spécialisé en <strong>Laravel</strong>, <strong>Next.js</strong> et <strong>Python</strong>,
                                je conçois des applications web performantes et scalables. Côté marketing, je maîtrise
                                <strong> Google Ads</strong>, <strong>Microsoft Ads</strong> et les outils d&apos;automatisation
                                comme <strong>n8n</strong> et <strong>Make.com</strong>.
                            </p>
                            <p>
                                Mon objectif ? Vous aider à développer votre présence en ligne avec des solutions
                                sur mesure qui génèrent des résultats concrets.
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-10">
                            {[
                                { value: '5+', label: 'Années d\'expérience' },
                                { value: '50+', label: 'Projets réalisés' },
                                { value: '30+', label: 'Clients satisfaits' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Skills Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <h2 className="section-title text-center mx-auto mb-16">Compétences</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Technical Skills */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-xl flex items-center justify-center">
                                    <FaCode className="text-white text-xl" />
                                </div>
                                <h3 className="text-2xl font-bold">Compétences Techniques</h3>
                            </div>
                            {technicalSkills.map((skill, index) => (
                                <SkillBar
                                    key={skill.name}
                                    name={skill.name}
                                    level={skill.level}
                                    delay={index * 0.1}
                                />
                            ))}
                        </div>

                        {/* Marketing Skills */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#e94560] to-[#ff6b6b] rounded-xl flex items-center justify-center">
                                    <FaAd className="text-white text-xl" />
                                </div>
                                <h3 className="text-2xl font-bold">Compétences Marketing</h3>
                            </div>
                            {marketingSkills.map((skill, index) => (
                                <SkillBar
                                    key={skill.name}
                                    name={skill.name}
                                    level={skill.level}
                                    delay={index * 0.1}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Tech Stack Icons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="section-title inline-block mb-16">Technologies</h2>

                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            { icon: SiLaravel, name: 'Laravel', color: '#FF2D20' },
                            { icon: SiNextdotjs, name: 'Next.js', color: '#000000' },
                            { icon: FaPython, name: 'Python', color: '#3776AB' },
                            { icon: FaDocker, name: 'Docker', color: '#2496ED' },
                            { icon: FaDatabase, name: 'SQL', color: '#336791' },
                            { icon: FaRobot, name: 'n8n', color: '#EA4B71' },
                            { icon: SiMake, name: 'Make.com', color: '#6D4AFF' },
                            { icon: SiGoogleads, name: 'Google Ads', color: '#4285F4' },
                        ].map((tech, index) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -10, scale: 1.1 }}
                                className="flex flex-col items-center gap-2 p-4"
                            >
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                                    style={{ backgroundColor: `${tech.color}15` }}
                                >
                                    <tech.icon size={32} style={{ color: tech.color }} />
                                </div>
                                <span className="text-sm font-medium text-gray-600">{tech.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
