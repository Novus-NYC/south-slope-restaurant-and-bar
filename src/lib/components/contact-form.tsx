"use client";

import { useState, type FormEvent } from "react";
import { mailHref, site } from "@/lib/site";

interface Errors {
  name?: string;
  message?: string;
}

const field =
  "mt-1.5 w-full rounded-md border-2 border-line bg-white px-3.5 py-2.5 text-body text-ink placeholder:text-ink-muted/70 focus:border-green-deep focus:shadow-none focus:outline-none";

/**
 * Short message form that opens the visitor's mail app with the message
 * prefilled (mailto). No data is sent anywhere else. Without JavaScript the
 * form posts straight to the mailto: address as plain text, so it still
 * opens the mail app with the fields in the body.
 */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  if (!site.email) return null;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = "Please add your name so we know who is writing.";
    if (!message.trim()) next.message = "Please write a short message.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const body = [
      message.trim(),
      "",
      `From: ${name.trim()}${email.trim() ? ` (${email.trim()})` : ""}`,
      "Sent from the website contact form",
    ].join("\n");
    const href = mailHref(`Message from ${name.trim()} via the website`, body);
    if (href) {
      window.location.href = href;
      setSent(true);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      action={mailHref() ?? undefined}
      method="post"
      encType="text/plain"
      className="flex flex-col gap-4"
    >
      <div>
        <label htmlFor="cf-name" className="text-sm font-semibold">
          Name <span className="text-green-deep">(required)</span>
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "cf-name-error" : undefined}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={field}
        />
        {errors.name ? (
          <p id="cf-name-error" className="mt-1.5 text-sm font-medium text-[#9A2E1F]">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="cf-email" className="text-sm font-semibold">
          Your email <span className="font-normal text-ink-muted">(optional, so we can reply)</span>
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={field}
        />
      </div>

      <div>
        <label htmlFor="cf-message" className="text-sm font-semibold">
          Message <span className="text-green-deep">(required)</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "cf-message-error" : "cf-message-help"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={field}
          placeholder="A question, a catering ask, or feedback on your last visit."
        />
        {errors.message ? (
          <p id="cf-message-error" className="mt-1.5 text-sm font-medium text-[#9A2E1F]">
            {errors.message}
          </p>
        ) : null}
      </div>

      <p id="cf-message-help" className="text-sm text-ink-muted">
        Sending opens your mail app with this message addressed to {site.email}. Nothing is sent
        until you press send there.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-green-deep px-5 py-2.5 text-body font-semibold text-cream transition-colors hover:bg-green-deeper"
        >
          Open in your mail app
        </button>
        {sent ? (
          <p role="status" className="text-sm font-medium text-green-deep">
            Your mail app should now be open with the message. If it is not, email us directly at{" "}
            {site.email}.
          </p>
        ) : null}
      </div>
    </form>
  );
}
