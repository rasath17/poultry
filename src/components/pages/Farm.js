import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Container, Form, Button, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import {getAuthToken} from '../auth/getAuthToken';
import {useNavigate} from "react-router-dom";
import FetchId from "../FetchId";

function Farm() {
    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();
    const navigate = useNavigate();


    useEffect(() => {
        const farmId = localStorage.getItem('farmId');
        if (farmId) {
            navigate('/dashboard');
        }
    }, [navigate]);
    const onSubmit = async (data) => {


        try {
            const token = await getAuthToken();
            // Send form data to the Spring Boot API
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/farms`, data, {
                headers: {Authorization: `Bearer ${token}`},
            });
            console.log('Response from server:', response.data);
            reset(); // Reset form fields after successful submission
            alert('Form submitted successfully!'); // Show success alert
            navigate('/dashboard');


        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.'); // Show error alert
        }
    };

    return (
        <Container className="mt-4 pt-5">
            <h2 className="text-center mb-4">Farm Registration Form</h2>

            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="owner" className="mt-3 mt-md-0">
                            <Form.Label>Owner Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter owner name"
                                {...register('owner', {
                                    required: 'Owner name is required',
                                    maxLength: {value: 100, message: 'Owner name cannot exceed 100 characters'},
                                })}
                                isInvalid={!!errors.owner}
                            />
                            <Form.Control.Feedback type="invalid">{errors.owner?.message}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    {/*<Col xs={12} md={6}>*/}
                    {/*    <Form.Group controlId="email">*/}
                    {/*        <Form.Label>Email</Form.Label>*/}
                    {/*        <Form.Control*/}
                    {/*            type="email"*/}
                    {/*            placeholder="Enter email"*/}
                    {/*{...register('email', {*/}
                    {/*    required: 'Email is required',*/}
                    {/*    pattern: {value: /\S+@\S+\.\S+/, message: 'Invalid email address'},*/}
                    {/*})}*/}
                    {/*            isInvalid={!!errors.email}*/}
                    {/*        />*/}
                    {/*        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>*/}
                    {/*    </Form.Group>*/}
                    {/*</Col>*/}

                    <Form.Control type="hidden"
                                  {...register('email')}
                                  value={localStorage.getItem("email")}
                    />


                    <Col xs={12} md={6}>
                        <Form.Group controlId="farmName">
                            <Form.Label>Farm Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter farm name"
                                {...register('farmname', {
                                    required: 'Farm name is required',
                                    maxLength: {value: 100, message: 'Farm name cannot exceed 100 characters'},
                                })}
                                isInvalid={!!errors.farmname}
                            />
                            <Form.Control.Feedback type="invalid">{errors.farmname?.message}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter location"
                                {...register('location', {required: 'Location is required'})}
                                isInvalid={!!errors.location}
                            />
                            <Form.Control.Feedback type="invalid">{errors.location?.message}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                        <Form.Group controlId="createdAt">
                            <Form.Label>Created At</Form.Label>
                            <Form.Control
                                type="date"
                                {...register('created_at', {required: 'Created date is required'})}
                                isInvalid={!!errors.created_at}
                                max={today}
                            />
                            <Form.Control.Feedback type="invalid">{errors.created_at?.message}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" className="mt-4 w-100">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default Farm;
