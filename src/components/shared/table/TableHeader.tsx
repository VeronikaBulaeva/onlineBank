import { FC } from "react";
import styles from "./Table.module.css";
import { getCamelCase } from "@/components/shared/table/getCamelCase.ts";
import { TableContentType } from "@/components/shared/table/types.ts";
import SortArrow from "@/assets/sortArrowUp.svg";

export interface TableHeaderProps {
  columns: string[];
  onClickSort: (column: keyof TableContentType) => void;
  activeSortColumn?: keyof TableContentType | undefined;
}

const TableHeader: FC<TableHeaderProps> = ({
  columns,
  onClickSort,
  activeSortColumn,
}) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column} className={styles.table__cell}>
            <button
              onClick={() => {
                onClickSort(getCamelCase(column));
              }}
              className={styles.button}
              data-testid={column}
            >
              {column}
              <img
                src={SortArrow}
                alt="arrow"
                className={`${getCamelCase(column) === activeSortColumn ? styles.arrowDown : ""} ${styles.arrow}`}
              />
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
