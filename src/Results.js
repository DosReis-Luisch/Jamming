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

