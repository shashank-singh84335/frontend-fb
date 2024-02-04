import { ArrowLeft, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import FacebookLoginComponent from "../../../utils/FB";
import { BASE_URL } from "../../../data";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import DataTable from "../Table/SpecificAccountTable";
import Cookies from "js-cookie";
import { useAppState } from "../../../utils/Context";

const SpecificGroup = () => {
  const [openModal, setOpenModal] = useState(false);
  const [response, setResponse] = useState([]);
  useEffect(() => {
    const postData = async () => {
      const id = window.location.pathname.split("/")[2];
      const apiUrl = `${BASE_URL}/group/${id}/`;
      try {
        const getresponse = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        });
        const data = await getresponse.json();
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
            setState("groups");
            navigate("/dashboard");
          }}
        >
          <ArrowLeft size={25} />
        </div>
        <div className="flex">
          <h1 className="font-bold text-3xl">
            {localStorage.getItem("group_name")}
          </h1>
        </div>
      </div>
      <div className="flex">
        <DataTable data={response.data} />
      </div>
    </div>
  );
};

export default SpecificGroup;
