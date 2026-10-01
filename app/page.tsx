import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { ServiceIntentCards } from "@/components/ServiceIntentCards";
import { QuoteProcess } from "@/components/QuoteProcess";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { RealProofGallery } from "@/components/RealProofGallery";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ServiceArea } from "@/components/ServiceArea";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <ServiceIntentCards />
        <QuoteProcess />
        <WhyChooseUs />
        <RealProofGallery />
        {/* Condicional: só renderiza quando houver avaliações reais (§10) */}
        <ReviewsSection />
        <ServiceArea />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
