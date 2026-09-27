import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { jsonLd, SITE_DESCRIPTION, SITE_NAME, siteUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

// Defaults for every route; pages set their own title, description, canonical and previews
// through `pageMetadata` (src/lib/seo.ts).
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "es_419",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary", title: SITE_NAME, description: SITE_DESCRIPTION },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={cn("dark scheme-dark font-sans", geist.variable)}>
      <body className="flex min-h-dvh flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd({
            "@type": "WebSite",
            name: SITE_NAME,
            url: siteUrl.toString(),
            description: SITE_DESCRIPTION,
            inLanguage: "es",
          })}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
