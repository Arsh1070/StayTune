import React from "react";
import Header from "./Header";
import { useStateValue } from "./contextWarper";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { SongRow } from "./SongRow";

export const MainBody = () => {
  const [{ spotify, defaultPlaylist_Id, playlist_Info, playing }, dispatch] =
    useStateValue();

  const playPlaylist = () => {
    spotify
      .play({
        context_uri: `spotify:playlist:${defaultPlaylist_Id}`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "Set_item",
            item: r.item,
          });
          dispatch({
            type: "Set_playing",
            playing: true,
          });
        });
      });
  };

  const playPauselist = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "Set_playing",
        playing: false,
      });
    }
  };

  return (
    <div className="mainBody">
      <div className="body_upper">
        <Header />
        {playlist_Info && (
          <div className="body_info">
            <div className="img_container">
              <img src={playlist_Info.images[0].url} alt="pic" />
            </div>
            <div className="text_container">
              <h5>PLAYLIST</h5>
              <h1>{playlist_Info.name}</h1>
              <p>Arsh</p>
            </div>
          </div>
        )}
      </div>

      <div className="body_lower">
        <div className="lower_icon">
          {playing ? (
            <PauseIcon
              onClick={playPauselist}
              className="play_icon"
              fontSize="large"
            />
          ) : (
            <PlayArrowIcon
              onClick={playPlaylist}
              className="play_icon"
              fontSize="large"
            />
          )}
          <FavoriteIcon fontSize="large" className="heart" />
          <MoreHorizIcon className="horizon_icon" fontSize="large" />
        </div>
        <SongRow />
      </div>
    </div>
  );
};
