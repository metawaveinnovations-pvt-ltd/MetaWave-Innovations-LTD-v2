import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Subcomponents
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustMarquee } from './components/TrustMarquee';
import { Stats } from './components/Stats';
import { Services } from './components/Services';
import { FeaturedSolutions } from './components/FeaturedSolutions';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { Insights } from './components/Insights';
import { DevelopmentProcess } from './components/DevelopmentProcess';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TechnologyStack } from './components/TechnologyStack';
import { TeamSection } from './components/TeamSection';
import { GlobalNetworkSection } from './components/GlobalNetworkSection';
import { GlobalPresence } from './components/GlobalPresence';
import { Testimonials } from './components/Testimonials';
import { Industries } from './components/Industries';
import { AboutUs } from './components/AboutUs';
import { Certifications } from './components/Certifications';
import { Careers } from './components/Careers';
import { CtaSection } from './components/CtaSection';
import { ContactUs } from './components/ContactUs';
import { Blog } from './components/Blog';
import { Shop } from './components/Shop';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { AdvertisementSection } from './components/AdvertisementSection';
import { AD_SLOTS } from './components/ads/adsense';
import { playSound } from './utils/audio';

// Icons for general layout if any
import { ArrowUp, Terminal, Shield, Sparkles } from 'lucide-react';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(true);

  // Helper mapping routine to tie dynamic section targets to their parent page boundaries
  const mapSectionToPage = (sectionId: string): string => {
    if (!sectionId) return 'home';
    const cleanId = sectionId.toLowerCase();
    
    if (['home', 'trustees', 'why-metawave', 'stats', 'why-choose-us', 'executive-team', 'team', 'global-network', 'network', 'global-ecosystem-matrix'].includes(cleanId)) {
      return 'home';
    }
    if (['about', 'stewardship', 'global-presence', 'certifications', 'certifications-compliance', 'testimonials'].includes(cleanId)) {
      return 'about';
    }
    if (['solutions', 'solutions-stack'].includes(cleanId)) {
      return 'solutions';
    }
    if (['shop', 'products-shop'].includes(cleanId)) {
      return 'shop';
    }
    if (['services', 'capabilities', 'process', 'industries', 'development-process'].includes(cleanId)) {
      return 'services';
    }
    if (['portfolio', 'endeavors', 'insights', 'careers', 'work'].includes(cleanId)) {
      return 'portfolio';
    }
    if (['contact', 'ingress'].includes(cleanId)) {
      return 'contact';
    }
    if (['admin'].includes(cleanId)) {
      return 'admin';
    }
    if (['blog', 'blog-posts', 'publications'].includes(cleanId) || cleanId.startsWith('blog-post-')) {
      return 'blog';
    }
    return 'home';
  };

  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return mapSectionToPage(hash) || 'home';
  });

  const [activeSection, setActiveSection] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });

  // Monitor mouse movements to power the Dynamic Spotlight effect and track interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement | null;
      if (target) {
        // Detect buttons, anchor tags, roles, inputs, or cursor-pointer utility elements
        const interactive = target.closest(
          'a, button, [role="button"], input[type="button"], input[type="submit"], select, option, [class*="cursor-pointer"]'
        );
        setIsHovering(!!interactive);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Global tactile click audio feedback interceptor
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input[type="button"], input[type="submit"], select, option, input[type="text"], input[type="email"], textarea, .cursor-pointer, [class*="cursor-pointer"]'
        );
        if (interactive) {
          // 1. Check for manual attribute override
          const override = interactive.getAttribute('data-sound');
          if (override) {
            playSound(override as any);
            return;
          }

          // 2. Audio settings toggle button (ignore to let its click handler toggle & play natively)
          if (
            interactive.closest('[aria-label*="Sound"]') || 
            interactive.closest('[title*="Sound"]') || 
            interactive.closest('[aria-label*="Audio"]') || 
            interactive.closest('[title*="Audio"]')
          ) {
            return;
          }

          // 3. Navigation components (headers, nav elements, mobile menus)
          if (
            interactive.closest('nav') || 
            interactive.closest('[class*="Navbar"]') || 
            interactive.closest('[id*="nav"]') || 
            interactive.closest('[class*="nav-"]')
          ) {
            playSound('nav');
            return;
          }

          // 4. Services / Capabilities grid elements
          if (
            interactive.closest('#capabilities') || 
            interactive.closest('[class*="services"]') || 
            interactive.closest('[id*="services"]')
          ) {
            playSound('service');
            return;
          }

          // 5. Form inputs focus/clicks
          const tagName = interactive.tagName.toLowerCase();
          if (tagName === 'input' || tagName === 'textarea' || tagName === 'select' || tagName === 'option') {
            playSound('form_input');
            return;
          }

          // 6. Fallback standard button/link click
          playSound('click');
        }
      }
    };
    window.addEventListener('click', handleGlobalClick, { capture: true });
    return () => window.removeEventListener('click', handleGlobalClick, { capture: true });
  }, []);

  // Monitor scroll height to trigger scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for hash change to enable backward & forward browser navigation deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const page = mapSectionToPage(hash);
      setActivePage(page);
      setActiveSection(hash || 'home');
      
      // Auto-scrolling viewport sequence
      setTimeout(() => {
        if (hash) {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 120);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Ultimate routing handler used across Navbar tabs, Footer links, and page calls
  const handleNavigatePageOrSection = (targetId: string) => {
    const page = mapSectionToPage(targetId);
    setActivePage(page);
    setActiveSection(targetId);
    
    // Set URL hash cleanly for history retention
    window.location.hash = `#${targetId}`;
    
    // Smooth scrolling alignment
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 120);
  };

  if (activePage === 'admin') {
    return (
      <AdminPanel onExit={() => handleNavigatePageOrSection('home')} />
    );
  }

  return (
    <div className="min-h-screen bg-mwi-base text-slate-800 flex flex-col font-sans relative selection:bg-teal-600/10 selection:text-slate-900">
      
      {/* 1. Dynamic Spotlight Radial Light following user cursor with Hover Interaction */}
      <div
        className="fixed pointer-events-none -z-10 rounded-full transition-[width,height,background-color] duration-500 ease-out hidden md:block"
        style={{
          width: isHovering ? '550px' : '400px',
          height: isHovering ? '550px' : '400px',
          backgroundColor: isHovering ? 'rgba(20, 184, 166, 0.045)' : 'rgba(20, 184, 166, 0.02)', // Glow expand & intensify on hover (Teal)
          filter: 'blur(100px)',
          transform: `translate(${mousePos.x - (isHovering ? 275 : 200)}px, ${mousePos.y - (isHovering ? 275 : 200)}px)`,
        }}
      />
      
      {/* Dynamic Spotlight Core Layer for a dual-layered premium metallic shine effect */}
      <div
        className="fixed pointer-events-none -z-10 rounded-full transition-[width,height,background-color] duration-300 ease-out hidden md:block"
        style={{
          width: isHovering ? '200px' : '120px',
          height: isHovering ? '200px' : '120px',
          backgroundColor: isHovering ? 'rgba(16, 185, 129, 0.06)' : 'rgba(16, 185, 129, 0.015)', // Core glows slightly more emerald and expands
          filter: 'blur(50px)',
          transform: `translate(${mousePos.x - (isHovering ? 100 : 60)}px, ${mousePos.y - (isHovering ? 100 : 60)}px)`,
        }}
      />

      {/* 2. Sticky Glassmorphic Navbar & Announcement Banner */}
      <AnimatePresence>
        {isBannerOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden z-[60] relative"
          >
            <AnnouncementBanner 
              onCtaclick={handleNavigatePageOrSection} 
              onClose={() => setIsBannerOpen(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar 
        onNavClick={handleNavigatePageOrSection} 
        activeSection={activeSection} 
        isBannerOpen={isBannerOpen} 
      />

      {/* 3. Main Multi-Page stage */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {activePage === 'home' && (
              <div className="animate-fade-in">
                <Hero onCtaclick={handleNavigatePageOrSection} />
                <div id="trustees">
                  <TrustMarquee />
                </div>
                <Stats />
                <AdvertisementSection slot={AD_SLOTS.HOME_AFTER_HERO} format="horizontal" />
                <WhyChooseUs />
                <TechnologyStack />
                <TeamSection />
                <GlobalNetworkSection />
                <AdvertisementSection slot={AD_SLOTS.HOME_BEFORE_FOOTER} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'about' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <AboutUs />
                <Certifications />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="fluid" />
                <GlobalPresence />
                <Testimonials />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'solutions' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <FeaturedSolutions onCtaclick={handleNavigatePageOrSection} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'shop' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <Shop onNavigate={handleNavigatePageOrSection} />
                <AdvertisementSection slot={AD_SLOTS.MULTIPLEX} format="fluid" />
              </div>
            )}

            {activePage === 'services' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <Services />
                <DevelopmentProcess />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <Industries />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'portfolio' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <PortfolioShowcase />
                <AdvertisementSection slot={AD_SLOTS.HOME_BEFORE_PORTFOLIO} format="horizontal" />
                <Insights />
                <Careers />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'contact' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <ContactUs />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
              </div>
            )}

            {activePage === 'blog' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <Blog activeSection={activeSection} onNavigate={handleNavigatePageOrSection} />
                <AdvertisementSection slot={AD_SLOTS.BLOG_BOTTOM} format="fluid" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. Multi-column corporate footer */}
      <Footer onNavClick={handleNavigatePageOrSection} />

      {/* Scroll to Top Dynamic backlink */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 p-3 rounded-xl bg-[#326E45] hover:bg-[#20462c] text-white font-bold shadow-md hover:shadow-lg z-40 transition-all cursor-pointer border border-[#326E45]/10"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
