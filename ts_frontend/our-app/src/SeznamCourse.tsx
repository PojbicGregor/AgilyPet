import React from 'react';
import { Course } from './razredi/Course';
import Velikost from './Velikost';
import ZdrastvenoStanje from './ZdrastvenoStanje';

function SeznamCourse () {

    const [elements, setElements] = React.useState<Course[]>();



    React.useEffect(function(){
        const getCourses = async function () {
            const res = await fetch("http://localhost:3001/courses");
            const data = await res.json();
            setElements(data);
        }
        getCourses();
    }, [])
    

    return(
        <div className='container' style={{backgroundColor:"white", borderRadius:"15px"}}>
            <div className='container-md' >
                {elements?.map(course => (<div style={{border:"solid 4px whiteSmoke", borderRadius:"10px", margin:"15px"}} key={course.naziv}>
                    <span><h3>{course.naziv}</h3></span><br/>
                    <span>{course.opis}</span><br/>
                    <span><Velikost seznam = {course.velikost}></Velikost></span>
                    <span><ZdrastvenoStanje seznam = {course.zdrastvenoStanje}></ZdrastvenoStanje></span>
                    <img style={{maxWidth:"260px"}} src={'../slike/courseImages/'+ course.slika}></img>
                </div>))}
            </div>
        </div>
    );
}

export default SeznamCourse;