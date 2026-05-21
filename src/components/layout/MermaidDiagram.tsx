'use client';

import { useEffect, useId, useState } from 'react';

type MermaidDiagramProps = {
  chart: string;
  className?: string;
};

export function MermaidDiagram({ chart, className }: MermaidDiagramProps) {
  const id = useId().replace(/:/g, '');
  const [svg, setSvg] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function renderChart() {
      try {
        const mermaid = (await import('mermaid')).default;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: 'dark',
        });

        const { svg: renderedSvg } = await mermaid.render(`mermaid-${id}`, chart);
        if (!cancelled) {
          setSvg(renderedSvg);
        }
      } catch {
        if (!cancelled) {
          setSvg('');
        }
      }
    }

    renderChart();

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (!svg) {
    return (
      <pre className={className} aria-label="Audit decision flow chart">
        {chart}
      </pre>
    );
  }

  return (
    <div
      className={className}
      aria-label="Audit decision flow chart"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
