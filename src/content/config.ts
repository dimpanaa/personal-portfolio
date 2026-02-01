import { defineCollection, z } from "astro:content";

// Projects collection schema
const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    // Cover image for project card thumbnail
    coverImage: z.string().optional(),
    // Gallery for project detail page (images and videos)
    gallery: z
      .array(
        z.object({
          type: z.enum(["image", "video"]),
          src: z.string(),
          caption: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

// Education collection schema
const educationCollection = defineCollection({
  type: "content",
  schema: z.object({
    institution: z.string(),
    location: z.string(),
    degree: z.string(),
    score: z.string(),
    startYear: z.string(),
    endYear: z.string(),
    isCurrent: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

// Experience collection schema
const experienceCollection = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    isCurrent: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

// Certifications collection schema
const certificationsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.string(),
    credentialUrl: z.string().optional(),
    image: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    order: z.number().default(100),
  }),
});

// Achievements collection schema
const achievementsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    image: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    order: z.number().default(100),
  }),
});

// Socials collection schema
const socialsCollection = defineCollection({
  type: "content",
  schema: z.object({
    email: z.string().email(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    instagram: z.string().url().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
  education: educationCollection,
  experience: experienceCollection,
  certifications: certificationsCollection,
  achievements: achievementsCollection,
  socials: socialsCollection,
};
