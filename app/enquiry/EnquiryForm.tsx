"use client";

import { useState } from "react";
import { budgets, enquirySchema, projectTypes, timelines, type EnquiryInput } from "@/lib/enquiry";

type Errors = Partial<Record<keyof EnquiryInput | "form", string>>;

const textFields: { name: "name" | "email" | "phone" | "location"; label: string; autoComplete: string; type?: string }[] = [
  { name: "name", label: "Name", autoComplete: "name" },
  { name: "email", label: "Email", autoComplete: "email", type: "email" },
  { name: "phone", label: "Phone or WhatsApp", autoComplete: "tel", type: "tel" },
  { name: "location", label: "Location (optional)", autoComplete: "address-level2" },
];

const labelClass = "text-xs font-medium tracking-brand text-ash uppercase";
const controlClass =
  "mt-2 h-12 w-full border-b border-graphite bg-transparent text-base text-beige outline-none focus:border-gold";

function FieldError({ name, message }: { name: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${name}-error`} className="mt-2 text-sm text-gold">
      {message}
    </p>
  );
}

function Select({
  name,
  label,
  placeholder,
  options,
  defaultValue = "",
  error,
}: {
  name: keyof EnquiryInput;
  label: string;
  placeholder: string;
  options: readonly string[];
  defaultValue?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={controlClass}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldError name={name} message={error} />
    </div>
  );
}

export function EnquiryForm({ defaultProjectType = "" }: { defaultProjectType?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) ?? "");
    const optional = (key: string) => value(key).trim() || undefined;
    const payload = {
      name: value("name"),
      email: value("email"),
      phone: value("phone"),
      projectType: value("projectType"),
      location: optional("location"),
      budget: optional("budget"),
      timeline: optional("timeline"),
      note: value("note"),
    };
    const parsed = enquirySchema.safeParse(payload);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors(Object.fromEntries(Object.entries(flat).map(([key, messages]) => [key, messages?.[0]])));
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) {
        setStatus("error");
        setErrors({ form: "The request did not go through. Try again in a moment, or message us on WhatsApp." });
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrors({ form: "The request did not go through. Try again in a moment, or message us on WhatsApp." });
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border-t border-graphite pt-8">
        <h2 className="font-display text-4xl text-beige">Thank you. We have your request.</h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ash">
          A member of the studio will call or message you within one working day to arrange the consultation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      {errors.form ? (
        <p role="alert" className="text-sm text-gold">
          {errors.form}
        </p>
      ) : null}
      <div className="grid gap-8 sm:grid-cols-2">
        {textFields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className={labelClass}>
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type ?? "text"}
              autoComplete={field.autoComplete}
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
              className={controlClass}
            />
            <FieldError name={field.name} message={errors[field.name]} />
          </div>
        ))}
      </div>
      <Select
        name="projectType"
        label="Project type"
        placeholder="Select a project type"
        options={projectTypes}
        defaultValue={defaultProjectType}
        error={errors.projectType}
      />
      <div className="grid gap-8 sm:grid-cols-2">
        <Select name="budget" label="Budget (optional)" placeholder="Select a range" options={budgets} error={errors.budget} />
        <Select
          name="timeline"
          label="Timeline (optional)"
          placeholder="Select a timeline"
          options={timelines}
          error={errors.timeline}
        />
      </div>
      <div>
        <label htmlFor="note" className={labelClass}>
          About the project
        </label>
        <textarea
          id="note"
          name="note"
          rows={5}
          aria-invalid={Boolean(errors.note)}
          aria-describedby={errors.note ? "note-error" : undefined}
          className="mt-2 min-h-32 w-full border-b border-graphite bg-transparent py-3 text-base text-beige outline-none focus:border-gold"
        />
        <FieldError name="note" message={errors.note} />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-11 w-fit items-center bg-brass px-6 text-xs font-medium tracking-brand text-ink uppercase hover:bg-brass-light disabled:opacity-50"
      >
        {status === "submitting" ? "Sending" : "Book a consultation"}
      </button>
    </form>
  );
}
