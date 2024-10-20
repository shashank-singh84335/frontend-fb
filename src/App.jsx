/* eslint-disable react/prop-types */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardMain from "./pages/DashboardMain";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Dashboard/Profile";
import SpecificAccount from "./components/Dashboard/TabComponent/SpecificAccount";
import SpecificGroup from "./components/Dashboard/TabComponent/SpecificGroup";
import Cookies from "js-cookie";
import SpecificContent from "./pages/SpecificContent";
import TnC from "./components/TnC";
import PrivacyPolicy from "./components/PrivacyPolicy";
import FacebookLogin from "./components/FacebookLogin";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import AnalyticsMain from "./pages/AnalyticsMain";
import TopPostViewAll from "./components/Dashboard/TabComponent/Analytics/TopPostViewAll";
import TopPagesViewAll from "./components/Dashboard/TabComponent/Analytics/TopPagesViewAll";
import ReportsMain from './pages/ReportsMain';
function App() {
  // useEffect(() => {
  //   const refreshAccessToken = async () => {
  //     console.log(Cookies.get("refresh_token"));
  //     try {
  //       const response = await fetch(`${BASE_AUTH_URL}/refresh_token`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           "refresh_token": Cookies.get("refresh_token"),
  //         }),
  //       });
  //       const data = await response.json();
  //       console.log(data)
  //       if (data.status === 10000) {
  //         Cookies.set("access_token", data.data.access_token);
  //         Cookies.set("refresh_token", data.data.refresh_token);
  //         console.log("Token refreshed:", data);
  //       }
  //     } catch (error) {
  //       console.error("Error refreshing token:", error);
  //     }
  //   };
  //   const intervalId = setInterval(() => {
  //     refreshAccessToken();
  //   }, 5 * 60 * 1000); 
  //   return () => clearInterval(intervalId);
  // }, []);
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
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/loader-test" element={<Loader />} />
          <Route path="/terms&conditions" element={<TnC />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/loader" element={<Loader />} />

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
            path="/dashboard/analytics"
            element={
              <PrivateRoute>
                <AnalyticsMain />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/anaytics/top-posts/view-all"
            element={
              <PrivateRoute>
                <TopPostViewAll />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/anaytics/top-pages/view-all"
            element={
              <PrivateRoute>
                <TopPagesViewAll />
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
          <Route
            path="/add-fb-account"
            element={
              <PrivateRoute>
                <FacebookLogin />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/reports"
            element={
              <PrivateRoute>
                <ReportsMain />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
