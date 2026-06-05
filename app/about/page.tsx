import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { buildMetadata } from "../../lib/seo/metadata";
import { JsonLd } from "../../Components/seo/JsonLd";
import { breadcrumbLd, personLd } from "../../lib/seo/jsonld";
import { absoluteUrl, siteConfig } from "../../lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "About Rev. Amar Pandey — Academic Dean of Nepal Theological College, biblical scholar (PhD, Middlesex University), and the team behind Kohamar.",
  path: "/about",
  keywords: [
    "Amar Pandey",
    "Rev. Amar Pandey",
    "Nepal Theological College",
    "biblical scholar",
    "about Kohamar",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        id="ld-about-breadcrumb"
        data={breadcrumbLd([
          { name: "Home", url: siteConfig.url },
          { name: "About", url: absoluteUrl("/about") },
        ])}
      />
      <JsonLd
        id="ld-about-person"
        data={personLd(siteConfig.author.name, {
          jobTitle: siteConfig.author.jobTitle,
          sameAs: siteConfig.author.sameAs as unknown as string[],
        })}
      />
      <AboutClient />
    </>
  );
}
