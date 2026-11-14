import type { MetadataRoute } from "next";
import { kgm, absoluteUrl } from "@/data/kgm-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...kgm.sections.map((s) => ({
      url: absoluteUrl(s.href),
      changeFrequency: "monthly" as const,
      priority: s.href === "/" ? 1 : 0.8,
    })),
    { url: absoluteUrl("/privacidad/"), changeFrequency: "yearly" as const, priority: 0.3 },
  ];
}
