/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from "react";
import { 
  CheckCircle2, 
  Target, 
  Shield, 
  TrendingUp,
  Award
} from "lucide-react";
import { motion } from "motion/react";
import { BRAND_NAME, FULL_NAME } from "../constants";

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

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="bg-slate-900 py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-600/10 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-orange-500 font-bold uppercase text-xs tracking-widest mb-4 block">Tentang Kami</span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-tight">
              DEDIKASI UNTUK <br /> <span className="text-orange-500">KESELAMATAN TOTAL.</span>
            </h1>
            <p className="max-w-2xl text-slate-400 text-xl leading-relaxed">
              TOSAFENG ({FULL_NAME}) adalah mitra strategis Anda dalam menghadirkan solusi perlindungan kebakaran dan sistem keamanan terintegrasi dengan standar internasional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* History & Mission */}
      <section className="py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <SectionHeading subtitle="FILOSOFI KAMI">Visi Melindungi Aset & Nyawa.</SectionHeading>
              <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                Didirikan lebih dari satu dekade lalu, {BRAND_NAME} lahir dari kesadaran mendalam akan pentingnya sistem pertahanan infrastruktur yang reliabel. Kami memahami bahwa di balik setiap spesifikasi teknis, terdapat aset berharga dan nyawa manusia yang harus dilindungi.
              </p>
              <p className="text-slate-600 mb-10 leading-relaxed">
                Berbasis di Latinos Business District, Tangerang Selatan, kami telah berkembang dari penyedia peralatan menjadi konsultan teknik terpercaya yang melayani berbagai sektor industri di seluruh Indonesia.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                <div className="flex gap-4">
                  <div className="p-3 bg-orange-50 rounded text-orange-600 shrink-0 h-fit">
                    <Target size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Misi Kami</h4>
                    <p className="text-sm text-slate-500 font-medium tracking-tight">Menghadirkan ekosistem keamanan zero-failure melalui produk global dan keahlian lokal.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="p-3 bg-blue-50 rounded text-blue-600 shrink-0 h-fit">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Integritas</h4>
                    <p className="text-sm text-slate-500 font-medium tracking-tight">Setiap instalasi adalah janji kualitas kami kepada klien dan masyarakat luas.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="aspect-square bg-slate-100 rounded border border-slate-200 overflow-hidden shadow-lg">
                  <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale" alt="Engineering" />
               </div>
               <div className="aspect-square bg-slate-100 rounded border border-slate-200 overflow-hidden shadow-lg mt-12">
                  <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale" alt="Construction" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="WHY TOSAFENG">Mengapa Klien Mempercayakan Kami?</SectionHeading>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Reliability First",
                desc: "Hanya menggunakan produk standar global (Hochiki, TProtec, Yarward) yang teruji daya tahannya di berbagai kondisi ekstrem.",
                icon: Award,
                color: "text-orange-600"
              },
              {
                title: "Technical Accuracy",
                desc: "Tim teknisi kami bukan sekadar teknisi pasang; mereka adalah ahli bersertifikat yang memahami standar regulasi SNI dan Internasional.",
                icon: TrendingUp,
                color: "text-blue-600"
              },
              {
                title: "Comprehensive Ecosystem",
                desc: "Solution terintegrasi dari hulu ke hilir: Deteksi Api, Hidran, CCTV, hingga infrastruktur data dalam satu pintu koordinasi.",
                icon: CheckCircle2,
                color: "text-emerald-600"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 border border-slate-200 shadow-sm">
                <item.icon className={`${item.color} mb-6`} size={32} />
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center border-t-8 border-orange-600 pt-16 mt-12">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 uppercase tracking-tighter italic">"Safety is not an option, it's a foundation."</h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Di {BRAND_NAME}, kami percaya bahwa keamanan yang baik tidak boleh terlihat mencolok, namun harus selalu siap bekerja saat dibutuhkan tanpa ragu. Itulah komitmen kualitas yang kami bawa ke setiap proyek Anda.
          </p>
        </div>
      </section>
    </div>
  );
}
