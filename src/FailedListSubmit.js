import React from 'react';

function FailedListSubmit(props) {

    const { userAuthentication, Button } = props;
    
    return (
        <>
            <h2>It seems that something went wrong</h2>
            <p>Do you want to try again?</p>
            <Button variant='success' onClick={() => userAuthentication()} >Try again</Button>

        </>
    )
}

export default FailedListSubmit