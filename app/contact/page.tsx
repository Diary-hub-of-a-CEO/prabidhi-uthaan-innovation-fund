"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2, Mail, MapPin } from "lucide-react";
import { Kicker } from "../../components/Section";

type ContactForm = { name: string; email: string; company: string; inquiry: string; message: string };
const initialForm: ContactForm = { name: "", email: "", company: "", inquiry: "Founder inquiry", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const update = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("loading");
    try {
      const subject = encodeURIComponent(`${form.inquiry} — ${form.company || form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nCompany / Startup: ${form.company}\n\n${form.message}`);
      window.location.href = `mailto:prabidhi.uthaan@gmail.com?subject=${subject}&body=${body}`;
      window.setTimeout(() => setState("success"), 450);
    } catch { setState("error"); }
  };
  return <main className="contact-page"><section className="contact-hero"><Kicker>CONTACT · THE DOOR IS OPEN</Kicker><h1>Let's talk about<br /><em>what you're building.</em></h1><p>Tell us where you are, what you have learned, and what you are trying to make true.</p><div className="contact-details"><a href="mailto:prabidhi.uthaan@gmail.com"><Mail size={17} /> prabidhi.uthaan@gmail.com</a><span><MapPin size={17} /> Kathmandu · Nepal</span></div></section><section className="contact-form-wrap"><div><Kicker>MAKE AN INTRODUCTION</Kicker><h2>A short note<br />is enough.</h2></div>{state === "success" ? <div className="form-state success"><CheckCircle2 size={38} /><h2>Your email client should be open.</h2><p>Complete the message there and send it when you are ready. We look forward to reading it.</p><button className="text-link" type="button" onClick={() => setState("idle")}>Write another note <ArrowUpRight size={16} /></button></div> : <form className="contact-form" onSubmit={submit}><label>Name<input required name="name" value={form.name} onChange={update} placeholder="Your name" /></label><label>Email<input required type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" /></label><label>Company / Startup<input name="company" value={form.company} onChange={update} placeholder="What are you building?" /></label><label>Inquiry type<select name="inquiry" value={form.inquiry} onChange={update}><option>Founder inquiry</option><option>Investment inquiry</option><option>Partnership</option><option>General inquiry</option></select></label><label>Message<textarea required name="message" value={form.message} onChange={update} placeholder="A little context goes a long way..." /></label>{state === "error" && <p className="form-error">We could not prepare the email handoff. Please write to prabidhi.uthaan@gmail.com directly.</p>}<button className="button" type="submit" disabled={state === "loading"}>{state === "loading" ? "Preparing note..." : <>Send your note <ArrowUpRight size={18} /></>}</button></form>}</section></main>;
}
