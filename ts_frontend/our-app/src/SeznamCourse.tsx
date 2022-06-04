import React from 'react';
import { Col, Row, Card, Container, Badge } from 'react-bootstrap';
import { Course } from './razredi/Course';
import Velikost from './Velikost';
import ZdrastvenoStanje from './ZdrastvenoStanje';

const SeznamCourse: React.FC = () => {

    const [elements, setElements] = React.useState<Course[]>();



    React.useEffect(function () {
        const getCourses = async function () {
            const res = await fetch("http://localhost:3001/course");
            const data = await res.json();
            setElements(data.reverse()); // 'reverse()', zato da so na vrhu prikazani najnovejši coursi
            console.log(data)
        }
        getCourses();
    }, [])

    //DODAJ IZPISE ZA BOOLEAN VREDNOSTI
    return (<>
        <Container className='margin_reg'>
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