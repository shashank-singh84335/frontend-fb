import { Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DataTable from '../Table/CampaignTable';
import Modal from '../Modal';
import AddCampaign from '../Modals/AddCampaign';
import { BASE_URL } from '../../../data';
import { useAppState } from '../../../utils/Context';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Campaign = () => {
  const navigate=useNavigate();
  const [openModal, setOpenModal] = React.useState(false);
  const [campaign, setCampaign] = useState([])
  const {state,setState}=useAppState();
  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(`${BASE_URL}/campaign/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setCampaign(data.data);
    };
    fetchdata();
  }, []);
  useEffect(() => {
    console.log("use effect called")
  },[])
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex">
          <h1 className="font-bold text-3xl">Campaigns</h1>
        </div>
        <div className="flex" onClick={()=>setOpenModal(true)}>
          <button className="bg-primary text-white rounded-md px-4 flex gap-3 py-2 items-center h-[2.5rem]">
            Create Campaign
            <Send size={17} className="" />
          </button>
        </div>
      </div>
      <div className="flex">
        <DataTable data={campaign} />
      </div>
      {openModal && (
        <AddCampaign
          modalHeading="Create Campaign"
          close={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}

export default Campaign