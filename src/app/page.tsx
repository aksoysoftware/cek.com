import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSlider from '@/components/home/HeroSlider';
import StatsSection from '@/components/home/StatsSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import WhyUsSection from '@/components/home/WhyUsSection';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider />
        <StatsSection />
        <ServicesPreview />
        <WhyUsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
