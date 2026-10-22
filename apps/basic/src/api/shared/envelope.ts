import { z } from "zod/v4";

export function ApiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    code: z.int(),
    data: dataSchema,
    message: z.string(),
  });
}

export type ApiResponse<T> = {
  code: number;
  data: T;
  message: string;
};

export function PaginatedResponseSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    code: z.int(),
    data: z.object({
      list: z.array(itemSchema),
      total: z.int(),
    }),
    message: z.string(),
  });
}
