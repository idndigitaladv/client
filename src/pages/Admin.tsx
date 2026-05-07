/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Lock, 
  LayoutDashboard, 
  Save, 
  LogOut, 
  CheckCircle2, 
  AlertCircle,
  Package,
  Home as HomeIcon,
  Phone,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [content, setContent] = useState<any>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'umum' | 'hero' | 'produk' | 'industri' | 'kontak'>('umum');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/status");
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        fetchContent();
      }
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content");
      const data = await res.json();
      setContent(data);
    } catch (err) {
      console.error("Failed to fetch content");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        fetchContent();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setIsAuthenticated(false);
    setContent(null);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content)
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ type: 'success', msg: "Konten berhasil diperbarui!" });
        setTimeout(() => setStatus(null), 3000);
      }
    } catch (err) {
      setStatus({ type: 'error', msg: "Gagal menyimpan perubahan." });
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated === null) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 shadow-2xl w-full max-w-md border-t-4 border-orange-600"
        >
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-orange-50 rounded-full mb-4">
              <Lock className="text-orange-600" size={32} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Admin Portal</h1>
            <p className="text-slate-500 text-sm mt-2">Masukkan kredensial khusus administrator TOSAFENG</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Username</label>
              <input 
                type="text" 
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all font-mono text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all font-mono text-sm"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-orange-600 transition-all disabled:opacity-50"
            >
              {loading ? "AUTHENTICATING..." : "LOGIN TO DASHBOARD"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Admin Nav */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <LayoutDashboard className="text-orange-600" size={24} />
            <div>
              <h1 className="text-sm font-black text-slate-900 uppercase tracking-tight">TOSAFENG CMS</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Management Console</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleSave}
              disabled={loading}
              className="bg-orange-600 text-white px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-orange-500 transition-all flex items-center gap-2 shadow-lg shadow-orange-100 disabled:opacity-50"
            >
              <Save size={14} /> {loading ? "Saving..." : "Simpan Perubahan"}
            </button>
            <button 
              onClick={handleLogout}
              className="p-2.5 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Status Session */}
          <div className="bg-white p-8 border border-slate-200 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Informasi Sesi</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-slate-700 uppercase">Connected</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <CheckCircle2 size={14} className="text-blue-500" />
                <span className="text-[10px] font-medium italic">Admin: tosafeng</span>
              </div>
            </div>
          </div>

          {/* Navigasi Menu */}
          <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
            <h3 className="px-8 pt-8 pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Menu Kelola</h3>
            <nav className="flex flex-col">
              {[
                { id: 'umum', label: 'Konfigurasi Umum', icon: HomeIcon },
                { id: 'hero', label: 'Halaman Beranda', icon: Layers },
                { id: 'produk', label: 'Katalog Produk', icon: Package },
                { id: 'industri', label: 'Solusi Industri', icon: Layers },
                { id: 'kontak', label: 'Informasi Kontak', icon: Phone },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-4 px-8 py-4 text-xs font-bold uppercase tracking-tight transition-all text-left border-l-4 ${
                    activeTab === item.id 
                    ? "bg-slate-50 border-orange-600 text-slate-900" 
                    : "border-transparent text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <AnimatePresence>
            {status && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`p-6 border-l-4 flex items-start gap-4 ${
                  status.type === 'success' ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-red-50 border-red-500 text-red-800'
                }`}
              >
                {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                <p className="text-xs font-bold uppercase tracking-tight">{status.msg}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Editor area */}
        <div className="lg:col-span-3 space-y-12">
          {content && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* General Settings */}
                {activeTab === 'umum' && (
                  <section className="bg-white p-10 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                      <HomeIcon size={20} className="text-slate-900" />
                      <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">Konfigurasi Umum</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nama Brand</label>
                        <input 
                          type="text" 
                          value={content.brandName}
                          onChange={(e) => setContent({...content, brandName: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 outline-none focus:border-orange-500 transition-all font-bold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nama Lengkap Perusahaan</label>
                        <input 
                          type="text" 
                          value={content.fullName}
                          onChange={(e) => setContent({...content, fullName: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 outline-none focus:border-orange-500 transition-all font-bold text-sm"
                        />
                      </div>
                    </div>
                  </section>
                )}

                {/* Hero Editor */}
                {activeTab === 'hero' && (
                  <div className="space-y-8">
                    <section className="bg-white p-10 border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-4 mb-8">
                        <HomeIcon size={20} className="text-slate-900" />
                        <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">Halaman Beranda (Hero)</h2>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Sub-Judul (Orange)</label>
                          <input 
                            type="text" 
                            value={content.hero.subtitle}
                            onChange={(e) => setContent({...content, hero: {...content.hero, subtitle: e.target.value}})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 outline-none focus:border-orange-500 transition-all font-bold text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Judul Utama</label>
                          <textarea 
                            value={content.hero.title}
                            onChange={(e) => setContent({...content, hero: {...content.hero, title: e.target.value}})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 outline-none focus:border-orange-500 transition-all font-black text-2xl h-32"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Deskripsi Hero</label>
                          <textarea 
                            value={content.hero.description}
                            onChange={(e) => setContent({...content, hero: {...content.hero, description: e.target.value}})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 outline-none focus:border-orange-500 transition-all text-sm h-24"
                          />
                        </div>
                      </div>
                    </section>

                    <section className="bg-white p-10 border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-4 mb-8">
                        <CheckCircle2 size={20} className="text-slate-900" />
                        <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">Pilar Utama (Home Cards)</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                        {content.pillars.map((pillar: any, idx: number) => (
                          <div key={idx} className="p-6 bg-slate-50 border border-slate-200">
                            <input 
                              type="text" 
                              value={pillar.title}
                              onChange={(e) => {
                                const newPillars = [...content.pillars];
                                newPillars[idx].title = e.target.value;
                                setContent({...content, pillars: newPillars});
                              }}
                              className="w-full px-4 py-2 border border-slate-200 bg-white outline-none font-black text-xs uppercase mb-3"
                            />
                            <textarea 
                              value={pillar.description}
                              onChange={(e) => {
                                const newPillars = [...content.pillars];
                                newPillars[idx].description = e.target.value;
                                setContent({...content, pillars: newPillars});
                              }}
                              className="w-full px-4 py-2 border border-slate-200 bg-white outline-none text-[10px] leading-relaxed h-20"
                            />
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {/* Products Editor */}
                {activeTab === 'produk' && (
                  <section className="bg-white p-10 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <Package size={20} className="text-slate-900" />
                        <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">Katalog Produk</h2>
                      </div>
                      <button 
                        onClick={() => {
                          const newProds = [...content.products, {
                            category: "Kategori Baru",
                            brand: "Merek",
                            description: "Deskripsi",
                            items: [{ name: "Item Baru", spec: "Spesifikasi", image: "" }]
                          }];
                          setContent({...content, products: newProds});
                        }}
                        className="bg-slate-900 text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center gap-2"
                      >
                        + Tambah Kategori
                      </button>
                    </div>

                    <div className="space-y-12">
                      {content.products.map((prod: any, pIdx: number) => (
                        <div key={pIdx} className="p-8 bg-slate-50 border border-slate-200 rounded relative group">
                          <button 
                            onClick={() => {
                              if(confirm('Hapus seluruh kategori ini?')) {
                                const newProds = content.products.filter((_: any, i: number) => i !== pIdx);
                                setContent({...content, products: newProds});
                              }
                            }}
                            className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            Hapus Kategori
                          </button>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Kategori</label>
                              <input 
                                type="text" 
                                value={prod.category}
                                onChange={(e) => {
                                  const newProds = [...content.products];
                                  newProds[pIdx].category = e.target.value;
                                  setContent({...content, products: newProds});
                                }}
                                className="w-full px-4 py-2 border border-slate-200 bg-white outline-none font-bold text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Merek</label>
                              <input 
                                type="text" 
                                value={prod.brand}
                                onChange={(e) => {
                                  const newProds = [...content.products];
                                  newProds[pIdx].brand = e.target.value;
                                  setContent({...content, products: newProds});
                                }}
                                className="w-full px-4 py-2 border border-slate-200 bg-white outline-none font-bold text-sm"
                              />
                            </div>
                          </div>
                          <div className="mb-8">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Deskripsi Kategori</label>
                            <textarea 
                              value={prod.description}
                              onChange={(e) => {
                                const newProds = [...content.products];
                                newProds[pIdx].description = e.target.value;
                                setContent({...content, products: newProds});
                              }}
                              className="w-full px-4 py-2 border border-slate-200 bg-white outline-none text-sm h-20 italic"
                            />
                          </div>
                          
                          {/* Items Editor */}
                          <div className="border-t border-slate-200 pt-6">
                            <div className="flex items-center justify-between mb-6">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Daftar Item Produk</span>
                              <button 
                                onClick={() => {
                                  const newProds = [...content.products];
                                  newProds[pIdx].items.push({ name: "Produk Baru", spec: "Spesifikasi", image: "" });
                                  setContent({...content, products: newProds});
                                }}
                                className="text-[9px] font-black text-orange-600 uppercase tracking-widest hover:underline"
                              >
                                + Tambah Item
                              </button>
                            </div>
                            
                            <div className="space-y-6">
                              {prod.items.map((item: any, iIdx: number) => (
                                <div key={iIdx} className="bg-white p-4 border border-slate-100 flex flex-col gap-4 relative">
                                  <button 
                                    onClick={() => {
                                      const newProds = [...content.products];
                                      newProds[pIdx].items = newProds[pIdx].items.filter((_: any, i: number) => i !== iIdx);
                                      setContent({...content, products: newProds});
                                    }}
                                    className="absolute top-2 right-2 text-slate-300 hover:text-red-500"
                                  >
                                    &times;
                                  </button>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-[9px] text-slate-400 font-bold uppercase block mb-1">Nama Produk</label>
                                      <input 
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => {
                                          const newProds = [...content.products];
                                          newProds[pIdx].items[iIdx].name = e.target.value;
                                          setContent({...content, products: newProds});
                                        }}
                                        className="w-full px-3 py-2 border border-slate-100 bg-slate-50 outline-none text-sm font-bold"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-[9px] text-slate-400 font-bold uppercase block mb-1">URL Gambar Produk</label>
                                      <input 
                                        type="text"
                                        value={item.image || ""}
                                        placeholder="https://example.com/image.jpg"
                                        onChange={(e) => {
                                          const newProds = [...content.products];
                                          newProds[pIdx].items[iIdx].image = e.target.value;
                                          setContent({...content, products: newProds});
                                        }}
                                        className="w-full px-3 py-2 border border-slate-100 bg-slate-50 outline-none text-[10px] font-mono"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-[9px] text-slate-400 font-bold uppercase block mb-1">Spesifikasi Teknik</label>
                                    <input 
                                      type="text"
                                      value={item.spec}
                                      onChange={(e) => {
                                        const newProds = [...content.products];
                                        newProds[pIdx].items[iIdx].spec = e.target.value;
                                        setContent({...content, products: newProds});
                                      }}
                                      className="w-full px-3 py-2 border border-slate-100 bg-slate-50 outline-none text-xs font-mono"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Industries Editor */}
                {activeTab === 'industri' && (
                  <section className="bg-white p-10 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                      <Layers size={20} className="text-slate-900" />
                      <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">Solusi Industri</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {content.industries.map((ind: any, idx: number) => (
                        <div key={idx} className="p-6 bg-slate-50 border border-slate-200">
                          <input 
                            type="text" 
                            value={ind.name}
                            onChange={(e) => {
                              const newInd = [...content.industries];
                              newInd[idx].name = e.target.value;
                              setContent({...content, industries: newInd});
                            }}
                            className="w-full px-4 py-2 border border-slate-200 bg-white outline-none font-black text-sm uppercase mb-3"
                          />
                          <textarea 
                            value={ind.description}
                            onChange={(e) => {
                              const newInd = [...content.industries];
                              newInd[idx].description = e.target.value;
                              setContent({...content, industries: newInd});
                            }}
                            className="w-full px-4 py-2 border border-slate-200 bg-white outline-none text-xs leading-relaxed h-20"
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Contact Editor */}
                {activeTab === 'kontak' && (
                  <section className="bg-white p-10 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                      <Phone size={20} className="text-slate-900" />
                      <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">Informasi Kontak</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Alamat Kantor</label>
                        <textarea 
                          value={content.contactInfo.address}
                          onChange={(e) => setContent({...content, contactInfo: {...content.contactInfo, address: e.target.value}})}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 outline-none focus:border-orange-500 transition-all text-sm h-32"
                        />
                      </div>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nomor WhatsApp/Telepon</label>
                          <input 
                            type="text" 
                            value={content.contactInfo.phone}
                            onChange={(e) => setContent({...content, contactInfo: {...content.contactInfo, phone: e.target.value}})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 outline-none focus:border-orange-500 transition-all font-bold text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email Bisnis</label>
                          <input 
                            type="email" 
                            value={content.contactInfo.email}
                            onChange={(e) => setContent({...content, contactInfo: {...content.contactInfo, email: e.target.value}})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 outline-none focus:border-orange-500 transition-all font-bold text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
        &copy; 2026 {content?.brandName} Full-Stack CMS Framework.
      </footer>
    </div>
  );
}
