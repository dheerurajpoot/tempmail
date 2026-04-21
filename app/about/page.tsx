import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'About TempMail | Learn Our Story',
  description: 'Learn about TempMail, our mission to protect privacy, and how we help users stay anonymous online.',
};

export default function About() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">About TempMail</h1>
            <p className="text-xl text-slate-600">
              Protecting your privacy, one temporary email at a time.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p>
                TempMail was created with a simple mission: to give every internet user the power to protect their privacy without complications. In an era where personal data is increasingly valuable, temporary email addresses offer a practical solution to avoid spam, phishing, and unwanted marketing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Why TempMail?</h2>
              <div className="space-y-4">
                <p>
                  Every day, millions of websites ask for your email address. Whether it&apos;s for signing up, testing, or filling out forms, you&apos;re exposing yourself to potential spam and data collection. TempMail solves this problem by providing disposable email addresses.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><span className="font-semibold">Instant Creation:</span> Generate a new email in seconds with no registration</li>
                  <li><span className="font-semibold">Completely Anonymous:</span> No personal information needed</li>
                  <li><span className="font-semibold">Auto-Cleanup:</span> Emails and accounts are automatically deleted after inactivity</li>
                  <li><span className="font-semibold">Free Forever:</span> No hidden fees or premium tiers</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Work</h2>
              <p>
                TempMail operates on a simple principle: provide temporary email addresses that work just like regular emails but without the long-term commitment or privacy concerns. When you create an address with us, you get:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>A unique email address that&apos;s instantly active</li>
                <li>Full inbox access to receive and read emails</li>
                <li>Complete control to delete messages as needed</li>
                <li>Automatic cleanup after your session ends</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Privacy & Security</h2>
              <p>
                Your privacy is our priority. We don&apos;t collect personal information, don&apos;t require registration, and don&apos;t sell your data. All temporary email accounts are automatically purged from our system after a period of inactivity, ensuring no long-term data retention.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Get Started</h2>
              <p>
                Ready to protect your privacy? Creating a temporary email with TempMail takes just one click. No signup, no verification, no complications. Just instant email addresses that work.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
