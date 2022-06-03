import React from 'react';
import { ChangeEvent } from 'react';
import { FormEvent } from 'react';
import { Course } from './razredi/Course';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import UserNav from './komponente/UserNav';
import Navigacija from './komponente/Navigacija';
import Noga from './komponente/Noga';
import { MouseEventHandler, TableHTMLAttributes, TdHTMLAttributes, useRef } from 'react';
import MyRow from './MyRow';
import html2canvas from 'html2canvas';
import './css/oblikovanje.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Menu from './Menu';

interface DodajCourseProps {
    onAdd: (course: Course) => any;
}

let DodajCourse: React.FC<DodajCourseProps> = (props: DodajCourseProps) => {

    const navigate = useNavigate();
    const exportRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const [lastnosti, setLastnosti] = React.useState({
        naziv: "",
        slika: "",
        opis: "",
        //velikostiString: "",
        manjkaEna: false,
        manjkataDve: false,
        sklepi: false
    });


    let prijavljen;

    if (localStorage.getItem("token") != null) {
        prijavljen = true;
    } else {
        prijavljen = false;
    }
    const [selectedImg, setSelectedImg] = React.useState(0);
    const [imagesTotal, setImagesTotal] = React.useState(0);
    const [blobForBackend, setMyBlob] = React.useState("");

    React.useEffect(function () {
        const getCourses = async function () {
            const response = await fetch("http://localhost:3001/course");
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

        exportAsImage(exportRef.current, "image");


        let data = {
            naziv: lastnosti.naziv,
            slika: blobForBackend,
            opis: lastnosti.opis,
            //velikost: velikostiArray,
            manjkaEna: lastnosti.manjkaEna,
            manjkataDve: lastnosti.manjkataDve,
            sklepi: lastnosti.sklepi,
            token: localStorage.getItem("token")
        }


        console.log(data);

        fetch("http://localhost:3001/course/dodan_course", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // navigate("/");



    }



    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLastnosti({ ...lastnosti, [e.target.name]: e.target.value });
    }

    const handleImgClick = (e: React.MouseEvent<HTMLImageElement>) => {
        var myNumber: number = +e.currentTarget.id;
        setSelectedImg(myNumber);
    }

    return (<div>
        {/*<UserNav/>
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
                    <label>For dogs with a missing limb?</label>
                    <input name="manjkaEna" type="checkbox" value = "true" onChange={handleChange}/>
                    <br/>
                    <label>For dogs with two missing limbs?</label>
                    <input name="manjkataDve" type="checkbox" value = "true" onChange={handleChange}/>
                    <br/>
                    <label>For dogs with join issues?</label>
                    <input name="sklepi" type="checkbox" value = "true" onChange={handleChange}/>
                    <br/>


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
    </table>*/}
        <UserNav />
        <Container className='margin_top'>
            <Row>
                <Col xs={0}>
                </Col>
                <Col xs={12} className="border_color">
                    <div className="container" >
                        <div className='container-md' style={{ backgroundColor: "white", borderRadius: "15px" }}>
                            <h2 className='podnaslov'>Vnesite podatke o course:</h2>
                            <form id="form" onSubmit={handleSubmit}>

                                <label>Naziv:</label>
                                <input name="naziv" type="text" className='form-control' onChange={handleChange} />
                                <br />
                                <label>Opis:</label>
                                <input name="opis" type="text" className='form-control' onChange={handleChange} />
                                <br />
                                
                                <div className='margin_left'>
                                <input name="manjkaEna" type="checkbox" value="true" className='form-check-input' onChange={handleChange} />
                                <label className='form-check-label'>For dogs with a missing limb?</label>
                                <br />
                                <input name="manjkataDve" type="checkbox" value="true" className='form-check-input' onChange={handleChange} />
                                <label className='form-check-label'>For dogs with two missing limbs?</label>
                                <br />
                                <input name="sklepi" type="checkbox" value="true" className='form-check-input' onChange={handleChange} />
                                <label className='form-check-label'>For dogs with joint issues?</label>
                                <br />
                                </div>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>

                                </Row>
                                <Row>
                                    <h2 className='podnaslov'>Build a course:</h2>
                                </Row>
                                <Row>
                                    <Col xs={3} md={1}>
                                        <img onClick={handleImgClick} id='5' style={{ maxWidth: "50px", maxHeight: "50px" }} src='../slike/start.png'></img>
                                    </Col>

                                    <Col xs={3} md={2}>
                                        <img onClick={handleImgClick} id='0' style={{ maxWidth: "50px", maxHeight: "50px" }} src='../slike/jump.png'></img>
                                    </Col>
                                    <Col xs={3} md={2}>
                                        <img onClick={handleImgClick} id='1' style={{ maxWidth: "50px", maxHeight: "50px" }} src='../slike/tire.png'></img>
                                    </Col>
                                    <Col xs={3} md={2}>
                                        <img onClick={handleImgClick} id='2' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/tunnel.png"></img>
                                    </Col>

                                    <Col xs={3} md={2}>
                                        <img onClick={handleImgClick} id='3' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/tunnel90.png"></img>
                                    </Col>

                                    <Col xs={3} md={2}>
                                        <img onClick={handleImgClick} id='4' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/totter.png"></img>
                                    </Col>

                                    <Col xs={3} md={1}>
                                        <img onClick={handleImgClick} id='6' style={{ maxWidth: "50px", maxHeight: "50px" }} src="../slike/end.png"></img>
                                    </Col>
                                </Row>

                                <Row >
                                    <br />
                                    <Col>
                                    </Col>
                                    {selectedImg === null ? <div></div> : <Col xs={5} className='izbran_element center'><h3 className='izbran_element'>Chosen element:</h3></Col>}
                                    <Col xs={3} md={2} lg={1}>
                                        {selectedImg === 0 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/jump.png'></img>}
                                        {selectedImg === 1 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/tire.png'></img>}
                                        {selectedImg === 2 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/tunnel.png'></img>}
                                        {selectedImg === 3 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/tunnel90.png'></img>}
                                        {selectedImg === 4 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/totter.png'></img>}
                                        {selectedImg === 5 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/start.png'></img>}
                                        {selectedImg === 6 && <img className='izbrana_slika' style={{ maxWidth: "70px", maxHeight: "70px" }} src='../slike/end.png'></img>}
                                    </Col>
                                    <Col xs={3} md={2} lg={2}>
                                        {selectedImg === 0 && <h4 className='izbran_element'>Jump</h4>}
                                        {selectedImg === 1 && <h4 className='izbran_element'>Tire</h4>}
                                        {selectedImg === 2 && <h4 className='izbran_element'>Tunnel x</h4>}
                                        {selectedImg === 3 && <h4 className='izbran_element'>Tunnel y</h4>}
                                        {selectedImg === 4 && <h4 className='izbran_element'>Totter</h4>}
                                        {selectedImg === 5 && <h4 className='izbran_element'>Start</h4>}
                                        {selectedImg === 6 && <h4 className='izbran_element'>End</h4>}
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>



                                <Row>
                                    <Col>
                                    </Col>
                                    <Col xs={10} className="center">
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
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>


                                <br />
                                <Row>
                                    <Col></Col>
                                    <Col xs={8} className='center'>
                                        <p>Doube click to save</p>
                                    </Col>
                                    <Col></Col>
                                </Row>
                                <Row>
                                    <Col></Col>
                                    <Col className='center'>
                                        <input type="submit" className='btn btn-success btn-block' value="Dodaj" />
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </form>
                            <br />
                            <Row >
                                <Col></Col>
                                <Col className='center'>
                                    <button className='btn btn-primary btn-block'>{<Link className="domov" to={`/`}>Domov</Link>}</button>
                                </Col>
                                <Col></Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col xs={0}>
                </Col>
            </Row>
        </Container>
        <Noga />
    
    </div>);
}

export default DodajCourse;