import React from 'react'

const styleTable = {
    marginTop: 18,
    textAlign: "center",
    width: "100%",
    margin: '50 auto',

}


function PlaylistSumbitSuccessful(props) {

    const { logOut, createAnotherList, userName, playlistTitle, playlist, Button, playlistDuration } = props;

    return (
        <>
            <h2>{`The playlist: ${playlistTitle} was successfully submited to your account.`}</h2>
            <h3>Thank you {userName}!</h3>
            <div style={{textAlign: 'center', margin: 60}} >
            <table style={styleTable} >
                <thead>
                    <tr>
                        <th></th>
                        <th>Track Name</th>
                        <th>Artist</th>
                    </tr>
                </thead>
                <tbody>
                    {playlist.map((track) => (
                        <tr key={track.id}>
                            <td><img src={track.album.images[0].url} style={{width: 80, borderRadius: '50%'}} alt={track.name} /></td>
                            <td>{track.name}</td>
                            <td>{track.artists.map(artist => artist.name).join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <p style={{margin: 10}} >Your playlist has {playlist.length} {playlist.length > 1 ? "tracks" : "track"} with a total duration of {playlistDuration} </p>
            <Button variant='success' type='button' onClick={() => createAnotherList()} >Create another list</Button>
            <Button variant='success' type='button' onClick={() => logOut()} style={{marginLeft: 20}} >Log out</Button>
        </>
    )
}

export default PlaylistSumbitSuccessful