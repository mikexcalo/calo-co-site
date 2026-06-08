import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mike Calo — Product Marketing & GTM Leader",
  description: "13+ years turning products into categories — from startups like edX to global brands like Liberty Mutual.",
  openGraph: {
    title: "Mike Calo — Product Marketing & GTM Leader",
    description: "13+ years turning products into categories — from startups like edX to global brands like Liberty Mutual.",
    url: "https://calo-co-site.vercel.app/mikecalo",
    type: "profile",
    images: [{ url: "/mikecalo-og.png", width: 1200, height: 630, alt: "Mike Calo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mike Calo — Product Marketing & GTM Leader",
    description: "13+ years turning products into categories.",
    images: ["/mikecalo-og.png"],
  },
};

export default function MikeCaloLayout({ children }: { children: React.ReactNode }) {
  return children;
}
