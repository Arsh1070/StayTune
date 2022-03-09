import React, { useState, useEffect } from "react";
import Search from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { useStateValue } from "./contextWarper";

const Header = () => {
  const [{ searchbar, spotify }] = useStateValue();
  const [user, setUser] = useState(null);

  useEffect(() => {
    spotify.getMe().then((user) => setUser(user));
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
        {user && (
          <>
            <Avatar src={user.images[0].url} alt="pic" />
            <h4>{user.display_name} </h4>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Header);
