'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-lg supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 hover:opacity-80 transition-opacity">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-md">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">TempMail</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-slate-200 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
