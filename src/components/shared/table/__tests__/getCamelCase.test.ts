import { describe, expect, it } from "vitest";
import { getCamelCase } from "@/components/shared/table/getCamelCase.ts";

describe("getCamelCase", () => {
  it("строка преобразуется в camelCase", () => {
    const result = getCamelCase("pepega-olega");
    expect(result).toEqual("pepegaOlega");
  });
});
