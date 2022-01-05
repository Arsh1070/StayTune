import "./App.css";
import { Login } from "./Components/Login";
import spotify from "./Components/Spotify";
import { getTokenFromUrl } from "./Components/Spotify";
import { useEffect } from "react";
import { useStateValue } from "./Components/contextWarper";
import { MainScreen } from "./Components/MainScreen";

function App() {
  const [{ token }, dispatch] = useStateValue();

  useEffect(() => {
    const receivedToken = getTokenFromUrl().access_token;
    window.location.hash = "";
    if (window.history.back) {
      window.location.hash = "";
    }

    if (receivedToken) {
      spotify.setAccessToken(`${receivedToken}`);

      dispatch({ type: "Set_token", token: receivedToken });

      spotify.getUserPlaylists().then((data) => {
        dispatch({ type: "Set_playlists", data });
      });
    }
  }, [token, dispatch]);

  return (
    <>
      {!token && <Login />}
      {token && <MainScreen spotify={spotify} />}
    </>
  );
}

export default App;
