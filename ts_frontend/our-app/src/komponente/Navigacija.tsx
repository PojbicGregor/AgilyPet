import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

import '../css/oblikovanje.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../slike/AgilyPet_Logo.png';

const Navigacija: React.FC = () => {

    return (
        <>
            <Navbar className='bg-orange pisava-white'>
                <Container>
                    <Navbar.Brand href="#home">
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
                            <Nav.Link className="mouse_over" href="/"> <div className="pisava-white">Domov</div></Nav.Link>
                            <Nav.Link className="mouse_over" href="#link"><div className="pisava-white">Seznam coursov</div></Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                                <Nav.Link className="mouse_over" href="/registracija"><div className="pisava-white">Registracija</div></Nav.Link>
                                <Nav.Link className="mouse_over" href="#link"><div className="pisava-white">Prijava</div></Nav.Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}

export default Navigacija;