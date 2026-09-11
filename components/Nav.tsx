 "use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ApplyModal from "./ApplyModal";

const links = [["Programs", "/programs"], ["Thesis", "/thesis"], ["Team", "/team"], ["About", "/about"], ["Portfolio", "/portfolio"], ["Insights", "/insights"]];

export default function Nav() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
		const update = () => setScrolled(window.scrollY > 24);
		update();
		window.addEventListener("scroll", update, { passive: true });
		return () => window.removeEventListener("scroll", update);
	}, []);
	return <header className={`nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}><Link className="logo" href="/" onClick={() => setOpen(false)} aria-label="Prabidhi Uthaan home"><img src="/prabidhi-uthaan-logo.svg" alt="Prabidhi Uthaan" /></Link><button className="menu" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X /> : <Menu />}</button><nav>{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link className="nav-contact" href="/contact" onClick={() => setOpen(false)}>Contact</Link><ApplyModal className="nav-cta">Pitch your idea <ArrowUpRight size={16} /></ApplyModal></nav></header>;
}