import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { requests } from "../api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    setMessage("");
    if (email) {
      const res = await requests.forgotPassword({ email });
      if (res.data.message === "ok") {
        setMessage("Resend email");
      }
    }
  };

  const handleSendWithEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };
  return (
    <div className="h-full mt-[150px] flex justify-center items-center">
      <div className="bg-[yellow] w-[480px] p-8 rounded-md">
        <div className="align-center">
          <img
            src="/logo/book_logo.png"
            alt="logo"
            className="h-[200px] block ml-auto mr-auto"
          />
        </div>
        <div>
          <h2 className="text-center text-[28px] my-4">Forgot Password</h2>
          <p className="text-[#333] text-center mb-2">
            No problem! Enter your email below and We wil send you an email with
            instruction to reset your password.
          </p>
        </div>
        <div className="flex flex-col justify-between items-center py-1">
          <input
            className="text-left block w-full p-1 pl-4 border-solid border-[1px] border-[#ced4da] rounded-sm"
            value={email}
            onKeyDown={(e) => handleSendWithEnter(e)}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            type="email"
          />
        </div>
        <div>
          <button
            className="w-full bg-primary-color text-[white] py-2 mt-6 mb-3 rounded-lg"
            onClick={handleSend}
          >
            {message.length ? message : "Send Reset Link"}
          </button>
        </div>
        <div className="flex justify-center gap-2">
          <p>Back to</p>
          <span
            className="text-[blue] cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
