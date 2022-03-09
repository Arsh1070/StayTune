export const initial = {
  playlists: [],
  defaultPlaylist_Id: "2jF6eajbFzjfDo9nC3cviC",
  playlist_Info: null,
  spotify: null,
  album_songs: null,
  top_artists: null,
  playing: false,
  item: null,
  searchbar: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Set_token":
      return {
        ...state,
        token: action.token,
      };
    case "Set_spotify":
      return {
        ...state,
        spotify: action.spotify,
      };
    case "Set_playlists":
      return {
        ...state,
        playlists: action.data,
      };
    case "Set_platListId":
      return {
        ...state,
        defaultPlaylist_Id: action.playlist_Id,
      };
    case "Get_tracks":
      return {
        ...state,
        album_songs: action.songs,
        playlist_Info: action.playlistInfo,
      };
    case "Set_item":
      return {
        ...state,
        item: action.item,
      };
    case "Set_playing":
      return {
        ...state,
        playing: action.playing,
      };
    case "Set_searchbar":
      return {
        ...state,
        searchbar: action.Stat,
      };

    default:
      return state;
  }
};

export default reducer;
