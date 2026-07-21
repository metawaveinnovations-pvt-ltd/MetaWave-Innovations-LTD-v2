import { 
  Users, 
  Layers, 
  UserCheck, 
  Home, 
  HeartPulse, 
  GraduationCap, 
  Code, 
  FileCheck,
  Cpu,
  Server,
  Activity,
  Globe,
  Database,
  Terminal,
  ShieldAlert,
  Coins
} from 'lucide-react';

export interface ShopProduct {
  id: string;
  name: string;
  category: 'saas' | 'devtools' | 'compliance' | 'hardware';
  categoryLabel: string;
  shortDesc: string;
  longDesc: string;
  price: number;
  billingPeriod: 'lifetime' | 'annual' | 'monthly' | 'one-time';
  rating: number;
  reviewsCount: number;
  icon: any;
  featuredImg: string;
  badge?: string;
  features: string[];
  techSpecs: {
    framework: string;
    database: string;
    deployment: string;
    compliance: string;
    sla: string;
  };
  whatsIncluded: string[];
  deploymentSteps: string[];
  roiMetric: {
    label: string;
    value: string;
  };
}

export const shopProducts: ShopProduct[] = [
  {
    id: 'metacrm',
    name: 'MetaCRM Platform License',
    category: 'saas',
    categoryLabel: 'Enterprise SaaS',
    shortDesc: 'Automated multi-channel client conversion pipeline with intelligent lead scoring.',
    longDesc: 'MetaCRM is a complete enterprise-grade customer relationship management engine engineered for scale. Built with modern React and micro-frontend structures, it integrates real-time lead grading, predictive retention loops, automatic email pipelines, and cryptographic auditing trails. Perfect for fast-growing SaaS and FinTech operators seeking a secure, robust single source of customer truth.',
    price: 699,
    billingPeriod: 'annual',
    rating: 4.9,
    reviewsCount: 142,
    icon: Users,
    featuredImg: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop',
    badge: 'POPULAR',
    features: [
      'AI real-time lead grading & customer propensity score engine',
      'Automated multi-channel client conversion paths',
      'Integrated email sequencing & voice record logging',
      'Unified enterprise pipeline visualization console'
    ],
    techSpecs: {
      framework: 'React / Next.js / Tailwind CSS',
      database: 'PostgreSQL / Prisma ORM',
      deployment: 'AWS ECS Fargate / Cloud Run VPS',
      compliance: 'GDPR Coherent, SOC2 Type II Certified',
      sla: '99.99% Uptime SLA Guarantee'
    },
    whatsIncluded: [
      'Lifetime source-code license for a single production cluster',
      '6 Months of MetaWave Premium Engineering support',
      'Pre-built integrations with Stripe, Twilio, and SendGrid',
      'Full technical architecture documentation & API blueprints'
    ],
    deploymentSteps: [
      'Provision target cloud PostgreSQL instance with appropriate SECP/FBR rules',
      'Establish container deployment parameters using our prebuilt Docker-Compose templates',
      'Connect secure OAuth authorization channels',
      'Launch production cluster under MetaWave monitoring SLA'
    ],
    roiMetric: {
      label: 'Average Conversion Boost',
      value: '+58% faster'
    }
  },
  {
    id: 'metaerp',
    name: 'MetaERP Operations Suite',
    category: 'saas',
    categoryLabel: 'Enterprise SaaS',
    shortDesc: 'Double-entry automatic ledger reconciliation and real-time inventory matching.',
    longDesc: 'MetaERP provides a modern, high-fidelity business planning database designed to eliminate administrative gaps. Combining instant transaction ledgers, inventory supply chain triggers, multi-subsidiary currency stabilizers, and automated taxation models, MetaERP ensures absolute coordination across multiple administrative nodes.',
    price: 1499,
    billingPeriod: 'lifetime',
    rating: 4.8,
    reviewsCount: 89,
    icon: Layers,
    featuredImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    badge: 'ENTERPRISE RATED',
    features: [
      'Double-entry automatic ledger reconciliation logs',
      'IoT inventory supply matching & automated PO triggers',
      'Multi-subsidiary regional taxation planners',
      'Live logistical fleet tracking & dispatch schedules'
    ],
    techSpecs: {
      framework: 'SvelteKit / Tailwind CSS / NestJS',
      database: 'PostgreSQL / Cloud Spanner',
      deployment: 'Google Cloud Run / Kubernetes (GKE)',
      compliance: 'Fully FBR/SECP compatible & auditing secure',
      sla: '99.999% Database Cluster SLA'
    },
    whatsIncluded: [
      'Unlimited seat developer license for global subsidiaries',
      '1 Year of active developer support & schema upgrades',
      'Advanced telemetry dashboard module source files',
      'Predefined Terraform configuration scripts'
    ],
    deploymentSteps: [
      'Configure relational databases with active backup sync',
      'Configure secure container registries and run Docker build',
      'Input local regional tax coefficients into the system',
      'Execute database seed and coordinate vendor sync routines'
    ],
    roiMetric: {
      label: 'Capital Allocation Efficiency',
      value: '18% capital saved'
    }
  },
  {
    id: 'metahr',
    name: 'MetaHR Compliance Portal',
    category: 'saas',
    categoryLabel: 'Enterprise SaaS',
    shortDesc: 'Automated labor regulatory onboarding checklists and smart payroll disbursements.',
    longDesc: 'MetaHR is a human capital management portal prioritizing structural compliance and frictionless employee onboarding. Offering automated compliance verification, secure document signatures, encrypted payroll scheduling, and structured feedback mechanisms, it serves as the ultimate engine for modern corporate governance.',
    price: 499,
    billingPeriod: 'annual',
    rating: 4.7,
    reviewsCount: 64,
    icon: UserCheck,
    featuredImg: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop',
    features: [
      'Automated corporate compliance onboarding checklists',
      'Intelligent encrypted payroll disbursements engine',
      'AI-assisted employee performance reviews',
      'Frictionless anonymous feedback routing channels'
    ],
    techSpecs: {
      framework: 'Vue 3 / Vite / Tailwind CSS',
      database: 'Redis / MongoDB Atlas',
      deployment: 'Vercel / AWS ECS',
      compliance: 'HIPAA & GDPR fully compliant data streams',
      sla: '99.95% Network Availability'
    },
    whatsIncluded: [
      'Standard cloud license with automated security patches',
      'On-demand compliance updates when regional labor laws change',
      'Interactive Slack & Microsoft Teams notification hooks',
      'Comprehensive setup guides and employee onboarding templates'
    ],
    deploymentSteps: [
      'Select hosting zone and configure environmental secrets',
      'Setup authentication profiles (Google Workspace SSO, Okta)',
      'Upload initial corporate handbook and onboarding templates',
      'Invite payroll administration nodes to initialize ledger profiles'
    ],
    roiMetric: {
      label: 'Onboarding Speed Improvement',
      value: '3.1x faster onboarding'
    }
  },
  {
    id: 'metakit',
    name: 'MetaWave Dev Boilerplate Kit',
    category: 'devtools',
    categoryLabel: 'Developer Tools',
    shortDesc: 'Premium React + Next.js developer boilerplate configured with Firebase, Auth & Framer.',
    longDesc: 'Build gorgeous, high-performance web applications under minutes. This developer toolkit is the exact, hyper-optimized boilerplate used in-house by MetaWave engineering teams. Crafted using Next.js 14, Tailwind CSS, Firebase Firestore databases, next-auth, and masterclass Framer-Motion layouts, this product gives developers a massive, clean structural headstart.',
    price: 199,
    billingPeriod: 'one-time',
    rating: 4.95,
    reviewsCount: 312,
    icon: Code,
    featuredImg: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    badge: 'DEV CHOICE',
    features: [
      'Fully pre-configured Next.js 14 template (App Router)',
      'Prebuilt Firebase Firestore schemas & security rules',
      'Next-Auth integration supporting Google, GitHub & custom credentials',
      'Stripe checkout proxy endpoints and webhook listeners prebuilt',
      'Complete component catalog styled with Tailwind and Framer'
    ],
    techSpecs: {
      framework: 'Next.js 14 (App Router) / React 18 / Tailwind v4',
      database: 'Firebase Firestore / PostgreSQL adapter',
      deployment: 'Vercel / Netlify / Cloud Run',
      compliance: 'Open-Source, Developer-friendly, Standard-compliant',
      sla: 'Lifetime community updates'
    },
    whatsIncluded: [
      'Full private GitHub repository invitation and lifetime access',
      'Beautiful sample modules: Dashboard, Blog, and Billing Pages',
      'Fully documented configuration keys with standard .env.example files',
      'Free lifetime upgrades and patch scripts'
    ],
    deploymentSteps: [
      'Clone our private repository from GitHub using your secure token',
      'Input environment variables into your local configuration file',
      'Execute "npm install" and initialize firebase-blueprint configurations',
      'Run "npm run dev" to see your complete stack running locally on port 3000'
    ],
    roiMetric: {
      label: 'Developer Bootup Time',
      value: 'Save 40+ engineering hours'
    }
  },
  {
    id: 'fbraudit',
    name: 'FBR & SECP Compliance Auditor',
    category: 'compliance',
    categoryLabel: 'Compliance & Security',
    shortDesc: 'Automated compliance ledger script for seamless secure fiscal reporting integrations.',
    longDesc: 'Ensure absolute compliance with FBR and SECP tax and administrative guidelines. This specialized auditing utility connects directly to your transactional databases, monitors ledger changes using cryptographic hashing algorithms, and formats records instantly for secure submission. Eliminate compliance risks and manual auditing errors entirely.',
    price: 349,
    billingPeriod: 'one-time',
    rating: 4.85,
    reviewsCount: 47,
    icon: FileCheck,
    featuredImg: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800&auto=format&fit=crop',
    badge: 'SECURE',
    features: [
      'Automated FBR tax ledger formats mapping',
      'Cryptographic data verification on ledger entries',
      'Direct API gateway transmission connectors',
      'Smart localized compliance PDF export engine'
    ],
    techSpecs: {
      framework: 'Node.js Express Script / Python FastAPI',
      database: 'MySQL / PostgreSQL / MSSQL Adapters',
      deployment: 'Serverless Cloud Functions / Cron Job Daemon',
      compliance: 'Fully SECP compliant & FBR tax system ready',
      sla: '99.99% Auditing Precision'
    },
    whatsIncluded: [
      'Ready-to-deploy auditing microservice source files',
      '3 Dedicated integration consulting hours with MetaWave specialists',
      'Free regulatory updates for the fiscal year 2026',
      'Encrypted reporting dashboard React component module'
    ],
    deploymentSteps: [
      'Mount auditing microservice on your backend framework',
      'Authorize secure read-only access to transaction tables',
      'Configure compliance API key profiles and token parameters',
      'Establish automatic cron job routine for daily data audits'
    ],
    roiMetric: {
      label: 'Compliance Risk Exposure',
      value: 'Zero regulatory penalties'
    }
  },
  {
    id: 'analyticsconnector',
    name: 'Gemini Enterprise Connector Hub',
    category: 'devtools',
    categoryLabel: 'Developer Tools',
    shortDesc: 'Full-stack plugin system to bridge corporate databases directly to Gemini LLMs.',
    longDesc: 'Unlock the power of Gemini inside your private enterprise databases without compromising security. This advanced SDK connector allows secure, sandboxed query generation, automated data vectorization, and localized intelligent reasoning. Designed from the ground up to prevent data leaks, keeping your data confidential.',
    price: 599,
    billingPeriod: 'annual',
    rating: 4.92,
    reviewsCount: 78,
    icon: Cpu,
    featuredImg: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    badge: 'AI DRIVEN',
    features: [
      'Secure, fully private semantic database search models',
      'Safe streaming text-to-SQL compilers with validation guards',
      'Vectorization adapter scripts for Redis and Pinecone',
      'Real-time business health telemetry report auto-generator'
    ],
    techSpecs: {
      framework: 'TypeScript SDK / @google/genai Compatible',
      database: 'Compatible with standard SQL / NoSQL engines',
      deployment: 'AWS Lambda / GCF / Docker containers',
      compliance: 'SOC2 Compliant data transit controls',
      sla: 'Lifetime SDK updates'
    },
    whatsIncluded: [
      'Full source files of the Gemini DB Proxy layer',
      'Secure database caching and performance modules',
      'Sample application showing full Chat-with-your-Database interface',
      '1 Year of active API update support and maintenance'
    ],
    deploymentSteps: [
      'Verify secure API keys and setup environmental variables',
      'Initialize proxy endpoints using Node.js or Python backend',
      'Map schema parameters to the LLM contextual memory block',
      'Test SQL validation guards before publishing query endpoints'
    ],
    roiMetric: {
      label: 'Decision-making velocity',
      value: '72% faster reports'
    }
  },
  {
    id: 'poshardware',
    name: 'MetaWave Edge-POS Hardware Gateway',
    category: 'hardware',
    categoryLabel: 'Hardware Solutions',
    shortDesc: 'Ultra-durable micro-terminal gateway with offline caching & thermal printing hooks.',
    longDesc: 'A physical high-performance edge terminal designed to coordinate massive concurrent cashier registers. Equipped with high-speed processors, hardware backup memory slots, dual Ethernet/LTE fallback antennas, and direct thermal printer adapters, this gateway ensures your stores never lose a single checkout transaction, even during regional power outages.',
    price: 849,
    billingPeriod: 'one-time',
    rating: 4.88,
    reviewsCount: 39,
    icon: Server,
    featuredImg: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
    features: [
      'Solid-state low heat dual-core processor core',
      'High capacity local database caching (Up to 1M items)',
      'Dual-antenna automatic backup LTE fallback system',
      'Direct legacy thermal billing printers RJ11/USB adapters'
    ],
    techSpecs: {
      framework: 'Embedded Linux OS with MetaWave POS Daemon',
      database: 'SQLite local caching with Cloud Sync Engine',
      deployment: 'On-premise physical mounting setup',
      compliance: 'CE Certified, SECP & FBR hardware compliant',
      sla: '2 Year Hardware replacement warranty'
    },
    whatsIncluded: [
      '1x MetaWave Edge-POS Gateway Physical device (LTE Edition)',
      'Mounting accessories and heavy-duty protective cage',
      'Pre-loaded POS system management terminal software',
      'Lifetime system OS updates and backup tools access'
    ],
    deploymentSteps: [
      'Mount physical gateway securely in the regional warehouse core',
      'Connect network ethernet line and install backup SIM card',
      'Register device serial number inside your main cloud console',
      'Connect cashier registers to the localized POS wifi SSID'
    ],
    roiMetric: {
      label: 'Store Checkout Downtime',
      value: 'Reduced to 0.00%'
    }
  }
];
