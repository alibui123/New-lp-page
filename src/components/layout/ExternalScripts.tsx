import Script from 'next/script';

export function ExternalScripts() {
  return (
    <>
      <Script src="https://unpkg.com/lenis@1.3.23/dist/lenis.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="afterInteractive" />
      <Script src="/gradient-bg.js" strategy="afterInteractive" />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
