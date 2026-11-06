import { z } from "zod";

export const projectTypes = [
  "Villa",
  "Apartment or penthouse",
  "Hospitality",
  "Commercial",
  "Turnkey fit-out",
  "Not sure yet",
] as const;

export const budgets = [
  "Under AED 150K",
  "AED 150K – 500K",
  "AED 500K – 1.5M",
  "AED 1.5M+",
  "Prefer to discuss",
] as const;

export const timelines = ["As soon as possible", "Within 3 months", "3 – 6 months", "Later this year or beyond"] as const;

export const sectorToProjectType: Record<string, (typeof projectTypes)[number]> = {
  villas: "Villa",
  penthouses: "Apartment or penthouse",
  hospitality: "Hospitality",
  commercial: "Commercial",
  "fit-out": "Turnkey fit-out",
};

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  email: z.string().trim().email("Enter a valid email.").max(120),
  phone: z.string().trim().min(6, "Enter a phone number.").max(30),
  projectType: z.enum(projectTypes, "Choose a project type."),
  location: z.string().trim().max(80).optional(),
  budget: z.enum(budgets).optional(),
  timeline: z.enum(timelines).optional(),
  note: z
    .string()
    .trim()
    .min(10, "Tell us a little about the project, at least a sentence.")
    .max(1000),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
