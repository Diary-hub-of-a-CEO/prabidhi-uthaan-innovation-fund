"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2, X } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  idea: string;
  stage: string;
};

const initialForm: FormState = { name: "", email: "", idea: "", stage: "" };

type ApplyModalProps = {
  className?: string;
  children: React.ReactNode;
};

export default function ApplyModal({ className = "button", children }: ApplyModalProps) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState(initialForm);

  const close = () => {
    setOpen(false);
    setSent(false);
  };

  const update = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <>
      <button className={className} type="button" onClick={() => setOpen(true)}>
        {children}
      </button>
      {open && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
          <section className="apply-modal" role="dialog" aria-modal="true" aria-labelledby="apply-modal-title">
            <button className="modal-close" type="button" onClick={close} aria-label="Close application form"><X size={20} /></button>
            {sent ? (
              <div className="modal-success">
                <CheckCircle2 size={44} />
                <p className="eyebrow"><span />APPLICATION RECEIVED</p>
                <h2 id="apply-modal-title">That is a strong start.</h2>
                <p>We have your first context. We will be in touch to continue the conversation.</p>
                <button className="button" type="button" onClick={close}>Close <ArrowUpRight size={18} /></button>
              </div>
            ) : (
              <>
                <p className="eyebrow"><span />START A CONVERSATION</p>
                <h2 id="apply-modal-title">Bring us your<br /><em>unfinished idea.</em></h2>
                <p className="modal-intro">No polished deck required. A little context is enough to begin.</p>
                <form className="modal-form" onSubmit={submit}>
                  <label>Your name<input required name="name" value={form.name} onChange={update} placeholder="Full name" /></label>
                  <label>Email address<input required type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" /></label>
                  <label>What are you building?<textarea required name="idea" value={form.idea} onChange={update} placeholder="The problem, your idea, and why now..." /></label>
                  <label>Current stage<select required name="stage" value={form.stage} onChange={update}><option value="">Choose a stage</option><option>Just an idea</option><option>Prototype / MVP</option><option>Early revenue</option><option>Growing venture</option></select></label>
                  <button className="button" type="submit">Send application <ArrowUpRight size={18} /></button>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}
