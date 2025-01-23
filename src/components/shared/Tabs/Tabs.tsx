import { FC } from "react";
import styles from "./Tabs.module.css";

interface ITab {
  id: number;
  name: string;
}

interface TabsProps {
  tabs: ITab[];
  activeTab: ITab;
  onClick: (tab: ITab) => void;
}

const Tabs: FC<TabsProps> = ({ tabs, onClick, activeTab }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab, index) => (
        <button
          data-testid={`tabsButton${tab.id}`}
          key={index}
          className={activeTab.id === tab.id ? styles.activeTab : styles.tab}
          onClick={() => onClick(tab)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
