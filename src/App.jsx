import React, { useState, useEffect } from 'react';
import {
  Terminal,
  User,
  Briefcase,
  Mail,
  ChevronRight,
  Phone,
  MessageCircle,
  Plus,
  FileText,
  GraduationCap,
  Award,
  Code,
  Globe,
  ArrowUp,
  MonitorSmartphone,
  Server,
  Headset,
  Settings,
  Target,
  Zap,
  ShieldCheck,
  Users,
  LayoutDashboard,
  ArrowLeft
} from 'lucide-react';
import EcomToolkit from './EcomToolkit.jsx';
import SeeamLabs from './SeeamLabs.jsx';


const profilePhotoUrl = 'https://instasize.com/api/image/6936ef4d9ded1e7e40df9eae3449c857c5d1696477cf9016e42d10fe9d1c321b.jpeg';

const translations = {
  bn: {
    nav: { home: 'হোম', about: 'সম্পর্কে', services: 'সেবা', experience: 'অভিজ্ঞতা', projects: 'প্রজেক্ট', labs: 'ল্যাবস', contact: 'যোগাযোগ' },
    hero: {
      badge: 'উদ্যোক্তা ও সফটওয়্যার ডেভেলপার',
      hello: 'হ্যালো,',
      name: 'আমি সিয়াম রহমান',
      desc: 'আমি প্রযুক্তি ব্যবহার করে বাস্তব জীবনের সমস্যার উদ্ভাবনী সমাধান তৈরি করি।',
      subDesc: "কোভিড-১৯ মহামারীর সময় 'Defense Corona' এবং 'Collegian App'-এর মতো প্রয়োজনীয় প্ল্যাটফর্ম তৈরি করার অভিজ্ঞতা নিয়ে আমি কাজ করে যাচ্ছি।",
      btnWork: 'আমার কাজ দেখুন',
      btnCV: 'সিভি ডাউনলোড',
      btnToolkit: 'ই-কমার্স টুলকিট',
      roles: ['সফটওয়ার ডেভেলপার', 'উদ্যোক্তা', 'টেকনিক্যাল স্পেশালিস্ট', 'প্রোজেক্ট ম্যানেজার']
    },
    about: {
      title: 'আমার সম্পর্কে',
      p1: "আমি একজন বাংলাদেশী উদ্যোক্তা এবং সফটওয়্যার ডেভেলপার। মহামারীর কঠিন সময়ে মানুষের সাহায্যে এগিয়ে আসার তাগিদ থেকে আমি Defense Corona নামক রিয়েল-টাইম কোভিড-১৯ ডিটেক্টর অ্যাপ তৈরি করি।",
      p2: 'প্রযুক্তির প্রতি আমার গভীর আগ্রহ আমাকে শিক্ষা ও প্রশাসনিক কাজে সহায়ক অ্যাপ (যেমন Jubileean21, Collegian App এবং Headteacher\'s Info) তৈরি করতে অনুপ্রাণিত করেছে। এছাড়া বিভিন্ন স্বেচ্ছাসেবী সংগঠনে যুক্ত থেকে সমাজ উন্নয়নে কাজ করতে আমি ভালোবাসি।',
      p3: 'আমার ঝুলিতে রয়েছে জাতীয় বিজ্ঞান ও প্রযুক্তি মেলায় একাধিকবার পুরস্কৃত হওয়ার গৌরব।',
      skills: {
        programming: 'প্রোগ্রামিং',
        progDesc: 'Java, Software Development',
        management: 'ম্যানেজমেন্ট',
        mgmtDesc: 'Project Management & Admin',
        leadership: 'লিডারশিপ',
        leadDesc: 'Public Speaking & Training',
        communication: 'যোগাযোগ',
        commDesc: 'Interviewing Skills'
      }
    },
    services: {
      title: 'আমার সেবাসমূহ',
      web: 'ওয়েব ডেভেলপমেন্ট',
      webDesc: 'আধুনিক ও রেস্পন্সিভ ওয়েবসাইট তৈরি করা যা ব্যবহারকারীদের চমৎকার অভিজ্ঞতা প্রদান করে।',
      app: 'অ্যাপ ডেভেলপমেন্ট',
      appDesc: 'অ্যান্ড্রয়েড এবং আইওএস প্ল্যাটফর্মের জন্য স্কেলেবল এবং সিকিউর মোবাইল অ্যাপ্লিকেশন তৈরি।',
      support: 'আইটি সাপোর্ট',
      supportDesc: 'সফটওয়্যার বা হার্ডওয়্যার জনিত যেকোনো টেকনিক্যাল সমস্যার দ্রুত সমাধান প্রদান।',
      consulting: 'টেক কনসালটেন্সি',
      consultDesc: 'ব্যবসায়িক আইডিয়াকে ডিজিটাল প্রোডাক্টে রূপান্তর করার জন্য সঠিক প্রযুক্তি নির্বাচন ও গাইডলাইন।'
    },
    why: {
      title: 'আমাকে কেন বেছে নেবেন?',
      p1Title: 'উদ্ভাবনী সমাধান',
      p1Desc: 'সর্বশেষ প্রযুক্তি ব্যবহার করে আপনার ব্যবসার জন্য ক্রিয়েটিভ এবং আধুনিক সমাধান প্রদান করি।',
      p2Title: 'সঠিক সময়ে ডেলিভারি',
      p2Desc: 'কাজের মান ঠিক রেখে নির্ধারিত সময়ের মধ্যে প্রজেক্ট সম্পন্ন করার শতভাগ নিশ্চয়তা।',
      p3Title: 'নিরবচ্ছিন্ন সাপোর্ট',
      p3Desc: 'প্রজেক্ট হস্তান্তরের পরেও যেকোনো সমস্যা বা আপডেটের জন্য দ্রুত এবং নির্ভরযোগ্য সহায়তা।',
      p4Title: 'ক্লায়েন্ট-কেন্দ্রিক',
      p4Desc: 'আপনার ব্যবসায়িক লক্ষ্য এবং ভিশনকে অগ্রাধিক্য দিয়ে প্রতিটি প্রজেক্ট কাস্টমাইজ করি।'
    },
    experience: {
      title: 'অভিজ্ঞতা ও শিক্ষা',
      profTitle: 'প্রফেশনাল অভিজ্ঞতা',
      eduTitle: 'শিক্ষাগত যোগ্যতা',
      exp1Role: 'Technical Support Specialist',
      exp1Org: 'BHS TV, Barishal (2023 - 2024)',
      exp1Desc: 'বিভাগীয় ও টিমের লক্ষ্য অনুযায়ী ওয়েব বিষয়ক সমস্যাগুলোর সমাধান করার মাধ্যমে নেক্সট-লেভেল টেকনিক্যাল সাপোর্ট প্রদান।',
      exp2Role: 'Technical Support Specialist',
      exp2Org: 'Barishal TV, Barishal (2022 - 2023)',
      exp2Desc: 'রিকোয়ারমেন্ট এনালাইসিস করে ওয়েবসাইটের জন্য সফটওয়্যার অ্যাপ্লিকেশন ডিজাইন, ডেভেলপমেন্ট এবং ইমপ্লিমেন্টেশনের কাজ সম্পন্ন করা।',
      edu1: 'BSc. in Computer Science & Engineering',
      edu1Org: 'University of Scholars, Banani, Dhaka',
      edu2: 'Higher Secondary Certificate (H.S.C.)',
      edu2Org: 'Patuakhali Govt. College, Patuakhali',
      edu3: 'Secondary School Certificate (Science)',
      edu3Org: 'Patuakhali Govt. Jubilee High School • GPA: 5.00'
    },
    awards: {
      title: 'অর্জন ও পুরস্কার',
      aw1: 'জাতীয় বিজ্ঞান ও প্রযুক্তি মেলা',
      aw1Desc: 'প্রজেক্ট প্রদর্শনীতে জেলা পর্যায়ে প্রথম স্থান অধিকার।',
      aw2: 'শ্রেষ্ঠ উদ্ভাবক পুরস্কার',
      aw2Desc: 'Defense Corona অ্যাপ ডেভেলপমেন্টের জন্য বিশেষ সম্মাননা।',
      aw3: 'ডিজিটাল বাংলাদেশ অ্যাওয়ার্ড (নমিনি)',
      aw3Desc: 'প্রশাসনিক অটোমেশন (BDRDE Software) তৈরি করার জন্য স্বীকৃতি।'
    },
    projects: {
      title: 'উল্লেখযোগ্য প্রজেক্ট',
      founder: 'Founder and Developer',
      dev: 'Software Developer',
      p1Title: 'Defense Corona App',
      p1Desc: 'কোভিড-১৯ লক্ষণ শনাক্তকরণ এবং ৭ দিন পর পর ঝুঁকির ফলাফল প্রদানকারী একটি অ্যাপ। এটি বিএমআরসি সদর দফতর এবং বাংলাদেশ সরকারের আইসিটি বিভাগ কর্তৃক পরীক্ষিত।',
      p2Title: 'BDRDE Software',
      p2Desc: 'পটুয়াখালী জেলার স্থানীয় সরকারের জন্য জন্ম ও মৃত্যু নিবন্ধন অটোমেশন সফটওয়্যার। বর্তমানে এটি ৫টি পৌরসভা এবং ৭৭টি ইউনিয়নে ব্যবহৃত হচ্ছে।',
      p3Title: 'Collegian App',
      p3Desc: 'শিক্ষার্থীদের জন্য ক্যাম্পাস আপডেট, শিডিউল, কলেজ গাইড ম্যাপ এবং অ্যাপ্লিকেশন সাবমিট করার সুবিধা সংবলিত অ্যাপ।',
      p4Title: 'Headteachers Info',
      p4Desc: 'মহামারীর সময় প্রাথমিক বিদ্যালয়ের শিক্ষকদের ঘরে বসে তথ্য সাবমিট করার সফটওয়্যার। পটুয়াখালী জেলার ৫১টিরও বেশি স্কুলে এটি সুপারিশকৃত ছিল।'
    },
    contact: {
      title: 'যোগাযোগ করুন',
      next: 'এরপর কী?',
      desc: 'আমি নতুন প্রজেক্ট এবং প্রযুক্তি নিয়ে আলোচনা করতে সবসময় প্রস্তুত। আপনার কোনো প্রশ্ন থাকলে বা কোনো কাজের প্রস্তাব থাকলে ইমেইল বা কল করতে পারেন।',
      footer: 'ডিজাইন ও ডেভেলপমেন্ট:',
      rights: 'সর্বস্বত্ব সংরক্ষিত'
    },
    labs: {
      title: 'সিয়াম ল্যাবস',
      ecom: 'ই-কমার্স টুলকিট',
      ecomDesc: 'আপনার ই-কমার্স ব্যবসাকে সহজ করার জন্য প্রয়োজনীয় সব টুলস এবং গাইড।',
      readAll: 'সব পড়ুন'
    }
  },
  en: {
    nav: { home: 'Home', about: 'About', services: 'Services', experience: 'Experience', projects: 'Projects', labs: 'Labs', contact: 'Contact' },
    hero: {
      badge: 'Entrepreneur & Software Developer',
      hello: 'Hello,',
      name: 'I am Seeam',
      desc: 'I create innovative digital solutions for real-world problems using technology.',
      subDesc: "Working with the experience of creating essential platforms like 'Defense Corona' and 'Collegian App' during the COVID-19 pandemic.",
      btnWork: 'View My Work',
      btnCV: 'Download CV',
      btnToolkit: 'E-com Toolkit',
      roles: ['Software Developer', 'Entrepreneur', 'Technical Specialist', 'Project Manager']
    },
    about: {
      title: 'About Me',
      p1: 'I am a Bangladeshi entrepreneur and software developer. Driven by the urge to help people during the difficult times of the pandemic, I created a real-time COVID-19 detector app called Defense Corona.',
      p2: 'My deep interest in technology has inspired me to create educational and administrative apps (such as Jubileean21, Collegian App, and Headteacher\'s Info). I also love working for social development by associating with various voluntary organizations.',
      p3: 'I have the glory of being awarded multiple times at the National Science and Technology Fair.',
      skills: {
        programming: 'Programming',
        progDesc: 'Java, Software Development',
        management: 'Management',
        mgmtDesc: 'Project Management & Admin',
        leadership: 'Leadership',
        leadDesc: 'Public Speaking & Training',
        communication: 'Communication',
        commDesc: 'Interviewing Skills'
      }
    },
    services: {
      title: 'My Services',
      web: 'Web Development',
      webDesc: 'Creating modern and responsive websites that provide excellent user experiences.',
      app: 'App Development',
      appDesc: 'Building scalable and secure mobile applications for Android and iOS platforms.',
      support: 'IT Support',
      supportDesc: 'Providing quick solutions for any software or hardware related technical issues.',
      consulting: 'Tech Consulting',
      consultDesc: 'Selecting the right technology and guiding the transformation of business ideas into digital products.'
    },
    why: {
      title: 'Why Choose Me?',
      p1Title: 'Innovative Solutions',
      p1Desc: 'Providing creative and modern solutions for your business using the latest technologies.',
      p2Title: 'Timely Delivery',
      p2Desc: '100% guarantee of completing projects within the deadline without compromising quality.',
      p3Title: 'Dedicated Support',
      p3Desc: 'Fast and reliable assistance for any issues or updates even after project handover.',
      p4Title: 'Client-Centric',
      p4Desc: 'Prioritizing your business goals and vision to customize every aspect of the project.'
    },
    experience: {
      title: 'Experience & Education',
      profTitle: 'Professional Experience',
      eduTitle: 'Educational Qualifications',
      exp1Role: 'Technical Support Specialist',
      exp1Org: 'BHS TV, Barishal (2023 - 2024)',
      exp1Desc: 'Providing next-level technical support by solving web-related issues according to departmental and team goals.',
      exp2Role: 'Technical Support Specialist',
      exp2Org: 'Barishal TV, Barishal (2022 - 2023)',
      exp2Desc: 'Completing software application design, development, and implementation tasks for websites by analyzing requirements.',
      edu1: 'BSc. in Computer Science & Engineering',
      edu1Org: 'University of Scholars, Banani, Dhaka',
      edu2: 'Higher Secondary Certificate (H.S.C.)',
      edu2Org: 'Patuakhali Govt. College, Patuakhali',
      edu3: 'Secondary School Certificate (Science)',
      edu3Org: 'Patuakhali Govt. Jubilee High School • GPA: 5.00'
    },
    awards: {
      title: 'Awards & Achievements',
      aw1: 'National Science & Tech Fair',
      aw1Desc: 'Secured first place at the district level in the project exhibition.',
      aw2: 'Best Innovator Award',
      aw2Desc: 'Special recognition for the development of the Defense Corona app.',
      aw3: 'Digital Bangladesh Award (Nominee)',
      aw3Desc: 'Recognition for developing administrative automation (BDRDE Software).'
    },
    projects: {
      title: 'Notable Projects',
      founder: 'Founder and Developer',
      dev: 'Software Developer',
      p1Title: 'Defense Corona App',
      p1Desc: 'An app providing COVID-19 symptom detection and risk results every 7 days. Tested by BMRC headquarters and the ICT Division of Bangladesh.',
      p2Title: 'BDRDE Software',
      p2Desc: 'Birth and death registration automation software for local government in Patuakhali district. Currently used in 5 municipalities and 77 unions.',
      p3Title: 'Collegian App',
      p3Desc: 'App containing campus updates, schedules, college guide maps, and application submission features for students.',
      p4Title: 'Headteachers Info',
      p4Desc: 'Software for primary school teachers to submit information from home during the pandemic. Recommended in over 51 schools in Patuakhali.'
    },
    contact: {
      title: 'Contact Me',
      next: "What's Next?",
      desc: 'I am always ready to discuss new projects and technologies. If you have any questions or business proposals, feel free to email or call.',
      footer: 'Design & Development:',
      rights: 'All Rights Reserved'
    },
    labs: {
      title: 'Seeam Labs',
      ecom: 'E-commerce Toolkit',
      ecomDesc: 'All essential tools and guides to simplify your e-commerce business.',
      readAll: 'Read all'
    }
  }
};

const colorStyles = {
  cyan: {
    accent: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/50',
    accentStrong: 'text-cyan-400',
    dot: 'bg-cyan-500'
  },
  blue: {
    accent: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/50',
    accentStrong: 'text-blue-400',
    dot: 'bg-blue-500'
  },
  purple: {
    accent: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/50',
    accentStrong: 'text-purple-400',
    dot: 'bg-purple-500'
  },
  green: {
    accent: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/50',
    accentStrong: 'text-green-400',
    dot: 'bg-green-500'
  },
  yellow: {
    accent: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/50',
    accentStrong: 'text-yellow-400',
    dot: 'bg-yellow-500'
  }
};

export default function App() {
  const [lang, setLang] = useState('bn');
  const t = translations[lang];
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [view, setView] = useState('portfolio'); // 'portfolio' | 'ecom' | 'labs-page'

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Dynamic Route Handling via Query Params
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('v') || params.get('page');
    if (viewParam === 'ecom' || viewParam === 'ecom-toolkit') {
      setView('ecom');
    } else if (viewParam === 'labs' || viewParam === 'seeam-labs') {
      setView('labs-page');
    }

    window.addEventListener('popstate', () => {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('v') || params.get('page');
      if (v === 'ecom' || v === 'ecom-toolkit') setView('ecom');
      else if (v === 'labs' || v === 'seeam-labs') setView('labs-page');
      else setView('portfolio');
    });

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const url = new URL(window.location);
    if (view === 'ecom') {
      url.searchParams.set('v', 'ecom-toolkit');
      window.history.pushState({}, '', url);
    } else if (view === 'labs-page') {
      url.searchParams.set('v', 'seeam-labs');
      window.history.pushState({}, '', url);
    } else {
      url.searchParams.delete('v');
      url.searchParams.delete('page');
      const newUrl = url.search === '' ? window.location.pathname : url.href;
      window.history.pushState({}, '', newUrl);
    }
  }, [view]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      if (view !== 'portfolio') return;
      const sections = ['home', 'about', 'services', 'why', 'experience', 'awards', 'projects', 'labs', 'contact'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top >= -150 && rect.top <= 300;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  const navLinks = [
    { name: t.nav.home, id: 'home', icon: Terminal },
    { name: t.nav.about, id: 'about', icon: User },
    { name: t.nav.services, id: 'services', icon: Settings },
    { name: t.nav.experience, id: 'experience', icon: GraduationCap },
    { name: t.nav.projects, id: 'projects', icon: Briefcase },
    { name: t.nav.labs, id: 'labs', icon: LayoutDashboard },
    { name: t.nav.contact, id: 'contact', icon: Mail }
  ];

  const services = [
    {
      icon: MonitorSmartphone,
      title: t.services.web,
      desc: t.services.webDesc,
      style: colorStyles.cyan
    },
    {
      icon: Server,
      title: t.services.app,
      desc: t.services.appDesc,
      style: colorStyles.blue
    },
    {
      icon: Headset,
      title: t.services.support,
      desc: t.services.supportDesc,
      style: colorStyles.purple
    },
    {
      icon: Terminal,
      title: t.services.consulting,
      desc: t.services.consultDesc,
      style: colorStyles.green
    }
  ];

  const whyItems = [
    {
      icon: Zap,
      title: t.why.p1Title,
      desc: t.why.p1Desc,
      style: colorStyles.yellow
    },
    {
      icon: Target,
      title: t.why.p2Title,
      desc: t.why.p2Desc,
      style: colorStyles.green
    },
    {
      icon: ShieldCheck,
      title: t.why.p3Title,
      desc: t.why.p3Desc,
      style: colorStyles.blue
    },
    {
      icon: Users,
      title: t.why.p4Title,
      desc: t.why.p4Desc,
      style: colorStyles.purple
    }
  ];

  const projectCards = [
    {
      date: 'Nov 2020',
      role: t.projects.founder,
      title: t.projects.p1Title,
      desc: t.projects.p1Desc,
      icon: Code,
      style: colorStyles.cyan
    },
    {
      date: 'Mar 2023',
      role: t.projects.dev,
      title: t.projects.p2Title,
      desc: t.projects.p2Desc,
      icon: Briefcase,
      style: colorStyles.blue
    },
    {
      date: 'Nov 2022',
      role: t.projects.founder,
      title: t.projects.p3Title,
      desc: t.projects.p3Desc,
      icon: Server,
      style: colorStyles.purple
    },
    {
      date: 'Apr 2020 - Aug 2021',
      role: t.projects.founder,
      title: t.projects.p4Title,
      desc: t.projects.p4Desc,
      icon: MonitorSmartphone,
      style: colorStyles.green
    }
  ];

  const labsItems = [
    {
      title: t.labs.ecom,
      desc: t.labs.ecomDesc,
      icon: LayoutDashboard,
      onClick: () => {
        setView('ecom');
        window.scrollTo({ top: 0, behavior: 'instant' });
      },
      style: colorStyles.purple
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-hidden transition-colors duration-500">
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.12), transparent 80%)`
        }}
      />

      <div
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <button
        onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
        className="fixed top-6 right-6 z-50 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 shadow-lg shadow-black/50 group"
      >
        <Globe size={18} className="group-hover:animate-spin-slow" />
        <span className="font-bold text-sm tracking-widest">{lang === 'bn' ? 'EN' : 'BN'}</span>
      </button>

      {view === 'portfolio' ? (
        <main className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-32">
          <section id="home" className="min-h-[85vh] flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <div className="flex flex-col justify-center items-start md:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:bg-cyan-500/20 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                </span>
                {t.hero.badge}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-slate-100 leading-tight">
                {t.hero.hello} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">{t.hero.name}</span>
              </h1>
              <div className="mb-6 flex flex-wrap gap-2">
                {t.hero.roles.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-100 text-sm font-medium tracking-wide">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 mr-2 shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
                    {role}
                  </span>
                ))}
              </div>
              <h2 className="text-lg md:text-xl font-medium text-slate-400 mb-6 max-w-2xl leading-relaxed">
                {t.hero.desc}
              </h2>
              <p className="text-slate-500 text-base mb-10 max-w-xl">{t.hero.subDesc}</p>
              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="px-8 py-4 rounded-xl bg-slate-100 text-slate-900 font-bold hover:bg-white transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-white/10">
                  {t.hero.btnWork} <ChevronRight size={20} />
                </a>
                <a 
                  href="/CV_SEEAM_RAHMAN.pdf" 
                  download 
                  className="px-8 py-4 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-500 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  {t.hero.btnCV} <FileText size={20} />
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
              <div className="relative w-64 h-64 md:w-[380px] md:h-[380px] rounded-[2rem] overflow-hidden border-4 border-slate-800/80 shadow-2xl shadow-cyan-500/20 rotate-3 hover:rotate-0 transition-all duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-transparent mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={profilePhotoUrl}
                  alt={t.hero.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </section>

          <section id="about" className="py-24 border-t border-slate-800/50">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100">{t.about.title}</h2>
              <div className="h-px bg-slate-800 flex-1 mt-2" />
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                <p><strong className="text-cyan-400 font-medium">{t.about.p1}</strong></p>
                <p>{t.about.p2}</p>
                <p>{t.about.p3}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: Code,
                    style: colorStyles.cyan,
                    title: t.about.skills.programming,
                    desc: t.about.skills.progDesc
                  },
                  {
                    icon: Briefcase,
                    style: colorStyles.blue,
                    title: t.about.skills.management,
                    desc: t.about.skills.mgmtDesc
                  },
                  {
                    icon: Award,
                    style: colorStyles.purple,
                    title: t.about.skills.leadership,
                    desc: t.about.skills.leadDesc
                  },
                  {
                    icon: User,
                    style: colorStyles.green,
                    title: t.about.skills.communication,
                    desc: t.about.skills.commDesc
                  }
                ].map((skill, idx) => (
                  <div key={idx} className={`bg-slate-900/60 p-6 rounded-2xl border border-slate-800 hover:-translate-y-1 transition-all duration-300 ${skill.style.border} ${skill.style.bg}`}>
                    <skill.icon className={`${skill.style.accent} mb-3`} size={28} />
                    <h3 className="text-white font-bold mb-1">{skill.title}</h3>
                    <p className="text-sm text-slate-400">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="services" className="py-24 border-t border-slate-800/50">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100">{t.services.title}</h2>
              <div className="h-px bg-slate-800 flex-1 mt-2" />
            </div>
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
              {services.map((service, idx) => (
                <div key={idx} className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800/60 transition-all hover:border-slate-600 hover:bg-slate-800/40 group relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-24 h-24 ${service.style.bg} rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150`} />
                  <service.icon size={36} className={`${service.style.accent} mb-6 relative z-10`} />
                  <h3 className="text-xl font-bold text-slate-200 mb-3 relative z-10">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed relative z-10">{service.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="why" className="py-24 border-t border-slate-800/50">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100">{t.why.title}</h2>
              <div className="h-px bg-slate-800 flex-1 mt-2" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {whyItems.map((item, idx) => (
                <div key={idx} className={`flex gap-6 p-8 bg-slate-900/40 rounded-3xl border border-slate-800/60 transition-all duration-300 hover:-translate-y-1 ${item.style.border}`}>
                  <div className={`w-16 h-16 rounded-2xl ${item.style.bg} flex items-center justify-center shrink-0 shadow-inner`}>
                    <item.icon size={32} className={item.style.accent} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-200 mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="experience" className="py-24 border-t border-slate-800/50">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100">{t.experience.title}</h2>
              <div className="h-px bg-slate-800 flex-1 mt-2" />
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-8 flex items-center gap-2">
                  <Briefcase size={24} /> {t.experience.profTitle}
                </h3>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                  {[
                    {
                      role: t.experience.exp1Role,
                      org: t.experience.exp1Org,
                      desc: t.experience.exp1Desc,
                      accent: 'border-cyan-500'
                    },
                    {
                      role: t.experience.exp2Role,
                      org: t.experience.exp2Org,
                      desc: t.experience.exp2Desc,
                      accent: 'border-cyan-500/50'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="relative pl-12 group">
                      <div className={`absolute left-0 w-10 h-10 bg-slate-900 border-2 ${item.accent} rounded-full flex items-center justify-center z-10 transition-all`}> 
                        <span className="w-3 h-3 bg-cyan-500 rounded-full" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-200">{item.role}</h4>
                      <p className="text-cyan-400 mb-2 font-mono text-sm">{item.org}</p>
                      <p className="text-slate-400 text-sm leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-800/50 mt-2">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-400 mb-8 flex items-center gap-2">
                  <GraduationCap size={24} /> {t.experience.eduTitle}
                </h3>
                <div className="space-y-6">
                  {[
                    { year: '2024 - Present', title: t.experience.edu1, org: t.experience.edu1Org, active: true },
                    { year: '2021 - 2023', title: t.experience.edu2, org: t.experience.edu2Org, active: false },
                    { year: '2021', title: t.experience.edu3, org: t.experience.edu3Org, active: false }
                  ].map((edu, idx) => (
                    <div key={idx} className={`bg-slate-900/40 p-5 rounded-xl border transition-all duration-300 hover:-translate-x-2 ${edu.active ? 'border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'border-slate-800/80 hover:border-slate-600'}`}>
                      <p className={`text-sm mb-1 font-mono ${edu.active ? 'text-blue-400' : 'text-slate-500'}`}>{edu.year}</p>
                      <h4 className="text-lg font-bold text-slate-200">{edu.title}</h4>
                      <p className="text-slate-400 text-sm">{edu.org}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="awards" className="py-24 border-t border-slate-800/50">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100">{t.awards.title}</h2>
              <div className="h-px bg-slate-800 flex-1 mt-2" />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: t.awards.aw1, desc: t.awards.aw1Desc },
                { title: t.awards.aw2, desc: t.awards.aw2Desc },
                { title: t.awards.aw3, desc: t.awards.aw3Desc }
              ].map((award, idx) => (
                <div key={idx} className="flex gap-4 p-6 bg-slate-900/30 rounded-2xl border border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                  <div className="mt-1">
                    <Award className="text-yellow-500" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 mb-1">{award.title}</h4>
                    <p className="text-sm text-slate-400">{award.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="projects" className="py-24 border-t border-slate-800/50">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100">{t.projects.title}</h2>
              <div className="h-px bg-slate-800 flex-1 mt-2" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {projectCards.map((proj, idx) => (
                <div key={idx} className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800/60 hover:border-slate-600 transition-all hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                    <proj.icon size={120} />
                  </div>
                  <p className={`${proj.style.accentStrong} font-mono text-xs mb-2 tracking-wider uppercase`}>{proj.date}</p>
                  <h3 className="text-2xl font-bold text-slate-200 mb-2 group-hover:text-white transition-colors">{proj.title}</h3>
                  <p className="text-slate-500 mb-4 text-sm font-medium flex items-center gap-2">
                    <span className={`${proj.style.dot} w-1.5 h-1.5 rounded-full`} /> {proj.role}
                  </p>
                  <p className="text-slate-400 leading-relaxed text-sm relative z-10 group-hover:text-slate-300 transition-colors">{proj.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="labs" className="py-24 border-t border-slate-800/50">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100">{t.labs.title}</h2>
              <div className="h-px bg-slate-800 flex-1 mt-2 mx-4" />
              <button 
                onClick={() => {
                  setView('labs-page');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-full border border-slate-700 hover:border-purple-500/50 text-slate-400 hover:text-purple-400 text-sm font-bold flex items-center gap-2 transition-all group shrink-0"
              >
                {t.labs.readAll} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {labsItems.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={item.onClick}
                  className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800/60 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] group relative overflow-hidden cursor-pointer active:scale-95"
                >
                  <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 ${item.style.accent}`}>
                    <item.icon size={80} />
                  </div>
                  <div className={`w-12 h-12 rounded-2xl ${item.style.bg} flex items-center justify-center mb-6 shadow-inner border ${item.style.border}`}>
                    <item.icon size={24} className={item.style.accent} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-200 mb-3 group-hover:text-white transition-colors">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm relative z-10 group-hover:text-slate-300 transition-colors">{item.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-cyan-400 font-bold text-sm">
                    {lang === 'bn' ? 'আরও পরুন' : 'Explore'} <ChevronRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="py-24 border-t border-slate-800/50 text-center max-w-2xl mx-auto">
            <p className="text-cyan-400 font-mono mb-4 animate-pulse">{t.contact.next}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">{t.contact.title}</h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">{t.contact.desc}</p>
            <a href="mailto:connect.seeam@gmail.com" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-slate-900 border border-cyan-500 text-cyan-400 font-bold hover:bg-cyan-500 hover:text-slate-900 transition-all duration-300 mb-16 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:scale-105 active:scale-95">
              connect.seeam@gmail.com
            </a>
            <div className="flex flex-col items-center justify-center gap-4 text-slate-400">
              <p className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
                <Phone size={18} className="text-cyan-400 group-hover:animate-bounce" />
                +880 16500-78947, +880 964-9990004
              </p>
            </div>
          </section>
        </main>
      ) : (
        <div className="relative z-10 pt-20">
          <button 
            onClick={() => setView(view === 'ecom' ? 'labs-page' : 'portfolio')}
            className="fixed top-24 left-6 z-50 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-slate-300 hover:text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all shadow-lg"
          >
            <ArrowLeft size={18} /> {lang === 'bn' ? 'ফিরে যান' : 'Back'}
          </button>
          {view === 'ecom' ? <EcomToolkit /> : <SeeamLabs setView={setView} lang={lang} />}
        </div>
      )}


      <footer className="py-8 text-center text-slate-500 text-sm relative z-10 bg-slate-950/50 pb-36">
        <p className="_devCredit_40tm5_402 flex items-center justify-center gap-1.5">
          Crafted with <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart _heartInline_40tm5_411 text-red-500 fill-red-500" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path></svg> by <a href="https://seeam.vercel.app" target="_blank" rel="noopener noreferrer" className="_devName_40tm5_415 text-slate-300 hover:text-cyan-400 transition-colors font-medium">Seeam Rahman</a>
        </p>
        <p className="mt-2 font-mono text-xs opacity-50">© {new Date().getFullYear()} {t.contact.rights}</p>
      </footer>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-950/80 backdrop-blur-2xl border border-white/10 z-50 px-2 py-2 flex justify-around items-center shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] rounded-2xl w-[95%] max-w-lg transition-all duration-500 hover:border-cyan-500/30">
        <button
          onClick={() => {
            setView('portfolio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`relative flex flex-col items-center gap-1.5 px-2 py-1.5 rounded-xl transition-all duration-300 group ${view === 'portfolio' ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-400 hover:text-cyan-300 hover:bg-white/5'}`}
        >
          <Terminal size={20} className={`${view === 'portfolio' ? 'scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'group-hover:scale-110'} transition-transform`} />
          <span className="text-[9px] font-bold uppercase tracking-wider opacity-80 group-hover:opacity-100">{t.nav.home}</span>
        </button>
        
        <div className="h-8 w-px bg-slate-800/50 mx-1" />
 
         {navLinks.filter(l => l.id !== 'home').map((link) => (
           <a
             key={link.id}
             href={link.id === 'labs' ? '?v=seeam-labs' : (view === 'portfolio' ? `#${link.id}` : '#')}
             onClick={(e) => {
               if (link.id === 'labs') {
                 e.preventDefault();
                 setView('labs-page');
                 window.scrollTo({ top: 0, behavior: 'instant' });
                 return;
               }
               if (view !== 'portfolio') {
                 e.preventDefault();
                 setView('portfolio');
                 setTimeout(() => {
                   const el = document.getElementById(link.id);
                   el?.scrollIntoView({ behavior: 'smooth' });
                 }, 100);
               }
             }}
             className={`relative flex flex-col items-center gap-1.5 px-2 py-1.5 rounded-xl transition-all duration-300 group ${((activeSection === link.id && view === 'portfolio') || (link.id === 'labs' && (view === 'ecom' || view === 'labs-page'))) ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-400 hover:text-cyan-300 hover:bg-white/5'}`}
           >
             <link.icon size={20} className={`${((activeSection === link.id && view === 'portfolio') || (link.id === 'labs' && (view === 'ecom' || view === 'labs-page'))) ? 'scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'group-hover:scale-110'} transition-transform`} />
             <span className="text-[9px] font-bold uppercase tracking-wider opacity-80 group-hover:opacity-100">{link.name}</span>
           </a>
         ))}
       </div>

      <div className="fixed bottom-28 right-6 z-50 flex flex-col items-end gap-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`w-12 h-12 mb-2 bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:text-white shadow-lg transition-all duration-500 ${isScrolled ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0 pointer-events-none'}`}
          title="Scroll to Top"
        >
          <ArrowUp size={20} />
        </button>
        <div className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${isWidgetOpen ? 'scale-100 opacity-100 mb-2' : 'scale-0 opacity-0 pointer-events-none'}`}>
          <a href="https://wa.me/8801650078947" target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform" title="WhatsApp">
            <MessageCircle size={22} />
          </a>
          <a href="tel:+8801650078947" className="w-12 h-12 bg-[#00A3FF] rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(0,163,255,0.4)] hover:scale-110 transition-transform" title="Call">
            <Phone size={22} />
          </a>
          <a href="mailto:connect.seeam@gmail.com" className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:scale-110 transition-transform" title="Email">
            <Mail size={22} />
          </a>
        </div>
        <button
          onClick={() => setIsWidgetOpen((prev) => !prev)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 transition-all duration-300 bg-slate-800/90 backdrop-blur-md border border-slate-700 ${isWidgetOpen ? 'rotate-45 shadow-[0_0_20px_rgba(239,68,68,0.3)] border-red-500/50' : ''}`}
        >
          <Plus size={28} className={isWidgetOpen ? 'text-red-400' : 'text-cyan-400'} />
        </button>
      </div>
    </div>
  );
}
