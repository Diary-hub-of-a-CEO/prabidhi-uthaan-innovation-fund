"use client";

import { useEffect, useRef } from "react";

type LiquidEtherProps = { colors?: string[]; className?: string };

export function LiquidEther({ colors = ["#8b7764", "#b2a18b", "#3d342d"], className = "" }: LiquidEtherProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let frame = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: .5, y: .5, active: false };
    const blobs = colors.map((color, index) => ({ color, x: .2 + index * .3, y: .3 + (index % 2) * .35, size: .22 + index * .035, phase: index * 2.1 }));
    const resize = () => { const ratio = Math.min(window.devicePixelRatio || 1, 1.5); width = canvas.clientWidth; height = canvas.clientHeight; canvas.width = width * ratio; canvas.height = height * ratio; context.setTransform(ratio, 0, 0, ratio, 0, 0); };
    const move = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); pointer.x = (event.clientX - rect.left) / rect.width; pointer.y = (event.clientY - rect.top) / rect.height; pointer.active = true; };
    const draw = (time: number) => { context.clearRect(0, 0, width, height); context.fillStyle = "rgba(18, 15, 12, .32)"; context.fillRect(0, 0, width, height); blobs.forEach((blob) => { const drift = time / 5500 + blob.phase; const x = (blob.x + Math.sin(drift) * .08 + (pointer.x - .5) * .05) * width; const y = (blob.y + Math.cos(drift * .8) * .08 + (pointer.y - .5) * .05) * height; const radius = blob.size * Math.max(width, height); const gradient = context.createRadialGradient(x, y, 0, x, y, radius); gradient.addColorStop(0, `${blob.color}bb`); gradient.addColorStop(.55, `${blob.color}44`); gradient.addColorStop(1, `${blob.color}00`); context.fillStyle = gradient; context.beginPath(); context.arc(x, y, radius, 0, Math.PI * 2); context.fill(); }); frame = requestAnimationFrame(draw); };
    resize(); window.addEventListener("resize", resize); canvas.addEventListener("pointermove", move); frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); canvas.removeEventListener("pointermove", move); };
  }, [colors]);
  return <canvas ref={canvasRef} className={`liquid-ether ${className}`} aria-hidden="true" />;
}
