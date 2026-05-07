/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode, useState } from "react";
import { 
  Flame, 
  Shield, 
  Network, 
  Plus,
  ArrowRight,
  X,
  CheckCircle2,
  Phone,
  Fingerprint,
  CreditCard,
  ScanFace
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PRODUCTS } from "../constants";

interface ProductItem {
  name: string;
  spec: string;
  image?: string;
}

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

const CategoryIcon = ({ category }: { category: string }) => {
  if (category.includes('Fire')) return <Flame size={20} className="text-orange-600" />;
  if (category.includes('Security')) return <Shield size={20} className="text-blue-600" />;
  return <Network size={20} className="text-slate-600" />;
};

const productImages: Record<string, string> = {
  "Fire Alarm System": "https://images.unsplash.com/photo-1599708145804-03748287f394?auto=format&fit=crop&q=80&w=800",
  "Hydrant Equipment": "https://images.unsplash.com/photo-1596752055663-718816f56a29?auto=format&fit=crop&q=80&w=800",
  "Security & Monitoring": "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
  "Infrastructure & Comm": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800"
};

const itemDetails: Record<string, string> = {
  "Control Panel": "Panel kontrol cerdas yang mendukung sistem addressable modern. Memungkinkan pemantauan titik-per-titik untuk lokasi kebakaran yang presisi, integrasi dengan sistem gedung lainnya, dan pencatatan riwayat kejadian secara otomatis.",
  "Smoke/Heat Detector": "Sensor fotolistrik generasi terbaru dengan algoritma pemrosesan sinyal digital untuk membedakan asap kebakaran asli dari partikel gangguan, memastikan respon cepat dengan alarm palsu minimal.",
  "Manual Call Point": "Dirancang untuk aktivasi darurat manual yang andal. Menggunakan mekanisme break-glass atau resetable yang sesuai dengan standar EN54 dan NFPA.",
  "Hydrant Box": "Kotak peralatan baja berkualitas tinggi dengan lapisan powder coating anti-karat tingkat industri. Memastikan perlengkapan tetap terlindungi dalam kondisi lingkungan ekstrem sekalipun.",
  "Hydrant Pillar": "Komponen aliran air eksternal utama dengan material cast iron berkualitas tinggi. Dirancang untuk volume aliran tinggi sesuai standar pemadam kebakaran perkotaan.",
  "IP & Analog CCTV": "Sistem kamera pengawas definisi tinggi dengan fitur AI terintegrasi seperti face recognition, perimeter defense, dan low-light color imaging untuk keamanan maksimal.",
  "Fiber Optic Network": "Infrastruktur tulang punggung data berkecepatan tinggi yang menjamin latency rendah dan throughput tinggi untuk sistem komunikasi dan pemantauan gedung.",
  "Access Door": "Sistem manajemen akses yang mendukung biometrik, pembaca kartu RFID, dan integrasi software untuk kontrol logistik personil yang ketat."
};

const itemImages: Record<string, string> = {
  "Control Panel": "https://images.unsplash.com/photo-1558239023-577881458025?auto=format&fit=crop&q=80&w=600",
  "Smoke/Heat Detector": "https://images.unsplash.com/photo-1620050893041-382907409210?auto=format&fit=crop&q=80&w=600",
  "Manual Call Point": "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=600",
  "Hydrant Box": "https://images.unsplash.com/photo-1596752055663-718816f56a29?auto=format&fit=crop&q=80&w=600",
  "IP & Analog CCTV": "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=600",
  "Hydrant Pillar": "https://images.unsplash.com/photo-1599818826723-5e767e91eb70?auto=format&fit=crop&q=80&w=600",
};

export default function Products() {
  const [selectedItem, setSelectedItem] = useState<{item: ProductItem, category: string, brand: string} | null>(null);
  const [activeAccessMethod, setActiveAccessMethod] = useState<'biometric' | 'rfid' | 'facial'>('biometric');
  const [filterBrand, setFilterBrand] = useState<string>("All");

  // Dynamically extract filter options
  const brands = ["All", ...new Set(PRODUCTS.map(p => p.brand))];

  const filteredProducts = PRODUCTS.filter(prod => {
    return filterBrand === "All" || prod.brand === filterBrand;
  });

  const accessMethods = {
    biometric: {
      title: "Fingerprint Biometric",
      icon: Fingerprint,
      desc: "Autentikasi sidik jari dengan presisi tinggi dan waktu respon < 0.5 detik. Mendukung pendaftaran hingga 10,000 user.",
      color: "text-orange-600",
      border: "border-l-orange-500",
      bg: "bg-orange-50"
    },
    rfid: {
      title: "Smart RFID Card",
      icon: CreditCard,
      desc: "Mendukung berbagai standar kartu (Proximity, Mifare, HID). Ideal untuk akses cepat karyawan dalam jumlah massal.",
      color: "text-blue-600",
      border: "border-l-blue-500",
      bg: "bg-blue-50"
    },
    facial: {
      title: "Facial Recognition",
      icon: ScanFace,
      desc: "Teknologi AI touchless dengan deteksi suhu tubuh opsional. Sangat direkomendasikan untuk area dengan tingkat higienitas tinggi.",
      color: "text-emerald-600",
      border: "border-l-emerald-500",
      bg: "bg-emerald-50"
    }
  };

  const openInquiry = (itemName: string) => {
    const message = encodeURIComponent(`Halo TOSAFENG, saya ingin menanyakan lebih detail mengenai produk: ${itemName}. Mohon informasikan spesifikasi lengkap dan penawaran harganya.`);
    window.open(`https://wa.me/628120000000?text=${message}`, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-20 mb-12">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="CATALOG UTAMA">Sistem Keamanan & Keahlian Teknis.</SectionHeading>
          <p className="max-w-3xl text-lg text-slate-600 leading-relaxed">
            Menyediakan ekosistem perlindungan terlengkap dengan integrasi merek global untuk memastikan 
            setiap spesifikasi teknis diterjemahkan menjadi reliabilitas maksimal di lapangan.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-slate-200 py-6 mb-12 sticky top-0 z-40 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-6 items-center">
            {/* Brand Filter */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Filter Merek</span>
              <div className="flex flex-wrap justify-center gap-1.5">
                {brands.map(brand => (
                  <button
                    key={brand}
                    onClick={() => setFilterBrand(brand)}
                    className={`px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest border transition-all rounded-sm ${
                      filterBrand === brand 
                      ? "bg-slate-900 text-white border-slate-900 shadow-md scale-105" 
                      : "bg-white text-slate-500 border-slate-100 hover:border-orange-500 hover:text-orange-600"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {filterBrand !== "All" && (
              <button 
                onClick={() => setFilterBrand("All")}
                className="text-[9px] font-black text-orange-600 uppercase tracking-widest hover:underline flex items-center gap-1.5"
              >
                Reset Filter <X size={10} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Product Categories Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredProducts.map((prod, i) => (
              <div key={i} className="bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col group">
              {/* Product Image Area */}
              <div className="relative h-64 overflow-hidden bg-slate-900">
                <img 
                  src={productImages[prod.category] || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"} 
                  alt={prod.category}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-8 flex items-center gap-3">
                  <div className="bg-white p-2.5 rounded shadow-xl">
                    <CategoryIcon category={prod.category} />
                  </div>
                  <div className="text-white">
                    <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block mb-0.5">{prod.brand}</span>
                    <h3 className="text-xl font-extrabold tracking-tight italic uppercase">{prod.category}</h3>
                  </div>
                </div>
              </div>

              <div className="p-8 flex-grow">
                <p className="text-slate-500 mb-8 font-medium leading-relaxed italic border-l-4 border-orange-500 pl-4 text-sm">
                  {prod.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {prod.items.map((item, j) => (
                    <button 
                      key={j} 
                      onClick={() => setSelectedItem({ item, category: prod.category, brand: prod.brand })}
                      className="p-4 bg-slate-50 border border-slate-100 group/item hover:border-orange-200 hover:bg-white transition-all text-left"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-900 text-sm group-hover/item:text-orange-600 transition-colors uppercase tracking-tight">{item.name}</h4>
                        <Plus size={14} className="text-slate-300 group-hover/item:text-orange-600" />
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono leading-tight uppercase tracking-tighter">
                        {item.spec}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-2 border-l border-slate-300">
                  Reliability Guaranteed
                </div>
                <button 
                  onClick={() => openInquiry(prod.category)}
                  className="bg-slate-900 text-white px-8 py-3 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg w-full sm:w-auto justify-center"
                >
                  Minta Penawaran <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border-2 border-dashed border-slate-200 rounded-xl bg-white">
          <div className="inline-flex p-4 bg-slate-50 rounded-full mb-6">
            <Shield size={32} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No Products Match Your Selection</h3>
          <p className="text-slate-500 mb-8 max-w-sm mx-auto">Try selecting a different brand or resetting the filter to see our available solutions.</p>
          <button 
            onClick={() => setFilterBrand("All")}
            className="bg-slate-900 text-white px-8 py-3 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>

      {/* Brand Commitment */}
      <section className="mt-24 max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 p-12 text-center text-white relative overflow-hidden">
           <div className="absolute top-0 left-0 w-2 h-full bg-orange-600" />
           <h4 className="text-orange-500 font-bold uppercase text-xs tracking-widest mb-4">Official Distributor Partner</h4>
           <div className="flex flex-wrap justify-center gap-12 items-center opacity-60">
              <span className="text-2xl font-black italic tracking-tighter uppercase">HOCHIKI JAPAN</span>
              <span className="text-2xl font-black italic tracking-tighter uppercase">TPROTEC GERMANY</span>
              <span className="text-2xl font-black italic tracking-tighter uppercase">YARWARD MEDICAL</span>
           </div>
           <p className="mt-12 text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
             Setiap produk yang kami pasok disertai dengan garansi resmi dan sertifikasi keaslian unit.
             <br />
             <span className="text-xs opacity-75">(Certificate of Quality)</span>
           </p>
        </div>
      </section>

      {/* Item Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" 
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white md:text-slate-900 transition-colors backdrop-blur-md"
              >
                <X size={20} />
              </button>

              {/* Product Visual */}
              <div className="md:w-1/2 bg-slate-900 relative min-h-[300px]">
                <img 
                  src={selectedItem.item.image || itemImages[selectedItem.item.name] || productImages[selectedItem.category]} 
                  alt={selectedItem.item.name}
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8">
                  <span className="bg-orange-600 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">
                    {selectedItem.brand} Original
                  </span>
                  <h3 className="text-white text-3xl font-black italic uppercase tracking-tighter leading-tight">
                    {selectedItem.item.name}
                  </h3>
                </div>
              </div>

              {/* Product Info */}
              <div className="md:w-1/2 p-10 overflow-y-auto bg-white flex flex-col">
                <div className="mb-10">
                  <span className="text-orange-600 text-[10px] font-bold uppercase tracking-widest block mb-1">Detailed Specifications</span>
                  <h4 className="text-slate-900 text-lg font-bold mb-4">{selectedItem.item.spec}</h4>
                  
                  {selectedItem.item.name === "Access Door" ? (
                    <div className="mt-8">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Interactive Explorer: Pilih Metode Akses</span>
                       <div className="flex gap-4 mb-6">
                          {(Object.keys(accessMethods) as Array<keyof typeof accessMethods>).map((method) => {
                             const Icon = accessMethods[method].icon;
                             const isActive = activeAccessMethod === method;
                             return (
                                <button 
                                  key={method}
                                  onClick={() => setActiveAccessMethod(method)}
                                  className={`p-4 border transition-all flex flex-col items-center gap-2 flex-1 rounded ${
                                    isActive 
                                    ? "border-orange-500 bg-orange-50 shadow-sm" 
                                    : "border-slate-100 bg-slate-50 hover:border-slate-300"
                                  }`}
                                >
                                   <Icon size={20} className={isActive ? "text-orange-600" : "text-slate-400"} />
                                   <span className={`text-[9px] font-bold uppercase tracking-tighter ${isActive ? "text-orange-700" : "text-slate-500"}`}>
                                      {method}
                                   </span>
                                </button>
                             );
                          })}
                       </div>
                       
                       <motion.div
                         key={activeAccessMethod}
                         initial={{ opacity: 0, x: 10 }}
                         animate={{ opacity: 1, x: 0 }}
                         className={`p-6 rounded border-l-4 ${accessMethods[activeAccessMethod].bg} ${accessMethods[activeAccessMethod].border}`}
                       >
                          <h5 className={`font-bold text-sm mb-2 ${accessMethods[activeAccessMethod].color}`}>
                             {accessMethods[activeAccessMethod].title}
                          </h5>
                          <p className="text-xs text-slate-600 leading-relaxed">
                             {accessMethods[activeAccessMethod].desc}
                          </p>
                       </motion.div>
                    </div>
                  ) : (
                    <p className="text-slate-500 leading-relaxed text-sm">
                      {itemDetails[selectedItem.item.name] || "Produk ini merupakan standar industri global yang dirancang untuk performa maksimal dan durabilitas jangka panjang. Telah melewati serangkaian uji kualitas ketat sesuai standar keselamatan internasional."}
                    </p>
                  )}
                </div>

                <div className="space-y-4 mb-10">
                   {[
                     "Sertifikat Keaslian Unit (COQ)",
                     "Garansi Resmi Distributor",
                     "Dukungan Instalasi Teknis",
                     "Maintenance Guide Terlampir"
                   ].map((point, idx) => (
                     <div key={idx} className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">{point}</span>
                     </div>
                   ))}
                </div>

                <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col gap-3">
                   <button 
                     onClick={() => openInquiry(selectedItem.item.name)}
                     className="w-full bg-orange-600 text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-orange-500 transition-all flex items-center justify-center gap-3 shadow-lg shadow-orange-100"
                   >
                     <Phone size={16} />
                     Beli Sekarang / Tanya Harga
                   </button>
                   <p className="text-[10px] text-center text-slate-400 uppercase font-bold tracking-widest">
                     Tim kami merespons WhatsApp 24/7
                   </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
