import React, { MouseEventHandler, TableHTMLAttributes, TdHTMLAttributes, useRef } from 'react';
import { ChangeEvent } from 'react';
import { FormEvent } from 'react';
import { Course } from './razredi/Course';
import { Link } from 'react-router-dom';
import MyRow from './MyRow';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import UserNav from './komponente/UserNav';
import Navigacija from './komponente/Navigacija';
import Noga from './komponente/Noga';
//import Menu from './Menu';

interface DodajCourseProps {
    onAdd: (course: Course) => any;
}


let DodajCourse: React.FC<DodajCourseProps> = (props: DodajCourseProps) => {
    const exportRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const navigate = useNavigate();

    const [lastnosti, setLastnosti] = React.useState({
        naziv: "",
        slika: "",
        opis: "",
        velikostiString: "",
        zdrastvenoStanjeString: ""
    });

    const [selectedImg, setSelectedImg] = React.useState(0);
    const [imagesTotal, setImagesTotal] = React.useState(0);
    const [blobForBackend, setMyBlob] = React.useState("");

    React.useEffect(function () {
        const getCourses = async function () {
            const response = await fetch("http://localhost:3001/courses");
            const data = await response.json();
            setImagesTotal(data.length);
        }
        getCourses();
    }, []);

    const exportAsImage = async (element: HTMLElement, imageFileName: string) => {
        const canvas = await html2canvas(element);
        const image = canvas.toDataURL("image/png", 1.0);
        setMyBlob(image);
        downloadImage(image, imageFileName);
    };
    const downloadImage = (blob: string, imageFileName: string) => {
        const fakeLink = window.document.createElement("a");

        fakeLink.download = imageFileName;

        fakeLink.href = blob;

        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);

        fakeLink.remove();
    };

    let prijavljen;

    if (localStorage.getItem("token") != null) {
        prijavljen = true;
    } else {
        prijavljen = false;
    }




    const handleAddObstacle = (x: number, y: number, e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
        if (selectedImg === 0) e.currentTarget.innerHTML = "<img style='max-width:50px; max-height:50px;' src='../slike/jump.png'></img>";
        if (selectedImg === 1) e.currentTarget.innerHTML = "<img style='max-width:50px; max-height:50px;' src='../slike/tire.png'></img>";
        if (selectedImg === 2) e.currentTarget.innerHTML = "<img style='max-width:50px; max-height:50px;' src='../slike/tunnel.png'></img>";
        if (selectedImg === 3) e.currentTarget.innerHTML = "<img style='max-width:50px; max-height:50px;' src='../slike/tunnel90.png'></img>";
        if (selectedImg === 4) e.currentTarget.innerHTML = "<img style='max-width:50px; max-height:50px;'src='../slike/totter.png'></img>";
        if (selectedImg === 5) e.currentTarget.innerHTML = "<img style='max-width:50px; max-height:50px;'src='../slike/start.png'></img>";
        if (selectedImg === 6) e.currentTarget.innerHTML = "<img style='max-width:50px; max-height:50px;'src='../slike/end.png'></img>";
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

        exportAsImage(exportRef.current, "image");


        let data = {
            naziv: lastnosti.naziv,
            slika: blobForBackend,
            opis: lastnosti.opis,
            velikost: velikostiArray,
            zdrastvenoStanje: zdrastvenoStanjeArray
        }

        console.log(data);

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

    const handleImgClick = (e: React.MouseEvent<HTMLImageElement>) => {
        var myNumber: number = +e.currentTarget.id;
        setSelectedImg(myNumber);
    }

    return (<div>
        <div className="container" >
            <div className='container-md' style={{backgroundColor: "white", borderRadius:"15px"}}>
                <h2 className='podnaslov'>Vnesite podatke o course:</h2>
                <form id="form" onSubmit={handleSubmit}>

                    <label>Naziv:</label>
                    <input name="naziv" type="text" onChange={handleChange} />
                    <br />
                    <label>Opis:</label>
                    <input name="opis" type="text" onChange={handleChange} />
                    <br />
                    <label>Velikost:</label>
                    <input name="velikostiString" type="text" onChange={handleChange} />
                    <br />
                    <label>zdrastveno stanje:</label>
                    <input name="zdrastvenoStanjeString" type="text" onChange={handleChange} />


                    <div>
                        <img onClick={handleImgClick} id='5' style={{ maxWidth: "50px", maxHeight: "50px" }} src='../slike/start.png'></img>
                        <img onClick={handleImgClick} id='0' style={{ maxWidth: "50px", maxHeight: "50px" }} src='../slike/jump.png'></img>
                        <img onClick={handleImgClick} id='1' style={{ maxWidth: "50px", maxHeight: "50px" }} src='../slike/tire.png'></img>
                        <img onClick={handleImgClick} id='2' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/tunnel.png"></img>
                        <img onClick={handleImgClick} id='3' style={{ maxWidth: "50px", maxHeight: "50px" }} src='../slike/tunnel90.png'></img>
                        <img onClick={handleImgClick} id='4' style={{ maxWidth: "50px", maxHeight: "50px" }} src='../slike/totter.png'></img>
                        <img onClick={handleImgClick} id='6' style={{ maxWidth: "50px", maxHeight: "50px" }} src='../slike/end.png'></img>

                        <br />
                        {selectedImg === 0 && <img style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/jump.png'></img>}
                        {selectedImg === 1 && <img style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/tire.png'></img>}
                        {selectedImg === 2 && <img style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/tunnel.png'></img>}
                        {selectedImg === 3 && <img style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/tunnel90.png'></img>}
                        {selectedImg === 4 && <img style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/totter.png'></img>}
                        {selectedImg === 5 && <img style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/start.png'></img>}
                        {selectedImg === 6 && <img style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/end.png'></img>}
                    </div>




                    <div ref={exportRef} style={{ display: "inline-block", textAlign: "center", margin: "10px" }}>
                        <table >
                            <tbody >
                                <MyRow handleAddObstacle={handleAddObstacle} rowNum={0}></MyRow>
                                <MyRow handleAddObstacle={handleAddObstacle} rowNum={1}></MyRow>
                                <MyRow handleAddObstacle={handleAddObstacle} rowNum={2}></MyRow>
                                <MyRow handleAddObstacle={handleAddObstacle} rowNum={3}></MyRow>
                                <MyRow handleAddObstacle={handleAddObstacle} rowNum={4}></MyRow>
                                <MyRow handleAddObstacle={handleAddObstacle} rowNum={5}></MyRow>
                            </tbody>
                        </table>
                    </div>


                    <br />
                    <input type="submit" value="Dodaj" />
                </form>
                <button>{<Link className="domov" to={`/`}>Domov</Link>}</button>
            </div>
        </div>

{/*
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
    */}
    </div>);
}

export default DodajCourse;