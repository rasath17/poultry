import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import './styles/dashboard.css'

function Dashboard() {
    return (
        <Container className="mt-5 pt-5 ">

            <Row className="g-5 g-md-0 d-flex justify-content-around">

                <Col xs={6} md={3}>
                    <Link to={'/dailycollectionmenu'} style={{textDecoration: 'none'}}>
                        <div className="image-container-dashboard">
                            <div className="image-box-dashboard">
                                <img src="/images/dasboard/production.jpg" alt="Reports"/>
                            </div>
                            <div className="image-caption-dashboard">Inventory</div>
                        </div>
                    </Link>
                </Col>
                <Col xs={6} md={3}>
                    <Link to={'/report'} style={{textDecoration: 'none'}}>
                        <div className="image-container-dashboard">
                            <div className="image-box-dashboard">
                                <img src="/images/dasboard/report.jpg" alt="Reports"/>
                            </div>
                            <div className="image-caption-dashboard">Report</div>
                        </div>
                    </Link>
                </Col>


            </Row>
            <Row className="mt-3 mt-md-0 g-4 g-md-0 d-flex justify-content-around">
                <Col xs={6} md={3} className=" mx-md-1">

                    <Link to={'/report'} style={{textDecoration: 'none'}}>
                        <div className="image-container-dashboard">
                            <div className="image-box-dashboard">
                                <img src="/images/dasboard/vaccine.jpg" alt="Feed"/>
                            </div>
                            <div className="image-caption-dashboard">Health</div>
                        </div>
                    </Link>
                </Col>

                <Col xs={6} md={3} className=" mx-md-1">
                    <Link to={'/register'} style={{textDecoration: 'none'}}>
                        <div className="image-container-dashboard">
                            <div className="image-box-dashboard">
                                <img src="/images/dasboard/registarion.jpg" alt="Registration"/>
                            </div>
                            <div className="image-caption-dashboard">Registration</div>
                        </div>
                    </Link>
                </Col>
            </Row>
        </Container>
);
}

export default Dashboard;
