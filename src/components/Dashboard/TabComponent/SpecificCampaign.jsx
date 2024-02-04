import { useNavigate } from "react-router-dom";
import DataTable from "../Table/SpecificCampaignTable";
import { useAppState } from "../../../utils/Context";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../data";
import Cookies from "js-cookie";

const SpecificCampaign = () => {
  const [response, setResponse] = useState([]);
  useEffect(() => {
    const postData = async () => {
      const id = window.location.pathname.split("/")[2];
      const apiUrl = `${BASE_URL}/campaign/${id}/`;
      try {
        const getresponse = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        });
        const data = await getresponse.json();
        console.log(data)
        setResponse(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    postData();
  }, []);
    const { state, setState } = useAppState();
    const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-8 w-full min-h-screen">
    <div className="flex gap-4 items-center w-full">
      <div
        className="flex p-2 cursor-pointer rounded-md bg-white"
        onClick={() => {
          setState("campaign");
          navigate("/dashboard");
        }}
      >
        <ArrowLeft size={25} />
      </div>
      <div className="flex">
        <h1 className="font-bold text-3xl">
          {localStorage.getItem("campaign_name")}
        </h1>
      </div>
    </div>
    <div className="flex">
      <DataTable data={response.data} />
    </div>
  </div>
  );
};

export default SpecificCampaign;
