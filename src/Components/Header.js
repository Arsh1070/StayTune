import React, { useState, useEffect } from "react";
import Search from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { useStateValue } from "./contextWarper";
export const Header = ({ spotify }) => {
  const [{ searchbar }] = useStateValue();
  const [url, setUrl] = useState("#");
  const [name, setName] = useState("");

  useEffect(() => {
    spotify.getMe().then((res) => {
      setUrl(res.images[0].url);
      setName(res.display_name);
    });
  }, [spotify]);

  return (
    <div className="header">
      {searchbar ? (
        <div className="header_left">
          <Search />
          <input type="text" placeholder="Artists,songs, or podcasts" />
        </div>
      ) : (
        <div className="header_left1"></div>
      )}
      <div className="header_right">
        <Avatar src={url} alt="pic" />
        <h4>{name} </h4>
      </div>
    </div>
  );
};
