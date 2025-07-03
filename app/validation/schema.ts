import z from "zod";

export const NewIssueSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  assignToUser: z.string().optional().nullable(),
});

export const PatchIssueSchema = z.object({
  id: z.number(),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  assignToUser: z.string().optional().nullable(),
});
