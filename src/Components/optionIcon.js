import React from "react";

export const SidebarIcon = ({ Icon, value, playlist_id, handlePlaylist }) => {
  return (
    <div className="options" onClick={() => handlePlaylist(playlist_id)}>
      {Icon && <Icon className="Icon" />}
      {Icon ? <h4>{value}</h4> : <p>{value}</p>}
    </div>
  );
};
