import React, { useState, useEffect } from 'react'
import './App.css';
import Spotify from './Spotify'
import FailedLogin from './FailedLogin'
import FailedListSubmit from './FailedListSubmit';
import PlaylistSumbitSuccessful from './PlaylistSubmitSuccessful';
import Login from './Login';
import Button from 'react-bootstrap/Button';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState()
  const [failedLogin, setFailedLogin] = useState(false)
  const [listSubmitSuccess, setListSumbitSuccess] = useState("Not submited yet");
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [userId, setUserId] = useState();
  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [country, setCountry] = useState();
  const [userName, setUserName] = useState()
  const [playlistDuration, setPlaylistDuration] = useState()

  useEffect(() => {
    // Function to extract access token from URL hash
    const getAccessTokenFromUrl = () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get('access_token');
      if (accessToken) {
        setToken(accessToken);
        setIsLoggedIn(true);
        setFailedLogin(false)
      }
    }
    getAccessTokenFromUrl();
  }, []); // Run only once on component mount



  const userAuthentication = async () => {
    try {
      const client_id = 'a31f3585b18d45b1af31a78df574e23a';
      const redirect_uri = 'luischreis.netlify.app';
      const state = generateRandomString(16);
      localStorage.setItem('spotify_auth_state', state);
      const scope = 'playlist-modify-public playlist-modify-private user-read-private user-read-email';

      const url = 'https://accounts.spotify.com/authorize';
      const params = new URLSearchParams({
        response_type: 'token',
        client_id,
        scope,
        redirect_uri,
        state,
      }).toString();
      window.location.href = `${url}?${params}`
    } catch (error) {
      console.log("Failed authenticating")
      setFailedLogin(true)
    }
  
  };

  function logOut() {
    setToken("");
    setPlaylistTitle("");
    setSearchResults([]);
    setPlaylist([]);
    setInput("");
    setIsLoggedIn(false);
    setListSumbitSuccess("Not submited yet");
    setUserName("");
    window.location.hash = ""
  }

  function createAnotherList() {
    setListSumbitSuccess("Not submited yet")
    setPlaylistTitle()
    setSearchResults([])
    setPlaylist([])
    setInput('')

  }

  const generateRandomString = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  return (
    <div>
      {listSubmitSuccess === "Not submited yet" && isLoggedIn ? <Spotify 
        token={token} 
        setListSumbitSuccess={setListSumbitSuccess} 
        playlistTitle={playlistTitle}
        setPlaylistTitle={setPlaylistTitle}
        userId={userId}
        input={input}
        setInput={setInput}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        playlist={playlist}
        setPlaylist={setPlaylist}
        setUserId={setUserId}
        logOut={logOut}
        setCountry={setCountry} 
        country={country}
        Button={Button}
        userName={userName}
        setUserName={setUserName}
        setPlaylistDuration={setPlaylistDuration}
        playlistDuration={playlistDuration} /> : null}
      {!isLoggedIn &&  <Login  userAuthentication={userAuthentication} Button={Button}/>}
      {failedLogin ? <FailedLogin userAuthentication={userAuthentication} Button={Button} /> : null}
      {listSubmitSuccess === "Success" && <PlaylistSumbitSuccessful 
        logOut={logOut} 
        Button={Button}
        createAnotherList={createAnotherList}
        playlistTitle={playlistTitle}
        userName={userName}
        playlist={playlist}
        playlistDuration={playlistDuration} />}
      {listSubmitSuccess === "Failed" && <FailedListSubmit userAuthentication={userAuthentication} Button={Button}/> }
    </div>
  );
}

export default App;