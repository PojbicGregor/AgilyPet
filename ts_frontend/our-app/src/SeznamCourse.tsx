import React, { MouseEventHandler, useRef } from 'react';
import { ChangeEvent } from 'react';
import { FormEvent } from 'react';
import { Col, Row, Card, Container, Badge } from 'react-bootstrap';
import { Course } from './razredi/Course';
import Velikost from './Velikost';
import ZdrastvenoStanje from './ZdrastvenoStanje';

const SeznamCourse: React.FC = () => {

    const ref = useRef(null);

    const [elements, setElements] = React.useState<Course[]>();

    const [lastnosti, setLastnosti] = React.useState({
        jeDodal: ""
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        console.log(ref.current);
        let podatki = {
            email: ref.current,
            token: localStorage.getItem("token")
        }

        fetch("http://localhost:3001/api/follow", {
            method: 'POST',
            body: JSON.stringify(podatki),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                console.log(response);
                response.json().then(podatki => {
                    console.log(localStorage.getItem("token"));
                    localStorage.getItem("token");              
                })
            }
        })
    }

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setLastnosti({ ...lastnosti, [e.target.name]: e.target.value });
    }

    const handleChange2 = (e: ChangeEvent<HTMLInputElement>) => {
        setLastnosti({ ...lastnosti, [e.target.name]: e.target.value });
    }

    const handleClick = (s : string) => {
        
        let podatki = {
            email: s,
            token: localStorage.getItem("token")
        }

        fetch("http://localhost:3001/api/follow", {
            method: 'POST',
            body: JSON.stringify(podatki),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                console.log(response);
                response.json().then(podatki => {
                    console.log(localStorage.getItem("token"));
                    localStorage.getItem("token");              
                })
            }
        })
    }



    React.useEffect(function () {
        const getCourses = async function () {
            const res = await fetch("http://localhost:3001/course");
            const data = await res.json();
            setElements(data.reverse()); // 'reverse()', zato da so na vrhu prikazani najnovejši coursi
            
        }
        getCourses();
    }, [])
    

    
//DODAJ IZPISE ZA BOOLEAN VREDNOSTI
    /*return(
        <div className='container' style={{backgroundColor:"white", borderRadius:"15px"}}>
            <div className='container-md' >
                {elements?.map(course => (<div style={{border:"solid 4px whiteSmoke", borderRadius:"10px", margin:"15px"}} key={course.naziv}>
                    <span><h3>{course.naziv}</h3></span><br/>
                    <span>{course.opis}</span><br/>
                    <span>Missing a limb:{JSON.stringify(course.manjkaEna)}</span><br/>
                    <span>Missing two limbs:{JSON.stringify(course.manjkataDve)}</span><br/>
                    <span>Dog with joint issues:{JSON.stringify(course.sklepi)}</span><br/>
                    <span>Added by: {course.jeDodal}</span><br/>

                    <span>
                    <form id="form" onSubmit={handleSubmit}>

                        {/*<select name="jeDodal" value={lastnosti.jeDodal} onChange={handleChange}>
                            <option  value={course.jeDodal}>{course.jeDodal}</option>
                            <option  value="dingdong@gmail.com">test</option>
    </select>
                        <input id="dodal" type="text" value={course.jeDodal} ></input>
                        

                        <input type="submit" value="Follow"/>
                    </form>
                    
                    </span><br />

                    
                    {/*<span><ZdrastvenoStanje seznam = {course.zdrastvenoStanje}></ZdrastvenoStanje></span>
                    <img style={{maxWidth:"260px"}} src={'../slike/courseImages/'+ course.slika}></img>
                </div>))}
            </div>
        </div>
    */
        

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
                                {/*<form id="form" onSubmit={handleSubmit}>

                                    <select name="jeDodal" value={lastnosti.jeDodal} onChange={handleChange}>
                                        <option  value={course.jeDodal}>{course.jeDodal}</option>
                                        <option  value="dingdong@gmail.com">test</option>
                                    </select>
                                    <input ref={ref} name="dodal" type="text" value={course.jeDodal} ></input>
                                    

                                    <input type="submit" value="Follow"/>
                                </form>*/}

                                <button onClick= {() => handleClick(course.jeDodal)}>Follow</button>
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