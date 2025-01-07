import React, {useState, useEffect} from "react";
import {Container, Form, Button, Modal, ButtonGroup} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import FeedDetailsForm from "./FeedDetailsForm"; // Import the new component
import SalesDetailsForm from "./SalesMenuForm";
import MortalityDetailsForm from "./MortalityDetailsForm";
import FetchId from '../../FetchId';
import {getAuthToken} from '../../auth/getAuthToken';
import axios from 'axios';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "../../styles/InventoryDetailsForm.css"; // Import the scoped CSS file

function DailyCollectionForm(props) {
    FetchId()
    const {showDate} = props;

    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    const [selectedForm, setSelectedForm] = useState("mortalityDetails"); // Track selected form

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const navigate = useNavigate();
    const [showDatePicker, setShowDatePicker] = useState(false);

    // State to store batch list from localStorage
    const [batchList, setBatchList] = useState([]);
    const [batchNames, setBatchNames] = useState([]);

    // Fetch batch data from localStorage
    useEffect(() => {
        const storedBatches = JSON.parse(localStorage.getItem("batchId")) || [];
        const storedBatchNames = JSON.parse(localStorage.getItem("batchName")) || [];

        setShowDatePicker(showDate)
        if (storedBatches && storedBatchNames) {

            setBatchList(storedBatches); // Parse JSON and set state
            setBatchNames(storedBatchNames); // Set batch Names

        }
    }, []);

    const onSubmit = async (data) => {
        const urls = process.env.REACT_APP_API_URL;
        console.log("Heloo--------------", urls);
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

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/daily_production`, payload, {
                headers: {Authorization: `Bearer ${token}`},
            });
            console.log('Response from server:', response.data);
            reset();  // Reset form fields after successful submission
            alert(' submitted successfully!'); // Show success alert
        } catch (error) {
            console.error('Error submitting form:', error.message);
            alert('Error submitting form. Please try again.'); // Show error alert
        }

    };
    const renderForm = () => {
        switch (selectedForm) {
            case "dailyCollection":
                return (
                    <>
                        <Container className="inventory-details-form">

                            <h2 className="text-center mb-4">Daily Collection{showDate} </h2>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                {showDatePicker && (
                                    <Form.Group controlId="dateInput" className="mb-3">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control type="date" placeholder="Select a date"
                                                      {...register("productionDate", {required: "Total Eggs is required"})}
                                                      isInvalid={!!errors.productionDate}
                                                      max={today}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.productionDate?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                )
                                }
                                {/* Batch Dropdown */}
                                <Form.Group className="mb-4" controlId="batchId">
                                    <Form.Label> Batch No / Name</Form.Label>
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

                                {/* Other form fields */}
                                <Form.Group className="mb-4" controlId="totalEggs">
                                    <Form.Label> Total Eggs / Tray</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter total eggs"
                                        {...register("totalEggs", {required: "Total Eggs is required"})}
                                        isInvalid={!!errors.totalEggs}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.totalEggs?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="damagedEggs">
                                    <Form.Label> Damaged Eggs / Tray </Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter damaged eggs"
                                        {...register("damagedEggs", {required: "Damaged Eggs is required"})}
                                        isInvalid={!!errors.damagedEggs}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.damagedEggs?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>


                                <Button variant="primary" type="submit" className="w-100 my-2 ">
                                    Submit
                                </Button>
                            </Form>
                        </Container>
                    </>

                );
            case "feedDetails":
                return <FeedDetailsForm showDatePicker={showDatePicker}/>;
            case "salesDetails":
                return <SalesDetailsForm showDatePicker={showDatePicker}/>;
            case "mortalityDetails":
                return <MortalityDetailsForm showDatePicker={showDatePicker}/>;
            default:
                return null;
        }
    }
    return (
        <div className={'mt-5 pt-5 h-100 '}>
            <div className="mx-2 ms-md-5 mb-5 mb-md-0">
                <div className="row">
                    <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-start">
                        {/* Breadcrumb */}
                        <div className="col-12 col-md-3 ">
                            <Breadcrumb>
                                <Breadcrumb.Item>
                                    <Link to={'/dashboard'}>Home</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>{showDate ? "Missing Data" : "Daily Data"}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                        {/* Button Group */}
                        <div className="col-12 col-md-5">
                            <ButtonGroup aria-label="Form Selection" className="shadow-sm w-100">
                                <Button
                                    variant={selectedForm === "mortalityDetails" ? "secondary" : "outline-secondary"}
                                    onClick={() => setSelectedForm("mortalityDetails")}
                                    className="w-100"
                                >
                                    Mortality
                                </Button>
                                <Button
                                    variant={selectedForm === "dailyCollection" ? "secondary" : "outline-secondary"}
                                    onClick={() => setSelectedForm("dailyCollection")}
                                    className="w-100"
                                >
                                    Collection
                                </Button>
                                <Button
                                    variant={selectedForm === "feedDetails" ? "secondary" : "outline-secondary"}
                                    onClick={() => setSelectedForm("feedDetails")}
                                    className="w-100"
                                >
                                    Feed
                                </Button>
                                <Button
                                    variant={selectedForm === "salesDetails" ? "secondary" : "outline-secondary"}
                                    onClick={() => setSelectedForm("salesDetails")}
                                    className="w-100"
                                >
                                    Sales
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
            </div>

            <Container fluid className="d-flex justify-content-center align-items-center h-100  p-md-5">
                <div className="w-100 px-3 rounded  py-3 mb-4 " style={{maxWidth: "600px"}}>
                    <div>{renderForm()}</div>
                </div>
            </Container>


        </div>
    )
        ;
}

export default DailyCollectionForm;
