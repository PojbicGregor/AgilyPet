import React from 'react';
import { ChangeEvent } from 'react';
import { FormEvent } from 'react';
import { Course } from './razredi/Course';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import UserNav from './komponente/UserNav';
import Navigacija from './komponente/Navigacija';
import Noga from './komponente/Noga';
//import Menu from './Menu';

interface DodajCourseProps {
    onAdd: (course: Course) => any;
}

let DodajCourse: React.FC<DodajCourseProps> = (props: DodajCourseProps) => {

    const navigate = useNavigate();

    const [lastnosti, setLastnosti] = React.useState({
        naziv: "",
        slika: 0,
        opis: "",
        velikostiString: "",
        zdrastvenoStanjeString: ""
    });


    let prijavljen;

    if (localStorage.getItem("token") != null) {
        prijavljen = true;
    } else {
        prijavljen = false;
    }



    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        var velikostiArray = Array<number>();
        var zdrastvenoStanjeArray = Array<string>();

        zdrastvenoStanjeArray = lastnosti.zdrastvenoStanjeString.split(" ");

        var numString = "";
        for (let i = 0; i < lastnosti.velikostiString.length; i++) {
            if (lastnosti.velikostiString[i] != ' ') {
                numString += lastnosti.velikostiString[i];
            } else {
                var myNum: number = +numString;
                velikostiArray.push(myNum);
                numString = "";
            }
        }
        let myNum1: number = +numString;
        velikostiArray.push(myNum1);
        numString = "";


        let data = {
            naziv: lastnosti.naziv,
            slika: lastnosti.slika,
            opis: lastnosti.opis,
            velikost: velikostiArray,
            zdrastvenoStanje: zdrastvenoStanjeArray
        }

        fetch("http://localhost:3001/courses/dodan_course", {
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
                        Vnesite podatke o course:
                    </h1>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col xs={6} className="border_color">
                    <Form id='form' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Naziv</Form.Label>
                            <Form.Control name="naziv" type="text" placeholder="Vnesite naziv" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Slika</Form.Label>
                            <Form.Control name="slika" type="file" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Opis</Form.Label>
                            <Form.Control name="opis" type="text" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Velikost</Form.Label>
                            <Form.Control name="velikostiString" type="text" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Zdrastveno stanje</Form.Label>
                            <Form.Control name="zdrastvenoStanjeString" type="text" onChange={handleChange} />
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

export default DodajCourse;