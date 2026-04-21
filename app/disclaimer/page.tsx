import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Disclaimer | TempMail',
  description: 'Review our disclaimer and understand the limitations and responsibilities when using TempMail.',
};

export default function Disclaimer() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Disclaimer</h1>
            <p className="text-slate-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">General Disclaimer</h2>
              <p>
                The information provided by TempMail (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) on our website is for general informational purposes only. All information on the site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Use at Your Own Risk</h2>
              <p>
                Under no circumstance shall TempMail have any liability to you in connection with your use of this website. This includes liability arising from any lost profits, data loss, or any special, indirect, incidental, punitive, or consequential damages arising out of or related to this website or the information contained herein, even if we have been advised of the possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Temporary Nature of Service</h2>
              <p>
                TempMail provides temporary, disposable email addresses. These email addresses are:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Not intended for long-term use or important communications</li>
                <li>Subject to automatic deletion after periods of inactivity</li>
                <li>May not receive all emails sent to them</li>
                <li>Not guaranteed to be available at any particular time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">No Liability for Service Interruptions</h2>
              <p>
                TempMail makes no warranty that:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>The website will be available without interruption</li>
                <li>Email delivery will be timely or guaranteed</li>
                <li>Emails stored in your inbox will be permanently preserved</li>
                <li>The service will be free from errors or malicious code</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">User Responsibility</h2>
              <p>
                You acknowledge and agree that:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>You use TempMail entirely at your own risk</li>
                <li>You are responsible for maintaining the confidentiality of your temporary email address</li>
                <li>You are responsible for all activities conducted through your temporary email account</li>
                <li>You will not use TempMail for illegal or harmful purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">No Professional Advice</h2>
              <p>
                Nothing on TempMail should be interpreted as professional advice. For specific questions regarding your personal circumstances, please consult with a qualified professional.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">External Links Disclaimer</h2>
              <p>
                TempMail may contain links to external websites. We do not endorse and are not responsible for the content, accuracy, or privacy practices of external websites. Your use of external websites is entirely at your own risk and subject to their terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Not for Critical Communications</h2>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="font-semibold text-amber-900 mb-2">⚠️ Important Warning:</p>
                <p>
                  TempMail temporary emails should NOT be used for:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-3 text-amber-900">
                  <li>Password recovery or account authentication</li>
                  <li>Important business or legal communications</li>
                  <li>Financial transactions or banking</li>
                  <li>Critical personal matters</li>
                  <li>Any communication you need to access later</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
              <p>
                In the event of any dispute, your sole and exclusive remedy shall be limited to the amount you paid for the service. To the fullest extent permitted by law, TempMail shall not be liable for indirect, incidental, special, consequential, or punitive damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to Disclaimer</h2>
              <p>
                TempMail reserves the right to modify this disclaimer at any time. Your continued use of the service following any changes constitutes your acceptance of the updated disclaimer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
              <p>
                If you have any questions about this disclaimer, please contact us at <span className="font-mono bg-slate-100 px-2 py-1 rounded">support@tempmail.io</span>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
