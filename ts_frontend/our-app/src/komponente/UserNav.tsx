import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

import '../css/oblikovanje.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../slike/AgilyPet_Logo.png';

const UserNav: React.FC = () => {

    const handleClick = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

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
                            <Nav.Link className="mouse_over" href="#link"><div className="pisava-white">Vsi coursi</div></Nav.Link>
                            <Nav.Link className="mouse_over" href="#link"><div className="pisava-white">Moji coursi</div></Nav.Link>
                            <Nav.Link className="mouse_over" href="#link"><div className="pisava-white">Kreiraj cours</div></Nav.Link>
                            <Nav.Link className="mouse_over" href="#link"><div className="pisava-white">Dodaj psa</div></Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="danger" onClick={handleClick}>Odjava</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}

export default UserNav;