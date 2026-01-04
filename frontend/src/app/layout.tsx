import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import InteractiveBackground from "@/components/InteractiveBackground";


const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://paulmaximedossou.com'),
  title: {
    default: "Paul Maxime Dossou | Développeur Fullstack & Expert Automatisation Bénin",
    template: "%s | Paul Maxime Dossou"
  },
  description: "Développeur Web Fullstack à Cotonou, Bénin. Expert en automatisation (n8n, Make, Zapier), création d'applications Laravel/Next.js, stratégies Marketing Digital et Google Ads. Transformez vos processus avec l'automatisation intelligente.",
  keywords: [
    // Automatisation - Focus principal
    "expert automatisation n8n",
    "consultant make.com bénin",
    "automatisation workflow",
    "intégration api automatisation",
    "zapier alternative afrique",
    "no-code automation expert",
    // Développement
    "développeur fullstack bénin",
    "développeur web cotonou",
    "développeur laravel freelance",
    "expert next.js react",
    "création application web bénin",
    "développeur javascript fullstack",
    // Marketing Digital
    "expert marketing digital cotonou",
    "consultant google ads bénin",
    "stratégie digitale afrique",
    "spécialiste seo bénin",
    // Géographique
    "agence web cotonou",
    "freelance tech bénin",
    "développeur afrique francophone",
    // Marque
    "Paul Maxime Dossou",
    "Maxience développeur"
  ],
  authors: [{ name: "Paul Maxime Dossou", url: "https://paulmaximedossou.com" }],
  creator: "Paul Maxime Dossou",
  publisher: "Paul Maxime Dossou",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_BJ",
    alternateLocale: ["fr_FR"],
    url: "https://paulmaximedossou.com",
    siteName: "Paul Maxime Dossou - Automatisation & Développement Web Bénin",
    title: "Paul Maxime Dossou | Expert Automatisation n8n & Développeur Fullstack Bénin",
    description: "Développeur Fullstack et Expert en Automatisation à Cotonou, Bénin. Création d'applications web sur mesure, automatisation de processus (n8n, Make), stratégies Marketing Digital performantes.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Paul Maxime Dossou - Expert Automatisation & Développement Web Bénin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Maxime Dossou | Expert Automatisation n8n & Dev Fullstack",
    description: "Automatisation intelligente, Développement Web & Marketing Digital à Cotonou, Bénin",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://paulmaximedossou.com",
    languages: {
      'fr': 'https://paulmaximedossou.com',
    },
  },
  category: "technology",
  other: {
    'geo.region': 'BJ-LI',
    'geo.placename': 'Cotonou',
    'geo.position': '6.3654;2.4183',
  },
};

// JSON-LD Structured Data - Enhanced for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://paulmaximedossou.com/#service",
      name: "Paul Maxime Dossou - Services Web & Automatisation",
      url: "https://paulmaximedossou.com",
      logo: "https://paulmaximedossou.com/logo.png",
      image: "https://paulmaximedossou.com/logo.png",
      description: "Services de développement web fullstack, automatisation de processus métier et marketing digital au Bénin.",
      priceRange: "$$-$$$",
      areaServed: {
        "@type": "Country",
        "name": "Bénin",
        "sameAs": "https://en.wikipedia.org/wiki/Benin"
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cotonou",
        addressRegion: "Littoral",
        addressCountry: "BJ"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 6.3654,
        longitude: 2.4183
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services Digitaux",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Automatisation de Processus",
              description: "Automatisation intelligente avec n8n, Make et Zapier pour optimiser vos workflows"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Développement Web Fullstack",
              description: "Création d'applications web sur mesure avec Laravel et Next.js"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Marketing Digital",
              description: "Stratégies Google Ads et SEO pour maximiser votre ROI"
            }
          }
        ]
      }
    },
    {
      "@type": "Person",
      "@id": "https://paulmaximedossou.com/#person",
      name: "Paul Maxime Dossou",
      alternateName: "Maxience",
      url: "https://paulmaximedossou.com",
      image: "https://paulmaximedossou.com/logo.png",
      sameAs: [
        "https://github.com/Maxience",
        "https://www.linkedin.com/in/paul-maxime-dossou-88a516258/"
      ],
      jobTitle: "Développeur Web Fullstack & Expert Automatisation",
      worksFor: {
        "@type": "Organization",
        name: "Freelance"
      },
      knowsAbout: [
        "Automatisation n8n",
        "Make.com",
        "Zapier",
        "Développement Web",
        "Laravel",
        "Next.js",
        "React",
        "Python",
        "API Integration",
        "Google Ads",
        "Marketing Digital",
        "SEO"
      ],
      knowsLanguage: [
        {
          "@type": "Language",
          name: "Français",
          alternateName: "fr"
        },
        {
          "@type": "Language",
          name: "Anglais",
          alternateName: "en"
        }
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cotonou",
        addressCountry: "BJ"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://paulmaximedossou.com/#website",
      url: "https://paulmaximedossou.com",
      name: "Paul Maxime Dossou - Portfolio",
      description: "Portfolio professionnel de Paul Maxime Dossou, développeur fullstack et expert en automatisation",
      publisher: {
        "@id": "https://paulmaximedossou.com/#person"
      },
      inLanguage: "fr-BJ"
    }
  ]
};

import ClientLayout from "@/components/ClientLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#1a1a2e" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${outfit.variable} font-sans antialiased`} suppressHydrationWarning={true}>
        <AuthProvider>
          <InteractiveBackground />
          <ClientLayout>
            {children}
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
