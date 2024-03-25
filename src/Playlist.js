import React from 'react';
import { Form } from 'react-bootstrap';

const styleTable = {
    marginTop: 18,
    textAlign: "center",
    width: "100%",

}


function PlayList(props) {
    const { playlist = [], handleRemoveTrack, handlePlayListTitleChange, playListTitle, millisToMinutesAndSeconds, handleListSumbit, Button, playlistDuration} = props;

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
                        <th>Preview</th>
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
                            <td>
                                {track.preview_url ? (
                                    <audio controls controlsList="nodownload" style={{ width: '300px', maxWidth: '120px' }}>
                                        <source src={track.preview_url} type="audio/mp3" />
                                        Your browser does not support the audio element.
                                    </audio>
                                ) : <p>No preview Available</p>}
                            </td>
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
