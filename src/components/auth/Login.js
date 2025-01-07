import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import '../styles/login.css';
import { auth, signInWithEmailAndPassword } from '../../config/firebase';
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";

function Login(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State for error messages
    const backgroundImage = "/images/poultryHome.jpg";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state before attempting login
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await result.user.getIdToken();
            setPersistence(auth, browserLocalPersistence);

            alert("Successfully logged in!");
            navigate('/dashboard');

        } catch (error) {

            setError(error.message);
        }
        console.log('Email:', email, 'Password:', password);
    };

    return (
        <>
            <Container
                fluid
                className="login-container d-flex align-items-center justify-content-center min-vh-100"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: 'absolute',
                    height: "100%",
                    width: "100%",
                }}
            >
                <Row className="w-100 justify-content-center">
                    <Col xs={12} md={6} lg={4}>
                        <Card className="shadow-sm p-0 p-md-3" id="login-card">
                            <Card.Body>
                                <h3 className="text-center mb-4">Sign In</h3>
                                {error && (
                                    <Alert variant="danger" className="text-center">
                                        {error}
                                    </Alert>
                                )}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formBasicEmail" className="mb-3">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword" className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="w-100 mt-2">
                                        Sign In
                                    </Button>
                                </Form>
                                <div className="text-center mt-3 text-dark">
                                    <span>Create an account </span>
                                    <Link to="/signup" style={{ color: "blue" }}>Sign Up</Link>
                                </div>
                                <div className="text-center mt-3 text-white">
                                    <Link to={"/resetpassword"} style={{ color: "white" }}>
                                        Forgot Password
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Login;
