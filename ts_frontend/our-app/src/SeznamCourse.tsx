import React from 'react';
import { ChangeEvent } from 'react';
import { FormEvent } from 'react';
import { Course } from './razredi/Course';
import Velikost from './Velikost';
import ZdrastvenoStanje from './ZdrastvenoStanje';

function SeznamCourse () {

    const [elements, setElements] = React.useState<Course[]>();

    const [lastnosti, setLastnosti] = React.useState({
        jeDodal: ""
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        let podatki = {
            email: (document.getElementById("dodal") as HTMLInputElement).value,
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



    React.useEffect(function(){
        const getCourses = async function () {
            const res = await fetch("http://localhost:3001/course");
            const data = await res.json();
            setElements(data.reverse()); // 'reverse()', zato da so na vrhu prikazani najnovejši coursi
            
        }
        getCourses();
    }, [])
    

    
//DODAJ IZPISE ZA BOOLEAN VREDNOSTI
    return(
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
    </select>*/}
                        <input id="dodal" type="text" value={course.jeDodal} ></input>
                        

                        <input type="submit" value="Follow"/>
                    </form>
                    
                    </span><br />

                    {/*button za sledenje, katerega value je jeDodal*/ }
                    {/*<span><ZdrastvenoStanje seznam = {course.zdrastvenoStanje}></ZdrastvenoStanje></span>*/}
                    <img style={{maxWidth:"260px"}} src={'../slike/courseImages/'+ course.slika}></img>
                </div>))}
            </div>
        </div>
        
        
    );
}

export default SeznamCourse;