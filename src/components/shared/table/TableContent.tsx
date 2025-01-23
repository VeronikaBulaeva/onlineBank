import { FC } from "react";
import styles from "./Table.module.css";
import { TableType } from "@/components/shared/table/types.ts";
import { getCamelCase } from "@/components/shared/table/getCamelCase.ts";

const TableContent: FC<TableType> = ({ content, columns }) => {
  return (
    <tbody>
      {content.map((data) => (
        <tr key={data.number}>
          {columns.map((column) => (
            <td
              key={column}
              className={styles.table__cell}
              data-testid={`content${column}`}
            >
              {data[getCamelCase(column)]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableContent;
