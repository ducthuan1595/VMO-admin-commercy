import React from "react";
import { Routes, Route } from "react-router-dom";

import Form from "./page/Form";
import Home from "./page/Home";
import ForgotPassword from "./page/ForgotPassword";
import AddVoucher from "./page/voucher/AddVoucher";
import Voucher from "./page/voucher/Voucher";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Form />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/voucher" element={<Voucher />} />
      </Routes>
    </div>
  );
}

export default App;
