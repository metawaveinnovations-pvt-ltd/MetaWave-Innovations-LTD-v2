import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Award, 
  Copy, 
  Check, 
  Share2, 
  ThumbsUp, 
  ChevronRight,
  Sparkles,
  BookMarked,
  Filter,
  Layers,
  Code,
  Bookmark,
  Hash,
  ArrowUpRight,
  Send,
  Bell,
  CheckCircle2,
  List,
  Flame,
  X,
  HelpCircle,
  Plus,
  PlusCircle,
  Edit3,
  Trash2,
  Trash,
  PenTool
} from 'lucide-react';
import { blogPosts, BlogPost, BlogPostSection } from '../data/blogData';
import { playSound } from '../utils/audio';
import { AdvertisementSection } from './AdvertisementSection';
import { AD_SLOTS } from './ads/adsense';

interface BlogProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function Blog({ activeSection, onNavigate }: BlogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  
  // Dynamic list of posts state initialized with localStorage
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('metawave_blog_posts_v1');
      if (saved) {
        const parsed = JSON.parse(saved) as BlogPost[];
        // Robustly merge any default posts that are missing in localStorage
        const missingDefaultPosts = blogPosts.filter(
          defaultPost => !parsed.some(savedPost => savedPost.id === defaultPost.id)
        );
        return [...parsed, ...missingDefaultPosts];
      }
      return blogPosts;
    } catch (e) {
      console.error('Failed to load posts from localStorage', e);
      return blogPosts;
    }
  });

  // Sync posts back to localStorage
  useEffect(() => {
    localStorage.setItem('metawave_blog_posts_v1', JSON.stringify(posts));
  }, [posts]);

  // Composer Form management states
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Active inputs for dynamic blog composer
  const [formId, setFormId] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formCategory, setFormCategory] = useState<BlogPost['category']>('Cloud Architecture');
  const [formDifficulty, setFormDifficulty] = useState<BlogPost['difficulty']>('Intermediate');
  const [formReadTime, setFormReadTime] = useState('5 min read');
  const [formAuthorName, setFormAuthorName] = useState('Ali Hassan Chand');
  const [formAuthorRole, setFormAuthorRole] = useState('Founder & CEO');
  const [formAuthorAvatarUrl, setFormAuthorAvatarUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80');
  const [formFeaturedImg, setFormFeaturedImg] = useState('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80');
  const [formTags, setFormTags] = useState('Cloud, Scaling, Architecture');
  const [formSections, setFormSections] = useState<BlogPostSection[]>([
    { type: 'paragraph', text: 'This is the introduction paragraph of your newly published technical blog post.' },
    { type: 'heading', text: 'Innovative Architectural Approaches' },
    { type: 'paragraph', text: 'In this section, explain the detailed technology setup or core principles.' }
  ]);

  // Persisted data in localStorage for bookmarks/likes
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  
  // UI interactive feedback states
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showShareToast, setShowShareToast] = useState(false);
  const [sharedPostTitle, setSharedPostTitle] = useState('');
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [activeHeadingIndex, setActiveHeadingIndex] = useState<number>(0);

  const articleContentRef = useRef<HTMLDivElement>(null);

  // Derive unique categories and tags across all posts
  const categories = ['All', 'Cloud Architecture', 'Artificial Intelligence', 'Frontend Design', 'Cybersecurity', 'Enterprise Strategy'];
  const difficulties = ['All', 'Intermediate', 'Advanced', 'Expert'];
  
  // Extract all tags for interactive tagging matrix
  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  ).slice(0, 10) as string[];

  // Handle Hash/URL deep linking manually if needed for parent compatibility
  const getSelectedPostFromHash = () => {
    if (activeSection.startsWith('blog-post-')) {
      const postId = activeSection.replace('blog-post-', '');
      return posts.find(p => p.id === postId) || null;
    }
    return null;
  };

  const selectedPost = getSelectedPostFromHash();

  // Hydrate bookmarks and interaction stats from localStorage on mount
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('metawave_blog_bookmarks_v1');
      if (savedBookmarks) {
        setBookmarkedIds(JSON.parse(savedBookmarks));
      }
      const savedLikes = localStorage.getItem('metawave_blog_likes_v1');
      if (savedLikes) {
        setLikes(JSON.parse(savedLikes));
      }
      const savedLiked = localStorage.getItem('metawave_blog_liked_v1');
      if (savedLiked) {
        setLiked(JSON.parse(savedLiked));
      }
    } catch (e) {
      console.error('Failed to parse localStorage interactions', e);
    }
  }, []);

  // Sync state changes back to localStorage
  const saveBookmarks = (ids: string[]) => {
    setBookmarkedIds(ids);
    localStorage.setItem('metawave_blog_bookmarks_v1', JSON.stringify(ids));
  };

  const saveLikesAndLiked = (newLikes: Record<string, number>, newLiked: Record<string, boolean>) => {
    setLikes(newLikes);
    setLiked(newLiked);
    localStorage.setItem('metawave_blog_likes_v1', JSON.stringify(newLikes));
    localStorage.setItem('metawave_blog_liked_v1', JSON.stringify(newLiked));
  };

  // Scroll details reading progression tracker
  useEffect(() => {
    const handleScroll = () => {
      if (!selectedPost) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const scrolled = (window.scrollY / totalHeight) * 100;
        setScrollPercentage(scrolled);
      }

      // Automatically trace current active heading section based on user page layout view coordinates
      if (articleContentRef.current) {
        const headings = articleContentRef.current.querySelectorAll('[data-heading-anchor]');
        let currentActive = 0;
        headings.forEach((elem, index) => {
          const rect = elem.getBoundingClientRect();
          if (rect.top <= 160) {
            currentActive = index;
          }
        });
        setActiveHeadingIndex(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (selectedPost) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Reset reading scroll coordinates metric
      setScrollPercentage(0);
      setActiveHeadingIndex(0);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection, selectedPost]);

  // Filtering calculations with multi-tag compound layers
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || post.difficulty === selectedDifficulty;
    
    const matchesSelectedTags = selectedTags.length === 0 || 
      selectedTags.every(tag => post.tags.includes(tag));
      
    const matchesBookmarks = !showBookmarksOnly || bookmarkedIds.includes(post.id);

    return matchesSearch && matchesCategory && matchesDifficulty && matchesSelectedTags && matchesBookmarks;
  });

  const featuredPost = posts[0] || null; // Primary editorial target node

  // Copy code element feedback utility
  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Upvote/Like persistence toggle
  const handleLike = (postId: string) => {
    const prevLikes = { ...likes };
    const prevLiked = { ...liked };
    
    if (prevLiked[postId]) {
      prevLikes[postId] = Math.max(0, (prevLikes[postId] || 0) - 1);
      prevLiked[postId] = false;
    } else {
      prevLikes[postId] = (prevLikes[postId] || 0) + 1;
      prevLiked[postId] = true;
    }
    
    saveLikesAndLiked(prevLikes, prevLiked);
  };

  // Toggle bookmark in local reading list registry
  const handleToggleBookmark = (postId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Avoid triggering route changes on listing views click
    }
    const isBookmarked = bookmarkedIds.includes(postId);
    let updated: string[];
    if (isBookmarked) {
      updated = bookmarkedIds.filter(id => id !== postId);
    } else {
      updated = [...bookmarkedIds, postId];
    }
    saveBookmarks(updated);
  };

  // Clear all set search filters instantly
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedTags([]);
    setShowBookmarksOnly(false);
  };

  // Copy share URL with premium micro-feedback toast
  const handleShare = (post: BlogPost, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    // Formulate a beautiful deep link structure utilizing location hash configurations
    const shareUrl = `${window.location.origin}${window.location.pathname}#blog-post-${post.id}`;
    navigator.clipboard.writeText(shareUrl);
    
    setSharedPostTitle(post.title);
    setShowShareToast(true);
    setTimeout(() => {
      setShowShareToast(false);
    }, 4500);
  };

  // newsletter capture mockup
  const handleSubscribeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus('loading');
    setTimeout(() => {
      setNewsletterStatus('success');
      setNewsletterEmail('');
      playSound('success');
      setTimeout(() => setNewsletterStatus('idle'), 6000);
    }, 1200);
  };

  // Tag toggler
  const handleToggleTagFilter = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  // Smooth scroll helper for table of contents
  const scrollToAnchor = (anchorId: string) => {
    const targetElement = document.getElementById(anchorId);
    if (targetElement) {
      const offsetPos = targetElement.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: offsetPos,
        behavior: 'smooth'
      });
    }
  };

  // Helper styles for difficulty nodes
  const getDifficultyStyles = (diff: BlogPost['difficulty']) => {
    switch (diff) {
      case 'Expert':
        return 'text-rose-600 bg-rose-50 border-rose-200/50';
      case 'Advanced':
        return 'text-amber-600 bg-amber-50 border-amber-200/50';
      case 'Intermediate':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200/50';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200/55';
    }
  };

  // Composer Form actions
  const openAddForm = () => {
    setFormId('');
    setFormTitle('');
    setFormSummary('');
    setFormCategory('Cloud Architecture');
    setFormDifficulty('Intermediate');
    setFormReadTime('5 min read');
    setFormAuthorName('Ali Hassan Chand');
    setFormAuthorRole('Founder & CEO');
    setFormAuthorAvatarUrl('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80');
    setFormFeaturedImg('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80');
    setFormTags('Cloud, Scaling, Architecture');
    setFormSections([
      { type: 'paragraph', text: 'This is the introduction paragraph of your newly published technical blog post.' },
      { type: 'heading', text: 'Innovative Architectural Approaches' },
      { type: 'paragraph', text: 'In this section, explain the detailed technology setup or core principles.' }
    ]);
    setIsAdding(true);
    setIsEditing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEditForm = (post: BlogPost) => {
    setFormId(post.id);
    setFormTitle(post.title);
    setFormSummary(post.summary);
    setFormCategory(post.category);
    setFormDifficulty(post.difficulty);
    setFormReadTime(post.readTime);
    setFormAuthorName(post.author.name);
    setFormAuthorRole(post.author.role);
    setFormAuthorAvatarUrl(post.author.avatarUrl);
    setFormFeaturedImg(post.featuredImg);
    setFormTags(post.tags.join(', '));
    setFormSections(JSON.parse(JSON.stringify(post.sections)));
    setIsEditing(true);
    setIsAdding(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formSummary) return;

    const postTags = formTags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const postData: BlogPost = {
      id: formId || `post-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      title: formTitle,
      summary: formSummary,
      category: formCategory,
      difficulty: formDifficulty,
      readTime: formReadTime,
      date: isEditing ? (posts.find(p => p.id === formId)?.date || formattedDate) : formattedDate,
      author: {
        name: formAuthorName,
        role: formAuthorRole,
        avatarUrl: formAuthorAvatarUrl
      },
      featuredImg: formFeaturedImg,
      tags: postTags,
      sections: formSections
    };

    if (isEditing) {
      setPosts(prev => prev.map(p => p.id === formId ? postData : p));
      setIsEditing(false);
    } else {
      setPosts(prev => [postData, ...prev]);
      setIsAdding(false);
    }

    playSound('success');
    onNavigate(`blog-post-${postData.id}`);
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you absolutely sure you want to permanently delete this publication node from the index? This action cannot be undone.')) {
      setPosts(prev => prev.filter(p => p.id !== postId));
      setIsEditing(false);
      setIsAdding(false);
      onNavigate('blog');
    }
  };

  const addFormSection = (type: BlogPostSection['type']) => {
    const newSec: BlogPostSection = { type };
    if (type === 'list') {
      newSec.items = ['First bullet point item', 'Second bullet point item'];
    } else if (type === 'code') {
      newSec.text = `// Sample Code Block\nfunction main() {\n  console.log("MetaWave Innovations");\n}`;
      newSec.codeLanguage = 'javascript';
    } else {
      newSec.text = 'Enter text content here...';
    }
    setFormSections(prev => [...prev, newSec]);
  };

  const removeFormSection = (index: number) => {
    setFormSections(prev => prev.filter((_, idx) => idx !== index));
  };

  const moveFormSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === formSections.length - 1) return;

    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const updated = [...formSections];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setFormSections(updated);
  };

  const updateSectionText = (index: number, value: string) => {
    setFormSections(prev => prev.map((sec, idx) => idx === index ? { ...sec, text: value } : sec));
  };

  const updateSectionCodeLang = (index: number, value: string) => {
    setFormSections(prev => prev.map((sec, idx) => idx === index ? { ...sec, codeLanguage: value } : sec));
  };

  const updateSectionListItem = (secIndex: number, itemIndex: number, value: string) => {
    setFormSections(prev => prev.map((sec, idx) => {
      if (idx === secIndex && sec.items) {
        const updatedItems = [...sec.items];
        updatedItems[itemIndex] = value;
        return { ...sec, items: updatedItems };
      }
      return sec;
    }));
  };

  const addSectionListItem = (secIndex: number) => {
    setFormSections(prev => prev.map((sec, idx) => {
      if (idx === secIndex && sec.items) {
        return { ...sec, items: [...sec.items, 'New bullet item text'] };
      }
      return sec;
    }));
  };

  const removeSectionListItem = (secIndex: number, itemIndex: number) => {
    setFormSections(prev => prev.map((sec, idx) => {
      if (idx === secIndex && sec.items) {
        return { ...sec, items: sec.items.filter((_, i) => i !== itemIndex) };
      }
      return sec;
    }));
  };

  return (
    <div className="w-full relative min-h-screen bg-white">
      {/* 2D Vector background mesh for supreme modern tech developer portal aesthetic */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_75%,transparent_100%)] opacity-70" />
      
      {/* Flow scroll height percentage line for current read detail views */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: scrollPercentage / 100 }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.1 }}
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-700 origin-left z-50 shadow-[0_1px_8px_rgba(16,185,129,0.3)]"
          />
        )}
      </AnimatePresence>

      {/* Floating Animated Share Toast alerts */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 text-white rounded-2xl p-4 shadow-[0_20px_40px_rgba(15,23,42,0.15)] border border-slate-800 flex items-start gap-3.5 backdrop-blur-xl bg-opacity-95"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <CheckCircle2 size={16} />
            </div>
            <div className="flex-1 text-left min-w-0">
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest font-mono">Deep Link Generated</h4>
              <p className="text-xs text-slate-300 mt-1 truncate">Copy success!</p>
              <p className="text-[10px] text-slate-400 mt-1 italic line-clamp-2">"{sharedPostTitle}" is ready to share.</p>
            </div>
            <button 
              onClick={() => setShowShareToast(false)}
              className="p-1 text-slate-500 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isAdding || isEditing ? (
          /* ========================================= */
          /*         COMPOSER / EDITOR FORM VIEW       */
          /* ========================================= */
          <motion.div
            key="composer-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-4xl mx-auto px-6 py-12 lg:py-16 text-left"
          >
            {/* Form Container */}
            <div className="bg-white border border-slate-200/95 rounded-3xl p-6 lg:p-9 shadow-lg space-y-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
              
              {/* Form Title & Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 relative z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#326E45]"></span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#326E45] tracking-widest uppercase">
                      {isEditing ? 'EDIT COMPILATION NODE' : 'PROVISION NEW COMPILATION NODE'}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-950 tracking-tight leading-tight">
                    {isEditing ? 'Update Journal Node' : 'Compose Publication Journal'}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setIsEditing(false);
                      if (isEditing && formId) {
                        onNavigate(`blog-post-${formId}`);
                      } else {
                        onNavigate('blog');
                      }
                    }}
                    className="px-3.5 py-2 border border-slate-200 text-slate-500 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Actual HTML Form */}
              <form onSubmit={handleSavePost} className="space-y-6 relative z-10">
                
                {/* Meta details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-mono uppercase font-black tracking-wider text-slate-500">Publication Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Engineering Ultra-Scalable Edge Architectures"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-250 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/5 rounded-xl text-sm placeholder-slate-400 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-mono uppercase font-black tracking-wider text-slate-500">Read Duration Estimate</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., 5 min read"
                      value={formReadTime}
                      onChange={(e) => setFormReadTime(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-250 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/5 rounded-xl text-sm placeholder-slate-400 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Categories & Difficulty */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-mono uppercase font-black tracking-wider text-slate-500">Index Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-250 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/5 rounded-xl text-sm outline-none transition-all cursor-pointer"
                    >
                      <option value="Cloud Architecture">Cloud Architecture</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Frontend Design">Frontend Design</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                      <option value="Enterprise Strategy">Enterprise Strategy</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-mono uppercase font-black tracking-wider text-slate-500">SLA Comprehension Difficulty</label>
                    <select
                      value={formDifficulty}
                      onChange={(e) => setFormDifficulty(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-250 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/5 rounded-xl text-sm outline-none transition-all cursor-pointer"
                    >
                      <option value="Beginner">Beginner Level</option>
                      <option value="Intermediate">Intermediate Level</option>
                      <option value="Advanced">Advanced Level</option>
                      <option value="Expert">Expert Level</option>
                    </select>
                  </div>
                </div>

                {/* Summary / Abstract area */}
                <div className="space-y-1.5">
                  <label className="text-[10.5px] font-mono uppercase font-black tracking-wider text-slate-500">Executive Summary (Abstract)</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Provide a high-density, concise summary of the cloud blueprint or developer strategies explored..."
                    value={formSummary}
                    onChange={(e) => setFormSummary(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-250 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/5 rounded-xl text-sm placeholder-slate-400 outline-none transition-all resize-y"
                  />
                </div>

                {/* Images & Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-mono uppercase font-black tracking-wider text-slate-500">Featured Image URL</label>
                    <input
                      type="text"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={formFeaturedImg}
                      onChange={(e) => setFormFeaturedImg(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-250 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/5 rounded-xl text-sm placeholder-slate-400 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-mono uppercase font-black tracking-wider text-slate-500">System Tags (Comma-separated)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Kubernetes, Docker, SLA, DevSecOps"
                      value={formTags}
                      onChange={(e) => setFormTags(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-250 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/5 rounded-xl text-sm placeholder-slate-400 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Author Info Group */}
                <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl space-y-4">
                  <span className="text-[10px] font-mono font-extrabold text-[#326E45] uppercase tracking-widest block">
                    Author Profile Details
                  </span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9.5px] font-mono uppercase text-slate-500">Name</label>
                      <input
                        type="text"
                        required
                        value={formAuthorName}
                        onChange={(e) => setFormAuthorName(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs placeholder-slate-400 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9.5px] font-mono uppercase text-slate-500">Corporate Role</label>
                      <input
                        type="text"
                        required
                        value={formAuthorRole}
                        onChange={(e) => setFormAuthorRole(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs placeholder-slate-400 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9.5px] font-mono uppercase text-slate-500">Avatar URL</label>
                      <input
                        type="text"
                        required
                        value={formAuthorAvatarUrl}
                        onChange={(e) => setFormAuthorAvatarUrl(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs placeholder-slate-400 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* DYNAMIC SECTIONS BUILDER PANEL */}
                <div className="border-t border-slate-200/70 pt-6 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-left">
                      <h4 className="text-sm font-display font-extrabold text-slate-900 font-mono uppercase">Dynamic Section Elements ({formSections.length})</h4>
                      <p className="text-[11.5px] text-slate-500">Design your article structure interactively by appending paragraphs, headings, blockquotes, list arrays, or terminal code blocks.</p>
                    </div>
                  </div>

                  {/* Section list container */}
                  <div className="space-y-4">
                    {formSections.map((sec, sIdx) => (
                      <div 
                        key={sIdx}
                        className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-2xl space-y-3 relative group/sec"
                      >
                        {/* Section Header Controls Row */}
                        <div className="flex items-center justify-between border-b border-slate-150 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center text-[10px] font-mono font-bold">
                              {sIdx + 1}
                            </span>
                            <span className="text-[10px] font-mono font-black uppercase text-slate-500 tracking-wider">
                              Section Type: <strong className="text-[#326E45]">{sec.type.toUpperCase()}</strong>
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 opacity-80 group-hover/sec:opacity-100 transition-opacity">
                            {/* Move Up */}
                            <button
                              type="button"
                              onClick={() => moveFormSection(sIdx, 'up')}
                              disabled={sIdx === 0}
                              className="p-1.5 rounded bg-white border border-slate-200 text-slate-500 hover:text-[#326E45] hover:bg-slate-50 disabled:opacity-30 cursor-pointer text-[10px]"
                              title="Move section up"
                            >
                              ▲
                            </button>
                            {/* Move Down */}
                            <button
                              type="button"
                              onClick={() => moveFormSection(sIdx, 'down')}
                              disabled={sIdx === formSections.length - 1}
                              className="p-1.5 rounded bg-white border border-slate-200 text-slate-500 hover:text-[#326E45] hover:bg-slate-50 disabled:opacity-30 cursor-pointer text-[10px]"
                              title="Move section down"
                            >
                              ▼
                            </button>
                            {/* Remove Section */}
                            <button
                              type="button"
                              onClick={() => removeFormSection(sIdx)}
                              className="p-1.5 rounded bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer text-[10px]"
                              title="Delete section"
                            >
                              ✕ Remove Block
                            </button>
                          </div>
                        </div>

                        {/* Rendering Input Fields based on the specific type */}
                        {sec.type === 'list' ? (
                          <div className="space-y-2 text-left">
                            <label className="text-[9.5px] font-mono uppercase text-slate-400">Bullet point items</label>
                            
                            <div className="space-y-2 pl-2">
                              {sec.items?.map((item, iIdx) => (
                                <div key={iIdx} className="flex items-center gap-2">
                                  <span className="text-[11px] font-mono text-slate-400 font-bold shrink-0">•</span>
                                  <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => updateSectionListItem(sIdx, iIdx, e.target.value)}
                                    className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-emerald-600"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeSectionListItem(sIdx, iIdx)}
                                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                                    title="Remove list item"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>

                            <button
                              type="button"
                              onClick={() => addSectionListItem(sIdx)}
                              className="mt-1 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:text-[#326E45] rounded-lg text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 cursor-pointer"
                            >
                              + Add list bullet
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2.5">
                            {sec.type === 'code' && (
                              <div className="flex items-center gap-2">
                                <label className="text-[9.5px] font-mono uppercase text-slate-400 shrink-0">Language Name</label>
                                <input
                                  type="text"
                                  value={sec.codeLanguage || 'javascript'}
                                  onChange={(e) => updateSectionCodeLang(sIdx, e.target.value)}
                                  className="w-28 px-2 py-1 bg-white border border-slate-200 rounded text-[11px] font-mono"
                                  placeholder="e.g. javascript"
                                />
                              </div>
                            )}

                            <div className="space-y-1">
                              <label className="text-[9.5px] font-mono uppercase text-slate-400">Content text</label>
                              <textarea
                                rows={sec.type === 'paragraph' ? 3 : sec.type === 'code' ? 5 : 1}
                                value={sec.text || ''}
                                onChange={(e) => updateSectionText(sIdx, e.target.value)}
                                className={`w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500/10 ${
                                  sec.type === 'code' ? 'font-mono bg-slate-950 text-emerald-400 leading-relaxed' : ''
                                }`}
                                placeholder="Enter block contents here..."
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Button bar to Add a section of specific type */}
                  <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center space-y-3">
                    <span className="text-[10px] font-mono font-black uppercase text-slate-400 tracking-wider block">
                      Append Content Section Element
                    </span>
                    <div className="flex flex-wrap justify-center gap-2">
                      {[
                        { type: 'paragraph', label: 'Paragraph Text' },
                        { type: 'heading', label: 'Main Heading' },
                        { type: 'subheading', label: 'Subheading' },
                        { type: 'quote', label: 'Blockquote' },
                        { type: 'code', label: 'Terminal Code' },
                        { type: 'list', label: 'Bullet List' }
                      ].map((item) => (
                        <button
                          key={item.type}
                          type="button"
                          onClick={() => addFormSection(item.type as any)}
                          className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 hover:text-[#326E45] hover:border-[#326E45]/30 hover:bg-emerald-50/50 rounded-xl text-xs font-semibold cursor-pointer shadow-3xs transition-all"
                        >
                          + {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Panel */}
                <div className="border-t border-slate-200/70 pt-6 flex items-center justify-end gap-3.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setIsEditing(false);
                      if (isEditing && formId) {
                        onNavigate(`blog-post-${formId}`);
                      } else {
                        onNavigate('blog');
                      }
                    }}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                  >
                    Discard Changes
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-[#326E45] text-white rounded-xl text-xs font-mono font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-md hover:from-emerald-700 hover:to-[#245032] transition-all cursor-pointer"
                  >
                    <Check size={12} />
                    <span>{isEditing ? 'COMMIT EDIT' : 'POST COMPILATION NODE'}</span>
                  </button>
                </div>

              </form>
            </div>
          </motion.div>
        ) : !selectedPost ? (
          /* ========================================= */
          /*            BLOG LISTING VIEW              */
          /* ========================================= */
          <motion.div
            key="listing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-6 py-12 lg:py-20"
          >
            {/* STUNNING COHESIVE HEADER PLATFORM */}
            <div className="relative mb-14 text-center max-w-3xl mx-auto">
              {/* Top ambient badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/15 rounded-full mb-5 select-none shadow-xs">
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-emerald-800">
                  METAWAVE ENGINEERING INDEX
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">NODES LIVE</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-5">
                Systems, Architecture & <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 bg-clip-text text-transparent">Scale Blueprints</span>
              </h1>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed font-normal">
                An authoritative index of complete cloud blueprints, performance-tuning metrics, container audits, and microservice strategies mapped out by developers, for developers. Learn straight from production deployments.
              </p>
              
              <div className="mt-8 flex justify-center">
                <button
                  onClick={openAddForm}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 via-[#326E45] to-emerald-800 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-2xl shadow-[0_4px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all flex items-center gap-2.5 cursor-pointer"
                >
                  <PlusCircle size={15} />
                  <span>Compose New Publication Node</span>
                </button>
              </div>
            </div>

            {/* DYNAMIC FILTERS & INTUITIVE SEARCH MATRIX */}
            <div className="mb-14">
              <div className="bg-slate-50/50 backdrop-blur-md rounded-3xl border border-slate-200/80 p-5 md:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col gap-6">
                
                {/* Search Bar & Bookmarks row */}
                <div className="flex flex-col lg:flex-row gap-4 items-stretch">
                  <div className="relative flex-1">
                    <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      placeholder="Query variables, stack structures, system tags, algorithms, authors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl text-slate-800 text-sm placeholder-slate-400 outline-none transition-all shadow-xs"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* Intersecting filter selectors */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {/* Read lists filter widget */}
                    <button
                      onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                      className={`px-4.5 py-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer select-none ${
                        showBookmarksOnly 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Bookmark size={14} className={showBookmarksOnly ? 'fill-emerald-600 text-emerald-600' : 'text-slate-400'} />
                      <span>Reading List ({bookmarkedIds.length})</span>
                    </button>

                    {/* Active matches count stats */}
                    <div className="text-xs font-mono font-bold text-slate-500 bg-white border border-slate-200 px-4 py-3.5 rounded-2xl flex items-center justify-center">
                      {filteredPosts.length} NODES RENDERED
                    </div>
                  </div>
                </div>

                {/* Categories filtering bar */}
                <div className="border-t border-slate-200/50 pt-5 flex flex-col gap-3">
                  <span className="text-[10px] font-mono font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5 select-none">
                    <Layers size={11} className="text-emerald-500" /> CATEGORY SUB-INDEX
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-[0_4px_12px_rgba(16,185,129,0.15)]'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advanced micro tags taxonomy matching */}
                <div className="border-t border-slate-200/50 pt-5 flex flex-col gap-3">
                  <span className="text-[10px] font-mono font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5 select-none">
                    <Hash size={11} className="text-teal-500" /> REPLICATED ARCHITECTURAL KEYWORDS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {allTags.map((tag) => {
                      const isActive = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          onClick={() => handleToggleTagFilter(tag)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1 cursor-pointer ${
                            isActive
                              ? 'bg-slate-900 text-teal-400 border-slate-950 shadow-xs'
                              : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span>#{tag}</span>
                          {isActive && <X size={10} className="ml-0.5 text-teal-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Comprehensive resets panel */}
                {(searchQuery || selectedCategory !== 'All' || selectedDifficulty !== 'All' || selectedTags.length > 0 || showBookmarksOnly) && (
                  <div className="border-t border-slate-200/50 pt-4 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Selected filters active</span>
                    <button
                      onClick={handleResetFilters}
                      className="font-bold text-emerald-600 hover:text-emerald-800 transition-colors flex items-center gap-1.5 cursor-pointer hover:underline"
                    >
                      <X size={12} />
                      <span>Clear Compound Constraints</span>
                    </button>
                  </div>
                )}

              </div>
            </div>

            {/* HIGH-IMPACT HORIZONTAL FEATURED ARTICLE */}
            {searchQuery === '' && selectedCategory === 'All' && selectedDifficulty === 'All' && selectedTags.length === 0 && !showBookmarksOnly && (
              <div className="mb-16 text-left">
                {/* Visual Label Ribbon */}
                <div className="flex items-center gap-2 mb-4.5 select-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-xs font-mono font-black text-emerald-700 tracking-widest uppercase">
                    CURRENT EDITORIAL STANDARD STARTER
                  </span>
                </div>
                
                <div 
                  onClick={() => onNavigate(`blog-post-${featuredPost.id}`)}
                  className="group bg-white rounded-3xl border border-slate-200/90 hover:border-emerald-500/40 p-5 lg:p-7 shadow-[0_12px_45px_-12px_rgba(15,23,42,0.03)] hover:shadow-[0_35px_70px_-15px_rgba(16,185,129,0.14),0_10px_30px_rgba(15,23,42,0.04)] hover:scale-[1.015] hover:-translate-y-1.5 transition-all duration-500 flex flex-col lg:flex-row gap-8 cursor-pointer relative overflow-hidden"
                >
                  {/* Decorative faint layout border details */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />

                  {/* Large Graphic Grid */}
                  <div className="w-full lg:w-[46%] shrink-0 rounded-2xl overflow-hidden relative aspect-[16/10] lg:aspect-auto min-h-[250px] lg:min-h-[360px] shadow-xs">
                    <img 
                      src={featuredPost.featuredImg} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                    
                    {/* Floating pill tags in preview corners */}
                    <div className="absolute top-4 left-4 flex gap-1.5 select-none">
                      <span className="px-3 py-1 rounded-full text-[9.5px] font-mono font-bold uppercase bg-slate-900/90 hover:bg-slate-950 text-white tracking-widest border border-white/10 backdrop-blur-md">
                        {featuredPost.category}
                      </span>
                    </div>

                    <button 
                      onClick={(e) => handleToggleBookmark(featuredPost.id, e)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 text-slate-700 hover:text-emerald-600 hover:scale-110 flex items-center justify-center transition-all shadow-md backdrop-blur-xs cursor-pointer border border-slate-100"
                      title={bookmarkedIds.includes(featuredPost.id) ? 'Saved' : 'Save to stack'}
                    >
                      <Bookmark size={14} className={bookmarkedIds.includes(featuredPost.id) ? 'fill-emerald-600 text-emerald-600' : ''} />
                    </button>
                  </div>

                  {/* Main horizontal descriptive columns */}
                  <div className="flex flex-col justify-between py-1 flex-1">
                    <div>
                      {/* Section badges and metrics */}
                      <div className="flex items-center gap-3.5 mb-4.5 flex-wrap text-slate-500">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getDifficultyStyles(featuredPost.difficulty)}`}>
                          {featuredPost.difficulty} LEVEL
                        </span>
                        <div className="flex items-center gap-1 text-xs font-semibold">
                          <Calendar size={13} className="text-slate-400" />
                          <span>{featuredPost.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-semibold">
                          <Clock size={13} className="text-slate-400" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>

                      {/* Display title */}
                      <h3 className="text-2xl md:text-3.5xl font-display font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors tracking-tight leading-[1.15] mb-4 text-left">
                        {featuredPost.title}
                      </h3>
                      
                      {/* Direct subtitle summaries */}
                      <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 font-normal text-left">
                        {featuredPost.summary}
                      </p>

                      {/* Small tags cloud summary */}
                      <div className="flex flex-wrap gap-1.5 mb-7">
                        {featuredPost.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[11px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                            #{tag.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Meta Profile Row */}
                    <div className="border-t border-slate-100 pt-5.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={featuredPost.author.avatarUrl} 
                          alt={featuredPost.author.name}
                          className="w-10 h-10 rounded-full border border-slate-100 object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-left">
                          <div className="text-xs font-bold text-slate-800">{featuredPost.author.name}</div>
                          <div className="text-[10px] font-medium text-slate-400 leading-none mt-1">{featuredPost.author.role}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-extrabold group-hover:text-emerald-800" style={{ letterSpacing: '0.04em' }}>
                        <span>Inspect Publication</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AD 1: Top Horizontal Banner Ad (Google AdSense Compliant Banner) */}
            <div className="mb-14">
              <AdvertisementSection slot={AD_SLOTS.BLOG_TOP} format="horizontal" />
            </div>

            {/* PUBLICATIONS PRIMARY GRID INDEX */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8 border-b border-slate-200/70 pb-4 select-none">
                <h2 className="text-xl font-display font-bold text-slate-800 flex items-center gap-2">
                  <BookMarked className="text-emerald-600 animate-pulse" size={18} />
                  <span>Engineering Publication Index</span>
                </h2>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                  LISTED BY PERSISTED DEPLOY_DATE
                </span>
              </div>

              {filteredPosts.length > 0 ? (
                /* Staggered load animation using Framer Motion */
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5"
                >
                  {filteredPosts.map((post, idx) => (
                    <React.Fragment key={post.id}>
                      {idx === 2 && (
                        <div className="group bg-gradient-to-br from-slate-900 to-[#0A0F1C] rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 p-5 shadow-sm hover:scale-[1.02] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer relative overflow-hidden text-left">
                          {/* Ad Badge */}
                          <div className="absolute top-4 right-4 flex items-center gap-1.5 select-none z-10">
                            <span className="px-1.5 py-0.5 bg-emerald-950/80 rounded border border-emerald-500/30 text-[8.5px] font-mono font-bold tracking-wider text-emerald-400 uppercase">
                              Sponsored
                            </span>
                          </div>

                          <div className="space-y-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-[#326E45] p-[1px] shadow-md flex items-center justify-center">
                              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                                <Sparkles size={16} className="text-emerald-400" />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-500">
                                MWI DEPLOYMENT SUITE
                              </span>
                              <h3 className="text-base font-display font-bold text-white leading-snug">
                                Instant Cloud Architecture Under 14 Days
                              </h3>
                              <p className="text-slate-400 text-xs leading-relaxed font-normal">
                                Get high-end corporate web applications built, security audited, and scaled globally on Cloud Run with full SECP compliance.
                              </p>
                            </div>
                          </div>

                          <div className="border-t border-slate-800/80 pt-4 mt-6 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-slate-500">METAWAVE INNOVATIONS</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                onNavigate('contact');
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#326E45] hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                            >
                              <span>Deploy Now</span>
                              <ArrowRight size={10} />
                            </button>
                          </div>
                        </div>
                      )}

                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                        onClick={() => onNavigate(`blog-post-${post.id}`)}
                        className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/30 p-5 shadow-[0_4px_25px_rgba(15,23,42,0.01)] hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.12),0_8px_24px_-4px_rgba(15,23,42,0.04)] hover:scale-[1.02] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer relative"
                      >
                        {/* Subtle hover background highlight node bar */}
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-500 transition-colors rounded-t-2xl" />

                        <div>
                          {/* Interactive Image preview block */}
                          <div className="rounded-xl overflow-hidden aspect-[16/10] relative mb-4 shadow-xs">
                            <img 
                              src={post.featuredImg} 
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-3 left-3 select-none">
                              <span className="px-2.5 py-0.5 rounded text-[8.5px] font-mono font-black uppercase bg-slate-900/95 text-white tracking-widest">
                                {post.category}
                              </span>
                            </div>

                            {/* Quick bookmark save tag on hover */}
                            <button
                              onClick={(e) => handleToggleBookmark(post.id, e)}
                              className="absolute top-3 right-3 w-7 h-7 bg-white/95 rounded-full flex items-center justify-center text-slate-500 hover:text-emerald-600 shadow-sm transition-transform cursor-pointer"
                              title="Save node"
                            >
                              <Bookmark size={11} className={bookmarkedIds.includes(post.id) ? 'fill-emerald-600 text-emerald-600' : ''} />
                            </button>
                          </div>

                          {/* Top layout taxonomy information */}
                          <div className="flex items-center gap-2.5 flex-wrap mb-3 text-[11px] text-slate-400">
                            <span className={`px-2 py-0.5 rounded text-[8.5px] font-mono font-bold uppercase border ${getDifficultyStyles(post.difficulty)}`}>
                              {post.difficulty}
                            </span>
                            <span className="flex items-center gap-0.5 font-semibold">
                              <Calendar size={11} /> {post.date}
                            </span>
                            <span className="flex items-center gap-0.5 font-semibold">
                              <Clock size={11} /> {post.readTime}
                            </span>
                          </div>

                          {/* Heading */}
                          <h3 className="text-base md:text-lg font-display font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors mb-2.5 text-left">
                            {post.title}
                          </h3>

                          {/* Abstract text paragraph */}
                          <p className="text-slate-500 text-xs leading-relaxed mb-5 text-left line-clamp-3">
                            {post.summary}
                          </p>
                        </div>

                        {/* Dynamic author and navigation actions */}
                        <div className="border-t border-slate-100 pt-4 flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2">
                            <img 
                              src={post.author.avatarUrl} 
                              alt={post.author.name}
                              className="w-7 h-7 rounded-full border border-slate-100 object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="text-left">
                              <div className="text-[11px] font-bold text-slate-800 leading-tight">{post.author.name}</div>
                              <div className="text-[9px] font-medium text-slate-400 leading-none mt-0.5">{post.author.role}</div>
                            </div>
                          </div>

                          {/* Visual navigation pill */}
                          <span className="w-7 h-7 bg-slate-50 border border-slate-200/60 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-600 transition-all select-none">
                            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </motion.div>
                    </React.Fragment>
                  ))}
                </motion.div>
              ) : (
                /* EMPTY SEARCH FILTERS STATE PANEL */
                <div className="bg-slate-50/50 rounded-3xl border border-slate-200/80 p-12 text-center max-w-xl mx-auto my-6.5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
                    <Search size={22} />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-1.5">No Matching Publication Channels</h3>
                  <p className="text-xs text-slate-500 mb-6 font-normal max-w-sm mx-auto">
                    We crawled our active system journals and couldn't resolve any nodes matching your precise parameters. Cleanse filters and query parameters.
                  </p>
                  <button 
                    onClick={handleResetFilters}
                    className="px-4.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-all shadow-xs"
                  >
                    Reset Filter Indexes
                  </button>
                </div>
              )}
            </div>

            {/* AD 3: Bottom Horizontal Banner Ad (Google AdSense Compliant Banner) */}
            <div className="mb-14">
              <AdvertisementSection slot={AD_SLOTS.BLOG_BOTTOM} format="fluid" />
            </div>

            {/* MODERN INFORMATIVE WIDGET BENTO FRAME */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-20 text-left">
              {/* Left Column: Interactive Technical Newsletter Form */}
              <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
                {/* Visual grid blur background details */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="space-y-4 mb-6 relative">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-450">
                    <Bell size={18} className="animate-bounce" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight">
                    Stay Locked on the Edge of Tech
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
                    Quarterly engineering summaries, infrastructure audit spreadsheets, system stress logs, and technical benchmark targets delivered without promotional clutter.
                  </p>
                </div>

                <form onSubmit={handleSubscribeNewsletter} className="relative z-10">
                  {newsletterStatus === 'success' ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-xs flex items-center gap-2 font-mono">
                      <CheckCircle2 size={16} />
                      <span>SECURE HANDSHAKE COMPLETED: REGISTERED ACTIVE DEV_FEED</span>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <input
                        type="email"
                        required
                        placeholder="developers@yourcompany.com"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="flex-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 text-xs outline-none transition-all disabled:opacity-50"
                        disabled={newsletterStatus === 'loading'}
                      />
                      <button
                        type="submit"
                        disabled={newsletterStatus === 'loading'}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-75"
                      >
                        {newsletterStatus === 'loading' ? (
                          <span>Compiling...</span>
                        ) : (
                          <>
                            <span>Register Node</span>
                            <Send size={12} />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </form>
              </div>

              {/* Right Column: Mini FAQ/About MetaWave Lab in Slate-50 */}
              <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
                    <HelpCircle size={12} className="text-slate-500" />
                    METAWAVE RESEARCH LAB
                  </h4>
                  <p className="text-sm font-display font-extrabold text-slate-800 mb-2">
                    Open Source, Standardized Knowledge
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Our developers write concrete articles extracted from real, live, SOC 2 compliant enterprise nodes in-house. All code libraries published in our tutorials are licensed under Creative Commons and open-source models for worldwide system utility.
                  </p>
                </div>
                
                <div className="flex items-center gap-4 text-[10px] font-mono font-bold text-slate-400 uppercase border-t border-slate-200 pt-4">
                  <span className="flex items-center gap-1 text-[#326E45]"><Flame size={12} /> 99.998% UPTIME</span>
                  <span>•</span>
                  <span>CC BY-NC 4.0</span>
                </div>
              </div>
            </div>

          </motion.div>
        ) : (
          /* ========================================= */
          /*            BLOG DETAIL PAGE VIEW          */
          /* ========================================= */
          <motion.div
            key="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            {/* STICKY BAR HEADER & RETURNING MODULE BAR */}
            <div className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-16 z-30 py-3.5">
              <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Back Link */}
                <button
                  onClick={() => onNavigate('blog')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer group focus:outline-none"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                  <span>Exit Publication Index</span>
                </button>

                {/* Short Indicator of Current View Metadata */}
                <div className="hidden md:flex items-center gap-3">
                  <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black uppercase">
                    {selectedPost.category}
                  </span>
                  <p className="text-xs text-slate-400 font-medium truncate max-w-sm">
                    {selectedPost.title}
                  </p>
                </div>

                {/* Quick Interactive Actions */}
                <div className="flex items-center gap-2">
                  {/* Edit / Update Button */}
                  <button
                    onClick={() => openEditForm(selectedPost)}
                    className="h-8 px-2.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Edit publication node"
                  >
                    <Edit3 size={11} />
                    <span className="hidden sm:inline">Update</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeletePost(selectedPost.id)}
                    className="h-8 px-2.5 bg-rose-50 hover:bg-rose-100 hover:border-rose-200 border border-rose-200 rounded-lg text-xs font-bold text-rose-600 flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Delete publication node"
                  >
                    <Trash2 size={11} />
                    <span className="hidden sm:inline">Delete</span>
                  </button>

                  <span className="h-6 w-px bg-slate-200 mx-1" />

                  <button 
                    onClick={() => handleLike(selectedPost.id)}
                    className={`h-8 px-3 rounded-lg text-xs font-bold border flex items-center gap-1 transition-all cursor-pointer ${
                      liked[selectedPost.id]
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <ThumbsUp size={11} className={liked[selectedPost.id] ? 'fill-rose-500' : ''} />
                    <span>{18 + (likes[selectedPost.id] || 0)}</span>
                  </button>

                  <button
                    onClick={() => handleToggleBookmark(selectedPost.id)}
                    className="h-8 w-8 bg-white border border-slate-200 rounded-lg hover:border-emerald-500/20 hover:text-emerald-700 flex items-center justify-center text-slate-500 cursor-pointer"
                    title={bookmarkedIds.includes(selectedPost.id) ? 'Saved' : 'Save'}
                  >
                    <Bookmark size={12} className={bookmarkedIds.includes(selectedPost.id) ? 'fill-emerald-600 text-emerald-600' : ''} />
                  </button>

                  <button
                    onClick={(e) => handleShare(selectedPost, e)}
                    className="h-8 w-8 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center justify-center text-slate-500 cursor-pointer"
                    title="Deep Link Share"
                  >
                    <Share2 size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* MAIN CORE METRICS HERO FRAME */}
            <div className="bg-slate-50/50 border-b border-slate-200/60 py-12 lg:py-16 text-left">
              <div className="max-w-4xl mx-auto px-6">
                
                {/* Meta details ribbon */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-black uppercase bg-emerald-150 text-emerald-800 border border-emerald-300">
                    {selectedPost.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getDifficultyStyles(selectedPost.difficulty)}`}>
                    {selectedPost.difficulty} LEVEL COMPILING
                  </span>
                  <div className="text-xs text-slate-400 font-semibold flex items-center gap-1 select-none">
                    <Calendar size={12} /> {selectedPost.date}
                  </div>
                  <div className="text-xs text-slate-400 font-semibold flex items-center gap-1 select-none">
                    <Clock size={12} /> {selectedPost.readTime}
                  </div>
                </div>

                {/* Massive Title display */}
                <h1 className="text-3xl sm:text-4xl md:text-5.5xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
                  {selectedPost.title}
                </h1>

                {/* Abstract summary quotes */}
                <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-normal border-l-4 border-emerald-600 pl-5 mb-8">
                  {selectedPost.summary}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedPost.author.avatarUrl} 
                    alt={selectedPost.author.name}
                    className="w-12 h-12 rounded-full border-2 border-slate-100 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 leading-snug">{selectedPost.author.name}</h4>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">{selectedPost.author.role} • MetaWave Lab Node</p>
                  </div>
                </div>

              </div>
            </div>

            {/* PRIMARY ARTICLE DEEP STUDY COLUMN & SYSTEM INTERACTIVE TABLE OF CONTENTS */}
            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 text-left">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                
                {/* ADVANCED FLOATING TABLE OF CONTENTS SIDE-RAIL (col-span-3) */}
                <aside className="hidden lg:block lg:col-span-3">
                  <div className="sticky top-40 space-y-6">
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
                      <h3 className="text-[11px] font-mono font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4 border-b border-slate-200 pb-2 bg-slate-50">
                        <List size={12} className="text-[#326E45]" />
                        READ DIRECTORY
                      </h3>
                      
                      <nav className="space-y-2.5">
                        {/* Static Introduction Anchor mapping */}
                        <button
                          onClick={() => window.scrollTo({ top: 380, behavior: 'smooth' })}
                          className={`block text-xs text-left w-full hover:text-emerald-600 transition-colors font-semibold ${
                            activeHeadingIndex === 0 ? 'text-emerald-700 pl-2 border-l-2 border-emerald-600' : 'text-slate-500'
                          }`}
                        >
                          Introduction Node
                        </button>
                        
                        {/* Dynamically generated Table of Contents based on actual section headings */}
                        {selectedPost.sections
                          .filter((sec) => sec.type === 'heading')
                          .map((sec, idx) => {
                            const headingAnchor = `section-heading-${idx}`;
                            const isCurrent = activeHeadingIndex === (idx + 1);
                            
                            return (
                              <button
                                key={idx}
                                onClick={() => scrollToAnchor(headingAnchor)}
                                className={`block text-xs text-left w-full py-0.5 leading-snug hover:text-emerald-600 transition-all ${
                                  isCurrent 
                                    ? 'text-emerald-700 font-bold pl-2 border-l-2 border-emerald-600' 
                                    : 'text-slate-500 font-medium'
                                }`}
                              >
                                {sec.text}
                              </button>
                            );
                          })}
                      </nav>
                    </div>

                    {/* Bookmark state status card */}
                    <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-4 text-xs font-medium text-slate-500">
                      {bookmarkedIds.includes(selectedPost.id) ? (
                        <div className="flex items-center gap-2 text-emerald-700 font-bold font-mono">
                          <Bookmark size={12} className="fill-emerald-600" />
                          <span>PUBLICATION FLAGGED IN SAVED STATE</span>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleToggleBookmark(selectedPost.id)}
                          className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer"
                        >
                          <Bookmark size={12} />
                          <span>Flag to your Offline Reading List</span>
                        </button>
                      )}
                    </div>

                    {/* AD 4: Vertical Sidebar Ad Card */}
                    <div className="bg-gradient-to-b from-slate-50 to-emerald-50/20 border border-slate-200 rounded-2xl p-5 text-left relative overflow-hidden group/sidead">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/[0.03] rounded-full blur-lg pointer-events-none" />
                      <div className="absolute top-3 right-3 select-none">
                        <span className="px-1.5 py-0.5 bg-slate-200/80 rounded border border-slate-300 text-[7px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                          Ad
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <span className="text-[9px] font-mono font-bold text-emerald-600 uppercase tracking-widest block">
                          MWI CONSULTING R&D
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 leading-snug">
                          Need custom full-stack solutions built fast?
                        </h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
                          Partner with MetaWave Innovations for high-performance software architecture, SECP/FBR governance compliance, and global scaling.
                        </p>
                        <button
                          onClick={() => onNavigate('contact')}
                          className="w-full text-center block px-3 py-2 bg-[#326E45] hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Book Free Audit
                        </button>
                      </div>
                    </div>
                  </div>
                </aside>

                {/* PRIMARY TECHNICAL MARKDOWN-STYLE PLOT COLUMN (col-span-9) */}
                <div ref={articleContentRef} className="lg:col-span-9 space-y-7">
                  
                  {/* Comprehensive Wide Banner Image */}
                  <div className="rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs relative max-h-[460px]">
                    <img 
                      src={selectedPost.featuredImg} 
                      alt={selectedPost.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* AD 1: Top Horizontal Banner Ad (AdSense Compliant) */}
                  <div className="my-2">
                    <AdvertisementSection slot={AD_SLOTS.BLOG_TOP} format="horizontal" />
                  </div>

                  {/* Sections Renderer */}
                  <div className="prose max-w-none text-slate-700 space-y-6 leading-relaxed text-left font-sans text-sm sm:text-base">
                    {selectedPost.sections.map((sec, idx) => {
                      const element = (() => {
                        switch (sec.type) {
                          case 'paragraph':
                            return (
                              <p key={idx} className="text-slate-600 leading-relaxed">
                                {sec.text}
                              </p>
                            );
                          
                          case 'heading':
                            const headingAnchorId = `section-heading-${selectedPost.sections.filter((s, i) => s.type === 'heading' && i <= idx).length - 1}`;
                            return (
                              <h2 
                                key={idx} 
                                id={headingAnchorId}
                                data-heading-anchor
                                className="text-lg sm:text-xl font-display font-extrabold tracking-tight text-slate-900 pt-7 pb-2 flex items-center gap-2 border-b border-slate-100"
                              >
                                <span className="w-1.5 h-5 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full shrink-0" />
                                <span>{sec.text}</span>
                              </h2>
                            );

                          case 'subheading':
                            return (
                              <h3 key={idx} className="text-base sm:text-lg font-bold tracking-tight text-slate-800 pt-3">
                                {sec.text}
                              </h3>
                            );

                          case 'quote':
                            return (
                              <div key={idx} className="bg-emerald-50/40 rounded-2xl border-l-[4px] border-emerald-600 p-5 my-6 text-left">
                                <p className="text-xs sm:text-sm font-semibold italic text-emerald-950 leading-relaxed">
                                  "{sec.text}"
                                </p>
                              </div>
                            );

                          case 'code':
                            const terminalCodeId = `${selectedPost.id}-code-${idx}`;
                            return (
                              <div key={idx} className="my-6 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 text-left font-mono shadow-sm">
                                {/* IDE headbar */}
                                <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between select-none">
                                  <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5 mr-2">
                                      <span className="w-2.5 h-2.5 rounded-full bg-slate-850" />
                                      <span className="w-2.5 h-2.5 rounded-full bg-slate-850" />
                                      <span className="w-2.5 h-2.5 rounded-full bg-slate-850" />
                                    </div>
                                    <Code size={11} className="text-emerald-400" />
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                      {sec.codeLanguage || 'interface'}
                                    </span>
                                  </div>
                                  
                                  <button
                                    onClick={() => handleCopyCode(sec.text || '', terminalCodeId)}
                                    className="p-1 px-2.5 hover:bg-slate-800 rounded-lg text-[9px] font-bold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors border border-slate-800"
                                  >
                                    {copiedId === terminalCodeId ? (
                                      <>
                                        <Check size={10} className="text-emerald-400" />
                                        <span>COPIED SUCCESSFULLY</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy size={10} />
                                        <span>COPY RAW BLOCK</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                                
                                {/* Rich code body output */}
                                <div className="p-4 overflow-x-auto text-[11px] sm:text-xs text-[#05F5A9] leading-6 bg-slate-950/95 font-medium">
                                  <pre><code>{sec.text}</code></pre>
                                </div>
                              </div>
                            );

                          case 'list':
                            return (
                              <ul key={idx} className="space-y-3.5 my-5 pl-1.5">
                                {sec.items?.map((item, lIdx) => (
                                  <li key={lIdx} className="flex gap-3 text-xs sm:text-sm text-slate-600 leading-relaxed text-left">
                                    <span className="shrink-0 w-5 h-5 rounded bg-emerald-100 text-[#326E45] flex items-center justify-center text-[10px] font-black mt-0.5">
                                      ✓
                                    </span>
                                    <div>{item}</div>
                                  </li>
                                ))}
                              </ul>
                            );

                          default:
                            return null;
                        }
                      })();

                      return (
                        <React.Fragment key={idx}>
                          {element}
                          {idx === 2 && (
                            <div className="my-8">
                              <AdvertisementSection slot={AD_SLOTS.BLOG_MIDDLE} format="fluid" />
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* AD 3: Bottom Horizontal Banner Ad (AdSense Compliant) */}
                  <div className="my-10">
                    <AdvertisementSection slot={AD_SLOTS.BLOG_BOTTOM} format="horizontal" />
                  </div>

                  {/* BOTTOM SECTOR: INTERACTION & FOOTNOTES FEEDBACKS */}
                  <div className="border-t border-slate-200/80 pt-8 mt-12 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <button
                      onClick={() => onNavigate('blog')}
                      className="text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft size={13} />
                      <span>Retreat to Publications Directory</span>
                    </button>

                    <div className="flex items-center gap-3">
                      {likes[selectedPost.id] ? (
                        <span className="text-[10px] sm:text-xs font-mono font-bold text-emerald-700 uppercase flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl select-none">
                          <ThumbsUp size={12} className="fill-emerald-600 text-emerald-600" /> Linked with global network node
                        </span>
                      ) : (
                        <button
                          onClick={() => handleLike(selectedPost.id)}
                          className="text-xs font-semibold text-slate-500 hover:text-rose-600 hover:-translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <ThumbsUp size={13} />
                          <span>Enjoyed this article? Leave a recommendation</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* STICKY ON-MOBILE / TABLET STATS DRAWER (Visible on sm coordinates) */}
                  <div className="block lg:hidden border border-slate-200/80 bg-slate-50 rounded-2xl p-5 mt-10">
                    <h3 className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest pb-3 mb-3 border-b border-slate-200">
                      METAWAVE SUMMARY METRICS
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-xs font-medium text-slate-600">
                      <div>
                        <span className="block text-[10px] text-slate-400 font-mono uppercase">COMPREHENSION DIFFICULTY</span>
                        <span className="text-slate-800 font-bold">{selectedPost.difficulty}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 font-mono uppercase">ESTIMATED EXCURSION TIME</span>
                        <span className="text-slate-800 font-bold">{selectedPost.readTime}</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* HIGH-FIDELITY SUGGESTED READING PANELS SLIDER */}
            <div className="bg-slate-50/40 border-t border-slate-200 pt-14 pb-20 text-left">
              <div className="max-w-7xl mx-auto px-6">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-slate-200/60 gap-3">
                  <h3 className="text-lg md:text-2xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">
                    Recommended Technical Blueprints
                  </h3>
                  <button 
                    onClick={() => onNavigate('blog')}
                    className="text-xs font-extrabold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all papers</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5">
                  {blogPosts
                    .filter(post => post.id !== selectedPost.id)
                    .slice(0, 3)
                    .map((post) => (
                      <div
                        key={post.id}
                        onClick={() => onNavigate(`blog-post-${post.id}`)}
                        className="group bg-white rounded-2xl border border-slate-200/95 hover:border-emerald-500/30 p-5 shadow-[0_4px_20px_rgba(15,23,42,0.01)] hover:shadow-[0_22px_45px_-10px_rgba(16,185,129,0.10),0_6px_18px_-3px_rgba(15,23,42,0.03)] hover:scale-[1.02] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-slate-400 font-bold uppercase">
                            <span>{post.category}</span>
                            <span className="px-1.5 py-0.5 rounded text-[8.5px] border border-slate-100">{post.difficulty}</span>
                          </div>
                          
                          <h4 className="text-sm sm:text-base font-display font-bold text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors mb-2.5">
                            {post.title}
                          </h4>
                        </div>
                        
                        <div className="border-t border-slate-100 pt-3 mt-4.5 flex items-center justify-between text-[11px] text-slate-400">
                          <div className="flex items-center gap-2">
                            <img 
                              src={post.author.avatarUrl} 
                              alt={post.author.name}
                              className="w-6 h-6 rounded-full border border-slate-100 object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <span className="font-semibold text-slate-700">{post.author.name}</span>
                          </div>
                          
                          <div className="flex items-center gap-1 font-semibold text-emerald-700 font-mono text-[10px]">
                            <span>{post.readTime}</span>
                            <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
