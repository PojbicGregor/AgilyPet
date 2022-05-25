import React from 'react';
import Image from 'react-bootstrap/Image'

import '../css/oblikovanje.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../slike/AgilyPet_Logo.png';
import { Col, Container, Row } from 'react-bootstrap';

import psi from '../slike/dogs.jpg';
import podatki from '../slike/podatki.png';
import ilustr from '../slike/ilustr.jpg';

const Vsebina: React.FC = () => {

    return (
        <>
            <Container className='margin_top bg-orange_vsebina slika'>
                <Row className='padding_top padding_bottom'>
                    <Col>
                        <Image src={psi} className="slika" fluid />
                    </Col>
                    <Col>
                        <h1>Ustvarite prilagojen agility course za vašega psa.</h1>
                        <div>
                            <p>
                                Course lahko prilagodite potrebam vašega psa. Graditelj coursov je narejen z namenom rekreacije, 
                                rehabilitacije in izboljšanje zdravja psa.
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <hr></hr>
                </Row>
                <Row className='padding_bottom'>
                    <Col>
                        <h1>
                            Vnesite psa in pridobite njemu prilagojene podatke.
                        </h1>
                        <div>
                            <p>
                                Po vnosu podatkov psa vam bo AgilyPet ponudil prilagojene podatke glede na pasmo vašega psa.
                                Podatki bodo vsebovali karakter psa, zaželjeno težo, višuno in pričakovano življenjsko dobo.
                            </p>
                        </div>
                    </Col>
                    <Col>
                        <Image src={podatki} className="slika" fluid />
                    </Col>
                </Row>
                <Row>
                    <hr></hr>
                </Row>
                <Row className='padding_bottom'>
                    <Col>
                        <h1>
                            Brskajte po najboljših agility coursih. 
                        </h1>
                        <div>
                            <p>
                                AgilyPet vam bo ponudil najboljše agility course, ki so vam na voljo. Na posameznega kreatorja 
                                coursa se lahko tudi naročite in boste obveščeni, vsakič, ko zgradi nov agility course. Po agility 
                                coursih lahko tudi brskate in prilagodite iskanje glede na željene zahteve in na svojega psa.
                            </p>
                        </div>
                    </Col>
                    <Col>
                        <Image src={ilustr} className="slika" fluid />
                    </Col>
                </Row>
            </Container>


        </>
    );
}

export default Vsebina;