import React from "react";
import "./Login.css";
import { loginUrl } from "./Spotify";
export const Login = () => {
  return (
    <div className="btn">
      <a href={loginUrl}>Login</a>
    </div>
  );
};
