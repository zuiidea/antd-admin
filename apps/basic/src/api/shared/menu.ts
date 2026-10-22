import { z } from "zod/v4";

const BaseMenuNodeSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().nullable(),
  permissions: z.array(z.string()).nullable(),
  sort: z.int(),
  hidden: z.boolean(),
});

export type MenuItem =
  | (z.infer<typeof BaseMenuNodeSchema> & {
      kind: "item";
      path: string;
      children: MenuItem[] | null;
    })
  | (z.infer<typeof BaseMenuNodeSchema> & {
      kind: "group";
      path: null;
      children: MenuItem[];
    });

export const MenuItemSchema: z.ZodType<MenuItem> = z.lazy(() =>
  z.discriminatedUnion("kind", [
    BaseMenuNodeSchema.extend({
      kind: z.literal("item"),
      path: z.string(),
      children: z.array(MenuItemSchema).nullable(),
    }),
    BaseMenuNodeSchema.extend({
      kind: z.literal("group"),
      path: z.null(),
      children: z.array(MenuItemSchema),
    }),
  ]),
);
