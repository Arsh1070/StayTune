export const authEndpoint = process.env.REACT_APP_Auth_EndPoint;

const clientId = process.env.REACT_APP_Client_Id;
const redirectUri = process.env.REACT_APP_Redirect_Uri;

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
