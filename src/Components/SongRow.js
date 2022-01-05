import React from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { useStateValue } from "./contextWarper";

export const SongRow = ({ spotify, id }) => {
  const [{ album_songs }, dispatch] = useStateValue();

  const handleSongId = (songItem) => {
    spotify
      .play({
        uris: [songItem.uri],
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

  return (
    <div className="songs_container">
      <div className="songs_header">
        <p># TITLE</p>
        <p>ALBUM</p>
        <p>DATE ADDED</p>
        <p>{<AccessTimeIcon className="timer" />}</p>
      </div>
      <hr className="songs_container" />
      {album_songs
        ? album_songs.map((item, index) => {
            return (
              <div
                className="songs_row"
                key={index + 1}
                onClick={() => handleSongId(item.track)}
              >
                <div className="artist_block">
                  <p>{index + 1}</p>
                  <div>
                    <img
                      src={item.track.album.images[2].url}
                      alt="pic"
                      width="40px"
                      height="40px"
                      className="songs_img"
                    />
                  </div>
                  <div>
                    <p style={{ color: "white" }}>{item.track.name}</p>
                    <p className="artist_name">
                      {item.track.artists.map((artist, index) => {
                        if (
                          index === item.track.artists.length - 1 &&
                          index - 1 < 3
                        )
                          return <span key={index + 1}>{artist.name}</span>;
                        if (index - 1 < 3)
                          return (
                            <span key={index + 1}>{`${artist.name}, `}</span>
                          );
                      })}
                    </p>
                  </div>
                </div>

                <p>{item.track.album.name}</p>
                <p>date added</p>
                <p className="timer">
                  {parseInt(item.track.duration_ms / 60000)}:
                  {parseInt(item.track.duration_ms / 1000) % 60}
                </p>
              </div>
            );
          })
        : null}
    </div>
  );
};
