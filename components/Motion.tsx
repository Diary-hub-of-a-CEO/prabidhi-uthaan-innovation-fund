"use client";

import { useEffect, useRef, useState } from "react";

type MotionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function ScrollReveal({ children, className = "", delay = 0 }: MotionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>{children}</div>;
}

export function FadeIn(props: MotionProps) { return <ScrollReveal {...props} className={`fade-in ${props.className ?? ""}`} />; }
export function SlideUp(props: MotionProps) { return <ScrollReveal {...props} className={`slide-up ${props.className ?? ""}`} />; }
export function ScaleReveal(props: MotionProps) { return <ScrollReveal {...props} className={`scale-reveal ${props.className ?? ""}`} />; }

export function StaggerChildren({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`stagger ${className}`}>{children}</div>;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
