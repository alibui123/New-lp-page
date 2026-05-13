import Script from 'next/script';

export function ExternalScripts() {
  return (
    <>
      <Script src="https://unpkg.com/lenis@1.3.23/dist/lenis.min.js" strategy="afterInteractive" />
      <Script src="/gradient-bg.js" strategy="afterInteractive" />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
