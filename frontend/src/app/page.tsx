"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowRight, FaGithub, FaLinkedin, FaTwitter, FaCode, FaRobot, FaChartLine, FaCheck, FaStar, FaQuoteLeft, FaSpinner, FaDownload, FaEnvelope } from 'react-icons/fa';
import api, { Project, Article, Service } from '@/lib/api';
import { projects as staticProjects, articles as staticArticles, skills } from '@/data';
import { services as staticServices } from '@/data/services-static';
import { Reveal } from '@/components/Reveal';
import TechMarquee from '@/components/TechMarquee';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: FaCode,
  automation: FaRobot,
  chart: FaChartLine,
};

// Stats data
const stats = [
  { value: "5+", label: "Années d'expérience" },
  { value: "50+", label: "Projets réalisés" },
  { value: "48", label: "Clients satisfaits" },
  { value: "100%", label: "Engagement qualité" },
];

// Testimonials
const testimonials = [
  {
    name: "Sophie Martin",
    role: "CEO, TechStartup",
    content: "Maxime a transformé notre vision en réalité. Son expertise technique et sa compréhension du marketing ont fait toute la différence.",
    rating: 5,
  },
  {
    name: "Thomas Dupont",
    role: "Directeur Marketing, AgenceDigitale",
    content: "Les campagnes Google Ads gérées par Maxime ont doublé notre ROI en 3 mois. Un professionnel exceptionnel.",
    rating: 5,
  },
];

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Fetch projects
      try {
        const projectsData = await api.getFeaturedProjects();
        if (projectsData.length > 0) {
          const normalized = projectsData.map(p => ({
            ...p,
            tech_stack: typeof p.tech_stack === 'string' ? JSON.parse(p.tech_stack || '[]') : (p.tech_stack || [])
          }));
          setFeaturedProjects(normalized.slice(0, 3));
        } else {
          setFeaturedProjects(staticProjects.filter(p => p.featured).slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setFeaturedProjects(staticProjects.filter(p => p.featured).slice(0, 3));
      }

      // Fetch articles
      try {
        const articlesData = await api.getLatestArticles();
        if (articlesData.length > 0) {
          const normalized = articlesData.map(a => {
            const rawTags = a.tags as unknown;
            let parsedTags: string[] = [];

            if (typeof rawTags === 'string') {
              parsedTags = rawTags.trim().startsWith('[')
                ? JSON.parse(rawTags)
                : rawTags.split(',').map((t: string) => t.trim());
            } else if (Array.isArray(rawTags)) {
              parsedTags = rawTags as string[];
            }

            return {
              ...a,
              tags: parsedTags
            };
          });
          setLatestArticles(normalized.slice(0, 2));
        } else {
          setLatestArticles(staticArticles.slice(0, 2).map(a => ({
            ...a,
            published_at: a.published_at || new Date().toISOString(),
            created_at: a.published_at || new Date().toISOString()
          })));
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLatestArticles(staticArticles.slice(0, 2).map(a => ({
          ...a,
          published_at: a.published_at || new Date().toISOString(),
          created_at: a.published_at || new Date().toISOString()
        })));
      }

      // Fetch services
      try {
        const servicesApiData = await api.getServices();
        if (servicesApiData.length > 0) {
          const normalized = servicesApiData.map(s => ({
            ...s,
            features: typeof s.features === 'string' ? JSON.parse(s.features || '[]') : (s.features || []),
            benefits: typeof s.benefits === 'string' ? JSON.parse(s.benefits || '[]') : (s.benefits || []),
            technologies: typeof s.technologies === 'string' ? JSON.parse(s.technologies || '[]') : (s.technologies || [])
          }));
          setServicesData(normalized);
        } else {
          setServicesData(staticServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServicesData(staticServices);
      }

      // Fetch settings
      try {
        const settingsData = await api.getSettings();
        if (settingsData) {
          setSettings(settingsData);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  const technicalSkills = skills.filter(s => s.category === 'technical').slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-gray-400" />
      </div>
    );
  }

  return (
    <>
      {/* Hero Section - Enhanced */}
      <section className="min-h-screen flex items-center justify-center relative pt-20" aria-label="Introduction">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">

            <Reveal width="100%">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] mb-8 mt-20 tracking-tight">
                <span className="block text-gray-900">Paul Maxime</span>
                <span className="gradient-text">Dossou</span>
              </h1>
            </Reveal>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-6 max-w-3xl mx-auto font-light"
            >
              Développeur Web <span className="font-semibold text-gray-900">Fullstack</span> & Expert <span className="font-semibold text-gray-900">Marketing Digital</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
            >
              Je transforme vos idées en solutions web performantes et vos budgets publicitaires en résultats concrets.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link href="/projects" className="btn-primary text-lg px-8 py-4">
                Découvrir mes projets
                <FaArrowRight className="ml-2" />
              </Link>
              <Link href="/contact" className="btn-secondary text-lg px-8 py-4">
                Discutons de votre projet
              </Link>
              {settings.cv_url && (
                <a
                  href={settings.cv_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors font-medium px-4 py-2 group"
                >
                  <FaDownload className="group-hover:translate-y-0.5 transition-transform" />
                  <span>Mon CV</span>
                </a>
              )}
            </motion.div>

            <TechMarquee />
          </div>
        </div>

      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#1a1a2e] to-[#0f3460]" aria-label="Statistiques">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced */}
      <section className="section" aria-label="Services proposés" id="services">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-[#e94560] bg-red-50 rounded-full">
              Expertise
            </span>
            <Reveal width="100%" delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Mes <span className="gradient-text">Services</span>
              </h2>
            </Reveal>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions complètes pour développer votre présence digitale et maximiser votre retour sur investissement
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => {
              const IconComponent = iconMap[service.icon] || FaCode;
              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-8 group hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />

                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <IconComponent className="text-white text-2xl" />
                    </div>

                    <h3 className="text-2xl font-bold mb-4 group-hover:text-[#1a1a2e] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {(service.features || []).slice(0, 3).map((feature: string) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                          <FaCheck className="text-[#e94560] flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center font-semibold text-[#1a1a2e] hover:text-[#e94560] transition-colors group/link"
                    >
                      En savoir plus
                      <FaArrowRight className="ml-2 text-sm group-hover/link:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/services" className="btn-secondary">
              Voir tous les services
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section - Enhanced */}
      <section className="section bg-gray-50" aria-label="Projets en vedette" id="projects">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-[#0f3460] bg-blue-50 rounded-full">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Projets <span className="gradient-text">en vedette</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez une sélection de mes réalisations les plus marquantes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card group overflow-hidden"
              >
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                  )}
                  {project.featured && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white text-xs font-semibold rounded-full z-10 shadow-lg">
                      ⭐ En vedette
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/90 to-[#0f3460]/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <Link href={`/projects/${project.slug}`} className="text-white font-semibold text-lg">Voir le projet →</Link>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#e94560] transition-colors">
                    <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(project.tech_stack) ? project.tech_stack : JSON.parse((project.tech_stack as unknown as string) || '[]')).slice(0, 3).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {(Array.isArray(project.tech_stack) ? project.tech_stack : JSON.parse((project.tech_stack as unknown as string) || '[]')).length > 3 && (
                      <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded-full">
                        +{(Array.isArray(project.tech_stack) ? project.tech_stack : JSON.parse((project.tech_stack as unknown as string) || '[]')).length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/projects" className="btn-primary">
              Voir tous les projets
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
      {/* Why Collaborate With Me Section - SEO Rich */}
      <section className="section overflow-hidden" aria-label="Pourquoi collaborer avec Paul Maxime Dossou">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
                Votre Partenaire de Croissance
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Pourquoi collaborer <br />
                <span className="gradient-text">avec moi ?</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Plus qu&apos;un simple prestataire technique, je suis votre partenaire stratégique. Ma double expertise en <strong>développement web fullstack</strong> et <strong>marketing digital</strong> me permet de concevoir des solutions qui ne sont pas seulement esthétiques, mais véritablement orientées vers la performance et la croissance de votre business.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Vision ROI-Driven",
                    desc: "Chaque ligne de code est pensée pour servir vos objectifs commerciaux et maximiser votre retour sur investissement.",
                    icon: FaChartLine,
                    color: "text-green-500",
                    bg: "bg-green-50"
                  },
                  {
                    title: "Expertise Multi-facettes",
                    desc: "Une maîtrise complète : du code (Next.js, Laravel) à l'automatisation (n8n, Make) jusqu'à l'acquisition (Google Ads).",
                    icon: FaCode,
                    color: "text-purple-500",
                    bg: "bg-purple-50"
                  },
                  {
                    title: "Accompagnement Sur-mesure",
                    desc: "Pas de solution générique. Je m'immerge dans votre projet pour proposer des stratégies uniques et adaptées.",
                    icon: FaRobot,
                    color: "text-blue-500",
                    bg: "bg-blue-50"
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={item.color} size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-gray-900">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden relative shadow-2xl">
                <Image
                  src="/logo.png"
                  alt="Paul Maxime Dossou - Expert Solutions Digitales"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <p className="text-2xl font-bold mb-2">Engagé pour votre succès.</p>
                    <p className="text-white/80">Développement, Automation & Marketing Digital</p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Process Section - SEO Rich */}
      <section className="section bg-white" aria-label="Mon processus de travail">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-purple-600 bg-purple-50 rounded-full">
              Méthodologie
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Mon <span className="gradient-text">Processus</span> de Travail
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une approche structurée et transparente pour transformer vos idées en succès commercial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/4 left-0 w-full h-0.5 bg-gray-100 -z-10" />

            {[
              {
                step: "01",
                title: "Stratégie & Audit",
                desc: "Analyse profonde de votre marché, de vos concurrents et identification des leviers de croissance prioritaires.",
                icon: FaChartLine,
                color: "from-blue-500 to-blue-600"
              },
              {
                step: "02",
                title: "Conception & Architecture",
                desc: "Définition de l'expérience utilisateur (UX) et choix du stack technique le plus adapté (Next.js, Laravel).",
                icon: FaCode,
                color: "from-purple-500 to-purple-600"
              },
              {
                step: "03",
                title: "Développement & Automation",
                desc: "Codage agile de votre solution et mise en place d'automatisations intelligentes pour vos processus métier.",
                icon: FaRobot,
                color: "from-indigo-500 to-indigo-600"
              },
              {
                step: "04",
                title: "Lancement & Tracking",
                desc: "Déploiement sécurisé, lancement de vos campagnes Ads et mise en place d'un suivi précis pour mesurer l'impact.",
                icon: FaArrowRight,
                color: "from-[#e94560] to-[#ff6b6b]"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group lg:px-4"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10 mx-auto lg:mx-0`}>
                  <item.icon />
                </div>
                <div className="text-center lg:text-left">
                  <span className="text-5xl font-black text-gray-100 absolute -top-4 right-0 lg:right-auto lg:left-0 -z-0 opacity-50 group-hover:opacity-100 transition-opacity">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 relative z-10">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 p-8 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="text-2xl">🤝</span>
              </div>
              <div>
                <h4 className="text-xl font-bold">Un projet en tête ?</h4>
                <p className="text-gray-600">Commençons par analyser vos besoins ensemble.</p>
              </div>
            </div>
            <Link href="/contact" className="btn-primary">
              Planifier un appel gratuit
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section" aria-label="Compétences techniques">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-[#1a1a2e] bg-gray-100 rounded-full">
              Technologies
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Stack <span className="gradient-text">Technique</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Maîtrise des technologies modernes pour des solutions performantes
            </p>
          </motion.div>

          {/* Using static skills, which is fine, as they are not dynamic in DB currently, or at least no request to make them dynamic */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {technicalSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 text-center group hover:shadow-xl transition-all"
              >
                <div className="text-3xl font-bold gradient-text mb-2">{skill.level}%</div>
                <div className="font-semibold text-gray-800 mb-2">{skill.name}</div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-[#1a1a2e] to-[#0f3460] rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/about" className="btn-secondary">
              Toutes mes compétences
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="section bg-gray-50" aria-label="Témoignages clients">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-amber-600 bg-amber-50 rounded-full">
              Témoignages
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ce que disent mes <span className="gradient-text">clients</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-8 relative"
              >
                <FaQuoteLeft className="absolute top-6 right-6 text-4xl text-gray-100" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="section" aria-label="Derniers articles" id="blog">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-green-600 bg-green-50 rounded-full">
              Blog
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Derniers <span className="gradient-text">articles</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Astuces, tutoriels et réflexions sur le développement web et le marketing digital
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {latestArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card group overflow-hidden"
              >
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f3460]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                    <span className="text-white font-semibold">Lire l&apos;article →</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{new Date(article.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span>•</span>
                    <span>{article.read_time} min de lecture</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#e94560] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-gray-900 hover:text-[#e94560] transition-colors"
                  >
                    Lire la suite
                    <FaArrowRight className="ml-2 text-xs" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/blog" className="btn-secondary">
              Tous les articles
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - Grid Inspired */}
      <section className="section bg-white border-t border-gray-50" aria-label="Foire aux questions">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Questions <span className="gradient-text">Fréquentes</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto italic">
              Des réponses claires pour lever vos doutes et lancer votre projet sereinement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
            {[
              {
                q: "Pourquoi choisir Paul Maxime plutôt qu'une agence classique ?",
                a: "Je cumule l'agilité d'un développeur fullstack de haut niveau et la vision stratégique d'un expert marketing digital. Là où une agence multiplie les intermédiaires, je vous offre un interlocuteur unique pour un ROI optimisé de bout en bout."
              },
              {
                q: "Transparence budgétaire : Comment s'adapter ?",
                a: "Chaque projet est unique. J'offre des solutions modulables : de l'accompagnement ponctuel au forfait complet. Mon objectif est que chaque euro investi génère de la valeur mesurable pour votre entreprise."
              },
              {
                q: "Pilotage de projet : Comment rester informé ?",
                a: "Zéro zone d'ombre. Vous avez accès à un espace de suivi en temps réel (Notion/Trello) et nous tenons des points réguliers. Vous validez chaque étape majeure avant de passer à la suivante."
              },
              {
                q: "Héritage technique : Pouvez-vous auditer mon site ?",
                a: "Absolument. Avant de tout reconstruire, je réalise un audit profond (SEO, performance, conversion). Si votre socle est bon, nous l'optimisons. S'il est cassé, je vous propose une refonte stratégique."
              },
              {
                q: "Haute complexité : Quelle est votre approche ?",
                a: "Plus c'est complexe, plus j'aime ça. J'utilise des architectures scalables (Next.js, Laravel) et des systèmes d'automation robustes (n8n, Make) pour transformer vos défis métier en outils fluides."
              },
              {
                q: "Rapidité d'exécution : Quels sont vos délais ?",
                a: "L'efficacité est ma priorité. Comptez de 10 jours pour une landing page performante à 6-8 semaines pour une plateforme SaaS complète. Je m'engage sur des dates de livraison fermes."
              },
              {
                q: "Audit SEO : Quel investissement prévoir ?",
                a: "Un audit est le point de départ de votre croissance. Il permet d'identifier les 'quick wins' et de poser une stratégie long-terme pour diviser radicalement votre coût d'acquisition client."
              },
              {
                q: "Engagement de résultats : Peut-on garantir le succès ?",
                a: "Je ne vends pas de magie, mais une méthode data-driven. Je m'engage sur la performance technique (Core Web Vitals) et sur une optimisation continue pour maximiser vos taux de conversion."
              }
            ].map((item, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer h-fit"
              >
                <summary className="font-bold text-lg list-none flex items-center justify-between">
                  <span className="pr-4">{item.q}</span>
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#1a1a2e] group-hover:text-white transition-colors">
                    <FaArrowRight className="text-sm -rotate-45 group-open:rotate-45 transition-transform" />
                  </div>
                </summary>
                <div className="mt-4 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                  {item.a}
                </div>
              </motion.details>
            ))}
          </div>

          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6 max-w-4xl mx-auto">
            <div className="bg-[#1a1a2e] text-white px-8 py-4 rounded-full flex items-center gap-4 shadow-xl">
              <FaEnvelope />
              <span className="font-semibold">contact@paulmaximedossou.com</span>
            </div>
            <p className="text-gray-500 text-center md:text-left">
              Pour toute autre question, n&apos;hésitez pas à me contacter.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="section bg-gradient-to-br from-[#1a1a2e] via-[#0f3460] to-[#1a1a2e] text-white relative overflow-hidden" aria-label="Appel à l'action">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e94560]/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              🚀 Prêt à démarrer ?
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transformons vos idées<br />en <span className="text-[#e94560]">réalité</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Que ce soit pour un site web, une application, ou une stratégie marketing,
              je suis là pour vous accompagner vers le succès.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all hover:-translate-y-1 shadow-lg"
              >
                Démarrer un projet
                <FaArrowRight className="ml-2" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/10 transition-all"
              >
                Voir mes services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
