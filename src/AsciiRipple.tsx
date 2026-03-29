/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo, useRef, useState, type JSX } from "react";
import styled from "styled-components";

/**
 * AsciiRippleWave (TypeScript + styled-components)
 *
 * Renders children, and when clicked, emits ASCII wavefronts that TRAVEL across
 * the container — characters animate outward from the click, not just scaling.
 *
 * How it works:
 * - We maintain a lightweight grid (cols x rows) that spans the container.
 * - On each animation frame, we compute a traveling wave for every active ripple
 *   based on distance from the click origin and time since click.
 * - The resulting intensity field is mapped to ASCII characters.
 * - We render a single <pre> overlay whose characters update smoothly.
 *
 * Performance notes:
 * - Defaults are conservative. If you want sharper detail, increase cols/rows.
 * - Uses requestAnimationFrame with minimal allocations.
 */

export interface AsciiRippleProps {
  className?: string;
  /** Grid columns across the container (default 64) */
  cols?: number;
  /** Grid rows across the container (default 32) */
  rows?: number;
  /** Wave speed in pixels/second (default 600) */
  waveSpeed?: number;
  /** Overall wave decay factor (higher = faster fade) (default 1.25) */
  decay?: number;
  /** ASCII ramp from light→heavy (you can customize) */
  charset?: string;
  /** Text color (default rgba(100,100,100,0.35)) */
  color?: string;
  /** Font size in px (default 11) */
  fontSize?: number;
  /** Line-height multiplier (default 0.95) */
  lineHeight?: number;
  children?: React.ReactNode;
}

interface Ripple {
  id: number;
  x: number; // click x (px within container)
  y: number; // click y (px within container)
  t0: number; // ms timestamp
}

export default function AsciiRipple({
  className = "",
  cols = 120,
  rows = 120,
  waveSpeed = 600, // px/sec
  decay = 1.25,
  charset = " .:-=+*#%@",
  color = "rgba(100,100,100,0.35)",
  fontSize = 11,
  lineHeight = 0.95,
  children,
}: AsciiRippleProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [gridText, setGridText] = useState<string>("");
  const ripplesRef = useRef<Ripple[]>([]);
  const nextIdRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  // Precompute grid coordinates in normalized [0,1] and aspect-aware scaling.
  const coords = useMemo(() => {
    // Filled at runtime once we know container size; placeholder to avoid nulls
    return Array.from({ length: rows * cols }, () => ({ x: 0, y: 0 }));
  }, [cols, rows]);

  // Recompute the coordinate map when container size changes
  const recomputeCoords = useCallback(() => {
    const el = containerRef.current;
    if (!el) return { w: 0, h: 0 };
    const rect = el.getBoundingClientRect();
    lastSizeRef.current = { w: rect.width, h: rect.height };

    const aspectFixY = 2.0; // compensate vertical squish for monospace
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        // center of each cell in px
        const x = (c + 0.5) * (rect.width / cols);
        const y = (r + 0.5) * (rect.height / rows);
        // store with aspect fix applied on y during distance calc
        (coords as any)[i] = { x, y: y / aspectFixY };
      }
    }
    return { w: rect.width, h: rect.height };
  }, [cols, rows, coords]);

  // Initialize grid layout on mount and when resized
  useEffect(() => {
    recomputeCoords();
    const ro = new ResizeObserver(() => recomputeCoords());
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [recomputeCoords]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ripplesRef.current.push({ id: nextIdRef.current++, x, y: y / 2.0, t0: performance.now() });
  }, []);

  // ASCII mapping helper
  const charFromIntensity = useCallback(
    (v: number) => {
      // v is approximately 0..1 — clamp and map to charset
      const clamped = Math.max(0, Math.min(1, v));
      const idx = Math.round(clamped * (charset.length - 1));
      return charset[idx];
    },
    [charset]
  );

  // Main animation loop
  useEffect(() => {
    let running = true;

    const tick = () => {
      if (!running) return;
      const now = performance.now();
      const { w, h } = lastSizeRef.current;
      if (!w || !h) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // Build intensity field
      const speed = waveSpeed / 1000; // px per ms → px/ms
      const lines: string[] = [];

      for (let r = 0; r < rows; r++) {
        let line = "";
        for (let c = 0; c < cols; c++) {
          const { x, y } = (coords as any)[r * cols + c];

          // Superpose all ripples
          let amp = 0;
          for (let k = 0; k < ripplesRef.current.length; k++) {
            const R = ripplesRef.current[k];
            const dx = x - R.x;
            const dy = y - R.y; // y already aspect-adjusted
            const dist = Math.sqrt(dx * dx + dy * dy);
            const t = (now - R.t0); // ms
            const front = speed * t; // px the wave has traveled

            // Only consider near the wavefront with a Gaussian envelope
            const spread = 14; // thickness of ring in px (larger = thicker)
            const envelope = Math.exp(-((dist - front) * (dist - front)) / (2 * spread * spread));

            // Oscillatory carrier to add texture/ripples inside the ring
            const wavelength = 24; // px between crests
            const phase = (2 * Math.PI * (dist - front)) / wavelength;
            const wave = Math.cos(phase);

            // Decay over time so old ripples disappear
            const life = Math.exp(-(t / 1000) * decay);

            amp += envelope * wave * life;
          }

          // normalize amp roughly to 0..1
          // shift & scale to bias toward subtle visuals
          const intensity = Math.max(0, Math.min(1, 0.5 + 0.5 * amp));
          line += charFromIntensity(intensity);
        }
        lines.push(line);
      }

      // Cull old ripples whose front is far off-screen
      const maxDim = Math.hypot(w, h / 2.0) + 48;
      const speedPxMs = waveSpeed / 1000;
      ripplesRef.current = ripplesRef.current.filter((R) => (speedPxMs * (now - R.t0)) < maxDim);

      setGridText(lines.join("\n"));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [rows, cols, waveSpeed, decay, charFromIntensity, coords]);

  return (
    <Container ref={containerRef} className={className} onClick={handleClick}>
      <Overlay
        style={{
          color,
          fontSize: `${fontSize}px`,
          lineHeight: lineHeight.toString(),
        }}
        aria-hidden
      >
        {gridText}
      </Overlay>
      <Foreground>{children}</Foreground>
    </Container>
  );
}

// --- styled ---
const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  /* Give the overlay room; you can size with your own styles */
  width: 100$;
  height: 100%;
`;

const Overlay = styled.pre`
  position: absolute;
  inset: 0;
  z-index: 0;
  margin: 0;
  white-space: pre;
  overflow: hidden;
  pointer-events: none;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
`;

const Foreground = styled.div`
  position: relative;
  z-index: 10;
`;

/**
 * Example usage:
 *
 * <AsciiRippleWave cols={72} rows={36} waveSpeed={700}>
 *   <div style={{ padding: 16, borderRadius: 12, background: "#111", color: "white" }}>
 *     Click me — waves travel
 *   </div>
 * </AsciiRippleWave>
 */
