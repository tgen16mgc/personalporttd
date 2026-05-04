"use client";

import { useId, useState, type FormEvent } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  name: "",
  email: "",
  message: "",
};

function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 97 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M57.2 1.4 54.4 2C57.9 20.8 66.9 29.7 76.2 34H1.3v3.7h75.3c-9.7 4.2-20.2 13.2-23.2 31.9l3.8.6C61.7 41.5 84.8 38 92.5 37.7c1.7.1 2.7 0 2.8 0l-.1-3.8h-3.9c-8.6-.5-29.1-4.6-34.1-32.5Z"
      />
    </svg>
  );
}

function validateForm(values: FormState): FieldErrors {
  const errors: FieldErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.name.trim()) {
    errors.name = "Add your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Add your email.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Use a valid email.";
  }

  if (!values.message.trim()) {
    errors.message = "Write a short message.";
  }

  return errors;
}

export function ContactForm() {
  const baseId = useId();
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = (field: keyof FormState, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setSubmitError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateForm(formState);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitError("Check the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name.trim(),
          email: formState.email.trim(),
          message: formState.message.trim(),
        }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(result?.error || "Failed to send message.");
      }

      setIsSubmitted(true);
      setFormState(initialFormState);
      setFieldErrors({});
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const nameId = `${baseId}-name`;
  const emailId = `${baseId}-email`;
  const messageId = `${baseId}-message`;

  if (isSubmitted) {
    return (
      <section
        aria-labelledby="contact-form-title"
        className="contact-panel contact-success border-y border-[var(--color-ink)]/15 py-8 sm:py-10"
      >
        <div className="contact-success-mark mb-6" aria-hidden="true" />
        <p className="contact-form-item mb-3 text-sm font-medium text-[var(--color-ink-muted)]">
          Message sent
        </p>
        <h2
          id="contact-form-title"
          className="contact-form-item font-[var(--font-display)] text-4xl font-light leading-tight tracking-normal text-[var(--color-ink)]"
        >
          Thanks. I will reply soon.
        </h2>
        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setSubmitError(null);
            setFieldErrors({});
          }}
          className="contact-form-item group mt-8 inline-flex min-h-11 cursor-pointer items-center gap-4 rounded-sm border border-[var(--color-ink)]/15 bg-white/55 px-4 py-2.5 text-sm font-medium text-[var(--color-ink)] transition-colors duration-200 hover:bg-[var(--color-ink)] hover:text-white active:-translate-y-[1px]"
        >
          Send another
          <ArrowGlyph className="h-4 w-7 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="contact-form-title"
      className="contact-panel border-y border-[var(--color-ink)]/15 py-8 sm:py-10"
    >
      <div className="contact-form-item mb-7">
        <p className="mb-2 text-sm font-medium text-[var(--color-ink-muted)]">
          Short form
        </p>
        <h2
          id="contact-form-title"
          className="font-[var(--font-display)] text-4xl font-light leading-tight tracking-normal text-[var(--color-ink)]"
        >
          Tell me the basics.
        </h2>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="contact-form-item contact-field space-y-2">
          <label
            htmlFor={nameId}
            className="contact-label block text-sm font-medium text-[var(--color-ink)]"
          >
            Name
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            value={formState.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? `${nameId}-error` : undefined}
            className="contact-input w-full border-0 border-b border-[var(--color-ink)]/20 bg-transparent px-0 py-3 text-base text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-cyan)] focus:outline-none"
            placeholder="Your name"
          />
          {fieldErrors.name ? (
            <p id={`${nameId}-error`} className="text-sm text-red-700" role="alert">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div className="contact-form-item contact-field space-y-2">
          <label
            htmlFor={emailId}
            className="contact-label block text-sm font-medium text-[var(--color-ink)]"
          >
            Email
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? `${emailId}-error` : undefined}
            className="contact-input w-full border-0 border-b border-[var(--color-ink)]/20 bg-transparent px-0 py-3 text-base text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-cyan)] focus:outline-none"
            placeholder="name@email.com"
          />
          {fieldErrors.email ? (
            <p id={`${emailId}-error`} className="text-sm text-red-700" role="alert">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div className="contact-form-item contact-field space-y-2">
          <label
            htmlFor={messageId}
            className="contact-label block text-sm font-medium text-[var(--color-ink)]"
          >
            Message
          </label>
          <textarea
            id={messageId}
            name="message"
            rows={4}
            value={formState.message}
            onChange={(event) => updateField("message", event.target.value)}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? `${messageId}-error` : undefined}
            className="contact-input min-h-28 w-full resize-none border-0 border-b border-[var(--color-ink)]/20 bg-transparent px-0 py-3 text-base text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:border-[var(--color-cyan)] focus:outline-none"
            placeholder="What are we making?"
          />
          {fieldErrors.message ? (
            <p id={`${messageId}-error`} className="text-sm text-red-700" role="alert">
              {fieldErrors.message}
            </p>
          ) : null}
        </div>

        {submitError ? (
          <p
            className="border-l border-red-700 pl-4 text-sm text-red-700"
            role="alert"
            aria-live="assertive"
          >
            {submitError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="contact-form-item contact-submit group inline-flex min-h-12 w-full cursor-pointer items-center justify-between rounded-sm bg-[var(--color-ink)] px-5 py-4 text-left text-sm font-medium text-white transition-colors duration-200 hover:bg-[#262626] active:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span>{isSubmitting ? "Sending" : "Send message"}</span>
          <ArrowGlyph className="h-4 w-9 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </form>
    </section>
  );
}
