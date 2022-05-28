import React from 'react';
import { ChangeEvent } from 'react';
import { FormEvent } from 'react';
import { Pes } from './razredi/Pes';
import { Link } from 'react-router-dom';
//import Menu from './Menu';
import './koledar.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import UserNav from './komponente/UserNav';
import Navigacija from './komponente/Navigacija';
import Noga from './komponente/Noga';
import { useNavigate } from 'react-router';

interface DodajPsaProps {
    onAdd: (pes: Pes) => any;
}

let DodajPsa: React.FC<DodajPsaProps> =  (props: DodajPsaProps) => {

    const navigate = useNavigate();

    let prijavljen;

    if (localStorage.getItem("token") != null) {
        prijavljen = true;
    }else{
        prijavljen = false;
    }

    const [lastnosti, setLastnosti] = React.useState({
        ime: "",
        pasma: "",
        visina: 0,
        starost: 0
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        let data = {
            ime: lastnosti.ime,
            pasma: lastnosti.pasma,
            visina: lastnosti.visina,
            starost: lastnosti.starost
        }

        fetch("http://localhost:3001/dodan_pes", { //bo poterbno spremeniti klic
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        navigate("/");
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLastnosti({ ...lastnosti, [e.target.name]: e.target.value });
    }

    return (<div>

        {prijavljen ? <UserNav /> : <Navigacija />}

        <Container className='margin_reg'>
            <Row>
                <Col></Col>
                <Col xs={6} >
                    <h1>
                        Vnesite podatke o vašem psu:
                    </h1>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col xs={6} className="border_color">
                    <Form id='form' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Ime</Form.Label>
                            <Form.Control name="ime" type="text" placeholder="Vnesite ime" value={lastnosti.ime} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Pasma</Form.Label>
                            <Form.Control name="pasma" type="text" placeholder="Vnesite pasmo" value={lastnosti.pasma} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Višina</Form.Label>
                            <Form.Control name="visina" type="number" value={lastnosti.visina} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Starost</Form.Label>
                            <Form.Control name="starost" type="number" value={lastnosti.starost} onChange={handleChange} />
                        </Form.Group>

                        <Row>
                            <Col className='text-center'>
                                <Button variant="primary" type="submit">
                                    Dodaj
                                </Button>
                            </Col>
                        </Row>
                        
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>

    <Noga></Noga>

    </div>);
}

export default DodajPsa;