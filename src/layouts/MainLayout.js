import {Navbar, Nav, Container} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import React, {useContext} from 'react';

import AuthContext from '../contexts/AuthContext';

const MainLayout = ({children}) => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const onSignIn = () => {
        history.replace("/login");
    }

    const onRegister = () => {
        history.replace("/register");
    }

    const onSignOut = () => {
        auth.signOut();
        history.push("/login");
    }

    const goToPlaces = () => {
        history.push("/places");
    }

    return (
        <>
            <Navbar bg="light" variant="light" className="mb-5 shadow-sm fixed-top">
                <Navbar.Brand href="/">QR Menu</Navbar.Brand>

                <Nav>
                    <Nav.Link onClick={goToPlaces}>Restaurants</Nav.Link>
                </Nav>

                <Nav className="flex-grow-1 justify-content-end mr-5">
                    {auth.token ? (
                        <Nav.Link onClick={onSignOut}>Déconnexion</Nav.Link>
                    ) : (
                        [
                            <Nav.Link key={1} onClick={onSignIn}>Se connecter</Nav.Link>,
                            <Nav.Link key={2} onClick={onRegister}>S'inscrire</Nav.Link>
                        ]
                    )}

                </Nav>
            </Navbar>
            <Container style={{ marginTop: "100px"}}>
                {children}
            </Container>
        </>
    )
}

export default MainLayout;