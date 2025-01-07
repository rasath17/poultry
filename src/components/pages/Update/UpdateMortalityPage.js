import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { getAuthToken } from "../../auth/getAuthToken";

function MortalityUpdatePage() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [editData, setEditData] = useState(null);

    // Fetch mortality data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getAuthToken();
                const farmId = localStorage.getItem('farmId'); // Assuming farm ID is stored in localStorage
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/mortalities/farm/${farmId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setData(response.data);
                console.log(response.data)

            } catch (error) {
                console.error("Error fetching mortality data:", error);
            }
        };

        fetchData();
    }, []);

    // Open modal for editing a record
    const handleShow = (item) => {
        setEditData(item);
        setShow(true);
    };

    // Close modal
    const handleClose = () => setShow(false);

    // Save changes to the server
    const handleSave = async () => {
        try {
            const token = await getAuthToken();
            await axios.patch(
                `${process.env.REACT_APP_API_URL}/api/mortalities/${editData.mortality_id}`,
                {
                    causeOfDeath: editData.cause_of_death,
                    numberOfBirds: editData.number_of_birds,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // Update local state
            setData(data.map(item => (item.mortality_id === editData.mortality_id ? editData : item)));
            handleClose();
        } catch (error) {
            console.error("Error updating mortality record:", error);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="container mt-5 pt-4">
            <h2 className="text-center">Mortality Data</h2>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Flock</th>
                    <th>Number of Birds</th>
                    <th>Cause of Death</th>

                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.map(item => (
                    <tr key={item.mortality_id}>
                        <td>{item.date}</td>
                        <td>{item.flockName}</td>
                        <td>{item.number_of_birds}</td>
                        <td>{item.cause_of_death}</td>
                        <td>
                            <Button variant="warning" onClick={() => handleShow(item)}>Edit</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Edit Modal */}
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Mortality Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editData && (
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formCauseOfDeath">
                                        <Form.Label>Cause of Death</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="cause_of_death"
                                            value={editData.cause_of_death}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formNumberOfBirds">
                                        <Form.Label>Number of Birds</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="number_of_birds"
                                            value={editData.number_of_birds}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MortalityUpdatePage;
