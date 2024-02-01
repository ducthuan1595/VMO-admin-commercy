import { useState, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import { requests } from "../api";
import { context } from "../store";

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const value = useContext(context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setErrMessage("These fields are required!");
    } else {
      setErrMessage("");
      const res = await requests.login({ email, password });
      if (res.data.message === "ok") {
        if (value?.setUser) {
          value.setUser(res.data.data);
        }
        navigate("/");
      } else {
        setErrMessage(res.data.message);
      }
    }
  };

  const handleLoginWithEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="h-screen flex justify-center items-center">
        <div className="flex h-4/6 justify-center items-center w-[400px] rounded-[15px] bg-gradient-to-r from-primary-color to-orange-500">
          <div className="bg-[white] rounded-[15px] w-[360px]">
            {/* <form> */}
            <h2 className="text-center text-2xl font-semibold mt-[42px] mx-0 mb-[26px]">
              {location.pathname === "/register" ? "Register" : "Login"}
            </h2>
            <div className="text-center my-0 mx-[12px] relative">
              <div className="flex flex-col justify-between items-center py-1">
                <label className="w-full text-left">Email</label>
                <input
                  className="text-left block w-full p-1 border-solid border-[1px] border-[#ced4da] rounded-sm"
                  value={email}
                  onKeyDown={(e) => handleLoginWithEnter(e)}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
              <div className="relative flex flex-col justify-between items-center py-1">
                <label className="w-full text-left">Password</label>
                <input
                  className="text-left block w-full p-1 border-solid border-[1px] border-[#ced4da] rounded-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleLoginWithEnter(e)}
                  placeholder="Enter your password"
                  type={isShowPassword ? "text" : "password"}
                />
                <span onClick={() => setIsShowPassword(!isShowPassword)}>
                  <i
                    className={
                      isShowPassword
                        ? "fas fa-eye eye-password"
                        : "far fa-eye-slash eye-password"
                    }
                    style={{ position: "absolute", right: "15px", top: "36px" }}
                  ></i>
                </span>
              </div>
              <div className="col-12 text-[12px] text-primary-color w-full text-left absolute mt-1">
                {errMessage}
              </div>
              <div>
                <button
                  className="w-full bg-primary-color text-[white] py-2 mt-6 mb-3 rounded-lg hover:opacity-80"
                  onClick={handleLogin}
                >
                  {location.pathname === "/register" ? "Register" : "Login"}
                </button>
              </div>
              {location.pathname === "/login" ? (
                <div className="text-left mb-2 cursor-pointer">
                  <p onClick={() => navigate("/forgot-password")}>
                    Forget your password?
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
