import SpotifyWebApi from "spotify-web-api-js";
export const authEndpoint = "https://accounts.spotify.com/authorize";

const clientId = "aa11b34647b64ee49cfd33fa22c1415d";
const clientSecret = "2da9b5640269456aae053567307e174a";
const redirectUri = "http://localhost:3000/";

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-top-read",
  "user-follow-read",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-modify-playback-state",
];

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let arrItems = item.split("=");
      initial[arrItems[0]] = arrItems[1];
      return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const spotify = new SpotifyWebApi({
  clientId: "aa11b34647b64ee49cfd33fa22c1415d",
  clientSecret: "2da9b5640269456aae053567307e174a",
});

export default spotify;
