import React from "react";
import { Footer } from "./Footer";
import { MainBody } from "./MainBody";
import { Sidebar } from "./Sidebar";
import "./MainScreen.css";

export const MainScreen = ({ spotify }) => {
  return (
    <div className="main">
      <div className="bodySection">
        <Sidebar spotify={spotify} />
        <MainBody spotify={spotify} />
      </div>
      <Footer spotify={spotify} />
    </div>
  );
};
