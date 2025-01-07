import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Table, Button, Modal, Form, Row, Col} from 'react-bootstrap';
import {getAuthToken} from "../../auth/getAuthToken";

function UpdateDailyCollection() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [editData, setEditData] = useState(null);

    // Fetch data using Axios
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getAuthToken(); // Assume this fetches the token
                const farmId = localStorage.getItem('farmId');
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/daily_production/farm/${farmId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setData(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    // Open modal with selected data
    const handleShow = (item) => {
        setEditData(item);
        setShow(true);
    };

    // Close modal
    const handleClose = () => setShow(false);

    // Save changes to data
    const handleSave = async () => {
        try {
            const token = await getAuthToken();
            // Send updated data to the server
            await axios.patch(
                `${process.env.REACT_APP_API_URL}/api/daily_production/${editData.production_id}`,
                {
                    totalEggs: editData.total_eggs,
                    damagedEggs: editData.damaged_eggs,
                    productionDate:data.production_date
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // Update local state
            setData(data.map(item => (item.production_id === editData.production_id ? editData : item)));
            handleClose();
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };
    // Handle form changes
    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="container mt-5 pt-4">
            <h2 className="text-center">Production Data</h2>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Batch Name</th>
                    <th>Date</th>
                    <th>Total Eggs</th>
                    <th>Damaged Eggs</th>
                    <th>Age (weeks)</th>
                    <th>Live Stock</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.map(item => (
                    <tr key={item.productionId}>
                        <td>{item.flockName}</td>
                        <td>{item.production_date}</td>
                        <td>{item.total_eggs}</td>
                        <td>{item.damaged_eggs}</td>
                        <td>{item.chicken_age}</td>
                        <td>{item.total_live_strock}</td>
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
                    <Modal.Title>Edit Production Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editData && (
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formTotalEggs">
                                        <Form.Label>Total Eggs</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="total_eggs"
                                            value={editData.total_eggs}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formDamagedEggs">
                                        <Form.Label>Damaged Eggs</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="damaged_eggs"
                                            value={editData.damaged_eggs}
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


export default UpdateDailyCollection;
