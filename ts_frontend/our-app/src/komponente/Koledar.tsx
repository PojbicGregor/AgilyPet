import React from 'react';
import Image from 'react-bootstrap/Image'

import '../css/oblikovanje.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../slike/AgilyPet_Logo.png';
import { Container, Row, Col } from 'react-bootstrap';

const Koledar: React.FC = () => {

    return (
        <>
        <Container>
            <Row className='padding_top'>
                <Col>
                </Col>
                <Col>
                    <iframe className='koledar' src="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23039BE5&ctz=Europe%2FBelgrade&src=YmxhemhlbWFuZXZyaXNAZ21haWwuY29t&src=ZW4uc2xvdmVuaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%230B8043" ></iframe>
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>

        </>
    );
}

export default Koledar;