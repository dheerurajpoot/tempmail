import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service | TempMail',
  description: 'Review our terms of service to understand the rules and conditions for using TempMail.',
};

export default function Terms() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Terms of Service</h1>
            <p className="text-slate-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using TempMail, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Use License</h2>
              <p>Permission is granted to temporarily download one copy of the materials (information or software) on TempMail for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on TempMail</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Disclaimer</h2>
              <p>
                The materials on TempMail are provided on an &apos;as is&apos; basis. TempMail makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Limitations</h2>
              <p>
                In no event shall TempMail or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TempMail, even if TempMail or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on TempMail could include technical, typographical, or photographic errors. TempMail does not warrant that any of the materials on its website are accurate, complete, or current. TempMail may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Materials on Website</h2>
              <p>
                TempMail has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by TempMail of the site. Use of any such linked website is at the user&apos;s own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Modifications</h2>
              <p>
                TempMail may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which TempMail operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Prohibited Uses</h2>
              <p>You may not use TempMail to:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Send spam or phishing emails</li>
                <li>Conduct illegal activities</li>
                <li>Infringe on intellectual property rights</li>
                <li>Harass or threaten other users</li>
                <li>Bypass security measures or access unauthorized systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Service Availability</h2>
              <p>
                TempMail strives to keep its service available 24/7, but does not guarantee uninterrupted service. We may perform maintenance or updates that could temporarily affect service availability.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
