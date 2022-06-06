import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

import '../css/oblikovanje.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../slike/AgilyPet_Logo.png';
import { useNavigate } from 'react-router';

const UserNav: React.FC = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.removeItem("token");
        navigate("/");
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    return (
        <>
            <Navbar expand="lg" className='bg-orange pisava-white'>
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={logo}
                            width="200"
                            height="60"
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto pisava-white">
                            <Nav.Link className="mouse_over" href="/"> <div className="pisava-white">Home</div></Nav.Link>
                            <Nav.Link className="mouse_over" href="/seznamCourse"><div className="pisava-white">All Courses</div></Nav.Link>
                            <Nav.Link className="mouse_over" href="/mojiCoursi"><div className="pisava-white">My Courses</div></Nav.Link>
                            <Nav.Link className="mouse_over" href="/dodajCourse"><div className="pisava-white">Create a Course</div></Nav.Link>
                            <Nav.Link className="mouse_over" href="/dodajPsa"><div className="pisava-white">Add Dogs</div></Nav.Link>
                            <Nav.Link className="mouse_over" href="/vseDogodkev"><div className="pisava-white">Events</div></Nav.Link>
                            <Nav.Link className="mouse_over" href="/dodajEvent"><div className="pisava-white">Add Events</div></Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="danger" onClick={handleClick}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}

export default UserNav;