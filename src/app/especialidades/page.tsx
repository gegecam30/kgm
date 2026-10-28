import ServicesGrid from "@/components/ServicesGrid";
import { sectionMetadata } from "@/data/section-metadata";

export const metadata = sectionMetadata("/especialidades/");

export default function Page() {
  return <ServicesGrid />;
}
