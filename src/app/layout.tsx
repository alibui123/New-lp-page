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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
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
