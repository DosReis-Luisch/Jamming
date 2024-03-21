import React from 'react'


function FailedLogin(props) {

    const { userAuthentication, Button } = props;

    return (
        <>
        <h1>Sorry, it seems that something didn't go as expected</h1>
        <Button variant='success' onClick={() => userAuthentication()} >Try again</Button>
        </>
    )
}

export default FailedLogin