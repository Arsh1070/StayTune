export const initial = {
  user: null,
  playlists: [],
  playlist_Id: null,
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
    case "Set_playlists":
      return {
        ...state,
        playlists: action.data,
      };
    case "Set_playlistId":
      return {
        ...state,
        playlist_Id: action.Id_val,
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
