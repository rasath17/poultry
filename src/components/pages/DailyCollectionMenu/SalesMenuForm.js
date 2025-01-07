import React, {useEffect, useState} from "react";
import {Form, Button, Container} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {getAuthToken} from "../../auth/getAuthToken";
import axios from "axios";
import "../../styles/InventoryDetailsForm.css"; // Import the scoped CSS file

function SalesDetailsForm(props) {
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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/seller-details`, payload, {
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

                <h2 className="text-center mb-4">Add Sales </h2>

                <Form onSubmit={handleSubmit(onSubmit)}>

                    {/* Batch Dropdown */}
                    <Form.Group className="mb-4" controlId="batchId">

                        {showDatePicker && (
                            <Form.Group controlId="dateInput" className="mb-3">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" placeholder="Select a date" max={today}/>
                            </Form.Group>

                        )
                        }
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
                    {/* Seller Name Field */}
                    <Form.Group className="mb-4" controlId="sellerName">
                        <Form.Label>Seller Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter seller name"
                            {...register("sellername", {required: "Seller Name is required"})}
                            isInvalid={!!errors.sellername}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.sellername?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Number of Trays Field */}
                    <Form.Group className="mb-4" controlId="numberOfTrays">
                        <Form.Label>Number of Trays</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter number of trays"
                            {...register("tray", {required: "Number of Trays is required"})}
                            isInvalid={!!errors.tray}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.tray?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Sales Price Field */}
                    <Form.Group className="mb-4" controlId="salesPrice">
                        <Form.Label>Sales Price (₦)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter sales price"
                            {...register("salcePrice", {required: "Sales Price is required"})}
                            isInvalid={!!errors.salcePrice}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.salcePrice?.message}
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

export default SalesDetailsForm;
