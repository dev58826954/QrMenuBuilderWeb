import {Button, Col, Form, Row, Card, Spinner} from "react-bootstrap"
import {React, useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';

import {signIn} from '../apis';
import MainLayout from '../layouts/MainLayout';
import AuthContext from '../contexts/AuthContext';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (auth.token) {
            history.replace('/places');
        }
    });

    const onClick = () => {
        auth.signIn(username, password, () => history.replace("/places"));
    };

    return (
        <MainLayout>
            <Row className="justify-content-center ">
                <Col lg={6} md={8}>
                    <Card style={{ marginTop: "80px"}} className="shadow">
                        <Card.Body>
                            <h3 className="text-center">
                                <b>Connexion.</b>
                            </h3>

                            <Form.Group>
                                <Form.Label>Nom d'utilisateur</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Entrer votre nom d'utilisateur"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter votre mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button variant="standard" block onClick={onClick} disabled={auth.loading}>
                                {
                                    auth.loading ? (
                                        <Spinner
                                            variant="standard"
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        "Se connecter"
                                    )
                                }
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </MainLayout>
    )
}


export default Login;