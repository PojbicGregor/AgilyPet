import React, { ChangeEvent, useState } from 'react';
import { FormEvent } from 'react';

import Navigacija from './Navigacija';
import Noga from './Noga';

import { Uporabnik } from '../razredi/Uporabnik';
import '../css/oblikovanje.css';

import { Col, Container, Form, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { stringify } from 'querystring';

const Facts: React.FC = () => {

    const [lastnosti, setLastnosti] = React.useState({
        name: "",
        weight: "",
        height: "",
        bred_for: "",
        life_span: "",
        temperament: ""
    });

    const handleSubmit = (e: FormEvent) => {
        console.log("submit");
        e.preventDefault();

        fetch("https://api.thedogapi.com/v1/breeds/search?q=german she", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '06ff55ca-df70-4318-9705-9a778bea3c83' //API key: 06ff55ca-df70-4318-9705-9a778bea3c83
            }
        }).then(response => {
            if (response.status === 200) {
                console.log(response);
                response.json().then(data => {
                    console.log(data[0]);
                    setLastnosti({
                        name: data[0].name,
                        weight: data[0].weight.metric,
                        height: data[0].height.metric,
                        bred_for: data[0].bred_for,
                        life_span: data[0].life_span,
                        temperament: data[0].temperament
                    });
                })
            }
        })
    }

    return (
        <>


            <Container className='margin_reg'>
                <Row>
                    <Col></Col>
                    <Col xs={6} className="">
                        <Form onSubmit={handleSubmit}>

                            <Button variant="primary" type="submit">
                                Select
                            </Button>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col className='podatki' xs={6}>
                        <div className=''>
                        <Row>
                            <Col>
                                <h1>
                                    Dog facts:
                                </h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2>Breed:</h2>
                            </Col>
                            <Col className='text-justify'>
                                <p className='text-justify mt-2'>{lastnosti.name}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2>Weight:</h2>
                            </Col>
                            <Col className='text-justify'>
                                <p className='text-justify mt-2'>{lastnosti.weight} kg</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2>Height:</h2>
                            </Col>
                            <Col className='text-justify'>
                                <p className='text-justify mt-2'>{lastnosti.height} cm</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2>Bread for:</h2>
                            </Col>
                            <Col className='text-justify'>
                                <p className='text-justify mt-2'>{lastnosti.bred_for}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2>Life span:</h2>
                            </Col>
                            <Col className='text-justify'>
                                <p className='text-justify mt-2'>{lastnosti.life_span}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2>Temperament:</h2>
                            </Col>
                            <Col className='text-justify'>
                                <p className='text-justify mt-2'>{lastnosti.temperament}</p>
                            </Col>
                        </Row>
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </>
    );
}

export default Facts;