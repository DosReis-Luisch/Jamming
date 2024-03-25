import React from 'react';


const styleTable = {
    marginTop: 47,
    textalign: "center",

}



function Results(props) {
    
    const { searchResults, handleAddTrack, millisToMinutesAndSeconds, Button } = props; // Destructure searchResults from props



    return (
        <>       
            {searchResults.length > 0 && (
                <>
                    <h3>Search Results</h3>
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
                            {searchResults.map((track) => (
                                <>
                                <tr key={track.id}>
                                    <td><img src={track.album.images[0].url} style={{ width: 80, borderRadius: '50%' }} alt={track.name} /></td>
                                    <td>{track.name}</td>
                                    <td>{track.artists.map(artist => artist.name).join(', ')}</td>
                                    <td>{millisToMinutesAndSeconds(track.duration_ms)}</td>
                                    <td><Button variant='success' type="submit" onClick={() => handleAddTrack(track)}>Add</Button></td>
                                    <td>
                                        {track.preview_url ? (
                                            <audio controls controlsList="nodownload" style={{ width: '300px', maxWidth: '120px' }}>
                                                <source src={track.preview_url} type="audio/mp3" />
                                                Your browser does not support the audio element.
                                            </audio>
                                        ) : <p>No preview Available</p>}
                                    </td>
                                </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </> 
            )}
        </>
    );
}

export default Results;

