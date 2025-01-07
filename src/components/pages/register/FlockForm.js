import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Container, Form, Button, Alert, Row, Col, Card} from 'react-bootstrap';
import axios from 'axios';
import {getAuthToken} from '../../auth/getAuthToken';
import FetchId from '../../FetchId';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Link} from "react-router-dom";

function FlockForm() {
    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    FetchId();
    const [token, setToken] = useState(null);
    const [formId, setFormid] = useState(null);
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitSuccessful},
        reset,
    } = useForm();

    useEffect(() => {
        localStorage.setItem('farmId', 3);
    }, []);

    const onSubmit = async (data) => {
        try {
            const token = await getAuthToken();
            const payload = {
                ...data,
                farm: {
                    farmId: localStorage.getItem('farmId')
                }
            };
            setToken(token);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/flocks`, payload, {
                headers: {Authorization: `Bearer ${token}`},
            });
            reset();
            alert('Flock data submitted successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error submitting form:', error.message);
            alert('Error submitting form. Please try again.');
        }
    };

    return (
        <div className="mt-5 pt-5">
            <Container>
                {/* Breadcrumb Navigation */}
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={'/dashboard'}>Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to={'/register'}>Registration</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Batch Register</Breadcrumb.Item>
                </Breadcrumb>
            </Container>

            {/* Form Container */}
            <Container className="mt-4">
                <Card className="shadow-sm">
                    <Card.Body>
                        <h2 className="text-center mb-4">Batch Registration</h2>
                        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Row className="mb-3">
                                <Col xs={12}>
                                    <Form.Group controlId="flockName">
                                        <Form.Label>Flock Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter flock name"
                                            {...register('flockName', {required: 'Flock name is required'})}
                                            isInvalid={!!errors.flockName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.flockName?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="ageInWeeks">
                                        <Form.Label>Age in Weeks</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter age in weeks"
                                            {...register('ageInWeeks', {
                                                required: 'Age in weeks is required',
                                                min: {value: 0, message: 'Age cannot be negative'},
                                            })}
                                            isInvalid={!!errors.ageInWeeks}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.ageInWeeks?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6}>
                                    <Form.Group controlId="breed">
                                        <Form.Label>Breed</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter breed"
                                            {...register('breed', {
                                                required: 'Breed is required',
                                                maxLength: {
                                                    value: 50,
                                                    message: 'Breed name cannot exceed 50 characters'
                                                },
                                            })}
                                            isInvalid={!!errors.breed}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.breed?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="dateAdded">
                                        <Form.Label>Hatch Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            {...register('dateAdded', {required: 'Hatch date is required'})}
                                            isInvalid={!!errors.dateAdded}
                                            max={today}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.dateAdded?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6}>
                                    <Form.Group controlId="totalChickens">
                                        <Form.Label>Total Chickens</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter total number of chickens"
                                            {...register('totalChickens', {
                                                required: 'Total chickens is required',
                                                min: {value: 1, message: 'There must be at least 1 chicken'},
                                            })}
                                            isInvalid={!!errors.totalChickens}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.totalChickens?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button variant="primary" type="submit" className="w-100">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default FlockForm;
