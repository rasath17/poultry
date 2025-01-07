import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import "../styles/report.css";
import {Link} from "react-router-dom";
import {Breadcrumb} from "react-bootstrap";

function ImageGrid() {
    return (
        <Container className="mt-5 pt-5">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={'/dashboard'}>Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item active>Report</Breadcrumb.Item>
            </Breadcrumb>
            <Row className="g-3">
                <Col xs={6} md={4} lg={4} className="order-md-1">
                    <Link to={'/report/eggproduction'} style={{textDecoration: 'none'}}>
                        <div className="image-container">
                            <div className="image-box">
                                <img src="/images/report/eggproduction_processed.jpg" alt="Egg Production"/>
                            </div>
                            <div className="image-caption">Egg Production</div>
                        </div>
                    </Link>
                </Col>

                <Col xs={6} md={4} lg={4} className="order-md-4">
                    <Link to={'/report/damagedegg'} style={{textDecoration: 'none'}}>

                        <div className="image-container">
                            <div className="image-box">
                                <img src="/images/report/damagedegg.jpg" alt="Damage Report"/>
                            </div>
                            <div className="image-caption">Damage Egg</div>
                        </div>
                    </Link>
                </Col>
                <Col xs={6} md={4} lg={4} className="order-md-5">
                    <Link to={'/report/feedintake'} style={{textDecoration: 'none'}}>

                        <div className="image-container">
                            <div className="image-box">
                                <img src="/images/report/feedintake.jpg" className={'p-3 bg-white'} alt="Feed Intake"/>
                            </div>
                            <div className="image-caption">Feed Intake</div>
                        </div>
                    </Link>
                </Col>
                <Col xs={6} md={4} lg={4} className="order-md-2">
                    <Link to={'/report/mortality'} style={{textDecoration: 'none'}}>
                        <div className="image-container">
                            <div className="image-box">
                                <img src="/images/report/mortality_chiken_processed.png" className={'p-2'}
                                     alt="Mortality"/>
                            </div>
                            <div className="image-caption">Mortality</div>
                        </div>
                    </Link>
                </Col>
                <Col xs={6} md={4} lg={4} className="order-md-3">
                    <div className="image-container">
                        <div className="image-box">
                            <img src="/images/report/profitloss_processed.png" alt="Profit"/>
                        </div>
                        <div className="image-caption">Profit / Loss</div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ImageGrid;
