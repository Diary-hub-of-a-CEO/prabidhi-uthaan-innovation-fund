"use client";

import { useEffect, useState } from "react";
import { MousePointer2 } from "lucide-react";

export function Loader() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("pu-intro-seen")) return;
    setShow(true);
    const started = Date.now();
    const interval = window.setInterval(() => {
      const next = Math.min(100, Math.round(((Date.now() - started) / 1100) * 100));
      setProgress(next);
      if (next >= 100) {
        window.clearInterval(interval);
        window.setTimeout(() => { sessionStorage.setItem("pu-intro-seen", "1"); setShow(false); }, 220);
      }
    }, 30);
    return () => window.clearInterval(interval);
  }, []);

  if (!show) return null;
  return <div className="site-loader" aria-label="Loading Prabidhi Uthaan" role="status"><div className="loader-mark"><img src="/prabidhi-uthaan-logo.svg" alt="Prabidhi Uthaan" /></div><div className="loader-number">{String(progress).padStart(2, "0")}</div><div className="loader-line"><span style={{ transform: `scaleX(${progress / 100})` }} /></div></div>;
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? window.scrollY / height : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />;
}

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover) return;
    setEnabled(true);
    const cursor = document.querySelector<HTMLElement>(".cursor");
    if (!cursor) return;
    const move = (event: MouseEvent) => { cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`; };
    const over = (event: MouseEvent) => { if ((event.target as HTMLElement).closest("a, button, [data-cursor]")) cursor.classList.add("is-active"); };
    const out = (event: MouseEvent) => { if ((event.target as HTMLElement).closest("a, button, [data-cursor]")) cursor.classList.remove("is-active"); };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); document.removeEventListener("mouseout", out); };
  }, []);
  if (!enabled) return null;
  return <div className="cursor" aria-hidden="true"><MousePointer2 size={11} /></div>;
}

export function Experience() {
  return <><Loader /><ScrollProgress /><Cursor /></>;
}
