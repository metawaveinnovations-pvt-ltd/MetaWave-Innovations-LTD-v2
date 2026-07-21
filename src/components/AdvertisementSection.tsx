import { useEffect, useRef, useState } from 'react';
import { ADSENSE_CLIENT, AD_SLOTS } from './ads/adsense';
import { Sparkles, Shield, Compass } from 'lucide-react';

interface AdvertisementSectionProps {
  /**
   * Google AdSense Slot ID (mapped from central adsense config)
   */
  slot?: string;
  /**
   * Custom wrapper styling classes
   */
  className?: string;
  /**
   * Layout format for responsive configurations
   */
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  /**
   * Responsive layout directive to occupy matching width containers
   */
  responsive?: boolean;
}

export function AdvertisementSection({
  slot = AD_SLOTS.HOME_HERO,
  className = '',
  format = 'auto',
  responsive = true,
}: AdvertisementSectionProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const [isAdBlockerActive, setIsAdBlockerActive] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdFilled, setIsAdFilled] = useState(false);

  // 1. Safe detection of Ad Blocker or loaded state
  useEffect(() => {
    const timer = setTimeout(() => {
      if (adRef.current && adRef.current.offsetHeight === 0) {
        setIsAdBlockerActive(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // 2. Initialize ad slot with defensive try-catch and prevent duplicate push
  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';
    const isPlaceholderClient = ADSENSE_CLIENT.includes('XXXX') || ADSENSE_CLIENT === 'ca-pub-3940256099942544';

    // In development or when using placeholder publisher client ID, show the premium placeholder
    if (isDev || isPlaceholderClient) {
      setIsLoaded(false);
      return;
    }

    try {
      // @ts-ignore
      const adsbygoogle = window.adsbygoogle || [];
      // Push empty object to initialize this specific slot
      adsbygoogle.push({});
      setIsLoaded(true);

      // Periodically check if AdSense successfully loaded actual ad contents
      const checkAdStatus = setInterval(() => {
        if (adRef.current) {
          const status = adRef.current.getAttribute('data-ad-status');
          if (status === 'filled') {
            setIsAdFilled(true);
            clearInterval(checkAdStatus);
          } else if (adRef.current.querySelector('iframe')) {
            setIsAdFilled(true);
            clearInterval(checkAdStatus);
          }
        }
      }, 1000);

      return () => {
        clearInterval(checkAdStatus);
      };
    } catch (e) {
      console.warn('Google AdSense initialization handled gracefully:', e);
    }
  }, [slot]);

  // Height configurations to completely eliminate Cumulative Layout Shift (CLS)
  const formatHeights = {
    horizontal: 'min-h-[100px] md:min-h-[140px]',
    vertical: 'min-h-[400px] md:min-h-[500px] max-w-[300px]',
    rectangle: 'min-h-[250px] md:min-h-[280px] max-w-[336px]',
    fluid: 'min-h-[140px] md:min-h-[180px]',
    auto: 'min-h-[140px] md:min-h-[180px]',
  };

  const selectedHeight = formatHeights[format] || formatHeights.auto;

  // Show placeholder if in development mode, blocked by AdBlocker, or not yet filled/approved
  const showPlaceholder = !isLoaded || isAdBlockerActive || !isAdFilled;

  return (
    <section 
      className={`w-full py-8 px-4 flex flex-col items-center justify-center overflow-hidden transition-all duration-300 relative ${className}`}
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Aesthetic Label Structure */}
        <div className="flex items-center gap-3 w-full justify-center mb-3 select-none">
          <div className="h-[1px] bg-slate-200/50 dark:bg-slate-800/50 flex-grow max-w-[80px] md:max-w-[150px]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-450 dark:text-slate-500 font-semibold flex items-center gap-1.5">
            <Compass size={11} className="text-slate-450 animate-spin-slow" />
            Advertisement
          </span>
          <div className="h-[1px] bg-slate-200/50 dark:bg-slate-800/50 flex-grow max-w-[80px] md:max-w-[150px]" />
        </div>

        {/* Outer AdSense Compliant Container */}
        <div 
          className={`relative w-full ${selectedHeight} rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 shadow-xs overflow-hidden flex items-center justify-center transition-all hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm group`}
        >
          {/* Real Google AdSense Ins Component */}
          <ins
            ref={adRef}
            className="adsbygoogle block w-full text-center"
            style={{ display: 'block', width: '100%', height: '100%' }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive ? 'true' : 'false'}
          />

          {/* Premium Glassmorphic Fallback Placeholder */}
          {showPlaceholder && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#0E1527] to-[#0B0F19] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
              {/* Soft Gradient Accents */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/15 transition-all duration-700 pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/15 transition-all duration-700 pointer-events-none" />
              
              {/* Glassmorphism Panel with Border Glow */}
              <div className="absolute inset-[1px] rounded-[15px] bg-[#0A0E1A]/95 z-[1] flex flex-col items-center justify-center p-4">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-slate-800/5 to-teal-500/5 opacity-40 animate-pulse pointer-events-none" />

                {/* Content Details */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950/40 border border-emerald-800/40 rounded-full shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-400 uppercase">
                      Google Ad Ready
                    </span>
                  </div>

                  <h4 className="text-sm md:text-base font-display font-bold text-white tracking-tight mt-1">
                    Support MetaWave Innovations
                  </h4>
                  <p className="text-xs text-slate-400 max-w-md">
                    Ads support our next-generation software development and AI engineering initiatives. Thank you for whitelisting our secure domain.
                  </p>

                  <div className="flex items-center gap-4 mt-2 text-[9px] font-mono text-slate-500">
                    <span className="flex items-center gap-1">
                      <Shield size={10} className="text-slate-500" /> Secure Connection
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-800" />
                    <span className="flex items-center gap-1">
                      <Sparkles size={10} className="text-slate-500" /> Non-Intrusive Integration
                    </span>
                  </div>
                </div>
              </div>

              {/* Edge glow line effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-transparent to-teal-500/20 opacity-20 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none" />
            </div>
          )}
        </div>

        {/* Bottom micro border decoration */}
        <div className="flex items-center gap-3 w-full justify-center mt-2.5 select-none">
          <div className="h-[1px] bg-slate-200/20 dark:bg-slate-800/20 flex-grow max-w-[40px]" />
          <span className="text-[8.5px] font-mono text-slate-450 dark:text-slate-500 tracking-wider">
            GOOGLE ADSENSE DIRECTIVE COMPLIANT • ZERO INTRUSIVE CLS
          </span>
          <div className="h-[1px] bg-slate-200/20 dark:bg-slate-800/20 flex-grow max-w-[40px]" />
        </div>
      </div>
    </section>
  );
}
