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
        starost: 0,
        manjkaEna: false,
        manjkataDve: false,
        sklepi: false
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        let data = {
            ime: lastnosti.ime,
            pasma: lastnosti.pasma,
            visina: lastnosti.visina,
            starost: lastnosti.starost,
            manjkaEna: lastnosti.manjkaEna,
            manjkataDve: lastnosti.manjkataDve,
            sklepi: lastnosti.sklepi,
            token: localStorage.getItem("token")
        }

        fetch("http://localhost:3001/api/dodaj_psa", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                console.log(response);
                response.json().then(data => {
                    console.log(localStorage.getItem("token"));
                    localStorage.getItem("token");              //???
                })
            }
        })

        navigate("/");
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLastnosti({ ...lastnosti, [e.target.name]: e.target.value });
    }

    return(<div>
        <h2 className='podnaslov'>Vnesite podatke o psu:</h2>
        <form id="form" onSubmit = {handleSubmit}>
            
            <label>Ime:</label>
            <input name="ime" type="text" value={lastnosti.ime} onChange={handleChange}/>
            <br />
            <label>Pasma:</label>
            <input name="pasma" type="text" value={lastnosti.pasma} onChange={handleChange}/>
            <br />
            <label>Visina:</label>
            <input name="visina" type="number" value={lastnosti.visina} onChange={handleChange}/>
            <br />
            <label>Starost:</label>
            <input name="starost" type="number" value={lastnosti.starost} onChange={handleChange}/>
            <br />
            <label>Missing one limb?</label>
            <input name="manjkaEna" type="checkbox" value = "true" onChange={handleChange}/> Yes
            <br />
            <label>Missing two limbs?</label>
            <input name="manjkataDve" type="checkbox" value = "true" onChange={handleChange}/> Yes
            <br />
            <label>Joint related problems?</label>
            <input name="sklepi" type="checkbox" value = "true" onChange={handleChange}/> Yes
            <br />
            <input type="submit" value="Dodaj"/>
        </form>
        <button>{<Link className="domov" to={`/`}>Domov</Link>}</button>
      <h1 className='proba'>koledar za course</h1>
        <iframe className='koledar' src="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23039BE5&ctz=Europe%2FBelgrade&src=YmxhemhlbWFuZXZyaXNAZ21haWwuY29t&src=ZW4uc2xvdmVuaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%230B8043" ></iframe>
    {/*<div>

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

    <Noga></Noga>*/}

    </div>);
}

export default DodajPsa;