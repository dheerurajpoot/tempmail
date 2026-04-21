'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EmailGenerator } from '@/components/EmailGenerator';
import { InboxList } from '@/components/InboxList';
import { EmailViewer } from '@/components/EmailViewer';
import { AutoRefresh } from '@/components/AutoRefresh';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { 
  Shield, 
  Zap, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Clock, 
  Globe, 
  BarChart3, 
  CheckCircle2, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export default function Home() {
  return (
    <>
      <Header />
      <ErrorDisplay />
      
      {/* Main Tool Section */}
      <main className="min-h-screen bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Sidebar - Generator & Controls */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-1 px-4 bg-blue-50 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Generator</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <EmailGenerator />
                  <AutoRefresh />
                </div>
              </div>

              {/* Quick Info Card */}
              <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl text-white shadow-lg shadow-blue-200/50">
                <h3 className="text-lg font-bold mb-2">Why TempMail?</h3>
                <p className="text-blue-50 text-sm leading-relaxed mb-4">
                  Stay anonymous and keep your real inbox clean. Perfect for testing, one-time signups, and privacy protection.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center">
                      <Zap className="h-3 w-3" />
                    </div>
                    <span>Instant delivery</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center">
                      <Lock className="h-3 w-3" />
                    </div>
                    <span>Private & Secure</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Inbox & Viewer */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[400px] flex flex-col">
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <h2 className="font-bold text-slate-900">Your Inbox</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-medium text-slate-500">Live Updates</span>
                  </div>
                </div>
                <div className="flex-1 p-0">
                  <InboxList />
                  <EmailViewer />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust/Stats Strip */}
        <section className="bg-white border-y border-slate-200 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">10M+</div>
                <div className="text-sm text-slate-500 mt-1">Emails Generated</div>
              </div>
              <div className="text-center border-l border-slate-100">
                <div className="text-3xl font-bold text-slate-900">50M+</div>
                <div className="text-sm text-slate-500 mt-1">Spam Blocked</div>
              </div>
              <div className="text-center border-l border-slate-100">
                <div className="text-3xl font-bold text-slate-900">99.9%</div>
                <div className="text-sm text-slate-500 mt-1">Uptime</div>
              </div>
              <div className="text-center border-l border-slate-100">
                <div className="text-3xl font-bold text-slate-900">0</div>
                <div className="text-sm text-slate-500 mt-1">Logs Kept</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-slate-50/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Premium Features, Zero Cost</h2>
              <p className="mt-4 text-lg text-slate-600">The most advanced temporary email service on the web.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
                  title: "Military-Grade Security",
                  desc: "Your data is encrypted and automatically deleted after use. We never store personal info."
                },
                {
                  icon: <Zap className="h-8 w-8 text-amber-500" />,
                  title: "Blazing Fast Delivery",
                  desc: "Receive emails instantly. Our high-performance servers ensure no lag for your verification codes."
                },
                {
                  icon: <Globe className="h-8 w-8 text-emerald-500" />,
                  title: "Global Reach",
                  desc: "Use our emails on any website globally. Compatible with virtually all online platforms."
                },
                {
                  icon: <Clock className="h-8 w-8 text-purple-500" />,
                  title: "Session Control",
                  desc: "Keep your inbox for as long as you need, then let it expire naturally or delete it manually."
                },
                {
                  icon: <BarChart3 className="h-8 w-8 text-pink-500" />,
                  title: "Real-time Monitoring",
                  desc: "Watch your inbox live with auto-refresh. Never miss a single incoming message."
                },
                {
                  icon: <Lock className="h-8 w-8 text-slate-700" />,
                  title: "True Anonymity",
                  desc: "No registration, no name, no IP tracking. Just purely anonymous email generation."
                }
              ].map((feature, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6">Simple 3-Step Protection</h2>
                <div className="space-y-8">
                  {[
                    { step: "01", title: "Generate an Address", desc: "Instantly create a new, random email address with a single click." },
                    { step: "02", title: "Use it Everywhere", desc: "Provide your temporary email to any website or service requiring signup." },
                    { step: "03", title: "Receive & Forget", desc: "Wait for your emails, read them, and walk away. Your data deletes itself." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 text-3xl font-black text-blue-100">{item.step}</div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
                        <p className="text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 p-8 bg-slate-50 rounded-3xl relative">
                <div className="aspect-video bg-white rounded-2xl shadow-2xl border border-slate-200 flex items-center justify-center">
                  <div className="text-center">
                    <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                    <p className="text-slate-900 font-bold">Inbox Secured</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 h-24 w-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold rotate-12 shadow-xl border-4 border-white">
                  100% FREE
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-slate-50/50">
          <div className="mx-auto max-w-3xl px-4">
            <div className="text-center mb-16">
              <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-slate-900">Common Questions</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: "How long is the email address valid?", a: "Your temporary email is valid as long as your session is active. It automatically expires after 1 hour of inactivity." },
                { q: "Is this service really free?", a: "Yes, our core temp email service is 100% free with no hidden charges or premium subscriptions required." },
                { q: "Can I send emails using these addresses?", a: "No, to prevent abuse and spam, our service is receive-only. You can receive, read, and delete incoming emails." },
                { q: "Do you store any logs of my activity?", a: "Absolutely not. We have a strict zero-log policy. Your connection and usage details are never stored on our servers." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-2">{item.q}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900 rounded-[3rem] p-12 sm:p-24 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
              
              <h2 className="text-4xl sm:text-5xl font-bold mb-8 relative z-10">Stop Spam Today</h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 relative z-10">
                Join millions of users who protect their privacy with TempMail. No signup, no hassle.
              </p>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all relative z-10"
              >
                Get Started Now
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>
        
      </main>

      <Footer />
    </>
  );
}
