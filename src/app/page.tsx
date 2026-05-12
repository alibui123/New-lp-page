import { ExternalScripts } from '@/components/layout/ExternalScripts';
import { NavBar } from '@/components/layout/NavBar';
import { Overlays } from '@/components/layout/Overlays';
import { Chapter0 } from '@/components/sections/Chapter0';
import { Chapter1 } from '@/components/sections/Chapter1';
import { Chapter2 } from '@/components/sections/Chapter2';
import { Chapter3 } from '@/components/sections/Chapter3';
import { Chapter4 } from '@/components/sections/Chapter4';
import { Chapter5 } from '@/components/sections/Chapter5';
import { Chapter6 } from '@/components/sections/Chapter6';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Overlays />
      <NavBar />
      <Chapter0 />
      <Chapter1 />
      <Chapter2 />
      <Chapter3 />
      <Chapter4 />
      <Chapter5 />
      <Chapter6 />
      <ContactSection />
      <ExternalScripts />
    </>
  );
}
