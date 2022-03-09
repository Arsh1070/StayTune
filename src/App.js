import "./App.css";
import { Login } from "./Components/Login";
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromUrl } from "./Components/Spotify";
import { useEffect } from "react";
import { useStateValue } from "./Components/contextWarper";
import { MainScreen } from "./Components/MainScreen";

const spotifyApi = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useStateValue();

  useEffect(() => {
    const receivedToken = getTokenFromUrl().access_token;
    window.location.hash = "";

    if (receivedToken) {
      spotifyApi.setAccessToken(`${receivedToken}`);

      dispatch({ type: "Set_token", token: receivedToken });
      dispatch({ type: "Set_spotify", spotify: spotifyApi });

      spotifyApi.getUserPlaylists().then((data) => {
        dispatch({ type: "Set_playlists", data });
      });
    }
  }, [token, dispatch]);

  return (
    <>
      {!token && <Login />}
      {token && <MainScreen />}
    </>
  );
}

export default App;
