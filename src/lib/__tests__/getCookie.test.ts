import { describe, expect, it } from "vitest";
import { getCookie } from "../getCookie.ts";

describe("тесты для директории lib", () => {
  document.cookie = "test=pepega";
  it("getCookie", () => {
    const cookie = getCookie("test");
    expect(cookie).toEqual("pepega");
  });
  it("getCookie test2", () => {
    const cookie = getCookie("test2");
    expect(cookie).toBeUndefined();
  });
});
