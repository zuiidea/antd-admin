import { describe, expect, it } from "vite-plus/test";
import { z } from "zod/v4";
import {
  paginatedListSchema,
  paginatedWithSchema,
  successWithNullBody,
  successWithSchema,
} from "./createHandler";
import { UserSchema } from "@/api/schemas";

describe("successWithSchema", () => {
  it("throws ZodError when payload does not match schema (mock drift surfaces here)", () => {
    expect(() =>
      successWithSchema(UserSchema, {
        id: "1",
        username: "x",
      } as unknown),
    ).toThrow(z.ZodError);
  });

  it("returns JSON body with parsed data when valid", async () => {
    const row = {
      id: "1",
      username: "u",
      avatar: null,
      email: null,
      roles: [] as string[],
      permissions: [] as string[],
    };
    const res = successWithSchema(UserSchema, row);
    const body = (await res.json()) as { code: number; data: typeof row };
    expect(body.code).toBe(0);
    expect(body.data.username).toBe("u");
  });
});

describe("paginatedListSchema / paginatedWithSchema", () => {
  it("rejects invalid list shape", () => {
    const schema = paginatedListSchema(UserSchema);
    expect(() =>
      schema.parse({
        list: [{ id: "1" }],
        total: 1,
      }),
    ).toThrow(z.ZodError);
  });

  it("accepts valid paginated payload via paginatedWithSchema", async () => {
    const row = {
      id: "1",
      username: "u",
      avatar: null,
      email: null,
      roles: [] as string[],
      permissions: [] as string[],
    };
    const res = paginatedWithSchema(UserSchema, { list: [row], total: 1 });
    const body = (await res.json()) as { data: { list: (typeof row)[]; total: number } };
    expect(body.data.total).toBe(1);
    expect(body.data.list).toHaveLength(1);
  });
});

describe("successWithNullBody", () => {
  it("wraps null data with schema validation", async () => {
    const res = successWithNullBody();
    const body = (await res.json()) as { code: number; data: null };
    expect(body.data).toBeNull();
    expect(body.code).toBe(0);
  });
});
