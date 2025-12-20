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
  metadataBase: new URL('https://maximedossou.com'),
  title: {
    default: "Paul Maxime Dossou | Expert Développeur Fullstack & Marketing Digital",
    template: "%s | Paul Maxime Dossou"
  },
  description: "Boostez votre croissance avec Paul Maxime Dossou, Développeur Web Fullstack (Laravel, Next.js) et Expert Marketing Digital. Solutions sur mesure en développement d'applications, automatisation (n8n, Make) et campagnes Ads haute performance.",
  keywords: [
    "Expert Développeur Fullstack",
    "Développeur Laravel Freelance",
    "Expert Next.js React",
    "Consultant Marketing Digital",
    "Spécialiste Google Ads",
    "Automation Expert n8n Make",
    "Création Application Web",
    "Stratégie Digitale ROI",
    "Paul Maxime Dossou",
    "Portfolio Développeur Web"
  ],
  authors: [{ name: "Paul Maxime Dossou", url: "https://maximedossou.com" }],
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
    locale: "fr_FR",
    url: "https://maximedossou.com",
    siteName: "Paul Maxime Dossou - Solutions Web & Marketing",
    title: "Paul Maxime Dossou | Expert Solutions Digitales",
    description: "Développement d'applications Web performantes et stratégies Marketing Digital ROI-driven. Découvrez mon expertise en Laravel, Next.js et Google Ads.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Paul Maxime Dossou - Expert Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Maxime Dossou | Expert Développeur & Marketing",
    description: "Développement Web & Stratégies Marketing Digital",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://maximedossou.com",
  },
  category: "technology",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Paul Maxime Dossou",
  url: "https://maximedossou.com",
  logo: "https://maximedossou.com/logo.png",
  image: "https://maximedossou.com/logo.png",
  sameAs: [
    "https://github.com/Maxience",
    "https://www.linkedin.com/in/paul-maxime-dossou-88a516258/"
  ],
  jobTitle: "Développeur Web Fullstack & Expert Marketing Digital",
  description: "Développeur Web Fullstack spécialisé en Laravel, Next.js et Expert en Marketing Digital avec une vision orientée business.",
  address: {
    "@type": "PostalAddress",
    "addressLocality": "Cotonou",
    "addressCountry": "BJ"
  },
  priceRange: "$$$",
  knowsAbout: [
    "Développement Web",
    "Laravel",
    "Next.js",
    "React",
    "n8n",
    "Google Ads",
    "Marketing Digital"
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
