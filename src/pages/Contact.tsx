/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  MessageSquare,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { CONTACT_INFO, BRAND_NAME } from "../constants";

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

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form submission here
    alert("Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.");
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="KONTAK & DUKUNGAN">Diskusikan Proyek Anda.</SectionHeading>
          <p className="max-w-3xl text-xl text-slate-600 leading-relaxed">
            Tim teknis dan penjualan kami siap memberikan solusi terbaik yang sesuai dengan anggaran 
            dan kebutuhan keamanan spesifik Anda. Hubungi kami untuk konsultasi atau permintaan penawaran harga.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Info Column */}
            <div>
              <div className="grid sm:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-8 border border-slate-200 shadow-sm relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-5 text-slate-900 group-hover:scale-110 transition-transform">
                    <Phone size={60} />
                  </div>
                  <MessageSquare size={24} className="text-orange-600 mb-6" />
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Hubungi Kami</h4>
                  <p className="text-lg font-extrabold text-slate-900 tracking-tight">{CONTACT_INFO.phone}</p>
                  <p className="text-xs text-slate-400 mt-1 uppercase font-mono">24/7 WhatsApp Support</p>
                </div>

                <div className="bg-white p-8 border border-slate-200 shadow-sm relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-5 text-slate-900 group-hover:scale-110 transition-transform">
                    <Mail size={60} />
                  </div>
                  <Mail size={24} className="text-blue-600 mb-6" />
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Inquiry</h4>
                  <p className="text-sm font-bold text-slate-900 truncate">{CONTACT_INFO.email}</p>
                  <p className="text-xs text-slate-400 mt-1 uppercase font-mono">Respon Maksimal 1x24 Jam</p>
                </div>
              </div>

              <div className="space-y-8 mb-12">
                <div className="flex gap-6 items-start">
                  <div className="p-4 bg-white border border-slate-200 rounded text-slate-600 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Alamat Kantor</h4>
                    <p className="text-slate-900 font-medium leading-relaxed max-w-sm">{CONTACT_INFO.address}</p>
                    <a 
                      href={CONTACT_INFO.maps_link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1 text-orange-600 text-xs font-bold uppercase tracking-widest mt-4 hover:underline"
                    >
                      Buka di Google Maps <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="p-4 bg-white border border-slate-200 rounded text-slate-600 shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Jam Operasional</h4>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-1">
                       <span className="text-sm font-medium text-slate-900">Senin - Jumat</span>
                       <span className="text-sm font-bold text-slate-900">08:00 - 17:00</span>
                       <span className="text-sm font-medium text-slate-400">Sabtu & Minggu</span>
                       <span className="text-sm font-bold text-slate-400">Tutup (Online Only)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="bg-white p-10 border border-slate-200 shadow-xl relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 via-blue-600 to-orange-600" />
              <h3 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Formulir Permintaan Penawaran</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Lengkap</label>
                    <input required className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:border-orange-500 outline-none transition-colors" placeholder="Contoh: Budi Santoso" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Perusahaan</label>
                    <input type="email" required className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:border-orange-500 outline-none transition-colors" placeholder="budi@perusahaan.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nomor Telp/WA</label>
                    <input required className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:border-orange-500 outline-none transition-colors" placeholder="0812-xxxx-xxxx" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kebutuhan Sistem</label>
                    <select className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:border-orange-500 outline-none appearance-none cursor-pointer">
                      <option>Fire Alarm System</option>
                      <option>Hydrant Equipment</option>
                      <option>Security / CCTV</option>
                      <option>Infrastruktur Data</option>
                      <option>Lainnya</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pesan / Detail Proyek</label>
                  <textarea rows={6} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:border-orange-500 outline-none" placeholder="Jelaskan spesifikasi teknis atau kebutuhan yang Anda cari..." />
                </div>

                <button className="w-full bg-slate-900 text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-lg flex items-center justify-center gap-3 group">
                   Kirim Permintaan Harga
                   <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-4 text-slate-400 italic text-xs">
                <ChevronRight size={14} className="text-orange-600" />
                Tim {BRAND_NAME} akan merespons inkuiri Anda secepat mungkin.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
