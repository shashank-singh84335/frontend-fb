import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Loader from "./components/Loader";
import DashboardMain from "./pages/DashboardMain";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Dashboard/Profile";
import FBInit from "./components/TestFB";
import { useEffect } from "react";
import SpecificAccount from "./components/Dashboard/TabComponent/SpecificAccount";
import SpecificGroup from "./components/Dashboard/TabComponent/SpecificGroup";
import { BASE_AUTH_URL } from "./data";
import Cookies from "js-cookie";
import SpecificContentTab from "./components/Dashboard/SpeicificContentTab";
import SpecificContent from "./pages/SpecificContent";

function App() {
  // useEffect(() => {
  //   if(localStorage.getItem("theme")==="system"){
  //     localStorage.setItem("theme", "light")
  //   }
  //   if(localStorage.getItem("theme")===null){
  //     localStorage.setItem("theme", "light")
  //   }
  // }, [])
  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await fetch(`${BASE_AUTH_URL}/refresh_token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh_token: Cookies.get("refresh_token"),
          }),
        });
        const data = await response.json();
        if (data.status === 10000) {
          Cookies.set("access_token", data.data.access_token);
          Cookies.set("refresh_token", data.data.refresh_token);
        }
        console.log("Token refreshed:", data);
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    };
    const intervalId = setInterval(() => {
      refreshAccessToken();
    }, 5 * 60 * 1000); 
    return () => clearInterval(intervalId);
  }, []);
  // eslint-disable-next-line react/prop-types
  function PrivateRoute({ children }) {
    const get_access_token = Cookies.get("access_token");
    const get_refresh_token = Cookies.get("refresh_token");
    if (get_access_token && get_refresh_token) {
      return <>{children}</>;
    }
    window.location.href = "/";
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/loader-test" element={<Loader />} />
          {/* <Route path="/signup" element={<SignupPage />} /> */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardMain />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/:id"
            element={
              <PrivateRoute>
                <SpecificContent />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/account/:accountId"
            element={
              <PrivateRoute>
                <SpecificAccount />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/group/:accountId"
            element={
              <PrivateRoute>
                <SpecificGroup />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
