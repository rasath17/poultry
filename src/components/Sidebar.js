import React, {useState} from 'react';
import {Navbar, Nav, Offcanvas, Button, Container, NavDropdown} from 'react-bootstrap';
import {auth} from "../config/firebase";
import {signOut} from 'firebase/auth';
import {useNavigate, Link} from 'react-router-dom';
import './styles/sidebar.css';
import FetchId from "./FetchId";

const PoultryThemeNavbar = () => {
    FetchId();
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const navigate = useNavigate();

    const handleShow = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                alert("Logout successfully");
                localStorage.clear();
                handleClose(); // Close Offcanvas when logged out
                navigate("/"); // Redirect to login page
            })
            .catch((error) => {
                console.error("Error signing out: ", error);
                alert("Error signing out");
            });
    };

    return (
        <>
            {/* Navbar with Poultry Theme */}
            <Navbar expand={false} variant={'light'} id={"navbarColor"} fixed="top">
                <Container>
                    {/* Navbar Brand */}
                    {/* Offcanvas Toggle */}
                    <Navbar.Toggle className={'me-auto   text-white'} aria-controls="offcanvasNavbar"
                                   onClick={handleShow}/>
                    <div className="mx-auto position-absolute start-50 translate-middle-x">

                        <Navbar.Brand
                            style={{color: '#000000', fontSize: '1.5rem', marginLeft: '5%',fontStyle:"italic"}}
                            className={'fw-bold fs-4 text-center'}
                        >
                            {/*EggFarm365*/}
                            Smart Eggfarm
                        </Navbar.Brand>

                    </div>
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="start"
                        show={showOffcanvas}
                        onHide={handleClose}
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel" style={{fontWeight: '600'}}>
                                Menu
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="d-flex flex-column">
                            <Nav className="flex-column">
                                {/* Close Offcanvas when any link is clicked */}
                                <Nav.Link as={Link} to="/dashboard" onClick={handleClose}>
                                    Home
                                </Nav.Link>
                                <Nav.Link href="/dailycollectionmenu" onClick={handleClose}>
                                    Inventory
                                </Nav.Link>
                                {/*<Nav.Link as={Link} to="/report" onClick={handleClose}>Report</Nav.Link>*/}
                                <NavDropdown title="Report" id="offcanvasNavbarDropdown">
                                    <NavDropdown.Item as={Link} to="/report/eggproduction" onClick={handleClose}>
                                        Daily Collection
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/report/mortality"
                                                      onClick={handleClose}>
                                        Mortality
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/report/damagedegg"
                                                      onClick={handleClose}>
                                        Damaged Eggs
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/report/feedintake"
                                                      onClick={handleClose}>
                                        Feed Intake
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={Link} to="/dashboard" onClick={handleClose}>
                                    Health
                                </Nav.Link>
                                <NavDropdown title="Registration" id="offcanvasNavbarDropdown">
                                    <NavDropdown.Item as={Link} to="/register/flock" onClick={handleClose}>
                                        Batch / Flock Registration
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/register/employee" onClick={handleClose}>
                                        Employee Registration

                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/register/buyer" onClick={handleClose}>
                                        Seller/ Trader Registration
                                    </NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title="Update" id="offcanvasNavbarDropdown">
                                    <NavDropdown.Item as={Link} to="/update/dailycollection" onClick={handleClose}>
                                        Daily Collection
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/update/mortality" onClick={handleClose}>
                                        Mortality
                                    </NavDropdown.Item>
                                </NavDropdown>

                                <Nav.Link as={Link} to="/dailyeggrate" onClick={handleClose}>
                                    Daily Egg Rate
                                </Nav.Link>
                                <Nav.Link href="/dailycollection-missing" onClick={handleClose}>
                                   Add Missing data
                                </Nav.Link>
                                {/*<Nav.Link as={Link} to="/farm" onClick={handleClose}>*/}
                                {/*    Farm*/}
                                {/*</Nav.Link>*/}
                            </Nav>

                            {/* Logout Button */}
                            <Button className="mt-auto bg-danger border-danger" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
};

export default PoultryThemeNavbar;
