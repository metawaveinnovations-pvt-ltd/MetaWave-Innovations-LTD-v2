import { 
  Code, 
  Cpu, 
  Cloud, 
  Database,
  Terminal,
  Activity,
  Building,
  GraduationCap,
  Sparkles,
  Search,
  CheckCircle,
  Globe,
  Settings,
  ShieldAlert,
  Users,
  Briefcase,
  HelpCircle,
  TrendingUp,
  LineChart,
  HardDrive,
  Network,
  Lock,
  Heart,
  Store,
  Factory,
  Building2,
  Truck,
  DollarSign
} from 'lucide-react';

export interface DropdownItem {
  name: string;
  desc: string;
  icon: any;
  href?: string;
  badge?: string;
}

export interface MegaCategory {
  title: string;
  items: DropdownItem[];
}

export const SOLUTIONS_DATA: MegaCategory[] = [
  {
    title: 'Software Solutions',
    items: [
      { name: 'Custom Software', desc: 'Bespoke high performance systems tailored for scale.', icon: Code },
      { name: 'Enterprise Systems', desc: 'Compliant service architectures for robust operations.', icon: Terminal },
      { name: 'SaaS Development', desc: 'Multi-tenant cloud platforms built with modern stacks.', icon: Settings },
      { name: 'API Integration', desc: 'Unified API orchestrations with secure token guards.', icon: Network },
    ]
  },
  {
    title: 'AI Solutions',
    items: [
      { name: 'AI Automation', desc: 'Repetitive process removal via smart model loops.', icon: Cpu },
      { name: 'Machine Learning', desc: 'Custom predictive model deployments on live feeds.', icon: Sparkles },
      { name: 'Business Intelligence', desc: 'Interactive dashboards powered by enterprise data.', icon: LineChart },
      { name: 'Predictive Analytics', desc: 'Proactive strategy planning using statistical models.', icon: TrendingUp },
    ]
  },
  {
    title: 'Cloud Services',
    items: [
      { name: 'Cloud Migration', desc: 'Safe transitioning of workflows to premium backends.', icon: Cloud },
      { name: 'DevOps', desc: 'Constant integration delivery pipelines with automated testing.', icon: HardDrive },
      { name: 'Infrastructure', desc: 'Provisioned auto-scaling server clusters on AWS & Google Cloud.', icon: Database },
      { name: 'Security', desc: 'Military grade encryption standards, SOC2 & HIPAA audits.', icon: Lock },
    ]
  },
  {
    title: 'Business Platforms',
    items: [
      { name: 'CRM Systems', desc: 'Comprehensive customer pipelines and retention workflows.', icon: Users },
      { name: 'ERP Systems', desc: 'Unified resource management, material and capital planning.', icon: Building2 },
      { name: 'Property Platforms', desc: 'Asset monetization engines, booking engines & tenant CRM.', icon: Building },
      { name: 'Healthcare Systems', desc: 'HIPAA compliant patient telemetry databases and EHR.', icon: Activity },
    ]
  }
];

export const INDUSTRIES_DATA = [
  { name: 'Healthcare', desc: 'Secure EHR integrations & clinical smart applications.', icon: Heart, tag: 'HIPAA' },
  { name: 'Real Estate', desc: 'Premium property transaction tech & tenant management.', icon: Building, tag: 'PropTech' },
  { name: 'Education', desc: 'LMS systems with automatic grading integrations.', icon: GraduationCap, tag: 'EdTech' },
  { name: 'Finance', desc: 'PCI compliant payment processors & wealth automation.', icon: DollarSign, tag: 'FinTech' },
  { name: 'Retail', desc: 'Ominchannel inventory trackers & custom POS systems.', icon: Store, tag: 'eCom' },
  { name: 'Manufacturing', desc: 'Industrial logistics tracking & smart IoT protocols.', icon: Factory, tag: 'SCM' },
  { name: 'Government', desc: 'High compliance public directories & citizen portals.', icon: ShieldAlert, tag: 'GovTech' },
  { name: 'Logistics', desc: 'SLA-backed path finding and fleet telemetry hubs.', icon: Truck, tag: 'Fleet' },
];

export const PRODUCTS_DATA = [
  {
    id: 'metacrm',
    name: 'MetaCRM',
    badge: 'Enterprise Pipelines',
    desc: 'Intelligent high-velocity sales tracker matching client leads with automatic AI outreach workflows.',
    features: ['Automated Lead Scoring', 'Omnichannel Inbox', 'Interactive Forecasts'],
    color: 'from-emerald-50 to-[#326E45]/5',
    borderColor: 'border-[#326E45]/15',
    iconColor: 'text-[#20462c]',
    stat: '42% CR Increase'
  },
  {
    id: 'metaerp',
    name: 'MetaERP',
    badge: 'Operations Hub',
    desc: 'Unifies multi-national ledgers, materials tracking, supply chain dependencies, and automatic payroll.',
    features: ['Real-time Cost Ledger', 'Automated SCM Loop', 'Tax Compliance API'],
    color: 'from-teal-50/40 to-[#326E45]/10',
    borderColor: 'border-teal-100',
    iconColor: 'text-[#20462c]',
    stat: '30% Cost Cut'
  },
  {
    id: 'metaproperty',
    name: 'MetaProperty',
    badge: 'Asset Management',
    desc: 'Connect portfolio owners, facility managers, and digital leasing cycles in a highly visual layout.',
    features: ['Smart Interactive Maps', 'Auto SLA Invoicing', 'Unified Booking Engine'],
    color: 'from-slate-50 to-[#326E45]/5',
    borderColor: 'border-[#326E45]/10',
    iconColor: 'text-slate-700',
    stat: '$12B Asset Managed'
  },
  {
    id: 'metacare',
    name: 'MetaCare',
    badge: 'Clinical Telemetry',
    desc: 'Secure portal mapping direct clinical feeds, doctor consult queues, and patient history indexes seamlessly.',
    features: ['HIPAA Sandbox Guard', 'L-1 Telemetry Feeds', 'Automated RX Dispatch'],
    color: 'from-emerald-50 to-teal-50/30',
    borderColor: 'border-emerald-100',
    iconColor: 'text-emerald-600',
    stat: '99.99% Node Uptime'
  },
  {
    id: 'metahr',
    name: 'MetaHR',
    badge: 'Talent Suite',
    desc: 'Transform onboarding, employee dynamic evaluation timelines, and benefit allocations inside one place.',
    features: ['Global Payroll Rails', 'AI Evaluation Logic', 'Structured LMS modules'],
    color: 'from-amber-50 to-orange-50/25',
    borderColor: 'border-amber-100',
    iconColor: 'text-amber-600',
    stat: '4.8x Onboarding Speed'
  },
  {
    id: 'metalearn',
    name: 'MetaLearn',
    badge: 'Interactive LMS',
    desc: 'Deliver scalable knowledge systems equipped with automated grading matrices and interactive certification.',
    features: ['Smart Proctored Exams', 'Live Progress Analytics', 'Visual SCORM support'],
    color: 'from-rose-50 to-red-50/10',
    borderColor: 'border-rose-100',
    iconColor: 'text-rose-600',
    stat: '85k Certified Users'
  }
];

export const COMPANY_DATA = [
  { name: 'About Us', desc: 'Read our dynamic transformation origin and guiding values.', icon: CheckCircle, link: 'about' },
  { name: 'Leadership', desc: 'Vanguard managers with cumulative decades of cloud scaling expertise.', icon: Users, link: 'about' },
  { name: 'Technology Stack', desc: 'Our certified production ecosystems engineered for latency and security.', icon: Cpu, link: 'tech-stack' },
  { name: 'Careers', desc: 'Join our world class remote digital platform team.', icon: Briefcase, link: 'contact', badge: 'We are hiring!' },
  { name: 'Partnerships', desc: 'System integrators and strategic consultants global alliances.', icon: Globe, link: 'contact' },
  { name: 'Resources', desc: 'Technical whitepapers and SLA benchmark metrics guidelines.', icon: HelpCircle, link: 'portfolio' },
];
