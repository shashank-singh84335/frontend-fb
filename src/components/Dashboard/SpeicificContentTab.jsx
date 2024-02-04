import React from "react";
import { useAppState } from "../../utils/Context";
import Default from "./TabComponent/Default";
import SpecificCampaign from "./TabComponent/SpecificCampaign";
import SpecificGroup from './TabComponent/SpecificGroup';
import SpecificAccount from './TabComponent/SpecificAccount';

const SpecificContentTab = () => {
  const { state, setState } = useAppState();
  const renderContent = (state) => {
    switch (state) {
      case "specificCampaign":
        return <SpecificCampaign />;
      case "specificGroup":
        return <SpecificGroup />;
      case "specificAccount":
        return <SpecificAccount />;
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

export default SpecificContentTab;
