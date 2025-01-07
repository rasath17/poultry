import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { getAuthToken } from '../../auth/getAuthToken';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function EmployeeForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);

    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const token = await getAuthToken();
            const payload = {
                ...data,
                farm: { farmId: localStorage.getItem('farmId') },
            };
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/employees`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Response from server:', response.data);
            setIsSubmitted(true);
            reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmissionError('Failed to submit the form. Please try again.');
        }
    };

    return (
        <div className="mt-5 pt-5">
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/dashboard">Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/register">Registration</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Employee</Breadcrumb.Item>
                </Breadcrumb>
            </Container>

            <Container fluid className="d-flex justify-content-center align-items-center pb-5 p-md-5">
                <div className="w-100 px-md-3" style={{ maxWidth: '600px' }}>
                    <h2 className="text-center mb-4">Employee Registration</h2>

                    {isSubmitted && (
                        <Alert variant="success" onClose={() => setIsSubmitted(false)} dismissible>
                            Employee data submitted successfully!
                        </Alert>
                    )}

                    {submissionError && (
                        <Alert variant="danger" onClose={() => setSubmissionError(null)} dismissible>
                            {submissionError}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit(onSubmit)} noValidate className="bg-white p-4 rounded shadow">
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter full name"
                                {...register('name', {
                                    required: 'Name is required',
                                    maxLength: { value: 100, message: 'Name cannot exceed 100 characters' },
                                })}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="role" className="mt-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                {...register('role', {
                                    required: 'Role is required',
                                    maxLength: { value: 50, message: 'Role cannot exceed 50 characters' },
                                })}
                                isInvalid={!!errors.role}
                            >
                                <option value="" hidden>
                                    Select a Role
                                </option>
                                <option value="Owner">Owner</option>
                                <option value="Manager">Manager</option>
                                <option value="Employee">Employee</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.role?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="start_date" className="mt-3">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                {...register('start_date', { required: 'Start date is required' })}
                                isInvalid={!!errors.start_date}
                                max={today}
                            />
                            <Form.Control.Feedback type="invalid">{errors.start_date?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-4 w-100">
                            Submit
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
}

export default EmployeeForm;
