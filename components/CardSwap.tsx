"use client";

import { useEffect, useMemo, useState } from "react";

type CardProps = { children: React.ReactNode; className?: string };
type CardSwapProps = { children: React.ReactNode; delay?: number; pauseOnHover?: boolean; className?: string };

export function Card({ children, className = "" }: CardProps) {
  return <article className={`swap-card ${className}`}>{children}</article>;
}

export default function CardSwap({ children, delay = 4000, pauseOnHover = true, className = "" }: CardSwapProps) {
  const cards = useMemo(() => Array.isArray(children) ? children : [children], [children]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || cards.length < 2) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % cards.length), delay);
    return () => window.clearInterval(timer);
  }, [cards.length, delay, paused]);

  return <div className={`card-swap ${className}`} onMouseEnter={() => pauseOnHover && setPaused(true)} onMouseLeave={() => pauseOnHover && setPaused(false)} aria-label="Program highlights">
    {cards.map((card, index) => <div className={`swap-slot ${index === active ? "is-front" : ""}`} style={{ "--slot": `${(index - active + cards.length) % cards.length}` } as React.CSSProperties} key={index}>{card}</div>)}
  </div>;
}
