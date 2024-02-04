import { Plus } from 'lucide-react';
import DataTable from '../Table/AccountTable';
import { useEffect, useState } from 'react';
import Modal from '../Modal';
import FacebookLoginComponent from '../../../utils/FB';
import { BASE_URL } from '../../../data';
import { Slide, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Account = () => {
  const navigate=useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [response, setResponse] = useState([])
  useEffect(() => {
    const id = window.location.href.split("#")
    console.log(id)
    if (id.length > 1) {
      const toa=toast.loading("Adding Account ! Don't Refresh", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      const queryParams = id[1].split("&");
      console.log(queryParams);
      let access_token, states;
      for (const param of queryParams) {
        const [key, value] = param.split("=");
        if (key === "access_token") {
          access_token = value;
        } else if (key === "state") {
          states = value;
        }
      }
      const [app_id, app_secret] = states.split("%2C");
      const fetchData = async () => {
        const apiUrl = `${BASE_URL}/fb/account/`;
        try {
          const getresponse = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("access_token")}`,
            },
            body: JSON.stringify({
              app_info: {
                app_secret: app_secret,
                app_id: app_id,
              },
              token_info: {
                token: access_token,
              },
              other_name:Cookies.get("other_name")
            }),
          });
          const data = await getresponse.json();
          if(data.status=="10000"){
            toast.update(toa, {
              render: "Account Added Successfully",
              type: "success",
              isLoading: false,
              autoClose: 2500,
            });
            setTimeout(() => {
              navigate("/dashboard")
            }, 1000);
          }
          else{
            toast.update(toa, {
              render: "Error Adding Account",
              type: "error",
              isLoading: false,
              autoClose: 2500,
            });
          }
        } catch (error) {
          toast.update(toa, {
            render: "Error Adding Account",
            type: "error",
            isLoading: false,
            autoClose: 2500,
          });
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, []);
  useEffect(()=>{
    const postData = async () => {
      const apiUrl = `${BASE_URL}/fb/account/`;
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
        console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    postData();
  },[])
  return (
    <div className="flex flex-col gap-8 w-full min-h-screen">
      {/* <FacebookLoginComponent /> */}
      <div className="flex justify-between items-center w-full">
        <div className="flex">
          <h1 className="font-bold text-3xl">Accounts</h1>
        </div>
        <div className="flex" onClick={() => setOpenModal(true)}>
          <button className="bg-primary text-white rounded-md px-4 flex gap-3 py-2 items-center h-[2.5rem]">
            Add Facebook Account
            <Plus size={17} className="" />
          </button>
        </div>
      </div>
      <div className="flex">
        <DataTable data={response.data} />
      </div>
      {openModal && (
        <Modal
          modalHeading="Enter App Id & App Secret"
          close={() => setOpenModal(false)}
        />)}
    </div>
  );
}

export default Account