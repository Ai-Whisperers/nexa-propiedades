import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'nexa-propiedades',
  description: 'Website',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}
