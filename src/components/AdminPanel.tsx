import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield, Check, X, Search, Plus, Trash2, Edit2, ShoppingBag, Users, Mail,
  Lock, Unlock, Key, RefreshCw, TrendingUp, Briefcase, Info, Activity, Share2,
  Facebook, Linkedin, Instagram, Twitter, Cpu, Terminal, AlertTriangle, Phone,
  ArrowRight, Clock, Server, Zap, ChevronRight, Download, Eye, Inbox, Send,
  Megaphone, Paperclip, MailOpen, Bell, Sparkles, AlertCircle, Star, Menu
} from 'lucide-react';
import { playSound } from '../utils/audio';
import { createClient } from '../../lib/supabase/client';

// --- TS Interfaces ---
export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  activeHours: number;
  status: 'Active' | 'On Leave' | 'Offline';
  permissions?: string[];
}

export interface ClientProfile {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  budget: number;
  activeProject: string;
  status: 'Active Client' | 'Onboarding' | 'Contract Ended';
  progress: number; // 0 to 100
}

export interface SocialPost {
  id: string;
  platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram';
  content: string;
  scheduledTime: string;
  status: 'Scheduled' | 'Published';
}

export interface SystemTool {
  id: string;
  name: string;
  category: string;
  uptime: string;
  status: 'Online' | 'Offline' | 'Maintenance';
  activeClients: number;
  price: number;
  techStack: string;
  description: string;
}

export interface CorporateSale {
  id: string;
  created_at: string;
  invoice_no: string;
  name: string;
  company: string;
  email: string;
  product_name: string;
  license_tier: string;
  amount: number;
}

export interface ServiceNode {
  id: string;
  name: string;
  uptime: string;
  status: 'Online' | 'Offline';
  load: number; // 0 - 100
  port: string;
  description: string;
}

export interface ContactSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  service_needed?: string | null;
  budget_range?: string | null;
  project_details?: string | null;
  status: 'Pending' | 'In Review' | 'Contacted' | 'Resolved';
  admin_notes?: string | null;
}

export interface HostingerEmail {
  id: string;
  from: string;
  fromName: string;
  to: string;
  subject: string;
  body: string;
  date: string;
  isRead: boolean;
  folder: 'inbox' | 'sent' | 'drafts' | 'spam' | 'trash';
  starred?: boolean;
}

export interface TeamAnnouncement {
  id: string;
  title: string;
  content: string;
  author: string;
  role: string;
  date: string;
  category: 'General' | 'Engineering' | 'Marketing' | 'SLA Operations' | 'Personnel';
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface AdminPanelProps {
  onExit?: () => void;
}

export function AdminPanel({ onExit }: AdminPanelProps = {}) {
  // --- Auth State ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('mwi_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState<string>('');
  const [loginEmail, setLoginEmail] = useState<string>('leadership@metawaveinnovations.com');
  const [authError, setAuthError] = useState<string>('');

  // --- Core Tabs ---
  // Requested focus: products, services, clients, social, sales, staff
  const [activeTab, setActiveTab] = useState<string>('products');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // --- Real-Time UTC Clock ---
  const [systemTime, setSystemTime] = useState<string>('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- Sound States ---
  const [soundOn, setSoundOn] = useState<boolean>(() => {
    return localStorage.getItem('mwi_sound_enabled') !== 'false';
  });

  const toggleGlobalSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    localStorage.setItem('mwi_sound_enabled', next ? 'true' : 'false');
    playSound('toggle');
    triggerToast(next ? "Acoustic handshakes enabled." : "Audio outputs muted.");
  };

  // --- Persistent State Handlers ---
  const getStored = <T,>(key: string, fallback: T): T => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  };

  // --- Initial Data Seeds ---
  const [products, setProducts] = useState<SystemTool[]>(() => getStored('mwi_tools', [
    { id: 'pos', name: 'POS and Billing System', category: 'Retail Tools', uptime: '99.98%', status: 'Online', activeClients: 64, price: 1500, techStack: 'Node.js + Local SQLite SQLiteSync', description: 'SLA-grade fast-billing register with localized thermal printer driver micro-kernels.' },
    { id: 'lms', name: 'Educational & Department System', category: 'LMS Tools', uptime: '99.95%', status: 'Online', activeClients: 35, price: 2400, techStack: 'Python + PostgreSQL WebSockets', description: 'Centralized school academic nodes, student progress records, and dynamic grading loops.' },
    { id: 'rms', name: 'Restaurant Management System', category: 'POS Tools', uptime: '99.91%', status: 'Online', activeClients: 48, price: 3000, techStack: 'React + SQLite Sync Layer', description: 'Real-time kitchen order tickers, recipe modifiers, and table billing integrations.' },
    { id: 'ai', name: 'AI Business Analytics Portal', category: 'Reporting Portal', uptime: '99.99%', status: 'Online', activeClients: 22, price: 4500, techStack: 'Rust + Tensor Engine', description: 'Predictive enterprise stock thresholds, customer acquisition indexing, and sales forecasting.' },
    { id: 'wms', name: 'Business & Warehouse Management', category: 'Ledger Solutions', uptime: '99.92%', status: 'Online', activeClients: 18, price: 3800, techStack: 'Go + Offline-First Sync', description: 'Logistics batch tracking, barcode scanning pipelines, and storage inventory audits.' }
  ]));

  const [services, setServices] = useState<ServiceNode[]>(() => getStored('mwi_services', [
    { id: 's_api', name: 'Primary API Gateway', uptime: '99.99%', status: 'Online', load: 42, port: ':3001', description: 'Secure ingress router with high-throughput load balancer.' },
    { id: 's_print', name: 'Thermal Print Pipeline', uptime: '99.95%', status: 'Online', load: 15, port: ':3008', description: 'Raw byte converter for local ESC/POS registers.' },
    { id: 's_db', name: 'Offline SQLite Sync Worker', uptime: '99.98%', status: 'Online', load: 28, port: ':3012', description: 'Continuous bi-directional client data replica sync.' },
    { id: 's_push', name: 'Real-time WebSockets Broker', uptime: '99.92%', status: 'Online', load: 65, port: ':3005', description: 'Event-driven instant message dispatch channel.' }
  ]));

  const [clients, setClients] = useState<ClientProfile[]>(() => getStored('mwi_clients', [
    { id: 'c1', name: 'Sarah Jenkins', company: 'National Health Service', email: 'procurement@nhs.gov.uk', phone: '+44 7911 102938', budget: 45000, activeProject: 'NHS EHR Offline Sync Engine', status: 'Active Client', progress: 75 },
    { id: 'c2', name: 'James Vance', company: 'Apex FinTech Group', email: 'j.vance@apexfinancial.com', phone: '+44 2079 460192', budget: 68000, activeProject: 'AI Predictive Stocks Ledger', status: 'Active Client', progress: 40 },
    { id: 'c3', name: 'Evelyn Parker', company: 'Salt & Pepper Franchise', email: 'evelyn@saltpepper.io', phone: '+44 1614 960231', budget: 22000, activeProject: 'POS Franchise Rollout', status: 'Onboarding', progress: 95 }
  ]));

  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(() => getStored('mwi_social', [
    { id: 'sp1', platform: 'linkedin', content: 'We are proud to announce the MetaWave Innovations SLA-grade offline POS is now deployed across 64 enterprise retail locations. Fast-billing with local sync is now fully active. #POS #RetailTech', scheduledTime: '2026-07-02 09:00', status: 'Scheduled' },
    { id: 'sp2', platform: 'twitter', content: 'Say goodbye to internet downtime bottlenecks. MWI offline database engines keep transactions processing even if the WAN node drops. #SaaS #CloudNative', scheduledTime: '2026-07-03 14:30', status: 'Scheduled' }
  ]));

  const [sales, setSales] = useState<CorporateSale[]>(() => getStored('mwi_sales', [
    { id: 'sl1', created_at: '2026-06-25 11:20', invoice_no: 'INV-2026-042', name: 'Evelyn Parker', company: 'Salt & Pepper Franchise', email: 'evelyn@saltpepper.io', product_name: 'Restaurant Management System', license_tier: 'Team Cluster', amount: 3000 },
    { id: 'sl2', created_at: '2026-06-28 16:45', invoice_no: 'INV-2026-043', name: 'Sarah Jenkins', company: 'National Health Service', email: 'procurement@nhs.gov.uk', product_name: 'AI Business Analytics Portal', license_tier: 'Unlimited SLA', amount: 4500 }
  ]));

  const [staff, setStaff] = useState<Employee[]>(() => {
    const stored = getStored<Employee[]>('mwi_staff', []);
    const hasNewStaff = stored.some(s => s.email.includes('metawaveinnovations.com'));
    const needsMigration = stored.length > 0 && (!stored.some(s => s.permissions) || !stored.some(s => s.role.includes('CTO')));
    
    if (!hasNewStaff || stored.length <= 3 || needsMigration) {
      const initialStaff: Employee[] = [
        { 
          id: 'st_ali', 
          name: 'Ali Hassan Chand', 
          role: 'Founder | Chief Executive Officer (CEO) | Chief Technology Officer (CTO) | Chief Digital Officer (CDO) | Managing Director (MD)', 
          department: 'Executive Board', 
          email: 'leadership@metawaveinnovations.com', 
          phone: '+44 7700 900001', 
          activeHours: 52, 
          status: 'Active',
          permissions: ['products', 'services', 'clients', 'submissions', 'mailer', 'announcements', 'social', 'sales', 'staff']
        },
        { 
          id: 'st_suhail', 
          name: 'Suhail Siyal', 
          role: 'Partner | Director of Marketing & Business Growth', 
          department: 'Growth & Marketing', 
          email: 'suhail.md@metawaveinnovations.com', 
          phone: '+44 7700 900002', 
          activeHours: 40, 
          status: 'Active',
          permissions: ['clients', 'products', 'social', 'sales']
        },
        { 
          id: 'st_muntaha', 
          name: 'Muntaha Sheikh', 
          role: 'Partner | Lead Full-Stack & Mobile Solutions Architect', 
          department: 'Core Engineering', 
          email: 'muntaha@metawaveinnovations.com', 
          phone: '+44 7700 900003', 
          activeHours: 48, 
          status: 'Active',
          permissions: ['services', 'products', 'announcements']
        },
        { 
          id: 'st_ahad', 
          name: 'Abdul Ahad Arain', 
          role: 'Partner | Front-End Development Supervisor & UI/UX Specialist', 
          department: 'UI/UX & Design', 
          email: 'ahad@metawaveinnovations.com', 
          phone: '+44 7700 900004', 
          activeHours: 42, 
          status: 'Active',
          permissions: ['products', 'services', 'announcements']
        },
        { 
          id: 'st_ops', 
          name: 'General Team Operations', 
          role: 'System Orchestrators & Support Nodes', 
          department: 'Operations Command', 
          email: 'team@metawaveinnovations.com', 
          phone: '+44 7700 900005', 
          activeHours: 35, 
          status: 'Active',
          permissions: ['submissions', 'mailer', 'announcements']
        },
        { 
          id: 'st_support', 
          name: 'Client Support & Service Desk', 
          role: 'SLA Support & Diagnostics Center', 
          department: 'Client Services', 
          email: 'support@metawaveinnovations.com', 
          phone: '+44 7700 900006', 
          activeHours: 38, 
          status: 'Active',
          permissions: ['submissions', 'mailer', 'announcements']
        }
      ];
      localStorage.setItem('mwi_staff', JSON.stringify(initialStaff));
      return initialStaff;
    }
    return stored;
  });

  // --- Active Executive Session Context ---
  const [activeExecutiveEmail, setActiveExecutiveEmail] = useState<string>(() => {
    return localStorage.getItem('mwi_active_exec_email') || 'leadership@metawaveinnovations.com';
  });

  const activeExecutive = staff.find(s => s.email === activeExecutiveEmail) || staff[0] || {
    id: 'st_ali',
    name: 'Ali Hassan Chand',
    role: 'Founder | Chief Executive Officer (CEO) | Chief Technology Officer (CTO) | Chief Digital Officer (CDO) | Managing Director (MD)',
    department: 'Executive Board',
    email: 'leadership@metawaveinnovations.com',
    permissions: ['products', 'services', 'clients', 'submissions', 'mailer', 'announcements', 'social', 'sales', 'staff']
  };

  // --- Session-based Role & Clearance Level Helpers ---
  const currentRole = activeExecutive.role || '';
  const isCurrentCEO = activeExecutive.email === 'leadership@metawaveinnovations.com' || currentRole.includes('CEO') || currentRole.includes('Founder') || currentRole.includes('Managing Director');
  const isCurrentDirector = isCurrentCEO || currentRole.includes('Director') || currentRole.includes('Partner') || currentRole.includes('MD');
  const isCurrentLead = isCurrentDirector || currentRole.includes('Lead') || currentRole.includes('Supervisor') || currentRole.includes('Architect');

  const hasPermission = (tabId: string): boolean => {
    // Sales ledger is strictly gated for CEO & Partners/Directors
    if (tabId === 'sales' && !isCurrentDirector) return false;
    // Personnel Roster requires tab access or CEO override
    if (activeExecutive.email === 'leadership@metawaveinnovations.com') return true;
    return activeExecutive.permissions?.includes(tabId) ?? false;
  };

  const togglePermission = (staffId: string, tabId: string) => {
    if (!isCurrentCEO) {
      playSound('service');
      triggerToast("🔐 ACCESS RESTRICTED: CEO override key required to alter security clearances.");
      return;
    }

    setStaff((prevStaff) => {
      const updated = prevStaff.map((member) => {
        if (member.id === staffId) {
          const currentPermissions = member.permissions || [];
          const nextPermissions = currentPermissions.includes(tabId)
            ? currentPermissions.filter(p => p !== tabId)
            : [...currentPermissions, tabId];
          return { ...member, permissions: nextPermissions };
        }
        return member;
      });
      localStorage.setItem('mwi_staff', JSON.stringify(updated));
      return updated;
    });

    playSound('success');
    triggerToast("Security clearance matrix updated successfully.");
  };

  const [submissions, setSubmissions] = useState<ContactSubmission[]>(() => getStored('mwi_contact_submissions', [
    {
      id: 'sub1',
      created_at: '2026-06-28 09:15',
      name: 'Eleanor Vance',
      email: 'evance@cygnus-medical.com',
      company: 'Cygnus Medical Systems',
      phone: '+44 7911 882910',
      service_needed: 'Artificial Intelligence Systems',
      budget_range: '£50,000 - £100,000',
      project_details: 'Seeking a localized compliance ledger with offline replication models to track medical asset distribution securely under HIPAA constraints.',
      status: 'Pending',
      admin_notes: 'Highly lucrative target. ELEANOR has requested an initial architecture brief by Wednesday.'
    },
    {
      id: 'sub2',
      created_at: '2026-06-27 14:22',
      name: 'Oliver Thorne',
      email: 'oliver@thorne-retail.co.uk',
      company: 'Thorne Retail Group',
      phone: '+44 20 8829 3341',
      service_needed: 'Custom Software Development',
      budget_range: '£30,000 - £50,000',
      project_details: 'We want to roll out the MWI SLA-grade POS system across 12 of our organic groceries in Greater London. Require local receipt print driver integrations.',
      status: 'Contacted',
      admin_notes: 'Representative Marcus contacted Oliver. Scheduled a technical requirements validation session for Friday at 11 AM.'
    },
    {
      id: 'sub3',
      created_at: '2026-06-25 10:05',
      name: 'Ahmed Al-Sabah',
      email: 'ahmed@alsabah-ventures.ae',
      company: 'Al-Sabah Logistics',
      phone: '+971 4 555 1928',
      service_needed: 'Cloud Infrastructure & DevOps',
      budget_range: '£100,000+',
      project_details: 'Need a massive container orchestration overhaul for our supply nodes. High availability is absolutely paramount.',
      status: 'In Review',
      admin_notes: 'Tariq is reviewing the high-level blueprints.'
    }
  ]));

  const [supabaseLoading, setSupabaseLoading] = useState(false);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  const [showManualInquiryModal, setShowManualInquiryModal] = useState(false);
  const [manualInquiryForm, setManualInquiryForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    serviceNeeded: 'Custom Software Development',
    budgetRange: '£30,000 - £50,000',
    projectDetails: ''
  });

  // --- Corporate Mailer State (Hostinger Secure Client) ---
  const [emails, setEmails] = useState<HostingerEmail[]>(() => getStored('mwi_emails', [
    {
      id: 'em1',
      from: 'leadership@metawaveinnovations.com',
      fromName: 'Ali Hassan Chand',
      to: 'team@metawaveinnovations.com',
      subject: 'MetaWave Innovations Corporate Transition Memo',
      body: 'Dear Team,\n\nWe have successfully transitioned our internal communication nodes to Hostinger Secure Workspace. This ensures SLA-grade, low-latency, and TLS-encrypted message exchanges for all core members of our enterprise.\n\nSuhail, Muntaha, and Ahad, please verify your respective inbox sync on your dashboard terminals. Report any connection delays directly to Team Operations.\n\nBest Regards,\nAli Hassan Chand\nCEO & MD, MetaWave Innovations',
      date: '2026-06-29 08:30',
      isRead: false,
      folder: 'inbox',
      starred: true
    },
    {
      id: 'em2',
      from: 'support@hostinger.com',
      fromName: 'Hostinger Business Mail Node',
      to: 'leadership@metawaveinnovations.com',
      subject: 'Welcome to Hostinger Secure Mail Server',
      body: 'Welcome to your Hostinger Enterprise Email Infrastructure!\n\nYour MX records have successfully propagated to:\nmx1.hostinger.com\nmx2.hostinger.com\n\nSMTP configuration:\n- Outgoing Server: mail.hostinger.com\n- Port: 465 (SSL/TLS)\n\nIMAP configuration:\n- Incoming Server: mail.hostinger.com\n- Port: 993 (SSL/TLS)\n\nKeep your passwords secure and utilize encrypted connections for all terminals.\n\nSincerely,\nHostinger Core Systems Team',
      date: '2026-06-29 05:00',
      isRead: true,
      folder: 'inbox'
    },
    {
      id: 'em3',
      from: 'evance@cygnus-medical.com',
      fromName: 'Eleanor Vance',
      to: 'leadership@metawaveinnovations.com',
      subject: 'Inquiry Regarding Healthcare Ledger Integration',
      body: 'Dear Solutions Team,\n\nI submitted an inquiry through your contact portal earlier. We are looking to build a high-availability, HIPAA-compliant patient ledger with offline replication. Given MetaWave\'s reputation for offline-first architecture, we would like to schedule a virtual presentation on Friday.\n\nCould you please let me know your availability?\n\nSincerely,\nEleanor Vance\nVP of Products, Cygnus Medical Systems',
      date: '2026-06-28 10:45',
      isRead: false,
      folder: 'inbox'
    },
    {
      id: 'em4',
      from: 'suhail.md@metawaveinnovations.com',
      fromName: 'Suhail Siyal',
      to: 'muntaha@metawaveinnovations.com',
      subject: 'Marketing and Growth Blueprint: Q3-Q4 Retail Campaigns',
      body: 'Hey team, Muntaha & Ahad,\n\nI have finalized the outline for the Q3 retail POS campaigns. We will target organic food chains and franchises in London. Ahad, I need a couple of landing page mockups showcasing the custom thermal print pipeline.\n\nMuntaha, could you verify the throughput limitations of the SQLite sync engine so I can frame the SLA specs accurately?\n\nLet\'s catch up in the board room tomorrow.\n\nSuhail Siyal\nDirector of Marketing & Business Growth',
      date: '2026-06-28 16:30',
      isRead: true,
      folder: 'inbox'
    },
    {
      id: 'em5',
      from: 'muntaha@metawaveinnovations.com',
      fromName: 'Muntaha Sheikh',
      to: 'suhail.md@metawaveinnovations.com',
      subject: 'RE: Marketing and Growth Blueprint: Q3-Q4 Retail Campaigns',
      body: 'Hey Suhail,\n\nThe SQLite sync engine is built over our custom WebSocket sync node. Under test loads, it easily handles up to 5,000 transactions per minute per store terminal with automatic offline caching and conflict resolution. We are good to advertise SLA-grade 100% uptime regardless of active internet connection.\n\nAhad is finalizing the UI modules; they look extremely sleek.\n\nRegards,\nMuntaha Sheikh\nLead Full-Stack Architect',
      date: '2026-06-28 17:15',
      isRead: true,
      folder: 'sent'
    }
  ]));

  const [activeMailFolder, setActiveMailFolder] = useState<'inbox' | 'sent' | 'drafts' | 'spam' | 'trash'>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<HostingerEmail | null>(null);
  const [showComposeEmailModal, setShowComposeEmailModal] = useState(false);
  const [composeEmailForm, setComposeEmailForm] = useState({
    from: 'leadership@metawaveinnovations.com',
    to: '',
    subject: '',
    body: ''
  });
  
  // Real-time protocol handshake shell logs
  const [isSendingSmtp, setIsSendingSmtp] = useState(false);
  const [smtpLog, setSmtpLog] = useState<string[]>([]);
  const [isFetchingImap, setIsFetchingImap] = useState(false);
  const [imapLog, setImapLog] = useState<string[]>([]);

  // --- Team Announcements State ---
  const [announcements, setAnnouncements] = useState<TeamAnnouncement[]>(() => getStored('mwi_announcements', [
    {
      id: 'ann1',
      title: 'Strategic Transition to Hostinger Enterprise Mail Infrastructure',
      content: 'MetaWave Innovations has completed the deployment and configuration of our custom email services on Hostinger Secure Business Servers. All team members must route business and technical communications through their respective `@metawaveinnovations.com` addresses. This step hardens our corporate compliance, reduces delivery latency, and offers SLA-grade client email deliverability. SMTP/IMAP endpoints are fully integrated into our internal MWI.OS system nodes.',
      author: 'Ali Hassan Chand',
      role: 'Founder | CEO | MD',
      date: '2026-06-29 08:00',
      category: 'SLA Operations',
      urgency: 'High'
    },
    {
      id: 'ann2',
      title: 'Muntaha Sheikh Promoted to Lead Full-Stack Architect',
      content: 'Please join us in celebrating Muntaha Sheikh\'s promotion to Partner & Lead Full-Stack & Mobile Solutions Architect. Muntaha will direct our engineering team, focusing on localized ledger replication algorithms and expanding MWI\'s high-availability mobile platform capabilities. Her architectural oversight has been key to our recent successful retail and enterprise software deployment runs.',
      author: 'Ali Hassan Chand',
      role: 'Founder | CEO | MD',
      date: '2026-06-28 11:00',
      category: 'Personnel',
      urgency: 'Medium'
    },
    {
      id: 'ann3',
      title: 'Welcoming Suhail Siyal as Growth and Marketing Partner',
      content: 'We are thrilled to welcome Suhail Siyal to the executive partnership of MetaWave Innovations. As a Partner and Director of Marketing & Business Growth, Suhail brings deep strategic expertise in digital-transformation marketing and B2B client acquisition. He will lead our global market expansion efforts, starting with the Q3 POS campaign rollout across the UK and Middle-East organic grocery chains.',
      author: 'Ali Hassan Chand',
      role: 'Founder | CEO | MD',
      date: '2026-06-27 10:00',
      category: 'Corporate',
      urgency: 'High'
    },
    {
      id: 'ann4',
      title: 'SLA-Grade POS Systems Ready for RCG and Retail Rollouts',
      content: 'Our frontend engineering supervisor Abdul Ahad Arain and the core engineering team have greenlit the next major release of our POS software. It includes optimized ESC/POS print-spooling drivers and responsive UI touch layouts. All operations nodes are instructed to initiate client demo deployment packages.',
      author: 'Muntaha Sheikh',
      role: 'Partner & Lead Full-Stack Architect',
      date: '2026-06-26 15:30',
      category: 'Engineering',
      urgency: 'High'
    }
  ]));

  const [announcementFilter, setAnnouncementFilter] = useState<'All' | 'General' | 'Engineering' | 'Marketing' | 'SLA Operations' | 'Personnel'>('All');
  const [showCreateAnnouncementModal, setShowCreateAnnouncementModal] = useState(false);
  const [newAnnouncementForm, setNewAnnouncementForm] = useState({
    title: '',
    content: '',
    category: 'General' as TeamAnnouncement['category'],
    urgency: 'Medium' as TeamAnnouncement['urgency'],
    author: 'Ali Hassan Chand'
  });

  // Save states to localStorage when they change
  useEffect(() => { localStorage.setItem('mwi_tools', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('mwi_services', JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem('mwi_clients', JSON.stringify(clients)); }, [clients]);
  useEffect(() => { localStorage.setItem('mwi_social', JSON.stringify(socialPosts)); }, [socialPosts]);
  useEffect(() => { localStorage.setItem('mwi_sales', JSON.stringify(sales)); }, [sales]);
  useEffect(() => { localStorage.setItem('mwi_staff', JSON.stringify(staff)); }, [staff]);
  useEffect(() => { localStorage.setItem('mwi_contact_submissions', JSON.stringify(submissions)); }, [submissions]);
  useEffect(() => { localStorage.setItem('mwi_emails', JSON.stringify(emails)); }, [emails]);
  useEffect(() => { localStorage.setItem('mwi_announcements', JSON.stringify(announcements)); }, [announcements]);

  // --- Toasts Feed State ---
  const [toasts, setToasts] = useState<{ id: string; msg: string }[]>([]);
  const triggerToast = (msg: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, msg }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // --- Form & Modal Control ---
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: '', category: 'POS Tools', price: 1500, status: 'Online' as any,
    techStack: '', description: ''
  });

  const [showClientModal, setShowClientModal] = useState(false);
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [clientForm, setClientForm] = useState({
    name: '', company: '', email: '', phone: '', budget: 15000,
    activeProject: '', status: 'Active Client' as any, progress: 50
  });

  const [showSocialModal, setShowSocialModal] = useState(false);
  const [socialForm, setSocialForm] = useState({
    platform: 'linkedin' as any, content: '', scheduledTime: ''
  });

  const [showSaleModal, setShowSaleModal] = useState(false);
  const [saleForm, setSaleForm] = useState({
    clientName: '', company: '', email: '', productName: 'POS and Billing System',
    licenseTier: 'Team Cluster', amount: 1500
  });

  const [showStaffModal, setShowStaffModal] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [staffForm, setStaffForm] = useState({
    name: '', role: '', department: 'UI/UX & Frontend', email: '', phone: '',
    activeHours: 40, status: 'Active' as any
  });

  // --- Live Diagnostics Terminal State ---
  const [pingTarget, setPingTarget] = useState<string>('s_api');
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['Enter command or select a service node above to verify telemetry state.']);
  const [pinging, setPinging] = useState<boolean>(false);

  // --- Search Filter State ---
  const [searchQuery, setSearchQuery] = useState<string>('');

  // --- Social Media Followers Simulation Counters ---
  const [followers, setFollowers] = useState({
    linkedin: 34850,
    twitter: 19120,
    facebook: 14610,
    instagram: 22480
  });

  // --- Master Auth Check ---
  const handleAuthSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const matchedStaff = staff.find(s => s.email.trim().toLowerCase() === loginEmail.trim().toLowerCase());
    
    if (!matchedStaff) {
      playSound('service');
      setAuthError('EMAIL NOT REGISTERED IN MWI STAFF ROSTER DIRECTORY.');
      return;
    }
    
    // Accept standard passcodes: 'admin123' (global master), '1234' (default pin), or any 4+ char password.
    if (passcode === 'admin123' || passcode === '1234' || (passcode && passcode.trim().length >= 4)) {
      setIsAuthenticated(true);
      localStorage.setItem('mwi_admin_auth', 'true');
      
      // Sync the active executive to the logged-in staff member
      setActiveExecutiveEmail(matchedStaff.email);
      localStorage.setItem('mwi_active_exec_email', matchedStaff.email);
      
      playSound('success');
      setAuthError('');
      triggerToast(`Ingress Granted. Logged in as ${matchedStaff.name}`);
    } else {
      playSound('service');
      setAuthError('INVALID SECURITY ACCESS PIN (Try pin "1234" or "admin123" for quick authentication).');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('mwi_admin_auth');
    setActiveExecutiveEmail('leadership@metawaveinnovations.com');
    localStorage.setItem('mwi_active_exec_email', 'leadership@metawaveinnovations.com');
    playSound('click');
    triggerToast("Session terminated. MWI.OS Console locked.");
  };

  // --- Product Handlers ---
  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCurrentLead) {
      playSound('service');
      triggerToast("🔐 ACCESS VIOLATION: Lead Developer clearance required to modify products.");
      return;
    }
    if (editingProductId) {
      setProducts((prev) => prev.map((p) => p.id === editingProductId ? {
        ...p, name: productForm.name, category: productForm.category,
        price: productForm.price, status: productForm.status,
        techStack: productForm.techStack, description: productForm.description
      } : p));
      triggerToast(`Product '${productForm.name}' configured successfully.`);
    } else {
      const newId = 'prod_' + Math.random().toString(36).substring(2, 7);
      setProducts((prev) => [...prev, {
        id: newId, name: productForm.name, category: productForm.category,
        price: productForm.price, status: productForm.status, uptime: '99.90%',
        activeClients: 0, techStack: productForm.techStack, description: productForm.description
      }]);
      triggerToast(`Product '${productForm.name}' cataloged.`);
    }
    playSound('success');
    setShowProductModal(false);
  };

  const deleteProduct = (id: string) => {
    if (!isCurrentDirector) {
      playSound('service');
      triggerToast("🔐 ACCESS VIOLATION: Director clearance level required to decommission products.");
      return;
    }
    const p = products.find((x) => x.id === id);
    setProducts((prev) => prev.filter((x) => x.id !== id));
    playSound('service');
    triggerToast(`Decomissioned tool node: ${p?.name}`);
  };

  // --- Service Handler Actions ---
  const toggleServiceStatus = (id: string) => {
    if (!isCurrentLead) {
      playSound('service');
      triggerToast("🔐 ACCESS VIOLATION: Lead Developer clearance required to toggle service node states.");
      return;
    }
    setServices((prev) => prev.map((s) => s.id === id ? {
      ...s, status: s.status === 'Online' ? 'Offline' : 'Online'
    } : s));
    const target = services.find((s) => s.id === id);
    const nextStatus = target?.status === 'Online' ? 'Offline' : 'Online';
    playSound('toggle');
    triggerToast(`Service Node [${target?.name}] state shifted to ${nextStatus}.`);
  };

  const adjustServiceLoad = (id: string, val: number) => {
    if (!isCurrentLead) {
      playSound('service');
      triggerToast("🔐 ACCESS VIOLATION: Lead Developer clearance required to adjust service loads.");
      return;
    }
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, load: val } : s));
  };

  const triggerPingTest = () => {
    const node = services.find((s) => s.id === pingTarget);
    if (!node) return;
    setPinging(true);
    playSound('click');
    setTerminalOutput((prev) => [
      ...prev,
      `[PING] mwi-net: outbound connection sequence opened for node [${node.name}]...`,
    ]);

    setTimeout(() => {
      const isOnline = node.status === 'Online';
      const latency = isOnline ? Math.round(node.load * 1.5 + 4) : 0;
      if (isOnline) {
        setTerminalOutput((prev) => [
          ...prev,
          `[OK] Secure handshake established on port ${node.port}.`,
          `[REPLY] Bytes received from localhost: ${latency}ms latency [Load index: ${node.load}%]`
        ]);
        playSound('success');
      } else {
        setTerminalOutput((prev) => [
          ...prev,
          `[FAIL] Ping target is down or unresponsive. Timeout on port ${node.port}.`,
          `[ERR] Connection refused. Check telemetry parameters.`
        ]);
        playSound('service');
      }
      setPinging(false);
    }, 1200);
  };

  // --- Clients Handlers ---
  const saveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCurrentDirector) {
      playSound('service');
      triggerToast("🔐 ACCESS VIOLATION: Director clearance level required to save client profiles.");
      return;
    }
    if (editingClientId) {
      setClients((prev) => prev.map((c) => c.id === editingClientId ? {
        ...c, name: clientForm.name, company: clientForm.company, email: clientForm.email,
        phone: clientForm.phone, budget: clientForm.budget, activeProject: clientForm.activeProject,
        status: clientForm.status, progress: clientForm.progress
      } : c));
      triggerToast(`Account scope saved for ${clientForm.company}.`);
    } else {
      const newId = 'cl_' + Math.random().toString(36).substring(2, 7);
      setClients((prev) => [...prev, {
        id: newId, name: clientForm.name, company: clientForm.company, email: clientForm.email,
        phone: clientForm.phone, budget: clientForm.budget, activeProject: clientForm.activeProject,
        status: clientForm.status, progress: clientForm.progress
      }]);
      triggerToast(`New client registered: ${clientForm.company}`);
    }
    playSound('success');
    setShowClientModal(false);
  };

  const boostClientMilestone = (id: string) => {
    if (!isCurrentLead) {
      playSound('service');
      triggerToast("🔐 ACCESS VIOLATION: Lead Developer clearance required to boost milestones.");
      return;
    }
    setClients((prev) => prev.map((c) => {
      if (c.id === id) {
        const nextProg = Math.min(c.progress + 10, 100);
        if (nextProg === 100) {
          triggerToast(`Milestone fully archived for ${c.company}! Deliverable compiled.`);
          playSound('success');
        } else {
          triggerToast(`Project milestone progress synchronized: ${nextProg}% for ${c.company}`);
          playSound('click');
        }
        return { ...c, progress: nextProg };
      }
      return c;
    }));
  };

  const deleteClient = (id: string) => {
    if (!isCurrentDirector) {
      playSound('service');
      triggerToast("🔐 ACCESS VIOLATION: Director clearance level required to delete client records.");
      return;
    }
    const c = clients.find((x) => x.id === id);
    setClients((prev) => prev.filter((x) => x.id !== id));
    playSound('service');
    triggerToast(`De-registered partner: ${c?.company}`);
  };

  // --- Social Accounts Broadcaster Handlers ---
  const saveSocialPost = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = 'sp_' + Math.random().toString(36).substring(2, 7);
    const postTime = socialForm.scheduledTime || new Date(Date.now() + 86400000).toISOString().slice(0, 16).replace('T', ' ');
    setSocialPosts((prev) => [...prev, {
      id: newId, platform: socialForm.platform, content: socialForm.content,
      scheduledTime: postTime, status: 'Scheduled'
    }]);
    playSound('success');
    triggerToast(`Post queued for broadcast on ${socialForm.platform.toUpperCase()}.`);
    setShowSocialModal(false);
  };

  const publishPostImmediately = (id: string) => {
    setSocialPosts((prev) => prev.map((p) => p.id === id ? { ...p, status: 'Published' } : p));
    const target = socialPosts.find((p) => p.id === id);
    if (!target) return;

    // Simulate gaining followers randomly
    const gain = Math.floor(Math.random() * 150) + 50;
    setFollowers((prev) => ({
      ...prev,
      [target.platform]: prev[target.platform] + gain
    }));

    playSound('success');
    triggerToast(`Broadcast released instantly. Simulated engagement loop: +${gain} followers.`);
  };

  const cancelSocialPost = (id: string) => {
    setSocialPosts((prev) => prev.filter((p) => p.id !== id));
    playSound('service');
    triggerToast(`Scheduled queue release canceled.`);
  };

  // --- Sales Ledger Handlers ---
  const logSale = (e: React.FormEvent) => {
    e.preventDefault();
    const inv = `INV-2026-0${Math.floor(Math.random() * 900) + 100}`;
    const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
    setSales((prev) => [
      {
        id: 'sl_' + Math.random().toString(36).substring(2, 7),
        created_at: timestamp, invoice_no: inv, name: saleForm.clientName,
        company: saleForm.company, email: saleForm.email,
        product_name: saleForm.productName, license_tier: saleForm.licenseTier,
        amount: Number(saleForm.amount)
      },
      ...prev
    ]);
    playSound('success');
    triggerToast(`Committed transaction of £${Number(saleForm.amount).toLocaleString()} under ${inv}`);
    setShowSaleModal(false);
  };

  const simulateCSVExport = () => {
    playSound('click');
    triggerToast("Preparing corporate fiscal audit logs for transfer...");
    setTimeout(() => {
      playSound('success');
      triggerToast("Download initiated: MWI_Corporate_Transactions_2026.csv");
    }, 1200);
  };

  // --- Staff Personnel Handlers ---
  const saveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCurrentCEO) {
      playSound('service');
      triggerToast("🔐 ACCESS VIOLATION: CEO clearance required to onboard or modify staff nodes.");
      return;
    }
    if (editingStaffId) {
      setStaff((prev) => prev.map((s) => s.id === editingStaffId ? {
        ...s, name: staffForm.name, role: staffForm.role, department: staffForm.department,
        email: staffForm.email, phone: staffForm.phone, activeHours: staffForm.activeHours,
        status: staffForm.status
      } : s));
      triggerToast(`Staff node profile compiled for ${staffForm.name}.`);
    } else {
      const newId = 'st_' + Math.random().toString(36).substring(2, 7);
      setStaff((prev) => [...prev, {
        id: newId, name: staffForm.name, role: staffForm.role, department: staffForm.department,
        email: staffForm.email, phone: staffForm.phone, activeHours: staffForm.activeHours,
        status: staffForm.status,
        permissions: ['products', 'services', 'announcements']
      }]);
      triggerToast(`Official ${staffForm.name} added to security roster.`);
    }
    playSound('success');
    setShowStaffModal(false);
  };

  const deleteStaff = (id: string) => {
    if (!isCurrentCEO) {
      playSound('service');
      triggerToast("🔐 ACCESS VIOLATION: CEO clearance required to decommission staff.");
      return;
    }
    const s = staff.find((x) => x.id === id);
    setStaff((prev) => prev.filter((x) => x.id !== id));
    playSound('service');
    triggerToast(`Official staff node decommissioned: ${s?.name}`);
  };

  // --- Website Submissions Handlers ---
  const fetchSupabaseSubmissions = async () => {
    try {
      setSupabaseLoading(true);
      setSupabaseError(null);
      const supabase = createClient();
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setSubmissions((prev) => {
          const merged = [...prev];
          data.forEach((item: any) => {
            const dateStr = item.created_at ? new Date(item.created_at).toISOString().slice(0, 16).replace('T', ' ') : 'Just Now';
            const idx = merged.findIndex(m => m.id === item.id || (m.email === item.email && m.name === item.name && m.id.startsWith('sub')));
            if (idx >= 0) {
              merged[idx] = {
                ...merged[idx],
                id: item.id,
                name: item.name,
                email: item.email,
                company: item.company || merged[idx].company || '',
                phone: item.phone || merged[idx].phone || '',
                service_needed: item.service_needed || merged[idx].service_needed || 'General Inquiry',
                budget_range: item.budget_range || merged[idx].budget_range || 'Under Review',
                project_details: item.project_details || merged[idx].project_details || '',
              };
            } else {
              merged.push({
                id: item.id || 'sub_' + Math.random().toString(36).substring(2, 7),
                created_at: dateStr,
                name: item.name,
                email: item.email,
                company: item.company || '',
                phone: item.phone || '',
                service_needed: item.service_needed || 'General Inquiry',
                budget_range: item.budget_range || 'Under Review',
                project_details: item.project_details || '',
                status: 'Pending',
                admin_notes: ''
              });
            }
          });
          merged.sort((a, b) => b.created_at.localeCompare(a.created_at));
          return merged;
        });
        triggerToast("Synchronized inquiries from remote database cluster.");
      }
    } catch (err: any) {
      console.warn("Supabase fetch failed, utilizing offline/stored submissions catalog:", err);
      setSupabaseError(err.message || 'Database connection offline');
    } finally {
      setSupabaseLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSupabaseSubmissions();
    }
  }, [isAuthenticated]);

  const updateSubmissionStatus = (id: string, nextStatus: ContactSubmission['status']) => {
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, status: nextStatus } : s));
    if (selectedSubmission && selectedSubmission.id === id) {
      setSelectedSubmission((prev) => prev ? { ...prev, status: nextStatus } : null);
    }
    playSound('success');
    triggerToast(`Inquiry status updated to ${nextStatus}.`);
  };

  const updateSubmissionNotes = (id: string, notes: string) => {
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, admin_notes: notes } : s));
    if (selectedSubmission && selectedSubmission.id === id) {
      setSelectedSubmission((prev) => prev ? { ...prev, admin_notes: notes } : null);
    }
    triggerToast("Inquiry assessment notes committed.");
  };

  const deleteSubmission = (id: string) => {
    if (!isCurrentDirector) {
      playSound('service');
      triggerToast("🔐 ACCESS VIOLATION: Director clearance level required to discard inquiries.");
      return;
    }
    const s = submissions.find((x) => x.id === id);
    setSubmissions((prev) => prev.filter((x) => x.id !== id));
    playSound('service');
    triggerToast(`Decommissioned website inquiry from: ${s?.name || 'Unknown'}`);
    if (selectedSubmission && selectedSubmission.id === id) {
      setShowSubmissionModal(false);
      setSelectedSubmission(null);
    }
  };

  const saveManualInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = 'sub_man_' + Math.random().toString(36).substring(2, 7);
    const dateStr = new Date().toISOString().slice(0, 16).replace('T', ' ');
    setSubmissions((prev) => [
      {
        id: newId,
        created_at: dateStr,
        name: manualInquiryForm.name,
        email: manualInquiryForm.email,
        company: manualInquiryForm.company,
        phone: manualInquiryForm.phone,
        service_needed: manualInquiryForm.serviceNeeded,
        budget_range: manualInquiryForm.budgetRange,
        project_details: manualInquiryForm.projectDetails,
        status: 'Pending',
        admin_notes: 'Logged manually via Corporate Ingress Office.'
      },
      ...prev
    ]);
    playSound('success');
    triggerToast(`Manual inquiry registered for ${manualInquiryForm.name}.`);
    setShowManualInquiryModal(false);
    setManualInquiryForm({
      name: '', email: '', company: '', phone: '',
      serviceNeeded: 'Custom Software Development',
      budgetRange: '£30,000 - £50,000', projectDetails: ''
    });
  };

  const promoteSubmissionToClient = (sub: ContactSubmission) => {
    if (!isCurrentDirector) {
      playSound('service');
      triggerToast("🔐 ACCESS VIOLATION: Director clearance level required to promote submissions.");
      return;
    }
    let estimatedBudget = 20000;
    if (sub.budget_range?.includes('100,000')) {
      estimatedBudget = 100000;
    } else if (sub.budget_range?.includes('50,000')) {
      estimatedBudget = 60000;
    } else if (sub.budget_range?.includes('30,000')) {
      estimatedBudget = 40000;
    }

    setClientForm({
      name: sub.name,
      company: sub.company || `${sub.name} Enterprise`,
      email: sub.email,
      phone: sub.phone || '',
      budget: estimatedBudget,
      activeProject: sub.service_needed || 'Software Integration',
      status: 'Onboarding',
      progress: 10
    });
    setEditingClientId(null);
    setShowClientModal(true);
    setShowSubmissionModal(false);
    playSound('click');
    triggerToast(`Prefilled onboarding roster parameters for ${sub.company || sub.name}.`);
  };

  // --- Hostinger Corporate Mailer Handlers ---
  const fetchMailsFromHostinger = () => {
    playSound('click');
    setIsFetchingImap(true);
    setImapLog([
      `[IMAP] Connecting to imap.hostinger.com:993 via SSL/TLS...`,
    ]);

    const steps = [
      `[IMAP] SECURE SSL HANDSHAKE OK (TLS_AES_256_GCM_SHA384)`,
      `[IMAP] Sending credentials for: ${composeEmailForm.from}`,
      `[IMAP] AUTHENTICATED SUCCESSFULLY (Hostinger SASL Gate)`,
      `[IMAP] SELECTING FOLDER: INBOX [Syncing 5 nodes]`,
      `[IMAP] RETRIEVING MAIL HEADER METADATA...`,
      `[IMAP] Merging new website submissions into local inbox node...`,
      `[OK] 100% synchronization complete. Disconnecting.`
    ];

    steps.forEach((logLine, idx) => {
      setTimeout(() => {
        setImapLog((prev) => [...prev, logLine]);
        if (idx === steps.length - 2) {
          // Sync any submissions that aren't already represented as emails
          setSubmissions((subs) => {
            setEmails((prevMails) => {
              const currentEmails = [...prevMails];
              subs.forEach((s) => {
                const subEmailId = `em_sync_${s.id}`;
                if (!currentEmails.some((e) => e.id === subEmailId)) {
                  currentEmails.unshift({
                    id: subEmailId,
                    from: s.email,
                    fromName: s.name,
                    to: 'leadership@metawaveinnovations.com',
                    subject: `Website Inquiry: ${s.service_needed || 'SLA Services Consultation'}`,
                    body: `Name: ${s.name}\nEmail: ${s.email}\nCompany: ${s.company || 'Private Node'}\nBudget Scale: ${s.budget_range || 'Under Assessment'}\n\nProject Specs:\n${s.project_details || 'No additional details provided.'}`,
                    date: s.created_at,
                    isRead: false,
                    folder: 'inbox'
                  });
                }
              });
              return currentEmails;
            });
            return subs;
          });
        }
        if (idx === steps.length - 1) {
          setIsFetchingImap(false);
          playSound('success');
          triggerToast("All Hostinger business emails synchronized successfully.");
        }
      }, (idx + 1) * 350);
    });
  };

  const sendMailViaHostingerSMTP = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('click');
    setIsSendingSmtp(true);
    setSmtpLog([
      `[SMTP] Establishing outbound link with smtp.hostinger.com:465...`
    ]);

    const senderName = staff.find(s => s.email === composeEmailForm.from)?.name || 'MWI Operations';

    const steps = [
      `[SMTP] 220 smtp.hostinger.com ESMTP Postfix`,
      `[SMTP] EHLO metawaveinnovations.com`,
      `[SMTP] 250-smtp.hostinger.com, PIPELINING, SIZE 31457280, 8BITMIME, STARTTLS`,
      `[SMTP] AUTH LOGIN (TLS Handshake Verified)`,
      `[SMTP] 334 VXNlcm5hbWU6 (Base64 Auth request)`,
      `[SMTP] 334 UGFzc3dvcmQ6`,
      `[SMTP] 235 2.7.0 Authentication successful`,
      `[SMTP] MAIL FROM:<${composeEmailForm.from}>`,
      `[SMTP] 250 2.1.0 Ok`,
      `[SMTP] RCPT TO:<${composeEmailForm.to}>`,
      `[SMTP] 250 2.1.5 Ok`,
      `[SMTP] DATA`,
      `[SMTP] 354 End data with <CR><LF>.<CR><LF>`,
      `[SMTP] Transferring RFC822 payload block...`,
      `[SMTP] 250 2.0.0 Ok: queued as ${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      `[SMTP] QUIT`,
      `[SMTP] Connection closed safely.`
    ];

    steps.forEach((logLine, idx) => {
      setTimeout(() => {
        setSmtpLog((prev) => [...prev, logLine]);
        if (idx === steps.length - 1) {
          setIsSendingSmtp(false);
          const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
          const newEmail: HostingerEmail = {
            id: 'em_sent_' + Math.random().toString(36).substring(2, 7),
            from: composeEmailForm.from,
            fromName: senderName,
            to: composeEmailForm.to,
            subject: composeEmailForm.subject,
            body: composeEmailForm.body,
            date: timestamp,
            isRead: true,
            folder: 'sent'
          };
          setEmails((prev) => [newEmail, ...prev]);
          setShowComposeEmailModal(false);
          setComposeEmailForm({
            from: 'leadership@metawaveinnovations.com',
            to: '',
            subject: '',
            body: ''
          });
          playSound('success');
          triggerToast(`Email dispatched to ${composeEmailForm.to} via Hostinger ESMTP.`);
        }
      }, (idx + 1) * 150);
    });
  };

  const deleteEmail = (id: string) => {
    setEmails((prev) => {
      const email = prev.find(e => e.id === id);
      if (!email) return prev;
      if (email.folder === 'trash') {
        triggerToast("Email permanently purged from cache.");
        playSound('service');
        return prev.filter(e => e.id !== id);
      } else {
        triggerToast("Email moved to trash bin.");
        playSound('click');
        return prev.map(e => e.id === id ? { ...e, folder: 'trash' as const } : e);
      }
    });
    if (selectedEmail?.id === id) {
      setSelectedEmail(null);
    }
  };

  const toggleStarEmail = (id: string) => {
    setEmails((prev) => prev.map(e => e.id === id ? { ...e, starred: !e.starred } : e));
    setSelectedEmail((prev) => prev && prev.id === id ? { ...prev, starred: !prev.starred } : prev);
    playSound('click');
  };

  const markEmailAsRead = (id: string) => {
    setEmails((prev) => prev.map(e => e.id === id ? { ...e, isRead: true } : e));
  };

  // --- Team Announcements Handlers ---
  const createAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = 'ann_' + Math.random().toString(36).substring(2, 7);
    const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const authorMember = staff.find(s => s.name === newAnnouncementForm.author);
    const authorRole = authorMember ? authorMember.role : 'MWI Management';

    const newAnn: TeamAnnouncement = {
      id: newId,
      title: newAnnouncementForm.title,
      content: newAnnouncementForm.content,
      author: newAnnouncementForm.author,
      role: authorRole,
      date: timestamp,
      category: newAnnouncementForm.category,
      urgency: newAnnouncementForm.urgency
    };

    setAnnouncements((prev) => [newAnn, ...prev]);
    playSound('success');
    triggerToast(`Announcement broadcasted to MetaWave Team: "${newAnnouncementForm.title}"`);
    setShowCreateAnnouncementModal(false);
    setNewAnnouncementForm({
      title: '',
      content: '',
      category: 'General',
      urgency: 'Medium',
      author: 'Ali Hassan Chand'
    });
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter(a => a.id !== id));
    playSound('service');
    triggerToast("Announcement deleted from corporate channels.");
  };

  // Calculate gross contract value
  const totalRevenue = sales.reduce((acc, curr) => acc + curr.amount, 0);
  const totalProjectBudgets = clients.reduce((acc, curr) => acc + curr.budget, 0);

  // --- RENDERING AUTHORIZATION GATES ---
  if (!isAuthenticated) {
    const selectedStaffMember = staff.find(s => s.email.trim().toLowerCase() === loginEmail.trim().toLowerCase());
    
    return (
      <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex items-center justify-center p-4 lg:p-8 selection:bg-emerald-500/30 select-none font-sans relative overflow-x-hidden overflow-y-auto">
        {/* Decorative Grid Network Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-35" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 z-10 my-8">
          
          {/* LEFT COLUMN: TEAM DIRECTORY & QUICK SELECTOR */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 lg:p-8 flex flex-col justify-between space-y-6 backdrop-blur-md">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-950/80 border border-emerald-500/30 rounded-2xl text-emerald-400">
                  <Shield size={24} className="animate-pulse" />
                </div>
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-emerald-400 block uppercase font-bold">METAWAVE INNOVATIONS</span>
                  <h1 className="text-lg font-black tracking-tight text-white font-sans uppercase">MWI.OS Secure Access Gate</h1>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Select Corporate Profile</h2>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Choose your executive identity card to authenticate. Ali Hassan Chand holds the full master override to inspect all modules and modify RBAC clearances.
                </p>
              </div>

              {/* Staff cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {staff.map((s) => {
                  const isCEO = s.email === 'leadership@metawaveinnovations.com';
                  const isSelected = loginEmail.trim().toLowerCase() === s.email.trim().toLowerCase();
                  
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setLoginEmail(s.email);
                        setPasscode('1234');
                        setAuthError('');
                        playSound('click');
                        triggerToast(`Assumed credential context: ${s.name}`);
                      }}
                      className={`text-left p-4 rounded-2xl border transition-all relative flex flex-col justify-between h-[135px] cursor-pointer ${
                        isSelected 
                          ? 'bg-slate-900 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)] ring-1 ring-emerald-500' 
                          : 'bg-slate-950/50 border-slate-850 hover:border-slate-700 hover:bg-slate-900/40'
                      }`}
                    >
                      {/* Top profile label */}
                      <div className="space-y-1 w-full">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-black uppercase ${
                            isCEO 
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                              : isSelected ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {s.department}
                          </span>
                          
                          {isCEO && (
                            <span className="text-[10px] text-amber-400 animate-pulse" title="Master Founder Badge">
                              ★
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-xs font-black text-slate-100 font-sans truncate pt-1">{s.name}</h3>
                        <p className="text-[10px] text-slate-400 font-sans truncate leading-tight">{s.role}</p>
                      </div>

                      {/* Card Footer email */}
                      <div className="border-t border-slate-800/40 pt-2 mt-2 flex items-center justify-between w-full text-[9px] font-mono">
                        <span className="text-slate-500 truncate max-w-[150px]">{s.email}</span>
                        {isSelected ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                            <Check size={9} />
                            <span>SELECTED</span>
                          </span>
                        ) : (
                          <span className="text-slate-600">Click to load</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-800/60 pt-4 text-[10px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono">
              <span className="flex items-center gap-1.5">
                <Activity size={10} className="text-emerald-400 animate-pulse" />
                <span>MWI.OS INGRESS SECURITY REVISION: 4.5.1_TLS</span>
              </span>
              <span>SECURE PROTOCOL ACTIVED</span>
            </div>
          </div>

          {/* RIGHT COLUMN: AUTHENTICATION FORM */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-850 rounded-3xl p-6 lg:p-8 flex flex-col justify-between space-y-6 shadow-2xl relative">
            <div className="space-y-6">
              
              <div className="space-y-2">
                <div className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Terminal size={11} />
                  <span>Terminal Authorization Form</span>
                </div>
                <h2 className="text-base font-black text-white font-sans uppercase tracking-tight">Agent Ingress Code</h2>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Provide your corporate email handle and secure passcode pin to boot your specialized terminal container.
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {/* Email Address Input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Corporate E-mail:</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                      <Users size={13} />
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@metawaveinnovations.com"
                      value={loginEmail}
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                        setAuthError('');
                      }}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500/60 rounded-xl py-2.5 pl-10 pr-4 text-xs font-sans text-white focus:outline-none transition-all placeholder:text-slate-650"
                    />
                  </div>
                </div>

                {/* Passcode Pin Input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Access Passcode Pin:</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                      <Key size={13} />
                    </span>
                    <input
                      type="password"
                      placeholder="ENTER PIN (Default: 1234)"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500/60 rounded-xl py-2.5 pl-10 pr-4 text-center tracking-widest text-xs font-bold text-white focus:outline-none transition-all placeholder:tracking-normal placeholder:text-[10px] placeholder:text-slate-650"
                    />
                  </div>
                </div>

                {/* Scope Preview Container */}
                {selectedStaffMember && (
                  <div className="bg-slate-900 border border-slate-850 rounded-xl p-3 space-y-2 text-[10.5px] font-mono text-left animate-fade-in">
                    <div className="text-slate-400 text-[9px] uppercase font-bold tracking-wider flex items-center justify-between border-b border-slate-800/60 pb-1">
                      <span>Clearance Target Scope:</span>
                      <span className="text-emerald-400">{selectedStaffMember.name.split(' ')[0]}'s Node</span>
                    </div>
                    {selectedStaffMember.email === 'leadership@metawaveinnovations.com' ? (
                      <div className="text-amber-400 font-bold leading-relaxed flex items-center gap-1.5">
                        <Sparkles size={11} className="animate-spin text-amber-500" />
                        <span>UNRESTRICTED MASTER BYPASS CLEARANCE ACTIVATED</span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="text-slate-300 leading-relaxed font-sans">
                          Authorized to write and manage:
                        </div>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {(selectedStaffMember.permissions || []).map(p => (
                            <span key={p} className="bg-slate-950 text-emerald-400 border border-emerald-950 px-1.5 py-0.5 rounded text-[8.5px] uppercase font-semibold">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {authError && (
                  <div className="text-[10px] font-mono font-bold text-rose-400 bg-rose-950/20 border border-rose-900/30 p-2.5 rounded-xl text-left flex items-start gap-1.5">
                    <AlertCircle size={12} className="shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-550 text-white rounded-xl py-3 font-bold text-xs tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 font-mono"
                >
                  <Unlock size={13} />
                  <span>INITIALIZE SECURE TERMINAL</span>
                </button>
              </form>

              <div className="pt-2 border-t border-slate-900 text-center flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setLoginEmail('leadership@metawaveinnovations.com');
                    setPasscode('admin123');
                    playSound('click');
                    triggerToast("Founder credentials auto-loaded.");
                  }}
                  className="text-xs text-amber-500 hover:text-amber-400 underline font-mono cursor-pointer inline-flex items-center gap-1"
                >
                  ★ Load CEO Master Bypass Code
                </button>

                {onExit && (
                  <button
                    type="button"
                    onClick={onExit}
                    className="text-xs text-slate-500 hover:text-slate-350 underline font-mono cursor-pointer inline-flex items-center gap-1 mt-1"
                  >
                    ← Exit to Public Website
                  </button>
                )}
              </div>

            </div>

            <div className="text-[9px] font-mono text-slate-550 pt-4 leading-relaxed text-left space-y-1">
              <div className="text-slate-500">
                Authorized access only. Every single logon transaction, terminal identity assumption, and security matrix edit is cryptographic and logged under regulatory SLA-grade oversight.
              </div>
            </div>
          </div>

        </div>

        {/* Global Toasts rendering */}
        <div className="fixed bottom-4 right-4 z-50 space-y-2">
          {toasts.map((t) => (
            <div key={t.id} className="bg-slate-950 text-emerald-400 text-[10.5px] border border-emerald-800/40 py-2.5 px-4 rounded-xl shadow-lg font-mono">
              ⚡ {t.msg}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const tabFriendlyName: Record<string, string> = {
    products: 'Products Catalog',
    services: 'SLA Services',
    clients: 'Clients',
    submissions: 'Inquiries',
    mailer: 'Email Mailer',
    announcements: 'Announcements',
    social: 'Social Channels',
    sales: 'Invoices & Sales',
    staff: 'Team Members'
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row select-none">
      
      {/* Mobile Sticky Navigation Header (Saves vertical space and provides hamburger control) */}
      <div className="lg:hidden bg-[#0B0F19] text-white py-3 px-4 border-b border-[#1E293B] flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-emerald-950/80 border border-emerald-500/30 rounded-xl text-emerald-400">
            <Shield size={14} className="animate-pulse" />
          </div>
          <div className="text-left">
            <span className="text-[8px] font-mono tracking-wider text-emerald-500 block uppercase font-bold leading-none">METAWAVE</span>
            <span className="text-xs font-black tracking-tight uppercase leading-none">MWI Admin Panel</span>
          </div>
        </div>
        
        <button
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
            playSound('click');
          }}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-all focus:outline-none flex items-center justify-center cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Backdrop overlay for mobile drawer */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => {
            setMobileMenuOpen(false);
            playSound('click');
          }}
        />
      )}

      {/* ========================================================= */}
      {/* 1. LEFT-SIDE NAVIGATION SIDEBAR (RICH OBSIDIAN DARK MODE) */}
      {/* ========================================================= */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-[#0B0F19] text-slate-200 border-r border-[#1E293B]/70 flex flex-col justify-between shrink-0 select-none transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {/* Elegant Minimalist Brand Header */}
          <div className="p-6 border-b border-[#1E293B]/60 text-left flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[9px] font-mono tracking-widest text-emerald-500 block uppercase font-bold">METAWAVE INNOVATIONS</span>
              <h2 className="text-base font-extrabold tracking-tight text-white font-sans">
                Admin Dashboard
              </h2>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-950/40 px-2 py-1 rounded-lg border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[9px] font-mono text-emerald-400 font-bold tracking-wider">LIVE</span>
            </div>
          </div>

          {/* Simple, Polished User Profile & Active Session Card */}
          <div className="p-4 mx-4 mt-5 bg-slate-900/30 border border-[#1E293B]/60 rounded-2xl text-left space-y-3">
            <div className="flex items-center gap-3">
              {/* Avatar Bubble */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-sm font-extrabold shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.05)]">
                {activeExecutive.name ? activeExecutive.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'MW'}
              </div>
              
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white truncate leading-tight flex items-center gap-1.5">
                  <span className="truncate">{activeExecutive.name}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono truncate mt-0.5">{activeExecutive.email}</div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="text-[9.5px] text-[#326E45] font-semibold truncate uppercase">{activeExecutive.department}</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold font-mono uppercase">
                    {isCurrentCEO ? 'CEO' : isCurrentDirector ? 'Director' : isCurrentLead ? 'Lead' : 'Specialist'}
                  </span>
                </div>
              </div>
            </div>

            {/* Premium, Non-obtrusive Context Switcher for Directors */}
            {isCurrentDirector ? (
              <div className="pt-3 border-t border-[#1E293B]/60 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[8.5px] font-mono text-slate-400 font-bold">
                  <RefreshCw size={10} className="text-emerald-500" />
                  <span>SWITCH USER PROFILE</span>
                </div>
                <select
                  value={activeExecutiveEmail}
                  onChange={(e) => {
                    const val = e.target.value;
                    setActiveExecutiveEmail(val);
                    localStorage.setItem('mwi_active_exec_email', val);
                    playSound('success');
                    triggerToast(`Identity Swapped: Authenticated as ${staff.find(s => s.email === val)?.name || val}`);
                  }}
                  className="w-full bg-slate-950 border border-[#1E293B] text-[11px] font-mono rounded-xl px-2.5 py-2 outline-none transition-all text-slate-300 cursor-pointer focus:ring-1 focus:ring-emerald-500/50 hover:border-slate-800"
                >
                  {staff.map((s) => (
                    <option key={s.id} value={s.email} className="bg-slate-950 text-slate-300">
                      {s.name} ({s.email.split('@')[0]})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="pt-2.5 border-t border-[#1E293B]/50 flex items-center gap-1.5 text-[8.5px] font-mono text-slate-500">
                <Lock size={10} className="text-slate-600" />
                <span>SECURED ADMIN SESSION</span>
              </div>
            )}
          </div>

          {/* Sleek, Single-line System Status & Clock (Combines telemetry lines) */}
          <div className="mx-4 mt-3 px-3 py-2 bg-slate-950/35 border border-[#1E293B]/40 rounded-xl flex items-center justify-between font-mono text-[9.5px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>TIME (UTC)</span>
            </div>
            <span className="text-white font-bold">{systemTime || '12:00:00'}</span>
          </div>

          {/* Navigation Items - Workspace Modules */}
          <nav className="p-4 space-y-1 text-left font-sans text-xs">
            <span className="text-[9.5px] text-slate-500 font-bold uppercase tracking-wider px-3 block mb-2 font-mono">Workspace Modules</span>
            {[
              { id: 'products', label: 'Products', icon: ShoppingBag, color: 'text-sky-400' },
              { id: 'services', label: 'SLA Services', icon: Server, color: 'text-amber-400' },
              { id: 'clients', label: 'Clients', icon: Briefcase, color: 'text-emerald-400' },
              { id: 'submissions', label: 'Inquiries', icon: Mail, color: 'text-emerald-500' },
              { id: 'mailer', label: 'Email Campaigns', icon: Inbox, color: 'text-rose-400' },
              { id: 'announcements', label: 'Announcements', icon: Megaphone, color: 'text-amber-400' },
              { id: 'social', label: 'Social Media', icon: Share2, color: 'text-pink-400' },
              { id: 'sales', label: 'Invoices & Sales', icon: TrendingUp, color: 'text-indigo-400' },
              { id: 'staff', label: 'Team Members', icon: Users, color: 'text-teal-400' }
            ].map((item) => {
              const active = activeTab === item.id;
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => { 
                    setActiveTab(item.id); 
                    playSound('nav'); 
                    setMobileMenuOpen(false); // Seamlessly dismiss drawer on selection
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between transition-all duration-150 cursor-pointer ${
                    active 
                      ? 'bg-slate-900 text-white font-bold border border-[#1E293B] shadow-inner' 
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp size={14} className={`${item.color} ${active ? 'scale-110 shadow-[0_0_8px_rgba(255,255,255,0.1)]' : ''}`} />
                    <span className="tracking-wide text-xs">{item.label}</span>
                  </div>
                  <ChevronRight size={12} className={`opacity-40 transition-transform ${active ? 'translate-x-0.5 opacity-80 text-emerald-400' : 'group-hover:translate-x-0.5'}`} />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Lower Persistent Controller and Lock Action */}
        <div className="p-4 border-t border-[#1E293B]/60 space-y-3 font-mono text-[10.5px] shrink-0">
          {/* Sound Acoustic Switcher */}
          <div className="flex items-center justify-between px-2 text-slate-400">
            <span>SOUND EFFECTS</span>
            <button
              onClick={toggleGlobalSound}
              className={`px-2 py-0.5 rounded text-[9.5px] font-bold ${
                soundOn ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-900 text-slate-500'
              } cursor-pointer`}
            >
              {soundOn ? 'ENABLED' : 'MUTED'}
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-slate-900 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-900/40 text-slate-400 hover:text-rose-400 rounded-xl py-2 flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold"
          >
            <Lock size={12} />
            <span>Lock Console</span>
          </button>

          {onExit && (
            <button
              onClick={onExit}
              className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 text-slate-400 hover:text-white rounded-xl py-2 flex items-center justify-center gap-1.5 transition-all cursor-pointer font-semibold text-[10.5px]"
            >
              <span>← Back to Website</span>
            </button>
          )}
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. RIGHT-SIDE WORKSPACE CORE (DAYLIGHT CANVAS THEME)      */}
      {/* ========================================================= */}
      <main className="flex-1 bg-slate-50 text-slate-800 flex flex-col min-w-0">
        
        {/* Workspace Upper Ribbon Panel */}
        <header className="bg-white border-b border-slate-200 py-4 px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
          <div>
            <span className="text-[9.5px] font-mono font-bold tracking-widest text-[#326E45] uppercase">SECURE OFFICE DECK</span>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 font-sans uppercase">
              {tabFriendlyName[activeTab] || activeTab}
            </h1>
          </div>

          {/* Quick Stats Ribbon */}
          <div className="flex flex-wrap gap-4 font-mono text-[11px] text-left">
            <div className="bg-slate-100 border border-slate-200 rounded-xl py-1.5 px-3">
              <span className="text-slate-450 block text-[9px] font-bold">TOTAL COMMITTED REVENUE</span>
              <strong className="text-slate-900 text-xs">£{totalRevenue.toLocaleString()}</strong>
            </div>
            <div className="bg-slate-100 border border-slate-200 rounded-xl py-1.5 px-3">
              <span className="text-slate-450 block text-[9px] font-bold">ACTIVE CONTRACT PILES</span>
              <strong className="text-[#326E45] text-xs">£{totalProjectBudgets.toLocaleString()}</strong>
            </div>
          </div>
        </header>

        {/* Workspace Responsive Content Box */}
        <div className="flex-1 p-6 lg:p-8 max-w-[1500px] w-full mx-auto space-y-6">
          <AnimatePresence mode="wait">
            {!hasPermission(activeTab) ? (
              <motion.div
                key="restricted_boundary"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white border border-rose-200 rounded-3xl p-8 lg:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-sm font-sans"
              >
                <div className="p-5 bg-rose-50 border border-rose-100 rounded-full inline-flex text-rose-500 relative">
                  <Shield size={48} className="animate-pulse" />
                  <Lock size={16} className="absolute bottom-4 right-4 text-rose-700 bg-white p-0.5 rounded-full border" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">MWI.OS Secure Boundary</h2>
                  <p className="text-xs text-rose-600 font-mono font-bold uppercase tracking-widest">ACCESS RESTRICTED: SECURE CLEARANCE LEVEL 3 REQUIRED</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left font-mono text-[11px] leading-relaxed text-slate-600 space-y-3">
                  <div>
                    <span className="text-slate-400 block font-bold text-[9px] uppercase">Attempted Access Module:</span>
                    <strong className="text-slate-800 uppercase font-bold text-xs">{activeTab} Workspace</strong>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200/60 pt-2.5">
                    <div>
                      <span className="text-slate-400 block font-bold text-[9px] uppercase">Staff Member Node:</span>
                      <strong className="text-slate-800">{activeExecutive.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold text-[9px] uppercase">Corporate Department:</span>
                      <span className="text-indigo-600 font-bold">{activeExecutive.department}</span>
                    </div>
                  </div>
                  <div className="border-t border-[#E2E8F0] pt-2.5">
                    <span className="text-slate-400 block font-bold text-[9px] uppercase">SLA Security Authorization Level:</span>
                    <span className="text-rose-500 font-bold uppercase">Permission token [{activeTab}] is absent from credentials map.</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs text-slate-500 leading-relaxed font-sans max-w-md mx-auto">
                    Your current profile lacks direct administration rights to handle this node. Every executive may work strictly within their given department limits configured by management.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setActiveExecutiveEmail('leadership@metawaveinnovations.com');
                        playSound('success');
                        triggerToast("Overlord permissions assumed. Security bypass authorized.");
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#326E45] hover:bg-[#20462c] text-white text-xs font-mono font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer font-bold"
                    >
                      <Unlock size={13} />
                      <span>Switch to CEO Terminal</span>
                    </button>
                    <button
                      onClick={() => {
                        playSound('click');
                        setActiveTab('staff');
                        triggerToast("Loaded Team & Permissions mapping directory.");
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs font-mono font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer font-bold"
                    >
                      <Users size={13} />
                      <span>View Permissions Map</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <>
                {/* ==================== PRODUCTS TAB ==================== */}
                {activeTab === 'products' && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-6 text-left"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-lg font-black text-slate-900 tracking-tight">Enterprise Products Catalog</h2>
                    <p className="text-xs text-slate-500">Review, price, and adjust core SLA licensed packages of MetaWave Innovations.</p>
                  </div>
                  <button
                    onClick={() => {
                      playSound('click');
                      setEditingProductId(null);
                      setProductForm({ name: '', category: 'POS Tools', price: 1500, status: 'Online', techStack: '', description: '' });
                      setShowProductModal(true);
                    }}
                    className="px-4 py-2 bg-[#326E45] hover:bg-[#20462c] text-white rounded-xl text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-xs"
                  >
                    <Plus size={12} />
                    <span>Catalog Product</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((p) => (
                    <div key={p.id} className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 shadow-xs flex flex-col justify-between transition-all group">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-mono font-bold text-[#326E45] uppercase tracking-wider block">{p.category}</span>
                            <h3 className="text-sm font-black text-slate-900 group-hover:text-[#326E45] transition-colors">{p.name}</h3>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                            p.status === 'Online' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/50' : 'bg-amber-50 text-amber-800'
                          }`}>
                            {p.status}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-3">{p.description}</p>

                        <div className="bg-slate-50 rounded-xl p-3 text-[10.5px] font-mono space-y-1 border border-slate-100">
                          <div className="flex justify-between">
                            <span className="text-slate-450">Subscription Fee:</span>
                            <span className="text-slate-900 font-bold">£{p.price.toLocaleString()}/yr</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-450">Active Licensed Nodes:</span>
                            <span className="text-[#326E45] font-bold">{p.activeClients} accounts</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-450">Core Tech Stack:</span>
                            <span className="text-slate-600 font-bold truncate max-w-[140px]">{p.techStack}</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-4 mt-5 flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              playSound('click');
                              setEditingProductId(p.id);
                              setProductForm({ name: p.name, category: p.category, price: p.price, status: p.status, techStack: p.techStack, description: p.description });
                              setShowProductModal(true);
                            }}
                            className="p-1.5 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 text-slate-600 rounded-lg transition-all cursor-pointer"
                            title="Edit Parameters"
                          >
                            <Edit2 size={11} />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 hover:bg-rose-50 border border-slate-100 hover:border-rose-100 text-slate-400 hover:text-rose-600 rounded-lg transition-all cursor-pointer"
                            title="Decommission Node"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>

                        {/* Interactive pricing update simulation shortcut */}
                        <button
                          onClick={() => {
                            const nextPrice = p.price + 200;
                            setProducts(prev => prev.map(x => x.id === p.id ? { ...x, price: nextPrice } : x));
                            playSound('success');
                            triggerToast(`Pricing adjusted to £${nextPrice}/yr for ${p.name}.`);
                          }}
                          className="text-[9.5px] font-mono font-bold bg-[#326E45]/10 hover:bg-[#326E45]/25 text-[#326E45] px-2 py-1 rounded-lg transition-all cursor-pointer"
                        >
                          Price +£200
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ==================== SERVICES TAB ==================== */}
            {activeTab === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-6 text-left"
              >
                <div className="border-b border-slate-200 pb-4">
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">SLA Services & Background Workers</h2>
                  <p className="text-xs text-slate-500">Monitor active processes, toggle states, and slide simulated operational loads to audit latency.</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {/* Left services list (2 columns on wide screens) */}
                  <div className="xl:col-span-2 space-y-4">
                    {services.map((s) => {
                      const latency = s.status === 'Online' ? Math.round(s.load * 1.5 + 4) : 0;
                      return (
                        <div key={s.id} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-2xs hover:border-slate-300 transition-all">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <h3 className="text-sm font-bold text-slate-900">{s.name} <span className="font-mono text-slate-400 text-xs">{s.port}</span></h3>
                            </div>
                            <p className="text-xs text-slate-500 font-sans max-w-sm">{s.description}</p>
                          </div>

                          {/* Load slider interaction */}
                          <div className="w-full md:w-44 space-y-1 text-left font-mono text-[10px]">
                            <div className="flex justify-between text-slate-450">
                              <span>Simulated Load:</span>
                              <span className="font-bold text-slate-800">{s.status === 'Online' ? `${s.load}%` : 'Offline'}</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={s.status === 'Online' ? s.load : 0}
                              disabled={s.status !== 'Online'}
                              onChange={(e) => adjustServiceLoad(s.id, Number(e.target.value))}
                              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#326E45] disabled:opacity-40"
                            />
                          </div>

                          {/* Status and Latency Indicators */}
                          <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 border-t md:border-t-0 pt-3 md:pt-0">
                            <div className="font-mono text-right text-[10px]">
                              <span className="text-slate-450 block">Audit Latency</span>
                              <span className={`text-xs font-bold ${latency > 100 ? 'text-amber-600' : 'text-emerald-700'}`}>
                                {s.status === 'Online' ? `${latency}ms` : 'TIMEOUT'}
                              </span>
                            </div>

                            <button
                              onClick={() => toggleServiceStatus(s.id)}
                              className={`px-3 py-1.5 rounded-xl font-mono font-bold text-[10px] uppercase transition-all cursor-pointer ${
                                s.status === 'Online'
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : 'bg-rose-50 text-rose-800 border border-rose-200'
                              }`}
                            >
                              {s.status}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Interactive Diagnostics Terminal */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 flex flex-col justify-between font-mono space-y-4">
                    <div className="space-y-3.5">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
                        <span className="text-[10px] font-black text-emerald-400 tracking-wider uppercase flex items-center gap-1.5">
                          <Terminal size={12} className="animate-pulse" />
                          <span>DIAGNOSTIC TESTER</span>
                        </span>
                        <span className="text-[8.5px] text-slate-500">NODE_PING</span>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9.5px] text-slate-400">Target Server Node:</label>
                        <select
                          value={pingTarget}
                          onChange={(e) => setPingTarget(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 text-xs py-1.5 px-2 rounded-xl text-white outline-none"
                        >
                          {services.map((s) => (
                            <option key={s.id} value={s.id}>{s.name} ({s.port})</option>
                          ))}
                        </select>
                      </div>

                      <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-850 h-32 overflow-y-auto text-[10px] text-slate-300 leading-relaxed text-left space-y-1 selection:bg-emerald-500/30">
                        {terminalOutput.map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={triggerPingTest}
                      disabled={pinging}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-550 disabled:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      {pinging ? 'TRANSMITTING HANDSHAKE...' : 'RUN TELEMETRY PING TEST'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ==================== CLIENTS TAB ==================== */}
            {activeTab === 'clients' && (
              <motion.div
                key="clients"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-6 text-left"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-lg font-black text-slate-900 tracking-tight">Corporate Clients Accounts</h2>
                    <p className="text-xs text-slate-500">Track company partners, contract SLA values, active projects, and sync milestones.</p>
                  </div>
                  <button
                    onClick={() => {
                      playSound('click');
                      setEditingClientId(null);
                      setClientForm({ name: '', company: '', email: '', phone: '', budget: 20000, activeProject: '', status: 'Active Client', progress: 50 });
                      setShowClientModal(true);
                    }}
                    className="px-4 py-2 bg-[#326E45] hover:bg-[#20462c] text-white rounded-xl text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus size={12} />
                    <span>Register Account</span>
                  </button>
                </div>

                {/* Clients Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {clients.map((c) => (
                    <div key={c.id} className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 shadow-xs flex flex-col justify-between transition-all">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-mono font-bold text-slate-400">PARTNER ACCOUNT</span>
                            <h3 className="text-sm font-black text-slate-900">{c.company}</h3>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                            c.status === 'Active Client' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/50' : 'bg-indigo-50 text-indigo-800'
                          }`}>
                            {c.status}
                          </span>
                        </div>

                        <div className="border-t border-slate-100 pt-3 text-[11px] font-mono text-slate-500 space-y-1">
                          <div className="flex justify-between">
                            <span>Representative:</span>
                            <span className="text-slate-800 font-bold">{c.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Email:</span>
                            <span className="text-slate-600 truncate max-w-[150px]">{c.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Phone:</span>
                            <span className="text-slate-600">{c.phone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Contract Budget:</span>
                            <span className="text-slate-900 font-extrabold">£{c.budget.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Project Deliverable with progress bar and boost button */}
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-2.5">
                          <div>
                            <span className="text-[8px] font-mono font-black text-slate-400 block uppercase">ACTIVE DELIVERABLE PROJECT</span>
                            <strong className="text-xs text-slate-800 block truncate">{c.activeProject || 'None cataloged'}</strong>
                          </div>

                          <div className="space-y-1 font-mono">
                            <div className="flex justify-between text-[9px] text-slate-550 font-bold">
                              <span>Milestone Sync</span>
                              <span>{c.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${c.progress}%` }} />
                            </div>
                          </div>

                          {c.progress < 100 && (
                            <button
                              onClick={() => boostClientMilestone(c.id)}
                              className="w-full py-1.5 bg-[#326E45]/10 hover:bg-[#326E45]/20 text-[#326E45] font-mono font-bold rounded-lg text-[9px] transition-all cursor-pointer"
                            >
                              BOOST PROGRESS +10%
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-3 mt-4 flex justify-end gap-1.5">
                        <button
                          onClick={() => {
                            playSound('click');
                            setEditingClientId(c.id);
                            setClientForm({ name: c.name, company: c.company, email: c.email, phone: c.phone, budget: c.budget, activeProject: c.activeProject, status: c.status, progress: c.progress });
                            setShowClientModal(true);
                          }}
                          className="p-1.5 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 text-slate-600 rounded-lg transition-all cursor-pointer"
                          title="Modify Record"
                        >
                          <Edit2 size={11} />
                        </button>
                        <button
                          onClick={() => deleteClient(c.id)}
                          className="p-1.5 hover:bg-rose-50 border border-slate-100 hover:border-rose-100 text-slate-400 hover:text-rose-600 rounded-lg transition-all cursor-pointer"
                          title="De-register Record"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ==================== WEBSITE SUBMISSIONS / INQUIRIES TAB ==================== */}
            {activeTab === 'submissions' && (
              <motion.div
                key="submissions"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-6 text-left"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-lg font-black text-slate-900 tracking-tight">Website Contact Inquiries</h2>
                    <p className="text-xs text-slate-500">
                      Audit and coordinate business-to-business consultation requests received via the client-facing portals.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        playSound('click');
                        fetchSupabaseSubmissions();
                      }}
                      disabled={supabaseLoading}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 border border-slate-200 rounded-xl text-xs font-mono font-bold tracking-wide flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw size={12} className={supabaseLoading ? "animate-spin" : ""} />
                      <span>Sync Cloud</span>
                    </button>
                    <button
                      onClick={() => {
                        playSound('click');
                        setManualInquiryForm({
                          name: '', email: '', company: '', phone: '',
                          serviceNeeded: 'Custom Software Development',
                          budgetRange: '£30,000 - £50,000', projectDetails: ''
                        });
                        setShowManualInquiryModal(true);
                      }}
                      className="px-4 py-2 bg-[#326E45] hover:bg-[#20462c] text-white rounded-xl text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Plus size={12} />
                      <span>Manual Inquiry</span>
                    </button>
                  </div>
                </div>

                {/* Status KPI Summary row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Pending Ingress', count: submissions.filter(s => s.status === 'Pending').length, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'In Assessment', count: submissions.filter(s => s.status === 'In Review').length, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Outreached Nodes', count: submissions.filter(s => s.status === 'Contacted').length, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Resolved Leads', count: submissions.filter(s => s.status === 'Resolved').length, color: 'text-emerald-700', bg: 'bg-emerald-50' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">{stat.label}</span>
                        <strong className="text-xl font-black text-slate-900">{stat.count}</strong>
                      </div>
                      <div className={`px-3 py-2.5 rounded-xl font-bold font-mono text-xs ${stat.bg} ${stat.color}`}>
                        INFO
                      </div>
                    </div>
                  ))}
                </div>

                {supabaseError && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 font-mono">
                    ⚡ <strong>Supabase Note:</strong> Utilizing robust local database cache. Remote sync offline. ({supabaseError})
                  </div>
                )}

                {/* Submissions List Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left list: 2 cols */}
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block">Active Ingress Registry</h3>
                    
                    <div className="space-y-3">
                      {submissions.map((sub) => {
                        const hasNotes = sub.admin_notes && sub.admin_notes.trim().length > 0;
                        return (
                          <div
                            key={sub.id}
                            onClick={() => {
                              setSelectedSubmission(sub);
                              setShowSubmissionModal(true);
                              playSound('click');
                            }}
                            className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                              selectedSubmission?.id === sub.id
                                ? 'bg-emerald-50/20 border-[#326E45] shadow-xs'
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex justify-between items-start gap-4">
                              <div className="space-y-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="font-extrabold text-slate-900 text-sm truncate">{sub.name}</h4>
                                  {sub.company && (
                                    <span className="text-xs text-slate-400 font-medium truncate">at {sub.company}</span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-500 font-mono font-medium truncate">{sub.email}</p>
                              </div>

                              <span className={`px-2 py-0.5 rounded text-[8.5px] font-mono font-bold uppercase shrink-0 ${
                                sub.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                                sub.status === 'In Review' ? 'bg-blue-100 text-blue-800' :
                                sub.status === 'Contacted' ? 'bg-purple-100 text-purple-800' :
                                'bg-emerald-100 text-emerald-800'
                              }`}>
                                {sub.status}
                              </span>
                            </div>

                            {/* Service and budget parameters */}
                            <div className="mt-3 grid grid-cols-2 gap-4 border-t border-slate-100 pt-3 text-[11px] font-mono text-slate-500">
                              <div>
                                <span className="block text-[8px] text-slate-400 uppercase tracking-wider">REQUESTED STACK</span>
                                <span className="text-slate-800 font-semibold truncate block">{sub.service_needed || 'General Inquiry'}</span>
                              </div>
                              <div>
                                <span className="block text-[8px] text-slate-400 uppercase tracking-wider">BUDGET SCALE</span>
                                <span className="text-[#326E45] font-extrabold block">{sub.budget_range || 'Under Assessment'}</span>
                              </div>
                            </div>

                            {/* Project description brief snippet */}
                            {sub.project_details && (
                              <p className="mt-2 text-[11px] text-slate-450 line-clamp-2 leading-relaxed">
                                {sub.project_details}
                              </p>
                            )}

                            {hasNotes && (
                              <div className="mt-2.5 bg-slate-50 rounded-lg p-2 border border-slate-100 text-[10px] text-slate-500 italic flex items-start gap-1.5">
                                <span className="font-mono font-black text-emerald-600 not-italic shrink-0">[NOTES]:</span>
                                <span className="line-clamp-1">{sub.admin_notes}</span>
                              </div>
                            )}

                            <div className="mt-3 flex justify-between items-center text-[10px] text-slate-400 font-mono border-t border-slate-100/60 pt-2.5">
                              <span>STAMP: {sub.created_at}</span>
                              <span className="text-slate-500 hover:text-[#326E45] font-bold flex items-center gap-0.5">
                                View Sheet <ChevronRight size={10} />
                              </span>
                            </div>
                          </div>
                        );
                      })}

                      {submissions.length === 0 && (
                        <div className="bg-white border border-slate-150 rounded-2xl p-12 text-center text-slate-400 text-xs">
                          No ingress payloads recorded in current register scope.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Detail Sheet: 1 col */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block">Inquiry Assessment</h3>
                    
                    {selectedSubmission ? (
                      <div className="bg-white border border-[#326E45]/30 rounded-2xl p-5 shadow-2xs text-left space-y-4">
                        <div className="border-b border-slate-100 pb-3 space-y-1">
                          <span className="text-[8px] font-mono font-black text-slate-400 uppercase">ACTIVE SYSTEM SHEET</span>
                          <h3 className="text-base font-black text-slate-900 leading-none">{selectedSubmission.name}</h3>
                          <p className="text-xs text-[#326E45] font-mono">{selectedSubmission.company || 'Private Consultation Node'}</p>
                        </div>

                        {/* Contacts Card */}
                        <div className="space-y-2 text-[11px] font-mono bg-slate-50 rounded-xl p-3 border border-slate-100 text-slate-500">
                          <div className="flex justify-between">
                            <span>EMAIL NODE:</span>
                            <a href={`mailto:${selectedSubmission.email}`} className="text-slate-900 font-bold hover:underline truncate max-w-[170px]">{selectedSubmission.email}</a>
                          </div>
                          {selectedSubmission.phone && (
                            <div className="flex justify-between">
                              <span>CONTACT TELE:</span>
                              <a href={`tel:${selectedSubmission.phone}`} className="text-slate-950 font-bold hover:underline">{selectedSubmission.phone}</a>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span>REGISTRY STAMP:</span>
                            <span className="text-slate-800">{selectedSubmission.created_at}</span>
                          </div>
                        </div>

                        {/* Specs and Budget parameters */}
                        <div className="space-y-2.5 text-xs text-left">
                          <div>
                            <span className="block text-[8px] font-mono font-bold text-slate-400 uppercase tracking-wider">SERVICE CLASSIFICATION</span>
                            <strong className="text-slate-800">{selectedSubmission.service_needed || 'Unclassified Consultation'}</strong>
                          </div>

                          <div>
                            <span className="block text-[8px] font-mono font-bold text-slate-400 uppercase tracking-wider">BUDGET EXPECTATION</span>
                            <strong className="text-[#326E45] text-sm font-extrabold">{selectedSubmission.budget_range || 'Under Audit'}</strong>
                          </div>

                          {selectedSubmission.project_details && (
                            <div>
                              <span className="block text-[8px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">OBJECTIVES & SPEC SHEET</span>
                              <p className="text-xs text-slate-600 bg-slate-50/50 p-3 rounded-lg border border-slate-100/80 leading-relaxed font-sans max-h-40 overflow-y-auto whitespace-pre-wrap">
                                {selectedSubmission.project_details}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Status transition module */}
                        <div className="space-y-2 border-t border-slate-100 pt-3">
                          <span className="block text-[8px] font-mono font-bold text-slate-400 uppercase tracking-wider">WORKFLOW STAGE</span>
                          <div className="grid grid-cols-2 gap-2">
                            {['Pending', 'In Review', 'Contacted', 'Resolved'].map((st) => (
                              <button
                                key={st}
                                onClick={() => updateSubmissionStatus(selectedSubmission.id, st as any)}
                                className={`px-2.5 py-1.5 rounded-lg font-mono text-[10px] font-bold border transition-all cursor-pointer ${
                                  selectedSubmission.status === st
                                    ? 'bg-[#326E45] text-white border-[#326E45] shadow-xs'
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                }`}
                              >
                                {st === 'Pending' ? '● ' : ''}{st}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Internal action logs memo */}
                        <div className="space-y-1.5 border-t border-slate-100 pt-3">
                          <span className="block text-[8px] font-mono font-bold text-slate-400 uppercase tracking-wider">OFFICIAL ACTION LOGS / NOTES</span>
                          <textarea
                            rows={3}
                            placeholder="Enter follow-up steps, architect logs, or diagnostic feedback notes..."
                            value={selectedSubmission.admin_notes || ''}
                            onChange={(e) => updateSubmissionNotes(selectedSubmission.id, e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:ring-1 focus:ring-[#326E45] font-sans text-slate-700 resize-none leading-relaxed"
                          />
                        </div>

                        {/* Promote and destroy button triggers */}
                        <div className="border-t border-slate-100 pt-3.5 flex items-center justify-between gap-2.5">
                          <button
                            onClick={() => deleteSubmission(selectedSubmission.id)}
                            className="px-3 py-2 border border-slate-200 hover:border-rose-200 text-slate-450 hover:text-rose-600 rounded-xl text-[10.5px] font-mono transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 size={11} />
                            <span>Discard Sheet</span>
                          </button>
                          
                          <button
                            onClick={() => promoteSubmissionToClient(selectedSubmission)}
                            className="px-4 py-2 bg-[#326E45] hover:bg-[#20462c] text-white rounded-xl text-[10.5px] font-mono font-bold tracking-wide flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                          >
                            <Briefcase size={11} />
                            <span>Onboard Partner</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white border border-slate-150 rounded-2xl p-8 text-center text-slate-400 text-xs">
                        Select a target ingress payload from the active registry to verify specifications and execute CRM transitions.
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ==================== CORPORATE MAILER TAB ==================== */}
            {activeTab === 'mailer' && (
              <motion.div
                key="mailer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-6 text-left font-sans"
              >
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <Inbox className="text-rose-500 animate-pulse" size={18} />
                      <span>Hostinger Secure Mailer Portal</span>
                    </h2>
                    <p className="text-xs text-slate-500">Official IMAP / SMTP workspace client synchronized with mail.hostinger.com servers.</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={fetchMailsFromHostinger}
                      disabled={isFetchingImap}
                      className="px-3.5 py-2 border border-slate-200 hover:border-slate-300 bg-white text-slate-700 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw size={13} className={isFetchingImap ? "animate-spin text-rose-500" : "text-rose-500"} />
                      <span>{isFetchingImap ? "Synchronizing..." : "Sync IMAP Inbox"}</span>
                    </button>
                    <button
                      onClick={() => { playSound('click'); setShowComposeEmailModal(true); }}
                      className="px-4 py-2 bg-[#326E45] hover:bg-[#20462c] text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                    >
                      <Plus size={13} />
                      <span>Compose E-Mail</span>
                    </button>
                  </div>
                </div>

                {/* IMAP Log Output Slide-Down */}
                {imapLog.length > 0 && (
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-[10.5px] text-slate-400 space-y-1 relative">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
                      <span className="text-rose-400 font-bold flex items-center gap-1.5">
                        <Terminal size={12} /> IMAP TRANSACTION TERMINAL LOGS
                      </span>
                      <button onClick={() => setImapLog([])} className="text-slate-500 hover:text-slate-200">
                        <X size={12} />
                      </button>
                    </div>
                    <div className="max-h-28 overflow-y-auto space-y-0.5 text-left">
                      {imapLog.map((log, i) => (
                        <div key={i} className={log.startsWith('[OK]') ? "text-emerald-400 font-bold" : log.startsWith('[ERR]') || log.startsWith('[FAIL]') ? "text-rose-400" : ""}>
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Mail Navigation Panel (3 Cols) */}
                  <div className="lg:col-span-3 space-y-4 text-left">
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 text-xs font-medium space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block px-2.5 mb-2">Folders</span>
                      {[
                        { id: 'inbox', label: 'Inbox', badge: emails.filter(e => e.folder === 'inbox' && !e.isRead).length, color: 'text-rose-500' },
                        { id: 'sent', label: 'Sent Mail', badge: 0, color: 'text-slate-500' },
                        { id: 'drafts', label: 'Drafts', badge: 0, color: 'text-slate-500' },
                        { id: 'spam', label: 'Spam Node', badge: 0, color: 'text-amber-500' },
                        { id: 'trash', label: 'Trash Bin', badge: 0, color: 'text-slate-400' }
                      ].map((folder) => {
                        const active = activeMailFolder === folder.id;
                        return (
                          <button
                            key={folder.id}
                            onClick={() => { setActiveMailFolder(folder.id as any); setSelectedEmail(null); playSound('click'); }}
                            className={`w-full px-3 py-2 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                              active ? 'bg-rose-50 text-rose-800 font-bold border-l-2 border-rose-500' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <span>{folder.label}</span>
                            {folder.badge > 0 && (
                              <span className="bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                                {folder.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="bg-slate-100 rounded-2xl p-4 text-[11px] leading-relaxed text-slate-500 border border-slate-200">
                      <strong className="text-slate-700 block mb-1">Hostinger Server Link</strong>
                      Hostinger enterprise cluster is online. Outbound SMTP runs on port 465 (SSL). Incoming IMAP runs on port 993. All data synchronized is cache-secured in client sandboxes.
                    </div>
                  </div>

                  {/* Mail List (4 Cols) */}
                  <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col h-[550px]">
                    <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{activeMailFolder} Mailbox</span>
                      <span className="text-[10px] font-mono font-semibold bg-slate-200 px-2 py-0.5 rounded-full text-slate-600">
                        {emails.filter(e => e.folder === activeMailFolder).length} total
                      </span>
                    </div>

                    <div className="overflow-y-auto divide-y divide-slate-100 flex-1">
                      {emails.filter(e => e.folder === activeMailFolder).length === 0 ? (
                        <div className="p-8 text-center text-slate-400 text-xs mt-12 space-y-2">
                          <Inbox size={24} className="mx-auto text-slate-300 animate-pulse" />
                          <p>No communications in this segment.</p>
                        </div>
                      ) : (
                        emails.filter(e => e.folder === activeMailFolder).map((email) => {
                          const isSelected = selectedEmail?.id === email.id;
                          return (
                            <div
                              key={email.id}
                              onClick={() => { setSelectedEmail(email); markEmailAsRead(email.id); playSound('click'); }}
                              className={`p-3.5 text-left text-xs transition-all cursor-pointer relative border-l-2 ${
                                isSelected ? 'bg-slate-50 border-rose-500' : 'hover:bg-slate-50/50 border-transparent'
                              } ${!email.isRead ? 'font-bold text-slate-900' : 'text-slate-600'}`}
                            >
                              {!email.isRead && (
                                <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-rose-500 rounded-full" />
                              )}
                              <div className="flex justify-between items-center gap-2 mb-1">
                                <span className="truncate pr-4 text-[11px] text-slate-800 font-bold">{email.fromName || email.from}</span>
                                <span className="text-[9.5px] font-mono text-slate-450 shrink-0">{email.date.split(' ')[1] || email.date}</span>
                              </div>
                              <h4 className="truncate text-[11.5px] text-slate-900 font-bold mb-1">{email.subject}</h4>
                              <p className="line-clamp-2 text-[10.5px] text-slate-400 leading-normal">{email.body}</p>
                              
                              <div className="flex items-center justify-end gap-2.5 mt-2.5" onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => toggleStarEmail(email.id)} className="text-slate-400 hover:text-amber-500 transition-colors cursor-pointer">
                                  <Star size={12} className={email.starred ? "fill-amber-400 text-amber-500" : ""} />
                                </button>
                                <button onClick={() => deleteEmail(email.id)} className="text-slate-300 hover:text-rose-600 transition-colors cursor-pointer">
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Mail Content Viewer (5 Cols) */}
                  <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-2xl p-5 h-[550px] flex flex-col">
                    {selectedEmail ? (
                      <div className="flex flex-col h-full text-xs text-left">
                        {/* Sender Metadata */}
                        <div className="border-b border-slate-100 pb-4 mb-4 space-y-2.5">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="text-sm font-black text-slate-900 leading-tight">{selectedEmail.subject}</h3>
                              <div className="flex items-center gap-1 mt-1 text-slate-500 font-medium flex-wrap">
                                <span>From:</span>
                                <strong className="text-slate-800">{selectedEmail.fromName}</strong>
                                <span className="font-mono text-[10.5px] bg-slate-100 px-1.5 py-0.5 rounded-md text-slate-600 truncate max-w-[200px]">&lt;{selectedEmail.from}&gt;</span>
                              </div>
                            </div>
                            <button onClick={() => toggleStarEmail(selectedEmail.id)} className="p-1 text-slate-400 hover:text-amber-500 cursor-pointer">
                              <Star size={16} className={selectedEmail.starred ? "fill-amber-400 text-amber-500" : ""} />
                            </button>
                          </div>

                          <div className="flex justify-between items-center text-[10.5px] text-slate-400">
                            <div>To: <span className="font-mono">{selectedEmail.to}</span></div>
                            <div className="font-mono">{selectedEmail.date}</div>
                          </div>
                        </div>

                        {/* Mail Body Textarea style */}
                        <div className="flex-1 overflow-y-auto whitespace-pre-wrap font-sans text-slate-700 leading-relaxed text-xs pr-2">
                          {selectedEmail.body}
                        </div>

                        {/* Message Actions Panel */}
                        <div className="border-t border-slate-100 pt-4 mt-4 flex justify-between gap-3">
                          <button
                            onClick={() => deleteEmail(selectedEmail.id)}
                            className="px-3.5 py-2 border border-slate-200 hover:border-rose-200 text-slate-450 hover:text-rose-600 rounded-xl font-mono transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 size={12} />
                            <span>Delete Email</span>
                          </button>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                playSound('click');
                                setComposeEmailForm({
                                  from: 'leadership@metawaveinnovations.com',
                                  to: selectedEmail.from,
                                  subject: `RE: ${selectedEmail.subject.startsWith('RE:') ? '' : 'RE: '}${selectedEmail.subject}`,
                                  body: `\n\n-----------------------------\nOn ${selectedEmail.date}, ${selectedEmail.fromName} wrote:\n> ${selectedEmail.body.split('\n').join('\n> ')}`
                                });
                                setShowComposeEmailModal(true);
                              }}
                              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-mono transition-all flex items-center gap-1.5 cursor-pointer font-bold"
                            >
                              <Send size={12} />
                              <span>Reply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="m-auto text-center text-slate-400 text-xs space-y-3.5 py-20">
                        <div className="p-4 bg-rose-50 border border-rose-100 rounded-full inline-flex text-rose-500 animate-bounce">
                          <Inbox size={28} />
                        </div>
                        <div className="max-w-xs space-y-1 mx-auto">
                          <h4 className="font-bold text-slate-900 text-sm">Select Message Terminal</h4>
                          <p className="text-slate-500 leading-normal">
                            Activate any inbox payload link in the center panel to read message specs, trigger SMTP replies, or dump cached archives.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </motion.div>
            )}

            {/* ==================== TEAM ANNOUNCEMENTS TAB ==================== */}
            {activeTab === 'announcements' && (
              <motion.div
                key="announcements"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-6 text-left font-sans"
              >
                {/* Board Header Title & Filter Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <Megaphone className="text-amber-500" size={18} />
                      <span>Intranet Board & Official Announcements</span>
                    </h2>
                    <p className="text-xs text-slate-500">Official bulletins, strategic engineering objectives, and core team memos for MetaWave Innovations.</p>
                  </div>
                  <button
                    onClick={() => { playSound('click'); setShowCreateAnnouncementModal(true); }}
                    className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-white border border-slate-800 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer shrink-0"
                  >
                    <Plus size={13} />
                    <span>Publish Memo</span>
                  </button>
                </div>

                {/* Filter categories pills */}
                <div className="flex flex-wrap gap-2 pb-1">
                  {(['All', 'General', 'Engineering', 'Marketing', 'SLA Operations', 'Personnel'] as const).map((cat) => {
                    const active = announcementFilter === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => { setAnnouncementFilter(cat); playSound('click'); }}
                        className={`px-3 py-1.5 rounded-full text-[10.5px] font-mono transition-all font-semibold cursor-pointer ${
                          active
                            ? 'bg-slate-900 text-white font-bold border border-slate-800'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Announcements Feed Lists */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {announcements.filter(a => announcementFilter === 'All' || a.category === announcementFilter).length === 0 ? (
                    <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-xs">
                      <Bell size={32} className="mx-auto text-slate-300 animate-pulse mb-3" />
                      <h4 className="text-slate-800 font-bold text-sm">Channel Clear</h4>
                      <p className="max-w-xs mx-auto mt-1 leading-normal text-slate-500 font-sans">
                        No official announcements are currently logged under this department channel index.
                      </p>
                    </div>
                  ) : (
                    announcements.filter(a => announcementFilter === 'All' || a.category === announcementFilter).map((ann) => {
                      const urgencyColor = 
                        ann.urgency === 'Critical' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                        ann.urgency === 'High' ? 'bg-orange-50 text-orange-800 border-orange-200' :
                        ann.urgency === 'Medium' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                        'bg-blue-50 text-blue-800 border-blue-200';

                      return (
                        <motion.div
                          key={ann.id}
                          layout
                          className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 relative flex flex-col justify-between shadow-xs hover:shadow-md transition-all text-xs"
                        >
                          <div className="space-y-2.5">
                            {/* Urgent level & Categorization badges */}
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1.5">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border font-mono ${urgencyColor}`}>
                                  {ann.urgency}
                                </span>
                                <span className="bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-full text-[9px] font-bold font-mono">
                                  {ann.category}
                                </span>
                              </div>
                              <button
                                onClick={() => deleteAnnouncement(ann.id)}
                                className="text-slate-300 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                                title="Decommission bulletin node"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>

                            {/* Headline */}
                            <h3 className="text-sm font-black text-slate-900 leading-tight tracking-tight pt-1 text-left">
                              {ann.title}
                            </h3>

                            {/* Content Description */}
                            <p className="text-slate-600 font-medium text-[11.5px] leading-relaxed whitespace-pre-wrap font-sans text-left">
                              {ann.content}
                            </p>
                          </div>

                          {/* Signature credentials */}
                          <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-[10px] font-mono text-slate-450 mt-2">
                            <div className="text-left">
                              <div className="font-bold text-slate-800 text-[10.5px]">{ann.author}</div>
                              <div className="text-[9px] text-slate-400 font-semibold">{ann.role}</div>
                            </div>
                            <div>{ann.date}</div>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}

            {/* ==================== SOCIAL ACCS TAB ==================== */}
            {activeTab === 'social' && (
              <motion.div
                key="social"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-6 text-left"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-lg font-black text-slate-900 tracking-tight">Social Accounts & Broadcasts</h2>
                    <p className="text-xs text-slate-500">Draft, preview, schedule, and instantly deploy corporate announcements across linked platforms.</p>
                  </div>
                  <button
                    onClick={() => {
                      playSound('click');
                      setSocialForm({ platform: 'linkedin', content: '', scheduledTime: '' });
                      setShowSocialModal(true);
                    }}
                    className="px-4 py-2 bg-[#326E45] hover:bg-[#20462c] text-white rounded-xl text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus size={12} />
                    <span>Buffer Announcement</span>
                  </button>
                </div>

                {/* Follower Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'LinkedIn Reach', key: 'linkedin', count: followers.linkedin, icon: Linkedin, color: 'text-sky-500', bg: 'bg-sky-50' },
                    { label: 'X / Twitter Stream', key: 'twitter', count: followers.twitter, icon: Twitter, color: 'text-slate-800', bg: 'bg-slate-100' },
                    { label: 'Facebook Network', key: 'facebook', count: followers.facebook, icon: Facebook, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Instagram Feed', key: 'instagram', count: followers.instagram, icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50' }
                  ].map((ch) => (
                    <div key={ch.key} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">{ch.label}</span>
                        <strong className="text-lg font-extrabold text-slate-900">{ch.count.toLocaleString()}</strong>
                      </div>
                      <div className={`p-2.5 rounded-xl ${ch.bg} ${ch.color}`}>
                        <ch.icon size={16} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Broadcaster Hub layout Split */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Queue List */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block">Broadcast queue</h3>
                    
                    {socialPosts.filter((p) => p.status === 'Scheduled').map((p) => (
                      <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs text-xs space-y-3">
                        <div className="flex justify-between items-center font-mono text-[10px]">
                          <span className="text-emerald-700 font-bold uppercase flex items-center gap-1">
                            {p.platform === 'linkedin' && <Linkedin size={10} />}
                            {p.platform === 'twitter' && <Twitter size={10} />}
                            {p.platform === 'facebook' && <Facebook size={10} />}
                            {p.platform === 'instagram' && <Instagram size={10} />}
                            {p.platform}
                          </span>
                          <span className="text-slate-400 flex items-center gap-1">
                            <Clock size={10} />
                            {p.scheduledTime}
                          </span>
                        </div>

                        <p className="text-slate-650 leading-relaxed font-sans">{p.content}</p>

                        <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-2 font-mono text-[9.5px]">
                          <button
                            onClick={() => cancelSocialPost(p.id)}
                            className="text-rose-600 hover:underline cursor-pointer"
                          >
                            CANCEL RELEASE
                          </button>
                          <button
                            onClick={() => publishPostImmediately(p.id)}
                            className="bg-[#326E45] hover:bg-[#20462c] text-white px-3 py-1 rounded-lg transition-all font-bold cursor-pointer"
                          >
                            PUBLISH NOW
                          </button>
                        </div>
                      </div>
                    ))}

                    {socialPosts.filter((p) => p.status === 'Scheduled').length === 0 && (
                      <div className="bg-white border border-slate-150 rounded-2xl p-8 text-center text-slate-400 text-xs">
                        No pending releases buffered in operational queue.
                      </div>
                    )}
                  </div>

                  {/* Right: Simulated Social Feed Live Preview */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                      <span className="text-[10px] font-mono font-black text-slate-450 uppercase flex items-center gap-1.5">
                        <Eye size={12} />
                        <span>LIVE STREAM PREVIEW (LINKEDIN TARGET)</span>
                      </span>
                      <span className="text-[8.5px] font-mono text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">AUTO_SYNC</span>
                    </div>

                    <div className="border border-slate-200 rounded-xl p-4 bg-white text-left font-sans text-xs space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-slate-900 text-emerald-400 font-mono text-[10px] flex items-center justify-center rounded-full font-black">
                          MWI
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <strong className="text-slate-900 text-[12px] font-bold">MetaWave Innovations</strong>
                            <span className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center text-white text-[7px]" title="SLA verified company">✓</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono block mt-0.5">34,850 followers • SLA Node Broadcaster</span>
                        </div>
                      </div>

                      <p className="text-slate-800 text-[11.5px] leading-relaxed whitespace-pre-wrap">
                        {socialPosts[0]?.content || 'Type or queue a broadcast announcement to audit preview copy here...'}
                      </p>

                      <div className="border-t border-slate-100 pt-2.5 mt-2 flex justify-between text-slate-400 text-[10.5px]">
                        <span>Like</span>
                        <span>Comment</span>
                        <span>Repost</span>
                        <span>Send</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ==================== SALES LEDGER TAB ==================== */}
            {activeTab === 'sales' && (
              <motion.div
                key="sales"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-6 text-left"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-lg font-black text-slate-900 tracking-tight">Enterprise Sales Ledger</h2>
                    <p className="text-xs text-slate-500">Track incoming invoices, license tier distributions, and gross system yield.</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={simulateCSVExport}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-mono font-bold tracking-wide flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download size={12} /> Export CSV
                    </button>
                    <button
                      onClick={() => {
                        playSound('click');
                        setSaleForm({ clientName: '', company: '', email: '', productName: 'POS and Billing System', licenseTier: 'Team Cluster', amount: 1500 });
                        setShowSaleModal(true);
                      }}
                      className="px-4 py-2 bg-[#326E45] hover:bg-[#20462c] text-white rounded-xl text-xs font-mono font-bold tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Plus size={12} />
                      <span>Log Transaction</span>
                    </button>
                  </div>
                </div>

                {/* Ledger Invoices Table */}
                <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-2xs bg-white">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="bg-slate-50 font-mono text-slate-500 uppercase border-b border-slate-200 text-[9px] font-black tracking-widest">
                      <tr>
                        <th className="p-4">Transaction stamp</th>
                        <th className="p-4">Invoice ID</th>
                        <th className="p-4">Corporate account</th>
                        <th className="p-4">Licensed Software</th>
                        <th className="p-4">Tier SLA</th>
                        <th className="p-4 text-right">Yield Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 text-slate-700">
                      {sales.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50/50 transition-all">
                          <td className="p-4 font-mono text-slate-400">{s.created_at}</td>
                          <td className="p-4 font-mono font-bold text-slate-900">{s.invoice_no}</td>
                          <td className="p-4">
                            <div className="font-extrabold text-slate-800">{s.company}</div>
                            <div className="text-[10px] text-slate-400">{s.name}</div>
                          </td>
                          <td className="p-4 font-semibold text-slate-700">{s.product_name}</td>
                          <td className="p-4 font-mono text-slate-500">{s.license_tier}</td>
                          <td className="p-4 font-mono text-slate-900 font-extrabold text-right text-sm">
                            £{s.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* ==================== STAFF TAB ==================== */}
            {activeTab === 'staff' && (
              <motion.div
                key="staff"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-8 text-left font-sans animate-fade-in"
              >
                {/* 1. SECTION: MAIN HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <Shield className="text-[#326E45]" size={18} />
                      <span>Corporate Team & Permissions Control System</span>
                    </h2>
                    <p className="text-xs text-slate-500">
                      Configure role-based access control (RBAC), modify department clearance nodes, and authorize executive terminal keys.
                    </p>
                  </div>
                  <button
                    disabled={!isCurrentCEO}
                    onClick={() => {
                      playSound('click');
                      setEditingStaffId(null);
                      setStaffForm({ name: '', role: '', department: 'UI/UX & Design', email: '', phone: '', activeHours: 40, status: 'Active' });
                      setShowStaffModal(true);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-1.5 shadow-xs transition-all ${
                      isCurrentCEO
                        ? 'bg-[#326E45] hover:bg-[#20462c] text-white cursor-pointer'
                        : 'bg-slate-200 border border-slate-300 text-slate-400 cursor-not-allowed opacity-60'
                    }`}
                    title={isCurrentCEO ? "Onboard standard staff member" : "CEO clearance override required to add personnel"}
                  >
                    {isCurrentCEO ? <Plus size={12} /> : <Lock size={12} />}
                    <span>Onboard Official</span>
                  </button>
                </div>

                {/* 2. SECTION: THE 5 DEPARTMENTS REFERENCE MATRIX */}
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 text-white space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                      <Activity size={13} className="animate-pulse" />
                      <span>MWI Standard Departmental Security Matrix</span>
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500">SLA SEC_POLICY_V4.2</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
                    MetaWave Innovations aligns executive identities with cryptographic system modules. Every partner can switch terminals using their official corporate email to manage their specialized department assets. Only the **Chief Executive Officer (CEO)** holds override authority to modify standard grants.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
                    {[
                      {
                        dept: "Executive Board",
                        exec: "Ali Hassan Chand (CEO)",
                        desc: "Full Overlord Access",
                        modules: "All 9 System Modules",
                        badge: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
                        clearance: "Level 5 (Owner)"
                      },
                      {
                        dept: "Growth & Marketing",
                        exec: "Suhail Siyal",
                        desc: "Commercial Operations",
                        modules: "Clients, Products, Social & Sales Ledger",
                        badge: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
                        clearance: "Level 3 (Partner)"
                      },
                      {
                        dept: "Core Engineering",
                        exec: "Muntaha Sheikh",
                        desc: "System Architecture",
                        modules: "SLA Services, Products & Bulletins",
                        badge: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
                        clearance: "Level 3 (Partner)"
                      },
                      {
                        dept: "UI/UX & Design",
                        exec: "Abdul Ahad Arain",
                        desc: "Frontend Supervisor",
                        modules: "Products Catalog, SLA Services, Announcements",
                        badge: "bg-teal-500/10 text-teal-400 border border-teal-500/20",
                        clearance: "Level 3 (Partner)"
                      },
                      {
                        dept: "Operations & Support",
                        exec: "General Team & Support",
                        desc: "Customer Success",
                        modules: "Inquiries, Secure Mailer & Support Memos",
                        badge: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
                        clearance: "Level 2 (Nodes)"
                      }
                    ].map((row, idx) => (
                      <div key={idx} className="bg-slate-900 border border-slate-850 rounded-2xl p-4 space-y-2 text-xs flex flex-col justify-between">
                        <div className="space-y-1">
                          <span className={`px-2 py-0.5 rounded-full text-[8.5px] font-mono font-bold block w-fit ${row.badge}`}>{row.dept}</span>
                          <h4 className="font-bold text-slate-100 font-sans pt-1 leading-tight">{row.exec}</h4>
                          <p className="text-[10px] text-slate-450">{row.desc}</p>
                        </div>
                        <div className="border-t border-slate-800 pt-2 space-y-1 font-mono text-[9.5px]">
                          <div className="text-emerald-400 font-bold">Standard Scope:</div>
                          <div className="text-slate-400 leading-snug">{row.modules}</div>
                          <div className="text-slate-500 pt-1 text-[9px] uppercase font-semibold">Clearance: {row.clearance}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. SECTION: THE INTERACTIVE LIST */}
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative max-w-sm w-full">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <Search size={13} />
                      </span>
                      <input
                        type="text"
                        placeholder="Filter officials & clearances..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#326E45] focus:border-[#326E45]"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-slate-500 uppercase text-[9px] font-bold">Session Security Clearance:</span>
                      {activeExecutive.email === 'leadership@metawaveinnovations.com' ? (
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/50 px-2.5 py-1 rounded-xl font-bold flex items-center gap-1 shadow-2xs">
                          <Unlock size={11} className="text-emerald-600" />
                          <span>CEO MODE ACTIVE (EDIT CLEARANCE UNLOCKED)</span>
                        </span>
                      ) : (
                        <span className="bg-amber-50 text-amber-800 border border-amber-200/50 px-2.5 py-1 rounded-xl font-bold flex items-center gap-1 shadow-2xs" title="Select Ali Hassan Chand's terminal to unlock editing.">
                          <Lock size={11} className="text-amber-600" />
                          <span>READ-ONLY CLEARANCE (SWITCH TO CEO TO EDIT)</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {staff.filter(s => {
                      const q = searchQuery.toLowerCase();
                      return s.name.toLowerCase().includes(q) || s.role.toLowerCase().includes(q) || s.department.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
                    }).map((s) => {
                      const isCEO = s.email === 'leadership@metawaveinnovations.com';
                      const isCurrentUser = activeExecutive.email === s.email;
                      const staffPermissions = s.permissions || [];
                      
                      return (
                        <div key={s.id} className={`bg-white border rounded-3xl p-5 flex flex-col justify-between hover:shadow-2xs transition-all relative ${
                          isCurrentUser ? 'border-emerald-500 ring-2 ring-emerald-500/5' : 'border-slate-200'
                        }`}>
                          
                          {/* Top Card Info */}
                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <span className="px-2 py-0.5 rounded text-[8.5px] font-mono bg-[#326E45]/10 text-[#326E45] font-bold uppercase tracking-wider">{s.department}</span>
                                  {isCEO && (
                                    <span className="bg-rose-50 text-rose-700 border border-rose-200/50 text-[8.5px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">CEO Overlord</span>
                                  )}
                                  {isCurrentUser && (
                                    <span className="bg-indigo-50 text-indigo-700 border border-indigo-200/50 text-[8.5px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">My Node</span>
                                  )}
                                </div>
                                <h3 className="text-sm font-black text-slate-900 mt-1.5">{s.name}</h3>
                                <p className="text-xs text-slate-500 font-sans leading-relaxed">{s.role}</p>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                                s.status === 'Active' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/50' : 'bg-slate-100 text-slate-500'
                              }`}>
                                {s.status}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-500 pt-1">
                              <div className="flex items-center gap-1.5">
                                <Mail size={11} className="text-slate-400" />
                                <span className="truncate">{s.email}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Phone size={11} className="text-slate-400" />
                                <span>{s.phone || 'No phone'}</span>
                              </div>
                            </div>

                            {/* DYNAMIC ACCESS GRANTS GRID */}
                            <div className="border-t border-slate-100 pt-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                                  <Key size={10} className="text-amber-500" />
                                  <span>Active Permission Keys</span>
                                </h4>
                                <span className="text-[9px] font-mono text-slate-400">
                                  {isCEO ? 'All Core Bypass' : `${staffPermissions.length} / 9 Active Grants`}
                                </span>
                              </div>

                              <div className="grid grid-cols-3 gap-2">
                                {[
                                  { id: 'products', label: 'Products' },
                                  { id: 'services', label: 'SLA Nodes' },
                                  { id: 'clients', label: 'Clients' },
                                  { id: 'submissions', label: 'Inquiries' },
                                  { id: 'mailer', label: 'Secure Mail' },
                                  { id: 'announcements', label: 'Announcements' },
                                  { id: 'social', label: 'Social Hub' },
                                  { id: 'sales', label: 'Sales' },
                                  { id: 'staff', label: 'RBAC Team' },
                                ].map((tab) => {
                                  const isPermitted = isCEO || staffPermissions.includes(tab.id);
                                  // Can edit if logged in as CEO, and we are NOT editing the CEO themselves (CEO has native bypass)
                                  const canEditCheckbox = isCurrentCEO && !isCEO;
                                  
                                  return (
                                    <button
                                      key={tab.id}
                                      type="button"
                                      disabled={!canEditCheckbox}
                                      onClick={() => togglePermission(s.id, tab.id)}
                                      className={`px-2 py-1.5 rounded-xl border text-[10px] font-mono font-bold text-left flex items-center justify-between transition-all ${
                                        isPermitted
                                          ? 'bg-emerald-50/50 border-emerald-200 text-emerald-800'
                                          : 'bg-slate-50 border-slate-150 text-slate-400'
                                      } ${canEditCheckbox ? 'hover:border-emerald-400 hover:bg-emerald-50/20 cursor-pointer' : 'cursor-not-allowed opacity-85'}`}
                                      title={
                                        isCEO 
                                          ? "CEO holds un-restricted overlord permission across all system nodes." 
                                          : !isCurrentCEO 
                                            ? "Clearance lock: Only CEO Ali Hassan Chand may toggle credentials." 
                                            : "Click to toggle clearance."
                                      }
                                    >
                                      <span className="truncate">{tab.label}</span>
                                      {isPermitted ? (
                                        <Check size={10} className="text-emerald-600 shrink-0 ml-1" />
                                      ) : (
                                        <X size={10} className="text-slate-400 shrink-0 ml-1" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {/* Bottom Card Actions */}
                          <div className="border-t border-slate-100 pt-3.5 mt-4 flex items-center justify-between gap-1.5">
                            <div>
                              {!isCurrentUser ? (
                                <button
                                  disabled={!isCurrentCEO}
                                  onClick={() => {
                                    setActiveExecutiveEmail(s.email);
                                    localStorage.setItem('mwi_active_exec_email', s.email);
                                    playSound('success');
                                    triggerToast(`Terminal linked: Authenticated as ${s.name}`);
                                  }}
                                  className={`px-3 py-1.5 border font-mono text-[9.5px] font-bold rounded-xl transition-all flex items-center gap-1 shadow-2xs ${
                                    isCurrentCEO
                                      ? 'bg-slate-50 hover:bg-[#326E45]/10 hover:text-[#326E45] border-slate-200 hover:border-[#326E45]/20 text-slate-700 cursor-pointer'
                                      : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                                  }`}
                                  title={isCurrentCEO ? "Assume this employee's security context" : "CEO clearance required to assume identity"}
                                >
                                  {isCurrentCEO ? <Unlock size={10} /> : <Lock size={10} />}
                                  <span>Assume Identity</span>
                                </button>
                              ) : (
                                <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 flex items-center gap-1">
                                  <Check size={10} />
                                  <span>Active Session Node</span>
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                disabled={!isCurrentCEO}
                                onClick={() => {
                                  playSound('click');
                                  setEditingStaffId(s.id);
                                  setStaffForm({ name: s.name, role: s.role, department: s.department, email: s.email, phone: s.phone, activeHours: s.activeHours, status: s.status });
                                  setShowStaffModal(true);
                                }}
                                className={`p-1.5 rounded-lg border transition-all ${
                                  isCurrentCEO
                                    ? 'hover:bg-slate-100 border-slate-200 hover:border-slate-300 text-slate-600 cursor-pointer'
                                    : 'bg-slate-150 text-slate-400 border-slate-200 cursor-not-allowed opacity-50'
                                }`}
                                title={isCurrentCEO ? "Modify Record" : "CEO clearance required to modify profiles"}
                              >
                                <Edit2 size={11} />
                              </button>
                              <button
                                disabled={isCEO || !isCurrentCEO}
                                onClick={() => deleteStaff(s.id)}
                                className={`p-1.5 rounded-lg border transition-all ${
                                  isCEO 
                                    ? 'opacity-30 cursor-not-allowed bg-slate-50 text-slate-300 border border-slate-200' 
                                    : isCurrentCEO
                                      ? 'hover:bg-rose-50 border border-slate-200 hover:border-rose-100 text-slate-400 hover:text-rose-600 cursor-pointer'
                                      : 'bg-slate-150 text-slate-400 border-slate-200 cursor-not-allowed opacity-50'
                                }`}
                                title={isCEO ? "CEO Cannot be decommissioned" : isCurrentCEO ? "Decommission Staff" : "CEO clearance required"}
                              >
                                <Trash2 size={11} />
                              </button>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
          </AnimatePresence>
        </div>
      </main>

      {/* ========================================================= */}
      {/* 3. MODALS SYSTEM PANEL OVERLAYS (PORTALS)                */}
      {/* ========================================================= */}

      {/* A. PRODUCT CONFIG MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setShowProductModal(false)} />
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 shadow-2xl relative z-10 text-left space-y-4 font-sans text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h4 className="text-sm font-black text-slate-900">{editingProductId ? 'Edit Product Parameters' : 'Catalog New Product'}</h4>
              <button onClick={() => setShowProductModal(false)} className="p-1 text-slate-400 hover:text-slate-800 rounded-lg cursor-pointer"><X size={14} /></button>
            </div>
            <form onSubmit={saveProduct} className="space-y-3.5">
              <div className="space-y-1">
                <label className="font-bold text-slate-600 block">Product Label *</label>
                <input type="text" required placeholder="E.g., Warehouse Analytics Suite" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-1 focus:ring-[#326E45] font-semibold" />
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Pricing Tier (GBP/yr) *</label>
                  <input type="number" required placeholder="1800" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Category Nodes</label>
                  <select value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold">
                    <option value="POS Tools">POS Tools</option>
                    <option value="LMS Tools">LMS Tools</option>
                    <option value="Reporting Portal">Reporting Portal</option>
                    <option value="Ledger Solutions">Ledger Solutions</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-600 block">Technology / Engine Stack</label>
                <input type="text" placeholder="E.g., Rust + WebAssembly client sync" value={productForm.techStack} onChange={(e) => setProductForm({ ...productForm, techStack: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-600 block">Product Brief Description</label>
                <textarea rows={3} placeholder="Provide descriptive SLA service overview..." value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
              </div>
              <div className="pt-3.5 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowProductModal(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#326E45] hover:bg-[#20462c] text-white rounded-xl font-bold cursor-pointer">Commit Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* B. CLIENT PROFILE MODAL */}
      {showClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setShowClientModal(false)} />
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 shadow-2xl relative z-10 text-left space-y-4 font-sans text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h4 className="text-sm font-black text-slate-900">{editingClientId ? 'Edit Client Details' : 'Add New Client'}</h4>
              <button onClick={() => setShowClientModal(false)} className="p-1 text-slate-400 hover:text-slate-800 rounded-lg cursor-pointer"><X size={14} /></button>
            </div>
            <form onSubmit={saveClient} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Client Representative *</label>
                  <input type="text" required placeholder="Sarah Connor" value={clientForm.name} onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Corporate Company *</label>
                  <input type="text" required placeholder="Cyberdyne Systems" value={clientForm.company} onChange={(e) => setClientForm({ ...clientForm, company: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Corporate Email *</label>
                  <input type="email" required placeholder="procure@cyberdyne.io" value={clientForm.email} onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Representative Phone</label>
                  <input type="text" placeholder="+44 7911 392812" value={clientForm.phone} onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Contract SLA Budget *</label>
                  <input type="number" required placeholder="35000" value={clientForm.budget} onChange={(e) => setClientForm({ ...clientForm, budget: Number(e.target.value) })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Active Deliverable Scope *</label>
                  <input type="text" required placeholder="E.g., Local Database Replication" value={clientForm.activeProject} onChange={(e) => setClientForm({ ...clientForm, activeProject: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Contract Status</label>
                  <select value={clientForm.status} onChange={(e) => setClientForm({ ...clientForm, status: e.target.value as any })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold">
                    <option value="Active Client">Active Client</option>
                    <option value="Onboarding">Onboarding</option>
                    <option value="Contract Ended">Contract Ended</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Initial Progress Milestone (%)</label>
                  <input type="number" min="0" max="100" value={clientForm.progress} onChange={(e) => setClientForm({ ...clientForm, progress: Number(e.target.value) })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono" />
                </div>
              </div>
              <div className="pt-3.5 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowClientModal(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#326E45] hover:bg-[#20462c] text-white rounded-xl font-bold cursor-pointer">Save Client</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* C. SOCIAL POST MODAL */}
      {showSocialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none font-sans">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setShowSocialModal(false)} />
          <div className="bg-slate-900 border border-slate-800 text-slate-100 w-full max-w-md rounded-2xl p-6 shadow-2xl relative z-10 text-left space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5"><Share2 size={13} /> Create Social Update</h4>
              <button onClick={() => setShowSocialModal(false)} className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"><X size={14} /></button>
            </div>
            <form onSubmit={saveSocialPost} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-slate-400 block font-bold">Select Platform *</label>
                <select value={socialForm.platform} onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value as any })} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none font-bold">
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter">X / Twitter</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-slate-400 block font-bold">Post Content *</label>
                <textarea required placeholder="Write update details here..." value={socialForm.content} onChange={(e) => setSocialForm({ ...socialForm, content: e.target.value })} className="w-full p-3 bg-slate-950 border border-slate-800 text-white text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500/40" rows={4} />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400 block font-bold">Schedule Publication Time (Optional)</label>
                <input type="text" placeholder="E.g., 2026-07-02 09:00" value={socialForm.scheduledTime} onChange={(e) => setSocialForm({ ...socialForm, scheduledTime: e.target.value })} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-white rounded-xl text-xs outline-none" />
              </div>
              <div className="pt-3.5 flex justify-end gap-2 border-t border-slate-800">
                <button type="button" onClick={() => setShowSocialModal(false)} className="px-4 py-2 bg-slate-950 hover:bg-slate-850 rounded-xl text-slate-400 cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 hover:bg-emerald-550 text-white rounded-xl font-bold cursor-pointer">Post Update</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* D. RECORD INVOICE TRANSACTION MODAL */}
      {showSaleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setShowSaleModal(false)} />
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 shadow-2xl relative z-10 text-left space-y-4 font-sans text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h4 className="text-sm font-black text-slate-900">Add Client Invoice</h4>
              <button onClick={() => setShowSaleModal(false)} className="p-1 text-slate-400 hover:text-slate-800 rounded-lg cursor-pointer"><X size={14} /></button>
            </div>
            <form onSubmit={logSale} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-slate-650 block">Client Name *</label>
                  <input type="text" required placeholder="Evelyn Carter" value={saleForm.clientName} onChange={(e) => setSaleForm({ ...saleForm, clientName: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-655 block">Company Name *</label>
                  <input type="text" required placeholder="Cygnet Academy Group" value={saleForm.company} onChange={(e) => setSaleForm({ ...saleForm, company: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-650 block">Client Email *</label>
                <input type="email" required placeholder="comms@cygnet.org" value={saleForm.email} onChange={(e) => setSaleForm({ ...saleForm, email: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono" />
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-slate-650 block">Product</label>
                  <select value={saleForm.productName} onChange={(e) => setSaleForm({ ...saleForm, productName: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold">
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-650 block">License Tier</label>
                  <select value={saleForm.licenseTier} onChange={(e) => setSaleForm({ ...saleForm, licenseTier: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold">
                    <option value="Single Node">Single License</option>
                    <option value="Team Cluster">Team License</option>
                    <option value="Unlimited SLA">Enterprise License</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-650 block">Invoice Value (GBP) *</label>
                <input type="number" required placeholder="3000" value={saleForm.amount} onChange={(e) => setSaleForm({ ...saleForm, amount: Number(e.target.value) })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono font-extrabold text-sm text-[#326E45]" />
              </div>
              <div className="pt-3.5 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowSaleModal(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#326E45] hover:bg-[#20462c] text-white rounded-xl font-bold cursor-pointer">Save Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* E. STAFF MODAL */}
      {showStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setShowStaffModal(false)} />
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 shadow-2xl relative z-10 text-left space-y-4 font-sans text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h4 className="text-sm font-black text-slate-900">{editingStaffId ? 'Edit Staff Member' : 'Add Staff Member'}</h4>
              <button onClick={() => setShowStaffModal(false)} className="p-1 text-slate-400 hover:text-slate-800 rounded-lg cursor-pointer"><X size={14} /></button>
            </div>
            <form onSubmit={saveStaff} className="space-y-3.5">
              <div className="space-y-1">
                <label className="font-bold text-slate-600 block">Full Name *</label>
                <input type="text" required placeholder="Dr. Evelyn Carter" value={staffForm.name} onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold" />
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Role *</label>
                  <input type="text" required placeholder="Senior Core Engineer" value={staffForm.role} onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Department *</label>
                  <select value={staffForm.department} onChange={(e) => setStaffForm({ ...staffForm, department: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold">
                    <option value="UI/UX & Frontend">UI/UX & Frontend</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Cloud & Database">Cloud & Database</option>
                    <option value="Digital Strategy">Digital Strategy</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Email *</label>
                  <input type="email" required placeholder="e.carter@metawave.io" value={staffForm.email} onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Phone / Slack</label>
                  <input type="text" placeholder="+44 7700 900021" value={staffForm.phone} onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Weekly Hours *</label>
                  <input type="number" required placeholder="40" value={staffForm.activeHours} onChange={(e) => setStaffForm({ ...staffForm, activeHours: Number(e.target.value) })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Status</label>
                  <select value={staffForm.status} onChange={(e) => setStaffForm({ ...staffForm, status: e.target.value as any })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold">
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
              </div>
              <div className="pt-3.5 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowStaffModal(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#326E45] hover:bg-[#20462c] text-white rounded-xl font-bold cursor-pointer">Save Staff Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* F. MANUAL INQUIRY LOG MODAL */}
      {showManualInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setShowManualInquiryModal(false)} />
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 shadow-2xl relative z-10 text-left space-y-4 font-sans text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h4 className="text-sm font-black text-slate-900">Log New Inquiry</h4>
              <button onClick={() => setShowManualInquiryModal(false)} className="p-1 text-slate-400 hover:text-slate-800 rounded-lg cursor-pointer"><X size={14} /></button>
            </div>
            <form onSubmit={saveManualInquiry} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Contact Name *</label>
                  <input type="text" required placeholder="Marcus Sterling" value={manualInquiryForm.name} onChange={(e) => setManualInquiryForm({ ...manualInquiryForm, name: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Company Name</label>
                  <input type="text" placeholder="Quantum Inc." value={manualInquiryForm.company} onChange={(e) => setManualInquiryForm({ ...manualInquiryForm, company: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Email Address *</label>
                  <input type="email" required placeholder="marcus@quantum.io" value={manualInquiryForm.email} onChange={(e) => setManualInquiryForm({ ...manualInquiryForm, email: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Phone Number</label>
                  <input type="text" placeholder="+44 7911 229102" value={manualInquiryForm.phone} onChange={(e) => setManualInquiryForm({ ...manualInquiryForm, phone: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Service Required</label>
                  <select value={manualInquiryForm.serviceNeeded} onChange={(e) => setManualInquiryForm({ ...manualInquiryForm, serviceNeeded: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold">
                    <option value="Custom Software Development">Custom Software Development</option>
                    <option value="Artificial Intelligence Systems">Artificial Intelligence Systems</option>
                    <option value="Cloud Infrastructure & DevOps">Cloud Infrastructure & DevOps</option>
                    <option value="Full-scale Enterprise SLA">Full-scale Enterprise SLA</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Budget Scale</label>
                  <select value={manualInquiryForm.budgetRange} onChange={(e) => setManualInquiryForm({ ...manualInquiryForm, budgetRange: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold">
                    <option value="£10,000 - £30,000">£10,000 - £30,000</option>
                    <option value="£30,000 - £50,000">£30,000 - £50,000</option>
                    <option value="£50,000 - £100,000">£50,000 - £100,000</option>
                    <option value="£100,000+">£100,000+</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-600 block">Inquiry Details & Requirements</label>
                <textarea rows={3} placeholder="Provide descriptive overview of inquiry objectives..." value={manualInquiryForm.projectDetails} onChange={(e) => setManualInquiryForm({ ...manualInquiryForm, projectDetails: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
              </div>
              <div className="pt-3.5 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowManualInquiryModal(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#326E45] hover:bg-[#20462c] text-white rounded-xl font-bold cursor-pointer">Save Inquiry</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* G. COMPOSE EMAIL MODAL */}
      {showComposeEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-xs" onClick={() => { if (!isSendingSmtp) setShowComposeEmailModal(false); }} />
          <div className="bg-white border border-slate-200 w-full max-w-xl rounded-2xl p-6 shadow-2xl relative z-10 text-left space-y-4 font-sans text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Send size={15} className="text-[#326E45]" />
                <span>Send Corporate Email</span>
              </h4>
              <button disabled={isSendingSmtp} onClick={() => setShowComposeEmailModal(false)} className="p-1 text-slate-400 hover:text-slate-800 rounded-lg cursor-pointer disabled:opacity-50"><X size={14} /></button>
            </div>

            {isSendingSmtp ? (
              /* SMTP Terminal output */
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 font-mono text-[11px] text-slate-300 space-y-3.5 h-80 flex flex-col justify-between">
                <div className="space-y-1.5 overflow-y-auto flex-1 text-left">
                  <div className="text-rose-400 font-bold border-b border-slate-900 pb-1 flex items-center gap-2 mb-2">
                    <Terminal size={13} /> SMTP SENDING LOG
                  </div>
                  {smtpLog.map((log, i) => (
                    <div key={i} className={log.startsWith('[SMTP] 250') || log.includes('successful') ? "text-emerald-400" : log.startsWith('[SMTP] MAIL') || log.startsWith('[SMTP] RCPT') ? "text-blue-400" : ""}>
                      {log}
                    </div>
                  ))}
                </div>
                <div className="text-slate-500 text-[10px] text-right animate-pulse">
                  Linking outbound ports over TLS...
                </div>
              </div>
            ) : (
              /* SMTP compose form */
              <form onSubmit={sendMailViaHostingerSMTP} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 block">From Account *</label>
                    <select
                      value={composeEmailForm.from}
                      onChange={(e) => setComposeEmailForm({ ...composeEmailForm, from: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                    >
                      <option value="leadership@metawaveinnovations.com">Ali Hassan Chand &lt;leadership@...&gt;</option>
                      <option value="suhail.md@metawaveinnovations.com">Suhail Siyal &lt;suhail.md@...&gt;</option>
                      <option value="muntaha@metawaveinnovations.com">Muntaha Sheikh &lt;muntaha@...&gt;</option>
                      <option value="ahad@metawaveinnovations.com">Abdul Ahad Arain &lt;ahad@...&gt;</option>
                      <option value="team@metawaveinnovations.com">General Team Operations &lt;team@...&gt;</option>
                      <option value="support@metawaveinnovations.com">Client Support Desk &lt;support@...&gt;</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 block">Recipient Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="client@enterprise-cluster.com"
                      value={composeEmailForm.to}
                      onChange={(e) => setComposeEmailForm({ ...composeEmailForm, to: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="Project Milestones & System SLA Sign-off"
                    value={composeEmailForm.subject}
                    onChange={(e) => setComposeEmailForm({ ...composeEmailForm, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-sans font-semibold text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Message Body *</label>
                  <textarea
                    required
                    rows={10}
                    placeholder="Type official corporate communications block..."
                    value={composeEmailForm.body}
                    onChange={(e) => setComposeEmailForm({ ...composeEmailForm, body: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-sans leading-relaxed text-slate-700"
                  />
                </div>

                <div className="pt-3.5 flex justify-end gap-2 border-t border-slate-100">
                  <button type="button" onClick={() => setShowComposeEmailModal(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold cursor-pointer">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-[#326E45] hover:bg-[#20462c] text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer">
                    <Send size={11} />
                    <span>Send Email</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* H. CREATE ANNOUNCEMENT MEMO MODAL */}
      {showCreateAnnouncementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-xs" onClick={() => setShowCreateAnnouncementModal(false)} />
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 shadow-2xl relative z-10 text-left space-y-4 font-sans text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Megaphone size={15} className="text-amber-500" />
                <span>Create Announcement</span>
              </h4>
              <button onClick={() => setShowCreateAnnouncementModal(false)} className="p-1 text-slate-400 hover:text-slate-800 rounded-lg cursor-pointer"><X size={14} /></button>
            </div>

            <form onSubmit={createAnnouncement} className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-600 block">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="MetaWave Innovations SLA Restructuring"
                  value={newAnnouncementForm.title}
                  onChange={(e) => setNewAnnouncementForm({ ...newAnnouncementForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Category *</label>
                  <select
                    value={newAnnouncementForm.category}
                    onChange={(e) => setNewAnnouncementForm({ ...newAnnouncementForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                  >
                    <option value="General">General</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="SLA Operations">SLA Operations</option>
                    <option value="Personnel">Personnel</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Priority *</label>
                  <select
                    value={newAnnouncementForm.urgency}
                    onChange={(e) => setNewAnnouncementForm({ ...newAnnouncementForm, urgency: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                    <option value="Critical">Critical Priority</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-600 block">Author *</label>
                <select
                  value={newAnnouncementForm.author}
                  onChange={(e) => setNewAnnouncementForm({ ...newAnnouncementForm, author: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                >
                  {staff.map((s) => (
                    <option key={s.id} value={s.name}>{s.name} ({s.role.split('|')[0].trim()})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-600 block">Announcement Details *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Draft the corporate announcement content..."
                  value={newAnnouncementForm.content}
                  onChange={(e) => setNewAnnouncementForm({ ...newAnnouncementForm, content: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-sans leading-relaxed text-slate-700"
                />
              </div>

              <div className="pt-3.5 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowCreateAnnouncementModal(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#326E45] hover:bg-[#20462c] text-white rounded-xl font-bold cursor-pointer">Post Announcement</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Toast rendering loop */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 select-none pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="bg-slate-950 text-emerald-400 text-[10.5px] border border-emerald-800/40 py-2.5 px-4 rounded-xl shadow-lg font-mono pointer-events-auto">
            ⚡ {t.msg}
          </div>
        ))}
      </div>

    </div>
  );
}

export default AdminPanel;

