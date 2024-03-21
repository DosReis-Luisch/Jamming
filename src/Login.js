import React from 'react'



function Login(props) {

    const { userAuthentication, Button } = props 

    return (
        <>
        <h1>Welcome to Jamming App</h1>
        <h2>In order to use the app please Authenticate with your Spotify account</h2>
        <Button variant='success' onClick={userAuthentication}>Spotify Authentication</Button>
        </>
    )
}

export default Login