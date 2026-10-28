import QuoteSection from "@/components/QuoteSection";
import { sectionMetadata } from "@/data/section-metadata";

export const metadata = sectionMetadata("/cotizacion/");

export default function Page() {
  return <QuoteSection />;
}
