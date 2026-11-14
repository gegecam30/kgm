import Gallery from "@/components/Gallery";
import { sectionMetadata } from "@/data/section-metadata";

export const metadata = sectionMetadata("/trabajos/");

export default function Page() {
  return <Gallery />;
}
