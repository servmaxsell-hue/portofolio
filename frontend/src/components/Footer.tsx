import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 border-t border-gray-200 pt-6">
            <div className="container mx-auto px-6 pt-36 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-16">
                    {/* Brand */}
                    <div className="md:col-span-2 space-y-6">
                        <Link href="/" className="inline-block group">
                            <div className="relative w-35 h-35 mb-4 transition-transform ">
                                <Image
                                    src="/logo.png"
                                    alt="Logo Paul Maxime Dossou"
                                    fill
                                    className="object-contain mix-blend-multiply"
                                />
                            </div>
                            <span className="text-2xl font-bold gradient-text">Paul Maxime Dossou</span>
                        </Link>
                        <p className="text-gray-600 max-w-md leading-relaxed text-lg">
                            Développeur Web Fullstack et Expert en Marketing Digital, passionné par la création
                            d&apos;expériences numériques innovantes et performantes.
                        </p>
                        <div className="flex gap-6">
                            <a
                                href="https://github.com/Maxience"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-900 transition-colors transform hover:scale-110"
                                aria-label="GitHub"
                            >
                                <FaGithub size={28} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/paul-maxime-dossou-88a516258/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-[#0077b5] transition-colors transform hover:scale-110"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={28} />
                            </a>
                            <a
                                href="mailto:dossoumaxime888@gmail.com"
                                className="text-gray-400 hover:text-[#e94560] transition-colors transform hover:scale-110"
                                aria-label="Email"
                            >
                                <FaEnvelope size={28} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="pt-2">
                        <h4 className="font-bold text-gray-900 mb-6 text-lg">Navigation</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/about" className="text-gray-600 hover:text-[#e94560] transition-colors font-medium">
                                    À propos
                                </Link>
                            </li>
                            <li>
                                <Link href="/projects" className="text-gray-600 hover:text-[#e94560] transition-colors font-medium">
                                    Projets
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-600 hover:text-[#e94560] transition-colors font-medium">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-gray-600 hover:text-[#e94560] transition-colors font-medium">
                                    Services
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="pt-2">
                        <h4 className="font-bold text-gray-900 mb-6 text-lg">Contact</h4>
                        <ul className="space-y-4 text-gray-600">
                            <li>
                                <a href="mailto:dossoumaxime888@gmail.com" className="hover:text-[#e94560] transition-colors font-medium">
                                    dossoumaxime888@gmail.com
                                </a>
                            </li>
                            <li>
                                <a href="tel:+2290166659836" className="hover:text-[#e94560] transition-colors font-medium flex items-center gap-2">
                                    <FaPhone className="text-sm" /> +229 01 66 65 98 36
                                </a>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-[#e94560] transition-colors font-medium">
                                    Formulaire de contact
                                </Link>
                            </li>
                            <li className="pt-4">
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                    Disponible
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm font-medium">
                        © {currentYear} Paul Maxime Dossou. Tous droits réservés.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-400">
                        <Link href="/privacy" className="hover:text-gray-600 transition-colors">Confidentialité</Link>
                        <Link href="/legal" className="hover:text-gray-600 transition-colors">Mentions légales</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
