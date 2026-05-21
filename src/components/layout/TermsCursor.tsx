'use client';

import { useEffect } from 'react';

export function TermsCursor() {
  useEffect(() => {
    const blob = document.getElementById('cursor-blob');
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    if (!blob || !finePointer) {
      return;
    }

    let mouseX = window.innerWidth * 0.5;
    let mouseY = window.innerHeight * 0.5;
    let blobX = mouseX;
    let blobY = mouseY;
    let frameId = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animate = () => {
      blobX += (mouseX - blobX) * 0.18;
      blobY += (mouseY - blobY) * 0.18;
      blob.style.transform = `translate3d(${blobX - 14}px, ${blobY - 14}px, 0)`;
      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return null;
}
