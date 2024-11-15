import { Poppins } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./providers";
import Navbar from "./components/Navbar";

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"]
});

export const metadata = {
  title: "Gaadi Dekho - Buy and Sell Cars",
  description: "India&apos;s most trusted car marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Gaadi Dekho</h3>
                  <p className="text-gray-400">India&apos;s most trusted car marketplace</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>About Us</li>
                    <li>New Cars</li>
                    <li>Used Cars</li>
                    <li>Sell Car</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Popular Brands</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>Maruti Suzuki</li>
                    <li>Hyundai</li>
                    <li>Honda</li>
                    <li>Toyota</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>Email: support@gaadidekho.com</li>
                    <li>Phone: 1800-XXX-XXXX</li>
                    <li>Address: Bangalore, India</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                <p> {new Date().getFullYear()} Gaadi Dekho. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </NextAuthProvider>
      </body>
    </html>
  );
}
