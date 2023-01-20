import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import List from "../pages/List";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Join from "../pages/Join";
import Index from "../pages/Index";
import Add from "../pages/Add";

const Router = () => {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="/Login" element={<Login />} /> */}
      <Route path="/Join" element={<Join />} />
      <Route path="/Index" element={<Index />} />
      <Route path="/Add" element={<Add />} />
      <Route path="/Detail/:id" element={<Detail />} />
    </Routes>
    // </BrowserRouter>
  );
};

export default Router;
