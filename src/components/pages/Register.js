import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function Register(props) {
    return (
        <Container className="mt-5 pt-5 ">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={'/dashboard'}>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Registration</Breadcrumb.Item>
            </Breadcrumb>
            <Row className="g-5 g-md-0 d-flex justify-content-around">


                <Col xs={8} md={3} className=" mx-md-1">
                    <Link to={'/register/flock'} style={{textDecoration: 'none'}}>
                        <div className="image-container-dashboard px-1">
                            <div className="image-box-dashboard">
                                <img src="/images/register/batchRegister.jpg" alt="Registration"/>
                            </div>
                            <div className="image-caption-dashboard">Batch Register</div>
                        </div>
                    </Link>
                </Col>
                <Col xs={8} md={3} className=" mx-md-1">

                    <Link to={'/register/buyer'} style={{textDecoration: 'none'}}>
                        <div className="image-container-dashboard px-1">
                            <div className="image-box-dashboard">
                                <img src="/images/register/buyerRegister.jpg" alt="Feed"/>
                            </div>
                            <div className="image-caption-dashboard">Buyer Register</div>
                        </div>
                    </Link>
                </Col>
            </Row>
            <Row className="mt-3 mt-md-0 g-4 g-md-0 d-flex justify-content-around">

                <Col xs={8} md={3}>
                    <Link to={'/register/employee'} style={{textDecoration: 'none'}}>
                        <div className="image-container-dashboard px-1">
                            <div className="image-box-dashboard ">
                                <img src="/images/register/employeeRegister.jpg" alt="Reports"/>
                            </div>
                            <div className="image-caption-dashboard">Employee Register</div>
                        </div>
                    </Link>
                </Col>

            </Row>
        </Container>

    );
}

export default Register;
