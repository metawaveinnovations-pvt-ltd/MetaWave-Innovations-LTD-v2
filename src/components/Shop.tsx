import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  SlidersHorizontal, 
  CheckCircle, 
  ArrowLeft, 
  Star, 
  Cpu, 
  Terminal, 
  Database, 
  Cloud, 
  Shield, 
  Server, 
  Copy, 
  Check, 
  CreditCard, 
  Mail, 
  Globe, 
  ArrowRight,
  ChevronRight,
  DollarSign,
  Heart,
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';
import { shopProducts, ShopProduct } from '../data/shopData';
import { playSound } from '../utils/audio';

interface ShopProps {
  onNavigate: (targetId: string) => void;
}

export function Shop({ onNavigate }: ShopProps) {
  // Navigation & filter states
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  
  // Checkout simulator states
  const [licenseTier, setLicenseTier] = useState<'single' | 'team' | 'unlimited'>('single');
  const [deploymentRegion, setDeploymentRegion] = useState<string>('asia-southeast1');
  const [includeDevSupport, setIncludeDevSupport] = useState(true);
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutCompany, setCheckoutCompany] = useState('');
  const [checkoutCardNumber, setCheckoutCardNumber] = useState('4242 4242 4242 4242');
  const [checkoutCardExpiry, setCheckoutCardExpiry] = useState('12/28');
  const [checkoutCardCvc, setCheckoutCardCvc] = useState('424');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [generatedInvoiceNo, setGeneratedInvoiceNo] = useState('');
  const [isCvcVisible, setIsCvcVisible] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Developer blueprint state
  const [activeTab, setActiveTab] = useState<'specs' | 'included' | 'blueprint'>('specs');
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [copiedTextId, setCopiedTextId] = useState<string | null>(null);

  // Smooth scroll back on product click
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedProductId]);

  // Categories helper
  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'saas', label: 'Enterprise SaaS' },
    { id: 'devtools', label: 'Developer Tools' },
    { id: 'compliance', label: 'Compliance & Security' },
    { id: 'hardware', label: 'Hardware' }
  ];

  // Handle Toggle Like
  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('click');
    setLikedProducts(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Copy code helper
  const handleCopyCode = (text: string, id: string) => {
    playSound('click');
    navigator.clipboard.writeText(text);
    setCopiedTextId(id);
    setTimeout(() => setCopiedTextId(null), 2000);
  };

  // Filter & Sort logic
  const filteredProducts = shopProducts
    .filter(prod => {
      const matchesSearch = (prod.name + ' ' + prod.shortDesc + ' ' + prod.categoryLabel)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || prod.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured
    });

  const selectedProduct = shopProducts.find(p => p.id === selectedProductId);

  // Pricing math helper
  const getCalculatedPrice = (basePrice: number) => {
    let multiplier = 1;
    if (licenseTier === 'team') multiplier = 2.5;
    if (licenseTier === 'unlimited') multiplier = 5.0;
    
    let total = basePrice * multiplier;
    if (includeDevSupport) total += 150;
    return Math.round(total);
  };

  // Handle simulated checkout submission
  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!checkoutEmail || !checkoutName || !checkoutCompany) {
      setValidationError('Please fill out all required compliance fields.');
      playSound('toggle');
      return;
    }

    if (!checkoutEmail.includes('@')) {
      setValidationError('Please enter a valid business email.');
      playSound('toggle');
      return;
    }

    setIsProcessing(true);
    playSound('nav'); // Use prebuilt sound trigger

    const invoiceNum = 'MWI-' + Math.floor(100000 + Math.random() * 900000);
    const amountPaid = getCalculatedPrice(selectedProduct?.price || 0);

    const payload = {
      name: checkoutName.trim(),
      email: checkoutEmail.trim(),
      company: checkoutCompany.trim(),
      product_id: selectedProduct?.id || 'unknown',
      product_name: selectedProduct?.name || 'Unknown Product',
      license_tier: licenseTier,
      region: deploymentRegion,
      premium_support: includeDevSupport,
      amount: amountPaid,
      status: 'provisioning',
      invoice_no: invoiceNum
    };

    try {
      const { createClient } = await import('../../lib/supabase/client');
      const sClient = createClient();
      const { error } = await sClient.from('orders').insert([payload]);
      if (error) throw error;
    } catch (err: any) {
      console.warn('Supabase order logging failed. Falling back to LocalStorage:', err.message);
      const saved = localStorage.getItem('mwi_local_orders');
      const currentLocal = saved ? JSON.parse(saved) : [];
      const newOrderLocal = {
        ...payload,
        id: 'o-' + Math.floor(1000 + Math.random() * 9000),
        created_at: new Date().toISOString()
      };
      currentLocal.unshift(newOrderLocal);
      localStorage.setItem('mwi_local_orders', JSON.stringify(currentLocal));
    }

    // Simulate enterprise provisioning delay
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutSuccess(true);
      setGeneratedInvoiceNo(invoiceNum);
      playSound('success'); // Play premium success sound
    }, 2000);
  };

  // Reset checkout states
  const resetCheckout = () => {
    setCheckoutSuccess(false);
    setValidationError('');
    setCheckoutEmail('');
    setCheckoutName('');
    setCheckoutCompany('');
  };

  return (
    <div id="shop-page-wrapper" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      
      <AnimatePresence mode="wait">
        {!selectedProductId ? (
          /* ========================================================= */
          /* SHOP GRID PAGE RENDER                                     */
          /* ========================================================= */
          <motion.div
            key="shop-list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-10"
          >
            {/* Header Section */}
            <div className="max-w-3xl text-left space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-white shadow-2xs select-none">
                <ShoppingBag size={11} className="text-[#326E45] animate-pulse" />
                <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                  MetaWave Innovations Store
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-slate-900 leading-tight">
                Authentic Software & Developer Solutions
              </h1>
              <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed font-normal">
                Directly license our signature production suites, developer boilerplate stacks, and fiscal FBR compliance scripts. Crafted for absolute operational resilience and pre-configured for global Cloud Run deployment.
              </p>
            </div>

            {/* Filter and Command Controls Row */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(15,23,42,0.02)] flex flex-col md:flex-row gap-4 items-center justify-between select-none">
              
              {/* Category selector capsules */}
              <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      playSound('click');
                      setActiveCategory(cat.id);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-gradient-to-r from-[#326E45] to-[#20462c] text-white shadow-sm shadow-emerald-950/10'
                        : 'bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search & Sort combo container */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
                
                {/* Search query input */}
                <div className="relative flex-1 sm:w-64">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Search size={14} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search standard items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 text-xs font-semibold rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#326E45]/20 focus:border-[#326E45] transition-all"
                  />
                </div>

                {/* Sort selector dropdown */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <SlidersHorizontal size={12} />
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      playSound('click');
                      setSortBy(e.target.value);
                    }}
                    className="pl-8 pr-8 py-2 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 text-xs font-bold rounded-xl text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#326E45]/20 focus:border-[#326E45] transition-all appearance-none"
                  >
                    <option value="featured">Featured Order</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>

              </div>

            </div>

            {/* Empty filter results banner */}
            {filteredProducts.length === 0 && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl py-16 px-6 text-center space-y-3">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag size={20} />
                </div>
                <h3 className="text-sm font-bold text-slate-800">No matching items found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto font-normal">
                  Try refining your search keyword or selecting a different product category tab.
                </p>
              </div>
            )}

            {/* Shop Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => {
                const ItemIcon = prod.icon;
                const isLiked = likedProducts.includes(prod.id);
                return (
                  <motion.div
                    layout
                    key={prod.id}
                    onClick={() => setSelectedProductId(prod.id)}
                    className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#326E45]/30 p-5 shadow-[0_4px_25px_rgba(15,23,42,0.01)] hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.1),0_8px_24px_-4px_rgba(15,23,42,0.03)] hover:scale-[1.015] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer relative text-left"
                  >
                    {/* Hover indicator gradient bar */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-500 transition-colors rounded-t-2xl" />

                    <div>
                      {/* Interactive Image Preview with Category Tag */}
                      <div className="rounded-xl overflow-hidden aspect-[16/10] relative mb-4 shadow-2xs">
                        <img 
                          src={prod.featuredImg} 
                          alt={prod.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Custom Badges overlay */}
                        <div className="absolute top-3 left-3 select-none flex flex-col gap-1">
                          <span className="px-2 py-0.5 rounded text-[8px] font-mono font-black uppercase bg-slate-900/95 text-white tracking-widest leading-none">
                            {prod.categoryLabel}
                          </span>
                          {prod.badge && (
                            <span className="px-2 py-0.5 rounded text-[8px] font-mono font-black uppercase bg-emerald-600 text-white tracking-widest leading-none">
                              {prod.badge}
                            </span>
                          )}
                        </div>

                        {/* Heart wishlist save toggler */}
                        <button
                          onClick={(e) => handleToggleLike(prod.id, e)}
                          className="absolute top-3 right-3 w-7 h-7 bg-white/95 hover:bg-white rounded-full flex items-center justify-center text-slate-500 hover:text-rose-500 shadow-xs transition-transform hover:scale-110 active:scale-90"
                          title="Save to wishlist"
                        >
                          <Heart size={12} className={isLiked ? 'fill-rose-500 text-rose-500' : ''} />
                        </button>
                      </div>

                      {/* Title & Star Rating */}
                      <div className="space-y-1.5 mb-2">
                        <div className="flex items-center gap-1">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={10} className="fill-current" />
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold font-mono">({prod.reviewsCount})</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
                          {prod.name}
                        </h3>
                        <p className="text-slate-500 text-xs leading-relaxed font-normal">
                          {prod.shortDesc}
                        </p>
                      </div>

                      {/* Highlights features checklist */}
                      <div className="space-y-1.5 my-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {prod.features.slice(0, 2).map((feat, fIdx) => (
                          <div key={fIdx} className="flex gap-1.5 text-[10.5px] text-slate-600 font-normal leading-tight">
                            <span className="text-[#326E45] font-bold">✓</span>
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing, Deployment status & purchase Button Footer */}
                    <div className="border-t border-slate-100 pt-4 flex items-center justify-between mt-auto">
                      <div className="text-left">
                        <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase leading-none">LICENSING FEE</span>
                        <div className="flex items-baseline gap-0.5 mt-0.5">
                          <span className="text-lg font-display font-extrabold text-slate-900">${prod.price}</span>
                          <span className="text-[10px] text-slate-400 font-mono font-semibold uppercase">/{prod.billingPeriod}</span>
                        </div>
                      </div>

                      <span className="px-3 py-1.5 bg-[#326E45]/10 hover:bg-[#326E45] text-[#326E45] hover:text-white rounded-xl text-[10px] font-bold tracking-wide transition-all select-none flex items-center gap-1 cursor-pointer">
                        <span>Details</span>
                        <ChevronRight size={10} />
                      </span>
                    </div>

                  </motion.div>
                );
              })}
            </div>

          </motion.div>
        ) : (
          /* ========================================================= */
          /* PRODUCT DETAILS PAGE RENDER                               */
          /* ========================================================= */
          <motion.div
            key="shop-details"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-8 text-left"
          >
            {/* Breadcrumb row navigation */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 select-none">
              <button
                onClick={() => {
                  playSound('click');
                  setSelectedProductId(null);
                  resetCheckout();
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer"
              >
                <ArrowLeft size={12} />
                <span>Back to Store Grid</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <span>Store</span>
                <ChevronRight size={10} />
                <span className="text-[#326E45] font-bold">{selectedProduct?.categoryLabel}</span>
              </div>
            </div>

            {selectedProduct && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Media showcase & Technical Blueprints */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Hero banner image */}
                  <div className="rounded-2xl overflow-hidden aspect-[16/9] relative border border-slate-200 bg-slate-50 shadow-xs">
                    <img
                      src={selectedProduct.featuredImg}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 select-none flex flex-col gap-1">
                      <span className="px-2.5 py-1 rounded-md text-[9px] font-mono font-black uppercase bg-slate-900/95 text-white tracking-widest leading-none">
                        {selectedProduct.categoryLabel}
                      </span>
                      {selectedProduct.badge && (
                        <span className="px-2.5 py-1 rounded-md text-[9px] font-mono font-black uppercase bg-emerald-600 text-white tracking-widest leading-none">
                          {selectedProduct.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title block */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} className="fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-slate-400 font-bold font-mono">({selectedProduct.reviewsCount} verified corporate reviews)</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 leading-tight">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {selectedProduct.longDesc}
                    </p>
                  </div>

                  {/* Tab Selector for inner details */}
                  <div className="bg-slate-50/60 p-1.5 rounded-xl border border-slate-200/80 flex gap-1 select-none">
                    <button
                      onClick={() => { playSound('click'); setActiveTab('specs'); }}
                      className={`flex-1 py-2 text-xs font-bold tracking-wide rounded-lg cursor-pointer transition-all ${
                        activeTab === 'specs' 
                          ? 'bg-white border border-slate-200 text-[#326E45] shadow-xs' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Technical Stack
                    </button>
                    <button
                      onClick={() => { playSound('click'); setActiveTab('included'); }}
                      className={`flex-1 py-2 text-xs font-bold tracking-wide rounded-lg cursor-pointer transition-all ${
                        activeTab === 'included' 
                          ? 'bg-white border border-slate-200 text-[#326E45] shadow-xs' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      What's Included
                    </button>
                    <button
                      onClick={() => { playSound('click'); setActiveTab('blueprint'); }}
                      className={`flex-1 py-2 text-xs font-bold tracking-wide rounded-lg cursor-pointer transition-all ${
                        activeTab === 'blueprint' 
                          ? 'bg-white border border-slate-200 text-[#326E45] shadow-xs' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Deployment SLA Blueprint
                    </button>
                  </div>

                  {/* Tab Contents */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
                    <AnimatePresence mode="wait">
                      {activeTab === 'specs' && (
                        <motion.div
                          key="specs"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-4"
                        >
                          <h4 className="text-xs font-mono tracking-widest text-[#326E45] font-black uppercase">CORE SYSTEM SPECIFICATIONS</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            <div className="flex gap-3 items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                              <span className="w-8 h-8 rounded-lg bg-[#326E45]/10 text-[#326E45] flex items-center justify-center shrink-0">
                                <Cpu size={14} />
                              </span>
                              <div>
                                <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">Framework Code</span>
                                <span className="text-xs font-bold text-slate-800 block">{selectedProduct.techSpecs.framework}</span>
                              </div>
                            </div>

                            <div className="flex gap-3 items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                              <span className="w-8 h-8 rounded-lg bg-[#326E45]/10 text-[#326E45] flex items-center justify-center shrink-0">
                                <Database size={14} />
                              </span>
                              <div>
                                <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">Recommended DB</span>
                                <span className="text-xs font-bold text-slate-800 block">{selectedProduct.techSpecs.database}</span>
                              </div>
                            </div>

                            <div className="flex gap-3 items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                              <span className="w-8 h-8 rounded-lg bg-[#326E45]/10 text-[#326E45] flex items-center justify-center shrink-0">
                                <Cloud size={14} />
                              </span>
                              <div>
                                <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">Cloud Deployment</span>
                                <span className="text-xs font-bold text-slate-800 block">{selectedProduct.techSpecs.deployment}</span>
                              </div>
                            </div>

                            <div className="flex gap-3 items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                              <span className="w-8 h-8 rounded-lg bg-[#326E45]/10 text-[#326E45] flex items-center justify-center shrink-0">
                                <Shield size={14} />
                              </span>
                              <div>
                                <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">Governance & Compliance</span>
                                <span className="text-xs font-bold text-slate-800 block">{selectedProduct.techSpecs.compliance}</span>
                              </div>
                            </div>

                          </div>

                          <div className="p-3.5 bg-[#326E45]/5 border border-[#326E45]/20 rounded-xl flex items-center justify-between font-mono text-xs">
                            <span className="text-slate-600 font-semibold uppercase">Operational Service Uptime:</span>
                            <span className="text-[#326E45] font-black">{selectedProduct.techSpecs.sla}</span>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'included' && (
                        <motion.div
                          key="included"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-4 text-left"
                        >
                          <h4 className="text-xs font-mono tracking-widest text-[#326E45] font-black uppercase">WHAT'S INCLUDED IN THE LICENSE</h4>
                          <ul className="space-y-3 pl-1">
                            {selectedProduct.whatsIncluded.map((item, idx) => (
                              <li key={idx} className="flex gap-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                <span className="shrink-0 w-5 h-5 rounded bg-emerald-100 text-[#326E45] flex items-center justify-center text-[10px] font-black mt-0.5">
                                  ✓
                                </span>
                                <span className="font-semibold text-slate-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      {activeTab === 'blueprint' && (
                        <motion.div
                          key="blueprint"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-4 text-left"
                        >
                          <h4 className="text-xs font-mono tracking-widest text-[#326E45] font-black uppercase">DEPLOYMENT SEQUENCE SCHEDULE</h4>
                          <div className="relative pl-6 border-l border-slate-200 space-y-5">
                            {selectedProduct.deploymentSteps.map((step, idx) => (
                              <div key={idx} className="relative">
                                {/* Chronology node */}
                                <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-white border-2 border-[#326E45] flex items-center justify-center font-mono text-[8px] font-black text-[#326E45]">
                                  {idx + 1}
                                </span>
                                <div className="space-y-1">
                                  <span className="text-[10px] font-mono text-slate-400 block font-bold">PHASE 0{idx + 1}</span>
                                  <span className="text-xs sm:text-sm text-slate-600 font-semibold block">{step}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>

                {/* Right Side: Interactive Standard License Checkout Simulator Panel */}
                <div className="lg:col-span-5 bg-white border-2 border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-md relative overflow-hidden">
                  <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-[#326E45]/[0.02] rounded-full blur-xl pointer-events-none" />
                  
                  <AnimatePresence mode="wait">
                    {!checkoutSuccess ? (
                      /* Simulation Active State */
                      <motion.div
                        key="checkout-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6 text-left"
                      >
                        <div className="border-b border-slate-100 pb-3">
                          <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">SECURE TRANSACTION BLUEPRINT</span>
                          <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 mt-1">
                            Standard License Checkout
                          </h3>
                        </div>

                        {/* Validation message error block */}
                        {validationError && (
                          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-[11px] font-semibold text-rose-600 leading-tight">
                            {validationError}
                          </div>
                        )}

                        <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                          
                          {/* 1. Licensing Tier Selector */}
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-mono text-slate-400 font-bold uppercase block">
                              Select License Tier:
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { id: 'single', label: 'Single Dev', multiply: '1x' },
                                { id: 'team', label: 'Team', multiply: '2.5x' },
                                { id: 'unlimited', label: 'Unlimited', multiply: '5x' }
                              ].map((tier) => (
                                <button
                                  type="button"
                                  key={tier.id}
                                  onClick={() => {
                                    playSound('click');
                                    setLicenseTier(tier.id as any);
                                  }}
                                  className={`p-2.5 rounded-xl border text-[10px] font-mono font-bold tracking-tight text-center transition-all cursor-pointer flex flex-col items-center justify-center leading-tight ${
                                    licenseTier === tier.id
                                      ? 'border-[#326E45] bg-emerald-50 text-[#326E45] ring-1 ring-[#326E45]/20'
                                      : 'border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                                  }`}
                                >
                                  <span>{tier.label}</span>
                                  <span className="text-[8px] opacity-60 mt-0.5">{tier.multiply} price</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* 2. Target Deployment Region Selection */}
                          <div className="space-y-1.5">
                            <label htmlFor="deploymentRegion" className="text-[9px] font-mono text-slate-400 font-bold uppercase block">
                              Target Deployment Region:
                            </label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                <Globe size={11} />
                              </span>
                              <select
                                id="deploymentRegion"
                                value={deploymentRegion}
                                onChange={(e) => {
                                  playSound('click');
                                  setDeploymentRegion(e.target.value);
                                }}
                                className="w-full pl-8 pr-8 py-2 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 text-xs font-bold rounded-xl text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#326E45]/20 focus:border-[#326E45] transition-all appearance-none"
                              >
                                <option value="asia-southeast1">Asia Pacific (Singapore • asia-southeast1)</option>
                                <option value="us-central1">United States (Iowa • us-central1)</option>
                                <option value="europe-west1">Western Europe (Belgium • europe-west1)</option>
                                <option value="asia-east1">East Asia (Taiwan • asia-east1)</option>
                              </select>
                            </div>
                          </div>

                          {/* 3. Toggle Developer Premium Support */}
                          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 select-none">
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-bold text-slate-800 block">Premium Dedicated Support</span>
                              <span className="text-[9px] text-slate-400 block font-normal">Add 6 Months Priority SLA for +$150</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                playSound('toggle');
                                setIncludeDevSupport(prev => !prev);
                              }}
                              className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 cursor-pointer flex items-center ${
                                includeDevSupport ? 'bg-[#326E45] justify-end' : 'bg-slate-200 justify-start'
                              }`}
                            >
                              <motion.span layout className="w-4 h-4 rounded-full bg-white shadow-xs block" />
                            </button>
                          </div>

                          {/* 4. Contact / Compliance Fields */}
                          <div className="space-y-3.5 pt-2">
                            <span className="text-[9px] font-mono tracking-widest text-[#326E45] uppercase font-black block">COMPLIANCE & CONTACT BILLING</span>
                            
                            <div className="space-y-1">
                              <label htmlFor="checkoutEmail" className="text-[9.5px] font-bold text-slate-600 block">Business Email Address *</label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                  <Mail size={12} />
                                </span>
                                <input
                                  id="checkoutEmail"
                                  type="email"
                                  required
                                  value={checkoutEmail}
                                  onChange={(e) => setCheckoutEmail(e.target.value)}
                                  placeholder="metawave.innovations@gmail.com"
                                  className="w-full pl-8.5 pr-4 py-2 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 text-xs font-semibold rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#326E45]/20 focus:border-[#326E45]"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label htmlFor="checkoutName" className="text-[9.5px] font-bold text-slate-600 block">Contact Name *</label>
                                <input
                                  id="checkoutName"
                                  type="text"
                                  required
                                  value={checkoutName}
                                  onChange={(e) => setCheckoutName(e.target.value)}
                                  placeholder="John Doe"
                                  className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 text-xs font-semibold rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#326E45]/20 focus:border-[#326E45]"
                                />
                              </div>
                              <div className="space-y-1">
                                <label htmlFor="checkoutCompany" className="text-[9.5px] font-bold text-slate-600 block">Corporate Entity *</label>
                                <input
                                  id="checkoutCompany"
                                  type="text"
                                  required
                                  value={checkoutCompany}
                                  onChange={(e) => setCheckoutCompany(e.target.value)}
                                  placeholder="MetaWave Innovations"
                                  className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 text-xs font-semibold rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#326E45]/20 focus:border-[#326E45]"
                                />
                              </div>
                            </div>
                          </div>

                          {/* 5. Payment details card */}
                          <div className="space-y-3 pt-2">
                            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-black block">MOCK PAYMENT ENGINE</span>
                            
                            <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-3.5 space-y-3">
                              
                              <div className="space-y-1">
                                <label htmlFor="checkoutCardNumber" className="text-[9.5px] font-bold text-slate-600 block">Card Number</label>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <CreditCard size={12} />
                                  </span>
                                  <input
                                    id="checkoutCardNumber"
                                    type="text"
                                    value={checkoutCardNumber}
                                    onChange={(e) => setCheckoutCardNumber(e.target.value)}
                                    className="w-full pl-8.5 pr-4 py-1.5 bg-white border border-slate-200 text-xs font-mono font-medium rounded-xl text-slate-900 focus:outline-none"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label htmlFor="checkoutCardExpiry" className="text-[9.5px] font-bold text-slate-600 block">Expiry Date</label>
                                  <input
                                    id="checkoutCardExpiry"
                                    type="text"
                                    value={checkoutCardExpiry}
                                    onChange={(e) => setCheckoutCardExpiry(e.target.value)}
                                    className="w-full px-3 py-1.5 bg-white border border-slate-200 text-xs font-mono font-medium rounded-xl text-slate-900 focus:outline-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label htmlFor="checkoutCardCvc" className="text-[9.5px] font-bold text-slate-600 block">CVC Security</label>
                                  <div className="relative">
                                    <input
                                      id="checkoutCardCvc"
                                      type={isCvcVisible ? 'text' : 'password'}
                                      value={checkoutCardCvc}
                                      onChange={(e) => setCheckoutCardCvc(e.target.value)}
                                      className="w-full px-3 py-1.5 bg-white border border-slate-200 text-xs font-mono font-medium rounded-xl text-slate-900 focus:outline-none"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => setIsCvcVisible(prev => !prev)}
                                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[8px] font-mono font-bold tracking-tight text-[#326E45] hover:underline"
                                    >
                                      {isCvcVisible ? 'HIDE' : 'SHOW'}
                                    </button>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>

                          {/* Pricing Ledger summary card */}
                          <div className="border-t border-slate-100 pt-4 space-y-1.5">
                            <div className="flex items-center justify-between text-xs text-slate-600">
                              <span>Base License:</span>
                              <span className="font-bold text-slate-800">${selectedProduct.price}</span>
                            </div>
                            {licenseTier !== 'single' && (
                              <div className="flex items-center justify-between text-xs text-slate-600">
                                <span className="capitalize">{licenseTier} Multiplier:</span>
                                <span className="font-bold text-slate-800">
                                  x{licenseTier === 'team' ? '2.5' : '5.0'}
                                </span>
                              </div>
                            )}
                            {includeDevSupport && (
                              <div className="flex items-center justify-between text-xs text-slate-600">
                                <span>Priority SLA Support:</span>
                                <span className="font-bold text-emerald-600">+$150</span>
                              </div>
                            )}
                            
                            <div className="border-t border-slate-150 pt-2 flex items-center justify-between text-slate-900">
                              <span className="text-xs font-black uppercase">Grand Pricing Total:</span>
                              <span className="text-xl font-display font-black text-[#326E45]">
                                ${getCalculatedPrice(selectedProduct.price)}
                              </span>
                            </div>
                          </div>

                          {/* Purchase Button */}
                          <button
                            type="submit"
                            disabled={isProcessing}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#326E45] to-emerald-700 text-white text-xs font-mono font-black tracking-widest uppercase flex items-center justify-center gap-1.5 shadow-md shadow-[#326E45]/15 cursor-pointer disabled:brightness-90 transition-all active:scale-95"
                          >
                            {isProcessing ? (
                              <>
                                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                <span>PROVISIONING ARCHITECTURE...</span>
                              </>
                            ) : (
                              <>
                                <CreditCard size={14} />
                                <span>INITIALIZE PRODUCTION INGRESS</span>
                              </>
                            )}
                          </button>

                        </form>
                      </motion.div>
                    ) : (
                      /* Simulation Purchase Success State */
                      <motion.div
                        key="checkout-success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-center py-8 space-y-6"
                      >
                        <div className="w-14 h-14 bg-emerald-100 text-[#326E45] rounded-full flex items-center justify-center mx-auto text-xl font-bold animate-bounce shadow-xs border-2 border-emerald-300">
                          ✓
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] font-mono tracking-widest text-[#326E45] uppercase font-black block">TRANSACTION AUTHORIZED</span>
                          <h3 className="text-xl font-display font-black text-slate-900">
                            License Provisioned Successfully!
                          </h3>
                          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                            Thank you for partnering with MetaWave Innovations. The compiled production docker code, standard keys and deployment parameters have been issued to your business email inbox.
                          </p>
                        </div>

                        {/* Interactive Simulated Digital Invoice Receipt */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left font-mono text-[10px] space-y-3.5 shadow-inner">
                          <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-2">
                            <span className="font-bold text-slate-800">METAWAVE CORP INVOICE</span>
                            <span className="font-extrabold text-emerald-600">{generatedInvoiceNo}</span>
                          </div>

                          <div className="space-y-1 text-slate-600">
                            <div className="flex justify-between">
                              <span>Client Entity:</span>
                              <span className="font-bold text-slate-800">{checkoutCompany}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Administrator:</span>
                              <span className="font-bold text-slate-800">{checkoutName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Product Key:</span>
                              <span className="font-bold text-slate-800">{selectedProduct.id.toUpperCase()}-SLA-2026</span>
                            </div>
                            <div className="flex justify-between">
                              <span>SLA coverage:</span>
                              <span className="font-bold text-slate-800">{selectedProduct.techSpecs.sla}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Deployment:</span>
                              <span className="font-bold text-slate-800 capitalize">{deploymentRegion} Region</span>
                            </div>
                          </div>

                          {/* Quick sandbox code to preview locally */}
                          <div className="border-t border-dashed border-slate-200 pt-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-400 uppercase tracking-widest block text-[8px]">SANDBOX SHELL COMMAND:</span>
                              <button
                                onClick={() => handleCopyCode(`npx metawave-sandbox deploy --id=${selectedProduct.id} --region=${deploymentRegion} --key=${generatedInvoiceNo}`, 'sandbox-cmd')}
                                className="text-slate-400 hover:text-slate-700 flex items-center gap-1 text-[8.5px] cursor-pointer"
                              >
                                {copiedTextId === 'sandbox-cmd' ? (
                                  <>
                                    <Check size={9} className="text-emerald-500" />
                                    <span>COPIED</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy size={9} />
                                    <span>COPY CMD</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <div className="bg-slate-950 p-2.5 rounded-lg text-emerald-400 text-[9px] font-mono leading-relaxed overflow-x-auto border border-slate-800 select-all">
                              <code>npx metawave-sandbox deploy --id={selectedProduct.id} --region={deploymentRegion} --key={generatedInvoiceNo}</code>
                            </div>
                          </div>

                          <div className="border-t border-dashed border-slate-200 pt-2 flex items-center justify-between text-[11px] text-slate-900 font-extrabold">
                            <span>TOTAL PAID AMOUNT:</span>
                            <span>${getCalculatedPrice(selectedProduct.price)}</span>
                          </div>
                        </div>

                        <div className="pt-2 flex flex-col gap-2">
                          <button
                            onClick={() => {
                              playSound('click');
                              resetCheckout();
                            }}
                            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded-xl transition-all cursor-pointer"
                          >
                            Deploy another license
                          </button>
                          
                          <button
                            onClick={() => {
                              playSound('click');
                              setSelectedProductId(null);
                              resetCheckout();
                            }}
                            className="w-full py-2.5 bg-[#326E45] hover:bg-emerald-700 text-white text-[10px] font-bold rounded-xl transition-all cursor-pointer shadow-xs"
                          >
                            Return to Store Grid
                          </button>
                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
