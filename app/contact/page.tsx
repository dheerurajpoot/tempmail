'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useState } from 'react';
import { Mail, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Contact Us</h1>
            <p className="text-xl text-slate-600">
              Have a question? We&apos;d love to hear from you. Send us a message anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Contact Info */}
            <div className="md:col-span-1 space-y-8">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 flex-shrink-0">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                  <p className="text-sm text-slate-600">support@tempmail.io</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 flex-shrink-0">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Response Time</h3>
                  <p className="text-sm text-slate-600">Within 24 hours</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Location</h3>
                  <p className="text-sm text-slate-600">Remote Worldwide</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-medium">✓ Message sent successfully! We&apos;ll get back to you soon.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
