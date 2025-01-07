import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import '../styles/login.css';
import { auth, createUserWithEmailAndPassword } from '../../config/firebase';
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAgreementChecked, setIsAgreementChecked] = useState(false); // State for agreement checkbox
    const [error, setError] = useState(null); // State for error messages
    const [successMessage, setSuccessMessage] = useState(null); // State for success messages
    const backgroundImage = "/images/poultryHome.jpg";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state
        setSuccessMessage(null); // Reset success message state

        try {
            // Set persistence and create user
            await setPersistence(auth, browserLocalPersistence);
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const idToken = await result.user.getIdToken();

            setSuccessMessage("Successfully registered! Redirecting to login...");
            setTimeout(() => navigate('/'), 3000); // Redirect to login after 3 seconds
            console.log("User Token:", idToken);

        } catch (error) {
            setError("Error during sign-up: " + error.message);
        }
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
                    <Col md={6} lg={4}>
                        <Card className="p-0 p-md-3 shadow-sm login-card" id="login-card">
                            <Card.Body>
                                <h3 className="text-center mb-4">Sign Up</h3>

                                {/* Display error message */}
                                {error && (
                                    <Alert variant="danger" className="text-center">
                                        {error}
                                    </Alert>
                                )}

                                {/* Display success message */}
                                {successMessage && (
                                    <Alert variant="success" className="text-center">
                                        {successMessage}
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

                                    {/* User Agreement Checkbox */}
                                    <Form.Group controlId="userAgreementCheckbox" className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label={
                                                <>
                                                    I agree to the <Link to="/policy">User Agreement</Link> and terms.
                                                </>
                                            }
                                            onChange={(e) => setIsAgreementChecked(e.target.checked)}
                                        />
                                    </Form.Group>

                                    {/* Submit Button */}
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100 mt-2"
                                        disabled={!isAgreementChecked} // Disable button if the checkbox is not checked
                                    >
                                        Sign Up
                                    </Button>
                                </Form>

                                <div className="text-center mt-3 text-white">
                                    <span>Already have an account? </span>
                                    <Link to="/" style={{ color: "blue" }}>Log In</Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default SignUp;
