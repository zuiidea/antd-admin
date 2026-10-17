import { describe, expect, it } from "vite-plus/test";
import { applyOptimisticListDelete, applyOptimisticListUpdate } from "./useResourceCRUD";

type Row = { id: string; title: string; n: number };

describe("applyOptimisticListUpdate", () => {
  it("merges patch into the matching row by id", () => {
    const data: { list: Row[]; total: number } = {
      list: [
        { id: "1", title: "A", n: 1 },
        { id: "2", title: "B", n: 2 },
      ],
      total: 2,
    };
    const next = applyOptimisticListUpdate(data, { id: "2", title: "B2" });
    expect(next.list).toEqual([
      { id: "1", title: "A", n: 1 },
      { id: "2", title: "B2", n: 2 },
    ]);
    expect(next.total).toBe(2);
  });
});

describe("applyOptimisticListDelete", () => {
  it("removes row and decrements total", () => {
    const data: { list: Row[]; total: number } = {
      list: [
        { id: "1", title: "A", n: 1 },
        { id: "2", title: "B", n: 2 },
      ],
      total: 2,
    };
    const next = applyOptimisticListDelete(data, "1");
    expect(next.list).toEqual([{ id: "2", title: "B", n: 2 }]);
    expect(next.total).toBe(1);
  });

  it("does not take total below zero", () => {
    const data = { list: [{ id: "1", title: "A", n: 0 }] as Row[], total: 1 };
    const next = applyOptimisticListDelete(data, "1");
    expect(next.list).toEqual([]);
    expect(next.total).toBe(0);
  });
});

describe("rollback contract (QueryClient simulation)", () => {
  it("restore snapshot after failed optimistic update", () => {
    const key = ["items", 10, 0] as const;
    const before = {
      list: [
        { id: "1", title: "A", n: 1 },
        { id: "2", title: "B", n: 2 },
      ],
      total: 2,
    };
    const snapshot = structuredClone(before);
    let cache: typeof before = structuredClone(before);
    const setData = (next: typeof before) => {
      cache = next;
    };
    setData(applyOptimisticListUpdate(cache, { id: "2", title: "BAD" }));
    expect(cache.list[1]?.title).toBe("BAD");
    setData(snapshot);
    expect(cache).toEqual(before);
    expect(key[0]).toBe("items");
  });
});
