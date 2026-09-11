import { ScrollReveal } from "./Motion";

export function Section({ eyebrow, title, children, className = "" }: { eyebrow?: string; title?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return <section className={`section-shell ${className}`}><div className="section-inner">{eyebrow && <p className="eyebrow"><span />{eyebrow}</p>}{title && <ScrollReveal><h2 className="section-title">{title}</h2></ScrollReveal>}{children}</div></section>;
}

export function Kicker({ children }: { children: React.ReactNode }) { return <p className="eyebrow"><span />{children}</p>; }
