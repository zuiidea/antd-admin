import { z } from "zod/v4";

export type PaginatedData<T> = {
  list: T[];
  total: number;
};

/** Unwrapped list payload (envelope `data`); use as `defineApi` `output`. */
export function PaginatedDataSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    list: z.array(itemSchema),
    total: z.int(),
  });
}
