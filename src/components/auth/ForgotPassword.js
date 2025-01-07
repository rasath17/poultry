import React, {useState} from 'react';
import {auth, signInWithEmailAndPassword} from "../../config/firebase";
import {sendPasswordResetEmail} from "firebase/auth";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

function ForgotPassword(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [showAlert, setshowAlert] = useState(false);
    const backgroundImage = "/images/poultryHome.jpg";
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            sendPasswordResetEmail(auth, email)

            setshowAlert(true);
            setTimeout(() => {
                setshowAlert(false)
                navigate('/')
            }, 3000)

        } catch (error) {
            alert(error.message);
        }
    };
    return (<>

            <Container fluid className="login-container d-flex align-items-center justify-content-center min-vh-100"
                       style={{
                           backgroundImage: `url(${backgroundImage})`,
                           backgroundSize: "cover",
                           backgroundPosition: "center",
                           position: 'absolute',
                           height: "100%",
                           width: "100%",

                       }}>

                <Row className="w-100 justify-content-center ">

                    <Col md={6} lg={4}>
                        <div className="contactForm">
                            <div style={{width: '100%'}}
                                 className={`alert alert-success ${showAlert ? '' : 'd-none'}`} role="alert">
                                <p className="alert-heading">Password Reset Link is send tp your mail is
                                    Successfully</p>

                            </div>
                        </div>
                        <Card className="p-0 p-md-3 shadow-sm login-card" id={'login-card'}>
                            <Card.Body>

                                <h3 className="text-center mb-4">Forgot Password </h3>
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
                                    <Button variant="primary" type="submit" className="w-100 mt-2">
                                        Send Reset Link
                                    </Button>
                                </Form>
                                <div className="text-center mt-3">
                                    <small>
                                        Back to <Link to="/" >Sign In</Link>
                                    </small>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ForgotPassword;