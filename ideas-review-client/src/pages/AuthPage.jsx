import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../store/Slices/userSlice";
import Cookies from "js-cookie";

function AuthPage() {
  const handleLogin = () => {
    let CLIENT_ID = import.meta.env.DEV
      ? "e45f6dcbc2fb3ce25ca6"
      : "e45f6dcbc2fb3ce25ca6"; // ADD IN ENV
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    );
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let callAPIREQUEST = async (codeParam) => {
    try {
      let accessToken = Cookies.get("accessToken")
      let response = await axios({
        method: "post",
        url: "http://192.168.1.2:8080/api/v1/users/login",
        data: {
          clientCode: codeParam,
          accessToken
        },
        withCredentials: true,
      });
      console.log(response);
      Cookies.set("accessToken",response.data.data.user.accessToken)
      if (response.status == 200) {
        dispatch(updateUser({ user: { ...response.data.data.user } }));
        navigate("/dashboard");
      } else {
        alert("NOT VALID USER");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    const codeParam = urlParam.get("code");
    if (codeParam?.length > 5) {
      callAPIREQUEST(codeParam.toString());
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-800 to-indigo-900 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-7xl font-extrabold text-gray-100">
            HTL 3.0 IDEAS REVIEW
          </h2>
        </div>
        <div className="w-fit mx-auto">
          <button
            onClick={handleLogin}
            className="w-full flex justify-center  py-2 px-4 border border-transparent rounded-md shadow-sm text2xl font-bold
             bg-white hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
