import { Service, Solution, PortfolioItem, Testimonial, ProcessStep, TechCategory } from './types';

export const stats = [
  { value: '100+', label: 'Projects Delivered', description: 'Enterprise-grade products launched globally' },
  { value: '98%', label: 'Client Satisfaction', description: 'Uncompromising standard of excellence & care' },
  { value: '15+', label: 'Countries Served', description: 'Empowering visionaries across 5 continents' },
  { value: '24/7', label: 'Support & Maintenance', description: 'Continuous monitoring, scaling & assistance' },
];

export const services: Service[] = [
  {
    id: 's1',
    icon: 'Cpu',
    title: 'Custom Software Development',
    description: 'Bespoke software ecosystems designed to address your exact organizational challenges, engineered with elite security and limitless scalability.'
  },
  {
    id: 's2',
    icon: 'Globe',
    title: 'Web Application Development',
    description: 'High-performance, ultra-responsive web experiences mirroring modern standards of Vercel and Stripe, fully optimized for search engines and conversion.'
  },
  {
    id: 's3',
    icon: 'Smartphone',
    title: 'Mobile App Development',
    description: 'Seamless native and cross-platform mobile apps for iOS and Android, leveraging Flutter and React Native to deliver fluid, intuitive user interactions.'
  },
  {
    id: 's4',
    icon: 'BrainCircuit',
    title: 'AI & Machine Learning Solutions',
    description: 'Integrate advanced large language models, machine learning algorithms, computer vision, and cognitive automation deeper into your core business logic.'
  },
  {
    id: 's5',
    icon: 'Cloud',
    title: 'Cloud Infrastructure & DevOps',
    description: 'Resilient cloud architecture (AWS, Azure, GCP), automated CI/CD pipelines, containerized orchestration with Docker & Kubernetes, and maximum uptime.'
  },
  {
    id: 's6',
    icon: 'Building2',
    title: 'Enterprise Systems',
    description: 'Large-scale digital architecture for modern operations, engineered to streamline multi-department workflows, secure data silos, and handle heavy traffic.'
  },
  {
    id: 's7',
    icon: 'Palette',
    title: 'UI/UX Design',
    description: 'Breathtaking interfaces and deeply researched customer journeys. We prioritize aesthetics, usability, and modern brand patterns to capture loyalty.'
  },
  {
    id: 's8',
    icon: 'Layers',
    title: 'SaaS Product Development',
    description: 'End-to-end multi-tenant engineering to build, launch, and monetize your SaaS. Complete with subscription management, high performance, and growth toolkits.'
  },
  {
    id: 's9',
    icon: 'Cable',
    title: 'API Development & Integrations',
    description: 'Secure, modern RESTful and GraphQL APIs designed for speed and simplicity. Connecting pre-existing systems smoothly with modern digital networks.'
  },
  {
    id: 's10',
    icon: 'Zap',
    title: 'Automation Solutions',
    description: 'Drastically reduce operational overhead by automating repetitive back-office processes, notification loops, data entry, and business routines.'
  },
  {
    id: 's11',
    icon: 'ShoppingBag',
    title: 'E-Commerce Platforms',
    description: 'Highly customized commerce ecosystems with frictionless shopping experiences, multi-currency scaling, and bulletproof payment flows.'
  },
  {
    id: 's12',
    icon: 'HelpCircle',
    title: 'Technical Consulting',
    description: 'Strategic technology audits, stack selection, scalability planning, and solution architectural guidance from vetted enterprise engineering leads.'
  }
];

export const solutions: Solution[] = [
  {
    id: 'sol1',
    title: 'AI Automation Platforms',
    subtitle: 'COGNITIVE OPERATIONS',
    description: 'Supercharge operational efficiency with intelligent agent-led workflows that analyze, triage, and execute complex business routines autonomously.',
    features: [
      'Autonomous document parsing & indexing',
      'Cognitive text & sentiment analysis',
      'Predetermined rule triggers and real-time response mechanisms',
      'Self-learning optimization loops'
    ],
    benefits: [
      'Reduce context-switching & operational costs by up to 70%',
      'Eliminate manual transcription & process bottlenecks',
      'Uncover predictive trends based on historical telemetry'
    ],
    ctaText: 'Explore AI Solutions',
    imageAlt: 'AI Automation Platform Interface',
    imageTheme: 'cyan'
  },
  {
    id: 'sol2',
    title: 'CRM Systems',
    subtitle: 'CUSTOMER ENGAGEMENT',
    description: 'Unified commercial hubs providing a panoramic, 360-degree view of your customer relationships, conversion pipelines, and post-sales communications.',
    features: [
      'Multi-channel contact stitching',
      'AI-powered lead scoring & telemetry',
      'Integrated sales pipelines & automated sequencing',
      'Real-time tracking of deal value flow'
    ],
    benefits: [
      'Accelerate sales team velocity with automatic task logs',
      'Never lose touch with strategic key accounts',
      'Gain unmatched insights into forecasted conversion'
    ],
    ctaText: 'Deploy Custom CRM',
    imageAlt: 'CRM Dashboard Layout',
    imageTheme: 'blue'
  },
  {
    id: 'sol3',
    title: 'ERP Solutions',
    subtitle: 'RESOURCE MANAGEMENT',
    description: 'Robust operations control matrices that bind inventory schedules, financial balance ledgers, human resources, and manufacturing pipelines under one interface.',
    features: [
      'Double-entry General Ledger syncing',
      'Dynamic supply chain & stock alerts',
      'Automated payroll calculations & tracking',
      'Secure internal access controls (RBAC)'
    ],
    benefits: [
      'Single source of truth for unified global operations',
      'Audit readiness with detailed cryptographic change logs',
      'Synchronize complex cross-border logistics effortlessly'
    ],
    ctaText: 'Modernize Your ERP',
    imageAlt: 'ERP Enterprise Control Center',
    imageTheme: 'purple'
  },
  {
    id: 'sol4',
    title: 'Healthcare Platforms',
    subtitle: 'PATIENT WELLBEING & COMPLIANCE',
    description: 'HIPAA and GDPR-compliant digital medical record systems, remote dynamic scheduling portals, and secure patient-practitioner communication pipelines.',
    features: [
      'Secure FHIR-standard electronic records',
      'End-to-end encrypted telemedicine sessions',
      'Interactive patient triage & intake interfaces',
      'Insurance claim auto-validation rules'
    ],
    benefits: [
      'Deliver world-class patient experiences on any device',
      'Uncompromising security and patient data privacy standards',
      'Optimize clinic schedules to minimize dry times and waitlists'
    ],
    ctaText: 'See Health Solutions',
    imageAlt: 'Healthcare Interface Preview',
    imageTheme: 'indigo'
  },
  {
    id: 'sol5',
    title: 'Property Management Systems',
    subtitle: 'REAL ESTATE DIGITALIZATION',
    description: 'Intelligent portals for residential and commercial spaces, facilitating modern lease negotiations, automated maintenance scheduling, and real-time ledger auditing.',
    features: [
      'Digital tenant portal & mobile ledger tracking',
      'Preventative IoT smart maintenance notifications',
      'Contract parsing & e-signature pipelines',
      'Portfolio performance dashboards'
    ],
    benefits: [
      'Elevate asset yields by optimizing maintenance actions',
      'Consolidate rent collection and lower delinquency rates',
      'Enhance commercial transparency between management and tenants'
    ],
    ctaText: 'View Property Suite',
    imageAlt: 'Property Management Portal UI',
    imageTheme: 'cyan'
  },
  {
    id: 'sol6',
    title: 'Education Platforms',
    subtitle: 'HYBRID LEARNING SYSTEMS',
    description: 'Immersive, scalable Learning Management Systems (LMS) pairing self-paced modules, live interaction panels, and comprehensive grading insights.',
    features: [
      'Dynamic interactive syllabus trees',
      'Real-time visual classrooms with peer chat',
      'AI-powered personalized homework quizzes',
      'Automated custom grading schemas'
    ],
    benefits: [
      'Scale course offerings to tens of thousands of active learners',
      'Increase engagement with gamified achievements & pathways',
      'Provide teachers with actionable progress insights'
    ],
    ctaText: 'Launch Educational Tool',
    imageAlt: 'LMS Platform Interface',
    imageTheme: 'blue'
  },
  {
    id: 'sol7',
    title: 'FinTech Solutions',
    subtitle: 'TRANSACTIONAL CAPABILITY',
    description: 'High-security payment wrappers, digital ledgers, portfolio tracking metrics, and custom card management infrastructure compliant with PCI-DSS guidelines.',
    features: [
      'Microsecond ledger transaction verification',
      'Fraud detection engines using predictive anomaly models',
      'Comprehensive multi-ledger currency accounting',
      'Frictionless bank connections (via Plaid/Open Banking)'
    ],
    benefits: [
      'Build immediate consumer trust with PCI-DSS resilience',
      'Minimize payment failures and transaction latency',
      'Deliver fluid, crystal-clear visual spending reports'
    ],
    ctaText: 'Deploy Fintech Core',
    imageAlt: 'FinTech Analytics Interface',
    imageTheme: 'purple'
  },
  {
    id: 'sol8',
    title: 'Business Intelligence Dashboards',
    subtitle: 'DECISION ANALYSIS',
    description: 'Unified visualization panels turning massive, disjointed business data streams into ultra-clear, real-time insights that guide executive strategy.',
    features: [
      'Live streaming database connectors',
      'Highly flexible user-configured reporting widgets',
      'One-click spreadsheet & PDF data export export',
      'Predictive simulation sandbox'
    ],
    benefits: [
      'Ditch clunky manual CSV manipulation once and for all',
      'Empower leadership with single-glance macro metrics',
      'Respond instantly to market shifts and product updates'
    ],
    ctaText: 'Design Custom Analytics',
    imageAlt: 'Business Intelligence Dashboard UI',
    imageTheme: 'indigo'
  }
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Aegis Healthcare Platform',
    category: 'Healthcare Tech',
    industry: 'Healthcare',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS FHIR'],
    overview: 'Developed a high-end, end-to-end encrypted telehealth and patient clinical record portal serving millions in compliance with HIPAA guidelines.',
    results: [
      '40% reduction in average patient intake times',
      '99.99% uptime achieved across 12 hospitals',
      'Zero reported security breaches over 3 years'
    ],
    imageTheme: 'indigo'
  },
  {
    id: 'p2',
    title: 'Prism Real Estate Portal',
    category: 'Property Management',
    industry: 'Real Estate',
    techStack: ['Vue.js', 'Laravel', 'MySQL', 'MongoDB', 'Mapbox API'],
    overview: 'A sleek, lightning-fast commercial property leasing platform wrapping automated lease renewals and preventative IoT maintenance requests.',
    results: [
      'Leasing velocity increased by 3.2x',
      '$2.1M in transactional rent processed monthly',
      'Maintenance resolution speeds improved by 45%'
    ],
    imageTheme: 'cyan'
  },
  {
    id: 'p3',
    title: 'Apex Intelligence Engine',
    category: 'AI & Analytics',
    industry: 'Startups / Finance',
    techStack: ['React', 'Next.js', 'Python', 'FastAPI', 'TensorFlow'],
    overview: 'A premium, high-speed business intelligence workspace aggregating live analytics tracking, automated report generators, and prediction tables.',
    results: [
      '12B+ data points processed daily in real-time',
      'Interactive dashboards rendering under 150ms',
      'Average monthly customer retention lifted by 28%'
    ],
    imageTheme: 'blue'
  },
  {
    id: 'p4',
    title: 'Aura Premium E-Commerce',
    category: 'E-Commerce Ecosystem',
    industry: 'Retail',
    techStack: ['Next.js', 'Tailwind', 'Stripe API', 'GraphQL', 'Swell'],
    overview: 'A luxurious global commerce storefront utilizing modern static generation to load instantly, complete with deep custom back-office search grids.',
    results: [
      'Global page load speeds improved by 140%',
      'Cart separation rate dropped by 22% overall',
      'Annual checkout value grew by $15.4M'
    ],
    imageTheme: 'purple'
  },
  {
    id: 'p5',
    title: 'Nova Mobile Banking App',
    category: 'FinTech App',
    industry: 'Finance',
    techStack: ['Flutter', 'Express', 'Redis', 'PostgreSQL', 'Kubernetes'],
    overview: 'Constructed an ultra-fluid personal investment and mobile checking banking experience complete with biometrics and dynamic micro-currency trades.',
    results: [
      '2.5M active app users acquired in 18 months',
      'App Store score maintained at a high 4.9/5 stars',
      'Asset transfer clearing speed reduced to under 5 seconds'
    ],
    imageTheme: 'indigo'
  },
  {
    id: 'p6',
    title: 'Logix Supply Orchestrator',
    category: 'Logistics Systems',
    industry: 'Logistics / Mfg',
    techStack: ['React', 'Go', 'Docker', 'Google Maps API', 'gRPC'],
    overview: 'A massive internal logistics dashboard visualizing global fleet shipping tracking metrics, optimized routes, and machine-failure alerts.',
    results: [
      'Fuel emissions and mileage slashed by 18%',
      'Dispatch scheduling errors reduced by 85%',
      'Secured a $4.5M annual supply-chain savings rate'
    ],
    imageTheme: 'cyan'
  }
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Discovery & Strategy',
    description: 'We align deeply with your strategic company objectives, audit current technological roadblocks, and define the absolute ideal engineering outcome.'
  },
  {
    step: 2,
    title: 'Research & Planning',
    description: 'Laying down robust system schematics, prioritizing features, drafting strict API data flows, and establishing precise development timelines.'
  },
  {
    step: 3,
    title: 'UI/UX Design',
    description: 'Drafting high-fidelity, visually stunning interactive mockups reflecting modern luxury typography, spatial balance, and fluid wireframe user-paths.'
  },
  {
    step: 4,
    title: 'Development',
    description: 'Writing clean, beautifully modular, typed, and unit-tested codebases. Engineered with optimized build tooling and military-grade security baselines.'
  },
  {
    step: 5,
    title: 'Testing & QA',
    description: 'Subjecting the software to rigorous security penetration audits, structural edge-case tests, performance benchmarks, and user-acceptance validation.'
  },
  {
    step: 6,
    title: 'Deployment',
    description: 'Deploying the code smoothly into stable cloud host containers, ensuring multi-region fallback redundancy, self-healing setups, and optimal performance.'
  },
  {
    step: 7,
    title: 'Support & Growth',
    description: 'Continuously optimizing query speed, releasing high-value feature updates, and scaling server boundaries to align with your ongoing corporate growth.'
  }
];

export const comparisonData = {
  columns: ['Performance & Standard', 'MetaWave Innovations', 'Traditional Agencies'],
  rows: [
    { metric: 'Avg. Delivery Speed', metawave: '4-8 Weeks (via Agile & Automated Workflows)', traditional: '6-12 Months (Snail-paced processes & communication)' },
    { metric: 'Team Allocation', metawave: '100% Dedicated Elite Senior Technical Leaders', traditional: 'Overbooked Generalists swapped out post-sales' },
    { metric: 'AI & Automation Strategy', metawave: 'Native AI-assisted engineering & automated workflows included', traditional: 'Tack-on secondary plugins with premium markups' },
    { metric: 'System Architecture', metawave: 'Scalable cloud-native, serverless, microservices framework', traditional: 'Monolithic template-built stacks with high technical debt' },
    { metric: 'Security & Compliance', metawave: 'Strict enterprise baseline encryption & audit-trail logs', traditional: 'Treated as a secondary thought, low defensive scanning' },
    { metric: 'Long-Term Support', metawave: '24/7 proactive maintenance & immediate scaling assistance', traditional: 'Hourly retainers or single handover with limited bug support' },
    { metric: 'Business Impact Focus', metawave: 'Metrics-driven development focused on actual growth stats', traditional: 'Pure visual handoff focusing purely on design aesthetics' },
    { metric: 'Transparency', metawave: 'Real-time collaborative Slack channels & direct code repository access', traditional: 'Bi-weekly opaque update emails and slow ticket queues' }
  ]
};

export const techStack: TechCategory[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: 'Atom' },
      { name: 'Next.js', icon: 'Code2' },
      { name: 'Vue', icon: 'Compass' },
      { name: 'Angular', icon: 'Shield' }
    ]
  },
  {
    category: 'Backend',
    items: [
      { name: 'Laravel', icon: 'Layers' },
      { name: 'Node.js', icon: 'Cpu' },
      { name: 'Express', icon: 'Terminal' },
      { name: 'Python', icon: 'Braces' }
    ]
  },
  {
    category: 'Mobile',
    items: [
      { name: 'Flutter', icon: 'Smartphone' },
      { name: 'React Native', icon: 'Smartphone' }
    ]
  },
  {
    category: 'Cloud',
    items: [
      { name: 'AWS', icon: 'Cloud' },
      { name: 'Azure', icon: 'CloudLightning' },
      { name: 'Google Cloud', icon: 'Globe2' }
    ]
  },
  {
    category: 'Database',
    items: [
      { name: 'MySQL', icon: 'Database' },
      { name: 'PostgreSQL', icon: 'Database' },
      { name: 'MongoDB', icon: 'HardDrive' }
    ]
  },
  {
    category: 'DevOps',
    items: [
      { name: 'Docker', icon: 'Server' },
      { name: 'Kubernetes', icon: 'Workflow' },
      { name: 'CI/CD Pipelines', icon: 'GitMerge' }
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Chief Technology Officer',
    company: 'Vanguard Health Systems',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
    review: "MetaWave Innovations transformed our legacy electronic patient records system into an absolute masterpiece. Their engineering team is elite, delivering our HIPAA-compliant telemedicine module weeks ahead of schedule. The code quality is immaculate.",
    rating: 5
  },
  {
    id: 't2',
    name: 'Marcus Thorne',
    role: 'VP of Digital Product',
    company: 'Apex Trading Corp',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    review: "The business intelligence dashboard created by MetaWave processes billions of streaming transactions seamlessly. Their standard of visual hierarchy and microsecond query response times feels like absolute magic. A phenomenal partner.",
    rating: 5
  },
  {
    id: 't3',
    name: 'Elena Rostova',
    role: 'Founder & CEO',
    company: 'Aura Luxury Group',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    review: "Our visual identity, localized high-contrast storefront, and automated warehousing backend were launched flawlessly. Working with MetaWave felt like having a co-founder with infinite technological wisdom. Our checkouts surged immediately.",
    rating: 5
  },
  {
    id: 't4',
    name: 'David Chen',
    role: 'Director of Operations',
    company: 'Logix Global Logistics',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    review: "Route optimization algorithms and real-time transit telemetry built by MetaWave cut down our fleet fuel expenses by a solid 18%. Their transparent communication and active support are second to none in this industry.",
    rating: 5
  }
];

export const industries = [
  { name: 'Healthcare', icon: 'HeartPulse', count: '24 Projects' },
  { name: 'Real Estate', icon: 'Building', count: '18 Projects' },
  { name: 'Education', icon: 'GraduationCap', count: '12 Projects' },
  { name: 'Finance', icon: 'Coins', count: '20 Projects' },
  { name: 'Retail', icon: 'ShoppingBag', count: '15 Projects' },
  { name: 'Manufacturing', icon: 'Factory', count: '8 Projects' },
  { name: 'Logistics', icon: 'Truck', count: '11 Projects' },
  { name: 'Government', icon: 'Scale', count: '5 Projects' },
  { name: 'Startups', icon: 'Rocket', count: '32 Projects' },
  { name: 'Non-Profit Organizations', icon: 'Globe2', count: '7 Projects' }
];

export const trusteeLogos = [
  'React',
  'Next.js',
  'Laravel',
  'Flutter',
  'Node.js',
  'Python',
  'AWS',
  'Azure',
  'Docker',
  'Kubernetes'
];
