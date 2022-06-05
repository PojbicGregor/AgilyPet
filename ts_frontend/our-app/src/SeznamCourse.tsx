import React from 'react';
import { Col, Row, Card, Container, Badge, Form, Button } from 'react-bootstrap';
import { Course } from './razredi/Course';
import Velikost from './Velikost';
import ZdrastvenoStanje from './ZdrastvenoStanje';

const SeznamCourse: React.FC = () => {

    const [elements, setElements] = React.useState<Course[]>();
    const [elements2, setElements2] = React.useState<Course[]>();



    React.useEffect(function () {
        const getCourses = async function () {
            const res = await fetch("http://localhost:3001/course");
            const data = await res.json();
            setElements(data); // 'reverse()', zato da so na vrhu prikazani najnovejši coursi
            setElements2(data.reverse());
            console.log(data)
        }
        getCourses();
    }, [])

    const handleChangeOne = (e: React.ChangeEvent<HTMLInputElement>) => {
        const len = elements2?.length ?? 0;
        const array = elements2 ?? [];
        const array2: Course[] = [];
        for (let index = 0; index < len; index++) {
            const ena = array[index].manjkaEna ?? false;
            const dva = array[index].manjkataDve ?? false;
            const sklep = array[index].sklepi ?? false;
            if (ena) {
                array2.push(array[index]);
            }
        }
        console.log(array2)
        setElements(array2);
    }

    const handleChangeTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const len = elements2?.length ?? 0;
        const array = elements2 ?? [];
        const array2: Course[] = [];
        for (let index = 0; index < len; index++) {
            const ena = array[index].manjkaEna ?? false;
            const dva = array[index].manjkataDve ?? false;
            const sklep = array[index].sklepi ?? false;
            if (dva) {
                array2.push(array[index]);
            }
        }
        console.log(array2)
        setElements(array2);
    }

    const handleChangeJoint = (e: React.ChangeEvent<HTMLInputElement>) => {
        const len = elements2?.length ?? 0;
        const array = elements2 ?? [];
        const array2: Course[] = [];
        for (let index = 0; index < len; index++) {
            const ena = array[index].manjkaEna ?? false;
            const dva = array[index].manjkataDve ?? false;
            const sklep = array[index].sklepi ?? false;
            if (sklep) {
                array2.push(array[index]);
            }
        }
        console.log(array2)
        setElements(array2);
    }


    //DODAJ IZPISE ZA BOOLEAN VREDNOSTI
    return (<>
        <Container className='margin_reg'>
            <Row>
                <Form>
                <Form.Group className="mb-3">
                            <Form.Label>Missing one limb?</Form.Label>
                            <input name="manjkaEna" type="checkbox" value="true" onChange={handleChangeOne} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Missing two limbs?</Form.Label>
                            <input name="manjkataDve" type="checkbox" value="true" onChange={handleChangeTwo} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Joint related problems?</Form.Label>
                            <input name="sklepi" type="checkbox" value="true" onChange={handleChangeJoint} />
                        </Form.Group>
                </Form>
                <Button></Button>
            </Row>
            <Row xs={1} md={3} className="g-4">
                {elements?.map(course => (
                    <Col>
                        <Card border="warning" className='border_orange'>
                            <div className='border_orange'>
                            <Card.Header className='img_min'>
                            <div className='center'>
                            <Card.Img variant="top" style={{ maxWidth: "260px" }} src={'../slike/courseImages/' + course.slika} />
                            </div>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title><h2>{course.naziv}</h2></Card.Title>
                                <Card.Subtitle>
                                    <span>{course.opis}</span>
                                </Card.Subtitle>
                                <Card.Text>
                                    {(JSON.stringify(course.manjkaEna) === 'true' || JSON.stringify(course.manjkataDve) === 'true' || JSON.stringify(course.sklepi) === 'true') ? <h5>This course is eligable for dogs with:</h5> : <h5>This course is eligable for dogs without medical issues!</h5>}
                                {JSON.stringify(course.manjkaEna) === 'true' ? <><span><Badge bg="warning" text="dark">One missing limb</Badge></span><br /></> : null}
                                {JSON.stringify(course.manjkataDve) === 'true' ? <><span><Badge bg="warning" text="dark">Two missing limbs</Badge></span><br /></> : null}
                                {JSON.stringify(course.sklepi) === 'true' ? <><span><Badge bg="warning" text="dark">Joint issues</Badge></span><br /></> : null}
                                {(JSON.stringify(course.manjkaEna) === 'true' || JSON.stringify(course.manjkataDve) === 'true' || JSON.stringify(course.sklepi) === 'true') ? <><span><Badge bg="success">No issues</Badge></span><br /></> : null}
                                </Card.Text>
                            </Card.Body>
                            {(course.jeDodal !== undefined && (course.jeDodal.includes('admin') || course.jeDodal.includes('Admin')) && !course.jeDodal.includes('@')) ? 
                            <Card.Footer className='small_foot_min'>
                                <small className="text-muted">
                                    {course.jeDodal}
                                    <Badge bg="info">Admin</Badge>
                                </small>
                            </Card.Footer> 
                            :
                            <Card.Footer className='small_foot_min'>
                            <small className="text-muted">{course.jeDodal}</small>
                            </Card.Footer>}
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    </>
    );
}

export default SeznamCourse;