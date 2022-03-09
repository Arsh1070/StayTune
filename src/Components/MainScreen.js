import React from "react";
import { Footer } from "./Footer";
import { MainBody } from "./MainBody";
import { Sidebar } from "./Sidebar";
import "./MainScreen.css";

export const MainScreen = () => {
  return (
    <div className="main">
      <div className="bodySection">
        <Sidebar />
        <MainBody />
      </div>
      <Footer />
    </div>
  );
};
