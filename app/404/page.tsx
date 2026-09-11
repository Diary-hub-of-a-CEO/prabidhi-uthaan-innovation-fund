import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFoundPage() { return <main className="not-found"><span className="not-found-number">404</span><p className="eyebrow"><span />WRONG DIRECTION</p><h1>This idea<br /><em>doesn't exist here.</em></h1><Link className="button" href="/">Back home <ArrowUpRight size={18} /></Link></main>; }
