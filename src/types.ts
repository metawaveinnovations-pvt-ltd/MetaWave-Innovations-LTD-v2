export interface Service {
  id: string;
  icon: string; // Lucide icon name
  title: string;
  description: string;
}

export interface Solution {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  benefits: string[];
  ctaText: string;
  imageAlt: string;
  imageTheme: 'blue' | 'purple' | 'cyan' | 'indigo';
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  industry: string;
  techStack: string[];
  overview: string;
  results: string[];
  imageTheme: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  review: string;
  rating: number;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface TechItem {
  name: string;
  icon: string; // Icon name or inline path
}

export interface TechCategory {
  category: string;
  items: TechItem[];
}
