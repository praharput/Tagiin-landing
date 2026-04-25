import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tagiin — Tagih lebih mudah, dibayar lebih cepat',
  description: 'Invoice profesional + reminder WhatsApp otomatis + QRIS untuk freelancer & UMKM Indonesia.',
  openGraph: {
    title: 'Tagiin',
    description: 'Tagih lebih mudah, dibayar lebih cepat.',
    url: 'https://tagiin.app',
    siteName: 'Tagiin',
    locale: 'id_ID',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}