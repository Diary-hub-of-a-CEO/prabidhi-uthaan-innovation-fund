import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const links = [["Programs", "/programs"], ["Our thesis", "/thesis"], ["Team", "/team"], ["About", "/about"], ["Approach", "/approach"], ["Portfolio", "/portfolio"], ["Insights", "/insights"], ["Contact", "/contact"]];

export default function SiteFooter() {
  return <footer className="site-footer"><div className="footer-heading"><p className="eyebrow">PRABIDHI UTHAAN · INNOVATION FUND</p><h2>Build something<br /><em>worth remembering.</em></h2><Link className="footer-cta" href="/pitch">Pitch your idea <ArrowUpRight size={17} /></Link></div><div className="footer-bottom"><div className="footer-brand"><img src="/prabidhi-uthaan-logo.svg" alt="Prabidhi Uthaan Entrepreneurship and Business Incubation" /><p>Backing Ideas. Building Businesses.</p></div><nav className="footer-links">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav><div className="footer-meta"><span>© 2026 Prabidhi Uthaan</span><span>Privacy · Terms</span></div></div></footer>;
}
