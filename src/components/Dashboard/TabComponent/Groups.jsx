import { Send, UsersRound } from 'lucide-react';
import React, { useEffect } from 'react'
import DataTable from '../Table/GroupTable';
import Modal from '../Modal';
import AddGroup from '../Modals/AddGroup';
import { BASE_URL } from '../../../data';
import Cookies from 'js-cookie';

const Groups = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [response, setResponse] = React.useState(null);
  useEffect(() => {
    const postData = async () => {
      const apiUrl = `${BASE_URL}/group/`;
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

  return (
    <div className="flex flex-col gap-8 min-h-screen w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex">
          <h1 className="font-bold text-3xl">Groups</h1>
        </div>
        <div className="flex" onClick={()=>setOpenModal(true)}>
          <button className="bg-primary text-white rounded-md px-4 flex gap-3 py-2 items-center h-[2.5rem]">
            Create Groups
            <UsersRound size={17} className="" />
          </button>
        </div>
      </div>
      <div className="flex">
        <DataTable data={response?.data} />
      </div>
      {openModal && (
        <AddGroup
          modalHeading="Create Group"
          close={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}

export default Groups