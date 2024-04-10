import React from "react";
import { useAppState } from "../../utils/Context";
import Default from "./TabComponent/Default";
import Account from "./TabComponent/Account";
import Groups from "./TabComponent/Groups";
import Campaign from "./TabComponent/Campaign";
import SpecificCampaign from "./TabComponent/SpecificCampaign";
import AnalyticsLanding from "./TabComponent/Analytics/AnalyticsLanding";

const Main = () => {
  const { state, setState } = useAppState();
  const renderContent = (state) => {
    switch (state) {
      case "campaign":
        return <Campaign />;
      case "groups":
        return <Groups />;
      case "account":
        return <Account />;
      case "analytics":
        return <AnalyticsLanding />;
      default:
        return <Default />;
    }
  };
  return (
    <div className="p-8 bg-[#f5f6fa] dark:bg-darkprimary rounded-md flex w-full">
      {renderContent(state)}
    </div>
  );
};

export default Main;
