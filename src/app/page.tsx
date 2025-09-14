import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import TeamSection from '@/components/TeamSection';
import FAQSection from '@/components/FaqSection';
import BookingSection from '@/components/Booking';
import AboutSection from '@/components/About';
import ServicesSection from '@/components/Services';
export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <FAQSection />
      <BookingSection />
    </Layout>
  );
}