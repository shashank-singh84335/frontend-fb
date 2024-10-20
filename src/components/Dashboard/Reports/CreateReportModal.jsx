/* eslint-disable react/prop-types */
import { X, Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../../../data";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { toastsettings } from "../../../utils/toastsettings";

const CreateReportModal = ({
    close,
    modalHeading,
    created
}) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [multiSelect, setMultiSelect] = useState([]);
  const [singleSelect, setSingleSelect] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [metricsArray, setMetricsArray] = useState([]);
  useEffect(() => {
    const fetchMetricsNames = async () => {
      const response = await fetch(`${BASE_URL}/analytic/metric/names/?type=page`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setMetricsArray(data.data.map((item) => item.metric_name.trim()));
        console.log(
          "HERE",
          data.data.map((item) => item.metric_name.trim())
        );
      }
    };
    fetchMetricsNames();
  }, []);

  const handleMultiSelect = (id, name) => {
    if (multiSelect.includes(id)) {
      setMultiSelect(multiSelect.filter((option) => option !== id));
    } else {
      setMultiSelect([...multiSelect, id]);
    }
  };
  const handleSubmit = () => {
    // form validation
    if (!name || !startDate || !endDate || !multiSelect.length || !singleSelect) {
        toast.error("Please fill all the fields",toastsettings);
        return;
    }
    const transformedData = {
      metrics: multiSelect,
      name: name || "new file",
      start_date: startDate,
      end_date: endDate,
      top_metric: singleSelect,
    };

    console.log(JSON.stringify(transformedData, null, 2));

    fetch(`${BASE_URL}/analytic/report/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
      body: JSON.stringify(transformedData),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.status===10000){
            toast.success("Report Created Successfully",toastsettings);
            close();
            created();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        dropdown.current &&
        !dropdown.current.contains(e.target) &&
        trigger.current &&
        !trigger.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="fixed flex justify-center items-center z-30 p-4 inset-0 backdrop-blur-sm backdrop-brightness-50"
    >
      <div className="relative w-full max-w-xl max-h-full">
        <div className="relative bg-white dark:bg-black rounded-lg shadow">
          <button
            onClick={close}
            type="button"
            className="absolute top-3 right-2.5 text-gray-500"
            data-modal-hide="popup-modal"
          >
            <X
              size={40}
              className="cursor-pointer p-2 hover:bg-primary hover:text-white transform-all duration-300 rounded-full hover:rotate-180"
            />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="flex flex-col gap-4 p-6">
            <h3 className="mb-5 font-semibold text-xl dark:text-gray-300 text-gray-600">
              {modalHeading}
            </h3>
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm">Enter Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Report Name"
                className="block w-full p-3 text-sm text-gray-900 rounded-md bg-[#f5f5f5] outline-none"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 text-sm">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="block w-full p-3 text-sm text-gray-900 rounded-md bg-[#f5f5f5] mt-2 outline-none"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 text-sm">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="block w-full p-3 text-sm text-gray-900 rounded-md bg-[#f5f5f5] mt-2 outline-none"
                required
              />
            </div>

            {/* Multi-select Dropdown */}
            <div className="flex flex-col relative">
              <label className="text-gray-600 text-sm">Select Metrics</label>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-3 text-sm text-gray-900 rounded-md bg-[#f5f5f5] outline-none"
                ref={trigger}
              >
                <span className="flex justify-between items-center">
                  {multiSelect.length > 0
                    ? multiSelect
                        .map((id) => metricsArray.find((name) => name === id))
                        .join(", ")
                    : "Select Metrics"}
                  <ChevronDown size={20} className="text-gray-500" />
                </span>
              </button>

              {isDropdownOpen && (
                <div className="absolute space-y-1 top-full bg-white dark:bg-black shadow-md rounded-md p-2 w-full max-h-[15rem] overflow-auto"
                ref={dropdown}
                >
                  {metricsArray.map((metric, index) => (
                    <div
                      key={index}
                      onClick={() => handleMultiSelect(metric)}
                      className="cursor-pointer flex items-center justify-between px-4 p-2 rounded-md hover:bg-[#f5f5f5]"
                    >
                      <h1 className="w-[80%]">{metric}</h1>
                      {multiSelect.includes(metric) && (
                        <Check size={20} className="text-green-600" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Single-select Dropdown */}
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm">Select Top-Metric</label>
              <select
                value={singleSelect}
                onChange={(e) => setSingleSelect(e.target.value)}
                className="block w-full p-3 text-sm text-gray-900 rounded-md bg-[#f5f5f5] mt-2 outline-none"
                required
              >
                <option value="">Select Top-Metric</option>
                {metricsArray.map((metric, index) => (
                  <option key={index} value={metric} className="w-full">
                    {metric}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="bg-primary mt-4 p-3 w-[8rem] text-[#e5e5e5] rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReportModal;
