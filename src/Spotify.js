import React, { useEffect } from 'react';
import axios from 'axios';
import Results from './Results';
import PlayList from './Playlist';
import Input from './Input'



function Spotify(props) {
    
    const {token, setListSumbitSuccess, playlistTitle, setPlaylistTitle, setUserId, userId, input, setInput, setSearchResults, playlist, setPlaylist, searchResults, setCountry, country, logOut, Button, userName, setUserName, setPlaylistDuration, playlistDuration} = props
    
    // Sets the name/title of the new playlist
    const handlePlayListTitleChange = (event) => {
        setPlaylistTitle(event.target.value);
    }

    // API time comes in ms - this fiunction converts it to m and s
    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    // handles input from search box
    const handleChange = (event) => {
        setInput(event.target.value);
        handleSearchSubmit()
    };

    // Gets some user data for some UI personalisation like userid(name?) and country
    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.get(`https://api.spotify.com/v1/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userData = response.data;
                setUserId(userData.id);
                setCountry(userData.country);
                const name = userData.id.split('.' || '_' || Number)[0]; // Split the string by '.' and get the first part
                const capitalizedWord = name.charAt(0).toUpperCase() + name.slice(1); // Capitalize the first letter
                setUserName(capitalizedWord);
            } catch (error) {
                console.error('Error getting user id:', error);
            }
        };
        if (token) {
            getUserData();
        }
    }, [token, setUserId, setCountry, setUserName]);

    // Calls the API with search endpoint with the input value
    const handleSearchSubmit = async () => {
        try {
            const response = await axios.get(`https://api.spotify.com/v1/search?q=${input}&type=track`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSearchResults(response.data.tracks.items);
        } catch (error) {
            console.error('Error searching for tracks:', error);
        }
    };

    // Add a track to the playlist without duplicates
    const handleAddTrack = (track) => {
        const trackExists = playlist.some(item => item.id === track.id);
        if (!trackExists) {
            setPlaylist(prevPlaylist => [...prevPlaylist, track]);
        }
    };

    // Remove the track on playlist by id
    const handleRemoveTrack = (track) => {
        setPlaylist(prevPlaylist => prevPlaylist.filter(item => item.id !== track.id));
    };

    // post playlist on spotify account
    const handleCreatePlaylist = async () => {
        try {
            const playlistData = {
                name: playlistTitle,
                description: "This is a playlist created by Jamming app",
                public: false
            };
            const response = await axios.post(`https://api.spotify.com/v1/me/playlists`, playlistData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data.id;
        } catch (error) {
            console.error('Error creating playlist:', error);
            throw error;
        }
    }

    // adds track on the newly created playlist
    const addTracksToPlaylist = async (playlistId) => {
        try {
            const trackUris = playlist.map(track => `spotify:track:${track.id}`);
            const response = await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, { uris: trackUris }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Tracks added to playlist:', response.data);
        } catch (error) {
            console.error('Error adding tracks to playlist:', error);
        }
    };

    // get the total duration of the playlist
    useEffect(() => {
        let totalDuration = playlist.reduce((accumulator, track) => {
            return accumulator + track.duration_ms;
        }, 0);
        const minutes = Math.floor(totalDuration / 60000);
        const seconds = ((totalDuration % 60000) / 1000).toFixed(0);
        setPlaylistDuration(`${minutes} minutes and ${(seconds < 10 ? '0' : '')}${seconds} seconds`)
    }, [playlist, setPlaylistDuration])

    // uses the 2 previous functions to create a list, and add tracks
    const handleListSumbit = async () => {
        try {
            const playlistId = await handleCreatePlaylist();
            await addTracksToPlaylist(playlistId)
            setListSumbitSuccess("Success")

        } catch (error) {
            console.log(`There was an error submiting the playlist: ${error}`)
            setListSumbitSuccess("Failed")
        }
    }

    

    return (
        <div>
            <Input 
                handleSearchSubmit={handleSearchSubmit} 
                input={input} 
                handleChange={handleChange}
                userId={userId}
                country={country}
                logOut={logOut}
                Button={Button} 
                userName={userName} />
            <div style={{ display: 'flex' }}>
                <div style={{ marginRight: "1%", marginLeft: "2%", width: "46%" }}>
                    <Results
                        searchResults={searchResults}
                        handleAddTrack={handleAddTrack}
                        millisToMinutesAndSeconds={millisToMinutesAndSeconds}
                        Button={Button}  />
                </div>
                <div style={{ marginLeft: "2%", width: "48%" }}>
                    <PlayList
                        playlist={playlist}
                        searchResults={searchResults}
                        handleRemoveTrack={handleRemoveTrack}
                        handlePlayListTitleChange={handlePlayListTitleChange}
                        playListTitle={playlistTitle}
                        millisToMinutesAndSeconds={millisToMinutesAndSeconds}
                        handleListSumbit={handleListSumbit}
                        Button={Button}
                        setPlaylistDuration={setPlaylistDuration}
                        playlistDuration={playlistDuration}  />
                </div>
            </div>

        </div>
    );
}

export default Spotify;
