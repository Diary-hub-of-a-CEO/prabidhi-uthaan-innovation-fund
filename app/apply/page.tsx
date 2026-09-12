"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function Apply() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    idea: "",
    stage: "",
  });

  const update = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          type: "application",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application.");
      }

      setSent(true);

      setForm({
        name: "",
        email: "",
        idea: "",
        stage: "",
      });
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page apply">
      <div className="eyebrow">
        <span />
        START A CONVERSATION
      </div>

      <h1>
        Tell us what
        <br />
        <em>you are building.</em>
      </h1>

      <p className="lead">
        No polished pitch deck required. Give us enough context to understand
        the problem, your insight, and what you want to make real.
      </p>

      {sent ? (
        <div className="success">
          <CheckCircle2 size={42} />

          <h2>Application received.</h2>

          <p>
            Thank you for reaching out. Your application has been sent to the
            Prabidhi Uthaan team. We will review your idea and get back to you.
          </p>

          <button
            className="button"
            onClick={() => setSent(false)}
            type="button"
          >
            Submit another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Your name

            <input
              required
              name="name"
              value={form.name}
              onChange={update}
              placeholder="Full name"
            />
          </label>

          <label>
            Email address

            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={update}
              placeholder="you@example.com"
            />
          </label>

          <label>
            What are you building?

            <textarea
              required
              name="idea"
              value={form.idea}
              onChange={update}
              placeholder="The problem, your idea, and why now..."
            />
          </label>

          <label>
            Current stage

            <select
              required
              name="stage"
              value={form.stage}
              onChange={update}
            >
              <option value="">Choose a stage</option>
              <option>Just an idea</option>
              <option>Prototype / MVP</option>
              <option>Early revenue</option>
              <option>Growing venture</option>
            </select>
          </label>

          {error && (
            <p
              style={{
                color: "#a33",
                margin: 0,
                fontSize: "14px",
              }}
            >
              {error}
            </p>
          )}

          <button
            className="button"
            type="submit"
            disabled={loading}
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Sending..." : "Send application"}

            {!loading && <ArrowUpRight size={18} />}
          </button>
        </form>
      )}
    </main>
  );
}
