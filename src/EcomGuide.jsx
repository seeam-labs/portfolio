import { useState, useEffect, useRef } from "react";


/* ─── Data ──────────────────────────────────────────────────────────────────── */
const tools = [
    { name: "Meta Pixel", en: "Meta Pixel", feature: "Facebook/IG কনভার্সন ট্র্যাকিং", necessity: "ফেসবুক বিজ্ঞাপনের ROAS বাড়ায়, ভিজিটর আচরণ ট্র্যাক করে", cat: "tracking", price: "free", priority: "must", icon: "📡", roi: 320 },
    { name: "Google Analytics 4", en: "GA4", feature: "ট্রাফিক, ইভেন্ট ও ফানেল বিশ্লেষণ", necessity: "কাস্টমার কোথা থেকে আসছে — বিনামূল্যে জানুন", cat: "tracking", price: "free", priority: "must", icon: "📊", roi: 280 },
    { name: "Google Tag Manager", en: "GTM", feature: "একটি কনটেইনারে সব ট্যাগ ম্যানেজ", necessity: "কোড ছাড়াই সব ট্র্যাকিং ট্যাগ যোগ করুন", cat: "tracking", price: "free", priority: "must", icon: "🏷️", roi: 200 },
    { name: "Server Side Tracking", en: "SST", feature: "সার্ভার থেকে সরাসরি ডেটা পাঠানো", necessity: "iOS14+ ও Ad Blocker থেকে হারানো ডেটা পুনরুদ্ধার করে", cat: "tracking", price: "freemium", priority: "recommended", icon: "🖥️", roi: 180 },
    { name: "Facebook Conversions API", en: "CAPI", feature: "সার্ভার সাইড Meta ইভেন্ট ট্র্যাকিং", necessity: "ব্রাউজার ব্লকার এড়িয়ে Meta-তে সরাসরি ডেটা পাঠায়", cat: "tracking", price: "free", priority: "must", icon: "🔗", roi: 260 },
    { name: "Microsoft Clarity", en: "Clarity", feature: "হিটম্যাপ, সেশন রেকর্ডিং, ক্লিক ম্যাপ", necessity: "কাস্টমার কোথায় আটকে যাচ্ছে ভিজ্যুয়ালি দেখুন", cat: "tracking", price: "free", priority: "recommended", icon: "🗺️", roi: 150 },
    { name: "Google Search Console", en: "GSC", feature: "SEO পারফরম্যান্স, ইনডেক্সিং, কুয়েরি", necessity: "গুগলে কোন কীওয়ার্ডে ক্লিক আসছে বিনামূল্যে জানুন", cat: "marketing", price: "free", priority: "must", icon: "🔍", roi: 240 },
    { name: "Bangla Chat Replier (FB)", en: "Auto Replier", feature: "স্বয়ংক্রিয় বাংলায় মেসেজ রিপ্লাই", necessity: "২৪/৭ কাস্টমারের প্রশ্নের বাংলায় উত্তর, ম্যানপাওয়ার কমায়", cat: "marketing", price: "free", priority: "recommended", icon: "💬", roi: 130 },
    { name: "WhatsApp Business API", en: "WA API", feature: "বাল্ক মেসেজ, অর্ডার নোটিফিকেশন", necessity: "অর্ডার আপডেট সরাসরি WhatsApp-এ পাঠান", cat: "marketing", price: "freemium", priority: "must", icon: "📱", roi: 210 },
    { name: "Google Merchant Center", en: "GMC", feature: "প্রোডাক্ট ফিড, Google Shopping বিজ্ঞাপন", necessity: "গুগলে প্রোডাক্ট সরাসরি দেখান", cat: "marketing", price: "free", priority: "recommended", icon: "🛒", roi: 190 },
    { name: "Facebook / Instagram Ads", en: "Meta Ads", feature: "অডিয়েন্স টার্গেটিং, রিটার্গেটিং", necessity: "বাংলাদেশে সোশ্যাল মিডিয়া বিজ্ঞাপন সবচেয়ে কার্যকর", cat: "marketing", price: "paid", priority: "must", icon: "📣", roi: 350 },
    { name: "Mailchimp / Brevo", en: "Email Mktg", feature: "ইমেইল মার্কেটিং, অটোমেশন, নিউজলেটার", necessity: "পুরানো কাস্টমারকে রিটার্গেট করুন", cat: "marketing", price: "freemium", priority: "recommended", icon: "✉️", roi: 170 },
    { name: "Auto Call (Order Confirm)", en: "Auto Call", feature: "অর্ডার কনফার্মেশনের জন্য স্বয়ংক্রিয় কল", necessity: "নতুন অর্ডারে স্বয়ংক্রিয় কল — ফেক অর্ডার কমায়", cat: "operations", price: "freemium", priority: "must", icon: "📞", roi: 290 },
    { name: "Fake Order Management", en: "Fake Order", feature: "ভুয়া অর্ডার শনাক্ত ও ব্লক করা", necessity: "AI দিয়ে সন্দেহজনক অর্ডার আটকায়", cat: "operations", price: "freemium", priority: "must", icon: "🚫", roi: 400 },
    { name: "FraudGuard", en: "FraudGuard", feature: "আইপি রেপুটেশন, ফ্রড স্কোরিং", necessity: "সন্দেহজনক ব্যবহারকারী ব্লক করে", cat: "operations", price: "freemium", priority: "recommended", icon: "🛡️", roi: 220 },
    { name: "bKash / Nagad Gateway", en: "MFS Gateway", feature: "মোবাইল ব্যাংকিং পেমেন্ট", necessity: "বাংলাদেশে বেশিরভাগ কাস্টমার MFS ব্যবহার করে", cat: "operations", price: "freemium", priority: "must", icon: "💳", roi: 380 },
    { name: "SSL Commerz", en: "SSL Commerz", feature: "বহু পেমেন্ট মেথড এক গেটওয়েতে", necessity: "কার্ড, বিকাশ, নগদ সব পেমেন্ট এক জায়গায়", cat: "operations", price: "paid", priority: "must", icon: "🔐", roi: 360 },
    { name: "Courier API (Pathao/Steadfast)", en: "Courier API", feature: "ডেলিভারি ট্র্যাকিং অটোমেশন", necessity: "ডেলিভারি স্ট্যাটাস স্বয়ংক্রিয় আপডেট", cat: "operations", price: "free", priority: "must", icon: "🚚", roi: 230 },
    { name: "Inventory Management", en: "Inventory", feature: "স্টক ট্র্যাকিং, লো-স্টক অ্যালার্ট", necessity: "স্টক শেষ হলে স্বয়ংক্রিয় সতর্কতা", cat: "operations", price: "freemium", priority: "must", icon: "📦", roi: 200 },
    { name: "Zapier / Make", en: "Automation", feature: "অ্যাপ ইন্টিগ্রেশন, ওয়ার্কফ্লো", necessity: "বিভিন্ন টুলস কানেক্ট করে রিপিটিটিভ কাজ স্বয়ংক্রিয়", cat: "operations", price: "freemium", priority: "recommended", icon: "⚡", roi: 160 },
];

const wpTools = [
    { name: "WooCommerce", desc: "ওয়ার্ডপ্রেসের সেরা ই-কমার্স প্লাগইন", price: "free", priority: "must", icon: "🛍️" },
    { name: "Elementor / Divi", desc: "ড্র্যাগ-এন্ড-ড্রপ পেজ বিল্ডার", price: "freemium", priority: "must", icon: "🎨" },
    { name: "WP Rocket", desc: "ওয়েবসাইট স্পিড অপটিমাইজার", price: "paid", priority: "recommended", icon: "🚀" },
    { name: "Yoast SEO / RankMath", desc: "অন-পেজ SEO অপটিমাইজেশন", price: "freemium", priority: "must", icon: "📈" },
    { name: "WooCommerce PDF Invoice", desc: "অর্ডার ইনভয়েস স্বয়ংক্রিয় তৈরি", price: "freemium", priority: "recommended", icon: "🧾" },
    { name: "Wordfence Security", desc: "সাইবার আক্রমণ ও ম্যালওয়্যার প্রতিরোধ", price: "freemium", priority: "must", icon: "🔒" },
    { name: "UpdraftPlus", desc: "নিয়মিত ওয়েবসাইট ব্যাকআপ", price: "freemium", priority: "must", icon: "💾" },
    { name: "WC SMS Notification", desc: "অর্ডার স্ট্যাটাসে SMS পাঠায়", price: "freemium", priority: "recommended", icon: "📩" },
    { name: "bKash WooCommerce Gateway", desc: "বিকাশ পেমেন্ট সরাসরি WooCommerce-এ", price: "freemium", priority: "must", icon: "💚" },
    { name: "Abandoned Cart Recovery", desc: "কার্ট ছেড়ে যাওয়া কাস্টমারকে রিমাইন্ডার", price: "freemium", priority: "recommended", icon: "🛒" },
    { name: "BD Courier Plugin", desc: "Pathao, Steadfast, Paperfly ইন্টিগ্রেশন", price: "freemium", priority: "must", icon: "📦" },
    { name: "WPML / TranslatePress", desc: "বাংলা ও ইংরেজি বহুভাষিক সাইট", price: "paid", priority: "optional", icon: "🌐" },
];

const checklistItems = [
    { tool: "Meta Pixel ইনস্টল করা আছে", critical: true },
    { tool: "Google Analytics 4 (GA4) সেটআপ করা আছে", critical: true },
    { tool: "Google Tag Manager ব্যবহার করছেন", critical: true },
    { tool: "Facebook Conversions API (CAPI) চালু আছে", critical: true },
    { tool: "Server Side Tracking চালু আছে", critical: false },
    { tool: "Google Search Console কানেক্ট করা আছে", critical: true },
    { tool: "bKash / Nagad পেমেন্ট গেটওয়ে আছে", critical: true },
    { tool: "Fake Order ডিটেকশন সিস্টেম আছে", critical: true },
    { tool: "Courier API ইন্টিগ্রেশন করা আছে", critical: true },
    { tool: "WhatsApp অর্ডার নোটিফিকেশন চালু আছে", critical: false },
    { tool: "Abandoned Cart Recovery চালু আছে", critical: false },
    { tool: "ওয়েবসাইটের নিয়মিত ব্যাকআপ নেওয়া হচ্ছে", critical: true },
];

const workflowSteps = [
    { phase: "Phase 1", label: "ভিজিটর আসে", icon: "👤", color: "#3b82f6", tools: ["Facebook Ads", "Google Ads", "SEO / GSC"], desc: "বিজ্ঞাপন বা অর্গানিক সার্চের মাধ্যমে কাস্টমার ওয়েবসাইটে আসে। সঠিক টার্গেটিং ছাড়া বাজেট নষ্ট হয়।", arrow: true },
    { phase: "Phase 2", label: "ট্র্যাকিং শুরু", icon: "📡", color: "#06b6d4", tools: ["Meta Pixel", "GA4", "GTM", "CAPI"], desc: "প্রতিটি ক্লিক, স্ক্রল ও ইভেন্ট রেকর্ড হয়। Server Side Tracking নিশ্চিত করে কোনো ডেটা হারায় না।", arrow: true },
    { phase: "Phase 3", label: "অর্ডার প্লেস", icon: "🛒", color: "#8b5cf6", tools: ["WooCommerce", "SSL Commerz", "bKash/Nagad"], desc: "কাস্টমার পণ্য কার্টে যোগ করে পেমেন্ট দেয়। একাধিক পেমেন্ট অপশন কনভার্সন বাড়ায়।", arrow: true },
    { phase: "Phase 4", label: "ভেরিফিকেশন", icon: "✅", color: "#f59e0b", tools: ["Auto Call", "Fake Order Mgmt", "FraudGuard"], desc: "অর্ডার ভুয়া কিনা AI দিয়ে যাচাই হয়। কনফার্মেশন কল যায় — ফেক রিটার্ন শূন্যে নামে।", arrow: true },
    { phase: "Phase 5", label: "ডেলিভারি", icon: "🚚", color: "#10b981", tools: ["Courier API", "WhatsApp Notify", "SMS Gateway"], desc: "কুরিয়ারে পাঠানো হয়। কাস্টমার স্বয়ংক্রিয় ট্র্যাকিং আপডেট পায় — সাপোর্ট কল কমে।", arrow: true },
    { phase: "Phase 6", label: "রিটেনশন", icon: "💎", color: "#ec4899", tools: ["Email Mktg", "Abandoned Cart", "WhatsApp"], desc: "কাস্টমারকে আবার ফিরিয়ে আনা হয়। LTV বাড়ানোই দীর্ঘমেয়াদী লাভের চাবিকাঠি।", arrow: false },
];

/* ─── CSS ─────────────────────────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Exo+2:wght@300;400;600;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#020818;--card:rgba(8,28,74,0.48);--glass:rgba(6,20,60,0.58);
  --b0:rgba(56,139,253,0.14);--b1:rgba(56,139,253,0.4);
  --blue:#3b82f6;--cyan:#06b6d4;--purple:#8b5cf6;--pink:#ec4899;--green:#10b981;--amber:#f59e0b;
  --t1:#e2e8f0;--t2:#94a3b8;--t3:#475569;
  --glow-b:0 0 28px rgba(59,130,246,0.22);--glow-c:0 0 28px rgba(6,182,212,0.18);
}
.page{background:var(--bg);min-height:100vh;font-family:'Hind Siliguri',sans-serif;color:var(--t1);overflow-x:hidden}
.bg-orbs{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.orb{position:absolute;border-radius:50%;filter:blur(90px);opacity:.14;animation:fl 14s ease-in-out infinite}
.o1{width:600px;height:600px;background:radial-gradient(circle,#1d4ed8,transparent);top:-120px;right:5%;animation-delay:0s}
.o2{width:450px;height:450px;background:radial-gradient(circle,#06b6d4,transparent);bottom:10%;left:-120px;animation-delay:-5s}
.o3{width:350px;height:350px;background:radial-gradient(circle,#7c3aed,transparent);top:45%;right:-60px;animation-delay:-9s}
.o4{width:280px;height:280px;background:radial-gradient(circle,#ec4899,transparent);bottom:35%;right:30%;animation-delay:-3s}
@keyframes fl{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-28px) scale(1.04)}}
.wrap{position:relative;z-index:1}

/* hero */
.hero{text-align:center;padding:80px 20px 60px;max-width:920px;margin:0 auto}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.28);color:#60a5fa;padding:6px 20px;border-radius:99px;font-size:13px;margin-bottom:22px;backdrop-filter:blur(8px);font-family:'Exo 2',sans-serif}
.hero-badge::before{content:'';width:8px;height:8px;background:#3b82f6;border-radius:50%;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.5)}}
.hero-title{font-family:'Exo 2',sans-serif;font-size:clamp(1.9rem,5vw,3.4rem);font-weight:800;line-height:1.15;background:linear-gradient(135deg,#60a5fa 0%,#06b6d4 45%,#a78bfa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px}
.hero-sub{font-size:1rem;color:var(--t2);max-width:640px;margin:0 auto 40px;line-height:1.8}

/* stats */
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px;max-width:1100px;margin:0 auto 64px;padding:0 20px}
.stat{background:var(--card);border:1px solid var(--b0);backdrop-filter:blur(16px);border-radius:16px;padding:20px 14px;text-align:center;transition:transform .3s,border-color .3s,box-shadow .3s}
.stat:hover{transform:translateY(-4px);border-color:var(--b1);box-shadow:var(--glow-b)}
.stat-v{font-family:'Exo 2',sans-serif;font-size:1.75rem;font-weight:700;color:#60a5fa}
.stat-l{font-size:11.5px;color:var(--t2);margin-top:4px}

/* section */
.sec{max-width:1200px;margin:0 auto 80px;padding:0 20px}
.sec-lbl{display:inline-flex;align-items:center;gap:8px;font-family:'Exo 2',sans-serif;font-size:12px;letter-spacing:2px;color:var(--cyan);text-transform:uppercase;margin-bottom:10px}
.sec-lbl::before{content:'';width:24px;height:1px;background:var(--cyan)}
.sec-title{font-family:'Exo 2',sans-serif;font-size:clamp(1.35rem,3vw,2rem);font-weight:700;color:var(--t1);margin-bottom:6px}
.sec-title span{color:#60a5fa}
.sec-desc{font-size:14px;color:var(--t2);line-height:1.7;max-width:680px}

/* tabs */
.tabs{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:22px}
.tab{padding:8px 18px;border-radius:99px;font-size:13px;cursor:pointer;border:1px solid var(--b0);background:var(--card);color:var(--t2);transition:all .22s;font-family:'Hind Siliguri',sans-serif;backdrop-filter:blur(10px);white-space:nowrap}
.tab:hover{border-color:rgba(59,130,246,.35);color:#93c5fd}
.tab.on{background:linear-gradient(135deg,rgba(59,130,246,.28),rgba(6,182,212,.18));border-color:var(--blue);color:#60a5fa;font-weight:600;box-shadow:0 0 14px rgba(59,130,246,.18)}

/* filter bar */
.filter-row{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:12px}
.filter-group{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.fl{font-size:11px;color:var(--t3);font-family:'Exo 2',sans-serif;letter-spacing:1px;text-transform:uppercase;margin-right:2px;white-space:nowrap}
.chip{padding:5px 13px;border-radius:99px;font-size:12px;cursor:pointer;border:1px solid var(--b0);background:var(--card);color:var(--t2);transition:all .2s;font-family:'Hind Siliguri',sans-serif;backdrop-filter:blur(8px);white-space:nowrap}
.chip:hover{border-color:rgba(59,130,246,.35);color:#93c5fd}
.chip.on{background:linear-gradient(135deg,rgba(59,130,246,.25),rgba(6,182,212,.15));border-color:var(--blue);color:#60a5fa;font-weight:600;box-shadow:0 0 10px rgba(59,130,246,.15)}
.fsep{width:1px;height:22px;background:var(--b0);flex-shrink:0}

/* search + sort */
.search-sort{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-bottom:10px}
.srch-wrap{position:relative;flex:1;min-width:180px;max-width:320px}
.srch-icon{position:absolute;left:11px;top:50%;transform:translateY(-50%);color:var(--t3);pointer-events:none}
.srch{width:100%;padding:9px 14px 9px 34px;background:var(--card);border:1px solid var(--b0);border-radius:12px;color:var(--t1);font-size:13px;font-family:'Hind Siliguri',sans-serif;backdrop-filter:blur(10px);transition:border-color .25s,box-shadow .25s}
.srch:focus{outline:none;border-color:var(--blue);box-shadow:0 0 14px rgba(59,130,246,.18)}
.srch::placeholder{color:var(--t3)}
.sort-grp{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.sort-btn{padding:5px 12px;border-radius:8px;font-size:11px;cursor:pointer;border:1px solid var(--b0);background:transparent;color:var(--t3);transition:all .2s;font-family:'Exo 2',sans-serif;white-space:nowrap}
.sort-btn:hover,.sort-btn.on{border-color:rgba(59,130,246,.3);color:#60a5fa;background:rgba(59,130,246,.07)}
.res-count{font-size:12px;color:var(--t3);margin-bottom:16px;font-family:'Exo 2',sans-serif}

/* tool cards */
.tool-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
.tc{background:var(--card);border:1px solid var(--b0);backdrop-filter:blur(16px);border-radius:18px;padding:20px;transition:transform .3s,border-color .3s,box-shadow .3s;position:relative;overflow:hidden}
.tc::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(59,130,246,.5),transparent);opacity:0;transition:opacity .3s}
.tc:hover{transform:translateY(-5px);border-color:rgba(59,130,246,.4);box-shadow:var(--glow-b)}
.tc:hover::before{opacity:1}
.tc.must-tc{border-left:2px solid rgba(239,68,68,.38)}
.tc-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px}
.tc-in{display:flex;align-items:center;gap:10px}
.tc-ico{font-size:24px;flex-shrink:0}
.tc-name{font-family:'Exo 2',sans-serif;font-weight:600;font-size:14px;color:#e2e8f0}
.tc-en{font-size:11px;color:var(--t3);font-family:'Exo 2',sans-serif}
.tc-roi{font-family:'Exo 2',sans-serif;font-size:11px;color:#4ade80;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.2);padding:2px 8px;border-radius:99px;white-space:nowrap;flex-shrink:0}
.badges{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:8px}
.badge{padding:2px 9px;border-radius:99px;font-size:11px;font-weight:600;font-family:'Exo 2',sans-serif;white-space:nowrap}
.b-must{background:rgba(239,68,68,.13);color:#f87171;border:1px solid rgba(239,68,68,.28)}
.b-rec{background:rgba(59,130,246,.13);color:#60a5fa;border:1px solid rgba(59,130,246,.28)}
.b-opt{background:rgba(100,116,139,.12);color:#94a3b8;border:1px solid rgba(100,116,139,.25)}
.b-free{background:rgba(34,197,94,.1);color:#4ade80;border:1px solid rgba(34,197,94,.22)}
.b-paid{background:rgba(249,115,22,.1);color:#fb923c;border:1px solid rgba(249,115,22,.22)}
.b-fm{background:rgba(234,179,8,.1);color:#facc15;border:1px solid rgba(234,179,8,.22)}
.tc-feat{font-size:12px;color:var(--t2);margin-bottom:5px;font-weight:500}
.tc-nec{font-size:12px;color:var(--t3);line-height:1.5}
.no-res{text-align:center;padding:48px;color:var(--t3);font-size:14px}

/* workflow */
.wf-scroll{overflow-x:auto;padding-bottom:12px}
.wf-track{display:flex;align-items:stretch;min-width:max-content}
.wf-step{width:180px;flex-shrink:0;cursor:pointer}
.wf-conn{display:flex;align-items:center;padding-top:40px}
.wf-line{width:28px;height:2px;background:linear-gradient(90deg,rgba(59,130,246,.4),rgba(6,182,212,.4))}
.wf-head{width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:8px solid rgba(6,182,212,.5);margin-left:-1px}
.wf-card{background:var(--card);border:1px solid var(--b0);backdrop-filter:blur(14px);border-radius:16px;padding:18px 14px;transition:transform .3s,border-color .3s,box-shadow .3s;height:100%}
.wf-card:hover{transform:translateY(-5px)}
.wf-phase{font-family:'Exo 2',sans-serif;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px}
.wf-icon-wrap{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:10px}
.wf-lbl{font-family:'Exo 2',sans-serif;font-size:14px;font-weight:700;color:var(--t1);margin-bottom:6px}
.wf-desc{font-size:11px;color:var(--t3);line-height:1.5;margin-bottom:10px}
.wf-tools{display:flex;flex-direction:column;gap:4px}
.wf-tag{font-size:10px;padding:2px 8px;border-radius:6px;border:1px solid var(--b0);color:var(--t2);font-family:'Exo 2',sans-serif;width:fit-content}
.wf-detail{margin-top:14px;border-radius:14px;padding:18px 22px;transition:all .3s}

/* roi calc */
.roi-wrap{background:linear-gradient(135deg,rgba(16,185,129,.07),rgba(59,130,246,.07));border:1px solid rgba(16,185,129,.2);border-radius:24px;padding:36px 28px;position:relative;overflow:hidden;margin-bottom:20px}
.roi-wrap::before{content:'💰';position:absolute;font-size:120px;opacity:.04;right:-8px;top:-8px;pointer-events:none}
.roi-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start}
.roi-inputs{display:flex;flex-direction:column;gap:16px}
.roi-ig label{font-size:12px;color:var(--t2);margin-bottom:5px;display:block;font-family:'Exo 2',sans-serif;letter-spacing:.5px}
.roi-sl{width:100%;accent-color:#10b981;cursor:pointer}
.roi-vv{font-family:'Exo 2',sans-serif;font-size:13px;font-weight:700;color:#34d399;margin-left:10px}
.roi-res{background:rgba(0,0,0,.25);border-radius:16px;padding:22px;border:1px solid rgba(16,185,129,.15)}
.roi-big{font-family:'Exo 2',sans-serif;font-size:2.3rem;font-weight:800;background:linear-gradient(135deg,#34d399,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:4px}
.roi-lbl{font-size:13px;color:var(--t2);margin-bottom:18px}
.roi-row{display:flex;justify-content:space-between;align-items:center;font-size:13px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.05)}
.roi-row:last-child{border-bottom:none;font-weight:600;color:var(--t1)}
.roi-row span:first-child{color:var(--t2)}
.roi-row span:last-child{color:#34d399;font-family:'Exo 2',sans-serif;font-weight:600}

/* checklist */
.checklist{display:grid;grid-template-columns:repeat(auto-fill,minmax(268px,1fr));gap:10px}
.ci{display:flex;align-items:center;gap:12px;padding:13px 16px;background:var(--card);border:1px solid var(--b0);backdrop-filter:blur(12px);border-radius:12px;cursor:pointer;transition:all .25s;user-select:none}
.ci:hover{border-color:rgba(59,130,246,.3)}
.ci.done{border-color:rgba(16,185,129,.35);background:rgba(16,185,129,.05)}
.ci-box{width:22px;height:22px;border-radius:6px;border:1.5px solid var(--b1);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;transition:all .25s}
.ci.done .ci-box{background:#10b981;border-color:#10b981}
.ci-lbl{font-size:13px;color:var(--t2);flex:1}
.ci.done .ci-lbl{color:#6ee7b7;text-decoration:line-through;opacity:.8}
.ci-dot{width:6px;height:6px;border-radius:50%;background:#ef4444;flex-shrink:0}
.score-track{background:rgba(255,255,255,.05);border-radius:99px;height:14px;max-width:420px;margin:0 auto 12px;overflow:hidden}
.score-fill{height:100%;border-radius:99px;transition:width .7s ease;background:linear-gradient(90deg,#ef4444,#f97316,#10b981)}
.score-num{font-family:'Exo 2',sans-serif;font-size:2.2rem;font-weight:700}

/* danger */
.danger{background:linear-gradient(135deg,rgba(239,68,68,.07),rgba(249,115,22,.05));border:1px solid rgba(239,68,68,.22);border-radius:24px;padding:52px 36px;text-align:center;position:relative;overflow:hidden}
.danger::before{content:'⚠';position:absolute;font-size:220px;opacity:.025;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
.danger-title{font-family:'Exo 2',sans-serif;font-size:clamp(1.5rem,4vw,2.2rem);font-weight:800;color:#f87171;margin-bottom:14px}
.danger-sub{font-size:1rem;color:var(--t2);max-width:580px;margin:0 auto 36px;line-height:1.8}
.loss-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;max-width:800px;margin:0 auto 36px}
.loss-c{background:rgba(0,0,0,.3);border:1px solid rgba(239,68,68,.18);border-radius:16px;padding:20px 14px;backdrop-filter:blur(10px)}
.loss-v{font-family:'Exo 2',sans-serif;font-size:1.6rem;font-weight:700;margin-bottom:5px}
.loss-l{font-size:13px;color:var(--t2);margin-bottom:3px}
.loss-s{font-size:11px;color:var(--t3)}
.danger-list{background:rgba(0,0,0,.28);border-radius:16px;padding:20px 24px;max-width:680px;margin:0 auto;border:1px solid rgba(239,68,68,.15);text-align:left}
.dl-item{display:flex;gap:12px;align-items:flex-start;padding:8px 0;border-bottom:1px solid rgba(239,68,68,.08)}
.dl-item:last-child{border-bottom:none}

/* hire */
.hire{background:linear-gradient(135deg,rgba(59,130,246,.1),rgba(6,182,212,.07),rgba(139,92,246,.09));border:1px solid rgba(59,130,246,.22);border-radius:28px;padding:64px 36px;text-align:center;position:relative;overflow:hidden}
.hire::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(59,130,246,.07),transparent 60%);pointer-events:none}
.hire-tag{display:inline-block;background:linear-gradient(90deg,rgba(59,130,246,.22),rgba(6,182,212,.18));border:1px solid rgba(6,182,212,.38);color:var(--cyan);padding:6px 20px;border-radius:99px;font-size:13px;margin-bottom:22px;font-family:'Exo 2',sans-serif;letter-spacing:1px}
.hire-title{font-family:'Exo 2',sans-serif;font-size:clamp(1.5rem,4vw,2.6rem);font-weight:800;background:linear-gradient(135deg,#60a5fa,#06b6d4,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:14px;line-height:1.2}
.hire-sub{font-size:1rem;color:var(--t2);max-width:580px;margin:0 auto 40px;line-height:1.8}
.svc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;max-width:880px;margin:0 auto 40px;text-align:left}
.svc{background:rgba(6,20,60,.65);border:1px solid var(--b0);border-radius:16px;padding:18px;backdrop-filter:blur(12px);transition:transform .3s,border-color .3s;position:relative;z-index:1}
.svc:hover{transform:translateY(-4px);border-color:rgba(59,130,246,.38)}
.svc-icon{font-size:24px;margin-bottom:8px}
.svc-name{font-family:'Exo 2',sans-serif;font-size:14px;font-weight:600;color:#e2e8f0;margin-bottom:4px}
.svc-desc{font-size:12px;color:var(--t3);line-height:1.5}
.cta-row{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;position:relative;z-index:1}
.btn-p{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#2563eb,#0891b2);color:#fff;padding:14px 32px;border-radius:12px;font-size:15px;font-weight:600;font-family:'Exo 2',sans-serif;border:none;cursor:pointer;transition:transform .25s,box-shadow .25s;text-decoration:none;box-shadow:0 0 24px rgba(59,130,246,.32)}
.btn-p:hover{transform:translateY(-3px);box-shadow:0 0 36px rgba(59,130,246,.48)}
.btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(59,130,246,.1);color:#60a5fa;padding:14px 32px;border-radius:12px;font-size:15px;font-weight:600;font-family:'Exo 2',sans-serif;border:1px solid rgba(59,130,246,.28);cursor:pointer;transition:all .25s;text-decoration:none;backdrop-filter:blur(8px)}
.btn-s:hover{background:rgba(59,130,246,.18);border-color:rgba(59,130,246,.48);transform:translateY(-3px)}

/* wp */
.wp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px}
.wp-c{background:var(--card);border:1px solid var(--b0);backdrop-filter:blur(14px);border-radius:16px;padding:18px;transition:transform .3s,border-color .3s,box-shadow .3s}
.wp-c:hover{transform:translateY(-4px);border-color:rgba(59,130,246,.38);box-shadow:var(--glow-c)}
.wp-icon{font-size:26px;margin-bottom:8px}
.wp-name{font-family:'Exo 2',sans-serif;font-size:14px;font-weight:600;color:#e2e8f0;margin-bottom:6px}
.wp-desc{font-size:12px;color:var(--t3);line-height:1.5;margin-bottom:10px}
.wp-badges{display:flex;gap:6px;flex-wrap:wrap}
.divider{height:1px;background:linear-gradient(90deg,transparent,rgba(59,130,246,.28),transparent);margin:0 auto 80px;max-width:700px}

@media(max-width:760px){
  .tool-grid{grid-template-columns:1fr}
  .danger{padding:36px 18px}
  .hire{padding:40px 18px}
  .filter-row{flex-direction:column;align-items:flex-start}
}

/* Share Buttons */
.share-wrap{display:flex;gap:10px;justify-content:center;margin-top:32px;flex-wrap:wrap}
.share-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:12px;font-size:13px;font-weight:600;font-family:'Exo 2',sans-serif;cursor:pointer;transition:all .25s;backdrop-filter:blur(10px);border:1px solid var(--b0);color:var(--t1);background:var(--card);text-decoration:none}
.share-btn:hover{transform:translateY(-2px);border-color:var(--b1);box-shadow:var(--glow-b)}
.share-fb:hover{color:#1877f2;border-color:rgba(24,119,242,.4)}
.share-wa:hover{color:#25d366;border-color:rgba(37,211,102,.4)}
.share-copy.copied{color:#10b981;border-color:rgba(16,185,129,.4);background:rgba(16,185,129,.1)}
.toast{position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(100px);background:rgba(16,185,129,0.9);color:white;padding:12px 24px;border-radius:12px;font-size:14px;font-weight:600;z-index:999;transition:transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);backdrop-filter: blur(8px);border: 1px solid rgba(255, 255, 255, 0.2);}
.toast.show{transform:translateX(-50%) translateY(0);}
`;

/* ─── Badge helpers ─────────────────────────────────────────────────────────── */
const PB = ({ p }) => {
    if (p === "must") return <span className="badge b-must">🔴 অবশ্যই</span>;
    if (p === "recommended") return <span className="badge b-rec">🔵 প্রস্তাবিত</span>;
    return <span className="badge b-opt">⚪ ঐচ্ছিক</span>;
};
const PrB = ({ p }) => {
    if (p === "free") return <span className="badge b-free">ফ্রি</span>;
    if (p === "paid") return <span className="badge b-paid">পেইড</span>;
    return <span className="badge b-fm">ফ্রিমিয়াম</span>;
};

/* ─── Share Buttons ─────────────────────────────────────────────────────────── */
function ShareButtons() {
    const [copied, setCopied] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const url = typeof window !== 'undefined' ? window.location.href : 'https://seeam.vercel.app/ecom-guide';

    const copyLink = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setShowToast(true);
        setTimeout(() => {
            setCopied(false);
            setShowToast(false);
        }, 2500);
    };

    const shareFB = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    const shareWA = () => {
        window.open(`https://api.whatsapp.com/send?text=চেক্লিস্ট দেখুন: ${encodeURIComponent(url)}`, '_blank');
    };

    return (
        <div style={{ marginTop: 40, position: 'relative', zIndex: 10 }}>
            <div style={{ fontSize: 11, color: "var(--t3)", fontFamily: "'Exo 2',sans-serif", textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12, textAlign: 'center' }}>গাইডটি শেয়ার করুন</div>
            <div className="share-wrap" style={{ marginTop: 0 }}>
                <button className="share-btn share-fb" onClick={shareFB}>
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                    Facebook
                </button>
                <button className="share-btn share-wa" onClick={shareWA}>
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    WhatsApp
                </button>
                <button className={`share-btn share-copy${copied ? " copied" : ""}`} onClick={copyLink}>
                    {copied ? (
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    ) : (
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                    )}
                    {copied ? "লিঙ্ক কপিড!" : "লিঙ্ক কপি করুন"}
                </button>
            </div>
            <div className={`toast ${showToast ? 'show' : ''}`}>
                ✅ লিঙ্ক ক্লিপবোর্ডে কপি করা হয়েছে!
            </div>
        </div>
    );
}

/* ─── ROI Calculator ─────────────────────────────────────────────────────────── */
function ROICalc() {
    const [orders, setOrders] = useState(200);
    const [avgVal, setAvgVal] = useState(800);
    const [fakeRate, setFakeRate] = useState(20);
    const [adBudget, setAdBudget] = useState(15000);

    const fakeSaved = Math.round(orders * (fakeRate / 100) * avgVal * 0.7);
    const adSaved = Math.round(adBudget * 0.68 * 0.55);
    const convLift = Math.round(orders * 0.025 * avgVal);
    const total = fakeSaved + adSaved + convLift;

    const sliders = [
        { label: "মাসিক অর্ডার সংখ্যা", min: 50, max: 2000, step: 50, val: orders, set: setOrders, fmt: v => `${v} টি` },
        { label: "গড় অর্ডার মূল্য (৳)", min: 200, max: 5000, step: 100, val: avgVal, set: setAvgVal, fmt: v => `৳${v.toLocaleString()}` },
        { label: "অনুমানিত ফেক অর্ডার %", min: 5, max: 60, step: 5, val: fakeRate, set: setFakeRate, fmt: v => `${v}%` },
        { label: "মাসিক বিজ্ঞাপন বাজেট (৳)", min: 2000, max: 100000, step: 1000, val: adBudget, set: setAdBudget, fmt: v => `৳${v.toLocaleString()}` },
    ];

    return (
        <div className="roi-wrap">
            <div style={{ marginBottom: 24 }}>
                <div className="sec-lbl">ROI Simulator</div>
                <h3 className="sec-title" style={{ fontSize: "1.35rem" }}>আপনার ব্যবসায় <span>কত টাকা বাড়বে?</span></h3>
                <p className="sec-desc">স্লাইডার সরিয়ে আপনার ব্যবসার তথ্য দিন — দেখুন সঠিক টুলস দিয়ে কতটুকু লাভবান হবেন।</p>
            </div>
            <div className="roi-grid">
                <div className="roi-inputs">
                    {sliders.map(({ label, min, max, step, val, set, fmt }) => (
                        <div className="roi-ig" key={label}>
                            <label>{label}</label>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input type="range" className="roi-sl" min={min} max={max} step={step} value={val} onChange={e => set(+e.target.value)} style={{ flex: 1 }} />
                                <span className="roi-vv">{fmt(val)}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="roi-res">
                    <div className="roi-big">৳{total.toLocaleString()}</div>
                    <div className="roi-lbl">মাসিক অতিরিক্ত আয় / সাশ্রয়</div>
                    <div>
                        {[
                            { label: "ফেক অর্ডার থেকে বাঁচা", val: fakeSaved },
                            { label: "বিজ্ঞাপন অপচয় কমে", val: adSaved },
                            { label: "কনভার্সন রেট বৃদ্ধি", val: convLift },
                            { label: "মোট মাসিক সুবিধা", val: total },
                        ].map(r => (
                            <div className="roi-row" key={r.label}>
                                <span>{r.label}</span><span>৳{r.val.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(16,185,129,.08)", borderRadius: 10, border: "1px solid rgba(16,185,129,.2)" }}>
                        <div style={{ fontSize: 11, color: "#6ee7b7", fontFamily: "'Exo 2',sans-serif" }}>
                            📈 বার্ষিক সুবিধা: <strong style={{ fontSize: 14 }}>৳{(total * 12).toLocaleString()}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


/* ─── Workflow Section ──────────────────────────────────────────────────────── */
function WorkflowSection() {
    const [active, setActive] = useState(null);
    return (
        <div>
            <p className="sec-desc" style={{ marginBottom: 24 }}>একটি সফল ই-কমার্স ব্যবসার সম্পূর্ণ জীবনচক্র। প্রতিটি ধাপে ক্লিক করুন বিস্তারিত দেখতে।</p>
            <div className="wf-scroll">
                <div className="wf-track">
                    {workflowSteps.map((step, i) => (
                        <div key={step.phase} style={{ display: "flex", alignItems: "stretch" }}>
                            <div className="wf-step" onClick={() => setActive(active === i ? null : i)}>
                                <div className="wf-card" style={{ borderColor: active === i ? step.color + "88" : undefined, boxShadow: active === i ? `0 0 20px ${step.color}33` : undefined }}>
                                    <div className="wf-phase" style={{ color: step.color }}>{step.phase}</div>
                                    <div className="wf-icon-wrap" style={{ background: step.color + "22" }}>{step.icon}</div>
                                    <div className="wf-lbl">{step.label}</div>
                                    <div className="wf-desc">{step.desc}</div>
                                    <div className="wf-tools">
                                        {step.tools.map(t => (
                                            <div className="wf-tag" key={t} style={{ borderColor: step.color + "44", color: step.color + "cc" }}>{t}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {step.arrow && (
                                <div className="wf-conn">
                                    <div className="wf-line" /><div className="wf-head" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {active !== null && (
                <div className="wf-detail" style={{ background: workflowSteps[active].color + "0f", border: `1px solid ${workflowSteps[active].color}44` }}>
                    <div style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: 14, color: workflowSteps[active].color, marginBottom: 8 }}>
                        {workflowSteps[active].icon} {workflowSteps[active].label} — বিস্তারিত
                    </div>
                    <p style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.7, marginBottom: 12 }}>{workflowSteps[active].desc}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {workflowSteps[active].tools.map(t => (
                            <span key={t} style={{ padding: "4px 12px", borderRadius: 99, fontSize: 12, background: workflowSteps[active].color + "1a", border: `1px solid ${workflowSteps[active].color}55`, color: workflowSteps[active].color, fontFamily: "'Exo 2',sans-serif", fontWeight: 600 }}>{t}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ─── Tools Directory ─────────────────────────────────────────────────────────── */
function ToolsDirectory() {
    const [tab, setTab] = useState("all");
    const [search, setSearch] = useState("");
    const [filterPrice, setFilterPrice] = useState("all");
    const [filterPriority, setFilterPriority] = useState("all");
    const [sort, setSort] = useState("default");

    const mainTabs = [
        { id: "all", label: "সব টুলস" },
        { id: "tracking", label: "📡 ট্র্যাকিং" },
        { id: "marketing", label: "📣 মার্কেটিং" },
        { id: "operations", label: "⚙️ অপারেশন" },
        { id: "wordpress", label: "🔷 WordPress" },
    ];

    let data = tools.filter(t => {
        const matchCat = tab === "all" || t.cat === tab;
        const matchPrice = filterPrice === "all" || t.price === filterPrice;
        const matchPriority = filterPriority === "all" || t.priority === filterPriority;
        const q = search.toLowerCase();
        const matchSearch = !q || t.name.toLowerCase().includes(q) || t.en.toLowerCase().includes(q) || t.feature.toLowerCase().includes(q) || t.necessity.toLowerCase().includes(q);
        return matchCat && matchPrice && matchPriority && matchSearch;
    });

    if (sort === "roi") data = [...data].sort((a, b) => b.roi - a.roi);
    else if (sort === "name") data = [...data].sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "must") data = [...data].sort((a, b) => (a.priority === "must" ? -1 : 1));

    return (
        <>
            <div className="tabs">
                {mainTabs.map(t => (
                    <button key={t.id} className={`tab${tab === t.id ? " on" : ""}`} onClick={() => { setTab(t.id); setSearch(""); setFilterPrice("all"); setFilterPriority("all"); }}>{t.label}</button>
                ))}
            </div>

            {tab !== "wordpress" && (
                <>
                    <div className="filter-row">
                        <div className="filter-group">
                            <span className="fl">মূল্য:</span>
                            {[["all", "সব"], ["free", "ফ্রি"], ["freemium", "ফ্রিমিয়াম"], ["paid", "পেইড"]].map(([v, l]) => (
                                <button key={v} className={`chip${filterPrice === v ? " on" : ""}`} onClick={() => setFilterPrice(v)}>{l}</button>
                            ))}
                        </div>
                        <div className="fsep" />
                        <div className="filter-group">
                            <span className="fl">গুরুত্ব:</span>
                            {[["all", "সব"], ["must", "অবশ্যই"], ["recommended", "প্রস্তাবিত"], ["optional", "ঐচ্ছিক"]].map(([v, l]) => (
                                <button key={v} className={`chip${filterPriority === v ? " on" : ""}`} onClick={() => setFilterPriority(v)}>{l}</button>
                            ))}
                        </div>
                    </div>

                    <div className="search-sort">
                        <div className="srch-wrap">
                            <svg className="srch-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><circle cx="8.5" cy="8.5" r="5.5" /><line x1="13" y1="13" x2="18" y2="18" /></svg>
                            <input className="srch" placeholder="টুল খুঁজুন..." value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <div className="sort-grp">
                            <span style={{ fontSize: 11, color: "var(--t3)", fontFamily: "'Exo 2',sans-serif" }}>সাজান:</span>
                            {[["default", "ডিফল্ট"], ["must", "গুরুত্ব"], ["roi", "ROI"], ["name", "নাম"]].map(([v, l]) => (
                                <button key={v} className={`sort-btn${sort === v ? " on" : ""}`} onClick={() => setSort(v)}>{l}</button>
                            ))}
                        </div>
                    </div>

                    <div className="res-count">{data.length}টি টুল দেখাচ্ছে</div>
                    {data.length === 0 ? (
                        <div className="no-res">কোনো টুল পাওয়া যায়নি। ফিল্টার পরিবর্তন করুন।</div>
                    ) : (
                        <div className="tool-grid">
                            {data.map(t => (
                                <div key={t.name} className={`tc${t.priority === "must" ? " must-tc" : ""}`}>
                                    <div className="tc-top">
                                        <div className="tc-in">
                                            <span className="tc-ico">{t.icon}</span>
                                            <div><div className="tc-name">{t.name}</div><div className="tc-en">{t.en}</div></div>
                                        </div>
                                        <span className="tc-roi">ROI {t.roi}%</span>
                                    </div>
                                    <div className="badges"><PB p={t.priority} /><PrB p={t.price} /></div>
                                    <div className="tc-feat">✦ {t.feature}</div>
                                    <div className="tc-nec">{t.necessity}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {tab === "wordpress" && (
                <div className="wp-grid">
                    {wpTools.map(t => (
                        <div className="wp-c" key={t.name}>
                            <div className="wp-icon">{t.icon}</div>
                            <div className="wp-name">{t.name}</div>
                            <div className="wp-desc">{t.desc}</div>
                            <div className="wp-badges"><PB p={t.priority} /><PrB p={t.price} /></div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

/* ─── Main Export ─────────────────────────────────────────────────────────────── */
export default function EcommerceTools() {
    const [checked, setChecked] = useState({});
    const checkedCount = Object.values(checked).filter(Boolean).length;
    const scorePct = Math.round((checkedCount / checklistItems.length) * 100);

    useEffect(() => {
        // Update Title
        const prevTitle = document.title;
        document.title = "Ecom Guide | SME E-Commerce Toolkit 2025 by Seeam Rahman";

        // Update Meta Description
        const metaDesc = document.querySelector('meta[name="description"]');
        const prevDesc = metaDesc ? metaDesc.getAttribute('content') : '';
        if (metaDesc) metaDesc.setAttribute('content', 'বাংলাদেশের SME ই-কমার্সের জন্য সম্পূর্ণ টুলস ডিরেক্টরি, ওয়ার্কফ্লো, ROI ক্যালকুলেটর এবং ইন্টারেক্টিভ বিশ্লেষণ।');

        // Update OG Image (Thumbnail)
        const ogImage = document.querySelector('meta[property="og:image"]');
        const prevOg = ogImage ? ogImage.getAttribute('content') : '';
        if (ogImage) ogImage.setAttribute('content', '/ecom-guide-thumbnail.png');

        // Update Twitter Image
        const twImage = document.querySelector('meta[property="twitter:image"]');
        const prevTw = twImage ? twImage.getAttribute('content') : '';
        if (twImage) twImage.setAttribute('content', '/ecom-guide-thumbnail.png');

        return () => {
            document.title = prevTitle;
            if (metaDesc) metaDesc.setAttribute('content', prevDesc);
            if (ogImage) ogImage.setAttribute('content', prevOg);
            if (twImage) twImage.setAttribute('content', prevTw);
        };
    }, []);

    const services = [
        { icon: "🛒", name: "E-Commerce সেটআপ", desc: "WooCommerce / Custom React ই-কমার্স" },
        { icon: "📡", name: "ট্র্যাকিং সেটআপ", desc: "Pixel, GA4, GTM, CAPI ইন্টিগ্রেশন" },
        { icon: "⚙️", name: "Automation", desc: "Fake Order, Auto Call, Courier API" },
        { icon: "💳", name: "Payment Gateway", desc: "bKash, Nagad, SSL Commerz সেটআপ" },
        { icon: "📱", name: "React Web App", desc: "প্রফেশনাল React / Next.js ওয়েব অ্যাপ" },
        { icon: "🚀", name: "Speed & SEO", desc: "Core Web Vitals ও On-page SEO" },
    ];

    return (
        <>
            <style>{css}</style>
            <div className="page">
                <div className="bg-orbs">
                    <div className="orb o1" /><div className="orb o2" /><div className="orb o3" /><div className="orb o4" />
                </div>

                <div className="wrap">
                    {/* ── HERO ── */}
                    <div className="hero">
                        <div className="hero-badge">SME E-Commerce Toolkit 2025</div>
                        <h1 className="hero-title">ই-কমার্স ব্যবসার জন্য<br />অপরিহার্য টুলস গাইড</h1>
                        <p className="hero-sub">বাংলাদেশের SME ই-কমার্সের জন্য সম্পূর্ণ টুলস ডিরেক্টরি, ওয়ার্কফ্লো, ROI ক্যালকুলেটর এবং ইন্টারেক্টিভ বিশ্লেষণ।</p>
                        <ShareButtons />
                    </div>

                    {/* ── STATS ── */}
                    <div className="stats">
                        {[
                            { v: tools.length + "+", l: "মোট টুলস" },
                            { v: tools.filter(t => t.priority === "must").length, l: "অবশ্যই দরকার" },
                            { v: tools.filter(t => t.price === "free").length, l: "বিনামূল্যে" },
                            { v: wpTools.length, l: "WordPress প্লাগইন" },
                            { v: "৳৩ লাখ+", l: "বার্ষিক সম্ভাব্য লাভ" },
                            { v: "৬৮%", l: "বিজ্ঞাপন অপচয় কমে" },
                        ].map(s => (
                            <div className="stat" key={s.l}><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>
                        ))}
                    </div>

                    {/* ── TOOLS DIRECTORY ── */}
                    <div className="sec">
                        <div className="sec-lbl">Tools Directory</div>
                        <h2 className="sec-title">সম্পূর্ণ <span>টুলস ডিরেক্টরি</span></h2>
                        <p className="sec-desc">ক্যাটাগরি, মূল্য ও গুরুত্ব অনুযায়ী ফিল্টার করুন। ROI স্কোর দেখে সিদ্ধান্ত নিন।</p>
                        <div style={{ marginTop: 24 }}><ToolsDirectory /></div>
                    </div>

                    <div className="divider" />

                    {/* ── WORKFLOW ── */}
                    <div className="sec">
                        <div className="sec-lbl">E-Commerce Workflow</div>
                        <h2 className="sec-title">সম্পূর্ণ <span>ওয়ার্কফ্লো</span> ম্যাপ</h2>
                        <WorkflowSection />
                    </div>

                    <div className="divider" />

                    {/* ── ROI SIMULATOR ── */}
                    <div className="sec">
                        <ROICalc />
                    </div>


                    <div className="divider" />

                    {/* ── CHECKLIST ── */}
                    <div className="sec">
                        <div className="sec-lbl">Business Audit</div>
                        <h2 className="sec-title">আপনার ব্যবসা কি <span>প্রস্তুত?</span></h2>
                        <p className="sec-desc" style={{ marginBottom: 24 }}>
                            নিচের চেকলিস্টে টিক দিন — স্কোর দেখুন। <span style={{ color: "#ef4444", fontSize: 12 }}>🔴 = জরুরি</span>
                        </p>
                        <div className="checklist">
                            {checklistItems.map((item, i) => (
                                <div key={i} className={`ci${checked[i] ? " done" : ""}`} onClick={() => setChecked(p => ({ ...p, [i]: !p[i] }))}>
                                    <div className="ci-box">{checked[i] ? "✓" : ""}</div>
                                    {item.critical && !checked[i] && <div className="ci-dot" />}
                                    <span className="ci-lbl">{item.tool}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ textAlign: "center", marginTop: 32 }}>
                            <div style={{ fontSize: 14, color: "var(--t2)", marginBottom: 8 }}>আপনার ব্যবসার প্রস্তুতি স্কোর</div>
                            <div className="score-track"><div className="score-fill" style={{ width: `${scorePct}%` }} /></div>
                            <div className="score-num" style={{ color: scorePct < 40 ? "#ef4444" : scorePct < 70 ? "#facc15" : "#10b981" }}>{scorePct}%</div>
                            <p style={{ color: "var(--t2)", fontSize: 13, marginTop: 8 }}>
                                {scorePct < 40 ? "⚠️ আপনার ব্যবসা বড় ঝুঁকিতে! এখনই পদক্ষেপ নিন।" : scorePct < 70 ? "📈 মোটামুটি ভালো, কিন্তু আরও উন্নতি দরকার।" : "✅ চমৎকার! আপনার ব্যবসা ভালোভাবে প্রস্তুত।"}
                            </p>
                        </div>
                    </div>

                    <div className="divider" />

                    {/* ── DANGER ── */}
                    <div style={{ maxWidth: 1200, margin: "0 auto 80px", padding: "0 20px" }}>
                        <div className="danger">
                            <h2 className="danger-title">⚠️ এই টুলস ছাড়া আপনার ব্যবসা কি সত্যিই চলবে?</h2>
                            <p className="danger-sub">প্রতিদিন হাজারো বাংলাদেশি ই-কমার্স ব্যবসা এই ভুলগুলো করছে — লক্ষ লক্ষ টাকা হারাচ্ছে।</p>
                            <div className="loss-grid">
                                {[
                                    { label: "ফেক অর্ডারে গড় ক্ষতি", value: "৳৪৫,০০০+", sub: "প্রতি মাসে", color: "#ef4444" },
                                    { label: "বিজ্ঞাপন বাজেট অপচয়", value: "৬৮%", sub: "ট্র্যাকিং ছাড়া", color: "#f97316" },
                                    { label: "কনভার্সন রেট (টুলস ছাড়া)", value: "১.২%", sub: "গড় ৩.৫% হওয়া উচিত", color: "#eab308" },
                                    { label: "বার্ষিক সুযোগ হানি", value: "৳৩ লাখ+", sub: "প্রতি ব্যবসায়", color: "#ef4444" },
                                ].map(s => (
                                    <div className="loss-c" key={s.label}>
                                        <div className="loss-v" style={{ color: s.color }}>{s.value}</div>
                                        <div className="loss-l">{s.label}</div>
                                        <div className="loss-s">{s.sub}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="danger-list">
                                {[
                                    "Meta Pixel ছাড়া প্রতি ১০০ টাকা বিজ্ঞাপনে ৬৮ টাকাই নষ্ট হচ্ছে",
                                    "CAPI ছাড়া iOS ব্যবহারকারীদের ৩০-৪০% কনভার্সন ডেটা হারিয়ে যাচ্ছে",
                                    "Fake Order ডিটেকশন ছাড়া প্রতি মাসে গড়ে ৪৫,০০০+ টাকা ডেলিভারি খরচ নষ্ট",
                                    "Courier API ছাড়া কাস্টমার সার্ভিসে অতিরিক্ত সময় ও অর্থ খরচ হচ্ছে",
                                    "Inventory ম্যানেজমেন্ট ছাড়া ওভার-সেল ও আন্ডার-স্টক সমস্যা লেগেই থাকে",
                                ].map((item, i) => (
                                    <div className="dl-item" key={i}>
                                        <span style={{ color: "#ef4444", fontSize: 16, flexShrink: 0 }}>✗</span>
                                        <span style={{ fontSize: 13, color: "#fca5a5", lineHeight: 1.5 }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                            <p style={{ color: "#f87171", fontFamily: "'Exo 2',sans-serif", fontSize: "1.05rem", fontWeight: 700, marginTop: 28 }}>
                                প্রতিটি দিন দেরি মানে প্রতিযোগীরা আরও এগিয়ে যাচ্ছে।
                            </p>
                        </div>
                    </div>

                    {/* ── HIRE ME ── */}
                    <div style={{ maxWidth: 1200, margin: "0 auto 40px", padding: "0 20px" }}>
                        <div className="hire">
                            <div className="hire-tag">🚀 Available for Projects</div>
                            <h2 className="hire-title">আপনার ব্যবসাকে পরবর্তী<br />স্তরে নিয়ে যেতে প্রস্তুত?</h2>
                            <p className="hire-sub">আমি Seeam Rahman — প্রযুক্তি উদ্যোক্তা ও সফটওয়্যার ডেভেলপার। ই-কমার্স টুলস সেটআপ থেকে কাস্টম React Web App — সবকিছু করি।</p>
                            <div className="svc-grid">
                                {services.map(s => (
                                    <div className="svc" key={s.name}>
                                        <div className="svc-icon">{s.icon}</div>
                                        <div className="svc-name">{s.name}</div>
                                        <div className="svc-desc">{s.desc}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="cta-row">
                                <a href="https://wa.me/8801650078947" className="btn-p">📩 আমাকে হায়ার করুন</a>
                                <a href="https://seeam.vercel.app" className="btn-s" target="_blank" rel="noopener noreferrer">🌐 পোর্টফোলিও দেখুন</a>
                            </div>
                            <p style={{ color: "var(--t3)", fontSize: 12, marginTop: 22, position: "relative", zIndex: 1 }}>
                                React · Next.js · WooCommerce · Meta Pixel · GA4 · GTM · CAPI · Payment Gateway
                            </p>
                        </div>
                    </div>

                    <div style={{ padding: '0 20px', marginBottom: 80 }}>
                        <ShareButtons />
                    </div>

                    <div style={{ height: 60 }} />
                </div>
            </div>
        </>
    );
}