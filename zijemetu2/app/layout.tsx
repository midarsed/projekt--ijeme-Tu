import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from './lib/auth-context'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: 'Žijeme tu! – Strážnice',
  description: 'Sdružení nezávislých kandidátek Strážnice. Hlasujte o projektech pro naše město.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
