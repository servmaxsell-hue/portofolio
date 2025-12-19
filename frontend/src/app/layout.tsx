import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import InteractiveBackground from "@/components/InteractiveBackground";



export const metadata: Metadata = {
  metadataBase: new URL('https://maximedossou.com'),
  title: {
    default: "Paul Maxime Dossou | Développeur Fullstack & Expert Marketing Digital",
    template: "%s | Paul Maxime Dossou"
  },
  description: "Développeur Web Fullstack spécialisé Laravel, Next.js, React et Expert en Marketing Digital (Google Ads, Microsoft Ads). Création d'applications web performantes et stratégies marketing ROI-driven.",
  keywords: [
    "développeur fullstack",
    "développeur web",
    "laravel",
    "nextjs",
    "react",
    "php",
    "marketing digital",
    "google ads",
    "microsoft ads",
    "automatisation",
    "n8n",
    "make.com",
    "freelance",
    "consultant",
    "portfolio"
  ],
  authors: [{ name: "Paul Maxime Dossou", url: "https://maximedossou.com" }],
  creator: "Paul Maxime Dossou",
  publisher: "Paul Maxime Dossou",
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
    locale: "fr_FR",
    url: "https://maximedossou.com",
    siteName: "Paul Maxime Dossou - Portfolio",
    title: "Paul Maxime Dossou | Développeur Fullstack & Expert Marketing Digital",
    description: "Développeur Web Fullstack et Expert Marketing Digital. Création d'applications web performantes avec Laravel, Next.js et stratégies publicitaires Google/Microsoft Ads.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Paul Maxime Dossou - Développeur Fullstack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Maxime Dossou | Développeur Fullstack & Expert Marketing",
    description: "Développeur Web Fullstack et Expert Marketing Digital",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "votre-code-verification-google",
  },
  alternates: {
    canonical: "https://maximedossou.com",
  },
  category: "technology",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Paul Maxime Dossou",
  url: "https://maximedossou.com",
  image: "https://maximedossou.com/profile.jpg",
  sameAs: [
    "https://github.com/Maxience",
    "https://www.linkedin.com/in/paul-maxime-dossou-88a516258/"
  ],
  jobTitle: "Développeur Web Fullstack & Expert Marketing Digital",
  worksFor: {
    "@type": "Organization",
    name: "Freelance"
  },
  description: "Développeur Web Fullstack spécialisé en Laravel, Next.js et Expert en Marketing Digital",
  knowsAbout: [
    "Développement Web",
    "Laravel",
    "PHP",
    "Next.js",
    "React",
    "Python",
    "Google Ads",
    "Microsoft Ads",
    "Marketing Digital",
    "Automatisation n8n",
    "Make.com"
  ],
  offers: {
    "@type": "Offer",
    itemOffered: [
      {
        "@type": "Service",
        name: "Développement Web Fullstack",
        description: "Conception et développement d'applications web sur mesure"
      },
      {
        "@type": "Service",
        name: "Automatisation n8n / Make.com",
        description: "Création de workflows automatisés"
      },
      {
        "@type": "Service",
        name: "Marketing Digital & Ads",
        description: "Gestion de campagnes Google Ads et Microsoft Ads"
      }
    ]
  }
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
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a1a2e" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning={true}>
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
