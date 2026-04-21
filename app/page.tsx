import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EmailGenerator } from '@/components/EmailGenerator';
import { InboxList } from '@/components/InboxList';
import { EmailViewer } from '@/components/EmailViewer';
import { AutoRefresh } from '@/components/AutoRefresh';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { Shield, Zap, Lock } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Header />
      <ErrorDisplay />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
              <span className="text-sm font-semibold text-blue-700">Instant & Anonymous</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 text-balance">
              Your Temporary Email Solution
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8 text-balance">
              Create disposable email addresses instantly. Perfect for sign-ups, testing, and protecting your privacy without any signup required.
            </p>
            
            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Instant Creation</h3>
                <p className="text-sm text-slate-600">Generate a new email in seconds</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900">100% Anonymous</h3>
                <p className="text-sm text-slate-600">No signup or registration needed</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Lock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Privacy Protected</h3>
                <p className="text-sm text-slate-600">Auto-delete after inactivity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Application */}
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <EmailGenerator />
                <AutoRefresh />
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Inbox */}
              <InboxList />

              {/* Email Viewer */}
              <EmailViewer />
            </div>
          </div>

          {/* Info Banner */}
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-slate-50 rounded-lg border border-blue-200">
            <p className="text-sm text-slate-700 text-center">
              <span className="font-semibold">💡 Pro Tip:</span> Emails are automatically deleted after 1 hour of inactivity. Enable auto-refresh to stay updated with incoming messages.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
