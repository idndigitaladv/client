/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  PhoneCall,
  MapPin,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BRAND_NAME, 
  FULL_NAME, 
  NAVIGATION, 
  CONTACT_INFO 
} from "../constants";

export default function Layout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-lg py-3" : "bg-slate-900 py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white">
          <Link 
            to="/"
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-orange-600 rounded flex items-center justify-center font-bold text-xl italic shrink-0">T</div>
            <div className="leading-none">
              <h1 className="text-xl font-extrabold tracking-tighter uppercase">{BRAND_NAME}</h1>
              <p className="text-[10px] text-orange-400 uppercase tracking-widest font-semibold">Total Safety Engineering</p>
            </div>
          </Link>

          <div className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-300">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                to={item.href === 'home' ? '/' : `/${item.href}`}
                className={`transition-colors uppercase tracking-wider text-xs ${
                  (location.pathname === '/' && item.href === 'home') || location.pathname === `/${item.href}`
                    ? "text-white font-bold"
                    : "hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              to="/contact"
              className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2.5 rounded text-xs font-bold uppercase transition-all shadow-lg shadow-orange-900/20"
            >
              Minta Penawaran
            </Link>
          </div>

          <button 
            className="md:hidden text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-slate-900 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-white text-center">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  to={item.href === 'home' ? '/' : `/${item.href}`}
                  className="text-2xl font-extrabold uppercase tracking-tighter"
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                to="/contact"
                className="w-full bg-orange-600 text-white py-4 rounded font-bold mt-4 block text-center"
              >
                Hubungi Kami
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center font-bold text-lg italic shrink-0">T</div>
                  <h1 className="text-lg font-extrabold tracking-tighter uppercase">{BRAND_NAME}</h1>
               </div>
               <p className="text-slate-500 text-xs leading-relaxed max-w-xs uppercase tracking-tight">
                 Total Safety Engineering. Authorized Distributor & Global Specialist for Fire Protection and Security Systems.
               </p>
            </div>
            
            <div className="flex gap-20">
               <div className="flex flex-col gap-4">
                  <span className="text-orange-400 text-[10px] font-bold uppercase tracking-widest">Sitemap</span>
                  <div className="flex flex-col gap-2 text-xs text-slate-400">
                    {NAVIGATION.map(item => (
                      <Link key={item.href} to={item.href === 'home' ? '/' : `/${item.href}`} className="hover:text-white text-left uppercase">{item.name}</Link>
                    ))}
                  </div>
               </div>
               <div className="flex flex-col gap-4 text-right">
                  <span className="text-orange-400 text-[10px] font-bold uppercase tracking-widest">Support</span>
                  <div className="flex flex-col gap-2 text-xs text-slate-400">
                    <button className="hover:text-white">Technical Support</button>
                    <button className="hover:text-white">Product Warranty</button>
                    <a href={`https://wa.me/${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}`} className="hover:text-white">WhatsApp 24/7</a>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="pt-12 mt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 uppercase tracking-widest font-bold">
            <span>&copy; {new Date().getFullYear()} {FULL_NAME}</span>
            <span className="opacity-50 font-mono tracking-tighter text-[9px]">Industrial Standard • Latin Business Dist • IDN</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
