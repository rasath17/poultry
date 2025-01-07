import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { getAuthToken } from "../../auth/getAuthToken";
import axios from "axios";
import "../../styles/InventoryDetailsForm.css"; // Import the scoped CSS file

function MortalityDetailsForm({ showDatePicker }) {
    const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [batchList, setBatchList] = useState([]);
    const [batchNames, setBatchNames] = useState([]);

    // Fetch batch data from localStorage
    useEffect(() => {
        const storedBatches = JSON.parse(localStorage.getItem("batchId")) || [];
        const storedBatchNames = JSON.parse(localStorage.getItem("batchName")) || [];

        if (storedBatches && storedBatchNames) {
            setBatchList(storedBatches);
            setBatchNames(storedBatchNames);
        }
    }, []);

    const onSubmit = async (data) => {
        try {
            const token = await getAuthToken();
            const payload = {
                ...data,
                farm: { farmId: localStorage.getItem("farmId") },
                flock: { flockId: data.batchId },
            };
            delete payload.batchId;

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/mortalities`,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Response from server:", response.data);
            alert("Submitted successfully!");
            reset();
        } catch (error) {
            console.error("Error submitting form:", error.message);
            alert("Error submitting form. Please try again.");
        }
    };

    return (
        <Container className="inventory-details-form">
            <h2 className="text-center mb-4">Add Mortality</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Date Picker */}
                {showDatePicker && (
                    <Form.Group controlId="dateInput" className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Select a date"
                            {...register("date", { required: "Date is required" })}
                            isInvalid={!!errors.date}
                            max={today}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.date?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                )}

                {/* Batch Dropdown */}
                <Form.Group className="mb-4" controlId="batchId">
                    <Form.Label>Batch</Form.Label>
                    <Form.Control
                        as="select"
                        {...register("batchId", { required: "Batch selection is required" })}
                        isInvalid={!!errors.batchId}
                        defaultValue=""
                    >
                        <option value="" disabled hidden>
                            Select a Batch
                        </option>
                        {batchList.map((batch, index) => (
                            <option key={index} value={batch}>
                                {batchNames[index]}
                            </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors.batchId?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Number of Birds */}
                <Form.Group className="mb-4" controlId="numberOfBirds">
                    <Form.Label>Number of Birds</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter number of birds"
                        {...register("numberOfBirds", {
                            required: "Number of Birds is required",
                        })}
                        isInvalid={!!errors.numberOfBirds}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.numberOfBirds?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Cause of Death */}
                <Form.Group className="mb-4" controlId="causeOfDeath">
                    <Form.Label>Cause of Death</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter cause of death"
                        {...register("causeOfDeath", {
                            required: "Cause of Death is required",
                        })}
                        isInvalid={!!errors.causeOfDeath}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.causeOfDeath?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Submit Button */}
                <Button variant="primary" type="submit" className="w-100">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default MortalityDetailsForm;
