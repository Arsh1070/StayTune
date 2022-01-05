import React, { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { useStateValue } from "./contextWarper";

export const Footer = ({ spotify }) => {
  const [{ item, playing }, dispatch] = useStateValue();
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      dispatch({ type: "Set_playing", playing: r.is_playing });
      dispatch({ type: "Set_item", item: r.item });
    });
  }, [spotify, dispatch]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotify.setVolume(volume).catch((err) => err);
    }, 100),
    []
  );

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "Set_playing",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "Set_playing",
        playing: true,
      });
    }
  };
  const skipNext = () => {
    spotify.skipToNext();
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
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
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
  };

  return (
    <div className="Footer">
      <div className="footer_left">
        {item && (
          <>
            <img
              src={item.album.images[2].url}
              alt="Pic"
              className="songs_img"
            />
            <div className="footer_leftItem">
              <p>{item.name}</p>
              <p className="artist_name">{item.artists[0].name}</p>
            </div>
          </>
        )}
      </div>
      <div className="footer_middle">
        <ShuffleIcon className="footer_green" />
        <SkipPreviousIcon onClick={skipPrevious} className="footer_icon" />
        {playing ? (
          <PauseIcon
            onClick={handlePlayPause}
            className="new_icon footer_icon"
          />
        ) : (
          <PlayArrowIcon
            onClick={handlePlayPause}
            className="new_icon footer_icon"
          />
        )}

        <SkipNextIcon onClick={skipNext} className="footer_icon" />
        <RepeatIcon className="footer_green" />
      </div>
      <div className="footer_right">
        <PlaylistPlayIcon className="footer_rightIcon" />
        <div className="volume">
          <VolumeDownIcon
            onClick={() => volume > 0 && setVolume(volume - 10)}
            className="footer_rightIcon"
          />
          <input
            type="range"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            min={0}
            max={100}
            className="footer_slider"
          />
          <VolumeUpIcon
            onClick={() => volume < 100 && setVolume(volume + 10)}
            className="footer_rightIcon"
          />
        </div>
      </div>
    </div>
  );
};
