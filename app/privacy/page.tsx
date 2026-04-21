import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy | TempMail',
  description: 'Read our privacy policy to understand how we protect your data and respect your privacy.',
};

export default function Privacy() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
            <p className="text-slate-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
              <p>
                TempMail (&quot;we&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains our data practices and your privacy rights when using our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Information We Collect</h2>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Information You Provide</h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Email addresses you create with our service</li>
                <li>Emails received in your temporary inbox</li>
                <li>Contact form submissions (name, email, message)</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>IP address and browser type</li>
                <li>Pages visited and time spent on site</li>
                <li>Referring website information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Use Your Information</h2>
              <p>We use collected information to:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Provide and improve our temporary email service</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Prevent fraud and security issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Retention</h2>
              <p>
                Temporary email addresses and their contents are automatically deleted after 1 hour of inactivity. We do not retain email data for longer than necessary to provide our service. Contact form submissions may be retained for up to 30 days for support purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Security</h2>
              <p>
                We implement industry-standard security measures including SSL encryption to protect your data during transmission. However, no security system is impenetrable. We encourage you to use strong practices for account security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Third-Party Sharing</h2>
              <p>
                We do not sell, trade, or share your personal information with third parties except when required by law. We use trusted service providers for infrastructure and may share minimal data necessary for service operation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Request information about data we hold about you</li>
                <li>Request deletion of your temporary email addresses</li>
                <li>Opt-out of analytics tracking</li>
                <li>Delete your account and associated data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
              <p>
                For privacy-related inquiries, contact us at <span className="font-mono bg-slate-100 px-2 py-1 rounded">privacy@tempmail.io</span>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to This Policy</h2>
              <p>
                We may update this policy periodically. We&apos;ll notify you of significant changes by posting the new policy on this page with an updated date.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
