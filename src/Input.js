import React from 'react'
import { Container, Form, Row, Col } from 'react-bootstrap';


const styleHeader = {
    margin: 3,
    fontSize: "3rem", 
};

function Input(props) {
    const { handleSearchSubmit, input, handleChange, country, userId, logOut, Button, userName} = props;

    const handleSearch = (e) => {
        e.preventDefault();
        handleSearchSubmit();
    };

    return (
        <>
            <header style={styleHeader}>
                <h1>Jamming</h1>
                {userId ? <h3>Hi there, {userName}! <br/>Nice to have a user from {country}</h3> : null}
            </header>
            <Button variant='success' type='button' onClick={() => logOut()}>Log out</Button>
            <br />
            <br />
            <Container className="d-flex justify-content-center align-items-center" style={{ height: 18, marginTop: 20 }}>
                <Row className="w-100 d-flex justify-content-center align-items-center">
                    <Col md={6} className="d-flex justify-content-center" style={{ padding: 0 }}>
                        <Form onSubmit={handleSearch} style={{ textAlign: 'center', width: '100%'}}>
                            <Row className="align-items-center justify-content-center">
                                <Col md={7} style={{padding: 0}} >
                                    <Form.Control
                                        placeholder="Search for a track or artist"
                                        aria-label="search bar"
                                        value={input}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col md={2} style={{padding: 0}}>
                                    <Button variant='success' type="submit" className="w-100"> Search </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <br />
            <br />
        </>
    )
}


export default Input
