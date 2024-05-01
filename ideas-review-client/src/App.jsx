import { Outlet, useNavigate } from "react-router-dom";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./store/Slices/userSlice";
import { Toaster } from "sonner";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sideBar = useSelector((state) => state.sideBar);
  const handleAccessTokenLogin = async () => {
    try {
      let response = await axios({
        method: "post",
        url: "http://192.168.1.2:8080/api/v1/users/login",
        withCredentials: true,
      });
      console.log(response);
      if (response.status == 200) {
        navigate("/dashboard");
        dispatch(updateUser({ user: { ...response.data.data.user } }));
      }
    } catch (error) {
      navigate("/");
    }
  };

  // CHECK ACCESSTOKEN AND LOGIN USING IT
  useEffect(() => {
    handleAccessTokenLogin();
  }, []);

  let open = sideBar.open;

  return (
    <div className="h-screen w-screen flex flex-row overflow-hidden font-Poppins">
      <Toaster position="top-right" />
      <div className={` z-20  w-1/6 ${open ? "sm:block sm:absolute w-full" : "sm:hidden"}`}>
        <Sidebar />
      </div>
      <div className={`w-5/6 sm:w-full ${open ? "opacity-50" : ""}`}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default App;
