import React, { useState } from 'react';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  LayoutDashboard, 
  ArrowLeft,
  Search,
  Filter,
  Zap,
  Globe,
  MonitorSmartphone,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const labsData = [
  {
    id: 'ecom-toolkit',
    title: 'E-commerce Toolkit 2025',
    bnTitle: 'ই-কমার্স টুলকিট ২০২৫',
    description: 'A complete interactive directory of essential tools, workflows, and ROI calculators for SME e-commerce in Bangladesh.',
    bnDescription: 'বাংলাদেশের SME ই-কমার্সের জন্য প্রয়োজনীয় টুলস ডিরেক্টরি, ওয়ার্কফ্লো এবং ROI ক্যালকুলেটর।',
    icon: LayoutDashboard,
    tags: ['Interactive', 'Business', 'Tools'],
    status: 'Live',
    path: 'ecom-toolkit',
    color: 'from-purple-500 to-indigo-600',
    accent: 'text-purple-400'
  },
  // Future items can be added here
];

export default function SeeamLabs({ setView, lang }) {
  const [copiedId, setCopiedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopyLink = (id) => {
    const url = `${window.location.origin}${window.location.pathname}?page=${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const filteredLabs = labsData.filter(item => {
    const content = lang === 'bn' ? (item.bnTitle + item.bnDescription) : (item.title + item.description);
    return content.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans pb-20">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[130px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[130px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-600/[0.03] blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="py-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-800/50 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 border border-purple-500/30 text-[10px] font-black uppercase tracking-widest mb-2 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              <Zap size={14} className="animate-pulse" />
              {lang === 'bn' ? 'সৃজনশীল উদ্ভাবন' : 'Innovation Hub'}
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              {lang === 'bn' ? 'সিয়াম ' : 'Seeam '} 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-500">
                {lang === 'bn' ? 'ল্যাবস' : 'Labs'}
              </span>
            </h1>
            <p className="text-slate-400 max-w-xl text-lg md:text-xl font-medium leading-relaxed">
              {lang === 'bn' 
                ? 'আমার তৈরি করা সকল ইন্টারেক্টিভ টুলস এবং এক্সপেরিমেন্টাল প্রজেক্টগুলোর একটি শোরুম।' 
                : 'A premium showroom of experimental digital experiences and utility-focused labs.'}
            </p>
          </div>

          <div className="flex items-center gap-4">
             <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-purple-400" size={18} />
                <input 
                  type="text" 
                  placeholder={lang === 'bn' ? 'ল্যাব প্রজেক্ট খুঁজুন...' : 'Search lab projects...'}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 w-full md:w-64 focus:outline-none focus:border-purple-500/50 transition-all text-sm backdrop-blur-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
          </div>
        </header>

        {/* Categories / Filters (Optional for future) */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {['All Projects', 'Interactive Guides', 'Tools', 'SaaS', 'Experiments'].map((cat, i) => (
            <button key={i} className="px-4 py-2 rounded-full bg-slate-900/40 border border-slate-800 text-xs font-medium hover:border-slate-600 transition-colors whitespace-nowrap">
              {cat}
            </button>
          ))}
        </div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.length > 0 ? (
            filteredLabs.map((lab) => (
              <div 
                key={lab.id} 
                onClick={() => {
                  setView(lab.path === 'ecom-toolkit' ? 'ecom' : lab.path);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="group relative bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(139,92,246,0.3)] flex flex-col h-full cursor-pointer active:scale-[0.98]"
              >
                {/* Visual Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${lab.color} opacity-[0.03] group-hover:opacity-10 transition-opacity rounded-bl-full rounded-tr-3xl -z-10`} />

                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 group-hover:border-purple-500/30 transition-colors ${lab.accent}`}>
                    <lab.icon size={28} />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyLink(lab.id);
                      }}
                      className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all active:scale-95 tooltip relative z-20"
                      title="Copy Link"
                    >
                      {copiedId === lab.id ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                    </button>
                    <div 
                      className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all active:scale-95"
                      title="Open in Browser"
                    >
                      <ExternalLink size={18} />
                    </div>
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                      {lang === 'bn' ? lab.bnTitle : lab.title}
                    </h3>
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" title="Live" />
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3 group-hover:text-slate-300 transition-colors">
                    {lang === 'bn' ? lab.bnDescription : lab.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-800/50">
                  <div className="flex gap-2">
                    {lab.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-800/30 px-2 py-0.5 rounded-md border border-slate-800/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div 
                    className="flex items-center gap-1 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-widest group/btn"
                  >
                    {lang === 'bn' ? 'ল্যাব দেখুন' : 'Explore'}
                    <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
               <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-slate-900 border border-slate-800 mb-4">
                 <Search size={24} className="text-slate-600" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
               <p className="text-slate-500">Try adjusting your search query.</p>
            </div>
          )}
        </div>

        {/* Future Lab Idea Section */}
        <div className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-950 border border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
           <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-purple-600/5 blur-[80px]" />
           
           <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2">Have a project idea for the lab?</h2>
              <p className="text-slate-400">I'm always looking for innovative ideas to build and experiment with.</p>
           </div>
           
           <a 
            href="mailto:connect.seeam@gmail.com" 
            className="relative z-10 px-8 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-500 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20"
           >
             Send Idea
           </a>
        </div>
      </div>
    </div>
  );
}
