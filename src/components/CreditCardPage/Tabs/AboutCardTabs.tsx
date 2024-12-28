import { FC, useCallback, useState } from "react";
import Tabs from "@/components/shared/Tabs/Tabs.tsx";
import AboutCard from "@/components/CreditCardPage/Tabs/AboutCard/AboutCard.tsx";
import RatesAndConditions from "@/components/CreditCardPage/Tabs/RatesAndConditions/RatesAndConditions.tsx";
import Cashback from "@/components/CreditCardPage/Tabs/Cashback/Cashback.tsx";
import Faq from "@/components/CreditCardPage/Tabs/FAQ/FAQ.tsx";
import { TABS } from "@/constants/constants.tsx";

const AboutCardTabs: FC = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const getContent = useCallback(() => {
    switch (activeTab.id) {
      case 1:
        return <AboutCard />;
      case 2:
        return <RatesAndConditions />;
      case 3:
        return <Cashback />;
      case 4:
        return <Faq />;
    }
  }, [activeTab.id]);

  return (
    <section>
      <Tabs tabs={TABS} activeTab={activeTab} onClick={setActiveTab} />
      {getContent()}
    </section>
  );
};

export default AboutCardTabs;
