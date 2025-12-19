"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaGithub, FaLinkedin, FaTwitter, FaCode, FaRobot, FaChartLine, FaCheck, FaStar, FaQuoteLeft, FaSpinner } from 'react-icons/fa';
import api, { Project, Article, Service } from '@/lib/api';
import { projects as staticProjects, articles as staticArticles, services as staticServices, skills } from '@/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: FaCode,
  automation: FaRobot,
  chart: FaChartLine,
};

// Stats data
const stats = [
  { value: "5+", label: "Années d'expérience" },
  { value: "50+", label: "Projets réalisés" },
  { value: "30+", label: "Clients satisfaits" },
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all data in parallel
        const [projectsData, articlesData, servicesApiData] = await Promise.all([
          api.getFeaturedProjects(),
          api.getLatestArticles(),
          api.getServices()
        ]);

        // Set projects (fallback to static if empty)
        if (projectsData.length > 0) {
          setFeaturedProjects(projectsData.slice(0, 3));
        } else {
          setFeaturedProjects(staticProjects.filter(p => p.featured).slice(0, 3));
        }

        // Set articles (fallback to static if empty)
        if (articlesData.length > 0) {
          setLatestArticles(articlesData.slice(0, 2));
        } else {
          setLatestArticles(staticArticles.slice(0, 2).map(a => ({
            ...a,
            published_at: a.published_at || new Date().toISOString(),
            created_at: a.published_at || new Date().toISOString()
          })));
        }

        // Set services (fallback to static if empty)
        if (servicesApiData.length > 0) {
          setServicesData(servicesApiData);
        } else {
          setServicesData(staticServices);
        }

      } catch (error) {
        console.error("Error fetching homepage data", error);
        // Fallback to static
        setFeaturedProjects(staticProjects.filter(p => p.featured).slice(0, 3));
        setLatestArticles(staticArticles.slice(0, 2).map(a => ({
          ...a,
          published_at: a.published_at || new Date().toISOString(),
          created_at: a.published_at || new Date().toISOString()
        })));
        setServicesData(staticServices);
      } finally {
        setLoading(false);
      }
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 text-sm font-semibold bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-full border border-gray-200 shadow-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Disponible pour nouveaux projets
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] mb-8 tracking-tight"
            >
              <span className="block text-gray-900">Paul Maxime</span>
              <span className="gradient-text">Dossou</span>
            </motion.h1>

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
            </motion.div>


          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
          </motion.div>
        </motion.div>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-[#e94560] bg-red-50 rounded-full">
              Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Mes <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions complètes pour développer votre présence digitale et maximiser votre retour sur investissement
            </p>
          </motion.div>

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
                      {service.features.slice(0, 3).map((feature) => (
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
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                    {(Array.isArray(project.tech_stack) ? project.tech_stack : JSON.parse((project.tech_stack as any) || '[]')).slice(0, 3).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {(Array.isArray(project.tech_stack) ? project.tech_stack : JSON.parse((project.tech_stack as any) || '[]')).length > 3 && (
                      <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded-full">
                        +{(Array.isArray(project.tech_stack) ? project.tech_stack : JSON.parse((project.tech_stack as any) || '[]')).length - 3}
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
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
