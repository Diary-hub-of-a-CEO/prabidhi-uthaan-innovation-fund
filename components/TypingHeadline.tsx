"use client";

import { useEffect, useState } from "react";

export default function TypingHeadline() {
  const lines = ["Good ideas deserve", "the chance to become real."];
  const [count, setCount] = useState(0);
  const total = lines.join(" ").length;
  useEffect(() => {
    const timer = window.setInterval(() => setCount((value) => value >= total ? value : value + 1), 50);
    return () => window.clearInterval(timer);
  }, [total]);
  const first = lines[0].slice(0, Math.min(count, lines[0].length));
  const second = lines[1].slice(0, Math.max(0, count - lines[0].length - 1));
  return <h1 className="typing-headline" style={{ color: "#30251d", textShadow: "0 2px 0 rgba(239, 229, 216, .45)" }}>{first}<br /><em style={{ color: "#624936" }}>{second}</em><span className="typing-caret" aria-hidden="true">|</span></h1>;
}
