import React, {useEffect, useState} from "react";
import {Form, Button, Container} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {getAuthToken} from "../../auth/getAuthToken";
import axios from "axios";
import "../../styles/InventoryDetailsForm.css"; // Import the scoped CSS file

function FeedDetailsForm(props) {
    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    const {showDatePicker} = props
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [batchList, setBatchList] = useState([]);
    const [batchNames, setBatchNames] = useState([]);

    // Fetch batch data from localStorage
    useEffect(() => {
        const storedBatches = JSON.parse(localStorage.getItem("batchId")) || [];
        const storedBatchNames = JSON.parse(localStorage.getItem("batchName")) || [];

        if (storedBatches && storedBatchNames) {

            setBatchList(storedBatches); // Parse JSON and set state
            setBatchNames(storedBatchNames); // Set batch Names
        }
    }, []);

    const onSubmit = async (data) => {

        try {
            const token = await getAuthToken();
            const payload = {
                ...data,
                farm: {
                    farmId: localStorage.getItem('farmId')
                },
                flock: {
                    flockId: data.batchId,
                }

            };
            delete payload.batchId;
            console.log('data---------------', payload)

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/feed-consumptions`, payload, {
                headers: {Authorization: `Bearer ${token}`},
            });

            console.log('Response from server:', response.data);
            alert(' submitted successfully!'); // Show success alert
            reset();
        } catch (error) {
            console.error('Error submitting form:', error.message);
            alert('Error submitting form. Please try again.'); // Show error alert
        }

    };

    return (
        <>
            <Container className="inventory-details-form">

            <h2 className="text-center mb-4">Feed Consumption</h2>

            <Form onSubmit={handleSubmit(onSubmit)}>
                {showDatePicker && (
                    <Form.Group controlId="dateInput" className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" placeholder="Select a date" max={today}/>
                    </Form.Group>

                )
                }
                {/* Batch Dropdown */}
                <Form.Group className="mb-4" controlId="batchId">
                    <Form.Label>Batch</Form.Label>
                    <Form.Control
                        as="select"
                        {...register("batchId", {required: "Batch selection is required"})}
                        isInvalid={!!errors.batchId}
                        defaultValue="" // Default value to show "Select a Batch" as the placeholder
                    >
                        <option value="" disabled hidden>Select a Batch</option>
                        {batchList.map((batch, index) => (
                            <option key={index} value={batch}>{batchNames[index]}</option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors.batchId?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Feed Intake Field */}
                <Form.Group className="mb-4" controlId="feedIntake">
                    <Form.Label>Feed Intake (kg)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter feed intake"
                        {...register("feedIntake", {required: "Feed Intake is required"})}
                        isInvalid={!!errors.feedIntake}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.feedIntake?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Feed Amount Field */}
                <Form.Group className="mb-4" controlId="feedAmount">
                    <Form.Label>Feed Price (₹)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter feed amount"
                        {...register("feedAmount", {required: "Feed Amount is required"})}
                        isInvalid={!!errors.feedAmount}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.feedAmount?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Submit Button */}
                <Button variant="primary" type="submit" className="w-100">
                    Submit
                </Button>
            </Form>
            </Container>
        </>
    );
}

export default FeedDetailsForm;
