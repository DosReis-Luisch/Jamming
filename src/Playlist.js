import React, {useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

const styleTable = {
    marginTop: 18,
    textAlign: "center",
    width: "100%",

}


function PlayList(props) {
    const { playlist = [], handleRemoveTrack, handlePlayListTitleChange, playListTitle, millisToMinutesAndSeconds, handleListSumbit, Button, setPlaylistDuration, playlistDuration} = props;

    // get the total duration of the playlist
    useEffect(() => {
        let totalDuration = playlist.reduce((accumulator, track) => {
            return accumulator + track.duration_ms;
        }, 0);
        const minutes = Math.floor(totalDuration / 60000);
        const seconds = ((totalDuration % 60000) / 1000).toFixed(0);
        setPlaylistDuration(`${minutes} minutes and ${(seconds < 10 ? '0' : '')}${seconds} seconds`)
    }, [playlist])

    return (
        <>
        {playlist.length > 0 && (
            <div>
            <Form onChange={handlePlayListTitleChange} style={{ marginLeft: '15%', width: '70%' }}>
                <Form.Control
                    placeholder='Change playlist name here'
                    aria-label="Playlist Name"
                    value={playListTitle}
                />
            </Form>
            <br/>
            <table style={styleTable}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Track Name</th>
                        <th>Artist</th>
                        <th>Duration</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {playlist.map((track) => (
                        <tr key={track.id}>
                            <td><img src={track.album.images[0].url} style={{width: 80, borderRadius: '50%'}} alt={track.name} /></td>
                            <td>{track.name}</td>
                            <td>{track.artists.map(artist => artist.name).join(', ')}</td>
                            <td>{millisToMinutesAndSeconds(track.duration_ms)}</td>
                            <td><Button variant='success' type="submit" onClick={() => handleRemoveTrack(track)}>Remove</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <p>Your playlist has {playlist.length} {playlist.length > 1 ? "tracks" : "track"} with a total duration of {playlistDuration} </p>
            <Button variant='success' type="button" onClick={() => handleListSumbit()}>Submit PlayList</Button>
        </div>
        )}
        </>
    );
}

export default PlayList;
