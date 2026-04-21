import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Cookie Policy | TempMail',
  description: 'Learn about how TempMail uses cookies to enhance your experience.',
};

export default function Cookies() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Cookie Policy</h1>
            <p className="text-slate-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What Are Cookies?</h2>
              <p>
                Cookies are small pieces of data stored on your browser that help websites remember information about you. They are widely used to make websites work more efficiently and provide a better user experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Use Cookies</h2>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Essential Cookies</h3>
              <p>
                These cookies are necessary for TempMail to function properly. They include:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li><span className="font-semibold">Session Cookies:</span> Remember your current session and temporary email address</li>
                <li><span className="font-semibold">Authentication:</span> Keep you logged in if applicable</li>
                <li><span className="font-semibold">Security:</span> Protect against fraudulent activity</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 mb-3 mt-6">Performance Cookies</h3>
              <p>
                These cookies help us understand how you use TempMail so we can improve our service:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Analytics to measure site performance</li>
                <li>Usage patterns to identify popular features</li>
                <li>Error tracking to fix issues faster</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 mb-3 mt-6">Preference Cookies</h3>
              <p>
                These cookies remember your preferences and settings:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Theme preference (light/dark mode)</li>
                <li>Language selection</li>
                <li>Auto-refresh interval settings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Third-Party Cookies</h2>
              <p>
                We may allow trusted third-party services to set cookies on TempMail for analytics and performance monitoring. These services have their own privacy policies and are bound by privacy regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Cookie Duration</h2>
              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="font-semibold text-slate-900">Session Cookies:</h4>
                  <p>Deleted when you close your browser</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Persistent Cookies:</h4>
                  <p>Remain on your device for up to 1 year</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Controlling Cookies</h2>
              <p>
                You can control and delete cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>View all stored cookies</li>
                <li>Delete specific cookies</li>
                <li>Block cookies from specific websites</li>
                <li>Clear all cookies when you close your browser</li>
              </ul>
              <p className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                <span className="font-semibold">Note:</span> Disabling essential cookies may prevent TempMail from functioning properly. Performance and preference cookies can be safely disabled without affecting core functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Do Not Track</h2>
              <p>
                If you have Do Not Track (DNT) enabled in your browser, we respect your preference and will minimize tracking. However, some essential functionality may still require cookies for proper operation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to This Policy</h2>
              <p>
                We may update this Cookie Policy periodically to reflect changes in our practices or technology. We encourage you to review this page regularly for any updates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Questions?</h2>
              <p>
                If you have questions about our use of cookies, please contact us at <span className="font-mono bg-slate-100 px-2 py-1 rounded">privacy@tempmail.io</span>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
