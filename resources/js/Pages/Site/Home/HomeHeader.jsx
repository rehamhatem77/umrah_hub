import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import NavLink from "@/Components/NavLink";

export default function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="relative flex items-center justify-between px-6 lg:px-40 py-4">

        <div className="flex items-center gap-2 font-semibold z-50">
          <img src="/public/favicon.ico" alt="Umrah Hub" className="w-7 h-7" />
          <span className="text-lg text-[var(--app-primary)]">
            Umrah Hub
          </span>
        </div>

     
        <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:flex gap-12 text-sm font-medium text-gray-700">
          <NavLink href="/">الرئيسية</NavLink>
          <NavLink href="/packages">الباقات</NavLink>
          <NavLink href="/about">من نحن</NavLink>
          <NavLink href="/contact">تواصل معنا</NavLink>
        </nav>

      
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden z-50 flex items-center justify-center w-10 h-10 rounded-lg
                     text-[var(--app-primary)] hover:bg-gray-100 transition"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        <div
          className={`absolute top-0 left-0 right-0 bg-white rounded-b-3xl shadow-xl
                      transition-transform duration-300 ${
                        menuOpen ? "translate-y-0" : "-translate-y-full"
                      }`}
        >
          <nav className="flex flex-col items-center gap-6 py-10 text-lg font-medium text-gray-800">
            <NavLink href="/" onClick={() => setMenuOpen(false)}>الرئيسية</NavLink>
            <NavLink href="/packages" onClick={() => setMenuOpen(false)}>الباقات</NavLink>
            <NavLink href="/about" onClick={() => setMenuOpen(false)}>من نحن</NavLink>
            <NavLink href="/contact" onClick={() => setMenuOpen(false)}>تواصل معنا</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
