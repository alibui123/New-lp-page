import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Finova Solutions — Dispatch Automation for Plumbing Teams',
  description: 'AI dispatch automation for plumbing companies.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Primary favicon (PNG in public/assets) */}
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/finova-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/finova-icon.png" />
        <link rel="apple-touch-icon" href="/assets/finova-icon.png" />
        {/* No SVG fallback: use PNG in /assets as the single favicon source */}
        <meta name="theme-color" content="#051026" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://unpkg.com/lenis@1.3.23/dist/lenis.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
