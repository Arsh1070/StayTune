import React, { useEffect } from "react";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { SidebarIcon } from "./optionIcon";
import { useStateValue } from "./contextWarper";

export const Sidebar = ({ spotify }) => {
  const [{ playlists, playlist_Id, searchbar }, dispatch] = useStateValue();

  const handlePlaylist = (playlistId) => {
    return dispatch({
      type: "Set_playlistId",
      Id_val: playlistId,
    });
  };

  const handleSearch = () => {
    if (searchbar === false) {
      dispatch({ type: "Set_searchbar", Stat: true });
    } else {
      dispatch({ type: "Set_searchbar", Stat: false });
    }
  };

  useEffect(() => {
    if (playlist_Id != null) {
      spotify.getPlaylist(`${playlist_Id}`).then((res) => {
        dispatch({
          type: "Get_tracks",
          songs: res.tracks.items,
          playlistInfo: res,
        });
      });
    }
  }, [playlist_Id, spotify, dispatch]);

  return (
    <div className="sidebar">
      <h2 className="logo">StayTune</h2>
      <SidebarIcon Icon={HomeIcon} value="Home" />
      <div onClick={handleSearch}>
        {<SidebarIcon Icon={SearchIcon} value="Search" />}
      </div>
      <SidebarIcon Icon={LibraryMusicIcon} value="Library" />
      <h5 className="playlist">PLAYLISTS</h5>
      <hr />

      {playlists?.items?.map((playlist) => {
        return (
          <SidebarIcon
            key={playlist.id}
            value={playlist.name}
            playlist_id={playlist.id}
            handlePlaylist={handlePlaylist}
          />
        );
      })}
    </div>
  );
};
