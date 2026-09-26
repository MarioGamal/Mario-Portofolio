"use client";

import { useRef, useState } from "react";

const fieldClass =
  "w-full rounded-[4px] border border-line bg-surface px-3.5 py-2.5 text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none focus-visible:outline-2 aria-[invalid=true]:border-[#C23B3B]";

const Field = ({ id, label, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="font-semibold">
      {label}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} className="pop is-in text-sm text-[#C23B3B] dark:text-[#FF8A8A]">
        {error}
      </p>
    )}
  </div>
);

const ContactForm = () => {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [sentTo, setSentTo] = useState("");
  const formRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    setErrors({});
    setFormError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        setSentTo(data.email);
        setStatus("sent");
        return;
      }
      if (json.errors) {
        setErrors(json.errors);
        // Send focus to the first field that needs fixing.
        const first = Object.keys(json.errors)[0];
        formRef.current?.elements[first]?.focus();
      }
      setFormError(json.error || "");
      setStatus("error");
    } catch {
      setFormError("You seem to be offline. Check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="pop is-in rounded-[6px] border border-line bg-surface p-6 sm:p-8">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-9 w-9 text-accent">
          <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path className="check-draw" d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="mt-4 text-xl font-[720] wide">Message sent</p>
        <p className="mt-2 max-w-[48ch] text-muted">
          Thanks for getting in touch. I&rsquo;ll reply to {sentTo}.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link mt-5"
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={fieldClass}
          />
        </Field>
        <Field id="email" label="Your email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldClass}
          />
        </Field>
      </div>

      <Field id="message" label="What are you building?" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={5000}
          placeholder="Who it's for, what it needs to do, and when you need it"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${fieldClass} resize-y`}
        />
      </Field>

      {/* Hidden from people; bots that fill every field get silently dropped. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {formError && (
        <p role="alert" className="pop is-in rounded-[4px] border border-[#C23B3B]/40 bg-[#C23B3B]/10 px-4 py-3 text-sm">
          {formError}
        </p>
      )}

      <p>
        <button type="submit" disabled={sending} className="btn disabled:cursor-wait disabled:opacity-70">
          {sending && <span className="pulse-dot !bg-bg" aria-hidden="true" />}
          {sending ? "Sending…" : "Send message"}
        </button>
      </p>
    </form>
  );
};

export default ContactForm;
