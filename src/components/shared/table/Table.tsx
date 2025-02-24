import { FC, useEffect, useState } from "react";
import TableHeader from "./TableHeader.tsx";
import styles from "./Table.module.css";
import TableContent from "./TableContent.tsx";
import { TableContentType, TableType } from "./types.ts";

const Table: FC<TableType> = ({ content, columns }) => {
  const [sorted, setSorted] = useState<TableContentType[]>([]);
  const [activeSortColumn, setActiveSortColumn] = useState<
    keyof TableContentType | undefined
  >();

  const getTime = (date: string) => {
    return new Date(date).getTime();
  };

  const sortColumns = (name: keyof TableContentType) => {
    if (name === activeSortColumn) {
      setActiveSortColumn(undefined);
    } else {
      setActiveSortColumn(name);
    }
    const sortedColumns = sorted.sort((a, b) => {
      if (typeof a[name] === "number" && typeof b[name] === "number") {
        return a[name] > b[name] ? b[name] - a[name] : a[name] - b[name];
      } else {
        const firstDate = getTime(a[name].toString());
        const secondDate = getTime(b[name].toString());
        return firstDate > secondDate
          ? secondDate - firstDate
          : firstDate - secondDate;
      }
    });
    setSorted(() => [...sortedColumns]);
  };

  useEffect(() => {
    setSorted(content);
  }, [content]);

  return (
    <div className={styles.table__wrapper}>
      <table className={styles.table}>
        <TableHeader
          columns={columns}
          onClickSort={sortColumns}
          activeSortColumn={activeSortColumn}
        />
        <TableContent content={sorted} columns={columns} />
      </table>
    </div>
  );
};

export default Table;
