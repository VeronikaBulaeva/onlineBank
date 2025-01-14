import { TableContentType } from "@/components/shared/table/types.ts";

export const getCamelCase = (string: string) =>
  string
    .toLowerCase()
    .replace(/[^a-z0-9](.)/g, (_, item) =>
      item.toUpperCase(),
    ) as keyof TableContentType;
