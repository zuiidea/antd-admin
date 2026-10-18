import { z } from "zod/v4";

export const IdParamsSchema = z.object({
  id: z.string().min(1),
});

export type IdParams = z.infer<typeof IdParamsSchema>;

export const SearchParamsSchema = z.object({
  page: z.number().int().positive().catch(1),
  pageSize: z.number().int().positive().catch(10),
  sortField: z.string().nullable().catch(null),
  sortOrder: z.enum(["ascend", "descend"]).nullable().catch(null),
});

export type SearchParams = z.infer<typeof SearchParamsSchema>;
