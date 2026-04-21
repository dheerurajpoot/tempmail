import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-slate-900 mb-3">404</h1>
          <p className="text-xl text-slate-600 font-semibold mb-2">Page Not Found</p>
          <p className="text-slate-600 mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
          </p>
          
          <Link href="/">
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200">
              Go Back Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
