import React, { useState } from 'react';
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth, provider, signInWithPopup, setPersistence, browserLocalPersistence } from '../../config/firebase';
import {signInWithRedirect} from "firebase/auth";
function EggFarmLogin() {
    const backgroundImage = "/images/poultryHome.jpg";

    // State for managing checkbox
    const [isAgreementChecked, setIsAgreementChecked] = useState(false);

    // Google Sign-In method
    const handleGoogleSignIn = async () => {
        try {
            // Set persistence to local
            await setPersistence(auth, browserLocalPersistence);

            // Trigger Google Sign-In
            const result = await signInWithPopup(auth, provider);

            // Get user information
            const user = result.user;
            console.log('Google User Info:', user);

            // After sign-in, you can redirect or handle further logic
            // Example: redirect to dashboard
            // history.push('/dashboard');
            //  await signInWithRedirect(auth, provider);

        } catch (error) {
            console.error('Error during Google Sign-In:', error.message);
            alert('Error: ' + error.message);
        }
    };

    return (
        <Container
            fluid
            className="d-flex align-items-center justify-content-center min-vh-100"
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
                    <Card className="shadow-sm p-0 p-md-3 login-card" id={'login-card'}>
                        <Card.Body className="text-center">
                            <h3 className="mb-4">Welcome  EggFarm365</h3>
                            <p className="mb-4 " style={{ fontSize: '18px' }}>
                                Your trusted poultry management solution
                            </p>


                            {/* Alternative sign-in */}
                            <Link to={'/login'}>
                                <Button variant="outline-secondary" className="w-100" style={{ padding: '12px' }}>
                                    Sign In with Email
                                </Button>
                            </Link>



                            <p>or</p>

                            {/* Google Sign-In Button */}
                            <Button
                                variant="primary"
                                className="w-100 mb-3"
                                style={{ padding: '12px' }}
                                onClick={handleGoogleSignIn}
                                disabled={!isAgreementChecked} // Disable button if checkbox is not checked
                            >
                                <i className="fab fa-google"></i> Sign In with Google
                            </Button>
                            {/* Checkbox for User Agreement */}
                            <Form.Group controlId="userAgreementCheckbox" className="mb-3 text-start">
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
                            {/* Links */}
                            <div className="mt-4">
                                <p>
                                    New to Egg Farm 365? <Link to="/signup" style={{ color: "#28a745" }}>Sign Up</Link>
                                </p>
                                <p>
                                    <Link to="/resetpassword" style={{ color: "#28a745" }}>Forgot Password?</Link>
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default EggFarmLogin;
