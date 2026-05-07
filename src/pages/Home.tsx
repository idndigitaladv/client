/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from "react";
import { 
  Flame, 
  ShieldCheck, 
  Network, 
  ArrowRight, 
  ChevronRight,
  PhoneCall
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useContent } from "../hooks/useContent";

const IconMap: Record<string, any> = {
  Flame,
  ShieldCheck,
  Network,
};

const SectionHeading = ({ children, subtitle }: { children: ReactNode, subtitle?: string }) => (
  <div className="mb-12">
    {subtitle && (
      <span className="text-orange-600 font-bold uppercase text-xs tracking-widest mb-2 block">
        {subtitle}
      </span>
    )}
    <h2 className="text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
      {children}
    </h2>
    <div className="h-1 w-12 bg-orange-600 mt-4" />
  </div>
);

export default function Home() {
  const { content, loading } = useContent();

  if (loading || !content) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const { pillars, products, industries, contactInfo } = content;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row justify-between items-end gap-12 pb-16 pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-orange-600 font-bold uppercase text-xs tracking-widest mb-4 block">
              {content.hero.subtitle}
            </span>
            <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.1] tracking-tight">
              {content.hero.title}
            </h2>
            <p className="text-slate-600 text-xl leading-relaxed mb-10 max-w-xl">
              {content.hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-slate-900 text-white px-10 py-5 rounded font-bold uppercase text-sm tracking-widest flex items-center gap-3 hover:bg-slate-800 transition-all shadow-xl group"
              >
                Portofolio Produk
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/contact"
                className="bg-white border border-slate-300 text-slate-900 px-10 py-5 rounded font-bold uppercase text-sm tracking-widest hover:bg-slate-100 transition-all"
              >
                Konsultasi Teknis
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden lg:block text-right text-slate-400 text-sm italic font-serif max-w-[240px] pb-4"
          >
            "Standar global untuk daya tahan maksimal dan presisi teknis."
          </motion.div>
        </div>
      </section>

      {/* Pillars / Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.slice(0, 3).map((pillar: any, i: number) => {
              const Icon = IconMap[pillar.icon];
              return (
                <div 
                  key={i}
                  className="bg-white p-8 border border-slate-200 shadow-sm flex flex-col group hover:border-orange-200 transition-colors"
                >
                  <div className={`w-12 h-12 ${pillar.color} text-white flex items-center justify-center rounded mb-6`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-grow">
                    {pillar.description}
                  </p>
                  <Link to="/products" className="mt-auto text-orange-600 text-[10px] uppercase font-bold tracking-widest hover:underline flex items-center gap-1">
                    Detail Teknis <ChevronRight size={12} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section - Restored */}
      <section id="about" className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="bg-white p-2 border border-slate-200 shadow-xl overflow-hidden rounded">
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5f566fab?auto=format&fit=crop&q=80&w=1000" 
                alt="Industrial" 
                className="w-full grayscale brightness-75 hover:grayscale-0 transition-all duration-1000 rounded"
              />
            </div>
            <div>
              <SectionHeading subtitle="TENTANG KAMI">Reliability First: Standar Keamanan Tinggi.</SectionHeading>
              <p className="text-slate-600 mb-8 leading-relaxed">
                TOSAFENG (Total Safety Engineering) menyediakan ekosistem keselamatan terpadu yang mencakup perlindungan kebakaran, 
                keamanan fisik, dan infrastruktur data. Dengan pengalaman 10+ tahun, kami berfokus pada ketepatan teknis 
                dan keberlanjutan sistem untuk melindungi investasi Anda.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {[
                  "Technical Accuracy",
                  "Global Compliance",
                  "Premium Materials",
                  "Lifetime Support"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-600" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-900">{item}</span>
                  </div>
                ))}
              </div>

              <Link 
                to="/about"
                className="bg-slate-900 text-white px-8 py-4 rounded text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all inline-block"
              >
                Pelajari Filosofi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product categories section as approved */}
      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="PRODUCT PORTFOLIO">Katalog Utama Sistem Keamanan.</SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((prod: any, i: number) => (
              <div 
                key={i}
                className={`bg-white p-6 border border-slate-200 shadow-sm flex flex-col ${prod.category.includes('Infrastructure') || prod.category.includes('Specialized') ? 'border-l-4 border-l-orange-500' : ''}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                      {prod.brand}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">
                      {prod.category}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  {prod.description}
                </p>
                
                <ul className="text-[11px] font-semibold text-slate-700 space-y-3 mb-8">
                  {prod.items.map((item: any, j: number) => (
                    <li key={j} className="flex items-start gap-2">
                       <span className="w-1 h-1 bg-orange-500 shrink-0 mt-1.5"></span>
                       <div>
                          <span>{item.name}</span>
                          <p className="text-[9px] text-slate-400 font-normal uppercase tracking-tighter">{item.spec.split('.')[0]}</p>
                       </div>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to="/products"
                  className="mt-auto text-orange-600 text-[10px] uppercase font-bold tracking-wider hover:underline text-left"
                >
                  Detail Product
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Matrix - Bottom Bar Style */}
      <section id="solutions" className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-wrap gap-12">
               <div className="flex flex-col">
                  <span className="text-orange-400 text-[10px] uppercase font-bold mb-1 tracking-widest">Lokasi Operasional</span>
                  <span className="text-white text-sm">Latinos Business District, Tangsel</span>
               </div>
               <div className="flex flex-col border-l border-slate-800 pl-8">
                  <span className="text-orange-400 text-[10px] uppercase font-bold mb-1 tracking-widest">Keahlian Utama</span>
                  <span className="text-white text-sm">MEP & Global Security System</span>
               </div>
            </div>
            
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Siap Melayani:</span>
              <div className="flex gap-2">
                {industries.slice(0, 3).map((ind: any, i: number) => (
                  <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 text-[10px] rounded border border-slate-700 uppercase font-bold tracking-tighter">
                    {ind.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Replaced CTA with Contact Section for Home parity */}
      <section id="contact-home" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <SectionHeading subtitle="KONTAK">Konsultasi Teknis & Penawaran.</SectionHeading>
              <div className="space-y-8">
                <div className="p-6 bg-white border border-slate-200 shadow-sm flex gap-6 items-center">
                  <div className="bg-orange-50 p-4 rounded text-orange-600">
                    <PhoneCall size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">WhatsApp Fast Response</h4>
                    <p className="text-lg font-bold text-slate-900">{contactInfo.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 mb-8 uppercase tracking-tighter">Formulir Kirim Inkuiri</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <input className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:border-orange-500 outline-none transition-colors" placeholder="Nama Lengkap" />
                  <input className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:border-orange-500 outline-none transition-colors" placeholder="Perusahaan" />
                </div>
                <select className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:border-orange-500 outline-none transition-colors">
                  <option>Kebutuhan: Fire Alarm System</option>
                  <option>Kebutuhan: Hydrant Equipment</option>
                  <option>Kebutuhan: Security/CCTV</option>
                  <option>Lainnya</option>
                </select>
                <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:border-orange-500 outline-none transition-colors" placeholder="Pesan Teknis / Diskusi Proyek..." />
                <button className="w-full bg-orange-600 text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-orange-500 transition-all shadow-lg">
                  Kirim Permintaan Harga
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
