/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from "react";
import { 
  Building2, 
  Factory, 
  Stethoscope, 
  Ship,
  Hotel,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { INDUSTRIES } from "../constants";

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

const industryDetails = [
  {
    name: "Perkantoran & High-Rise",
    desc: "Keamanan akses dan proteksi kebakaran gedung bertingkat. Fokus pada integrasi sistem alarm kebakaran alamat (addressable) untuk evakuasi cepat dan kontrol akses biometrik.",
    icon: Building2,
    features: ["Addressable Fire Alarm", "Biometric Access", "CCTV AI Recognition"]
  },
  {
    name: "Pabrik & Gudang",
    desc: "Sistem hidran kapasitas besar dan pengawasan perimeter. Solusi untuk area luas dengan risiko kebakaran tinggi dan kebutuhan proteksi material berharga.",
    icon: Factory,
    features: ["Heavy Duty Hydrant Systems", "Perimeter Surveillance", "Flame Detectors"]
  },
  {
    name: "Institusi Medis & RS",
    desc: "Nurse call system dan sistem komunikasi darurat. Keamanan teknis untuk area steril dan sistem bantuan pasien yang tidak boleh gagal.",
    icon: Stethoscope,
    features: ["Nurse Call System", "Sterile Area Access", "Emergency Sound Cloud"]
  },
  {
    name: "Apartemen & Residensial",
    desc: "Integrasi sistem keamanan dan fire alarm untuk hunian massal. Mengutamakan kemudahan operasional bagi pengelola gedung dan ketenangan bagi penghuni.",
    icon: Hotel,
    features: ["Integrated Fire Control", "Resident Entry Monitoring", "Smart Intercom"]
  },
  {
    name: "Galangan Kapal & Maritim",
    desc: "Peralatan tahan korosi untuk lingkungan maritim yang ekstrem. Fokus pada standar keselamatan pelayaran dan daya tahan material terhadap salinitas tinggi.",
    icon: Ship,
    features: ["Corrosion-Resistant Valves", "Marine Certified Sensors", "Rapid Suppression"]
  }
];

export default function Solutions() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="SOLUSI KHUSUS INDUSTRI">Keahlian Lintas Sektor.</SectionHeading>
          <p className="max-w-3xl text-xl text-slate-600 leading-relaxed">
            Setiap industri memiliki tantangan keamanan yang unik. Kami merancang solusi yang 
            disesuaikan secara spesifik dengan regulasi dan risiko operasional di bidang Anda.
          </p>
        </div>
      </section>

      {/* Solutions Detail */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-24">
            {industryDetails.map((ind, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
                <div className="lg:w-1/2">
                   <div className="w-16 h-16 bg-orange-600 text-white rounded-lg flex items-center justify-center shadow-lg mb-8">
                      <ind.icon size={32} />
                   </div>
                   <h3 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">{ind.name}</h3>
                   <p className="text-slate-600 text-lg leading-relaxed mb-8">
                      {ind.desc}
                   </p>
                   <div className="space-y-3 mb-10">
                      {ind.features.map((feat, j) => (
                        <div key={j} className="flex items-center gap-3">
                           <div className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                           <span className="text-sm font-bold uppercase tracking-widest text-slate-700">{feat}</span>
                        </div>
                      ))}
                   </div>
                   <Link to="/contact" className="inline-flex items-center gap-2 text-orange-600 font-bold uppercase text-xs tracking-widest hover:translate-x-1 transition-transform">
                      Konsultasi Proyek Ini <ArrowRight size={16} />
                   </Link>
                </div>
                <div className="lg:w-1/2 w-full aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group">
                   <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/10 transition-colors duration-700" />
                   <img src={`https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000&sig=${i}`} alt={ind.name} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Matrix Summary */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <SectionHeading subtitle="TECHNICAL COMPLIANCE">Kesesuaian Standar & Sertifikasi.</SectionHeading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["SNI DIN 14462", "NFPA 13/14/20", "EN54 Standard", "UL/FM Listed"].map((std, i) => (
              <div key={i} className="p-8 border border-white/10 rounded-lg hover:border-orange-500/50 transition-colors">
                <span className="text-xl font-black italic tracking-tighter text-orange-500">{std}</span>
                <p className="mt-2 text-[10px] text-slate-500 uppercase font-bold tracking-widest">Compliance Ready</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
