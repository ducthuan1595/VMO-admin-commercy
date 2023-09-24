import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Form from "./page/Form";
import Home from "./page/Home";
import ForgotPassword from "./page/ForgotPassword";
import Voucher from "./page/voucher/Voucher";
import Category from "./page/category/Category";
import Item from "./page/item/Item";

import CheckOutlet from "./util/checkOutlet";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Form />} />
        <Route element={<CheckOutlet></CheckOutlet>}>
          <Route path="/" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/voucher" element={<Voucher />} />
          <Route path="/category" element={<Category />} />
          <Route path="/item" element={<Item />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
