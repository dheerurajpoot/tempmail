'use client';

import Link from 'next/link';
import { Mail, Github, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { label: 'Features', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ],
  };

  return (
    <footer className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-md">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg">TempMail</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Create instant temporary email addresses for privacy, testing, and convenience without any signup required.
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
                aria-label="Twitter"
                title="Follow on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
                aria-label="GitHub"
                title="View on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-5 uppercase text-sm tracking-wider">Product</h4>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 inline-flex items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-5 uppercase text-sm tracking-wider">Company</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 inline-flex items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-5 uppercase text-sm tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 inline-flex items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              &copy; {currentYear} <span className="font-semibold text-slate-900">TempMail</span>. All rights reserved.
            </p>
            <p className="text-sm text-slate-600">
              Made with <span className="text-red-500 animate-pulse">♥</span> for privacy-conscious users worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
