import React, { useState } from "react";

const Tooltip = ({ heading }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      id="tooltip-default"
      role="tooltip"
      className={`absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700 ${
        showTooltip ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {heading}
      <div className="tooltip-arrow" data-popper-arrow></div>
      
    </div>
  );
};

export default Tooltip;
