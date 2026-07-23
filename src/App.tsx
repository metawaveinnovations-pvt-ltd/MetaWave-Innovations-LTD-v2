import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// SEO Manager
import { SEOManager } from './components/SEOManager';
import { LegalModal } from './components/LegalModal';

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
import { WebDevelopment } from './components/WebDevelopment';
import { MobileDevelopment } from './components/MobileDevelopment';
import { CustomSoftwareDevelopment } from './components/CustomSoftwareDevelopment';
import { FullStackDevelopment } from './components/FullStackDevelopment';
import { UiUxDesign } from './components/UiUxDesign';
import { CloudSolutions } from './components/CloudSolutions';
import { AiMachineLearning } from './components/AiMachineLearning';
import { BusinessAutomation } from './components/BusinessAutomation';
import { DigitalMarketing } from './components/DigitalMarketing';
import { SeoServices } from './components/SeoServices';
import { EcommerceDevelopment } from './components/EcommerceDevelopment';
import { CrmDevelopment } from './components/CrmDevelopment';
import { ErpDevelopment } from './components/ErpDevelopment';
import { ApiDevelopmentIntegrations } from './components/ApiDevelopmentIntegrations';
import { EnterpriseSystems } from './components/EnterpriseSystems';
import { TechnicalConsulting } from './components/TechnicalConsulting';
import { AiAutomationConsulting } from './components/AiAutomationConsulting';
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
import { Faqs } from './components/Faqs';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { AdvertisementSection } from './components/AdvertisementSection';
import { AD_SLOTS } from './components/ads/adsense';
import { playSound } from './utils/audio';

// Icons for general layout
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(true);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'cookie' | 'faqs' | null>(null);

  // Helper mapping routine to tie dynamic section targets to their parent page boundaries
  const mapSectionToPage = (sectionId: string): string => {
    if (!sectionId) return 'home';
    const cleanId = sectionId.toLowerCase();
    
    if (['privacy', 'privacy-policy'].includes(cleanId)) {
      setLegalModalType('privacy');
      return 'home';
    }
    if (['terms', 'terms-and-conditions'].includes(cleanId)) {
      setLegalModalType('terms');
      return 'home';
    }
    if (['cookie', 'cookie-policy'].includes(cleanId)) {
      setLegalModalType('cookie');
      return 'home';
    }
    if (['faqs', 'faq', 'frequently-asked-questions', 'knowledgebase'].includes(cleanId)) {
      return 'faqs';
    }
    if (['tech-stack', 'technology-stack', 'techstack', 'stack', 'ecosystem'].includes(cleanId)) {
      return 'tech-stack';
    }
    if (['web-development', 'web-dev', 'webdevelopment', 'custom-web-development'].includes(cleanId)) {
      return 'web-development';
    }
    if (['mobile-development', 'mobile-app-development', 'mobile-app', 'mobile-apps', 'mobile'].includes(cleanId)) {
      return 'mobile-development';
    }
    if (['custom-software-development', 'custom-software', 'customsoftware', 'custom-software-dev', 'software-development', 'software'].includes(cleanId)) {
      return 'custom-software-development';
    }
    if (['full-stack-development', 'full-stack', 'fullstack', 'fullstack-development', 'full-stack-dev', 'fullstack-dev'].includes(cleanId)) {
      return 'full-stack-development';
    }
    if (['ui-ux-design', 'ui-ux', 'uiux', 'ui-design', 'ux-design', 'product-design', 'design-systems', 'design'].includes(cleanId)) {
      return 'ui-ux-design';
    }
    if (['cloud-solutions', 'cloud', 'cloud-architecture', 'cloud-services', 'devops', 'kubernetes', 'aws', 'gcp', 'azure'].includes(cleanId)) {
      return 'cloud-solutions';
    }
    if (['ai-machine-learning', 'ai-ml', 'ai-intelligence', 'machine-learning', 'ai', 'ml', 'generative-ai', 'rag', 'llm'].includes(cleanId)) {
      return 'ai-machine-learning';
    }
    if (['business-automation', 'automation', 'workflow-automation', 'rpa', 'process-automation', 'bpm', 'integration-automation', 'workflow'].includes(cleanId)) {
      return 'business-automation';
    }
    if (['seo-services', 'seo', 'search-engine-optimization', 'technical-seo', 'local-seo', 'programmatic-seo', 'geo'].includes(cleanId)) {
      return 'seo-services';
    }
    if (['ecommerce-development', 'ecommerce', 'e-commerce', 'online-store', 'headless-commerce', 'shopify-plus', 'b2b-commerce', 'shopping-cart'].includes(cleanId)) {
      return 'ecommerce-development';
    }
    if (['crm-development', 'crm', 'crm-solutions', 'customer-relationship-management', 'salesforce', 'hubspot', 'custom-crm', 'sales-pipeline'].includes(cleanId)) {
      return 'crm-development';
    }
    if (['erp-development', 'erp', 'erp-solutions', 'enterprise-resource-planning', 'sap', 'netsuite', 'odoo', 'custom-erp', 'inventory-management'].includes(cleanId)) {
      return 'erp-development';
    }
    if (['api-development-integrations', 'api-development', 'api-integration', 'api-integrations', 'rest-api', 'graphql-api', 'microservices', 'webhook-integration', 'api-gateways'].includes(cleanId)) {
      return 'api-development-integrations';
    }
    if (['enterprise-systems', 'enterprise-system', 'enterprise', 'enterprise-software', 'enterprise-architecture', 'legacy-modernization'].includes(cleanId)) {
      return 'enterprise-systems';
    }
    if (['technical-consulting', 'consulting', 'technical-advisory', 'fractional-cto', 'code-audit', 'finops', 'due-diligence'].includes(cleanId)) {
      return 'technical-consulting';
    }
    if (['ai-automation-consulting', 'ai-automation', 'ai-consulting', 'automation-consulting', 'ai-advisory', 'ai-automation-advisory'].includes(cleanId)) {
      return 'ai-automation-consulting';
    }
    if (['digital-marketing', 'marketing', 'ppc', 'growth-marketing', 'performance-marketing', 'cro', 'ad-campaigns'].includes(cleanId)) {
      return 'digital-marketing';
    }

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
    if (['services', 'capabilities', 'process', 'industries', 'development-process', 'web-development', 'mobile-app-development', 'custom-software-development', 'ai-machine-learning', 'cloud-solutions', 'ui-ux-design', 'digital-marketing', 'seo-services'].includes(cleanId)) {
      return 'services';
    }
    if (['careers', 'career', 'jobs', 'openings', 'hiring', 'join-us', 'work-with-us'].includes(cleanId)) {
      return 'careers';
    }
    if (['portfolio', 'endeavors', 'insights', 'work'].includes(cleanId)) {
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
    const pathname = window.location.pathname.replace('/', '');
    return mapSectionToPage(hash || pathname) || 'home';
  });

  const [activeSection, setActiveSection] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    const pathname = window.location.pathname.replace('/', '');
    return hash || pathname || 'home';
  });

  // Monitor mouse movements to power the Dynamic Spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement | null;
      if (target) {
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
          const override = interactive.getAttribute('data-sound');
          if (override) {
            playSound(override as any);
            return;
          }
          if (
            interactive.closest('[aria-label*="Sound"]') || 
            interactive.closest('[title*="Sound"]') || 
            interactive.closest('[aria-label*="Audio"]') || 
            interactive.closest('[title*="Audio"]')
          ) {
            return;
          }
          if (
            interactive.closest('nav') || 
            interactive.closest('[class*="Navbar"]') || 
            interactive.closest('[id*="nav"]') || 
            interactive.closest('[class*="nav-"]')
          ) {
            playSound('nav');
            return;
          }
          if (
            interactive.closest('#capabilities') || 
            interactive.closest('[class*="services"]') || 
            interactive.closest('[id*="services"]')
          ) {
            playSound('service');
            return;
          }
          const tagName = interactive.tagName.toLowerCase();
          if (tagName === 'input' || tagName === 'textarea' || tagName === 'select' || tagName === 'option') {
            playSound('form_input');
            return;
          }
          playSound('click');
        }
      }
    };
    window.addEventListener('click', handleGlobalClick, { capture: true });
    return () => window.removeEventListener('click', handleGlobalClick, { capture: true });
  }, []);

  // Monitor scroll height
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const page = mapSectionToPage(hash);
      setActivePage(page);
      setActiveSection(hash || 'home');
      
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

  // Ultimate routing handler
  const handleNavigatePageOrSection = (targetId: string) => {
    const page = mapSectionToPage(targetId);
    setActivePage(page);
    setActiveSection(targetId);
    
    window.location.hash = `#${targetId}`;
    
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
      
      {/* Dynamic SEO Manager injection for title, meta tags, and JSON-LD schema */}
      <SEOManager currentPath={window.location.pathname + window.location.hash} />

      {/* Legal & Policy Modals */}
      <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />

      {/* 1. Dynamic Spotlight Radial Light */}
      <div
        className="fixed pointer-events-none -z-10 rounded-full transition-[width,height,background-color] duration-500 ease-out hidden md:block"
        style={{
          width: isHovering ? '550px' : '400px',
          height: isHovering ? '550px' : '400px',
          backgroundColor: isHovering ? 'rgba(20, 184, 166, 0.045)' : 'rgba(20, 184, 166, 0.02)',
          filter: 'blur(100px)',
          transform: `translate(${mousePos.x - (isHovering ? 275 : 200)}px, ${mousePos.y - (isHovering ? 275 : 200)}px)`,
        }}
      />
      
      <div
        className="fixed pointer-events-none -z-10 rounded-full transition-[width,height,background-color] duration-300 ease-out hidden md:block"
        style={{
          width: isHovering ? '200px' : '120px',
          height: isHovering ? '200px' : '120px',
          backgroundColor: isHovering ? 'rgba(16, 185, 129, 0.06)' : 'rgba(16, 185, 129, 0.015)',
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
                <TechnologyStack onNavigate={handleNavigatePageOrSection} />
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
                <Services onNavigate={handleNavigatePageOrSection} />
                <DevelopmentProcess />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <Industries />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'web-development' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <WebDevelopment onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'mobile-development' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <MobileDevelopment onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'custom-software-development' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <CustomSoftwareDevelopment onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'full-stack-development' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <FullStackDevelopment onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'ui-ux-design' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <UiUxDesign onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'cloud-solutions' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <CloudSolutions onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'ai-machine-learning' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <AiMachineLearning onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'business-automation' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <BusinessAutomation onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'digital-marketing' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <DigitalMarketing onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'seo-services' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <SeoServices onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'ecommerce-development' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <EcommerceDevelopment onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'crm-development' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <CrmDevelopment onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'erp-development' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <ErpDevelopment onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'api-development-integrations' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <ApiDevelopmentIntegrations onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'enterprise-systems' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <EnterpriseSystems onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'technical-consulting' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <TechnicalConsulting onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'ai-automation-consulting' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <AiAutomationConsulting onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'careers' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <Careers onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'portfolio' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <PortfolioShowcase />
                <AdvertisementSection slot={AD_SLOTS.HOME_BEFORE_PORTFOLIO} format="horizontal" />
                <Insights />
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

            {activePage === 'faqs' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <Faqs onNavigate={handleNavigatePageOrSection} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
              </div>
            )}

            {activePage === 'tech-stack' && (
              <div className="pt-24 md:pt-[100px] animate-fade-in">
                <TechnologyStack onNavigate={handleNavigatePageOrSection} isStandalonePage={true} />
                <AdvertisementSection slot={AD_SLOTS.BETWEEN_SECTIONS} format="horizontal" />
                <CtaSection onCtaclick={handleNavigatePageOrSection} />
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
