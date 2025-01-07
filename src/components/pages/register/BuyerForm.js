import React from 'react';
import {useForm} from 'react-hook-form';
import {Container, Form, Button} from 'react-bootstrap';
import axios from 'axios';
import {getAuthToken} from '../../auth/getAuthToken';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Link} from "react-router-dom";

function BuyerForm() {
    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const token = await getAuthToken();
            const payload = {
                ...data,
                "farm": {
                    "farmId": localStorage.getItem('farmId')
                } // Assuming `buyerId` is stored in localStorage
            };
            // Send form data to the Spring Boot API
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/buyerregistration`, payload, {
                headers: {Authorization: `Bearer ${token}`},
            });
            console.log('Response from server:', response.data);
            reset(); // Reset form fields after successful submission
            alert('Buyer data submitted successfully!'); // Show success alert
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.'); // Show error alert
        }
    };

    return (
        <div className="mt-5 pt-5">
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={'/dashboard'}>Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={'/register'}>Registration</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Buyer
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Container>
            <Container fluid className="d-flex justify-content-center align-items-center pb-5 p-md-5">
                <div className="w-100 px-md-3" style={{maxWidth: '600px'}}>
                    <h2 className="text-center mb-4">Buyer Registration</h2>
                    <Form onSubmit={handleSubmit(onSubmit)} noValidate className="bg-white p-4 rounded shadow">
                        {/* Hidden ID Field */}


                        {/* Name Field */}
                        <Form.Group controlId="name" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                {...register('BuyerName', {
                                    required: 'Name is required',
                                    maxLength: {value: 100, message: 'Name cannot exceed 100 characters'},
                                })}
                                isInvalid={!!errors.BuyerName}
                            />
                            <Form.Control.Feedback type="invalid">{errors.BuyerName?.message}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Phone Number Field */}
                        <Form.Group controlId="phone" className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone number"
                                {...register('PhoneNumber', {
                                    required: 'Phone number is required',
                                    pattern: {value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit phone number'},
                                })}
                                isInvalid={!!errors.PhoneNumber}
                            />
                            <Form.Control.Feedback type="invalid">{errors.PhoneNumber?.message}</Form.Control.Feedback>
                        </Form.Group>


                        {/* Date Field */}
                        <Form.Group controlId="date" className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                {...register('DateCreated', {required: 'Date is required'})}
                                isInvalid={!!errors.DateCreated}
                                max={today}
                            />
                            <Form.Control.Feedback type="invalid">{errors.DateCreated?.message}</Form.Control.Feedback>
                        </Form.Group>
                        {/* Address Field */}
                        <Form.Group controlId="address" className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter address"
                                {...register('Address', {
                                    required: 'Address is required',
                                    maxLength: {value: 200, message: 'Address cannot exceed 200 characters'},
                                })}
                                isInvalid={!!errors.Address}
                            />
                            <Form.Control.Feedback type="invalid">{errors.Address?.message}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Submit Button */}
                        <Button variant="primary" type="submit" className="mt-4 w-100">
                            Submit
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
}

export default BuyerForm;
