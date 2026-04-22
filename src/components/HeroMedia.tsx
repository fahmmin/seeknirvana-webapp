"use client";
import { useEffect, useRef, useState } from "react";


interface HeroMediaProps {
  scrollSectionId: string;
  frameCount: number;
}

const pad = (value: number) => String(value).padStart(4, "0");

const MOBILE_BREAKPOINT = 768;
const MOBILE_STEP = 3;

export const HeroMedia = ({ scrollSectionId, frameCount }: HeroMediaProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);


  useEffect(() => {
    const canvas = canvasRef.current;
    const section = document.getElementById(scrollSectionId);

    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = () => window.innerWidth < MOBILE_BREAKPOINT;

    // Build frame key list — mobile loads every Nth frame to cut bandwidth
    const buildFrameKeys = () => {
      const step = isMobile() ? MOBILE_STEP : 1;
      const keys: number[] = [];
      for (let i = 1; i <= frameCount; i += step) keys.push(i);
      // Always include last frame for full scroll completion
      if (keys[keys.length - 1] !== frameCount) keys.push(frameCount);
      return keys;
    };

    let frameKeys = buildFrameKeys();
    const loaded: HTMLImageElement[] = new Array(frameKeys.length);

    const syncCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const drawFrame = (keyIndex: number) => {
      const img = loaded[keyIndex];
      if (!img?.complete || !img.naturalWidth) return;
      const { width: cw, height: ch } = canvas;
      // object-cover: scale to fill, center crop
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    // Progressive loading: batch 0 = frames 0-9 (immediate), batch 1 = 10-49, batch 2 = rest
    let loadedMobile = isMobile();
    const loadBatch = (startIdx: number, endIdx: number, onDone?: () => void) => {
      let pending = 0;
      for (let i = startIdx; i < endIdx && i < frameKeys.length; i++) {
        const idx = i;
        const img = new Image();
        img.decoding = "async";
        img.src = `/frames/frame-${pad(frameKeys[idx])}.jpg`;
        loaded[idx] = img;
        pending++;
        img.onload = img.onerror = () => {
          pending--;
          if (idx === 0) {
            drawFrame(0); // paint first frame ASAP
            setIsCanvasReady(true);
          }
          if (pending === 0) onDone?.();
        };
      }
      if (pending === 0) onDone?.();
    };

    const startLoading = () => {
      // Batch 0: first 10 frames — immediate
      loadBatch(0, 10, () => {
        // Batch 1: frames 10-49 — idle
        const scheduleB1 = () =>
          loadBatch(10, 50, () => {
            // Batch 2: rest — idle
            const scheduleB2 = () => loadBatch(50, frameKeys.length);
            "requestIdleCallback" in window
              ? requestIdleCallback(scheduleB2)
              : setTimeout(scheduleB2, 0);
          });
        "requestIdleCallback" in window
          ? requestIdleCallback(scheduleB1)
          : setTimeout(scheduleB1, 0);
      });
    };

    let rafId = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let lastTime = performance.now();
    let currentKeyIndex = 0;

    const updateBounds = () => {
      const start = section.offsetTop;
      const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const raw = (window.scrollY - start) / distance;
      targetProgress = Math.max(0, Math.min(1, raw));
    };

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      currentProgress += (targetProgress - currentProgress) * Math.min(1, dt * 10);

      const nextKeyIndex = Math.min(
        frameKeys.length - 1,
        Math.max(0, Math.round(currentProgress * (frameKeys.length - 1))),
      );

      if (nextKeyIndex !== currentKeyIndex) {
        currentKeyIndex = nextKeyIndex;
        drawFrame(currentKeyIndex);
      }

      rafId = window.requestAnimationFrame(animate);
    };

    const onResize = () => {
      syncCanvasSize();
      drawFrame(currentKeyIndex);

      // Rebuild frame set if mobile ↔ desktop threshold crossed
      const nowMobile = isMobile();
      if (nowMobile !== loadedMobile) {
        loadedMobile = nowMobile;
        frameKeys = buildFrameKeys();
        currentKeyIndex = 0;
        startLoading();
      }
    };

    syncCanvasSize();
    startLoading();
    updateBounds();

    window.addEventListener("scroll", updateBounds, { passive: true });
    window.addEventListener("resize", onResize);
    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", updateBounds);
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(rafId);
    };
  }, [frameCount, scrollSectionId]);

  return (
    <div className="absolute inset-0">
      {/* 
        Instant first frame: 
        This loads via the preload link in layout.tsx and is visible 
        before any JS-based frame extraction or canvas initialization happens.
      */}
      <img
        src="/frames/frame-0001.jpg"
        alt=""
        aria-hidden="true"
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          isCanvasReady ? "opacity-0" : "opacity-100"
        }`}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
          isCanvasReady ? "opacity-100" : "opacity-0"
        }`}
        style={{ display: "block" }}
      />
    </div>
  );
};
