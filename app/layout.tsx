import type { Metadata } from "next";
import { Lora, Geist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-geist",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CALO&CO — Turn ideas into companies people can't ignore.",
  description: "CALO&CO is a growth partner for independent brands and businesses ready to scale.",
  themeColor: "#f7f7f8",
  colorScheme: "light",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/icon-192.png", sizes: "192x192" },
      { rel: "icon", url: "/icon-512.png", sizes: "512x512" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${geist.variable} ${ibmPlexMono.variable}`}>
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <link href="https://fonts.googleapis.com/css2?family=Sacramento&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What does CALO&CO do?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We're a growth partner for independent brands and businesses. Brand and design, marketing and sales, websites and systems — the strategy and the execution, scoped to what your business actually needs."
                }
              },
              {
                "@type": "Question",
                "name": "Who do you work with?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Independent operators with the instinct to build — founders, creators, trades, studios, retail, and digital products. People running real businesses who want to look as serious as they actually are."
                }
              },
              {
                "@type": "Question",
                "name": "How much does it cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Every engagement is scoped to the business. Some clients work with us on a single project, others partner with us over time. We'll talk through what you need and what it costs once we understand what you're building."
                }
              },
              {
                "@type": "Question",
                "name": "How long does it take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It depends on scope. Some projects run a few weeks, others a few months. We'll give you a clear timeline before anything starts — no open-ended engagements."
                }
              },
              {
                "@type": "Question",
                "name": "How do we start?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A short intro call. If it's a fit, we move into a discovery phase, then come back with a recommended path. No pressure, no obligation."
                }
              }
            ]
          }) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
